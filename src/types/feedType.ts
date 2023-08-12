export type feedInitialValue = {
    title: string;
    content: string;
    category: string;
    price: string;
    transactionStartDate: string;
    transactionEndDate: string;
    consumerPeriod: string;
    purchaseDate: string;
    images: [];
};

export type feedType = {
    title: string;
    content: string;
    category: string;
    price: string;
    transactionStartDate: string;
    transactionEndDate: string;
    consumerPeriod: string;
    purchaseDate: string;
};

export type locationType = {
    sido: string; // 시도
    sigungu: string; // 시군구
    dong: string; // 읍/면/동
}

export type selectOptionType = {
    value: string;
    label: string;
}