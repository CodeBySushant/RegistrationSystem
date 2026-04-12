// DClassConstructionBusinessLicense.jsx
import React, { useState, useEffect } from "react";
import "./DClassConstructionBusinessLicense.css";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  license_no: "७/२०८२/८३",
  fiscal_year: "२०८२/८३",
  issue_date: new Date().toISOString().slice(0, 10),
  business_name: "",
  office_address: "",
  firm_or_company: "",
  signatory_sign: "",
  signatory_name: "",
  signatory_position: "",
  signatory_seal: "",
  signatory_date: new Date().toISOString().slice(0, 10),
  notes: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const DClassConstructionBusinessLicense = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  // For ApplicantDetailsNp compatibility
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => ({
    license_no: form.license_no,
    fiscal_year: form.fiscal_year,
    issue_date: form.issue_date,
    business_name: form.business_name,
    office_address: form.office_address,
    firm_or_company: form.firm_or_company,
    signatory_sign: form.signatory_sign,
    signatory_name: form.signatory_name,
    signatory_position: form.signatory_position,
    signatory_seal: form.signatory_seal,
    signatory_date: form.signatory_date,
    notes: form.notes,
    applicant_name: form.applicantName,
    applicant_address: form.applicantAddress,
    applicant_citizenship_no: form.applicantCitizenship,
    applicant_phone: form.applicantPhone,
  });

  const handlePrint = async () => {
    if (!form.business_name || !form.signatory_name) {
      alert("कृपया अनिवार्य फिल्डहरू भर्नुहोस्।");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/forms/d-class-construction-business-license",
        buildPayload()
      );
      if (res.status === 201) {
        alert("रेकर्ड सेभ भयो (ID: " + res.data.id + ")");
        window.onafterprint = () => {
          setForm(initialState);
          window.onafterprint = null;
        };
        window.print();
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="construction-license-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घ वर्गको निर्माण व्यवसाय इजाजत पत्र ।
        <span className="top-right-bread">
          व्यापार / व्यवसाय &gt; घ वर्गको निर्माण व्यवसाय इजाजत पत्र
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || " "} नं. वडा कार्यालय`}
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* --- Meta Data & Photo Box --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            इजाजत पत्र नं :
            <input
              type="text"
              className="line-input medium-input"
              value={form.license_no}
              onChange={update("license_no")}
            />
          </p>
          <p>
            आ.व. :
            <input
              type="text"
              className="line-input medium-input"
              value={form.fiscal_year}
              onChange={update("fiscal_year")}
            />
          </p>
          <p>
            मिति :
            <input
              type="date"
              className="line-input medium-input"
              value={form.issue_date}
              onChange={update("issue_date")}
            />
          </p>
        </div>

        <div className="meta-right">
          <div className="photo-box" aria-hidden>
            निवेदकको दुबै कान देखिने पासपोर्ट साइजको फोटो
          </div>
        </div>
      </div>

      {/* --- Certificate Title --- */}
      <div className="certificate-title-section">
        <h3 className="underline-text">'घ' वर्गको निर्माण व्यवसाय इजाजत पत्र</h3>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          ...प्रचलित कानुनको परिधिभित्र रही निर्माण व्यवसाय सञ्चालन गर्न
          <input
            type="text"
            className="line-input long-input"
            value={form.business_name}
            onChange={update("business_name")}
            placeholder="व्यवसाय/व्यवसायीको नाम"
          />
          स्थित कार्यालय
          <input
            type="text"
            className="line-input long-input"
            value={form.office_address}
            onChange={update("office_address")}
            placeholder="कार्यालय ठेगाना"
          />
          फर्म वा कम्पनीलाई
          <input
            type="text"
            className="line-input medium-input"
            value={form.firm_or_company}
            onChange={update("firm_or_company")}
            placeholder="फर्म वा कम्पनी"
          />
          "घ" वर्गको इजाजतपत्र प्रदान गरिएको छ।
        </p>
      </div>

      {/* --- Bottom (Signature) --- */}
      <div className="bottom-section">
        <div className="big-letter-box"><span>घ</span></div>

        <div className="signature-details">
          <p className="bold-text">इजाजतपत्र दिनेको :</p>

          <div className="sig-row">
            <label>दस्तखत :</label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.signatory_sign}
              onChange={update("signatory_sign")}
            />
          </div>

          <div className="sig-row">
            <label>नाम : <span className="red">*</span></label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.signatory_name}
              onChange={update("signatory_name")}
            />
          </div>

          <div className="sig-row">
            <label>पद : <span className="red">*</span></label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.signatory_position}
              onChange={update("signatory_position")}
            />
          </div>

          <div className="sig-row">
            <label>छाप :</label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.signatory_seal}
              onChange={update("signatory_seal")}
            />
          </div>

          <div className="sig-row">
            <label>मिति :</label>
            <input
              type="date"
              className="line-input medium-input"
              value={form.signatory_date}
              onChange={update("signatory_date")}
            />
          </div>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default DClassConstructionBusinessLicense;