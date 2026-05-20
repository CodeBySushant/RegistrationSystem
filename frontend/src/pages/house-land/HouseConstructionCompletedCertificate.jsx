import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:          "२०८२/८३",
  chalani_no:         "",
  date_nep:           new Date().toISOString().slice(0, 10),
  municipality:       MUNICIPALITY.name       || "नागार्जुन",
  ward_no:            MUNICIPALITY.wardNumber || "1",
  applicant_name:     "",
  previous_district:  "",
  previous_type:      "",
  previous_ward_no:   "",
  plot_number:        "",
  plot_area:          "",
  house_type:         "",
  house_storeys:      "",
  map_approval_date:  "२०८२-०८-०६",
  map_approval_type:  "",
  signer_name:        "",
  signer_designation: "",
  applicant_address:       "",
  applicant_citizenship_no:"",
  applicant_phone:         "",
  notes:              "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: hccc-)
───────────────────────────────────────────── */
const styles = `
.hccc-container {
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

.hccc-bold-text      { font-weight: bold; }
.hccc-underline-text { text-decoration: underline; }
.hccc-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.hccc-red-mark       { color: red; position: absolute; top: 0; left: 0; }
.hccc-bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

.hccc-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.hccc-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.hccc-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.hccc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.hccc-header-text       { display: flex; flex-direction: column; align-items: center; }
.hccc-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.hccc-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.hccc-address-text,
.hccc-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.hccc-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.hccc-meta-left p, .hccc-meta-right p { margin: 5px 0; }

.hccc-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.hccc-small-input { width: 120px; }

.hccc-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.hccc-inline-input {
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
.hccc-inline-input:focus { border-color: #3b7dd8; }

.hccc-inline-select {
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

.hccc-tiny-box   { width: 40px; text-align: center; }
.hccc-small-box  { width: 100px; }
.hccc-medium-box { width: 160px; }
.hccc-long-box   { width: 250px; }

.hccc-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.hccc-signature-block { width: 220px; text-align: center; position: relative; }
.hccc-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.hccc-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.hccc-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; font-size: 1rem; }

.hccc-footer { text-align: center; margin-top: 40px; }
.hccc-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.hccc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.hccc-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.hccc-copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

@media print {
  body * { visibility: hidden; }
  .hccc-container, .hccc-container * { visibility: visible; }
  .hccc-container { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; border: none; margin: 0; padding: 20px 40px; background: white !important; background-image: none !important; }
  .hccc-footer, .hccc-top-right-bread, .hccc-copyright-footer { display: none !important; }
  input, select, textarea { background: white !important; color: black !important; -webkit-text-fill-color: black !important; border: none !important; border-bottom: 1px solid #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}

@media (max-width: 768px) {
  .hccc-container { padding: 15px; }
  .hccc-meta-data-row { flex-direction: column; gap: 8px; }
  .hccc-inline-input { width: 110px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HouseConstructionCompletedCertificate() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.plot_number?.trim())    return "कित्ता नम्बर आवश्यक छ";
    if (!form.plot_area?.trim())      return "क्षेत्रफल आवश्यक छ";
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
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/house-construction-completed-certificate", payload);

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
    const map = { applicantName: "applicant_name", applicantAddress: "applicant_address", applicantCitizenship: "applicant_citizenship_no", applicantPhone: "applicant_phone" };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hccc-container">
        <form onSubmit={handleSubmit}>

          <div className="hccc-top-bar-title">
            भूकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र ।
            <span className="hccc-top-right-bread">घर / जग्गा जमिन &gt; भूकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र</span>
          </div>

          <div className="hccc-form-header-section">
            <div className="hccc-header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
            <div className="hccc-header-text">
              <h1 className="hccc-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="hccc-ward-title">{MUNICIPALITY.wardNumber} नं. वडा कार्यालय</h2>
              <p className="hccc-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="hccc-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="hccc-meta-data-row">
            <div className="hccc-meta-left">
              <p>पत्र संख्या : <span className="hccc-bold-text">{form.letter_no}</span></p>
              <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} type="text" className="hccc-dotted-input hccc-small-input" /></p>
            </div>
            <div className="hccc-meta-right">
              <p>मिति : <span className="hccc-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          <div className="hccc-form-body">
            <p>
              प्रस्तुत विषयमा{" "}
              <span className="hccc-bg-gray-text">{form.municipality}</span> वडा नं{" "}
              <input name="ward_no" value={form.ward_no} onChange={handleChange} className="hccc-inline-input hccc-tiny-box" />{" "}
              निवासी{" "}
              <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="hccc-inline-input hccc-long-box" required />{" "}
              ले यस कार्यालयमा दिनुभएको निवेदन अनुसार निजको नाममा रहेको साविक{" "}
              <input name="previous_district" value={form.previous_district} onChange={handleChange} className="hccc-inline-input hccc-medium-box" />{" "}
              <select name="previous_type" value={form.previous_type} onChange={handleChange} className="hccc-inline-select">
                <option value="">-- छान्नुहोस् --</option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="नगरपालिका">नगरपालिका</option>
              </select>{" "}
              वडा नं{" "}
              <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="hccc-inline-input hccc-tiny-box" />{" "}
              कि.नं.{" "}
              <input name="plot_number" value={form.plot_number} onChange={handleChange} className="hccc-inline-input hccc-small-box" required />{" "}
              क्षे.फ.{" "}
              <input name="plot_area" value={form.plot_area} onChange={handleChange} className="hccc-inline-input hccc-small-box" required />{" "}
              जग्गामा भूकम्प प्रतिरोधि{" "}
              <input name="house_type" value={form.house_type} onChange={handleChange} className="hccc-inline-input hccc-tiny-box" required />{" "}
              <input name="house_storeys" value={form.house_storeys} onChange={handleChange} className="hccc-inline-input hccc-tiny-box" required />{" "}
              कोठे घर निर्माणका लागि यस वडा कार्यालयबाट {form.map_approval_date}{" "}
              मा नक्शा स्वीकृत लिइएको र हाल उक्त घर निर्माण कार्य सम्पन्न भएकोले
              घर निर्माण सम्पन्न प्रमाणपत्र उपलब्ध गराईदिन सिफारिस गरिन्छ ।
            </p>
          </div>

          <div className="hccc-signature-section">
            <div className="hccc-signature-block">
              <div className="hccc-signature-line"></div>
              <span className="hccc-red-mark">*</span>
              <input name="signer_name" value={form.signer_name} onChange={handleChange} className="hccc-sig-input" required />
              <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="hccc-designation-select">
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp formData={footerForm} handleChange={handleFooterChange} />

          <div className="hccc-footer">
            <button type="submit" className="hccc-save-print-btn" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="hccc-copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>
        </form>
      </div>
    </>
  );
}