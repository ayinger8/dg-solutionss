# Design — GAS Lead Capture Integration

**Date:** 2026-06-10
**Project:** DG Solutions landing (Next.js 16 + Tailwind v4 + Framer Motion, Vercel)
**Repo:** ayinger8/dg-solutionss
**Goal:** Conectar el formulario de contacto existente (`app/page.jsx`, función `ContactForm`) a un Google Apps Script Web App que (1) guarde cada lead en una Google Sheet y (2) envíe una notificación por email.

---

## 1. Constraints (del usuario)

- Sin servicios pagos.
- Sin API routes en Next.js, sin base de datos. Solo GAS.
- Sin instalar paquetes npm nuevos.
- No modificar archivos fuera del componente `ContactForm` (dentro de `app/page.jsx`) ni del nuevo script de GAS.
- No tocar styling — solo cablear lógica.

## 2. Decisión técnica clave — CORS sin preflight

GAS Web Apps **no permiten** setear headers `Access-Control-Allow-Origin` arbitrarios; la plataforma no lo soporta. La práctica estándar (y la única que funciona desde un dominio Vercel sin un proxy intermedio) es:

- Frontend envía `fetch()` con `Content-Type: text/plain;charset=utf-8` y body `JSON.stringify(data)`.
- Esto es un **"simple request"** CORS — el navegador no dispara `OPTIONS` preflight.
- GAS lee el JSON desde `e.postData.contents` y responde con `ContentService.createTextOutput(...).setMimeType(ContentService.MimeType.JSON)`.
- No se requiere `doOptions` ni headers CORS explícitos.

Esto cumple el requisito "MUST include CORS headers" en el sentido que GAS lo permite: el navegador acepta la respuesta sin preflight porque el request es "simple".

## 3. Arquitectura

```
[ContactForm (page.jsx)]
        |
        | fetch POST text/plain  body: JSON.stringify({name, email, phone, message, website})
        v
[GAS Web App doPost]
        |
        +--> SpreadsheetApp.openById(SHEET_ID).getSheetByName('Leads').appendRow(...)
        |
        +--> MailApp.sendEmail({to, subject, htmlBody})
        |
        v
[Response: { result: "success" } | { result: "error", message }]
        |
        v
[ContactForm setStatus("sent" | "error")]
```

## 4. Backend — `scripts/gas/Code.gs`

**Constantes al inicio (editables por el usuario):**

```js
const SHEET_ID = 'PEGA_AQUI_TU_ID';
const SHEET_NAME = 'Leads';
const NOTIFICATION_EMAIL = 'dg.solutions.contacto@gmail.com';
const SITE_ORIGIN = 'dg-solutions-web.vercel.app';
```

