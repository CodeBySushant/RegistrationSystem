import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from IndustryTransferAcceptanceReq.css)
   CSS already used "itareq-" prefix for component classes.
   Generic classes (.form-footer, .save-print-btn, .copyright-footer,
   .applicant-details-box, .details-grid, etc.) are now prefixed "itareq-".

   NOTE: Bare `body` rule dropped — background/font moved to .itareq-page.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .itareq-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #d6d7da;
    font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  }

  /* ── Top Bar ── */
  .itareq-topbar {
    background-color: #111827;
    color: #fff;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .itareq-top-left  { font-weight: 600; }
  .itareq-top-right { opacity: 0.9; }

  /* ── Paper ── */
  .itareq-paper {
    max-width: 950px;
    margin: 24px auto 20px;
    padding: 26px 40px 40px;
    background-color: #fff;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
  }

  /* ── Letterhead ── */
  .itareq-letterhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .itareq-logo img { width: 80px; height: 80px; }
  .itareq-head-text { flex: 1; text-align: center; }
  .itareq-head-main { font-size: 2rem; font-weight: bold; color: #e74c3c; }
  .itareq-head-ward { font-size: 2.2rem; font-weight: bold; color: #e74c3c; }
  .itareq-head-sub  { margin-top: 4px; font-size: 1rem; color: #e74c3c; }
  .itareq-head-meta { font-size: 13px; text-align: right; }
  .itareq-date-input {
    width: 120px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    outline: none;
    font-family: inherit;
    font-size: inherit;
  }

  /* ── Annex ── */
  .itareq-annex { text-align: center; font-size: 1rem; line-height: 1.8; margin-bottom: 10px; }
  .itareq-annex-title { margin-top: 4px; font-weight: 700; font-size: 1.1rem; }

  /* ── To Block ── */
  .itareq-to-block { margin-top: 20px; font-size: 1.05rem; line-height: 2; }
  .itareq-long-input {
    width: 260px;
    padding: 4px 6px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin: 0 4px;
    border-radius: 3px;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    vertical-align: middle;
  }
  .itareq-to-second { margin-top: 6px; }

  /* ── Subject ── */
  .itareq-subject-row { display: flex; align-items: center; margin-top: 22px; font-size: 15px; }
  .itareq-sub-label   { font-weight: 600; margin-right: 6px; }
  .itareq-subject-text { text-decoration: underline; }

  /* ── Body ── */
  .itareq-body { margin-top: 18px; font-size: 1.05rem; line-height: 2.6; text-align: justify; }
  .itareq-body input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    margin: 0 4px;
    outline: none;
    vertical-align: middle;
    font-family: inherit;
    font-size: inherit;
  }
  .itareq-small-input  { width: 110px; padding: 3px 6px; }
  .itareq-tiny-input   { width:  60px; padding: 3px 6px; }
  .itareq-medium-input { width: 170px; padding: 3px 6px; }

  /* ── Reason ── */
  .itareq-reason-block { margin-top: 20px; }
  .itareq-reason-label { font-size: 1rem; font-weight: 600; margin-bottom: 6px; }
  .itareq-reason-textarea {
    width: 100%;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    padding: 8px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
    min-height: 120px;
  }
  .itareq-reason-short-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    font-size: 1rem;
  }

  /* ── Docs + Sign grid ── */
  .itareq-bottom-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
    align-items: flex-start;
  }
  .itareq-docs       { font-size: 1rem; flex: 1; }
  .itareq-docs-title { font-weight: 600; margin-bottom: 6px; }
  .itareq-docs ol    { margin: 4px 0; padding-left: 20px; line-height: 2.2; }
  .itareq-docs-note-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    font-size: 1rem;
  }

  /* ── Signature box ── */
  .itareq-sign-box {
    border: 1px solid #c1c1c1;
    padding: 12px 16px;
    font-size: 1rem;
    min-width: 280px;
    background-color: #fff;
    border-radius: 3px;
  }
  .itareq-sign-title { text-align: right; font-weight: 600; margin-bottom: 10px; }
  .itareq-sign-field { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .itareq-sign-field span { white-space: nowrap; min-width: 70px; }
  .itareq-sign-field input {
    flex: 1;
    padding: 4px 5px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    outline: none;
    font-family: inherit;
    font-size: inherit;
  }
  .itareq-sign-select {
    flex: 1;
    padding: 4px 5px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    font-family: inherit;
    font-size: inherit;
  }

  /* ── Applicant details (scoped) ── */
  .itareq-paper .applicant-details-box {
    border: 2px solid #999;
    padding: 20px;
    background-color: transparent;
    margin-top: 20px;
    border-radius: 4px;
  }
  .itareq-paper .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .itareq-paper .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .itareq-paper .detail-group { display: flex; flex-direction: column; }
  .itareq-paper .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .itareq-paper .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    font-family: inherit;
  }
  .itareq-paper .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .itareq-form-footer { text-align: center; margin-top: 40px; }
  .itareq-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .itareq-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .itareq-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .itareq-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .itareq-paper, .itareq-paper * { visibility: visible; }
    .itareq-topbar { display: none !important; }
    .itareq-paper {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
    }
    .itareq-form-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date:               new Date().toISOString().slice(0, 10),
  to_line1:           "",
  to_line2:           "",
  reg_office:         "",
  reg_date:           "",
  district:           "",
  ward:               "",
  industry_name:      "",
  reason_short:       "",
  reason_long:        "",
  attached_docs_note: "",
  signer_signature:   "",
  signer_name:        "",
  signer_position:    "",
  signer_address:     "",
  signer_email:       "",
  ward_no:            "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function IndustryTransferAcceptanceReq() {
  const { user } = useAuth();
  const [form,    setForm]    = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* Sync ward from auth */
  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward, ward: user.ward }));
    }
  }, [user]); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Build payload (normalize empty → null) ── */
  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    return payload;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-transfer-acceptance-req", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-transfer-acceptance-req", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="itareq-page">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <header className="itareq-topbar">
        <div className="itareq-top-left">उद्योग स्थानान्तरण स्वीकृति अनुरोध ।</div>
        <div className="itareq-top-right">अवलोकन पृष्ठ / उद्योग स्थानान्तरण स्वीकृति अनुरोध</div>
      </header>

      <form className="itareq-paper" onSubmit={handleSubmit}>

        {/* ── Letterhead ── */}
        <div className="itareq-letterhead">
          <div className="itareq-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="itareq-head-text">
            <div className="itareq-head-main">{MUNICIPALITY.name}</div>
            <div className="itareq-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="itareq-head-sub">
              {MUNICIPALITY.officeLine}<br />{MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="itareq-head-meta">
            मिति :{" "}
            <input type="text" name="date" className="itareq-date-input" value={form.date} onChange={handleChange} />
          </div>
        </div>

        {/* ── Annex ── */}
        <div className="itareq-annex">
          <div>अनुसूची–६</div>
          <div>(नियम ७ को उपनियम (२) संग सम्बन्धित)</div>
          <div className="itareq-annex-title">उद्योग स्थानान्तरिका लागि दिने निवेदन</div>
        </div>

        {/* ── To Block ── */}
        <div className="itareq-to-block">
          <span>श्री</span>
          <input type="text" name="to_line1" className="itareq-long-input" value={form.to_line1} onChange={handleChange} />
          <span>ज्यु,</span>
          <br />
          <input type="text" name="to_line2" className="itareq-long-input itareq-to-second" value={form.to_line2} onChange={handleChange} />
        </div>

        {/* ── Subject ── */}
        <div className="itareq-subject-row">
          <span className="itareq-sub-label">विषयः</span>
          <span className="itareq-subject-text">उद्योग स्थानान्तरको स्वीकृति बारे ।</span>
        </div>

        {/* ── Body ── */}
        <p className="itareq-body">
          महोदय, यस{" "}
          <input type="text" name="reg_office" className="itareq-small-input" value={form.reg_office} onChange={handleChange} />
          {" "}मा मिति{" "}
          <input type="text" name="reg_date"   className="itareq-small-input" value={form.reg_date}   onChange={handleChange} />
          {" "}मा दर्ता भएको {MUNICIPALITY.provinceLine}{" "}
          <input type="text" name="district"   className="itareq-small-input" value={form.district}   onChange={handleChange} />
          {" "}जिल्ला {MUNICIPALITY.name} वडा नं.{" "}
          <input type="text" name="ward"        className="itareq-tiny-input"  value={form.ward}        onChange={handleChange} />
          {" "}मा स्थापना भई संचालन भई रहेको{" "}
          <input type="text" name="industry_name" className="itareq-medium-input" value={form.industry_name} onChange={handleChange} />
          {" "}उद्योग देखाएको कारणले स्थानान्तरण गर्नुपर्ने भएकाले सम्बन्धित
          निवेदनसहित यसै स्थानान्तरणको स्वीकृतिको लागि अनुरोध गर्दछु ।
        </p>

        {/* ── Reason ── */}
        <div className="itareq-reason-block">
          <div className="itareq-reason-label">उद्योग स्थानान्तर गर्नुपर्ने कारणहरू:</div>
          <textarea
            name="reason_long"
            rows={6}
            className="itareq-reason-textarea"
            value={form.reason_long}
            onChange={handleChange}
            placeholder="उद्योग स्थानान्तरण कारणहरू..."
          />
          <div className="itareq-reason-short-row">
            <label>संक्षेप कारण:</label>
            <input type="text" name="reason_short" className="itareq-long-input" value={form.reason_short} onChange={handleChange} />
          </div>
        </div>

        {/* ── Docs + Signature ── */}
        <div className="itareq-bottom-grid">
          <div className="itareq-docs">
            <div className="itareq-docs-title">संलग्न कागजातहरूः</div>
            <ol>
              <li>सञ्चालक समितिको निर्णय</li>
              <li>स्थानान्तरण हुने स्थानको विवरण</li>
              <li>प्रारम्भिक वातावरणीय परीक्षण (यदि आवश्यक)</li>
              <li>अन्य सम्बन्धित कागजात</li>
            </ol>
            <div className="itareq-docs-note-row">
              <label>अन्य संलग्न (विवरण):</label>
              <input type="text" name="attached_docs_note" className="itareq-long-input" value={form.attached_docs_note} onChange={handleChange} />
            </div>
          </div>

          <div className="itareq-sign-box">
            <div className="itareq-sign-title">निवेदकको :</div>
            <div className="itareq-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" name="signer_signature" value={form.signer_signature} onChange={handleChange} />
            </div>
            <div className="itareq-sign-field">
              <span>नाम, थर :</span>
              <input type="text" name="signer_name" value={form.signer_name} onChange={handleChange} />
            </div>
            <div className="itareq-sign-field">
              <span>पद :</span>
              <select name="signer_position" value={form.signer_position} onChange={handleChange} className="itareq-sign-select">
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
            <div className="itareq-sign-field">
              <span>ठेगाना :</span>
              <input type="text" name="signer_address" value={form.signer_address} onChange={handleChange} />
            </div>
            <div className="itareq-sign-field">
              <span>इमेल :</span>
              <input type="text" name="signer_email" value={form.signer_email} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="itareq-form-footer">
          <button className="itareq-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="itareq-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}