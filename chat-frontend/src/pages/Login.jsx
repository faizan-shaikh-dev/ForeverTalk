import React from "react";
import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl">
            <MessageCircleMore size={35} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">ForeverTalk</h1>

          <p className="text-slate-400 mt-2">Welcome Back</p>
        </div>

        {/* Form */}

        <form className="space-y-5">
          <div>
            <label className="block text-slate-300 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
