import React, { useState, useEffect } from "react";
import "./IndustryTransferAcceptanceRequest.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  to_line1: "",
  to_line2: "",
  district: "",
  from_municipality: "",
  from_ward: "",
  industry_name: "",
  to_municipality: "",
  to_ward: "",
  transfer_reason: "",
  doc_1: "",
  doc_2: "",
  doc_3: "",
  signer_name: "",
  signer_position: "",
  signer_date: "",
  signer_address: "",
  ward_no: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function IndustryTransferAcceptanceRequest() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
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
      const res = await axiosInstance.post("/api/forms/industry-transfer-request", payload);
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
      const res = await axiosInstance.post("/api/forms/industry-transfer-request", payload);
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
    <div className="itar-page">
      {/* Top Bar */}
      <header className="itar-topbar">
        <div className="itar-top-left">उद्योग स्थानान्तरण निवेदन ।</div>
        <div className="itar-top-right">अवलोकन पृष्ठ / उद्योग स्थानान्तरण निवेदन</div>
      </header>

      <form className="itar-container" onSubmit={handleSubmit}>

        {/* === HEADER SECTION === */}
        <div className="itar-form-header-section">
          <div className="itar-header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="itar-header-text">
            <h1 className="itar-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="itar-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </h2>
            <p className="itar-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="itar-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* === META ROW === */}
        <div className="itar-meta-data-row">
          <div className="itar-meta-left">
            <p>पत्र संख्या : <span className="itar-bold-text">२०८२/८३</span></p>
          </div>
          <div className="itar-meta-right">
            <p>
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="itar-dotted-input itar-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>

        {/* === ANNEX HEADING === */}
        <div className="itar-annex">
          <div>अनुसूची–६</div>
          <div>(नियम ७ को उपनियम (१) संग सम्बन्धित)</div>
          <div className="itar-annex-title">उद्योग स्थानान्तरणको लागि निवेदन</div>
        </div>

        {/* === TO BLOCK === */}
        <div className="itar-addressee-section">
          <div className="itar-addressee-row">
            <span>श्री</span>
            <input
              type="text"
              name="to_line1"
              className="itar-inline-box-input itar-long-box"
              value={form.to_line1}
              onChange={handleChange}
            />
            <span>ज्यु,</span>
          </div>
          <div className="itar-addressee-row">
            <input
              type="text"
              name="to_line2"
              className="itar-inline-box-input itar-long-box"
              value={form.to_line2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* === SUBJECT === */}
        <div className="itar-subject-section">
          <p>
            विषयः{" "}
            <span className="itar-underline-text">
              उद्योग स्थानान्तरणको लागि निवेदन गरिएको बारे ।
            </span>
          </p>
        </div>

        {/* === BODY PARAGRAPH === */}
        <div className="itar-form-body">
          <p className="itar-body-paragraph">
            महोदय, {MUNICIPALITY.provinceLine}{" "}
            <input
              type="text"
              name="district"
              className="itar-inline-box-input itar-small-box"
              value={form.district}
              onChange={handleChange}
            />{" "}
            जिल्ला{" "}
            <input
              type="text"
              name="from_municipality"
              className="itar-inline-box-input itar-medium-box"
              value={form.from_municipality}
              onChange={handleChange}
            />{" "}
            नगरपालिका / गाउँपालिका वडा नं.{" "}
            <input
              type="text"
              name="from_ward"
              className="itar-inline-box-input itar-tiny-box"
              value={form.from_ward}
              onChange={handleChange}
            />{" "}
            मा दर्ता रहेको{" "}
            <input
              type="text"
              name="industry_name"
              className="itar-inline-box-input itar-medium-box"
              value={form.industry_name}
              onChange={handleChange}
            />{" "}
            नामक उद्योगलाई{" "}
            <input
              type="text"
              name="to_municipality"
              className="itar-inline-box-input itar-medium-box"
              value={form.to_municipality}
              onChange={handleChange}
            />{" "}
            नगरपालिका / गाउँपालिका वडा नं.{" "}
            <input
              type="text"
              name="to_ward"
              className="itar-inline-box-input itar-tiny-box"
              value={form.to_ward}
              onChange={handleChange}
            />{" "}
            मा स्थानान्तरण गर्नु पर्ने भएकोले स्थानान्तरणको स्वीकृति पाउँ भनी यो
            निवेदन पेश गरेको छु ।
          </p>
        </div>

        {/* === REASON === */}
        <div className="itar-reason-block">
          <div className="itar-reason-label">स्थानान्तरण गर्नु पर्नाको कारण :</div>
          <textarea
            name="transfer_reason"
            className="itar-reason-textarea"
            rows="4"
            placeholder="कारण लेख्नुहोस्…"
            value={form.transfer_reason}
            onChange={handleChange}
          />
        </div>

        {/* === DOCS + SIGNATURE === */}
        <div className="itar-bottom-grid">
          <div className="itar-docs">
            <div className="itar-docs-title">संलग्न कागजातहरू :</div>
            <ol>
              <li>
                <input
                  type="text"
                  name="doc_1"
                  className="itar-inline-box-input itar-medium-box"
                  placeholder="कागजात १"
                  value={form.doc_1}
                  onChange={handleChange}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="doc_2"
                  className="itar-inline-box-input itar-medium-box"
                  placeholder="कागजात २"
                  value={form.doc_2}
                  onChange={handleChange}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="doc_3"
                  className="itar-inline-box-input itar-medium-box"
                  placeholder="कागजात ३"
                  value={form.doc_3}
                  onChange={handleChange}
                />
              </li>
            </ol>
          </div>

          <div className="itar-sign-box">
            <div className="itar-sign-title">निवेदक</div>
            <div className="itar-sign-field">
              <span>नाम :</span>
              <input
                type="text"
                name="signer_name"
                className="itar-inline-box-input"
                value={form.signer_name}
                onChange={handleChange}
              />
            </div>
            <div className="itar-sign-field">
              <span>पद :</span>
              <select
                name="signer_position"
                className="itar-designation-select"
                value={form.signer_position}
                onChange={handleChange}
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
            <div className="itar-sign-field">
              <span>मिति :</span>
              <input
                type="text"
                name="signer_date"
                className="itar-inline-box-input"
                value={form.signer_date}
                onChange={handleChange}
              />
            </div>
            <div className="itar-sign-field">
              <span>ठेगाना :</span>
              <input
                type="text"
                name="signer_address"
                className="itar-inline-box-input"
                value={form.signer_address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* === APPLICANT DETAILS === */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* === FOOTER === */}
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