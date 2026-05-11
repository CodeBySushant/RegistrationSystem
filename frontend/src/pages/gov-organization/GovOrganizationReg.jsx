// src/pages/GovOrganizationReg/GovOrganizationReg.jsx
import React, { useState } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from GovOrganizationReg.css)
   All classes prefixed with "gor-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page wrapper ── */
  .gor-form-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── Form container with paper texture ── */
  .gor-form-container {
    width: 90%;
    padding: 40px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
    margin-top: 10px;
    font-family: 'Kalimati', 'Kokila', "Mangal", sans-serif;
    color: #000;
  }

  /* ── Top Bar ── */
  .gor-top-bar-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .gor-top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* ── Letterhead Header ── */
  .gor-form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }
  .gor-header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
  }
  .gor-header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gor-municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }
  .gor-ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }
  .gor-address-text,
  .gor-province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* ── Sub Header ── */
  .gor-sub-header {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    line-height: 26px;
    border-top: 1px solid #ccc;
    padding-top: 14px;
  }

  /* ── Top Info / Addressee ── */
  .gor-top-info {
    margin: 20px 0;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .gor-top-info-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .gor-top-info-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    width: 200px;
    font-size: 1rem;
    font-family: inherit;
    padding: 2px 5px 2px 18px;
  }
  .gor-date-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    width: 140px;
    font-size: 1rem;
    font-family: inherit;
    padding: 2px 5px;
  }

  /* ── Subject ── */
  .gor-subject {
    font-size: 1.05rem;
    margin-top: 20px;
  }

  /* ── Paragraph ── */
  .gor-paragraph {
    font-size: 1rem;
    line-height: 2;
    margin-top: 10px;
  }

  /* ── Section Title ── */
  .gor-section-title {
    font-weight: bold;
    margin-top: 30px;
    font-size: 1.05rem;
  }

  /* ── Section inputs ── */
  .gor-section {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .gor-section label {
    margin-top: 10px;
    margin-bottom: 4px;
    font-size: 1rem;
    font-weight: 600;
  }
  .gor-section input {
    margin-bottom: 4px;
    padding: 8px;
    border: 1px solid #bbb;
    width: 50%;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Inline row (member count etc.) ── */
  .gor-inline-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    font-size: 1rem;
  }
  .gor-inline-row input {
    width: 80px !important;
    margin: 0 4px;
  }

  /* ── Red required-star wrapper ── */
  .gor-inline-input-wrapper {
    position: relative;
    display: inline-block;
  }
  .gor-input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
    z-index: 1;
  }
  .gor-inline-input-wrapper input {
    padding-left: 18px;
  }
  .gor-required {
    color: red;
    margin-left: 4px;
  }

  /* ── Applicant Details Box ── */
  .gor-form-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .gor-form-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .gor-form-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .gor-form-container .detail-group {
    display: flex;
    flex-direction: column;
  }
  .gor-form-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
    margin-top: 0;
  }
  .gor-form-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .gor-form-container .bg-gray {
    background-color: #eef2f5 !important;
  }

  /* ── Footer ── */
  .gor-form-footer {
    text-align: center;
    margin-top: 40px;
  }
  .gor-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }
  .gor-save-print-btn:hover:not(:disabled) {
    background-color: #1a252f;
  }
  .gor-save-print-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .gor-copyright-footer {
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
    .gor-form-container,
    .gor-form-container * { visibility: visible; }
    .gor-form-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 10mm 14mm;
      background: white;
    }
    .gor-top-bar-title,
    .gor-form-footer { display: none; }
    .gor-input-required-star { display: none; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State — extracted so reset works cleanly
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  status: "pending",
  date: new Date().toISOString().slice(0, 10),
  letterNo: "2082/83",
  refNo: "",
  proposalName: "",
  officerName: "",
  municipalityName: "",
  wardNo: "",
  purpose: "",
  activities: "",
  headOffice: "",
  branchOffice: "",
  liability: "",
  femaleMembers: "",
  maleMembers: "",
  totalShareCapital: "",
  entranceFee: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   StarInput — defined outside the component so it never remounts on re-render
   (remounting causes focus loss on every keystroke)
───────────────────────────────────────────────────────────────────────────── */
const StarInput = ({ className = "", ...props }) => (
  <div className="gor-inline-input-wrapper">
    <span className="gor-input-required-star">*</span>
    <input className={className} {...props} />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const GovOrganizationReg = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* ── handleChange ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── validate ──
     Returns { ok: true } or { ok: false, missing: fieldName }
     Phone regex: 6–20 chars of digits, +, -, spaces */
  const validate = () => {
    const required = [
      "proposalName",
      "wardNo",
      "purpose",
      "activities",
      "headOffice",
      "liability",
      "totalShareCapital",
      "entranceFee",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone))) {
      return { ok: false, missing: "applicantPhone (invalid format)" };
    }
    return { ok: true };
  };

  /* ── handleSubmit ──
     Called both by form onSubmit and by handlePrint.
     When called from handlePrint, e is null (no event to prevent). */
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return false;

    const v = validate();
    if (!v.ok) {
      alert("कृपया भर्नुहोस्: " + v.missing);
      return false;
    }

    setLoading(true);
    try {
      // Convert empty strings to null so the backend doesn't store blank strings
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, val]) => [k, val === "" ? null : val])
      );

      const res = await axios.post(
        "/api/forms/gov-organization-registration",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        return true;
      } else {
        alert("Unexpected response: " + res.status);
        return false;
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ── handlePrint — save first, then print, then reset ── */
  const handlePrint = async () => {
    const ok = await handleSubmit(null);
    if (ok) {
      window.print();
      setFormData(initialState);
    }
  };

  /* ───────────────────────────────────────────────────────────────────────────
     Render
  ─────────────────────────────────────────────────────────────────────────── */
  return (
    <div className="gor-form-page">
      <style>{STYLES}</style>

      <form className="gor-form-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="gor-top-bar-title">
          सहकारी संस्था दर्ता सिफारिस ।
          <span className="gor-top-right-bread">
            सहकारी &gt; सहकारी संस्था दर्ता सिफारिस
          </span>
        </div>

        {/* ── Letterhead Header ── */}
        <div className="gor-form-header-section">
          <div className="gor-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="gor-header-text">
            <h1 className="gor-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="gor-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber} नं. वडा कार्यालय`}
            </h2>
            <p className="gor-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="gor-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Sub Header ── */}
        <div className="gor-sub-header">
          <span>अनुसूची २</span>
          <br />
          <span>दर्ता दरखास्तको नमुना</span>
        </div>

        {/* ── Addressee / Top Info ── */}
        <div className="gor-top-info">
          <div className="gor-top-info-row">
            <span>श्री दत्ता गर्ने अधिकारी</span>
            <StarInput
              type="text"
              className="gor-top-info-input"
              name="officerName"
              value={formData.officerName}
              onChange={handleChange}
            />
            <span>ज्यू,</span>
          </div>

          <div className="gor-top-info-row">
            <StarInput
              type="text"
              className="gor-top-info-input"
              name="municipalityName"
              value={formData.municipalityName}
              onChange={handleChange}
            />
            <span>, नगर कार्यपालिकाको कार्यालय</span>
          </div>

          <div className="gor-top-info-row">
            <StarInput
              type="text"
              className="gor-top-info-input"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
            <StarInput
              type="text"
              className="gor-top-info-input"
              name="refNo"
              placeholder="सन्दर्भ नं."
              value={formData.refNo}
              onChange={handleChange}
            />
            <span>।</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <h3 className="gor-subject">विषय : सहकारी संस्था दर्ता ।</h3>

        {/* ── Intro paragraph ── */}
        <p className="gor-paragraph">
          महोदय,
          <br />
          <br />
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
          गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको
          छ।
        </p>

        {/* ── Section: Organization details ── */}
        <h3 className="gor-section-title">संस्थासम्बन्धी विवरण</h3>

        <div className="gor-section">
          <label>(क) प्रस्तावित संस्था नामः *</label>
          <StarInput
            type="text"
            name="proposalName"
            value={formData.proposalName}
            onChange={handleChange}
          />

          <label>(ख) ठेगाना: वडा नं. *</label>
          <StarInput
            type="text"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
          />

          <label>(ग) उद्देश्य: *</label>
          <StarInput
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />

          <label>(घ) गतिविधि: *</label>
          <StarInput
            type="text"
            name="activities"
            value={formData.activities}
            onChange={handleChange}
          />

          <label>(ङ) मुख्य कार्यालय: *</label>
          <StarInput
            type="text"
            name="headOffice"
            value={formData.headOffice}
            onChange={handleChange}
          />

          <label>(च) शाखा कार्यालय:</label>
          <StarInput
            type="text"
            name="branchOffice"
            value={formData.branchOffice}
            onChange={handleChange}
          />

          <label>(छ) दायित्व: *</label>
          <StarInput
            type="text"
            name="liability"
            value={formData.liability}
            onChange={handleChange}
          />

          <label>(ज) सदस्य संख्या:</label>
          <div className="gor-inline-row">
            महिला:{" "}
            <StarInput
              type="text"
              name="femaleMembers"
              value={formData.femaleMembers}
              onChange={handleChange}
            />{" "}
            जना &nbsp; पुरुष:{" "}
            <StarInput
              type="text"
              name="maleMembers"
              value={formData.maleMembers}
              onChange={handleChange}
            />{" "}
            जना
          </div>

          <label>(झ) कुल शेयर पूँजीको रकमः *</label>
          <StarInput
            type="text"
            name="totalShareCapital"
            value={formData.totalShareCapital}
            onChange={handleChange}
          />

          <label>(ञ) प्राप्त प्रवेश शुल्कको रकमः *</label>
          <StarInput
            type="text"
            name="entranceFee"
            value={formData.entranceFee}
            onChange={handleChange}
          />
        </div>

        {/* ── Applicant Details (shared component) ── */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="gor-form-footer">
          <button
            className="gor-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="gor-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
};

export default GovOrganizationReg;