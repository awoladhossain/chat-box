import { getSocket } from "@/lib/socket";
import { Image, XIcon } from "lucide-react";
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

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    setMedia(file);
    const type = file.type;
    if (type.startWith("image/")) {
      setMediaType("image");
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (type.startsWith("video/")) {
      setMediaType("video");
      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);
    } else {
      toast.error("Unsupported file type");
      setMediaPreview(null);
      setMedia(null);
      setMediaType("");
      return;
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setMedia(null);
    setMediaType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !media) {
      toast.error("Please enter a message or attach a file");
      return;
    }
    const data = new FormData();
    data.append("text", text.trim());
    data.append("media", media);
    // dispatch(sendMessage(data));
    // reset all
    setText("");
    setMediaPreview(null);
    setMedia(null);
    setMediaType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const handleNewMessage = (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.senderId === selectedUser._id
      ) {
        dispatch({ type: "chat/pushNewMessage", payload: newMessage });
      }
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUser._id]);

  return (
    <div className="p-4 w-full">
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {mediaType === "image" ? (
              <img
                src={mediaPreview}
                alt="media"
                className="w-40 h-40 object-cover rounded-lg border border-gray-700"
              />
            ) : (
              <video className="w-32 h-20 object-cover rounded-lg border border-gray-700" />
            )}
            <button
              onClick={removeMedia}
              type="button"
              className="absolute -top-2 right-2 w-5 h-5 bg-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-black"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Type a message.."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
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
            className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-accent hover:bg-accent/80 transition ${
              mediaPreview ? "text-emerald-500" : "text-gray-400"
            }`}
          >
            <Image size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
