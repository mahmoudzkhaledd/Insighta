'use server';

import { render } from "@react-email/render";
import { sendEmail } from "./NodeMailer"

import VerificationEmailComponent from "@/components/Emails/EmailVerification";
import { siteConfig } from "@/constants/site";
import { htmlEmailPage } from "./EmailTemplate";

export const sendVerificationEmail = async (email: string, userName: string, magicLink: string) => {
    const res = await sendEmail({
        to: email,
        subject: `${siteConfig.name} | Verify your email`,
        html: htmlEmailPage(userName,magicLink),
    });
    return res;
}
// const res = await resend.emails.send({
//     from: `Email Confirmation <onboarding@resend.dev>`,
//     to: email,
//     reply_to: siteConfig.replyToEmail,
//     subject: `${siteConfig.name} | Confirm your email`,
//     react: React.createElement(VerificationEmailComponent, {
//         userName: userName,
//         magicLink: magicLink,
//     }),
// });
// return res;
