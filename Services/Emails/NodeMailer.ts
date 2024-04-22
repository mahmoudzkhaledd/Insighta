'use server'
import nodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
interface EmailProps {
    to: string;
    subject: string;
    html: string;
}
export const sendEmail = async ({ to, subject, html }: EmailProps): Promise<SMTPTransport.SentMessageInfo> => {
    const email = process.env.EMAIL ?? "";
    const password = process.env.EMAIL_PASSWORD ?? "";
    return new Promise(async (res, rej) => {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: password,
            }
        });

        transporter.sendMail({
            from: email,
            to: to,
            subject: subject,
            text: html,
            
        }, (err, info) => {
            if (err) return rej(err);
            return res(info);
        });
    });
}