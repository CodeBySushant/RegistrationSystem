import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────
   STYLES — all classes prefixed "ccr-"
───────────────────────────────────────────── */
const styles = `
.ccr-container {
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

.ccr-en-label { font-family: sans-serif; font-size: 0.9rem; color: #333; }
.ccr-bold     { font-weight: bold; }
.ccr-underline { text-decoration: underline; }

/* ── Top bar ── */
.ccr-top-bar {
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
.ccr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Meta ── */
.ccr-meta-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1rem;
}
.ccr-meta-row p { margin: 5px 0; }

/* ── Subject ── */
.ccr-subject { text-align: center; margin: 24px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Addressee ── */
.ccr-addressee { margin-bottom: 20px; font-size: 1.05rem; line-height: 1.9; }
.ccr-addressee p {
  margin: 4px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

/* ── Body intro ── */
.ccr-body-intro { font-size: 1.05rem; line-height: 2.2; text-align: justify; margin-bottom: 24px; }

/* ── Section ── */
.ccr-section {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 18px 22px;
  margin-bottom: 18px;
  background-color: rgba(255,255,255,0.55);
}
.ccr-section-title {
  font-weight: bold;
  font-size: 1.05rem;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
}

/* ── Field grid ── */
.ccr-grid {
  display: grid;
  gap: 14px 18px;
  margin-bottom: 10px;
}
.ccr-cols-1 { grid-template-columns: 1fr; }
.ccr-cols-2 { grid-template-columns: 1fr 1fr; }
.ccr-cols-3 { grid-template-columns: 1fr 1fr 1fr; }
.ccr-cols-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }

.ccr-field { display: flex; flex-direction: column; gap: 4px; }
.ccr-field > label { font-size: 0.92rem; font-weight: 600; color: #333; }
.ccr-field .ccr-req-wrap,
.ccr-field select { width: 100%; }
.ccr-field input { width: 100%; }

.ccr-subsection-label {
  grid-column: 1 / -1;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 2px;
  font-size: 0.95rem;
}

/* ── Inputs — now bordered + radius ── */
.ccr-input {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  outline: none;
  padding: 6px 10px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #000;
  box-sizing: border-box;
}
.ccr-input:focus { border-color: #3b7dd8; background-color: #f7fbff; }

.ccr-select {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  padding: 6px 8px;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
}
.ccr-select:focus { border-color: #3b7dd8; }

/* ── Red * wrapper ── */
.ccr-req-wrap {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.ccr-req-wrap.ccr-req-block { display: block; }
.ccr-req-star {
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
.ccr-req-wrap input { padding-left: 18px; }

/* ── Declaration textarea ── */
.ccr-declaration textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  padding: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 80px;
}
.ccr-declaration textarea:focus { border-color: #3b7dd8; outline: none; }

/* ── Notes section ── */
.ccr-notes-section { margin-top: 18px; }
.ccr-notes-section label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
}
.ccr-notes-section textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  padding: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
}

/* ── Submit message ── */
.ccr-msg {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.95rem;
  margin-top: 14px;
}
.ccr-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
.ccr-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

/* ── Footer ── */
.ccr-footer { text-align: center; margin-top: 40px; }
.ccr-save-btn {
  color: #fff;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  margin: 0 6px;
}
.ccr-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
.ccr-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.ccr-copyright {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Hide on print (preserves natural display) ── */
.ccr-hide-print { /* default display preserved */ }
@media print {
  .ccr-hide-print { display: none !important; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ccr-container { padding: 20px 14px; }
  .ccr-cols-2, .ccr-cols-3, .ccr-cols-4 { grid-template-columns: 1fr; }
  .ccr-req-wrap { display: block; width: 100%; }
  .ccr-meta-row { flex-direction: column; }
  .ccr-footer { display: flex; flex-direction: column; gap: 10px; }
  .ccr-footer button { width: 100%; margin: 0; }
  .ccr-addressee p { flex-direction: row; }
}
`;

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-certificate-recommendation";

