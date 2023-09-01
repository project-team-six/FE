import { useQuery } from "react-query";
import { fetchChatRoom } from "../api/chatApi";

const useRoomQuery = (selectChat: string) => {
    const { data: roomInfo } = useQuery(["room"], ()=> fetchChatRoom(selectChat)); 
    return roomInfo;
}

export default useRoomQuery;