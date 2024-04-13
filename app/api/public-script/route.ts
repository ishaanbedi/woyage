import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const data = await request.json();
  const { id, path, browser, referrer, os, device, country, website_id } = data;
  const { error } = await supabase.from("analytics").insert({
    id: id,
    path: path,
    browser: browser,
    referrer: referrer,
    os: os,
    device: device,
    country: country,
    website_id: (website_id),
  });
  if (error) {
    console.error("error adding analytics:", error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
