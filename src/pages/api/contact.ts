import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const course = formData.get('course')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and phone are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'localhost',
      port: parseInt(import.meta.env.SMTP_PORT || '1025'),
      secure: import.meta.env.SMTP_SECURE === 'true',
      auth: import.meta.env.SMTP_USER
        ? {
            user: import.meta.env.SMTP_USER,
            pass: import.meta.env.SMTP_PASS,
          }
        : undefined,
    });

    // Email content
    const mailOptions = {
      from: import.meta.env.SMTP_FROM || 'noreply@corpnce.com',
      to: import.meta.env.CONTACT_EMAIL || 'info@corpnce.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${course ? `<p><strong>Course Interest:</strong> ${course}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Track form submission (if analytics is available)
    if (typeof globalThis !== 'undefined' && globalThis.trackFormSubmit) {
      globalThis.trackFormSubmit('contact_form', 'api');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you for your enquiry. We will get back to you soon!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
