// src/pages/GovOrganizationReg/GovOrganizationReg.jsx
import React, { useState } from "react";
import "./GovOrganizationReg.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

// ─────────────────────────────────────────────
// Initial State — extracted so reset works
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// StarInput — outside component to prevent
// remount on every render (focus loss bug)
// ─────────────────────────────────────────────
const StarInput = ({ className = "", ...props }) => (
  <div className="inline-input-wrapper">
    <span className="input-required-star">*</span>
    <input className={className} {...props} />
  </div>
);

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const GovOrganizationReg = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // ── handleChange ──────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ── validate ──────────────────────────────
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
      return { ok: false, missing: "applicantPhone (invalid)" };
    }
    return { ok: true };
  };

  // ── handleSubmit ──────────────────────────
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
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v === "" ? null : v]),
      );

      const res = await axios.post(
        "/api/forms/gov-organization-registration",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        return true;
      } else {
        alert("Unexpected response");
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

  // ── handlePrint — save → print → reset ───
  const handlePrint = async () => {
    const ok = await handleSubmit(null);
    if (ok) {
      window.print();
      setFormData(initialState);
    }
  };

  // ─────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────
  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleSubmit}>
        {/* ── Top Bar ── */}
        <div className="top-bar-title">
          सहकारी संस्था दर्ता सिफारिस ।
          <span className="top-right-bread">
            सहकारी &gt; सहकारी संस्था दर्ता सिफारिस
          </span>
        </div>

        {/* ── Letterhead Header ── */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || MUNICIPALITY.wardNumber} नं. वडा कार्यालय`}
            </h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Sub Header ── */}
        <div className="sub-header">
          <span>अनुसूची २</span>
          <br />
          <span>दर्ता दरखास्तको नमुना</span>
        </div>

        <div className="top-info">
          <div className="top-info-row">
            <span>श्री दत्ता गर्ने अधिकारी</span>
            <StarInput
              type="text"
              className="top-info-input"
              name="officerName"
              value={formData.officerName}
              onChange={handleChange}
            />
            <span>ज्यू,</span>
          </div>

          <div className="top-info-row">
            <StarInput
              type="text"
              className="top-info-input"
              name="municipalityName"
              value={formData.municipalityName}
              onChange={handleChange}
            />
            <span>, नगर कार्यपालिकाको कार्यालय</span>
          </div>

          <div className="top-info-row">
            <StarInput
              type="text"
              className="top-info-input"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
            <StarInput
              type="text"
              className="top-info-input"
              name="refNo"
              placeholder="सन्दर्भ नं."
              value={formData.refNo}
              onChange={handleChange}
            />
            <span>।</span>
          </div>
        </div>

        <h3 className="subject">विषय : सहकारी संस्था दर्ता ।</h3>

        <p className="paragraph">
          महोदय,
          <br />
          <br />
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
          गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको
          छ।
        </p>

        <h3 className="section-title">संस्थासम्बन्धी विवरण</h3>

        <div className="section">
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
          <div className="inline-row">
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

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
};

export default GovOrganizationReg;
