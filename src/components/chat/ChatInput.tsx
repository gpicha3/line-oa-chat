interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: (e: React.FormEvent) => void;
}

export const ChatInput = ({ input, setInput, onSend }: ChatInputProps) => (
  <form onSubmit={onSend} className="p-4 bg-white flex items-center gap-3">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      className="flex-1 p-2.5 bg-gray-100 border rounded-full px-5 focus:ring-2 focus:ring-green-400 outline-none"
    />
    <button type="submit" className="bg-green-500 text-white px-5 py-2.5 rounded-full font-bold active:scale-95 transition-all">
      Send
    </button>
  </form>
);