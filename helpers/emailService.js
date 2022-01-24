const nodemailer = require('nodemailer');
const sendMail = async ({from, to, subject, text, html }) => {
  let tranporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  let info = await tranporter.sendMail({
    from: `shareIt < ${from} >`,
    to,
    subject,
    text,
    html
  })
}

module.exports = sendMail;