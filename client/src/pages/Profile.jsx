import { updateProfile } from "@/store/slices/authSlice";
import {
  Camera,
  User,
  Mail,
  Calendar,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../assets/images.png";
import { toast } from "react-toastify";

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    avatar: null, 
  });
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
      setFormData({ ...formData, avatar: file });
    };
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName.trim());
    data.append("email", formData.email.trim());
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }
    dispatch(updateProfile(data));
  };

  const currentAvatarSrc = selectedImage || authUser?.avatar?.url || profileImg;


  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  const accountStatus = authUser?.status || "Active";

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-card rounded-xl shadow-md p-6 space-y-8 border border-border">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Your profile information
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={currentAvatarSrc}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover object-top border-4 border-border"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary text-primary-foreground cursor-pointer hover:scale-105 p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isUpdatingProfile
                    ? "animate-pulse pointer-events-none opacity-50"
                    : ""
                }`}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-muted-foreground text-sm">
              {isUpdatingProfile ? "Updating..." : "Upload your avatar"}
            </p>
          </div>

          {/* Editable Form */}
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring disabled:opacity-50"
                placeholder="Enter your full name"
                disabled={isUpdatingProfile}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring disabled:opacity-50"
                placeholder="Enter your email"
                disabled={isUpdatingProfile}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUpdatingProfile ? "Updating Profile..." : "Update Profile"}
            </button>
          </form>

          {/* Account Information Section */}
          <div className="pt-8 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </label>
                <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-md">
                  {authUser?.username || authUser?.fullName || "Not set"}
                </p>
              </div>

              {/* Account Created At – FIXED: Ensure formatDate is called */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Account Created
                </label>
                <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-md">
                  {formatDate(authUser?.createdAt)}
                </p>
              </div>

              {/* Account Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Account Status
                </label>
                <p
                  className={`font-medium px-3 py-2 rounded-md flex items-center gap-2 ${
                    accountStatus === "Active"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                      : "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      accountStatus === "Active"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  />
                  {accountStatus}
                </p>
              </div>

              {/* Last Login – FIXED: Ensure formatDate is called */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last Login
                </label>
                <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-md">
                  {authUser?.lastLogin
                    ? formatDate(authUser.lastLogin)
                    : "Never"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
