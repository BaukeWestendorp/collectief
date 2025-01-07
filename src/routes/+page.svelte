<script>
	let { data } = $props();
	let { recentPhotos } = $derived(data);
</script>

<div class="images">
	{#each recentPhotos as photo}
		<div class="image">
			<h2>{photo.title}</h2>
			<img src={photo.url} alt={photo.alt} />
			<p>{photo.alt}</p>
			<p>{photo.date}</p>
			<p>{photo.userDisplayName}</p>
		</div>
	{/each}
</div>

<style>
	.images {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: var(--spacing);
		gap: var(--spacing);
	}

	.image {
		width: 400px;
		max-width: 100%;
	}

	img {
		width: 100%;
	}
</style>
