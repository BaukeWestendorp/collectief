<script>
	let { data } = $props();
	let { recentPhotos } = $derived(data);
</script>

<div class="images">
	{#each recentPhotos as photo}
		<div class="image">
			<img src={photo.url} alt={photo.alt} />
			<div class="info">
				<h2 class="title">{photo.title}</h2>
				<p class="alt">{photo.alt}</p>
				<div class="meta">
					<p>{photo.date}</p>
					<p>{photo.userDisplayName}</p>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.images {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.image {
	}

	.image .info {
		background: #f0f0f0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	.image .alt {
		font-style: italic;
		opacity: 0.8;
	}

	.image .meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		opacity: 0.5;
	}

	img {
		width: 100%;
	}
</style>
