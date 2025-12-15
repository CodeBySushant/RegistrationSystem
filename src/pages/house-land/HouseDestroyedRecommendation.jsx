// HouseDestroyedRecommendation.jsx
import React, { useState } from "react";
import "./HouseDestroyedRecommendation.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  addressee_name: "",
  addressee_line2: "",
  municipality: "नागार्जुन",
  ward_no: "1",
  owner_prefix: "श्री",
  owner_name: "",
  plot_number: "",
  plot_area: "",
  notes: "",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: ""
};

export default function HouseDestroyedRecommendation() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.owner_name) return "कृपया घरधनीको नाम भर्नुहोस्।";
    if (!form.plot_number) return "कृपया कि.नं. भर्नुहोस्।";
    if (!form.plot_area) return "कृपया क्षेत्रफल भर्नुहोस्।";
    if (!form.signer_name) return "कृपया हस्ताक्षर गर्नेको नाम भर्नुहोस्।";
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
      const res = await fetch("/api/forms/house-destroyed-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optional: reset form
      // setForm(initialState);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="house-destroyed-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          घर पाताल भएको सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; घर पाताल भएको सिफारिस</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* Meta */}
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

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" value={form.addressee_name} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_line2" value={form.addressee_line2} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <span className="bold-text">काठमाडौँ</span>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा</span></p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा <span className="bold-text bg-gray-text">{form.municipality}</span> वडा नं. <span className="bold-text bg-gray-text">{form.ward_no}</span> स्थित {" "}
            <select name="owner_prefix" value={form.owner_prefix} onChange={handleChange} className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>{" "}
            <input name="owner_name" value={form.owner_name} onChange={handleChange} type="text" className="inline-box-input long-box" required /> <span className="red">*</span> को नाममा रहेको कि.नं.{" "}
            <input name="plot_number" value={form.plot_number} onChange={handleChange} type="text" className="inline-box-input small-box" required /> <span className="red">*</span> क्षे.फ.{" "}
            <input name="plot_area" value={form.plot_area} onChange={handleChange} type="text" className="inline-box-input small-box" required /> <span className="red">*</span> मा बनेको घर भत्किई पाताल भएकोले सोही अनुसारको सिफारिस गरी पाउन भनी यस वडा कार्यालयमा पर्न आएको निवेदन सम्बन्धमा उल्लेखित कि.नं. मा बनेको घर पाताल भएको व्यहोरा प्रमाणित सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} type="text" className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="owner_name" type="text" className="detail-input bg-gray" value={form.owner_name} onChange={handleChange} />
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

        {/* Footer Action */}
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
