import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('NETLIFY_API_TOKEN');
    if (!token) {
      throw new Error('NETLIFY_API_TOKEN is not configured');
    }

    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Netlify API error [${response.status}]: ${await response.text()}`);
    }

    const sites = await response.json();

    // Return only public-safe fields for portfolio display
    const simplified = sites.map((site: any) => ({
      id: site.id,
      name: site.name,
      url: site.ssl_url || site.url,
      custom_domain: site.custom_domain,
      screenshot_url: site.screenshot_url,
      created_at: site.created_at,
      updated_at: site.updated_at,
      published_deploy: site.published_deploy ? {
        title: site.published_deploy.title,
        created_at: site.published_deploy.created_at,
        framework: site.published_deploy.framework,
      } : null,
    }));

    return new Response(JSON.stringify(simplified), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching Netlify sites:', message);
    return new Response(JSON.stringify({ error: 'Failed to fetch sites' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
