import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { id }, locals: { supabase } }) => {
	if (!id) return error(400, 'Missing photo_id');

	const { data: photo, error: supabaseError } = await supabase
		.from('photos')
		.select()
		.eq('id', id)
		.single();

	if (supabaseError) {
		console.error('Failed to get photo: ' + supabaseError.message);
		return error(500, 'Error getting photo');
	}

	return json(photo);
};
