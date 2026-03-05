interface ChatUser {
  id: string, 
  name: string,
  picture: string,
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
        className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
          activeUser === user.id ? 'bg-green-50' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <img src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
              className="w-10 h-10 rounded-full border" />
          
          <div className="flex-1 overflow-hidden">
            <div className="font-bold text-sm text-gray-900 truncate">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 truncate">{user.lastMessage}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);