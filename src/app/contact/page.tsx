import type { Metadata } from 'next';
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Christian Cecoro for your next digital design project. Let\'s work together to create something amazing.',
  openGraph: {
    title: 'Contact | Christian Cecoro',
    description: 'Get in touch with Christian Cecoro for your next digital design project. Let\'s work together to create something amazing.',
  },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
