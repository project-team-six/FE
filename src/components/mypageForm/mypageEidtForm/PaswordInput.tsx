import React from 'react'
import TextInputForm from "../../common/textInputForm/TextInputForm";

interface PasswordInputProps{
  password:string;
  setPassword:(value:string)=>void;
  confirmPassword:string;
  setConfirmPassword:(value:string) => void;
}

const PasswordInput:React.FC<PasswordInputProps> = ({password, setPassword, confirmPassword, setConfirmPassword}) => {
  return (
    <div>
      {/* 비밀번호 수정 */}
      <TextInputForm label="비밀번호" type="password" value={password} handleChange={(e) => setPassword(e.target.value)} msg="" placeholder="새로운 비밀번호를 입력해주세요." />
      {/* 비밀번호 수정 */}
      <TextInputForm label="비밀번호 확인" type="password" value={confirmPassword} handleChange={(e) => setConfirmPassword(e.target.value)} msg="" placeholder="비밀번호를 다시 입력해주세요."/>
    </div>
  )
}

export default PasswordInput