<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	let { data } = $props();
	let { photos, supabase, user } = $derived(data);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const photo = (new FormData(form).get('photo') ?? '') as string;
		if (!photo) return;

		const { error } = await supabase.from('photos').insert({ photo });
		if (error) console.error(error);

		invalidate('supabase:db:photos');
		form.reset();
	};
</script>

<h1>Private page for user: {user?.email}</h1>
<h2>Photos</h2>
<ul>
	{#each photos as photo}
		<li>{photo.title}</li>
	{/each}
</ul>
<form onsubmit={handleSubmit}>
	<label>
		Add a photo
		<input name="photo" type="text" />
	</label>
</form>
