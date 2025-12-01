import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 h-screen bg-[#304fff] text-white">
            <h1 className="uppercase text-sm font-semibold">404 Page Not Found :(</h1>
                <Link className="text-xs underline" href="/">← back to home</Link>
        </div>
    );
}