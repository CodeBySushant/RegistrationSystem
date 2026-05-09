// IndustryFormCancellation.jsx
import React, { useState, useEffect } from "react";
import "./IndustryFormCancellation.css";

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
  reg_certificate_date: "",
  district: MUNICIPALITY.englishDistrict || "",
  municipality: MUNICIPALITY.name,
  ward: "",
  industry_location: "",
  started_date: "",
  closed_date: "",
  reason_short: "",
  signature: "",
  signer_name: "",
  signer_position: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function IndustryFormCancellation() {
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
  }, [user]);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

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
      const res = await axiosInstance.post("/api/forms/industry-cancellation", buildPayload());
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
      const res = await axiosInstance.post("/api/forms/industry-cancellation", buildPayload());
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
    <div className="ufc-page">
      <div className="ufc-topbar">
        उद्योगको दर्ता खारेजी ।
        <span className="ufc-top-right">उद्योग &gt; उद्योगको दर्ता खारेजी</span>
      </div>

      <form className="ufc-paper" onSubmit={handleSubmit}>

        {/* --- Annex Heading --- */}
        <div className="ufc-annex">
          <div>अनुसूची–३२</div>
          <div>(नियम १० को उपनियम (३) संग सम्बन्धित)</div>
          <div className="ufc-annex-title">उद्योगको दर्ता खारेजको लागि दिइने निवेदन</div>
        </div>

        {/* --- Date --- */}
        <div className="ufc-date-row">
          मिति :{" "}
          <input
            readOnly
            className="ufc-date-input"
            value={toNepaliDigits(form.date)}
          />
        </div>

        {/* --- To Block --- */}
        <div className="ufc-to-block">
          <span>श्री</span>
          <input
            type="text"
            className="ufc-long-input"
            value={form.to_line1}
            onChange={(e) => update("to_line1", e.target.value)}
          />
          <span>ज्यु,</span>
          <br />
          <input
            type="text"
            className="ufc-long-input second"
            value={form.to_line2}
            onChange={(e) => update("to_line2", e.target.value)}
          />
        </div>

        {/* --- Subject --- */}
        <div className="ufc-subject-row">
          <span className="ufc-subject-label">विषयः</span>
          <span className="ufc-subject-text">उद्योग दर्ता खारेज गरिदिने सम्बन्धमा ।</span>
        </div>

        {/* --- Body --- */}
        <p className="ufc-body">
          उद्योग दर्ता प्रमाण मिति{" "}
          <input
            type="text"
            className="ufc-small-input"
            value={form.reg_certificate_date}
            onChange={(e) => update("reg_certificate_date", e.target.value)}
          />{" "}
          मा दर्ता भई {MUNICIPALITY.provinceLine}{" "}
          <input
            type="text"
            className="ufc-small-input"
            value={form.district}
            onChange={(e) => update("district", e.target.value)}
          />{" "}
          जिल्ला{" "}
          <input
            type="text"
            className="ufc-small-input"
            value={form.municipality}
            onChange={(e) => update("municipality", e.target.value)}
          />{" "}
          वडा नं.{" "}
          <input
            type="text"
            className="ufc-tiny-input"
            value={form.ward}
            onChange={(e) => update("ward", e.target.value)}
          />{" "}
          मा स्थित यस उद्योग{" "}
          <input
            type="text"
            className="ufc-small-input"
            value={form.industry_location}
            onChange={(e) => update("industry_location", e.target.value)}
          />{" "}
          मिति{" "}
          <input
            type="text"
            className="ufc-small-input"
            value={form.started_date}
            onChange={(e) => update("started_date", e.target.value)}
          />{" "}
          देखि संचालन भएको र मिति{" "}
          <input
            type="text"
            className="ufc-small-input"
            value={form.closed_date}
            onChange={(e) => update("closed_date", e.target.value)}
          />{" "}
          देखि उद्योग बन्द भएकोले ...
        </p>

        {/* --- Middle: Reasons + Signature --- */}
        <div className="ufc-middle-section">
          <div className="ufc-reason">
            <div className="ufc-reason-title">खास कारण:</div>
            <ol>
              <li>उद्योग संचालन गर्न नसकिएको कारणले स्थायी रुपमा बन्द गरिएको।</li>
              <li>उद्योग सञ्चालन उद्देश्य परिवर्तन गरिएको।</li>
              <li>सरकारी वा स्थानीय तहको नीतिगत निर्णय।</li>
              <li>उद्योग सञ्चालनको आर्थिक अवस्था प्रतिकुल।</li>
              <li>उद्योग स्थानान्तरण गरिएको।</li>
              <li>मुद्दा विचाराधीन नरहेको।</li>
            </ol>
            <div style={{ marginTop: 8 }}>
              <label>कुनै छोटो कारण लेख्नुहोस्: </label>
              <input
                type="text"
                className="ufc-small-input"
                value={form.reason_short}
                onChange={(e) => update("reason_short", e.target.value)}
              />
            </div>
          </div>

          <div className="ufc-sign-box">
            <div className="ufc-sign-title">निवेदकको</div>
            <div className="ufc-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" value={form.signature} onChange={(e) => update("signature", e.target.value)} />
            </div>
            <div className="ufc-sign-field">
              <span>नाम, थर :</span>
              <input type="text" value={form.signer_name} onChange={(e) => update("signer_name", e.target.value)} />
            </div>
            <div className="ufc-sign-field">
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