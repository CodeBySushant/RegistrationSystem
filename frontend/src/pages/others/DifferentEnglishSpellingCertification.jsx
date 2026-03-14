// DifferentEnglishSpellingCertification.jsx
import React, { useState } from "react";
import "./DifferentEnglishSpellingCertification.css";

const FORM_KEY = "different-english-spelling-certification";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DifferentEnglishSpellingCertification = () => {
  const [form, setForm] = useState({
    municipality: "नागार्जुन",
    previous_unit_type: "",
    previous_ward: "",
    salutation: "श्री",
    applicant_name: "",
    english_spelling_basis: "", // basis text input visible in form
    reason_text: "",
    // docs: array of { id, doc_name, diff_name }
    docs: [{ id: 1, doc_name: "", diff_name: "" }],
    recommender_name: "",
    recommender_designation: "",
    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_footer: "",
    applicant_phone_footer: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const updateDoc = (idx, key) => (e) => {
    setForm((s) => {
      const docs = s.docs.map((d, i) =>
        i === idx ? { ...d, [key]: e.target.value } : d
      );
      return { ...s, docs };
    });
  };

  const addDocRow = () =>
    setForm((s) => ({
      ...s,
      docs: [...s.docs, { id: Date.now(), doc_name: "", diff_name: "" }]
    }));

  const removeDocRow = (idx) =>
    setForm((s) => ({ ...s, docs: s.docs.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.applicant_name) return "कृपया निवेदकको नाम प्रविष्ट गर्नुहोस्।";
    if (form.docs.some((d) => !d.doc_name || !d.diff_name)) return "कागजातहरू पूरा गर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }

    const payload = { ...form }; // backend should accept docs as JSON array

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setMsg({ type: "error", text: (body && body.message) || `Save failed (${res.status})` });
      } else {
        setMsg({ type: "success", text: `Saved (id: ${body && body.id ? body.id : "unknown"})` });
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="english-spelling-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        फरक फरक अंग्रेजी हिज्जे प्रमाणित ।
        <span className="top-right-bread">अन्य &gt; फरक फरक अंग्रेजी हिज्जे प्रमाणित</span>
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

      {/* addressee/body */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">फरक फरक अंग्रेजी हिज्जे प्रमाणित ।</span></p>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा <span className="bold-text">{form.municipality}</span>
          <input type="text" className="inline-box-input medium-box" value={form.municipality} onChange={update("municipality")} />
          वडा नं. <span className="bold-text">१</span> (साविक
          <input type="text" className="inline-box-input medium-box" value={form.previous_unit_type} onChange={update("previous_unit_type")} />
          <select className="inline-select" value={form.previous_unit_type} onChange={update("previous_unit_type")}>
            <option value="">--</option>
            <option>गा.वि.स.</option>
            <option>न.पा.</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" value={form.previous_ward} onChange={update("previous_ward")} /> ) निवासी
          <select className="inline-select" value={form.salutation} onChange={update("salutation")}>
            <option>श्री</option><option>सुश्री</option><option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" value={form.applicant_name} onChange={update("applicant_name")} required /> को नाम थर मा अंग्रेजी हिज्जे
          <input type="text" className="inline-box-input medium-box" value={form.english_spelling_basis} onChange={update("english_spelling_basis")} /> को आधारमा...
        </p>
      </div>

      {/* dynamic table */}
      <div className="table-section">
        <h4 className="table-title underline-text bold-text center-text">फरक अंग्रेजी हिज्जे र कागजात विवरण</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '50%'}}>फरक भएको कागजात</th>
                <th style={{width: '45%'}}>फरक भएको नाम थर</th>
                <th style={{width: '5%'}}>हटाउनु</th>
              </tr>
            </thead>
            <tbody>
              {form.docs.map((d, idx) => (
                <tr key={d.id}>
                  <td><input className="table-input" value={d.doc_name} onChange={updateDoc(idx, "doc_name")} required /></td>
                  <td><input className="table-input" value={d.diff_name} onChange={updateDoc(idx, "diff_name")} required /></td>
                  <td>{idx === 0 ? null : <button type="button" onClick={() => removeDocRow(idx)}>−</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addDocRow} style={{marginTop:8}}>+ Add row</button>
        </div>
      </div>

      {/* signature */}
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

      {/* applicant footer */}
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
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && <div style={{color: msg.type === "error" ? "crimson" : "green", marginTop:8}}>{msg.text}</div>}
      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default DifferentEnglishSpellingCertification;
