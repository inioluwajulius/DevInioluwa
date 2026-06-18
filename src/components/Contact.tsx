import { useState } from 'react';
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Contact = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const subject = encodeURIComponent("Contact from Portfolio");
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:Inioluwajulius2007@gmail.com?subject=${subject}&body=${body}`;

      toast({
        title: "SYS.SUCCESS",
        description: "Opening mail client...",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast({
        title: "SYS.ERROR",
        description: "Failed to open mail client.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { 
      icon: Mail, 
      title: "email", 
      value: "Inioluwajulius2007@gmail.com", 
      href: "mailto:Inioluwajulius2007@gmail.com",
      color: "cyan"
    },
    { 
      icon: Linkedin, 
      title: "linkedin", 
      value: "inioluwa-oladejo", 
      href: "https://www.linkedin.com/in/inioluwa-oladejo-96376b3b1",
      color: "purple",
      external: true 
    },
    { 
      icon: Github, 
      title: "github", 
      value: "inioluwajulius", 
      href: "https://github.com/inioluwajulius",
      color: "green",
      external: true 
    },
  ];

  const colorMap = {
    cyan: "border-[var(--neon-cyan)] bg-[rgba(0,255,224,0.05)]",
    purple: "border-[var(--neon-purple)] bg-[rgba(168,85,247,0.05)]",
    green: "border-[var(--neon-green)] bg-[rgba(57,255,20,0.05)]",
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden border-t border-[hsl(220,16%,12%)]">
      <div className="section-container" ref={ref}>
        {/* Section label and heading */}
        <div className="mb-12">
          <p className="text-[10px] text-[var(--neon-cyan)] font-mono opacity-50 tracking-widest mb-3">// section_05.contact</p>
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">GET_IN</span>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-display uppercase">TOUCH</h2>
          </div>
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Contact Links */}
          <div className="space-y-4">
            <div className="terminal-card p-6 mb-6">
              <div className="flex items-center gap-2 mb-4 border-b border-[hsl(220,16%,20%)] pb-3 text-[var(--neon-green)]">
                <Terminal size={16} />
                <span className="text-xs uppercase tracking-widest font-mono">contact_nodes</span>
              </div>
              
              <p className="text-xs text-gray-400 font-mono leading-relaxed">
                &gt; Establishing connection protocols...<br/>
                &gt; Awaiting incoming transmissions.
              </p>
            </div>

            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, title, value, href, color, external }) => (
                <a 
                  key={title}
                  href={href} 
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`border-2 ${colorMap[color as keyof typeof colorMap]} p-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(${
                    color === 'cyan' ? '0,255,224' : color === 'purple' ? '168,85,247' : '57,255,20'
                  },0.3)] group`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 shrink-0 rounded border border-[hsl(220,16%,20%)] bg-[hsl(220,16%,12%)] flex items-center justify-center text-${
                      color === 'cyan' ? '[var(--neon-cyan)]' : color === 'purple' ? '[var(--neon-purple)]' : '[var(--neon-green)]'
                    } group-hover:border-current transition-colors`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-0.5">/{title}</p>
                      <p className={`font-mono text-sm truncate group-hover:text-${
                        color === 'cyan' ? '[var(--neon-cyan)]' : color === 'purple' ? '[var(--neon-purple)]' : '[var(--neon-green)]'
                      } transition-colors text-gray-300`}>
                        {value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="border-2 border-[var(--neon-green)] bg-[rgba(57,255,20,0.05)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot" />
                <p className="font-mono text-xs text-[var(--neon-green)] uppercase tracking-wider">AVAILABLE_FOR_WORK</p>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                Open to freelance, contract, and full-time opportunities.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSubmit} className="terminal-card p-6 border-[var(--neon-purple)]">
              <div className="flex items-center gap-2 mb-6 border-b border-[hsl(220,16%,20%)] pb-3 text-[var(--neon-purple)]">
                <Mail size={16} />
                <span className="text-xs uppercase tracking-widest font-mono">transmission_form.sh</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] text-[var(--neon-purple)] mb-2 uppercase tracking-wider font-mono">
                    NAME_INPUT
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="input-neon w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[10px] text-[var(--neon-purple)] mb-2 uppercase tracking-wider font-mono">
                    EMAIL_INPUT
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="input-neon w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[10px] text-[var(--neon-purple)] mb-2 uppercase tracking-wider font-mono">
                    MESSAGE_INPUT
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message..."
                    required
                    rows={5}
                    className="input-neon w-full resize-none font-mono"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon-solid w-full text-xs py-2.5 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin">◐</span>
                      TRANSMITTING...
                    </>
                  ) : (
                    'SEND_MESSAGE'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