const DEFAULT_DISTRICT = MUNICIPALITY?.district || MUNICIPALITY?.city || "";

const buildInitialState = () => ({
  // Meta
  patra_sankhya:             "२०८२/८३",
  chalani_no:                "",
  issue_date:                new Date().toISOString().slice(0, 10),
  ne_sa:                     "",

  // Addressee
  addressee_title:           "प्रमुख जिल्ला अधिकारी",
  addressee_office:          "जिल्ला प्रशासन कार्यालय",
  dao_district:              DEFAULT_DISTRICT,

  // Personal details
  full_name_np:              "",
  full_name_en:              "",
  sex:                       "पुरुष",
  dob_bs:                    "",
  dob_ad:                    "",

  // Birth address (NP + EN)
  birth_district_np:         "",
  birth_municipality_np:     "",
  birth_ward_np:             "",
  birth_district_en:         "",
  birth_municipality_en:     "",
  birth_ward_en:             "",

  // Permanent address
  permanent_district_np:     DEFAULT_DISTRICT,
  permanent_municipality_np: MUNICIPALITY?.name || "",
  permanent_ward_np:         "",

  // Family details
  grandfather_name:          "",
  grandfather_relation:      "",
  father_name:               "",
  father_address:            "",
  father_citizenship_no:     "",
  mother_name:               "",
  mother_citizenship_no:     "",
  husband_name:              "",
  husband_address:           "",
  husband_citizenship_no:    "",

  // Witness
  witness_name:              "",
  witness_address:           "",
  witness_citizenship_no:    "",
  witness_signature:         "",

  // Declaration
  declaration_text:          "",

  // Recommender
  recommender_name:          "",
  recommender_designation:   "",
  recommender_date:          new Date().toISOString().slice(0, 10),

  // ApplicantDetailsNp footer
  applicant_name:            "",
  applicant_address:         "",
  applicant_citizenship_no:  "",
  applicant_phone:           "",

  notes:                     "",
});

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CitizenshipCertificateRecommendation() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* ── Validation ── */
  const validate = () => {
    if (!form.full_name_np?.trim())             return "पूरा नाम (नेपाली) आवश्यक छ।";
    if (!form.father_name?.trim())              return "बाबुको नाम आवश्यक छ।";
    if (!form.recommender_name?.trim())         return "सिफारिस गर्नेको नाम आवश्यक छ।";
    if (!form.applicant_name?.trim())           return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no?.trim()) return "निवेदकको नागरिकता नं. आवश्यक छ।";
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
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

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
        setForm(buildInitialState());
      } else {
        throw new Error("Unexpected response: " + res.status);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्न सकिएन";
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

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>नेपाली नागरिकताको प्रमाण पत्र सिफारिस</title>
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
          .header { text-align: center; margin-bottom: 16px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 14px 0; }
          .addressee { margin-bottom: 14px; font-size: 11pt; line-height: 1.9; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 16px 0; text-decoration: underline; }
          .body-text { font-size: 11pt; line-height: 2.0; text-align: justify; margin-bottom: 14px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .section-box { border: 1px solid #999; padding: 12px 16px; margin: 12px 0; border-radius: 3px; }
          .section-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; font-size: 11pt; }
          .row { display: grid; gap: 6px 18px; margin-bottom: 8px; }
          .cols-2 { grid-template-columns: 1fr 1fr; }
          .cols-3 { grid-template-columns: 1fr 1fr 1fr; }
          .field { display: flex; gap: 6px; font-size: 10pt; line-height: 1.5; }
          .field .label { font-weight: 600; min-width: 100px; }
          .signature { text-align: right; margin-top: 30px; font-size: 10.5pt; }
          .signature p { margin: 6px 0; }
          .applicant-box { border: 1px solid #999; padding: 12px 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 8px; }
          .applicant-row { display: flex; margin-bottom: 5px; font-size: 10pt; }
          .applicant-label { min-width: 140px; font-weight: 600; }
          .applicant-val { flex: 1; }
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

        <div class="meta">
          <div>
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="addressee">
          श्रीमान् <span class="value">${form.addressee_title || ""}</span> ज्यू,<br/>
          <span class="value">${form.addressee_office || ""}</span>,<br/>
          <span class="value">${form.dao_district || ""}</span> ।
        </div>

        <div class="subject">विषय: नेपाली नागरिकताको प्रमाण पत्रको लागि सिफारिस ।</div>

        <div class="body-text">
          उपरोक्त सम्बन्धमा यस वडामा स्थायी रुपले बसोबास गर्ने तपसिल बमोजिमका
          व्यक्तिलाई नेपाली नागरिकता प्रमाण-पत्र दिएमा फरक नपर्ने भनी सिफारिस
          गरिएको छ । निवेदकको विवरण निम्न बमोजिम छ :
        </div>

        <div class="section-box">
          <div class="section-title">१. व्यक्तिगत विवरण</div>
          <div class="row cols-2">
            <div class="field"><span class="label">पूरा नाम:</span><span class="value">${form.full_name_np || ""}</span></div>
            <div class="field"><span class="label">Full Name:</span><span class="value">${(form.full_name_en || "").toUpperCase()}</span></div>
            <div class="field"><span class="label">लिङ्ग:</span><span class="value">${form.sex || ""}</span></div>
            <div class="field"><span class="label">जन्म मिति (वि.सं.):</span><span class="value">${form.dob_bs || ""}</span></div>
            <div class="field"><span class="label">DOB (A.D.):</span><span class="value">${form.dob_ad || ""}</span></div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">२. जन्म स्थान</div>
          <div class="row cols-3">
            <div class="field"><span class="label">जिल्ला:</span><span class="value">${form.birth_district_np || ""}</span></div>
            <div class="field"><span class="label">नगरपालिका:</span><span class="value">${form.birth_municipality_np || ""}</span></div>
            <div class="field"><span class="label">वडा नं.:</span><span class="value">${form.birth_ward_np || ""}</span></div>
          </div>
          <div class="row cols-3">
            <div class="field"><span class="label">District:</span><span class="value">${form.birth_district_en || ""}</span></div>
            <div class="field"><span class="label">Municipality:</span><span class="value">${form.birth_municipality_en || ""}</span></div>
            <div class="field"><span class="label">Ward:</span><span class="value">${form.birth_ward_en || ""}</span></div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">३. स्थायी ठेगाना</div>
          <div class="row cols-3">
            <div class="field"><span class="label">जिल्ला:</span><span class="value">${form.permanent_district_np || ""}</span></div>
            <div class="field"><span class="label">नगरपालिका:</span><span class="value">${form.permanent_municipality_np || ""}</span></div>
            <div class="field"><span class="label">वडा नं.:</span><span class="value">${form.permanent_ward_np || ""}</span></div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">४. पारिवारिक विवरण</div>
          <div class="row cols-2">
            <div class="field"><span class="label">बाजेको नाम:</span><span class="value">${form.grandfather_name || ""}</span></div>
            <div class="field"><span class="label">नाता:</span><span class="value">${form.grandfather_relation || ""}</span></div>
          </div>
          <div class="row cols-3">
            <div class="field"><span class="label">बाबुको नाम:</span><span class="value">${form.father_name || ""}</span></div>
            <div class="field"><span class="label">ठेगाना:</span><span class="value">${form.father_address || ""}</span></div>
            <div class="field"><span class="label">नागरिकता नं.:</span><span class="value">${form.father_citizenship_no || ""}</span></div>
          </div>
          <div class="row cols-2">
            <div class="field"><span class="label">आमाको नाम:</span><span class="value">${form.mother_name || ""}</span></div>
            <div class="field"><span class="label">नागरिकता नं.:</span><span class="value">${form.mother_citizenship_no || ""}</span></div>
          </div>
          <div class="row cols-3">
            <div class="field"><span class="label">पतिको नाम:</span><span class="value">${form.husband_name || ""}</span></div>
            <div class="field"><span class="label">ठेगाना:</span><span class="value">${form.husband_address || ""}</span></div>
            <div class="field"><span class="label">नागरिकता नं.:</span><span class="value">${form.husband_citizenship_no || ""}</span></div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">५. रोहबर</div>
          <div class="row cols-2">
            <div class="field"><span class="label">नाम थर:</span><span class="value">${form.witness_name || ""}</span></div>
            <div class="field"><span class="label">ठेगाना:</span><span class="value">${form.witness_address || ""}</span></div>
            <div class="field"><span class="label">नागरिकता नं.:</span><span class="value">${form.witness_citizenship_no || ""}</span></div>
            <div class="field"><span class="label">सहीछाप:</span><span class="value">${form.witness_signature || ""}</span></div>
          </div>
        </div>

        ${form.declaration_text?.trim() ? `
        <div class="section-box">
          <div class="section-title">६. घोषणा</div>
          <div style="font-size: 10pt; line-height: 1.8;">${form.declaration_text}</div>
        </div>` : ""}

        <div class="signature">
          <p>सिफारिस गर्नेको :</p>
          <p>नाम: <span class="value">${form.recommender_name || ""}</span></p>
          <p>पद: <span class="value">${form.recommender_designation || ""}</span></p>
          <p>मिति: <span class="value">${form.recommender_date || ""}</span></p>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="applicant-row"><span class="applicant-label">नाम:</span><span class="applicant-val">${form.applicant_name || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">ठेगाना:</span><span class="applicant-val">${form.applicant_address || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">नागरिकता नं.:</span><span class="applicant-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">फोन:</span><span class="applicant-val">${form.applicant_phone || ""}</span></div>
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
        className="ccr-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top bar ── */}
        <div className="ccr-top-bar ccr-hide-print">
          नेपाली नागरिकताको प्रमाण पत्र पाउँ।
          <span className="ccr-breadcrumb">
            नागरिकता &gt; नेपाली नागरिकताको प्रमाण पत्र पाउँ
          </span>
        </div>

        {/* ── Municipality Header ── */}
        <MunicipalityHeader />

        {/* ── Meta ── */}
        <div className="ccr-meta-row">
          <div>
            <p>
              पत्र संख्या :{" "}
              <span className="ccr-req-wrap">
                <span className="ccr-req-star">*</span>
                <input
                  name="patra_sankhya"
                  className="ccr-input"
                  style={{ width: 120 }}
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="ccr-req-wrap">
                <span className="ccr-req-star">*</span>
                <input
                  name="chalani_no"
                  className="ccr-input"
                  style={{ width: 120 }}
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p>
              मिति :{" "}
              <span className="ccr-req-wrap">
                <span className="ccr-req-star">*</span>
                <input
                  type="date"
                  name="issue_date"
                  className="ccr-input"
                  style={{ width: 170 }}
                  value={form.issue_date}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="ccr-req-wrap">
                <span className="ccr-req-star">*</span>
                <input
                  name="ne_sa"
                  className="ccr-input"
                  style={{ width: 220 }}
                  placeholder="जस्तै: 1146 चौलागा"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="ccr-addressee">
          <p>
            श्रीमान्{" "}
            <span className="ccr-req-wrap">
              <span className="ccr-req-star">*</span>
              <input
                name="addressee_title"
                className="ccr-input"
                style={{ width: 240 }}
                value={form.addressee_title}
                onChange={handleChange}
              />
            </span>
            {" "}ज्यू,
          </p>
          <p>
            <span className="ccr-req-wrap">
              <span className="ccr-req-star">*</span>
              <input
                name="addressee_office"
                className="ccr-input"
                style={{ width: 300 }}
                value={form.addressee_office}
                onChange={handleChange}
              />
            </span>
            ,
          </p>
          <p>
            <span className="ccr-req-wrap">
              <span className="ccr-req-star">*</span>
              <input
                name="dao_district"
                className="ccr-input"
                style={{ width: 200 }}
                value={form.dao_district}
                onChange={handleChange}
              />
            </span>
            {" "}।
          </p>
        </div>

        {/* ── Subject ── */}
        <div className="ccr-subject">
          <p>विषय: <span className="ccr-underline">नेपाली नागरिकताको प्रमाण पत्रको लागि सिफारिस ।</span></p>
        </div>

        {/* ── Body intro ── */}
        <div className="ccr-body-intro">
          उपरोक्त सम्बन्धमा यस वडामा स्थायी रुपले बसोबास गर्ने तपसिल बमोजिमका
          व्यक्तिलाई नेपाली नागरिकता प्रमाण-पत्र दिएमा फरक नपर्ने भनी सिफारिस
          गरिएको छ । निवेदकको विवरण निम्न बमोजिम छ :
        </div>

        {/* ════════════════════════════════════════════════════════════════
            १. व्यक्तिगत विवरण
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">१. व्यक्तिगत विवरण</div>

          <div className="ccr-grid ccr-cols-1">
            <div className="ccr-field">
              <label>पूरा नाम (नेपाली) :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input
                  type="text"
                  name="full_name_np"
                  value={form.full_name_np}
                  onChange={handleChange}
                  className="ccr-input"
                  required
                />
              </span>
            </div>
            <div className="ccr-field">
              <label className="ccr-en-label">Full Name (In Block) :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input
                  type="text"
                  name="full_name_en"
                  value={form.full_name_en}
                  onChange={handleChange}
                  className="ccr-input"
                  style={{ textTransform: "uppercase" }}
                />
              </span>
            </div>
          </div>

          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label>लिङ्ग :</label>
              <select name="sex" value={form.sex} onChange={handleChange} className="ccr-select">
                <option value="पुरुष">पुरुष</option>
                <option value="महिला">महिला</option>
                <option value="अन्य">अन्य</option>
              </select>
            </div>
            <div className="ccr-field">
              <label>जन्म मिति (वि.सं.) :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input
                  type="text"
                  name="dob_bs"
                  value={form.dob_bs}
                  onChange={handleChange}
                  className="ccr-input"
                />
              </span>
            </div>
            <div className="ccr-field">
              <label className="ccr-en-label">Date of Birth (A.D.) :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input
                  type="date"
                  name="dob_ad"
                  value={form.dob_ad}
                  onChange={handleChange}
                  className="ccr-input"
                />
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            २. जन्म स्थान
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">२. जन्म स्थान</div>

          <div className="ccr-subsection-label">नेपाली :</div>
          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label>जिल्ला :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="birth_district_np" value={form.birth_district_np} onChange={handleChange} className="ccr-input" placeholder="जिल्ला" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नगरपालिका :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="birth_municipality_np" value={form.birth_municipality_np} onChange={handleChange} className="ccr-input" placeholder="नगरपालिका" />
              </span>
            </div>
            <div className="ccr-field">
              <label>वडा नं. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="birth_ward_np" value={form.birth_ward_np} onChange={handleChange} className="ccr-input" placeholder="वडा नं." />
              </span>
            </div>
          </div>

          <div className="ccr-subsection-label">English :</div>
          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label className="ccr-en-label">District :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="birth_district_en" value={form.birth_district_en} onChange={handleChange} className="ccr-input" placeholder="District" style={{ textTransform: "uppercase" }} />
              </span>
            </div>
            <div className="ccr-field">
              <label className="ccr-en-label">Municipality :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="birth_municipality_en" value={form.birth_municipality_en} onChange={handleChange} className="ccr-input" placeholder="Municipality" style={{ textTransform: "uppercase" }} />
              </span>
            </div>
            <div className="ccr-field">
              <label className="ccr-en-label">Ward No. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="birth_ward_en" value={form.birth_ward_en} onChange={handleChange} className="ccr-input" placeholder="Ward No." />
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ३. स्थायी ठेगाना
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">३. स्थायी ठेगाना</div>
          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label>जिल्ला :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="permanent_district_np" value={form.permanent_district_np} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नगरपालिका :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="permanent_municipality_np" value={form.permanent_municipality_np} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>वडा नं. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="permanent_ward_np" value={form.permanent_ward_np} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ४. पारिवारिक विवरण
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">४. पारिवारिक विवरण</div>

          <div className="ccr-subsection-label">बाजे :</div>
          <div className="ccr-grid ccr-cols-2">
            <div className="ccr-field">
              <label>नाम :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="grandfather_name" value={form.grandfather_name} onChange={handleChange} className="ccr-input" placeholder="बाजेको नाम" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नाता :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="grandfather_relation" value={form.grandfather_relation} onChange={handleChange} className="ccr-input" placeholder="नाता" />
              </span>
            </div>
          </div>

          <div className="ccr-subsection-label">बाबु :</div>
          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label>नाम :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="father_name" value={form.father_name} onChange={handleChange} className="ccr-input" required />
              </span>
            </div>
            <div className="ccr-field">
              <label>ठेगाना :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="father_address" value={form.father_address} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नागरिकता नं. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="father_citizenship_no" value={form.father_citizenship_no} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
          </div>

          <div className="ccr-subsection-label">आमा :</div>
          <div className="ccr-grid ccr-cols-2">
            <div className="ccr-field">
              <label>नाम :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="mother_name" value={form.mother_name} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नागरिकता नं. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="mother_citizenship_no" value={form.mother_citizenship_no} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
          </div>

          <div className="ccr-subsection-label">पति (विवाहित भएमा) :</div>
          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label>नाम :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="husband_name" value={form.husband_name} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>ठेगाना :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="husband_address" value={form.husband_address} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नागरिकता नं. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="husband_citizenship_no" value={form.husband_citizenship_no} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ५. रोहबर
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">५. रोहबर</div>
          <div className="ccr-grid ccr-cols-4">
            <div className="ccr-field">
              <label>नाम थर :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="witness_name" value={form.witness_name} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>ठेगाना :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="witness_address" value={form.witness_address} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>नागरिकता नं. :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="witness_citizenship_no" value={form.witness_citizenship_no} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
            <div className="ccr-field">
              <label>सहीछाप :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input name="witness_signature" value={form.witness_signature} onChange={handleChange} className="ccr-input" />
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ६. घोषणा
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">६. घोषणा</div>
          <div className="ccr-declaration">
            <textarea
              name="declaration_text"
              value={form.declaration_text}
              onChange={handleChange}
              placeholder="घोषणाको व्यहोरा..."
              rows={4}
            />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ७. सिफारिस गर्ने
        ════════════════════════════════════════════════════════════════ */}
        <div className="ccr-section">
          <div className="ccr-section-title">७. सिफारिस गर्ने</div>
          <div className="ccr-grid ccr-cols-3">
            <div className="ccr-field">
              <label>नाम :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input
                  name="recommender_name"
                  value={form.recommender_name}
                  onChange={handleChange}
                  className="ccr-input"
                  required
                />
              </span>
            </div>
            <div className="ccr-field">
              <label>पद :</label>
              <select
                name="recommender_designation"
                value={form.recommender_designation}
                onChange={handleChange}
                className="ccr-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
            <div className="ccr-field">
              <label>मिति :</label>
              <span className="ccr-req-wrap ccr-req-block">
                <span className="ccr-req-star">*</span>
                <input
                  type="date"
                  name="recommender_date"
                  value={form.recommender_date}
                  onChange={handleChange}
                  className="ccr-input"
                />
              </span>
            </div>
          </div>
        </div>

        {/* ── Applicant Details (shared component) ── */}
        <div className="ccr-hide-print">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Notes ── */}
        <div className="ccr-notes-section ccr-hide-print">
          <label>कैफियत / थप जानकारी</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="कुनै अतिरिक्त जानकारी..."
          />
        </div>

        {/* ── Footer — two buttons ── */}
        <div className="ccr-footer ccr-hide-print">
          <div>
            <button
              type="submit"
              className="ccr-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="ccr-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
          {message && (
            <div className={`ccr-msg ${message.type === "error" ? "ccr-msg-error" : "ccr-msg-success"}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="ccr-copyright ccr-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
        </div>
      </form>
    </>
  );
}