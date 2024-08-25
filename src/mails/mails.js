import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

async function sendEmails(emailsArray, subject, htmlTemplate) {

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: emailsArray.join(', '),
        subject: subject,
        html: htmlTemplate
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true, message: 'Emails sent successfully' };
    } catch (err) {
        console.error('Error sending email:', err);
        return { success: false, message: 'Error sending emails' };
    }
}

export { sendEmails };
