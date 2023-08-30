export function getToken(key: string) {
    const regex = new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`);
    const token = document.cookie.replace(regex, '$1');
	return token;
}