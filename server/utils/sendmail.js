import nodemailer from "nodemailer";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "siddharthashrestha2345@gmail.com",
    pass: "ztcc eeeh uzfs ekua"
  }
});

// Function to send email
export const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: "siddharthashrestha2345@gmail.com",
    to,
    subject,
    html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info);
      }
    });
  });
};