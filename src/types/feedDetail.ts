export type Detailtype = {
    title: string;
    nickname: string;
    content: string;
    createdAt: string;
    imageUrlList: [];
    pined: number;
    isPin: boolean;
    isComplete: boolean;
    veiws: number;
    commentConut: number;
};

export type commentList = {
    id: number;
    content: string;
    nickname: string;
    createdAt : string;
};
