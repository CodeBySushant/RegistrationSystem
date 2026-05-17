import React, { useState, useEffect, useRef } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axios from "../../utils/axiosInstance";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CitizenshipAngkrit.css)
   All classes prefixed with "ca-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .ca-container {
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
  .ca-bold      { font-weight: bold; }
  .ca-underline { text-decoration: underline; text-underline-offset: 4px; }
  .ca-red       { color: red; font-weight: bold; margin: 0 2px; }
  .ca-center    { text-align: center; }
  .ca-mt-10     { margin-top: 10px; }
  .ca-mt-20     { margin-top: 20px; }
  .ca-mb-20     { margin-bottom: 20px; }
  .ca-sep       { white-space: nowrap; flex-shrink: 0; font-size: 0.95rem; }

  /* ── Top Bar ── */
  .ca-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.05rem;
    color: #333;
  }
  .ca-breadcrumb { font-size: 0.85rem; color: #777; font-weight: normal; }

  /* ── Schedule Sections ── */
  .ca-schedule    { margin-bottom: 40px; }
  .ca-sch-header  { text-align: center; margin-bottom: 30px; }
  .ca-sch-title   { font-size: 1.1rem; margin: 0; font-weight: bold; }
  .ca-rule-text   { font-size: 0.9rem; margin: 5px 0; color: #333; }
  .ca-form-title  { font-size: 1.3rem; margin: 15px 0 10px 0; color: #333; font-weight: bold; }

  /* ── Addressee / Subject ── */
  .ca-addressee   { margin-bottom: 20px; font-size: 1rem; line-height: 2; }
  .ca-addressee p { margin: 2px 0; }
  .ca-subject     { text-align: center; margin: 30px 0; font-size: 1.05rem; font-weight: bold; }

  /* ── Form Body ── */
  .ca-body        { font-size: 1rem; line-height: 1.9; }
  .ca-para        { line-height: 2.2; text-align: justify; margin: 10px 0; }
  .ca-indent      { text-indent: 40px; }

  /* ── Inputs ── */
  .ca-input {
    display: inline-block;
    height: 24px;
    border: none;
    border-bottom: 1.5px solid #555;
    background-color: #ffffff;
    outline: none;
    padding: 1px 5px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 0;
  }
  .ca-input:focus { border-bottom-color: #c0392b; background-color: #fffaf9; }

  /* ── Select ── */
  .ca-select {
    display: inline-block;
    height: 24px;
    border: 1px solid #888;
    background-color: #ffffff;
    padding: 0 4px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: middle;
    box-sizing: border-box;
  }
  .ca-select:focus { border-color: #c0392b; outline: none; }

  /* Input width variants */
  .ca-tiny   { width: 48px;  text-align: center; }
  .ca-small  { width: 95px; }
  .ca-medium { width: 140px; }
  .ca-long   { width: 240px; }
  .ca-date   { width: 135px; }

  /* ── Details List ── */
  .ca-details-list   { margin-top: 20px; }
  .ca-details-indent { padding-left: 20px; }
  .ca-detail-row {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }
  .ca-detail-row label { flex-shrink: 0; line-height: 1.4; font-size: 0.95rem; }

  /* ── Family Table ── */
  .ca-family-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    border: 2px solid #2c3e50;
    border-radius: 4px;
    overflow: hidden;
  }
  .ca-family-table th {
    border: 1px solid #2c3e50;
    padding: 6px 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: #2c3e50;
    color: #fff;
  }
  .ca-family-table td {
    border: 1px solid #bdc3c7;
    padding: 4px 5px;
    background-color: #fff;
    vertical-align: middle;
  }
  .ca-family-table tbody tr:hover td { background-color: #f8f9fa; }
  .ca-table-input {
    width: 95%;
    height: 24px;
    border: none;
    border-bottom: 1px solid #bbb;
    background: #fff;
    outline: none;
    padding: 1px 4px;
    font-size: 0.9rem;
    font-family: inherit;
    box-sizing: border-box;
    color: #000;
  }
  .ca-table-input:focus { border-bottom-color: #c0392b; background-color: #fffaf9; }
  .ca-action-cell { text-align: center; vertical-align: middle; }
  .ca-add-btn,
  .ca-remove-btn {
    color: #fff;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.15s;
  }
  .ca-add-btn          { background-color: #2471a3; }
  .ca-add-btn:hover    { background-color: #1a5276; }
  .ca-remove-btn       { background-color: #e74c3c; }
  .ca-remove-btn:hover { background-color: #c0392b; }

  /* ── Thumbprint / Signature ── */
  .ca-sig-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;
    margin-bottom: 40px;
    gap: 20px;
  }
  .ca-thumbprint { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .ca-thumb-title {
    font-size: 0.9rem;
    font-weight: bold;
    border-bottom: 1.5px solid #2c3e50;
    padding-bottom: 4px;
    margin: 0;
    letter-spacing: 1px;
    color: #2c3e50;
  }
  .ca-thumb-boxes {
    display: flex;
    border: 2px solid #2c3e50;
    border-radius: 4px;
    overflow: hidden;
  }
  .ca-thumb-box {
    width: 80px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 8px;
    background-color: #fafafa;
    border-right: 1.5px solid #2c3e50;
    position: relative;
  }
  .ca-thumb-box:last-child { border-right: none; }
  .ca-thumb-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #555;
    text-align: center;
    padding: 0 4px;
    background: #f0f0f0;
    border-radius: 3px;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }
  .ca-thumb-inner {
    flex: 1;
    width: 100%;
    background-image: repeating-radial-gradient(
      circle at 40px 50px,
      transparent 0px,
      transparent 8px,
      rgba(0,0,0,0.04) 8px,
      rgba(0,0,0,0.04) 9px
    );
  }
  .ca-sig-block       { text-align: right; font-size: 1rem; }
  .ca-sig-block p     { margin: 10px 0; }

  /* ── Recommendation ── */
  .ca-recommendation  { margin-top: 30px; }
  .ca-section-title   { font-size: 1.1rem; font-weight: bold; margin-bottom: 15px; }
  .ca-rec-sig         { text-align: right; margin-top: 30px; font-size: 1rem; }
  .ca-rec-sig p       { margin: 10px 0; }
  .ca-sig-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  /* ── Anusuchi 8 ── */
  .ca-anusuchi-8 {
    border-top: 2px dashed #666;
    padding-top: 40px;
    margin-top: 40px;
  }
  .ca-gov-header   { margin-bottom: 20px; }
  .ca-gov-header p { margin: 5px 0; font-size: 1.05rem; }
  .ca-cert-body    { font-size: 1rem; }
  .ca-cert-row {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }
  .ca-cert-row label { flex-shrink: 0; font-size: 0.95rem; }
  .ca-right-align    { justify-content: flex-end; }
  .ca-cert-sig       { text-align: right; margin-top: 40px; }
  .ca-cert-sig p     { margin: 10px 0; }

  /* ── Submit message ── */
  .ca-msg {
    padding: 7px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.95rem;
    margin-bottom: 12px;
    display: inline-block;
  }
  .ca-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .ca-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  /* ── Applicant details (scoped) ── */
  .ca-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 18px;
    background-color: rgba(255, 255, 255, 0.7);
    margin-top: 20px;
    border-radius: 4px;
  }
  .ca-container .applicant-details-box h3 {
    color: #777; font-size: 1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .ca-container .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
  }
  .ca-container .detail-group { display: flex; flex-direction: column; }
  .ca-container .detail-group label { font-size: 0.85rem; margin-bottom: 4px; font-weight: bold; color: #333; }
  .ca-container .detail-input {
    border: 1px solid #ddd;
    padding: 6px 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    height: 32px;
    box-sizing: border-box;
    background-color: #fff;
    font-family: inherit;
    font-size: 0.95rem;
  }
  .ca-container .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .ca-footer { text-align: center; margin-top: 40px; }
  .ca-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 9px 22px;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: inherit;
  }
  .ca-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .ca-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ca-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print ── */
  .ca-hide-print { display: block; }

  /* ── Print ── */
  @media print {
    .ca-hide-print { display: none !important; }
    .ca-container {
      max-width: 100%;
      padding: 10px 20px;
      background-image: none;
      background: white;
    }
    .ca-input,
    .ca-select,
    .ca-table-input {
      border: none;
      border-bottom: 1px solid #000;
      background: transparent !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-angkrit";

const emptyFamilyRow = () => ({ name: "", relation: "", age: "" });

const buildInitialState = (ward) => ({
  dao_district:                  "काठमाडौँ",
  applicant_name_body:           "",
  application_fee:               "",
  main_applicant_name:           "",
  birth_place:                   "",
  dob:                           "",
  perm_district:                 "काठमाडौँ",
  perm_municipality:             MUNICIPALITY?.name || "",
  perm_ward:                     ward ? String(ward) : "१",
  perm_tole:                     "",
  father_name:                   "",
  father_nationality:            "",
  mother_name:                   "",
  mother_nationality:            "",
  husband_name:                  "",
  husband_nationality:           "",
  religion:                      "",
  education:                     "",
  occupation:                    "",
  marriage_date:                 "",
  residence_years:               "",
  language_spoken:               "नेपाली",
  foreign_citizenship_renounced: "",
  other_country_citizenship:     "नलिएको",
  nepal_business:                "",
  family_members:                [emptyFamilyRow()],
  sign_date:                     new Date().toISOString().slice(0, 10),

  rec_municipality:              MUNICIPALITY?.name || "",
  rec_ward:                      ward ? String(ward) : "१",
  rec_father_name:               "",
  rec_relation_type:             "छोरा",
  rec_name:                      "",
  rec_signatory_name:            "",
  rec_signatory_position:        "",
  rec_date:                      new Date().toISOString().slice(0, 10),

  cert_dao_district:             "",
  cert_no:                       "",
  cert_name:                     "",
  cert_birth_place:              "",
  cert_dob:                      "",
  cert_perm_district:            "",
  cert_perm_municipality:        MUNICIPALITY?.name || "",
  cert_perm_ward:                ward ? String(ward) : "१",
  cert_perm_tole:                "",
  cert_father_name:              "",
  cert_father_address:           "",
  cert_father_citizenship:       "",
  cert_mother_name:              "",
  cert_mother_address:           "",
  cert_mother_citizenship:       "",
  cert_husband_name:             "",
  cert_husband_address:          "",
  cert_husband_citizenship:      "",
  cert_officer_name:             "",
  cert_officer_position:         "",
  cert_date:                     new Date().toISOString().slice(0, 10),

  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
  notes:                "",
  status:               "pending",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipAngkrit() {
  const { user } = useAuth();

  const [form,    setForm]    = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const pendingPrintRef = useRef(false);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({
        ...prev,
        perm_ward:      String(user.ward),
        rec_ward:       String(user.ward),
        cert_perm_ward: String(user.ward),
      }));
    }
  }, [user]);

  /* Deferred print after successful save */
  useEffect(() => {
    if (pendingPrintRef.current) {
      pendingPrintRef.current = false;
      const t = setTimeout(() => window.print(), 200);
      return () => clearTimeout(t);
    }
  });

  /* ── Field handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateFamilyRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      family_members: prev.family_members.map((r, i) =>
        i === idx ? { ...r, [key]: val } : r
      ),
    }));
  };

  const addFamilyRow = () =>
    setForm((prev) => ({
      ...prev,
      family_members: [...prev.family_members, emptyFamilyRow()],
    }));

  const removeFamilyRow = (idx) => {
    if (form.family_members.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      family_members: prev.family_members.filter((_, i) => i !== idx),
    }));
  };

  /* ── Validation ── */
  const validate = () => {
    if (!form.main_applicant_name.trim()) return "निवेदकको नाम (फारम भित्र) आवश्यक छ।";
    if (!form.cert_name.trim())           return "प्रमाणपत्रमा नाम आवश्यक छ।";
    return null;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        family_members:  JSON.stringify(form.family_members),
        perm_ward:       String(form.perm_ward),
        rec_ward:        String(form.rec_ward),
        cert_perm_ward:  String(form.cert_perm_ward),
      };

      const res = await axios.post(API_URL, payload);
      if (res.status === 200 || res.status === 201) {
        setMessage({
          type: "success",
          text: "रेकर्ड सफलतापूर्वक सेभ भयो । ID: " + (res.data?.id ?? ""),
        });
        pendingPrintRef.current = true;
        setForm(buildInitialState(user?.ward));
      } else {
        throw new Error("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "सेभ गर्न सकिएन",
      });
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

      <form className="ca-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top Bar ── */}
        <div className="ca-top-bar ca-hide-print">
          अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र ।
          <span className="ca-breadcrumb">
            नेपाली नागरिकता &gt; अंगीकृत नेपाली नागरिकता
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ANUSUCHI - 7
        ══════════════════════════════════════════════════════════════ */}
        <div className="ca-schedule">
          <div className="ca-sch-header">
            <h3 className="ca-sch-title">अनुसूची-७</h3>
            <p className="ca-rule-text">
              (नियम ९ को उपनियम (१), नियम १४ को उपनियम (१) र नियम १५ सँग सम्बन्धित)
            </p>
            <h2 className="ca-form-title">
              अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि दिइने निवेदन
            </h2>
          </div>

          <div className="ca-addressee">
            <p>श्रीमान् प्रमुख जिल्ला अधिकारी ज्यू,</p>
            <p>
              जिल्ला प्रशासन कार्यालय,{" "}
              <input name="dao_district" className="ca-input ca-medium" value={form.dao_district} onChange={handleChange} /> ।
            </p>
          </div>

          <div className="ca-subject">
            <p>विषय : <u>नेपाली नागरिकताको प्रमाण-पत्र पाऊँ ।</u></p>
          </div>

          <div className="ca-body">
            <p>महोदय,</p>
            <p className="ca-para ca-indent">
              मेरो जन्म नेपालमा भई नेपालमा नै स्थायी बसोबास गर्दै आएको /{" "}
              <input name="applicant_name_body" className="ca-input ca-long" value={form.applicant_name_body} onChange={handleChange} placeholder="नाम" />{" "}
              ले जन्मको नाताले नेपाली नागरिकताको प्रमाण-पत्र पाएको हुँदा
              नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि तोकिएको दस्तुर रु.{" "}
              <input name="application_fee" className="ca-input ca-small" value={form.application_fee} onChange={handleChange} />{" "}
              यसै साथ राखी यो निवेदन पत्र चढाएको छु ।
            </p>

            <div className="ca-details-list">
              <p className="ca-bold">१. मेरो विवरण :</p>
              <div className="ca-details-indent">

                <div className="ca-detail-row">
                  <label>(क) नाम, थर : <span className="ca-red">*</span></label>
                  <input name="main_applicant_name" className="ca-input ca-long" value={form.main_applicant_name} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(ख) जन्म स्थान : <span className="ca-red">*</span></label>
                  <input name="birth_place" className="ca-input ca-long" value={form.birth_place} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(ग) जन्म मिति : <span className="ca-red">*</span></label>
                  <input type="date" name="dob" className="ca-input ca-date" value={form.dob} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(घ) स्थायी ठेगाना : <span className="ca-red">*</span></label>
                  <span className="ca-sep">जिल्ला</span>
                  <input name="perm_district"     className="ca-input ca-small"  value={form.perm_district}     onChange={handleChange} />
                  <span className="ca-sep">गा.पा./न.पा.</span>
                  <input name="perm_municipality" className="ca-input ca-medium" value={form.perm_municipality} onChange={handleChange} />
                  <span className="ca-sep">वडा नं.</span>
                  <input name="perm_ward"         className="ca-input ca-tiny"   value={form.perm_ward}         onChange={handleChange} />
                  <span className="ca-sep">गाउँ/टोल</span>
                  <input name="perm_tole"         className="ca-input ca-medium" value={form.perm_tole}         onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(ङ) बाबुको नाम, थर : <span className="ca-red">*</span></label>
                  <input name="father_name"        className="ca-input ca-medium" value={form.father_name}        onChange={handleChange} />
                  <span className="ca-sep">राष्ट्रियता :</span>
                  <input name="father_nationality" className="ca-input ca-small"  value={form.father_nationality} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(च) आमाको नाम, थर : <span className="ca-red">*</span></label>
                  <input name="mother_name"        className="ca-input ca-medium" value={form.mother_name}        onChange={handleChange} />
                  <span className="ca-sep">राष्ट्रियता :</span>
                  <input name="mother_nationality" className="ca-input ca-small"  value={form.mother_nationality} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(छ) पतिको नाम, थर :</label>
                  <input name="husband_name"        className="ca-input ca-medium" value={form.husband_name}        onChange={handleChange} />
                  <span className="ca-sep">राष्ट्रियता :</span>
                  <input name="husband_nationality" className="ca-input ca-small"  value={form.husband_nationality} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(ज) धर्म :</label>
                  <input name="religion"   className="ca-input ca-medium" value={form.religion}   onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(झ) शैक्षिक योग्यता :</label>
                  <input name="education"  className="ca-input ca-medium" value={form.education}  onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(ञ) पेशा :</label>
                  <input name="occupation" className="ca-input ca-medium" value={form.occupation} onChange={handleChange} />
                </div>
                <div className="ca-detail-row">
                  <label>(ट) विवाह भएको मिति (विवाहितको हकमा) :</label>
                  <input type="date" name="marriage_date" className="ca-input ca-date" value={form.marriage_date} onChange={handleChange} />
                </div>
              </div>

              <div className="ca-detail-row ca-mt-10">
                <label>२. नेपालमा बसोबास गरेको वर्ष : <span className="ca-red">*</span></label>
                <input name="residence_years" className="ca-input ca-small" value={form.residence_years} onChange={handleChange} />
              </div>
              <div className="ca-detail-row">
                <label>३. नेपाली भाषा वा अन्य कुन भाषा बोल्न र लेख्न जानेको छ : <span className="ca-red">*</span></label>
                <input name="language_spoken" className="ca-input ca-medium" value={form.language_spoken} onChange={handleChange} />
              </div>
              <div className="ca-detail-row">
                <label>४. विदेशी नागरिकता त्यागेको वा त्याग्न कारवाही चलाएको निस्सा : <span className="ca-red">*</span></label>
                <input name="foreign_citizenship_renounced" className="ca-input ca-long" value={form.foreign_citizenship_renounced} onChange={handleChange} />
              </div>
              <div className="ca-detail-row">
                <label>५. अन्य देशको नागरिकता लिए/नलिएको : <span className="ca-red">*</span></label>
                <input name="other_country_citizenship" className="ca-input ca-small" value={form.other_country_citizenship} onChange={handleChange} />
              </div>
              <div className="ca-detail-row">
                <label>६. नेपालमा कुनै पेशा वा व्यवसाय गरी बसेको भए सो को विवरण :</label>
                <input name="nepal_business" className="ca-input ca-long" value={form.nepal_business} onChange={handleChange} />
              </div>

              <div className="ca-detail-row ca-mt-10">
                <label className="ca-bold">७. सगोलका परिवारका सदस्यहरुको विवरण : <span className="ca-red">*</span></label>
              </div>

              {/* Family Members Table */}
              <table className="ca-family-table ca-mb-20">
                <thead>
                  <tr>
                    <th style={{ width: "8%" }}>क्र.स.</th>
                    <th>नाम, थर</th>
                    <th style={{ width: "22%" }}>नाता</th>
                    <th style={{ width: "15%" }}>उमेर</th>
                    <th className="ca-hide-print" style={{ width: "7%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {form.family_members.map((row, idx) => (
                    <tr key={idx}>
                      <td className="ca-center">{idx + 1}</td>
                      <td><input className="ca-table-input" value={row.name}     onChange={updateFamilyRow(idx, "name")}     /></td>
                      <td><input className="ca-table-input" value={row.relation} onChange={updateFamilyRow(idx, "relation")} /></td>
                      <td><input className="ca-table-input" value={row.age}      onChange={updateFamilyRow(idx, "age")}      /></td>
                      <td className="ca-action-cell ca-hide-print">
                        {idx === 0 ? (
                          <button type="button" className="ca-add-btn"    onClick={addFamilyRow}>+</button>
                        ) : (
                          <button type="button" className="ca-remove-btn" onClick={() => removeFamilyRow(idx)}>×</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ca-detail-row ca-bold">
                <label>
                  ८. मैले नेपाली नागरिकताको प्रमाण-पत्र पाएमा नेपाल राज्य र नेपाल
                  सरकारप्रति बफादार रही नेपालको संविधान र प्रचलित कानुनको पूर्ण
                  रुपले पालना गर्नेछु ।
                </label>
              </div>
            </div>

            {/* Thumbprint + Signature */}
            <div className="ca-sig-flex">
              <div className="ca-thumbprint">
                <p className="ca-thumb-title">औंठा छाप</p>
                <div className="ca-thumb-boxes">
                  <div className="ca-thumb-box">
                    <span className="ca-thumb-label">दायाँ</span>
                    <div className="ca-thumb-inner" />
                  </div>
                  <div className="ca-thumb-box">
                    <span className="ca-thumb-label">बायाँ</span>
                    <div className="ca-thumb-inner" />
                  </div>
                </div>
              </div>
              <div className="ca-sig-block">
                <p>निवेदकको सही: ................................</p>
                <p>
                  मिति:{" "}
                  <input type="date" name="sign_date" className="ca-input ca-date" value={form.sign_date} onChange={handleChange} />
                </p>
              </div>
            </div>
          </div>

          {/* Ward Recommendation */}
          <div className="ca-recommendation">
            <h3 className="ca-section-title ca-center ca-underline">सिफारिस</h3>
            <p className="ca-para ca-indent">
              यसमा लेखिएको व्यहोरा ठिक साँचो हो, झुठा ठहरे कानुन बमोजिम सहुँला
              बुझाउँला भनी यस{" "}
              <input name="rec_municipality" className="ca-input ca-medium" value={form.rec_municipality} onChange={handleChange} />{" "}
              वडा नं.{" "}
              <input name="rec_ward" className="ca-input ca-tiny" value={form.rec_ward} onChange={handleChange} />{" "}
              मा बस्ने श्री{" "}
              <input name="rec_father_name" className="ca-input ca-medium" value={form.rec_father_name} onChange={handleChange} />{" "}
              को{" "}
              <select name="rec_relation_type" className="ca-select" value={form.rec_relation_type} onChange={handleChange}>
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
                <option value="पत्नी">पत्नी</option>
              </select>{" "}
              श्री{" "}
              <input name="rec_name" className="ca-input ca-medium" value={form.rec_name} onChange={handleChange} />{" "}
              ले मेरो रोहवरमा सहीछाप गरेको साँचो हो । निजलाई अंगीकृत नेपाली
              नागरिकताको प्रमाण-पत्र दिएमा फरक पर्दैन भनी सिफारिस गर्दछु ।
            </p>
            <div className="ca-rec-sig">
              <p>सिफारिस गर्नेको सही: ........................</p>
              <div className="ca-sig-row">
                <span className="ca-sep">नाम:</span>
                <input name="rec_signatory_name" className="ca-input ca-medium" value={form.rec_signatory_name} onChange={handleChange} />
              </div>
              <div className="ca-sig-row">
                <span className="ca-sep">पद:</span>
                <select name="rec_signatory_position" className="ca-select" value={form.rec_signatory_position} onChange={handleChange}>
                  <option value="">पद छनौट गर्नुहोस्</option>
                  <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                  <option value="वडा सचिव">वडा सचिव</option>
                </select>
              </div>
              <p>
                मिति:{" "}
                <input type="date" name="rec_date" className="ca-input ca-date" value={form.rec_date} onChange={handleChange} />
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ANUSUCHI - 8
        ══════════════════════════════════════════════════════════════ */}
        <div className="ca-anusuchi-8">
          <div className="ca-sch-header">
            <h3 className="ca-sch-title">अनुसूची-८</h3>
            <p className="ca-rule-text">(नियम ९ को उपनियम (२) सँग सम्बन्धित)</p>
            <h2 className="ca-form-title">अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र</h2>
          </div>

          <div className="ca-gov-header ca-center">
            <p className="ca-bold">नेपाल सरकार</p>
            <p className="ca-bold">गृह मन्त्रालय</p>
            <p className="ca-bold">
              जिल्ला प्रशासन कार्यालय{" "}
              <input name="cert_dao_district" className="ca-input ca-medium" value={form.cert_dao_district} onChange={handleChange} />
            </p>
          </div>

          <div className="ca-cert-body">
            <div className="ca-cert-row ca-right-align">
              <label>प्रमाणपत्र नं. :</label>
              <input name="cert_no" className="ca-input ca-medium" value={form.cert_no} onChange={handleChange} />
            </div>
            <div className="ca-cert-row ca-mt-10">
              <label>१. नाम, थर : <span className="ca-red">*</span></label>
              <input name="cert_name" className="ca-input ca-long" value={form.cert_name} onChange={handleChange} />
            </div>
            <div className="ca-cert-row">
              <label>२. जन्म स्थान : <span className="ca-red">*</span></label>
              <input name="cert_birth_place" className="ca-input ca-long" value={form.cert_birth_place} onChange={handleChange} />
            </div>
            <div className="ca-cert-row">
              <label>३. जन्म मिति वा उमेर : <span className="ca-red">*</span></label>
              <input type="date" name="cert_dob" className="ca-input ca-date" value={form.cert_dob} onChange={handleChange} />
            </div>
            <div className="ca-cert-row">
              <label>४. स्थायी ठेगाना : <span className="ca-red">*</span></label>
              <span className="ca-sep">जिल्ला</span>
              <input name="cert_perm_district"     className="ca-input ca-small"  value={form.cert_perm_district}     onChange={handleChange} />
              <span className="ca-sep">गा.पा./न.पा.</span>
              <input name="cert_perm_municipality" className="ca-input ca-medium" value={form.cert_perm_municipality} onChange={handleChange} />
              <span className="ca-sep">वडा नं.</span>
              <input name="cert_perm_ward"         className="ca-input ca-tiny"   value={form.cert_perm_ward}         onChange={handleChange} />
              <span className="ca-sep">टोल</span>
              <input name="cert_perm_tole"         className="ca-input ca-medium" value={form.cert_perm_tole}         onChange={handleChange} />
            </div>
            <div className="ca-cert-row">
              <label>५. बाबुको नाम, थर : <span className="ca-red">*</span></label>
              <input name="cert_father_name"        className="ca-input ca-medium" value={form.cert_father_name}        onChange={handleChange} />
              <span className="ca-sep">ठेगाना :</span>
              <input name="cert_father_address"     className="ca-input ca-medium" value={form.cert_father_address}     onChange={handleChange} />
              <span className="ca-sep">नागरिकता :</span>
              <input name="cert_father_citizenship" className="ca-input ca-small"  value={form.cert_father_citizenship} onChange={handleChange} />
            </div>
            <div className="ca-cert-row">
              <label>६. आमाको नाम, थर : <span className="ca-red">*</span></label>
              <input name="cert_mother_name"        className="ca-input ca-medium" value={form.cert_mother_name}        onChange={handleChange} />
              <span className="ca-sep">ठेगाना :</span>
              <input name="cert_mother_address"     className="ca-input ca-medium" value={form.cert_mother_address}     onChange={handleChange} />
              <span className="ca-sep">नागरिकता :</span>
              <input name="cert_mother_citizenship" className="ca-input ca-small"  value={form.cert_mother_citizenship} onChange={handleChange} />
            </div>
            <div className="ca-cert-row">
              <label>७. पतिको नाम, थर :</label>
              <input name="cert_husband_name"        className="ca-input ca-medium" value={form.cert_husband_name}        onChange={handleChange} />
              <span className="ca-sep">ठेगाना :</span>
              <input name="cert_husband_address"     className="ca-input ca-medium" value={form.cert_husband_address}     onChange={handleChange} />
              <span className="ca-sep">नागरिकता :</span>
              <input name="cert_husband_citizenship" className="ca-input ca-small"  value={form.cert_husband_citizenship} onChange={handleChange} />
            </div>

            <p className="ca-para ca-indent ca-mt-20">
              निजले नेपालको संविधान बमोजिम अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाएको छ ।
            </p>

            <div className="ca-cert-sig">
              <p className="ca-bold">प्रमाणपत्र दिने अधिकारीको :</p>
              <p>सही : ........................</p>
              <div className="ca-sig-row">
                <span className="ca-sep">नाम, थर :</span>
                <input name="cert_officer_name"     className="ca-input ca-medium" value={form.cert_officer_name}     onChange={handleChange} />
              </div>
              <div className="ca-sig-row">
                <span className="ca-sep">पद :</span>
                <input name="cert_officer_position" className="ca-input ca-medium" value={form.cert_officer_position} onChange={handleChange} />
              </div>
              <p>
                मिति:{" "}
                <input type="date" name="cert_date" className="ca-input ca-date" value={form.cert_date} onChange={handleChange} />
              </p>
            </div>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="ca-hide-print ca-mt-20">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer ── */}
        <div className="ca-footer ca-hide-print">
          {message && (
            <div className={`ca-msg ${message.type === "error" ? "ca-msg-error" : "ca-msg-success"}`}>
              {message.text}
            </div>
          )}
          <button type="submit" className="ca-save-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="ca-copyright ca-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>

      </form>
    </>
  );
}