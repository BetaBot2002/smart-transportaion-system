import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, message) => {
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
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(`Error sending email: ${error.message}`);
    }
};
