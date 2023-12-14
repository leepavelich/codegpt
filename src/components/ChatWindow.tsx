import { chatMessages } from "../signals/chatSignal";

const ChatWindow = () => {
  return (
    <div className="chat-window">
      {chatMessages.value.map((message: string, index: number) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default ChatWindow;
