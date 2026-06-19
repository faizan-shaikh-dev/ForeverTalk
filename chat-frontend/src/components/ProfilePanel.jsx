import { Mail, Phone, ImageIcon } from "lucide-react";

const ProfilePanel = () => {
  return (
    <div className="h-full bg-slate-950 text-white p-6 overflow-y-auto">

      {/* Profile */}
      <div className="flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/200?img=1"
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-slate-800"
        />

        <h2 className="mt-4 text-xl font-semibold">
          Rahul Sharma
        </h2>

        <p className="text-green-400 text-sm">
          ● Online
        </p>

        <p className="text-slate-400 text-center mt-3 text-sm">
          Frontend Developer | React Enthusiast 🚀
        </p>
      </div>

      {/* Info */}
      <div className="mt-8 space-y-4">

        <div className="bg-slate-900 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span className="text-sm">
              rahul@gmail.com
            </span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span className="text-sm">
              +91 9876543210
            </span>
          </div>
        </div>

      </div>

      {/* Shared Media */}
      <div className="mt-8">

        <div className="flex items-center gap-2 mb-4">
          <ImageIcon size={18} />
          <h3 className="font-semibold">
            Shared Media
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <img
              key={item}
              src={`https://picsum.photos/200?random=${item}`}
              alt=""
              className="w-full h-20 rounded-lg object-cover"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfilePanel;