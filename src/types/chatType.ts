export type chatRoomType = {
    name: string;
    roomId: string;
    userCount: number;
};

export type chatRoomMessageType = {
    createdAt: string;
    modifiedAt: string;
    roomId: string;
    imageUrl: string;
    message: string;
    messageId: number;
    sender: string;
    type: string;
    userCount: number;
};