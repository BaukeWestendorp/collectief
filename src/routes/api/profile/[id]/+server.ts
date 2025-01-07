import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { id }, locals: { supabase } }) => {
	if (!id) return error(400, 'Missing id');

	const { data: profile, error: supabaseError } = await supabase
		.from('profiles')
		.select()
		.eq('id', id)
		.single();

	if (supabaseError) {
		console.error('Failed to get profile: ' + supabaseError.message);
		return error(500, 'Error getting profile');
	}

	return json(profile);
};
