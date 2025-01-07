import type { PageServerLoad } from './$types';
import { safeProfileDisplayName } from '$lib/utils';
import type { Tables } from '$lib/database.types';

export const load: PageServerLoad = async ({ locals: { supabase }, depends, fetch }) => {
	depends('supabase:db:photos');
	depends('supabase:db:profiles');

	const response = await supabase
		.from('photos')
		.select('id, title, alt, date, user_id')
		.order('date');
	const photos = response.data ?? [];
	if (response.error) {
		console.error(`Failed to get photos: ${response.error}`);
		return { recentPhotos: [] };
	}

	const recentPhotos = await Promise.all(
		photos.map(async (photo) => {
			const photoId = photo.id;
			const userId = photo.user_id;

			const {
				data: { publicUrl: url }
			} = supabase.storage.from('photos').getPublicUrl(`${userId}/${photoId}.jpg`);

			const profile: Tables<'profiles'> = await (await fetch(`/api/profile/${userId}`)).json();
			const userDisplayName = safeProfileDisplayName(profile.display_name);

			return { ...photo, url, userDisplayName };
		})
	);

	return { recentPhotos };
};
