"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

/**
 * Ensure the user has a profile
 * @returns The user's profile
 */
async function ensureProfile() {
  // 1) Get the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.error("[real jobs] getUser error or no user", userError);
    return;
  }

  const user = userData.user;

  // Extract useful metadata
  const meta = (user.user_metadata ?? {});
  const fullName = meta.full_name ?? meta.name ?? meta["name"] ?? null;
  const avatarUrl = meta.avatar_url ?? meta.picture ?? null;

  // 2) See if profile already exists
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError && profileError.code !== "PGRST116") {
    // PGRST116 = no rows returned for maybeSingle
    console.warn("[real jobs] error checking profile", profileError);
  }

  if (existingProfile) {
    // Already has profile – you might optionally update name/avatar here
    return;
  }

  // 3) Insert initial profile for FIRST sign-up
  const { error: insertError } = await supabase.from("profiles").insert({
    user_id: user.id,
    email: user.email, // if your profiles table has this column
    name: fullName,
    avatar_url: avatarUrl,
    plan: "FREE", // initial plan
    subscription_status: "none", // or "free"
    subscription_expiration: null,
    stripe_customer_id: null,
    stripe_subscription_id: null,
  });

  // Handle expected uniqueness / RLS issues gracefully
  if (insertError) {
    const isExpectedError =
      insertError.code === "23505" || // unique violation
      insertError.code === "42501" || // RLS violation (e.g., triggers handle it)
      insertError.message?.includes("row-level security") ||
      insertError.message?.includes("duplicate key value");

    if (!isExpectedError) {
      console.warn("[real jobs] profile insert error", insertError);
    }
  }
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
        // 1) Ensure the session is loaded
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          console.error(
            "[real jobs] No Supabase session in callback",
            sessionError
          );
          setStatus("error");
          return;
        }

        // 2) Make sure the profiles row exists (FIRST sign-up logic)
        await ensureProfile();

        // 3) If user came from extension, send access token back
        if (source === "extension") {
          const session = sessionData.session;

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {status === "loading" && <Loading />}

      {status === "done" && <Done />}

      {status === "error" && (
        <>
          <Error />
        </>
      )}
    </main>
  );
}

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Loading />
      </main>
    }>
      <LoginCallbackContent />
    </Suspense>
  );
}
