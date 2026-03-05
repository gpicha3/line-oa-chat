import { Message } from "@/types/message";

export const MessageBubble = ({ msg, customerProfile }: { msg: Message, customerProfile?: string }) => {
  const isUser = msg.sender === 'user';
  
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-white">
        <img 
          src={isUser 
            ? "https://rocket.in.th/wp-content/uploads/2023/03/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B-Line-Official-Account.png" // รูป Admin
            : (customerProfile || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png") // รูปลูกค้า
          } 
          alt={msg.sender} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
        isUser 
          ? 'bg-white text-gray-800 rounded-br-none border border-gray-200' // Admin bubble
          : 'bg-green-500 text-white rounded-bl-none' // Customer bubble
      }`}>
        {msg.text}
      </div>
    </div>
  );
};