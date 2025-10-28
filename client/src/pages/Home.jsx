import ChatContaner from "@/components/ChatContaner";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/Sidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  return (
    <div className="min-h-screen bg-background">
      {" "}
      {/* Swapped bg-gray-100 for theme-aware background */}
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-card rounded-lg shadow-md border border-border w-full max-w-6xl h-[calc(100vh-8rem)]">
          {" "}
          {/* Swapped bg-white; added border-border for subtle outline */}
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContaner />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
