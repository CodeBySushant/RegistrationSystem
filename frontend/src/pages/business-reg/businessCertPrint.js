// src/pages/business-reg/businessCertPrint.js
import { MUNICIPALITY } from "../../config/municipalityConfig";

const v = (val) => (val === null || val === undefined ? "" : String(val));

/* Build the full business-registration certificate HTML for a normalized row.
   `row` uses the normalized shape produced by each report's normalizeRow(). */
export const buildBusinessCertHtml = (row, user) => {
  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `वडा नं. ${row.wardNo || user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

  const CAPS = [
    ["authorizedCapital", "अधिकृत पूँजी"],
    ["currentCapital", "चालु पूँजी"],
    ["issuedCapital", "जारी पूँजी"],
    ["fixedCapital", "स्थिर पूँजी"],
    ["paidCapital", "चुक्ता पूँजी"],
    ["totalCapital", "कुल पूँजी"],
  ];
  const cap = CAPS.map(
    ([k, label]) =>
      `<div class="cap-row"><span>${label} :</span> <span class="value">${v(row[k])}</span></div>`
  ).join("");

  const photoHtml = row.photo ? `<img src="${row.photo}" alt="photo" />` : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>व्यवसाय दर्ता प्रमाण पत्र</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Kalimati','Noto Sans Devanagari',sans-serif; color:#000; background:#fff; padding:12mm 16mm; font-size:11pt; line-height:1.9; }
        .header { text-align:center; margin-bottom:14px; position:relative; min-height:90px; }
        .logo { position:absolute; left:0; top:0; width:70px; }
        .copy-mark { color:#c0392b; font-size:8pt; position:absolute; left:4px; top:74px; }
        .mun-name { color:#c0392b; font-size:20pt; font-weight:700; }
        .ward-title { color:#c0392b; font-size:15pt; font-weight:700; margin:4px 0; }
        .addr { color:#c0392b; font-size:10pt; }
        .cert-title { color:#c0392b; font-size:16pt; font-weight:700; margin-top:10px; }
        .photo-box { position:absolute; top:30px; right:0; width:90px; height:110px; border:1px solid #000; overflow:hidden; }
        .photo-box img { width:100%; height:100%; object-fit:cover; }
        .reg-info { display:flex; justify-content:space-between; margin:18px 0; font-weight:700; font-size:11pt; }
        .section-label { font-weight:700; margin:12px 0 6px; }
        .line { margin-bottom:6px; font-size:11pt; }
        .value { font-weight:bold; padding:0 4px; border-bottom:1px solid #555; }
        .cap-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px 24px; margin:8px 0 16px; }
        .cap-row { font-size:11pt; }
        .declaration { margin-top:18px; font-size:11pt; }
        .declaration p { margin-bottom:10px; }
        .signature { text-align:right; margin-top:30px; margin-right:10px; }
        .applicant-box { border:1px solid #999; padding:14px; margin-top:22px; border-radius:3px; }
        .applicant-title { font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:6px; margin-bottom:10px; }
        .field-row { display:flex; margin-bottom:8px; font-size:10pt; }
        .field-label { min-width:160px; font-weight:600; }
        .field-val { flex:1; }
        .closed-stamp { display:inline-block; border:2px solid #c82333; color:#c82333; font-weight:700; padding:3px 14px; border-radius:4px; margin-top:8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <img class="logo" src="/nepallogo.svg" alt="Nepal" />
        <div class="copy-mark">प्रतिलिपि</div>
        <div class="photo-box">${photoHtml}</div>
        <div class="mun-name">${MUNICIPALITY.name}</div>
        <div class="ward-title">${wardLabel}</div>
        <div class="addr">${MUNICIPALITY.officeLine}</div>
        <div class="addr">${MUNICIPALITY.provinceLine}</div>
        <div class="cert-title">व्यवसाय दर्ता प्रमाण पत्र</div>
      </div>

      <div class="reg-info">
        <div>दर्ता नं : <span class="value">${v(row.regNo)}</span>
          &nbsp; आ.व : <span class="value">${v(row.fiscalYear)}</span></div>
        <div>मिति : <span class="value">${v(row.regDate)}</span></div>
      </div>

      <div class="section-label">(क) व्यवसाय व्यवसायीको विवरण :-</div>
      <div class="line">१. पूरा नाम, थर : <span class="value">${v(row.fullName)}</span></div>
      <div class="line">२. नागरिकता नं : <span class="value">${v(row.citizenshipNo)}</span>
        जारी मिति : <span class="value">${v(row.citizenshipIssueDate)}</span>
        जिल्ला : <span class="value">${v(row.citizenshipIssueDistrict)}</span></div>
      <div class="line">३. गाउँपालिका/नगरपालिका : <span class="value">${v(row.municipality) || MUNICIPALITY.name}</span>
        वडा नं : <span class="value">${v(row.wardNo)}</span>
        टोल : <span class="value">${v(row.tole)}</span>
        जिल्ला : <span class="value">${v(row.residenceDistrict) || MUNICIPALITY.city || ""}</span></div>
      <div class="line">४. बाबुको नाम, थर : <span class="value">${v(row.fatherName)}</span></div>
      <div class="line">५. पति/पत्नीको नाम, थर : <span class="value">${v(row.spouseName)}</span></div>
      <div class="line">६. व्यवसायको नाम : <span class="value">${v(row.businessName)}</span>
        व्यवसायको किसिम : <span class="value">${v(row.businessType)}</span></div>
      <div class="line">ख. व्यवसायको विवरण/प्रकृति : <span class="value">${v(row.businessNature)}</span></div>
      <div class="line">ग. व्यवसाय रहेको बाटोको नाम : <span class="value">${v(row.businessRoad)}</span></div>

      <div class="section-label">१. व्यवसायको ठेगाना</div>
      <div class="line">
        <span class="value">${v(row.businessAddress)}</span> जिल्ला,
        <span class="value">${v(row.businessDistrict)}</span>
        गाउँपालिका/नगरपालिका वडा नं <span class="value">${v(row.businessWard)}</span>
        टोल: <span class="value">${v(row.businessTole)}</span>
      </div>
      <div class="line">फोन नं.: <span class="value">${v(row.phone)}</span>
        मोबाइल नं. <span class="value">${v(row.mobile)}</span>
        इमेल: <span class="value">${v(row.email)}</span></div>
      <div class="line">पान/भ्याट नं. : <span class="value">${v(row.panVat)}</span>
        वेबसाईट : <span class="value">${v(row.website)}</span></div>
      <div class="line">२. उद्देश्य : <span class="value">${v(row.objective)}</span></div>

      <div class="section-label">२. पूँजी: (कम्पनीको हकमा)</div>
      <div class="cap-grid">${cap}</div>

      <div class="line">कैफियत : <span class="value">${v(row.remarks)}</span></div>
      ${row.isClosed ? `<div class="closed-stamp">व्यवसाय बन्द</div>` : ""}

      <div class="declaration">
        <p>................................................</p>
        <p style="font-weight:700;text-decoration:underline">व्यवसायीको छाप</p>
        <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
        <p>................................................</p>
        <p style="font-weight:700">निवेदकको दस्तखत</p>
      </div>

      <div class="signature">
        <div class="value">${v(row.proverName)}</div>
        <div>${v(row.proverPost)}</div>
        <div>प्रमाण गर्ने व्यक्तिको नाम</div>
      </div>

      <div class="applicant-box">
        <div class="applicant-title">निवेदकको विवरण</div>
        <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${v(row.applicantName)}</span></div>
        <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${v(row.applicantAddress)}</span></div>
        <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${v(row.applicantCitizenship)}</span></div>
        <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${v(row.applicantPhone)}</span></div>
      </div>
    </body>
    </html>
  `;
};

/* Open an isolated print window with the given HTML */
export const openCertPrint = (html) => {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) {
    alert("कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => {
    w.print();
    w.close();
  }, 500);
};

/* CSV export helper — columns = [[header, accessor], ...] */
export const exportRowsCsv = (rows, columns, filename) => {
  if (!rows?.length) {
    alert("निर्यात गर्न कुनै रेकर्ड छैन।");
    return;
  }
  const esc = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;
  const header = columns.map(([h]) => esc(h)).join(",");
  const body = rows.map((r, i) =>
    columns.map(([, acc]) => esc(acc(r, i))).join(",")
  );
  const csv = [header, ...body].join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};