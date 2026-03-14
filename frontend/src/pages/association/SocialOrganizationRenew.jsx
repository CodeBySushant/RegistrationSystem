// SocialOrganizationRenew.jsx
import React, { useState } from "react";
import axios from "axios";
import "./SocialOrganizationRenew.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

function SocialOrganizationRenew() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    refLetterNo: "",
    chalaniNo: "",
    toOffice: MUNICIPALITY.officeLine, // e.g. "नगर कार्यपालिकाको कार्यालय, काठमाडौं"
    toOfficeCity: MUNICIPALITY.officeLine, // or MUNICIPALITY.englishDistrict if you prefer short district
    wardNo: MUNICIPALITY.wardNumber,
    sabikWardNo: MUNICIPALITY.wardNumber,
    palikaType: "नगरपालिका",
    orgName: "",
    orgAddress: "",
    reasonText: "",
    signerName: "",
    signerDesignation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    // basic required check
    if (!form.orgName?.trim())
      return alert("कृपया संस्था/संस्थाको नाम भर्नुहोस्");
    if (!form.applicantName?.trim())
      return alert("कृपया निवेदकको नाम भर्नुहोस्");

    setSubmitting(true);
    try {
      const payload = { ...form };
      // normalize empty strings to null (optional)
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/social-organization-renew",
        payload
      );
      if (res.status === 200 || res.status === 201) {
        alert("Saved successfully. ID: " + (res.data?.id ?? "OK"));
        // reset (optional)
        setForm({
          date: "२०८२.०७.१५",
          refLetterNo: "",
          chalaniNo: "",
          toOffice: "",
          toOfficeCity: MUNICIPALITY.officeLine,
          wardNo: "",
          sabikWardNo: "",
          palikaType: "नगरपालिका",
          orgName: "",
          orgAddress: "",
          reasonText: "",
          signerName: "",
          signerDesignation: "",
          applicantName: "",
          applicantAddress: "",
          applicantCitizenship: "",
          applicantPhone: "",
        });
      } else {
        alert("Unexpected response: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("त्रुटि: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sor-page">
      <header className="sor-topbar">
        <div className="sor-top-left">सामाजिक संस्था नवीकरण</div>
        <div className="sor-top-right">
          अवलोकन पृष्ठ / सामाजिक संस्था नवीकरण सिफारिस
        </div>
      </header>

      <form className="sor-paper" onSubmit={handleSubmit}>
        <div className="sor-letterhead">
          <div className="sor-head-meta">
            <div className="sor-meta-line">
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={onChange}
                className="sor-small-input"
              />
            </div>
            <div className="sor-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <div className="sor-ref-row">
          <div className="sor-ref-block">
            <label>पत्र संख्या :</label>
            <input
              name="refLetterNo"
              value={form.refLetterNo}
              onChange={onChange}
            />
          </div>
          <div className="sor-ref-block">
            <label>चलानी नं. :</label>
            <input
              name="chalaniNo"
              value={form.chalaniNo}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="sor-to-block">
          <span>श्री</span>
          <input
            name="toOffice"
            className="sor-long-input"
            value={form.toOffice}
            onChange={onChange}
          />
          <span>जिल्ला प्रशासन कार्यालय,</span>
          <br />
          <input
            name="toOfficeCity"
            className="sor-long-input sor-to-second"
            value={form.toOfficeCity}
            onChange={onChange}
          />
        </div>

        <div className="sor-subject-row">
          <span className="sor-sub-label">विषयः</span>
          <span className="sor-subject-text">सिफारिस गरिएको बारेमा ।</span>
        </div>

        <p className="sor-body">
          उपर्युक्त सम्बन्धमा <span className="sor-bold">{MUNICIPALITY.name}</span> वडा नं.
          <input
            name="wardNo"
            className="sor-tiny-input"
            value={form.wardNo}
            onChange={onChange}
          />{" "}
          (साबिक
          <input
            name="sabikWardNo"
            className="sor-small-inline"
            value={form.sabikWardNo}
            onChange={onChange}
          />
          )
          <select
            name="palikaType"
            value={form.palikaType}
            onChange={onChange}
            className="sor-select"
          >
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>
          <input
            name="orgName"
            className="sor-medium-input"
            placeholder="संस्थाको नाम"
            value={form.orgName}
            onChange={onChange}
            required
          />
          नामक सामाजिक संस्था नवीकरणको सिफारिसको लागि यस कार्यलयमा प्राप्त
          निवेदन तथा पेश गरिएका आवश्यक कागजातका आधारमा अनुरोध गरिएको हुँदा
          नवीकरण गरिदिनुहुन सिफारिस छ।
        </p>

        <div className="sor-blank-area" />

        <div className="sor-sign-top">
          <input
            name="signerName"
            className="sor-sign-name"
            placeholder="नाम, थर"
            value={form.signerName}
            onChange={onChange}
          />
          <select
            name="signerDesignation"
            className="sor-post-select"
            value={form.signerDesignation}
            onChange={onChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        <h3 className="sor-section-title">निवेदकको विवरण</h3>
        <div className="sor-applicant-box">
          <div className="sor-field">
            <label>निवेदकको नाम *</label>
            <input
              name="applicantName"
              value={form.applicantName}
              onChange={onChange}
            />
          </div>
          <div className="sor-field">
            <label>निवेदकको ठेगाना *</label>
            <input
              name="applicantAddress"
              value={form.applicantAddress}
              onChange={onChange}
            />
          </div>
          <div className="sor-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input
              name="applicantCitizenship"
              value={form.applicantCitizenship}
              onChange={onChange}
            />
          </div>
          <div className="sor-field">
            <label>निवेदकको फोन नं. *</label>
            <input
              name="applicantPhone"
              value={form.applicantPhone}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="sor-submit-row">
          <button
            className="sor-submit-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <footer className="sor-footer">
        <footer className="sor-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}

export default SocialOrganizationRenew;
