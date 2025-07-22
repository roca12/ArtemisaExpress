

const nodemailer = require('nodemailer');
const templates= require('./emailTemplates');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.APP_PASSWORD
    }
});


     exports.sendMail = async function(to,subject,htmlContent){
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: to,
            subject: subject,
            html: htmlContent
        }
        try{
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado: ', info.response);
            return info;
        }catch(error){
            console.error('Error enviando el correo:', error);
            throw error;
        }


    }


    exports.sendVerificationCode = async function (to,username,code){
        const htmlContent = templates.mailVerifyTemplate(username,code);
        return exports.sendMail(to,"Codigo Verificación",htmlContent);


}
