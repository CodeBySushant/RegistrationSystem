import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:                        "२०८२/८३",
  chalani_no:                       "",
  date_nep:                         new Date().toISOString().slice(0, 10),
  addressee_name:                   "",
  addressee_line2:                  "",
  previous_municipality:            "",
  previous_type:                    "न.पा.",
  previous_ward_no:                 "",
  applicant_name:                   "",
  applicant_current_municipality:   MUNICIPALITY.name       || "",
  applicant_current_ward_no:        MUNICIPALITY.wardNumber || "",
  plot_details:                     "",
  plot_prev_municipality:           "",
  plot_prev_ward_no:                "",
  signer_name:                      "",
  signer_designation:               "",
  notes:                            "",
  // footer applicant details
  applicant_address:                "",
  applicant_citizenship_no:         "",
  applicant_phone:                  "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: oir-)
───────────────────────────────────────────── */
const styles = `
.oir-container {
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

.oir-bold-text      { font-weight: bold; }
.oir-underline-text { text-decoration: underline; }
.oir-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }

.oir-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.oir-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.oir-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.oir-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.oir-header-text       { display: flex; flex-direction: column; align-items: center; }
.oir-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.oir-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.oir-address-text,
.oir-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.oir-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.oir-meta-left p, .oir-meta-right p { margin: 5px 0; }

.oir-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.oir-small-input { width: 120px; }

.oir-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.oir-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.oir-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.oir-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.oir-medium-input { width: 200px; }

.oir-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.oir-inline-input {
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
.oir-inline-input:focus { border-color: #3b7dd8; }

.oir-inline-select {
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

.oir-tiny-box   { width: 40px; text-align: center; }
.oir-medium-box { width: 160px; }

.oir-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.oir-signature-block { width: 220px; text-align: center; position: relative; }
.oir-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.oir-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.oir-designation-select {
  width: 100%; padding: 5px;
  border: 1px solid #ccc; background: #fff;
  font-family: inherit; font-size: 1rem;
}

.oir-footer { text-align: center; margin-top: 40px; }
.oir-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.oir-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.oir-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.oir-copyright-footer {
  text-align: right; font-size: 0.8rem; color: #666;
  margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;
}

@media print {
  body * { visibility: hidden; }
  .oir-container, .oir-container * { visibility: visible; }
  .oir-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .oir-footer, .oir-top-right-bread, .oir-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

@media (max-width: 768px) {
  .oir-container { padding: 15px; }
  .oir-meta-data-row { flex-direction: column; gap: 8px; }
  .oir-inline-input { width: 110px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function OnsiteInspectionRecommendation() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.addressee_name?.trim())        return "प्राप्तकर्ताको नाम आवश्यक छ";
    if (!form.previous_municipality?.trim()) return "पालिकाको नाम आवश्यक छ";
    if (!form.previous_ward_no?.trim())      return "वडा नम्बर आवश्यक छ";
    if (!form.applicant_name?.trim())        return "निवेदकको नाम आवश्यक छ";
    if (!form.plot_prev_municipality?.trim()) return "साविक पालिकाको नाम आवश्यक छ";
    if (!form.plot_details?.trim())          return "कित्ता विवरण आवश्यक छ";
    if (!form.applicant_phone?.trim())       return "फोन नम्बर आवश्यक छ";
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
        "/api/forms/onsite-inspection-recommendation",
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

      <div className="oir-container">
        <form onSubmit={handleSubmit}>

          <div className="oir-top-bar-title">
            स्थलगत निरीक्षण
            <span className="oir-top-right-bread">
              घर / जग्गा जमिन &gt; स्थलगत निरीक्षण
            </span>
          </div>

          <div className="oir-form-header-section">
            <div className="oir-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="oir-header-text">
              <h1 className="oir-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="oir-ward-title">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </h2>
              <p className="oir-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="oir-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="oir-meta-data-row">
            <div className="oir-meta-left">
              <p>पत्र संख्या : <span className="oir-bold-text">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="oir-dotted-input oir-small-input"
                />
              </p>
            </div>
            <div className="oir-meta-right">
              <p>मिति : <span className="oir-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          <div className="oir-subject-section">
            <p>
              विषय:{" "}
              <span className="oir-underline-text">स्थलगत निरीक्षण सम्बन्धमा।</span>
            </p>
          </div>

          <div className="oir-addressee-section">
            <div className="oir-addressee-row">
              <span>श्री</span>
              <input
                name="addressee_name"
                value={form.addressee_name}
                onChange={handleChange}
                className="oir-line-input oir-medium-input"
                required
              />
              <span className="oir-red">*</span>
            </div>
            <div className="oir-addressee-row">
              <input
                name="addressee_line2"
                value={form.addressee_line2}
                onChange={handleChange}
                className="oir-line-input oir-medium-input"
              />
            </div>
          </div>

          <div className="oir-form-body">
            <p>
              प्रस्तुत विषयमा{" "}
              <input
                name="previous_municipality"
                value={form.previous_municipality}
                onChange={handleChange}
                className="oir-inline-input oir-medium-box"
                required
              />{" "}
              <select
                name="previous_type"
                value={form.previous_type}
                onChange={handleChange}
                className="oir-inline-select"
              >
                <option value="न.पा.">न.पा.</option>
                <option value="गा.पा.">गा.पा.</option>
              </select>{" "}
              वडा नं.{" "}
              <input
                name="previous_ward_no"
                value={form.previous_ward_no}
                onChange={handleChange}
                className="oir-inline-input oir-tiny-box"
                required
              />{" "}
              बस्ने श्री/सुश्री/श्रीमती{" "}
              <input
                name="applicant_name"
                value={form.applicant_name}
                onChange={handleChange}
                className="oir-inline-input oir-medium-box"
                required
              />{" "}
              को नाममा दर्ता भएको साविक{" "}
              <input
                name="plot_prev_municipality"
                value={form.plot_prev_municipality}
                onChange={handleChange}
                className="oir-inline-input oir-medium-box"
                required
              />{" "}
              वडा नं.{" "}
              <input
                name="plot_prev_ward_no"
                value={form.plot_prev_ward_no}
                onChange={handleChange}
                className="oir-inline-input oir-tiny-box"
                required
              />{" "}
              हो। हाल {form.applicant_current_municipality} वडा नं{" "}
              <input
                name="applicant_current_ward_no"
                value={form.applicant_current_ward_no}
                onChange={handleChange}
                className="oir-inline-input oir-tiny-box"
              />{" "}
              मा पर्ने तपसिल बमोजिम कित्ता भएको जग्गा:{" "}
              <input
                name="plot_details"
                value={form.plot_details}
                onChange={handleChange}
                className="oir-inline-input oir-medium-box"
                required
              />{" "}
              ।
            </p>
          </div>

          <div className="oir-signature-section">
            <div className="oir-signature-block">
              <div className="oir-signature-line"></div>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="oir-sig-input"
                required
              />
              <select
                name="signer_designation"
                value={form.signer_designation}
                onChange={handleChange}
                className="oir-designation-select"
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

          <div className="oir-footer">
            <button
              type="submit"
              className="oir-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="oir-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}