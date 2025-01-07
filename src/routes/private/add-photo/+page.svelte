<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="/api/photo" enctype="multipart/form-data" use:enhance>
	<label>
		Title
		<input name="title" type="text" required />
	</label>
	<label>
		Alt-text
		<textarea name="alt"></textarea>
	</label>
	<label>
		Date
		<input name="date" type="date" required />
	</label>
	<label>
		Photo
		<input name="file" type="file" accept=".jpg,.jpeg" required />
	</label>
	<button type="submit">Upload</button>
</form>

<style>
	form {
		width: 100%;
		max-width: 24rem;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
