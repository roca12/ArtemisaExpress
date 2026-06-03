const UsuarioService = require("../service/UsuarioService");
const RegisterRequest = require("../dto/RegisterRequest");
const LoginRequest = require("../dto/LoginRequest");
const CambiarEmailRequest = require("../dto/CambiarEmailRequest");
const CambiarContraseniaRequest = require("../dto/CambiarContraseniaRequest");
const UsuarioResponse = require("../dto/UsuarioResponse");

/**
 * Controlador para las rutas relacionadas con los usuarios.
 */
class Usuario {
  constructor(router, mfaService) {
    this.service = new UsuarioService(mfaService);
    router.post("/usuario/crear", this.crearUsuario.bind(this));
    router.post("/usuario/autenticar", this.autenticarUsuario.bind(this));
    router.post(
      "/usuario/autenticar/captcha",
      this.autenticarCaptcha.bind(this),
    );
    router.patch(
      "/usuario/cambiar-correo",
      this.cambiarEmailDeUsuario.bind(this),
    );
    router.patch(
      "/usuario/cambiar-contrasenia",
      this.cambiarContrasenia.bind(this),
    );
    router.post("/usuario/verificar-correo", this.verificarCorreo.bind(this));
  }

  /**
   * @openapi
   * /usuario/crear:
   *   post:
   *     tags: [Usuario]
   *     summary: Registra un nuevo usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [usuario, correo, contrasenia]
   *             properties:
   *               usuario:
   *                 type: string
   *                 example: juan123
   *               correo:
   *                 type: string
   *                 format: email
   *                 example: juan@ejemplo.com
   *               contrasenia:
   *                 type: string
   *                 format: password
   *                 example: miContrasenia123
   *               verificacion:
   *                 type: string
   *                 example: A3K7
   *     responses:
   *       200:
   *         description: Usuario creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 usuario: { type: string, example: juan123 }
   *                 correo: { type: string, example: juan@ejemplo.com }
   *       400:
   *         description: Datos de entrada inválidos
   *       409:
   *         description: Nombre de usuario o correo ya en uso
   *       500:
   *         description: Error interno del servidor
   */
  async crearUsuario(req, res) {
    const request = new RegisterRequest(req.body);
    const errors = request.validate();
    if (errors.length > 0) {
      return res.status(400).json({ ok: false, errors });
    }
    try {
      const resultado = await this.service.crearUsuario(request.toModel());
      return res
        .status(200)
        .json({ ok: true, message: "usuario registrado exitosamente." });
    } catch (error) {
      if (error.code === 11000) {
        console.error("Nombre de usuario o correo ya están en uso");
        return res.status(409).json({
          ok: false,
          message: "Nombre de usuario o correo ya están en uso",
        });
      } else {
        console.error("Error registrando al usuario: ", error);
        return res.status(500).json({
          ok: false,
          message: "Error registrando al usuario.",
          error: error.message,
        });
      }
    }
  }

