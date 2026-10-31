/**
 * Vocal Tech Marketing - lead intake webhook.
 * Bind this script to a Google Sheet (Extensions > Apps Script), paste, then
 * Deploy > New deployment > Web app: Execute as "Me", access "Anyone".
 */
const SHEET_NAME = 'Leads';
const HEADERS = ['Timestamp', 'IP Address', 'Name', 'Email', 'Phone', 'Service Category', 'Message', 'Page'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = readPayload_(e);
    if (data.website) return reply_({ ok: true });           // honeypot tripped, drop silently
    const problem = validate_(data);
    if (problem) return reply_({ ok: false, error: problem });

    const sheet = getSheet_();
    sheet.appendRow([
      data.timestamp ? new Date(data.timestamp) : new Date(),
      safe_(data.ip), safe_(data.name), safe_(data.email),
      safe_(data.phone), safe_(data.service), safe_(data.message), safe_(data.page)
    ]);
    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return reply_({ ok: true, service: 'vtm-lead-intake' });
}

function readPayload_(e) {
  const raw = e && e.postData && e.postData.contents;
  if (raw) {
    try { return JSON.parse(raw); } catch (_) { /* fall through to form params */ }
  }
  return (e && e.parameter) || {};
}

function validate_(d) {
  if (!d.name || String(d.name).trim().length < 2) return 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(d.email || '').trim())) return 'Valid email is required';
  const digits = String(d.phone || '').replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return 'Valid phone is required';
  if (!d.service) return 'Service is required';
  if (!d.message || String(d.message).trim().length < 10) return 'Message is too short';
  return '';
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stops spreadsheet formula injection and caps cell size.
function safe_(v) {
  const s = String(v == null ? '' : v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
