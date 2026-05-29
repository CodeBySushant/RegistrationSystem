// src/pages/others/DifferentDOBCertification.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "different-dob-certification";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.dob-cert-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  color: #000;
  position: relative;
  box-sizing: border-box;
}

/* ── Utility ── */
.bold-text      { font-weight: bold; }
.underline-text { text-decoration: underline; }
.center-text    { text-align: center; }

/* ── Top bar ── */
.top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Header ── */
.dob-header { text-align: center; margin-bottom: 28px; position: relative; min-height: 90px; }

/* ── Meta ── */
.meta-data-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1rem; }
.meta-left p,
.meta-right p  { margin: 5px 0; }

/* ── Toast ── */
.dob-toast {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.92rem;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: dob-toast-in 0.25s ease;
  max-width: 360px;
}
.dob-toast--success { background: #1a7f3c; color: #fff; }
.dob-toast--error   { background: #c0392b; color: #fff; }
@keyframes dob-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Shared inputs — all white bg with border radius ── */
.dob-cert-container .dotted-input,
.dob-cert-container .line-input,
.dob-cert-container .inline-box-input {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  outline: none;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 1rem;
  margin: 0 4px;
  display: inline-block;
  vertical-align: middle;
}
.dob-cert-container .dotted-input:focus,
.dob-cert-container .line-input:focus,
.dob-cert-container .inline-box-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input    { width: 120px; }
.medium-input   { width: 200px; }
.long-input     { width: 300px; }
.full-width-input { width: 100%; }
.tiny-box       { width: 44px; text-align: center; }
.small-box      { width: 100px; }
.medium-box     { width: 180px; }

/* ── Inline select ── */
.inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 4px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.inline-select:focus { outline: none; border-color: #2563eb; }

/* ── Required-star wrapper ── */
.inline-input-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.input-required-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 13px;
  line-height: 1;
  z-index: 1;
}
.inline-input-wrapper .inline-box-input,
.inline-input-wrapper .line-input,
.inline-input-wrapper input { padding-left: 18px; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 24px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 28px;
}

/* ── Table ── */
.table-section    { margin: 16px 0 36px; }
.table-title      { margin-bottom: 6px; font-size: 1rem; }
.table-responsive { overflow-x: auto; }
.details-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255,255,255,0.6);
}
.details-table th {
  background-color: #e0e0e0;
  border: 1px solid #555;
  padding: 8px;
  text-align: center;
  font-size: 0.88rem;
  font-weight: bold;
  color: #333;
  text-decoration: underline;
}
.details-table td { border: 1px solid #555; padding: 4px 6px; vertical-align: middle; }
.table-input {
  width: 92%;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  outline: none;
  padding: 4px 6px;
  font-size: 0.95rem;
  color: #c0392b;
  font-family: inherit;
}
.table-input:focus { border-color: #2563eb; }
.add-row-btn {
  margin-top: 8px;
  padding: 5px 14px;
  font-size: 0.88rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  cursor: pointer;
  font-family: inherit;
}
.add-row-btn:hover { background: #e8e8e8; }
.rm-row-btn {
  border: none;
  background: none;
  color: #c0392b;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 4px;
  line-height: 1;
}

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 24px; }
.signature-block   { width: 230px; text-align: center; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 8px; height: 44px; }
.signature-block .line-input { width: 100%; margin-bottom: 6px; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  cursor: pointer;
}
.designation-select:focus { outline: none; border-color: #2563eb; }

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 36px; }
.save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 28px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 28px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .dob-cert-container { padding: 20px 14px; }
  .meta-data-row      { flex-direction: column; gap: 8px; }
  .top-bar-title      { flex-direction: column; gap: 4px; }
  .dob-toast          { right: 12px; left: 12px; max-width: none; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyDoc = () => ({
  id: Date.now() + Math.random(),
  document:     "",
  dob_original: "",
  doc_diff:     "",
  dob_diff:     "",
});

const INITIAL_FORM = {
  letter_no:                "२०८२/८३",
  reference_no:             "",
  issue_date:               "२०८२-०८-०६",
  nepali_date_label:        "1146 थिंलाथ्व, 2 शनिवार",
  municipality:             MUNICIPALITY.name,
  previous_unit_type:       "",
  previous_unit_select:     "",
  previous_ward:            "",
  salutation:               "श्री",
  applicant_name:           "",
  docs:                     [emptyDoc()],
  recommender_name:         "",
  recommender_designation:  "",
  // Applicant footer details — snake_case to match ApplicantDetailsNp
  applicant_full_name:      "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
};

const validate = (form) => {
  if (!form.applicant_name.trim())            return "कृपया निवेदकको नाम (माथि) प्रविष्ट गर्नुहोस्।";
  if (!form.recommender_name.trim())          return "सिफारिसकर्ताको नाम प्रविष्ट गर्नुहोस्।";
  if (!form.recommender_designation)          return "सिफारिसकर्ताको पद छनौट गर्नुहोस्।";
  for (const d of form.docs) {
    if (!d.document.trim() || !d.dob_original.trim())
      return "कागजात र जन्म मिति अनिवार्य छ।";
  }
  if (!form.applicant_full_name.trim())       return "निवेदकको नाम (तल) प्रविष्ट गर्नुहोस्।";
  if (!form.applicant_address.trim())         return "निवेदकको ठेगाना प्रविष्ट गर्नुहोस्।";
  if (!form.applicant_citizenship_no.trim())  return "नागरिकता नं. प्रविष्ट गर्नुहोस्।";
  if (!form.applicant_phone.trim())           return "फोन नं. प्रविष्ट गर्नुहोस्।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const DifferentDOBCertification = () => {
  const { form, setForm, handleChange } = useWardForm(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);
  const { user } = useAuth();

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  /* Field updaters */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const updateDoc = (idx, key) => (e) =>
    setForm((s) => ({
      ...s,
      docs: s.docs.map((d, i) => (i === idx ? { ...d, [key]: e.target.value } : d)),
    }));

  const addDocRow = () =>
    setForm((s) => ({ ...s, docs: [...s.docs, emptyDoc()] }));

  const removeDocRow = (idx) =>
    setForm((s) => ({ ...s, docs: s.docs.filter((_, i) => i !== idx) }));

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      if (shouldPrint) {
        handleCleanPrint();
      } else {
        showToast("success", `सेभ भयो (id: ${res.data?.id ?? "unknown"})`);
      }
      setForm(INITIAL_FORM);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "सेभ गर्न असफल भयो।";
      showToast("error", msg);
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated window, values sized to content ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || ""} नं. वडा कार्यालय`;

    const esc = (v) =>
      String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const docRows = form.docs
      .map(
        (d) => `
          <tr>
            <td>${esc(d.document)}</td>
            <td>${esc(d.dob_original)}</td>
            <td>${esc(d.doc_diff)}</td>
            <td>${esc(d.dob_diff)}</td>
          </tr>`
      )
      .join("");

    const unitType = form.previous_unit_type || form.previous_unit_select;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>फरक फरक जन्म मिति सिफारिस</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000; background: white;
            padding: 15mm 20mm; font-size: 11pt; line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .addressee { margin-bottom: 16px; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 20px; }
          /* value sizes to content — short values inline, no clipping on long ones */
          .value { font-weight: bold; padding: 0 4px; }
          .value-inline { white-space: nowrap; }
          table.docs { width: 100%; border-collapse: collapse; border: 1px solid #555; margin: 16px 0; }
          table.docs th { background: #e0e0e0; border: 1px solid #555; padding: 8px; font-size: 10pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          table.docs td { border: 1px solid #555; padding: 6px 8px; font-size: 10pt; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 210px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${esc(MUNICIPALITY.name)}</div>
          <div class="ward-title">${esc(wardTitle)}</div>
          <div class="addr">${esc(MUNICIPALITY.officeLine)}</div>
          <div class="addr">${esc(MUNICIPALITY.provinceLine)}</div>
        </div>

        <div class="meta">
          <div>
            <div>पत्र संख्या : <span class="value value-inline">${esc(form.letter_no)}</span></div>
            <div>चलानी नं. : <span class="value value-inline">${esc(form.reference_no)}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value value-inline">${esc(form.issue_date)}</span></div>
            <div>ने.सं : <span class="value value-inline">${esc(form.nepali_date_label)}</span></div>
          </div>
        </div>

        <div class="addressee">
          श्री <span class="value">${esc(form.recommender_name)}</span><br/>
          <span class="value">${esc(form.recommender_designation)}</span>
        </div>

        <div class="subject">विषय: फरक फरक जन्म मिति सिफारिस ।</div>

        <div class="body-text">
          उपरोक्त विषयमा
          <span class="value">${esc(form.municipality)}</span>
          वडा नं. <span class="value value-inline">१</span>
          (साविक <span class="value">${esc(unitType)}</span>,
          वडा नं. <span class="value value-inline">${esc(form.previous_ward)}</span>)
          निवासी <span class="value value-inline">${esc(form.salutation)}</span>
          <span class="value">${esc(form.applicant_name)}</span>
          को तल उल्लेखित कागजात अनुसार जन्म मिति फरक भएकोले सिफारिस गरिन्छ ।
        </div>

        <table class="docs">
          <thead>
            <tr>
              <th>कागजात</th>
              <th>जन्म मिति</th>
              <th>फरक भएको कागजात</th>
              <th>फरक भएको जन्म मिति</th>
            </tr>
          </thead>
          <tbody>${docRows}</tbody>
        </table>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${esc(form.recommender_name)}</div>
            <div>${esc(form.recommender_designation)}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span>${esc(form.applicant_full_name)}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span>${esc(form.applicant_address)}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span>${esc(form.applicant_citizenship_no)}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span>${esc(form.applicant_phone)}</span></div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /* ── render ── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="dob-cert-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >

        {/* Toast */}
        {toast && (
          <div className={`dob-toast dob-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          फरक फरक जन्म मिति सिफारिस ।
          <span className="top-right-bread">अन्य &gt; फरक फरक जन्म मिति सिफारिस</span>
        </div>

        {/* Header */}
        <div className="dob-header">
          <MunicipalityHeader formTitle="फरक फरक जन्म मिति सिफारिस" />
        </div>

        {/* Meta — now editable */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <input
                type="text"
                className="dotted-input small-input"
                value={form.letter_no}
                onChange={update("letter_no")}
              />
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                type="text"
                className="dotted-input small-input"
                value={form.reference_no}
                onChange={update("reference_no")}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <input
                type="text"
                className="dotted-input small-input"
                value={form.issue_date}
                onChange={update("issue_date")}
              />
            </p>
            <p>
              ने.सं :{" "}
              <input
                type="text"
                className="dotted-input medium-input"
                value={form.nepali_date_label}
                onChange={update("nepali_date_label")}
              />
            </p>
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input
                type="text"
                className="line-input medium-input"
                value={form.recommender_name}
                onChange={update("recommender_name")}
                placeholder="सिफारिसकर्ताको नाम"
              />
            </div>
          </div>
          <div className="addressee-row">
            <input
              type="text"
              className="line-input long-input"
              value={form.recommender_designation}
              onChange={update("recommender_designation")}
              placeholder="पद / संस्था"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">फरक फरक जन्म मिति सिफारिस ।</span>
          </p>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            उपरोक्त विषयमा{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.municipality}
              onChange={update("municipality")}
            />{" "}
            वडा नं. <span className="bold-text">१</span> (साविक{" "}
            <input
              type="text"
              className="inline-box-input small-box"
              value={form.previous_unit_type}
              onChange={update("previous_unit_type")}
              placeholder="इकाई"
            />
            <select
              className="inline-select"
              value={form.previous_unit_select}
              onChange={update("previous_unit_select")}
            >
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            , वडा नं.{" "}
            <input
              type="text"
              className="inline-box-input tiny-box"
              value={form.previous_ward}
              onChange={update("previous_ward")}
            />{" "}
            ) निवासी{" "}
            <select
              className="inline-select"
              value={form.salutation}
              onChange={update("salutation")}
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <span className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input
                type="text"
                className="inline-box-input medium-box"
                value={form.applicant_name}
                onChange={update("applicant_name")}
                placeholder="निवेदकको नाम"
              />
            </span>{" "}
            को तल उल्लेखित कागजात अनुसार जन्म मिति फरक भएकोले सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* Documents table */}
        <div className="table-section">
          <h4 className="table-title underline-text bold-text center-text">
            फरक जन्म मिति र कागजात विवरण
          </h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "23%" }}>कागजात</th>
                  <th style={{ width: "23%" }}>जन्म मिति</th>
                  <th style={{ width: "23%" }}>फरक भएको कागजात</th>
                  <th style={{ width: "23%" }}>फरक भएको जन्म मिति</th>
                  <th style={{ width: "8%" }}></th>
                </tr>
              </thead>
              <tbody>
                {form.docs.map((d, idx) => (
                  <tr key={d.id}>
                    <td><input value={d.document}     onChange={updateDoc(idx, "document")}     className="table-input" placeholder="कागजात" /></td>
                    <td><input value={d.dob_original} onChange={updateDoc(idx, "dob_original")} className="table-input" placeholder="जन्म मिति" /></td>
                    <td><input value={d.doc_diff}     onChange={updateDoc(idx, "doc_diff")}     className="table-input" placeholder="फरक कागजात" /></td>
                    <td><input value={d.dob_diff}     onChange={updateDoc(idx, "dob_diff")}     className="table-input" placeholder="फरक जन्म मिति" /></td>
                    <td>
                      {idx !== 0 && (
                        <button type="button" className="rm-row-btn" onClick={() => removeDocRow(idx)}>−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={addDocRow}>
              + पंक्ति थप्नुहोस्
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <div className="inline-input-wrapper" style={{ display: "block", marginBottom: 6 }}>
              <span className="input-required-star">*</span>
              <input
                type="text"
                className="line-input full-width-input"
                value={form.recommender_name}
                onChange={update("recommender_name")}
                placeholder="सिफारिसकर्ताको नाम"
              />
            </div>
            <select
              className="designation-select"
              value={form.recommender_designation}
              onChange={update("recommender_designation")}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* Footer buttons */}
        <div className="form-footer">
          <button
            type="submit"
            className="save-print-btn"
            disabled={loading}
            style={{ marginRight: 12 }}
          >
            {loading ? "सेभ गर्दै..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "सेभ गर्दै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DifferentDOBCertification;