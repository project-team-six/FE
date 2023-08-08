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
  userId: Number;
  nickName: string;
  password: string;
  phoneNumber: string;
  token: string;
};
