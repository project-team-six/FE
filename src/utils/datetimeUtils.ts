export function dateTimeUtils(dateTime: Date): string {
	return dateTime.toISOString().split("T")[0];
}
