import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NetlifySite {
  id: string;
  name: string;
  url: string;
  custom_domain: string | null;
  screenshot_url: string | null;
  created_at: string;
  updated_at: string;
  published_deploy: {
    title: string | null;
    created_at: string;
    framework: string | null;
  } | null;
  build_settings: {
    repo_url: string | null;
  } | null;
}

const fetchNetlifySites = async (): Promise<NetlifySite[]> => {
  return [];
};

export const useNetlifySites = () => {
  return useQuery({
    queryKey: ['netlify-sites'],
    queryFn: fetchNetlifySites,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
};
