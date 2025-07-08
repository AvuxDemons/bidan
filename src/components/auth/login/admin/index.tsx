"use client";

import { useState } from "react";
import { Button } from "@/components/ui/HeroUI"; // ⬅️ Import button yang sudah di-extend
import { MdLock, MdPerson, MdVisibility, MdVisibilityOff, MdShield } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log("Admin Login:", { username, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-xl border-2 border-pink-200/50 rounded-3xl shadow-2xl p-8 space-y-6 hover:shadow-pink-100/50 transition-all duration-300"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
          Masuk sebagai Admin
        </h2>
        <p className="text-pink-500 text-sm flex items-center justify-center gap-2">
          <MdShield className="text-pink-400" /> Kelola dan pantau antrian pasien
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-pink-700 mb-2">
            <MdPerson className="inline mr-2 text-pink-500" /> Username Admin
          </label>
          <input
            type="text"
            placeholder="Masukkan username admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-pink-200 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 hover:border-pink-300"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-700 mb-2">
            <MdLock className="inline mr-2 text-pink-500" /> Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-pink-200 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 pr-12 hover:border-pink-300"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Button pakai HeroUI yang sudah kamu extend */}
      <Button
        type="submit"
        color="danger"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-pink-300/50 transition-all duration-200 transform hover:scale-[1.02]"
        disabled={isLoading}
      >
        {isLoading ? <ImSpinner2 className="animate-spin" /> : "Masuk"}
      </Button>

      <div className="mt-6 text-center text-pink-500 text-xs flex items-center justify-center gap-2">
        <MdShield size={14} className="text-pink-400" />
        Akses Aman & Terenkripsi - Hanya untuk administrator
      </div>
    </form>
  );
}