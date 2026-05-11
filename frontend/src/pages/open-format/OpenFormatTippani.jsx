import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from OpenFormatTippani.css)
   All classes prefixed with "oft-" to avoid global collisions.
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

  /* ── Header ── */
  .oft-form-header-section {
    text-align: center;
    position: relative;
    margin-bottom: 30px;
  }
  .oft-header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 90px;
  }
  .oft-header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .oft-municipality-name {
    color: #e74c3c;
    font-size: 1.8rem;
    margin: 0;
    font-weight: bold;
  }
  .oft-ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }
  .oft-address-text,
  .oft-province-text {
    color: #e74c3c;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 2px 0;
  }
  .oft-certificate-title {
    font-size: 2.1rem;
    text-decoration: underline;
    margin-top: 15px;
    color: #e74c3c;
  }

  /* ── Date row (right-aligned) ── */
  .oft-date-section-row {
    text-align: right;
    font-size: 1.2rem;
    margin-bottom: 30px;
    font-weight: bold;
  }

  /* ── Dotted input ── */
  .oft-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 0 5px;
    font-size: 1.1rem;
    font-family: inherit;
  }
  .oft-large-input { width: 300px; }

  /* ── Addressee / Subject ── */
  .oft-addressee-row,
  .oft-subject-block {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
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
  }
  .oft-inline-input-wrapper input { padding-left: 20px; }
  .oft-full-width { width: 100%; }

  /* ── Editor ── */
  .oft-editor-area { margin-bottom: 25px; }
  .oft-rich-editor-mock {
    border: 1px solid #ccc;
    background: #fff;
  }
  .oft-editor-toolbar {
    background: #f8f9fa;
    padding: 8px 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #666;
  }
  .oft-editor-textarea {
    width: 100%;
    min-height: 450px;
    border: none;
    padding: 20px;
    font-size: 1.15rem;
    font-family: inherit;
    line-height: 1.8;
    resize: vertical;
    outline: none;
  }

  /* ── Checkbox + Signature grid ── */
  .oft-checkbox-signature-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 40px;
  }
  .oft-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .oft-checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
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
  .oft-designation-select {
    width: 100%;
    margin-top: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Footer ── */
  .oft-form-footer { text-align: center; margin-top: 50px; }
  .oft-save-print-btn {
    background: #2c3e50;
    color: white;
    padding: 14px 40px;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.3s;
  }
  .oft-save-print-btn:hover:not(:disabled) { background: #1a252f; }
  .oft-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .oft-copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    margin-top: 50px;
    color: #666;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .oft-container,
    .oft-container * { visibility: visible; }
    .oft-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      margin: 0;
      box-shadow: none;
    }
    .oft-top-bar-title,
    .oft-form-footer,
    .oft-editor-toolbar { display: none !important; }
    .oft-rich-editor-mock {
      border: none !important;
      background: transparent !important;
    }
    .oft-editor-textarea {
      background: transparent !important;
      border: none !important;
    }
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
  archive: false,
  approve: false,
  signature_name: "",
  signature_designation: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const OpenFormatTippani = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/open-format-tippani", {
        ...form,
        date: form.date || null,
      });
      if (res.status === 201) {
        alert("सफल! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      alert("त्रुटि: " + (err.response?.data?.message || "पठाउन सकिएन"));
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="oft-outer-wrapper">
      <style>{STYLES}</style>

      <form className="oft-container">

        {/* ── Top Bar ── */}
        <div className="oft-top-bar-title">
          टिप्पणी
          <span className="oft-top-right-bread">खुला ढाँचा &gt; टिप्पणी</span>
        </div>

        {/* ── Municipality Header ── */}
        <div className="oft-form-header-section">
          <div className="oft-header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
          </div>
          <div className="oft-header-text">
            <h1 className="oft-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="oft-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : user?.ward
                  ? `वडा नं. ${user.ward} वडा कार्यालय`
                  : "वडा कार्यालय"}
            </h2>
            <p className="oft-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="oft-province-text">{MUNICIPALITY.provinceLine}</p>
            <h3 className="oft-certificate-title">टिप्पणी र आदेश</h3>
          </div>
        </div>

        {/* ── Date (right-aligned) ── */}
        <div className="oft-date-section-row">
          मिति :
          <input
            name="date"
            type="text"
            className="oft-dotted-input"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* ── Addressee & Subject ── */}
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
            />
          </div>
          <span>,</span>
        </div>

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
            />
          </div>
        </div>

        {/* ── Body / Editor ── */}
        <div className="oft-editor-area">
          <div className="oft-rich-editor-mock">
            <div className="oft-editor-toolbar">
              <div>File Edit View Insert Format Tools Table Help</div>
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

        {/* ── Checkboxes + Signature ── */}
        <div className="oft-checkbox-signature-grid">
          <div className="oft-checkbox-group">
            <label className="oft-checkbox-item">
              <input
                name="archive"
                type="checkbox"
                checked={form.archive}
                onChange={handleChange}
              />
              अर्को थप्नुहोस्
            </label>
            <label className="oft-checkbox-item">
              <input
                name="approve"
                type="checkbox"
                checked={form.approve}
                onChange={handleChange}
              />
              स्वीकृत गर्नुहोस्
            </label>
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
              />
            </div>
            <select
              name="signature_designation"
              className="oft-designation-select"
              value={form.signature_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="oft-form-footer">
          <button
            type="button"
            className="oft-save-print-btn"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
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