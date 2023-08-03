import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function MyPageEdit() {
    const [imgUrl, setImgUrl] = useState<string>("");
    const imgRef = useRef(null);
    const navigate = useNavigate();

    // 클랙해서 수정하는 이벤트 만들기
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setImgUrl(imgUrl);
        } else {
        }
    };

    const submitHandler = () => {};

    return (
        <form>
            MyPageEdit
            <div>
                <h4>닉네임</h4>
                <input type="email" />
            </div>
            <div>
                <h4>비밀번호</h4>
                <input type="text" />
                {/* /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; */}
            </div>
            <div>
                <h4>전화번호</h4>
                <input type="phonenumber" />
            </div>
            <div>
                <h4>프로필 이미지</h4>
                <Avatar
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/jpg, image/png, image/jpeg"
                    name="profile_img"
                    ref={imgRef}
                />
                {imgUrl ? (
                    <img src={imgUrl} alt="업로드된 이미지" />
                ) : (
                    <span>{imgUrl}</span>
                )}
                <button>업로드</button>
                {/* <button
          onChange={() => {
            imgUrl("");
          }}
        >
          초기화
        </button> */}
            </div>
            <button onSubmit={submitHandler}>수정 완료</button>
        </form>
    );
}

export default MyPageEdit;

const Avatar = styled.input`
    /* display: none; */
`;
