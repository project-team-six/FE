// 게시물
export type feedInitialValue = {
    title: string;
    content: string;
    category: string;
    originPrice: string;
    price: string;
    transactionStartDate: string;
    transactionEndDate: string;
    consumerPeriod: string;
    purchaseDate: string;
    location: string;
    images: [];
};

export type feedType = {
    title: string;
    content: string;
    category: string;
    originPrice: string;
    price: string;
    transactionStartDate: string;
    transactionEndDate: string;
    consumerPeriod: string;
    purchaseDate: string;
};

export type feedTextType = { // 게시물 등록: 텍스트
    title: string;
    content: string;
    originPrice: string;
    price: string;
};

export type feedDateType = { // 게시물 등록: 날짜
    transactionStartDate: string;
    transactionEndDate: string;
    consumerPeriod: string;
    purchaseDate: string;
};

export type selectOptionType = { // 게시물 등록: 선택
    value: string;
    label: string;
}

export type locationType = { // 지역
    sido: string; // 시도
    sigungu: string; // 시군구
    dong: string; // 읍/면/동
}

// 댓글
export type commentPostType = {
    postId: number;
    commentContent: {
        content: string;
    };
}

export type commentEditType = commentPostType & {
    commentId: string;
};

export type commentDeleteType = Omit<commentEditType, "commentContent">;

export type commentType = {
    id: number;
    content: string;
    nickname: string;
    createdAt: string;
    profileImageUrl: string;
}