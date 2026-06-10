# DG Solutions — Google Apps Script (Lead Capture)

Backend serverless para el formulario de contacto del sitio. Recibe POST desde la landing en Vercel, guarda el lead en una Google Sheet y envía notificación por email.

El archivo `Code.gs` de este directorio NO se ejecuta desde el repo. Se pega manualmente en [script.google.com](https://script.google.com). Lo versionamos aquí solo para referencia y control de cambios.

---

## Despliegue paso a paso

### 1. Crear el Google Sheet

1. Ve a [drive.google.com](https://drive.google.com) e inicia sesión con `dg.solutions.contacto@gmail.com`.
2. Click en **+ Nuevo → Hojas de cálculo de Google** → crea uno vacío.
3. Renombra el archivo: `DG Solutions — Leads`.
4. Copia el **Sheet ID** desde la URL. Está entre `/d/` y `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/AAAA_ESTE_ES_EL_ID_BBBB/edit
                                          ^^^^^^^^^^^^^^^^^^^^^^^
   ```

### 2. Crear el Apps Script

1. Ve a [script.google.com](https://script.google.com) → **Nuevo proyecto**.
2. Renombra el proyecto: `DG Solutions Lead Capture`.
3. Borra el contenido del `Code.gs` por defecto y pega el contenido del archivo `Code.gs` de este directorio.
4. En la línea `const SHEET_ID = 'PEGA_AQUI_TU_ID';`, reemplaza `'PEGA_AQUI_TU_ID'` por el ID del paso 1.4.
5. Guarda con Ctrl+S.

### 3. Autorizar permisos

1. En el desplegable de funciones (arriba), selecciona `doGet`.
2. Click en **Ejecutar**.
3. Aparece "Se necesita autorización":
   - Click **Revisar permisos**.
   - Elige la cuenta `dg.solutions.contacto@gmail.com`.
   - Verás "Google no ha verificado esta app" → click **Avanzado** → **Ir a DG Solutions Lead Capture (no seguro)**.
   - Acepta los 3 permisos:
     - Ver, editar, crear y eliminar tus hojas de cálculo de Google Drive
     - Enviar correo electrónico en tu nombre
     - Conectarse a un servicio externo

### 4. Publicar como Web App

1. Click **Implementar → Nueva implementación**.
2. Icono de engranaje (junto a "Seleccionar tipo") → **Aplicación web**.
3. Configura:
   - **Descripción:** `Lead capture v1`
   - **Ejecutar como:** `Mi cuenta (dg.solutions.contacto@gmail.com)`
   - **Quién tiene acceso:** `Cualquier persona`
     ⚠️ Importante: NO elijas "Cualquier persona con cuenta de Google" — debe ser **Cualquier persona** sin restricción.
4. Click **Implementar**.
5. **Copia la URL** que termina en `/exec`:
   ```
   https://script.google.com/macros/s/AKfycb...xxx/exec
   ```

### 5. Probar el endpoint

Pega la URL del paso 4.5 en una pestaña del navegador. Debes ver:
```json
{"result":"ok","service":"DG Solutions lead capture"}
```

Si ves esto, el backend está vivo. Si ves error 403 o pantalla de login, vuelve al paso 4.3 y verifica que "Quién tiene acceso" sea `Cualquier persona`.

### 6. Configurar Vercel

1. Ve al proyecto en [vercel.com](https://vercel.com) → `dg-solutionss`.
2. **Settings → Environment Variables**.
3. Agrega:
   - **Name:** `NEXT_PUBLIC_GAS_URL`
   - **Value:** la URL del paso 4.5
   - **Environments:** marca los tres (Production, Preview, Development)
4. Click **Save**.
5. Ve a **Deployments**, ubica la última y haz **Redeploy** (sin "Use existing build cache" para garantizar que el nuevo bundle incluya la variable).

### 7. Probar end-to-end

1. Abre `https://dg-solutions-web.vercel.app/#contact`.
2. Llena el formulario con datos reales.
3. Click en "Enviar mensaje".
4. Debes ver el mensaje de éxito en el sitio.
5. Verifica:
   - Nueva fila en el Google Sheet
   - Email en bandeja de `dg.solutions.contacto@gmail.com`

---

## Si modificas `Code.gs`

Cada vez que edites el script en script.google.com tienes que re-publicar la versión:

1. Guarda (Ctrl+S).
2. **Implementar → Administrar implementaciones**.
3. Click en el ícono de lápiz (editar) de la implementación existente.
4. **Versión: Nueva versión** → escribe una descripción → **Implementar**.

La URL `/exec` se mantiene; no necesitas actualizar la variable de entorno en Vercel.

---

## Cómo cambia/funciona

- **CORS:** GAS Web Apps no permiten headers `Access-Control-Allow-Origin` propios. El frontend envía con `Content-Type: text/plain;charset=utf-8` para que el navegador lo trate como request "simple" y no dispare preflight OPTIONS. El body sigue siendo JSON parseado en `doPost`.
- **Honeypot:** el script incluye un campo oculto `website` en el formulario. Bots tontos lo llenan automáticamente; humanos no lo ven. Si llega lleno, el script responde `success` pero descarta el lead.
- **Email destino:** está hardcoded como `NOTIFICATION_EMAIL` en `Code.gs`. Si cambia, edita el script y re-publica (no requiere cambio en Vercel).
- **Hoja `Leads`:** se crea automáticamente la primera vez con headers `Timestamp | Nombre | Email | Telefono | Mensaje | Origen`.

---

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| El form muestra "Algo salió mal" siempre | `NEXT_PUBLIC_GAS_URL` no está en Vercel o no se redeployó | Settings → Env Vars → verificar; redeploy |
| Éxito en el form pero no llega email ni hay fila nueva | `SHEET_ID` mal puesto o el honeypot se llenó solo | Revisar `View → Executions` en script.google.com |
| Error CORS en la consola del navegador | Frontend enviando `Content-Type: application/json` | Debe ser `text/plain;charset=utf-8` |
| GAS retorna 403 / pantalla de login | Web App publicado con acceso restringido | Re-deploy con `Quién tiene acceso: Cualquier persona` |
| Hoja vacía pero email sí llegó | El SHEET_ID apunta a otro Sheet | Verificar la constante en `Code.gs` |
| `MailApp` da error de cuota | Cuenta gratuita: 100 emails/día. Workspace: 1500/día | Esperar o subir cuenta |

---

## Cuotas y límites (cuenta gratuita)

| Recurso | Límite |
|---|---|
| Emails enviados por día | 100 (cuenta gmail.com gratuita) |
| Tiempo de ejecución por trigger | 6 minutos |
| Tamaño de respuesta `ContentService` | 50 MB |

Para un sitio de marketing con tráfico normal, estos límites son holgados.

---

## Fuera de scope

- reCAPTCHA / hCaptcha
- Confirmación al lead (auto-reply)
- Doble opt-in
- Persistencia en CRM externo
