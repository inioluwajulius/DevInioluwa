import { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectDialog from './ProjectDialog';
import ProjectDrawer from './ProjectDrawer';
import { Project } from '@/types/project';
import { Pencil, Plus, Trash2, Github, ExternalLink, Star, GitFork, RefreshCw, Globe, Terminal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { useGitHubRepos, GitHubRepo } from '@/hooks/useGitHubRepos';
import { useNetlifySites, NetlifySite } from '@/hooks/useNetlifySites';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const languageColors: Record<string, string> = {
  JavaScript: 'var(--neon-green)',
  TypeScript: 'var(--neon-cyan)',
  HTML: 'var(--neon-purple)',
  CSS: '#3b82f6',
  Python: '#fbbf24',
  EJS: '#a3e635',
};

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { data: githubRepos, isLoading: isLoadingGH, refetch: refetchGH, dataUpdatedAt } = useGitHubRepos();
  const { data: netlifySites, isLoading: isLoadingNF, refetch: refetchNF } = useNetlifySites();
  const isLoading = isLoadingGH || isLoadingNF;
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal();

  const categories = [
    { id: 'all', name: 'All_Projects' },
    { id: 'github', name: 'GitHub' },
    { id: 'netlify', name: 'Netlify' },
    { id: 'manual', name: 'Custom' },
  ];

  const filteredManualProjects = filter === 'all' || filter === 'manual' ? projects : [];
  const filteredGitHubRepos = filter === 'all' || filter === 'github' ? (githubRepos || []) : [];
  const filteredNetlifySites = filter === 'all' || filter === 'netlify' ? (netlifySites || []) : [];

  const handleAddProject = () => {
    setSelectedProject(undefined);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteProject(project.id);
      toast({
        title: "Project Deleted",
        description: `"${project.title}" has been removed from your portfolio.`,
      });
    }
  };

  const handleProjectSubmit = (projectData: Omit<Project, 'id'> | Project) => {
    if ('id' in projectData) {
      updateProject(projectData as Project);
    } else {
      addProject(projectData);
    }
  };

  const handleRefresh = () => {
    refetchGH();
    refetchNF();
    toast({ title: "Refreshing", description: "Fetching latest repos and sites..." });
  };

  const ProjectModal = isMobile ? ProjectDrawer : ProjectDialog;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden border-t border-[hsl(220,16%,12%)]">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--neon-purple)] rounded-full blur-[150px] opacity-15 animate-float-delayed" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[var(--neon-cyan)] rounded-full blur-[150px] opacity-10 animate-float" />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section label and heading */}
        <div className="mb-8">
          <p className="text-[10px] text-[var(--neon-cyan)] font-mono opacity-50 tracking-widest mb-3">// section_04.projects</p>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">EXPLORE</span>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text font-display uppercase">MY_WORK</h2>
            </div>
            <button
              onClick={handleRefresh}
              className="text-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-colors p-2"
              title="Refresh data"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`font-mono text-xs uppercase px-4 py-2 border rounded transition-all ${
                filter === category.id 
                  ? 'border-[var(--neon-cyan)] bg-[rgba(0,255,224,0.1)] text-[var(--neon-cyan)] shadow-[0_0_10px_rgba(0,255,224,0.2)]' 
                  : 'border-[hsl(220,16%,20%)] text-gray-400 hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]'
              }`}
              onClick={() => setFilter(category.id)}
            >
              ./filter {category.name}
            </button>
          ))}
          
          <button
            onClick={handleAddProject}
            className="btn-neon ml-auto"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add_Project
          </button>
        </div>

        {/* GitHub Repos Section */}
        {filteredGitHubRepos.length > 0 && (
          <>
            {filter === 'all' && (
              <div className="flex items-center gap-2 mb-6 font-mono border-b border-[hsl(220,16%,16%)] pb-3">
                <Github className="h-4 w-4 text-[var(--neon-cyan)]" />
                <h3 className="text-sm text-[var(--neon-cyan)] uppercase tracking-wider">GITHUB_REPOS</h3>
                <span className="bg-[rgba(0,255,224,0.1)] border border-[var(--neon-cyan)] text-[var(--neon-cyan)] px-2 py-0.5 rounded text-xs ml-2 font-mono text-[10px]">
                  {filteredGitHubRepos.length}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredGitHubRepos.map((repo, index) => (
                <GitHubRepoCard key={repo.id} repo={repo} index={index} formatDate={formatDate} isVisible={isVisible} />
              ))}
            </div>
          </>
        )}

        {/* Netlify Sites Section */}
        {filteredNetlifySites.length > 0 && (
          <>
            {filter === 'all' && (
              <div className="flex items-center gap-2 mb-6 font-mono border-b border-[hsl(220,16%,16%)] pb-3">
                <Globe className="h-4 w-4 text-[var(--neon-green)]" />
                <h3 className="text-sm text-[var(--neon-green)] uppercase tracking-wider">NETLIFY_SITES</h3>
                <span className="bg-[rgba(57,255,20,0.1)] border border-[var(--neon-green)] text-[var(--neon-green)] px-2 py-0.5 rounded text-xs ml-2 font-mono text-[10px]">
                  {filteredNetlifySites.length}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredNetlifySites.map((site, index) => (
                <NetlifySiteCard key={site.id} site={site} index={index} formatDate={formatDate} isVisible={isVisible} />
              ))}
            </div>
          </>
        )}

        {/* Loading skeleton */}
        {isLoading && filter !== 'manual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="project-card bg-[hsl(220,16%,8%)] border-[hsl(220,16%,16%)] overflow-hidden animate-pulse">
                <div className="h-4 bg-[hsl(220,16%,16%)] m-6 rounded" />
                <div className="p-6"><div className="h-12 bg-[hsl(220,16%,16%)] rounded" /></div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Projects Section */}
        {filteredManualProjects.length > 0 && (
          <>
            {filter === 'all' && (
              <div className="flex items-center gap-2 mb-6 font-mono border-b border-[hsl(220,16%,16%)] pb-3">
                <Terminal className="h-4 w-4 text-[var(--neon-purple)]" />
                <h3 className="text-sm text-[var(--neon-purple)] uppercase tracking-wider">CUSTOM_PROJECTS</h3>
                <span className="bg-[rgba(168,85,247,0.1)] border border-[var(--neon-purple)] text-[var(--neon-purple)] px-2 py-0.5 rounded text-xs ml-2 font-mono text-[10px]">
                  {filteredManualProjects.length}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredManualProjects.map((project, index) => (
                <ManualProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  isVisible={isVisible}
                  onEdit={() => handleEditProject(project)}
                  onDelete={() => handleDeleteProject(project)}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {filteredManualProjects.length === 0 && filteredGitHubRepos.length === 0 && filteredNetlifySites.length === 0 && !isLoading && (
          <div className="terminal-card text-center py-12 mt-8">
            <p className="text-gray-400 font-mono text-sm mb-4">// no_projects_found</p>
            <button onClick={handleAddProject} className="btn-neon-solid">
              INIT new_project
            </button>
          </div>
        )}
      </div>

      <ProjectModal
        open={isProjectModalOpen}
        project={selectedProject}
        onOpenChange={setIsProjectModalOpen}
        onSubmit={handleProjectSubmit}
      />
    </section>
  );
};

const GitHubRepoCard = ({ repo, index, formatDate, isVisible }: { repo: GitHubRepo; index: number; formatDate: (d: string) => string; isVisible: boolean }) => {
  const langColor = repo.language ? languageColors[repo.language] || 'hsl(0 0% 60%)' : undefined;
  
  return (
    <div 
      className={`project-card bg-[hsl(220,16%,8%)] border-[hsl(220,16%,16%)] flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-1 w-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-cyan)] to-transparent" />
      
      <div className="flex-1 p-5 pb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white text-sm font-bold font-mono truncate mr-2">
            {repo.name}
          </h3>
          <Github className="h-4 w-4 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
        </div>
        <p className="line-clamp-2 text-xs text-gray-400 mt-2 font-mono">
          {repo.description || `> No description provided.`}
        </p>

        <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mt-4">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor, boxShadow: `0 0 5px ${langColor}` }} />
              <span>{repo.language}</span>
            </div>
          )}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-3">
          last_commit: {formatDate(repo.pushed_at)}
        </p>
      </div>

      <div className="flex gap-2 p-4 pt-0 border-t border-[hsl(220,16%,16%)]">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center font-mono text-xs py-2 border border-[hsl(220,16%,30%)] text-gray-400 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] rounded transition-colors flex items-center justify-center gap-1"
        >
          <Github className="h-3 w-3" />
          SOURCE
        </a>
        {repo.homepage && (
          <a 
            href={repo.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 btn-neon-solid text-xs py-2"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            DEMO
          </a>
        )}
      </div>
    </div>
  );
};

const NetlifySiteCard = ({ site, index, formatDate, isVisible }: { site: NetlifySite; index: number; formatDate: (d: string) => string; isVisible: boolean }) => {
  return (
    <div 
      className={`project-card bg-[hsl(220,16%,8%)] border-[hsl(220,16%,16%)] flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-1 w-full bg-gradient-to-r from-[var(--neon-green)] via-[var(--neon-green)] to-transparent" />

      {site.screenshot_url && (
        <div className="aspect-video overflow-hidden border-b border-[hsl(220,16%,16%)] relative">
          <img
            src={site.screenshot_url}
            alt={site.name}
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-500 opacity-70 hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,16%,8%)] to-transparent opacity-80"></div>
        </div>
      )}

      <div className="flex-1 p-5 pb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white text-sm font-bold font-mono truncate mr-2">
            {site.name}
          </h3>
          <Globe className="h-4 w-4 text-[var(--neon-green)] shrink-0 mt-0.5" />
        </div>
        <p className="text-xs text-gray-400 mt-2 font-mono">
          {site.published_deploy?.framework
            ? `> stack: ${site.published_deploy.framework}`
            : '> deployed: netlify'}
        </p>

        {site.custom_domain && (
          <p className="text-xs font-mono text-[var(--neon-green)] truncate mt-3">{site.custom_domain}</p>
        )}
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-2">
          last_deploy: {formatDate(site.updated_at)}
        </p>
      </div>

      <div className="flex gap-2 p-4 pt-0 border-t border-[hsl(220,16%,16%)]">
        <a 
          href={site.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 btn-neon-solid text-xs py-2"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          VISIT
        </a>
        {site.build_settings?.repo_url && (
          <a 
            href={site.build_settings.repo_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-center font-mono text-xs py-2 border border-[hsl(220,16%,30%)] text-gray-400 hover:text-[var(--neon-green)] hover:border-[var(--neon-green)] rounded transition-colors flex items-center justify-center gap-1"
          >
            <Github className="h-3 w-3" />
            SOURCE
          </a>
        )}
      </div>
    </div>
  );
};

const ManualProjectCard = ({ project, index, isVisible, onEdit, onDelete }: { project: Project; index: number; isVisible: boolean; onEdit: () => void; onDelete: () => void }) => {
  return (
    <div 
      className={`project-card bg-[hsl(220,16%,8%)] border-[hsl(220,16%,16%)] flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-1 w-full bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-purple)] to-transparent" />

      <div className="aspect-video relative overflow-hidden group border-b border-[hsl(220,16%,16%)]">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,16%,8%)] to-transparent opacity-60"></div>
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="h-8 w-8 bg-black/60 hover:bg-black text-[var(--neon-cyan)] border border-[var(--neon-cyan)] rounded flex items-center justify-center transition-colors"
            onClick={onEdit}
            title="Edit project"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            className="h-8 w-8 bg-black/60 hover:bg-red-900 border border-red-500 text-red-500 hover:text-red-300 rounded flex items-center justify-center transition-colors"
            onClick={onDelete}
            title="Delete project"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 pb-3">
        <h3 className="text-white text-sm font-bold font-display">{project.title}</h3>
        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag, i) => (
            <span key={i} className="tech-badge text-[10px]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-[hsl(220,16%,16%)]">
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full btn-neon-solid text-xs py-2 text-center block"
        >
          VIEW_PROJECT
        </a>
      </div>
    </div>
  );
};

export default Projects;
