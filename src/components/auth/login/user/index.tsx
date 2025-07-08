"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@heroui/react";

export default function UserLoginForm() {
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-8 bg-white rounded-2xl shadow-lg border border-pink-100">
      {/* Header dengan ikon hati */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk ke Akun Anda</h2>
        <p className="text-sm text-gray-600">Akses mudah dan aman untuk layanan kesehatan</p>
      </div>

      {/* Error message dengan styling yang lebih soft */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Google Sign In Button dengan styling yang lebih menarik */}
      <Button
        onPress={handleGoogleSignIn}
        className="w-full h-12 bg-white border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 shadow-sm hover:shadow-md"
        variant="ghost"
        startContent={
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
            width={20}
            height={20}
          />
        }
      >
        <span className="text-gray-700 font-medium">Masuk dengan Google</span>
      </Button>

      {/* Decorative elements */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-pink-300">
          <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
          <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Privasi dan keamanan data Anda terjamin
        </p>
      </div>
    </div>
  );
}