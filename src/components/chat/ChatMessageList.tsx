import { MessageBubble } from './MessageBubble';
import { Message } from '@/types/message';

interface ChatMessageListProps {
  messages: Message[];
  customerProfile?: string;
}

export const ChatMessageList = ({ messages, customerProfile }: ChatMessageListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} customerProfile={customerProfile} />
      ))}
    </div>
  );
};