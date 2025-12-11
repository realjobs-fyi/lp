
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page() {

  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

    return (
        <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center w-full justify-center gap-2 my-6 max-w-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-gray-500 font-medium text-center text-sm">
            Loading...
          </p>
        </div>
      </main>
    );
}