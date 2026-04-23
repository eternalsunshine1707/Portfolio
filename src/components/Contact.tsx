import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Loader2, Mail, MapPin, Send } from 'lucide-react';
import ContactNetworkCanvas from './ContactNetworkCanvas';

/** Map these keys in your EmailJS template (e.g. {{from_name}}, {{message}}). */
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6 text-cyan-400" />,
    label: 'Email',
    value: 'sravanistar99@gmail.com',
    href: 'mailto:sravanistar99@gmail.com',
    external: false,
  },
  {
    icon: <Linkedin className="w-6 h-6 text-cyan-400" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sravaniofficial',
    href: 'https://www.linkedin.com/in/sravaniofficial/',
    external: true,
  },
  {
    icon: <Github className="w-6 h-6 text-cyan-400" />,
    label: 'GitHub',
    value: 'github.com/eternalsunshine1707',
    href: 'https://github.com/eternalsunshine1707',
    external: true,
  },
  {
    icon: <MapPin className="w-6 h-6 text-cyan-400" />,
    label: 'Location',
    value: 'Virginia, USA',
    href: null,
    external: false,
  },
] as const;

const cardClass =
  'flex-1 min-w-[200px] max-w-xs flex flex-col items-center gap-2 bg-gradient-to-b from-cyan-900/30 to-purple-900/30 border border-white/10 rounded-xl px-6 py-6 shadow-none transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_0_1px_rgba(0,188,212,0.45),0_20px_48px_-12px_rgba(0,188,212,0.28)]';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const clearFormStatus = () => {
    setSubmitState((s) => (s === 'success' || s === 'error' ? 'idle' : s));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fullName,
          from_email: email,
          reply_to: email,
          subject,
          message,
          to_email: 'sravanistar99@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitState('success');
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setSubmitState('error');
    }
  };

  const inputClass =
    'w-full bg-black/40 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-[#00bcd4]/40 transition-colors duration-300';

  return (
    <section
      id="contact"
      className="min-h-screen bg-dark-950 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none min-h-full z-0">
        <ContactNetworkCanvas />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-green-400/45 bg-green-950/35 px-4 py-2.5 sm:px-5 text-center text-xs sm:text-sm font-semibold text-green-300 backdrop-blur-sm animate-open-badge-glow max-w-[95vw]"
              role="status"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span>Open to Opportunities - Typical response within 24hrs</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-8 text-cyan-400">✦</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white">GET IN TOUCH</h1>
              <span className="w-8 h-8 text-cyan-400">✦</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-400 max-w-2xl">
                I'm currently on the lookout for full-time opportunities in Data Engineering and Data Analytics, and I'm
                excited to connect! Whether you have a question, a potential collaboration, or just want to say hi,
                don't hesitate to reach out. I'll do my best to get back to you quickly - We might
                just create something amazing together!
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mb-14 w-full max-w-2xl mx-auto space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-full-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                  Full Name
                </label>
                <input
                  id="contact-full-name"
                  name="user_name"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => {
                    clearFormStatus();
                    setFullName(e.target.value);
                  }}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="user_email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    clearFormStatus();
                    setEmail(e.target.value);
                  }}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => {
                  clearFormStatus();
                  setSubject(e.target.value);
                }}
                className={inputClass}
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  clearFormStatus();
                  setMessage(e.target.value);
                }}
                className={`${inputClass} resize-y min-h-[120px]`}
                placeholder="Your message..."
              />
            </div>

            {submitState === 'success' && (
              <p
                className="rounded-lg border border-green-500/40 bg-green-950/30 px-4 py-3 text-sm text-green-200"
                role="status"
              >
                Message sent successfully! I'll get back to you within 24 hours.
              </p>
            )}
            {submitState === 'error' && (
              <p
                className="rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200"
                role="alert"
              >
                Something went wrong. Please try again or email me directly!
              </p>
            )}

            <button
              type="submit"
              disabled={submitState === 'loading'}
              aria-busy={submitState === 'loading'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-900/20 transition-all duration-300 ease-in-out hover:bg-cyan-500 hover:shadow-[0_0_24px_rgba(0,188,212,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:self-start"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" aria-hidden />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row justify-center gap-6">
              {contactMethods.map((method) => {
                const inner = (
                  <>
                    <div className="flex items-center justify-center bg-cyan-400/10 rounded-full w-12 h-12 mb-2">
                      {method.icon}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                      {method.label}
                    </div>
                    <span className="text-white text-base font-medium text-center break-all group-hover:text-cyan-300 transition-colors duration-300">
                      {method.value}
                    </span>
                  </>
                );

                if (method.href) {
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      {...(method.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className={`${cardClass} group no-underline cursor-pointer`}
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <div key={method.label} className={`${cardClass} cursor-default`}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
