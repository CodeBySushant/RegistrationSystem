import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:                new Date().toISOString().slice(0, 10),
  patraSankhya:        "",
  chalanNo:            "",
  toName:              "",
  toSecondLine:        "",
  wardNo:              MUNICIPALITY.wardNumber || "",
  prevLocationType:    "",
  prevLocationWardNo:  "",
  cooperativeName:     "",
  cooperativePurpose:  "",
  governmentAgency:    "",
  signerName:          "",
  signerDesignation:   "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: blr-)
   Note: blr- prefix already used in original;
   keeping it since CSS is scoped to this file.
───────────────────────────────────────────── */
const styles = `
.blr-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  background: #d6d7da;
}

.blr-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.blr-top-left  { font-weight: 600; }
.blr-top-right { opacity: 0.9; }

.blr-paper {
  margin: 0 24px 20px;
  padding: 28px 40px 40px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: 280px 280px;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
  background-color: #fff;
}

.blr-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.blr-logo img { width: 90px; height: 90px; }
.blr-head-text { flex: 1; text-align: center; }
.blr-head-main { font-size: 20px; font-weight: 600; }
.blr-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.blr-head-sub  { margin-top: 4px; font-size: 14px; }
.blr-head-meta { font-size: 13px; text-align: right; }
.blr-meta-line { margin-bottom: 4px; }

.blr-small-input {
  width: 120px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.blr-ref-row {
  display: flex;
  gap: 40px;
  margin-top: 20px;
  font-size: 14px;
}
.blr-ref-block { display: flex; align-items: center; gap: 6px; }
.blr-ref-block input { width: 180px; padding: 5px 6px; border: 1px solid #c1c1c1; font-family: inherit; }

.blr-to-block { margin-top: 22px; font-size: 14px; }
.blr-long-input {
  width: 260px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  margin: 0 4px;
  font-family: inherit;
}
.blr-to-second { margin-top: 4px; }

.blr-subject-row {
  display: flex;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.blr-sub-label   { font-weight: 600; margin-right: 6px; }
.blr-subject-text{ text-decoration: underline; }

.blr-body {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.7;
}
.blr-body input {
  padding: 3px 4px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.blr-bold        { font-weight: 600; }
.blr-tiny-input  { width: 60px; }
.blr-small-inline{ width: 100px; }
.blr-medium-input{ width: 200px; }

.blr-blank-area {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  min-height: 260px;
}

.blr-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.blr-sign-name {
  width: 200px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.blr-post-select {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.blr-submit-row { text-align: center; margin-top: 24px; }
.blr-submit-btn {
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
.blr-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.blr-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.blr-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin: 10px 24px 20px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .blr-paper, .blr-paper * { visibility: visible; }
  .blr-page { background: white; }
  .blr-topbar, .blr-submit-row, .blr-footer { display: none !important; }
  .blr-paper {
    position: absolute; left: 0; top: 0; width: 100%;
    margin: 0; padding: 20px 40px;
    box-shadow: none;
    background: white !important;
    background-image: none !important;
  }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .blr-paper { padding: 15px; margin: 0 8px 16px; }
  .blr-letterhead { flex-direction: column; align-items: center; gap: 10px; }
  .blr-head-meta { text-align: center; }
  .blr-ref-row { flex-direction: column; gap: 8px; }
  .blr-long-input { width: 180px; }
  .blr-medium-input { width: 150px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function BulkLoanRecommendation() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!f.signerName?.trim())    return "हस्ताक्षरकर्ताको नाम आवश्यक छ";
    if (!f.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) { alert(err); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post(
        "/api/forms/bulk-loan-recommendation",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setTimeout(() => setFormData(INITIAL_STATE), 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "त्रुटि";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Adapter for ApplicantDetailsNp (camelCase)
  const footerForm = {
    applicantName:        formData.applicantName,
    applicantAddress:     formData.applicantAddress,
    applicantCitizenship: formData.applicantCitizenship,
    applicantPhone:       formData.applicantPhone,
  };
  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="blr-page">
        <header className="blr-topbar">
          <div className="blr-top-left">थोक कर्जा सिफारिस</div>
          <div className="blr-top-right">अवलोकन पृष्ठ / थोक कर्जा सिफारिस</div>
        </header>

        <div className="blr-paper">
          {/* ── Letterhead ── */}
          <div className="blr-letterhead">
            <div className="blr-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="blr-head-text">
              <div className="blr-head-main">{MUNICIPALITY.name}</div>
              <div className="blr-head-ward">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </div>
              <div className="blr-head-sub">
                {MUNICIPALITY.officeLine} <br />
                {MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="blr-head-meta">
              <div className="blr-meta-line">
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="blr-small-input"
                />
              </div>
              <div className="blr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── Ref row ── */}
            <div className="blr-ref-row">
              <div className="blr-ref-block">
                <label>पत्र संख्या :</label>
                <input
                  type="text"
                  name="patraSankhya"
                  value={formData.patraSankhya}
                  onChange={handleChange}
                />
              </div>
              <div className="blr-ref-block">
                <label>चलानी नं. :</label>
                <input
                  type="text"
                  name="chalanNo"
                  value={formData.chalanNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ── To ── */}
            <div className="blr-to-block">
              <span>श्री</span>
              <input
                type="text"
                name="toName"
                className="blr-long-input"
                value={formData.toName}
                onChange={handleChange}
              />
              <span>ज्यु,</span>
              <br />
              <input
                type="text"
                name="toSecondLine"
                className="blr-long-input blr-to-second"
                value={formData.toSecondLine}
                onChange={handleChange}
              />
            </div>

            {/* ── Subject ── */}
            <div className="blr-subject-row">
              <span className="blr-sub-label">विषयः</span>
              <span className="blr-subject-text">
                सिफारिस गरी पठाइदिने बारे ।
              </span>
            </div>

            {/* ── Body ── */}
            <p className="blr-body">
              प्रस्तुत विषयमा{" "}
              <span className="blr-bold">{MUNICIPALITY.name}</span> वडा नं.{" "}
              <input
                type="text"
                name="wardNo"
                className="blr-tiny-input"
                value={formData.wardNo}
                onChange={handleChange}
              />{" "}
              (साबिक{" "}
              <input
                type="text"
                name="prevLocationType"
                className="blr-small-inline"
                value={formData.prevLocationType}
                onChange={handleChange}
              />{" "}
              वडा नं.{" "}
              <input
                type="text"
                name="prevLocationWardNo"
                className="blr-tiny-input"
                value={formData.prevLocationWardNo}
                onChange={handleChange}
              />
              ) मा कार्यलय स्थापना गरी आफ्नो क्षेत्रवासीहरुले सहकारी मार्फत ऋण
              प्रवाह गर्न कार्यलय स्थापना गर्न इच्छुक{" "}
              <input
                type="text"
                name="cooperativeName"
                className="blr-medium-input"
                value={formData.cooperativeName}
                onChange={handleChange}
              />{" "}
              सहकारी संस्थाले यस वडा कार्यालयमा निवेदन पेश गरेको हुँदा यस
              कार्यालयमा दर्ता भई आवश्यक कागजातका आधारमा कार्यलय स्थापना गरी
              थोक कर्जा प्रवाह गर्न नेपाल सरकार{" "}
              <input
                type="text"
                name="governmentAgency"
                className="blr-medium-input"
                value={formData.governmentAgency}
                onChange={handleChange}
              />{" "}
              बाट थोक कर्जा प्राप्त गर्नसकिने व्यवस्था मिलाइदिनुहुन
              सिफारिससाथ अनुरोध गरिएको छ ।
            </p>

            <div className="blr-blank-area" />

            {/* ── Signature ── */}
            <div className="blr-sign-top">
              <input
                type="text"
                className="blr-sign-name"
                name="signerName"
                placeholder="नाम, थर"
                value={formData.signerName}
                onChange={handleChange}
              />
              <select
                className="blr-post-select"
                name="signerDesignation"
                value={formData.signerDesignation}
                onChange={handleChange}
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>अध्यक्ष</option>
                <option>सचिव</option>
                <option>अधिकृत</option>
              </select>
            </div>

            {/* ── Applicant details ── */}
            <ApplicantDetailsNp
              formData={footerForm}
              handleChange={handleFooterChange}
            />

            {/* ── Submit ── */}
            <div className="blr-submit-row">
              <button
                className="blr-submit-btn"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "पठाइँ हुँदैछ..."
                  : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>
        </div>

        <footer className="blr-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>
      </div>
    </>
  );
}