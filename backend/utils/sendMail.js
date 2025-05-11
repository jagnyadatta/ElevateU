import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.SMTP_EMAIL, // Your email6
    pass: process.env.SMTP_PASSWORD, // Your email password or app password
  },
});

// Function to generate a 6-digit OTP
export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // Random 6-digit number
};

// Function to send OTP via email
export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your OTP from ElevateU',
    html: `
      <h1>OTP Verification</h1>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send OTP. Please try again.' };
  }
};

// Function to send verification success email
export const sendVerificationSuccessEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your ElevateU Account Has Been Verified ✅',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #3b66ff;">Welcome to ElevateU, ${name}!</h2>
        <p>We're excited to inform you that your counsellor profile has been <strong style="color: green;">successfully verified</strong> by the admin team.</p>
        <p>You now have full access to your dashboard, where you can start helping students with career advice, academic counseling, and much more.</p>
        <p><strong>What’s Next?</strong></p>
        <ul>
          <li>Log in to your profile and update any missing information.</li>
          <li>Start connecting with students through real-time chat.</li>
          <li>Maintain a professional presence and respond promptly to inquiries.</li>
        </ul>
        <p>If you have any questions or need support, feel free to contact us.</p>
        <p>Thank you for being part of ElevateU.</p>
        <br />
        <p>Best regards,<br><strong>ElevateU Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Verification email sent successfully!' };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, message: 'Failed to send verification email.' };
  }
};
