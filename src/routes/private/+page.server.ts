import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:photos');
	const { data: photos } = await supabase.from('photos').select('id,title').order('id');
	return { photos: photos ?? [] };
};
