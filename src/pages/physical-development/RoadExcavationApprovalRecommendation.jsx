// src/components/RoadExcavationApprovalRecommendation.jsx
import React, { useState } from "react";
import "./RoadExcavationApprovalRecommendation.css";

const FORM_KEY = "road-excavation-approval";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite-safe env
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const initial = {
  chalan_no: "२०८२/८३",
  date_nepali: "२०८२-०८-०६",
  addressee_prefix: "श्री",
  addressee_name: "",
  addressee_place: "",
  subject_text: "सडक खन्ने स्वीकृति ।",
  place_for_excavation: "",
  completion_days: "",
  approved_road: "",
  approved_unit: "",
  approved_unit_value: "",
  deposit_amount: "",
  applicant_previous_address: "",
  applicant_name: "",
  applicant_designation: "",
  recommendation_notes: ""
};

export default function RoadExcavationApprovalRecommendation() {
  const [form, setForm] = useState(initial);
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

    // basic validation
    if (!form.addressee_name || !form.place_for_excavation || !form.applicant_name) {
      setError("कृपया आवस्यक फिल्डहरू भर्नुहोस् (नाम, स्थान, निवेदक)।");
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
      if (!resp.ok) throw new Error(data.message || data.error || "Server error");
      setResult(data);
      // Optional: window.print();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="road-excavation-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          सडक खन्ने स्वीकृतिको सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; सडक खन्ने स्वीकृतिको सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo">
            <img src="/logo.png" alt="Nepal Emblem" />
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
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" />
            </label>
            <label>चलानी नं. :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" />
            </label>
          </div>
          <div className="meta-right">
            <label>मिति :
              <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="dotted-input small-input" />
            </label>
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">{form.subject_text}</span></p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>{form.addressee_prefix}</span>
            <input name="addressee_name" value={form.addressee_name} onChange={onChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange} type="text" className="line-input medium-input" />
            <span className="bold-text" style={{ marginLeft: "20px" }}>वडा नं. १</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            तपाईंले यस वडा कार्यालयमा मिति {form.date_nepali} मा दिनु भएको निवेदन अनुसार निम्न बमोजिम स्थानको
            <input name="place_for_excavation" value={form.place_for_excavation} onChange={onChange} className="inline-box-input medium-box" required /> सडक
            खन्ने अनुमति दिईएको छ | लेखिए बमोजिमको शर्तहरु पालना गरी यो पत्र प्राप्त भएको मितिले
            <input name="completion_days" value={form.completion_days} onChange={onChange} className="inline-box-input small-box" required /> दिन भित्र कार्य सम्पन्न गर्नुहोला |
          </p>

          <div className="specific-details-grid">
            <div className="form-group-row">
              <label className="bold-text">खन्न स्वीकृति प्रदान गरेको सडक</label>
              <input name="approved_road" value={form.approved_road} onChange={onChange} className="dotted-input full-width" />
            </div>

            <div className="form-group-row">
              <label className="bold-text">सडक खन्न स्वीकृति इकाइ (बर्ग मिटर)</label>
              <input name="approved_unit" value={form.approved_unit} onChange={onChange} className="dotted-input medium-input" />
              <span>बर्ग मिटर</span>
              <input name="approved_unit_value" value={form.approved_unit_value} onChange={onChange} className="dotted-input small-input" placeholder="value" />
            </div>

            <div className="form-group-row">
              <label className="bold-text">धरौटी रकम (रु.)</label>
              <input name="deposit_amount" value={form.deposit_amount} onChange={onChange} className="dotted-input full-width" />
            </div>
          </div>
        </div>

        <div className="conditions-section">
          <h4 className="bold-text">शर्तहरु :</h4>
          <ol className="conditions-list">
            <li>... (retain your existing conditions text) ...</li>
          </ol>
        </div>

        <div className="former-address-section">
          <label className="bold-text">निवेदकको साविकको ठेगाना</label>
          <div className="address-input-wrapper">
            <input name="applicant_previous_address" value={form.applicant_previous_address} onChange={onChange} className="dotted-input full-width" />
          </div>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input name="applicant_name" value={form.applicant_name} onChange={onChange} className="line-input full-width-input" required />
            <select name="applicant_designation" value={form.applicant_designation} onChange={onChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <div className="bodartha-section">
          <h4 className="bold-text">बोधार्थ</h4>
          <div className="bodartha-item"><p className="bold-text">१. श्री प्राबिधिक शाखा :</p><p>माथि उल्लेखित शर्तहरु पालना भए नभएको अनुगमन गरी प्रतिवेदन पेश गर्नु हुन |</p></div>
          <div className="bodartha-item"><p className="bold-text">२. श्री ट्राफिक प्रहरी कार्यालय :</p><p>सवारी साधनको सहजताको लागि अनुरोध छ |</p></div>
        </div>

        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {result && <div style={{ color: "green", marginTop: 8 }}>Saved successfully. id: {result.id}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
