import type { RequestHandler } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    throw error(400, 'Missing slug');
  }

  const { data, error: dbError } = await supabase
    .from('links')
    .select('id, target_url, clicks')
    .eq('slug', slug)
    .maybeSingle();

  if (dbError) {
    console.error('Error fetching link by slug:', dbError);
    throw error(500, 'Failed to resolve link');
  }

  if (!data) {
    throw error(404, 'Link not found');
  }

  // Increment click count (fire and forget, don't block the redirect)
  supabase
    .from('links')
    .update({ clicks: (data.clicks ?? 0) + 1 })
    .eq('id', data.id)
    .then(() => {
      // Success, do nothing
    }, (err) => {
      // Error handler as second argument to .then()
      console.error('Failed to increment clicks:', err);
    });

  // Redirect to the destination URL
  throw redirect(302, data.target_url);
};