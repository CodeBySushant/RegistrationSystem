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
  toPlace:             MUNICIPALITY.officeLine      || "",
  district:            MUNICIPALITY.englishDistrict || "",
  municipalityWardNo:  MUNICIPALITY.wardNumber      || "",
  prevWardNo:          MUNICIPALITY.wardNumber      || "",
  organizationName:    "",
  organizationLocation:"",
  organizationType:    "",
  suggestedBy:         "",
  signerName:          "",
  signerDesignation:   "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: nor-)
───────────────────────────────────────────── */
const styles = `
.nor-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  background: #d6d7da;
}

.nor-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.nor-top-left  { font-weight: 600; }
.nor-top-right { opacity: 0.9; }

.nor-paper {
  margin: 0 24px 20px;
  padding: 28px 40px 40px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: 280px 280px;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
}

.nor-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nor-logo img { width: 90px; height: 90px; }
.nor-head-text { flex: 1; text-align: center; }
.nor-head-main { font-size: 20px; font-weight: 600; }
.nor-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.nor-head-sub  { margin-top: 4px; font-size: 14px; }
.nor-head-meta { font-size: 13px; text-align: right; }
.nor-meta-line { margin-bottom: 4px; }

.nor-small-input {
  width: 120px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.nor-ref-row {
  display: flex;
  gap: 40px;
  margin-top: 20px;
  font-size: 14px;
}
.nor-ref-block { display: flex; align-items: center; gap: 6px; }
.nor-ref-block input {
  width: 180px;
  padding: 5px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.nor-to-block { margin-top: 22px; font-size: 14px; }
.nor-long-input {
  width: 260px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  margin: 0 4px;
  font-family: inherit;
}

.nor-subject-row {
  display: flex;
  align-items: center;
  margin-top: 22px;
  font-size: 15px;
}
.nor-sub-label   { font-weight: 600; margin-right: 6px; }
.nor-subject-text{ text-decoration: underline; }

.nor-body {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.7;
}
.nor-body input {
  padding: 3px 4px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.nor-bold        { font-weight: 600; }
.nor-tiny-input  { width: 60px; }
.nor-small-inline{ width: 100px; }
.nor-medium-input{ width: 180px; }

.nor-blank-area {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  min-height: 240px;
}

.nor-sign-top {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.nor-sign-name {
  width: 200px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.nor-post-select {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.nor-submit-row { text-align: center; margin-top: 24px; }
.nor-submit-btn {
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
.nor-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.nor-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.nor-footer {
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
  .nor-paper, .nor-paper * { visibility: visible; }
  .nor-page { background: white; }
  .nor-topbar, .nor-submit-row, .nor-footer { display: none !important; }
  .nor-paper {
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
  .nor-paper { padding: 15px; margin: 0 8px 16px; }
  .nor-letterhead { flex-direction: column; align-items: center; gap: 10px; }
  .nor-head-meta { text-align: center; }
  .nor-ref-row { flex-direction: column; gap: 8px; }
  .nor-long-input { width: 200px; }
  .nor-medium-input { width: 140px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function NewOrganizationRegistration() {
  const [form, setForm]       = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.organizationName?.trim()) return "संस्थाको नाम आवश्यक छ";
    if (!f.applicantName?.trim())    return "निवेदकको नाम आवश्यक छ";
    if (!f.applicantPhone?.trim())   return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(form);
    if (err) { alert(err); return; }

    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post(
        "/api/forms/new-organization-registration",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setTimeout(() => setForm(INITIAL_STATE), 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="nor-page">
        <header className="nor-topbar">
          <div className="nor-top-left">संस्था दर्ता</div>
          <div className="nor-top-right">अवलोकन पृष्ठ / संस्था दर्ता</div>
        </header>

        <div className="nor-paper">
          {/* ── Letterhead ── */}
          <div className="nor-letterhead">
            <div className="nor-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="nor-head-text">
              <div className="nor-head-main">{MUNICIPALITY.name}</div>
              <div className="nor-head-ward">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </div>
              <div className="nor-head-sub">
                {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="nor-head-meta">
              <div className="nor-meta-line">
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  className="nor-small-input"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
              <div className="nor-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── Ref row ── */}
            <div className="nor-ref-row">
              <div className="nor-ref-block">
                <label>पत्र संख्या :</label>
                <input
                  type="text"
                  name="patraSankhya"
                  value={form.patraSankhya}
                  onChange={handleChange}
                />
              </div>
              <div className="nor-ref-block">
                <label>चलानी नं. :</label>
                <input
                  type="text"
                  name="chalanNo"
                  value={form.chalanNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ── To ── */}
            <div className="nor-to-block">
              <span>श्री</span>
              <input
                type="text"
                name="toName"
                className="nor-long-input"
                value={form.toName}
                onChange={handleChange}
              />
              <span>ज्यु</span>
            </div>

            {/* ── Subject ── */}
            <div className="nor-subject-row">
              <span className="nor-sub-label">विषयः</span>
              <span className="nor-subject-text">सिफारिस सम्बन्धमा ।</span>
            </div>

            {/* ── Body ── */}
            <p className="nor-body">
              प्रस्तुत विषयमा{" "}
              <span className="nor-bold">यस {MUNICIPALITY.name}</span> वडा नं.{" "}
              <input
                type="text"
                name="municipalityWardNo"
                className="nor-tiny-input"
                value={form.municipalityWardNo}
                onChange={handleChange}
              />{" "}
              (साबिक{" "}
              <input
                type="text"
                name="prevWardNo"
                className="nor-small-inline"
                value={form.prevWardNo}
                onChange={handleChange}
              />{" "}
              ) , जिल्ला{" "}
              <input
                type="text"
                name="district"
                className="nor-small-inline"
                value={form.district}
                onChange={handleChange}
              />{" "}
              स्थित रहेको{" "}
              <input
                type="text"
                name="organizationName"
                className="nor-medium-input"
                placeholder="संस्थाको नाम"
                value={form.organizationName}
                onChange={handleChange}
              />{" "}
              नामक संस्था दर्ता गर्नुपर्ने भएकोले सो को लागि "सिफारिस गरी
              पाउँ" भनी यस कार्यालयमा दर्ता निवेदन बमोजिम दर्ता सिफारिस
              गरिएको छ ।
            </p>

            <div className="nor-blank-area" />

            {/* ── Signature ── */}
            <div className="nor-sign-top">
              <input
                type="text"
                name="signerName"
                className="nor-sign-name"
                placeholder="नाम, थर"
                value={form.signerName}
                onChange={handleChange}
              />
              <select
                name="signerDesignation"
                className="nor-post-select"
                value={form.signerDesignation}
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
              formData={form}
              handleChange={handleChange}
            />

            {/* ── Submit ── */}
            <div className="nor-submit-row">
              <button
                className="nor-submit-btn"
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

        <footer className="nor-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>
      </div>
    </>
  );
}