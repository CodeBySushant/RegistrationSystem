import React, { useState } from "react";
import "./IndustryRegistrationRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

export default function IndustryRegistrationRecommendation() {
  const [form, setForm] = useState({
    date: "",
    refLetterNo: "",
    chalaniNo: "",
    to_line1: "",
    to_line2: "",
    sabik_district: "",
    sabik_ward_no: "",
    current_residence: "",
    residence_from: "",
    residence_to: "",
    place_details: "",
    kitta_no: "",
    area_size: "",
    boundary_east: "",
    boundary_west: "",
    boundary_north: "",
    boundary_south: "",
    structure_types: "",
    inspection_notes: "",
    sign_name: "",
    sign_position: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    setSubmitting(true);
    setMessage(null);

    try {
      const payload = { ...form };
      // convert empty string -> null
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await fetch(
        "/api/forms/industry-registration-recommendation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessage({ type: "success", text: `सेभ भयो (id: ${data.id})` });
      // optional reset
      setForm({
        date: "",
        refLetterNo: "",
        chalaniNo: "",
        to_line1: "",
        to_line2: "",
        sabik_district: "",
        sabik_ward_no: "",
        current_residence: "",
        residence_from: "",
        residence_to: "",
        place_details: "",
        kitta_no: "",
        area_size: "",
        boundary_east: "",
        boundary_west: "",
        boundary_north: "",
        boundary_south: "",
        structure_types: "",
        inspection_notes: "",
        sign_name: "",
        sign_position: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizenship: "",
        applicant_phone: "",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="irr-page">
      <header className="irr-topbar">
        <div className="irr-top-left">उद्योग दर्ता सिफारिस ।</div>
        <div className="irr-top-right">अवलोकन पृष्ठ / उद्योग दर्ता सिफारिस</div>
      </header>

      <form className="irr-paper" onSubmit={handleSubmit}>
        {/* letterhead */}
        <div className="irr-letterhead">
          <div className="irr-logo">
            <img alt="Emblem" src="./nepallogo.svg" />
          </div>
          <div className="irr-head-text">
            <div className="irr-head-main">{MUNICIPALITY.name}</div>
            <div className="irr-head-ward">
              वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
            </div>
            <div className="irr-head-sub">
              {MUNICIPALITY.officeLine}
              <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="irr-head-meta">
            <div>
              मिति :{" "}
              <input
                type="text"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="irr-small-input"
              />
            </div>
          </div>
        </div>

        <div className="irr-ref-row">
          <div className="irr-ref-block">
            <label>पत्र संख्या :</label>
            <input
              value={form.refLetterNo}
              onChange={(e) => update("refLetterNo", e.target.value)}
            />
          </div>
          <div className="irr-ref-block">
            <label>चलानी नं. :</label>
            <input
              value={form.chalaniNo}
              onChange={(e) => update("chalaniNo", e.target.value)}
            />
          </div>
        </div>

        <div className="irr-to-block">
          <span>श्री</span>
          <input
            value={form.to_line1}
            onChange={(e) => update("to_line1", e.target.value)}
            className="irr-long-input"
          />
          <span>ज्यु,</span>
          <br />
          <input
            value={form.to_line2}
            onChange={(e) => update("to_line2", e.target.value)}
            className="irr-long-input irr-to-second"
          />
        </div>

        <div className="irr-subject-row">
          <span className="irr-sub-label">विषयः</span>
          <span className="irr-subject-text">
            प्रमाणित सिफारिस गरिएको बारे ।
          </span>
        </div>

        <p className="irr-body">
          उपरोक्त सम्बन्धमा जिल्ला काठमाडौं साबिक
          <input
            type="text"
            className="irr-small-field"
            value={form.sabik_district}
            onChange={(e) => update("sabik_district", e.target.value)}
          />
          वडा नं.
          <input
            type="text"
            className="irr-tiny-field"
            value={form.sabik_ward_no}
            onChange={(e) => update("sabik_ward_no", e.target.value)}
          />
          भई हाल {MUNICIPALITY.name} वडा नं. {MUNICIPALITY.wardNumber} मा बस्ने
          <input
            type="text"
            className="irr-medium-field"
            value={form.current_residence}
            onChange={(e) => update("current_residence", e.target.value)}
          />
          ले
          <input
            type="text"
            className="irr-small-field"
            value={form.place_details}
            onChange={(e) => update("place_details", e.target.value)}
          />
          उद्योग दर्ता गर्न सिफारिस पाऊँ भनी निवेदन अनुसार, मिति
          <input
            type="text"
            className="irr-small-field"
            value={form.residence_from}
            onChange={(e) => update("residence_from", e.target.value)}
          />{" "}
          देखि
          <input
            type="text"
            className="irr-small-field"
            value={form.residence_to}
            onChange={(e) => update("residence_to", e.target.value)}
          />{" "}
          सम्म स्थानमा रहेर व्यवसाय संचालन गर्दै आएको र सो स्थान
          <input
            type="text"
            className="irr-medium-field"
            value={form.place_details}
            onChange={(e) => update("place_details", e.target.value)}
          />{" "}
          को किता नं.
          <input
            type="text"
            className="irr-small-field"
            value={form.kitta_no}
            onChange={(e) => update("kitta_no", e.target.value)}
          />{" "}
          को क्षेत्रफल
          <input
            type="text"
            className="irr-small-field"
            value={form.area_size}
            onChange={(e) => update("area_size", e.target.value)}
          />{" "}
          मा रहेको देखिन्छ ।
        </p>

        <p className="irr-body">
          स्थानमा पूर्व{" "}
          <input
            className="irr-medium-field"
            value={form.boundary_east}
            onChange={(e) => update("boundary_east", e.target.value)}
          />
          पश्चिम{" "}
          <input
            className="irr-medium-field"
            value={form.boundary_west}
            onChange={(e) => update("boundary_west", e.target.value)}
          />
          उत्तर{" "}
          <input
            className="irr-medium-field"
            value={form.boundary_north}
            onChange={(e) => update("boundary_north", e.target.value)}
          />
          दक्षिण{" "}
          <input
            className="irr-medium-field"
            value={form.boundary_south}
            onChange={(e) => update("boundary_south", e.target.value)}
          />{" "}
          गरी चार किल्ला घेरिएको जग्गामा कस्ता प्रकारका संरचना रहेको...
        </p>

        <div className="irr-sign-top">
          <input
            placeholder="नाम, थर"
            value={form.sign_name}
            onChange={(e) => update("sign_name", e.target.value)}
            className="irr-sign-name"
          />
          <select
            className="irr-post-select"
            value={form.sign_position}
            onChange={(e) => update("sign_position", e.target.value)}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        <h3 className="irr-section-title">निवेदकको विवरण</h3>
        <div className="irr-applicant-box">
          <div className="irr-field">
            <label>निवेदकको नाम *</label>
            <input
              value={form.applicant_name}
              onChange={(e) => update("applicant_name", e.target.value)}
            />
          </div>
          <div className="irr-field">
            <label>निवेदकको ठेगाना *</label>
            <input
              value={form.applicant_address}
              onChange={(e) => update("applicant_address", e.target.value)}
            />
          </div>
          <div className="irr-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input
              value={form.applicant_citizenship}
              onChange={(e) => update("applicant_citizenship", e.target.value)}
            />
          </div>
          <div className="irr-field">
            <label>निवेदकको फोन नं. *</label>
            <input
              value={form.applicant_phone}
              onChange={(e) => update("applicant_phone", e.target.value)}
            />
          </div>
        </div>

        <div className="irr-submit-row">
          <button
            className="irr-submit-btn"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div
            className={`irr-message ${
              message.type === "error" ? "error" : "success"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <footer className="irr-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}
