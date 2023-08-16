export type MyPageAPIResponse = {
  data: {
    mannerTemparature: number;
    nickname: string;
    pinedPosts: [];
    profileImageUrl: string;
    userPosts: [];
  };
};

export type MyPageEditAPIResponse = {
  userId: number;
  nickName: string;
  password: string;
  phoneNumber: string;
  token: string;
};