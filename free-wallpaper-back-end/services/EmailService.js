require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const sendRegisterRequest = async (data) => {
    try {
        await transporter.sendMail({
            from: `"Free Wallpaper" <${process.env.EMAIL_APP}>`, // sender address
            to: data.email,
            subject: "Verify Account Request", // Subject line
            text: "You have an notification for Verify Account", // plain text body
            html: `
            <p>You received this email because there is a request to create an account with the following content</p>
            <div><b>Username: </b>${data.name}</div>
            <div><b>Email (Account): </b>${data.email}</div>
            <br/>
            <div>If you created this Account, please click Verify</div>
            <div style="padding: 1rem 0rem;">
                <a style="text-decoration: none; background-color: #08ff10;  font-size: 1.2rem" href=${data.activeLink}>Verify</a>
            </div> 
            <div>Thank you/div>`
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendRegisterRequest
}