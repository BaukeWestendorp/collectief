export function safeProfileDisplayName(unsafeDisplayName: string | null | undefined): string {
	return unsafeDisplayName ?? '[Unknown User]';
}
