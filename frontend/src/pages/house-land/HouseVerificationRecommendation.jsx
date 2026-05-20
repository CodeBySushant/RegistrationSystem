import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:             "२०८२/८३",
  chalani_no:            "",
  date_nep:              new Date().toISOString().slice(0, 10),
  addressee_type:        "भुमि सुधार कार्यालय",
  addressee_location:    "",
  municipality:          MUNICIPALITY.name       || "",
  ward_no:               MUNICIPALITY.wardNumber || "1",
  applicant_fullname:    "",
  previous_place_text:   "",
  previous_place_type:   "",
  previous_ward_no:      "",
  current_place_text:    "",
  current_ward_no:       "",
  plot_number:           "",
  area:                  "",
  notes:                 "",
  signer_name:           "",
  signer_designation:    "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: hvr-)
───────────────────────────────────────────── */
const styles = `
.hvr-container {
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

.hvr-bold-text      { font-weight: bold; }
.hvr-underline-text { text-decoration: underline; }
.hvr-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.hvr-red-mark       { color: red; position: absolute; top: 0; left: 0; }

.hvr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.hvr-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.hvr-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.hvr-header-logo img     { position: absolute; left: 0; top: 0; width: 80px; }
.hvr-header-text         { display: flex; flex-direction: column; align-items: center; }
.hvr-municipality-name   { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.hvr-ward-title          { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.hvr-address-text,
.hvr-province-text       { color: #e74c3c; margin: 0; font-size: 1rem; }

.hvr-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.hvr-meta-left p, .hvr-meta-right p { margin: 5px 0; }

.hvr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.hvr-small-input { width: 120px; }

.hvr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.hvr-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.hvr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.hvr-medium-input { width: 200px; }

.hvr-bold-select {
  font-weight: bold;
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  font-size: 1.05rem;
  font-family: inherit;
  margin-left: 5px;
  outline: none;
  cursor: pointer;
}

.hvr-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.hvr-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.hvr-inline-input {
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
.hvr-inline-input:focus { border-color: #3b7dd8; }

.hvr-inline-select {
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

.hvr-tiny-box   { width: 40px; text-align: center; }
.hvr-small-box  { width: 100px; }
.hvr-medium-box { width: 150px; }
.hvr-long-box   { width: 250px; }

.hvr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.hvr-signature-block { width: 220px; text-align: center; position: relative; }
.hvr-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.hvr-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.hvr-designation-select {
  width: 100%; padding: 5px;
  border: 1px solid #ccc; background: #fff;
  font-family: inherit; font-size: 1rem;
}

.hvr-footer { text-align: center; margin-top: 40px; }
.hvr-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.hvr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.hvr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.hvr-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

@media print {
  body * { visibility: hidden; }
  .hvr-container, .hvr-container * { visibility: visible; }
  .hvr-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .hvr-footer, .hvr-top-right-bread, .hvr-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

@media (max-width: 768px) {
  .hvr-container { padding: 15px; }
  .hvr-meta-data-row { flex-direction: column; gap: 8px; }
  .hvr-inline-input { width: 110px; }
  .hvr-long-box { width: 180px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HouseVerificationRecommendation() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.addressee_location?.trim()) return "ठेगाना आवश्यक छ";
    if (!form.applicant_fullname?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.previous_ward_no?.trim())   return "साविक वडा नम्बर आवश्यक छ";
    if (!form.current_place_text?.trim()) return "हालको ठेगाना आवश्यक छ";
    if (!form.plot_number?.trim())        return "कित्ता नम्बर आवश्यक छ";
    if (!form.area?.trim())               return "क्षेत्रफल आवश्यक छ";
    if (!form.applicant_phone?.trim())    return "फोन नम्बर आवश्यक छ";
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
        "/api/forms/house-verification-recommendation",
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
    applicantName:        form.applicant_fullname,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship_no,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_fullname",
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

      <div className="hvr-container">
        <form onSubmit={handleSubmit}>

          <div className="hvr-top-bar-title">
            घर जनाउने सिफारिस ।
            <span className="hvr-top-right-bread">
              घर / जग्गा जमिन &gt; घर जनाउने सिफारिस
            </span>
          </div>

          <div className="hvr-form-header-section">
            <div className="hvr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="hvr-header-text">
              <h1 className="hvr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="hvr-ward-title">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </h2>
              <p className="hvr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="hvr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="hvr-meta-data-row">
            <div className="hvr-meta-left">
              <p>पत्र संख्या : <span className="hvr-bold-text">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  type="text"
                  className="hvr-dotted-input hvr-small-input"
                />
              </p>
            </div>
            <div className="hvr-meta-right">
              <p>मिति : <span className="hvr-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          <div className="hvr-addressee-section">
            <div className="hvr-addressee-row">
              <span>श्री</span>
              <select
                name="addressee_type"
                className="hvr-bold-select"
                value={form.addressee_type}
                onChange={handleChange}
              >
                <option>भुमि सुधार कार्यालय</option>
                <option>मालपोत कार्यालय</option>
              </select>
              <span>,</span>
            </div>
            <div className="hvr-addressee-row">
              <input
                name="addressee_location"
                value={form.addressee_location}
                onChange={handleChange}
                className="hvr-line-input hvr-medium-input"
                required
              />
              <span className="hvr-red">*</span>
              <span className="hvr-bold-text">, काठमाडौँ</span>
            </div>
          </div>

          <div className="hvr-subject-section">
            <p>
              विषय:{" "}
              <span className="hvr-underline-text">सिफारिस सम्बन्धमा।</span>
            </p>
          </div>

          <div className="hvr-form-body">
            <p>
              उपरोक्त सम्बन्धमा जिल्ला{" "}
              <span className="hvr-bold-text">काठमाडौँ</span>{" "}
              <span className="hvr-bold-text" style={{ marginLeft: 20 }}>
                {form.municipality}
              </span>{" "}
              वडा नं. <span className="hvr-bold-text">{form.ward_no}</span>{" "}
              बस्ने{" "}
              <input
                name="applicant_fullname"
                value={form.applicant_fullname}
                onChange={handleChange}
                className="hvr-inline-input hvr-long-box"
                required
              />{" "}
              <span className="hvr-red">*</span> ले मेरो नाउँमा मालपोत
              कार्यालय, <span className="hvr-bold-text">काठमाडौँ</span> मा दर्ता
              भएको साविक{" "}
              <input
                name="previous_place_text"
                value={form.previous_place_text}
                onChange={handleChange}
                className="hvr-inline-input hvr-medium-box"
              />{" "}
              <select
                name="previous_place_type"
                value={form.previous_place_type}
                onChange={handleChange}
                className="hvr-inline-select"
              >
                <option value=""></option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="नगरपालिका">नगरपालिका</option>
              </select>
              , वडा नं.{" "}
              <input
                name="previous_ward_no"
                value={form.previous_ward_no}
                onChange={handleChange}
                className="hvr-inline-input hvr-tiny-box"
                required
              />{" "}
              <span className="hvr-red">*</span> हाल{" "}
              <input
                name="current_place_text"
                value={form.current_place_text}
                onChange={handleChange}
                className="hvr-inline-input hvr-medium-box"
                required
              />{" "}
              <span className="hvr-red">*</span> वडा नं.{" "}
              <input
                name="current_ward_no"
                value={form.current_ward_no}
                onChange={handleChange}
                className="hvr-inline-input hvr-tiny-box"
                required
              />{" "}
              <span className="hvr-red">*</span> को कि.नं.{" "}
              <input
                name="plot_number"
                value={form.plot_number}
                onChange={handleChange}
                className="hvr-inline-input hvr-small-box"
                required
              />{" "}
              <span className="hvr-red">*</span> क्षे.फ.{" "}
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                className="hvr-inline-input hvr-small-box"
                required
              />{" "}
              <span className="hvr-red">*</span> जग्गामा मैले घर निर्माण गरी
              सकेको र हालसम्म ज.ध.प्र.मा घर नजनिएकोले घर जनाउनको लागि सिफारिस
              पाउँ भनी निवेदन पेश गरेकोले सो सम्बन्धमा सिफारिस गरिन्छ।
            </p>
          </div>

          <div className="hvr-signature-section">
            <div className="hvr-signature-block">
              <div className="hvr-signature-line"></div>
              <span className="hvr-red-mark">*</span>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="hvr-sig-input"
                required
              />
              <select
                name="signer_designation"
                value={form.signer_designation}
                onChange={handleChange}
                className="hvr-designation-select"
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

          <div className="hvr-footer">
            <button
              type="submit"
              className="hvr-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="hvr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}