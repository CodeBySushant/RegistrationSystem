// BulkLoanRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BulkLoanRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

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
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePrint = async () => {
    const success = await handleSubmit({ preventDefault: () => {} });
    if (success !== false) {
      window.print();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const validate = (f) => {
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!f.signerName?.trim()) return "साइनेरको नाम आवश्यक छ";
    return null;
  };

  const submitForm = async () => {
    if (submitting) return false;

    const err = validate(formData);
    if (err) {
      alert(err);
      return false;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "http://localhost:5000/api/forms/bulk-loan-recommendation",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "त्रुटि");
      return false;
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
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
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
                value={formData.date}
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
                value={formData.patraSankhya}
                onChange={handleChange}
              />
            </div>
            <div className="blr-ref-block">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="chalanNo"
                value={formData.chalanNo}
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
              value={formData.toName}
              onChange={handleChange}
            />
            <span>ज्यु,</span>
            <br />
            <input
              type="text"
              name="toSecondLine"
              className="blr-long-input blr-to-second"
              value={formData.toSecondLine}
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
              value={formData.wardNo}
              onChange={handleChange}
            />{" "}
            (साबिक{" "}
            <input
              type="text"
              name="prevLocationType"
              className="blr-small-inline"
              value={formData.prevLocationType}
              onChange={handleChange}
            />{" "}
            वडा नं.{" "}
            <input
              type="text"
              name="prevLocationWardNo"
              className="blr-tiny-input"
              value={formData.prevLocationWardNo}
              onChange={handleChange}
            />
            ) मा कार्यलय स्थापना गरी आफ्नो क्षेत्रवासीहरुले सहकारी मार्फत ऋण
            प्रवाह गर्न कार्यलय स्थापना गर्न इच्छुक{" "}
            <input
              type="text"
              name="cooperativeName"
              className="blr-medium-input"
              value={formData.cooperativeName}
              onChange={handleChange}
            />{" "}
            सहकारी संस्थाले यस वडा कार्यालयमा निवेदन पेश गरेको हुँदा यस
            कार्यालयमा दर्ता भई आवश्यक कागजातका आधारमा कार्यलय स्थापना गरी थोक
            कर्जा प्रवाह गर्न नेपाल सरकार{" "}
            <input
              type="text"
              name="governmentAgency"
              className="blr-medium-input"
              value={formData.governmentAgency}
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
              value={formData.signerName}
              onChange={handleChange}
            />
            <select
              className="blr-post-select"
              name="signerDesignation"
              value={formData.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          <div className="blr-submit-row">
            <button
              className="blr-submit-btn"
              type="button"
              onClick={handlePrint}
              disabled={submitting}
            >
              {submitting
                ? "पठाइँ हुँदैछ..."
                : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>

      <footer className="blr-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </footer>
    </div>
  );
}
