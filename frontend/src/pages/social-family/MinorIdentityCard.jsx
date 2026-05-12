import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "minor-identity-card"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  municipality_name:      MUNICIPALITY.name       || "",
  ward_title:             `${MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`,
  // Addressee
  addressee_type:         "जिल्ला",
  addressee_office:       "",
  addressee_place1:       "",
  addressee_place2:       "",
  // Child info
  child_name_ne:          "",
  child_gender:           "पुरुष",
  child_fullname_en:      "",
  birth_district:         "",
  birth_rm:               "",
  birth_ward_no:          "",
  permanent_district:     "",
  permanent_rm:           "",
  permanent_ward_no:      "",
  birth_date_bs:          "",
  birth_date_ad:          "",
  // Parents
  father_name:            "",
  father_address:         "",
  mother_name:            "",
  mother_address:         "",
  parent_citizenship_no:  "",
  // Guardian
  guardian_name:          "",
  guardian_address:       "",
  // Recommender
  recommender_name:       "",
  recommender_date:       "",
  recommender_designation:"पद छनौट गर्नुहोस्",
  recommender_office_seal:"",
  // Footer applicant details
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_phone:        "",
  municipality_name_display: MUNICIPALITY.name || "",
  ward_title_display:     `${MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`,
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: mic-)
───────────────────────────────────────────── */
const styles = `
.mic-container {
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

.mic-bold-text      { font-weight: bold; }
.mic-underline-text { text-decoration: underline; }
.mic-red            { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
.mic-en-label       { font-family: sans-serif; font-size: 0.9rem; color: #333; }
.mic-ml-20          { margin-left: 20px; }
.mic-center-text    { text-align: center; }

.mic-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.mic-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.mic-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.mic-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.mic-header-text       { display: flex; flex-direction: column; align-items: center; }
.mic-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.mic-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.mic-address-text,
.mic-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.mic-photo-box-wrapper {
  position: absolute;
  top: 100px;
  right: 50px;
}
.mic-photo-box {
  width: 120px;
  height: 130px;
  border: 1px solid #555;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

.mic-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.mic-addressee-row     { margin-top: 5px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }

.mic-subject-section { text-align: center; margin: 20px 0; font-size: 1.1rem; font-weight: bold; }

.mic-form-body {
  font-size: 1.05rem;
  line-height: 1.8;
  text-align: justify;
  margin-bottom: 30px;
}

.mic-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 5px;
  padding: 0 5px;
  font-family: inherit;
  font-size: 1rem;
}
.mic-medium-input { width: 200px; }
.mic-small-input  { width: 100px; }
.mic-long-input   { width: 300px; }

.mic-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 2px;
  margin: 0 5px;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.mic-inline-box-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-family: inherit;
}
.mic-inline-box-input.mic-medium-box { width: 180px; }

.mic-section-header {
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
  margin: 10px 0;
}

.mic-form-fields-grid { margin-top: 10px; }
.mic-form-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 4px;
}
.mic-form-row label { margin-right: 5px; white-space: nowrap; }

.mic-thumb-section    { margin-top: 20px; margin-bottom: 10px; }
.mic-thumb-box-container { display: flex; gap: 0; margin-top: 5px; }
.mic-thumb-box {
  width: 100px;
  height: 100px;
  border: 1px solid #555;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
  font-size: 0.9rem;
  background-color: rgba(255,255,255,0.5);
}

.mic-declaration-text { margin: 20px 0; }

.mic-applicant-sign-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.mic-applicant-info-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-top: 20px;
}
.mic-info-row { display: flex; align-items: center; gap: 4px; }

.mic-recommendation-block {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dotted #999;
}
.mic-rec-footer-row {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.mic-rec-right {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-right: 50px;
}

.mic-signature-line-section { margin: 10px 0; }

.mic-footer { text-align: center; margin-top: 40px; }
.mic-save-print-btn {
  background-color: #34495e;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.mic-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
.mic-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.mic-copyright-footer {
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

  .mic-container,
  .mic-container * { visibility: visible; }

  .mic-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }

  .mic-footer,
  .mic-top-right-bread,
  .mic-copyright-footer { display: none !important; }

  input, select, textarea {
    background: white !important;
    color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .mic-container        { padding: 15px; }
  .mic-photo-box-wrapper { position: static; margin: 10px auto; }
  .mic-applicant-sign-row { flex-direction: column; }
  .mic-rec-footer-row   { flex-direction: column; gap: 16px; }
  .mic-medium-input     { width: 140px; }
  .mic-long-input       { width: 200px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const MinorIdentityCard = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Convenience setter for inline onChange lambdas
  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const validate = () => {
    if (!form.child_name_ne?.trim())   return "नाबालकको नाम आवश्यक छ";
    if (!form.birth_district?.trim())  return "जन्मस्थान जिल्ला आवश्यक छ";
    if (!form.father_name?.trim())     return "बाबुको नाम आवश्यक छ";
    if (!form.mother_name?.trim())     return "आमाको नाम आवश्यक छ";
    if (!form.applicant_name?.trim())  return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/minor-identity-card",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => setForm(INITIAL_STATE), 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  // Adapter for ApplicantDetailsNp (camelCase)
  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship_no,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name",
      applicantAddress:     "applicant_address",
      applicantCitizenship: "applicant_citizenship_no",
      applicantPhone:       "applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <form className="mic-container" onSubmit={handleSubmit}>

        {/* ── Top bar ── */}
        <div className="mic-top-bar-title">
          नाबालक परिचय पत्र ।
          <span className="mic-top-right-bread">
            सामाजिक / पारिवारिक &gt; नाबालक परिचय पत्र
          </span>
        </div>

        {/* ── Header ── */}
        <div className="mic-form-header-section">
          <div className="mic-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="mic-header-text">
            <h1 className="mic-municipality-name">{form.municipality_name}</h1>
            <h2 className="mic-ward-title">{form.ward_title}</h2>
            <p className="mic-address-text">नागार्जुन, काठमाडौँ</p>
            <p className="mic-province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* ── Photo box ── */}
        <div className="mic-photo-box-wrapper">
          <div className="mic-photo-box">नाबालकको फोटो</div>
        </div>

        {/* ── Addressee ── */}
        <div className="mic-addressee-section">
          <p className="mic-bold-text">श्रीमान प्रमुख जिल्ला अधिकारी ज्यू,</p>
          <div className="mic-addressee-row">
            <select
              name="addressee_type"
              value={form.addressee_type}
              onChange={handleChange}
              className="mic-inline-select"
            >
              <option>जिल्ला</option>
              <option>इलाका</option>
            </select>
            <span>प्रशासन कार्यालय,</span>
          </div>
          <div className="mic-addressee-row">
            <input
              type="text"
              name="addressee_office"
              value={form.addressee_office}
              onChange={handleChange}
              className="mic-line-input mic-medium-input"
            />
            <span className="mic-red">*</span>
            <span>,</span>
            <input
              type="text"
              name="addressee_place1"
              value={form.addressee_place1}
              onChange={handleChange}
              className="mic-line-input mic-medium-input"
            />
            <span className="mic-red">*</span>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="mic-subject-section">
          <p>
            विषय:- <span className="mic-underline-text">नाबालक परिचय पत्र पाउँ।</span>
          </p>
        </div>

        {/* ── Body ── */}
        <div className="mic-form-body">
          <p>
            महोदय,
            <br />
            मेरो निम्न विवरण भएको छोरा/छोरी{" "}
            <input
              type="text"
              name="child_name_ne"
              value={form.child_name_ne}
              onChange={handleChange}
              className="mic-line-input mic-medium-input"
            />{" "}
            <span className="mic-red">*</span> को नाबालक परिचयपत्र आवश्यक भएको
            हुदा रु. १०/- को टिकट टाँसी नाबालक परिचयपत्र पाउँन यो निवेदन पेश
            गरेको छु ।
          </p>

          <div className="mic-section-header">विवरण:</div>

          <div className="mic-form-fields-grid">

            <div className="mic-form-row">
              <label>नामथर : <span className="mic-red">*</span></label>
              <input type="text" name="child_name_ne" value={form.child_name_ne} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label className="mic-ml-20">लिङ्ग :</label>
              <select name="child_gender" value={form.child_gender} onChange={handleChange} className="mic-inline-select">
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </select>
            </div>

            <div className="mic-form-row">
              <label className="mic-en-label">FULL NAME(In Block): <span className="mic-red">*</span></label>
              <input type="text" name="child_fullname_en" value={form.child_fullname_en} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label className="mic-en-label mic-ml-20">Sex:</label>
              <span className="mic-en-label">{form.child_gender}</span>
            </div>

            <div className="mic-form-row">
              <label>जन्मस्थान: जिल्ला: <span className="mic-red">*</span></label>
              <input type="text" name="birth_district" value={form.birth_district} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label>गाउँपालिका <span className="mic-red">*</span></label>
              <input type="text" name="birth_rm" value={form.birth_rm} onChange={handleChange} className="mic-line-input mic-small-input" />
              <label>वडा नं.: <span className="mic-red">*</span></label>
              <input type="text" name="birth_ward_no" value={form.birth_ward_no} onChange={handleChange} className="mic-line-input mic-small-input" />
            </div>

            <div className="mic-form-row">
              <label className="mic-en-label">Place of Birth(In Block) District: <span className="mic-red">*</span></label>
              <input type="text" name="birth_district" value={form.birth_district} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label className="mic-en-label">R.M. : <span className="mic-red">*</span></label>
              <input type="text" name="birth_rm" value={form.birth_rm} onChange={handleChange} className="mic-line-input mic-small-input" />
              <label className="mic-en-label">WardNo: <span className="mic-red">*</span></label>
              <input type="text" name="birth_ward_no" value={form.birth_ward_no} onChange={handleChange} className="mic-line-input mic-small-input" />
            </div>

            <div className="mic-form-row">
              <label>स्थायी ठेगाना : जिल्ला: <span className="mic-red">*</span></label>
              <input type="text" name="permanent_district" value={form.permanent_district} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label>गाउँपालिका <span className="mic-red">*</span></label>
              <input type="text" name="permanent_rm" value={form.permanent_rm} onChange={handleChange} className="mic-line-input mic-small-input" />
              <label>वडा नं.: <span className="mic-red">*</span></label>
              <input type="text" name="permanent_ward_no" value={form.permanent_ward_no} onChange={handleChange} className="mic-line-input mic-small-input" />
            </div>

            <div className="mic-form-row">
              <label className="mic-en-label">Permanent Address(In Block): District: <span className="mic-red">*</span></label>
              <input type="text" name="permanent_district" value={form.permanent_district} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label className="mic-en-label">R.M. : <span className="mic-red">*</span></label>
              <input type="text" name="permanent_rm" value={form.permanent_rm} onChange={handleChange} className="mic-line-input mic-small-input" />
              <label className="mic-en-label">WardNo: <span className="mic-red">*</span></label>
              <input type="text" name="permanent_ward_no" value={form.permanent_ward_no} onChange={handleChange} className="mic-line-input mic-small-input" />
            </div>

            <div className="mic-form-row">
              <label>जन्म मिति:</label>
              <input type="text" name="birth_date_bs" value={form.birth_date_bs} onChange={handleChange} className="mic-line-input mic-medium-input" placeholder="YYYY-MM-DD (BS)" />
            </div>
            <div className="mic-form-row">
              <label className="mic-en-label">BirthDate: <span className="mic-red">*</span></label>
              <input type="text" name="birth_date_ad" value={form.birth_date_ad} onChange={handleChange} className="mic-line-input mic-medium-input" placeholder="YYYY-MM-DD (AD)" />
              <span className="mic-en-label">A.D.</span>
            </div>

            <div className="mic-form-row">
              <label>बाबुको नामथर : <span className="mic-red">*</span></label>
              <input type="text" name="father_name" value={form.father_name} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label>ठेगाना : <span className="mic-red">*</span></label>
              <input type="text" name="father_address" value={form.father_address} onChange={handleChange} className="mic-line-input mic-medium-input" />
            </div>

            <div className="mic-form-row">
              <label>आमाको नामथर : <span className="mic-red">*</span></label>
              <input type="text" name="mother_name" value={form.mother_name} onChange={handleChange} className="mic-line-input mic-medium-input" />
              <label>ठेगाना : <span className="mic-red">*</span></label>
              <input type="text" name="mother_address" value={form.mother_address} onChange={handleChange} className="mic-line-input mic-medium-input" />
            </div>

            <div className="mic-form-row">
              <label>बाबुको वा आमाको नागरिकता नं. <span className="mic-red">*</span></label>
              <input type="text" name="parent_citizenship_no" value={form.parent_citizenship_no} onChange={handleChange} className="mic-line-input mic-medium-input" />
            </div>

            <div className="mic-form-row">
              <label>संरक्षकको नाम ठेगाना : <span className="mic-red">*</span></label>
              <input type="text" name="guardian_name" value={form.guardian_name} onChange={handleChange} className="mic-line-input mic-long-input" />
              <span>,</span>
              <input type="text" name="guardian_address" value={form.guardian_address} onChange={handleChange} className="mic-line-input mic-medium-input" />
            </div>

          </div>

          {/* ── Thumb prints ── */}
          <div className="mic-thumb-section">
            <p>नाबालकको औंठा छाप</p>
            <div className="mic-thumb-box-container">
              <div className="mic-thumb-box">दायाँ</div>
              <div className="mic-thumb-box">बायाँ</div>
            </div>
          </div>

          <div className="mic-signature-line-section">
            <label>नाबालकको हस्ताक्षर : ........................</label>
          </div>

          <p className="mic-declaration-text mic-bold-text">
            माथि लेखिएको व्यहोरा ठिक साँचो हो, झुट्टा ठहरे कानुन बमोजिम
            सहुँला बुझाउँला भनी सही गर्ने ।
          </p>

          {/* ── Applicant signature row ── */}
          <div className="mic-applicant-sign-row">
            <div className="mic-thumb-section">
              <p className="mic-bold-text">निवेदकको सहीछाप</p>
              <div className="mic-thumb-box-container">
                <div className="mic-thumb-box">दायाँ</div>
                <div className="mic-thumb-box">बायाँ</div>
              </div>
            </div>
            <div className="mic-applicant-info-right">
              <div className="mic-info-row">
                <label className="mic-bold-text">निवेदकको हस्ताक्षर:</label>
              </div>
              <div className="mic-info-row">
                <label>नामथर : <span className="mic-red">*</span></label>
                <input
                  type="text"
                  name="applicant_name"
                  value={form.applicant_name}
                  onChange={handleChange}
                  className="mic-line-input mic-medium-input"
                />
              </div>
              <div className="mic-info-row">
                <label>ठेगाना : <span className="mic-red">*</span></label>
                <input
                  type="text"
                  name="applicant_address"
                  value={form.applicant_address}
                  onChange={handleChange}
                  className="mic-line-input mic-medium-input"
                />
              </div>
            </div>
          </div>

          {/* ── Recommendation block ── */}
          <div className="mic-recommendation-block">
            <p>
              निवेदक, श्री
              <select className="mic-inline-select">
                <option>श्री</option>
              </select>
              <input
                type="text"
                name="recommender_name"
                value={form.recommender_name}
                onChange={handleChange}
                className="mic-inline-box-input mic-medium-box"
              />{" "}
              <span className="mic-red">*</span> ले श्री{" "}
              <input
                type="text"
                name="child_name_ne"
                value={form.child_name_ne}
                onChange={handleChange}
                className="mic-inline-box-input mic-medium-box"
              />{" "}
              को छोरा श्री{" "}
              <input
                type="text"
                name="father_name"
                value={form.father_name}
                onChange={handleChange}
                className="mic-inline-box-input mic-medium-box"
              />{" "}
              को नाबालक परिचयपत्र माग गरि पेश गरेको विवरण ठिक छ। निवेदक र निज
              नाबालक दुवैलाई म राम्ररी चिन्दछु।
            </p>

            <h4 className="mic-bold-text" style={{ marginTop: "10px" }}>
              सिफारिस गर्नेको:
            </h4>

            <div className="mic-rec-footer-row">
              <div className="mic-rec-left">
                <div>
                  <label>
                    मिति{" "}
                    <input
                      type="text"
                      name="recommender_date"
                      value={form.recommender_date}
                      onChange={handleChange}
                      className="mic-line-input mic-small-input"
                    />
                  </label>
                </div>
              </div>
              <div className="mic-rec-right">
                <div><label>दस्तखत: ........................</label></div>
                <div className="mic-info-row">
                  <label>नामथर : <span className="mic-red">*</span></label>
                  <input
                    type="text"
                    name="recommender_name"
                    value={form.recommender_name}
                    onChange={handleChange}
                    className="mic-line-input mic-medium-input"
                  />
                </div>
                <div className="mic-info-row">
                  <label>पद: </label>
                  <select
                    name="recommender_designation"
                    value={form.recommender_designation}
                    onChange={handleChange}
                    className="mic-inline-select"
                  >
                    <option>पद छनौट गर्नुहोस्</option>
                    <option>वडा अध्यक्ष</option>
                    <option>वडा सचिव</option>
                    <option>कार्यवाहक वडा अध्यक्ष</option>
                  </select>
                </div>
                <div className="mic-info-row">
                  <label>कार्यालयको नाम र छाप:</label>
                  <input
                    type="text"
                    name="recommender_office_seal"
                    value={form.recommender_office_seal}
                    onChange={handleChange}
                    className="mic-line-input mic-medium-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Applicant details footer ── */}
        <ApplicantDetailsNp
          formData={footerForm}
          handleChange={handleFooterChange}
        />

        {/* ── Submit ── */}
        <div className="mic-footer">
          <button
            type="submit"
            className="mic-save-print-btn"
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="mic-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default MinorIdentityCard;