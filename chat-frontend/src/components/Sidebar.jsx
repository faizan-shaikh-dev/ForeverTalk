import { Search } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    message: "Hey, how are you?",
    online: true,
  },
  {
    id: 2,
    name: "Aman Khan",
    message: "Let's meet tomorrow",
    online: false,
  },
  {
    id: 3,
    name: "Priya Patel",
    message: "Send me the files",
    online: true,
  },
];

const Sidebar = () => {
  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          ForeverTalk
        </h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center bg-slate-900 rounded-xl px-3">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent p-3 outline-none"
          />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto px-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900 cursor-pointer transition"
          >
            <div className="relative">
              <img
                src={`https://i.pravatar.cc/150?img=${user.id}`}
                alt=""
                className="w-12 h-12 rounded-full"
              />

              {user.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950"></span>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <h3 className="font-medium truncate">
                {user.name}
              </h3>

              <p className="text-sm text-slate-400 truncate">
                {user.message}
              </p>
            </div>

            <span className="text-xs text-slate-500">
              12:30
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;