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

// Function to send registration success email
export const sendRegistrationSuccessEmailCounsellor = async (email, name) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Successfully Registered on ElevateU 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #3b66ff;">Hello ${name},</h2>
        <p>🎉 Thank you for registering as a counsellor on <strong>ElevateU</strong>!</p>
        <p>Your form has been submitted successfully and is currently under review.</p>
        <p>🔒 <strong>Verification Status:</strong> <span style="color: orange;">Pending</span></p>
        <p>Our admin team will verify your documents within 24 hours. Once verified, you’ll receive another confirmation email, and you can log in to access your dashboard.</p>
        <p>If you have any questions, feel free to reach out to us.</p>
        <p>We appreciate your interest in helping students grow! 🚀</p>
        <br />
        <p>Best regards,<br><strong>ElevateU Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Registration email sent successfully!' };
  } catch (error) {
    console.error('Error sending registration email:', error);
    return { success: false, message: 'Failed to send registration email.' };
  }
};

// Function to send registration success email to student
export const sendRegistrationSuccessEmailStudent = async (email, name) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Welcome to ElevateU 🎓 - Registration Successful!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #3b66ff;">Hi ${name},</h2>
        <p>🎉 You have successfully registered as a <strong>student</strong> on <strong>ElevateU</strong>.</p>
        <p>We're excited to help you navigate your academic and career journey.</p>

        <p><strong>Here’s what you can do next:</strong></p>
        <ul>
          <li>💬 Connect with verified counsellors for guidance.</li>
          <li>📚 Get real-time support via our chat system.</li>
          <li>🚀 Take control of your career and college decisions.</li>
        </ul>

        <p>You're one step closer to a brighter future. If you have questions, feel free to reach out at any time.</p>
        
        <br />
        <p>Cheers,<br><strong>ElevateU Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Student registration email sent successfully!' };
  } catch (error) {
    console.error('Error sending student registration email:', error);
    return { success: false, message: 'Failed to send student registration email.' };
  }
};

