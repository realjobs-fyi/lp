"use client";

import Image from "next/image";
import {
  ChevronRight,
  Chromium,
  CirclePlay,
  CircleX,
  Hourglass,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // pause video when popup closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen]);

  // close when escape key is pressed
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setFocused(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen items-center justify-between pt-8 pb-4 max-md:px-8">
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 w-screen h-screen top-0 left-0 bg-black/50 flex items-center justify-center ${
          isOpen ? "opacity-100 z-999" : "opacity-0 -z-50"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex flex-col gap-6 bg-white p-10 rounded-4xl h-fit max-md:h-[80%] max-md:max-h-fit w-fit max-md:w-[90%] ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          } ease-in-out transition-all duration-300`}
        >
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold max-md:text-xl">
              See how Real Jobs works in action
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer hover:opacity-50 transition-opacity duration-300"
            >
              <CircleX />
            </button>
          </div>
          <div className="flex items-center justify-center h-140 max-md:h-fit bg-neutral-200 rounded-3xl">
            <ReactPlayer
              className="rounded-md"
              width="100%"
              height="100%"
              controls
              src="/video/demo.mp4"
              playing={isOpen ? isPlaying : false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={() => setFocused(false)}
        className={`absolute inset-0 w-screen h-screen top-0 left-0 bg-black/50 flex items-center justify-center ${
          focused ? "opacity-100 z-40" : "opacity-0 -z-50"
        }`}
      ></div>

      <Image
        className={`absolute top-56 left-36 -z-10 max-md:hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } transition-all duration-700 delay-500`}
        src="/cloud.png"
        width={144}
        height={144}
        alt="Cloud Icon"
      />

      <Image
        className={`absolute bottom-32 left-64 z-10 max-md:hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } transition-all duration-700 delay-700`}
        src="/wind.webp"
        width={100}
        height={100}
        alt="Wind Icon"
      />

      <Image
        className={`absolute bottom-72 right-44 z-10 max-md:hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } transition-all duration-700 delay-900`}
        src="/cloud.png"
        width={144}
        height={144}
        alt="Cloud Icon"
      />

      <nav
        className={`flex items-center justify-between max-w-4xl w-full ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } transition-all duration-700 delay-300`}
      >
        <div className="flex gap-3 items-center justify-center">
          <Image src="/icon.svg" width={32} height={32} alt="Real Jobs Icon" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/realjobs-fyi/extension"
          >
            <div className="flex items-center justify-center bg-black text-white px-6 h-[52px] rounded-4xl font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-300 max-md:hidden">
              <p>Contribute</p>
            </div>
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://buymeacoffee.com/marceloakalopes"
          >
            <button className="flex items-center justify-center gap-3 border-2 bg-white border-gray-200 font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:bg-gray-100 transition-colors duration-300">
              <span className="max-md:text-sm">Donate</span>
            </button>
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-col items-center justify-center max-md:w-full gap-8">
        <main
          className={` flex flex-col items-center justify-center gap-3 max-w-4xl w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          } transition-all duration-700`}
        >
          <div className="flex flex-col items-center justify-center gap-10 max-md:gap-6">
            <div className="mb-2">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://chromewebstore.google.com/detail/jhfeijjoobdgkdnfhjahhbjohondljci?utm_source=item-share-cb"
              >
                <button className="flex items-center justify-center gap-3 pl-4 pr-3 py-1.5 rounded-4xl bg-gray-100 cursor-pointer hover:shadow-lg/5 transition-shadow duration-300">
                  <Hourglass
                    width={16}
                    height={16}
                    strokeWidth={2}
                    className="text-black"
                  />
                  <p className="text-sm">Land more Interviews</p>
                  <div className="flex justify-center items-center bg-black p-0.5 rounded-full">
                    <ChevronRight
                      width={14}
                      height={14}
                      strokeWidth={2}
                      className="text-white"
                    />
                  </div>
                </button>
              </Link>
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
              after using our tool.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mt-6">
            <div className="flex space-x-2 max-md:flex-col justify-center items-center max-md:gap-8">
              <div className="relative flex flex-col items-center justify-center">
                <Link target="_blank" rel="noopener noreferrer" href="https://chromewebstore.google.com/detail/jhfeijjoobdgkdnfhjahhbjohondljci?utm_source=item-share-cb">
                  <button className="flex items-center justify-center gap-3 bg-[#304fff] border-2 border-[#304fff] text-white font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:opacity-80 transition-opacity duration-300">
                    <Chromium />
                    <span className="max-md:text-sm">
                      Add Real Jobs to Chrome{" "}
                      <span className="max-md:hidden">— It&apos;s Free!</span>
                    </span>
                  </button>
                </Link>
              </div>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setIsOpen(true);
                }}
                className="flex items-center justify-center gap-3 border-2 bg-white border-gray-200 font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              >
                <CirclePlay />
                <span className="max-md:text-sm">Demo</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer>
        <ul className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
          <li>
            <a href="/terms-and-conditions">Terms & Conditions</a>
          </li>
          <li>|</li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
