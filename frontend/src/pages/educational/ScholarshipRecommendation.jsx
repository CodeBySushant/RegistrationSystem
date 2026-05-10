import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "scholarship-recommendation"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:              "२०८२/८३",
  chalani_no:             "",
  date:                   "२०८२-०८-०६",
  sabik_place:            "",
  ward_no:                MUNICIPALITY.wardNumber || "",
  sabik_ward_no:          "",
  residency_type:         "स्थायी",
  father_name:            "",
  mother_name:            "",
  household_economic_status: "कमजोर",
  child_relation:         "छोरा",
  child_title:            "श्री",
  child_name:             "",
  signature_name:         "",
  designation:            "पद छनौट गर्नुहोस्",
  // footer applicant details
  applicant_name:         "",
  applicant_address:      "",
  applicant_citizenship:  "",
  applicant_phone:        "",
  notes:                  "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: scr-)
───────────────────────────────────────────── */
const styles = `
.scr-container {
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

.scr-bold-text      { font-weight: bold; }
.scr-underline-text { text-decoration: underline; }
.scr-red-text       { color: #e74c3c; }

.scr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.scr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.scr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.scr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.scr-header-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.scr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.scr-address-text,
.scr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.scr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.scr-meta-left p,
.scr-meta-right p { margin: 5px 0; }

.scr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.scr-small-input  { width: 120px; }
.scr-medium-input { width: 200px; }

.scr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.scr-salutation-section {
  margin-bottom: 20px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.scr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.scr-inline-input {
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
.scr-inline-input:focus { border-color: #3b7dd8; }

.scr-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-weight: bold;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.scr-tiny-box   { width: 40px; text-align: center; }
.scr-medium-box { width: 160px; }
.scr-long-box   { width: 220px; }

.scr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.scr-signature-block { width: 220px; text-align: center; }
.scr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.scr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.scr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.scr-footer {
  text-align: center;
  margin-top: 40px;
}
.scr-save-print-btn {
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
.scr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.scr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.scr-copyright-footer {
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

  .scr-container,
  .scr-container * { visibility: visible; }

  .scr-container {
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

  .scr-footer,
  .scr-top-right-bread,
  .scr-copyright-footer { display: none !important; }

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
  .scr-container { padding: 15px; }
  .scr-meta-data-row { flex-direction: column; gap: 8px; }
  .scr-inline-input { width: 100px; }
  .scr-long-box { width: 160px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ScholarshipRecommendation = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.father_name?.trim())   return "बुबाको नाम आवश्यक छ";
    if (!form.mother_name?.trim())   return "आमाको नाम आवश्यक छ";
    if (!form.child_name?.trim())    return "विद्यार्थीको नाम आवश्यक छ";
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
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

      const res = await axiosInstance.post(
        "/api/forms/scholarship-recommendation",
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

  // Adapter for ApplicantDetailsNp which expects camelCase keys
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

      <div className="scr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top bar ── */}
          <div className="scr-top-bar-title">
            छात्रवृत्ति सिफारिस ।
            <span className="scr-top-right-bread">
              शैक्षिक &gt; छात्रवृत्ति सिफारिस
            </span>
          </div>

          {/* ── Header ── */}
          <div className="scr-form-header-section">
            <div className="scr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="scr-header-text">
              <h1 className="scr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="scr-ward-title">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </h2>
              <p className="scr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="scr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="scr-meta-data-row">
            <div className="scr-meta-left">
              <p>
                पत्र संख्या :{" "}
                <span className="scr-bold-text">
                  <input
                    type="text"
                    name="letter_no"
                    value={form.letter_no}
                    onChange={handleChange}
                    className="scr-dotted-input scr-small-input"
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
                  className="scr-dotted-input scr-small-input"
                />
              </p>
            </div>
            <div className="scr-meta-right">
              <p>
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="scr-dotted-input scr-small-input"
                />
              </p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="scr-subject-section">
            <p>
              विषय:{" "}
              <span className="scr-underline-text">छात्रवृत्ति सिफारिस ।</span>
            </p>
          </div>

          {/* ── Salutation ── */}
          <div className="scr-salutation-section">
            <label className="scr-red-text">जो सँग ...</label>
            <input
              type="text"
              name="sabik_place"
              value={form.sabik_place}
              onChange={handleChange}
              className="scr-dotted-input scr-medium-input"
            />
          </div>

          {/* ── Body paragraph ── */}
          <div className="scr-form-body">
            <p>
              उपरोक्त विषयमा{" "}
              <span className="scr-bold-text scr-underline-text">
                {MUNICIPALITY.name}
              </span>{" "}
              वडा नं.{" "}
              <input
                name="ward_no"
                type="text"
                className="scr-inline-input scr-tiny-box"
                value={form.ward_no}
                onChange={handleChange}
              />{" "}
              (साविक{" "}
              <input
                name="sabik_place"
                type="text"
                className="scr-inline-input scr-medium-box"
                value={form.sabik_place}
                onChange={handleChange}
              />
              , वडा नं.{" "}
              <input
                name="sabik_ward_no"
                type="text"
                className="scr-inline-input scr-tiny-box"
                value={form.sabik_ward_no}
                onChange={handleChange}
              />{" "}
              ) अन्तर्गत
              <select
                name="residency_type"
                value={form.residency_type}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>स्थायी</option>
                <option>अस्थायी</option>
              </select>
              बसोबास गर्ने श्री{" "}
              <input
                name="father_name"
                type="text"
                className="scr-inline-input scr-long-box"
                value={form.father_name}
                onChange={handleChange}
                required
              />{" "}
              तथा श्रीमती{" "}
              <input
                name="mother_name"
                type="text"
                className="scr-inline-input scr-long-box"
                value={form.mother_name}
                onChange={handleChange}
                required
              />{" "}
              को आर्थिक अवस्था
              <select
                name="household_economic_status"
                value={form.household_economic_status}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>कमजोर</option>
                <option>मध्यम</option>
                <option>सम्पन्न</option>
              </select>
              भएको हुँदा निजहरूको
              <select
                name="child_relation"
                value={form.child_relation}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>छोरा</option>
                <option>छोरी</option>
              </select>
              <select
                name="child_title"
                value={form.child_title}
                onChange={handleChange}
                className="scr-inline-select"
              >
                <option>श्री</option>
                <option>सुश्री</option>
              </select>
              <input
                name="child_name"
                type="text"
                className="scr-inline-input scr-long-box"
                value={form.child_name}
                onChange={handleChange}
                required
              />{" "}
              लाई नियमानुसार छात्रवृत्ति को लागि सिफारिस गरिन्छ ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="scr-signature-section">
            <div className="scr-signature-block">
              <div className="scr-signature-line"></div>
              <input
                type="text"
                name="signature_name"
                value={form.signature_name}
                onChange={handleChange}
                className="scr-sig-input"
                required
              />
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="scr-designation-select"
              >
                <option>पद छनौट गर्नुहोस्</option>
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
          <div className="scr-footer">
            <button
              type="submit"
              className="scr-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="scr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default ScholarshipRecommendation;