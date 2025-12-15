// NewOrganizationRegistration.jsx
import React, { useState } from "react";
import axios from "axios";
import "./NewOrganizationRegistration.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
  patraSankhya: "",
  chalanNo: "",
  toName: "",
  toPlace: MUNICIPALITY.officeLine, // e.g. "नगर कार्यपालिकाको कार्यालय, काठमाडौं"
  district: MUNICIPALITY.englishDistrict, // change to a Nepali district field in config if you prefer Nepali text
  municipalityWardNo: MUNICIPALITY.wardNumber,
  prevWardNo: MUNICIPALITY.wardNumber, // optional default; editable by user
  organizationName: "",
  organizationLocation: "",
  organizationType: "",
  suggestedBy: "",
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function NewOrganizationRegistration() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.organizationName?.trim()) return "संस्थाको नाम आवश्यक छ";
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
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

      const url = "/api/forms/new-organization-registration";
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
    <div className="nor-page">
      <header className="nor-topbar">
        <div className="nor-top-left">संस्था दर्ता</div>
        <div className="nor-top-right">अवलोकन पृष्ठ / संस्था दर्ता</div>
      </header>

      <div className="nor-paper">
        <div className="nor-letterhead">
          <div className="nor-logo">
            <img
              src="/nepallogo.svg"
              alt="Nepal Emblem"
            />
          </div>

          <div className="nor-head-text">
            <div className="nor-head-main">{MUNICIPALITY.name}</div>
            <div className="nor-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="nor-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>

          <div className="nor-head-meta">
            <div className="nor-meta-line">
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="nor-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="nor-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="nor-ref-row">
            <div className="nor-ref-block">
              <label>पत्र संख्या :</label>
              <input
                type="text"
                name="patraSankhya"
                value={form.patraSankhya}
                onChange={handleChange}
              />
            </div>
            <div className="nor-ref-block">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="chalanNo"
                value={form.chalanNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="nor-to-block">
            <span>श्री</span>
            <input
              type="text"
              name="toName"
              className="nor-long-input"
              value={form.toName}
              onChange={handleChange}
            />
            <span>ज्यु</span>
          </div>

          <div className="nor-subject-row">
            <span className="nor-sub-label">विषयः</span>
            <span className="nor-subject-text">सिफारिस सम्बन्धमा ।</span>
          </div>

          <p className="nor-body">
            प्रस्तुत विषयमा{" "}
            <span className="nor-bold">यस {MUNICIPALITY.name}</span> वडा नं.{" "}
            <input
              type="text"
              name="municipalityWardNo"
              className="nor-tiny-input"
              value={form.municipalityWardNo}
              onChange={handleChange}
            />{" "}
            (साबिक{" "}
            <input
              type="text"
              name="prevWardNo"
              className="nor-small-inline"
              value={form.prevWardNo}
              onChange={handleChange}
            />{" "}
            ) , जिल्ला{" "}
            <input
              type="text"
              name="district"
              className="nor-small-inline"
              value={form.district}
              onChange={handleChange}
            />{" "}
            स्थित रहेको{" "}
            <input
              type="text"
              name="organizationName"
              className="nor-medium-input"
              placeholder="संस्थाको नाम"
              value={form.organizationName}
              onChange={handleChange}
            />{" "}
            नामक संस्था दर्ता गर्नुपर्ने भएकोले सो को लागि “सिफारिस गरी पाउँ”
            भनी यस कार्यालयमा दर्ता निवेदन बमोजिम दर्ता सिफारिस गरिएको छ ।
          </p>

          <div className="nor-blank-area" />

          <div className="nor-sign-top">
            <input
              type="text"
              name="signerName"
              className="nor-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              name="signerDesignation"
              className="nor-post-select"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="nor-section-title">निवेदकको विवरण</h3>
          <div className="nor-applicant-box">
            <div className="nor-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="nor-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="nor-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="nor-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="nor-submit-row">
            <button
              className="nor-submit-btn"
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

      <footer className="nor-footer">
        <footer className="nor-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}
