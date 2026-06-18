
import React from 'react';
import { Project } from '@/types/project';
import { 
  Drawer, 
  DrawerContent, 
  DrawerDescription, 
  DrawerHeader, 
  DrawerTitle 
} from "@/components/ui/drawer";
import ProjectForm from './ProjectForm';

interface ProjectDrawerProps {
  open: boolean;
  project?: Project;
  onOpenChange: (open: boolean) => void;
  onSubmit: (project: Omit<Project, 'id'> | Project) => void;
}

const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ 
  open, 
  project, 
  onOpenChange,
  onSubmit 
}) => {
  const handleSubmit = (projectData: Omit<Project, 'id'> | Project) => {
    onSubmit(projectData);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>{project ? 'Edit Project' : 'Add New Project'}</DrawerTitle>
          <DrawerDescription>
            {project 
              ? 'Make changes to your project here.' 
              : 'Fill in the details to add a new project to your portfolio.'}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 pb-4">
          <ProjectForm 
            project={project} 
            onSubmit={handleSubmit} 
            onCancel={() => onOpenChange(false)} 
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
