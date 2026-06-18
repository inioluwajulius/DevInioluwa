
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '@/types/project';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects-v4');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      // Default projects
      const defaultProjects: Project[] = [
        {
          id: 1,
          title: "Hospital Management Dashboard",
          description: "A comprehensive hospital management dashboard with a backend and frontend architecture for managing patients, staff, and appointments.",
          image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
          tags: ["JavaScript", "React", "Node.js", "Express", "Vercel"],
          category: "fullstack",
          link: "https://hospotal-management.vercel.app"
        },
        {
          id: 2,
          title: "Hostel Housing Hub",
          description: "A centralized platform for finding, reviewing, and booking hostel accommodations seamlessly.",
          image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
          tags: ["TypeScript", "React", "Next.js"],
          category: "frontend",
          link: "https://github.com/inioluwajulius/hostelhousinghub"
        },
        {
          id: 3,
          title: "Modern Banking App",
          description: "An ultra-premium digital banking application interface built with Next.js, Plaid integration, and Appwrite backend to provide a seamless financial user experience.",
          image: "https://images.unsplash.com/photo-1501167733075-8bd2810842db",
          tags: ["TypeScript", "Next.js", "Tailwind CSS", "Appwrite", "Plaid"],
          category: "fullstack",
          link: "https://github.com/inioluwajulius/Banking"
        },
        {
          id: 4,
          title: "Instagram Clone",
          description: "A stunning full-stack Instagram replica featuring real-time user authentication, photo uploading, liking, masonry grids, and messaging functionalities.",
          image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
          tags: ["React", "Supabase", "Tailwind CSS", "Framer Motion", "Vite"],
          category: "fullstack",
          link: "https://github.com/inioluwajulius/instagram-clone"
        },
        {
          id: 5,
          title: "Vanilla Weather App",
          description: "A highly polished, dependency-free weather application featuring responsive glassmorphism, dynamic backgrounds, and live Open-Meteo API integrations.",
          image: "https://images.unsplash.com/photo-1592210454359-9043f067919b",
          tags: ["HTML5", "CSS3", "Vanilla JavaScript", "REST APIs", "Geolocation"],
          category: "frontend",
          link: "https://github.com/inioluwajulius/weather-app"
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio-projects-v4', JSON.stringify(defaultProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-projects-v4', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = { ...project, id: newId };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
