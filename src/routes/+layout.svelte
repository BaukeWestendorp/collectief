<script>
	import '$lib/style/main.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase, userDisplayName } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const logOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			invalidate('supabase:auth');
		}
	};
</script>

<header>
	<a href="/"><h1>Collectief</h1></a>

	<div class="account">
		{#if session}
			<a href="/private">{userDisplayName}</a>
			<button onclick={logOut}>Log out</button>
		{:else}
			<a href="/auth/login">Log in</a>
		{/if}
	</div>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-bottom: 1rem;
		margin-bottom: 1rem;

		border-bottom: 1px dashed var(--c-accent);
	}

	header .account {
		display: flex;
		gap: 1em;
		align-items: center;
	}
</style>
