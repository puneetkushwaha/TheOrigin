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
    // Newsletter subscription: only email required
    // Contact form: name, email, message required
    // Join Us form: name, email, phone required
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
    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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
    
    // Email content for you (the recipient)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: isNewsletterSubscription ? 
               `📧 New Newsletter Subscription: ${email}` : 
               `🚀 New ${formType} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f0f19 0%, #1a1a2e 100%); color: #ffffff; padding: 30px; border-radius: 15px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="background: linear-gradient(135deg, #00e5ff 0%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0; font-weight: bold;">
              THE ORIGIN
            </h1>
            <p style="color: #a0a0a0; margin: 10px 0 0 0; font-size: 16px;">New ${formType} Received</p>
          </div>

          ${isNewsletterSubscription ? `
          <!-- Newsletter Subscription Details -->
          <div style="background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #c084fc; margin: 0 0 20px 0; font-size: 20px; font-weight: bold;">📧 Newsletter Subscription</h2>
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border-left: 3px solid #c084fc;">
              <p style="color: #ffffff; margin: 0; font-size: 16px;">
                📧 Email: <a href="mailto:${email}" style="color: #c084fc; text-decoration: none; font-weight: bold;">${email}</a>
              </p>
              <p style="color: #a0a0a0; margin: 10px 0 0 0; font-size: 14px;">
                ✅ This user wants to stay updated with The Origin's latest news and insights.
              </p>
            </div>
          </div>` : `
          <!-- Application Details Card -->
          <div style="background: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #00e5ff; margin: 0 0 20px 0; font-size: 20px; font-weight: bold;">📋 ${isContactForm ? 'Contact Details' : 'Application Details'}</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 12px 0; color: #a0a0a0; font-weight: bold; width: 120px;">👤 Name:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 12px 0; color: #a0a0a0; font-weight: bold;">📧 Email:</td>
                <td style="padding: 12px 0; color: #00e5ff; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; color: #a0a0a0; font-weight: bold;">📱 Phone:</td>
                <td style="padding: 12px 0; color: #c084fc; font-size: 16px;">
                  <a href="tel:${phone}" style="color: #c084fc; text-decoration: none;">${phone}</a>
                </td>
              </tr>` : ''}
              ${message ? `
              <tr>
                <td style="padding: 12px 0; color: #a0a0a0; font-weight: bold; vertical-align: top;">💬 Message:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 14px; line-height: 1.5;"><div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 3px solid #00e5ff;">${message.replace(/\\n/g, '<br>')}</div></td>
              </tr>` : ''}
            </table>
          </div>`}

          <!-- Submission Info -->
          <div style="background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #c084fc; margin: 0 0 15px 0; font-size: 18px;">⏰ Submission Information</h3>
            <p style="color: #ffffff; margin: 0; font-size: 14px;">
              <strong>Date & Time:</strong> ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
              })}
            </p>
            <p style="color: #a0a0a0; margin: 10px 0 0 0; font-size: 14px;">
              📍 Source: The Origin Website - Join Us Form
            </p>
          </div>

          <!-- Action Required -->
          <div style="background: linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%); border: 1px solid rgba(0, 229, 255, 0.4); border-radius: 12px; padding: 20px; text-align: center;">
            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">🎯 Next Steps</h3>
            <p style="color: #a0a0a0; margin: 0 0 20px 0; font-size: 14px; line-height: 1.6;">
              A new candidate is interested in joining The Origin! Please follow up within 24-48 hours to maintain engagement.
            </p>
            
            <!-- Quick Action Buttons -->
            <div style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Welcome to The Origin - Next Steps&body=Hi ${name},%0A%0AThank you for your interest in joining The Origin!%0A%0AWe've received your application and are excited to learn more about you." 
                 style="background: linear-gradient(135deg, #00e5ff 0%, #0099cc 100%); color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 5px; font-weight: bold; font-size: 14px;">
                📧 Reply to ${name.split(' ')[0]}
              </a>
              <a href="tel:${phone}" 
                 style="background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%); color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 5px; font-weight: bold; font-size: 14px;">
                📞 Call ${name.split(' ')[0]}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #666; font-size: 12px; margin: 0;">
              This email was automatically generated from The Origin website contact form.
            </p>
            <p style="color: #00e5ff; font-size: 12px; margin: 5px 0 0 0; font-weight: bold;">
              🚀 Building the Future of Intelligence
            </p>
          </div>
        </div>
      `,
      // Plain text fallback
      text: `
New Join Us Application - The Origin

Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${new Date().toLocaleString()}

Please follow up with this potential candidate.

--
The Origin Website
Building the Future of Intelligence
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
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send emails.' },
    { status: 405 }
  );
}