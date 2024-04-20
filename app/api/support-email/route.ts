import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_EMAIL);
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const headersList = headers();
  const key = headersList.get("supabase-verified");
  if (key !== process.env.SUPABASE_WEBHOOK_HEADER_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const html = `
      <h1>New Support Request</h1>
      <p>Name: ${data.record.name}</p>
      <p>Email: ${data.record.email}</p>
      <p>Query Type: ${data.record.query_type}</p>
      <p>Message: ${data.record.message}</p>
    `;
    await resend.emails.send({
      from: "support@supalytics.co",
      to: "hey@ishaanbedi.com",
      subject: "New Support Request",
      html: html,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending email" });
  }
  return NextResponse.json({ message: "Email sent" });
}
