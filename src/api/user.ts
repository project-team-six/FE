import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const getMyPage = async (userId: Number) => {
  const res = await instance.get(`auth/mypage/${userId}`);
  console.log("요청 성공", res);
  return res.data;
};

export const putMyPageEdit = async (
  userId: Number,
  nickname: string,
  password: string,
  phoneNumber: string,
  token: string
) => {
  try {
    const data = {
      nickname,
      password,
      phoneNumber,
    };

    const request = await instance.put(`auth/mypage/${userId}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log("PUT 요청성공", request);
    return request.data;
  } catch (error) {
    console.log("PUT 요청실패", error);
  }
};

export const putMyPageEditImage = async (
  userId: Number,
  formData: FormData,
  token: string
) => {
  try {
    const request = await instance.put(
      `auth/mypage/${userId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    console.log("PUT 요청성공", request);
    return request;
  } catch (error) {
    console.log("PUT 요청실패", error);
  }
};
