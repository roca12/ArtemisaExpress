/**
 * Genera la plantilla HTML del correo de verificación.
 * @param {string} username - Nombre del usuario destinatario.
 * @param {string} verificationCode - Código de verificación a mostrar.
 * @returns {string} Contenido HTML del correo.
 */
exports.mailVerifyTemplate = (username, verificationCode) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Verificación de Correo</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); margin: 0 auto;">
          <tr>
            <td align="center" style="padding: 30px;">
              <img src="https://artemisaexpress.com/app/assets/logo.png" alt="Logo Artemisa" width="150" style="display: block; margin: 0 auto;">

              <table width="80%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px auto 0; border-top: 1px solid #196774;">
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <h1 style="font-size: 28px; margin: 0; color: #363432;">Bienvenido</h1>
                  </td>
                </tr>
              </table>

              <h2 style="font-size: 24px; color: #196774; margin: 20px 0 30px 0;">${username}</h2>

              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  ${verificationCode
                    .split("")
                    .map(
                      (char) => `
                    <td style="padding: 0 5px;">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" width="60" height="60" bgcolor="#e0e0e0" style="border-radius: 10px; font-weight: bold; font-size: 24px;">
                            ${char}
                          </td>
                        </tr>
                      </table>
                    </td>
                  `,
                    )
                    .join("")}
                </tr>
              </table>

              <p style="margin-top: 20px; width: 80%; text-align: center; font-size: 16px; color: #555; margin-left: auto; margin-right: auto;">
                Por favor ingresa este código en <strong>Biblioteca Artemisa</strong> para confirmar que este es tu correo electrónico.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
