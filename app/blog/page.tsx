import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, File } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Real Jobs Blog",
};

export default function BlogPage() {
  return (
    <div className="relative flex flex-col items-center justify-start h-screen py-24 px-4">
      <Link href="/">
        <div className="absolute left-12 top-12 flex items-center justify-center gap-2 pr-3 pl-2 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 max-md:hidden">
          <ChevronLeft className="w-4 h-4" />
          <p className="text-sm font-medium">Home</p>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-start gap-10 max-w-lg w-full">
        <h1 className="font-bold">Blog</h1>
        <p className="text-gray-500 font-medium">
          Read our latest blog posts and stay updated with the latest news and
          updates.
        </p>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start justify-start w-full gap-2 p-1 rounded-2xl border border-gray-200 cursor-pointer hover:shadow-2xl/10 transition-all duration-300">
            <div className="flex items-center justify-center h-36 w-full bg-gray-100 rounded-xl">
              <File className="w-6 h-6 text-gray-500" />
            </div>
            <p className="font-medium px-2 pb-2 pt-1 truncate">Nothing here yet</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-0 left-0 mx-auto w-full flex items-center justify-center px-4">
        <div className="flex flex-col items-start justify-center max-w-xl w-full gap-2">
          <span className="w-full h-px bg-gray-100"></span>
          <p className="text-xs py-2 text-gray-500 font-medium">
            © 2025 <Link className="underline" href="/">Real Jobs</Link>
          </p>
        </div>
      </div>
    </div>
  );
}