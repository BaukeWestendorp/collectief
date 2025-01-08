<script lang="ts">
	import { enhance } from '$app/forms';

	let fileInputElement: HTMLInputElement;
	let fileUrl: string | null = null;

	function updateFileUrl() {
		if (!fileInputElement.files || fileInputElement.files.length === 0) return;

		const file = fileInputElement.files[0];
		fileUrl = file ? URL.createObjectURL(file) : null;
	}
</script>

<h2>Add a photo</h2>

<form method="POST" action="/api/photo" enctype="multipart/form-data" use:enhance>
	<label>
		Title *
		<input name="title" type="text" required />
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
		Photo *
		<div class="file-picker">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div onclick={() => fileInputElement.click()} class="drop-field">
				<span class="note">Browse to select an image</span>
				<button aria-label="Select file">
					<span>Select File</span>
				</button>

				{#if fileUrl}
					<img class="preview-image" src={fileUrl} alt="Preview of the selected file" />
				{/if}
			</div>

			<input
				bind:this={fileInputElement}
				onchange={updateFileUrl}
				accept="image/jpeg,image/jpg"
				type="file"
				hidden
				name="file"
			/>
		</div>
	</label>

	<button type="submit">Upload</button>
</form>

<style>
	h2 {
		margin-bottom: 1rem;
	}

	.file-picker {
		width: 100%;
		padding: 0;
	}

	.file-picker .note {
		font-size: 14px;
		color: var(--c-secondary);
	}

	.file-picker .drop-field {
		border: 1px dashed var(--c-accent);
		border-radius: 3px;
		padding: 0.5em;
		height: 100%;

		cursor: pointer;

		display: flex;
		gap: 1rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.file-picker .preview-image {
		width: 100%;

		border-radius: 3px;
	}
</style>
