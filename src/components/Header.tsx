import { useState, useEffect } from 'react';
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'home', label: '~/home' },
    { id: 'about', label: '~/about' },
    { id: 'skills', label: '~/skills' },
    { id: 'projects', label: '~/projects' },
    { id: 'contact', label: '~/contact' }
  ];

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden text-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-colors p-2">
          <Menu size={24} />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-[80vw] sm:w-[300px] border-l-2 border-[var(--neon-cyan)] bg-[rgba(10,10,12,0.95)] backdrop-blur-md p-6">
        <div className="mt-8 flex flex-col gap-6">
          <div className="mb-4 border-b border-[var(--neon-cyan)] pb-4">
            <h1 className="font-display font-bold text-xl">
              <span className="gradient-text">INIOLUWA</span>
              <span className="text-white text-opacity-80 ml-1">OLADEJO</span>
            </h1>
            <p className="text-xs text-[var(--neon-cyan)] font-mono mt-2">SOFTWARE_ENGINEER</p>
          </div>
          
          <nav className="flex flex-col gap-3 font-mono">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  // Close sheet - the sheet component will handle this
                  const trigger = document.querySelector('[data-state="open"]');
                  if (trigger) {
                    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                  }
                }}
                className={`text-left px-3 py-2 rounded text-sm transition-all ${
                  activeSection === link.id 
                    ? 'text-[var(--neon-cyan)] bg-[rgba(0,255,224,0.1)] border-l-2 border-[var(--neon-cyan)]' 
                    : 'text-gray-400 hover:text-[var(--neon-cyan)] border-l-2 border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="mt-4 btn-neon w-full text-xs py-2"
          >
            HIRE_ME
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[rgba(8,11,18,0.92)] backdrop-blur-md py-3 border-b border-[hsl(220,16%,16%)]' 
        : 'bg-transparent py-5'
    }`}>
      {/* Top gradient line when scrolled */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-50" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col gap-0.5">
            <div className="font-display font-bold text-lg sm:text-xl tracking-tight">
              <span className="gradient-text">INIOLUWA</span>
              <span className="text-white text-opacity-80 ml-1">OLADEJO</span>
            </div>
            <div className="hidden sm:block text-[10px] text-[var(--neon-cyan)] font-mono tracking-widest">
              SOFTWARE_ENGINEER
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center font-mono">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3 py-2 text-xs rounded transition-all duration-300 ${
                  activeSection === link.id 
                    ? 'text-[var(--neon-cyan)]' 
                    : 'text-gray-400 hover:text-[var(--neon-cyan)]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent blur-sm" 
                       style={{ boxShadow: '0 0 8px rgba(0,255,224,0.6)' }} />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex btn-neon text-xs py-2 gap-2 items-center"
          >
            <span className="status-dot mr-0" />
            HIRE_ME
          </button>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
