import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes prefixed with "oa-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .oa-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 70px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    line-height: 1.8;
  }

  /* ── Top Bar ── */
  .oa-top-bar-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
  }
  .oa-top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  .oa-header-row { margin-bottom: 24px; }

  /* ── Date row — right aligned ── */
  .oa-date-row {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;
    font-weight: bold;
  }

  /* ── Dotted/boxed input ── */
  .oa-dotted-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    outline: none;
    padding: 4px 8px;
    font-size: 1.1rem;
    font-family: inherit;
  }
  .oa-dotted-input:focus { border-color: #2563eb; }

  /* ── Required star wrapper ── */
  .oa-req-wrap { position: relative; display: inline-block; vertical-align: middle; }
  .oa-req-wrap input { padding-left: 16px !important; }
  .oa-req-star {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 13px;
    line-height: 1;
    z-index: 1;
  }

  /* ── Recipient section ── */
  .oa-recipient-section { margin-bottom: 20px; line-height: 2.4; }
  .oa-recipient-section .oa-req-wrap { margin: 0 4px; }

  /* ── Subject row — centered ── */
  .oa-subject-row {
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  /* ── Salutation ── */
  .oa-salutation { margin-bottom: 10px; }

  /* ── Inline meta fields (address paragraph) ── */
  .oa-inline-meta-fields {
    text-align: justify;
    margin-bottom: 25px;
    line-height: 2.6;
  }
  .oa-inline-input {
    width: 120px;
    display: inline-block;
    margin: 0 5px;
  }
  .oa-tiny-input {
    width: 55px;
    text-align: center;
  }
  .oa-inline-select {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    padding: 4px 6px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    vertical-align: middle;
  }
  .oa-inline-meta-fields .oa-req-wrap { margin: 0 2px; }

  /* ── Rich editor mock ── */
  .oa-editor-area { margin-bottom: 30px; }
  .oa-rich-editor-mock {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
  }
  .oa-editor-toolbar {
    padding: 8px 12px;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    color: #555;
    background: #f5f5f5;
  }
  .oa-editor-textarea {
    width: 100%;
    min-height: 350px;
    border: none;
    padding: 15px;
    outline: none;
    font-size: 1.1rem;
    font-family: inherit;
    resize: vertical;
    background: #fff;
    box-sizing: border-box;
  }

  /* ── Applicant details override (scoped) ── */
  .oa-container .applicant-details-box {
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 20px;
    margin-top: 20px;
    border-radius: 4px;
  }
  .oa-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px;
  }
  .oa-container .detail-input {
    max-width: 450px;
    width: 100%;
    border: 1px solid #ccc;
    background: #fff;
    padding: 8px;
  }

  /* ── Footer ── */
  .oa-form-footer { margin-top: 30px; text-align: center; }
  .oa-save-print-btn {
    color: white;
    padding: 10px 25px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }
  .oa-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .oa-copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 40px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: "",
  subject: "",
  recipient_name: "",
  recipient_post: "",       // wired (was uncontrolled)
  recipient_office: "",     // wired (was uncontrolled)
  rel_subject: "",
  district: "",
  municipality: "गाउँपालिका",
  ward_no: "",
  savik_address: "",
  savik_vdc: "",
  savik_ward: "",
  body_text: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_cit_issued_date: "",
  applicant_nid_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const OpenApplication = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.recipient_name?.trim()) {
      alert("प्राप्तकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.subject?.trim()) {
      alert("विषय आवश्यक छ");
      return;
    }
    if (!form.district?.trim()) {
      alert("जिल्ला आवश्यक छ");
      return;
    }
    if (!form.ward_no?.toString().trim()) {
      alert("वडा नं. आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/open-application", {
        ...form,
        date: form.date || null,
      });
      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफल! ID: " + (res.data?.id ?? ""));
        }
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      alert("त्रुटि: " + (err.response?.data?.message || "पठाउन सकिएन"));
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated window, values interpolated as spans ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>खुल्ला निवेदन</title>
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
          .date-row { text-align: right; margin: 16px 0; }
          .recipient { margin-bottom: 16px; font-size: 11pt; font-weight: 600; line-height: 1.9; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .salutation { margin-bottom: 10px; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 20px; }
          .letter-body { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 24px; white-space: pre-wrap; }
          /* value spans size to content — no fixed min-width so small values
             don't leave big gaps and long values don't get clipped/merged */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="${MUNICIPALITY.logoSrc || "/nepallogo.svg"}" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine || ""}</div>
          <div class="addr">${MUNICIPALITY.provinceLine || ""}</div>
        </div>

        <div class="date-row">मिति : <span class="value">${form.date || ""}</span></div>

        <div class="recipient">
          श्रीमान् <span class="value">${form.recipient_name || ""}</span> ज्यू,<br/>
          ${form.recipient_post ? `<span class="value">${form.recipient_post}</span><br/>` : ""}
          ${form.recipient_office ? `<span class="value">${form.recipient_office}</span>` : ""}
        </div>

        <div class="subject">विषय:- ${form.subject || ""} ।</div>

        <div class="salutation">महोदय,</div>

        <div class="body-text">
          उपरोक्त सम्बन्धमा <span class="value">${form.rel_subject || ""}</span>
          जिल्ला <span class="value">${form.district || ""}</span>
          <span class="value">${form.municipality || ""}</span>
          वडा नं. <span class="value">${form.ward_no || ""}</span>
          साविक <span class="value">${form.savik_address || ""}</span>
          गाविस <span class="value">${form.savik_vdc || ""}</span>
          वडा नं. <span class="value">${form.savik_ward || ""}</span>
          मा बस्ने ।
        </div>

        <div class="letter-body">${form.body_text || ""}</div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${form.applicant_name || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${form.applicant_address || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${form.applicant_citizenship_no || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${form.applicant_phone || ""}</span>
          </div>
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

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="oa-container">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <div className="oa-top-bar-title">
        खुल्ला निवेदन
        <span className="oa-top-right-bread">खुला ढाँचा &gt; खुल्ला निवेदन</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Municipality Header ── */}
        <div className="oa-header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* ── Date — right side ── */}
        <div className="oa-date-row">
          मिति :
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="date"
              type="text"
              className="oa-dotted-input"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Recipient ── */}
        <div className="oa-recipient-section">
          श्रीमान्
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="recipient_name"
              type="text"
              className="oa-dotted-input"
              value={form.recipient_name}
              onChange={handleChange}
              required
            />
          </div>{" "}
          ज्यू,
          <br />
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="recipient_post"
              type="text"
              className="oa-dotted-input"
              style={{ width: "200px" }}
              placeholder="पद"
              value={form.recipient_post}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="recipient_office"
              type="text"
              className="oa-dotted-input"
              style={{ width: "200px" }}
              placeholder="कार्यालय"
              value={form.recipient_office}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Subject — centered ── */}
        <div className="oa-subject-row">
          विषय:-
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="subject"
              type="text"
              className="oa-dotted-input"
              style={{ width: "300px" }}
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>{" "}
          ।
        </div>

        {/* ── Salutation ── */}
        <div className="oa-salutation">महोदय,</div>

        {/* ── Inline address meta ── */}
        <div className="oa-inline-meta-fields">
          उपरोक्त सम्बन्धमा
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="rel_subject"
              type="text"
              className="oa-dotted-input oa-inline-input"
              value={form.rel_subject}
              onChange={handleChange}
              required
            />
          </div>
          जिल्ला
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="district"
              type="text"
              className="oa-dotted-input oa-inline-input"
              value={form.district}
              onChange={handleChange}
              required
            />
          </div>
          <select
            name="municipality"
            className="oa-inline-select"
            value={form.municipality}
            onChange={handleChange}
          >
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>
          वडा नं.
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="ward_no"
              type="text"
              className="oa-dotted-input oa-tiny-input"
              value={form.ward_no}
              onChange={handleChange}
              required
            />
          </div>
          साविक
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="savik_address"
              type="text"
              className="oa-dotted-input oa-inline-input"
              value={form.savik_address}
              onChange={handleChange}
              required
            />
          </div>
          गाविस
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="savik_vdc"
              type="text"
              className="oa-dotted-input oa-inline-input"
              value={form.savik_vdc}
              onChange={handleChange}
              required
            />
          </div>
          वडा नं.
          <div className="oa-req-wrap">
            <span className="oa-req-star">*</span>
            <input
              name="savik_ward"
              type="text"
              className="oa-dotted-input oa-tiny-input"
              value={form.savik_ward}
              onChange={handleChange}
              required
            />
          </div>{" "}
          मा बस्ने ।
        </div>

        {/* ── Body / Editor ── */}
        <div className="oa-editor-area">
          <div className="oa-rich-editor-mock">
            <div className="oa-editor-toolbar">
              <span>पत्रको विवरण यहाँ लेख्नुहोस्:</span>
            </div>
            <textarea
              name="body_text"
              className="oa-editor-textarea"
              value={form.body_text}
              onChange={handleChange}
              placeholder="यहाँ पत्रको व्यहोरा लेख्नुहोस्..."
            />
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons ── */}
        <div className="oa-form-footer">
          <button
            type="submit"
            className="oa-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="oa-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <div className="oa-copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default OpenApplication;