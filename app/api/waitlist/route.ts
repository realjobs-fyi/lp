import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/utils/supabase/admin";

/**
 * Add a user to the waitlist
 * @param request - The request object
 * @returns The response object
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body?.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const email = body?.email;

  const validatedEmail = z.email().safeParse(email);

  if (!validatedEmail.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const ip_address = request.headers.get("x-forwarded-for") || "Unknown";
  const user_agent = request.headers.get("user-agent") || "Unknown";

  const { data: emailExists, error: emailExistsError } = await supabaseAdmin.from("waitlist").select("*").eq("email", email).maybeSingle();
  if (emailExistsError) {
    return NextResponse.json({ error: emailExistsError.message }, { status: 400 });
  }

  if (emailExists) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }


  const { data, error } = await supabaseAdmin.from("waitlist").insert({
    email,
    ip_address,
    user_agent,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
