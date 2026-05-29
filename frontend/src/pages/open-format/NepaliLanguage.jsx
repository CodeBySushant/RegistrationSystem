// NepaliLanguage.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes prefixed with "nl-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .nl-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 40px 60px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    position: relative;
  }

  /* ── Utility ── */
  .nl-bold { font-weight: bold; }

  /* ── Top Bar ── */
  .nl-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .nl-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  .nl-header-row { margin-bottom: 16px; }

  /* ── Meta ── */
  .nl-meta-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1rem; }
  .nl-meta-left, .nl-meta-right { display: flex; flex-direction: column; gap: 6px; }
  .nl-meta-right { align-items: flex-end; }
  .nl-meta-item { margin: 5px 0; display: flex; align-items: center; gap: 4px; }

  .nl-dotted-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    outline: none;
    padding: 4px 6px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nl-dotted-input:focus { border-color: #2563eb; }
  .nl-w-small  { width: 120px; }
  .nl-w-medium { width: 260px; }
  .nl-w-long   { width: 320px; }
  .nl-w-full   { width: 100%; }

  /* ── Required-star wrapper ── */
  .nl-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .nl-req-star {
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
  .nl-req-wrap input { padding-left: 16px; }

  /* ── Subject — centered ── */
  .nl-subject {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 20px 0;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
  }

  /* ── Addressee ── */
  .nl-addressee     { margin-bottom: 20px; font-size: 1rem; }
  .nl-addressee-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }

  /* ── Editor area ── */
  .nl-editor-area { margin: 20px 0; }
  .nl-editor-mock {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
  }
  .nl-editor-toolbar {
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    padding: 8px 12px;
    font-size: 0.9rem;
    color: #555;
  }
  .nl-editor-textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    font-family: inherit;
    font-size: 1rem;
    border: none;
    outline: none;
    resize: vertical;
    background: #fff;
    line-height: 1.8;
    min-height: 220px;
  }
  .nl-word-count {
    text-align: right;
    font-size: 0.82rem;
    color: #888;
    padding: 4px 10px;
    border-top: 1px solid #eee;
  }

  /* ── Bodartha ── */
  .nl-bodartha { margin: 20px 0; font-size: 1rem; }
  .nl-full-textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    outline: none;
    padding: 6px;
    margin-top: 4px;
  }
  .nl-full-textarea:focus { border-color: #2563eb; }

  /* ── Signature ── */
  .nl-signature-container { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .nl-signature-block     { width: 240px; text-align: center; }
  .nl-signature-line      { border-bottom: 1px solid #ccc; margin-bottom: 8px; width: 100%; height: 40px; }
  .nl-sig-name-input {
    width: 100%;
    margin-bottom: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    padding: 4px 6px;
    box-sizing: border-box;
  }
  .nl-sig-name-input:focus { border-color: #2563eb; }
  .nl-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 0.95rem;
    border-radius: 3px;
  }

  /* ── Applicant details overrides ── */
  .nl-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .nl-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .nl-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .nl-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #fff;
  }

  /* ── Footer ── */
  .nl-footer { text-align: center; margin-top: 36px; }
  .nl-save-print-btn {
    color: white;
    padding: 10px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .nl-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .nl-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 28px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  date_nepali: "२०८२-१२-१८",
  nepali_sambat: "ने.सं. ११४६ चौलागा, २४ शनिबार",
  subject: "",
  recipient_name: "",
  recipient_post: "",
  recipient_address: "",
  body_text: "",
  bodartha: "",
  signatory_name: "",
  signatory_designation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const NepaliLanguage = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.subject?.trim()) {
      alert("विषय आवश्यक छ");
      return;
    }
    if (!form.recipient_name?.trim()) {
      alert("प्राप्तकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.signatory_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.signatory_designation?.trim()) {
      alert("पद छनौट गर्नुहोस्");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/nepali-language", form);
      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id ?? ""));
        }
        setForm(initialState);
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
        <title>नेपाली पत्र</title>
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
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .meta .nsm { font-size: 9pt; color: #555; margin-top: 3px; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .addressee { margin-bottom: 16px; font-size: 11pt; font-weight: 600; line-height: 1.9; }
          .body-text { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 20px; white-space: pre-wrap; }
          .bodartha { font-size: 11pt; margin-bottom: 20px; }
          /* value spans size to content — no fixed min-width so small values
             don't leave big gaps and long values don't get clipped/merged */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
          /* blank signing line — applicant signs here after printing */
          .sign-hint { font-size: 9pt; color: #777; font-style: italic; margin: 10px 0 6px; }
          .sign-line { height: 50px; border: 1px solid #ccc; border-radius: 3px; display: flex; align-items: flex-end; padding-bottom: 4px; }
          .sign-line-label { font-size: 9pt; color: #999; width: 100%; text-align: center; border-top: 1px solid #ccc; margin: 0 8px; padding-top: 3px; }
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

        <div class="meta">
          <div>
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.date_nepali || ""}</span></div>
            <div class="nsm">${form.nepali_sambat || ""}</div>
          </div>
        </div>

        <div class="subject">विषय: ${form.subject || ""}</div>

        <div class="addressee">
          श्री <span class="value">${form.recipient_name || ""}</span><br/>
          ${form.recipient_post ? `<span class="value">${form.recipient_post}</span><br/>` : ""}
          ${form.recipient_address ? `<span class="value">${form.recipient_address}</span>` : ""}
        </div>

        <div class="body-text">${form.body_text || ""}</div>

        ${form.bodartha ? `<div class="bodartha">बोधार्थ:- <span class="value">${form.bodartha}</span></div>` : ""}

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signatory_name || ""}</div>
            <div>${form.signatory_designation || ""}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${form.applicantName || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${form.applicantAddress || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${form.applicantCitizenship || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${form.applicantPhone || ""}</span>
          </div>
          <div class="sign-hint">प्रिन्ट गरेपछि यहाँ दस्तखत गर्नुहोस्</div>
          <div class="sign-line"><span class="sign-line-label">दस्तखत</span></div>
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
    <>
      <style>{STYLES}</style>

      <div className="nl-container">

        {/* ── Top Bar ── */}
        <div className="nl-top-bar">
          नेपाली भाषामा पत्र लेखन
          <span className="nl-breadcrumb">खुला ढाँचा &gt; नेपाली प्रपत्र</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >

          {/* ── Municipality Header ── */}
          <div className="nl-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Meta — all editable now ── */}
          <div className="nl-meta-row">
            <div className="nl-meta-left">
              <div className="nl-meta-item">
                पत्र संख्या :
                <input
                  name="patra_sankhya"
                  type="text"
                  className="nl-dotted-input nl-w-small"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </div>
              <div className="nl-meta-item">
                चलानी नं. :
                <input
                  name="chalani_no"
                  type="text"
                  className="nl-dotted-input nl-w-small"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="nl-meta-right">
              <div className="nl-meta-item">
                मिति :
                <input
                  name="date_nepali"
                  type="text"
                  className="nl-dotted-input nl-w-small"
                  value={form.date_nepali}
                  onChange={handleChange}
                />
              </div>
              <div className="nl-meta-item">
                ने.सं. :
                <input
                  name="nepali_sambat"
                  type="text"
                  className="nl-dotted-input"
                  style={{ width: 240 }}
                  value={form.nepali_sambat}
                  onChange={handleChange}
                  placeholder="जस्तै: ने.सं. ११४६ चौलागा, २४ शनिबार"
                />
              </div>
            </div>
          </div>

          {/* ── Subject — centered ── */}
          <div className="nl-subject">
            विषय:
            <div className="nl-req-wrap">
              <span className="nl-req-star">*</span>
              <input
                name="subject"
                type="text"
                className="nl-dotted-input nl-w-medium"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ── Addressee ── */}
          <div className="nl-addressee">
            <div className="nl-addressee-row">
              श्री
              <div className="nl-req-wrap">
                <span className="nl-req-star">*</span>
                <input
                  name="recipient_name"
                  type="text"
                  className="nl-dotted-input nl-w-long"
                  value={form.recipient_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="nl-addressee-row">
              <div className="nl-req-wrap">
                <span className="nl-req-star">*</span>
                <input
                  name="recipient_post"
                  type="text"
                  className="nl-dotted-input nl-w-long"
                  value={form.recipient_post}
                  onChange={handleChange}
                  placeholder="पद/कार्यालय"
                  required
                />
              </div>
            </div>
            <div className="nl-addressee-row">
              <div className="nl-req-wrap">
                <span className="nl-req-star">*</span>
                <input
                  name="recipient_address"
                  type="text"
                  className="nl-dotted-input nl-w-long"
                  value={form.recipient_address}
                  onChange={handleChange}
                  placeholder="ठेगाना"
                  required
                />
              </div>
            </div>
          </div>

          {/* ── Body textarea ── */}
          <div className="nl-editor-area">
            <div className="nl-editor-mock">
              <div className="nl-editor-toolbar">
                <span>पत्रको विवरण यहाँ लेख्नुहोस्: </span>
              </div>
              <textarea
                name="body_text"
                className="nl-editor-textarea"
                value={form.body_text}
                onChange={handleChange}
                placeholder="यहाँ पत्रको मुख्य विवरण लेख्नुहोस्..."
                rows={12}
              />
              <div className="nl-word-count">
                {(form.body_text || "").length} अक्षर
              </div>
            </div>
          </div>

          {/* ── Bodartha ── */}
          <div className="nl-bodartha">
            बोधार्थ:-
            <textarea
              name="bodartha"
              className="nl-full-textarea"
              value={form.bodartha}
              onChange={handleChange}
              rows={2}
              placeholder="बोधार्थ लेख्नुहोस्..."
            />
          </div>

          {/* ── Signature ── */}
          <div className="nl-signature-container">
            <div className="nl-signature-block">
              <div className="nl-signature-line"></div>
              <div className="nl-req-wrap" style={{ display: "block", marginBottom: 6 }}>
                <span className="nl-req-star">*</span>
                <input
                  name="signatory_name"
                  type="text"
                  className="nl-sig-name-input"
                  value={form.signatory_name}
                  onChange={handleChange}
                  placeholder="नाम"
                  required
                />
              </div>
              <select
                name="signatory_designation"
                className="nl-designation-select"
                value={form.signatory_designation}
                onChange={handleChange}
                required
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Footer buttons ── */}
          <div className="nl-footer">
            <button
              type="submit"
              className="nl-save-print-btn"
              disabled={loading}
              style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="nl-save-print-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        {/* ── Copyright ── */}
        <div className="nl-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </div>
    </>
  );
};

export default NepaliLanguage;