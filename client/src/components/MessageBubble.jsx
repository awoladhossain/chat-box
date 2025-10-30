import avatarFallback from "../assets/images.png";

const MessageBubble = ({
  message,
  authUser,
  selectedUser,
  isLast,
  messageEndRef,
}) => {
  // ✅ Correct sender ID detection
  const senderId = message.senderId || message.sender?._id;
  const isSender = senderId === authUser._id;

  // ✅ Correct avatar selection
  const avatar = isSender
    ? authUser?.avatar?.url
    : selectedUser?.avatar?.url || avatarFallback;

  function formatTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <div
      className={`flex items-end gap-2 ${
        isSender ? "justify-end" : "justify-start"
      }`}
      ref={isLast ? messageEndRef : null}
    >
      {/* Avatar (only show for receiver like WhatsApp) */}
      {!isSender && (
        <img
          src={avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      {/* Bubble */}
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md px-3 py-2 rounded-lg text-sm shadow-md ${
          isSender
            ? "bg-[#DCF8C6] text-black rounded-br-none" // WhatsApp green
            : "bg-white text-black rounded-bl-none dark:bg-gray-800 dark:text-white"
        }`}
      >
        {message.media &&
          (/\.(mp4|webm|mov)$/i.test(message.media) ? (
            <video
              src={message.media}
              controls
              className="w-full rounded-md mb-1"
            />
          ) : (
            <img
              src={message.media}
              className="w-full rounded-md mb-1"
              alt="media"
            />
          ))}

        {message.text && <p className="break-words">{message.text}</p>}

        <span className="block text-[10px] text-right opacity-60 mt-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
