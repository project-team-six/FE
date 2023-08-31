import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchMyChatRoom, deleteChatRoom } from "../../api/chatApi";
import { chatRoomType } from "../../types/chatType";
import ChatDetailModal from "./chatDetailForm/ChatDetailModal"
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import * as S from "./style";
import { chatClose, profileImg, chatDelete } from "../../asstes/asstes";

const ChatListModal = ({modalState, modalHandle}: {modalState: boolean, modalHandle: (value: boolean) => void}) => {
    // 상세 페이지
    const [isDetail, setIsDetail] = useState<boolean>(false);
    const [selectChat, setSeleteChat] = useState<string>("");
    const handleClickChat = (roomId: string) => {
        setSeleteChat(roomId);
        setIsDetail(!isDetail);
    };

    // 내 채팅방 조회
    const { data: myRooms, isLoading, isError } = useQuery(["myRooms"], fetchMyChatRoom);
    
    // 채팅방 삭제
    const queryClient = useQueryClient();
    const handleClickDeleteBtn = (roomId: string) => {
        deleteChatRoom(roomId).then(()=>{
            queryClient.invalidateQueries(["myRooms"]);
        });
    };

    if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

    return (
        <div>
            {modalState && myRooms &&
                <S.ModalLayout>
                    <S.ChatLayout>
                        <S.HeaderSection>
                            <S.HeaderDiv><S.Span fontSize={17} fontWeight="700">채팅 목록</S.Span></S.HeaderDiv>
                            <S.HeaderButton onClick={() => modalHandle(!modalState)}><S.CloseImg src={chatClose} alt="close"/></S.HeaderButton>
                        </S.HeaderSection>
                        <S.ContentSection>
                            <ul>
                                {myRooms.data.map((r: chatRoomType) => {
                                    const time = formatRelativeTime(r.lastMessageTime); // 시간 변환
                                    console.log(r.name)
                                    return (
                                        <S.Li key={r.roomId}>
                                            <S.LiButton onClick={() => handleClickChat(r.roomId)}>
                                                <S.ProfileImg src={r.titleImageUrl !== null ? r.titleImageUrl : profileImg} alt="profile"/>
                                                <S.Section>
                                                    <S.SpanDiv>
                                                        <S.TitleDiv><S.Span fontSize={15} fontWeight="700" MarginRight={10}>{r.name}</S.Span></S.TitleDiv>
                                                        <S.Span fontSize={10} fontWeight="400" fontColor="B1B1B1">{time}</S.Span>
                                                    </S.SpanDiv>
                                                    <S.ContentDiv><S.Span fontSize={12} fontWeight="500" fontColor="7C7C7C">{r.lastMessage}</S.Span></S.ContentDiv>
                                                </S.Section>
                                            </S.LiButton>
                                            <S.DeleteButton onClick={()=>handleClickDeleteBtn(r.roomId)}><img src={chatDelete} alt="chatDelete"/></S.DeleteButton>
                                        </S.Li>
                                    )
                                })}
                            </ul>
                        </S.ContentSection>
                    </S.ChatLayout>
                    {selectChat && <ChatDetailModal roomId={selectChat} isFeed={false} modalState={isDetail} modalHandle={setIsDetail} preModalState={modalState} setPreModalState={modalHandle}/>}
                </S.ModalLayout>
            }
        </div>
    )
}

export default ChatListModal;