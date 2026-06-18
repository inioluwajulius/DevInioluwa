import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills = () => {
  const { ref, isVisible } = useScrollReveal();

  const frontendSkills: Skill[] = [
    { name: "React.js", level: 90, category: "frontend" },
    { name: "Next.js", level: 85, category: "frontend" },
    { name: "JavaScript (ES6)", level: 85, category: "frontend" },
    { name: "HTML5/CSS3", level: 95, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
  ];
  
  const backendSkills: Skill[] = [
    { name: "Node.js", level: 85, category: "backend" },
    { name: "Express.js", level: 85, category: "backend" },
    { name: "MongoDB", level: 80, category: "backend" },
    { name: "GraphQL", level: 75, category: "backend" },
    { name: "REST APIs", level: 85, category: "backend" },
  ];

  const devopsSkills: Skill[] = [
    { name: "Git", level: 90, category: "devops" },
    { name: "Version Control", level: 85, category: "devops" },
    { name: "Vercel / Netlify", level: 80, category: "devops" },
    { name: "CI/CD", level: 70, category: "devops" },
    { name: "Firebase", level: 75, category: "devops" },
  ];
  
  const otherSkills: string[] = [
    "Bootstrap", "Python", "Java", "C", "Data Structures", "Algorithms", "AI Integration"
  ];

  const SkillBar = ({ skill, delay, color }: { skill: Skill; delay: number; color: string }) => {
    const colorConfig = {
      cyan: { text: "text-[var(--neon-cyan)]", bg: "bg-[var(--neon-cyan)]", shadow: "rgba(0,255,224,0.5)" },
      purple: { text: "text-[var(--neon-purple)]", bg: "bg-[var(--neon-purple)]", shadow: "rgba(168,85,247,0.5)" },
      green: { text: "text-[var(--neon-green)]", bg: "bg-[var(--neon-green)]", shadow: "rgba(57,255,20,0.5)" },
    };
    const config = colorConfig[color as keyof typeof colorConfig];

    return (
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <span className="font-mono text-xs text-gray-300 uppercase tracking-wider">{skill.name}</span>
          <span className={`font-mono text-xs ${config.text}`}>{skill.level}%</span>
        </div>
        <div className="h-1 bg-[hsl(220,16%,12%)] border border-[hsl(220,16%,16%)] rounded overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${config.bg}`}
            style={{ 
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${delay}ms`,
              boxShadow: `0 0 10px ${config.shadow}`
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden border-t border-[hsl(220,16%,12%)]">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--neon-green)] rounded-full blur-[200px] opacity-[0.05] animate-pulse" />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section label and heading */}
        <div className="mb-12">
          <p className="text-[10px] text-[var(--neon-cyan)] font-mono opacity-50 tracking-widest mb-3">// section_03.skills</p>
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">TECH</span>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-display uppercase">STACK</h2>
          </div>
        </div>
        
        {/* Skill Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Frontend */}
          <div className="terminal-card border-[var(--neon-cyan)]">
            <div className="flex items-center justify-between mb-4 border-b border-[hsl(220,16%,20%)] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-[rgba(0,255,224,0.1)] border border-[var(--neon-cyan)] text-[var(--neon-cyan)] px-2 py-1 rounded">[01]</span>
                <span className="text-sm font-bold text-[var(--neon-cyan)] uppercase">Frontend</span>
              </div>
              <span className="text-[9px] font-mono text-gray-500 uppercase">CLIENT_SIDE</span>
            </div>
            
            <div className="mb-4">
              {frontendSkills.map((skill, index) => (
                <SkillBar key={`${skill.category}-${index}`} skill={skill} delay={index * 100} color="cyan" />
              ))}
            </div>

            <div className="border-t border-[hsl(220,16%,20%)] pt-3 mt-3">
              <div className="h-0.5 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-cyan)] to-transparent mb-2" />
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">_SKILLS_LOADED</p>
            </div>
          </div>

          {/* Backend */}
          <div className="terminal-card border-[var(--neon-purple)]">
            <div className="flex items-center justify-between mb-4 border-b border-[hsl(220,16%,20%)] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-[rgba(168,85,247,0.1)] border border-[var(--neon-purple)] text-[var(--neon-purple)] px-2 py-1 rounded">[02]</span>
                <span className="text-sm font-bold text-[var(--neon-purple)] uppercase">Backend</span>
              </div>
              <span className="text-[9px] font-mono text-gray-500 uppercase">SERVER_SIDE</span>
            </div>
            
            <div className="mb-4">
              {backendSkills.map((skill, index) => (
                <SkillBar key={`${skill.category}-${index}`} skill={skill} delay={index * 100} color="purple" />
              ))}
            </div>

            <div className="border-t border-[hsl(220,16%,20%)] pt-3 mt-3">
              <div className="h-0.5 bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-purple)] to-transparent mb-2" />
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">_SKILLS_LOADED</p>
            </div>
          </div>

          {/* DevOps */}
          <div className="terminal-card border-[var(--neon-green)]">
            <div className="flex items-center justify-between mb-4 border-b border-[hsl(220,16%,20%)] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-[rgba(57,255,20,0.1)] border border-[var(--neon-green)] text-[var(--neon-green)] px-2 py-1 rounded">[03]</span>
                <span className="text-sm font-bold text-[var(--neon-green)] uppercase">DevOps</span>
              </div>
              <span className="text-[9px] font-mono text-gray-500 uppercase">TOOLCHAIN</span>
            </div>
            
            <div className="mb-4">
              {devopsSkills.map((skill, index) => (
                <SkillBar key={`${skill.category}-${index}`} skill={skill} delay={index * 100} color="green" />
              ))}
            </div>

            <div className="border-t border-[hsl(220,16%,20%)] pt-3 mt-3">
              <div className="h-0.5 bg-gradient-to-r from-[var(--neon-green)] via-[var(--neon-green)] to-transparent mb-2" />
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">_SKILLS_LOADED</p>
            </div>
          </div>
        </div>

        {/* Supplementary Skills */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-[var(--neon-cyan)] font-mono opacity-50 tracking-widest mb-4">// also_familiar_with</p>
          <div className="flex flex-wrap gap-2">
            {otherSkills.map((skill, index) => (
              <span 
                key={skill} 
                className="tech-badge animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
