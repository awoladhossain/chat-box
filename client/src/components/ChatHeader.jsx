import { setSelectedUser } from "@/store/slices/chatSlice";
import { XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import avatarImage from "../assets/images.png";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-3 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className="flex items-center gap-3">
            {/* avatar */}
            <div className="relative w-10 h-10">
              <img
                src={selectedUser?.avatar?.url || avatarImage}
                className="w-full h-full rounded-full object-cover"
                alt={selectedUser?.name}
              />
              {onlineUsers.includes(selectedUser?._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-background rounded-full" />
              )}
            </div>
            {/* name and status */}
            <div>
              <h3 className="font-medium text-base text-foreground">
                {selectedUser?.fullName}
              </h3>
              <p
                className={`text-sm ${
                  onlineUsers.includes(selectedUser?._id)
                    ? "text-green-500"
                    : "text-muted-foreground"
                }`}
              >
                {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          {/* close button */}
          <button
            className="text-muted-foreground hover:text-foreground transition cursor-pointer"
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
