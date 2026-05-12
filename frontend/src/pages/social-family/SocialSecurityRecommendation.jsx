import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   There is no dedicated "social-security-recommendation"
   form key — this form likely maps to the existing
   social_security_recommendation table. Using that key.
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:              "२३",
  chalani_no:             "",
  date_bs:                "२०८२-०८-०६",
  municipality_name:      MUNICIPALITY.name        || "नागार्जुन नगरपालिका",
  ward_no:                MUNICIPALITY.wardNumber  || "१",
  // Addressee
  bank_name:              "",
  bank_branch:            "",
  // Body
  palika_type:            "नगरपालिका",
  allowance_type:         "ज्येष्ठ नागरिक",
  beneficiary_name:       "",
  napr_no:                "",
  identity_card_no:       "",
  death_date:             "२०८२-०८-०६",
  account_no:             "",
  heir_relation:          "छोरा",
  heir_title:             "श्री",
  heir_name:              "",
  heir_napr_no:           "",
  // Signature
  signatory_name:         "",
  signatory_designation:  "",
  // Footer applicant details
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship:  "",
  applicant_phone:        "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ssr-)
───────────────────────────────────────────── */
const styles = `
.ssr-container {
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

.ssr-bold-text      { font-weight: bold; }
.ssr-underline-text { text-decoration: underline; }
.ssr-red            { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
.ssr-red-text       { color: red; }
.ssr-red-mark       { color: red; position: absolute; top: 0; left: 0; }

.ssr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ssr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ssr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.ssr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.ssr-header-text      { display: flex; flex-direction: column; align-items: center; }
.ssr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ssr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.ssr-address-text,
.ssr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.ssr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.ssr-meta-left p,
.ssr-meta-right p { margin: 5px 0; }

.ssr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.ssr-small-input { width: 120px; }

.ssr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.ssr-bank-row {
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.ssr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 5px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.ssr-long-input  { width: 250px; }

.ssr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.ssr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.ssr-inline-input {
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
.ssr-inline-input:focus { border-color: #3b7dd8; }

.ssr-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.ssr-tiny-box   { width: 40px; text-align: center; }
.ssr-small-box  { width: 100px; }
.ssr-medium-box { width: 160px; }

.ssr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.ssr-signature-block {
  width: 220px;
  text-align: center;
  position: relative;
}
.ssr-signature-line {
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  width: 100%;
}
.ssr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.ssr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.ssr-footer { text-align: center; margin-top: 40px; }
.ssr-save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.ssr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.ssr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.ssr-copyright-footer {
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

  .ssr-container,
  .ssr-container * { visibility: visible; }

  .ssr-container {
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

  .ssr-footer,
  .ssr-top-right-bread,
  .ssr-copyright-footer { display: none !important; }

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
  .ssr-container { padding: 15px; }
  .ssr-meta-data-row { flex-direction: column; gap: 8px; }
  .ssr-inline-input { width: 110px; }
  .ssr-long-input { width: 180px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const SocialSecurityRecommendation = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.bank_name?.trim())         return "बैंकको नाम आवश्यक छ";
    if (!form.beneficiary_name?.trim())  return "लाभग्राहीको नाम आवश्यक छ";
    if (!form.napr_no?.trim())           return "ना.प्र.नं. आवश्यक छ";
    if (!form.account_no?.trim())        return "खाता नं. आवश्यक छ";
    if (!form.heir_name?.trim())         return "हकदारको नाम आवश्यक छ";
    if (!form.applicant_name?.trim())    return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim())   return "फोन नम्बर आवश्यक छ";
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
        "/api/forms/social-security-recommendation",
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

  // Adapter for ApplicantDetailsNp (expects camelCase)
  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name",
      applicantAddress:     "applicant_address",
      applicantCitizenship: "applicant_citizenship",
      applicantPhone:       "applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="ssr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top bar ── */}
          <div className="ssr-top-bar-title">
            सामाजिक सुरक्षा सिफारिस ।
            <span className="ssr-top-right-bread">
              सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षा सिफारिस ।
            </span>
          </div>

          {/* ── Header ── */}
          <div className="ssr-form-header-section">
            <div className="ssr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="ssr-header-text">
              <h1 className="ssr-municipality-name">{form.municipality_name}</h1>
              <h2 className="ssr-ward-title">{form.ward_no} नं. वडा कार्यालय</h2>
              <p className="ssr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="ssr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="ssr-meta-data-row">
            <div className="ssr-meta-left">
              <p>
                पत्र संख्या :{" "}
                <span className="ssr-bold-text">
                  <input
                    type="text"
                    name="letter_no"
                    value={form.letter_no}
                    onChange={handleChange}
                    className="ssr-dotted-input ssr-small-input"
                  />
                </span>
              </p>
              <p>
                चलानी नं. :{" "}
                <input
                  type="text"
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="ssr-dotted-input ssr-small-input"
                />
              </p>
            </div>
            <div className="ssr-meta-right">
              <p>
                मिति :{" "}
                <input
                  type="text"
                  name="date_bs"
                  value={form.date_bs}
                  onChange={handleChange}
                  className="ssr-dotted-input ssr-small-input"
                />
              </p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Addressee ── */}
          <div className="ssr-addressee-section">
            <p className="ssr-bold-text">श्री शाखा प्रमुख ज्यु,</p>
            <div className="ssr-bank-row">
              <span className="ssr-red">*</span>
              <input
                type="text"
                name="bank_name"
                value={form.bank_name}
                onChange={handleChange}
                className="ssr-line-input ssr-long-input"
                required
              />
              <span>.लि.</span>
            </div>
            <div className="ssr-bank-row">
              <span>शाखा कार्यालय,</span>
              <span className="ssr-red">*</span>
              <input
                type="text"
                name="bank_branch"
                value={form.bank_branch}
                onChange={handleChange}
                className="ssr-line-input ssr-long-input"
              />
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="ssr-subject-section">
            <p>
              विषय:
              <span className="ssr-underline-text">
                सिफारिस गरिएको सम्बन्धमा।
              </span>
            </p>
          </div>

          {/* ── Body paragraph ── */}
          <div className="ssr-form-body">
            <p>
              प्रस्तुत विषयमा यस{" "}
              <input
                type="text"
                name="municipality_name"
                value={form.municipality_name}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
              />
              <select
                name="palika_type"
                value={form.palika_type}
                onChange={handleChange}
                className="ssr-inline-select"
              >
                <option>गाउँपालिका</option>
                <option>नगरपालिका</option>
              </select>
              वडा नं.{" "}
              <input
                type="text"
                name="ward_no"
                value={form.ward_no}
                onChange={handleChange}
                className="ssr-inline-input ssr-tiny-box"
              />{" "}
              बाट सामाजिक सुरक्षा भत्ता प्राप्त गर्ने (
              <input
                type="text"
                name="allowance_type"
                value={form.allowance_type}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box ssr-red-text"
              />{" "}
              ) लाभग्राही
              <input
                type="text"
                name="beneficiary_name"
                value={form.beneficiary_name}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
                required
              />{" "}
              <span className="ssr-red">*</span> ना.प्र.नं
              <input
                type="text"
                name="napr_no"
                value={form.napr_no}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
                required
              />{" "}
              <span className="ssr-red">*</span> परिचय पत्र नं
              <input
                type="text"
                name="identity_card_no"
                value={form.identity_card_no}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
              />{" "}
              को मिति{" "}
              <input
                type="text"
                name="death_date"
                value={form.death_date}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
              />{" "}
              गते
              <span className="ssr-red-text ssr-bold-text"> मृत्यु </span>
              भएको र निजको खाता नं
              <input
                type="text"
                name="account_no"
                value={form.account_no}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
                required
              />{" "}
              <span className="ssr-red">*</span> मा रहेको सामाजिक सुरक्षा भत्ता
              बापत मृत्यु भएको मिति सम्मको रकम निकाल निजको
              <select
                name="heir_relation"
                value={form.heir_relation}
                onChange={handleChange}
                className="ssr-inline-select"
              >
                <option>छोरा</option>
                <option>छोरी</option>
                <option>पति</option>
                <option>पत्नी</option>
              </select>
              ले पेश गरेको निवेदनको आधारमा निजको{" "}
              <span className="ssr-red">*</span>
              <select
                name="heir_title"
                value={form.heir_title}
                onChange={handleChange}
                className="ssr-inline-select"
              >
                <option>श्री</option>
                <option>सुश्री</option>
                <option>श्रीमती</option>
              </select>
              <input
                type="text"
                name="heir_name"
                value={form.heir_name}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
                required
              />{" "}
              <span className="ssr-red">*</span> ना.प्र.नं
              <input
                type="text"
                name="heir_napr_no"
                value={form.heir_napr_no}
                onChange={handleChange}
                className="ssr-inline-input ssr-medium-box"
              />{" "}
              <span className="ssr-red">*</span> लाई रकम निकाल्ने आवश्यक व्यवस्था
              मिलाई सहयोग गरिदिनुहुन अनुरोध छ । साथै निजको नाममा रहेको सामाजिक
              सुरक्षा खाता समेत बन्द गरिदिनुहुन अनुरोध छ ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="ssr-signature-section">
            <div className="ssr-signature-block">
              <div className="ssr-signature-line"></div>
              <span className="ssr-red-mark">*</span>
              <input
                type="text"
                name="signatory_name"
                value={form.signatory_name}
                onChange={handleChange}
                className="ssr-sig-input"
                required
              />
              <select
                name="signatory_designation"
                value={form.signatory_designation}
                onChange={handleChange}
                className="ssr-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={footerForm}
            handleChange={handleFooterChange}
          />

          {/* ── Submit ── */}
          <div className="ssr-footer">
            <button
              type="submit"
              className="ssr-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ssr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default SocialSecurityRecommendation;