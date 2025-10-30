import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16 bg-background">
      {" "}
      {/* Swapped bg-white */}
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center animate-bounce">
              {" "}
              {/* Swapped bg-blue-100 */}
              <MessageSquare className="w-8 h-8 text-primary" />{" "}
              {/* Swapped text-blue-600 */}
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome to Chit-Chat!
        </h2>{" "}
        {/* Swapped text-gray-800 */}
        <p className="text-muted-foreground">
          Select a chat to start a conversation.
        </p>{" "}
        {/* Swapped text-gray-600 */}
      </div>
    </div>
  );
};

export default NoChatSelected;
