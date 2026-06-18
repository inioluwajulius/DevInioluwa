
import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Omit<Project, 'id'> | Project) => void;
  onCancel: () => void;
}

const categoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'other', label: 'Other' }
];

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [image, setImage] = useState(project?.image || '');
  const [category, setCategory] = useState(project?.category || 'frontend');
  const [link, setLink] = useState(project?.link || '');
  const [tags, setTags] = useState(project?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({ 
        title: "Error", 
        description: "Project title is required", 
        variant: "destructive" 
      });
      return;
    }
    
    if (!description.trim()) {
      toast({ 
        title: "Error", 
        description: "Project description is required", 
        variant: "destructive" 
      });
      return;
    }
    
    if (!image.trim() || !isValidUrl(image)) {
      toast({ 
        title: "Error", 
        description: "Valid image URL is required", 
        variant: "destructive" 
      });
      return;
    }
    
    if (tags.length === 0) {
      toast({ 
        title: "Error", 
        description: "At least one tag is required", 
        variant: "destructive" 
      });
      return;
    }

    const projectData = {
      title,
      description,
      image,
      tags,
      category,
      link: link || '#',
    };

    if (project?.id) {
      onSubmit({ ...projectData, id: project.id });
    } else {
      onSubmit(projectData);
    }

    toast({
      title: project ? "Project Updated" : "Project Added",
      description: `"${title}" has been ${project ? "updated" : "added"} successfully.`
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {image && isValidUrl(image) && (
            <div className="mt-2 aspect-video w-full max-w-xs overflow-hidden rounded-md">
              <img src={image} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="link">Project Link (optional)</Label>
          <Input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        
        <div>
          <Label htmlFor="tags">Technologies/Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tag and press Enter"
            />
            <Button type="button" onClick={addTag}>Add</Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="rounded-full hover:bg-destructive/10 p-1"
                >
                  <X className="size-3" />
                  <span className="sr-only">Remove {tag}</span>
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {project ? 'Update Project' : 'Add Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
