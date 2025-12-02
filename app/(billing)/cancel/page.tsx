"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CancelContent() {
    const searchParams = useSearchParams();
    const extension_id = searchParams.get('extension_id');
    const [countdown, setCountdown] = useState(20);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdown === 0 && extension_id) {
            window.location.href = `chrome-extension://${extension_id}/src/options/index.html#profile`;
        }
    }, [countdown, extension_id]);

    if (!extension_id) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 max-md:px-8">
                <p className="text-gray-500 font-medium text-center">
                    Missing extension ID. Please try again.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 max-md:px-8">
            <div className="flex flex-col items-center justify-center gap-2">
                <Image src="/realjobs-error.png" width={36} height={36} alt="Real Jobs Icon" />

                <h1 className="text-2xl font-bold">Payment Cancelled</h1>
            </div>
            <p className="text-gray-500 font-medium text-center">
                Your payment has been cancelled. Need help? Contact us at <Link href="mailto:hello@realjobs.fyi" className="underline">hello@realjobs.fyi</Link>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <h5>Redirecting to Real Jobs Extension in {countdown} seconds...</h5>
            </div>
            <Link
                className="text-xs text-gray-600 hover:text-black underline transition-colors duration-200 cursor-pointer"
                href={`chrome-extension://${extension_id}/src/options/index.html#profile`}
            >
                Open extension now
            </Link>
        </div>
    );
}

export default function CancelPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-screen gap-4 max-md:px-8">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-gray-500 font-medium text-center">Loading...</p>
            </div>
        }>
            <CancelContent />
        </Suspense>
    );
}