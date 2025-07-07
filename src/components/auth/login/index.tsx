"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@heroui/react";

export default function LoginForm() {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login with Google</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button
        onPress={handleGoogleSignIn}
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
        Sign in with Google
      </Button>
    </div>
  );
}
