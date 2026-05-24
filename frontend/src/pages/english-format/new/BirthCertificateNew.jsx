// src/pages/english-format/new/BirthCertificateNew.jsx
import React, { useState } from "react";
import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

/* ─────────────────────────────────────────────
   STYLES  (prefix: bcn-)
───────────────────────────────────────────── */
const styles = `
.bcn-container {
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

.bcn-header { text-align: center; margin-bottom: 20px; color: #8B0000; }

.bcn-form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
.bcn-form-group { display: flex; flex-direction: row; align-items: baseline; margin-bottom: 10px; }
.bcn-form-group label { font-weight: bold; margin-right: 8px; }
.bcn-form-group input {
  width: 200px; max-width: 100%; padding: 5px;
  border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;
  font-family: inherit;
}

.bcn-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

.bcn-certificate-body { line-height: 2.8; font-size: 16px; text-align: justify; }
.bcn-certificate-body input[type="text"],
.bcn-certificate-body input[type="date"],
.bcn-certificate-body select {
  display: inline-block; vertical-align: baseline;
  padding: 4px 6px; font-family: inherit; font-size: 15px;
  background-color: transparent; border: none;
  border-bottom: 1px dotted #000; margin: 0 5px;
  width: 120px; max-width: 100%; box-sizing: border-box;
}
.bcn-certificate-body select { width: auto; min-width: 80px; }
.bcn-dob-input { width: 80px !important; }

.bcn-image-box-container { display: flex; flex-direction: column; align-items: center; margin: 20px 0; }
.bcn-image-box { width: 150px; height: 180px; border: 1px solid #000; background-color: #fff; margin-bottom: 5px; }
.bcn-image-box-container select { padding: 4px 6px; font-family: inherit; font-size: 15px; border: 1px solid #ccc; border-radius: 4px; }

.bcn-final-text { font-size: 14px; line-height: 1.6; text-align: justify; margin-top: 20px; }

.bcn-designation-section { display: flex; flex-direction: column; align-items: flex-end; margin-top: 40px; margin-right: 20px; }
.bcn-designation-section input {
  width: 220px; max-width: 100%;
  border: none; border-bottom: 1px solid #000;
  margin-bottom: 5px; text-align: center;
  background: transparent; box-sizing: border-box;
}
.bcn-designation-section select { width: 220px; max-width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-family: inherit; }

/* Applicant details box (inline — no ApplicantDetailsEn component) */
.bcn-applicant-box {
  border: 1px solid #ddd; padding: 20px;
  background-color: rgba(255,255,255,0.6);
  margin-top: 20px; border-radius: 4px;
}
.bcn-applicant-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.bcn-details-grid { display: flex; flex-direction: column; gap: 18px; }
.bcn-detail-group { display: flex; flex-direction: column; }
.bcn-detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.bcn-detail-input {
  border: 1px solid #ddd; padding: 8px; border-radius: 4px;
  width: 100%; max-width: 400px; box-sizing: border-box;
  background-color: #eef2f5; font-family: inherit; font-size: 1rem;
}
.bcn-required { color: red; margin-left: 4px; }

.bcn-submit-area { text-align: center; margin-top: 30px; }
.bcn-submit-btn {
  background-color: #343a40; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold; font-family: inherit;
}
.bcn-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.bcn-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .bcn-container, .bcn-container * { visibility: visible; }
  .bcn-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 0;
    background: white !important; background-image: none !important;
  }
  .bcn-submit-area { display: none; }
  input, select {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .bcn-container { width: 100%; padding: 15px; }
  .bcn-form-row { flex-direction: column; }
  .bcn-certificate-body input[type="text"],
  .bcn-certificate-body select { width: 90px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const BirthCertificateNew = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    letterNo:             "1970/60",
    refNo:                "",
    date:                 new Date().toISOString().slice(0, 10),
    childTitle:           "Master.",
    childName:            "",
    relation:             "son",
    fatherTitle:          "Master.",
    fatherName:           "",
    motherTitle:          "Mrs.",
    motherName:           "",
    municipality:         MUNICIPALITY.englishMunicipality || "",
    wardNo:               user?.ward?.toString()           || "",
    prevAddress1:         "",
    prevWardNo:           "",
    prevAddress2:         "",
    prevProvince:         MUNICIPALITY.englishProvince     || "",
    prevCountry:          "Nepal",
    dobBS:                "",
    dobAD:                "",
    birthMunicipality:    MUNICIPALITY.englishMunicipality || "",
    birthWardNo:          MUNICIPALITY.wardNumber          || "1",
    birthPrevAddress1:    "",
    birthPrevWardNo:      "",
    birthPrevAddress2:    "",
    birthPrevProvince:    MUNICIPALITY.englishProvince     || "",
    birthPrevCountry:     "Nepal",
    recordLocation:       `this ${MUNICIPALITY.englishMunicipality || ""}`,
    recordWardNo:         MUNICIPALITY.wardNumber          || "1",
    recordOffice:         "No. ward Office",
    imageBoxTitle:        "Master.",
    designation:          "",
    applicantName:        "",
    applicantAddress:     "",
    applicantCitizenship: "",
    applicantPhone:       "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = [
      "childName", "fatherName", "motherName", "designation",
      "applicantName", "applicantAddress", "applicantCitizenship", "applicantPhone",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return "Please fill required field: " + k;
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone)))
      return "Invalid phone number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert(err); return; }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/forms/birth-certificate-new",
        { ...formData },
      );
      alert("Saved successfully (id: " + res.data.id + ")");
      window.print();
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.message || err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const wardOptions = ["1","2","3","4","5","6","7"];

  return (
    <>
      <style>{styles}</style>

      <div className="bcn-container">
        <form onSubmit={handleSubmit}>

          {/* ── Header ── */}
          <div className="bcn-header">
            <MunicipalityHeader showLogo english />
          </div>

          {/* ── Letter No / Date ── */}
          <div className="bcn-form-row">
            <div className="bcn-form-group">
              <label>Letter No.:</label>
              <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
            </div>
            <div className="bcn-form-group">
              <label>Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          {/* ── Ref No ── */}
          <div className="bcn-form-row">
            <div className="bcn-form-group">
              <label>Ref No.:</label>
              <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="bcn-subject-line">
            <strong>Subject: <u>BIRTH CERTIFICATE</u></strong>
            <br />
            <strong><u>TO WHOM IT MAY CONCERN</u></strong>
          </div>

          {/* ── Certificate body ── */}
          <p className="bcn-certificate-body">
            This is to certify that
            <select name="childTitle" value={formData.childTitle} onChange={handleChange}>
              <option>Master.</option><option>Mr.</option><option>Miss.</option>
            </select>
            <input type="text" name="childName" placeholder="Child's Name" value={formData.childName} onChange={handleChange} required />{" "},
            <select name="relation" value={formData.relation} onChange={handleChange}>
              <option value="son">son</option>
              <option value="daughter">daughter</option>
            </select>
            of
            <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}>
              <option>Master.</option><option>Mr.</option>
            </select>
            <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />{" "}
            and
            <select name="motherTitle" value={formData.motherTitle} onChange={handleChange}>
              <option>Mrs.</option><option>Ms.</option>
            </select>
            <input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required />{" "}
            of
            <select name="municipality" value={formData.municipality} onChange={handleChange}>
              <option>{MUNICIPALITY.englishMunicipality || "Nagarjun Municipality"}</option>
            </select>
            , Ward No.
            <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
              {wardOptions.map((w) => <option key={w}>{w}</option>)}
            </select>{" "}
            (Previously:
            <input type="text" name="prevAddress1" placeholder="Address" value={formData.prevAddress1} onChange={handleChange} />{" "},
            Ward No.
            <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} />{" "}
            ),
            <input type="text" name="prevAddress2" placeholder="Address" value={formData.prevAddress2} onChange={handleChange} />{" "},
            <select name="prevProvince" value={formData.prevProvince} onChange={handleChange}>
              <option>{MUNICIPALITY.englishProvince || "Bagmati Province"}</option>
              <option>Koshi Province</option>
            </select>{" "},
            <select name="prevCountry" value={formData.prevCountry} onChange={handleChange}>
              <option>Nepal</option>
            </select>{" "}
            was born on (
            <input type="text" name="dobBS" placeholder="DOB B.S." value={formData.dobBS} onChange={handleChange} className="bcn-dob-input" />{" "}/
            <input type="date" name="dobAD" value={formData.dobAD} onChange={handleChange} className="bcn-dob-input" />{" "}
            ) at
            <select name="birthMunicipality" value={formData.birthMunicipality} onChange={handleChange}>
              <option>{MUNICIPALITY.englishMunicipality || ""}</option>
            </select>
            , Ward No.
            <select name="birthWardNo" value={formData.birthWardNo} onChange={handleChange}>
              {wardOptions.map((w) => <option key={w}>{w}</option>)}
            </select>{" "}
            (Previously:
            <input type="text" name="birthPrevAddress1" placeholder="Address" value={formData.birthPrevAddress1} onChange={handleChange} />{" "},
            Ward No.
            <input type="text" name="birthPrevWardNo" placeholder="Ward" value={formData.birthPrevWardNo} onChange={handleChange} />{" "}
            ),
            <input type="text" name="birthPrevAddress2" placeholder="Address" value={formData.birthPrevAddress2} onChange={handleChange} />{" "},
            <select name="birthPrevProvince" value={formData.birthPrevProvince} onChange={handleChange}>
              <option>{MUNICIPALITY.englishProvince || ""}</option>
              <option>Koshi Province</option>
            </select>{" "},
            <select name="birthPrevCountry" value={formData.birthPrevCountry} onChange={handleChange}>
              <option>Nepal</option>
            </select>{" "}
            according to the record of
            <input type="text" name="recordLocation" value={formData.recordLocation} onChange={handleChange} />{" "},
            Ward No.
            <input type="text" name="recordWardNo" value={formData.recordWardNo} onChange={handleChange} />{" "}
            <input type="text" name="recordOffice" value={formData.recordOffice} onChange={handleChange} />{" "}
            .
          </p>

          {/* ── Photo box ── */}
          <div className="bcn-image-box-container">
            <div className="bcn-image-box"></div>
            <select name="imageBoxTitle" value={formData.imageBoxTitle} onChange={handleChange}>
              <option>Master.</option><option>Mr.</option><option>Miss.</option>
            </select>
          </div>

          {/* ── Final legal text ── */}
          <p className="bcn-final-text">
            This Birth Certificate is issued according to the local Government
            Operation Act 2074 B.S. (2017 A.D.), Chapter 3, Section 12,
            Sub-section 2, Clause (E-7).
          </p>

          {/* ── Designation ── */}
          <div className="bcn-designation-section">
            <input type="text" placeholder="Signature" disabled />
            <select name="designation" value={formData.designation} onChange={handleChange} required>
              <option value="">Select Designation</option>
              <option value="Ward-Chairperson">Ward Chairperson</option>
              <option value="Ward-Secretary">Ward Secretary</option>
            </select>
          </div>

          {/* ── Applicant details (inline — ApplicantDetailsEn not available) ── */}
          <div className="bcn-applicant-box">
            <h3>Applicant Details</h3>
            <div className="bcn-details-grid">
              <div className="bcn-detail-group">
                <label>Applicant Name<span className="bcn-required">*</span></label>
                <input name="applicantName" type="text" className="bcn-detail-input" value={formData.applicantName} onChange={handleChange} required />
              </div>
              <div className="bcn-detail-group">
                <label>Applicant Address<span className="bcn-required">*</span></label>
                <input name="applicantAddress" type="text" className="bcn-detail-input" value={formData.applicantAddress} onChange={handleChange} required />
              </div>
              <div className="bcn-detail-group">
                <label>Applicant Citizenship Number<span className="bcn-required">*</span></label>
                <input name="applicantCitizenship" type="text" className="bcn-detail-input" value={formData.applicantCitizenship} onChange={handleChange} required />
              </div>
              <div className="bcn-detail-group">
                <label>Applicant Phone Number<span className="bcn-required">*</span></label>
                <input name="applicantPhone" type="text" className="bcn-detail-input" value={formData.applicantPhone} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="bcn-submit-area">
            <button type="submit" className="bcn-submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save and Print Record"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default BirthCertificateNew;