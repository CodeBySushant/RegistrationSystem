// PeskiAnurodhSifaris.jsx
import React, { useState } from "react";
import "./PeskiAnurodhSifaris.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",

  budget_year: "२०८१/८२",
  budget_head_title: "",
  budget_head_number: "",
  operation_or_program: "संचालन", // or "कार्यक्रम"
  total_amount: "",
  requested_amount: "",
  amount_in_words: "",

  signer_name: "",
  signer_designation: "",

  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  notes: ""
};

export default function PeskiAnurodhSifaris() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.budget_head_title) return "कृपया बजेट/कार्यक्रमको नाम भर्नुहोस्।";
    if (!form.budget_head_number) return "कृपया बजेट शीर्षक नम्बर भर्नुहोस्।";
    if (!form.total_amount) return "कृपया जम्मा रकम भर्नुहोस्।";
    if (!form.requested_amount) return "कृपया पेस्की रकम भर्नुहोस्।";
    if (!form.amount_in_words) return "कृपया अक्षरेरुपी रकम भर्नुहोस्।";
    if (!form.signer_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const payload = { ...form };
      const res = await fetch("/api/forms/peski-anurodh-sifaris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // Optionally reset: setForm(initialState)
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="peski-anurodh-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          पेस्की अनुरोध सिफारिस ।
          <span className="top-right-bread">आर्थिक &gt; पेस्की अनुरोध सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" className="line-input medium-input" />
            <span className="red">*</span>
            <span>ज्यू,</span>
          </div>
          <div className="addressee-row">
            <span className="bold-text">नागार्जुन नगरपालिका</span>
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">पेस्की उपलब्ध गराईदिने सम्बन्धमा।</span></p>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा यस <span className="bold-text">नागार्जुन नगरपालिका</span> चालु आ.व.
            <input name="budget_year" value={form.budget_year} onChange={handleChange} className="inline-box-input small-box" />
            को स्वीकृत बजेट तथा कार्यक्रम अन्तर्गत
            <input name="budget_head_title" value={form.budget_head_title} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span>
            को बजेट शिर्षक नम्बर
            <input name="budget_head_number" value={form.budget_head_number} onChange={handleChange} className="inline-box-input long-box" required /> <span className="red">*</span>
            मा रहेको
            <select name="operation_or_program" value={form.operation_or_program} onChange={handleChange} className="inline-select">
              <option>संचालन</option>
              <option>कार्यक्रम</option>
            </select>
            अन्तर्गत जम्मा रकम रु.
            <input name="total_amount" value={form.total_amount} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> मध्येबाट रु.
            <input name="requested_amount" value={form.requested_amount} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> ( अक्षरेरुपी
            <input name="amount_in_words" value={form.amount_in_words} onChange={handleChange} className="inline-box-input long-box" required /> <span className="red">*</span> रुपैया मात्र ) पेस्की मुक्तानी दिनु हुन अनुरोध गर्दछु।
          </p>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
              <option>पद छनौट गर्नुहोस्</option>
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
              <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={handleChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={handleChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={handleChange} className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && <div className="success-message" style={{ marginTop: 12 }}>{message}</div>}
        {error && <div className="error-message" style={{ marginTop: 12 }}>{error}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
