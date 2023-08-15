import React from "react";
import styled from "styled-components";

const UserMannerTem = ({ mypage }: { mypage: any }) => {
    return (
        <Temperature>
            <h1>매너온도</h1>
            <div>
                <span
                    style={{
                        marginLeft: `${mypage?.data?.mannerTemperature-2}%`,
                    }}
                >
                    ▼{mypage?.data?.mannerTemperature}°C
                </span>
            </div>
            <ProgressBar>
            <Inner
                style={{
                    width: `${mypage?.data?.mannerTemperature}%`,
                }}
            ></Inner>
            </ProgressBar>
        </Temperature>
    );
};

export default UserMannerTem;

const Temperature = styled.div`
font-weight : 500;
width : 100%;
margin: 35px 0;
span {display : inline-block; font-size : 12px;}
`

const ProgressBar = styled.div`
width : 100%;
border : 1px solid #333;
border-radius:25px;
/* margin : 10px auto; */
`

const Inner = styled.div`
width : 100%;
height : 20px;
background-color : #6F8A6B;
border-radius : 25px 0 0 25px;
`