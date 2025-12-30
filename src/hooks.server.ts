import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const userId = event.cookies.get('hc_session'); // <- was 'user_id'

    event.locals.userId = userId ?? null;

    if (event.url.pathname.startsWith('/dashboard') && !event.locals.userId) {
        throw redirect(302, '/auth/login');
    }

    return resolve(event);
};