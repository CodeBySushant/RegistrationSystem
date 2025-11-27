// DomesticAnimalMaternityNutritionAllowance.jsx
import React, { useState } from "react";
import axios from "axios";
import "./DomesticAnimalMaternityNutritionAllowance.css";

const initialState = {
  chalan_no: "",
  subject: "गाई / भैंसी सुत्केरी पोषण भत्ता उपलब्ध गरिदिने बारे ।",
  issue_date: "",

  addressee_line1: "पशु सेवा शाखा",
  addressee_line2: "नागार्जुन नगरपालिका",

  district: "काठमाडौँ",
  municipality_name: "नागार्जुन",
  ward_no: "1",

  resident_name: "",
  duration_value: "",
  duration_unit: "महिना", // महिना or वर्ष
  calving_date: "", // YYYY-MM-DD
  animal_count: 1,

  signer_name: "",
  signer_designation: "",

  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: ""
};

const DomesticAnimalMaternityNutritionAllowance = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // keep numbers as numbers for animal_count
    setForm((prev) => ({ ...prev, [name]: name === "animal_count" ? (value === "" ? "" : Number(value)) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = "http://localhost:5000/api/forms/animal-maternity-allowance";
      const payload = { ...form };

      // optional: convert empty strings -> undefined so model factory treats them as null
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(url, payload);
      setLoading(false);

      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  return (
    <form className="animal-allowance-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        गाई / भैंसी सुत्केरी पोषण भत्ता ।
        <span className="top-right-bread">पशुपालन &gt; गाई / भैंसी सुत्केरी पोषण भत्ता</span>
      </div>

      {/* --- Header Section --- */}
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

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
          <p>
            चलानी नं. :
            <input
              name="chalan_no"
              type="text"
              className="dotted-input small-input"
              value={form.chalan_no || ""}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति :
            <input
              name="issue_date"
              type="date"
              className="dotted-input small-input"
              value={form.issue_date || ""}
              onChange={handleChange}
            />
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">{form.subject}</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_line1"
            type="text"
            className="line-input medium-input"
            value={form.addressee_line1}
            onChange={handleChange}
          />
          <span>,</span>
        </div>
        <div className="addressee-row">
          <input
            name="addressee_line2"
            type="text"
            className="line-input medium-input"
            value={form.addressee_line2}
            onChange={handleChange}
          />
          <span>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस नगर कार्यपालिकाबाट पारित "गाई/भैंसी सुत्केरी पोषण भत्ता, ब्याडको बोका व्यवस्थापन र भ्याक्सिनेसन कार्यक्रम कार्यान्वयन विधि, २०७४" अनुसार जिल्ला
          <input
            name="district"
            type="text"
            className="inline-box-input medium-box"
            value={form.district}
            onChange={handleChange}
          />
          <input
            name="municipality_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.municipality_name}
            onChange={handleChange}
          />
          वडा नं.
          <input
            name="ward_no"
            type="text"
            className="inline-box-input small-input"
            value={form.ward_no}
            onChange={handleChange}
          />
          बस्ने
          <input
            name="resident_name"
            type="text"
            className="inline-box-input long-box"
            required
            value={form.resident_name}
            onChange={handleChange}
          />
          को निजकै घरमा विगत
          <input
            name="duration_value"
            type="text"
            className="inline-box-input tiny-box"
            required
            value={form.duration_value}
            onChange={handleChange}
          />
          <select
            name="duration_unit"
            className="inline-select"
            value={form.duration_unit}
            onChange={handleChange}
          >
            <option value="महिना">महिना</option>
            <option value="वर्ष">वर्ष</option>
          </select>
          देखि पालन पोषण हुँदै आएको गाई / भैंसी मिति
          <input
            name="calving_date"
            type="date"
            className="inline-box-input medium-box"
            value={form.calving_date || ""}
            onChange={handleChange}
          />
          मा सुत्केरी भएकोले कार्यविधि अनुसार निजले पाउने सुत्केरी पोषण भत्ता उपलब्ध गरि दिनु हुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input
            name="signer_name"
            type="text"
            className="line-input full-width-input"
            required
            value={form.signer_name}
            onChange={handleChange}
          />
          <select
            name="signer_designation"
            className="designation-select"
            value={form.signer_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input
              name="applicant_name"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_name}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input
              name="applicant_address"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_address}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input
              name="applicant_citizenship_no"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_citizenship_no}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input
              name="applicant_phone"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default DomesticAnimalMaternityNutritionAllowance;
