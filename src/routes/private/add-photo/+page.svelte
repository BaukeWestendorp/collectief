<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="/api/photo" enctype="multipart/form-data" use:enhance>
	<label>
		Title
		<input name="title" type="text" />
	</label>
	<label>
		Alt-text
		<textarea name="alt"></textarea>
	</label>
	<label>
		Date
		<input name="date" type="date" />
	</label>
	<label>
		Photo
		<input name="file" type="file" accept=".jpg,.jpeg" />
	</label>
	<button type="submit">Upload</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;
	}
</style>
