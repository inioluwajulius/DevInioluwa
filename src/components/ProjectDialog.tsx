
import React from 'react';
import { Project } from '@/types/project';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import ProjectForm from './ProjectForm';

interface ProjectDialogProps {
  open: boolean;
  project?: Project;
  onOpenChange: (open: boolean) => void;
  onSubmit: (project: Omit<Project, 'id'> | Project) => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ 
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {project 
              ? 'Make changes to your project here.' 
              : 'Fill in the details to add a new project to your portfolio.'}
          </DialogDescription>
        </DialogHeader>
        
        <ProjectForm 
          project={project} 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
