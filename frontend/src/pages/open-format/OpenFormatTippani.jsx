import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes prefixed with "oft-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Outer wrapper ── */
  .oft-outer-wrapper {
    background-color: #f0f0f0;
    padding: 20px 0;
  }

  /* ── Container ── */
  .oft-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 50px 70px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    position: relative;
  }

  /* ── Top Bar ── */
  .oft-top-bar-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 1rem;
    color: #555;
  }
  .oft-top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  .oft-header-row { margin-bottom: 16px; }
  .oft-certificate-title {
    text-align: center;
    font-size: 2.1rem;
    text-decoration: underline;
    margin: 10px 0 24px;
    color: #e74c3c;
  }

  /* ── Date row (right-aligned) ── */
  .oft-date-section-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;
    font-size: 1.2rem;
    margin-bottom: 30px;
    font-weight: bold;
  }

  /* ── Boxed input ── */
  .oft-dotted-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    outline: none;
    padding: 4px 8px;
    font-size: 1.1rem;
    font-family: inherit;
  }
  .oft-dotted-input:focus { border-color: #2563eb; }
  .oft-large-input { width: 300px; }

  /* ── Addressee ── */
  .oft-addressee-row {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* ── Subject — centered ── */
  .oft-subject-block {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  /* ── Required-star wrapper ── */
  .oft-inline-input-wrapper {
    position: relative;
    display: inline-block;
  }
  .oft-input-required-star {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-size: 1.1rem;
    pointer-events: none;
    z-index: 1;
  }
  .oft-inline-input-wrapper input { padding-left: 20px; }
  .oft-full-width { width: 100%; }

  /* ── Editor ── */
  .oft-editor-area { margin-bottom: 25px; }
  .oft-rich-editor-mock {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
  }
  .oft-editor-toolbar {
    background: #f8f9fa;
    padding: 8px 15px;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    color: #555;
  }
  .oft-editor-textarea {
    width: 100%;
    box-sizing: border-box;
    min-height: 450px;
    border: none;
    padding: 20px;
    font-size: 1.15rem;
    font-family: inherit;
    line-height: 1.8;
    resize: vertical;
    outline: none;
    background: #fff;
  }

  /* ── Action + Signature grid ── */
  .oft-checkbox-signature-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 40px;
    gap: 30px;
  }
  .oft-action-panel {
    border: 1px solid #ddd;
    border-radius: 6px;
    background: rgba(255,255,255,0.6);
    padding: 16px 18px;
    min-width: 280px;
  }
  .oft-action-title {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 12px;
    border-bottom: 1px solid #eee;
    padding-bottom: 6px;
    color: #333;
  }
  .oft-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .oft-checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 1rem;
    cursor: pointer;
  }
  .oft-checkbox-item input { margin-top: 4px; width: 18px; height: 18px; cursor: pointer; }
  .oft-checkbox-text { display: flex; flex-direction: column; }
  .oft-checkbox-text .oft-hint { font-size: 0.8rem; color: #888; font-weight: normal; }

  .oft-approver-block {
    width: 280px;
    text-align: right;
  }
  .oft-certifier-label {
    display: block;
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
  .oft-approved-flag {
    display: inline-block;
    margin-top: 12px;
    padding: 4px 14px;
    border: 2px solid #1a6b3a;
    color: #1a6b3a;
    font-weight: bold;
    border-radius: 4px;
    transform: rotate(-4deg);
  }
  .oft-designation-select {
    width: 100%;
    margin-top: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Applicant details overrides ── */
  .oft-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 30px;
    border-radius: 4px;
  }
  .oft-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem; margin: 0 0 15px 0;
    border-bottom: 1px solid #eee; padding-bottom: 8px;
  }
  .oft-container .applicant-details-box .details-grid {
    display: flex !important; flex-direction: column !important; gap: 18px !important;
  }
  .oft-container .applicant-details-box .detail-input {
    max-width: 400px; width: 100%;
    border: 1px solid #ddd; padding: 8px;
    border-radius: 4px; box-sizing: border-box;
    background-color: #fff;
  }

  /* ── Footer ── */
  .oft-form-footer { text-align: center; margin-top: 50px; }
  .oft-save-print-btn {
    color: white;
    padding: 14px 40px;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .oft-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .oft-copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    margin-top: 50px;
    color: #666;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: "",
  addressee: "",
  subject: "",
  body_text: "",
  approve: false,          // real status flag — prints as स्वीकृत
  signature_name: "",
  signature_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const OpenFormatTippani = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  // "add another" — when checked, save keeps the form open instead of resetting
  const [addAnother, setAddAnother] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.addressee?.trim()) {
      alert("श्रीमान् (प्राप्तकर्ता) आवश्यक छ");
      return;
    }
    if (!form.subject?.trim()) {
      alert("विषय आवश्यक छ");
      return;
    }
    if (!form.signature_name?.trim()) {
      alert("प्रमाणित गर्नेको नाम आवश्यक छ");
      return;
    }
    if (!form.signature_designation?.trim()) {
      alert("पद छनौट गर्नुहोस्");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/open-format-tippani", {
        ...form,
        date: form.date || null,
      });
      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफल! ID: " + (res.data?.id ?? ""));
        }
        // "अर्को थप्नुहोस्" keeps the form so the next tippani can be added
        if (!addAnother) {
          setForm(initialState);
        }
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
        <title>टिप्पणी र आदेश</title>
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
          .header { text-align: center; margin-bottom: 12px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .cert-title { text-align: center; font-size: 16pt; font-weight: 700; text-decoration: underline; color: #c0392b; margin: 10px 0 18px; }
          .date-row { text-align: right; font-weight: bold; margin-bottom: 16px; }
          .addressee { font-weight: bold; font-size: 11pt; margin-bottom: 14px; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 16px 0; text-decoration: underline; }
          .body-text { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 24px; white-space: pre-wrap; }
          /* value spans size to content — no fixed min-width so small values
             don't leave big gaps and long values don't get clipped/merged */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .sig-grid { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
          .approved-flag { border: 2px solid #1a6b3a; color: #1a6b3a; font-weight: bold; padding: 4px 16px; border-radius: 4px; transform: rotate(-4deg); font-size: 12pt; }
          .sig-block { width: 240px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 26px; border-radius: 3px; }
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

        <div class="cert-title">टिप्पणी र आदेश</div>

        <div class="date-row">मिति : <span class="value">${form.date || ""}</span></div>

        <div class="addressee">श्रीमान् <span class="value">${form.addressee || ""}</span> ,</div>

        <div class="subject">विषय: ${form.subject || ""}</div>

        <div class="body-text">${form.body_text || ""}</div>

        <div class="sig-grid">
          <div>
            ${form.approve ? `<span class="approved-flag">स्वीकृत</span>` : ""}
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <div style="font-weight:bold">प्रमाणीत गर्ने</div>
            <div>${form.signature_name || ""}</div>
            <div>${form.signature_designation || ""}</div>
          </div>
        </div>

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
    <div className="oft-outer-wrapper">
      <style>{STYLES}</style>

      <form
        className="oft-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >

        {/* ── Top Bar ── */}
        <div className="oft-top-bar-title">
          टिप्पणी
          <span className="oft-top-right-bread">खुला ढाँचा &gt; टिप्पणी</span>
        </div>

        {/* ── Municipality Header ── */}
        <div className="oft-header-row">
          <MunicipalityHeader showLogo />
        </div>
        <h3 className="oft-certificate-title">टिप्पणी र आदेश</h3>

        {/* ── Date (right-aligned) ── */}
        <div className="oft-date-section-row">
          मिति :
          <div className="oft-inline-input-wrapper">
            <span className="oft-input-required-star">*</span>
            <input
              name="date"
              type="text"
              className="oft-dotted-input"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="oft-addressee-row">
          <span>श्रीमान्</span>
          <div className="oft-inline-input-wrapper">
            <span className="oft-input-required-star">*</span>
            <input
              name="addressee"
              type="text"
              className="oft-dotted-input oft-large-input"
              value={form.addressee}
              onChange={handleChange}
              required
            />
          </div>
          <span>,</span>
        </div>

        {/* ── Subject — centered ── */}
        <div className="oft-subject-block">
          <label>विषय:</label>
          <div className="oft-inline-input-wrapper">
            <span className="oft-input-required-star">*</span>
            <input
              name="subject"
              type="text"
              className="oft-dotted-input oft-large-input"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ── Body / Editor ── */}
        <div className="oft-editor-area">
          <div className="oft-rich-editor-mock">
            <div className="oft-editor-toolbar">
              <span>पत्रको विवरण यहाँ लेख्नुहोस्:</span>
            </div>
            <textarea
              name="body_text"
              className="oft-editor-textarea"
              value={form.body_text}
              onChange={handleChange}
              placeholder="यहाँ टिप्पणी लेख्नुहोस्..."
            />
          </div>
        </div>

        {/* ── Action panel + Signature ── */}
        <div className="oft-checkbox-signature-grid">
          <div className="oft-action-panel">
            <div className="oft-action-title">कार्य विकल्प</div>
            <div className="oft-checkbox-group">
              <label className="oft-checkbox-item">
                <input
                  type="checkbox"
                  checked={addAnother}
                  onChange={(e) => setAddAnother(e.target.checked)}
                />
                <span className="oft-checkbox-text">
                  अर्को थप्नुहोस्
                  <span className="oft-hint">सेभ पछि फारम खाली नगरी अर्को टिप्पणी थप्न</span>
                </span>
              </label>
              <label className="oft-checkbox-item">
                <input
                  name="approve"
                  type="checkbox"
                  checked={form.approve}
                  onChange={handleChange}
                />
                <span className="oft-checkbox-text">
                  स्वीकृत गर्नुहोस्
                  <span className="oft-hint">प्रिन्टमा "स्वीकृत" छाप देखिनेछ</span>
                </span>
              </label>
            </div>
          </div>

          <div className="oft-approver-block">
            <label className="oft-certifier-label">प्रमाणीत गर्ने</label>
            <div className="oft-inline-input-wrapper oft-full-width">
              <span className="oft-input-required-star">*</span>
              <input
                name="signature_name"
                type="text"
                className="oft-dotted-input oft-full-width"
                value={form.signature_name}
                onChange={handleChange}
                required
              />
            </div>
            <select
              name="signature_designation"
              className="oft-designation-select"
              value={form.signature_designation}
              onChange={handleChange}
              required
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
            {form.approve && <span className="oft-approved-flag">स्वीकृत</span>}
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons ── */}
        <div className="oft-form-footer">
          <button
            type="submit"
            className="oft-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="oft-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="oft-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
};

export default OpenFormatTippani;