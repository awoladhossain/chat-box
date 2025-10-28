import { loginUser } from "@/store/slices/authSlice";
import { Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthImage from "./AuthImage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoggingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData));
  };
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
        {" "}
        {/* Swapped light gradient for theme-aware */}
        {/* Subtle chat overlay for whole page */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-24 h-16 bg-accent/20 rounded-2xl -rotate-12"></div>{" "}
          {/* Swapped bg-blue-200/50 for accent */}
          <div className="absolute bottom-1/4 right-1/4 w-20 h-12 bg-secondary/20 rounded-full rotate-6"></div>{" "}
          {/* Swapped bg-purple-200/50 for secondary */}
        </div>
        {/* Left side: Form */}
        <div className="flex flex-col justify-center items-center px-4 py-8 lg:px-12 lg:py-12 relative z-10">
          <div className="w-full max-w-md space-y-8">
            {/* Logo and heading with chat icon animation */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary p-4 rounded-2xl shadow-lg animate-[float_3s_ease-in-out_infinite]">
                {" "}
                {/* Swapped gradient for primary */}
                <MessageSquare className="text-primary-foreground w-8 h-8 animate-pulse" />{" "}
                {/* Swapped text-white */}
              </div>
              <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {" "}
                {/* Swapped gradient for foreground/muted */}
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-base mt-2 font-light italic leading-relaxed">
                {" "}
                {/* Swapped text-gray-600 */}
                Dive into seamless conversations with your network
              </p>
            </div>

            {/* Form with enhanced inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-foreground mb-2 transition-colors group-focus-within:text-primary">
                  {" "}
                  {/* Swapped text-gray-700 and focus */}
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />{" "}
                  {/* Swapped text-gray-400 and focus */}
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/50 transition-all duration-300 peer bg-background text-foreground placeholder:text-muted-foreground"
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
                <label className="block text-sm font-semibold text-foreground mb-2 transition-colors group-focus-within:text-primary">
                  {" "}
                  {/* Swapped text-gray-700 and focus */}
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full border-2 border-border rounded-xl py-3 pl-3 pr-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/50 transition-all duration-300 peer bg-background text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit button with loading state */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                {isLoggingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>{" "}
                    {/* Swapped spinner colors */}
                    Signing you in...
                  </span>
                ) : (
                  "Start Chatting"
                )}
              </button>
            </form>

            {/* Footer with enhanced link */}
            <div className="text-center pt-4 border-t border-border">
              {" "}
              {/* Swapped border-gray-200 */}
              <p className="text-sm text-muted-foreground">
                {" "}
                {/* Swapped text-gray-500 */}
                New to ChatSphere?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 underline-offset-2"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Right side: AuthImage */}
        <AuthImage
          title="Connect Instantly"
          subTitle="Join lively chats, share updates, and build connections in one place."
        />
      </div>
    </>
  );
};

export default Login;
