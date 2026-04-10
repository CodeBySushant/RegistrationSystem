import React, { useState } from 'react';
import './EnglishLanguage.css';
import ApplicantDetailsEn from "../../components/ApplicantDetailsEn.jsx";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const FORM_KEY = "open-format-english";
const API_URL = `/api/forms/${FORM_KEY}`;

const EnglishLanguage = () => {
  const [form, setForm] = useState({
    letter_no: "2082/83",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10),
    subject: "",
    addressee_name: "",
    addressee_line2: "",
    body_text: "",
    signatory_name: "",
    signatory_position: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
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
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Submission failed");
      setMessage({ type: 'success', text: `Saved successfully! ID: ${body.id}` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="open-format-container">
      <form onSubmit={handleSubmit}>
        {/* Header Section from Image */}
        <header className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">Nagarjun Municipality</h1>
            <h2 className="ward-title">{MUNICIPALITY.ward} No. Ward Office</h2>
            <p className="address-text">Kathmandu, Kathmandu</p>
            <p className="province-text">Bagmati Province, Nepal</p>
          </div>
        </header>

        {/* Meta Data Row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>Letter No. : <input type="text" className="dotted-input" value={form.letter_no} onChange={upd('letter_no')} /></p>
            <p>Ref No. : <input type="text" className="dotted-input" value={form.reference_no} onChange={upd('reference_no')} /></p>
          </div>
          <div className="meta-right">
            <p>Date : <input type="date" className="dotted-input" value={form.date} onChange={upd('date')} /></p>
          </div>
        </div>

        {/* Subject and Addressee */}
        <div className="addressee-subject-section">
          <div className="subject-block">
            <label>Subject:</label>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" value={form.subject} onChange={upd('subject')} className="dotted-input large-input" required />
            </div>
          </div>

          <div className="addressee-row">
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" value={form.addressee_name} onChange={upd('addressee_name')} className="dotted-input long-input" required />
            </div>
          </div>
        </div>

        {/* Editor Area Mockup */}
        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <span>Write Here: </span>
              <span className="upgrade-btn">⚡ Upgrade</span>
            </div>
            <textarea 
               className="editor-textarea" 
               value={form.body_text} 
               onChange={upd('body_text')} 
               placeholder="Write your letter content here..."
            />
            <div className="word-count"> { (form.body_text || '').split(/\s+/).filter(Boolean).length } words </div>
          </div>
        </div>

        {/* Signature Block */}
        <div className="signature-wrapper">
          <div className="signature-block">
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" value={form.signatory_name} onChange={upd('signatory_name')} className="dotted-input" placeholder="Signatory Name" required />
            </div>
            <select className="designation-select" value={form.signatory_position} onChange={upd('signatory_position')}>
              <option value="">Select Designation</option>
              <option value="Ward Chairman">Ward Chairman</option>
              <option value="Ward Secretary">Ward Secretary</option>
            </select>
          </div>
        </div>

        {/* Applicant Details Component */}
        <ApplicantDetailsEn formData={form} handleChange={upd} />

        {/* Footer Actions */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "Saving..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div className={`status-message ${message.type}`}>
            {message.text}
          </div>
        )}
      </form>
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default EnglishLanguage;