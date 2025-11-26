"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href =
        "chrome-extension://mneifciejdgmjohlmhbholjndaebencc/src/options/index.html#profile";
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 max-md:px-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/realjobs-gold.png"
          width={36}
          height={36}
          alt="Real Jobs Icon"
        />
        <h1 className="text-2xl font-bold">Real Jobs PRO</h1>
      </div>
      <p className="text-gray-500 font-medium text-center">
        Thank you for your purchase! Your subscription is now active.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <h5>Redirecting to Real Jobs Extension in {countdown} seconds...</h5>
      </div>
      <Link
        className="text-xs text-gray-600 hover:text-black underline transition-colors duration-200 cursor-pointer"
        href="chrome-extension://mneifciejdgmjohlmhbholjndaebencc/src/options/index.html#profile"
      >
        Open extension now
      </Link>
    </div>
  );
}
