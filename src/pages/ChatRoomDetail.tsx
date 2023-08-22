import { useParams } from "react-router";
import ChatRoomForm from "../components/chatRoomForm/ChatRoomForm";

const ChatRoomDetail = () => {
    const { id } = useParams();
    const roomId = id ? id.toString() : "";

    return <ChatRoomForm roomId={roomId}/>;
};

export default ChatRoomDetail;