import React, { useState } from "react";
import "./GovernmentalLandUtilizationRecommendation.css";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  addressee_type: "जिल्ला प्रशासन कार्यालय",
  addressee_line1: "",
  addressee_line2: "",
  municipality: "नागार्जुन",
  ward_no: "1",
  applicant_name: "",
  applicant_prefix: "श्री",
  applicant_name_secondary: "",
  child_prefix: "श्री",
  child_name: "",
  old_place_text: "",
  old_place_type: "",
  old_ward_no: "",
  plot_number: "",
  area: "",
  current_municipality: "नागार्जुन",
  current_ward_no: "1",
  boundary_east: "",
  boundary_west: "",
  boundary_north: "",
  boundary_south: "",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function GovernmentalLandUtilizationRecommendation() {
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
    if (!form.area) return "कृपया क्षेत्रफल भर्नुहोस्।";
    if (!form.boundary_east || !form.boundary_west || !form.boundary_north || !form.boundary_south)
      return "कृपया चारै चौहद्दी (पूर्व, पश्चिम, उत्तर, दक्षिण) भर्नुहोस्।";
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
      const res = await fetch("/api/forms/governmental-land-utilization-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${data.id})`);
      // optional: reset or keep values
      // setForm(initialState);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="land-utilization-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          जोत भोग चलनको सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; जोत भोग चलनको सिफारिस</span>
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

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <select name="addressee_type" className="bold-select" value={form.addressee_type} onChange={handleChange}>
              <option>जिल्ला प्रशासन कार्यालय</option>
              <option>मालपोत कार्यालय</option>
              <option>नापी कार्यालय</option>
            </select>
          </div>
          <div className="addressee-row">
            <input name="addressee_line1" value={form.addressee_line1} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
            <span>,</span>
            <input name="addressee_line2" value={form.addressee_line2} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा यस जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">{form.municipality}</span> वडा नं <input name="ward_no" value={form.ward_no} onChange={handleChange} className="inline-box-input tiny-box" /> बस्ने{" "}
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति{" "}
            <select name="applicant_prefix" className="inline-select" value={form.applicant_prefix} onChange={handleChange}>
              <option>श्री</option>
              <option>सुश्री</option>
            </select>{" "}
            <input name="applicant_name_secondary" value={form.applicant_name_secondary} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा{" "}
            <select name="child_prefix" className="inline-select" value={form.child_prefix} onChange={handleChange}>
              <option>श्री</option>
              <option>सुश्री</option>
            </select>{" "}
            <input name="child_name" value={form.child_name} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस कार्यालयमा दिनु भएको निवेदन अनुसार मैले जिल्ला <span className="bold-text">काठमाडौँ</span> (साविक{" "}
            <input name="old_place_text" value={form.old_place_text} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            <select name="old_place_type" className="inline-select" value={form.old_place_type} onChange={handleChange}>
              <option value="">-- छान्नुहोस् --</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            ,वडा नं. <input name="old_ward_no" value={form.old_ward_no} onChange={handleChange} className="inline-box-input tiny-box" required /> <span className="red">*</span> ), कि.नं. <input name="plot_number" value={form.plot_number} onChange={handleChange} className="inline-box-input small-box" required /> <span className="red">*</span> हाल <span className="bg-gray-text">{form.current_municipality}</span> वडा नं {form.current_ward_no} मा पर्ने तपशिल बमोजिमको चार किल्ला भित्रको भोग अनुसारको क्षेत्रफल <input name="area" value={form.area} onChange={handleChange} className="inline-box-input small-box" required /> <span className="red">*</span> भएको ऐलानी (दर्ता छुट) जग्गा... <input name="old_place_text_2" value={form.old_place_text_2 || ""} onChange={handleChange} className="inline-box-input medium-box" />
            {/* truncated sentence kept concise to match original flow */}
          </p>
        </div>

        {/* Tapashil Boundaries */}
        <div className="tapashil-section">
          <h4 className="bold-text center-text">तपशिल चौहद्दी:</h4>
          <div className="boundary-list">
            <div className="boundary-item">
              <label>पूर्व :-</label><span className="red">*</span>
              <input name="boundary_east" value={form.boundary_east} onChange={handleChange} type="text" className="line-input long-input" />
            </div>
            <div className="boundary-item">
              <label>पश्चिम :-</label><span className="red">*</span>
              <input name="boundary_west" value={form.boundary_west} onChange={handleChange} type="text" className="line-input long-input" />
            </div>
            <div className="boundary-item">
              <label>उत्तर :-</label><span className="red">*</span>
              <input name="boundary_north" value={form.boundary_north} onChange={handleChange} type="text" className="line-input long-input" />
            </div>
            <div className="boundary-item">
              <label>दक्षिण :-</label><span className="red">*</span>
              <input name="boundary_south" value={form.boundary_south} onChange={handleChange} type="text" className="line-input long-input" />
            </div>
          </div>
          <p className="center-text" style={{ marginTop: 10 }}>(यति चार किल्ला भित्रको उल्लेखित जमिन)</p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" className="designation-select" value={form.signer_designation} onChange={handleChange}>
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
