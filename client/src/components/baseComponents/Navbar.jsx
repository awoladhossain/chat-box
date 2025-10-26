import { LogOutIcon, MessageSquare, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { logoutUser } from "@/store/slices/authSlice";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  // const authUser = true;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-lg border border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* left logo */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-lg font-bold text-gray-800">Talkie</h1>
              </Link>
            </div>
            {/* Right actions */}
            <div className="flex items-center gap-3">
              {authUser && (
                <>
                  <Link
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    to="/profile"
                  >
                    <User className="w-8 h-8" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-6 h-6" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
