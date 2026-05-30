import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────
   STYLES — all classes prefixed "ssm-"
───────────────────────────────────────────── */
const styles = `
.ssm-container {
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
}

.ssm-bold-text  { font-weight: bold; }
.ssm-center-text{ text-align: center; }

.ssm-top-bar-title {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ssm-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

/* ── Anusuchi document header ── */
.ssm-form-header-details { text-align: center; margin: 24px 0 30px; }
.ssm-schedule-title  { font-size: 1.2rem; margin: 0; color: #000; font-weight: bold; }
.ssm-rule-text       { font-size: 1rem; margin: 5px 0; color: #333; }
.ssm-form-type-title { font-size: 1.4rem; margin: 10px 0; color: #333; font-weight: bold; }
.ssm-sub-type-text   { font-size: 1.1rem; margin: 5px 0 0 0; color: #333; }

.ssm-intro-paragraph { margin-bottom: 30px; font-size: 1.05rem; }
.ssm-body-paragraph  { line-height: 2.6; text-align: justify; margin: 0; }

/* ── Inputs — bordered + radius (was bottom-border only, sharp) ── */
.ssm-dotted-input {
  border: 1px solid #ccc;
  background: #fff;
  outline: none;
  padding: 4px 8px;
  margin: 0 2px;
  font-family: inherit;
  font-size: 0.95rem;
  height: 30px;
  line-height: 1;
  vertical-align: middle;
  border-radius: 3px;
  box-sizing: border-box;
}
.ssm-dotted-input:focus { border-color: #3b7dd8; background: #fffaf9; }

.ssm-tiny-input   { width: 60px; text-align: center; }
.ssm-small-input  { width: 110px; }
.ssm-medium-input { width: 160px; }
.ssm-long-input   { width: 240px; }
.ssm-date-input   { width: 170px; }

.ssm-inline-select {
  border: 1px solid #ccc;
  background: #fff;
  padding: 4px 6px;
  margin: 0 2px;
  font-size: 0.95rem;
  font-family: inherit;
  height: 30px;
  vertical-align: middle;
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
}
.ssm-inline-select:focus { border-color: #3b7dd8; }

/* ── Red * wrapper ── */
.ssm-req-wrap {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.ssm-req-wrap.ssm-req-block { display: block; width: 100%; }
.ssm-req-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 13px;
  z-index: 1;
}
.ssm-req-wrap input { padding-left: 18px; }

/* ── Table ── */
.ssm-table-section    { margin-top: 20px; margin-bottom: 30px; }
.ssm-table-responsive { overflow-x: auto; }

.ssm-details-table {
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
}
.ssm-details-table th {
  border: 1px solid #2c3e50;
  padding: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #2c3e50;
  color: #fff;
}
.ssm-details-table td {
  border: 1px solid #bdc3c7;
  padding: 6px;
  vertical-align: middle;
  background-color: #fff;
}

.ssm-table-input {
  width: 100%;
  border: 1px solid #ddd;
  background: #fff;
  outline: none;
  padding: 4px 6px 4px 18px;
  font-size: 0.9rem;
  font-family: inherit;
  height: 28px;
  box-sizing: border-box;
  border-radius: 3px;
}
.ssm-table-input:focus { border-color: #3b7dd8; background: #fffaf9; }

.ssm-action-cell { text-align: center; vertical-align: middle; width: 60px; }
.ssm-remove-btn {
  background-color: #c0392b;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.ssm-remove-btn:hover:not(:disabled) { background-color: #962d22; }
.ssm-remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ssm-add-row-btn {
  margin-top: 10px;
  background: #2c3e50;
  color: #fff;
  border: none;
  padding: 7px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.92rem;
  font-family: inherit;
}
.ssm-add-row-btn:hover { background: #1a252f; }

/* ── Signature ── */
.ssm-signature-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 40px;
}
.ssm-signature-section { width: 360px; text-align: right; }
.ssm-sig-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
  gap: 8px;
  flex-wrap: wrap;
}
.ssm-sig-row label { font-size: 1.05rem; white-space: nowrap; }

.ssm-medium-select {
  width: 170px;
  padding: 4px 6px;
  height: 30px;
  font-size: 0.95rem;
  font-family: inherit;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
}

/* ── Submit message ── */
.ssm-msg {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.95rem;
  margin-top: 14px;
}
.ssm-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
.ssm-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

/* ── Footer ── */
.ssm-footer { text-align: center; margin-top: 40px; }
.ssm-save-btn {
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  margin: 0 6px;
}
.ssm-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
.ssm-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.ssm-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Hide on print (preserves natural display for screen) ── */
.ssm-hide-print { /* default display preserved */ }
@media print {
  .ssm-hide-print { display: none !important; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ssm-container { padding: 20px 14px; }
  .ssm-tiny-input,
  .ssm-small-input,
  .ssm-medium-input,
  .ssm-long-input,
  .ssm-date-input {
    width: 100% !important;
    margin: 4px 0;
  }
  .ssm-req-wrap { display: block; width: 100%; }
  .ssm-signature-section { width: 100%; }
  .ssm-medium-select { width: 100%; }
  .ssm-sig-row { justify-content: flex-start; }
  .ssm-footer { display: flex; flex-direction: column; gap: 10px; }
  .ssm-footer button { width: 100%; margin: 0; }
  .ssm-body-paragraph { line-height: 2.2; }
}
`;

