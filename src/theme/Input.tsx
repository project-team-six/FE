import React, { ChangeEvent } from 'react'
import { InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";

interface InputProps {
	label: string; //닉네임 이메일 패스워드
	icon: string;  // input 태그 아이콘
	type: string; // input 태그 종류 (text, password) 
	value: string; // input 태그 value 
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void; // input 태그 함수
	width: Number; // input 태그 넓이
	placeholder: string; // 안내 메시지
	message: string; // 오류 메세지
}

const Input: React.FC<InputProps> = ({ label, icon, type, value, handleChange, width, placeholder, message }: InputProps) => {
	return  (
		<div> 
			{message.trim() === "" ?
			(<StyledTextField
					className="outlined-start-adornment"
					label={label}
					type={type}
					sx={{ m: 1, width: `${width}ch`}}
					InputProps={{
					startAdornment: <InputAdornment position="start">
						<img src={icon} alt="icon"/></InputAdornment>,
						sx: {borderRadius:"10px"}		
					}}
					value={value}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e)}}
					placeholder={placeholder}

				/>)
			: (
				<StyledTextField
					error
					className="outlined-error-helper-text"
					label={label}
					type={type}
					sx={{ m: 1, width: `${width}ch`}}
					InputProps={{
						startAdornment: <InputAdornment position="start">
						<img src={icon} alt="icon"/></InputAdornment>,
						sx: {borderRadius:"10px"}	
					}}
					helperText={message}
					value={value}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e)}}
				/>)
			}
		</div>
	);
};
export default Input;

const StyledTextField = styled(TextField)`
	::placeholder {
		font-size: 11px;
	}
`;