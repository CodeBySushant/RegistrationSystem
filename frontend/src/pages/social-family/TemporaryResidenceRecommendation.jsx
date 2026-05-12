import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "temporary-residence-recommendation"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  reference_no:          "२०८२/८३",
  chalani_no:            "",
  date_bs:               "२०८२-०८-०६",
  municipality_name:     MUNICIPALITY.name        || "",
  ward_title:            `${MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`,
  salutation_prefix:     "श्री",
  applicant_name_full:   "",
  current_municipality:  MUNICIPALITY.name        || "",
  previous_admin_type:   "",
  previous_ward_no:      "",
  house_owner_prefix:    "श्री",
  house_owner_name:      "",
  plot_no:               "",
  since_date_bs:         "",
  is_foreigner:          false,
  resident_napr_no:      "",
  resident_district:     "",
  resident_issue_date:   "",
  signatory_name:        "",
  signatory_designation: "",
  // footer applicant details
  applicant_name:        "",
  applicant_address:     "",
  applicant_citizenship_no: "",
  applicant_phone:       "",
  municipality_display:  MUNICIPALITY.name        || "",
  ward_number_display:   MUNICIPALITY.wardNumber  || "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: trr-)
───────────────────────────────────────────── */
const styles = `
.trr-container {
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

.trr-bold-text      { font-weight: bold; }
.trr-underline-text { text-decoration: underline; }
.trr-red            { color: red; font-weight: bold; margin: 0 2px; vertical-align: sub; }
.trr-red-text       { color: red; }
.trr-red-mark       { color: red; position: absolute; top: 0; left: 0; }

.trr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.trr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.trr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.trr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.trr-header-text      { display: flex; flex-direction: column; align-items: center; }
.trr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.trr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.trr-address-text,
.trr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.trr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.trr-meta-left p,
.trr-meta-right p { margin: 5px 0; }

.trr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.trr-small-input  { width: 120px; }
.trr-tiny-input   { width: 90px; }
.trr-medium-input { flex-grow: 1; }

.trr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 20px;
}

.trr-inline-input {
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
.trr-inline-input:focus { border-color: #3b7dd8; }

.trr-inline-select {
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
.trr-medium-select { width: 150px; }
.trr-tiny-box   { width: 40px; text-align: center; }
.trr-small-box  { width: 100px; }
.trr-medium-box { width: 180px; }

.trr-foreigner-check-section {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.trr-resident-details-section { margin-bottom: 30px; }
.trr-resident-row {
  display: flex;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 4px;
}
.trr-resident-row label {
  margin-left: 10px;
  margin-right: 5px;
  white-space: nowrap;
}
.trr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 5px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}

.trr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  margin-bottom: 30px;
}
.trr-signature-block {
  width: 220px;
  text-align: center;
  position: relative;
}
.trr-signature-line {
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  width: 100%;
}
.trr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.trr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.trr-footer { text-align: center; margin-top: 40px; }
.trr-save-print-btn {
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
.trr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.trr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.trr-copyright-footer {
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

  .trr-container,
  .trr-container * { visibility: visible; }

  .trr-container {
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

  .trr-footer,
  .trr-top-right-bread,
  .trr-copyright-footer { display: none !important; }

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
  .trr-container { padding: 15px; }
  .trr-meta-data-row { flex-direction: column; gap: 8px; }
  .trr-resident-row { flex-direction: column; align-items: flex-start; }
  .trr-inline-input { width: 120px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const TemporaryResidenceRecommendation = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Convenience setter for inline onChange lambdas
  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const validate = () => {
    if (!form.applicant_name_full?.trim()) return "निवेदकको पूरा नाम आवश्यक छ";
    if (!form.previous_ward_no?.trim())    return "साविक वडा नम्बर आवश्यक छ";
    if (!form.house_owner_name?.trim())    return "घरधनीको नाम आवश्यक छ";
    if (!form.plot_no?.trim())             return "कित्ता नम्बर आवश्यक छ";
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
        "/api/forms/temporary-residence-recommendation",
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

  // Adapter: ApplicantDetailsNp expects camelCase keys
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

      <form className="trr-container" onSubmit={handleSubmit}>

        {/* ── Top bar ── */}
        <div className="trr-top-bar-title">
          अस्थायी बसोबास सिफारिस ।
          <span className="trr-top-right-bread">
            सामाजिक / पारिवारिक &gt; अस्थायी बसोबास सिफारिस
          </span>
        </div>

        {/* ── Header ── */}
        <div className="trr-form-header-section">
          <div className="trr-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="trr-header-text">
            <h1 className="trr-municipality-name">{form.municipality_name}</h1>
            <h2 className="trr-ward-title">{form.ward_title}</h2>
            <p className="trr-address-text">नागार्जुन, काठमाडौँ</p>
            <p className="trr-province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="trr-meta-data-row">
          <div className="trr-meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="trr-bold-text">
                <input
                  name="reference_no"
                  value={form.reference_no}
                  onChange={handleChange}
                  className="trr-dotted-input trr-tiny-input"
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="trr-dotted-input trr-small-input"
              />
            </p>
          </div>
          <div className="trr-meta-right">
            <p>
              मिति :{" "}
              <input
                name="date_bs"
                value={form.date_bs}
                onChange={handleChange}
                className="trr-dotted-input trr-small-input"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* ── Body paragraph ── */}
        <div className="trr-form-body">
          <p>
            प्रस्तुत विषयमा{" "}
            <select
              name="salutation_prefix"
              value={form.salutation_prefix}
              onChange={handleChange}
              className="trr-inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              name="applicant_name_full"
              value={form.applicant_name_full}
              onChange={handleChange}
              className="trr-inline-input trr-medium-box"
              required
            />{" "}
            <span className="trr-red">*</span>,
            <input
              name="current_municipality"
              value={form.current_municipality}
              onChange={handleChange}
              className="trr-inline-input trr-medium-box"
            />
            वडा नं {form.municipality_display || MUNICIPALITY.wardNumber} (साविक
            <select
              name="previous_admin_type"
              value={form.previous_admin_type}
              onChange={handleChange}
              className="trr-inline-select trr-medium-select"
            >
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="trr-inline-input trr-tiny-box"
              required
            />{" "}
            <span className="trr-red">*</span> ) अन्तर्गत रहेको घरधनि
            <select
              name="house_owner_prefix"
              value={form.house_owner_prefix}
              onChange={handleChange}
              className="trr-inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              name="house_owner_name"
              value={form.house_owner_name}
              onChange={handleChange}
              className="trr-inline-input trr-medium-box"
              required
            />{" "}
            <span className="trr-red">*</span> कित्ता नं.
            <input
              name="plot_no"
              value={form.plot_no}
              onChange={handleChange}
              className="trr-inline-input trr-small-box"
              required
            />{" "}
            <span className="trr-red">*</span> को घरमा विगत मिति
            <input
              name="since_date_bs"
              value={form.since_date_bs}
              onChange={handleChange}
              className="trr-inline-input trr-medium-box"
            />{" "}
            देखि अस्थायी बसोबास गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध
            गरिन्छ ।
          </p>
        </div>

        {/* ── Foreigner checkbox ── */}
        <div className="trr-foreigner-check-section">
          <input
            type="checkbox"
            id="foreignerCheck"
            name="is_foreigner"
            checked={!!form.is_foreigner}
            onChange={handleChange}
          />
          <label htmlFor="foreignerCheck" className="trr-red-text">
            विदेशीको हकमा
          </label>
        </div>

        {/* ── Resident details ── */}
        <div className="trr-resident-details-section">
          <h4 className="trr-bold-text">बसोबास गर्नेको :-</h4>
          <div className="trr-resident-row">
            <label>
              ना.प्रा.प.नं. : <span className="trr-red">*</span>
            </label>
            <input
              name="resident_napr_no"
              value={form.resident_napr_no}
              onChange={handleChange}
              className="trr-line-input"
              style={{ width: 140 }}
            />
            <label>
              / जिल्ला : <span className="trr-red">*</span>
            </label>
            <input
              name="resident_district"
              value={form.resident_district}
              onChange={handleChange}
              className="trr-line-input"
              style={{ width: 140 }}
            />
            <label>/ जारी मिति :</label>
            <input
              name="resident_issue_date"
              value={form.resident_issue_date}
              onChange={handleChange}
              className="trr-line-input"
              style={{ width: 140 }}
            />
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="trr-signature-section">
          <div className="trr-signature-block">
            <div className="trr-signature-line"></div>
            <span className="trr-red-mark">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="trr-sig-input"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="trr-designation-select"
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
        <div className="trr-footer">
          <button
            type="submit"
            className="trr-save-print-btn"
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="trr-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default TemporaryResidenceRecommendation;