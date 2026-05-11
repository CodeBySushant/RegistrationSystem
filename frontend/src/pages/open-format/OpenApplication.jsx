import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from OpenApplication.css)
   All classes prefixed with "oa-" to avoid global collisions.
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

  /* ── Header ── */
  .oa-form-header-section {
    text-align: center;
    margin-bottom: 30px;
    position: relative;
  }
  .oa-header-logo {
    position: absolute;
    left: 0;
    top: 0;
  }
  .oa-header-logo img { width: 80px; }
  .oa-header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .oa-municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }
  .oa-ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }
  .oa-address-text,
  .oa-province-text {
    color: #e74c3c;
    font-size: 1rem;
    margin: 2px 0;
    font-weight: bold;
  }

  /* ── Date row ── */
  .oa-date-row { margin-bottom: 20px; }

  /* ── Dotted input (underline style) ── */
  .oa-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 0 5px;
    font-size: 1.1rem;
    font-family: inherit;
  }

  /* ── Recipient section ── */
  .oa-recipient-section { margin-bottom: 20px; line-height: 2.2; }

  /* ── Subject row ── */
  .oa-subject-row { margin-bottom: 20px; }

  /* ── Salutation ── */
  .oa-salutation { margin-bottom: 10px; }

  /* ── Inline meta fields (address paragraph) ── */
  .oa-inline-meta-fields {
    text-align: justify;
    margin-bottom: 25px;
  }
  .oa-inline-input {
    width: 120px;
    display: inline-block;
    margin: 0 5px;
  }
  .oa-tiny-input {
    width: 45px;
    text-align: center;
  }
  .oa-inline-select {
    border: 1px solid #ccc;
    background: #fff;
    padding: 2px 5px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    vertical-align: middle;
  }

  /* ── Rich editor mock ── */
  .oa-editor-area { margin-bottom: 30px; }
  .oa-rich-editor-mock {
    border: 1px solid #ccc;
    background: #fff;
  }
  .oa-editor-toolbar {
    padding: 6px 10px;
    border-bottom: 1px solid #ccc;
    font-size: 0.85rem;
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
  }

  /* ── Applicant details override (scoped) ── */
  .oa-container .applicant-details-box {
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 20px;
    margin-top: 20px;
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
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }
  .oa-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .oa-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .oa-copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 40px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .oa-container,
    .oa-container * { visibility: visible; }
    .oa-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .oa-top-bar-title,
    .oa-form-footer,
    .oa-editor-toolbar { display: none !important; }
    .oa-rich-editor-mock {
      border: none !important;
      background: transparent !important;
    }
    .oa-editor-textarea {
      border: none !important;
      background: transparent !important;
      resize: none !important;
      min-height: auto !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date: "",
  subject: "",
  recipient_name: "",
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

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/open-application", {
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
    <div className="oa-container">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <div className="oa-top-bar-title">
        खुल्ला निवेदन
        <span className="oa-top-right-bread">खुला ढाँचा &gt; खुल्ला निवेदन</span>
      </div>

      <form>
        {/* ── Municipality Header ── */}
        <header className="oa-form-header-section">
          <div className="oa-header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
          </div>
          <div className="oa-header-text">
            <h1 className="oa-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="oa-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : user?.ward
                  ? `वडा नं. ${user.ward} वडा कार्यालय`
                  : "वडा कार्यालय"}
            </h2>
            <p className="oa-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="oa-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </header>

        {/* ── Date ── */}
        <div className="oa-date-row">
          मिति :
          <input
            name="date"
            type="text"
            className="oa-dotted-input"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* ── Recipient ── */}
        <div className="oa-recipient-section">
          श्रीमान्
          <input
            name="recipient_name"
            type="text"
            className="oa-dotted-input"
            value={form.recipient_name}
            onChange={handleChange}
          />{" "}
          ज्यू,
          <br />
          <input
            type="text"
            className="oa-dotted-input"
            style={{ width: "200px" }}
            placeholder="पद"
          />
          <br />
          <input
            type="text"
            className="oa-dotted-input"
            style={{ width: "200px" }}
            placeholder="कार्यालय"
          />
        </div>

        {/* ── Subject ── */}
        <div className="oa-subject-row">
          विषय:-
          <input
            name="subject"
            type="text"
            className="oa-dotted-input"
            style={{ width: "300px" }}
            value={form.subject}
            onChange={handleChange}
          />{" "}
          ।
        </div>

        {/* ── Salutation ── */}
        <div className="oa-salutation">महोदय,</div>

        {/* ── Inline address meta ── */}
        <div className="oa-inline-meta-fields">
          उपरोक्त सम्बन्धमा
          <input
            name="rel_subject"
            type="text"
            className="oa-dotted-input oa-inline-input"
            value={form.rel_subject}
            onChange={handleChange}
          />
          जिल्ला
          <input
            name="district"
            type="text"
            className="oa-dotted-input oa-inline-input"
            value={form.district}
            onChange={handleChange}
          />
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
          <input
            name="ward_no"
            type="text"
            className="oa-dotted-input oa-tiny-input"
            value={form.ward_no}
            onChange={handleChange}
          />
          साविक
          <input
            name="savik_address"
            type="text"
            className="oa-dotted-input oa-inline-input"
            value={form.savik_address}
            onChange={handleChange}
          />
          गाविस
          <input
            name="savik_vdc"
            type="text"
            className="oa-dotted-input oa-inline-input"
            value={form.savik_vdc}
            onChange={handleChange}
          />
          वडा नं.
          <input
            name="savik_ward"
            type="text"
            className="oa-dotted-input oa-tiny-input"
            value={form.savik_ward}
            onChange={handleChange}
          />{" "}
          मा बस्ने ।
        </div>

        {/* ── Body / Editor ── */}
        <div className="oa-editor-area">
          <div className="oa-rich-editor-mock">
            <div className="oa-editor-toolbar">
              <span>File Edit View Insert Format Tools Table Help</span>
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

        {/* ── Footer ── */}
        <div className="oa-form-footer">
          <button
            type="button"
            className="oa-save-print-btn"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
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