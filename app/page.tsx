import Image from "next/image";
import {
  Chromium,
  ChevronRight,
  FlaskConical,
  CirclePlay,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-between pt-8 pb-4 max-md:px-4">
      <Image
        className="absolute top-56 left-36 -z-10 max-md:hidden"
        src="/cloud.png"
        width={144}
        height={144}
        alt="Cloud Icon"
      />
      <Image
        className="absolute bottom-72 right-44 z-10 max-md:hidden"
        src="/cloud.png"
        width={144}
        height={144}
        alt="Cloud Icon"
      />
      <Image
        className="absolute bottom-32 left-64 z-10 max-md:hidden"
        src="/wind.webp"
        width={100}
        height={100}
        alt="Cloud Icon"
      />

      <nav className="flex items-center justify-between max-w-4xl w-full">
        <div className="flex gap-3 items-end justify-center">
          <Image src="/icon.svg" width={32} height={32} alt="Real Jobs Icon" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-white text-black px-5 py-2.5 rounded-4xl font-semibold max-md:hidden cursor-pointer hover:bg-gray-200 transition-colors duration-300">
            Contact
          </button>

          <button className="bg-black text-white px-5 py-2.5 rounded-4xl font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-300">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex flex-col items-center justify-center gap-3 max-w-4xl w-full z-10">
        <div className="flex flex-col items-center justify-center gap-10 max-md:gap-6">
          <div className="mb-2">
            <button className="flex items-center justify-center gap-4 pl-4 pr-3 py-1.5 rounded-4xl bg-gray-100 cursor-pointer hover:shadow-lg/5 transition-shadow duration-300">
              <FlaskConical
                width={16}
                height={16}
                strokeWidth={2}
                className="text-black"
              />
              <p className="text-sm">Become a tester</p>
              <div className="flex justify-center items-center bg-black p-0.5 rounded-full">
                <ChevronRight
                  width={14}
                  height={14}
                  strokeWidth={2}
                  className="text-white"
                />
              </div>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl max-md:text-3xl text-center italic">
              LinkedIn is full of fake jobs.
            </h1>
            <span className="text-5xl max-md:text-3xl text-center font-bold">
              We{" "}
              <span className="relative">
                filter
                <span>
                  <Image
                    className="absolute right-0"
                    src="underline.svg"
                    width={200}
                    height={200}
                    alt="underline icon"
                  />
                </span>
              </span>{" "}
              them out.
            </span>
          </div>
          <p className="text-lg max-md:text-base max-w-96 text-center text-gray-500">
            Real candidates saw{" "}
            <span className="text-gray-800 font-semibold">
              60% less ghosting
            </span>{" "}
            and{" "}
            <span className="text-gray-800 font-semibold">
              4x more interviews
            </span>{" "}
            after using our tool.*
          </p>

          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-2 max-md:flex-col justify-center items-center max-md:gap-8">
              <div className="relative flex flex-col items-center justify-center">
                <a href="">
                  <button className="flex items-center justify-center gap-3 bg-[#304fff] border-2 border-[#304fff] text-white font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:opacity-80 transition-opacity duration-300">
                    <Chromium />
                    <span className="max-md:text-sm">Add Real Jobs to Chrome — It&apos;s Free!</span>
                  </button>
                </a>
                <p className="absolute top-[calc(100%+1px)] text-[10px] mt-1.5 text-gray-500">
                  * Paid subscriptions included
                </p>
              </div>
              <a href="">
                <button className="flex items-center justify-center gap-3 border-2 bg-white border-gray-200 font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                  <CirclePlay />
                  <span className="max-md:text-sm">Demo</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <ul className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
          <li>
            <a href="/terms-and-conditions">Terms & Conditions</a>
          </li>
          <li>|</li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>|</li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
