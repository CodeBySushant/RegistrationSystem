// DifferentNameCertification.jsx
import React, { useState } from "react";
import "./DifferentNameCertification.css";

const FORM_KEY = "different-name-certification";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const emptyRow = () => ({ id: Date.now(), doc: "", name_on_doc: "", diff_doc: "", diff_name: "" });

const DifferentNameCertification = () => {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date_bs: "२०८२-०८-०६", // keep as string (BS)
    municipality: "नागार्जुन",
    previous_unit_type: "",
    previous_ward: "",
    salutation: "श्री",
    applicant_name: "",
    reason_text: "",
    rows: [emptyRow()],
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

  const updateRow = (idx, key) => (e) =>
    setForm((s) => {
      const rows = s.rows.map((r, i) => (i === idx ? { ...r, [key]: e.target.value } : r));
      return { ...s, rows };
    });

  const addRow = () => setForm((s) => ({ ...s, rows: [...s.rows, emptyRow()] }));
  const removeRow = (idx) => setForm((s) => ({ ...s, rows: s.rows.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.applicant_name) return "कृपया निवेदकको नाम प्रविष्ट गर्नुहोस्।";
    if (form.rows.length === 0) return "कागजातको तालिका खाली हुन सक्दैन।";
    for (let r of form.rows) {
      if (!r.doc || !r.name_on_doc || !r.diff_doc || !r.diff_name) return "कृपया तालिकाका सबै पंक्तिहरू पूरा गर्नुहोस्।";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const err = validate();
    if (err) { setMsg({ type: "error", text: err }); return; }

    const payload = {
      letter_no: form.letter_no,
      reference_no: form.reference_no,
      date_bs: form.date_bs,
      municipality: form.municipality,
      previous_unit_type: form.previous_unit_type,
      previous_ward: form.previous_ward,
      salutation: form.salutation,
      applicant_name: form.applicant_name,
      reason_text: form.reason_text,
      rows: form.rows, // JSON array of rows
      recommender_name: form.recommender_name,
      recommender_designation: form.recommender_designation,
      applicant_name_footer: form.applicant_name_footer,
      applicant_address_footer: form.applicant_address_footer,
      applicant_citizenship_footer: form.applicant_citizenship_footer,
      applicant_phone_footer: form.applicant_phone_footer
    };

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
        // Optionally reset or keep data
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="different-name-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        फरक फरक नाम र थर सिफारिस ।
        <span className="top-right-bread">अन्य &gt; फरक फरक नाम र थर सिफारिस</span>
      </div>

      {/* meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
          <p>चलानी नं. : <input type="text" value={form.reference_no} onChange={update("reference_no")} className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति (BS) : <input type="text" value={form.date_bs} onChange={update("date_bs")} className="dotted-input medium-input" /></p>
        </div>
      </div>

      {/* addressee + subject / body */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" />
        </div>
        <div className="addressee-row"><input type="text" className="line-input long-input" /></div>
        <div className="addressee-row"><input type="text" className="line-input long-input" /></div>
      </div>

      <div className="subject-section">
        <p>विषय: <span className="underline-text">फरक फरक नाम र थर सिफारिस ।</span></p>
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
          <input type="text" className="inline-box-input medium-box" value={form.applicant_name} onChange={update("applicant_name")} required /> को तल उल्लेखित कागजात अनुसार नाम थर फरक भएकोले...
        </p>
      </div>

      {/* table */}
      <div className="table-section">
        <h4 className="table-title underline-text bold-text center-text">फरक नाम, थर र कागजात विवरण</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width:'25%'}}>कागजात</th>
                <th style={{width:'25%'}}>नाम थर</th>
                <th style={{width:'25%'}}>फरक भएको कागजात</th>
                <th style={{width:'25%'}}>फरक भएको नाम थर</th>
              </tr>
            </thead>
            <tbody>
              {form.rows.map((r, idx) => (
                <tr key={r.id}>
                  <td><input className="table-input" value={r.doc} onChange={updateRow(idx, "doc")} required /></td>
                  <td><input className="table-input" value={r.name_on_doc} onChange={updateRow(idx, "name_on_doc")} required /></td>
                  <td><input className="table-input" value={r.diff_doc} onChange={updateRow(idx, "diff_doc")} required /></td>
                  <td>
                    <input className="table-input" value={r.diff_name} onChange={updateRow(idx, "diff_name")} required />
                    {idx === 0 ? null : <button type="button" onClick={() => removeRow(idx)} style={{marginLeft:6}}>−</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addRow} style={{marginTop:8}}>+ पंक्ति थप्नुहोस्</button>
        </div>
      </div>

      {/* signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
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
            <label>नाम</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_name_footer} onChange={update("applicant_name_footer")} />
          </div>
          <div className="detail-group">
            <label>ठेगाना</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_address_footer} onChange={update("applicant_address_footer")} />
          </div>
          <div className="detail-group">
            <label>ना.प्र.नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_citizenship_footer} onChange={update("applicant_citizenship_footer")} />
          </div>
          <div className="detail-group">
            <label>फोन</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_phone_footer} onChange={update("applicant_phone_footer")} />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {msg && <div style={{marginTop:8, color: msg.type === "error" ? "crimson" : "green"}}>{msg.text}</div>}
    </form>
  );
};

export default DifferentNameCertification;
