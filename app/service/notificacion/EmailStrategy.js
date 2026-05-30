const NotificacionStrategy = require("./NotificacionStrategy");
const { sendVerificationCode } = require('../../util/mail/email_service');

class EmailStrategy extends NotificacionStrategy {
    get tipo(){
        return "email";
    }

    async send(destino, datos){
        await sendVerificationCode(destino, datos.usuario, datos.codigo);
    }
}

module.exports = EmailStrategy;