/* ─────────────────────────────────────────────
   HELPERS / CONSTANTS
───────────────────────────────────────────── */
const API_URL = "/api/forms/sthalagat-sarjimin-mujulka";

const DEFAULT_DISTRICT = MUNICIPALITY?.district || MUNICIPALITY?.city || "";

const emptyTapsilRow = () => ({
  name:       "",
  watan:      "",
  prpn_no:    "",
  issue_date: new Date().toISOString().slice(0, 10),
});

const buildInitialState = (ward) => ({
  // DAO district (was hardcoded "काठमाडौँ" in two places)
  dao_district:           DEFAULT_DISTRICT,

  // Body intro fields
  district_office_1:      "",
  team_no_1:              "",
  municipality:           MUNICIPALITY?.name || "",
  ward_no:                ward ? String(ward) : "१",
  person_title:           "श्री",
  person_name:            "",
  relation_type_1:        "छोरा",
  applicant_name_1:       "",
  applicant_title:        "श्री",
  applicant_name_2:       "",
  relation_type_2:        "छोरा",
  district_office_2:      "",
  team_no_2:              "",

  // Tapsil table
  tapsil: [emptyTapsilRow()],

  // Signature
  signatory_name:         "",
  signatory_position:     "",
  signatory_date:         new Date().toISOString().slice(0, 10),

  // ApplicantDetailsNp footer
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_phone:        "",

  notes:                  "",
});

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function SthalagatSarjiminMujulka() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ── Table row handlers ── */
  const updateTapsilRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((s) => {
      const rows = s.tapsil.slice();
      rows[idx] = { ...rows[idx], [key]: val };
      return { ...s, tapsil: rows };
    });
  };

  const addTapsilRow = () => {
    setForm((s) => ({ ...s, tapsil: [...s.tapsil, emptyTapsilRow()] }));
  };

  const removeTapsilRow = (idx) => {
    if (form.tapsil.length <= 1) return;
    setForm((s) => ({
      ...s,
      tapsil: s.tapsil.filter((_, i) => i !== idx),
    }));
  };

  /* ── Validation ── */
  const validate = () => {
    if (!form.applicant_name_1?.trim())  return "निवेदकको नाम (पहिलो) आवश्यक छ।";
    if (!form.signatory_name?.trim())    return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
    if (!form.applicant_name?.trim())    return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        tapsil:  JSON.stringify(form.tapsil),
        ward_no: String(form.ward_no),
      };

      const res = await axios.post(API_URL, payload);
      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          setMessage({
            type: "success",
            text: "रेकर्ड सफलतापूर्वक सेभ भयो (id: " + (res.data?.id ?? "") + ")",
          });
        }
        setForm(buildInitialState(user?.ward));
      } else {
        throw new Error("Unexpected response: " + res.status);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्न सम्भव भएन";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated window ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const tapsilRowsHtml = form.tapsil
      .map(
        (r, i) => `
        <tr>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${i + 1}</td>
          <td style="border:1px solid #555; padding:6px;">${r.name || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.watan || ""}</td>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${r.prpn_no || ""}</td>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${r.issue_date || ""}</td>
        </tr>`
      )
      .join("");

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>स्थलगत सर्जमिन मुचुल्का</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 18px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .anusuchi-hdr { text-align: center; margin: 16px 0; }
          .anusuchi-title { font-size: 12pt; font-weight: bold; }
          .anusuchi-rule { font-size: 10pt; margin: 4px 0; }
          .form-title { font-size: 13pt; font-weight: bold; margin: 6px 0; }
          .sub-title { font-size: 11pt; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 18px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .data-table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 10pt; }
          .data-table th { background: #e0e0e0; border: 1px solid #555; padding: 6px; text-align: center; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .signature { text-align: right; margin-top: 30px; font-size: 10.5pt; }
          .signature p { margin: 8px 0; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 24px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 6px; font-size: 10pt; }
          .field-label { min-width: 140px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine || ""}</div>
          <div class="addr">${MUNICIPALITY.provinceLine || ""}</div>
        </div>

        <div class="anusuchi-hdr">
          <div class="anusuchi-title">अनुसूची-३</div>
          <div class="anusuchi-rule">नियम ३ को उपनियम (३) को खण्ड (क) सँग सम्बन्धित</div>
          <div class="form-title">स्थलगत सर्जमिन मुचुल्काको ढाँचा</div>
          <div class="sub-title">वंशजको नाताले</div>
        </div>

        <div class="body-text">
          लिखितम तपशिल बमोजिमका हामीहरु आगे जिल्ला प्रशासन कार्यालय,
          <span class="value">${form.dao_district || ""}</span>
          <span class="value">${form.district_office_1 || ""}</span>
          समक्षबाट नागरिकता वितरण कार्यको खटिइ आएको टोली नम्बर
          <span class="value">${form.team_no_1 || ""}</span>
          समक्ष यस जिल्लाको <span class="value">${form.municipality || ""}</span>
          वडा नं <span class="value">${form.ward_no || ""}</span>
          मा बसोबास गर्ने <span class="value">${form.person_title || ""}</span>
          <span class="value">${form.person_name || ""}</span>
          को <span class="value">${form.relation_type_1 || ""}</span>
          <span class="value">${form.applicant_name_1 || ""}</span>
          ले नेपाली नागरिकताको प्रमाण पत्र पाउनका लागि निवेदन दिनु भएको सम्बन्धमा हामीहरुलाई सोधनी हुँदा हाम्रो चित्त बुझ्यो निज निवेदक
          <span class="value">${form.applicant_title || ""}</span>
          <span class="value">${form.applicant_name_2 || ""}</span>
          का <span class="value">${form.relation_type_2 || ""}</span>
          हुन् निज निवेदक वंशजको नाताले नेपाली नागरिक हुन् निजलाई वंशजको नाताले नेपाली नागरिकता प्रमाण पत्र दिएमा फरक पर्ने छैन व्यहोरा फरक परेमा प्रचलित कानून बमोजिम हुने सजाय सहुँला बुझाउँला भनी हामी तपशिलका व्यक्तिहरु सही छाप गरी यो सर्जमिन मुचुल्का जिल्ला प्रशासन कार्यालय
          <span class="value">${form.dao_district || ""}</span>
          <span class="value">${form.district_office_2 || ""}</span>
          को नागरिकता वितरण टोली नम्बर
          <span class="value">${form.team_no_2 || ""}</span>
          मार्फत नेपाल सरकारमा चढायौं ।
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th style="width:8%">क्र.स.</th>
              <th>नाम थर</th>
              <th>वतन</th>
              <th style="width:16%">ना.प्र.प.नं</th>
              <th style="width:18%">नागरिकता जारी मिति</th>
            </tr>
          </thead>
          <tbody>${tapsilRowsHtml}</tbody>
        </table>

        <div class="signature">
          <p>नाम: <span class="value">${form.signatory_name || ""}</span></p>
          <p>पद: <span class="value">${form.signatory_position || ""}</span></p>
          <p>मिति: <span class="value">${form.signatory_date || ""}</span></p>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${form.applicant_name || ""}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${form.applicant_address || ""}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${form.applicant_phone || ""}</span></div>
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

  /* ─────────────────────────────────────────────
     Render
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="ssm-container"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSave(false);
        }}
        noValidate
      >
        {/* ── Top bar ── */}
        <div className="ssm-top-bar-title ssm-hide-print">
          स्थलगत सर्जमिन मुचुल्का ।
          <span className="ssm-top-right-bread">
            नेपाली नागरिकता &gt; स्थलगत सर्जमिन मुचुल्का
          </span>
        </div>

        {/* ── Municipality Header (shared component) ── */}
        <MunicipalityHeader />

        {/* ── Anusuchi Document Header ── */}
        <div className="ssm-form-header-details">
          <h3 className="ssm-schedule-title">अनुसूची-३</h3>
          <p className="ssm-rule-text">
            नियम ३ को उपनियम (३) को खण्ड (क) सँग सम्बन्धित
          </p>
          <h2 className="ssm-form-type-title">स्थलगत सर्जमिन मुचुल्काको ढाँचा</h2>
          <h3 className="ssm-sub-type-text">वंशजको नाताले</h3>
        </div>

        {/* ── Body paragraph — all hardcoded values now editable ── */}
        <div className="ssm-intro-paragraph">
          <p className="ssm-body-paragraph">
            लिखितम तपशिल बमोजिमका हामीहरु आगे जिल्ला प्रशासन कार्यालय,{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="dao_district"
                className="ssm-dotted-input ssm-medium-input"
                value={form.dao_district}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="district_office_1"
                className="ssm-dotted-input ssm-medium-input"
                value={form.district_office_1}
                onChange={handleChange}
                autoComplete="off"
              />
            </span>{" "}
            समक्षबाट नागरिकता वितरण कार्यको खटिइ आएको टोली नम्बर{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="team_no_1"
                className="ssm-dotted-input ssm-small-input"
                value={form.team_no_1}
                onChange={handleChange}
              />
            </span>{" "}
            समक्ष यस जिल्लाको{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="municipality"
                className="ssm-dotted-input ssm-medium-input"
                value={form.municipality}
                onChange={handleChange}
              />
            </span>{" "}
            वडा नं{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="ward_no"
                className="ssm-dotted-input ssm-tiny-input"
                value={form.ward_no}
                onChange={handleChange}
              />
            </span>{" "}
            मा बसोबास गर्ने{" "}
            <select
              name="person_title"
              className="ssm-inline-select"
              value={form.person_title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="person_name"
                className="ssm-dotted-input ssm-long-input"
                value={form.person_name}
                onChange={handleChange}
              />
            </span>{" "}
            को{" "}
            <select
              name="relation_type_1"
              className="ssm-inline-select"
              value={form.relation_type_1}
              onChange={handleChange}
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="applicant_name_1"
                className="ssm-dotted-input ssm-long-input"
                value={form.applicant_name_1}
                onChange={handleChange}
                required
              />
            </span>{" "}
            ले नेपाली नागरिकताको प्रमाण पत्र पाउनका लागि निवेदन दिनु भएको
            सम्बन्धमा हामीहरुलाई सोधनी हुँदा हाम्रो चित्त बुझ्यो निज निवेदक{" "}
            <select
              name="applicant_title"
              className="ssm-inline-select"
              value={form.applicant_title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="applicant_name_2"
                className="ssm-dotted-input ssm-long-input"
                value={form.applicant_name_2}
                onChange={handleChange}
              />
            </span>{" "}
            का{" "}
            <select
              name="relation_type_2"
              className="ssm-inline-select"
              value={form.relation_type_2}
              onChange={handleChange}
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            हुन् निज निवेदक वंशजको नाताले नेपाली नागरिक हुन् निजलाई वंशजको
            नाताले नेपाली नागरिकता प्रमाण पत्र दिएमा फरक पर्ने छैन व्यहोरा
            फरक परेमा प्रचलित कानून बमोजिम हुने सजाय सहुँला बुझाउँला भनी हामी
            तपशिलका व्यक्तिहरु सही छाप गरी यो सर्जमिन मुचुल्का जिल्ला
            प्रशासन कार्यालय{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="district_office_2"
                className="ssm-dotted-input ssm-medium-input"
                value={form.district_office_2}
                onChange={handleChange}
              />
            </span>{" "}
            को नागरिकता वितरण टोली नम्बर{" "}
            <span className="ssm-req-wrap">
              <span className="ssm-req-star">*</span>
              <input
                name="team_no_2"
                className="ssm-dotted-input ssm-medium-input"
                value={form.team_no_2}
                onChange={handleChange}
              />
            </span>{" "}
            मार्फत नेपाल सरकारमा चढायौं ।
          </p>
        </div>

        {/* ── Tapsil table — restructured (× on every row, + button below) ── */}
        <div className="ssm-table-section">
          <div className="ssm-table-responsive">
            <table className="ssm-details-table">
              <thead>
                <tr>
                  <th style={{ width: "8%" }}>क्र.स.</th>
                  <th>नाम थर</th>
                  <th>वतन</th>
                  <th style={{ width: "16%" }}>ना.प्र.प.नं</th>
                  <th style={{ width: "18%" }}>नागरिकता जारी मिति</th>
                  <th className="ssm-hide-print" style={{ width: "60px" }}>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {form.tapsil.map((row, idx) => (
                  <tr key={idx}>
                    <td className="ssm-center-text">{idx + 1}</td>
                    <td>
                      <span className="ssm-req-wrap ssm-req-block">
                        <span className="ssm-req-star">*</span>
                        <input
                          className="ssm-table-input"
                          value={row.name}
                          onChange={updateTapsilRow(idx, "name")}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="ssm-req-wrap ssm-req-block">
                        <span className="ssm-req-star">*</span>
                        <input
                          className="ssm-table-input"
                          value={row.watan}
                          onChange={updateTapsilRow(idx, "watan")}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="ssm-req-wrap ssm-req-block">
                        <span className="ssm-req-star">*</span>
                        <input
                          className="ssm-table-input"
                          value={row.prpn_no}
                          onChange={updateTapsilRow(idx, "prpn_no")}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="ssm-req-wrap ssm-req-block">
                        <span className="ssm-req-star">*</span>
                        <input
                          type="date"
                          className="ssm-table-input"
                          value={row.issue_date}
                          onChange={updateTapsilRow(idx, "issue_date")}
                        />
                      </span>
                    </td>
                    <td className="ssm-action-cell ssm-hide-print">
                      <button
                        type="button"
                        className="ssm-remove-btn"
                        onClick={() => removeTapsilRow(idx)}
                        disabled={form.tapsil.length <= 1}
                        title="पङ्क्ति हटाउनुहोस्"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="ssm-add-row-btn ssm-hide-print"
            onClick={addTapsilRow}
          >
            + पङ्क्ति थप्नुहोस्
          </button>
        </div>

        {/* ── Signature ── */}
        <div className="ssm-signature-container">
          <div className="ssm-signature-section">
            <div className="ssm-sig-row">
              <label>नाम:</label>
              <span className="ssm-req-wrap">
                <span className="ssm-req-star">*</span>
                <input
                  name="signatory_name"
                  className="ssm-dotted-input ssm-medium-input"
                  value={form.signatory_name}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
            <div className="ssm-sig-row">
              <label>पद:</label>
              <select
                name="signatory_position"
                className="ssm-medium-select"
                value={form.signatory_position}
                onChange={handleChange}
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
            </div>
            <div className="ssm-sig-row">
              <label>मिति:</label>
              <span className="ssm-req-wrap">
                <span className="ssm-req-star">*</span>
                <input
                  type="date"
                  name="signatory_date"
                  className="ssm-dotted-input ssm-date-input"
                  value={form.signatory_date}
                  onChange={handleChange}
                />
              </span>
            </div>
          </div>
        </div>

        {/* ── Applicant details ── */}
        <div className="ssm-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer — two buttons ── */}
        <div className="ssm-footer ssm-hide-print">
          <div>
            <button
              type="submit"
              className="ssm-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="ssm-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
          {message && (
            <div className={`ssm-msg ${message.type === "error" ? "ssm-msg-error" : "ssm-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="ssm-copyright-footer ssm-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>
      </form>
    </>
  );
}