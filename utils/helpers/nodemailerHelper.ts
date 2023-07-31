// Guide: https://nodemailer.com/about/

import nodemailer from 'nodemailer'

export const sendEmail = ({
    to,
    cc = [],
    bcc = [],
    subject,
    text,
    html,
    replyTo
}: {
    to: string[],
    cc?: string[],
    bcc?: string[],
    subject: string,
    text: string,
    html?: string,
    replyTo: string
}) =>
{
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
        }
    })

    return transporter.sendMail({
        from: process.env.EMAIL_FROM,
        replyTo,
        to,
        cc,
        bcc,
        subject,
        text,
        html
    })
}