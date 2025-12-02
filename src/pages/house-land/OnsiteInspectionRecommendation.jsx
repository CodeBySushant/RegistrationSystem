// OnsiteInspectionRecommendation.jsx
import React, { useState } from "react";
import "./OnsiteInspectionRecommendation.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  addressee_name: "",
  addressee_line2: "",
  previous_municipality: "",
  previous_type: "न.पा.",
  previous_ward_no: "",
  applicant_name: "",
  applicant_current_municipality: "नागार्जुन",
  applicant_current_ward_no: "1",
  plot_details: "",       // free text or serialized list
  plot_prev_municipality: "",
  plot_prev_ward_no: "",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function OnsiteInspectionRecommendation() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.addressee_name) return "कृपया addressee भर्नुहोस्।";
    if (!form.previous_municipality) return "कृपया साविक जिल्ला/नगर/गा.वि.स. भर्नुहोस्।";
    if (!form.previous_ward_no) return "कृपया साविक वडा नं. भर्नुहोस्।";
    if (!form.applicant_name) return "कृपया निवेदकको नाम भर्नुहोस्।";
    if (!form.plot_details) return "कृपया कित्ता/जग्गा विवरण भर्नुहोस्।";
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
      // send plot_details as plain text (or JSON string if you prefer)
      const payload = { ...form };

      const res = await fetch("/api/forms/onsite-inspection-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optional reset:
      // setForm(initialState);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onsite-inspection-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          स्थलगत निरीक्षण
          <span className="top-right-bread">घर / जग्गा जमिन &gt; स्थलगत निरीक्षण</span>
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

        <div className="subject-section">
          <p>विषय: <span className="underline-text">स्थलगत निरीक्षण सम्बन्धमा।</span></p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" value={form.addressee_name} onChange={handleChange} className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_line2" value={form.addressee_line2} onChange={handleChange} className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा <input name="previous_municipality" value={form.previous_municipality} onChange={handleChange} className="inline-box-input medium-box" required /> {" "}
            <select name="previous_type" value={form.previous_type} onChange={handleChange} className="inline-select">
              <option>न.पा.</option>
              <option>गा.पा.</option>
            </select>{" "}
            वडा नं. <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="inline-box-input tiny-box" required /> {" "} बस्ने श्री/सुश्री/श्रीमती {" "}
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="inline-box-input medium-box" required /> {" "} को नाममा दर्ता भएको साविक <input name="plot_prev_municipality" value={form.plot_prev_municipality} onChange={handleChange} className="inline-box-input medium-box" required /> वडा नं. <input name="plot_prev_ward_no" value={form.plot_prev_ward_no} onChange={handleChange} className="inline-box-input tiny-box" required /> हो। हाल {form.applicant_current_municipality} वडा नं <input name="applicant_current_ward_no" value={form.applicant_current_ward_no} onChange={handleChange} className="inline-box-input tiny-box" /> मा पर्ने तपसिल बमोजिम कित्ता भएको जग्गा: <input name="plot_details" value={form.plot_details} onChange={handleChange} className="inline-box-input medium-box" required /> ।
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

        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className="success-message" style={{ marginTop: 12 }}>{message}</div>}
        {error && <div className="error-message" style={{ marginTop: 12 }}>{error}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
