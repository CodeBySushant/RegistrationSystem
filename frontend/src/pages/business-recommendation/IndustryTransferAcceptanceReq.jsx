import React, { useState, useEffect } from "react";
import "./IndustryTransferAcceptanceReq.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  to_line1: "",
  to_line2: "",
  reg_office: "",
  reg_date: "",
  district: "",
  ward: "",
  industry_name: "",
  reason_short: "",
  reason_long: "",
  attached_docs_note: "",
  signer_signature: "",
  signer_name: "",
  signer_position: "",
  signer_address: "",
  signer_email: "",
  ward_no: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function IndustryTransferAcceptanceReq() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward, ward: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      const res = await axiosInstance.post("/api/forms/industry-transfer-acceptance-req", payload);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      const res = await axiosInstance.post("/api/forms/industry-transfer-acceptance-req", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="itareq-page">
      <header className="itareq-topbar">
        <div className="itareq-top-left">उद्योग स्थानान्तरण स्वीकृति अनुरोध ।</div>
        <div className="itareq-top-right">अवलोकन पृष्ठ / उद्योग स्थानान्तरण स्वीकृति अनुरोध</div>
      </header>

      <form className="itareq-paper" onSubmit={handleSubmit}>

        {/* Letterhead */}
        <div className="itareq-letterhead">
          <div className="itareq-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="itareq-head-text">
            <div className="itareq-head-main">{MUNICIPALITY.name}</div>
            <div className="itareq-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="itareq-head-sub">
              {MUNICIPALITY.officeLine}
              <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="itareq-head-meta">
            मिति :{" "}
            <input
              type="text"
              name="date"
              className="itareq-date-input"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Annex heading */}
        <div className="itareq-annex">
          <div>अनुसूची–६</div>
          <div>(नियम ७ को उपनियम (२) संग सम्बन्धित)</div>
          <div className="itareq-annex-title">उद्योग स्थानान्तरिका लागि दिने निवेदन</div>
        </div>

        {/* To block */}
        <div className="itareq-to-block">
          <span>श्री</span>
          <input
            type="text"
            name="to_line1"
            className="itareq-long-input"
            value={form.to_line1}
            onChange={handleChange}
          />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            name="to_line2"
            className="itareq-long-input itareq-to-second"
            value={form.to_line2}
            onChange={handleChange}
          />
        </div>

        {/* Subject */}
        <div className="itareq-subject-row">
          <span className="itareq-sub-label">विषयः</span>
          <span className="itareq-subject-text">उद्योग स्थानान्तरको स्वीकृति बारे ।</span>
        </div>

        {/* Body */}
        <p className="itareq-body">
          महोदय, यस{" "}
          <input
            type="text"
            name="reg_office"
            className="itareq-small-input"
            value={form.reg_office}
            onChange={handleChange}
          />{" "}
          मा मिति{" "}
          <input
            type="text"
            name="reg_date"
            className="itareq-small-input"
            value={form.reg_date}
            onChange={handleChange}
          />{" "}
          मा दर्ता भएको {MUNICIPALITY.provinceLine}{" "}
          <input
            type="text"
            name="district"
            className="itareq-small-input"
            value={form.district}
            onChange={handleChange}
          />{" "}
          जिल्ला {MUNICIPALITY.name} वडा नं.{" "}
          <input
            type="text"
            name="ward"
            className="itareq-tiny-input"
            value={form.ward}
            onChange={handleChange}
          />{" "}
          मा स्थापना भई संचालन भई रहेको{" "}
          <input
            type="text"
            name="industry_name"
            className="itareq-medium-input"
            value={form.industry_name}
            onChange={handleChange}
          />{" "}
          उद्योग देखाएको कारणले स्थानान्तरण गर्नुपर्ने भएकाले सम्बन्धित
          निवेदनसहित यसै स्थानान्तरणको स्वीकृतिको लागि अनुरोध गर्दछु ।
        </p>

        {/* Reason */}
        <div className="itareq-reason-block">
          <div className="itareq-reason-label">उद्योग स्थानान्तर गर्नुपर्ने कारणहरू:</div>
          <textarea
            name="reason_long"
            rows="6"
            className="itareq-reason-textarea"
            value={form.reason_long}
            onChange={handleChange}
            placeholder="उद्योग स्थानान्तरण कारणहरू..."
          />
          <div className="itareq-reason-short-row">
            <label>संक्षेप कारण:</label>
            <input
              type="text"
              name="reason_short"
              className="itareq-long-input"
              value={form.reason_short}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Docs + Signature */}
        <div className="itareq-bottom-grid">
          <div className="itareq-docs">
            <div className="itareq-docs-title">संलग्न कागजातहरूः</div>
            <ol>
              <li>सञ्चालक समितिको निर्णय</li>
              <li>स्थानान्तरण हुने स्थानको विवरण</li>
              <li>प्रारम्भिक वातावरणीय परीक्षण (यदि आवश्यक)</li>
              <li>अन्य सम्बन्धित कागजात</li>
            </ol>
            <div className="itareq-docs-note-row">
              <label>अन्य संलग्न (विवरण):</label>
              <input
                type="text"
                name="attached_docs_note"
                className="itareq-long-input"
                value={form.attached_docs_note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="itareq-sign-box">
            <div className="itareq-sign-title">निवेदकको :</div>
            <div className="itareq-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" name="signer_signature" value={form.signer_signature} onChange={handleChange} />
            </div>
            <div className="itareq-sign-field">
              <span>नाम, थर :</span>
              <input type="text" name="signer_name" value={form.signer_name} onChange={handleChange} />
            </div>
            <div className="itareq-sign-field">
              <span>पद :</span>
              <select
                name="signer_position"
                value={form.signer_position}
                onChange={handleChange}
                className="itareq-sign-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
            <div className="itareq-sign-field">
              <span>ठेगाना :</span>
              <input type="text" name="signer_address" value={form.signer_address} onChange={handleChange} />
            </div>
            <div className="itareq-sign-field">
              <span>इमेल :</span>
              <input type="text" name="signer_email" value={form.signer_email} onChange={handleChange} />
            </div>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        <div className="form-footer">
          <button className="save-print-btn" type="button" onClick={handlePrint}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
}