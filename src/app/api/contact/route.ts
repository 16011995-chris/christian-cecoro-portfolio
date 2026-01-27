import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().max(1500, 'Message too long').optional().default(''),
  privacy: z.literal(true, { message: 'You must accept the privacy policy' }),
  captchaToken: z.string().min(1, 'Please complete the reCAPTCHA'),
});

// Verify reCAPTCHA token with Google
async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured, skipping verification...');
    return true; // Allow in development
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Lazy initialize Resend
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Append to Google Sheets via Apps Script
async function appendToSheet(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  try {
    const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

    if (!webAppUrl) {
      console.warn('Google Sheets Web App not configured, skipping...');
      return;
    }

    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Apps Script error: ${response.status}`);
    }

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

    const { captchaToken, ...data } = result.data;

    // Verify reCAPTCHA
    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

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
