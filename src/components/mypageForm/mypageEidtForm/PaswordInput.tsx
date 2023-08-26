import React from 'react'
import * as S from './MypageEditStyle'
import Input from "../../../theme/Input";
import { pwIcon } from "../../../asstes/asstes";

interface PasswordInputProps{
  password:string;
  setPassword:(value:string)=>void;
  confirmPassword:string;
  setConfirmPassword:(value:string) => void;
}

const PasswordInput:React.FC<PasswordInputProps> = ({password, setPassword, confirmPassword, setConfirmPassword}) => {
  return (
    <>
    {/* 비밀번호 수정 */}
      <Input
        label="비밀번호"
        type='password'
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        placeholder='새로운 비밀번호를 입력해주세요.'
        pattern="^(^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$"
        message={ password && !/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? "비밀번호는 최소 하나의 소문자, 숫자 및 특수문자(!@#$%^&*)가 포함되어야 합니다." : ""}
        width={30}
        icon={pwIcon}
      />

      <Input
        label="비밀번호 확인"
        type='password'
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
        // onBlur={passwordMismatch}
        pattern="^(^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$"
        message={ confirmPassword && !/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(confirmPassword) ? "비밀번호가 " : ""}
        width={30}
        icon={pwIcon}
        placeholder="비밀번호를 다시 입력해주세요."
      />
    </>
  )
}

export default PasswordInput