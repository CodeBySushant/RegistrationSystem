// OrganizationRenewRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./OrganizationRenewRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

function OrganizationRenewal() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    refLetterNo: "",
    chalaniNo: "",
    toOffice: MUNICIPALITY.officeLine, 
    toOfficeLine2: MUNICIPALITY.name, 
    wardNo: MUNICIPALITY.wardNumber,
    sabikWardNo: MUNICIPALITY.wardNumber,
    sabikWardNo2: MUNICIPALITY.wardNumber,
    personName: "",        // person owning the organization
    orgName: "",
    orgAddress: "",
    signerName: "",
    signerDesignation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });
      const res = await axios.post("/api/forms/organization-renew-recommendation", payload);
      if (res.status === 200 || res.status === 201) {
        alert("Saved: " + (res.data?.id ?? "OK"));
        // optional: reset form
        // setForm(initialStateEquivalent)
      } else {
        alert("Unexpected status: " + res.status);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="org-page">
      <header className="org-topbar">
        <div className="org-top-left">संस्था नवीकरण सिफारिस ।</div>
        <div className="org-top-right">अवलोकन पृष्ठ / संस्था नवीकरण सिफारिस</div>
      </header>

      <form className="org-paper" onSubmit={handleSubmit}>
        <div className="org-letterhead">
          <div className="org-head-meta">
            <div className="org-meta-line">
              मिति : <input type="text" name="date" value={form.date} onChange={onChange} className="org-small-input" />
            </div>
            <div className="org-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <div className="org-ref-row">
          <div className="org-ref-block"><label>पत्र संख्या :</label><input name="refLetterNo" value={form.refLetterNo} onChange={onChange} /></div>
          <div className="org-ref-block"><label>चलानी नं. :</label><input name="chalaniNo" value={form.chalaniNo} onChange={onChange} /></div>
        </div>

        <div className="org-to-block">
          <span>श्री</span>
          <input name="toOffice" className="org-long-input" value={form.toOffice} onChange={onChange} />
          <span>ज्यु</span>
          <br />
          <input name="toOfficeLine2" className="org-long-input org-to-second" value={form.toOfficeLine2} onChange={onChange} />
        </div>

        <div className="org-subject-row">
          <span className="org-sub-label">विषयः</span>
          <span className="org-subject-text">सिफारिस सम्बन्धमा ।</span>
        </div>

        <p className="org-body">
          उपर्युक्त विषयमा उपर्युक्त विषयमा <span className="org-bold">{MUNICIPALITY.name}</span> वडा नं.
          <input type="text" className="org-tiny-input" name="wardNo" value={form.wardNo} onChange={onChange} /> (साबिक
          <input type="text" className="org-small-inline" name="sabikWardNo" value={form.sabikWardNo} onChange={onChange} />) वडा नं.
          <input type="text" className="org-tiny-input" name="sabikWardNo2" value={form.sabikWardNo2} onChange={onChange} /> मा बस्ने श्री
          <input type="text" className="org-medium-input" name="personName" value={form.personName} onChange={onChange} /> को नाममा रहेको
          <input type="text" className="org-medium-input" name="orgName" value={form.orgName} onChange={onChange} /> नामक संस्था नवीकरण गर्नुपर्ने भएकोले ...
        </p>

        <div className="org-body-blank" />

        <div className="org-sign-top">
          <input type="text" className="org-sign-name" name="signerName" placeholder="नाम, थर" value={form.signerName} onChange={onChange} />
          <select className="org-post-select" name="signerDesignation" value={form.signerDesignation} onChange={onChange}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        <h3 className="org-section-title">निवेदकको विवरण</h3>
        <div className="org-applicant-box">
          <div className="org-field"><label>निवेदकको नाम *</label><input name="applicantName" value={form.applicantName} onChange={onChange} /></div>
          <div className="org-field"><label>निवेदकको ठेगाना *</label><input name="applicantAddress" value={form.applicantAddress} onChange={onChange} /></div>
          <div className="org-field"><label>निवेदकको नागरिकता नं. *</label><input name="applicantCitizenship" value={form.applicantCitizenship} onChange={onChange} /></div>
          <div className="org-field"><label>निवेदकको फोन नं. *</label><input name="applicantPhone" value={form.applicantPhone} onChange={onChange} /></div>
        </div>

        <div className="org-submit-row">
          <button className="org-submit-btn" type="submit" disabled={submitting}>{submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>
      </form>

      <footer className="org-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}

export default OrganizationRenewal;
