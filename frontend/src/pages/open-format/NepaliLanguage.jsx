// NepaliLanguage.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from NepaliLanguage.css)
   All classes prefixed with "nl-" to avoid global collisions.
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

  /* ── Header ── */
  .nl-header { text-align: center; margin-bottom: 20px; position: relative; }
  .nl-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .nl-header-text { display: flex; flex-direction: column; align-items: center; }
  .nl-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .nl-ward-title        { color: #e74c3c; font-size: 1.6rem; margin: 5px 0; font-weight: bold; }
  .nl-address-text,
  .nl-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .nl-meta-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 1rem; }
  .nl-meta-item { margin: 5px 0; }

  .nl-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nl-w-small  { width: 120px; }
  .nl-w-medium { width: 260px; }
  .nl-w-long   { width: 320px; }
  .nl-w-full   { width: 100%; }
  .nl-nepali-date { font-size: 0.9rem; color: #555; margin: 3px 0; }

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

  /* ── Subject ── */
  .nl-subject {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 20px 0;
    font-size: 1rem;
    font-weight: bold;
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
    background: rgba(255,255,255,0.6);
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
    background: transparent;
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
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    outline: none;
    padding: 4px;
    margin-top: 4px;
  }

  /* ── Signature ── */
  .nl-signature-container { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .nl-signature-block     { width: 240px; text-align: center; }
  .nl-signature-line      { border-bottom: 1px solid #ccc; margin-bottom: 8px; width: 100%; height: 40px; }
  .nl-sig-name-input {
    width: 100%;
    margin-bottom: 6px;
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
  }
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
  }

  /* ── Footer ── */
  .nl-footer { text-align: center; margin-top: 36px; }
  .nl-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .nl-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
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

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .nl-container,
    .nl-container * { visibility: visible; }
    .nl-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
    }
    .nl-top-bar,
    .nl-footer,
    .nl-editor-toolbar,
    .nl-word-count { display: none !important; }
    .nl-editor-mock {
      border: none !important;
      background: transparent !important;
    }
    .nl-editor-textarea,
    .nl-full-textarea {
      border: none !important;
      background: transparent !important;
      resize: none !important;
    }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    input::placeholder,
    textarea::placeholder { color: transparent !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: added recipient_post and recipient_address for the two
   uncontrolled addressee inputs that had no name/value/onChange
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  date_nepali: "२०८२-१२-१८",
  subject: "",
  recipient_name: "",
  recipient_post: "",      // BUG FIX: was uncontrolled (no name/value/onChange)
  recipient_address: "",   // BUG FIX: was uncontrolled (no name/value/onChange)
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

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/nepali-language", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save + Print ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/nepali-language", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit}>

          {/* ── Header ── */}
          <header className="nl-header">
            <div className="nl-header-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
            </div>
            <div className="nl-header-text">
              <h1 className="nl-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="nl-ward-title">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : user?.ward
                    ? `वडा नं. ${user.ward} वडा कार्यालय`
                    : "वडा कार्यालय"}
              </h2>
              <p className="nl-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="nl-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </header>

          {/* ── Meta ── */}
          <div className="nl-meta-row">
            <div className="nl-meta-left">
              <div className="nl-meta-item">
                पत्र संख्या : <span className="nl-bold">{form.patra_sankhya}</span>
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
                मिति : <span className="nl-bold">{form.date_nepali}</span>
              </div>
              <p className="nl-nepali-date">ने.सं. ११४६ चौलागा, २४ शनिबार</p>
            </div>
          </div>

          {/* ── Subject ── */}
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

          {/* ── Addressee ──
              BUG FIX: the पद/कार्यालय and ठेगाना inputs were uncontrolled
              (no name/value/onChange). Now wired to recipient_post and
              recipient_address so their values are submitted with the form. */}
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
              <input
                name="recipient_post"
                type="text"
                className="nl-dotted-input nl-w-long"
                value={form.recipient_post}
                onChange={handleChange}
                placeholder="पद/कार्यालय"
              />
            </div>
            <div className="nl-addressee-row">
              <input
                name="recipient_address"
                type="text"
                className="nl-dotted-input nl-w-long"
                value={form.recipient_address}
                onChange={handleChange}
                placeholder="ठेगाना"
              />
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
                  className="nl-dotted-input nl-sig-name-input"
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

          {/* ── Footer ── */}
          <div className="nl-footer">
            <button
              type="button"
              className="nl-save-print-btn"
              onClick={handlePrint}
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
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