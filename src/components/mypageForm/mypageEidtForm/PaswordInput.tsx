import React from 'react'
import Input from "../../../theme/Input";

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
        message={ password && !/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? "비밀번호는 최소 하나의 소문자, 숫자 및 특수문자(!@#$%^&*)가 포함된 8자리 이상이어야 합니다." : ""}
        width={35}
      />

      <Input
        label="비밀번호 확인"
        type='password'
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
        pattern="^(^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$"
        message={ confirmPassword && password!==confirmPassword ? "비밀번호가 일치하지 않습니다." : ""}
        width={35}
        placeholder="비밀번호를 다시 입력해주세요."
      />
    </>
  )
}

export default PasswordInput