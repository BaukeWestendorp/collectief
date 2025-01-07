<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
	<input name="title" type="text" />
	<textarea name="alt"></textarea>
	<input name="date" type="date" />
	<input name="file" type="file" accept=".jpg,.jpeg" />
	<button type="submit">Upload</button>
</form>
