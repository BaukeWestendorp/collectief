<script>
	import '$lib/style/main.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	const userDisplayName = 'Bauke';

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
	<nav>
		<a href="/">Home</a>
	</nav>

	<div>
		{#if session}
			<a href="/private">{userDisplayName}</a>
			<button onclick={logOut}>Log out</button>
		{:else}
			<a href="/auth/login">Log in</a>
		{/if}
	</div>
</header>

{@render children()}

<style>
	header {
		padding: 1rem;
		border: 1px solid black;

		display: flex;
		justify-content: space-between;
	}
</style>
