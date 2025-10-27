import { getUsers, setSelectedUser } from "@/store/slices/chatSlice";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAvatar from "../assets/images.png";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
 const [showOnlyOnline, setShowOnlyOnline] = useState(false);
 const { users, selectedUser, isUsersLoading } = useSelector(
   (state) => state.chat
 );
 const { onlineUsers } = useSelector((state) => state.auth);
 const { authUser } = useSelector((state) => state.auth); // ✅ Get current user

 const dispatch = useDispatch();

 useEffect(() => {
   dispatch(getUsers());
 }, [dispatch]);

 // ✅ Filter out current user from online count
 const otherOnlineUsers = onlineUsers.filter((id) => id !== authUser?._id);

 const filteredUsers = showOnlyOnline
   ? users.filter((user) => onlineUsers.includes(user._id))
   : users;

 if (isUsersLoading) return <SidebarSkeleton />;

 return (
   <div>
     <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200 bg-white">
       {/* Header */}
       <div className="border-b border-gray-200 w-full p-5">
         <div className="flex items-center gap-2">
           <User className="w-6 h-6 text-gray-200" />
           <span className="font-medium hidden lg:block text-gray-800">
             Contacts
           </span>
         </div>
         {/* online only filtered */}
         <div className="mt-3 hidden lg:flex items-center gap-2">
           <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-700">
             <input
               type="checkbox"
               checked={showOnlyOnline}
               onChange={(e) => setShowOnlyOnline(e.target.checked)}
               className="w-4 h-4 border-gray-700 text-blue-600 focus:ring-blue-500"
             />
             <span>Online</span>
           </label>
           <span className="text-xs text-gray-500">
             ({otherOnlineUsers.length} online)
           </span>
         </div>
       </div>
       {/* users list */}
       <div className="overflow-y-auto w-full py-3">
         {filteredUsers.length > 0 &&
           filteredUsers.map((user) => (
             <button
               key={user._id}
               onClick={() => dispatch(setSelectedUser(user))}
               className={`w-full p-3 flex items-center gap-3 transition-colors rounded-md ${
                 selectedUser?._id === user._id
                   ? "bg-blue-100 text-blue-600"
                   : "hover:bg-gray-100 text-gray-700"
               }`}
             >
               {/* user image/avatar */}
               <div className="relative mx-auto lg:mx-0">
                 <img
                   src={user?.avatar?.url || userAvatar}
                   alt={user.name}
                   className="w-10 h-10 rounded-full object-cover"
                 />
                 {onlineUsers.includes(user._id) && (
                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                 )}
               </div>

               {/* user info */}
               <div className="hidden lg:block text-left min-w-0">
                 <div className="font-medium text-gray-800 truncate">
                   {user.fullName}
                 </div>
                 <div className="text-sm text-gray-500">
                   {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                 </div>
               </div>
             </button>
           ))}
         {filteredUsers.length === 0 && (
           <div className="text-center text-gray-500 py-3">No users found</div>
         )}
       </div>
     </aside>
   </div>
 );
};

export default Sidebar;
