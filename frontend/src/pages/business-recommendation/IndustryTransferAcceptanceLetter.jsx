import React, { useState } from "react";
import "./IndustryTransferAcceptanceLetter.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

export default function IndustryTransferAcceptanceLetter() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    to_line1: "",
    to_line2: "",
    original_reg_date: "",
    province: MUNICIPALITY.provinceLine,
    district: "",
    from_municipality: "",
    from_ward: "",
    industry_name: "",
    to_municipality: "",
    to_ward: "",
    decision_ref: "",
    signer_name: "",
    signer_position: "",
    comment: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const validate = () => {
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.industry_name?.trim()) return "उद्योगको नाम आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { alert(err); return; }
    setSubmitting(true);
    setMessage(null);

    try {
      const payload = { ...form };
      // normalize empty strings to null
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });

      const res = await fetch("/api/forms/industry-transfer-acceptance-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessage({ type: "success", text: `सेभ भयो (id: ${data.id})` });

      // optional reset
      setForm({
        date: "",
        to_line1: "",
        to_line2: "",
        original_reg_date: "",
        province: MUNICIPALITY.provinceLine,
        district: "",
        from_municipality: "",
        from_ward: "",
        industry_name: "",
        to_municipality: "",
        to_ward: "",
        decision_ref: "",
        signer_name: "",
        signer_position: "",
        comment: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizenship: "",
        applicant_phone: ""
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ital-page">
      <header className="ital-topbar">
        <div className="ital-top-left">उद्योग स्थानान्तरण ।</div>
        <div className="ital-top-right">अवलोकन पृष्ठ / उद्योग स्थानान्तरण</div>
      </header>

      <form className="ital-paper" onSubmit={handleSubmit}>
        <div className="ital-annex">
          <div>अनुसूची–७</div>
          <div>(नियम ७ को उपनियम (२) संग सम्बन्धित)</div>
          <div className="ital-annex-title">उद्योग स्थानान्तरणको स्वीकृति पत्र</div>
        </div>

        <div className="ital-date-row">
          मिति :
          <input type="text" className="ital-date-input" value={form.date} onChange={e => update("date", e.target.value)} placeholder="YYYY-MM-DD or Nepali date" />
        </div>

        <div className="ital-to-block">
          <span>श्री</span>
          <input type="text" className="ital-long-input" value={form.to_line1} onChange={e => update("to_line1", e.target.value)} />
          <span>ज्यु,</span>
          <br/>
          <input type="text" className="ital-long-input ital-to-second" value={form.to_line2} onChange={e => update("to_line2", e.target.value)} />
        </div>

        <div className="ital-subject-row">
          <span className="ital-sub-label">विषयः</span>
          <span className="ital-subject-text">उद्योग स्थानान्तरणको स्वीकृति बारे ।</span>
        </div>

        <p className="ital-body">
          महोदय, यस <input type="text" className="ital-small" value={form.original_reg_date} onChange={e => update("original_reg_date", e.target.value)} /> मा दर्ता भएको {MUNICIPALITY.provinceLine}
          <input type="text" className="ital-small" value={form.district} onChange={e => update("district", e.target.value)} /> जिल्ला
          <input type="text" className="ital-medium" value={form.from_municipality} onChange={e => update("from_municipality", e.target.value)} /> नगरपालिका वडा नं.
          <input type="text" className="ital-tiny" value={form.from_ward} onChange={e => update("from_ward", e.target.value)} /> मा रहेको उद्योग
          <input type="text" className="ital-medium" value={form.industry_name} onChange={e => update("industry_name", e.target.value)} /> नामक उद्योगलाई
          <input type="text" className="ital-medium" value={form.to_municipality} onChange={e => update("to_municipality", e.target.value)} /> नगरपालिका / गाउँपालिका वडा नं.
          <input type="text" className="ital-tiny" value={form.to_ward} onChange={e => update("to_ward", e.target.value)} /> मा स्थानान्तरण गर्नका लागि यस
          <input type="text" className="ital-small" value={form.decision_ref} onChange={e => update("decision_ref", e.target.value)} /> को निर्णय अनुसार स्वीकृति दिइएको छ ।
        </p>

        <div className="ital-sign-top-row">
          <div className="ital-sign-name">
            <input type="text" className="ital-sign-name-input" placeholder="नाम, थर" value={form.signer_name} onChange={e => update("signer_name", e.target.value)} />
          </div>
          <div className="ital-sign-post">
            <select className="ital-post-select" value={form.signer_position} onChange={e => update("signer_position", e.target.value)}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अधिकृत</option>
              <option>संचालक</option>
              <option>प्रमुख</option>
            </select>
          </div>
        </div>

        <div className="ital-conditions">
          <div className="ital-cond-title">शर्तहरू:</div>
          <ol>
            <li>स्वीकृति प्राप्त भएको मितिले ६ महिनाभित्र उद्योग संचालन गर्नुपर्ने।</li>
            <li>स्थानान्तरण सम्बन्धी कानूनी तथा प्रशासनिक प्रक्रिया पूरा गर्नुपर्ने।</li>
          </ol>
        </div>

        <div className="ital-editor-wrapper">
          <textarea className="ital-editor-area" rows="7" placeholder="थप विवरण वा टिप्पणी यहाँ लेख्नुहोस्…" value={form.comment} onChange={e => update("comment", e.target.value)} />
        </div>

        <h3 className="ital-section-title">निवेदकको विवरण</h3>
        <div className="ital-applicant-box">
          <div className="ital-field"><label>निवेदकको नाम *</label><input type="text" value={form.applicant_name} onChange={e => update("applicant_name", e.target.value)} /></div>
          <div className="ital-field"><label>निवेदकको ठेगाना *</label><input type="text" value={form.applicant_address} onChange={e => update("applicant_address", e.target.value)} /></div>
          <div className="ital-field"><label>निवेदकको नागरिकता नं. *</label><input type="text" value={form.applicant_citizenship} onChange={e => update("applicant_citizenship", e.target.value)} /></div>
          <div className="ital-field"><label>निवेदकको फोन नं. *</label><input type="text" value={form.applicant_phone} onChange={e => update("applicant_phone", e.target.value)} /></div>
        </div>

        <div className="ital-submit-row">
          <button className="ital-submit-btn" type="submit" disabled={submitting}>{submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className={`ital-message ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}
      </form>

      <footer className="ital-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}
