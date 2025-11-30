"use client";

import Image from "next/image";
import {
  CheckCircle,
  ChevronRight,
  CirclePlay,
  CircleX,
  Hourglass,
  Loader2,
  XCircle,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex items-center justify-center w-[148px] max-md:w-full h-[52px] rounded-4xl bg-[#304fff] text-white font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <span>Join Waitlist</span>
      )}
    </button>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // reference to the email input field
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const email = (e.target as HTMLFormElement).email.value;

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || "Something went wrong. Please try again later.";
        setError(errorMessage);
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

      if (response.status === 201) {
        // reset the form
        (e.target as HTMLFormElement).reset();

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          isOpen ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex flex-col gap-6 bg-white p-8 rounded-4xl h-fit max-md:h-[80%] w-[80%] max-md:w-[90%] ${
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
          <div className="flex items-center justify-center h-140 bg-neutral-200 rounded-3xl">
            <CirclePlay width={36} height={36} />
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
        <div className="flex gap-3 items-end justify-center">
          <Image src="/icon.svg" width={32} height={32} alt="Real Jobs Icon" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-3 border-2 bg-white border-gray-200 font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:bg-gray-100 transition-colors duration-300"
          >
            <CirclePlay />
            <span className="max-md:text-sm">Demo</span>
          </button>

          <button
            onClick={() => {
              setFocused(true);
              emailRef.current?.focus();
            }}
            className="bg-black text-white px-6 h-[52px] rounded-4xl font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-300 max-md:hidden"
          >
            Join Waitlist
          </button>
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
            <button onClick={() => {
              setFocused(true);
              emailRef.current?.focus();
            }
              } className="flex items-center justify-center gap-3 pl-4 pr-3 py-1.5 rounded-4xl bg-gray-100 cursor-pointer hover:shadow-lg/5 transition-shadow duration-300">
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
        </div>

        
      </main>

      <div className={`flex space-x-2 max-md:flex-col justify-center items-center max-md:gap-8 max-md:w-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } transition-all duration-700`}>
            <form
              onSubmit={handleSubmit}
              className={`relative flex max-md:flex-col items-center justify-center gap-2 max-md:w-full ${
                focused ? "z-50" : "z-0"
              } transition-all duration-300`}
            >
              <input
                autoComplete="off"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                ref={emailRef}
                className="group bg-white w-96 max-md:w-full px-6 py-3 rounded-4xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent transition-all duration-200"
              />
              <SubmitButton isSubmitting={isSubmitting} />

              <div
                className={`absolute top-[calc(100%+12px)] left-0 w-full mx-auto flex items-center justify-center ${
                  success
                    ? true
                    : false
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                } transition-all duration-300`}
              >
                <div className=" rounded-4xl pr-4 pl-3 py-1 bg-green-50 border-2 border-green-200 w-fit flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-medium text-green-500 max-md:text-[10px]">
                    Thank you for joining the waitlist! We&apos;ll be in touch
                    soon.
                  </p>
                </div>
              </div>

              {/* Error Message */}
              <div
                className={`absolute top-[calc(100%+12px)] left-0 w-full mx-auto flex items-center justify-center ${
                  error
                    ? true
                    : false
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                } transition-all duration-300`}
              >
                <div className=" rounded-4xl pr-4 pl-3 py-1 bg-red-50 border-2 border-red-200 w-fit flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-medium text-red-500 max-md:text-[10px]">
                    {error}
                  </p>
                </div>
              </div>
            </form>
        </div>
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
