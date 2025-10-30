import { getSocket } from "@/lib/socket";
import { sendMessage } from "@/store/slices/chatSlice";
import { Image, Send, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);

  // ✅ Handle image/video select
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);

    if (file.type.startsWith("image/")) {
      setMediaType("image");
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      setMediaType("video");
      setMediaPreview(URL.createObjectURL(file));
    } else {
      toast.error("Unsupported file type");
      removeMedia();
    }
  };

  // ✅ Remove media preview
  const removeMedia = () => {
    setMediaPreview(null);
    setMedia(null);
    setMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !media) {
      toast.error("Please enter a message or attach a file");
      return;
    }

    const data = new FormData();
    data.append("text", text.trim());
    if (media) data.append("media", media);

    // ✅ IMPORTANT — send to correct user by passing selectedUser._id
    dispatch(sendMessage({ data, receiverId: selectedUser._id }));

    // Reset fields
    setText("");
    removeMedia();
  };

  // ✅ Listen for socket new messages (no duplicates, correct chat only)
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const belongsToThisChat =
        (newMessage.senderId === authUser._id &&
          newMessage.receiverId === selectedUser._id) ||
        (newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUser._id);

      if (belongsToThisChat) {
        dispatch({ type: "chat/pushNewMessage", payload: newMessage });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id, authUser._id, dispatch]);

  return (
    <div className="p-4 w-full border-t border-border">
      {/* Preview section */}
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {mediaType === "image" ? (
              <img
                src={mediaPreview}
                className="w-36 h-36 object-cover rounded-lg border"
                alt="preview"
              />
            ) : (
              <video
                src={mediaPreview}
                className="w-40 h-28 rounded-lg border"
                controls
              />
            )}
            <button
              onClick={removeMedia}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black"
            >
              <XIcon size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* File input */}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
          disabled={!text.trim() && !media}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
