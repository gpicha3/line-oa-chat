interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: (formData: FormData) => void;
  disabled: boolean;
}

export const ChatInput = ({ input, setInput, onSend, disabled }: ChatInputProps) => (
  <form 
    action={onSend}
    className="p-4 bg-white flex items-center gap-3 border-t"
  >
    <input
      type="text"
      name="message"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      disabled={disabled}
      placeholder={disabled ? "Select a chat to start..." : "Type a message..."}
      className="flex-1 p-2.5 bg-gray-100 border rounded-full px-5 focus:ring-2 focus:ring-green-400 outline-none text-black disabled:cursor-not-allowed"
    />
    <button 
      type="submit" 
      className="bg-green-500 text-white px-5 py-2.5 rounded-full font-bold active:scale-95 transition-all shadow-sm"
    >
      Send
    </button>
  </form>
);