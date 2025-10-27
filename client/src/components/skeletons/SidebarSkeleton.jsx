import { User } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContainer = Array(8).fill(null);

  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200">
        {/* Header */}
        <div className="border-b border-gray-200 w-full p-5">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-gray-200" />
            <span className="font-medium hidden lg:block text-gray-800">
              Contacts
            </span>
          </div>
        </div>
        {/* Contacts */}
        <div className="overflow-y-auto w-full py-3">
          {skeletonContainer.map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-3 px-5 animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse "></div>
              <div className="w-1/2 h-4 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarSkeleton;
