import { getSocket } from "@/lib/socket";
import { getMessages } from "@/store/slices/chatSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageBubble from "./MessageBubble";

const ChatContaner = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    dispatch(getMessages(selectedUser._id));

    getSocket(); // optional usage
  }, [selectedUser?._id, dispatch]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-background">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sortedMessages.length > 0 ? (
          sortedMessages.map((msg, index) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              authUser={authUser}
              selectedUser={selectedUser}
              isLast={index === sortedMessages.length - 1}
              messageEndRef={messageEndRef}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No messages yet...
          </p>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContaner;
