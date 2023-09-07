export function saveToken(key: string, token: string) {
    if (token.trim() === "") return false;

    sessionStorage.setItem(key, token); // 세션에 토큰 저장
	return true;
}