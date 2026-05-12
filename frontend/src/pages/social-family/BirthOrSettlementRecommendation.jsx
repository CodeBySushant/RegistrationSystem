import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "birth-settlement-recommendation"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  chalani_no:             "",
  municipality:           MUNICIPALITY.name       || "",
  ward_no:                MUNICIPALITY.wardNumber || "1",
  // Current residence
  old_unit_name:          "",
  old_unit_type:          "",
  old_unit_ward:          "",
  // Person being certified
  applicant_name:         "",
  birth_district:         "",
  birth_old_unit_type:    "",
  birth_old_unit_ward:    "",
  birth_date:             "२०८२-०८-०६",
  current_since_date:     "२०८२-०८-०६",
  // Parents
  parent_name:            "",
  parent_relation_label:  "श्री",
  parent_title:           "",
  spouse_name:            "",
  // Child
  child_type:             "छोरा",
  child_title:            "श्री",
  child_name:             "",
  birth_place_district:   "",
  birth_place_old_unit:   "",
  birth_place_old_ward:   "",
  current_ward:           MUNICIPALITY.wardNumber || "1",
  birth_date_confirm:     "२०८२-०८-०६",
  // Signature
  signatory_name:         "",
  signatory_designation:  "",
  // Footer applicant details
  footer_applicant_name:  "",
  footer_applicant_address: "",
  footer_applicant_citizenship: "",
  footer_applicant_phone: "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: bsr-)
