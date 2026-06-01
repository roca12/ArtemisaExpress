!(function (o, t) {
  for (var e in t) o[e] = t[e];
})(
  exports,
  (function (o) {
    var t = {};
    function e(n) {
      if (t[n]) return t[n].exports;
      var r = (t[n] = { i: n, l: !1, exports: {} });
      return (o[n].call(r.exports, r, r.exports, e), (r.l = !0), r.exports);
    }
    return (
      (e.m = o),
      (e.c = t),
      (e.d = function (o, t, n) {
        e.o(o, t) || Object.defineProperty(o, t, { enumerable: !0, get: n });
      }),
      (e.r = function (o) {
        ("undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(o, "__esModule", { value: !0 }));
      }),
      (e.t = function (o, t) {
        if ((1 & t && (o = e(o)), 8 & t)) return o;
        if (4 & t && "object" == typeof o && o && o.__esModule) return o;
        var n = Object.create(null);
        if (
          (e.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: o }),
          2 & t && "string" != typeof o)
        )
          for (var r in o)
            e.d(
              n,
              r,
              function (t) {
                return o[t];
              }.bind(null, r),
            );
        return n;
      }),
      (e.n = function (o) {
        var t =
          o && o.__esModule
            ? function () {
                return o.default;
              }
            : function () {
                return o;
              };
        return (e.d(t, "a", t), t);
      }),
      (e.o = function (o, t) {
        return Object.prototype.hasOwnProperty.call(o, t);
      }),
      (e.p = ""),
      e((e.s = 13))
    );
  })([
    function (o, t, e) {
      const { configMongoose: n } = e(1),
        r = e(2);
      ((r.Promise = global.Promise),
        (n.temario = e(26)(r)),
        (n.problema = e(27)(r)),
        (n.usuario = e(28)(r)),
        (n.ruta_component = e(29)(r)),
        (n.link_valioso = e(30)(r)),
        (n.libro = e(31)(r)),
        (n.notificacion = e(32)(r)),
        (o.exports = { configMongoose: n }));
    },
    function (o, t, e) {
      const n = e(2);
      n.Promise = global.Promise;
      e(3).config();
      const r = { mongoose: n, url: process.env.DATABASE };
      o.exports = { configMongoose: r };
    },
    function (o, t) {
      o.exports = require("mongoose");
    },
    function (o, t) {
      o.exports = require("dotenv");
    },
    function (o, t, e) {
      const { obtenerCalendario: n } = e(21);
      o.exports = class {
        constructor(o) {
          o.get("/calendario", this.obtenerInformacionCalendario.bind(this));
        }
        async obtenerInformacionCalendario(o, t) {
          try {
            const o = await n();
            t.status(200).json(o);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
      };
    },
    function (o, t, e) {
      e(5);
      o.exports = class {
        constructor(o) {
          this.calendarios = o.map((o) => ({
            titulo: o.summary,
            eventos: (o.items || []).map(
              (o) => new CalendarioEventoResponse(o),
            ),
          }));
        }
      };
    },
    function (o, t, e) {
      const n = e(24),
        r = e(33);
      o.exports = class {
        constructor(o) {
          ((this.service = new n()),
            o.get("/libro/", this.obtenerLibros.bind(this)),
            o.post("/libro/crear", this.crearLibro.bind(this)),
            o.put(
              "/libro/:id",
              r.fields([{ name: "archivoPdf" }, { name: "imagen" }]),
              this.actualizarLibro.bind(this),
            ),
            o.delete("/libro/:id", this.eliminarLibro.bind(this)));
        }
        async obtenerLibros(o, t) {
          try {
            const o = await this.service.obtenerLibros();
            t.status(200).json(o);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
        async crearLibro(o, t) {
          try {
            const { titulo: e, archivoPdf: n, imagen: r } = o.body,
              i = this.service.crearLibro({
                titulo: e,
                archivoPdf: n,
                imagen: r,
              });
            t.status(200).json(i);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
        async actualizarLibro(o, t) {
          try {
            var e, n;
            const { id: r } = o.params,
              { titulo: i } = o.body,
              a =
                null === (e = o.files) ||
                void 0 === e ||
                null === (e = e.archivoPdf) ||
                void 0 === e ||
                null === (e = e[0]) ||
                void 0 === e
                  ? void 0
                  : e.path,
              s =
                null === (n = o.files) ||
                void 0 === n ||
                null === (n = n.imagen) ||
                void 0 === n ||
                null === (n = n[0]) ||
                void 0 === n
                  ? void 0
                  : n.path,
              c = await this.service.actualizarLibro(r, {
                titulo: i,
                archivoPdf: a,
                imagen: s,
              });
            t.status(200).json(c);
          } catch (o) {
            if ("LIMIT_FILE_SIZE" === o.code)
              return t.status(413).json({
                ok: !1,
                message: "El archivo supera los 10MB permitidos",
              });
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
        async eliminarLibro(o, t) {
          try {
            const { id: e } = o.params;
            (await this.service.eliminarLibro(e),
              t
                .status(200)
                .json({ ok: !0, message: "Archvio eliminado exitosamente." }));
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
      };
    },
    function (o, t, e) {
      const n = e(37);
      o.exports = class {
        constructor(o) {
          ((this.service = new n()),
            o.get("/link-valioso/", this.obtenerLinksValiosos.bind(this)),
            o.post("/link-valioso/crear", this.crearLinkValioso.bind(this)),
            o.put("/link-valioso/:id", this.actualizarLinkValioso.bind(this)),
            o.delete("/link-valioso/:id", this.eliminarLinkValioso.bind(this)));
        }
        async obtenerLinksValiosos(o, t) {
          try {
            const o = await this.service.obtenerLinksValiosos();
            t.status(200).json(o);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
        async crearLinkValioso(o, t) {
          try {
            const { nombre: e, url: n, tags: r, icono: i } = o.body,
              a = await this.service.crearLinkValioso({
                nombre: e,
                url: n,
                tags: r,
                icono: i,
              });
            t.status(201).json(a);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
        async actualizarLinkValioso(o, t) {
          try {
            const { id: e } = o.params,
              { nombre: n, url: r, tags: i, icono: a } = o.body,
              s = await this.service.actualizarLinkValioso(e, {
                nombre: n,
                url: r,
                tags: i,
                icono: a,
              });
            t.status(200).json(s);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
        async eliminarLinkValioso(o, t) {
          try {
            const { id: e } = o.params;
            (await this.service.eliminarLinkValioso(e),
              t
                .status(200)
                .json({ ok: !0, message: "Link eliminado exitosamente" }));
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, message: o.message });
          }
        }
      };
    },
    function (o, t, e) {
      const n = e(40),
        r = e(43);
      o.exports = class {
        constructor(o) {
          ((this.service = new n(new r())),
            o.post("/notificacion/enviar-codigo", this.enviarCodigo.bind(this)),
            o.post(
              "/notificacion/reenviar-codigo",
              this.reenviarCodigo.bind(this),
            ),
            o.post(
              "/notificacion/validar-codigo",
              this.validarCodigo.bind(this),
            ));
        }
        async enviarCodigo(o, t) {
          const { destino: e, usuario: n } = o.body;
          try {
            const o = await this.service.enviarCodigo(e, n);
            t.status(200).json(o);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, error: o.message });
          }
        }
        async reenviarCodigo(o, t) {
          const { destino: e, usuario: n } = o.body;
          try {
            const o = await this.service.reenviarCodigo(e, n);
            t.status(200).json(o);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, error: o.message });
          }
        }
        async validarCodigo(o, t) {
          const { destino: e, codigo: n } = o.body;
          try {
            const o = await this.service.validarCodigo(e, n);
            t.status(200).json(o);
          } catch (o) {
            t.status(o.statusCode || 500).json({ ok: !1, error: o.message });
          }
        }
      };
    },
    function (o, t, e) {
      const n = e(42);
      t.hashPassword = function (o) {
        return n.hashSync(o, 10);
      };
    },
    function (o, t, e) {
      const n = e(48);
      o.exports = class {
        constructor(o) {
          (o.get("/problema/", this.obtenerProblemas.bind(this)),
            o.post("/problema/crear", this.crearProblema.bind(this)));
        }
        async obtenerProblemas(o, t) {
          t.send(await n.findAll());
        }
        async crearProblema(o, t) {
          const e = o.body;
          t.send(await n.crearProblema(e));
        }
      };
    },
    function (o, t, e) {
      const n = e(49);
      o.exports = class {
        constructor(o) {
          (o.get("/temario", this.obtenerTemario.bind(this)),
            o.get("/temario/supergrupos", this.obtenerSupergrupos.bind(this)));
        }
        async obtenerTemario(o, t) {
          t.send(await n.findAll());
        }
        async obtenerSupergrupos(o, t) {
          t.send(await n.supergrupos());
        }
      };
    },
    function (o, t, e) {
      const n = e(50);
      o.exports = class {
        constructor(o) {
          (o.post("/usuario/crear", this.crearUsuario.bind(this)),
            o.post("/usuario/autenticar", this.autenticarUsuario.bind(this)),
            o.post(
              "/usuario/autenticar/captcha",
              this.autenticarCaptcha.bind(this),
            ));
        }
        async crearUsuario(o, t) {
          const e = o.body;
          try {
            const o = await n.crearUsuario(e);
            t.status(200).json(o);
          } catch (o) {
            11e3 === o.code
              ? (console.error("Nombre de usuario o correo ya están en uso"),
                t.status(409).json({
                  ok: !1,
                  message: "Nombre de usuario o correo ya están en uso",
                }))
              : (console.error("Error registrando al usuario: ", o),
                t.status(500).json({
                  ok: !1,
                  message: "Error registrando al usuario.",
                  error: o.message,
                }));
          }
        }
        async autenticarCaptcha(o, t) {
          const { token: e } = o.body;
          t.send(await n.autenticarToken(e));
        }
        async autenticarUsuario(o, t) {
          const { usuario: e, contrasenia: r } = o.body;
          try {
            const o = await n.autenticarUsuario(e, r);
            t.status(200).json(o);
          } catch (o) {
            (console.error("Usuario o contraseña invalidos: ", o),
              t.status(404).json({
                ok: !1,
                message: "Usuario o contraseña invalidos.",
                error: o.message,
              }));
          }
        }
      };
    },
    function (o, t, e) {
      "use strict";
      const n = e(14),
        r = e(15),
        { configMongoose: i } = e(1),
        a = e(16),
        s = e(17),
        c = e(3),
        u = e(18),
        l = e(19);
      c.config();
      const d = n(),
        p = n.Router(),
        f = r({ windowMs: 9e5, max: 100, validate: { creationStack: !1 } });
      d.use(f);
      const m = (process.env.CORS || "")
        .split(",")
        .map((o) => o.trim())
        .filter((o) => o);
      (d.use(
        l({
          origin: m,
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          allowedHeaders: ["Content-Type", "Authorization"],
          credentials: !0,
        }),
      ),
        d.options("*", l()),
        d.use(
          u(
            "[36murl:[0m :url\n[36mmethod:[0m :method\n[36mstatus_code:[0m :status\n[36mtime:[0m :response-time ms\n[36mdate:[0m :date[iso]\n",
          ),
        ),
        d.use(n.json()),
        d.use(n.urlencoded({ extended: !0 })),
        d.use(s.json()));
      ([
        "temario",
        "problema",
        "usuario",
        "link_valioso",
        "calendario",
        "libro",
        "notificacion",
      ].forEach((o) => new (e(20)("./" + o))(p)),
        d.use("/.netlify/functions/api", p),
        d.use("/", p),
        i.mongoose
          .connect(i.url, { useNewUrlParser: !0, useUnifiedTopology: !0 })
          .then(() => console.log("Database connected"))
          .catch((o) => console.error("Mongo connection error:", o)),
        d.use((o, t) => {
          t.status(404).json({ error: "Not found" });
        }),
        (o.exports = d),
        (o.exports.handler = a(d)));
    },
    function (o, t) {
      o.exports = require("express");
    },
    function (o, t) {
      o.exports = require("express-rate-limit");
    },
    function (o, t) {
      o.exports = require("serverless-http");
    },
    function (o, t) {
      o.exports = require("body-parser");
    },
    function (o, t) {
      o.exports = require("morgan");
    },
    function (o, t) {
      o.exports = require("cors");
    },
    function (o, t, e) {
      var n = {
        "./calendario": 4,
        "./calendario.js": 4,
        "./libro": 6,
        "./libro.js": 6,
        "./link_valioso": 7,
        "./link_valioso.js": 7,
        "./notificacion": 8,
        "./notificacion.js": 8,
        "./problema": 10,
        "./problema.js": 10,
        "./temario": 11,
        "./temario.js": 11,
        "./usuario": 12,
        "./usuario.js": 12,
      };
      function r(o) {
        var t = i(o);
        return e(t);
      }
      function i(o) {
        if (!e.o(n, o)) {
          var t = new Error("Cannot find module '" + o + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        return n[o];
      }
      ((r.keys = function () {
        return Object.keys(n);
      }),
        (r.resolve = i),
        (o.exports = r),
        (r.id = 20));
    },
    function (o, t, e) {
      const n = e(22),
        r = e(5),
        i = e(23);
      t.obtenerCalendario = async function () {
        try {
          const e = new Date(),
            i = process.env.LIST_CALENDAR.toString().split(","),
            a = await Promise.all(
              i.map(async (o) => {
                const t = new Date(
                    new Date().setMonth(e.getMonth() - 3),
                  ).toISOString(),
                  r = new Date(
                    new Date().setMonth(e.getMonth() + 3),
                  ).toISOString(),
                  i = `${process.env.API_GOOGLE_CALENDAR}/${o}/events?calendarId=${o}&singleEvents=true&timeZone=America/Bogota&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${t}&timeMax=${r}&key=${process.env.KEY_CALENDAR}`;
                return (await n.get(i)).data;
              }),
            );
          for (const e of a) {
            var o;
            if (null != e && null !== (o = e.items) && void 0 !== o && o.length)
              for (const o of e.items) {
                var t;
                o.url =
                  null != o &&
                  null !== (t = o.location) &&
                  void 0 !== t &&
                  t.includes("http")
                    ? o.location
                    : "";
              }
          }
          return new r(a);
        } catch (o) {
          throw new i();
        }
      };
    },
    function (o, t) {
      o.exports = require("axios");
    },
    function (o, t) {
      class e extends Error {
        constructor(o = "Error al obtener datos del calendario") {
          (super(o),
            (this.name = "CalendarioApiException"),
            (this.statusCode = 502));
        }
      }
      o.exports = e;
    },
    function (o, t, e) {
      const n = e(25);
      o.exports = class {
        async obtenerLibros() {
          return n.findAll();
        }
        async crearLibro({ titulo: o, archivoPdf: t, imagen: e }) {
          if (!o) throw new Error("El título es obligatorio");
          if (!o) throw new Error("El archivo PDF es obligatorio");
          return n.createbook({ titlo: titlo, archivoPdf: t, imagen: e });
        }
        async actualizarLibro(o, { titulo: t, archivoPdf: e, imagen: r }) {
          if (!o) throw new Error("El ido es obligatorio");
          const i = {};
          return (
            t && (i.titulo = t),
            e && (i.archivoPdf = e),
            r && (i.imagen = r),
            n.updatebook({ id: o, datos: i })
          );
        }
        async eliminarLibro(o) {
          if (!o) throw new Error("El ido es obligatorio");
          return n.deletebook(o);
        }
      };
    },
    function (o, t, e) {
      const { configMongoose: n } = e(0),
        r = n.libro;
      ((t.findAll = async function () {
        return r.find({});
      }),
        (t.createbook = async function ({
          titulo: o,
          archivoPdf: t,
          imagen: e,
        }) {
          return new r({ titulo: o, archivoPdf: t, imagen: e });
        }),
        (t.updatebook = async function ({ id: o, datos: t }) {
          return r.findByIdAndUpdate(o, t, { new: !0 });
        }),
        (t.deletebook = async function ({ id: o }) {
          return r.findByIdAndRemove(o);
        }));
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            ID: { type: Number },
            supergrupo: { type: String },
            tema: { type: String },
            texto: { type: String },
            complejidad_tiempo: { type: String, default: null },
            java: { type: String, default: null },
            cpp: { type: String, default: null },
            py: { type: String, default: null },
            orden: { type: Number },
            suborden: { type: Number },
            fecha_creacion: { type: String },
            fecha_modificacion: { type: String },
          },
          { collection: "temario" },
        );
        return o.models.temario || o.model("temario", t);
      };
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            id: { type: Number },
            titulo: { type: String },
            juez: { type: String },
            alias: { type: Number },
            dificultad: { type: Number },
            tema_1: { type: String },
            tema_2: { type: String },
            tema_3: { type: String },
            tema_4: { type: String },
            url: { type: String },
          },
          { collection: "problemas" },
        );
        return o.models.problemas || o.model("problemas", t);
      };
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            contrasenia: { type: String },
            rol: { type: String },
            usuario: { type: String, unique: !0, required: !0 },
            correo: { type: String, unique: !0, required: !0 },
            verificacion: { type: String },
          },
          { collection: "usuario" },
        );
        return o.models.usuario || o.model("usuario", t);
      };
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            path: { type: String },
            title: { type: String },
            icon: { type: String, default: "" },
            class: { type: String },
            extralink: { type: Boolean, default: !1 },
            submenu: { type: Array, default: [] },
            perfil: { type: Array, default: [] },
          },
          { collection: "ruta_component" },
        );
        return o.models.ruta_component || o.model("ruta_component", t);
      };
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            nombre: { type: String },
            url: { type: String },
            tags: { type: String },
            icono: { type: String },
          },
          { collection: "link_valioso" },
        );
        return o.models.link_valioso || o.model("link_valioso", t);
      };
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            titulo: { type: String },
            archivoPdf: { type: String },
            imagen: { type: String },
          },
          { collection: "libro" },
        );
        return o.models.libro || o.model("libro", t);
      };
    },
    function (o, t) {
      o.exports = (o) => {
        const t = new o.Schema(
          {
            destino: { type: String, required: !0 },
            tipo: { type: String, required: !0 },
            plantilla: { type: String, required: !0 },
            datos: { type: o.Schema.Types.Mixed },
            enviado: { type: Boolean, default: !1 },
            creadoEn: { type: Date, default: Date.now },
          },
          { collection: "notificacion" },
        );
        return o.models.notificacion || o.model("notificacion", t);
      };
    },
    function (o, t, e) {
      const n = e(34),
        { CloudinaryStorage: r } = e(35),
        i = e(36);
      n.config({
        cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const a = new r({
        cloudinary: n,
        params: {
          folder: "artemisa/libros",
          resource_type: "raw",
          allowed_formats: ["pdf"],
        },
      });
      o.exports = i({ storage: a, limits: { fileSize: 10485760 } });
    },
    function (o, t) {
      o.exports = require("cloudinary");
    },
    function (o, t) {
      o.exports = require("multer-storage-cloudinary");
    },
    function (o, t) {
      o.exports = require("multer");
    },
    function (o, t, e) {
      const n = e(38),
        r = e(39);
      o.exports = class {
        async crearLinkValioso({ nombre: o, url: t, tags: e, icono: i }) {
          if (!o) throw new Error("El nombre es obligatorio");
          if (!t) throw new Error("La URL es obligatoria");
          if (!e) throw new Error("Los tags es obligatorio");
          if (!i) throw new Error("El icono es obligatorio");
          if (!r.esUrlValida(t)) throw new Error("El url no es válida");
          return n.create({ nombre: o, url: t, tags: e, icono: i });
        }
        async obtenerLinksValiosos() {
          return n.findAll();
        }
        async actualizarLinkValioso(
          o,
          { nombre: t, url: e, tags: i, icono: a },
        ) {
          if (!o) throw new Error("El id es obligatorio");
          if (!t) throw new Error("El nombre es obligatorio");
          if (!a) throw new Error("El icono es obligatorio");
          if (e && !r.esUrlValida(e)) throw new Error("La URL no es válida");
          let s = {},
            c = !1;
          if (
            (t && ((s.nombre = t), (c = !0)),
            e && ((s.url = e), (c = !0)),
            i && ((s.tags = i), (c = !0)),
            a && ((s.icono = a), (c = !0)),
            !c)
          )
            throw new Error(
              "Es necesario que alguno de los campos no esté vacío",
            );
          return n.updateOne({ id: o, datos: s });
        }
        async eliminarLinkValioso(o) {
          if (!o) throw new Error("El id es obligatorio");
          return n.deleteOne(o);
        }
      };
    },
    function (o, t, e) {
      const { configMongoose: n } = e(0),
        r = n.link_valioso;
      ((t.findAll = async function () {
        return r.find({});
      }),
        (t.updateOne = async function ({ id: o, datos: t }) {
          return r.findOneAndUpdate({ _id: o }, t, { new: !0 });
        }),
        (t.deleteOne = async function (o) {
          return r.findOneAndDelete({ _id: o });
        }),
        (t.create = async function (o) {
          return new r(o).save();
        }));
    },
    function (o, t) {
      o.exports = {
        esUrlValida: function (o) {
          try {
            const t = new URL(o);
            return "http:" === t.protocol || "https:" === t.protocol;
          } catch (o) {
            return !1;
          }
        },
      };
    },
    function (o, t, e) {
      const n = e(41),
        { sha256: r } = e(9);
      function i() {
        const o = [];
        for (let t = 0; t < 4; t++)
          Math.random() < 0.5
            ? o.push(String.fromCharCode(Math.floor(26 * Math.random()) + 65))
            : o.push(String.fromCharCode(Math.floor(10 * Math.random()) + 48));
        return o.join("");
      }
      o.exports = class {
        constructor(o) {
          this.strategy = o;
        }
        async enviarCodigo(o, t) {
          const e = i(),
            a = await n.createOne({
              destino: o,
              tipo: this.strategy.tipo,
              plantilla: "verificacion",
              datos: {
                usuario: t,
                codigo: r(e),
                expiraEn: new Date(Date.now() + 3e5),
                usado: !1,
              },
            });
          return (
            await this.strategy.send(o, { usuario: t, codigo: e }),
            await n.marcarEnviado(a._id),
            { success: !0, message: "Código enviado exitosamente" }
          );
        }
        async reenviarCodigo(o, t) {
          const e = i();
          return (
            await n.updateOne(o, "verificacion", {
              usuario: t,
              codigo: r(e),
              expiraEn: new Date(Date.now() + 3e5),
              usado: !1,
            }),
            await this.strategy.send(o, { usuario: t, codigo: e }),
            { success: !0, message: "Código enviado exitosamente" }
          );
        }
        async validarCodigo(o, t) {
          const e = await n.findOne(o, "verificacion");
          return (
            !!e &&
            !e.datos.usado &&
            e.datos.expiraEn > new Date() &&
            e.datos.codigo === r(t)
          );
        }
        async enviarAviso(o, t) {
          const e = await n.createOne({
            destino: o,
            tipo: this.strategy.tipo,
            plantilla: "aviso",
            datos: t,
          });
          (await this.strategy.send(o, t), await n.marcarEnviado(e._id));
        }
      };
    },
    function (o, t, e) {
      const { configMongoose: n } = e(0),
        r = n.notificacion;
      ((t.createOne = async function (o) {
        return new r(o).save();
      }),
        (t.findOne = async function (o, t) {
          return new r.findOne(o, t);
        }),
        (t.updateOne = async function (o, t, e) {
          return r.findOneAndUpdate(
            { destino: o, plantilla: t },
            { datos: e },
            { new: !0, sort: { creadoEn: -1 } },
          );
        }),
        (t.marcarEnviado = async function (o) {
          return r.findByIdAndUpdate(o, { enviado: !0 }, { new: !0 });
        }));
    },
    function (o, t) {
      o.exports = require("bcrypt");
    },
    function (o, t, e) {
      const n = e(44),
        { sendVerificationCode: r } = e(45);
      o.exports = class extends n {
        get tipo() {
          return "email";
        }
        async send(o, t) {
          await r(o, t.usuario, t.codigo);
        }
      };
    },
    function (o, t) {
      o.exports = class {
        get tipo() {
          throw new Error(this.constructor.name + " debe implementar 'tipo'");
        }
        async send(o, t) {
          throw new Error(
            this.constructor.name + " debe implementar 'send(destino,datos)'",
          );
        }
      };
    },
    function (o, t, e) {
      const n = e(46),
        r = e(47),
        i = n.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.APP_PASSWORD,
          },
        });
      ((t.sendMail = async function (o, t, e) {
        const n = {
          from: process.env.MAIL_USERNAME,
          to: o,
          subject: t,
          html: e,
        };
        try {
          const o = await i.sendMail(n);
          return (console.log("Correo enviado: ", o.response), o);
        } catch (o) {
          throw (console.error("Error enviando el correo:", o), o);
        }
      }),
        (t.sendVerificationCode = async function (o, e, n) {
          const i = r.mailVerifyTemplate(e, n);
          return t.sendMail(o, "Codigo Verificación", i);
        }));
    },
    function (o, t) {
      o.exports = require("nodemailer");
    },
    function (o, t) {
      t.mailVerifyTemplate = (o, t) =>
        `\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width">\n  <title>Verificación de Correo</title>\n</head>\n<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">\n  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">\n    <tr>\n      <td align="center" style="padding: 20px 0;">\n        <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); margin: 0 auto;">\n          <tr>\n            <td align="center" style="padding: 30px;">\n              <img src="https://artemisaexpress.com/app/assets/logo.png" alt="Logo Artemisa" width="150" style="display: block; margin: 0 auto;">\n\n              <table width="80%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px auto 0; border-top: 1px solid #196774;">\n                <tr>\n                  <td align="center" style="padding-top: 30px;">\n                    <h1 style="font-size: 28px; margin: 0; color: #363432;">Bienvenido</h1>\n                  </td>\n                </tr>\n              </table>\n\n              <h2 style="font-size: 24px; color: #196774; margin: 20px 0 30px 0;">${o}</h2>\n\n              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">\n                <tr>\n                  ${t
          .split("")
          .map(
            (o) =>
              `\n                    <td style="padding: 0 5px;">\n                      <table border="0" cellspacing="0" cellpadding="0">\n                        <tr>\n                          <td align="center" width="60" height="60" bgcolor="#e0e0e0" style="border-radius: 10px; font-weight: bold; font-size: 24px;">\n                            ${o}\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  `,
          )
          .join(
            "",
          )}\n                </tr>\n              </table>\n\n              <p style="margin-top: 20px; width: 80%; text-align: center; font-size: 16px; color: #555; margin-left: auto; margin-right: auto;">\n                Por favor ingresa este código en <strong>Biblioteca Artemisa</strong> para confirmar que este es tu correo electrónico.\n              </p>\n            </td>\n          </tr>\n        </table>\n      </td>\n    </tr>\n  </table>\n</body>\n</html>\n`;
    },
    function (o, t, e) {
      const { configMongoose: n } = e(0),
        r = n.problema;
      ((t.findAll = async function () {
        try {
          return { data: await r.find({}) };
        } catch (o) {
          throw o;
        }
      }),
        (t.crearProblema = async function (o) {
          try {
            let t = {};
            return (
              o &&
                o.id &&
                o.titulo &&
                o.juez &&
                o.url &&
                o.alias &&
                (await (async (e, n, i, a) => {
                  t = await new r({
                    id: o.id,
                    titulo: o.titulo,
                    juez: o.juez,
                    alias: o.alias,
                    dificultad:
                      null !== (e = o.dificultad) && void 0 !== e ? e : 0,
                    tema_1: o.tema_1,
                    tema_2: null !== (n = o.tema_2) && void 0 !== n ? n : "",
                    tema_3: null !== (i = o.tema_3) && void 0 !== i ? i : "",
                    tema_4: null !== (a = o.tema_4) && void 0 !== a ? a : "",
                    url: o.url,
                  }).save();
                })()),
              t
            );
          } catch (o) {
            throw o;
          }
        }));
    },
    function (o, t, e) {
      const { configMongoose: n } = e(0),
        r = n.temario;
      ((t.findAll = async function () {
        try {
          return { data: await r.find({}) };
        } catch (o) {
          throw o;
        }
      }),
        (t.supergrupos = async function () {
          try {
            const o = await r.aggregate([{ $group: { _id: "$supergrupo" } }]);
            return { data: o.map((o) => o._id) };
          } catch (o) {
            throw o;
          }
        }));
    },
    function (o, t, e) {
      const { configMongoose: n } = e(0),
        r = n.usuario,
        i = n.ruta_component,
        a = e(51),
        { hashPassword: s } = e(9);
      ((t.crearUsuario = async function (o) {
        try {
          let t = {};
          return (
            o &&
              o.usuario &&
              o.correo &&
              o.contrasenia &&
              o.rol &&
              (await (async () => {
                ((o.contrasenia = s(o.contrasenia)),
                  (t = await new r(o).save()));
              })()),
            t
          );
        } catch (o) {
          throw o;
        }
      }),
        (t.obtenerUsuario = async function (o) {
          try {
            return r.find({ usuario: o });
          } catch (o) {
            throw o;
          }
        }),
        (t.autenticarUsuario = async function (o, t) {
          try {
            let e = {};
            return (
              o &&
                t &&
                (await (async () => {
                  ((t = s(t)),
                    (e = await r.find({ usuario: o, contrasenia: t })));
                })()),
              {
                token: a.sign(
                  { usuario: e.usuario, correo: e.correo, rol: e.rol },
                  process.env.JWT_KEY,
                  { expiresIn: "1h" },
                ),
              }
            );
          } catch (o) {
            throw o;
          }
        }),
        (t.autenticarToken = async function (o) {
          const t = new URLSearchParams();
          (t.append("response", o),
            t.append("secret", process.env.RECAPTCHA_SECRET_KEY));
          try {
            const o = await fetch(process.env.API_GOOGLE_CAPTCHA, {
              method: "POST",
              body: t,
            });
            return !0 === (await o.json()).success;
          } catch (o) {
            return (console.error("Error el verificar captcha: ", o), !1);
          }
        }),
        (t.obtenerAccesosPorPerfil = async function (o) {
          try {
            return i.find({ perfil: o });
          } catch (o) {
            throw o;
          }
        }));
    },
    function (o, t) {
      o.exports = require("jsonwebtoken");
    },
  ]),
);
