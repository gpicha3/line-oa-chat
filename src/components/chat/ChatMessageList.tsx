import { MessageBubble } from './MessageBubble';
import { Message } from '@/types/message';

interface ChatMessageListProps {
  messages: Message[];
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
    </div>
  );
};