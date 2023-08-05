export type findPwType = {
    username: string; // 이름
    phoneNumber: string; // 전화번호
    email: string; // 이메일
};

export type findIdType = Omit<findPwType, "email">;