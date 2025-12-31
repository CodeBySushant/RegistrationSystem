// BulkLoanRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BulkLoanRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  patraSankhya: "",
  chalanNo: "",
  toName: "",
  toSecondLine: "",
  wardNo: MUNICIPALITY.wardNumber,
  prevLocationType: "",
  prevLocationWardNo: "",
  cooperativeName: "",
  cooperativePurpose: "",
  governmentAgency: "",
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function BulkLoanRecommendation() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!f.signerName?.trim()) return "साइनेरको नाम आवश्यक छ";
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
      // normalize empty strings -> null
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/bulk-loan-recommendation";
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
    <div className="blr-page">
      <header className="blr-topbar">
        <div className="blr-top-left">थोक कर्जा सिफारिस</div>
        <div className="blr-top-right">अवलोकन पृष्ठ / थोक कर्जा सिफारिस</div>
      </header>

      <div className="blr-paper">
        <div className="blr-letterhead">
          <div className="blr-logo">
            <img
              src="/nepallogo.svg"
              alt="Nepal Emblem"
            />
          </div>

          <div className="blr-head-text">
            <div className="blr-head-main">{MUNICIPALITY.name}</div>
            <div className="blr-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="blr-head-sub">
              {MUNICIPALITY.officeLine} <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>

          <div className="blr-head-meta">
            <div className="blr-meta-line">
              मिति :{" "}
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="blr-small-input"
              />
            </div>
            <div className="blr-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="blr-ref-row">
            <div className="blr-ref-block">
              <label>पत्र संख्या :</label>
              <input
                type="text"
                name="patraSankhya"
                value={form.patraSankhya}
                onChange={handleChange}
              />
            </div>
            <div className="blr-ref-block">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="chalanNo"
                value={form.chalanNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="blr-to-block">
            <span>श्री</span>
            <input
              type="text"
              name="toName"
              className="blr-long-input"
              value={form.toName}
              onChange={handleChange}
            />
            <span>ज्यु,</span>
            <br />
            <input
              type="text"
              name="toSecondLine"
              className="blr-long-input blr-to-second"
              value={form.toSecondLine}
              onChange={handleChange}
            />
          </div>

          <div className="blr-subject-row">
            <span className="blr-sub-label">विषयः</span>
            <span className="blr-subject-text">
              सिफारिस गरी पठाइदिने बारे ।
            </span>
          </div>

          <p className="blr-body">
            प्रस्तुत विषयमा{" "}
            <span className="blr-bold">{MUNICIPALITY.name}</span> वडा नं.{" "}
            <input
              type="text"
              name="wardNo"
              className="blr-tiny-input"
              value={form.wardNo}
              onChange={handleChange}
            />{" "}
            (साबिक{" "}
            <input
              type="text"
              name="prevLocationType"
              className="blr-small-inline"
              value={form.prevLocationType}
              onChange={handleChange}
            />{" "}
            वडा नं.{" "}
            <input
              type="text"
              name="prevLocationWardNo"
              className="blr-tiny-input"
              value={form.prevLocationWardNo}
              onChange={handleChange}
            />
            ) मा कार्यलय स्थापना गरी आफ्नो क्षेत्रवासीहरुले सहकारी मार्फत ऋण
            प्रवाह गर्न कार्यलय स्थापना गर्न इच्छुक{" "}
            <input
              type="text"
              name="cooperativeName"
              className="blr-medium-input"
              value={form.cooperativeName}
              onChange={handleChange}
            />{" "}
            सहकारी संस्थाले यस वडा कार्यालयमा निवेदन पेश गरेको हुँदा यस
            कार्यालयमा दर्ता भई आवश्यक कागजातका आधारमा कार्यलय स्थापना गरी थोक
            कर्जा प्रवाह गर्न नेपाल सरकार{" "}
            <input
              type="text"
              name="governmentAgency"
              className="blr-medium-input"
              value={form.governmentAgency}
              onChange={handleChange}
            />{" "}
            बाट थोक कर्जा प्राप्त गर्नसकिने व्यवस्था मिलाइदिनुहुन सिफारिससाथ
            अनुरोध गरिएको छ ।
          </p>

          <div className="blr-blank-area" />

          <div className="blr-sign-top">
            <input
              type="text"
              className="blr-sign-name"
              name="signerName"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              className="blr-post-select"
              name="signerDesignation"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="blr-section-title">निवेदकको विवरण</h3>
          <div className="blr-applicant-box">
            <div className="blr-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="blr-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="blr-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="blr-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="blr-submit-row">
            <button
              className="blr-submit-btn"
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

      <footer className="blr-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}
