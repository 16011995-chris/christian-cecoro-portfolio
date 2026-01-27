'use client';

import { useState, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  privacy: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    privacy: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setErrorMessage('Please complete the reCAPTCHA verification.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (res.ok) {
        setStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          privacy: false,
        });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
        // Close after delay
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 3000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Word count for message
  const wordCount = formData.message.trim() ? formData.message.trim().split(/\s+/).length : 0;
  const maxWords = 200;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-neutral-950 border border-white/10 rounded-lg p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success State */}
            {status === 'success' ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-white mb-2">Message Sent!</h3>
                <p className="text-neutral-400">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h2 className="font-serif text-3xl text-white mb-2">Get in Touch</h2>
                  <p className="text-neutral-400 text-sm">
                    Let's discuss your next project.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-brand-red transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-brand-red transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500">
                        Message
                      </label>
                      <span className={`text-xs ${wordCount > maxWords ? 'text-red-500' : 'text-neutral-500'}`}>
                        {wordCount}/{maxWords} words
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-brand-red transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      required
                      className="mt-1 w-4 h-4 bg-transparent border border-white/20 rounded focus:ring-brand-red focus:ring-offset-0 accent-brand-red"
                    />
                    <label htmlFor="privacy" className="text-sm text-neutral-400">
                      I agree to the processing of my personal data in accordance with the{' '}
                      <a href="https://www.iubenda.com/privacy-policy/33864853" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors underline">
                        Privacy Policy
                      </a>{' '}
                      *
                    </label>
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                      onChange={(token) => setCaptchaToken(token)}
                      onExpired={() => setCaptchaToken(null)}
                      theme="dark"
                    />
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <motion.div
                      className="flex items-center gap-2 text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading' || wordCount > maxWords}
                    className="w-full h-14 bg-brand-red text-white font-medium uppercase tracking-widest text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
