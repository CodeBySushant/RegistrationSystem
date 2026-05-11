import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from SuchanaForm.css)
   All classes prefixed with "sf-" to avoid global collisions.
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

  /* ── Header ── */
  .sf-form-header-section {
    text-align: center;
    position: relative;
    margin-bottom: 30px;
  }
  .sf-header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 95px;
  }
  .sf-header-text { color: #e74c3c; }
  .sf-header-text h1 { font-size: 1.8rem; margin: 0; font-weight: bold; }
  .sf-header-text h2 { font-size: 2.6rem; margin: 5px 0; font-weight: bold; }
  .sf-header-text p  { font-size: 1.1rem; font-weight: bold; margin: 2px 0; }

  /* ── Meta row ── */
  .sf-meta-data-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1.1rem;
  }
  .sf-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    font-size: 1rem;
    padding: 0 5px;
    font-family: inherit;
  }
  .sf-red { color: red; }
  .sf-nepali-date-string { font-weight: bold; margin-top: 5px; font-size: 0.95rem; }

  /* ── Suchana title box ── */
  .sf-suchana-title-box {
    border: 1px solid #ccc;
    background: #fff;
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

  /* ── Info grid ── */
  .sf-info-grid-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .sf-info-box-left {
    width: 35%;
    height: 60px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 5px;
    resize: none;
    font-family: inherit;
    font-size: 1rem;
  }
  .sf-subject-box-center {
    width: 45%;
    border: 1px solid #ccc;
    background: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  .sf-subject-input-main {
    width: 100%;
    border: none;
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    font-family: inherit;
    outline: none;
    background: transparent;
  }

  /* ── Editor ── */
  .sf-rich-editor-mock {
    border: 1px solid #ddd;
    background: #fff;
    margin-bottom: 20px;
  }
  .sf-editor-toolbar {
    background: #f8f9fa;
    padding: 8px 15px;
    border-bottom: 1px solid #ddd;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    color: #666;
  }
  .sf-editor-textarea {
    width: 100%;
    min-height: 450px;
    border: none;
    padding: 20px;
    line-height: 1.8;
    font-size: 1.1rem;
    font-family: inherit;
    resize: vertical;
    outline: none;
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
  .sf-required-wrapper { position: relative; }
  .sf-star { color: red; position: absolute; left: 0; top: 50%; transform: translateY(-50%); }
  .sf-required-wrapper input { padding-left: 15px; }
  .sf-designation-select {
    width: 100%;
    margin-top: 10px;
    padding: 6px;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid #ccc;
  }

  /* ── Footer ── */
  .sf-footer-btn-container { text-align: center; margin-top: 40px; }
  .sf-save-print-btn {
    background: #2c3e50;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
    transition: background 0.2s;
  }
  .sf-save-print-btn:hover:not(:disabled) { background: #1a252f; }
  .sf-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .sf-bottom-copyright {
    text-align: right;
    font-size: 0.8rem;
    margin-top: 40px;
    color: #666;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .sf-paper-container,
    .sf-paper-container * { visibility: visible; }
    .sf-paper-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .sf-footer-btn-container,
    .sf-editor-toolbar { display: none !important; }
    .sf-rich-editor-mock {
      border: none !important;
      background: transparent !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  patra_sankhya:          "२०८२/८३",
  suchana_no:             "",
  date_nepali:            "२०८२-१२-१८",
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

  /* ── Generic field updater ── */
  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /* ── Validate → Print ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.suchana_no.trim() || !form.signatory_name.trim()) {
      alert("सूचना नं. र हस्ताक्षरकर्ताको नाम आवश्यक छ!");
      return;
    }

    setLoading(true);
    try {
      window.print();
    } catch (err) {
      console.error("Print error:", err);
      alert("केही गडबड भयो!");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="sf-page-wrapper">
      <style>{STYLES}</style>

      <form className="sf-paper-container" onSubmit={handleSubmit}>

        {/* ── Municipality Header ── */}
        <header className="sf-form-header-section">
          <div className="sf-header-logo">
            <img src="/nepallogo.jpg" alt="Nepal Logo" />
          </div>
          <div className="sf-header-text">
            <h1>{MUNICIPALITY.name}</h1>
            <h2>{MUNICIPALITY.ward} नं. वडा कार्यालय</h2>
            <p>{MUNICIPALITY.officeLine}</p>
            <p>{MUNICIPALITY.provinceLine}</p>
          </div>
        </header>

        {/* ── Meta row ── */}
        <div className="sf-meta-data-row">
          <div className="sf-meta-left">
            <div>
              पत्र संख्या :&nbsp;
              <input
                type="text"
                className="sf-dotted-input"
                value={form.patra_sankhya}
                onChange={update("patra_sankhya")}
              />
            </div>
            <div>
              सूचना नं. : <span className="sf-red">*</span>&nbsp;
              <input
                type="text"
                className="sf-dotted-input"
                value={form.suchana_no}
                onChange={update("suchana_no")}
                required
              />
            </div>
          </div>
          <div className="sf-meta-right">
            <div>
              मिति :&nbsp;
              <input
                type="text"
                className="sf-dotted-input"
                value={form.date_nepali}
                onChange={update("date_nepali")}
              />
            </div>
            <p className="sf-nepali-date-string">ने.सं. ११४६ चौलागा, २४ शनिबार</p>
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

        {/* ── Info grid ── */}
        <div className="sf-info-grid-row">
          <textarea
            placeholder="थप जानकारी..."
            className="sf-info-box-left"
            value={form.additional_info}
            onChange={update("additional_info")}
          />
          <div className="sf-subject-box-center">
            <input
              placeholder="विषय थप्नुहोस्"
              className="sf-subject-input-main"
              value={form.subject}
              onChange={update("subject")}
            />
          </div>
        </div>

        {/* ── Body / Editor ── */}
        <div className="sf-rich-editor-mock">
          <div className="sf-editor-toolbar">
            <span>File Edit View Insert Format Tools Table Help</span>
            <span>⚡ Upgrade</span>
          </div>
          <textarea
            className="sf-editor-textarea"
            value={form.body_text}
            onChange={update("body_text")}
            placeholder="सूचनाको व्यहोरा यहाँ लेख्नुहोस्..."
          />
          <div className="sf-word-count">0 words</div>
        </div>

        {/* ── Signature ── */}
        <div className="sf-signature-section">
          <div className="sf-signature-block">
            <div className="sf-required-wrapper">
              <span className="sf-star">*</span>
              <input
                type="text"
                className="sf-dotted-input"
                style={{ width: "100%" }}
                value={form.signatory_name}
                onChange={update("signatory_name")}
                required
              />
            </div>
            <select
              className="sf-designation-select"
              value={form.signatory_designation}
              onChange={update("signatory_designation")}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="sf-footer-btn-container">
          <button
            type="submit"
            className="sf-save-print-btn"
            disabled={loading}
          >
            {loading ? "प्रिन्ट गर्दैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
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