**`doPost(e)`:**
1. Parse `JSON.parse(e.postData.contents)`.
2. Honeypot: si `data.website` no está vacío, responder `success` sin guardar nada (engaña al bot).
3. Validar campos requeridos: `name`, `email`, `message`. Si faltan, retornar `{ result: "error", message: "Missing required fields" }`.
4. Abrir Spreadsheet por `SHEET_ID`. Obtener hoja `Leads` (crear si no existe).
5. Si la hoja está vacía, escribir headers: `Timestamp | Nombre | Email | Telefono | Mensaje | Origen`.
6. `appendRow([new Date(), name, email, phone, message, SITE_ORIGIN])`.
7. Construir HTML del email con tabla simple y colores del brand (#4D2FBF).
8. `MailApp.sendEmail({ to: NOTIFICATION_EMAIL, subject: 'Nuevo lead — DG Solutions', htmlBody })`.
9. Retornar `{ result: "success" }`.
10. Todo dentro de try/catch — en error retornar `{ result: "error", message: err.toString() }` y loggear con `Logger.log`.

**`doGet(e)`:** retorna `{ result: "ok", service: "DG Solutions lead capture" }` para test rápido en navegador.

## 5. Frontend — `app/page.jsx` (función `ContactForm`, líneas 618-714)

**Cambios:**

1. Agregar al inicio de la función:
   ```js
   const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;
   ```
2. Cambiar el estado inicial del form para incluir `website` (honeypot):
   ```js
   useState({ name: "", email: "", phone: "", message: "", website: "" });
   ```
3. Reemplazar el `handleSubmit` mock (con `setTimeout` y `Math.random()`) por:
   ```js
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!GAS_URL) { setStatus("error"); return; }
     setStatus("sending");
     try {
       const res = await fetch(GAS_URL, {
         method: "POST",
         headers: { "Content-Type": "text/plain;charset=utf-8" },
         body: JSON.stringify(form),
       });
       const data = await res.json();
       setStatus(data.result === "success" ? "sent" : "error");
     } catch {
       setStatus("error");
     }
   };
   ```
4. Agregar el honeypot dentro del `<form>` (oculto a usuarios, visible a bots):
   ```jsx
   <input
     type="text"
     name="website"
     tabIndex={-1}
     autoComplete="off"
     value={form.website}
     onChange={handleChange}
     style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
     aria-hidden="true"
   />
   ```
5. Actualizar el `setForm({ name:"", email:"", phone:"", message:"" })` del botón "Enviar otro mensaje" para incluir `website: ""`.

**No se toca:** ningún className, ninguna estructura visual, ninguno de los 3 estados visuales existentes (`""`, `"sending"`, `"sent"`, `"error"`).

## 6. `.env.local.example`

```
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
```

## 7. Estructura del Sheet

| Timestamp | Nombre | Email | Telefono | Mensaje | Origen |
|-----------|--------|-------|----------|---------|--------|
| 2026-06-10 14:23:01 | Juana Pérez | juana@ejemplo.com | 6691234567 | Necesito web | dg-solutions-web.vercel.app |

## 8. Plantilla email HTML

Tabla simple, fondo blanco, encabezado violeta (`#4D2FBF`), filas con `Nombre / Email / Teléfono / Mensaje / Recibido`. Sin imágenes externas (entregabilidad).

## 9. Archivos a crear/modificar

| Archivo | Acción | Tamaño aprox |
|---|---|---|
| `scripts/gas/Code.gs` | Crear | ~140 líneas |
| `scripts/gas/README.md` | Crear | ~80 líneas |
| `app/page.jsx` | Modificar `ContactForm` (líneas 618-714) | ~15 líneas cambiadas |
| `.env.local.example` | Crear | 2 líneas |

## 10. Checklist de despliegue (resumen)

1. Crear nuevo Google Sheet en Drive (vacío). Copiar el ID de la URL.
2. Ir a script.google.com → New project → pegar `Code.gs`.
3. Reemplazar `SHEET_ID` con el ID real.
4. Guardar. Ejecutar `doGet` una vez para autorizar permisos (`SpreadsheetApp`, `MailApp`, `Script.external_request`).
5. Deploy → New deployment → Type: Web app → Execute as: Me → Who has access: Anyone → Deploy.
6. Copiar la URL `/exec` resultante.
7. Vercel project → Settings → Environment Variables → agregar `NEXT_PUBLIC_GAS_URL` con la URL → Save.
8. Redeploy en Vercel.
9. Probar el form en producción. Verificar que aparece fila en el Sheet y email en bandeja.

## 11. Riesgos y notas

- **El honeypot solo bloquea bots tontos.** Si recibes spam coordinado, hay que añadir reCAPTCHA invisible (fuera del scope actual).
- **GAS tiene cuotas:** ~20,000 emails/día y ~6 min de ejecución por trigger en cuenta gratuita. Más que suficiente para un sitio de marketing.
- **`NEXT_PUBLIC_GAS_URL` es visible en el bundle del cliente.** Eso es correcto y esperado — la URL del Web App es pública por diseño cuando se publica como "Anyone".
- **La hoja "Leads" crece sin límite.** No es problema en años; si llega a >100k filas, considerar rotación manual.
- **Email destino fijo en código:** si cambias `dg.solutions.contacto@gmail.com` por otro, hay que editar `Code.gs` y re-deploy del Web App.

## 12. Fuera de scope

- reCAPTCHA / hCaptcha
- Doble opt-in / confirmación al lead
- Dashboard de leads / vista en el sitio
- Multi-recipient (CC, BCC)
- Persistencia en CRM externo (HubSpot, etc.)
