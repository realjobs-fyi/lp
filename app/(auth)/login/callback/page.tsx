"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

/**
 * Ensure the user has a profile (first sign-up logic)
 */
async function ensureProfileFromSession(user: User) {
  const meta = (user.user_metadata ?? {}) as Record<string, any>;
  const fullName = meta.full_name ?? meta.name ?? meta["name"] ?? null;
  const avatarUrl = meta.avatar_url ?? meta.picture ?? null;

  if (fullName || avatarUrl) {
    await supabase.auth.updateUser({
      data: {
        full_name: fullName ?? undefined,
        avatar_url: avatarUrl ?? undefined,
      },
    });
  }

  // 1) See if profile already exists
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError && profileError.code !== "PGRST116") {
    console.warn("[real jobs] error checking profile", profileError);
  }

  if (existingProfile) {
    // Already has profile
    return existingProfile;
  }

  // 2) Insert initial profile for FIRST sign-up
  const { data: insertedProfile, error: insertError } = await supabase
  .from("profiles")
  .insert({
    user_id: user.id,
    plan: "FREE",
  })
  .select("*")
  .single();

  if (insertError) {
    console.error("[real jobs] profile insert error", insertError);
    throw insertError; // don't silently swallow this
  }

  return insertedProfile;
}

function Loading() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <p className="text-gray-500 font-medium text-center text-sm">
        Finishing sign-in, please wait...
      </p>
    </div>
  );
}

function Done() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center p-2 bg-green-50 rounded-full">
        <CheckCircle className="w-6 h-6 text-green-500" />
      </div>
      <p className="text-gray-600 font-medium text-center text-lg">
        You&apos;re signed in
      </p>

      <p className="text-gray-400 font-medium text-center text-xs">
        You can now close this tab and return to the Real Jobs extension.
      </p>
    </div>
  );
}

function Error() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center p-2 bg-red-50 rounded-full">
        <XCircle className="w-6 h-6 text-red-500" />
      </div>
      <p className="text-gray-600 font-medium text-center text-lg">
        Error signing in
      </p>

      <p className="text-gray-400 font-medium text-center text-xs">
        An error occurred while signing in. Close this tab and try again later.
      </p>
    </div>
  );
}

function LoginCallbackContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "web";
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    const run = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error(
            "[real jobs] No Supabase session in callback",
            error
          );
          setStatus("error");
          return;
        }

        const session = data.session;

        // 1) Ensure profile exists (first sign-up logic)
        await ensureProfileFromSession(session.user);

        // 2) If user came from extension, send session back
        if (source === "extension") {
          window.postMessage(
            {
              type: "REALJOBS_SUPABASE_SESSION",
              accessToken: session.access_token,
              refreshToken: session.refresh_token,
            },
            window.location.origin
          );
        }

        setStatus("done");
      } catch (e) {
        console.error("[real jobs] Error in login callback", e);
        setStatus("error");
      }
    };

    void run();
  }, [source]);

  // Close the window after 10 seconds once done
  useEffect(() => {
    if (status === "done") {
      const timeout = setTimeout(() => {
        window.close();
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {status === "loading" && <Loading />}
      {status === "done" && <Done />}
      {status === "error" && <Error />}
    </main>
  );
}

export default function LoginCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Loading />
        </main>
      }
    >
      <LoginCallbackContent />
    </Suspense>
  );
}
