/**
 * DG Solutions — Lead Capture Web App
 *
 * Recibe POST con JSON {name, email, phone, message, website} desde el formulario
 * de contacto en https://dg-solutions-web.vercel.app/#contact.
 * Guarda cada lead en una Google Sheet y envía notificación HTML por email.
 *
 * IMPORTANTE — CORS:
 * Google Apps Script Web Apps NO permite setear headers Access-Control-Allow-Origin.
 * Para que el navegador acepte la respuesta sin disparar preflight OPTIONS, el
 * frontend DEBE enviar con Content-Type: text/plain;charset=utf-8 (request "simple").
 * El body sigue siendo JSON parseado en doPost via e.postData.contents.
 */

const SHEET_ID = 'PEGA_AQUI_TU_ID';
const SHEET_NAME = 'Leads';
const NOTIFICATION_EMAIL = 'dg.solutions.contacto@gmail.com';
const SITE_ORIGIN = 'dg-solutions-web.vercel.app';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: si "website" viene lleno, es bot. Respondemos success sin guardar.
    if (data.website && String(data.website).trim() !== '') {
      return jsonResponse({ result: 'success' });
    }

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const phone = String(data.phone || '').trim();
    const message = String(data.message || '').trim();

    if (!name || !email || !message) {
      return jsonResponse({ result: 'error', message: 'Missing required fields' });
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Nombre', 'Email', 'Telefono', 'Mensaje', 'Origen']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, email, phone, message, SITE_ORIGIN]);

    const htmlBody = buildEmailHtml({ name: name, email: email, phone: phone, message: message, timestamp: timestamp });
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: 'Nuevo lead — DG Solutions',
      htmlBody: htmlBody,
      replyTo: email,
    });

    return jsonResponse({ result: 'success' });
  } catch (err) {
    Logger.log('doPost error: ' + err);
    return jsonResponse({ result: 'error', message: String(err) });
  }
}

function doGet(e) {
  return jsonResponse({ result: 'ok', service: 'DG Solutions lead capture' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildEmailHtml(lead) {
  const fmt = Utilities.formatDate(lead.timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  const phoneRow = lead.phone
    ? '<tr><td style="padding:10px 14px;background:#F5F0FF;font-weight:700;color:#1A1560;">Teléfono</td><td style="padding:10px 14px;color:#3B3F52;">' + escapeHtml(lead.phone) + '</td></tr>'
    : '';
  return [
    '<!DOCTYPE html>',
    '<html><body style="margin:0;padding:24px;background:#FDFCFF;font-family:Arial,Helvetica,sans-serif;color:#111318;">',
    '<table cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #DDD2FF;border-radius:14px;overflow:hidden;">',
    '<tr><td style="padding:20px 24px;background:#4D2FBF;color:#FFFFFF;font-size:18px;font-weight:900;">Nuevo lead — DG Solutions</td></tr>',
    '<tr><td style="padding:16px 24px;color:#666C80;font-size:13px;border-bottom:1px solid #ECE4FF;">Recibido el ' + fmt + ' desde ' + SITE_ORIGIN + '</td></tr>',
    '<tr><td style="padding:18px 24px 24px 24px;">',
    '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px;">',
    '<tr><td style="padding:10px 14px;background:#F5F0FF;font-weight:700;color:#1A1560;width:120px;">Nombre</td><td style="padding:10px 14px;color:#3B3F52;">' + escapeHtml(lead.name) + '</td></tr>',
    '<tr><td style="padding:10px 14px;background:#F5F0FF;font-weight:700;color:#1A1560;">Email</td><td style="padding:10px 14px;color:#3B3F52;"><a href="mailto:' + escapeHtml(lead.email) + '" style="color:#4D2FBF;text-decoration:none;">' + escapeHtml(lead.email) + '</a></td></tr>',
    phoneRow,
    '<tr><td style="padding:10px 14px;background:#F5F0FF;font-weight:700;color:#1A1560;vertical-align:top;">Mensaje</td><td style="padding:10px 14px;color:#3B3F52;white-space:pre-wrap;">' + escapeHtml(lead.message) + '</td></tr>',
    '</table>',
    '</td></tr>',
    '</table>',
    '<p style="text-align:center;color:#969DB2;font-size:12px;margin-top:18px;">Captura automática · ' + SITE_ORIGIN + '</p>',
    '</body></html>'
  ].join('');
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
