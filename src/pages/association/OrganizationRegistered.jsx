// OrganizationRegistered.jsx
import React, { useState } from "react";
import axios from "axios";
import "./OrganizationRegistered.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  localityType: "गाउँपालिका",
  wardNo: MUNICIPALITY.wardNumber,
  district: MUNICIPALITY.englishDistrict, // or add/use a Nepali district field in config if you prefer Nepali
  toOffice: MUNICIPALITY.officeLine,
  organizationName: "",
  registrationDate: "",
  extraInfo: "",
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  date: new Date().toISOString().slice(0, 10),
};

export default function OrganizationRegistered() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.organizationName?.trim()) return "कृपया संस्था नाम भर्नुहोस्";
    if (!f.applicantName?.trim()) return "कृपया निवेदकको नाम भर्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate(form);
    if (err) {
      alert(err);
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });
      // POST to backend
      const url = "/api/forms/organization-registered";
      const res = await axios.post(url, payload);
      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="orgreg-page">
      <header className="orgreg-topbar">
        <div className="orgreg-top-left">संस्था दर्ता गरिएको ।</div>
        <div className="orgreg-top-right">
          अवलोकन पृष्ठ / संस्था दर्ता गरिएको
        </div>
      </header>

      <div className="orgreg-paper">
        <div className="orgreg-letterhead">
          <div className="orgreg-logo">
            <img
              src="/nepallogo.svg"
              alt="Nepal Emblem"
            />
          </div>
          <div className="orgreg-head-text">
            <div className="orgreg-head-main">{MUNICIPALITY.name}</div>
            <div className="orgreg-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="orgreg-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="orgreg-head-meta">
            <div className="orgreg-meta-line">
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="orgreg-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="orgreg-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="orgreg-ref-row">
            <div className="orgreg-ref-block">
              <label>पत्र संख्या :</label>
              <input
                type="text"
                name="extraInfo"
                value={form.extraInfo}
                onChange={handleChange}
              />
            </div>
            <div className="orgreg-ref-block">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="regNo"
                value={form.regNo || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="orgreg-to-block">
            <span>श्री अध्यक्ष ज्यु,</span>
            <br />
            <input
              type="text"
              name="toOffice"
              className="orgreg-long-input orgreg-to-second"
              value={form.toOffice || ""}
              onChange={handleChange}
            />
          </div>

          <div className="orgreg-subject-row">
            <span className="orgreg-sub-label">विषयः</span>
            <span className="orgreg-subject-text">
              संस्था दर्ता गरिएको बारे ।
            </span>
          </div>

          <p className="orgreg-body">
            प्रस्तुत विषयमा{" "}
            <select
              name="localityType"
              className="orgreg-select"
              value={form.localityType}
              onChange={handleChange}
            >
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
            </select>{" "}
            वडा नं.{" "}
            <input
              type="text"
              name="wardNo"
              className="orgreg-tiny-input"
              value={form.wardNo}
              onChange={handleChange}
            />{" "}
            जिल्ला{" "}
            <input
              type="text"
              name="district"
              className="orgreg-small-inline"
              value={form.district}
              onChange={handleChange}
            />{" "}
            मा रहेको{" "}
            <input
              type="text"
              name="organizationName"
              className="orgreg-medium-input"
              value={form.organizationName}
              onChange={handleChange}
            />{" "}
            नामक संस्था दर्ता सम्बन्धि मिति{" "}
            <input
              type="text"
              name="registrationDate"
              className="orgreg-small-inline"
              value={form.registrationDate}
              onChange={handleChange}
            />{" "}
            मा प्राप्त निवेदन तथा आवश्यक कागजातका आधारमा{" "}
            <input
              type="text"
              name="certNo"
              className="orgreg-medium-input"
              value={form.certNo || ""}
              onChange={handleChange}
            />{" "}
            नामक संस्था दर्ता गरी प्रमाण पत्र जारी गरिएको व्यहोरा जानकारी
            गराइएको छ ।
          </p>

          <div className="orgreg-blank-area" />

          <div className="orgreg-sign-top">
            <input
              type="text"
              name="signerName"
              className="orgreg-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              name="signerDesignation"
              className="orgreg-post-select"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="orgreg-section-title">निवेदकको विवरण</h3>
          <div className="orgreg-applicant-box">
            <div className="orgreg-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="orgreg-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="orgreg-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="orgreg-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="orgreg-submit-row">
            <button
              className="orgreg-submit-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "पठाइँ हुँदैछ..."
                : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>

      <footer className="orgreg-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}
