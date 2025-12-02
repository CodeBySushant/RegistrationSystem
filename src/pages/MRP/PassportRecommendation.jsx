// src/components/PassportRecommendation.jsx
import React, { useState } from "react";
import "./PassportRecommendation.css";

const FORM_KEY = "passport-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

const PassportRecommendation = () => {
  const [formData, setFormData] = useState({
    letterNo: "२०८२/८३",
    refNo: "",
    dateOfLetter: "",          // use YYYY-MM-DD ideally
    dayText: "",
    headerTo: "श्री ईलाका प्रशासन कार्यालय,",
    headerDistrict: "काठमाडौँ",
    mainDistrict: "काठमाडौँ",
    prevLocationType: "साबिक",
    prevWardNo: "",
    currentMunicipality: "नागार्जुन नगरपालिका",
    currentWardNo: "1",
    residentAddressType: "स्थायी",
    residentDistrict: "",
    citizenIssueDate: "",      // YYYY-MM-DD
    citizenNo: "",
    applicantName: "",
    designation: "पद छनोट गर्नुहोस्",
    detailApplicantName: "",
    detailApplicantAddress: "",
    detailApplicantCitizenship: "",
    detailApplicantPhone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // {type: 'success'|'error', text: ''}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.headerDistrict.trim()) return "Header district is required.";
    if (!formData.mainDistrict.trim()) return "District is required.";
    if (!formData.currentMunicipality.trim()) return "Municipality is required.";
    if (!formData.currentWardNo.toString().trim()) return "Current ward no is required.";
    if (!formData.citizenIssueDate.trim()) return "Citizen issue date is required.";
    if (!formData.citizenNo.trim()) return "Citizen number is required.";
    if (!formData.applicantName.trim()) return "Applicant name is required.";
    if (!formData.detailApplicantName.trim()) return "Applicant full name required.";
    if (!formData.detailApplicantAddress.trim()) return "Applicant address required.";
    if (!formData.detailApplicantCitizenship.trim()) return "Applicant citizenship no required.";
    if (!formData.detailApplicantPhone.trim()) return "Applicant phone required.";
    if (formData.designation === "पद छनोट गर्नुहोस्") return "Please select a designation.";
    return null;
  };

  const toPayload = (data) => {
    // map React keys (camelCase) -> DB columns (snake_case in forms.json)
    return {
      letter_no: data.letterNo || null,
      ref_no: data.refNo || null,
      date_of_letter: data.dateOfLetter || null,
      day_text: data.dayText || null,
      header_to: data.headerTo || null,
      header_district: data.headerDistrict || null,
      main_district: data.mainDistrict || null,
      prev_location_type: data.prevLocationType || null,
      prev_ward_no: data.prevWardNo || null,
      current_municipality: data.currentMunicipality || null,
      current_ward_no: data.currentWardNo || null,
      resident_address_type: data.residentAddressType || null,
      resident_district: data.residentDistrict || null,
      citizen_issue_date: data.citizenIssueDate || null,
      citizen_no: data.citizenNo || null,
      applicant_name: data.applicantName || null,
      designation: data.designation || null,
      detail_applicant_name: data.detailApplicantName || null,
      detail_applicant_address: data.detailApplicantAddress || null,
      detail_applicant_citizenship: data.detailApplicantCitizenship || null,
      detail_applicant_phone: data.detailApplicantPhone || null,
      notes: data.notes || null
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const payload = toPayload(formData);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // try to parse response
      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `Saved successfully (id: ${body.id || "unknown"})` });
      // optionally reset or keep values
      // setFormData({ ... }); // reset if desired
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save" });
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passport-rec-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1>नागार्जुन नगरपालिका</h1>
          <h2>१ नं. वडा कार्यालय</h2>
          <h3>नागार्जुन, काठमाडौँ</h3>
          <h4>बाग्मती प्रदेश, नेपाल</h4>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>पत्र संख्या :</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>चलानी नं. :</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>मिति :</label>
            <input type="date" name="dateOfLetter" value={formData.dateOfLetter} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>नेपाली दिन/बिवरण:</label>
            <input type="text" name="dayText" value={formData.dayText} onChange={handleChange} />
          </div>
        </div>

        <div className="header-to-group">
          <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
          <input type="text" name="headerDistrict" value={formData.headerDistrict} onChange={handleChange} required />
        </div>

        <p className="certificate-body">
          जिल्ला <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} required />
          (<input type="text" name="prevLocationType" value={formData.prevLocationType} onChange={handleChange} />)
          <input type="text" name="prevWardNo" placeholder="साविक वडा" value={formData.prevWardNo} onChange={handleChange} />
          हाल वडा नं. <input type="text" name="currentWardNo" value={formData.currentWardNo} onChange={handleChange} required className="short-input" />
          हाल <input type="text" name="currentMunicipality" value={formData.currentMunicipality} onChange={handleChange} required />
          स्थायी/अस्थायी: <input type="text" name="residentAddressType" value={formData.residentAddressType} onChange={handleChange} />
          जिल्ला <input type="text" name="residentDistrict" value={formData.residentDistrict} onChange={handleChange} required />
          नागरिकता जारी मिति: <input type="date" name="citizenIssueDate" value={formData.citizenIssueDate} onChange={handleChange} />
          नागरिकता नं.: <input type="text" name="citizenNo" value={formData.citizenNo} onChange={handleChange} />
          निवेदक: <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
        </p>

        <div className="designation-section">
          <input type="text" placeholder="हस्ताक्षर" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option>पद छनोट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
          </select>
        </div>

        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div className="form-group-column">
            <label>निवेदकको नाम *</label>
            <input type="text" name="detailApplicantName" value={formData.detailApplicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" name="detailApplicantAddress" value={formData.detailApplicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" name="detailApplicantCitizenship" value={formData.detailApplicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" name="detailApplicantPhone" value={formData.detailApplicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div style={{ marginTop: 12, color: message.type === "error" ? "crimson" : "green" }}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default PassportRecommendation;
