export const priceUtils = (price: string): string => {
    // 빈문자열인 경우 바로 return
    if (price.trim() === "") return "";


    let unit = "";
    // 가격이 숫자인지 아닌지 확인 후 숫자면 뒤에 "원"을 넣어줌
    if (/^[0-9]+$/.test(price)) {
        unit = "원";
        price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return `${price} ${unit}`;
}