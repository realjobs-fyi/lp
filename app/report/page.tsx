"use client";

import Link from "next/link";
import { ChevronLeft, Send, AlertCircle, Bug, Lightbulb, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";

export default function ReportPage() {
  const [formData, setFormData] = useState({
    type: "BUG",
    title: "",
    description: "",
    email: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Maximum image size: 5MB
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

    // Limit to 3 images total
    const remainingSlots = 3 - images.length;
    const filesToAdd = Array.from(files)
      .filter((file) => {
        if (!file.type.startsWith("image/")) {
          setError("Only image files are allowed.");
          return false;
        }
        if (file.size > MAX_IMAGE_SIZE) {
          const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
          setError(
            `Image "${file.name}" is too large (${sizeMB}MB). Maximum size is 5MB. Please compress or resize the image.`
          );
          return false;
        }
        return true;
      })
      .slice(0, remainingSlots);

    if (filesToAdd.length === 0) {
      e.target.value = ""; // Reset input
      return;
    }

    // Clear any previous errors if we have valid files
    if (filesToAdd.length > 0) {
      setError(null);
    }

    const newFiles: File[] = [...images, ...filesToAdd];
    setImages(newFiles);

    // Create previews for all new files
    const previewPromises = filesToAdd.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(previewPromises).then((previews) => {
      setImagePreviews((prev) => [...prev, ...previews]);
    });

    e.target.value = ""; // Reset input
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert images to base64 strings (use the previews which are already data URIs)
      // The API accepts data URI format or just base64, so we'll send the full data URI
      const imageBase64Strings = imagePreviews.map((preview) => preview);

      // Prepare request payload
      const payload = {
        report_type: formData.type, // Map 'type' to 'report_type' as expected by API
        title: formData.title,
        description: formData.description,
        email: formData.email, // Email is required (EmailStr in the model)
        images: imageBase64Strings.length > 0 ? imageBase64Strings : [],
      };

      // Make API request
      let response: Response;
      let data: any;

      try {
        response = await fetch("https://api.realjobs.fyi/v1/report/problem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (fetchError) {
        // Network error (connection failed, CORS, etc.)
        throw new Error(
          "Unable to connect to the server. Please check your internet connection and ensure the server is running."
        );
      }

      try {
        data = await response.json();
      } catch (jsonError) {
        // Response is not valid JSON
        throw new Error(
          `Server returned an invalid response (${response.status}). Please try again later.`
        );
      }

      if (!response.ok) {
        // Handle error responses
        if (response.status === 400) {
          // Validation error
          const errorMessage =
            data.detail?.error || data.detail?.message || "Invalid request data. Please check your input.";
          throw new Error(errorMessage);
        } else if (response.status === 422) {
          // Unprocessable Entity - validation errors from Pydantic
          const errors = data.detail || [];
          let errorMessages: string[] = [];
          
          if (Array.isArray(errors)) {
            // Pydantic validation errors format
            errorMessages = errors.map((err) => {
              const field = err.loc?.join(".") || "field";
              const msg = err.msg || "Invalid value";
              return `${field}: ${msg}`;
            });
          } else if (typeof errors === "string") {
            errorMessages = [errors];
          } else if (errors.message) {
            errorMessages = [errors.message];
          } else if (errors.error) {
            errorMessages = [errors.error];
          } else {
            errorMessages = ["Invalid request data. Please check all fields."];
          }
          
          throw new Error(errorMessages.join("\n"));
        } else if (response.status === 500) {
          // Server error
          const errorMessage =
            data.detail?.error || data.detail?.message || "Server error. Please try again later.";
          throw new Error(errorMessage);
        } else {
          // Other errors
          throw new Error(data.detail?.message || data.detail?.error || "An error occurred. Please try again.");
        }
      }

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          type: "BUG",
          title: "",
          description: "",
          email: "",
        });
        setImages([]);
        setImagePreviews([]);
      }, 7000);
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Failed to submit report. Please check your connection and try again.");
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "BUG":
        return <Bug className="w-4 h-4" />;
      case "ISSUE":
        return <AlertCircle className="w-4 h-4" />;
      case "FEATURE_REQUEST":
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen max-h-full h-full py-24 px-4">
      <Link href="/">
        <div className="absolute left-12 top-12 flex items-center justify-center gap-2 pr-3 pl-2 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 max-md:hidden">
          <ChevronLeft className="w-4 h-4" />
          <p className="text-sm font-medium">Home</p>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-start gap-10 max-w-xl w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Report a Bug or Problem</h1>
          <p className="text-gray-500 font-medium">
            Help us improve Real Jobs by reporting bugs, issues, or suggesting
            new features.
          </p>
        </div>

        {isSubmitted ? (
          <div className="w-full p-6 rounded-2xl bg-green-50 border border-green-200">
            <p className="text-green-800 font-medium">
              Thank you! Your report has been submitted successfully. We&apos;ll
              review it and get back to you if needed.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6"
          >
            {error && (
              <div className="w-full p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 font-medium text-sm">Error submitting report</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Dismiss error"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="text-sm font-medium">
                Report Type
              </label>
              <div className="relative">
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  required
                >
                  <option value="BUG">Bug</option>
                  <option value="ISSUE">Problem / Issue</option>
                  <option value="FEATURE_REQUEST">Feature Request</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  {getTypeIcon(formData.type)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-gray-400">(required)</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-gray-400">(required)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide as much detail as possible about the bug, problem, or feature request..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-y"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="images" className="text-sm font-medium">
                Screenshots <span className="text-gray-400">(optional, up to 3)</span>
              </label>
              <div className="flex flex-col gap-3">
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black"
                          aria-label="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {images.length < 3 && (
                  <label
                    htmlFor="images"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {images.length === 0
                        ? "Upload screenshots"
                        : `Upload more (${3 - images.length} remaining)`}
                    </span>
                  </label>
                )}
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 3}
                />
              </div>
              <p className="text-xs text-gray-500">
                Upload screenshots or images to help us understand the issue better.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-gray-400">(required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                required
              />
              <p className="text-xs text-gray-500">
                We&apos;ll only use this to follow up on your report if needed.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-4xl cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Report</span>
                </>
              )}
            </button>
          </form>
        )}
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