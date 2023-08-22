import { CompatClient } from "@stomp/stompjs";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";

const ChatRoomInputForm = ({client, token, roomId}: {client: React.MutableRefObject<CompatClient | undefined >, token: string, roomId: string}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) };

    const queryClient = useQueryClient();
    const handleSendMsg = () => {
        if (client.current && inputValue.trim() !== "") {
            client.current!.send('/pub/chat/message', {Authorization: token}, JSON.stringify({type:"TALK" ,roomId: roomId, message: inputValue}));
            queryClient.invalidateQueries(["messageList"]);
            setInputValue("");
        }
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange}/>
            <button onClick={() => handleSendMsg()}>전송</button>
        </div>
    )
}

export default ChatRoomInputForm;