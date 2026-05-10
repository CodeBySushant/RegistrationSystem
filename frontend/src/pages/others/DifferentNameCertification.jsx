// DifferentNameCertification.jsx
import React, { useState } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from DifferentNameCertification.css)
   All classes prefixed with "dnc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .dnc-container {
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

  /* ── Utility ── */
  .dnc-bold      { font-weight: bold; }
  .dnc-underline { text-decoration: underline; }
  .dnc-center    { text-align: center; }

  /* ── Top Bar ── */
  .dnc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .dnc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Meta ── */
  .dnc-meta-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .dnc-meta-left p,
  .dnc-meta-right p { margin: 5px 0; }

  .dnc-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .dnc-w-small  { width: 120px; }
  .dnc-w-medium { width: 200px; }
  .dnc-w-long   { width: 300px; }

  /* ── Addressee ── */
  .dnc-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .dnc-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

  .dnc-line-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .dnc-full-width { width: 100%; }

  /* ── Subject ── */
  .dnc-subject { text-align: center; margin: 24px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .dnc-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 28px;
  }
  .dnc-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 4px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .dnc-w-tiny   { width: 44px;  text-align: center; }
  .dnc-w-sm-box { width: 100px; }
  .dnc-w-md-box { width: 180px; }

  .dnc-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 4px;
    font-size: 1rem;
    font-family: inherit;
    vertical-align: middle;
  }

  /* ── Required-star wrapper ── */
  .dnc-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .dnc-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 13px;
    line-height: 1;
    z-index: 1;
  }
  .dnc-req-wrap .dnc-inline-input,
  .dnc-req-wrap .dnc-line-input,
  .dnc-req-wrap input { padding-left: 16px; }

  /* ── Table ── */
  .dnc-table-section    { margin: 16px 0 36px; }
  .dnc-table-title      { margin-bottom: 6px; font-size: 1rem; }
  .dnc-table-responsive { overflow-x: auto; }

  .dnc-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .dnc-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: center;
    font-size: 0.88rem;
    font-weight: bold;
    color: #333;
    text-decoration: underline;
  }
  .dnc-table td {
    border: 1px solid #555;
    padding: 4px 6px;
    vertical-align: middle;
  }
  .dnc-table td.dnc-last-col {
    display: flex;
    align-items: center;
    gap: 4px;
    border-left: none;
  }

  .dnc-table-input {
    width: 90%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 0.95rem;
    color: #c0392b;
    font-family: inherit;
  }
  .dnc-last-col .dnc-table-input { flex: 1; width: auto; }

  .dnc-add-row-btn {
    margin-top: 8px;
    padding: 5px 14px;
    font-size: 0.88rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #f5f5f5;
    cursor: pointer;
    font-family: inherit;
  }
  .dnc-add-row-btn:hover { background: #e8e8e8; }

  .dnc-rm-row-btn {
    border: none;
    background: none;
    color: #c0392b;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0 4px;
    line-height: 1;
    flex-shrink: 0;
  }

  /* ── Signature ── */
  .dnc-signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 24px;
  }
  .dnc-signature-block { width: 230px; text-align: center; }
  .dnc-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 8px; height: 44px; }
  .dnc-sig-name-input  { margin-bottom: 6px; width: 100%; }
  .dnc-designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    font-family: inherit;
    font-size: 0.95rem;
  }

  /* ── Applicant Details overrides ── */
  .dnc-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .dnc-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.05rem;
    margin: 0 0 14px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .dnc-container .applicant-details-box .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 600px) {
    .dnc-container .applicant-details-box .details-grid { grid-template-columns: 1fr; }
  }
  .dnc-container .detail-group { display: flex; flex-direction: column; gap: 4px; }
  .dnc-container .detail-group label { font-size: 0.88rem; font-weight: bold; color: #333; }
  .dnc-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px 10px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
  }
  .dnc-container .detail-input:focus { border-color: #aaa; }
  .dnc-container .bg-gray  { background-color: #eef2f5; }
  .dnc-container .required { color: red; margin-left: 2px; }

  /* ── Footer ── */
  .dnc-footer { text-align: center; margin-top: 36px; }
  .dnc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .dnc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .dnc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Inline message ── */
  .dnc-msg {
    margin-top: 12px;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.95rem;
    text-align: center;
  }
  .dnc-msg--error   { color: #a93226; background: #fdf2f2; border: 1px solid #f5c6c6; }
  .dnc-msg--success { color: #196f3d; background: #f2fdf5; border: 1px solid #b7e4c7; }

  /* ── Copyright ── */
  .dnc-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 28px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .dnc-container,
    .dnc-container * { visibility: visible; }
    .dnc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .dnc-footer,
    .dnc-add-row-btn,
    .dnc-rm-row-btn { display: none !important; }
    .dnc-inline-input,
    .dnc-line-input,
    .dnc-dotted-input,
    .dnc-table-input,
    .dnc-container .detail-input {
      border: none !important;
      background: transparent !important;
    }
    select { border: none !important; background: transparent !important; }
    input  {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const FORM_KEY = "different-name-certification";

const emptyRow = () => ({
  id: Date.now() + Math.random(),
  doc: "",
  name_on_doc: "",
  diff_doc: "",
  diff_name: "",
});

const INITIAL_FORM = {
  letter_no: "२०८२/८३",
  reference_no: "",
  date_bs: "२०८२-०८-०६",
  municipality: MUNICIPALITY.name,
  previous_unit_type: "",   // BUG FIX: was bound to BOTH a text input AND a select
  previous_ward: "",        // now only the select controls this field
  salutation: "श्री",
  applicant_name: "",
  rows: [emptyRow()],
  recommender_name: "",
  recommender_designation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Inline API helper with Authorization header
───────────────────────────────────────────────────────────────────────────── */
const apiPost = async (url, body) => {
  try {
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("token") ||
      "";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let errMsg = `Server error: ${res.status}`;
      try {
        const errData = await res.json();
        errMsg = errData?.message || errData?.error || errMsg;
      } catch (_) { /* response body is not JSON */ }
      return { data: null, error: errMsg };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "Network error" };
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DifferentNameCertification = () => {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]       = useState(null);

  /* ── Helpers ── */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const updateRow = (idx, key) => (e) =>
    setForm((s) => ({
      ...s,
      rows: s.rows.map((r, i) =>
        i === idx ? { ...r, [key]: e.target.value } : r
      ),
    }));

  const addRow = () =>
    setForm((s) => ({ ...s, rows: [...s.rows, emptyRow()] }));

  const removeRow = (idx) =>
    setForm((s) => ({ ...s, rows: s.rows.filter((_, i) => i !== idx) }));

  /* ── Validation ── */
  const validate = () => {
    if (!form.applicant_name.trim())      return "कृपया निवेदकको नाम (माथि) प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_name.trim())    return "सिफारिसकर्ताको नाम प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_designation)    return "सिफारिसकर्ताको पद छनौट गर्नुहोस्।";
    if (form.rows.length === 0)           return "कागजातको तालिका खाली हुन सक्दैन।";
    for (const r of form.rows) {
      if (!r.doc.trim() || !r.name_on_doc.trim() || !r.diff_doc.trim() || !r.diff_name.trim())
        return "तालिकाका सबै पंक्तिहरू पूरा गर्नुहोस्।";
    }
    if (!form.applicantName.trim())       return "निवेदकको नाम (तल) प्रविष्ट गर्नुहोस्।";
    if (!form.applicantAddress.trim())    return "निवेदकको ठेगाना प्रविष्ट गर्नुहोस्।";
    if (!form.applicantCitizenship.trim()) return "नागरिकता नं. प्रविष्ट गर्नुहोस्।";
    if (!form.applicantPhone.trim())      return "फोन नं. प्रविष्ट गर्नुहोस्।";
    return null;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const err = validate();
    if (err) { setMsg({ type: "error", text: err }); return; }

    // Build payload — strip internal `id` from table rows
    const payload = {
      letter_no:               form.letter_no,
      reference_no:            form.reference_no,
      date_bs:                 form.date_bs,
      municipality:            form.municipality,
      previous_unit_type:      form.previous_unit_type,
      previous_ward:           form.previous_ward,
      salutation:              form.salutation,
      applicant_name:          form.applicant_name,
      rows:                    form.rows.map(({ id: _id, ...rest }) => rest),
      recommender_name:        form.recommender_name,
      recommender_designation: form.recommender_designation,
      applicantName:           form.applicantName,
      applicantAddress:        form.applicantAddress,
      applicantCitizenship:    form.applicantCitizenship,
      applicantPhone:          form.applicantPhone,
    };

    setLoading(true);
    const { data, error } = await apiPost(`/api/forms/${FORM_KEY}`, payload);
    setLoading(false);

    if (error) {
      setMsg({ type: "error", text: error });
    } else {
      setMsg({ type: "success", text: `सेभ भयो (id: ${data?.id ?? "unknown"})` });
      // Wait for success message to render, then open print preview
      setTimeout(() => window.print(), 300);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form className="dnc-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top Bar ── */}
        <div className="dnc-top-bar">
          फरक फरक नाम र थर सिफारिस ।
          <span className="dnc-breadcrumb">अन्य &gt; फरक फरक नाम र थर सिफारिस</span>
        </div>

        {/* ── Meta ── */}
        <div className="dnc-meta-row">
          <div className="dnc-meta-left">
            <p>पत्र संख्या : <span className="dnc-bold">{form.letter_no}</span></p>
            <p>
              चलानी नं. :{" "}
              <input
                type="text"
                className="dnc-dotted-input dnc-w-small"
                value={form.reference_no}
                onChange={update("reference_no")}
              />
            </p>
          </div>
          <div className="dnc-meta-right">
            <p>
              मिति (BS) :{" "}
              <input
                type="text"
                className="dnc-dotted-input dnc-w-medium"
                value={form.date_bs}
                onChange={update("date_bs")}
              />
            </p>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="dnc-addressee">
          <div className="dnc-addressee-row">
            <span>श्री</span>
            <div className="dnc-req-wrap">
              <span className="dnc-req-star">*</span>
              <input
                type="text"
                className="dnc-line-input dnc-w-medium"
                value={form.recommender_name}
                onChange={update("recommender_name")}
                placeholder="सिफारिसकर्ताको नाम"
              />
            </div>
          </div>
          <div className="dnc-addressee-row">
            <input
              type="text"
              className="dnc-line-input dnc-w-long"
              value={form.recommender_designation}
              onChange={update("recommender_designation")}
              placeholder="पद / संस्था"
            />
          </div>
          <div className="dnc-addressee-row">
            <input
              type="text"
              className="dnc-line-input dnc-w-long"
              placeholder="ठेगाना"
            />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="dnc-subject">
          <p>विषय: <span className="dnc-underline">फरक फरक नाम र थर सिफारिस ।</span></p>
        </div>

        {/* ── Body ── */}
        <div className="dnc-body">
          <p>
            उपरोक्त विषयमा{" "}
            <input
              type="text"
              className="dnc-inline-input dnc-w-md-box"
              value={form.municipality}
              onChange={update("municipality")}
            />{" "}
            वडा नं. <span className="dnc-bold">१</span> (साविक{" "}
            {/*
              BUG FIX: original had BOTH a text <input> AND a <select> bound to
              previous_unit_type — they conflicted with each other.
              Removed the redundant text input; only the <select> remains.
            */}
            <select
              className="dnc-inline-select"
              value={form.previous_unit_type}
              onChange={update("previous_unit_type")}
            >
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            , वडा नं.{" "}
            <input
              type="text"
              className="dnc-inline-input dnc-w-tiny"
              value={form.previous_ward}
              onChange={update("previous_ward")}
            />{" "}
            ) निवासी{" "}
            <select
              className="dnc-inline-select"
              value={form.salutation}
              onChange={update("salutation")}
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <div className="dnc-req-wrap">
              <span className="dnc-req-star">*</span>
              <input
                type="text"
                className="dnc-inline-input dnc-w-md-box"
                value={form.applicant_name}
                onChange={update("applicant_name")}
                placeholder="निवेदकको नाम"
              />
            </div>{" "}
            को तल उल्लेखित कागजात अनुसार नाम थर फरक भएकोले सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* ── Table ── */}
        <div className="dnc-table-section">
          <h4 className="dnc-table-title dnc-underline dnc-bold dnc-center">
            फरक नाम, थर र कागजात विवरण
          </h4>
          <div className="dnc-table-responsive">
            <table className="dnc-table">
              <thead>
                <tr>
                  <th style={{ width: "23%" }}>कागजात</th>
                  <th style={{ width: "23%" }}>नाम थर</th>
                  <th style={{ width: "27%" }}>फरक भएको कागजात</th>
                  <th style={{ width: "27%" }}>फरक भएको नाम थर</th>
                </tr>
              </thead>
              <tbody>
                {form.rows.map((r, idx) => (
                  <tr key={r.id}>
                    <td>
                      <input
                        className="dnc-table-input"
                        value={r.doc}
                        onChange={updateRow(idx, "doc")}
                        placeholder="कागजात"
                      />
                    </td>
                    <td>
                      <input
                        className="dnc-table-input"
                        value={r.name_on_doc}
                        onChange={updateRow(idx, "name_on_doc")}
                        placeholder="नाम थर"
                      />
                    </td>
                    <td>
                      <input
                        className="dnc-table-input"
                        value={r.diff_doc}
                        onChange={updateRow(idx, "diff_doc")}
                        placeholder="फरक कागजात"
                      />
                    </td>
                    <td className="dnc-last-col">
                      <input
                        className="dnc-table-input"
                        value={r.diff_name}
                        onChange={updateRow(idx, "diff_name")}
                        placeholder="फरक नाम थर"
                      />
                      {idx !== 0 && (
                        <button
                          type="button"
                          className="dnc-rm-row-btn"
                          onClick={() => removeRow(idx)}
                        >
                          −
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="dnc-add-row-btn" onClick={addRow}>
              + पंक्ति थप्नुहोस्
            </button>
          </div>
        </div>

        {/* ── Signature ── */}
        <div className="dnc-signature-section">
          <div className="dnc-signature-block">
            <div className="dnc-signature-line" />
            <div className="dnc-req-wrap" style={{ display: "block", marginBottom: 6 }}>
              <span className="dnc-req-star">*</span>
              <input
                type="text"
                className="dnc-line-input dnc-full-width dnc-sig-name-input"
                value={form.recommender_name}
                onChange={update("recommender_name")}
                placeholder="सिफारिसकर्ताको नाम"
              />
            </div>
            <select
              className="dnc-designation-select"
              value={form.recommender_designation}
              onChange={update("recommender_designation")}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="dnc-footer">
          <button className="dnc-save-print-btn" type="submit" disabled={loading}>
            {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {msg && (
          <div className={`dnc-msg ${msg.type === "error" ? "dnc-msg--error" : "dnc-msg--success"}`}>
            {msg.text}
          </div>
        )}

        <div className="dnc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default DifferentNameCertification;