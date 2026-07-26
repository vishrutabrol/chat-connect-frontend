export interface Message {
  id: string;
  content: string;
  roomId: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  content: string;
}
