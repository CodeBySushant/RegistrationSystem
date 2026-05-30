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
  letter_no:               "२०८२/८३",
  chalani_no:              "",
  date:                    "",
  nepali_date_label:       "1146 थिंलाथ्व, 2 शनिवार",
  municipality:            MUNICIPALITY.name       || "",
  district:                MUNICIPALITY.city       || "",
  ward_no:                 MUNICIPALITY.wardNumber || "",
  school_location:         "",
  applicant_name:          "",   // school name (body)
  class_requested:         "",   // first "कक्षा ___"
  class_operate:           "",   // second "कक्षा ___"
  rule_title:              MUNICIPALITY.name || "",
  rule_schedule:           "",
  rule_section:            "",
  infrastructure_summary:  "",
  signature_name:          "",
  designation:             "",
  // footer applicant details
  applicant_name_final:    "",
  applicant_address:       "",
  applicant_citizenship:   "",
  applicant_phone:         "",
  notes:                   "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ncr-)
───────────────────────────────────────────── */
const styles = `
.ncr-container {
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

.ncr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ncr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ncr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.ncr-meta-left p,
.ncr-meta-right p {
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ncr-meta-right { text-align: right; }
.ncr-meta-right p { justify-content: flex-end; }

.ncr-bold-text      { font-weight: bold; }
.ncr-underline-text { text-decoration: underline; }

.ncr-meta-input {
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  padding: 4px 8px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
}
.ncr-small-input  { width: 130px; }
.ncr-date-input   { width: 150px; }
.ncr-nesa-input   { width: 220px; }

.ncr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.ncr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.ncr-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }

.ncr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.ncr-inline-input {
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
.ncr-inline-input:focus { border-color: #3b7dd8; }
.ncr-small-box  { width: 100px; }
.ncr-medium-box { width: 180px; }
.ncr-long-box   { width: 250px; }

/* ── Red required-star wrapper ── */
.ncr-req-wrap { position: relative; display: inline-block; }
.ncr-req-star {
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
.ncr-req-wrap input { padding-left: 18px; }

.ncr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.ncr-signature-block { width: 220px; text-align: center; }
.ncr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.ncr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.ncr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.ncr-footer {
  text-align: center;
  margin-top: 40px;
}
.ncr-save-print-btn {
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.ncr-save-print-btn:hover:not(:disabled) { filter: brightness(0.9); }
.ncr-save-print-btn:disabled { background-color: #6c757d !important; cursor: not-allowed; }

.ncr-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ncr-container { padding: 15px; }
  .ncr-meta-data-row { flex-direction: column; gap: 8px; }
  .ncr-meta-right { text-align: left; }
  .ncr-meta-right p { justify-content: flex-start; }
  .ncr-inline-input { width: 100px; }
  .ncr-inline-input.ncr-long-box { width: 160px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const NewClassRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const validate = () => {
    if (!form.applicant_name?.trim())       return "विद्यालयको नाम आवश्यक छ";
    if (!form.class_requested?.trim())      return "कक्षा आवश्यक छ";
    if (!form.applicant_name_final?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim())      return "फोन नम्बर आवश्यक छ";
    if (!form.signature_name?.trim())       return "हस्ताक्षरकर्ताको नाम आवश्यक छ";
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
      // Map footer applicant name to forms.json column name
      payload.applicant_name = form.applicant_name_final || form.applicant_name;
      payload.school_name = form.applicant_name; // preserve the body's school name
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/new-class-recommendation",
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
        <title>कक्षा थप सिफारिस</title>
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
          .addressee { margin-bottom: 16px; font-size: 11pt; line-height: 2; }
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

        <div class="subject">विषय: कक्षा थपको लागी अनुमति दिनुहुन</div>

        <div class="addressee">
          श्री <span class="value">${v(form.school_location)}</span>
          नगर कार्यपालिकाको कार्यालय<br/>
          <span class="value">${v(form.municipality)}</span>,
          <span class="value">${v(form.district)}</span> ।
        </div>

        <div class="body-text">
          प्रस्तुत विषयमा <span class="value">${MUNICIPALITY.name}</span>
          <span class="value">${v(form.ward_no)}</span>,
          वडा नं <span class="value">${v(form.ward_no)}</span>
          मा सञ्चालनमा रहेको श्री
          <span class="value">${v(form.applicant_name)}</span>
          ले कक्षा <span class="value">${v(form.class_requested)}</span>
          को कक्षा संचालन गर्न अनुमतिको लागि सिफारिस दिनुहुन भनि यस
          कार्यालयमा दिएको निवेदन अनुसार
          <span class="value">${v(form.rule_title)}</span>
          को शिक्षा नियमावली २०७४
          <span class="value">${v(form.rule_schedule)}</span>
          को अनुसूची २
          <span class="value">${v(form.infrastructure_summary)}</span>
          बमोजिम विद्यालय खोल्न चाहिने पूर्वाधार हरुको एकिन गरि नियम ५(३)
          अनुसार कक्षा <span class="value">${v(form.class_operate)}</span>
          संचालनको अनुमति दिनुहुन सो नियमावली को दफा ३
          <span class="value">${v(form.rule_section)}</span>
          बमोजिम सिफारिस साथ अनुरोध छ ।
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
            <span class="field-val">${v(form.applicant_name_final)}</span>
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

  // Applicant details footer fields mapped for ApplicantDetailsNp
  const footerForm = {
    applicantName:        form.applicant_name_final,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name_final",
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

      <div className="ncr-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >
          {/* ── Top bar ── */}
          <div className="ncr-top-bar-title">
            कक्षा थप सिफारिस
            <span className="ncr-top-right-bread">
              शिक्षा &gt; कक्षा थप सिफारिस
            </span>
          </div>

          {/* ── Header (shared component) ── */}
          <MunicipalityHeader />

          {/* ── Meta ── */}
          <div className="ncr-meta-data-row">
            <div className="ncr-meta-left">
              <p>
                पत्र संख्या :
                <input
                  type="text"
                  name="letter_no"
                  value={form.letter_no}
                  onChange={handleChange}
                  className="ncr-meta-input ncr-small-input"
                />
              </p>
              <p>
                चलानी नं. :
                <input
                  type="text"
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="ncr-meta-input ncr-small-input"
                />
              </p>
            </div>
            <div className="ncr-meta-right">
              <p>
                मिति :
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="ncr-meta-input ncr-date-input"
                />
              </p>
              <p>
                ने.सं :
                <input
                  type="text"
                  name="nepali_date_label"
                  value={form.nepali_date_label}
                  onChange={handleChange}
                  className="ncr-meta-input ncr-nesa-input"
                />
              </p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="ncr-subject-section">
            <p>
              विषय:{" "}
              <span className="ncr-underline-text">
                कक्षा थपको लागी अनुमति दिनुहुन
              </span>
            </p>
          </div>

          {/* ── Addressee ── */}
          <div className="ncr-addressee-section">
            <div className="ncr-addressee-row">
              <span>श्री</span>
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="school_location"
                  value={form.school_location}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>
              <span>नगर कार्यपालिकाको कार्यालय</span>
            </div>
            <div className="ncr-addressee-row">
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="municipality"
                  value={form.municipality}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>
              <span>,</span>
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>
            </div>
          </div>

          {/* ── Body paragraph ── */}
          <div className="ncr-form-body">
            <p>
              प्रस्तुत विषयमा {MUNICIPALITY.name}{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="ward_no"
                  value={form.ward_no}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>
              , वडा नं {form.ward_no} मा सञ्चालनमा रहेको श्री{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="applicant_name"
                  value={form.applicant_name}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-long-box"
                  required
                />
              </span>{" "}
              ले कक्षा{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="class_requested"
                  value={form.class_requested}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>
              को कक्षा संचालन गर्न अनुमतिको लागि सिफारिस दिनुहुन भनि यस
              कार्यालयमा दिएको निवेदन अनुसार{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="rule_title"
                  value={form.rule_title}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>{" "}
              को शिक्षा नियमावली २०७४{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="rule_schedule"
                  value={form.rule_schedule}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>{" "}
              को अनुसूची २{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="infrastructure_summary"
                  value={form.infrastructure_summary}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>{" "}
              बमोजिम विद्यालय खोल्न चाहिने पूर्वाधार हरुको एकिन गरि नियम ५(३)
              अनुसार कक्षा{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="class_operate"
                  value={form.class_operate}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-small-box"
                  required
                />
              </span>{" "}
              संचालनको अनुमति दिनुहुन सो नियमावली को दफा ३{" "}
              <span className="ncr-req-wrap">
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="rule_section"
                  value={form.rule_section}
                  onChange={handleChange}
                  className="ncr-inline-input ncr-medium-box"
                  required
                />
              </span>{" "}
              बमोजिम सिफारिस साथ अनुरोध छ ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="ncr-signature-section">
            <div className="ncr-signature-block">
              <div className="ncr-signature-line"></div>
              <div className="ncr-req-wrap" style={{ width: "100%" }}>
                <span className="ncr-req-star">*</span>
                <input
                  type="text"
                  name="signature_name"
                  value={form.signature_name}
                  onChange={handleChange}
                  className="ncr-sig-input"
                  required
                />
              </div>
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="ncr-designation-select"
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
          <div className="ncr-footer">
            <button
              type="submit"
              className="ncr-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="ncr-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ncr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>
        </form>
      </div>
    </>
  );
};

export default NewClassRecommendation;