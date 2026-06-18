import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/inioluwajulius", label: "GitHub", color: "var(--neon-cyan)" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/inioluwa-oladejo-96376b3b1", label: "LinkedIn", color: "var(--neon-purple)" },
    { icon: Mail, href: "mailto:Inioluwajulius2007@gmail.com", label: "Email", color: "var(--neon-green)" },
  ];

  const navLinks = [
    { id: 'home', label: '~/home' },
    { id: 'about', label: '~/about' },
    { id: 'skills', label: '~/skills' },
    { id: 'projects', label: '~/projects' },
    { id: 'contact', label: '~/contact' },
  ];

  return (
    <footer className="bg-[rgba(6,8,14,0.98)] text-white pt-16 pb-8 border-t border-[hsl(220,16%,12%)] relative overflow-hidden">
      {/* Top gradient accent - 20% opacity */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-20" />
      
      {/* Bottom radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[var(--neon-purple)] rounded-full blur-[150px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-display font-bold text-2xl tracking-tight mb-2">
              <span className="gradient-text">INIOLUWA</span>
              <span className="text-white text-opacity-80 ml-2">OLADEJO</span>
            </div>
            <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
              SOFTWARE_ENGINEER_&_DEVELOPER
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <a 
                key={label}
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border-2 border-[hsl(220,16%,16%)] bg-[rgba(10,10,12,0.8)] flex items-center justify-center text-gray-500 transition-all duration-300"
                style={{
                  borderColor: color,
                  color: color,
                  boxShadow: `0 0 12px ${color}33`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = color + '15';
                  e.currentTarget.style.boxShadow = `0 0 20px ${color}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(10,10,12,0.8)';
                  e.currentTarget.style.boxShadow = color + '33';
                }}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Divider */}
        <div className="my-8 relative">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--neon-cyan)] to-transparent opacity-20" />
            <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase whitespace-nowrap">
              PORTFOLIO_v2.0
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-[var(--neon-cyan)] to-transparent opacity-20" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
          <p className="text-gray-600 text-xs font-mono">
            © {currentYear} Oladejo Inioluwa. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a 
                  href={`#${id}`} 
                  className="text-gray-600 hover:text-[var(--neon-cyan)] transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
