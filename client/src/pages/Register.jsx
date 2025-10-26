import { registerUser } from "@/store/slices/authSlice";
import { Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthImage from "./AuthImage";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isSigningUp } = useSelector((state) => state.auth); // Assuming isSigningUp for register loading
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUser(formData)); // Assuming registerUser thunk exists in authSlice
  };

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Subtle chat overlay for whole page */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-24 h-16 bg-blue-200/50 rounded-2xl -rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-12 bg-purple-200/50 rounded-full rotate-6"></div>
        </div>

        {/* Left side: Form */}
        <div className="flex flex-col justify-center items-center px-4 py-8 lg:px-12 lg:py-12 relative z-10">
          <div className="w-full max-w-md space-y-8">
            {/* Logo and heading with chat icon animation */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg animate-[float_3s_ease-in-out_infinite]">
                <MessageSquare className="text-white w-8 h-8 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
                Welcome to ChatSphere
              </h1>
              <p className="text-gray-600 text-base mt-2 font-light italic leading-relaxed">
                Join our community and start meaningful conversations today
              </p>
            </div>

            {/* Form with enhanced inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-300 peer"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-300 peer"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl py-3 pl-3 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-300 peer"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit button with loading state */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                {isSigningUp ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating your account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Footer with enhanced link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline-offset-2"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side: AuthImage */}
        <AuthImage
          title="Start Your Journey"
          subTitle="Sign up to unlock unlimited chats, groups, and real-time messaging."
        />
      </div>
    </>
  );
};

export default Register;
