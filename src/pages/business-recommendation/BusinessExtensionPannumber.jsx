// BusinessExtensionPannumber.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BusinessExtensionPannumber.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
  refLetterNo: "",
  chalaniNo: "",
  toLine1: MUNICIPALITY.officeLine, // e.g. "नगर कार्यपालिकाको कार्यालय, काठमाडौं"
  toLine2: MUNICIPALITY.name, // e.g. "नागार्जुन नगरपालिका"
  wardNo: MUNICIPALITY.wardNumber,
  prevWardNo: MUNICIPALITY.wardNumber,
  applicantNameTop: "", // "श्री ... ले" name in paragraph
  panNo: "", // existing PAN number (like "पान नं.")
  addedPanNo: "", // if adding to other PAN (if relevant)
  addedBusiness: "", // what business was added
  details: "", // textarea (बोधार्थ)
  signerName: "",
  signerPost: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function BusinessExtensionPannumber() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicantCitizenship?.trim()) return "नागरिकता नं आवश्यक छ";
    // require either panNo or addedPanNo
    if (!form.panNo && !form.addedPanNo)
      return "कम्तिमा एक पान नं प्रविष्ट गर्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...form };
      // convert empty strings to null for neat DB insertion
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/business-extension-pan";
      const res = await axios.post(url, payload);

      if (res.status === 200 || res.status === 201) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
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
    <div className="bep-page">
      <form className="bep-paper" onSubmit={handleSubmit}>
        <div className="bep-letterhead">
          <div className="bep-logo">
            <img src="./nepallogo.svg" alt="Emblem" />
          </div>
          <div className="bep-head-text">
            <div className="bep-head-main">{MUNICIPALITY.name}</div>
            <div className="bep-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="bep-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="bep-head-meta">
            <div>
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={onChange}
                className="bep-small-input"
              />
            </div>
            <div className="bep-meta-line">ने.सं.: ११४६ भद्र, २ शनिवार</div>
          </div>
        </div>

        <div className="bep-ref-row">
          <div className="bep-ref-block">
            <label>पत्र संख्या :</label>
            <input
              name="refLetterNo"
              value={form.refLetterNo}
              onChange={onChange}
            />
          </div>
          <div className="bep-ref-block">
            <label>चलानी नं. :</label>
            <input
              name="chalaniNo"
              value={form.chalaniNo}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="bep-to-block">
          <span>श्री</span>
          <input
            name="toLine1"
            value={form.toLine1}
            onChange={onChange}
            className="bep-long-input"
          />
          <br />
          <input
            name="toLine2"
            value={form.toLine2}
            onChange={onChange}
            className="bep-long-input bep-to-second"
          />
        </div>

        <div className="bep-subject-row">
          <span className="bep-sub-label">विषयः</span>
          <span className="bep-subject-text">सिफारिस गरिएको बारे ।</span>
        </div>

        <p className="bep-body">
          उपर्युक्त बिषयमा <span className="bep-bold">{MUNICIPALITY.name}</span> वडा नं.
          <input
            name="wardNo"
            value={form.wardNo}
            onChange={onChange}
            className="bep-tiny-input"
          />
          (साबिक{" "}
          <input
            name="prevWardNo"
            value={form.prevWardNo}
            onChange={onChange}
            className="bep-small-inline"
          />{" "}
          वडा नं.
          <input
            name="prevWardNo2"
            value={form.prevWardNo}
            readOnly
            style={{ display: "none" }}
          />
          ) मा बस्ने श्री
          <input
            name="applicantNameTop"
            value={form.applicantNameTop}
            onChange={onChange}
            className="bep-medium-input"
          />{" "}
          ले दिइएको निवेदन अनुसार
          <input
            name="panNo"
            value={form.panNo}
            onChange={onChange}
            className="bep-small-inline"
          />{" "}
          पान नं.
          <input
            name="addedPanNo"
            value={form.addedPanNo}
            onChange={onChange}
            className="bep-small-inline"
          />{" "}
          मा कारोबार थप गरी
          <input
            name="addedBusiness"
            value={form.addedBusiness}
            onChange={onChange}
            className="bep-medium-input"
          />{" "}
          सहितको व्यवसाय संचालन गर्दै आइरहेको अवस्था र हाल उक्त पान नं मा
          कारोबार थप गरी देहाय राखिएको विवरणको सत्यताको आधारमा कारोबार थप स्थायी
          लेखा नं. सिफारिस गरिएको छ।
        </p>

        <section className="bep-section">
          <h3 className="bep-subtitle">बोधार्थ :</h3>
          <textarea
            name="details"
            rows={4}
            className="bep-textarea"
            placeholder="यहाँ कारोबार थप सम्बन्धी विवरण लेख्नुहोस्…"
            value={form.details}
            onChange={onChange}
          />
        </section>

        <div className="bep-sign-top">
          <input
            name="signerName"
            value={form.signerName}
            onChange={onChange}
            className="bep-sign-name"
            placeholder="नाम, थर"
          />
          <select
            name="signerPost"
            value={form.signerPost}
            onChange={onChange}
            className="bep-post-select"
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        <h3 className="bep-section-title">निवेदकको विवरण</h3>
        <div className="bep-applicant-box">
          <div className="bep-field">
            <label>निवेदकको नाम *</label>
            <input
              name="applicantName"
              value={form.applicantName}
              onChange={onChange}
              required
            />
          </div>
          <div className="bep-field">
            <label>निवेदकको ठेगाना *</label>
            <input
              name="applicantAddress"
              value={form.applicantAddress}
              onChange={onChange}
            />
          </div>
          <div className="bep-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input
              name="applicantCitizenship"
              value={form.applicantCitizenship}
              onChange={onChange}
              required
            />
          </div>
          <div className="bep-field">
            <label>निवेदकको फोन नं. *</label>
            <input
              name="applicantPhone"
              value={form.applicantPhone}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="bep-submit-row">
          <button
            className="bep-submit-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <footer className="bep-footer">
        <footer className="bep-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}
