import nodemailer from "nodemailer";

export const sendEmail = async (email, OTP) => {
    console.log(process.env.SENDER_EMAIL)
    console.log(process.env.SENDER_EMAIL_PASSWORD)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP for password reset is: ${OTP}`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
};
