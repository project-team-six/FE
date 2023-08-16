export const convertTimeFormat = (date: string) => {
    // 빈문자열인 경우 바로 return
    if (date.trim() === "") return "";

    const d = new Date(date); // Date 타입으로 변경

    // 시
    const hours = d.getHours();
    let [slot, hour] = ["AM", hours]; // 구조분해 할당 (기본 값: 오전)
    if (hours > 12) { // 오후인 경우 아래 값으로 변경
        slot = "PM";
        hour = hours - 12;
    }

    // 분
    const minutes = d.getMinutes().toString();
    const minute = (minutes.length === 1) ? "0" + minutes : minutes; // 분이 일의 자리인 경우 십의 자리로 변경

    return `${d.getFullYear()}.${d.getMonth()}.${d.getDate()} ${hour}:${minute} ${slot}`;
};