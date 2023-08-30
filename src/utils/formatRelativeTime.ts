export function formatRelativeTime(value: string) {
    if (value === null || value.trim() === "") return "";
    
    const currentDate: Date = new Date(); // 현재 시간
    const temp: Date = new Date(value); // 데이터가 생성된 시간
    const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - temp.getTime()) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours}시간 전`;
    }
  
    return temp.toLocaleString();
}