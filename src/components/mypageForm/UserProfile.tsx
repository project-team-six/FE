import { profileImg } from "../../asstes/asstes";
import styled from "styled-components";
import { Flex } from "../common/GlobalStyle";

const UserProfile = ({ profileUrl }: { profileUrl: string }) => {
	return (
		<ProfileImg>
			<div>
				{profileUrl === "nonImage" ? (
					<img src={profileImg} alt='기본 프로필이미지' />
				) : (
					<img src={profileUrl} alt='업로드된 이미지' />
				)}
			</div>
		</ProfileImg>
	);
};

export default UserProfile;

const ProfileImg = styled.section`
	max-width: 295px;
	min-width: 170px;
	width: 100%;
	min-width: 140px;
	height: 100%;
	${Flex}
	img {
		width: 120px;
		height: 120px;
		border-radius: 100%;
	}
`;
