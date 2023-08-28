export type Post = {
  id: string;
  location: string;
  createdAt: string;
  imageUrlList: string;
  title: string;
  content: string;
  price: string;
};

export type MypageEditType = {
  nickName : string,
  password : string,
  phoneNumber : string
}