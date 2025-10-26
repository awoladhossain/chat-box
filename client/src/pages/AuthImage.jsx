const AuthImage = ({ title, subTitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Subtle chat bubble background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-12 bg-white rounded-3xl"></div>
        <div className="absolute top-20 right-20 w-16 h-10 bg-white rounded-full rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-14 bg-white rounded-2xl -skew-x-12"></div>
      </div>

      <div className="max-w-md text-center relative z-10">
        {/* Chat-themed grid: Speech bubbles instead of squares */}
        <div className="grid grid-cols-3 mb-8 gap-3">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`relative w-full aspect-square rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 shadow-lg ${
                index % 3 === 0
                  ? "animate-pulse"
                  : index % 3 === 1
                  ? "animate-bounce"
                  : "animate-[ping_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              }`}
            >
              {/* Tiny "message" tail for bubble effect */}
              <div
                className={`absolute -bottom-1 left-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white/30 -translate-x-1/2 ${
                  index % 2 === 0 ? "hidden" : ""
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Title and Subtitle with chat flair */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>{" "}
            {/* Online indicator */}
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {title || "Connect & Chat"}
            </h1>
          </div>
          <p className="text-gray-200 text-lg leading-relaxed">
            {subTitle ||
              "Join conversations, share moments, and stay connected with friends in real-time."}
          </p>
        </div>

        {/* Optional: Subtle call-to-action hint */}
        <p className="text-indigo-300 text-sm mt-6 font-medium">
          Ready to message? Let's get started.
        </p>
      </div>
    </div>
  );
};

export default AuthImage;
