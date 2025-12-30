import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

function generateSlug(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.userId) {
    throw redirect(302, '/auth/login');
  }

  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.userId) {
      throw redirect(302, '/auth/login');
    }

    const data = await request.formData();
    const url = data.get('url');
    let slug = (data.get('slug') ?? '') as string;

    if (typeof url !== 'string' || url.trim().length === 0) {
      return fail(400, {
        error: 'Destination URL is required.',
        values: { url, slug }
      });
    }

    try {
      // basic URL validation
      new URL(url);
    } catch {
      return fail(400, {
        error: 'Please enter a valid URL (including https://).',
        values: { url, slug }
      });
    }

    if (typeof slug !== 'string') {
      slug = '';
    }
    slug = slug.trim() || generateSlug(7);

    const { error } = await supabase.from('links').insert({
      user_id: locals.userId,
      slug,
      target_url: url
    });

    if (error) {
      console.error('Supabase insert link error:', error);
      return fail(500, {
        error: 'Could not create link. Please try again.',
        values: { url, slug }
      });
    }

    throw redirect(302, '/dashboard');
  }
};