───────────────────────────────────────────── */
const styles = `
.bsr-container {
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

.bsr-bold-text      { font-weight: bold; }
.bsr-underline-text { text-decoration: underline; }
.bsr-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.bsr-red-mark       { color: red; position: absolute; top: 0; left: 0; }
.bsr-bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

.bsr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.bsr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.bsr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.bsr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.bsr-header-text       { display: flex; flex-direction: column; align-items: center; }
.bsr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.bsr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.bsr-address-text,
.bsr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.bsr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.bsr-meta-left p,
.bsr-meta-right p { margin: 5px 0; }

.bsr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.bsr-small-input { width: 120px; }

.bsr-salutation-section { margin-bottom: 20px; font-size: 1.05rem; }
.bsr-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.bsr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.bsr-inline-input {
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
.bsr-inline-input:focus { border-color: #3b7dd8; }

.bsr-inline-select {
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

.bsr-tiny-box   { width: 40px; text-align: center; }
.bsr-small-box  { width: 100px; }
.bsr-medium-box { width: 160px; }

.bsr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.bsr-signature-block {
  width: 220px;
  text-align: center;
  position: relative;
}
.bsr-signature-line {
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  width: 100%;
}
.bsr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.bsr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.bsr-footer { text-align: center; margin-top: 40px; }
.bsr-save-print-btn {
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
.bsr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.bsr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.bsr-copyright-footer {
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

  .bsr-container,
  .bsr-container * { visibility: visible; }

  .bsr-container {
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

  .bsr-footer,
  .bsr-top-right-bread,
  .bsr-copyright-footer { display: none !important; }

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
  .bsr-container { padding: 15px; }
  .bsr-meta-data-row { flex-direction: column; gap: 8px; }
  .bsr-inline-input { width: 110px; }
  .bsr-medium-box { width: 120px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const BirthOrSettlementRecommendation = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.old_unit_ward?.trim())       return "साविक वडा नम्बर आवश्यक छ";
    if (!form.applicant_name?.trim())      return "व्यक्तिको नाम आवश्यक छ";
    if (!form.birth_district?.trim())      return "जन्म जिल्ला आवश्यक छ";
    if (!form.birth_old_unit_ward?.trim()) return "जन्म वडा नम्बर आवश्यक छ";
    if (!form.parent_title?.trim())        return "अभिभावकको नाम आवश्यक छ";
    if (!form.child_name?.trim())          return "सन्तानको नाम आवश्यक छ";
    if (!form.footer_applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.footer_applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setLoading(true);
    try {
      // Map footer fields to forms.json column names
      const payload = {
        ...form,
        applicant: JSON.stringify({
          name: form.footer_applicant_name,
          address: form.footer_applicant_address,
          citizenship: form.footer_applicant_citizenship,
          phone: form.footer_applicant_phone,
        }),
      };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/birth-settlement-recommendation",
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
    applicantName:        form.footer_applicant_name,
    applicantAddress:     form.footer_applicant_address,
    applicantCitizenship: form.footer_applicant_citizenship,
    applicantPhone:       form.footer_applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "footer_applicant_name",
      applicantAddress:     "footer_applicant_address",
      applicantCitizenship: "footer_applicant_citizenship",
      applicantPhone:       "footer_applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <form className="bsr-container" onSubmit={handleSubmit}>

        {/* ── Top bar ── */}
        <div className="bsr-top-bar-title">
          जन्म/बसोबास प्रमाणित ।
          <span className="bsr-top-right-bread">
            सामाजिक / पारिवारिक &gt; जन्म/बसोबास प्रमाणित
          </span>
        </div>

        {/* ── Header ── */}
        <div className="bsr-form-header-section">
          <div className="bsr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="bsr-header-text">
            <h1 className="bsr-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="bsr-ward-title">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </h2>
            <p className="bsr-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="bsr-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="bsr-meta-data-row">
          <div className="bsr-meta-left">
            <p>पत्र संख्या : <span className="bsr-bold-text">२०८२/८३</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                value={form.chalani_no}
                onChange={handleChange}
                className="bsr-dotted-input bsr-small-input"
              />
            </p>
          </div>
          <div className="bsr-meta-right">
            <p>मिति : <span className="bsr-bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Salutation ── */}
        <div className="bsr-salutation-section">
          <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* ── Subject ── */}
        <div className="bsr-subject-section">
          <p>
            विषय:
            <span className="bsr-underline-text bsr-bold-text">
              जन्म/बसोबास प्रमाणित बारे।
            </span>
          </p>
        </div>

        {/* ── Body paragraph ── */}
        <div className="bsr-form-body">
          <p>
            उपरोक्त सम्बन्धमा{" "}
            <span className="bsr-bg-gray-text">{MUNICIPALITY.name}</span>
            वडा नं{" "}
            <input
              name="ward_no"
              type="text"
              value={form.ward_no}
              onChange={handleChange}
              className="bsr-inline-input bsr-tiny-box"
            />{" "}
            (साविक
            <input
              name="old_unit_name"
              type="text"
              value={form.old_unit_name}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
            />
            <select
              name="old_unit_type"
              value={form.old_unit_type}
              onChange={handleChange}
              className="bsr-inline-select"
            >
              <option value="">--</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं{" "}
            <input
              name="old_unit_ward"
              type="text"
              value={form.old_unit_ward}
              onChange={handleChange}
              className="bsr-inline-input bsr-tiny-box"
              required
            />{" "}
            <span className="bsr-red">*</span> ) बस्ने
            <input
              name="applicant_name"
              type="text"
              value={form.applicant_name}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> को जन्म साविक जिल्ला
            <input
              name="birth_district"
              type="text"
              value={form.birth_district}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span>
            <select
              name="birth_old_unit_type"
              value={form.birth_old_unit_type}
              onChange={handleChange}
              className="bsr-inline-select"
            >
              <option value="">--</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="न.पा.">न.पा.</option>
            </select>
            वडा नं{" "}
            <input
              name="birth_old_unit_ward"
              type="text"
              value={form.birth_old_unit_ward}
              onChange={handleChange}
              className="bsr-inline-input bsr-tiny-box"
              required
            />{" "}
            <span className="bsr-red">*</span> गा मिति
            <input
              name="birth_date"
              type="text"
              value={form.birth_date}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
            />{" "}
            मा भएको र मिति
            <input
              name="current_since_date"
              type="text"
              value={form.current_since_date}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
            />{" "}
            देखि यस <span className="bsr-bold-text">{MUNICIPALITY.name}</span>{" "}
            गा बसोबास गर्दै आएकोले निजको जन्म/बसोबास प्रमाणित गरिपाउँ भनि{" "}
            <span className="bsr-bg-gray-text">{MUNICIPALITY.name}</span> ,{" "}
            {MUNICIPALITY.wardNumber} नं वडा कार्यालयमा मिति २०८२-०८-०६ गा दिनु
            भएको निवेदन बमोजिम श्री
            <input
              name="parent_name"
              type="text"
              value={form.parent_name}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> को नाति
            <select
              name="parent_relation_label"
              value={form.parent_relation_label}
              onChange={handleChange}
              className="bsr-inline-select"
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input
              name="parent_title"
              type="text"
              value={form.parent_title}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> तथा श्रीमती
            <input
              name="spouse_name"
              type="text"
              value={form.spouse_name}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> को
            <select
              name="child_type"
              value={form.child_type}
              onChange={handleChange}
              className="bsr-inline-select"
            >
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>
            <select
              name="child_title"
              value={form.child_title}
              onChange={handleChange}
              className="bsr-inline-select"
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>
            <input
              name="child_name"
              type="text"
              value={form.child_name}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> को जन्म जिल्ला
            <input
              name="birth_place_district"
              type="text"
              value={form.birth_place_district}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> साविक
            <input
              name="birth_place_old_unit"
              type="text"
              value={form.birth_place_old_unit}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
              required
            />{" "}
            <span className="bsr-red">*</span> वडा नं
            <input
              name="birth_place_old_ward"
              type="text"
              value={form.birth_place_old_ward}
              onChange={handleChange}
              className="bsr-inline-input bsr-tiny-box"
              required
            />{" "}
            <span className="bsr-red">*</span> गा जन्म भई हाल{" "}
            <span className="bsr-bold-text">{MUNICIPALITY.name}</span> वडा नं
            <input
              name="current_ward"
              type="text"
              value={form.current_ward}
              onChange={handleChange}
              className="bsr-inline-input bsr-tiny-box"
              required
            />{" "}
            <span className="bsr-red">*</span> गा बसोबास गर्दै आएको र निजको
            जन्म मिति
            <input
              name="birth_date_confirm"
              type="text"
              value={form.birth_date_confirm}
              onChange={handleChange}
              className="bsr-inline-input bsr-medium-box"
            />{" "}
            गा भएको हुँदा निजको जन्म/बसोबास प्रमाणित गरिएको व्यहोरा अनुरोध
            छ ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="bsr-signature-section">
          <div className="bsr-signature-block">
            <div className="bsr-signature-line"></div>
            <span className="bsr-red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              value={form.signatory_name}
              onChange={handleChange}
              className="bsr-sig-input"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="bsr-designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
            </select>
          </div>
        </div>

        {/* ── Applicant details ── */}
        <ApplicantDetailsNp
          formData={footerForm}
          handleChange={handleFooterChange}
        />

        {/* ── Submit ── */}
        <div className="bsr-footer">
          <button
            type="submit"
            className="bsr-save-print-btn"
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="bsr-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default BirthOrSettlementRecommendation;