import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  console.log('🚀 API Route called: /api/sendEmail');

  try {
    // Check environment variables first
    console.log('🔍 Checking environment variables...');
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      console.error('❌ Missing environment variables:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS,
        EMAIL_TO: !!process.env.EMAIL_TO
      });
      return NextResponse.json(
        { 
          error: 'Email service not configured. Please check environment variables.',
          details: 'Missing EMAIL_USER, EMAIL_PASS, or EMAIL_TO in .env.local'
        },
        { status: 500 }
      );
    }
    console.log('✅ Environment variables found');

    // Get form data from request
    const { name, email, phone, message } = await request.json();
    console.log('📝 Form data received:', { 
      name, 
      email, 
      phone: phone ? '***' + phone.slice(-4) : undefined,
      message: message ? message.substring(0, 50) + '...' : undefined
    });

    // Validate required fields
    if (!email) {
      console.error('❌ Missing email field');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const isNewsletterSubscription = !name && !phone && !message;

    if (!isNewsletterSubscription && (!name || (!phone && !message))) {
      console.error('❌ Missing required fields for form submission');
      return NextResponse.json(
        { error: 'For form submissions: Name, email, and either phone or message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('📧 Creating transporter...');

    // ✅ OUTLOOK SMTP (FIX)
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        ciphers: "SSLv3"
      }
    });

    // Test connection
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Determine form type
    const isContactForm = !!message;
    const isJoinUsForm = !!phone && !!name;
    const formType = isNewsletterSubscription ? 'Newsletter Subscription' : 
                     isContactForm ? 'Contact' : 'Join Us Application';

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: isNewsletterSubscription ?
               `📧 New Newsletter Subscription: ${email}` :
               `🚀 New ${formType} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New ${formType}</h2>
          ${name ? `<p><b>Name:</b> ${name}</p>` : ""}
          <p><b>Email:</b> ${email}</p>
          ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
          ${message ? `<p><b>Message:</b><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
          <p><b>Time:</b> ${new Date().toLocaleString()}</p>
        </div>
      `,
      text: `
New ${formType} Received

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `
    };

    // Send email
    console.log('📤 Sending email...');
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully!',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send emails.' },
    { status: 405 }
  );
}
