import { Github, Linkedin, Mail } from 'lucide-react';
import ContactNetworkCanvas from './ContactNetworkCanvas';

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6 text-[#c9b694]" />,
    label: 'Email',
    value: 'sravanistar99@gmail.com',
    href: 'mailto:sravanistar99@gmail.com',
    external: false,
  },
  {
    icon: <Linkedin className="w-6 h-6 text-[#c9b694]" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sravaniofficial',
    href: 'https://www.linkedin.com/in/sravaniofficial/',
    external: true,
  },
  {
    icon: <Github className="w-6 h-6 text-[#c9b694]" />,
    label: 'GitHub',
    value: 'github.com/eternalsunshine1707',
    href: 'https://github.com/eternalsunshine1707',
    external: true,
  },
] as const;

const cardClass =
  'flex-1 min-w-[200px] max-w-xs flex flex-col items-center gap-2 bg-gradient-to-b from-[#c9b694]/30 to-purple-900/30 border border-white/10 rounded-xl px-6 py-6 shadow-none transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#c9b694] hover:shadow-[0_0_0_1px_rgba(107,171,138,0.45),0_20px_48px_-12px_rgba(107,171,138,0.28)]';

const Contact = () => {
  return (
    <section
      id="contact"
      className="pt-24 pb-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none min-h-full z-0">
        <ContactNetworkCanvas />
      </div>

      <div className="w-full px-8 xl:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-[#c9b694]/45 bg-[#c9b694]/10 px-4 py-2.5 sm:px-5 text-center text-xs sm:text-sm font-semibold text-[#c9b694] backdrop-blur-sm animate-open-badge-glow max-w-[95vw]"
              role="status"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9b694] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9b694]" />
              </span>
              <span>Open to Opportunities - Typical response within 24hrs</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-8 text-[#c9b694]">✦</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#c9b694]">LET'S CONNECT</h1>
              <span className="w-8 h-8 text-[#c9b694]">✦</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-400 text-lg max-w-2xl text-justify">
                I'm currently on the lookout for full-time opportunities in Data Engineering and Data Analytics, and I'm
                excited to connect! Whether you have a question, a potential collaboration, or just want to say hi,
                don't hesitate to reach out. I'll do my best to get back to you quickly - We might
                just create something amazing together!
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row justify-center gap-6">
              {contactMethods.map((method) => {
                const inner = (
                  <>
                    <div className="flex items-center justify-center bg-[#c9b694]/10 rounded-full w-12 h-12 mb-2">
                      {method.icon}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#c9b694] font-semibold group-hover:text-white transition-colors duration-300">
                      {method.label}
                    </div>
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
