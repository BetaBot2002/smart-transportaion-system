import nodemailer from "nodemailer";

export const sendEmail = async (email, OTP) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use the service you prefer (Gmail, Yahoo, etc.)
        auth: {
            user: 'your-email@gmail.com', // Your email address
            pass: 'your-email-password', // Your email password (use environment variables for security)
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP for password reset is: ${OTP}`,
    };

    await transporter.sendMail(mailOptions);
};