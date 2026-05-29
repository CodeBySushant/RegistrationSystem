import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes prefixed with "sf-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page wrapper ── */
  .sf-page-wrapper {
    background-color: #f4f4f4;
    padding: 40px 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  /* ── Paper container ── */
  .sf-paper-container {
    width: 900px;
    min-height: 1100px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-color: white;
    padding: 60px 80px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    box-sizing: border-box;
    position: relative;
    font-family: 'Kalimati', 'Kokila', serif;
  }

  .sf-header-row { margin-bottom: 24px; }

  /* ── Meta row ── */
  .sf-meta-data-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1.1rem;
  }
  .sf-meta-left, .sf-meta-right { display: flex; flex-direction: column; gap: 8px; }
  .sf-meta-right { align-items: flex-end; }
  .sf-meta-line { display: flex; align-items: center; gap: 4px; }

  .sf-dotted-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    outline: none;
    font-size: 1rem;
    padding: 4px 6px;
    font-family: inherit;
  }
  .sf-dotted-input:focus { border-color: #2563eb; }
  .sf-red { color: red; }

  /* ── Required-star wrapper ── */
  .sf-req-wrap { position: relative; display: inline-block; vertical-align: middle; }
  .sf-req-wrap input { padding-left: 16px !important; }
  .sf-req-star {
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

  /* ── Suchana title box ── */
  .sf-suchana-title-box {
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    margin: 40px auto;
    width: 65%;
    padding: 10px;
  }
  .sf-title-input-box {
    width: 100%;
    border: none;
    text-align: center;
    font-size: 2.2rem;
    font-weight: bold;
    background: transparent;
    font-family: inherit;
    outline: none;
  }

  /* ── Subject row — centered ── */
  .sf-subject-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .sf-subject-input-main {
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    padding: 6px 10px;
    font-weight: bold;
    font-size: 1.1rem;
    font-family: inherit;
    outline: none;
    width: 420px;
    max-width: 100%;
    text-align: center;
  }
  .sf-subject-input-main:focus { border-color: #2563eb; }

  /* ── Additional info ── */
  .sf-additional-block { margin-bottom: 24px; }
  .sf-additional-block label { display: block; font-weight: bold; margin-bottom: 6px; font-size: 1rem; }
  .sf-info-box {
    width: 100%;
    box-sizing: border-box;
    min-height: 70px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    padding: 8px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
  }
  .sf-info-box:focus { outline: none; border-color: #2563eb; }

  /* ── Editor ── */
  .sf-rich-editor-mock {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 20px;
  }
  .sf-editor-toolbar {
    background: #f8f9fa;
    padding: 8px 15px;
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
    color: #555;
  }
  .sf-editor-textarea {
    width: 100%;
    box-sizing: border-box;
    min-height: 450px;
    border: none;
    padding: 20px;
    line-height: 1.8;
    font-size: 1.1rem;
    font-family: inherit;
    resize: vertical;
    outline: none;
    background: #fff;
  }
  .sf-word-count {
    padding: 4px 15px;
    font-size: 0.8rem;
    color: #999;
    border-top: 1px solid #eee;
    text-align: right;
  }

  /* ── Signature ── */
  .sf-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }
  .sf-signature-block { width: 250px; text-align: center; }
  .sf-sig-name-input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    padding: 5px 6px 5px 16px;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
  }
  .sf-sig-name-input:focus { border-color: #2563eb; }
  .sf-designation-select {
    width: 100%;
    margin-top: 10px;
    padding: 6px;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
  }

  /* ── Footer ── */
  .sf-footer-btn-container { text-align: center; margin-top: 40px; }
  .sf-save-print-btn {
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
  }
  .sf-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .sf-bottom-copyright {
    text-align: right;
    font-size: 0.8rem;
    margin-top: 40px;
    color: #666;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  patra_sankhya:          "२०८२/८३",
  suchana_no:             "",
  date_nepali:            "२०८२-१२-१८",
  nepali_sambat:          "ने.सं. ११४६ चौलागा, २४ शनिबार",
  header_title:           "सूचना !!! सूचना !!! सूचना !!!",
  subject:                "",
  additional_info:        "",
  body_text:              "",
  signatory_name:         "",
  signatory_designation:  "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const SuchanaForm = () => {
  const [form, setForm]     = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Generic field updater ── */
  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.suchana_no.trim()) {
      alert("सूचना नं. आवश्यक छ!");
      return;
    }
    if (!form.subject.trim()) {
      alert("विषय आवश्यक छ!");
      return;
    }
    if (!form.signatory_name.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ!");
      return;
    }
    if (!form.signatory_designation.trim()) {
      alert("पद छनौट गर्नुहोस्!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/suchana", form);
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
        : `${user?.ward || MUNICIPALITY.ward || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>सूचना</title>
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
          .title-box { text-align: center; font-size: 18pt; font-weight: 700; margin: 24px 0; border: 1px solid #000; padding: 8px; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 18px 0; text-decoration: underline; }
          .additional { font-size: 10pt; margin-bottom: 16px; white-space: pre-wrap; }
          .body-text { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 24px; white-space: pre-wrap; }
          /* value spans size to content — no fixed min-width so small values
             don't leave big gaps and long values don't get clipped/merged */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
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
            <div>सूचना नं. : <span class="value">${form.suchana_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.date_nepali || ""}</span></div>
            <div class="nsm">${form.nepali_sambat || ""}</div>
          </div>
        </div>

        <div class="title-box">${form.header_title || ""}</div>

        <div class="subject">विषय: ${form.subject || ""}</div>

        ${form.additional_info ? `<div class="additional">${form.additional_info}</div>` : ""}

        <div class="body-text">${form.body_text || ""}</div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signatory_name || ""}</div>
            <div>${form.signatory_designation || ""}</div>
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
    <div className="sf-page-wrapper">
      <style>{STYLES}</style>

      <form
        className="sf-paper-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >

        {/* ── Municipality Header ── */}
        <div className="sf-header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* ── Meta row ── */}
        <div className="sf-meta-data-row">
          <div className="sf-meta-left">
            <div className="sf-meta-line">
              पत्र संख्या :&nbsp;
              <input
                type="text"
                className="sf-dotted-input"
                value={form.patra_sankhya}
                onChange={update("patra_sankhya")}
              />
            </div>
            <div className="sf-meta-line">
              सूचना नं. :&nbsp;
              <div className="sf-req-wrap">
                <span className="sf-req-star">*</span>
                <input
                  type="text"
                  className="sf-dotted-input"
                  value={form.suchana_no}
                  onChange={update("suchana_no")}
                  required
                />
              </div>
            </div>
          </div>
          <div className="sf-meta-right">
            <div className="sf-meta-line">
              मिति :&nbsp;
              <input
                type="text"
                className="sf-dotted-input"
                value={form.date_nepali}
                onChange={update("date_nepali")}
              />
            </div>
            <div className="sf-meta-line">
              ने.सं. :&nbsp;
              <input
                type="text"
                className="sf-dotted-input"
                style={{ width: 240 }}
                value={form.nepali_sambat}
                onChange={update("nepali_sambat")}
                placeholder="जस्तै: ने.सं. ११४६ चौलागा, २४ शनिबार"
              />
            </div>
          </div>
        </div>

        {/* ── Suchana title box ── */}
        <div className="sf-suchana-title-box">
          <input
            className="sf-title-input-box"
            value={form.header_title}
            onChange={update("header_title")}
          />
        </div>

        {/* ── Subject — hardcoded label + input, centered ── */}
        <div className="sf-subject-row">
          विषय:
          <div className="sf-req-wrap">
            <span className="sf-req-star">*</span>
            <input
              className="sf-subject-input-main"
              placeholder="विषय लेख्नुहोस्"
              value={form.subject}
              onChange={update("subject")}
              required
            />
          </div>
        </div>

        {/* ── Additional info — full width, properly placed ── */}
        <div className="sf-additional-block">
          <label>थप जानकारी (वैकल्पिक):</label>
          <textarea
            placeholder="थप जानकारी यहाँ लेख्नुहोस्..."
            className="sf-info-box"
            value={form.additional_info}
            onChange={update("additional_info")}
            rows={3}
          />
        </div>

        {/* ── Body / Editor ── */}
        <div className="sf-rich-editor-mock">
          <div className="sf-editor-toolbar">
            <span>पत्रको विवरण यहाँ लेख्नुहोस्:</span>
          </div>
          <textarea
            className="sf-editor-textarea"
            value={form.body_text}
            onChange={update("body_text")}
            placeholder="सूचनाको व्यहोरा यहाँ लेख्नुहोस्..."
          />
          <div className="sf-word-count">
            {(form.body_text || "").trim() ? (form.body_text || "").trim().split(/\s+/).length : 0} words
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="sf-signature-section">
          <div className="sf-signature-block">
            <div className="sf-req-wrap" style={{ display: "block" }}>
              <span className="sf-req-star">*</span>
              <input
                type="text"
                className="sf-sig-name-input"
                value={form.signatory_name}
                onChange={update("signatory_name")}
                placeholder="नाम"
                required
              />
            </div>
            <select
              className="sf-designation-select"
              value={form.signatory_designation}
              onChange={update("signatory_designation")}
              required
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
          </div>
        </div>

        {/* ── Footer buttons ── */}
        <div className="sf-footer-btn-container">
          <button
            type="submit"
            className="sf-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="sf-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="sf-bottom-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
};

export default SuchanaForm;