// src/pages/english-format/new/SurnameVerificationCertificateNew.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import ApplicantDetailsEn from "../../../components/ApplicantDetailsEn";

const FORM_KEY = "surname-verification-certificate-new";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.surname-verification-new-container {
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
.svn-header { text-align: center; margin-bottom: 20px; color: #8B0000; }
.svn-header .svn-logo { width: 80px; margin-bottom: 10px; }
.svn-header h1 { margin: 0; font-size: 24px; }
.svn-header h2 { margin: 5px 0; font-size: 20px; }
.svn-header h3 { margin: 0; font-size: 18px; }
.svn-header .svn-municipality { font-size: 1.4rem; font-weight: bold; }
.svn-header .svn-ward         { font-size: 1.1rem; }
.svn-header .svn-sub          { font-size: 0.95rem; }

/* ── Form rows ── */
.form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
.form-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 10px;
}
.form-group label { font-weight: bold; margin-right: 8px; }
.form-group input {
  width: 200px;
  max-width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
}
.form-group input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.12); }

/* ── Subject ── */
.subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

/* ── Certificate body ── */
.certificate-body { line-height: 2.8; font-size: 16px; text-align: justify; }
.certificate-body input[type="text"],
.certificate-body select {
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
.certificate-body input[type="text"]:focus,
.certificate-body select:focus { outline: none; border-bottom-color: #2563eb; }
.certificate-body select { width: auto; min-width: 80px; }
.certificate-body input[name="applicantNameBody"],
.certificate-body input[name="applicantNameAgain"],
.certificate-body input[name="fatherName"] { width: 180px; }
.certificate-body input[name="surnameContext"] { width: 50px; }

/* ── Designation ── */
.designation-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 40px;
  margin-right: 20px;
}
.designation-section input {
  width: 220px; max-width: 100%;
  border: none; border-bottom: 1px solid #000;
  margin-bottom: 5px; text-align: center;
  background: transparent; box-sizing: border-box;
  font-family: inherit;
}
.designation-section select {
  width: 220px; max-width: 100%;
  padding: 5px; border: 1px solid #ccc;
  border-radius: 4px; text-align: center;
  box-sizing: border-box; font-family: inherit;
}
.designation-section select:focus { outline: none; border-color: #2563eb; }

/* ── Applicant details box ── */
.surname-verification-new-container .applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 20px;
  border-radius: 4px;
}
.surname-verification-new-container .applicant-details-box h3 {
  color: #777; font-size: 1.1rem; margin: 0 0 15px 0;
  border-bottom: 1px solid #eee; padding-bottom: 8px;
  font-family: 'Times New Roman', Times, serif;
}
.surname-verification-new-container .details-grid {
  display: flex !important; flex-direction: column !important; gap: 18px !important;
}
.surname-verification-new-container .detail-group { display: flex; flex-direction: column; }
.surname-verification-new-container .detail-group label {
  font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
}
.surname-verification-new-container .detail-input {
  border: 1px solid #ddd; padding: 8px; border-radius: 4px;
  width: 100%; max-width: 400px; box-sizing: border-box;
  font-family: inherit; font-size: 0.95rem;
}
.surname-verification-new-container .detail-input:focus {
  outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.svn-toast {
  position: fixed; top: 20px; right: 24px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 6px; font-size: 0.92rem;
  font-family: 'Times New Roman', serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: svn-toast-in 0.25s ease; max-width: 360px;
}
.svn-toast--success { background: #1a7f3c; color: #fff; }
.svn-toast--error   { background: #c0392b; color: #fff; }
@keyframes svn-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Submit ── */
.submit-area { text-align: center; margin-top: 30px; }
.submit-btn {
  background-color: #343a40; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold;
  font-family: inherit; transition: background 0.15s;
}
.submit-btn:hover:not(:disabled) { background-color: #23272b; }
.submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .surname-verification-new-container { padding: 14px; }
  .form-row { flex-direction: column; }
  .svn-toast { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .surname-verification-new-container,
  .surname-verification-new-container * { visibility: visible; }
  .surname-verification-new-container {
    position: absolute; left: 0; top: 0;
    width: 100%; box-shadow: none; border: none;
    margin: 0; padding: 10mm 14mm; background: white;
  }
  .submit-area, .svn-toast { display: none !important; }
  input, select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const INITIAL_FORM = (user) => ({
  letterNo:             "1970/60",
  refNo:                "",
  date:                 new Date().toISOString().slice(0, 10),
  applicantTitle:       "Mr.",
  applicantNameBody:    "",
  surname1:             "",
  applicantNameAgain:   "",
  surname2:             "",
  surnameContext:       "",
  fatherName:           "",
  surname3:             "",
  surname4:             "",
  relationship:         "son",
  municipality:         MUNICIPALITY.englishName || MUNICIPALITY.name || "",
  wardNo:               user?.ward?.toString() || "",
  district:             MUNICIPALITY.englishDistrict || MUNICIPALITY.city || "",
  province:             MUNICIPALITY.englishProvince || "",
  country:              "Nepal",
  designation:          "",
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
});

const validate = (formData) => {
  const required = [
    "applicantNameBody","surname1","applicantNameAgain","surname2",
    "fatherName","surname3","surname4",
    "applicantName","applicantAddress","applicantCitizenship","applicantPhone","designation",
  ];
  for (const k of required) {
    if (!formData[k] || String(formData[k]).trim() === "")
      return `Please fill required field: ${k}`;
  }
  if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone)))
    return "Please enter a valid phone number.";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const SurnameVerificationCertificateNew = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState(() => INITIAL_FORM(user));
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "All Ward Offices"
      : `Ward No. ${user?.ward || MUNICIPALITY.wardNumber || "1"} Ward Office`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(formData);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axiosInstance.post(API_URL, formData);
      showToast("success", `Saved successfully (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setFormData(INITIAL_FORM(user));
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      showToast("error", err.response?.data?.message || err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="surname-verification-new-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`svn-toast svn-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* English letterhead — no MunicipalityHeader component needed */}
        <div className="svn-header">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" className="svn-logo" />
          <div className="svn-municipality">{MUNICIPALITY.englishName || MUNICIPALITY.name}</div>
          <div className="svn-ward">{wardLabel}</div>
          <div className="svn-sub">
            {MUNICIPALITY.officeLine} | {MUNICIPALITY.provinceLine}
          </div>
        </div>

        {/* Ref row */}
        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        {/* Subject */}
        <div className="subject-line">
          <strong>Subject: <u>Surname Verification Certificate</u></strong><br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        {/* Body */}
        <p className="certificate-body">
          As per the application submitted by{" "}
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="applicantNameBody"  value={formData.applicantNameBody}  onChange={handleChange} required />,{" "}
          to verify the family surname and this is verified that "
          <input type="text" name="surname1"           value={formData.surname1}           onChange={handleChange} required />{" "}
          " in the name of{" "}
          <input type="text" name="applicantNameAgain" value={formData.applicantNameAgain} onChange={handleChange} required />{" "}
          and there is "
          <input type="text" name="surname2"           value={formData.surname2}           onChange={handleChange} required />{" "}
          " in father's surname,{" "}
          <input type="text" name="surnameContext"     value={formData.surnameContext}     onChange={handleChange} required />{" "}
          "
          <input type="text" name="fatherName"         value={formData.fatherName}         onChange={handleChange} required />{" "}
          ". However, it is verified that "
          <input type="text" name="surname3"           value={formData.surname3}           onChange={handleChange} required />{" "}
          " and "
          <input type="text" name="surname4"           value={formData.surname4}           onChange={handleChange} required />{" "}
          " are similar surnames and they are father and{" "}
          <select name="relationship" value={formData.relationship} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          . It is requested to forward document without any hesitation.
        </p>

        {/* Designation */}
        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        {/* Applicant details — using ApplicantDetailsEn */}
        <ApplicantDetailsEn formData={formData} handleChange={handleChange} />

        {/* Submit */}
        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save and Print Record"}
          </button>
        </div>

      </form>
    </>
  );
};

export default SurnameVerificationCertificateNew;