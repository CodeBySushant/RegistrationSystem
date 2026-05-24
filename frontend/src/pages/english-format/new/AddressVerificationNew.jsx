// src/pages/english-format/new/AddressVerificationNew.jsx
import React, { useState } from "react";
import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import ApplicantDetailsEn from "../../../components/ApplicantDetailsEn.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from AddressVerificationNew.css)
   All classes prefixed with "avn-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .avn-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 25px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: 'Times New Roman', Times, serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .avn-header { text-align: center; margin-bottom: 20px; color: #8B0000; }
  .avn-header .logo { width: 80px; margin-bottom: 10px; }
  .avn-header h1 { margin: 0; font-size: 24px; }
  .avn-header h2 { margin: 5px 0; font-size: 20px; }
  .avn-header h3 { margin: 0; font-size: 18px; }

  /* ── Form rows ── */
  .avn-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  .avn-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .avn-form-group label { font-weight: bold; margin-right: 8px; }
  .avn-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Subject ── */
  .avn-subject { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .avn-body { line-height: 2.8; font-size: 16px; text-align: justify; }
  .avn-body input[type="text"],
  .avn-body select {
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
  .avn-body select { width: auto; min-width: 80px; }

  /* Specific widths */
  .avn-body input[name="applicantNameBody"],
  .avn-body input[name="oldMunicipality"],
  .avn-body input[name="newMunicipality"],
  .avn-body input[name="decisionSource"],
  .avn-body input[name="finalAddress1"],
  .avn-body input[name="finalAddress2"] { width: 180px; }
  .avn-body input[name="oldWardNo"],
  .avn-body input[name="newWardNo"],
  .avn-body input[name="finalWardNo"]   { width:  80px; }

  /* ── Designation ── */
  .avn-designation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 40px;
    margin-right: 20px;
  }
  .avn-designation input {
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
  .avn-designation select {
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
  .avn-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.6);
    margin-top: 20px;
    border-radius: 4px;
  }
  .avn-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .avn-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .avn-container .detail-group { display: flex; flex-direction: column; }
  .avn-container .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .avn-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Required ── */
  .avn-required { color: red; margin-left: 4px; }

  /* ── Submit ── */
  .avn-submit-area { text-align: center; margin-top: 30px; }
  .avn-submit-btn {
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
  .avn-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .avn-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .avn-container,
    .avn-container * { visibility: visible; }
    .avn-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0; padding: 20px;
      background: white !important;
      background-image: none !important;
    }
    .avn-submit-area { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const buildInitialState = (ward) => ({
  letterNo:         "1970/60",
  refNo:            "",
  date:             new Date().toISOString().slice(0, 10),
  applicantNameBody: "",
  oldWardNo:        "",
  oldMunicipality:  MUNICIPALITY.englishMunicipality || "",
  oldProvince:      MUNICIPALITY.englishProvince     || "",
  newMunicipality:  MUNICIPALITY.englishMunicipality || "",
  newWardNo:        ward ? String(ward) : "",
  newProvince:      MUNICIPALITY.englishProvince     || "",
  newCountry:       "Nepal",
  decisionSource:   "Council of Ministry",
  govSource:        "Government of Nepal",
  decisionDate:     "10th March, 2017",
  finalAddress1:    "",
  finalAddress2:    MUNICIPALITY.englishMunicipality || "",
  finalWardNo:      "",
  finalProvince:    MUNICIPALITY.englishProvince     || "",
  finalCountry:     "Nepal",
  designation:      "",
  applicantName:    "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone:   "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const AddressVerificationNew = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(() => buildInitialState(user?.ward));
  const [loading,  setLoading]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ── Validation ── */
  const validate = () => {
    const required = [
      "applicantNameBody", "oldWardNo", "oldMunicipality", "oldProvince",
      "newMunicipality", "newWardNo", "newProvince", "newCountry",
      "decisionSource", "govSource", "decisionDate",
      "finalAddress1", "finalAddress2", "finalWardNo", "finalProvince", "finalCountry",
      "designation", "applicantName", "applicantAddress", "applicantCitizenship", "applicantPhone",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone)))
      return { ok: false, missing: "applicantPhone (invalid format)" };
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
        "/api/forms/address-verification-new",
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

  /* ── FIX: same double-print as other English forms ── */
  const handlePrint = async () => {
    const saved = await saveToServer();
    if (saved) setTimeout(() => window.print(), 300);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="avn-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>

        {/* ── Header ── */}
        <div className="avn-header">
          <MunicipalityHeader showLogo english />
        </div>

        {/* ── Letter No / Date ── */}
        <div className="avn-form-row">
          <div className="avn-form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="avn-form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        {/* ── Ref No ── */}
        <div className="avn-form-row">
          <div className="avn-form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="avn-subject">
          <strong>Subject: <u>VERIFICATION OF ADDRESS</u></strong><br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        {/* ── Body ── */}
        <p className="avn-body">
          This is to certify that{" "}
          <input type="text" name="applicantNameBody" placeholder="Applicant's Name" value={formData.applicantNameBody} onChange={handleChange} required />
          , Ward No.{" "}
          <input type="text" name="oldWardNo"       value={formData.oldWardNo}       onChange={handleChange} required />
          ,{" "}
          <input type="text" name="oldMunicipality" placeholder="Old Municipality/VDC" value={formData.oldMunicipality} onChange={handleChange} required />
          ,{" "}
          <input type="text" name="oldProvince"     value={formData.oldProvince}     onChange={handleChange} required />
          {" "}has been changed into{" "}
          <input type="text" name="newMunicipality" value={formData.newMunicipality} onChange={handleChange} required />
          , Ward No.{" "}
          <input type="text" name="newWardNo"       placeholder="New Ward"     value={formData.newWardNo}    onChange={handleChange} required />
          ,{" "}
          <input type="text" name="newProvince"     placeholder="New Province" value={formData.newProvince}  onChange={handleChange} required />
          ,{" "}
          <input type="text" name="newCountry"      value={formData.newCountry}      onChange={handleChange} required />
          .<br />
          As per the decision of{" "}
          <input type="text" name="decisionSource"  value={formData.decisionSource}  onChange={handleChange} required />
          ,{" "}
          <input type="text" name="govSource"       value={formData.govSource}       onChange={handleChange} required />
          {" "}on{" "}
          <input type="text" name="decisionDate"    value={formData.decisionDate}    onChange={handleChange} required />
          .<br />
          Thus, addresses{" "}
          <input type="text" name="finalAddress1" placeholder="Old Address" value={formData.finalAddress1} onChange={handleChange} required />
          {" "}and{" "}
          <input type="text" name="finalAddress2"  value={formData.finalAddress2}  onChange={handleChange} required />
          , Ward No.{" "}
          <input type="text" name="finalWardNo"    value={formData.finalWardNo}    onChange={handleChange} required />
          ,{" "}
          <input type="text" name="finalProvince"  value={formData.finalProvince}  onChange={handleChange} required />
          ,{" "}
          <input type="text" name="finalCountry"   value={formData.finalCountry}   onChange={handleChange} required />
          {" "}represent the same place.
        </p>

        {/* ── Designation ── */}
        <div className="avn-designation">
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
        <div className="avn-submit-area">
          <button type="submit" className="avn-submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Record"}
          </button>
          <button type="button" className="avn-submit-btn" onClick={handlePrint} disabled={loading}>
            {loading ? "Saving..." : "Save and Print Record"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddressVerificationNew;