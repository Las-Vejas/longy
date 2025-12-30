import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  if (!locals.userId) {
    throw redirect(302, '/auth/login');
  }

  // Fetch user info
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, slack_id, email, name, first_name, last_name, created_at')
    .eq('id', locals.userId)
    .single();

  if (userError || !user) {
    console.error('Fetch user error:', userError);
    throw redirect(302, '/dashboard');
  }

  // Fetch stats
  const { data: links } = await supabase
    .from('links')
    .select('clicks')
    .eq('user_id', locals.userId);

  const totalLinks = links?.length ?? 0;
  const totalClicks = links?.reduce((sum, link) => sum + (link.clicks ?? 0), 0) ?? 0;

  return {
    user: {
      ...user,
      avatarUrl: `https://cachet.dunkirk.sh/users/${user.slack_id}/r`
    },
    stats: {
      totalLinks,
      totalClicks
    }
  };
};

export const actions: Actions = {
  deleteAccount: async ({ locals, cookies }) => {
    if (!locals.userId) {
      throw redirect(302, '/auth/login');
    }

    // Delete all user's links first
    await supabase
      .from('links')
      .delete()
      .eq('user_id', locals.userId);

    // Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', locals.userId);

    if (error) {
      console.error('Delete account error:', error);
      return fail(500, { error: 'Failed to delete account' });
    }

    // Clear session
    cookies.delete('hc_session', { path: '/' });
    throw redirect(302, '/');
  }
};