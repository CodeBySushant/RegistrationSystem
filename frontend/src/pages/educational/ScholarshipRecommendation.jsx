import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:              "२०८२/८३",
  chalani_no:             "",
  date:                   "२०८२-०८-०६",
  nepali_date_label:      "1146 थिंलाथ्व, 2 शनिवार",
  sabik_place:            "",
  ward_no:                MUNICIPALITY.wardNumber || "",
  sabik_ward_no:          "",
  residency_type:         "स्थायी",
  father_name:            "",
  mother_name:            "",
  household_economic_status: "कमजोर",
  child_relation:         "छोरा",
  child_title:            "श्री",
  child_name:             "",
  signature_name:         "",
  designation:            "",
  // footer applicant details
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship:  "",
  applicant_phone:        "",
  notes:                  "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: scr-)
───────────────────────────────────────────── */
const styles = `
.scr-container {
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

.scr-bold-text      { font-weight: bold; }
.scr-underline-text { text-decoration: underline; }
.scr-red-text       { color: #e74c3c; }

.scr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.scr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.scr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.scr-meta-left p,
.scr-meta-right p {
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.scr-meta-right { text-align: right; }
.scr-meta-right p { justify-content: flex-end; }

.scr-meta-input {
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  padding: 4px 8px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
}
.scr-small-input  { width: 130px; }
.scr-date-input   { width: 150px; }
.scr-nesa-input   { width: 220px; }

.scr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.scr-salutation-section {
  margin-bottom: 20px;
  font-size: 1rem;
}

.scr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.scr-inline-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-family: inherit;
}
.scr-inline-input:focus { border-color: #3b7dd8; }

.scr-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-weight: bold;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.scr-tiny-box   { width: 50px; text-align: center; }
.scr-medium-box { width: 160px; }
.scr-long-box   { width: 220px; }

/* ── Red required-star wrapper ── */
.scr-req-wrap { position: relative; display: inline-block; }
.scr-req-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 14px;
  z-index: 1;
}
.scr-req-wrap input { padding-left: 18px; }

.scr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.scr-signature-block { width: 220px; text-align: center; }
.scr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.scr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.scr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.scr-footer {
  text-align: center;
  margin-top: 40px;
}
.scr-save-print-btn {
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.scr-save-print-btn:hover:not(:disabled) { filter: brightness(0.9); }
.scr-save-print-btn:disabled { background-color: #6c757d !important; cursor: not-allowed; }

.scr-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .scr-container { padding: 15px; }
  .scr-meta-data-row { flex-direction: column; gap: 8px; }
  .scr-meta-right { text-align: left; }
  .scr-meta-right p { justify-content: flex-start; }
  .scr-inline-input { width: 100px; }
  .scr-long-box { width: 160px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ScholarshipRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const validate = () => {
    if (!form.father_name?.trim())     return "बुबाको नाम आवश्यक छ";
    if (!form.mother_name?.trim())     return "आमाको नाम आवश्यक छ";
    if (!form.child_name?.trim())      return "विद्यार्थीको नाम आवश्यक छ";
    if (!form.applicant_name?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    if (!form.signature_name?.trim())  return "हस्ताक्षरकर्ताको नाम आवश्यक छ";
    return null;
  };

  /* ── Single save function — one POST, no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/scholarship-recommendation",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id ?? ""));
        }
        setForm(INITIAL_STATE);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + res.status);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated print window, only the form ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const v = (val) => (val === null || val === undefined ? "" : String(val));

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>छात्रवृत्ति सिफारिस</title>
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
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; align-items: flex-start; margin: 16px 0; font-size: 11pt; line-height: 1.8; }
          .meta-left { text-align: left; }
          .meta-right { text-align: right; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 22px 0; text-decoration: underline; }
          .salutation { margin-bottom: 16px; font-size: 11pt; }
          .body-text { font-size: 11pt; line-height: 2.3; text-align: justify; margin-bottom: 28px; }
          /* value sizes to content — small values don't leave big gaps, long
             values don't clip or merge into surrounding text */
          .value { font-weight: bold; padding: 0 4px; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <div class="meta">
          <div class="meta-left">
            <div>पत्र संख्या : <span class="value">${v(form.letter_no)}</span></div>
            <div>चलानी नं. : <span class="value">${v(form.chalani_no)}</span></div>
          </div>
          <div class="meta-right">
            <div>मिति : <span class="value">${v(form.date)}</span></div>
            <div>ने.सं : <span class="value">${v(form.nepali_date_label)}</span></div>
          </div>
        </div>

        <div class="subject">विषय: छात्रवृत्ति सिफारिस ।</div>

        <div class="salutation">श्री जो जस सँग सम्बन्ध राख्दछ,</div>

        <div class="body-text">
          उपरोक्त विषयमा <span class="value">${MUNICIPALITY.name}</span>
          वडा नं. <span class="value">${v(form.ward_no)}</span>
          (साविक <span class="value">${v(form.sabik_place)}</span>,
          वडा नं. <span class="value">${v(form.sabik_ward_no)}</span> )
          अन्तर्गत <span class="value">${v(form.residency_type)}</span>
          बसोबास गर्ने श्री <span class="value">${v(form.father_name)}</span>
          तथा श्रीमती <span class="value">${v(form.mother_name)}</span>
          को आर्थिक अवस्था <span class="value">${v(form.household_economic_status)}</span>
          भएको हुँदा निजहरूको <span class="value">${v(form.child_relation)}</span>
          <span class="value">${v(form.child_title)}</span>
          <span class="value">${v(form.child_name)}</span>
          लाई नियमानुसार छात्रवृत्ति को लागि सिफारिस गरिन्छ ।
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${v(form.signature_name)}</div>
            <div>${v(form.designation)}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${v(form.applicant_name)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${v(form.applicant_address)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${v(form.applicant_citizenship)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${v(form.applicant_phone)}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
      return;
    }
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Adapter for ApplicantDetailsNp which expects camelCase keys
  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name",
      applicantAddress:     "applicant_address",
      applicantCitizenship: "applicant_citizenship",
      applicantPhone:       "applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="scr-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >
          {/* ── Top bar ── */}
          <div className="scr-top-bar-title">
            छात्रवृत्ति सिफारिस ।
            <span className="scr-top-right-bread">
              शैक्षिक &gt; छात्रवृत्ति सिफारिस
            </span>
          </div>

          {/* ── Header (shared component) ── */}
          <MunicipalityHeader />

          {/* ── Meta ── */}
          <div className="scr-meta-data-row">
            <div className="scr-meta-left">
              <p>
                पत्र संख्या :
                <input
                  type="text"
                  name="letter_no"
                  value={form.letter_no}
                  onChange={handleChange}
                  className="scr-meta-input scr-small-input"
                />
              </p>
              <p>
                चलानी नं. :
                <input
                  type="text"
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="scr-meta-input scr-small-input"
                />
              </p>
            </div>
            <div className="scr-meta-right">
              <p>
                मिति :
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="scr-meta-input scr-date-input"
                />
              </p>
              <p>
                ने.सं :
                <input
                  type="text"
                  name="nepali_date_label"
                  value={form.nepali_date_label}
                  onChange={handleChange}
                  className="scr-meta-input scr-nesa-input"
                />
              </p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="scr-subject-section">
            <p>
              विषय:{" "}
              <span className="scr-underline-text">छात्रवृत्ति सिफारिस ।</span>
            </p>
          </div>

          {/* ── Salutation (fixed phrase — "to whom it may concern") ── */}
          <div className="scr-salutation-section">
            <p>श्री जो जस सँग सम्बन्ध राख्दछ,</p>
          </div>

          {/* ── Body paragraph ── */}
          <div className="scr-form-body">
            <p>
              उपरोक्त विषयमा{" "}
              <span className="scr-bold-text scr-underline-text">
                {MUNICIPALITY.name}
              </span>{" "}
              वडा नं.
              <span className="scr-req-wrap">
                <span className="scr-req-star">*</span>
                <input
                  name="ward_no"
                  type="text"
                  className="scr-inline-input scr-tiny-box"
                  value={form.ward_no}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              (साविक
              <span className="scr-req-wrap">
                <span className="scr-req-star">*</span>
                <input
                  name="sabik_place"
                  type="text"
                  className="scr-inline-input scr-medium-box"
                  value={form.sabik_place}
                  onChange={handleChange}
                  required
                />
              </span>
              , वडा नं.
              <span className="scr-req-wrap">
                <span className="scr-req-star">*</span>
                <input
                  name="sabik_ward_no"
                  type="text"
                  className="scr-inline-input scr-tiny-box"
                  value={form.sabik_ward_no}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              ) अन्तर्गत
              <select
                name="residency_type"
                value={form.residency_type}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>स्थायी</option>
                <option>अस्थायी</option>
              </select>
              बसोबास गर्ने श्री{" "}
              <span className="scr-req-wrap">
                <span className="scr-req-star">*</span>
                <input
                  name="father_name"
                  type="text"
                  className="scr-inline-input scr-long-box"
                  value={form.father_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              तथा श्रीमती{" "}
              <span className="scr-req-wrap">
                <span className="scr-req-star">*</span>
                <input
                  name="mother_name"
                  type="text"
                  className="scr-inline-input scr-long-box"
                  value={form.mother_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              को आर्थिक अवस्था
              <select
                name="household_economic_status"
                value={form.household_economic_status}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>कमजोर</option>
                <option>मध्यम</option>
                <option>सम्पन्न</option>
              </select>
              भएको हुँदा निजहरूको
              <select
                name="child_relation"
                value={form.child_relation}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>छोरा</option>
                <option>छोरी</option>
              </select>
              <select
                name="child_title"
                value={form.child_title}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>श्री</option>
                <option>सुश्री</option>
              </select>
              <span className="scr-req-wrap">
                <span className="scr-req-star">*</span>
                <input
                  name="child_name"
                  type="text"
                  className="scr-inline-input scr-long-box"
                  value={form.child_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              लाई नियमानुसार छात्रवृत्ति को लागि सिफारिस गरिन्छ ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="scr-signature-section">
            <div className="scr-signature-block">
              <div className="scr-signature-line"></div>
              <div className="scr-req-wrap" style={{ width: "100%" }}>
                <span className="scr-req-star">*</span>
                <input
                  type="text"
                  name="signature_name"
                  value={form.signature_name}
                  onChange={handleChange}
                  className="scr-sig-input"
                  required
                />
              </div>
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="scr-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={footerForm}
            handleChange={handleFooterChange}
          />

          {/* ── Footer buttons ── */}
          <div className="scr-footer">
            <button
              type="submit"
              className="scr-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="scr-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="scr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>
        </form>
      </div>
    </>
  );
};

export default ScholarshipRecommendation;