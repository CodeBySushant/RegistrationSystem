// ClubRegistration.jsx
import React, { useState } from "react";
import axios from "axios";
import "./ClubRegistration.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
  patraSankhya: "",
  chalanNo: "",
  toName: "",
  toSecondLine: MUNICIPALITY.officeLine, // e.g. "नगर कार्यपालिकाको कार्यालय, काठमाडौं"
  district: MUNICIPALITY.englishDistrict, // or use a Nepali district field if you add one to config
  municipality: MUNICIPALITY.name,
  wardNo: MUNICIPALITY.wardNumber,
  residentName: "",
  clubName: "",
  clubAddress: "",
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function ClubRegistration() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!f.clubName?.trim()) return "क्लबको नाम आवश्यक छ";
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
      const payload = { ...form };
      // convert empty strings to null for backend consistency
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/club-registration";
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
    <div className="crp-page">
      <header className="crp-topbar">
        <div className="crp-top-left">क्लब दर्ता सिफारिस ।</div>
        <div className="crp-top-right">अवलोकन पृष्ठ / क्लब दर्ता सिफारिस</div>
      </header>

      <div className="crp-paper">
        <div className="crp-letterhead">
          <div className="crp-logo">
            <img
              src="/nepallogo.svg"
              alt="Emblem"
            />
          </div>

          <div className="crp-head-text">
            <div className="crp-head-main">{MUNICIPALITY.name}</div>
            <div className="crp-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="crp-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>

          <div className="crp-head-meta">
            <div className="crp-meta-line">
              मिति :{" "}
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="crp-small-input"
              />
            </div>
            <div className="crp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="crp-ref-row">
            <div className="crp-ref-block">
              <label>पत्र संख्या :</label>
              <input
                type="text"
                name="patraSankhya"
                value={form.patraSankhya}
                onChange={handleChange}
              />
            </div>
            <div className="crp-ref-block">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="chalanNo"
                value={form.chalanNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="crp-to-block">
            <span>श्री</span>
            <input
              type="text"
              name="toName"
              className="crp-long-input"
              value={form.toName}
              onChange={handleChange}
            />
            <span>ज्यु,</span>
            <br />
            <input
              type="text"
              name="toSecondLine"
              className="crp-long-input crp-to-second"
              value={form.toSecondLine}
              onChange={handleChange}
            />
          </div>

          <div className="crp-subject-row">
            <span className="crp-sub-label">विषयः</span>
            <span className="crp-subject-text">सिफारिस गरिएको बारे ।</span>
          </div>

          <p className="crp-body">
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <input
              type="text"
              name="district"
              className="crp-small-inline"
              value={form.district}
              onChange={handleChange}
            />{" "}
            - <span className="crp-bold">{MUNICIPALITY.name}</span> वडा नं.{" "}
            <input
              type="text"
              name="wardNo"
              className="crp-tiny-input"
              value={form.wardNo}
              onChange={handleChange}
            />{" "}
            मा स्थायी बसोबास रहने{" "}
            <input
              type="text"
              name="residentName"
              className="crp-medium-input"
              placeholder="व्यक्तिको नाम"
              value={form.residentName}
              onChange={handleChange}
            />{" "}
            ले{" "}
            <input
              type="text"
              name="clubName"
              className="crp-medium-input"
              placeholder="क्लबको नाम"
              value={form.clubName}
              onChange={handleChange}
            />{" "}
            नामक क्लब दर्ता सिफारिस गरी पाउँ भनी यस वडा कार्यालयमा निवेदन दिएको
            हुँदा उक्त क्लब{" "}
            <input
              type="text"
              name="clubAddress"
              className="crp-medium-input"
              placeholder="ठेगाना / स्थान"
              value={form.clubAddress}
              onChange={handleChange}
            />{" "}
            मा दर्ता गर्न सिफारिस साथ अनुरोध गरिएको छ ।
          </p>

          <div className="crp-blank-area" />

          <div className="crp-sign-top">
            <input
              type="text"
              name="signerName"
              className="crp-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              className="crp-post-select"
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

          <h3 className="crp-section-title">निवेदकको विवरण</h3>
          <div className="crp-applicant-box">
            <div className="crp-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="crp-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="crp-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="crp-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="crp-submit-row">
            <button
              className="crp-submit-btn"
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

      <footer className="crp-footer">
        <footer className="crp-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}
