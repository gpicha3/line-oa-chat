interface ChatUser {
  id: string;
  lastMessage?: string;
}

interface ChatSidebarProps {
  users: ChatUser[];
  activeUser: string | null;
  onSelectUser: (userId: string) => void;
}

export const ChatSidebar = ({ users, activeUser, onSelectUser }: ChatSidebarProps) => (
  <div className="w-80 border-r bg-white h-full overflow-y-auto">
    <div className="p-4 font-bold text-xl border-b">Chats</div>
    {users.map((user) => (
      <div 
        key={user.id}
        onClick={() => onSelectUser(user.id)}
        className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${activeUser === user.id ? 'bg-green-50' : ''}`}
      >
        <div className="font-medium text-sm text-gray-900">{user.id.substring(0, 10)}...</div>
        <div className="text-xs text-gray-500 truncate">{user.lastMessage}</div>
      </div>
    ))}
  </div>
);