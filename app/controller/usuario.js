const UsuarioService = require("../service/UsuarioService");
const RegisterRequest = require("../dto/RegisterRequest");
const LoginRequest = require("../dto/LoginRequest");
const CambiarEmailRequest = require("../dto/CambiarEmailRequest");
const CambiarContraseniaRequest = require("../dto/CambiarContraseniaRequest");
const UsuarioResponse = require("../dto/UsuarioResponse");
const COOKIE_NAME = "token"
// Usamos COOKIE_SECURE (no NODE_ENV) porque webpack reemplaza process.env.NODE_ENV
// en tiempo de compilación; las demás variables sí se leen en runtime vía dotenv.
const isSecure = process.env.COOKIE_SECURE === "true";
const cookieOptions = {
  httpOnly: true,
  secure: isSecure,                    // local: false (http) | prod: true (https)
  sameSite: isSecure ? "none" : "lax", // sameSite "none" exige secure
  maxAge: 60 * 60 * 1000,
  path: "/",
}
const verificarToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");

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
     router.get("/usuario", verificarToken, authorize("admin"), this.obtenerUsuarios.bind(this));
    router.get("/usuario/me", verificarToken, this.obtenerSesion.bind(this));
     router.get("/usuario/rol/:rol", verificarToken, authorize("admin"), this.obtenerUsuariosPorRol.bind(this));
     router.get("/usuario/:id", verificarToken, authorize("admin"), this.obtenerUsuario.bind(this));
     router.delete("/usuario/:id", verificarToken, authorize("admin"), this.eliminarUsuario.bind(this));
     router.post("/usuario/logout", this.logout.bind(this));
  }

  /**
   * @openapi
   * /usuario/me:
   *   get:
   *     tags: [Usuario]
   *     summary: Obtiene los datos del usuario autenticado en la sesión actual
   *     responses:
   *       200:
   *         description: Datos del usuario en sesión
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok: { type: boolean, example: true }
   *                 usuario:
   *                   type: object
   *                   properties:
   *                     usuario: { type: string, example: juan123 }
   *                     correo: { type: string, example: juan@ejemplo.com }
   *                     rol: { type: string, example: estudiante }
   *       401:
   *         description: Token no proporcionado, inválido o expirado
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerSesion(req, res) {
    try{
      const usuario = await this.service.obtenerPorNombre(req.usuario.usuario);
      return res.status(200).json({ok:true, usuario: new UsuarioResponse(usuario)});
    }catch(error){
      return res.status(500).json({ok:false, message: error.message});
    }
  }

  /**
   * @openapi
   * /usuario/logout:
   *   post:
   *     tags: [Usuario]
   *     summary: Cierra la sesión del usuario eliminando la cookie del token
   *     responses:
   *       200:
   *         description: Sesión cerrada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok: { type: boolean, example: true }
   *                 message: { type: string, example: Sesión cerrada }
   */
  async logout(req, res) {
    res.clearCookie(COOKIE_NAME, cookieOptions);
    return res.status(200).json({ ok: true, message: "Sesión cerrada" });
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
      await this.service.crearUsuario(request.toModel());
      return res.status(200).json({ok:true, message:"usuario registrado exitosamente."});
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
      const {token} = await this.service.autenticarUsuario(
        request.usuario,
        request.contrasenia,
      );
      res.cookie(COOKIE_NAME, token, cookieOptions);
      return res.status(200).json({ ok: true, message: "Login exitoso" });
    } catch (error) {
      if (error.message === "Correo no verificado") {
        return res.status(403).json({
          ok: false,
          message: "Debes verificar tu correo antes de iniciar sesión",
        });
      }
      console.error(error.message, error);
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

  /**
   * @openapi
   * /usuario:
   *   get:
   *     tags: [Usuario]
   *     summary: Lista todos los usuarios (requiere rol admin)
   *     responses:
   *       200:
   *         description: Lista de usuarios
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ok: { type: boolean, example: true }
   *                 usuarios:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       usuario: { type: string, example: juan123 }
   *                       correo: { type: string, example: juan@ejemplo.com }
   *                       rol: { type: string, example: estudiante }
   *       401:
   *         description: No autenticado
   *       403:
   *         description: No autorizado (se requiere rol admin)
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerUsuarios(req, res) {
  try {
    const usuarios = await this.service.obtenerUsuarios();
    return res.status(200).json({
      ok: true, usuarios: usuarios.map((u) => new UsuarioResponse(u))
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

/**
 * @openapi
 * /usuario/{id}:
 *   get:
 *     tags: [Usuario]
 *     summary: Obtiene un usuario por su ID (requiere rol admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (se requiere rol admin)
 *       500:
 *         description: Error interno del servidor
 */
async obtenerUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await this.service.obtenerUsuario(id);

    return res.status(200).json({ ok: true, usuario: new UsuarioResponse(usuario) });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

/**
 * @openapi
 * /usuario/rol/{rol}:
 *   get:
 *     tags: [Usuario]
 *     summary: Lista los usuarios que tienen un rol determinado (requiere rol admin)
 *     parameters:
 *       - in: path
 *         name: rol
 *         required: true
 *         schema: { type: string, example: estudiante }
 *         description: Rol por el cual filtrar
 *     responses:
 *       200:
 *         description: Lista de usuarios con el rol indicado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (se requiere rol admin)
 *       500:
 *         description: Error interno del servidor
 */
async obtenerUsuariosPorRol(req, res) {
  try {
    const { rol } = req.params;

    const usuarios = await this.service.obtenerUsuariosPorRol(rol);
    return res.status(200).json({
      ok: true,
      usuarios: usuarios.map((u) => new UsuarioResponse(u))
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

/**
 * @openapi
 * /usuario/{id}:
 *   delete:
 *     tags: [Usuario]
 *     summary: Elimina un usuario por ID (requiere rol admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (se requiere rol admin)
 *       500:
 *         description: Error interno del servidor
 */
async eliminarUsuario(req, res) {
  try {
    const { id } = req.params;

    await this.service.eliminarUsuario(id);

    return res.status(200).json({ ok: true, message: "Usuario eliminado exitosamente." });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

}

module.exports = Usuario;
