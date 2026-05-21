// IndustryChange.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from IndustryChange.css)
   CSS already used "usc-" prefix for the component's own classes.
   Non-prefixed generic classes (.form-footer, .save-print-btn, .copyright-footer,
   .applicant-details-box, .details-grid, etc.) are now prefixed with "usc-" too.

   NOTE: Bare `body { margin; font-family; background }` dropped — inlining
   global rules would break the entire app. Background moved to `.usc-page`;
   font-family set on `.usc-paper` and inherited.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page wrapper ── */
  .usc-page {
    max-width: 950px;
    margin: 0 auto;
    background: #d6d7da;
    font-family: "Kalimati", "Kokila", "Mangal", sans-serif;
  }

  /* ── Top Bar ── */
  .usc-topbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .usc-top-left  { font-weight: bold; }
  .usc-top-right { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Paper ── */
  .usc-paper {
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: "Kalimati", "Kokila", sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Title Block ── */
  .usc-title-block {
    text-align: center;
    line-height: 1.8;
    margin-bottom: 10px;
    font-size: 1rem;
  }
  .usc-title-bold { font-weight: 700; font-size: 1.1rem; margin-top: 6px; }

  /* ── Date ── */
  .usc-date-row { text-align: right; margin-top: 12px; font-size: 1rem; }
  .usc-date-input {
    width: 120px;
    padding: 2px 5px;
    border: none;
    border-bottom: 1px dotted #000;
    background: #fff;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
  }

  /* ── To Row ── */
  .usc-to-row { margin-top: 20px; font-size: 1.05rem; line-height: 2; }
  .usc-long {
    width: 260px;
    padding: 4px 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    margin: 0 6px;
  }
  .usc-margin-top { margin-top: 6px; display: inline-block; }

  /* ── Subject ── */
  .usc-subject-row {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .usc-sub-label    { font-weight: bold; }
  .usc-subject-bold { text-decoration: underline; }

  /* ── Body ── */
  .usc-body { margin-top: 20px; font-size: 1.05rem; line-height: 2.4; text-align: justify; }

  /* ── Inline input sizes ── */
  .usc-small  { width: 110px; padding: 3px 5px; border: 1px solid #ccc; background: #fff; border-radius: 3px; font-family: inherit; font-size: 1rem; outline: none; margin: 0 4px; }
  .usc-medium { width: 170px; padding: 3px 5px; border: 1px solid #ccc; background: #fff; border-radius: 3px; font-family: inherit; font-size: 1rem; outline: none; margin: 0 4px; }
  .usc-tiny   { width:  55px; padding: 3px 5px; border: 1px solid #ccc; background: #fff; border-radius: 3px; font-family: inherit; font-size: 1rem; outline: none; margin: 0 4px; }

  /* ── Table ── */
  .usc-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 0.95rem; }
  .usc-table th,
  .usc-table td { border: 1px solid #c2c2c2; padding: 6px 4px; text-align: left; }
  .usc-table th  { background: #f0f0f0; text-align: center; font-weight: bold; }
  .usc-table td input {
    width: 100%;
    border: none;
    padding: 4px;
    outline: none;
    background: #fff;
    font-family: inherit;
    font-size: 0.95rem;
  }
  .usc-action-cell { text-align: center; white-space: nowrap; }
  .usc-add-btn {
    background: #2c3e50;
    color: white;
    padding: 4px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    margin: 2px;
    font-family: inherit;
  }
  .usc-add-btn:hover    { background: #1a252f; }
  .usc-remove-btn {
    background: #c0392b;
    color: white;
    padding: 4px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    margin: 2px;
    font-family: inherit;
  }
  .usc-remove-btn:hover { background: #922b21; }

  /* ── Signature Section ── */
  .usc-sign-section { display: flex; justify-content: flex-end; margin-top: 30px; }
  .usc-sign-box {
    border: 1px solid #ccc;
    padding: 14px;
    width: 280px;
    font-size: 0.95rem;
    background: #fff;
  }
  .usc-sign-label  { text-align: right; font-weight: bold; margin-bottom: 8px; }
  .usc-sign-field  { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .usc-sign-field span { white-space: nowrap; }
  .usc-sign-field input {
    flex: 1;
    border: none;
    border-bottom: 1px dotted #000;
    background: #fff;
    padding: 3px 4px;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
  }

  /* ── Documents list ── */
  .usc-subheader { margin-top: 26px; font-size: 1.05rem; font-weight: bold; }
  .usc-doc-list  { font-size: 1rem; margin-top: 8px; line-height: 1.8; }
  .usc-doc-list li { margin-bottom: 4px; }

  /* ── Applicant details (scoped) ── */
  .usc-paper .applicant-details-box {
    border: 2px solid #999;
    padding: 20px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 4px;
  }
  .usc-paper .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .usc-paper .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .usc-paper .detail-group { display: flex; flex-direction: column; }
  .usc-paper .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .usc-paper .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    background: #fff;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    font-family: inherit;
  }
  .usc-paper .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .usc-form-footer { text-align: center; margin-top: 40px; }
  .usc-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .usc-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .usc-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .usc-copyright {
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
    .usc-paper, .usc-paper * { visibility: visible; }
    .usc-paper {
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
    .usc-topbar, .usc-form-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */
const toNepaliDigits = (str) => {
  const map = { 0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

const makeEmptyRow = () => ({ current_work: "", change_required: "", reason: "" });

/* ─────────────────────────────────────────────────────────────────────────────
   Initial Form
───────────────────────────────────────────────────────────────────────────── */
const initialForm = {
  date:                 new Date().toISOString().slice(0, 10),
  to_line1:             MUNICIPALITY.officeLine || "",
  to_line2:             MUNICIPALITY.name       || "",
  district:             MUNICIPALITY.englishDistrict || "",
  municipality:         MUNICIPALITY.name       || "",
  ward:                 "",
  industry_name:        "",
  industry_other_info:  "",
  applicant_name:       "",
  applicant_address:    "",
  applicant_citizen_no: "",
  applicant_phone:      "",
  applicant_email:      "",
  signature:            "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function IndustryChange() {
  const { user } = useAuth();

  const [form,      setForm]      = useState(initialForm);
  const [tableRows, setTableRows] = useState([makeEmptyRow()]);
  const [loading,   setLoading]   = useState(false);

  /* Sync ward from auth */
  useEffect(() => {
    if (user?.ward && !form.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
  }, [user]); // eslint-disable-line

  /* ── Handlers ── */
  const updateField = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const updateTableRow = (index, key, value) =>
    setTableRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [key]: value } : r))
    );
  const addRow    = () => setTableRows((prev) => [...prev, makeEmptyRow()]);
  const removeRow = (index) => setTableRows((prev) => prev.filter((_, i) => i !== index));

  /* ── Build payload ── */
  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.table_rows = JSON.stringify(tableRows);
    return payload;
  };

  const resetAll = () => {
    setForm(initialForm);
    setTableRows([makeEmptyRow()]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-change", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        resetAll();
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-change", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        resetAll();
      }
    } catch (err) {
      console.error("Print error:", err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="usc-page">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <header className="usc-topbar">
        <div className="usc-top-left">उद्योगको दर्ता हेरफेर ।</div>
        <div className="usc-top-right">उद्योग &gt; उद्योगको स्थिर पुँजी परिवर्तन</div>
      </header>

      <form className="usc-paper" onSubmit={handleSubmit}>

        {/* ── Title ── */}
        <div className="usc-title-block">
          <div>अनुसूची–३२</div>
          <div>(नियम १२ को उपनियम (३) संग सम्बन्धित)</div>
          <div className="usc-title-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेरको लागि दिइने निवेदन
          </div>
        </div>

        {/* ── Date ── */}
        <div className="usc-date-row">
          मिति :{" "}
          <input readOnly className="usc-date-input" value={toNepaliDigits(form.date)} />
        </div>

        {/* ── To Row ── */}
        <div className="usc-to-row">
          <span>श्री</span>
          <input type="text" className="usc-long" value={form.to_line1} onChange={(e) => updateField("to_line1", e.target.value)} />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="usc-long usc-margin-top" value={form.to_line2} onChange={(e) => updateField("to_line2", e.target.value)} />
        </div>

        {/* ── Subject ── */}
        <div className="usc-subject-row">
          <span className="usc-sub-label">विषयः</span>
          <span className="usc-subject-bold">
            उद्योगको स्थिर पुँजी / क्षमता परिवर्तन वा हेरफेर सम्बन्धमा ।
          </span>
        </div>

        {/* ── Body ── */}
        <p className="usc-body">
          महोदय,<br /><br />
          <span>{MUNICIPALITY.provinceLine}</span>{" "}
          <input className="usc-small" value={form.district} onChange={(e) => updateField("district", e.target.value)} />
          <span> जिल्ला </span>
          <span>{MUNICIPALITY.name}</span>
          {" "}वडा नं.{" "}
          <input className="usc-tiny" value={form.ward} onChange={(e) => updateField("ward", e.target.value)} />
          {" "}मा दर्ता भई{" "}
          <input className="usc-medium" value={form.industry_name} onChange={(e) => updateField("industry_name", e.target.value)} />
          {" "}नामक उद्योग{" "}
          <input className="usc-small" value={form.industry_other_info} onChange={(e) => updateField("industry_other_info", e.target.value)} />
          {" "}देखि संचालन भई आएको छ।<br /><br />
          स्थिर पुँजी तथा क्षमता विवरण अनुसार परिवर्तन वा हेरफेर गर्न आवश्यक
          भएकाले विवरण साथमा निवेदन गरेको छु ।
        </p>

        {/* ── Table ── */}
        <table className="usc-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>हालको कायम रहेको</th>
              <th>परिवर्तन वा हेरफेर गर्नुपर्ने</th>
              <th>कारण</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td><input type="text" value={r.current_work}    onChange={(e) => updateTableRow(i, "current_work",    e.target.value)} /></td>
                <td><input type="text" value={r.change_required} onChange={(e) => updateTableRow(i, "change_required", e.target.value)} /></td>
                <td><input type="text" value={r.reason}          onChange={(e) => updateTableRow(i, "reason",          e.target.value)} /></td>
                <td className="usc-action-cell">
                  <button type="button" className="usc-add-btn" onClick={addRow}>+</button>
                  {tableRows.length > 1 && (
                    <button type="button" className="usc-remove-btn" onClick={() => removeRow(i)}>−</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Signature ── */}
        <div className="usc-sign-section">
          <div className="usc-sign-box">
            <div className="usc-sign-label">निवेदकको</div>
            <div className="usc-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" value={form.signature}       onChange={(e) => updateField("signature",       e.target.value)} />
            </div>
            <div className="usc-sign-field">
              <span>नाम, थर :</span>
              <input type="text" value={form.applicant_name}  onChange={(e) => updateField("applicant_name",  e.target.value)} />
            </div>
            <div className="usc-sign-field">
              <span>फोन नम्बर :</span>
              <input type="text" value={form.applicant_phone} onChange={(e) => updateField("applicant_phone", e.target.value)} />
            </div>
            <div className="usc-sign-field">
              <span>ईमेल :</span>
              <input type="text" value={form.applicant_email} onChange={(e) => updateField("applicant_email", e.target.value)} />
            </div>
          </div>
        </div>

        {/* ── Documents List ── */}
        <h3 className="usc-subheader">संलग्न कागजात</h3>
        <ul className="usc-doc-list">
          <li>अघिल्लो आ. व. को विवरणपत्र प्रतिवेदन</li>
          <li>कर बुझाएको प्रमाण</li>
          <li>अनुज्ञप्ति–२६ क्षमताको अद्यावधिक विवरण</li>
          <li>नागरिक प्रमाणपत्रको प्रमाणित प्रति</li>
          <li>पंजीकरण, नवीकरण र कम्पनी दर्ता प्रमाणपत्र (कम्पनी भए)</li>
          <li>संचालक समिति/साझेदारको विवरण (बोधार्थ फर्मभित्र)</li>
          <li>क्षमताको निवेदनको फायल</li>
          <li>अन्य कागजात</li>
        </ul>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="usc-form-footer">
          <button className="usc-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="usc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}