// DifferentDOBCertification.jsx
import React, { useState } from "react";
import "./DifferentDOBCertification.css";

const FORM_KEY = "different-dob-certification";
const API_BASE = process.env.REACT_APP_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DifferentDOBCertification = () => {
  const [form, setForm] = useState({
    municipality: "नागार्जुन",
    previous_unit_type: "",
    previous_ward: "",
    salutation: "श्री",
    applicant_name: "",
    applicant_address: "",
    reason_text: "",
    // table rows (allow multiple rows)
    docs: [
      { id: 1, document: "", dob_original: "", doc_diff: "", dob_diff: "" }
    ],
    recommender_name: "",
    recommender_designation: "",
    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_footer: "",
    applicant_phone_footer: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const updateDoc = (idx, key) => (e) => {
    setForm((s) => {
      const docs = s.docs.map((d, i) => (i === idx ? { ...d, [key]: e.target.value } : d));
      return { ...s, docs };
    });
  };

  const addDocRow = () => {
    setForm((s) => ({ ...s, docs: [...s.docs, { id: Date.now(), document: "", dob_original: "", doc_diff: "", dob_diff: "" }] }));
  };

  const removeDocRow = (idx) => {
    setForm((s) => ({ ...s, docs: s.docs.filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    if (!form.applicant_name) return "Provide applicant name.";
    // recommender_date etc can be validated if present
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const err = validate();
    if (err) { setMsg({ type: "error", text: err }); return; }

    // Prepare payload: flatten docs to JSON string or send as array depends on backend.
    const payload = { ...form };

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (!res.ok) setMsg({ type: "error", text: body.message || JSON.stringify(body) });
      else setMsg({ type: "success", text: `Saved (id: ${body.id || "unknown"})` });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="different-dob-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        फरक फरक जन्म मिति सिफारिस ।
        <span className="top-right-bread">अन्य &gt; फरक फरक जन्म मिति सिफारिस</span>
      </div>

      {/* meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
          <p>चलानी नं. : <input type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* addressee / subject / body */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" onChange={update("recommender_name")} value={form.recommender_name} />
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input long-input" onChange={update("recommender_designation")} value={form.recommender_designation} />
        </div>
      </div>

      <div className="subject-section">
        <p>विषय: <span className="underline-text">फरक फरक जन्म मिति सिफारिस ।</span></p>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा <span className="bold-text">{form.municipality}</span>
          <input type="text" className="inline-box-input medium-box" value={form.municipality} onChange={update("municipality")} />
          वडा नं. <span className="bold-text">१</span> (साविक 
          <input type="text" className="inline-box-input medium-box" value={form.previous_unit_type} onChange={update("previous_unit_type")} />
          <select className="inline-select" value={form.previous_unit_type}>
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" value={form.previous_ward} onChange={update("previous_ward")} /> ) निवासी
          <select className="inline-select" value={form.salutation} onChange={update("salutation")}>
            <option>श्री</option><option>सुश्री</option><option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" value={form.applicant_name} onChange={update("applicant_name")} /> को तल उल्लेखित कागजात अनुसार...
        </p>
      </div>

      {/* dynamic docs table */}
      <div className="table-section">
        <h4 className="table-title underline-text bold-text center-text">फरक जन्म मिति र कागजात विवरण</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '25%'}}>कागजात</th>
                <th style={{width: '25%'}}>जन्म मिति</th>
                <th style={{width: '25%'}}>फरक भएको कागजात</th>
                <th style={{width: '25%'}}>फरक भएको जन्म मिति</th>
                <th>हटाउनु</th>
              </tr>
            </thead>
            <tbody>
              {form.docs.map((d, idx) => (
                <tr key={d.id}>
                  <td><input value={d.document} onChange={updateDoc(idx, "document")} className="table-input" /></td>
                  <td><input value={d.dob_original} onChange={updateDoc(idx, "dob_original")} className="table-input" /></td>
                  <td><input value={d.doc_diff} onChange={updateDoc(idx, "doc_diff")} className="table-input" /></td>
                  <td><input value={d.dob_diff} onChange={updateDoc(idx, "dob_diff")} className="table-input" /></td>
                  <td>{idx === 0 ? null : <button type="button" onClick={() => removeDocRow(idx)}>−</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addDocRow} style={{marginTop:8}}>+ Add row</button>
        </div>
      </div>

      {/* signature & footer */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input type="text" className="line-input full-width-input" value={form.recommender_name} onChange={update("recommender_name")} required />
          <select className="designation-select" value={form.recommender_designation} onChange={update("recommender_designation")}>
             <option value="">पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_name_footer} onChange={update("applicant_name_footer")} />
          </div>
          <div className="detail-group">
            <label>ठेगाना</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_address_footer} onChange={update("applicant_address_footer")} />
          </div>
          <div className="detail-group">
            <label>नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_citizenship_footer} onChange={update("applicant_citizenship_footer")} />
          </div>
          <div className="detail-group">
            <label>फोन नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_phone_footer} onChange={update("applicant_phone_footer")} />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {msg && <div style={{color: msg.type === "error" ? "crimson" : "green", marginTop:8}}>{msg.text}</div>}
      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default DifferentDOBCertification;
