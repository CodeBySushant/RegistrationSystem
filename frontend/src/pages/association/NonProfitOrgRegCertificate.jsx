import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  fiscalYear:          "2082/83",
  date:                new Date().toISOString().slice(0, 10),
  chalaniNo:           "",
  regNo:               "",
  regDate:             "",
  organizationName:    "",
  organizationAddress: "",
  subjectArea:         "",
  startDate:           "",
  email:               "",
  phone:               "",
  presidentName:       "",
  presidentAddress:    "",
  presidentEmail:      "",
  presidentPhone:      "",
  bankAccountInfo:     "",
  bankEmail:           "",
  bankPhone:           "",
  signerName:          "",
  signerDesignation:   "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: nprc-)
───────────────────────────────────────────── */
const styles = `
.nprc-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  background: #d6d7da;
}

.nprc-topbar {
  background-color: #111827;
  color: #fff;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.nprc-top-left  { font-weight: 600; }
.nprc-top-right { opacity: 0.9; }

.nprc-paper {
  margin: 0 24px 20px;
  padding: 28px 40px 40px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: 280px 280px;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
}

.nprc-letterhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nprc-logo img { width: 90px; height: 90px; }
.nprc-head-text { flex: 1; text-align: center; }
.nprc-head-main { font-size: 20px; font-weight: 600; }
.nprc-head-ward { font-size: 28px; font-weight: 700; color: #e60000; }
.nprc-head-sub  { margin-top: 4px; font-size: 14px; }
.nprc-head-meta { font-size: 13px; text-align: right; }
.nprc-meta-line { margin-bottom: 4px; }

.nprc-fy-select {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.nprc-small-input {
  width: 120px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.nprc-ref-row { display: flex; margin-top: 18px; font-size: 14px; }
.nprc-ref-block { display: flex; align-items: center; gap: 6px; }
.nprc-ref-block input {
  width: 200px;
  padding: 5px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.nprc-subject-block {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.nprc-subject-wrap { display: flex; align-items: center; font-size: 15px; }
.nprc-sub-label    { font-weight: 600; margin-right: 6px; }
.nprc-subject-text { text-decoration: underline; }
.nprc-stamp-box {
  border: 1px solid #c1c1c1;
  width: 120px;
  height: 120px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nprc-section { margin-top: 18px; font-size: 14px; }
.nprc-field-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}
.nprc-field-row label { min-width: 210px; }
.nprc-field-row input {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.nprc-medium-input { width: 180px; }
.nprc-wide-input   { flex: 1; min-width: 220px; }

.nprc-cert-section { margin-top: 20px; }
.nprc-body { line-height: 1.6; }

.nprc-sign-line-wrapper {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
.nprc-sign-line { width: 200px; border-bottom: 1px solid #000; }

.nprc-sign-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}
.nprc-sign-name {
  width: 200px;
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}
.nprc-post-select {
  padding: 4px 6px;
  border: 1px solid #c1c1c1;
  font-family: inherit;
}

.nprc-submit-row { text-align: center; margin-top: 24px; }
.nprc-submit-btn {
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
.nprc-submit-btn:hover:not(:disabled) { background-color: #1a252f; }
.nprc-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.nprc-footer {
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
  .nprc-paper, .nprc-paper * { visibility: visible; }
  .nprc-page { background: white; }
  .nprc-topbar, .nprc-submit-row, .nprc-footer { display: none !important; }
  .nprc-paper {
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
  .nprc-paper { padding: 15px; margin: 0 8px 16px; }
  .nprc-letterhead { flex-direction: column; align-items: center; gap: 10px; }
  .nprc-head-meta  { text-align: center; }
  .nprc-subject-block { flex-direction: column; gap: 12px; }
  .nprc-field-row label { min-width: 0; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function NonProfitOrgRegCertificate() {
  const [form, setForm]         = useState(INITIAL_STATE);
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
        "/api/forms/non-profit-org-registration-certificate",
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

      <div className="nprc-page">
        <header className="nprc-topbar">
          <div className="nprc-top-left">गैर नाफामूलक संस्था दर्ता</div>
          <div className="nprc-top-right">
            अवलोकन पृष्ठ / गैर नाफामूलक संस्था दर्ता प्रमाण पत्र
          </div>
        </header>

        <div className="nprc-paper">
          {/* ── Letterhead ── */}
          <div className="nprc-letterhead">
            <div className="nprc-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="nprc-head-text">
              <div className="nprc-head-main">{MUNICIPALITY.name}</div>
              <div className="nprc-head-ward">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </div>
              <div className="nprc-head-sub">
                {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
              </div>
            </div>
            <div className="nprc-head-meta">
              <div>
                पत्र संख्या :
                <select
                  name="fiscalYear"
                  value={form.fiscalYear}
                  onChange={handleChange}
                  className="nprc-fy-select"
                >
                  <option>2082/83</option>
                  <option>2081/82</option>
                  <option>2080/81</option>
                </select>
              </div>
              <div className="nprc-meta-line">
                मिति :{" "}
                <input
                  type="text"
                  name="date"
                  className="nprc-small-input"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
              <div className="nprc-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── Ref ── */}
            <div className="nprc-ref-row">
              <div className="nprc-ref-block">
                <label>चलानी नं. :</label>
                <input
                  type="text"
                  name="chalaniNo"
                  value={form.chalaniNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ── Subject + stamp ── */}
            <div className="nprc-subject-block">
              <div className="nprc-subject-wrap">
                <span className="nprc-sub-label">विषयः</span>
                <span className="nprc-subject-text">
                  गैर नाफामूलक संस्था दर्ता प्रमाण पत्र ।
                </span>
              </div>
              <div className="nprc-stamp-box">
                <div>संस्थाको छाप वा</div>
                <div>फोटो</div>
              </div>
            </div>

            {/* ── Section 1: Org details ── */}
            <section className="nprc-section">
              <div className="nprc-field-row">
                <label>दर्ता नं. :</label>
                <input type="text" name="regNo" className="nprc-medium-input" value={form.regNo} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>दर्ता मिति :</label>
                <input type="text" name="regDate" className="nprc-medium-input" value={form.regDate} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>१) संस्थाको नाम :</label>
                <input type="text" name="organizationName" className="nprc-wide-input" value={form.organizationName} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>ठेगाना :</label>
                <input type="text" name="organizationAddress" className="nprc-wide-input" value={form.organizationAddress} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>विषयगत क्षेत्र :</label>
                <input type="text" name="subjectArea" className="nprc-medium-input" value={form.subjectArea} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>संस्थाको कारोबार शुरू भएको मिति :</label>
                <input type="text" name="startDate" className="nprc-medium-input" value={form.startDate} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>ई–मेल :</label>
                <input type="text" name="email" className="nprc-wide-input" value={form.email} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>सम्पर्क फोन नं. :</label>
                <input type="text" name="phone" className="nprc-medium-input" value={form.phone} onChange={handleChange} />
              </div>
            </section>

            {/* ── Section 2: President ── */}
            <section className="nprc-section">
              <div className="nprc-field-row">
                <label>२) सभापति / अध्यक्ष / मुख्य व्यक्तिको नाम, थर :</label>
                <input type="text" name="presidentName" className="nprc-wide-input" value={form.presidentName} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>ठेगाना :</label>
                <input type="text" name="presidentAddress" className="nprc-wide-input" value={form.presidentAddress} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>ई–मेल :</label>
                <input type="text" name="presidentEmail" className="nprc-wide-input" value={form.presidentEmail} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>सम्पर्क फोन नं. :</label>
                <input type="text" name="presidentPhone" className="nprc-medium-input" value={form.presidentPhone} onChange={handleChange} />
              </div>
            </section>

            {/* ── Section 3: Bank ── */}
            <section className="nprc-section">
              <div className="nprc-field-row">
                <label>३) बैंकमा खाता भएका भए सम्बन्धित नाम, थर, ठेगाना :</label>
                <input type="text" name="bankAccountInfo" className="nprc-wide-input" value={form.bankAccountInfo} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>ई–मेल :</label>
                <input type="text" name="bankEmail" className="nprc-wide-input" value={form.bankEmail} onChange={handleChange} />
              </div>
              <div className="nprc-field-row">
                <label>सम्पर्क फोन नं. :</label>
                <input type="text" name="bankPhone" className="nprc-medium-input" value={form.bankPhone} onChange={handleChange} />
              </div>
            </section>

            {/* ── Cert section ── */}
            <section className="nprc-section nprc-cert-section">
              <p className="nprc-body">
                ऐसागर्ने अन्य निकायबाट स्वीकृत वा इजाजत लिनु पर्ने छ । साथै
                यो प्रमाण पत्र सावधानी नवीकरण गर्नु पर्नेछ ।
              </p>
              <div className="nprc-sign-line-wrapper">
                <span>प्रमाणित गर्ने</span>
                <div className="nprc-sign-line" />
              </div>
            </section>

            {/* ── Signature ── */}
            <div className="nprc-sign-top">
              <input
                type="text"
                name="signerName"
                className="nprc-sign-name"
                placeholder="नाम, थर"
                value={form.signerName}
                onChange={handleChange}
              />
              <select
                name="signerDesignation"
                className="nprc-post-select"
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
            <ApplicantDetailsNp formData={form} handleChange={handleChange} />

            {/* ── Submit ── */}
            <div className="nprc-submit-row">
              <button className="nprc-submit-btn" type="submit" disabled={submitting}>
                {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>

          </form>
        </div>

        <footer className="nprc-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </footer>
      </div>
    </>
  );
}