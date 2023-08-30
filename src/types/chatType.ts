export type chatRoomType = {
    name: string;
    roomId: string;
    userCount: number;
    titleImageUrl: string;
    participants: string[];
    lastMessage: string;
    lastMessageSender: string;
    lastMessageSenderProfileImageUrl: string;
    lastMessageTime: string;
};

export type chatRoomMessageType = {
    createdAt: string;
    modifiedAt: string;
    roomId: string;
    imageUrl: string;
    message: string;
    messageId: number;
    profileImageUrl: string;
    sender: string;
    type: string;
    userCount: number;
};