import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from TaxClearCertificate.css)
   CSS already used "tcc-" prefix. Generic footer/applicant classes
   prefixed with "tcc-". Bare `body` rule dropped.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .tcc-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #d6d7da;
    font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
  }

  /* ── Top Bar ── */
  .tcc-topbar {
    background-color: #111827;
    color: #fff;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .tcc-top-left  { font-weight: 600; }
  .tcc-top-right { opacity: 0.9; }

  /* ── Paper ── */
  .tcc-paper {
    max-width: 950px;
    margin: 24px auto 20px;
    padding: 28px 40px 40px;
    background-color: #fff;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
  }

  /* ── Letterhead ── */
  .tcc-letterhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .tcc-logo img    { width: 80px; height: 80px; }
  .tcc-head-text   { flex: 1; text-align: center; }
  .tcc-head-main   { font-size: 2rem; font-weight: bold; color: #e74c3c; }
  .tcc-head-ward   { font-size: 2.2rem; font-weight: bold; color: #e74c3c; }
  .tcc-head-sub    { margin-top: 4px; font-size: 1rem; color: #e74c3c; }
  .tcc-head-meta   { font-size: 13px; text-align: right; }
  .tcc-small-input {
    width: 120px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    outline: none;
    font-family: inherit;
  }

  /* ── Ref row ── */
  .tcc-ref-row { display: flex; gap: 40px; margin-top: 20px; font-size: 14px; flex-wrap: wrap; }
  .tcc-ref-block { display: flex; align-items: center; gap: 6px; }
  .tcc-ref-block input {
    width: 160px;
    padding: 5px 6px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    outline: none;
    font-family: inherit;
  }

  /* ── To Block ── */
  .tcc-to-block { margin-top: 22px; font-size: 1.05rem; line-height: 2; }
  .tcc-long-input {
    width: 260px;
    padding: 4px 6px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-left: 6px;
    border-radius: 3px;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    vertical-align: middle;
  }
  .tcc-to-second { margin-top: 6px; }

  /* ── Subject ── */
  .tcc-subject-row { display: flex; align-items: center; margin-top: 22px; font-size: 15px; }
  .tcc-sub-label   { font-weight: 600; margin-right: 6px; }
  .tcc-subject-text { text-decoration: underline; }

  /* ── Body ── */
  .tcc-body { margin-top: 16px; font-size: 1.05rem; line-height: 2.6; text-align: justify; }
  .tcc-body input {
    padding: 3px 6px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    margin: 0 4px;
    outline: none;
    vertical-align: middle;
    font-family: inherit;
    font-size: inherit;
  }
  .tcc-bold         { font-weight: 600; }
  .tcc-medium-input { width: 170px; }

  /* ── Section / Table ── */
  .tcc-section  { margin-top: 18px; }
  .tcc-subtitle { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
  .tcc-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .tcc-table th,
  .tcc-table td { border: 1px solid #c1c1c1; padding: 6px 5px; vertical-align: middle; }
  .tcc-table th { background-color: #f0f0f0; text-align: center; }
  .tcc-table td input {
    width: 100%;
    border: none;
    background-color: #fff;
    padding: 3px 4px;
    outline: none;
    font-family: inherit;
    font-size: inherit;
  }

  /* ── Signature ── */
  .tcc-sign-top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .tcc-sign-name {
    width: 200px;
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    outline: none;
    font-family: inherit;
  }
  .tcc-post-select {
    padding: 4px 6px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    font-family: inherit;
  }

  /* ── Applicant details (scoped) ── */
  .tcc-paper .applicant-details-box {
    border: 2px solid #999;
    padding: 20px;
    background-color: transparent;
    margin-top: 20px;
    border-radius: 4px;
  }
  .tcc-paper .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .tcc-paper .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .tcc-paper .detail-group { display: flex; flex-direction: column; }
  .tcc-paper .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .tcc-paper .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    font-family: inherit;
  }
  .tcc-paper .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .tcc-form-footer { text-align: center; margin-top: 40px; }
  .tcc-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .tcc-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .tcc-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .tcc-copyright {
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
    .tcc-paper, .tcc-paper * { visibility: visible; }
    .tcc-topbar, .tcc-form-footer { display: none !important; }
    .tcc-paper {
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
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial State
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  date:               new Date().toISOString().slice(0, 10),
  refLetterNo:        "",
  chalaniNo:          "",
  to_line1:           "",
  to_line2:           "",
  resident_name:      "",
  ward_no:            "",
  fiscal_year:        "",
  amount_due:         "",
  receipt_no_date:    "",
  estimated_arrear:   "",
  paid_arrear:        "",
  sign_name:          "",
  sign_position:      "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship: "",
  applicantPhone:     "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
function TaxClearanceCertificate() {
  const { user } = useAuth();
  const [form,    setForm]    = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/tax-clearance-certificate", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/tax-clearance-certificate", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error("Print error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="tcc-page">
      <style>{STYLES}</style>

      <header className="tcc-topbar">
        <div className="tcc-top-left">कर बुझ्ता प्रमाण पत्र सम्बन्धमा</div>
        <div className="tcc-top-right">अवलोकन पृष्ठ / कर बुझ्ता प्रमाण पत्र सम्बन्धमा</div>
      </header>

      <form className="tcc-paper" onSubmit={handleSubmit}>

        {/* ── Letterhead ── */}
        <div className="tcc-letterhead">
          <div className="tcc-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Emblem" />
          </div>
          <div className="tcc-head-text">
            <div className="tcc-head-main">{MUNICIPALITY.name}</div>
            <div className="tcc-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="tcc-head-sub">
              {MUNICIPALITY.officeLine} <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="tcc-head-meta">
            <div>
              मिति :{" "}
              <input type="text" name="date" className="tcc-small-input" value={form.date} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* ── Ref row ── */}
        <div className="tcc-ref-row">
          <div className="tcc-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
          </div>
          <div className="tcc-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
          </div>
        </div>

        {/* ── To Block ── */}
        <div className="tcc-to-block">
          <span>श्री</span>
          <input type="text" name="to_line1" className="tcc-long-input" value={form.to_line1} onChange={handleChange} />
          <br />
          <input type="text" name="to_line2" className="tcc-long-input tcc-to-second" value={form.to_line2} onChange={handleChange} />
        </div>

        {/* ── Subject ── */}
        <div className="tcc-subject-row">
          <span className="tcc-sub-label">विषयः</span>
          <span className="tcc-subject-text">कर बुझ्ता प्रमाण पत्र सम्बन्धमा ।</span>
        </div>

        {/* ── Body ── */}
        <p className="tcc-body">
          प्रस्तुत विषयमा <span className="tcc-bold">{MUNICIPALITY.name}</span>{" "}
          वडा नं. {user?.ward || ""} मा बस्ने श्री{" "}
          <input type="text" name="resident_name" className="tcc-medium-input" value={form.resident_name} onChange={handleChange} />
          {" "}को नाममा रहेको व्यवसाय / घर जग्गा / अन्य कर सम्बन्धी विवरण अनुसार
          तल उल्लेख गरिएको आर्थिक वर्षहरू सम्मको कर भरपाई भएको / नभएको
          प्रमाणित गर्न अनुरोध गरिन्छ ।
        </p>

        {/* ── Detail Table ── */}
        <section className="tcc-section">
          <h3 className="tcc-subtitle">किरसियत विवरण</h3>
          <table className="tcc-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>आ.व.</th>
                <th>बुझाउनु पर्ने रकम</th>
                <th>भर गरेको रसिद नं./मिति</th>
                <th>कर बक्यौता अनुमानित रकम</th>
                <th>कर बक्यौता रकम बुझाएको रकम</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" name="fiscal_year"      value={form.fiscal_year}      onChange={handleChange} /></td>
                <td><input type="text" name="amount_due"       value={form.amount_due}       onChange={handleChange} /></td>
                <td><input type="text" name="receipt_no_date"  value={form.receipt_no_date}  onChange={handleChange} /></td>
                <td><input type="text" name="estimated_arrear" value={form.estimated_arrear} onChange={handleChange} /></td>
                <td><input type="text" name="paid_arrear"      value={form.paid_arrear}      onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ── Signature ── */}
        <div className="tcc-sign-top">
          <input
            type="text"
            name="sign_name"
            className="tcc-sign-name"
            placeholder="नाम, थर"
            value={form.sign_name}
            onChange={handleChange}
          />
          <select name="sign_position" className="tcc-post-select" value={form.sign_position} onChange={handleChange}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="tcc-form-footer">
          <button className="tcc-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="tcc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}

export default TaxClearanceCertificate;