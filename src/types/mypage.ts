export type MyPageAPIResponse = {
    data: {
        mannerTemparature: Number;
        nickname: string;
        pinedPosts: [];
        profileImageUrl: string;
        userPosts: [];
    };
};

export type MyPageEditAPIResponse = {
    data: {
        id: number;
        nickname: string;
        password: string;
        phonenumber: number;
        profileimageurl: string;
        templates: number;
        MyPostList: [];
        PinedPostList: [];
    };
};
