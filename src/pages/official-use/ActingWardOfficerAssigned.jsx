import React, { useState } from 'react';
import './ActingWardOfficerAssigned.css';

const FORM_KEY = "acting-ward-officer-assigned";
const API_URL = `/api/forms/${FORM_KEY}`;

const ActingWardOfficerAssigned = () => {

  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10),
    subject: "कार्यवाहक तोकिएको सम्बन्धमा",

    assigned_member_name: "",
    assigned_member_address: "नागार्जुन नगरपालिका",
    assigned_ward_no: "1",

    assign_from_date: "2082-08-11",
    assign_to_date: "2082-08-11",

    bodartha_text: "",

    signatory_name: "",
    signatory_position: "",
    
    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const upd = key => e =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const contentType = res.headers.get("content-type") || "";
      const body = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        throw new Error(body.message || JSON.stringify(body));
      }

      setMsg({ type: "success", text: `Saved successfully (ID: ${body.id})` });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="acting-officer-container" onSubmit={handleSubmit}>

      <div className="top-bar-title">
        कार्यवाहक तोकिएको सिफारिस ।
        <span className="top-right-bread">आर्थिक प्रबेश &gt; कार्यवाहक तोकिएको सिफारिस</span>
      </div>

      {/* Header */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p>नागार्जुन, काठमाडौँ</p>
        </div>
      </div>

      {/* Meta Data */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <input value={form.letter_no} onChange={upd("letter_no")} /></p>
          <p>चलानी नं.: <input value={form.reference_no} onChange={upd("reference_no")} /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input value={form.date} onChange={upd("date")} /></p>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>विषय: <input value={form.subject} onChange={upd("subject")} /></p>
      </div>

      {/* Addressee */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री वडा सदस्य</span>
          <input value={form.assigned_member_name} onChange={upd("assigned_member_name")} />
        </div>
        <div className="addressee-row">
          <input value={form.assigned_member_address} onChange={upd("assigned_member_address")} />
          <span>वडा नं.</span>
          <input className="tiny" value={form.assigned_ward_no} onChange={upd("assigned_ward_no")} />
        </div>
      </div>

      {/* Body */}
      <div className="form-body">
        <p>
          प्रस्तुत विषयमा कार्यालयको कामकाजको शिलशिलामा मिति  
          <input value={form.assign_from_date} onChange={upd("assign_from_date")} /> देखि 
          <input value={form.assign_to_date} onChange={upd("assign_to_date")} /> 
          गतेसम्म बाहिर जानु पर्ने भएकोले सो अवधिसम्म कार्यालयको कामकाज सम्हाल्ने गरी तपाईंलाई कार्यवाहक वडा अध्यक्षको जिम्मेवारी दिइन्छ।
        </p>
      </div>

      {/* Bodartha */}
      <div className="bodartha-section">
        <h4>बोधार्थ:</h4>
        <textarea
          className="editor-textarea"
          rows={4}
          value={form.bodartha_text}
          onChange={upd("bodartha_text")}
        />
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <input placeholder="दस्तखत" value={form.signatory_name} onChange={upd("signatory_name")} />
          <select value={form.signatory_position} onChange={upd("signatory_position")}>
            <option>पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* Applicant Footer */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>

        <label>नाम</label>
        <input value={form.applicant_name_footer} onChange={upd("applicant_name_footer")} />

        <label>ठेगाना</label>
        <input value={form.applicant_address_footer} onChange={upd("applicant_address_footer")} />

        <label>नागरिकता नं.</label>
        <input value={form.applicant_citizenship_no} onChange={upd("applicant_citizenship_no")} />

        <label>फोन</label>
        <input value={form.applicant_phone} onChange={upd("applicant_phone")} />
      </div>

      {/* Notes */}
      <textarea
        rows={3}
        placeholder="Notes"
        value={form.notes}
        onChange={upd("notes")}
      ></textarea>

      <div className="form-footer">
        <button disabled={loading}>{loading ? "Saving..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {msg && (
        <div style={{ color: msg.type === "error" ? "crimson" : "green" }}>
          {msg.text}
        </div>
      )}

    </form>
  );
};

export default ActingWardOfficerAssigned;
