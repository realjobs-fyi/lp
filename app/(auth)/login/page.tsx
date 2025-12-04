"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "web";

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://realjobs.fyi/login/callback?source=${source}`,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full justify-center gap-6 my-6 max-w-sm">
        <Image width={32} height={32} alt="Real Jobs Logo" src="/icon.svg" />
        <h3 className="text-xl font-semibold text-gray-900">
          Sign in to Real Jobs
        </h3>
        <p className="font-semibold text-gray-400 text-center max-w-[280px] text-sm">
          Continue with your Google account to sync with the extension.
        </p>
        <div className="flex flex-col items-center w-full justify-center gap-2">
          <button
            onClick={signInWithGoogle}
            className="flex flex-row items-center justify-center gap-2 py-2 px-4 text-sm bg-white border border-gray-300 rounded-lg hover:opacity-80 transition-all duration-300 cursor-pointer shadow-sm/5 hover:bg-gray-50"
          >
            <Image width={16} height={16} src="/google.svg" alt="Google Logo" />
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className=" text-gray-400 text-center text-[10px]">
          * By signing up, you agree to our{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://realjobs.fyi/terms-and-conditions"
            className="underline underline-offset-2"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://realjobs.fyi/privacy-policy"
            className="underline underline-offset-2"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center w-full justify-center gap-2 my-6 max-w-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-gray-500 font-medium text-center text-sm">
            Loading...
          </p>
        </div>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
