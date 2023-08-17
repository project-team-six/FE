export type userType = {
    email: string,    // 이메일
    username: string, // 이름
    nickname: string, // 별명
    phoneNumber: string, // 전화번호
    password: string, // 비밀번호
    matchPin: string, // 비밀번호 확인
};

export type newUser = Omit<userType, "matchPin">;

export type textInfoType  = {
    kind: string;
    type: string;
    errorMsg: string;
    condition: string | RegExp; // 유효성 조건
}; 