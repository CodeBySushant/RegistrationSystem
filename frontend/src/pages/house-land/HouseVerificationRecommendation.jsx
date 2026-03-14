// HouseVerificationRecommendation.jsx
import React, { useState } from "react";
import "./HouseVerificationRecommendation.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  addressee_type: "भुमि सुधार कार्यालय",
  addressee_location: "",
  municipality: "नागार्जुन",
  ward_no: "1",
  applicant_fullname: "",
  previous_place_text: "",
  previous_place_type: "",
  previous_ward_no: "",
  current_place_text: "",
  current_ward_no: "",
  plot_number: "",
  area: "",
  notes: "",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: ""
};

export default function HouseVerificationRecommendation() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_fullname) return "कृपया निवेदकको नाम भर्नुहोस्।";
    if (!form.plot_number) return "कृपया कि.नं. भर्नुहोस्।";
    if (!form.area) return "कृपया क्षेत्रफल भर्नुहोस्।";
    if (!form.signer_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      const res = await fetch("/api/forms/house-verification-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${data.id})`);
      // optional reset: setForm(initialState);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="house-verification-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          घर जनाउने सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; घर जनाउने सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
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
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} type="text" className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <select name="addressee_type" className="bold-select" value={form.addressee_type} onChange={handleChange}>
              <option>भुमि सुधार कार्यालय</option>
              <option>मालपोत कार्यालय</option>
            </select>
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_location" value={form.addressee_location} onChange={handleChange} className="line-input medium-input" required />
            <span className="red">*</span>
            <span className="bold-text">, काठमाडौँ</span>
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">{form.municipality}</span> वडा नं. <span className="bold-text">{form.ward_no}</span> बस्ने{" "}
            <input name="applicant_fullname" value={form.applicant_fullname} onChange={handleChange} className="inline-box-input long-box" required /> <span className="red">*</span> ले मेरो नाउँमा मालपोत कार्यालय, <span className="bold-text">काठमाडौँ</span> मा दर्ता भएको साविक{" "}
            <input name="previous_place_text" value={form.previous_place_text} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            <select name="previous_place_type" value={form.previous_place_type} onChange={handleChange} className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            , वडा नं. <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="inline-box-input tiny-box" required /> <span className="red">*</span> हाल <input name="current_place_text" value={form.current_place_text} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> वडा नं. <input name="current_ward_no" value={form.current_ward_no} onChange={handleChange} className="inline-box-input tiny-box" required /> <span className="red">*</span> को कि.नं. <input name="plot_number" value={form.plot_number} onChange={handleChange} className="inline-box-input small-box" required /> <span className="red">*</span> क्षे.फ. <input name="area" value={form.area} onChange={handleChange} className="inline-box-input small-box" required /> <span className="red">*</span> जग्गामा मैले घर निर्माण गरी सकेको र हालसम्म ज.ध.प्र.मा घर नजनिएकोले घर जनाउनको लागि सिफारिस पाउँ भनी निवेदन पेश गरेकोले सो सम्बन्धमा सिफारिस गरिन्छ।
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
              <input name="applicant_fullname" type="text" className="detail-input bg-gray" value={form.applicant_fullname} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" value={form.applicant_address} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" value={form.applicant_phone} onChange={handleChange} />
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
