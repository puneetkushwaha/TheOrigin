import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "New Subscription",
      text: `New subscriber: ${email}`,
    });

    return Response.json({ message: "Subscribed successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json({ message: "Failed to subscribe" }, { status: 500 });
  }
}
