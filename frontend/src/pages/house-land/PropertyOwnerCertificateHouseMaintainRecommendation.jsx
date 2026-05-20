import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:            "२०८२/८३",
  chalani_no:           "",
  date_nep:             new Date().toISOString().slice(0, 10),
  // Addressee — were missing from state entirely (uncontrolled inputs)
  addressee_office:     "जिल्ला प्रशासन कार्यालय",
  addressee_place:      "",
  // Body
  applicant_type:       "मेरो",
  previous_place_text:  "",
  previous_place_type:  "",
  previous_ward_no:     "",
  plot_number:          "",
  area:                 "",
  // Signature
  signer_name:          "",
  signer_designation:   "",
  // Footer applicant details
  applicant_name:           "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
  notes:                    "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: pochm-)
───────────────────────────────────────────── */
const styles = `
.pochm-container {
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

.pochm-bold-text      { font-weight: bold; }
.pochm-underline-text { text-decoration: underline; }
.pochm-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.pochm-bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

.pochm-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.pochm-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.pochm-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.pochm-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.pochm-header-text       { display: flex; flex-direction: column; align-items: center; }
.pochm-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.pochm-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.pochm-address-text,
.pochm-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.pochm-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.pochm-meta-left p, .pochm-meta-right p { margin: 5px 0; }

.pochm-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.pochm-small-input { width: 120px; }

.pochm-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.pochm-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.pochm-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.pochm-medium-input { width: 200px; }

.pochm-bold-select {
  font-weight: bold;
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  font-size: 1rem;
  font-family: inherit;
  margin-left: 5px;
  outline: none;
  cursor: pointer;
}

.pochm-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.pochm-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.pochm-inline-input {
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
.pochm-inline-input:focus { border-color: #3b7dd8; }

.pochm-inline-select {
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

.pochm-tiny-box   { width: 40px; text-align: center; }
.pochm-small-box  { width: 100px; }
.pochm-medium-box { width: 150px; }

.pochm-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.pochm-signature-block { width: 220px; text-align: center; position: relative; }
.pochm-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.pochm-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.pochm-designation-select {
  width: 100%; padding: 5px;
  border: 1px solid #ccc; background: #fff;
  font-family: inherit; font-size: 1rem;
}

.pochm-footer { text-align: center; margin-top: 40px; }
.pochm-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.pochm-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.pochm-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.pochm-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

@media print {
  body * { visibility: hidden; }
  .pochm-container, .pochm-container * { visibility: visible; }
  .pochm-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .pochm-footer, .pochm-top-right-bread, .pochm-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

@media (max-width: 768px) {
  .pochm-container { padding: 15px; }
  .pochm-meta-data-row { flex-direction: column; gap: 8px; }
  .pochm-inline-input { width: 110px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function PropertyOwnerCertificateHouseMaintainRecommendation() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.previous_ward_no?.trim()) return "साविक वडा नम्बर आवश्यक छ";
    if (!form.plot_number?.trim())      return "कित्ता नम्बर आवश्यक छ";
    if (!form.area?.trim())             return "क्षेत्रफल आवश्यक छ";
    if (!form.applicant_name?.trim())   return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim())  return "फोन नम्बर आवश्यक छ";
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
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post(
        "/api/forms/property-owner-certificate-house-maintain-recommendation",
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
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="pochm-container">
        <form onSubmit={handleSubmit}>

          <div className="pochm-top-bar-title">
            जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस ।
            <span className="pochm-top-right-bread">
              घर / जग्गा जमिन &gt; जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस
            </span>
          </div>

          <div className="pochm-form-header-section">
            <div className="pochm-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="pochm-header-text">
              <h1 className="pochm-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="pochm-ward-title">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </h2>
              <p className="pochm-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="pochm-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="pochm-meta-data-row">
            <div className="pochm-meta-left">
              <p>पत्र संख्या : <span className="pochm-bold-text">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="pochm-dotted-input pochm-small-input"
                />
              </p>
            </div>
            <div className="pochm-meta-right">
              <p>मिति : <span className="pochm-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Addressee — now fully controlled ── */}
          <div className="pochm-addressee-section">
            <div className="pochm-addressee-row">
              <span>श्री</span>
              <select
                name="addressee_office"
                value={form.addressee_office}
                onChange={handleChange}
                className="pochm-bold-select"
              >
                <option>जिल्ला प्रशासन कार्यालय</option>
                <option>मालपोत कार्यालय</option>
                <option>नापी कार्यालय</option>
              </select>
            </div>
            <div className="pochm-addressee-row">
              <input
                name="addressee_place"
                value={form.addressee_place}
                onChange={handleChange}
                className="pochm-line-input pochm-medium-input"
                placeholder="ठेगाना (उदा. काठमाडौँ)"
              />
            </div>
          </div>

          <div className="pochm-subject-section">
            <p>
              विषय:{" "}
              <span className="pochm-underline-text">सिफारिस सम्बन्धमा।</span>
            </p>
          </div>

          <div className="pochm-form-body">
            <p>
              उपरोक्त सम्बन्धमा
              <select
                name="applicant_type"
                value={form.applicant_type}
                onChange={handleChange}
                className="pochm-inline-select"
              >
                <option value="मेरो">मेरो</option>
                <option value="हाम्रो">हाम्रो</option>
              </select>
              नाममा एकलौटी दर्ता श्रेस्ता भएको{" "}
              <span className="pochm-bg-gray-text">{MUNICIPALITY.name}</span>{" "}
              वडा नं.{" "}
              <span className="pochm-bg-gray-text">{MUNICIPALITY.wardNumber}</span>{" "}
              (साविकको ठेगाना
              <input
                name="previous_place_text"
                value={form.previous_place_text}
                onChange={handleChange}
                className="pochm-inline-input pochm-medium-box"
              />
              <select
                name="previous_place_type"
                value={form.previous_place_type}
                onChange={handleChange}
                className="pochm-inline-select"
              >
                <option value=""></option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="न.पा.">न.पा.</option>
              </select>
              वडा नं.
              <input
                name="previous_ward_no"
                value={form.previous_ward_no}
                onChange={handleChange}
                className="pochm-inline-input pochm-tiny-box"
                required
              />
              ) कि.नं.
              <input
                name="plot_number"
                value={form.plot_number}
                onChange={handleChange}
                className="pochm-inline-input pochm-small-box"
                required
              />
              को क्षे.फ.
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                className="pochm-inline-input pochm-small-box"
                required
              />
              जग्गाको जग्गाधनी श्रेस्ता पुर्जामा घर कायम गरी पाउन भनी निवेदन
              दिइएको हुँदा सो सम्बन्धमा यहाँको नियमानुसार घर कायम गराई दिनुहुन
              सिफारिस गरिन्छ।
            </p>
          </div>

          <div className="pochm-signature-section">
            <div className="pochm-signature-block">
              <div className="pochm-signature-line"></div>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="pochm-sig-input"
                required
              />
              <select
                name="signer_designation"
                value={form.signer_designation}
                onChange={handleChange}
                className="pochm-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp
            formData={footerForm}
            handleChange={handleFooterChange}
          />

          <div className="pochm-footer">
            <button
              type="submit"
              className="pochm-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="pochm-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}