  /**
   * @openapi
   * /usuario/autenticar/captcha:
   *   post:
   *     tags: [Usuario]
   *     summary: Valida un token de reCAPTCHA
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [token]
   *             properties:
   *               token:
   *                 type: string
   *                 example: 03AGdBq25...
   *     responses:
   *       200:
   *         description: Resultado de la validación
   *         content:
   *           application/json:
   *             schema:
   *               type: boolean
   *               example: true
   *       500:
   *         description: Error interno del servidor
   */
  async autenticarCaptcha(req, res) {
    try {
      const { token } = req.body;
      const resultado = await this.service.autenticarToken(token);
      res.status(200).json(resultado);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /usuario/cambiar-correo:
   *   patch:
   *     tags: [Usuario]
   *     summary: Cambia el correo electrónico de un usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nombreDeUsuario, correo]
   *             properties:
   *               nombreDeUsuario:
   *                 type: string
   *                 example: juan123
   *               correo:
   *                 type: string
   *                 format: email
   *                 example: nuevo@ejemplo.com
   *     responses:
   *       200:
   *         description: Correo actualizado exitosamente
   *       400:
   *         description: Datos inválidos o usuario no encontrado
   */
  async cambiarEmailDeUsuario(req, res) {
    const request = new CambiarEmailRequest(req.body);
    const errors = request.validate();
    if (errors.length > 0) return res.status(400).json({ ok: false, errors });
    try {
      const resultado = await this.service.cambiarEmailDeUsuario(
        request.nombreDeUsuario,
        request.correo,
      );
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({ ok: false, message: error.message });
    }
  }

  /**
   * @openapi
   * /usuario/cambiar-contrasenia:
   *   patch:
   *     tags: [Usuario]
   *     summary: Cambia la contraseña de un usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nombreDeUsuario, nuevaContrasenia]
   *             properties:
   *               nombreDeUsuario:
   *                 type: string
   *                 example: juan123
   *               nuevaContrasenia:
   *                 type: string
   *                 format: password
   *                 example: nuevaContrasenia456
   *     responses:
   *       200:
   *         description: Contraseña actualizada exitosamente
   *       400:
   *         description: Datos inválidos o usuario no encontrado
   */
  async cambiarContrasenia(req, res) {
    const request = new CambiarContraseniaRequest(req.body);
    const errors = request.validate();
    if (errors.length > 0) return res.status(400).json({ ok: false, errors });
    try {
      const resultado = await this.service.cambiarContrasenia(
        request.nombreDeUsuario,
        request.nuevaContrasenia,
      );
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({ ok: false, message: error.message });
    }
  }

  /**
   * @openapi
   * /usuario/autenticar:
   *   post:
   *     tags: [Usuario]
   *     summary: Inicia sesión y retorna un token JWT
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [usuario, contrasenia]
   *             properties:
   *               usuario:
   *                 type: string
   *                 example: juan123
   *               contrasenia:
   *                 type: string
   *                 format: password
   *                 example: miContrasenia123
   *     responses:
   *       200:
   *         description: Login exitoso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *       400:
   *         description: Campos requeridos faltantes
   *       401:
   *         description: Usuario o contraseña inválidos
   *       403:
   *         description: Correo electrónico no verificado
   */
  async autenticarUsuario(req, res) {
    const request = new LoginRequest(req.body);
    const errors = request.validate();
    if (errors.length > 0) return res.status(400).json({ ok: false, errors });
    try {
      const resultado = await this.service.autenticarUsuario(
        request.usuario,
        request.contrasenia,
      );
      return res.status(200).json(resultado);
    } catch (error) {
      if (error.message === "Correo no verificado") {
        return res.status(403).json({
          ok: false,
          message: "Debes verificar tu correo antes de iniciar sesión",
        });
      }
      console.error("Usuario o contraseña invalidos: ", error);
      return res.status(401).json({
        ok: false,
        message: "Usuario o contraseña invalidos.",
      });
    }
  }

  /**
   * @openapi
   * /usuario/verificar-correo:
   *   post:
   *     tags: [Usuario]
   *     summary: Verifica el correo electrónico de un usuario con el código recibido
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [correo, codigo]
   *             properties:
   *               correo:
   *                 type: string
   *                 format: email
   *                 example: juan@ejemplo.com
   *               codigo:
   *                 type: string
   *                 example: A3K7
   *     responses:
   *       200:
   *         description: Correo verificado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok: { type: boolean, example: true }
   *                 message: { type: string, example: Correo verificado exitosamente. }
   *       400:
   *         description: Código inválido, expirado o campos faltantes
   */
  async verificarCorreo(req, res) {
    const { correo, codigo } = req.body;
    if (!correo || !codigo)
      return res
        .status(400)
        .json({ ok: false, message: "Correo y código son requeridos" });
    try {
      await this.service.verificarCorreo(correo, codigo);
      return res
        .status(200)
        .json({ ok: true, message: "Correo verificado exitosamente." });
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  }
}

module.exports = Usuario;
