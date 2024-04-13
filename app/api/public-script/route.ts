import { NextRequest, NextResponse } from "next/server";
export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
