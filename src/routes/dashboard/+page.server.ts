import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const load: PageServerLoad = async ({ locals }) => {
  // Require auth (should already be guarded in hooks, but double-check)
  if (!locals.userId) {
    throw redirect(302, '/auth/login');
  }

  const { data: links, error } = await supabase
    .from('links')
    .select('id, slug, target_url, created_at, clicks')
    .eq('user_id', locals.userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch links error:', error);
    // Fallback to empty list on error so the page still renders
    return {
      links: [],
      totalClicks: 0,
      topLink: null
    };
  }

  const allLinks = links ?? [];
  const totalClicks = allLinks.reduce((sum, link) => sum + (link.clicks ?? 0), 0);
  const topLink = allLinks.length > 0
    ? allLinks.reduce((prev, curr) => ((curr.clicks ?? 0) > (prev.clicks ?? 0) ? curr : prev))
    : null;

  return {
    links: allLinks,
    totalClicks,
    topLink
  };
};

export const actions: Actions = {
  delete: async ({ request, locals }) => {
    if (!locals.userId) {
      throw redirect(302, '/auth/login');
    }

    const data = await request.formData();
    const linkId = data.get('linkId');

    if (typeof linkId !== 'string' || !linkId) {
      return fail(400, { error: 'Invalid link ID' });
    }

    // Delete only if it belongs to this user
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', linkId)
      .eq('user_id', locals.userId);

    if (error) {
      console.error('Delete link error:', error);
      return fail(500, { error: 'Failed to delete link' });
    }

    return { success: true };
  }
};