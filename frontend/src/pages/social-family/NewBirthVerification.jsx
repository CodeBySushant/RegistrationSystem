import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from NewBirthVerification.css)
   All classes prefixed with "nbv-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .nbv-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Utility ── */
  .nbv-bold      { font-weight: bold; }
  .nbv-underline { text-decoration: underline; }
  .nbv-bg-gray   { background-color: #f0f0f0; }
  .nbv-en-text   { font-family: sans-serif; font-size: 0.95rem; }
  .nbv-en-label  { font-family: sans-serif; }

  /* ── Top Bar ── */
  .nbv-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .nbv-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .nbv-header { text-align: center; margin-bottom: 20px; position: relative; }
  .nbv-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .nbv-header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #e74c3c;
  }
  .nbv-municipality-name-np { font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .nbv-municipality-name-en { font-size: 1.6rem; margin: 0; font-weight: bold; font-family: sans-serif; }
  .nbv-ward-title-np { font-size: 1.4rem; margin: 5px 0; font-weight: bold; }
  .nbv-ward-title-en { font-size: 1.2rem; font-family: sans-serif; }
  .nbv-address-text-np,
  .nbv-province-text-np { margin: 0; font-size: 1rem; }
  .nbv-address-text-en,
  .nbv-province-text-en { font-family: sans-serif; }
  .nbv-country-text { margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .nbv-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .nbv-meta-left p, .nbv-meta-right p { margin: 5px 0; font-weight: bold; }
  .nbv-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nbv-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nbv-small-input  { width: 150px; }
  .nbv-tiny-input   { width: 100px; }
  .nbv-medium-input { width: 200px; }
  .nbv-inline-select {
    border: 1px solid #ccc;
    background: #fff;
    padding: 2px;
    margin: 0 5px;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Main title ── */
  .nbv-main-title {
    text-align: center;
    margin: 20px 0;
    color: #34495e;
  }
  .nbv-main-title h3 {
    border-bottom: 1px solid #ccc;
    display: inline-block;
    padding-bottom: 5px;
  }

  /* ── Intro paragraph ── */
  .nbv-intro { margin-bottom: 20px; text-align: justify; line-height: 1.8; }
  .nbv-intro p { margin-bottom: 10px; }

  /* ── Table ── */
  .nbv-table-container { margin-bottom: 30px; }
  .nbv-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #000;
  }
  .nbv-table td {
    border: 1px solid #000;
    padding: 8px;
    vertical-align: middle;
  }
  .nbv-label-cell {
    width: 25%;
    font-weight: bold;
    background-color: #f9f9f9;
  }
  .nbv-input-cell {
    width: 75%;
    background-color: #fff;
  }
  .nbv-section-header { vertical-align: middle; }
  .nbv-table-input {
    width: 98%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .nbv-table-select {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  .nbv-medium-select { width: auto; border: 1px solid #ccc; margin-right: 10px; font-family: inherit; }

  /* Address grids */
  .nbv-address-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }
  .nbv-address-grid-5 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
  }
  .nbv-address-grid input,
  .nbv-address-grid-5 input,
  .nbv-address-grid select,
  .nbv-address-grid-5 select {
    border-bottom: 1px dashed #ccc;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    background: transparent;
    width: 100%;
  }

  /* Flex cells */
  .nbv-flex-cell { display: flex; align-items: center; gap: 10px; }
  .nbv-flex-row  { display: flex; align-items: center; }
  .nbv-sub-label { white-space: nowrap; margin-right: 10px; font-weight: bold; }

  /* ── Signature ── */
  .nbv-signature-section {
    display: flex;
    justify-content: flex-start;
    margin-top: 40px;
    margin-bottom: 30px;
    border-top: 1px dotted #000;
    width: 250px;
    padding-top: 10px;
  }
  .nbv-signature-block { width: 100%; text-align: center; }
  .nbv-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    margin-bottom: 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .nbv-sig-name-input {
    width: 100%;
    border: none;
    border-bottom: 1px dotted #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── Footer ── */
  .nbv-footer { text-align: center; margin-top: 40px; }
  .nbv-save-print-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .nbv-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
  .nbv-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .nbv-copyright {
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
    .nbv-container, .nbv-container * { visibility: visible; }
    .nbv-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .nbv-top-bar, .nbv-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:              "२०८२/८३",
  ref_no:                 "",
  date_bs:                "",
  applicant_prefix:       "Mr.",
  applicant_name:         "",
  subject_person_prefix:  "Mr.",
  subject_person_name:    "",
  full_name_np:           "",
  full_name_en:           "",
  dob_bs:                 "",
  dob_ad:                 "",
  sex:                    "Male",
  perm_province:          "",
  perm_district:          "",
  perm_palika:            "",
  perm_ward:              "",
  perm_palika_en:         "",
  perm_ward_en:           "",
  birth_province:         "",
  birth_district:         "",
  birth_palika:           "",
  birth_ward:             "",
  birth_place_name:       "",
  birth_palika_en:        "",
  birth_ward_en:          "",
  father_full_name_np:    "",
  father_full_name_en:    "",
  father_document_type:   "",
  father_document_no:     "",
  mother_full_name_np:    "",
  mother_full_name_en:    "",
  mother_document_type:   "",
  mother_document_no:     "",
  signatory_designation:  "",
  signatory_name:         "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const NewBirthVerification = () => {
  // FIX: useWardForm + setField were used without being imported.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/new-birth-verification", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/new-birth-verification", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form className="nbv-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="nbv-top-bar">
          जन्ममिति प्रमाणित ।
          <span className="nbv-breadcrumb">
            सामाजिक / पारिवारिक &gt; जन्म मिति प्रमाणित
          </span>
        </div>

        {/* ── Bilingual Header ── */}
        <div className="nbv-header">
          <div className="nbv-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="nbv-header-text">
            <h1 className="nbv-municipality-name-np">{MUNICIPALITY.name}</h1>
            <h2 className="nbv-municipality-name-en">{MUNICIPALITY.nameEn ?? "Nagarjun Municipality"}</h2>
            <h3 className="nbv-ward-title-np">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || "१"} नं वडा कार्यालय`}{" "}
              <span className="nbv-ward-title-en">
                ({user?.role === "SUPERADMIN" ? "All Ward Offices" : `${user?.ward || "1"} No. Ward Office`})
              </span>
            </h3>
            <p className="nbv-address-text-np">
              {MUNICIPALITY.officeLine}{" "}
              <span className="nbv-address-text-en">({MUNICIPALITY.officeLineEn ?? "Kathmandu District"})</span>
            </p>
            <p className="nbv-province-text-np">
              {MUNICIPALITY.provinceLine}{" "}
              <span className="nbv-province-text-en">({MUNICIPALITY.provinceLineEn ?? "Bagmati Province"})</span>
            </p>
            <p className="nbv-country-text">नेपाल (Nepal)</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="nbv-meta-row">
          <div className="nbv-meta-left">
            <p>Letter No. : <span className="nbv-bold">{form.letter_no}</span></p>
            <p>
              Ref No.:{" "}
              <input
                name="ref_no"
                value={form.ref_no}
                onChange={handleChange}
                className="nbv-dotted-input nbv-small-input"
              />
            </p>
          </div>
          <div className="nbv-meta-right">
            <p>
              Date :{" "}
              <input
                name="date_bs"
                value={form.date_bs}
                onChange={handleChange}
                className="nbv-line-input nbv-tiny-input"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Main Title ── */}
        <div className="nbv-main-title">
          <h3>जन्म प्रमाणीकरण (Birth Verification)</h3>
        </div>

        {/* ── Intro ── */}
        <div className="nbv-intro">
          <p>
            श्री{" "}
            <select name="applicant_prefix" value={form.applicant_prefix} onChange={handleChange} className="nbv-inline-select">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="nbv-line-input nbv-medium-input" />
            {" "}ले दिएको निवेदन अनुसार श्री
            <select name="subject_person_prefix" value={form.subject_person_prefix} onChange={handleChange} className="nbv-inline-select">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
            <input name="subject_person_name" value={form.subject_person_name} onChange={handleChange} className="nbv-line-input nbv-medium-input" />
            {" "}को देहाय बमोजिम जन्मको विवरण रहेको प्रमाणित गरिन्छ।
          </p>
          <p className="nbv-en-text">
            (According to the application given by{" "}
            <select name="applicant_prefix" value={form.applicant_prefix} onChange={handleChange} className="nbv-inline-select">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="nbv-line-input nbv-medium-input" />
            , it is verified that the birth of{" "}
            <select name="subject_person_prefix" value={form.subject_person_prefix} onChange={handleChange} className="nbv-inline-select">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
            <input name="subject_person_name" value={form.subject_person_name} onChange={handleChange} className="nbv-line-input nbv-medium-input" />
            {" "}are as follows.)
          </p>
        </div>

        {/* ── Verification Table ── */}
        <div className="nbv-table-container">
          <table className="nbv-table">
            <tbody>
              <tr>
                <td className="nbv-label-cell">पूरा नाम:</td>
                <td className="nbv-input-cell">
                  <input name="full_name_np" value={form.full_name_np} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
              <tr>
                <td className="nbv-label-cell nbv-en-label">Full Name:</td>
                <td className="nbv-input-cell">
                  <input name="full_name_en" value={form.full_name_en} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
              <tr>
                <td className="nbv-label-cell">जन्म मिति/Date of Birth:</td>
                <td className="nbv-input-cell nbv-flex-cell">
                  <input name="dob_bs" value={form.dob_bs} onChange={handleChange} className="nbv-table-input nbv-medium-input" placeholder="B.S." />
                  <span className="nbv-bold">(B.S.) /</span>
                  <input name="dob_ad" value={form.dob_ad} onChange={handleChange} className="nbv-table-input nbv-medium-input" />
                  <span className="nbv-bold">(A.D.)</span>
                </td>
              </tr>
              <tr>
                <td className="nbv-label-cell">लिङ्ग/Sex:</td>
                <td className="nbv-input-cell">
                  <select name="sex" value={form.sex} onChange={handleChange} className="nbv-table-select">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>

              {/* Permanent Address */}
              <tr>
                <td className="nbv-label-cell">स्थायी ठेगाना :</td>
                <td className="nbv-input-cell nbv-address-grid">
                  <input name="perm_province" value={form.perm_province} onChange={handleChange} placeholder="Province" />
                  <input name="perm_district" value={form.perm_district} onChange={handleChange} placeholder="District" />
                  <input name="perm_palika"   value={form.perm_palika}   onChange={handleChange} placeholder="पालिका" />
                  <input name="perm_ward"     value={form.perm_ward}     onChange={handleChange} placeholder="वडा" />
                </td>
              </tr>
              <tr>
                <td className="nbv-label-cell nbv-en-label">Permanent Address:</td>
                <td className="nbv-input-cell nbv-address-grid">
                  <input name="perm_palika_en" value={form.perm_palika_en} onChange={handleChange} placeholder="Palika" />
                  <input name="perm_ward_en"   value={form.perm_ward_en}   onChange={handleChange} placeholder="Ward No" />
                  <input placeholder="Palika" />
                  <input placeholder="Ward No" />
                </td>
              </tr>

              {/* Birth Place */}
              <tr>
                <td className="nbv-label-cell">जन्म स्थान:</td>
                <td className="nbv-input-cell nbv-address-grid-5">
                  <input name="birth_province"    value={form.birth_province}    onChange={handleChange} placeholder="Province" />
                  <input name="birth_district"    value={form.birth_district}    onChange={handleChange} placeholder="District" />
                  <input name="birth_palika"      value={form.birth_palika}      onChange={handleChange} placeholder="पालिका" />
                  <input name="birth_ward"        value={form.birth_ward}        onChange={handleChange} placeholder="वडा" />
                  <input name="birth_place_name"  value={form.birth_place_name}  onChange={handleChange} placeholder="ठाउँको नाम" />
                </td>
              </tr>
              <tr>
                <td className="nbv-label-cell nbv-en-label">Birth Place:</td>
                <td className="nbv-input-cell nbv-address-grid-5">
                  <input name="birth_palika_en" value={form.birth_palika_en} onChange={handleChange} placeholder="Palika" />
                  <input name="birth_ward_en"   value={form.birth_ward_en}   onChange={handleChange} placeholder="Ward No" />
                  <input placeholder="Palika" />
                  <input placeholder="Ward No" />
                  <input placeholder="Place Name" />
                </td>
              </tr>

              {/* Father's Details */}
              <tr>
                <td rowSpan={3} className="nbv-label-cell nbv-bg-gray nbv-section-header">
                  बाबुको विवरण (Father's Details)
                </td>
                <td className="nbv-input-cell nbv-flex-row">
                  <span className="nbv-sub-label">पूरा नाम:</span>
                  <input name="father_full_name_np" value={form.father_full_name_np} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
              <tr>
                <td className="nbv-input-cell nbv-flex-row">
                  <span className="nbv-sub-label nbv-en-label">Full Name:</span>
                  <input name="father_full_name_en" value={form.father_full_name_en} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
              <tr>
                <td className="nbv-input-cell nbv-flex-row">
                  <span className="nbv-sub-label">परिचय पत्र(Document):</span>
                  <select name="father_document_type" value={form.father_document_type} onChange={handleChange} className="nbv-table-select nbv-medium-select">
                    <option value="">Select Document Type</option>
                  </select>
                  <input name="father_document_no" value={form.father_document_no} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>

              {/* Mother's Details */}
              <tr>
                <td rowSpan={3} className="nbv-label-cell nbv-bg-gray nbv-section-header">
                  आमाको विवरण(Mother's Details)
                </td>
                <td className="nbv-input-cell nbv-flex-row">
                  <span className="nbv-sub-label">पूरा नाम:</span>
                  <input name="mother_full_name_np" value={form.mother_full_name_np} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
              <tr>
                <td className="nbv-input-cell nbv-flex-row">
                  <span className="nbv-sub-label nbv-en-label">Full Name:</span>
                  <input name="mother_full_name_en" value={form.mother_full_name_en} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
              <tr>
                <td className="nbv-input-cell nbv-flex-row">
                  <span className="nbv-sub-label">परिचय पत्र(Document):</span>
                  <select name="mother_document_type" value={form.mother_document_type} onChange={handleChange} className="nbv-table-select nbv-medium-select">
                    <option value="">Select Document Type</option>
                  </select>
                  <input name="mother_document_no" value={form.mother_document_no} onChange={handleChange} className="nbv-table-input" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Signature ── */}
        <div className="nbv-signature-section">
          <div className="nbv-signature-block">
            <select name="signatory_designation" value={form.signatory_designation} onChange={handleChange} className="nbv-designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="nbv-sig-name-input"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="nbv-footer">
          <button
            className="nbv-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="nbv-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default NewBirthVerification;