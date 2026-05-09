// IndustryClosedNotify.jsx
import React, { useState, useEffect } from "react";
import "./IndustryClosedNotify.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const toNepaliDigits = (str) => {
  const map = { 0: "०", 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  to_line1: MUNICIPALITY.officeLine,
  to_line2: MUNICIPALITY.name,
  place_extra: "",
  registered_date: "",
  registered_municipality: MUNICIPALITY.name,
  ward: "",
  industry_name: "",
  closure_from_date: "",
  closure_to_date: "",
  detailed_description: "",
  attached_docs: "",
  signature: "",
  signer_name: "",
  signer_position: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function IndustryClosedNotify() {
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
  }, [user]);

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-closed-notify", buildPayload());
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialForm);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-closed-notify", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialForm);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ucn-page">
      <div className="ucn-topbar">
        उद्योग बन्द भएको जानकारी पत्र ।
        <span className="ucn-top-right">उद्योग &gt; उद्योग बन्द भएको जानकारी पत्र</span>
      </div>

      <form className="ucn-paper" onSubmit={handleSubmit}>

        {/* --- Annex Heading --- */}
        <div className="ucn-annex">
          <div>अनुसूची–३३</div>
          <div>(नियम ९ संग सम्बन्धित)</div>
          <div className="ucn-annex-title">उद्योग बन्द भएको जानकारी पत्र</div>
        </div>

        {/* --- Date --- */}
        <div className="ucn-date-row">
          मिति :{" "}
          <input
            readOnly
            className="ucn-date-input"
            value={toNepaliDigits(form.date)}
          />
        </div>

        {/* --- To Block --- */}
        <div className="ucn-to-block">
          <span>श्री</span>
          <input
            type="text"
            className="ucn-long-input"
            value={form.to_line1}
            onChange={(e) => update("to_line1", e.target.value)}
          />
          <span>ज्यु,</span>
          <br />
          <span>{MUNICIPALITY.name}, {MUNICIPALITY.city}</span>
          <input
            type="text"
            className="ucn-medium-input"
            value={form.place_extra}
            onChange={(e) => update("place_extra", e.target.value)}
          />
        </div>

        {/* --- Subject --- */}
        <div className="ucn-subject-row">
          <span className="ucn-subject-label">विषयः</span>
          <span className="ucn-subject-text">उद्योग बन्द भएको जानकारी सम्बन्धमा ।</span>
        </div>

        {/* --- Body --- */}
        <p className="ucn-body">
          उपरोक्त विषयमा उद्योग मिति{" "}
          <input
            type="text"
            className="ucn-small-input"
            value={form.registered_date}
            onChange={(e) => update("registered_date", e.target.value)}
          />{" "}
          मा दर्ता भई{" "}
          <input
            type="text"
            className="ucn-small-input"
            value={form.registered_municipality}
            onChange={(e) => update("registered_municipality", e.target.value)}
          />{" "}
          नगरपालिका वडा नं.{" "}
          <input
            type="text"
            className="ucn-tiny-input"
            value={form.ward}
            onChange={(e) => update("ward", e.target.value)}
          />{" "}
          मा स्थापना भई संचालन गर्न गराइएको परेको यस{" "}
          <input
            type="text"
            className="ucn-medium-input"
            value={form.industry_name}
            onChange={(e) => update("industry_name", e.target.value)}
          />{" "}
          उद्योग मिति{" "}
          <input
            type="text"
            className="ucn-small-input"
            value={form.closure_from_date}
            onChange={(e) => update("closure_from_date", e.target.value)}
          />{" "}
          देखि अपरिहार्य कारणवश{" "}
          <input
            type="text"
            className="ucn-small-input"
            value={form.closure_to_date}
            onChange={(e) => update("closure_to_date", e.target.value)}
          />{" "}
          देखि बन्द गरेको भनी बुझाई दिनुको लागि अनुरोध गर्दछु / गर्दछौं ।
        </p>

        {/* --- Reasons List --- */}
        <div className="ucn-reasons">
          <div className="ucn-reasons-title">उद्योग बन्द हुने सम्भावित कारणहरू:</div>
          <ol>
            <li>आवश्यक कच्चा पदार्थ पाउन नसकेको।</li>
            <li>पूँजीको अभाव भएको।</li>
            <li>बजारको अभाव भएको।</li>
            <li>आर्थिक व्यवस्थापनमा समस्या भएको।</li>
            <li>कामदारहरूको अभाव भएको।</li>
            <li>उद्योग सञ्चालन नहुनुको कारणले व्यवस्थापन समस्या।</li>
            <li>प्रायोजन आवश्यकता नपर्न गई उद्योग बन्द गरिएको।</li>
          </ol>
        </div>

        {/* --- Description Textarea --- */}
        <div className="ucn-editor-wrapper">
          <div className="ucn-editor-toolbar">
            <button type="button">B</button>
            <button type="button">I</button>
            <button type="button">U</button>
            <button type="button">•</button>
            <button type="button">1.</button>
            <span className="ucn-toolbar-label">Styles</span>
          </div>
          <textarea
            className="ucn-editor-area"
            rows="8"
            placeholder="यहाँ उद्योग बन्दसम्बन्धी विस्तृत विवरण लेख्नुहोस्..."
            value={form.detailed_description}
            onChange={(e) => update("detailed_description", e.target.value)}
          />
        </div>

        {/* --- Docs + Signature --- */}
        <div className="ucn-bottom-grid">
          <div className="ucn-docs">
            <div className="ucn-docs-title">संलग्न कागजातः</div>
            <ol>
              <li>उद्योग बन्द हुने कारण / कारणहरू स्पष्ट हुने गरी तयार गरिएको विस्तृत प्रतिवेदन।</li>
              <li>नियमावलीको नियम ९ को उपनियम (३) मा उल्लेखित कागजातको विवरण।</li>
            </ol>
            <div style={{ marginTop: 8 }}>
              <label>अन्य संलग्न: </label>
              <input
                type="text"
                className="ucn-medium-input"
                value={form.attached_docs}
                onChange={(e) => update("attached_docs", e.target.value)}
              />
            </div>
          </div>

          <div className="ucn-sign-box">
            <div className="ucn-sign-caption">निवेदकको :</div>
            <div className="ucn-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" value={form.signature} onChange={(e) => update("signature", e.target.value)} />
            </div>
            <div className="ucn-sign-field">
              <span>नाम, थर :</span>
              <input type="text" value={form.signer_name} onChange={(e) => update("signer_name", e.target.value)} />
            </div>
            <div className="ucn-sign-field">
              <span>पद :</span>
              <input type="text" value={form.signer_position} onChange={(e) => update("signer_position", e.target.value)} />
            </div>
          </div>
        </div>

        {/* --- Applicant Details Box --- */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
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