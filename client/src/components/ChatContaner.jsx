import { getSocket } from "@/lib/socket";
import { getMessages } from "@/store/slices/chatSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import avatar from "../assets/images.png";

const ChatContaner = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  useEffect(() => {
    if (!selectedUser?._id) return;
    dispatch(getMessages(selectedUser._id));

    const socket = getSocket();
    if (!socket) return;
  }, [selectedUser?._id]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
      <ChatHeader />

      {/* Message area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => {
            const isSender = message.sender === authUser._id;

            return (
              <div
                key={message._id}
                className={`flex items-end ${
                  isSender ? "justify-end" : "justify-start"
                }`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border shrink-0 ${
                    isSender ? "order-2 ml-3" : "order-1 mr-3"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={
                      isSender
                        ? authUser?.avatar?.url
                        : selectedUser?.avatar?.url || avatar
                    }
                    alt="avatar"
                  />
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-lg text-sm ${
                    isSender
                      ? "bg-blue-600/20 text-black dark:text-white dark:bg-blue-600/40 order-1"
                      : "bg-gray-200 text-black dark:text-white dark:bg-gray-700 order-2"
                  }`}
                >
                  {/* Media Message */}
                  {message.media && (
                    <>
                      {/\.(mp4|webm|mov)$/i.test(message.media) ? (
                        <video
                          src={message.media}
                          controls
                          className="w-full rounded-md mb-2"
                        />
                      ) : (
                        <img
                          src={message.media}
                          alt="Attachment"
                          className="w-full rounded-md mb-2"
                        />
                      )}
                    </>
                  )}

                  {/* Text Message */}
                  {message.text && <p>{message.text}</p>}

                  {/* Time */}
                  <span className="block text-[10px] mt-1 text-right text-gray-400 dark:text-gray-300">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 dark:text-gray-300">
            No messages yet...
          </p>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContaner;
