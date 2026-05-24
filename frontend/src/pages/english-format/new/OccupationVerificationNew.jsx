// src/pages/english-format/new/OccupationVerificationNew.jsx
import React, { useState } from "react";
import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import ApplicantDetailsEn from "../../../components/ApplicantDetailsEn.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from OccupationVerificationNew.css)
   All classes prefixed with "ovn-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .ovn-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 25px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: "Times New Roman", Times, serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .ovn-header { text-align: center; margin-bottom: 20px; color: #8b0000; }
  .ovn-header .logo { width: 80px; margin-bottom: 10px; }
  .ovn-header h1 { margin: 0; font-size: 24px; }
  .ovn-header h2 { margin: 5px 0; font-size: 20px; }
  .ovn-header h3 { margin: 0; font-size: 18px; }

  /* ── Form rows ── */
  .ovn-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  .ovn-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .ovn-form-group label { font-weight: bold; margin-right: 8px; }
  .ovn-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Subject ── */
  .ovn-subject { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .ovn-body {
    line-height: 2.2;
    font-size: 16px;
    text-align: justify;
    margin-bottom: 10px;
  }
  .ovn-body input[type="text"],
  .ovn-body select {
    display: inline-block;
    vertical-align: baseline;
    padding: 4px 6px;
    font-family: inherit;
    font-size: 15px;
    background-color: transparent;
    border: none;
    border-bottom: 1px dotted #000;
    margin: 0 5px;
    width: 120px;
    max-width: 100%;
    box-sizing: border-box;
  }
  .ovn-body select { width: auto; min-width: 80px; }

  /* Specific widths */
  .ovn-body input[name="applicantNameBody"],
  .ovn-body input[name="fatherName"] { width: 180px; }
  .ovn-body input[name="prevWardNo"] { width:  80px; }

  /* Textarea */
  .ovn-textarea-wrapper {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    padding-right: 1px;
  }
  .ovn-textarea-wrapper textarea {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 10px 12px;
    font-size: 16px;
    font-family: "Times New Roman", Times, serif;
    line-height: 1.5;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: rgba(255,255,255,0.85);
    resize: vertical;
  }

  /* ── Designation ── */
  .ovn-designation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 40px;
    margin-right: 20px;
  }
  .ovn-designation input {
    width: 220px;
    max-width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    margin-bottom: 5px;
    text-align: center;
    background: transparent;
    box-sizing: border-box;
    font-family: inherit;
  }
  .ovn-designation select {
    width: 220px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Applicant details (scoped) ── */
  .ovn-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.6);
    margin-top: 20px;
    border-radius: 4px;
  }
  .ovn-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .ovn-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .ovn-container .detail-group { display: flex; flex-direction: column; }
  .ovn-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .ovn-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Required star ── */
  .ovn-required { color: red; margin-left: 4px; }

  /* ── Submit ── */
  .ovn-submit-area { text-align: center; margin-top: 30px; }
  .ovn-submit-btn {
    background-color: #343a40;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: inherit;
    margin: 0 6px;
  }
  .ovn-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .ovn-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .ovn-container,
    .ovn-container * { visibility: visible; }
    .ovn-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0; padding: 20px;
      background: white !important;
      background-image: none !important;
    }
    .ovn-submit-area { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const buildInitialState = (ward) => ({
  letterNo:            "1970/60",
  refNo:               "",
  date:                new Date().toISOString().slice(0, 10),
  applicantTitle:      "Master.",
  applicantNameBody:   "",
  relation:            "son",
  fatherTitle:         "Master.",
  fatherName:          "",
  residencyType:       "permanent",
  municipality:        MUNICIPALITY.englishMunicipality || "",
  wardNo:              ward ? String(ward) : "",
  prevAddress1:        "",
  prevWardNo:          "",
  prevAddress2:        "",
  prevProvince:        MUNICIPALITY.englishProvince || "",
  prevCountry:         "Nepal",
  description:         "",
  designation:         "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship: "",
  applicantPhone:      "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const OccupationVerificationNew = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => buildInitialState(user?.ward));
  const [loading,  setLoading]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Validation ── */
  const validate = () => {
    const required = [
      "applicantNameBody", "fatherName",
      "applicantName", "applicantAddress", "applicantCitizenship",
      "applicantPhone", "designation",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    const phone = String(formData.applicantPhone).trim();
    if (!/^(\+977)?9[678]\d{8}$/.test(phone))
      return { ok: false, missing: "applicantPhone (invalid)" };
    return { ok: true };
  };

  /* ── Core save ── */
  const saveToServer = async () => {
    const v = validate();
    if (!v.ok) {
      alert("Please fill required field: " + v.missing);
      return false;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/forms/occupation-verification-new",
        { ...formData }
      );
      alert("Saved successfully (id: " + res.data.id + ")");
      return true;
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.message || err.message || "Failed to save");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ── Submit (save only) ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveToServer();
  };

  /* ── FIX: same double-print bug as other English forms ── */
  const handlePrint = async () => {
    const saved = await saveToServer();
    if (saved) setTimeout(() => window.print(), 300);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="ovn-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Header ── */}
        <div className="ovn-header">
          <MunicipalityHeader showLogo english />
        </div>

        {/* ── Letter No / Date ── */}
        <div className="ovn-form-row">
          <div className="ovn-form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="ovn-form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        {/* ── Ref No ── */}
        <div className="ovn-form-row">
          <div className="ovn-form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="ovn-subject">
          <strong>Subject: <u>OCCUPATION VERIFICATION CERTIFICATE</u></strong><br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        {/* ── Body ── */}
        <p className="ovn-body">
          This is to certify that{" "}
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option value="Master.">Master.</option>
            <option value="Mr.">Mr.</option>
            <option value="Miss.">Miss.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />
          ,{" "}
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option value="son">son</option>
            <option value="daughter">daughter</option>
          </select>
          {" "}of{" "}
          <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}>
            <option value="Master.">Master.</option>
            <option value="Mr.">Mr.</option>
          </select>
          <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />
          ,{" "}
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}>
            <option value="permanent">permanent</option>
            <option value="temporary">temporary</option>
          </select>
          {" "}resident of{" "}
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option value={MUNICIPALITY.englishMunicipality || ""}>{MUNICIPALITY.englishMunicipality || ""}</option>
          </select>
          , Ward No.{" "}
          {/* FIX: was hardcoded <select> 1–7 — replaced with free-text input */}
          <input type="text" name="wardNo" value={formData.wardNo} onChange={handleChange} style={{ width: 50 }} />
          , (Previously:{" "}
          <input type="text" name="prevAddress1" placeholder="Address" value={formData.prevAddress1} onChange={handleChange} />
          {" "}Ward No.{" "}
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} />
          ),{" "}
          <input type="text" name="prevAddress2" placeholder="Address" value={formData.prevAddress2} onChange={handleChange} />
          ,{" "}
          <select name="prevProvince" value={formData.prevProvince} onChange={handleChange}>
            <option value={MUNICIPALITY.englishProvince || ""}>{MUNICIPALITY.englishProvince || "Bagmati Province"}</option>
            <option value="Koshi Province">Koshi Province</option>
          </select>
          ,{" "}
          <select name="prevCountry" value={formData.prevCountry} onChange={handleChange}>
            <option value="Nepal">Nepal</option>
          </select>
        </p>

        {/* ── Description textarea ── */}
        <div className="ovn-body">
          <div className="ovn-textarea-wrapper">
            <textarea
              name="description"
              placeholder="is a respected person as well as one of the renowned farmer ..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
        </div>

        {/* ── Designation ── */}
        <div className="ovn-designation">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        {/* ── Applicant Details ── */}
        {/* FIX: ApplicantDetailsEn was used but never imported — added import at top */}
        <ApplicantDetailsEn formData={formData} handleChange={handleChange} />

        {/* ── Submit / Print ── */}
        <div className="ovn-submit-area">
          <button type="submit" className="ovn-submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Record"}
          </button>
          <button type="button" className="ovn-submit-btn" onClick={handlePrint} disabled={loading}>
            {loading ? "Saving..." : "Save and Print Record"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default OccupationVerificationNew;