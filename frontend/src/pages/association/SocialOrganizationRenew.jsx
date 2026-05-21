// SocialOrganizationRenew.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from SocialOrganizationRenew.css)
   All classes prefixed with "sor-" — most already were, exceptions fixed.

   NOTE: Bare `body { margin; font-family; background }` dropped — inlining
   global rules would break the whole app. Background moved to `.sor-page`;
   font-family set on `.sor-page` and inherited.

   The `.insurance-claim-container` print block at the bottom of the original
   CSS was a copy-paste error — it targets the wrong component and is removed.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .sor-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #d6d7da;
    font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  }

  /* ── Top Bar ── */
  .sor-topbar {
    background-color: #111827;
    color: #fff;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .sor-top-left  { font-weight: 600; }
  .sor-top-right { opacity: 0.9; }

  /* ── Paper ── */
  .sor-paper {
    margin: 0 24px 20px;
    padding: 28px 40px 40px;
    background-size: 280px 280px;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
    background-color: #fff;
  }

  /* ── Letterhead ── */
  .sor-letterhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sor-head-meta  { font-size: 13px; text-align: right; }
  .sor-meta-line  { margin-bottom: 4px; }
  .sor-date-input {
    width: 120px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    font-family: inherit;
  }

  /* ── Ref row (पत्र / चलानी) ── */
  .sor-ref-row {
    display: flex;
    gap: 40px;
    margin-top: 20px;
    font-size: 14px;
    flex-wrap: wrap;
  }
  .sor-ref-block { display: flex; align-items: center; gap: 6px; }
  .sor-ref-block input {
    width: 180px;
    padding: 5px 6px;
    border: 1px solid #c1c1c1;
    font-family: inherit;
  }

  /* ── To block ── */
  .sor-to-block { margin-top: 22px; font-size: 14px; }
  .sor-long-input {
    width: 260px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    margin: 0 4px;
    font-family: inherit;
  }
  .sor-to-second { margin-top: 4px; }

  /* ── Subject ── */
  .sor-subject-row {
    display: flex;
    align-items: center;
    margin-top: 22px;
    font-size: 15px;
  }
  .sor-sub-label    { font-weight: 600; margin-right: 6px; }
  .sor-subject-text { text-decoration: underline; }

  /* ── Body ── */
  .sor-body { margin-top: 16px; font-size: 14px; line-height: 1.7; }
  .sor-body input,
  .sor-body select { padding: 3px 4px; border: 1px solid #c1c1c1; font-family: inherit; }
  .sor-bold         { font-weight: 600; }
  .sor-select       { min-width: 110px; }
  .sor-tiny-input   { width: 60px; }
  .sor-small-inline { width: 100px; }
  .sor-medium-input { width: 190px; }

  /* ── Blank area ── */
  .sor-blank-area {
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    min-height: 260px;
  }

  /* ── Signature ── */
  .sor-sign-top {
    margin-top: 18px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
  .sor-sign-name {
    width: 200px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    font-family: inherit;
  }
  .sor-post-select {
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    font-family: inherit;
  }

  /* ── Applicant details (scoped) ── */
  .sor-paper .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .sor-paper .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .sor-paper .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .sor-paper .detail-group { display: flex; flex-direction: column; }
  .sor-paper .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .sor-paper .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    font-family: inherit;
  }
  .sor-paper .bg-gray { background-color: #eef2f5 !important; }

  /* ── Submit ── */
  .sor-submit-row { text-align: center; margin-top: 30px; }
  .sor-submit-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .sor-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
  .sor-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Footer ── */
  .sor-footer {
    text-align: right;
    padding: 10px 24px;
    font-size: 0.8rem;
    color: #666;
    border-top: 1px solid #eee;
    background: #fff;
    margin-top: auto;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .sor-paper, .sor-paper * { visibility: visible; }
    .sor-paper {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      box-shadow: none;
    }
    .sor-topbar, .sor-submit-row, .sor-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State factory
───────────────────────────────────────────────────────────────────────────── */
const buildInitialState = () => ({
  date:                new Date().toISOString().slice(0, 10),
  refLetterNo:         "",
  chalaniNo:           "",
  toOffice:            MUNICIPALITY.officeLine || "",
  toOfficeCity:        MUNICIPALITY.officeLine || "",
  wardNo:              MUNICIPALITY.wardNumber  || "",
  sabikWardNo:         MUNICIPALITY.wardNumber  || "",
  palikaType:          "नगरपालिका",
  orgName:             "",
  orgAddress:          "",
  reasonText:          "",
  signerName:          "",
  signerDesignation:   "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship: "",
  applicantPhone:      "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function SocialOrganizationRenew() {
  const [form,       setForm]       = useState(buildInitialState);
  const [submitting, setSubmitting] = useState(false);

  /* ── Generic field handler ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.orgName?.trim())      return alert("कृपया संस्था/संस्थाको नाम भर्नुहोस्");
    if (!form.applicantName?.trim()) return alert("कृपया निवेदकको नाम भर्नुहोस्");

    setSubmitting(true);
    try {
      // FIX: original used hardcoded `http://localhost:5000/api/...`
      // Using axiosInstance so the base URL is configured once in one place
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post("/api/forms/social-organization-renew", payload);
      if (res.status === 200 || res.status === 201) {
        alert("Saved successfully. ID: " + (res.data?.id ?? "OK"));
        setForm(buildInitialState());
      } else {
        alert("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("त्रुटि: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="sor-page">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <header className="sor-topbar">
        <div className="sor-top-left">सामाजिक संस्था नवीकरण</div>
        <div className="sor-top-right">
          अवलोकन पृष्ठ / सामाजिक संस्था नवीकरण सिफारिस
        </div>
      </header>

      <form className="sor-paper" onSubmit={handleSubmit}>

        {/* ── Letterhead meta ── */}
        <div className="sor-letterhead">
          <div className="sor-head-meta">
            <div className="sor-meta-line">
              मिति :{" "}
              <input name="date" value={form.date} onChange={handleChange} className="sor-date-input" />
            </div>
            <div className="sor-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        {/* ── Ref row ── */}
        <div className="sor-ref-row">
          <div className="sor-ref-block">
            <label>पत्र संख्या :</label>
            <input name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
          </div>
          <div className="sor-ref-block">
            <label>चलानी नं. :</label>
            <input name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
          </div>
        </div>

        {/* ── To block ── */}
        <div className="sor-to-block">
          <span>श्री</span>
          <input name="toOffice" className="sor-long-input" value={form.toOffice} onChange={handleChange} />
          <span>जिल्ला प्रशासन कार्यालय,</span>
          <br />
          <input name="toOfficeCity" className="sor-long-input sor-to-second" value={form.toOfficeCity} onChange={handleChange} />
        </div>

        {/* ── Subject ── */}
        <div className="sor-subject-row">
          <span className="sor-sub-label">विषयः</span>
          <span className="sor-subject-text">सिफारिस गरिएको बारेमा ।</span>
        </div>

        {/* ── Body ── */}
        <p className="sor-body">
          उपर्युक्त सम्बन्धमा{" "}
          <span className="sor-bold">{MUNICIPALITY.name}</span> वडा नं.
          <input name="wardNo"     className="sor-tiny-input"   value={form.wardNo}     onChange={handleChange} />
          {" "}(साबिक
          <input name="sabikWardNo" className="sor-small-inline" value={form.sabikWardNo} onChange={handleChange} />
          )
          <select name="palikaType" value={form.palikaType} onChange={handleChange} className="sor-select">
            <option value="गाउँपालिका">गाउँपालिका</option>
            <option value="नगरपालिका">नगरपालिका</option>
          </select>
          <input
            name="orgName"
            className="sor-medium-input"
            placeholder="संस्थाको नाम"
            value={form.orgName}
            onChange={handleChange}
            required
          />
          {" "}नामक सामाजिक संस्था नवीकरणको सिफारिसको लागि यस कार्यलयमा प्राप्त
          निवेदन तथा पेश गरिएका आवश्यक कागजातका आधारमा अनुरोध गरिएको हुँदा
          नवीकरण गरिदिनुहुन सिफारिस छ।
        </p>

        {/* ── Blank area ── */}
        <div className="sor-blank-area" />

        {/* ── Signature ── */}
        <div className="sor-sign-top">
          <input
            name="signerName"
            className="sor-sign-name"
            placeholder="नाम, थर"
            value={form.signerName}
            onChange={handleChange}
          />
          <select name="signerDesignation" className="sor-post-select" value={form.signerDesignation} onChange={handleChange}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="अध्यक्ष">अध्यक्ष</option>
            <option value="सचिव">सचिव</option>
            <option value="अधिकृत">अधिकृत</option>
          </select>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Submit ── */}
        <div className="sor-submit-row">
          <button className="sor-submit-btn" type="submit" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

      </form>

      <footer className="sor-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </footer>
    </div>
  );
}

export default SocialOrganizationRenew;