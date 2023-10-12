import { profileImg } from "../../../../asstes/asstes";
import styled from "styled-components";
import { Flex } from "../../../common/GlobalStyle";

const UserProfile = ({ profileUrl }: { profileUrl: string }) => {
    return (
        <ProfileImgSection>
			<div>
				{profileUrl === "nonImage" ? (
					<img src={profileImg} alt="기본 프로필이미지" />
				) : (
					<img src={profileUrl} alt="업로드된 이미지" />
				)}
			</div>
		</ProfileImgSection>
    )
}
export default UserProfile;

const ProfileImgSection = styled.section`
	max-width: 295px;
	min-width: 120px;
	width: 100%;
	height: 100%;
	${Flex};
	img {
		object-fit:cover;
		width: 120px;
		height: 120px;
		border-radius: 100%;
	}
	@media (max-width:600px){
		img{width:80px;
		height:80px;}
	}
`;