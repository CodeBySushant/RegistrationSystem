// src/pages/english-format/new/VerifyRevisedEmblem.jsx
import React, { useState } from "react";
import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import ApplicantDetailsEn from "../../../components/ApplicantDetailsEn";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from VerifyRevisedEmblem.css)
   All classes prefixed with "vre-" to avoid global collisions.

   NOTE: No bare body/global rules in the original — clean.
   Generic .applicant-details-box / .details-grid etc. scoped via
   .vre-container selector instead of bare globals.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .vre-container {
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
  .vre-header { text-align: center; margin-bottom: 20px; color: #8B0000; }
  .vre-header .logo { width: 80px; margin-bottom: 10px; }
  .vre-header h1 { margin: 0; font-size: 24px; }
  .vre-header h2 { margin: 5px 0; font-size: 20px; }
  .vre-header h3 { margin: 0; font-size: 18px; }

  /* ── Form rows ── */
  .vre-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  .vre-form-group {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 10px;
  }
  .vre-form-group label { font-weight: bold; margin-right: 8px; }
  .vre-form-group input {
    width: 200px;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Subject ── */
  .vre-subject { text-align: center; margin: 25px 0; font-size: 16px; }

  /* ── Certificate body ── */
  .vre-body { line-height: 2.8; font-size: 16px; text-align: justify; }
  .vre-body input[type="text"],
  .vre-body select {
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
  .vre-body select { width: auto; min-width: 80px; }

  /* Specific widths */
  .vre-body input[name="billName"],
  .vre-body input[name="amendmentName"],
  .vre-body input[name="mapLocation"],
  .vre-body input[name="villageName"],
  .vre-body input[name="stampMunicipality"],
  .vre-body input[name="provinceNameLetterhead"],
  .vre-body input[name="provinceNameStamp"] { width: 150px; }
  .vre-body input[name="stampWardNo"],
  .vre-body input[name="stampWardNo2"] { width: 80px; }

  /* ── Designation ── */
  .vre-designation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 40px;
    margin-right: 20px;
  }
  .vre-designation input {
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
  .vre-designation select {
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
  .vre-container .vre-applicant-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.6);
    margin-top: 20px;
    border-radius: 4px;
  }
  .vre-container .vre-applicant-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .vre-container .vre-details-grid {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .vre-detail-group { display: flex; flex-direction: column; }
  .vre-detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .vre-detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #eef2f5;
    font-family: inherit;
  }

  /* ── Required star ── */
  .vre-required { color: red; margin-left: 4px; }

  /* ── Submit ── */
  .vre-submit-area { text-align: center; margin-top: 30px; }
  .vre-submit-btn {
    background-color: #343a40;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: inherit;
  }
  .vre-submit-btn:hover:not(:disabled) { background-color: #23272b; }
  .vre-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .vre-container,
    .vre-container * { visibility: visible; }
    .vre-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0; padding: 20px;
      background: white !important;
      background-image: none !important;
    }
    .vre-submit-area { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letterNo: "1970/60",
  refNo: "",
  date: new Date().toISOString().slice(0, 10),
  billName: "",
  amendmentName: "",
  mapLocation: "",
  villageName: "",
  stampMunicipality: MUNICIPALITY.englishMunicipality || "",
  stampWardNo: "",
  provinceNameLetterhead: "",
  provinceNameStamp: MUNICIPALITY.englishProvince || "",
  stampWardNo2: "",
  wardOfficeName1: "",
  wardOfficeName2: "",
  designation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const VerifyRevisedEmblem = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ── Validation ── */
  const validate = () => {
    const required = [
      "billName",
      "amendmentName",
      "mapLocation",
      "villageName",
      "stampMunicipality",
      "stampWardNo",
      "provinceNameLetterhead",
      "provinceNameStamp",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone)))
      return { ok: false, missing: "applicantPhone (invalid)" };
    return { ok: true };
  };

  /* ── Core save (no print) ── */
  const saveToServer = async () => {
    const v = validate();
    if (!v.ok) {
      alert("Please fill required field: " + v.missing);
      return false;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/verify-revised-emblem", {
        ...formData,
      });
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

  /* ── FIX: original handlePrint called handleSubmit (which already called
     window.print()) and then called window.print() again — double-print.
     Now save once, then print once if save succeeded. ── */
  const handlePrint = async () => {
    const saved = await saveToServer();
    if (saved) {
      setTimeout(() => window.print(), 300);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="vre-container">
      <style>{STYLES}</style>

      <form onSubmit={handleSubmit}>
        {/* ── Header ── */}
        <div className="vre-header">
          <MunicipalityHeader showLogo english />
        </div>

        {/* ── Letter No / Date ── */}
        <div className="vre-form-row">
          <div className="vre-form-group">
            <label>Letter No.:</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
          </div>
          <div className="vre-form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Ref No ── */}
        <div className="vre-form-row">
          <div className="vre-form-group">
            <label>Ref No.:</label>
            <input
              type="text"
              name="refNo"
              value={formData.refNo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="vre-subject">
          <strong>
            Subject: <u>Verification Revise Emblem</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        {/* ── Body ── */}
        <p className="vre-body">
          This certificate is issued to certify that The House of
          Representatives (HOR) has unanimously passed the government's
          constitution (2nd Amendment) Bill,{" "}
          <input
            type="text"
            name="billName"
            value={formData.billName}
            onChange={handleChange}
            required
          />{" "}
          , which seeks to amend{" "}
          <input
            type="text"
            name="amendmentName"
            value={formData.amendmentName}
            onChange={handleChange}
            required
          />{" "}
          of the constitution to update the national map by incorporating{" "}
          <input
            type="text"
            name="mapLocation"
            value={formData.mapLocation}
            onChange={handleChange}
            required
          />
          .<br />
          Although we have already changed the emblem of Nepal on the
          letterhead, due to inconvenience we are not yet able to change the
          emblem imprinted on the Stamp of our Ward Office. We are sorry for the
          inconvenience and will revice the imprinted emblem of Nepal on Stamp
          of our Ward Office as we get favorable condition.
          <br />
          Furthermore, the village name &ldquo;
          <input
            type="text"
            name="villageName"
            value={formData.villageName}
            onChange={handleChange}
            required
          />
          &rdquo; is written in Nepali font only on the letterhead and not on
          the stamp of this{" "}
          <input
            type="text"
            name="stampMunicipality"
            value={formData.stampMunicipality}
            onChange={handleChange}
            required
          />{" "}
          , Ward No.{" "}
          <input
            type="text"
            name="stampWardNo"
            value={formData.stampWardNo}
            onChange={handleChange}
            required
          />{" "}
          but both are genuine.
          <br />
          Note: The province name is written as &ldquo;
          <input
            type="text"
            name="provinceNameLetterhead"
            value={formData.provinceNameLetterhead}
            onChange={handleChange}
            required
          />
          &rdquo; in the letterhead and as &ldquo;
          <input
            type="text"
            name="provinceNameStamp"
            value={formData.provinceNameStamp}
            onChange={handleChange}
            required
          />
          &rdquo; on the stamp of this Ward Office (Ward No.{" "}
          <input
            type="text"
            name="stampWardNo2"
            value={formData.stampWardNo2}
            onChange={handleChange}
            required
          />
          ). Both refer to the same province.
          <br />
          We would to ratify and apologize for the inconvenience caused by this
          matter, please feel free to contact us for further information
          required in this regard.
        </p>

        {/* ── Designation ── */}
        <div className="vre-designation">
          <input type="text" placeholder="Signature" disabled />
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        {/* Applicant details — using ApplicantDetailsEn */}
        <ApplicantDetailsEn formData={formData} handleChange={handleChange} />

        {/* ── Submit / Print ── */}
        <div className="vre-submit-area">
          <button type="submit" className="vre-submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Record"}
          </button>{" "}
          <button
            type="button"
            className="vre-submit-btn"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save and Print Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyRevisedEmblem;
