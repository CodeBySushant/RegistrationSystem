// OrganizationRenewRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from OrganizationRenewRecommendation.css)
   Classes kept with "org-" prefix (already scoped in original).
   BUG FIX: @media print was targeting .insurance-claim-container (wrong form).
            Corrected to .org-page / .org-paper.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .org-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #d6d7da;
    font-family: 'Kalimati', 'Kokila', 'Mangal', 'Segoe UI', sans-serif;
    margin: 0;
  }

  /* ── Top Bar ── */
  .org-topbar {
    background-color: #111827;
    color: #fff;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .org-top-left  { font-weight: 600; }
  .org-top-right { opacity: 0.9; }

  /* ── Paper ── */
  .org-paper {
    margin: 0 24px 20px;
    padding: 28px 40px 40px;
    background-size: 280px 280px;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
    background-color: #fff;
  }

  /* ── Letterhead ── */
  .org-letterhead { display: flex; justify-content: space-between; align-items: center; }
  .org-head-meta  { font-size: 13px; text-align: right; }
  .org-meta-line  { margin-bottom: 4px; }
  .org-small-input {
    width: 120px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    font-family: inherit;
    font-size: 13px;
  }

  /* ── Ref row ── */
  .org-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; }
  .org-ref-block { display: flex; align-items: center; gap: 6px; }
  .org-ref-block input {
    width: 180px;
    padding: 5px 6px;
    border: 1px solid #c1c1c1;
    font-family: inherit;
    font-size: 13px;
  }

  /* ── To block ── */
  .org-to-block { margin-top: 22px; font-size: 14px; }
  .org-long-input {
    width: 260px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    margin: 0 4px;
    font-family: inherit;
    font-size: 13px;
  }
  .org-to-second { margin-top: 6px; }

  /* ── Subject ── */
  .org-subject-row { display: flex; align-items: center; margin-top: 22px; font-size: 15px; }
  .org-sub-label   { font-weight: 600; margin-right: 6px; }
  .org-subject-text { text-decoration: underline; }

  /* ── Body ── */
  .org-body { margin-top: 16px; font-size: 14px; line-height: 1.7; }
  .org-body input { padding: 3px 4px; border: 1px solid #c1c1c1; font-family: inherit; }
  .org-bold { font-weight: 600; }

  .org-tiny-input   { width: 60px;  font-family: inherit; }
  .org-small-inline { width: 100px; font-family: inherit; }
  .org-medium-input { width: 170px; font-family: inherit; }

  /* ── Body blank ── */
  .org-body-blank { margin-top: 20px; border: 1px solid #e0e0e0; min-height: 220px; }

  /* ── Signature ── */
  .org-sign-top { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 18px; }
  .org-sign-name   { width: 200px; padding: 4px 6px; border: 1px solid #c1c1c1; font-family: inherit; }
  .org-post-select { padding: 4px 6px; border: 1px solid #c1c1c1; font-family: inherit; }

  /* ── Submit row ── */
  .org-submit-row { text-align: center; margin-top: 30px; }
  .org-submit-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .org-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
  .org-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Applicant details overrides ── */
  .org-page .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .org-page .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .org-page .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .org-page .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .nprc-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin: 0 24px 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  /* ── Print ──
     BUG FIX: original targeted .insurance-claim-container (wrong form).
     Corrected to .org-page / .org-paper. */
  @media print {
    body * { visibility: hidden; }
    .org-page,
    .org-page * { visibility: visible; }
    .org-page { background: white; }
    .org-paper {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .org-topbar,
    .org-submit-row,
    .nprc-footer { display: none !important; }
    .org-body-blank { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function OrganizationRenewal() {
  const [form, setForm] = useState({
    date:               new Date().toISOString().slice(0, 10),
    refLetterNo:        "",
    chalaniNo:          "",
    toOffice:           MUNICIPALITY.officeLine,
    toOfficeLine2:      MUNICIPALITY.name,
    wardNo:             MUNICIPALITY.wardNumber,
    sabikWardNo:        MUNICIPALITY.wardNumber,
    sabikWardNo2:       MUNICIPALITY.wardNumber,
    personName:         "",
    orgName:            "",
    orgAddress:         "",
    signerName:         "",
    signerDesignation:  "",
    applicantName:      "",
    applicantAddress:   "",
    applicantCitizenship: "",
    applicantPhone:     "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      /* BUG FIX: was hardcoded "http://localhost:5000/api/forms/..."
         and used bare axios (no auth headers).
         Now uses relative URL + axiosInstance. */
      const res = await axiosInstance.post(
        "/api/forms/organization-renew-recommendation",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("Saved: " + (res.data?.id ?? "OK"));
        /* BUG FIX: original had no window.print() call after save */
        window.print();
      } else {
        alert("Unexpected status: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="org-page">

        {/* ── Top Bar ── */}
        <header className="org-topbar">
          <div className="org-top-left">संस्था नवीकरण सिफारिस ।</div>
          <div className="org-top-right">अवलोकन पृष्ठ / संस्था नवीकरण सिफारिस</div>
        </header>

        <form className="org-paper" onSubmit={handleSubmit}>

          {/* ── Letterhead ── */}
          <div className="org-letterhead">
            <div className="org-head-meta">
              <div className="org-meta-line">
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="org-small-input"
                />
              </div>
              <div className="org-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          {/* ── Ref row ── */}
          <div className="org-ref-row">
            <div className="org-ref-block">
              <label>पत्र संख्या :</label>
              <input name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
            </div>
            <div className="org-ref-block">
              <label>चलानी नं. :</label>
              <input name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
            </div>
          </div>

          {/* ── To block ── */}
          <div className="org-to-block">
            <span>श्री</span>
            <input name="toOffice" className="org-long-input" value={form.toOffice} onChange={handleChange} />
            <span>ज्यु</span>
            <br />
            <input name="toOfficeLine2" className="org-long-input org-to-second" value={form.toOfficeLine2} onChange={handleChange} />
          </div>

          {/* ── Subject ── */}
          <div className="org-subject-row">
            <span className="org-sub-label">विषयः</span>
            <span className="org-subject-text">सिफारिस सम्बन्धमा ।</span>
          </div>

          {/* ── Body ── */}
          <p className="org-body">
            उपर्युक्त विषयमा उपर्युक्त विषयमा{" "}
            <span className="org-bold">{MUNICIPALITY.name}</span> वडा नं.
            <input type="text" className="org-tiny-input"   name="wardNo"      value={form.wardNo}      onChange={handleChange} />{" "}
            (साबिक
            <input type="text" className="org-small-inline" name="sabikWardNo"  value={form.sabikWardNo}  onChange={handleChange} />
            ) वडा नं.
            <input type="text" className="org-tiny-input"   name="sabikWardNo2" value={form.sabikWardNo2} onChange={handleChange} />{" "}
            मा बस्ने श्री
            <input type="text" className="org-medium-input" name="personName"   value={form.personName}   onChange={handleChange} />{" "}
            को नाममा रहेको
            <input type="text" className="org-medium-input" name="orgName"      value={form.orgName}      onChange={handleChange} />{" "}
            नामक संस्था नवीकरण गर्नुपर्ने भएकोले ...
          </p>

          <div className="org-body-blank" />

          {/* ── Signature ── */}
          <div className="org-sign-top">
            <input
              type="text"
              className="org-sign-name"
              name="signerName"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              className="org-post-select"
              name="signerDesignation"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="org-submit-row">
            <button className="org-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <footer className="nprc-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>

      </div>
    </>
  );
}

export default OrganizationRenewal;