"use client";

import AdminLoginForm from "@/components/auth/login/admin";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative pink blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-rose-300 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-rose-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce opacity-35" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 rounded-3xl shadow-xl mb-4 transform hover:scale-105 transition-transform duration-300">
            <MdAdminPanelSettings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Admin Portal
          </h1>
          <p className="text-pink-600 text-lg font-medium">Sistem Manajemen Antrian Bidan</p>
        </div>

        <AdminLoginForm />

        <div className="mt-4 text-center">
          <p className="text-xs text-pink-500 bg-pink-50/50 px-4 py-2 rounded-full border border-pink-200/50">
            Hak akses hanya diberikan kepada petugas berwenang.
          </p>
        </div>
      </div>
    </main>
  );
}