import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies, depends }) => {
	depends('supabase:auth');
	depends('supabase:db:profiles');

	const { session } = await safeGetSession();

	return {
		session,
		cookies: cookies.getAll()
	};
};
