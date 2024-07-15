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
    await transporter.sendMail({
        from: `"Free Wallpaper" <${process.env.EMAIL_APP}>`, // sender address
        to: data.email,
        subject: "Yêu cầu tạo tài khoản", // Subject line
        text: "Xác thực tài khoản người dùng", // plain text body
        html: `<h3>Xin chào</h3>
        <p>Bạn nhận được email này vì có yêu cầu tạo tài khoản với nội dung như sau</p>
        <div><b>Tên người dùng: </b>${data.name}</div>
        <div><b>Email (Tài khoản): </b>${data.email}</div>
        <br/>
        <div>Nếu bạn xác nhận sử dụng tài khoản vui lòng click <a href=${data.activeLink}>Xác thực</a></div>
        <div>Xin cảm ơn</div>`
    });
}

module.exports = {
    sendRegisterRequest
}