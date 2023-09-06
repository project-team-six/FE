export function deleteToken(key: string) {
	sessionStorage.removeItem("accessToken");
	sessionStorage.removeItem("refreshToken");
	sessionStorage.removeItem("isFirstLogin");
}
