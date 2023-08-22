import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

const ChatRoomDetail = () => {
    const { id } = useParams();
    const roomId = id ? id.toString() : '';

    // 연결
    const client = useRef<CompatClient | null>(null); // 초기값은 null로 설정

    useEffect(() => {
        const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

        // SockJS 연결 생성
        const socket = new SockJS("https://soubun2.shop/ws-stomp");

        // Stomp 클라이언트 생성 및 연결
        const stompClient = Stomp.over(socket);

        stompClient.connect(
            {
                Authorization: accessToken,
            },
            () => {
                // 특정 채팅 방에 구독
                client.current = stompClient;
                client.current.subscribe(
                    `/sub/chat/room/${roomId}`,
                    (msg) => {
                        const receivedMessage = JSON.parse(msg.body);
                        // TODO: receivedMessage를 상태에 추가하는 등의 처리
                    },
                    {
                        Authorization: accessToken,
                        simpDestination: roomId,
                    }
                );
            }
        );

        return () => {
            // 컴포넌트가 언마운트되면 연결 종료
            if (client.current) {
                client.current.disconnect();
            }
        };
    }, [roomId]);

    return (
        <div>
            {/* 채팅 화면 렌더링 등 */}
        </div>
    );
};

export default ChatRoomDetail;