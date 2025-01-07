import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase, session } }) => {
	const formData = await request.formData();
	const title = formData.get('title') as string;
	const alt = formData.get('alt') as string;
	const date = formData.get('date') as string;
	const file = formData.get('file') as File;

	if (!session) return error(401, 'User is not logged in');
	const userId = session.user.id;

	const { data: insertedPhoto, error: insertionError } = await supabase
		.from('photos')
		.insert({
			title,
			alt,
			date,
			user_id: userId
		})
		.select()
		.single();

	if (insertionError || !insertedPhoto) {
		console.error('Failed to add photo: ' + insertionError.message);
		return error(500, 'Error adding photo');
	}

	// TODO: Convert the photo.

	const fileName = `${userId}/${insertedPhoto.id}.jpg`;
	const { error: uploadError } = await supabase.storage.from('photos').upload(fileName, file);

	if (uploadError) {
		console.error('Failed to upload photo: ' + uploadError.message);
		return error(500, 'Error uploading photo');
	}

	return json(insertedPhoto);
};
