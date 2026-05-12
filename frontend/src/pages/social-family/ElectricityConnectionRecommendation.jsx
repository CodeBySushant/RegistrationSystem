import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from ElectricityConnectionRecommendation.css)
   All classes prefixed with "ecr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .ecr-container {
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
  .ecr-bold      { font-weight: bold; }
  .ecr-underline { text-decoration: underline; }
  .ecr-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
  .ecr-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .ecr-section-title { font-weight: bold; margin-top: 20px; margin-bottom: 10px; }

  /* ── Top Bar ── */
  .ecr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .ecr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .ecr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .ecr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .ecr-header-text { display: flex; flex-direction: column; align-items: center; }
  .ecr-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .ecr-ward-title   { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .ecr-address-text,
  .ecr-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .ecr-meta-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1rem;
  }
  .ecr-meta-left p, .ecr-meta-right p { margin: 5px 0; }
  .ecr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .ecr-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .ecr-small-input  { width: 120px; }
  .ecr-medium-input { width: 200px; }
  .ecr-long-input   { width: 300px; }
  .ecr-full-width   { width: 100%; margin-bottom: 5px; }

  /* ── Inline inputs / selects ── */
  .ecr-inline-box {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .ecr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    width: 150px;
  }
  .ecr-tiny-box   { width: 40px;  text-align: center; }
  .ecr-small-box  { width: 100px; }
  .ecr-medium-box { width: 180px; }
  .ecr-long-box   { width: 250px; }

  /* ── Addressee ── */
  .ecr-addressee { margin-top: 30px; margin-bottom: 20px; }
  .ecr-addressee-location { margin-top: 5px; }

  /* ── Subject ── */
  .ecr-subject-section {
    text-align: center;
    margin: 30px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* ── Body ── */
  .ecr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .ecr-family-details { margin: 15px 0; }
  .ecr-detail-row { margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap; }
  .ecr-detail-row label { margin-right: 5px; white-space: nowrap; }

  .ecr-boundaries { margin-left: 20px; }
  .ecr-boundary-row { display: flex; margin-bottom: 10px; }
  .ecr-boundary-item { flex: 1; display: flex; align-items: center; gap: 4px; }

  .ecr-declarations { list-style-type: none; padding-left: 0; }
  .ecr-declarations li { margin-bottom: 5px; }

  /* ── Signature ── */
  .ecr-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .ecr-signature-block { width: 220px; text-align: center; position: relative; }
  .ecr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .ecr-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-top: 5px;
  }

  /* ── Applicant details (scoped) ── */
  .ecr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .ecr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .ecr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .ecr-container .detail-group { display: flex; flex-direction: column; }
  .ecr-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .ecr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .ecr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .ecr-footer { text-align: center; margin-top: 40px; }
  .ecr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .ecr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .ecr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ecr-copyright {
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
    .ecr-container, .ecr-container * { visibility: visible; }
    .ecr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .ecr-top-bar, .ecr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
   FIX: original used uncontrolled inputs (defaultValue) throughout the body.
   All fields are now controlled via useWardForm so data is saved correctly.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalani_no:             "",
  addressee_company:      "बुटवल पावर कम्पनी लिमिटेड",
  addressee_location:     "",
  municipality_display:   MUNICIPALITY.name,
  applicant_ward:         "",
  applicant_person:       "",
  family_husband_father:  "",
  family_sasura:          "",
  land_old_unit_type:     "",
  land_old_unit_ward:     "",
  land_kitta_no:          "",
  land_area:              "",
  land_tol:               "",
  bound_east:             "",
  bound_west:             "",
  bound_north:            "",
  bound_south:            "",
  house_type:             "",
  house_floors:           "",
  house_owner_name:       "",
  signatory_name:         "",
  signatory_designation:  "",
  // ApplicantDetailsNp fields
  applicant_name:            "",
  applicant_address:         "",
  applicant_citizenship_no:  "",
  applicant_cit_issued_date: "",
  applicant_nid_no:          "",
  applicant_phone:           "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const ElectricityConnectionRecommendation = () => {
  // FIX: useWardForm was called without being imported; initialState was never defined.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/electricity-connection-recommendation", form);
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
      const res = await axios.post("/api/forms/electricity-connection-recommendation", form);
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

      <form className="ecr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="ecr-top-bar">
          बिजुली जडान सिफारिस ।
          <span className="ecr-breadcrumb">
            भौतिक निर्माण &gt; बिजुली जडान सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="ecr-header">
          <div className="ecr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="ecr-header-text">
            <h1 className="ecr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ecr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="ecr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="ecr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="ecr-meta-row">
          <div className="ecr-meta-left">
            <p>पत्र संख्या : <span className="ecr-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="ecr-dotted-input ecr-small-input"
              />
            </p>
          </div>
          <div className="ecr-meta-right">
            <p>मिति : <span className="ecr-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="ecr-addressee">
          <p className="ecr-bold">
            श्री
            <input
              name="addressee_company"
              value={form.addressee_company}
              onChange={handleChange}
              className="ecr-inline-box ecr-long-box"
            />
          </p>
          <div className="ecr-addressee-location">
            <input
              name="addressee_location"
              value={form.addressee_location}
              onChange={handleChange}
              className="ecr-line-input ecr-medium-input"
            />
            <span>, काठमाडौँ</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="ecr-subject-section">
          <p>विषय: <span className="ecr-underline">बिजुली जडान सिफारिस।</span></p>
        </div>

        {/* ── Body ── */}
        <div className="ecr-body">
          <p>
            त्यहाँ विद्युत शक्ति सप्लाई गर्न आवेदन दिने
            <input
              name="municipality_display"
              value={form.municipality_display}
              onChange={handleChange}
              className="ecr-inline-box ecr-long-box"
            />
            वडा नं.{" "}
            <input
              name="applicant_ward"
              value={form.applicant_ward}
              onChange={handleChange}
              className="ecr-inline-box ecr-tiny-box"
            />
            {" "}बस्ने श्री
            <input
              name="applicant_person"
              value={form.applicant_person}
              onChange={handleChange}
              className="ecr-inline-box ecr-long-box"
            />
            तिन पुस्ते र घर जग्गाको निम्न बमोजिम भएकोले सो घरको विद्युत जडानको
            लागि सिफारिस गरिएको छ ।
          </p>

          <div className="ecr-family-details">
            <div className="ecr-detail-row">
              <label>पति/पिता को नाम, थर, वतन :</label>
              <input
                name="family_husband_father"
                value={form.family_husband_father}
                onChange={handleChange}
                className="ecr-line-input ecr-long-input"
              />
              <span className="ecr-red">*</span>
            </div>
            <div className="ecr-detail-row">
              <label>ससुरा को नाम, थर, वतन :</label>
              <input
                name="family_sasura"
                value={form.family_sasura}
                onChange={handleChange}
                className="ecr-line-input ecr-long-input"
              />
              <span className="ecr-red">*</span>
            </div>
          </div>

          <p className="ecr-section-title">घर रहेको जग्गाको विवरण :-</p>
          <p>
            साविक{" "}
            <select name="land_old_unit_type" value={form.land_old_unit_type} onChange={handleChange} className="ecr-inline-select">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं.{" "}
            <input name="land_old_unit_ward" value={form.land_old_unit_ward} onChange={handleChange} className="ecr-inline-box ecr-tiny-box" />
            {" "}कि.नं.{" "}
            <input name="land_kitta_no" value={form.land_kitta_no} onChange={handleChange} className="ecr-inline-box ecr-small-box" />
            {" "}क्षेत्रफल{" "}
            <input name="land_area" value={form.land_area} onChange={handleChange} className="ecr-inline-box ecr-small-box" />
          </p>

          <p className="ecr-section-title">घर रहेको टोल,वस्ती,गाउँ:-</p>
          <p>
            {MUNICIPALITY.name} वडा नं. {user?.ward || "१"} टोल{" "}
            <input name="land_tol" value={form.land_tol} onChange={handleChange} className="ecr-line-input ecr-medium-input" />
          </p>

          <p className="ecr-section-title ecr-underline">जग्गाको चार किल्ला:</p>
          <div className="ecr-boundaries">
            <div className="ecr-boundary-row">
              <div className="ecr-boundary-item">
                <label>पूर्वमा:-</label>
                <input name="bound_east" value={form.bound_east} onChange={handleChange} className="ecr-line-input ecr-medium-input" />
                <span className="ecr-red">*</span>
              </div>
              <div className="ecr-boundary-item">
                <label>पश्चिममा:-</label>
                <input name="bound_west" value={form.bound_west} onChange={handleChange} className="ecr-line-input ecr-medium-input" />
                <span className="ecr-red">*</span>
              </div>
            </div>
            <div className="ecr-boundary-row">
              <div className="ecr-boundary-item">
                <label>उत्तरमा:-</label>
                <input name="bound_north" value={form.bound_north} onChange={handleChange} className="ecr-line-input ecr-medium-input" />
                <span className="ecr-red">*</span>
              </div>
              <div className="ecr-boundary-item">
                <label>दक्षिणमा:-</label>
                <input name="bound_south" value={form.bound_south} onChange={handleChange} className="ecr-line-input ecr-medium-input" />
                <span className="ecr-red">*</span>
              </div>
            </div>
          </div>

          <p className="ecr-section-title">घरको विवरण :</p>
          <p>
            लागि आवेदन घर{" "}
            <input name="house_type"       value={form.house_type}       onChange={handleChange} className="ecr-inline-box ecr-medium-box" />
            {" "}ले बनेको{" "}
            <input name="house_floors"     value={form.house_floors}     onChange={handleChange} className="ecr-inline-box ecr-small-box" />
            {" "}तले{" "}
            <input name="house_owner_name" value={form.house_owner_name} onChange={handleChange} className="ecr-inline-box ecr-medium-box" />
            {" "}को नाममा छ।
          </p>

          <p>विद्युत शक्ति दिन यस नगरपालिकालाई कुनै आपत्ति छैन।</p>
          <p>निजले आवेदन दिएको घरमा:</p>
          <ul className="ecr-declarations">
            <li>- पहिले विद्युत सप्लाई पिएन तथापि निजलाई नयाँ मीटर आवश्यक भएको हो।</li>
            <li>- विद्युत सप्लाई भएको हो छुट्टै मित्र भएकोले आवेदकलाई नयाँ मीटर दिन आवश्यक भएको हो।</li>
          </ul>
        </div>

        {/* ── Signature ── */}
        <div className="ecr-signature-section">
          <div className="ecr-signature-block">
            <div className="ecr-signature-line"></div>
            <span className="ecr-red-mark">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="ecr-line-input ecr-full-width"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="ecr-designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="ecr-footer">
          <button
            className="ecr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="ecr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default ElectricityConnectionRecommendation;