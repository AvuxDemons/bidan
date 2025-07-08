"use client";

import UserLoginForm from "@/components/auth/login/user";
import { Button } from "@heroui/react";
import { MdChildCare } from "react-icons/md";

export default function UserLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-50 blur-xl" />
        <div className="absolute top-32 right-16 w-32 h-32 bg-rose-200 rounded-full opacity-40 blur-2xl" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-pink-300 rounded-full opacity-30 blur-lg" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-rose-300 rounded-full opacity-20 blur-xl" />
      </div>

      {/* Main content */}
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 relative z-10 border border-pink-100">
        {/* Header section with icon */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full mb-4 shadow-lg">
            <MdChildCare className="w-10 h-10 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Selamat Datang!
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Layanan kesehatan terpercaya untuk keluarga Anda
          </p>
        </div>

        {/* Login form */}
        <UserLoginForm />

        {/* CTA / Extra Button if needed */}
        <div className="mt-6 text-center">
          <Button
            variant="light"
            color="primary"
            className="mt-4 text-xs"
            onPress={() => alert("Silakan hubungi admin jika butuh bantuan.")}
          >
            Butuh bantuan login?
          </Button>
        </div>

        {/* Footer message */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Platform kesehatan yang aman dan terpercaya<br />
            untuk ibu dan anak
          </p>
        </div>
      </div>
    </main>
  );
}
