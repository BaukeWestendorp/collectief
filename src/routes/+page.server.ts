import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, depends }) => {
	depends('supabase:db:photos');

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

			const { data: userData, error } = await supabase
				.from('userdata')
				.select('display_name')
				.eq('id', userId)
				.single();
			if (error) {
				console.error(`Failed to get user display name: ${error}`);
			}
			const userDisplayName = userData?.display_name ?? '[Unknown User]';
			return { ...photo, url, userDisplayName };
		})
	);

	return { recentPhotos };
};
