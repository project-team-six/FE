export function deleteToken(key: string) {
	sessionStorage.removeItem(key);
}
