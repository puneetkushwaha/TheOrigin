import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  console.log("🚀 API Route called: /api/sendEmail");

  console.log("ENV CHECK", {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? "OK" : "NOT FOUND",
    from: process.env.EMAIL_FROM,
  });

  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Message from ${name}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, msg: "Email sent!" });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
