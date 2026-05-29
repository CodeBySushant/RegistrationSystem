// src/pages/official-use/SuchanaDetailList.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.coop-page {
  width: 100%;
  min-height: 100vh;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  display: flex;
  flex-direction: column;
}

/* ── Source tab bar ── */
.sdl-source-bar {
  display: flex;
  gap: 4px;
  padding: 10px 20px 0;
  background: #fff;
  border-bottom: 2px solid #dde3ea;
  flex-wrap: wrap;
}
.sdl-source-btn {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 8px 14px 10px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.88rem;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: -2px;
  transition: color 0.15s, border-color 0.15s;
}
.sdl-source-btn:hover { color: #192236; }
.sdl-source-btn.active { color: #192236; font-weight: 700; border-bottom-color: #2980b9; }
.sdl-count {
  display: inline-block;
  background: #e4e8ec;
  color: #444;
  font-size: 0.72rem;
  border-radius: 10px;
  padding: 1px 7px;
  margin-left: 6px;
  line-height: 1.5;
}
.sdl-source-btn.active .sdl-count { background: #2980b9; color: #fff; }

/* ── Filter bar ── */
.coop-filter-bar {
  background: #192236;
  padding: 16px 20px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}
.coop-filters {
  display: flex;
  gap: 16px;
  flex: 1;
  flex-wrap: wrap;
  align-items: flex-end;
}
.coop-filter-group { display: flex; flex-direction: column; gap: 4px; }
.coop-filter-group.wide { flex: 1; min-width: 200px; }
.coop-filter-group label { color: #aab7c4; font-size: 0.78rem; }
.coop-filter-group input {
  padding: 7px 10px;
  border: none;
  border-radius: 3px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.88rem;
  height: 36px;
  box-sizing: border-box;
  background: #fff;
}
.coop-clear-btn {
  background: #5a7b94;
  color: #fff;
  border: none;
  border-radius: 4px;
  height: 36px;
  padding: 0 14px;
  font-size: 0.82rem;
  cursor: pointer;
  flex-shrink: 0;
  font-family: 'Kalimati', 'Kokila', sans-serif;
}
.coop-clear-btn:hover { background: #4a6a82; }
.coop-search-btn {
  background: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 38px;
  height: 36px;
  font-size: 1.1rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
}
.coop-search-btn:hover { background: #1a6a9a; }

/* ── Table wrapper ── */
.coop-table-wrapper { flex: 1; padding: 24px 20px 0; }
.coop-state-msg { padding: 40px; text-align: center; color: #666; font-size: 0.95rem; }
.coop-error { color: #c0392b; }
.coop-scroll {
  overflow-x: auto;
  background: rgba(255,255,255,0.88);
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  border-radius: 4px;
}

/* ── Table ── */
.coop-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.coop-table th {
  background: #192236;
  color: #fff;
  padding: 11px 10px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  border-right: 1px solid #2c3e5a;
}
.coop-table th:last-child { border-right: none; }
.coop-table td {
  padding: 9px 10px;
  color: #333;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.coop-table tr.even-row td { background: #f9f9f9; }
.coop-table tr.odd-row  td { background: #ffffff; }
.coop-table tr:hover td { background: #edf4fb; }
.coop-table td.ellipsis {
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Badges ── */
.sdl-badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 600;
  white-space: nowrap;
}
.sdl-badge--blue  { background: #d6eaf8; color: #1a5276; }
.sdl-badge--green { background: #d5f5e3; color: #1e8449; }
.sdl-badge--amber { background: #fdebd0; color: #935116; }

/* ── Row action buttons ── */
.sdl-row-actions { display: inline-flex; gap: 4px; }
.eye-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.05rem;
  padding: 3px 7px;
  border-radius: 4px;
  transition: background 0.15s;
}
.eye-btn:hover { background: #e8f4fd; }

.center-cell { text-align: center !important; }

/* ── Bottom bar ── */
.coop-bottom-bar {
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  margin-top: 20px;
}
.coop-export-btn,
.coop-print-btn {
  padding: 7px 18px;
  border: none;
  border-radius: 4px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.15s;
}
.coop-export-btn       { background: #5a7b94; color: #fff; }
.coop-export-btn:hover { background: #4a6a82; }
.coop-print-btn        { background: #192236; color: #fff; }
.coop-print-btn:hover  { background: #0f1722; }

/* ── Footer ── */
.coop-footer {
  text-align: right;
  padding: 12px 20px;
  font-size: 0.82rem;
  color: #888;
  background: #fff;
  border-top: 1px solid #eee;
}

/* ── Preview modal ── */
.sdl-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}
.sdl-modal {
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 920px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
.sdl-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #192236;
  color: #fff;
}
.sdl-modal-title { font-size: 1rem; font-weight: 700; }
.sdl-modal-head-actions { display: flex; gap: 8px; align-items: center; }
.sdl-modal-btn {
  border: none;
  border-radius: 4px;
  padding: 7px 14px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  color: #fff;
}
.sdl-modal-btn--print    { background: #1a6b3a; }
.sdl-modal-btn--print:hover { background: #145530; }
.sdl-modal-btn--download { background: #2980b9; }
.sdl-modal-btn--download:hover { background: #1a6a9a; }
.sdl-modal-btn--close    { background: transparent; font-size: 1.3rem; padding: 2px 10px; }
.sdl-modal-body { flex: 1; overflow: auto; background: #e9e9e9; padding: 0; }
.sdl-preview-frame {
  width: 100%;
  height: 70vh;
  border: none;
  background: #fff;
  display: block;
}

/* ── Print ── */
@media print {
  .sdl-source-bar,
  .coop-filter-bar,
  .coop-bottom-bar,
  .coop-footer { display: none !important; }
  .coop-table-wrapper { padding: 0; }
  .coop-scroll { box-shadow: none; background: #fff; }
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .coop-table thead { display: none; }
  .coop-table tr { display: block; margin-bottom: 12px; border: 1px solid #ddd; }
  .coop-table td {
    display: flex;
    justify-content: space-between;
    text-align: right;
    border-bottom: 1px solid #f0f0f0;
    padding: 7px 12px;
  }
  .coop-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #555;
    text-align: left;
    flex-shrink: 0;
    margin-right: 8px;
  }
}
`;

/* ─────────────────────────── Shared print/preview HTML ─────────────────────────── */

const esc = (v) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* shared document chrome + per-form body inserted */
const wrapFormHTML = (title, ward, bodyHTML) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Nepal&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Tiro Devanagari Nepal', 'Kalimati', 'Noto Sans Devanagari', serif;
      color: #000; background: #fff;
      padding: 15mm 18mm; font-size: 11pt; line-height: 1.9;
    }
    .header { text-align: center; margin-bottom: 14px; position: relative; min-height: 80px; }
    .logo { position: absolute; left: 0; top: 0; width: 64px; }
    .gov-label { font-size: 10pt; color: #333; }
    .mun-name { color: #c0392b; font-size: 20pt; font-weight: 700; }
    .ward-title { color: #c0392b; font-size: 15pt; font-weight: 700; margin: 4px 0; }
    .addr { color: #c0392b; font-size: 9.5pt; }
    .divider { border: none; border-top: 2.5px double #c0392b; margin: 10px 0 16px; }
    .meta { display: flex; justify-content: space-between; margin: 12px 0; font-size: 10.5pt; }
    .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 14px 0; text-decoration: underline; }
    .addressee { margin-bottom: 14px; }
    .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 18px; }
    .value { font-weight: bold; padding: 0 4px; border-bottom: 1px solid #aaa; }
    .value-inline { white-space: nowrap; }
    table.kv { width: 100%; border-collapse: collapse; border: 1px solid #555; margin: 12px 0; }
    table.kv td { border: 1px solid #555; padding: 6px 9px; font-size: 10pt; vertical-align: top; }
    table.kv td.k { width: 42%; font-weight: 600; }
    .num-row { margin-bottom: 6px; font-size: 10.5pt; }
    .num-label { font-weight: 600; }
    .note-title { font-weight: bold; margin: 12px 0 6px; }
    .note-content { border: 1px solid #ccc; padding: 10px; min-height: 40px; margin-bottom: 18px; }
    .signature { display: flex; justify-content: flex-end; margin-top: 34px; margin-bottom: 22px; }
    .sig-block { width: 210px; text-align: center; }
    .sig-line { border-top: 1px solid #000; padding-top: 6px; }
    .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 18px; border-radius: 3px; }
    .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
    .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
    .field-label { min-width: 150px; font-weight: 600; }
    @page { size: A4; margin: 14mm 18mm; }
  </style>
</head>
<body>
  <div class="header">
    <img class="logo" src="${esc(MUNICIPALITY.logoSrc || "/nepallogo.svg")}" alt="Nepal" />
    <div class="gov-label">नेपाल सरकार</div>
    <div class="mun-name">${esc(MUNICIPALITY.name)}</div>
    <div class="ward-title">${esc(ward)}</div>
    <div class="addr">${esc(MUNICIPALITY.officeLine)}</div>
    <div class="addr">${esc(MUNICIPALITY.provinceLine)}</div>
  </div>
  <hr class="divider" />
  ${bodyHTML}
</body>
</html>`;

const metaBlock = (r) => `
  <div class="meta">
    <div>
      <div>पत्र संख्या : <span class="value value-inline">${esc(r.letter_no)}</span></div>
      <div>चलानी नं. : <span class="value value-inline">${esc(r.reference_no)}</span></div>
    </div>
    <div style="text-align:right">
      <div>मिति : <span class="value value-inline">${esc(r.date)}</span></div>
    </div>
  </div>`;

const applicantBlock = (r) => `
  <div class="applicant-box">
    <div class="applicant-title">निवेदकको विवरण</div>
    <div class="field-row"><span class="field-label">नाम:</span><span>${esc(r.applicant_name)}</span></div>
    <div class="field-row"><span class="field-label">ठेगाना:</span><span>${esc(r.applicant_address)}</span></div>
    <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span>${esc(r.applicant_citizenship_no)}</span></div>
    <div class="field-row"><span class="field-label">फोन:</span><span>${esc(r.applicant_phone)}</span></div>
  </div>`;

const signatureBlock = (name, pos) => `
  <div class="signature">
    <div class="sig-block">
      <div class="sig-line"></div>
      <div>${esc(name)}</div>
      <div>${esc(pos)}</div>
    </div>
  </div>`;

/* ─────────────────────────── Source definitions ─────────────────────────── */
/* Each source: list-row mapping + a real form-body builder for preview/print */

const SOURCES = [
  {
    key: "antar-sthaniya",
    label: "अन्तर स्थानीय सरुवा",
    api: "/api/forms/inter-local-transfer-recommendation",
    badgeClass: "sdl-badge--blue",
    badgeText: "सरुवा",
    title: "अन्तर स्थानीय सरुवा सहमति",
    mapRow: (r) => ({
      id: r.id, _source: "antar-sthaniya", _raw: r,
      date: r.date || "",
      letter_no: r.letter_no || "—",
      subject: r.subject || "अन्तर स्थानीय सरुवा सहमति",
      name: r.employee_name || "—",
      location: r.transfer_local || "—",
    }),
    buildBody: (r) => `
      ${metaBlock(r)}
      <div class="subject">विषय: ${esc(r.subject || "अन्तर स्थानीय सरुवा सहमति")}</div>
      <div class="body-text">
        श्री <span class="value">${esc(r.requested_person_name)}</span>
        ले यस कार्यालयमा मिति <span class="value value-inline">${esc(r.date)}</span>
        मा माथि स्वीकृति भई <span class="value">${esc(r.transfer_to_local)}</span>
        को पद <span class="value">${esc(r.transfer_to_position)}</span>
        को च.न. <span class="value value-inline">${esc(r.requested_person_position_code)}</span>
        मा प्राप्त भएको निवेदन अनुसार कर्मचारी <span class="value">${esc(r.employee_name)}</span>
        को पदनाम <span class="value">${esc(r.employee_post_title)}</span>
        बमोजिम <span class="value">${esc(r.service_group)}</span>
        लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ।
      </div>
      <div class="note-title">देहाय</div>
      <table class="kv"><tbody>
        <tr><td class="k">नाम थर:</td><td>${esc(r.employee_name)}</td></tr>
        <tr><td class="k">पद/तह:</td><td>${esc(r.employee_post_title)}</td></tr>
        <tr><td class="k">सेवा/समूह/उपसमूह:</td><td>${esc(r.service_group)}</td></tr>
        <tr><td class="k">नियुक्ति दिने स्थानीय तह:</td><td>${esc(r.appointing_local)}</td></tr>
        <tr><td class="k">सरुवा जाने स्थानीय तह:</td><td>${esc(r.transfer_local)}</td></tr>
        <tr><td class="k">स्थायी ठेगाना:</td><td>${esc(r.permanent_address)}</td></tr>
        <tr><td class="k">फोन नं:</td><td>${esc(r.phone)}</td></tr>
        <tr><td class="k">जन्म मिति:</td><td>${esc(r.dob)}</td></tr>
        <tr><td class="k">ना.प्र.नं:</td><td>${esc(r.citizenship_no)}</td></tr>
        <tr><td class="k">जारी मिति:</td><td>${esc(r.citizenship_issue_date)}</td></tr>
        <tr><td class="k">जारी जिल्ला:</td><td>${esc(r.citizenship_issue_district)}</td></tr>
      </tbody></table>
      ${r.notes ? `<div class="note-title">कैफियत:</div><div class="note-content">${r.notes}</div>` : ""}
      ${signatureBlock(r.signatory_name, r.signatory_position)}
      ${applicantBlock(r)}
    `,
  },
  {
    key: "ramana-patra",
    label: "रमाना पत्र",
    api: "/api/forms/ramana-patra",
    badgeClass: "sdl-badge--green",
    badgeText: "रमाना",
    title: "रमाना पत्र",
    mapRow: (r) => ({
      id: r.id, _source: "ramana-patra", _raw: r,
      date: r.date || "",
      letter_no: r.letter_no || "—",
      subject: "रमाना पत्र",
      name: r.emp_name || "—",
      location: r.transfer_office || "—",
    }),
    buildBody: (r) => {
      const points = [
        ["१. कर्मचारीको नाम थर:", r.point1_name],
        ["२. कर्मचारीको संकेत नम्बर:", r.point2_signal],
        ["३. साविक — तह / श्रेणी / सेवा:", [r.point3_a_level, r.point3_b_class, r.point3_c_service].filter(Boolean).join(" / ")],
        ["४. जन्म मिति (वि.सं./ई.सं./जिल्ला):", [r.point4_a_birth_bs, r.point4_b_birth_ad, r.point4_c_birth_dist].filter(Boolean).join(" / ")],
        ["५. नियुक्ति मिति:", r.point5_appoint_date],
        ["६. खाइपाई आएको — मासिक तलब / ग्रेड:", [r.point6_a_salary, r.point6_b_grade].filter(Boolean).join(" / ")],
        ["७. सञ्चय कोष कट्टी नम्बर:", r.point7_provident],
        ["८. नागरिक लगानी कोष कट्टी:", r.point8_investment],
        ["९. व्यक्तिगत प्यान नम्बर:", r.point9_pan],
        ["१०. बिदाको विवरण:", r.point10_leave],
        ["११. औषधि उपचार बापत बाँकी रकम रु.:", r.point11_med_claim],
        ["१२. ऋण वा सापटी केहि भए:", r.point12_loan],
        ["१३. तलब भत्ता भुक्तानी भएको अन्तिम मिति:", r.point13_last_payment_date],
        ["१४. सामाजिक सुरक्षा कर / आयकर कट्टी:", [r.point14_a_social_tax, r.point14_b_income_tax].filter(Boolean).join(" / ")],
        ["१५. भ्रमण खर्च एवं पेश्की बाँकी:", r.point15_travel_allowance],
        ["१६. अन्य केहि भए:", r.point16_other],
      ];
      const pointsHtml = points
        .map(([label, val]) => `<div class="num-row"><span class="num-label">${esc(label)}</span> <span class="value">${esc(val)}</span></div>`)
        .join("");
      return `
        ${metaBlock(r)}
        <div class="subject">विषय: रमाना पत्र ।</div>
        <div class="addressee">
          श्री <span class="value">${esc(r.recipient_name)}</span> ज्यू,<br/>
          <span class="value">${esc(r.recipient_address)}</span>
        </div>
        <div class="body-text">
          यस कार्यालयको निर्णय नं <span class="value value-inline">${esc(r.decision_no)}</span>
          मिति <span class="value value-inline">${esc(r.decision_date)}</span>
          को निर्णय अनुसार <span class="value">${esc(r.emp_post)}</span>
          <span class="value">${esc(r.emp_name)}</span>
          लाई यस कार्यालयबाट मिति <span class="value value-inline">${esc(r.transfer_date)}</span>
          देखि लागू हुने गरी <span class="value">${esc(r.transfer_office)}</span>
          मा सरुवा/काजमा खटाई पठाइएको हुनाले देहाय बमोजिमको विवरण खुलाई रमाना दिइएको व्यहोरा अनुरोध छ ।
        </div>
        <div class="numbered">${pointsHtml}</div>
        ${r.bodartha ? `<div class="note-title">बोधार्थ:</div><div class="note-content">${r.bodartha}</div>` : ""}
        ${signatureBlock(r.signatory_name, r.signatory_position)}
        ${applicantBlock(r)}
      `;
    },
  },
  {
    key: "karyabahaak",
    label: "कार्यवाहक तोकिएको",
    api: "/api/forms/acting-ward-officer-assigned",
    badgeClass: "sdl-badge--amber",
    badgeText: "कार्यवाहक",
    title: "कार्यवाहक तोकिएको सिफारिस",
    mapRow: (r) => ({
      id: r.id, _source: "karyabahaak", _raw: r,
      date: r.date || "",
      letter_no: r.letter_no || "—",
      subject: r.subject || "कार्यवाहक तोकिएको",
      name: r.assigned_member_name || "—",
      location: r.assigned_member_address || "—",
    }),
    buildBody: (r) => `
      ${metaBlock(r)}
      <div class="subject">विषय: ${esc(r.subject || "कार्यवाहक तोकिएको सम्बन्धमा।")}</div>
      <div class="addressee">
        श्री वडा सदस्य <span class="value">${esc(r.assigned_member_name)}</span> ज्यू,<br/>
        <span class="value">${esc(r.assigned_member_address)}</span>
        वडा नं. <span class="value value-inline">${esc(r.assigned_ward_no)}</span>
      </div>
      <div class="body-text">
        प्रस्तुत विषयमा कार्यालयको कामकाजको शिलशिलामा मिति
        <span class="value value-inline">${esc(r.assign_from_date)}</span>
        गते देखि <span class="value value-inline">${esc(r.assign_to_date)}</span>
        गते सम्म बाहिर जानु पर्ने भएकोले सो अवधि सम्म यस
        <span class="value value-inline">${esc(r.assigned_ward_no)}</span>
        नं वडा कार्यालयको वडा अध्यक्षको कामकाज सम्हाल्ने गरी तपाईंलाई
        कार्यवाहक वडा अध्यक्ष तोकेको छु। ईमान्दारीपूर्वक कामकाज गर्नुहोला।
      </div>
      ${r.bodartha_text ? `<div class="note-title">बोधार्थ:</div><div class="note-content">${r.bodartha_text}</div>` : ""}
      ${signatureBlock(r.signatory_name, r.signatory_position)}
      ${applicantBlock(r)}
    `,
  },
];

/* Build the full standalone HTML for one record */
const renderFormHTML = (source, raw) => {
  const ward =
    raw.ward
      ? `वडा नं. ${raw.ward} वडा कार्यालय`
      : "वडा कार्यालय";
  return wrapFormHTML(source.title, ward, source.buildBody(raw));
};

/* ─────────────────────────── Helpers ─────────────────────────── */

/** Convert Devanagari digits to ASCII so BS date strings can be compared. */
const toAsciiDigits = (s) =>
  String(s ?? "").replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));

/** Best-effort YYYY-MM-DD head for comparison; "" if not parseable. */
const comparableDate = (raw) => {
  const a = toAsciiDigits(raw).trim();
  const m = a.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (!m) return "";
  const [, y, mo, d] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

/** Fetch one source API and return mapped rows, or [] on failure. */
const fetchSource = async (source) => {
  try {
    const res = await axios.get(source.api);
    const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
    return arr.map(source.mapRow);
  } catch {
    return [];
  }
};

/** Build a UTF-8 CSV blob and trigger a download. */
const exportCSV = (rows) => {
  if (!rows.length) { alert("निर्यात गर्न कुनै डेटा छैन।"); return; }
  const header = ["क्र.स.", "पत्र नं.", "मिति", "किसिम", "नाम", "विषय", "स्थान"];
  const csvRows = rows.map((r, i) =>
    [i + 1, r.letter_no, r.date, r.badgeText, r.name, r.subject, r.location]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv  = [header.join(","), ...csvRows].join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), {
    href: url,
    download: `suchana_bibaran_${new Date().toISOString().slice(0, 10)}.csv`,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

/* ─────────────────────────── Preview Modal ─────────────────────────── */

const PrintPreviewModal = ({ html, title, onClose }) => {
  /* Open the same HTML in an isolated window and print it */
  const handlePrint = () => {
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) { alert("प्रिन्ट विन्डो खोल्न सकिएन। Popup अनुमति दिनुहोस्।"); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  /* Download the reconstructed form as a standalone HTML file */
  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const safe = (title || "form").replace(/[^\w\u0900-\u097F-]+/g, "_");
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `${safe}_${new Date().toISOString().slice(0, 10)}.html`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sdl-modal-overlay" onClick={onClose}>
      <div className="sdl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sdl-modal-head">
          <span className="sdl-modal-title">{title} — पूर्वावलोकन</span>
          <div className="sdl-modal-head-actions">
            <button className="sdl-modal-btn sdl-modal-btn--print" onClick={handlePrint}>
              🖨 प्रिन्ट
            </button>
            <button className="sdl-modal-btn sdl-modal-btn--download" onClick={handleDownload}>
              📥 डाउनलोड
            </button>
            <button className="sdl-modal-btn sdl-modal-btn--close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
        <div className="sdl-modal-body">
          {/* isolated iframe so the form's CSS can't leak into the list page;
              read-only preview — no controls inside */}
          <iframe className="sdl-preview-frame" title="form-preview" srcDoc={html} />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Component ─────────────────────────── */
const SuchanaDetailList = () => {
  const [rows, setRows]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const [fromDate, setFromDate]         = useState("");
  const [toDate, setToDate]             = useState("");
  const [searchName, setSearchName]     = useState("");
  const [activeSource, setActiveSource] = useState("all");

  const [preview, setPreview] = useState(null); // { html, title }

  /* attach badgeText onto mapped rows for CSV + reuse */
  const decorate = (mapped, source) => ({ ...mapped, badgeText: source.badgeText });

  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const results = await Promise.allSettled(
        SOURCES.map(async (s) => {
          const arr = await fetchSource(s);
          return arr.map((m) => decorate(m, s));
        })
      );
      const combined = results
        .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
        .sort((a, b) => comparableDate(b.date).localeCompare(comparableDate(a.date)));
      setRows(combined);
    } catch (err) {
      console.error(err);
      setError("डेटा लोड गर्न सकिएन।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);

  /* Client-side filters — live */
  useEffect(() => {
    let out = [...rows];

    if (activeSource !== "all") out = out.filter((r) => r._source === activeSource);

    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          r.name?.toLowerCase().includes(q)      ||
          r.letter_no?.toLowerCase().includes(q) ||
          r.subject?.toLowerCase().includes(q)   ||
          r.location?.toLowerCase().includes(q)
      );
    }

    /* best-effort date filter: only applies to rows whose date parses;
       rows with unparseable dates are kept (not silently dropped) */
    if (fromDate) {
      out = out.filter((r) => {
        const c = comparableDate(r.date);
        return !c || c >= fromDate;
      });
    }
    if (toDate) {
      out = out.filter((r) => {
        const c = comparableDate(r.date);
        return !c || c <= toDate;
      });
    }

    setFiltered(out);
  }, [rows, activeSource, searchName, fromDate, toDate]);

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setSearchName("");
    setActiveSource("all");
  };

  /* Open preview — reconstruct the real form HTML */
  const openPreview = (row) => {
    const src = SOURCES.find((s) => s.key === row._source);
    if (!src) return;
    setPreview({ html: renderFormHTML(src, row._raw), title: src.title });
  };

  /* Print directly from the row (skip modal) */
  const printRow = (row) => {
    const src = SOURCES.find((s) => s.key === row._source);
    if (!src) return;
    const html = renderFormHTML(src, row._raw);
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) { alert("प्रिन्ट विन्डो खोल्न सकिएन। Popup अनुमति दिनुहोस्।"); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  const countFor = (key) =>
    key === "all" ? rows.length : rows.filter((r) => r._source === key).length;

  return (
    <>
      <style>{styles}</style>

      <div className="coop-page">

        {/* Source tabs */}
        <div className="sdl-source-bar">
          <button
            className={`sdl-source-btn ${activeSource === "all" ? "active" : ""}`}
            onClick={() => setActiveSource("all")}
          >
            सबै <span className="sdl-count">{countFor("all")}</span>
          </button>
          {SOURCES.map((s) => (
            <button
              key={s.key}
              className={`sdl-source-btn ${activeSource === s.key ? "active" : ""}`}
              onClick={() => setActiveSource(s.key)}
            >
              {s.label} <span className="sdl-count">{countFor(s.key)}</span>
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="coop-filter-bar">
          <div className="coop-filters">
            <div className="coop-filter-group">
              <label>मिति देखि</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="coop-filter-group">
              <label>मिति सम्म</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div className="coop-filter-group wide">
              <label>नाम / पत्र नं. / विषय</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="नाम / पत्र नं. / विषय खोज्नुहोस्"
              />
            </div>
          </div>
          <button className="coop-clear-btn" onClick={clearFilters}>खाली गर्नुहोस्</button>
          <button className="coop-search-btn" onClick={fetchRows} aria-label="Refresh" title="रिफ्रेस">🔄</button>
        </div>

        {/* Table */}
        <div className="coop-table-wrapper">
          {loading ? (
            <div className="coop-state-msg">लोड हुँदै...</div>
          ) : error ? (
            <div className="coop-state-msg coop-error">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="coop-state-msg">कुनै रेकर्ड फेला परेन।</div>
          ) : (
            <div className="coop-scroll">
              <table className="coop-table">
                <thead>
                  <tr>
                    <th>क्र.स.</th>
                    <th>पत्र नं.</th>
                    <th>मिति</th>
                    <th>किसिम</th>
                    <th>नाम</th>
                    <th>विषय</th>
                    <th>स्थान / कार्यालय</th>
                    <th>कार्य</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, index) => {
                    const src = SOURCES.find((s) => s.key === row._source);
                    return (
                      <tr
                        key={`${row._source}-${row.id ?? index}`}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td data-label="क्र.स.">{index + 1}</td>
                        <td data-label="पत्र नं.">{row.letter_no}</td>
                        <td data-label="मिति">{row.date || "—"}</td>
                        <td data-label="किसिम" className="center-cell">
                          {src && (
                            <span className={`sdl-badge ${src.badgeClass}`}>
                              {src.badgeText}
                            </span>
                          )}
                        </td>
                        <td data-label="नाम">{row.name}</td>
                        <td data-label="विषय" className="ellipsis">
                          {(row.subject || "—").slice(0, 40)}
                        </td>
                        <td data-label="स्थान">{row.location}</td>
                        <td data-label="कार्य" className="center-cell">
                          <span className="sdl-row-actions">
                            <button
                              className="eye-btn"
                              onClick={() => openPreview(row)}
                              title="पूर्वावलोकन"
                            >
                              👁
                            </button>
                            <button
                              className="eye-btn"
                              onClick={() => printRow(row)}
                              title="प्रिन्ट"
                            >
                              🖨
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="coop-bottom-bar">
          <button onClick={() => exportCSV(filtered)} className="coop-export-btn">📥 Export CSV</button>
          <button onClick={() => window.print()}       className="coop-print-btn">🖨 तालिका प्रिन्ट</button>
        </div>

        <footer className="coop-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>

        {/* Print preview modal */}
        {preview && (
          <PrintPreviewModal
            html={preview.html}
            title={preview.title}
            onClose={() => setPreview(null)}
          />
        )}
      </div>
    </>
  );
};

export default SuchanaDetailList;