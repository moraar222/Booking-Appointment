import nodemailer from "nodemailer";

const EMAIL = "moraar976@gmail.com";

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail", // Specify the email service provider
    auth: {
        user: EMAIL, // Your email address
        pass: "ydsqzgtmnxdjkrle", // Your email password
    },
});

export default function sendEmail({
    to = "recipient_email@example.com", // Recipient email address
    subject = "Test Email", // Email subject
    text = "This is a test email sent from Node.js using nodemailer.", // Email body (text version)
}) {

    // Send email
    // You can also use `html` key for HTML content
    transporter.sendMail({ from: EMAIL, to, subject, text }, (error, info) => {
        if (error) {
            console.error("Error occurred:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}
