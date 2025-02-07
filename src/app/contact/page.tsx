"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace("/");
      } else {
        setLoading(false); // Agar user logged in nahi hai to form dikhayenge
      }
    }
  }, [isSignedIn, isLoaded, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn routing="hash" afterSignInUrl="/" />
    </div>
  );
}
