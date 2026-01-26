import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { google } from 'googleapis';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().max(1500, 'Message too long').optional().default(''),
  privacy: z.literal(true, { message: 'You must accept the privacy policy' }),
});

// Lazy initialize Resend
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Google Sheets auth
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Append to Google Sheets
async function appendToSheet(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.warn('Google Sheets not configured, skipping...');
      return;
    }

    const timestamp = new Date().toISOString();
    const values = [[timestamp, data.firstName, data.lastName, data.email, data.message]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    console.log('Successfully added to Google Sheets');
  } catch (error) {
    console.error('Google Sheets error:', error);
    // Don't throw - we still want to send the email
  }
}

// Send email notification
async function sendEmailNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  try {
    const toEmail = process.env.CONTACT_EMAIL_TO;

    const resend = getResendClient();
    if (!toEmail || !resend) {
      console.warn('Resend not configured, skipping email...');
      return;
    }

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: toEmail,
      subject: `New Contact: ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>

          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${data.message || 'No message provided'}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            This message was sent from the contact form on christiancecoro.com
          </p>
        </div>
      `,
      replyTo: data.email,
    });

    console.log('Successfully sent email notification');
  } catch (error) {
    console.error('Resend error:', error);
    // Don't throw - form submission should still be considered successful
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => e.message).join(', ');
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const data = result.data;

    // Run both operations in parallel
    await Promise.all([
      appendToSheet(data),
      sendEmailNotification(data),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
