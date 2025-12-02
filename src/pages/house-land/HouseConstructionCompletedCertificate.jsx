// HouseConstructionCompletedCertificate.jsx
import React, { useState } from "react";
import "./HouseConstructionCompletedCertificate.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  municipality: "नागार्जुन",
  ward_no: "1",
  applicant_name: "",
  previous_district: "",
  previous_type: "", // ga.vis / municipality
  previous_ward_no: "",
  plot_number: "",
  plot_area: "",
  house_type: "",       // e.g., 'ढलान', 'ढलान+छत' etc.
  house_storeys: "",    // number of rooms/storeys
  map_approval_date: "२०८२-०८-०६",
  map_approval_type: "", // text field corresponding to map/naksha info
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function HouseConstructionCompletedCertificate() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name) return "कृपया निवेदकको नाम भर्नुहोस्।";
    if (!form.plot_number) return "कृपया कि.नं. भर्नुहोस्।";
    if (!form.plot_area) return "कृपया क्षेत्रफल भर्नुहोस्।";
    if (!form.house_type || !form.house_storeys) return "कृपया घरको प्रकार/कोठा संख्या भर्नुहोस्।";
    if (!form.signer_name) return "कृपया हस्ताक्षर गर्नेको नाम भर्नुहोस्।";
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
      const res = await fetch("/api/forms/house-construction-completed-certificate", {
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
    <div className="construction-completed-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          भूकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; भूकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
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

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा <span className="bg-gray-text">{form.municipality}</span> वडा नं{" "}
            <input name="ward_no" value={form.ward_no} onChange={handleChange} className="inline-box-input tiny-box" />{" "}
            निवासी <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="inline-box-input long-box" required />{" "}
            ले यस कार्यालयमा दिनुभएको निवेदन अनुसार निजको नाममा रहेको साविक{" "}
            <input name="previous_district" value={form.previous_district} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            <select name="previous_type" value={form.previous_type} onChange={handleChange} className="inline-select">
              <option value="">-- छान्नुहोस् --</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>{" "}
            वडा नं <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="inline-box-input tiny-box" /> {' '}
            कि.नं. <input name="plot_number" value={form.plot_number} onChange={handleChange} className="inline-box-input small-box" required />{' '}
            क्षे.फ. <input name="plot_area" value={form.plot_area} onChange={handleChange} className="inline-box-input small-box" required /> {' '}
            जग्गामा भूकम्प प्रतिरोधि <input name="house_type" value={form.house_type} onChange={handleChange} className="inline-box-input tiny-box" required /> {' '}
            <input name="house_storeys" value={form.house_storeys} onChange={handleChange} className="inline-box-input tiny-box" required /> कोठे घर निर्माणका लागि यस वडा कार्यालयबाट {form.map_approval_date} मा नक्शा स्वीकृत लिइएको र हाल उक्त घर निर्माण कार्य सम्पन्न भएकोले घर निर्माण सम्पन्न प्रमाणपत्र उपलब्ध गराईदिन सिफारिस गरिन्छ ।
          </p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" value={form.applicant_name} onChange={handleChange} />
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

        {/* Footer */}
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
