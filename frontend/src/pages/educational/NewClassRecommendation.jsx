import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE  — matches forms.json columns
   for "new-class-recommendation"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:               "२०८२/८३",
  chalani_no:              "",
  date:                    "२०८२-०८-०६",
  municipality:            MUNICIPALITY.name       || "",
  ward_no:                 MUNICIPALITY.wardNumber || "",
  school_location:         "",
  applicant_name:          "",   // school name (body)
  class_requested:         "",
  rule_title:              MUNICIPALITY.name || "",
  rule_schedule:           "",
  rule_section:            "",
  infrastructure_summary:  "",
  signature_name:          "",
  designation:             "पद छनौट गर्नुहोस्",
  // footer applicant details
  applicant_name_final:    "",
  applicant_address:       "",
  applicant_citizenship:   "",
  applicant_phone:         "",
  notes:                   "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ncr-)
───────────────────────────────────────────── */
const styles = `
.ncr-container {
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

.ncr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ncr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ncr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.ncr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.ncr-header-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ncr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ncr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.ncr-address-text,
.ncr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.ncr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.ncr-meta-left p,
.ncr-meta-right p { margin: 5px 0; }

.ncr-bold-text      { font-weight: bold; }
.ncr-underline-text { text-decoration: underline; }

.ncr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.ncr-small-input  { width: 120px; }
.ncr-medium-input { width: 200px; }

.ncr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.ncr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.ncr-addressee-row     { margin-bottom: 8px; }

.ncr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
}

.ncr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.ncr-inline-input {
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
.ncr-inline-input:focus { border-color: #3b7dd8; }
.ncr-small-box  { width: 100px; }
.ncr-medium-box { width: 180px; }
.ncr-long-box   { width: 250px; }

.ncr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.ncr-signature-block { width: 220px; text-align: center; }
.ncr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.ncr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.ncr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.ncr-footer {
  text-align: center;
  margin-top: 40px;
}
.ncr-save-print-btn {
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
.ncr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.ncr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.ncr-copyright-footer {
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

  .ncr-container,
  .ncr-container * { visibility: visible; }

  .ncr-container {
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

  .ncr-footer,
  .ncr-top-right-bread,
  .ncr-copyright-footer { display: none !important; }

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
  .ncr-container { padding: 15px; }
  .ncr-meta-data-row { flex-direction: column; gap: 8px; }
  .ncr-inline-input { width: 100px; }
  .ncr-inline-input.ncr-long-box { width: 160px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const NewClassRecommendation = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name?.trim())       return "विद्यालयको नाम आवश्यक छ";
    if (!form.class_requested?.trim())      return "कक्षा आवश्यक छ";
    if (!form.applicant_name_final?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim())      return "फोन नम्बर आवश्यक छ";
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
      // Map footer applicant fields to forms.json column names
      payload.applicant_name = form.applicant_name_final;
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axiosInstance.post(
        "/api/forms/new-class-recommendation",
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

  // Applicant details footer fields mapped for ApplicantDetailsNp
  const footerForm = {
    applicantName:       form.applicant_name_final,
    applicantAddress:    form.applicant_address,
    applicantCitizenship:form.applicant_citizenship,
    applicantPhone:      form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name_final",
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

      <div className="ncr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top bar ── */}
          <div className="ncr-top-bar-title">
            कक्षा थप सिफारिस
            <span className="ncr-top-right-bread">
              शिक्षा &gt; कक्षा थप सिफारिस
            </span>
          </div>

          {/* ── Header ── */}
          <div className="ncr-form-header-section">
            <div className="ncr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="ncr-header-text">
              <h1 className="ncr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="ncr-ward-title">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </h2>
              <p className="ncr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="ncr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="ncr-meta-data-row">
            <div className="ncr-meta-left">
              <p>
                पत्र संख्या :{" "}
                <span className="ncr-bold-text">
                  <input
                    type="text"
                    name="letter_no"
                    value={form.letter_no}
                    onChange={handleChange}
                    className="ncr-dotted-input ncr-small-input"
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
                  className="ncr-dotted-input ncr-small-input"
                />
              </p>
            </div>
            <div className="ncr-meta-right">
              <p>
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="ncr-dotted-input ncr-small-input"
                />
              </p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="ncr-subject-section">
            <p>
              विषय:{" "}
              <span className="ncr-underline-text">
                कक्षा थपको लागी अनुमति दिनुहुन
              </span>
            </p>
          </div>

          {/* ── Addressee ── */}
          <div className="ncr-addressee-section">
            <div className="ncr-addressee-row">
              <span>श्री {MUNICIPALITY.name}</span>
              <input
                type="text"
                name="school_location"
                value={form.school_location}
                onChange={handleChange}
                className="ncr-line-input ncr-medium-input"
              />
              <span>नगर कार्यपालिकाको कार्यालय</span>
            </div>
            <div className="ncr-addressee-row">
              <input
                type="text"
                name="municipality"
                value={form.municipality}
                onChange={handleChange}
                className="ncr-line-input ncr-medium-input"
              />
              <span>, {MUNICIPALITY.city}</span>
            </div>
          </div>

          {/* ── Body paragraph ── */}
          <div className="ncr-form-body">
            <p>
              प्रस्तुत विषयमा {MUNICIPALITY.name}{" "}
              <input
                type="text"
                name="ward_no"
                value={form.ward_no}
                onChange={handleChange}
                className="ncr-inline-input ncr-medium-box"
              />
              , वडा नं {form.ward_no} मा सञ्चालनमा रहेको श्री{" "}
              <input
                type="text"
                name="applicant_name"
                value={form.applicant_name}
                onChange={handleChange}
                className="ncr-inline-input ncr-long-box"
                required
              />{" "}
              ले कक्षा{" "}
              <input
                type="text"
                name="class_requested"
                value={form.class_requested}
                onChange={handleChange}
                className="ncr-inline-input ncr-medium-box"
                required
              />
              को कक्षा संचालन गर्न अनुमतिको लागि सिफारिस दिनुहुन भनि यस
              कार्यालयमा दिएको निवेदन अनुसार{" "}
              <input
                type="text"
                name="rule_title"
                value={form.rule_title}
                onChange={handleChange}
                className="ncr-inline-input ncr-medium-box"
              />{" "}
              को शिक्षा नियमावली २०७४{" "}
              <input
                type="text"
                name="rule_schedule"
                value={form.rule_schedule}
                onChange={handleChange}
                className="ncr-inline-input ncr-medium-box"
              />{" "}
              को अनुसूची २{" "}
              <input
                type="text"
                name="infrastructure_summary"
                value={form.infrastructure_summary}
                onChange={handleChange}
                className="ncr-inline-input ncr-medium-box"
              />{" "}
              बमोजिम विद्यालय खोल्न चाहिने पूर्वाधार हरुको एकिन गरि नियम ५(३)
              अनुसार कक्षा{" "}
              <input
                type="text"
                name="class_requested"
                value={form.class_requested}
                onChange={handleChange}
                className="ncr-inline-input ncr-small-box"
                required
              />{" "}
              संचालनको अनुमति दिनुहुन सो नियमावली को दफा ३{" "}
              <input
                type="text"
                name="rule_section"
                value={form.rule_section}
                onChange={handleChange}
                className="ncr-inline-input ncr-medium-box"
              />{" "}
              बमोजिम सिफारिस साथ अनुरोध छ ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="ncr-signature-section">
            <div className="ncr-signature-block">
              <div className="ncr-signature-line"></div>
              <input
                type="text"
                name="signature_name"
                value={form.signature_name}
                onChange={handleChange}
                className="ncr-sig-input"
                required
              />
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="ncr-designation-select"
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
          <div className="ncr-footer">
            <button
              type="submit"
              className="ncr-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ncr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default NewClassRecommendation;