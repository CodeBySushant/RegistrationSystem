// PropertyOwnerCertificateHouseMaintainRecommendation.jsx
import React, { useState } from "react";
import "./PropertyOwnerCertificateHouseMaintainRecommendation.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",

  applicant_type: "मेरो", // "मेरो" | "हाम्रो"
  previous_place_text: "",
  previous_place_type: "",
  previous_ward_no: "",
  plot_number: "",
  area: "",

  // signer / official
  signer_name: "",
  signer_designation: "",

  // applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  notes: ""
};

export default function PropertyOwnerCertificateHouseMaintainRecommendation() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError(null);
    setMessage(null);
  }

  function validate() {
    if (!form.previous_place_text) return "कृपया साविक ठेगाना भर्नुहोस्।";
    if (!form.previous_ward_no) return "कृपया साविक वडा नं. भर्नुहोस्।";
    if (!form.plot_number) return "कृपया कि.नं. भर्नुहोस्।";
    if (!form.area) return "कृपया क्षेत्रफल भर्नुहोस्।";
    if (!form.signer_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    return null;
  }

  async function handleSubmit(e) {
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
      const payload = {
        letter_no: form.letter_no,
        chalani_no: form.chalani_no,
        date_nep: form.date_nep,

        applicant_type: form.applicant_type,
        previous_place_text: form.previous_place_text,
        previous_place_type: form.previous_place_type,
        previous_ward_no: form.previous_ward_no,
        plot_number: form.plot_number,
        area: form.area,

        signer_name: form.signer_name,
        signer_designation: form.signer_designation,

        applicant_name: form.applicant_name,
        applicant_address: form.applicant_address,
        applicant_citizenship_no: form.applicant_citizenship_no,
        applicant_phone: form.applicant_phone,

        notes: form.notes
      };

      const res = await fetch("/api/forms/property-owner-certificate-house-maintain-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optionally keep or reset:
      // setForm(initialState);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="certificate-house-maintain-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार্জुन, काठमाडौँ</p>
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
            <select name="addressee_office" onChange={(e)=>{}} className="bold-select" disabled>
              <option>जिल्ला प्रशासन कार्यालय</option>
              <option>मालपोत कार्यालय</option>
              <option>नापी कार्यालय</option>
            </select>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" className="line-input medium-input" placeholder="ठेगाना (उदा. काठमाडौँ)" />
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा
            <select name="applicant_type" value={form.applicant_type} onChange={handleChange} className="inline-select">
              <option>मेरो</option>
              <option>हाम्रो</option>
            </select>
            नाममा एकलौटी दर्ता श्रेस्ता भएको <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bg-gray-text">१</span> (साविकको ठेगाना
            <input name="previous_place_text" value={form.previous_place_text} onChange={handleChange} className="inline-box-input medium-box" />
            <select name="previous_place_type" value={form.previous_place_type} onChange={handleChange} className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="inline-box-input tiny-box" required />
            ) कि.नं.
            <input name="plot_number" value={form.plot_number} onChange={handleChange} className="inline-box-input small-box" required />
            को क्षे.फ.
            <input name="area" value={form.area} onChange={handleChange} className="inline-box-input small-box" required />
            जग्गाको जग्गाधनी श्रेस्ता पुर्जामा घर कायम गरी पाउन भनी निवेदन दिइएको हुँदा सो सम्बन्धमा यहाँको नियमानुसार घर कायम गराई दिनुहुन सिफारिस गरिन्छ।
          </p>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
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
