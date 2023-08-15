import React from "react";
import MypageEditForm from "../components/mypageForm/mypageEidtForm/MypageEditForm";
// import { userInfo } from "../components/mypageForm/UserInfo'

const MyPageEdit: React.FC = () => {

    //TODo 유효성 검사 로직 추가할 것
    // 유효성 검사 로직
    // 비밀번호
    // const validatePassword = (password: string) => {
    //   const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    //   return regex.test(password);
    // };
    // 핸드폰번호
    // const validatePhoneNumber = (PhoneNumber: string) => {
    //   const regex = /^010\d{8}$/;
    //   return regex.test(PhoneNumber);
    // };

    return (
        <MypageEditForm />
    );
};

export default MyPageEdit;
