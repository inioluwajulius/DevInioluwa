import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Full-stack Web Developer";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full blur-[180px] opacity-15 animate-float" />
        <div className="absolute bottom-[5%] right-[10%] w-[700px] h-[700px] bg-[var(--neon-purple)] rounded-full blur-[180px] opacity-20 animate-float-delayed" />
      </div>

      {/* Horizontal rule lines */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)] to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />
      </div>
      
      <div className="section-container w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            {/* Terminal badge */}
            <div className="animate-fade-in stagger-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--neon-cyan)] bg-[rgba(0,255,224,0.05)] mb-6 font-mono text-xs">
                <span className="status-dot" />
                <span className="text-[var(--neon-cyan)] tracking-widest uppercase">SYSTEM_ONLINE</span>
              </div>

              {/* Comment line */}
              <p className="text-xs text-[var(--neon-cyan)] opacity-50 font-mono mb-3 tracking-wide">
                // full_name.identify()
              </p>

              {/* Name stacked */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tighter uppercase mb-2">
                <span className="text-white block">OLADEJO</span>
                <span className="gradient-text block">INIOLUWA</span>
                <span className="text-white text-opacity-30 text-[0.7em] block">JULIUS</span>
              </h1>

              {/* Typewriter role line */}
              <p className="text-lg sm:text-xl md:text-2xl text-[var(--neon-cyan)] mt-6 font-mono h-8 flex items-center gap-1">
                <span className="text-[var(--neon-purple)]">&gt;</span> {text}<span className="animate-blink">_</span>
              </p>
            </div>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-xl animate-fade-in stagger-2 leading-relaxed font-mono">
              Detail-oriented Full-Stack Developer with extensive experience in the MERN stack. Passionate about clean UI, high performance, and practical problem-solving.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 animate-fade-in stagger-3">
              <button 
                className="btn-neon-solid"
                onClick={() => scrollToSection('contact')}
              >
                GET_IN_TOUCH
              </button>
              <button 
                className="btn-neon"
                onClick={() => scrollToSection('projects')}
              >
                VIEW_MY_WORK
              </button>
            </div>
          </div>
          
          {/* Terminal Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in stagger-3">
            <div className="w-full max-w-md terminal-card">
              <div className="flex items-center gap-2 mb-4 border-b border-[hsl(220,16%,20%)] pb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[var(--neon-green)] shadow-[0_0_8px_var(--neon-green)]"></div>
                </div>
                <span className="ml-2 text-xs text-gray-600 font-mono">user@inioluwa:~</span>
              </div>
              <div className="font-mono text-xs space-y-3 text-gray-300">
                <div>
                  <p><span className="text-[var(--neon-purple)]">user@inioluwa</span><span className="text-[var(--neon-cyan)]">:~</span>$ whoami</p>
                  <p className="text-[var(--neon-green)] ml-4">oladejo_inioluwa</p>
                </div>

                <div>
                  <p><span className="text-[var(--neon-purple)]">user@inioluwa</span><span className="text-[var(--neon-cyan)]">:~</span>$ cat role.txt</p>
                  <p className="text-[var(--neon-purple)] ml-4">&gt; Full-Stack Web Developer</p>
                </div>
                
                <div>
                  <p><span className="text-[var(--neon-purple)]">user@inioluwa</span><span className="text-[var(--neon-cyan)]">:~</span>$ echo $STATUS</p>
                  <p className="text-[var(--neon-cyan)] ml-4 flex items-center gap-2">
                    <span className="status-dot" />
                    Available for opportunities
                  </p>
                </div>

                <div className="pt-2 border-t border-[hsl(220,16%,20%)]">
                  <p className="text-gray-500 animate-blink">_</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="p-2 rounded border border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[rgba(0,255,224,0.05)]">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
