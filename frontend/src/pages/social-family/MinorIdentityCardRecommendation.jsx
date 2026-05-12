import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from MinorIdentityCardRecommendation.css)
   All classes prefixed with "micr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .micr-container {
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
  .micr-bold      { font-weight: bold; }
  .micr-underline { text-decoration: underline; }
  .micr-red       { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
  .micr-en-label  { font-family: sans-serif; font-size: 0.9rem; color: #333; }
  .micr-ml-10     { margin-left: 10px; }
  .micr-ml-20     { margin-left: 20px; }
  .micr-center    { text-align: center; }

  /* ── Top Bar ── */
  .micr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .micr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .micr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .micr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .micr-header-text { display: flex; flex-direction: column; align-items: center; }
  .micr-municipality-name {
    color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2;
  }
  .micr-ward-title   { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .micr-address-text,
  .micr-province-text { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Photo box ── */
  .micr-photo-box-container {
    position: absolute;
    top: 50px;
    right: 50px;
  }
  .micr-photo-box {
    width: 110px;
    height: 130px;
    border: 1px solid #555;
    background-color: #fcfcfc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    text-align: center;
    color: #777;
  }

  /* ── Title / Addressee / Subject ── */
  .micr-title-section  { text-align: center; margin-bottom: 20px; }
  .micr-addressee      { margin-bottom: 20px; font-size: 1.05rem; }
  .micr-addressee-row  { margin-top: 5px; }
  .micr-subject-section {
    text-align: center;
    margin: 20px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* ── Form body ── */
  .micr-body       { font-size: 1rem; line-height: 1.6; }
  .micr-intro-text { text-align: justify; margin-bottom: 15px; }
  .micr-group      { margin-bottom: 12px; }
  .micr-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5px;
  }
  .micr-row label { margin-right: 5px; white-space: nowrap; }

  .micr-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    margin: 0 5px;
    padding: 0 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .micr-medium-input { width: 150px; }
  .micr-long-input   { width: 300px; }
  .micr-full-width   { flex-grow: 1; }

  .micr-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 2px;
    margin: 0 5px;
    font-size: 0.95rem;
    font-family: inherit;
  }
  .micr-inline-box {
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
  .micr-medium-box { width: 150px; }

  /* ── Declaration ── */
  .micr-declaration { margin-top: 15px; font-size: 0.9rem; }

  /* ── Applicant signature (right-aligned) ── */
  .micr-applicant-sig {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .micr-applicant-sig h4 { margin-bottom: 5px; margin-right: 80px; }
  .micr-sig-row {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  /* ── Recommendation section ── */
  .micr-divider { border: 0; border-top: 1px dotted #000; margin: 20px 0; }
  .micr-recommendation { padding-top: 10px; }
  .micr-rec-body p { text-align: justify; line-height: 1.8; margin-bottom: 20px; }
  .micr-rec-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .micr-rec-left  { display: flex; flex-direction: column; gap: 10px; }
  .micr-rec-right { display: flex; flex-direction: column; gap: 5px; align-items: flex-start; margin-right: 50px; }

  /* ── Applicant details (scoped) ── */
  .micr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .micr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .micr-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 15px !important;
  }
  .micr-container .detail-group { display: flex; flex-direction: column; }
  .micr-container .detail-group label {
    font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333;
  }
  .micr-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background: #fff;
    font-family: inherit;
  }
  .micr-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .micr-footer { text-align: center; margin-top: 40px; }
  .micr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .micr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .micr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .micr-copyright {
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
    .micr-container, .micr-container * { visibility: visible; }
    .micr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      margin: 0;
      padding: 20px 40px;
      background: white !important;
      background-image: none !important;
      box-shadow: none;
    }
    .micr-top-bar, .micr-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  addressee_type:           "जिल्ला",
  addressee_place:          "",
  child_type:               "छोरा",
  child_name_ne:            "",
  child_fullname_en:        "",
  child_gender:             "पुरुष",
  birth_country:            "नेपाल",
  birth_province:           "",
  birth_district:           "",
  birth_rm_mun:             "",
  father_name:              "",
  father_citizenship:       "",
  mother_name:              "",
  mother_citizenship:       "",
  guardian_name:            "",
  guardian_address:         "",
  permanent_district:       "काठमाडौँ",
  permanent_mun:            MUNICIPALITY.name,
  permanent_ward:           "",
  birth_date_bs:            "",
  birth_date_ad:            "",
  grandfather_name:         "",
  grandmother_name:         "",
  applicant_signature_name: "",
  applicant_name:           "",
  applicant_relationship:   "",
  applicant_date:           "",
  recommender_name:         "",
  recommender_designation:  "",
  // ApplicantDetailsNp fields
  applicant_address:         "",
  applicant_citizenship_no:  "",
  applicant_cit_issued_date: "",
  applicant_nid_no:          "",
  applicant_phone:           "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const MinorIdentityCardRecommendation = () => {
  // FIX: useWardForm + setField were used without being imported.
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/minor-identity-card-recommendation", form);
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
      const res = await axios.post("/api/forms/minor-identity-card-recommendation", form);
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

      <form className="micr-container" onSubmit={handleSubmit}>

        {/* ── Top Bar ── */}
        <div className="micr-top-bar">
          नाबालक परिचय पत्र ।
          <span className="micr-breadcrumb">
            सामाजिक / पारिवारिक &gt; नाबालक परिचय पत्र
          </span>
        </div>

        {/* ── Header ── */}
        <div className="micr-header">
          <div className="micr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="micr-header-text">
            <h1 className="micr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="micr-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="micr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="micr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Photo Box ── */}
        <div className="micr-photo-box-container">
          <div className="micr-photo-box">नाबालकको फोटो</div>
        </div>

        {/* ── Title ── */}
        <div className="micr-title-section">
          <h4 className="micr-underline micr-bold">नाबालक परिचयपत्रको अनुसूची।</h4>
        </div>

        {/* ── Addressee ── */}
        <div className="micr-addressee">
          <p className="micr-bold">श्रीमान प्रमुख जिल्ला अधिकारी</p>
          <div className="micr-addressee-row">
            <select name="addressee_type" value={form.addressee_type} onChange={handleChange} className="micr-inline-select">
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            <span>प्रशासन कार्यालय,</span>
            <input name="addressee_place" value={form.addressee_place} onChange={handleChange} className="micr-line-input micr-medium-input" />
            <span>|</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="micr-subject-section">
          <p>विषय: <span className="micr-underline">नाबालक परिचय पत्र पाउँ।</span></p>
        </div>

        {/* ── Body ── */}
        <div className="micr-body">
          <p className="micr-intro-text">
            मेरो निम्ननुसारको विवरण भएको नाबालकको परिचयपत्र बनाउन परेकोले सिफारिस
            साथ रु. १० को टिकट टाँस गरी यो निवेदन पेश गरेको छु। मेरो{" "}
            <select name="child_type" value={form.child_type} onChange={handleChange} className="micr-inline-select">
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <input name="child_name_ne" value={form.child_name_ne} onChange={handleChange} className="micr-line-input micr-medium-input" />
            {" "}<span className="micr-red">*</span>
            ले यस अघि नाबालक परिचयपत्र बनाएको छैन ।
          </p>

          {/* 1. Name */}
          <div className="micr-group">
            <div className="micr-row">
              <label>१. नाबालकको नाम,थर : <span className="micr-red">*</span></label>
              <input name="child_name_ne" value={form.child_name_ne} onChange={handleChange} className="micr-line-input micr-long-input" />
            </div>
            <div className="micr-row">
              <label className="micr-en-label">Full Name(In Block): <span className="micr-red">*</span></label>
              <input name="child_fullname_en" value={form.child_fullname_en} onChange={handleChange} className="micr-line-input micr-long-input" />
            </div>
          </div>

          {/* 2. Gender */}
          <div className="micr-group">
            <div className="micr-row">
              <label>२. लिङ्ग</label>
              <select name="child_gender" value={form.child_gender} onChange={handleChange} className="micr-inline-select">
                <option value="पुरुष">पुरुष</option>
                <option value="महिला">महिला</option>
                <option value="अन्य">अन्य</option>
              </select>
              <label className="micr-en-label micr-ml-20">Sex:</label>
              <span className="micr-en-label">{form.child_gender}</span>
            </div>
          </div>

          {/* 3. Birth Place */}
          <div className="micr-group">
            <div className="micr-row">
              <label>३. नाबालकको जन्मस्थान (जन्म दर्ता प्र. प्र. बमोजिम): देश: <span className="micr-red">*</span></label>
              <input name="birth_country"   value={form.birth_country}   onChange={handleChange} className="micr-line-input micr-medium-input" />
              <label>प्रदेश: <span className="micr-red">*</span></label>
              <input name="birth_province"  value={form.birth_province}  onChange={handleChange} className="micr-line-input micr-medium-input" />
              <label>जिल्ला:</label>
              <input name="birth_district"  value={form.birth_district}  onChange={handleChange} className="micr-line-input micr-medium-input" />
              <label>न.पा/गा.पा:</label>
              <input name="birth_rm_mun"    value={form.birth_rm_mun}    onChange={handleChange} className="micr-line-input micr-medium-input" />
            </div>
          </div>

          {/* 4. Father */}
          <div className="micr-group">
            <div className="micr-row">
              <label>४. बाबुको नाम थर: <span className="micr-red">*</span></label>
              <input name="father_name"        value={form.father_name}        onChange={handleChange} className="micr-line-input micr-long-input" />
              <label>ना.प्र.नं. र जारी मिति: <span className="micr-red">*</span></label>
              <input name="father_citizenship" value={form.father_citizenship} onChange={handleChange} className="micr-line-input micr-long-input" />
            </div>
          </div>

          {/* 5. Mother */}
          <div className="micr-group">
            <div className="micr-row">
              <label>५. आमाको नाम थर: <span className="micr-red">*</span></label>
              <input name="mother_name"        value={form.mother_name}        onChange={handleChange} className="micr-line-input micr-long-input" />
              <label>ना.प्र.नं. र जारी जिल्ला: <span className="micr-red">*</span></label>
              <input name="mother_citizenship" value={form.mother_citizenship} onChange={handleChange} className="micr-line-input micr-long-input" />
            </div>
          </div>

          {/* 6. Guardian */}
          <div className="micr-group">
            <div className="micr-row">
              <label>६. संरक्षकको नाम थर: <span className="micr-red">*</span></label>
              <input name="guardian_name"    value={form.guardian_name}    onChange={handleChange} className="micr-line-input micr-long-input" />
            </div>
            <div className="micr-row">
              <label>संरक्षकको ठेगाना</label>
              <input name="guardian_address" value={form.guardian_address} onChange={handleChange} className="micr-line-input micr-full-width" />
            </div>
          </div>

          {/* 7. Permanent Address (display-only from state) */}
          <div className="micr-group">
            <div className="micr-row">
              <label>७. नाबालकको स्थायी ठेगाना: जिल्ला <span className="micr-underline">{form.permanent_district}</span></label>
              <label className="micr-ml-20">गा.पा/न.पा: <span className="micr-underline">{form.permanent_mun}</span></label>
              <label className="micr-ml-20">वडा नं: <span className="micr-underline">{form.permanent_ward || user?.ward}</span></label>
            </div>
          </div>

          {/* 8. Date of Birth */}
          <div className="micr-group">
            <div className="micr-row">
              <label>८. नाबालकको जन्म मिति: वि.स. <span className="micr-underline">{form.birth_date_bs}</span></label>
              <label className="micr-ml-20">AD: <span className="micr-red">*</span></label>
              <input name="birth_date_ad" value={form.birth_date_ad} onChange={handleChange} className="micr-line-input micr-medium-input" />
            </div>
          </div>

          {/* 9. Grandparents */}
          <div className="micr-group">
            <div className="micr-row">
              <label>९. हजुरबुबाको नाम थर <span className="micr-red">*</span></label>
              <input name="grandfather_name" value={form.grandfather_name} onChange={handleChange} className="micr-line-input micr-medium-input" />
              <label>हजुर आमाको नाम थर <span className="micr-red">*</span></label>
              <input name="grandmother_name" value={form.grandmother_name} onChange={handleChange} className="micr-line-input micr-medium-input" />
            </div>
          </div>

          <p className="micr-declaration">
            मैले माथि लेखेको व्यहोरा ठीक साँचो हो, झुट्टा ठहरे कानुन बमोजिम सहुँला
            बुझाउँला भनी सही गर्ने।
          </p>

          {/* ── Applicant Signature ── */}
          <div className="micr-applicant-sig">
            <h4 className="micr-bold">निवेदक</h4>
            <div className="micr-sig-row">
              <label>दस्तखत:</label>
              <input name="applicant_signature_name" value={form.applicant_signature_name} onChange={handleChange} className="micr-line-input micr-medium-input" />
            </div>
            <div className="micr-sig-row">
              <label>नाम थर: <span className="micr-red">*</span></label>
              <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="micr-line-input micr-medium-input" />
            </div>
            <div className="micr-sig-row">
              <label>नाबालकसँगको नाता: <span className="micr-red">*</span></label>
              <input name="applicant_relationship" value={form.applicant_relationship} onChange={handleChange} className="micr-line-input micr-medium-input" />
            </div>
            <div className="micr-sig-row">
              <label>मिति: <span className="micr-underline">{form.applicant_date}</span></label>
            </div>
          </div>

          <hr className="micr-divider" />

          {/* ── Recommendation Section ── */}
          <div className="micr-recommendation">
            <h4 className="micr-center micr-underline micr-bold">
              गाउँपालिका / नगरपालिका वडा अध्यक्षको सिफारिस
            </h4>

            <div className="micr-rec-body">
              <p>
                जिल्ला <span className="micr-bold">काठमाडौँ</span>{" "}
                <span className="micr-bold micr-ml-10">{MUNICIPALITY.name}</span> वडा
                नं <span className="micr-bold">{user?.ward || "१"}</span> मा स्थायी बसोबास गरी बस्ने
                यसमा लेखिएका श्री
                <input
                  name="recommender_name"
                  value={form.recommender_name}
                  onChange={handleChange}
                  className="micr-inline-box micr-medium-box"
                  required
                />
                को नाम उल्लेखित ब्यहोरा सहि भएकोले सिफारिस गरिन्छ ।
              </p>
            </div>

            <div className="micr-rec-footer">
              <div className="micr-rec-left">
                <div className="micr-row">
                  <label>कार्यालयको नाम :</label>
                  <span className="micr-underline">{MUNICIPALITY.name}</span>
                </div>
                <div className="micr-row">
                  <label>मिति <span className="micr-underline">{form.applicant_date}</span></label>
                </div>
              </div>
              <div className="micr-rec-right">
                <div className="micr-row"><label>सिफारिस गर्ने:</label></div>
                <div className="micr-row">
                  <label>दस्तखत:</label>
                  <input name="recommender_name" value={form.recommender_name} onChange={handleChange} className="micr-line-input micr-medium-input" />
                </div>
                <div className="micr-row">
                  <label>नाम थर: <span className="micr-red">*</span></label>
                  <input name="recommender_name" value={form.recommender_name} onChange={handleChange} className="micr-line-input micr-medium-input" />
                </div>
                <div className="micr-row">
                  <label>पद: </label>
                  <select name="recommender_designation" value={form.recommender_designation} onChange={handleChange} className="micr-inline-select">
                    <option value="">पद छनौट गर्नुहोस्</option>
                    <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                    <option value="वडा सचिव">वडा सचिव</option>
                    <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="micr-footer">
          <button
            className="micr-save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="micr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default MinorIdentityCardRecommendation;