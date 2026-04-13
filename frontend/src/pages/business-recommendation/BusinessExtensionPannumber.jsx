// BusinessExtensionPannumber.jsx
import React, { useState, useEffect } from "react";
import "./BusinessExtensionPannumber.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const toNepaliDigits = (str) =>
  String(str).replace(/[0-9]/g, (d) => "०१२३४५६७८९"[d]);

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  toLine1: MUNICIPALITY.officeLine,
  toLine2: MUNICIPALITY.name,
  wardNo: "",
  prevWardNo: "",
  applicantNameTop: "",
  panNo: "",
  addedPanNo: "",
  addedBusiness: "",
  details: "",
  signerName: "",
  signerPost: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function BusinessExtensionPannumber() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.wardNo) {
      setForm((prev) => ({ ...prev, wardNo: user.ward }));
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicantCitizenship?.trim()) return "नागरिकता नं आवश्यक छ";
    if (!form.panNo && !form.addedPanNo)
      return "कम्तिमा एक पान नं प्रविष्ट गर्नुहोस्";
    return null;
  };

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "") payload[k] = null;
    });
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/forms/business-extension-pan", buildPayload());
      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = async () => {
    if (submitting) return;
    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/forms/business-extension-pan", buildPayload());
      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        window.print();
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="bep-container" onSubmit={handleSubmit}>

      {/* --- Top Bar --- */}
      <div className="bep-topbar">
        व्यवसाय विस्तार / पान नं. सिफारिस ।
        <span className="bep-topbar-right">व्यवसाय &gt; पान नं. सिफारिस</span>
      </div>

      {/* --- Letterhead --- */}
      <div className="bep-letterhead">
        <div className="bep-logo">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
        </div>
        <div className="bep-head-text">
          <div className="bep-head-main">{MUNICIPALITY.name}</div>
          <div className="bep-head-ward">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || ""} नं. वडा कार्यालय`}
          </div>
          <div className="bep-head-sub">
            {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
          </div>
        </div>
        <div className="bep-head-meta">
          <div>
            मिति :{" "}
            <input
              readOnly
              className="bep-small-input"
              value={toNepaliDigits(form.date)}
            />
          </div>
          <div className="bep-meta-line">ने.सं.: ११४६ भद्र, २ शनिवार</div>
        </div>
      </div>

      {/* --- Ref Numbers --- */}
      <div className="bep-ref-row">
        <div className="bep-ref-block">
          <label>पत्र संख्या :</label>
          <input name="refLetterNo" value={form.refLetterNo} onChange={onChange} />
        </div>
        <div className="bep-ref-block">
          <label>चलानी नं. :</label>
          <input name="chalaniNo" value={form.chalaniNo} onChange={onChange} />
        </div>
      </div>

      {/* --- To Block --- */}
      <div className="bep-to-block">
        <span>श्री</span>
        <input name="toLine1" value={form.toLine1} onChange={onChange} className="bep-long-input" />
        <br />
        <input name="toLine2" value={form.toLine2} onChange={onChange} className="bep-long-input bep-to-second" />
      </div>

      {/* --- Subject --- */}
      <div className="bep-subject-row">
        <span className="bep-sub-label">विषयः</span>
        <span className="bep-subject-text">सिफारिस गरिएको बारे ।</span>
      </div>

      {/* --- Body --- */}
      <p className="bep-body">
        उपर्युक्त बिषयमा <span className="bep-bold">{MUNICIPALITY.name}</span>{" "}
        वडा नं.{" "}
        <input name="wardNo" value={form.wardNo} onChange={onChange} className="bep-tiny-input" />
        {" "}(साबिक{" "}
        <input name="prevWardNo" value={form.prevWardNo} onChange={onChange} className="bep-small-inline" />
        {" "}वडा नं.) मा बस्ने श्री{" "}
        <input name="applicantNameTop" value={form.applicantNameTop} onChange={onChange} className="bep-medium-input" />
        {" "}ले दिइएको निवेदन अनुसार{" "}
        <input name="panNo" value={form.panNo} onChange={onChange} className="bep-small-inline" />
        {" "}पान नं.{" "}
        <input name="addedPanNo" value={form.addedPanNo} onChange={onChange} className="bep-small-inline" />
        {" "}मा कारोबार थप गरी{" "}
        <input name="addedBusiness" value={form.addedBusiness} onChange={onChange} className="bep-medium-input" />
        {" "}सहितको व्यवसाय संचालन गर्दै आइरहेको अवस्था र हाल उक्त पान नं मा
        कारोबार थप गरी देहाय राखिएको विवरणको सत्यताको आधारमा कारोबार थप स्थायी
        लेखा नं. सिफारिस गरिएको छ।
      </p>

      {/* --- बोधार्थ --- */}
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

      {/* --- Signature --- */}
      <div className="bep-sign-top">
        <input
          name="signerName"
          value={form.signerName}
          onChange={onChange}
          className="bep-sign-name"
          placeholder="नाम, थर"
        />
        <select name="signerPost" value={form.signerPost} onChange={onChange} className="bep-post-select">
          <option value="">पद छनौट गर्नुहोस्</option>
          <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
          <option value="वडा सचिव">वडा सचिव</option>
          <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
        </select>
      </div>

      {/* --- Applicant Details --- */}
      <ApplicantDetailsNp formData={form} handleChange={onChange} />

      {/* --- Footer --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint} disabled={submitting}>
          {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
}