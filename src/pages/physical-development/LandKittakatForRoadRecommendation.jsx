// src/components/LandKittakatForRoadRecommendation.jsx
import React, { useState } from "react";
import "./LandKittakatForRoadRecommendation.css";

const FORM_KEY = "land-kittakat-for-road"; // must match forms.json key and route POST /api/forms/:formKey
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const emptyState = {
  chalan_no: "",
  date_nepali: "",
  subject_number: "",
  subject_text: "फिट बाटो कायम सिफारिस।",
  addressee: "श्री मालपोत कार्यालय",
  addressee_place: "काठमाडौँ",
  district: "काठमाडौँ",
  municipality_name: "नागार्जुन नगरपालिका",
  ward_no: "1",
  previous_address_type: "",
  previous_ward_no: "",
  owner_name: "",
  owner_relation: "",
  owner_relation_name: "",
  parcel_kitta_no: "",
  area: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  designation: "",
  recommendation_text: ""
};

const LandKittakatForRoadRecommendation = () => {
  const [form, setForm] = useState(emptyState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // basic validation (example): required fields
    if (!form.applicant_name || !form.applicant_address) {
      setError("कृपया निवेदकको नाम र ठेगाना भर्नुहोस्।");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.message || data.error || "Server error");
      }
      setResult(data);
      // optional: you could trigger print here if required:
      // window.print();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="land-kittakat-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          सडक सिफारिसको लागि भूमि कित्ताकाट ।
          <span className="top-right-bread">
            भौतिक निर्माण &gt; सडक सिफारिसको लागि भूमि कित्ताकाट ।
          </span>
        </div>

        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        <div className="meta-data-row">
          <div className="meta-left">
            <label>पत्र संख्या :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange}
                className="dotted-input small-input" placeholder="२०८२/८३ ..." />
            </label>
          </div>
          <div className="meta-right">
            <label>मिति :
              <input name="date_nepali" value={form.date_nepali} onChange={onChange}
                className="dotted-input small-input" placeholder="२०८२-०८-०६" />
            </label>
          </div>
        </div>

        <div className="subject-section">
          <p>
            विषय:
            <input name="subject_number" value={form.subject_number} onChange={onChange}
              className="dotted-input small-input center-text bold-text" />
            <span className="underline-text bold-text">{form.subject_text}</span>
          </p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>{form.addressee}</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange}
              className="line-input medium-input" required />
            <span className="red">*</span>
            <span>, {form.addressee_place}</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला
            <input name="district" value={form.district} onChange={onChange}
              className="inline-box-input medium-box" />
            <input name="municipality_name" value={form.municipality_name} onChange={onChange}
              className="inline-box-input medium-box" />
            वडा नं.
            <input name="ward_no" value={form.ward_no} onChange={onChange}
              className="inline-box-input tiny-box" />
            (साविक ठेगाना
            <select name="previous_address_type" value={form.previous_address_type} onChange={onChange}
              className="inline-select">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            , वडा नं.
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={onChange}
              className="inline-box-input tiny-box" />) कि.नं.
            <input name="parcel_kitta_no" value={form.parcel_kitta_no} onChange={onChange}
              className="inline-box-input small-box" />
            क्षेत्रफल
            <input name="area" value={form.area} onChange={onChange}
              className="inline-box-input small-box" /> जग्गालाई २० फिट बाटो कायम गरी सार्वजनिक गरि दिनु भनि यस कार्यालयमा जग्गा धनी
            <input name="owner_name" value={form.owner_name} onChange={onChange}
              className="inline-box-input medium-box" /> ले दिनु भएको निवेदन अनुसार तहाँ कार्यालयबाट नेपाल सरकारको नियमानुसार सो २० फिट बाटो कायमका लागि सिफारिस साथ अनुरोध गरिन्छ।
          </p>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input name="designation" value={form.designation} onChange={onChange}
              className="line-input full-width-input" placeholder="पद" />
            <select name="designation" value={form.designation} onChange={onChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" value={form.applicant_name} onChange={onChange}
                type="text" className="detail-input bg-gray" required />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={onChange}
                type="text" className="detail-input bg-gray" required />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={onChange}
                type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={onChange}
                type="text" className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {error && <div className="error-message" style={{ color: "red" }}>{error}</div>}
        {result && <div className="success-message" style={{ color: "green" }}>Saved, id: {result.id}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
};

export default LandKittakatForRoadRecommendation;
