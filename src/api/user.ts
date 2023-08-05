import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const getMyPage = async (id: number) => {
  const res = await instance.get(`auth/mypage/${id}`);
  console.log("요청 성공", res);
  return res.data;
};

export const putMyPageEdit = async (userId: string) => {
  const res = await instance.put(`auth/mypage/${userId}}`, {});
  console.log("요청성공", res.data);
  return res.data;
};
