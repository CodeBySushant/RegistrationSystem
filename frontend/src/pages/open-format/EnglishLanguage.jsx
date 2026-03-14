// src/components/EnglishLanguage.jsx
import React, { useState } from 'react';
import './EnglishLanguage.css';

const FORM_KEY = "open-format-nepali";
const API_URL = `/api/forms/${FORM_KEY}`;

const EnglishLanguage = () => {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10),
    subject: "",
    addressee_name: "",
    addressee_line2: "",
    body_text: "",
    archive: false,
    bodartha: "",
    signatory_name: "",
    signatory_position: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const upd = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(s => ({ ...s, [k]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // minimal validation
    if (!form.subject || !form.addressee_name || !form.signatory_name) {
      setMessage({ type: 'error', text: 'सबै आवश्यक फिल्ड (subject, addressee, signatory) भर्नुहोस्।' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const body = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: body.message || JSON.stringify(body) });
      } else {
        setMessage({ type: 'success', text: `रेकर्ड सफल—ID: ${body.id || 'unknown'}` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="open-format-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        नेपाली भाषामा ।
        <span className="top-right-bread">खुला ढाँचा &gt; नेपाली प्रपत्र</span>
      </div>

      <div className="meta-data-row">
        <div className="meta-left">
          <label>पत्र संख्या :</label>
          <input type="text" value={form.letter_no} onChange={upd('letter_no')} />
        </div>
        <div className="meta-left">
          <label>चलानी नं. :</label>
          <input type="text" value={form.reference_no} onChange={upd('reference_no')} />
        </div>
        <div className="meta-right">
          <label>मिति :</label>
          <input type="date" value={form.date} onChange={upd('date')} />
        </div>
      </div>

      <div className="addressee-subject-section">
        <div className="subject-block">
          <label>विषय:</label>
          <input type="text" value={form.subject} onChange={upd('subject')} className="line-input large-input" required />
        </div>

        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" value={form.addressee_name} onChange={upd('addressee_name')} className="line-input long-input" required />
        </div>
        <div className="addressee-row">
          <input type="text" value={form.addressee_line2} onChange={upd('addressee_line2')} className="line-input long-input" />
        </div>
      </div>

      <div className="editor-area">
        <textarea className="editor-textarea" rows="10" placeholder="लेख यहाँ..." value={form.body_text} onChange={upd('body_text')} />
        <div className="word-count"> { (form.body_text || '').split(/\s+/).filter(Boolean).length } words</div>
      </div>

      <div className="footer-options">
        <label><input type="checkbox" checked={!!form.archive} onChange={upd('archive')} /> अभिलेख गर्नुहोस्</label>
      </div>

      <div className="footer-options">
        <label>बोधार्थ:</label>
        <input type="text" value={form.bodartha} onChange={upd('bodartha')} className="line-input long-input" />
      </div>

      <div className="signature-section">
        <input type="text" value={form.signatory_name} onChange={upd('signatory_name')} placeholder="दस्तखत/नाम" required />
        <select value={form.signatory_position} onChange={upd('signatory_position')}>
          <option value="">पद छनौट गर्नुहोस्</option>
          <option>वडा अध्यक्ष</option>
          <option>वडा सचिव</option>
        </select>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <input type="text" placeholder="नाम" value={form.applicant_name} onChange={upd('applicant_name')} />
          <input type="text" placeholder="ठेगाना" value={form.applicant_address} onChange={upd('applicant_address')} />
          <input type="text" placeholder="नागरिकता नं." value={form.applicant_citizenship_no} onChange={upd('applicant_citizenship_no')} />
          <input type="text" placeholder="फोन" value={form.applicant_phone} onChange={upd('applicant_phone')} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Notes</label>
        <textarea rows={2} value={form.notes} onChange={upd('notes')} />
      </div>

      <div className="form-footer" style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>{loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {message && (
        <div style={{ marginTop: 8, color: message.type === 'error' ? 'crimson' : 'green' }}>
          {message.text}
        </div>
      )}
    </form>
  );
};

export default EnglishLanguage;
