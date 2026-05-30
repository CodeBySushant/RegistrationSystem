import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "social-security-via-guardian"
───────────────────────────────────────────── */
const initialState = {
  letter_no: "",
  chalani_no: "",
  date: "",
  ne_sa: "", // ← NEW: was hardcoded "1146 थिंलाथ्व, 2 शनिवार"
  addressee_line1: "",
  addressee_line2: "",
  body_person_name: "",
  ward_chairman_name: "",
  beneficiary_name: "",
  guardian_relation: "",
  guardian_name: "",
  ben_name: "",
  ben_issue_district: "",
  ben_issue_date: "",
  ben_citizenship_no: "",
  ben_account_no: "",
  grd_name: "",
  grd_issue_district: "",
  grd_issue_date: "",
  grd_citizenship_no: "",
  grd_account_no: "",
  signature_name: "",
  designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship: "",
  applicant_phone: "",
  notes: "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: ssvg-)
───────────────────────────────────────────── */
const styles = `
.ssvg-container {
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

.ssvg-bold-text      { font-weight: bold; }
.ssvg-underline-text { text-decoration: underline; }
.ssvg-red            { color: red; }
.ssvg-mt-30          { margin-top: 30px; }

.ssvg-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ssvg-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ssvg-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.ssvg-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.ssvg-header-text       { display: flex; flex-direction: column; align-items: center; }
.ssvg-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ssvg-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.ssvg-address-text,
.ssvg-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.ssvg-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.ssvg-meta-left p,
.ssvg-meta-right p { margin: 5px 0; }

.ssvg-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.ssvg-small-input { width: 120px; }

.ssvg-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.ssvg-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.ssvg-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.ssvg-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.ssvg-medium-input { width: 200px; }
.ssvg-large-input  { width: 300px; }

.ssvg-form-body {
  font-size: 1.05rem;
  line-height: 2.4;
  text-align: justify;
  margin-bottom: 30px;
}

.ssvg-inline-input {
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
.ssvg-inline-input:focus { border-color: #3b7dd8; }

.ssvg-inline-select {
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

.ssvg-medium-box { width: 160px; }
.ssvg-long-box   { width: 250px; }

.ssvg-details-section  { margin-bottom: 20px; }
.ssvg-section-title    { font-size: 1.15rem; margin-bottom: 15px; font-weight: bold; }

.ssvg-details-grid-2-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 12px;
}
.ssvg-form-group-row {
  display: flex;
  align-items: center;
}
.ssvg-form-group-row label {
  white-space: nowrap;
  margin-right: 10px;
  min-width: 80px;
  font-weight: bold;
}
.ssvg-full-width-input {
  flex: 1;
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}

.ssvg-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.ssvg-signature-block { width: 220px; text-align: center; }
.ssvg-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.ssvg-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.ssvg-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

/* ── NEW: red * wrapper for inputs ── */
.ssvg-req-wrap {
  position: relative;
  display: inline-block;
}
.ssvg-req-wrap.ssvg-req-block {
  display: flex;
  flex: 1;
  width: 100%;
}
.ssvg-req-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 14px;
  z-index: 1;
}
.ssvg-req-wrap input { padding-left: 18px; }

.ssvg-footer { text-align: center; margin-top: 40px; }
.ssvg-save-print-btn {
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
.ssvg-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.ssvg-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.ssvg-copyright-footer {
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

  .ssvg-container,
  .ssvg-container * { visibility: visible; }

  .ssvg-container {
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

  .ssvg-footer,
  .ssvg-top-right-bread,
  .ssvg-copyright-footer { display: none !important; }

  /* Hide red * in print */
  .ssvg-req-star { display: none !important; }
  .ssvg-req-wrap input { padding-left: 5px !important; }

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
  .ssvg-container { padding: 15px; }
  .ssvg-meta-data-row { flex-direction: column; gap: 8px; }
  .ssvg-details-grid-2-col { grid-template-columns: 1fr; }
  .ssvg-inline-input { width: 130px; }
  .ssvg-long-box { width: 180px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const SocialSecurityViaGuardian = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.addressee_line1?.trim()) return "प्राप्तकर्ताको नाम आवश्यक छ";
    if (!form.body_person_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.ward_chairman_name?.trim()) return "वडा अध्यक्षको नाम आवश्यक छ";
    if (!form.beneficiary_name?.trim()) return "लाभग्राहीको नाम आवश्यक छ";
    if (!form.guardian_name?.trim()) return "संरक्षकको नाम आवश्यक छ";
    if (!form.applicant_name?.trim())
      return "निवेदकको नाम आवश्यक छ (तलको बक्स)";
    if (!form.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) {
      alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/social-security-via-guardian",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        // FIX: was INITIAL_STATE (undefined) — would crash on reset
        setTimeout(() => setForm(initialState), 500);
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
    applicantName: form.applicant_name,
    applicantAddress: form.applicant_address,
    applicantCitizenship: form.applicant_citizenship,
    applicantPhone: form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName: "applicant_name",
      applicantAddress: "applicant_address",
      applicantCitizenship: "applicant_citizenship",
      applicantPhone: "applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="ssvg-container">
        <form onSubmit={handleSubmit}>
          {/* ── Top bar ── */}
          <div className="ssvg-top-bar-title">
            संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध गराउने सम्बन्धमा ।
            <span className="ssvg-top-right-bread">
              आर्थिक &gt; संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध गराउने
              सम्बन्धमा ।
            </span>
          </div>

          {/* ── Header ── */}
          <div className="ssvg-form-header-section">
            <div className="ssvg-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="ssvg-header-text">
              <h1 className="ssvg-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="ssvg-ward-title">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `${user?.ward || " "} नं. वडा कार्यालय`}
              </h2>
              <p className="ssvg-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="ssvg-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="ssvg-meta-data-row">
            <div className="ssvg-meta-left">
              <p>
                पत्र संख्या :{" "}
                <span className="ssvg-req-wrap">
                  <span className="ssvg-req-star">*</span>
                  <input
                    type="text"
                    name="letter_no"
                    value={form.letter_no}
                    onChange={handleChange}
                    className="ssvg-dotted-input ssvg-small-input"
                  />
                </span>
              </p>
              <p>
                चलानी नं. :{" "}
                <span className="ssvg-req-wrap">
                  <span className="ssvg-req-star">*</span>
                  <input
                    type="text"
                    name="chalani_no"
                    value={form.chalani_no}
                    onChange={handleChange}
                    className="ssvg-dotted-input ssvg-small-input"
                  />
                </span>
              </p>
            </div>
            <div className="ssvg-meta-right">
              <p>
                मिति :{" "}
                <span className="ssvg-req-wrap">
                  <span className="ssvg-req-star">*</span>
                  <input
                    type="text"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="ssvg-dotted-input ssvg-small-input"
                  />
                </span>
              </p>
              {/* ── ने.सं — was hardcoded, now editable ── */}
              <p>
                ने.सं :{" "}
                <span className="ssvg-req-wrap">
                  <span className="ssvg-req-star">*</span>
                  <input
                    type="text"
                    name="ne_sa"
                    value={form.ne_sa}
                    onChange={handleChange}
                    className="ssvg-dotted-input"
                    style={{ width: "220px" }}
                    placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  />
                </span>
              </p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="ssvg-subject-section">
            <p>
              विषय:{" "}
              <span className="ssvg-underline-text">
                संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध गराउने सम्बन्धमा ।
              </span>
            </p>
          </div>

          {/* ── Addressee ── */}
          <div className="ssvg-addressee-section">
            <div className="ssvg-addressee-row">
              <span>श्री</span>
              <span className="ssvg-req-wrap">
                <span className="ssvg-req-star">*</span>
                <input
                  name="addressee_line1"
                  type="text"
                  className="ssvg-line-input ssvg-large-input"
                  value={form.addressee_line1}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
            <div className="ssvg-addressee-row">
              <span className="ssvg-req-wrap">
                <span className="ssvg-req-star">*</span>
                <input
                  name="addressee_line2"
                  type="text"
                  className="ssvg-line-input ssvg-medium-input"
                  value={form.addressee_line2}
                  onChange={handleChange}
                />
              </span>
              <span>।</span>
            </div>
          </div>

          {/* ── Body paragraph ── */}
          <div className="ssvg-form-body">
            <p>
              उपरोक्त सम्बन्धमा निवेदक श्री{" "}
              <span className="ssvg-req-wrap">
                <span className="ssvg-req-star">*</span>
                <input
                  name="body_person_name"
                  type="text"
                  className="ssvg-inline-input ssvg-long-box"
                  value={form.body_person_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              को माग माथि आवश्यक स्थलगत अवलोकन गरी बुझ्दा निज निवेदक को निवेदन
              सही साँचो रहेको बुझिएकोले पछी आईपर्न सम्पूर्ण कानूनी र आर्थिक
              जवाफदेहिता म वडा अध्यक्ष{" "}
              <span className="ssvg-req-wrap">
                <span className="ssvg-req-star">*</span>
                <input
                  name="ward_chairman_name"
                  type="text"
                  className="ssvg-inline-input ssvg-medium-box"
                  value={form.ward_chairman_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              ले बहन गर्ने गरी सामाजिक सुरक्षा लाभग्राही श्री{" "}
              <span className="ssvg-req-wrap">
                <span className="ssvg-req-star">*</span>
                <input
                  name="beneficiary_name"
                  type="text"
                  className="ssvg-inline-input ssvg-long-box"
                  value={form.beneficiary_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              को संरक्षक निजको परिवार सदस्य
              <select
                name="guardian_relation"
                className="ssvg-inline-select"
                value={form.guardian_relation}
                onChange={handleChange}
              >
                <option value="">छान्नुहोस्</option>
                <option value="श्रीमान">श्रीमान</option>
                <option value="श्रीमती">श्रीमती</option>
                <option value="छोरा">छोरा</option>
                <option value="बुहारी">बुहारी</option>
                <option value="नाति">नाति</option>
              </select>
              नाता पर्ने श्री{" "}
              <span className="ssvg-req-wrap">
                <span className="ssvg-req-star">*</span>
                <input
                  name="guardian_name"
                  type="text"
                  className="ssvg-inline-input ssvg-long-box"
                  value={form.guardian_name}
                  onChange={handleChange}
                  required
                />
              </span>{" "}
              लाई संरक्षक सिफारिस गर्दछु ।
            </p>
          </div>

          {/* ── Beneficiary details ── */}
          <div className="ssvg-details-section">
            <h3 className="ssvg-section-title ssvg-underline-text">
              लाभग्राही विवरण
            </h3>
            <div className="ssvg-details-grid-2-col">
              <div className="ssvg-form-group-row">
                <label>नाम :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="ben_name"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.ben_name}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row"></div>
              <div className="ssvg-form-group-row">
                <label>जारी जिल्ला :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="ben_issue_district"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.ben_issue_district}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row">
                <label>जारी मिति :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="ben_issue_date"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.ben_issue_date}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row">
                <label>ना.प्र. नं. :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="ben_citizenship_no"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.ben_citizenship_no}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row"></div>
              <div className="ssvg-form-group-row">
                <label>खाता नम्बर :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="ben_account_no"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.ben_account_no}
                    onChange={handleChange}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* ── Guardian details ── */}
          <div className="ssvg-details-section ssvg-mt-30">
            <h3 className="ssvg-section-title ssvg-underline-text">
              संरक्षकको विवरण :
            </h3>
            <div className="ssvg-details-grid-2-col">
              <div className="ssvg-form-group-row">
                <label>नाम :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="grd_name"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.grd_name}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row"></div>
              <div className="ssvg-form-group-row">
                <label>जारी जिल्ला :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="grd_issue_district"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.grd_issue_district}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row">
                <label>जारी मिति :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="grd_issue_date"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.grd_issue_date}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row">
                <label>ना.प्र. नं. :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="grd_citizenship_no"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.grd_citizenship_no}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="ssvg-form-group-row"></div>
              <div className="ssvg-form-group-row">
                <label>खाता नम्बर :</label>
                <span className="ssvg-req-wrap ssvg-req-block">
                  <span className="ssvg-req-star">*</span>
                  <input
                    name="grd_account_no"
                    type="text"
                    className="ssvg-full-width-input"
                    value={form.grd_account_no}
                    onChange={handleChange}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* ── Signature ── */}
          <div className="ssvg-signature-section">
            <div className="ssvg-signature-block">
              <div className="ssvg-signature-line"></div>
              <span className="ssvg-req-wrap ssvg-req-block">
                <span className="ssvg-req-star">*</span>
                <input
                  name="signature_name"
                  type="text"
                  className="ssvg-sig-input"
                  value={form.signature_name}
                  onChange={handleChange}
                  required
                />
              </span>
              <select
                name="designation"
                className="ssvg-designation-select"
                value={form.designation}
                onChange={handleChange}
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
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="ssvg-footer">
            <button
              type="submit"
              className="ssvg-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ssvg-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>
        </form>
      </div>
    </>
  );
};

export default SocialSecurityViaGuardian;