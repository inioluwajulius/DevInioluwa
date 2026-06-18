import { GraduationCap, Target, Lightbulb, Download, Terminal, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/components/ui/use-toast";

const infoCards = [
  { 
    icon: GraduationCap, 
    title: "Education", 
    code: "EDU_01",
    text: "B.Tech Computer Science - Ladoke Akintola University of Technology",
    color: "cyan"
  },
  { 
    icon: Target, 
    title: "Focus", 
    code: "FOCUS_02",
    text: "Frontend & Full-stack development with a strong MERN focus",
    color: "purple"
  },
  { 
    icon: Lightbulb, 
    title: "Interests", 
    code: "INT_03",
    text: "Coding, Writing, Reading, and Singing",
    color: "green"
  },
];

const colorMap = {
  cyan: { border: "border-[var(--neon-cyan)]", bg: "bg-[rgba(0,255,224,0.05)]", text: "text-[var(--neon-cyan)]", icon: "text-[var(--neon-cyan)]" },
  purple: { border: "border-[var(--neon-purple)]", bg: "bg-[rgba(168,85,247,0.05)]", text: "text-[var(--neon-purple)]", icon: "text-[var(--neon-purple)]" },
  green: { border: "border-[var(--neon-green)]", bg: "bg-[rgba(57,255,20,0.05)]", text: "text-[var(--neon-green)]", icon: "text-[var(--neon-green)]" },
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();

  const handleDownloadResume = () => {
    fetch('/JULIUS_INIOLUWA_OLADEJO_FULLSTACK.pdf')
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Julius-Inioluwa-Oladejo-Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast({
          title: "Download Complete",
          description: "Resume fetched successfully.",
        });
      })
      .catch(() => {
        window.open('/JULIUS-INIOLUWA-OLADEJO-FRONT-END_DEVELOPER.pdf', '_blank');
        toast({
          title: "Redirecting...",
          description: "Opening document in new tab.",
        });
      });
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden border-t border-[hsl(220,16%,12%)]">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-[var(--neon-cyan)] rounded-full blur-[120px] opacity-10 animate-float" />
        <div className="absolute bottom-0 left-[5%] w-[500px] h-[500px] bg-[var(--neon-purple)] rounded-full blur-[150px] opacity-15 animate-float-delayed" />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section label and heading */}
        <div className="mb-12">
          <p className="text-[10px] text-[var(--neon-cyan)] font-mono opacity-50 tracking-widest mb-3">// section_02.about</p>
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">ABOUT</span>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-display uppercase">ME</h2>
          </div>
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left Column */}
          <div className="space-y-6">
            <div className="terminal-card">
              <div className="flex items-center gap-2 mb-4 border-b border-[hsl(220,16%,20%)] pb-3 text-[var(--neon-cyan)]">
                <Terminal size={16} />
                <span className="text-xs uppercase tracking-widest font-mono">bio.md</span>
              </div>
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-mono">
                <p>
                  <span className="text-[var(--neon-green)]">&gt;</span> Hello! I'm <span className="text-[var(--neon-cyan)] font-bold">Julius Inioluwa Oladejo</span>, a passionate Full-Stack Web Developer with a strong foundation in building scalable and efficient applications.
                </p>
                <p>
                  <span className="text-[var(--neon-green)]">&gt;</span> I have extensive experience building responsive, user-focused web applications using the MERN stack (MongoDB, Express, React, Node).
                </p>
                <p>
                  <span className="text-[var(--neon-green)]">&gt;</span> I am a reliable team collaborator with clear communication skills, a strong attention to detail, and a continuous learning mindset.
                </p>
                
                <div className="pt-4 border-t border-[hsl(220,16%,20%)]">
                  <button 
                    onClick={handleDownloadResume}
                    className="btn-neon text-xs flex items-center gap-2"
                  >
                    <Download size={14} />
                    FETCH resume.pdf
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-[var(--neon-cyan)] bg-[rgba(0,255,224,0.05)] p-4 rounded flex flex-col items-center justify-center text-center hover:bg-[rgba(0,255,224,0.1)] transition-colors">
                <div className="text-[var(--neon-cyan)] text-xl font-bold font-display">4+</div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-2">Years</div>
              </div>
              <div className="border border-[var(--neon-purple)] bg-[rgba(168,85,247,0.05)] p-4 rounded flex flex-col items-center justify-center text-center hover:bg-[rgba(168,85,247,0.1)] transition-colors">
                <div className="text-[var(--neon-purple)] text-xl font-bold font-display">15+</div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-2">Projects</div>
              </div>
              <div className="border border-[var(--neon-green)] bg-[rgba(57,255,20,0.05)] p-4 rounded flex flex-col items-center justify-center text-center hover:bg-[rgba(57,255,20,0.1)] transition-colors">
                <div className="text-[var(--neon-green)] text-xl font-bold font-display">10+</div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-2">Tech Stack</div>
              </div>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-4">
            {infoCards.map(({ icon: Icon, title, code, text, color }, i) => {
              const colors = colorMap[color as keyof typeof colorMap];
              return (
                <div 
                  key={title} 
                  className={`border-2 ${colors.border} ${colors.bg} p-5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_${color === 'cyan' ? 'rgba(0,255,224,0.2)' : color === 'purple' ? 'rgba(168,85,247,0.2)' : 'rgba(57,255,20,0.2)'}] group`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 shrink-0 rounded border border-[hsl(220,16%,20%)] bg-[hsl(220,16%,12%)] flex items-center justify-center ${colors.icon} group-hover:border-current transition-colors`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-xs font-mono ${colors.text} opacity-70 tracking-wider`}>{code}</span>
                  </div>
                  <h3 className={`font-display font-bold mb-1 uppercase tracking-wide ${colors.text}`}>{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{text}</p>
                  <div className={`flex items-center gap-1 text-xs ${colors.text} opacity-50 group-hover:opacity-100 transition-opacity`}>
                    learn_more <ChevronRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
