export function getToken(key: string): string {
    // 저장되어 있는 token 값 가져오기
    const token = sessionStorage.getItem(key);
	return token && token.trim() !== "" ? token : "";
}