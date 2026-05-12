import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "disable-identity-card-renew"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  chalani_no:             "",
  certificate_type:       "disability",
  municipality_display:   MUNICIPALITY.name       || "नागार्जुन",
  ward_no:                MUNICIPALITY.wardNumber || "१",
  prev_unit_name:         "",
  prev_unit_ward:         "",
  relation_text:          "",
  relation_child_type:    "छोरा",
  relation_child_name:    "",
  certificate_date:       "",
  certificate_number:     "",
  renewal_type:           "",
  signatory_name:         "",
  signatory_designation:  "",
  // footer applicant details
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship_no: "",
  applicant_phone:        "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: dicr-)
───────────────────────────────────────────── */
const styles = `
.dicr-container {
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

.dicr-bold-text      { font-weight: bold; }
.dicr-underline-text { text-decoration: underline; }
.dicr-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.dicr-red-mark       { color: red; position: absolute; top: 0; left: 0; }
.dicr-bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

.dicr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.dicr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.dicr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.dicr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.dicr-header-text       { display: flex; flex-direction: column; align-items: center; }
.dicr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.dicr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.dicr-address-text,
.dicr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.dicr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.dicr-meta-left p,
.dicr-meta-right p { margin: 5px 0; }

.dicr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.dicr-small-input  { width: 120px; }

.dicr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.dicr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.dicr-addressee-row     { margin-bottom: 8px; }

.dicr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.dicr-medium-input { width: 200px; }

.dicr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.dicr-inline-input {
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
.dicr-inline-input:focus { border-color: #3b7dd8; }

.dicr-inline-select {
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

.dicr-tiny-box   { width: 40px; text-align: center; }
.dicr-small-box  { width: 100px; }
.dicr-medium-box { width: 160px; }

.dicr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.dicr-signature-block {
  width: 220px;
  text-align: center;
  position: relative;
}
.dicr-signature-line {
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  width: 100%;
}
.dicr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.dicr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.dicr-footer { text-align: center; margin-top: 40px; }
.dicr-save-print-btn {
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
.dicr-save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
.dicr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.dicr-copyright-footer {
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

  .dicr-container,
  .dicr-container * { visibility: visible; }

  .dicr-container {
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

  .dicr-footer,
  .dicr-top-right-bread,
  .dicr-copyright-footer { display: none !important; }

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
  .dicr-container { padding: 15px; }
  .dicr-meta-data-row { flex-direction: column; gap: 8px; }
  .dicr-inline-input { width: 110px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const DisableIdentityCardRenew = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.prev_unit_ward?.trim())      return "साविक वडा नम्बर आवश्यक छ";
    if (!form.relation_text?.trim())       return "नाम आवश्यक छ";
    if (!form.relation_child_name?.trim()) return "सन्तानको नाम आवश्यक छ";
    if (!form.certificate_date?.trim())    return "प्रमाणपत्र मिति आवश्यक छ";
    if (!form.certificate_number?.trim())  return "प्रमाणपत्र नम्बर आवश्यक छ";
    if (!form.renewal_type?.trim())        return "नवीकरण प्रकार आवश्यक छ";
    if (!form.applicant_name?.trim())      return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim())     return "फोन नम्बर आवश्यक छ";
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
        "/api/forms/disable-identity-card-renew",
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

      <form className="dicr-container" onSubmit={handleSubmit}>

        {/* ── Top bar ── */}
        <div className="dicr-top-bar-title">
          परिचय पत्र नवीकरण ।
          <span className="dicr-top-right-bread">
            सामाजिक / पारिवारिक &gt; परिचय पत्र नवीकरण
          </span>
        </div>

        {/* ── Header ── */}
        <div className="dicr-form-header-section">
          <div className="dicr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="dicr-header-text">
            <h1 className="dicr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="dicr-ward-title">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </h2>
            <p className="dicr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="dicr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="dicr-meta-data-row">
          <div className="dicr-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="dicr-bold-text">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                value={form.chalani_no}
                onChange={handleChange}
                className="dicr-dotted-input dicr-small-input"
              />
            </p>
          </div>
          <div className="dicr-meta-right">
            <p>मिति : <span className="dicr-bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="dicr-subject-section">
          <p>
            विषय:
            <select
              name="certificate_type"
              value={form.certificate_type}
              onChange={handleChange}
              className="dicr-inline-select dicr-bold-text"
              style={{ border: "1px solid #ccc" }}
            >
              <option value="">प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
              <option value="disability">अपाङ्गता परिचयपत्र</option>
              <option value="senior">ज्येष्ठ नागरिक परिचयपत्र</option>
            </select>
            <span className="dicr-underline-text dicr-bold-text">
              {" "}नवीकरण बारे ।
            </span>
          </p>
        </div>

        {/* ── Addressee ── */}
        <div className="dicr-addressee-section">
          <div className="dicr-addressee-row">
            <span>श्री {MUNICIPALITY.name} ,</span>
          </div>
          <div className="dicr-addressee-row">
            <span>नगर कार्यपालिकाको कार्यालय</span>
          </div>
          <div className="dicr-addressee-row">
            <input
              type="text"
              name="municipality_display"
              value={form.municipality_display}
              onChange={handleChange}
              className="dicr-line-input dicr-medium-input"
            />
            <span>, काठमाडौँ ।</span>
          </div>
        </div>

        {/* ── Body paragraph ── */}
        <div className="dicr-form-body">
          <p>
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <span className="dicr-bg-gray-text">काठमाडौँ</span>{" "}
            <span className="dicr-bg-gray-text">{MUNICIPALITY.name}</span>{" "}
            वडा नं{" "}
            <span className="dicr-bg-gray-text">{form.ward_no}</span>{" "}
            (साविक जिल्ला काठमाडौँ
            <input
              name="prev_unit_name"
              type="text"
              value={form.prev_unit_name}
              onChange={handleChange}
              className="dicr-inline-input dicr-medium-box"
            />
            वडा नं{" "}
            <input
              name="prev_unit_ward"
              type="text"
              value={form.prev_unit_ward}
              onChange={handleChange}
              className="dicr-inline-input dicr-tiny-box"
              required
            />{" "}
            <span className="dicr-red">*</span> ) मा बस्ने
            <input
              name="relation_text"
              type="text"
              value={form.relation_text}
              onChange={handleChange}
              className="dicr-inline-input dicr-medium-box"
              required
            />{" "}
            <span className="dicr-red">*</span> को
            <select
              name="relation_child_type"
              value={form.relation_child_type}
              onChange={handleChange}
              className="dicr-inline-select"
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <input
              name="relation_child_name"
              type="text"
              value={form.relation_child_name}
              onChange={handleChange}
              className="dicr-inline-input dicr-medium-box"
              required
            />{" "}
            <span className="dicr-red">*</span> ले यस कार्यालयमा दिनु भएको
            निवेदन अनुसार निजले मिति
            <input
              name="certificate_date"
              type="text"
              value={form.certificate_date}
              onChange={handleChange}
              className="dicr-inline-input dicr-medium-box"
              required
            />{" "}
            <span className="dicr-red">*</span> नम्बर नं
            <input
              name="certificate_number"
              type="text"
              value={form.certificate_number}
              onChange={handleChange}
              className="dicr-inline-input dicr-medium-box"
              required
            />{" "}
            <span className="dicr-red">*</span> प्राप्त गरेकोले तहाँ
            कार्यालयको नियमानुसार
            <input
              name="renewal_type"
              type="text"
              value={form.renewal_type}
              onChange={handleChange}
              className="dicr-inline-input dicr-medium-box"
              required
            />{" "}
            <span className="dicr-red">*</span> नवीकरण गरिदिनुहुन सिफारिस
            साथ सादर अनुरोध गरिन्छ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="dicr-signature-section">
          <div className="dicr-signature-block">
            <div className="dicr-signature-line"></div>
            <span className="dicr-red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              value={form.signatory_name}
              onChange={handleChange}
              className="dicr-sig-input"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="dicr-designation-select"
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
        <div className="dicr-footer">
          <button
            type="submit"
            className="dicr-save-print-btn"
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="dicr-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DisableIdentityCardRenew;