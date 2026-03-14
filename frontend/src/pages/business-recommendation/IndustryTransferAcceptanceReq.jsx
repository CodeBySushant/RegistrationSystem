import React, { useState } from "react";
import "./IndustryTransferAcceptanceReq.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

export default function IndustryTransferAcceptanceReq() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    to_line1: "",
    to_line2: "",
    original_reg_date: "",
    province: MUNICIPALITY.provinceLine,
    district: "",
    municipality: MUNICIPALITY.name,
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
    if (!form.applicant_citizenship?.trim()) return "नागरिकता नं आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { alert(err); return; }
    if (submitting) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const payload = { ...form };
      // normalize empty strings to null (optional)
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });

      const res = await fetch("/api/forms/industry-transfer-acceptance-req", {
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
        municipality: MUNICIPALITY.name,
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
    <div className="itar-page">
      <header className="itar-topbar">
        <div className="itar-top-left">उद्योग स्थानान्तरण स्वीकृति अनुरोध ।</div>
        <div className="itar-top-right">अवलोकन पृष्ठ / उद्योग स्थानान्तरण स्वीकृति अनुरोध</div>
      </header>

      <form className="itar-paper" onSubmit={handleSubmit}>
        <div className="itar-annex">
          <div>अनुसूची–६</div>
          <div>(नियम ७ को उपनियम (२) संग सम्बन्धित)</div>
          <div className="itar-annex-title">उद्योग स्थानान्तरिका लागि दिने निवेदन</div>
        </div>

        <div className="itar-date-row">
          मिति :
          <input type="text" className="itar-date-input" value={form.date} onChange={e => update("date", e.target.value)} placeholder="YYYY-MM-DD or Nepali date" />
        </div>

        <div className="itar-to-block">
          <span>श्री</span>
          <input type="text" className="itar-long-input" value={form.to_line1} onChange={e => update("to_line1", e.target.value)} />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="itar-long-input itar-to-second" value={form.to_line2} onChange={e => update("to_line2", e.target.value)} />
        </div>

        <div className="itar-subject-row">
          <span className="itar-sub-label">विषयः</span>
          <span className="itar-subject-text">उद्योग स्थानान्तरको स्वीकृति बारे ।</span>
        </div>

        <p className="itar-body">
          महोदय, यस <input type="text" className="itar-small-input" value={form.original_reg_date} onChange={e => update("original_reg_date", e.target.value)} /> मा मिति
          <input type="text" className="itar-small-input" value={form.original_reg_date} onChange={e => update("original_reg_date", e.target.value)} /> मा दर्ता भएको {form.province}
          <input type="text" className="itar-small-input" value={form.district} onChange={e => update("district", e.target.value)} /> जिल्ला {MUNICIPALITY.name}
          वडा नं.
          <input type="text" className="itar-tiny-input" value={form.ward} onChange={e => update("ward", e.target.value)} /> मा स्थापना भई संचालन भई रहेको
          <input type="text" className="itar-medium-input" value={form.industry_name} onChange={e => update("industry_name", e.target.value)} /> उद्योग देखाएको कारणले स्थानान्तरण गर्नुपर्ने भएकाले सम्बन्धित निवेदनसहित यसै स्थानान्तरणको स्वीकृतिको लागि अनुरोध गर्दछु ।
        </p>

        <div className="itar-reason-block">
          <div className="itar-reason-label">उद्योग स्थानान्तर गर्नुपर्ने कारणहरू:</div>
          <textarea rows="6" className="itar-reason-textarea" value={form.reason_long} onChange={e => update("reason_long", e.target.value)} placeholder="उद्योग स्थानान्तरण कारणहरू..." />
          <div style={{ marginTop: 8 }}>
            <label>संक्षेप कारण:</label>
            <input type="text" value={form.reason_short} onChange={e => update("reason_short", e.target.value)} />
          </div>
        </div>

        <div className="itar-bottom-grid">
          <div className="itar-docs">
            <div className="itar-docs-title">संलग्न कागजातहरूः</div>
            <ol>
              <li>सञ्चालक समितिको निर्णय</li>
              <li>स्थानान्तरण हुने स्थानको विवरण</li>
              <li>प्रारम्भिक वातावरणीय परीक्षण (यदि आवश्यक)</li>
              <li>अन्य सम्बन्धित कागजात</li>
            </ol>
            <div style={{ marginTop: 8 }}>
              <label>अन्य संलग्न (विवरण):</label>
              <input type="text" value={form.attached_docs_note} onChange={e => update("attached_docs_note", e.target.value)} />
            </div>
          </div>

          <div className="itar-sign-box">
            <div className="itar-sign-title">निवेदकको :</div>
            <div className="itar-sign-field"><span>हस्ताक्षर :</span><input type="text" value={form.signer_signature} onChange={e => update("signer_signature", e.target.value)} /></div>
            <div className="itar-sign-field"><span>नाम, थर :</span><input type="text" value={form.signer_name} onChange={e => update("signer_name", e.target.value)} /></div>
            <div className="itar-sign-field"><span>पद :</span><input type="text" value={form.signer_position} onChange={e => update("signer_position", e.target.value)} /></div>
            <div className="itar-sign-field"><span>ठेगाना :</span><input type="text" value={form.signer_address} onChange={e => update("signer_address", e.target.value)} /></div>
            <div className="itar-sign-field"><span>इमेल :</span><input type="text" value={form.signer_email} onChange={e => update("signer_email", e.target.value)} /></div>
          </div>
        </div>

        <h3 className="itar-section-title">निवेदकको विवरण</h3>
        <div className="itar-applicant-box">
          <div className="itar-field"><label>निवेदकको नाम *</label><input type="text" value={form.applicant_name} onChange={e => update("applicant_name", e.target.value)} /></div>
          <div className="itar-field"><label>निवेदकको ठेगाना *</label><input type="text" value={form.applicant_address} onChange={e => update("applicant_address", e.target.value)} /></div>
          <div className="itar-field"><label>निवेदकको नागरिकता नं. *</label><input type="text" value={form.applicant_citizenship} onChange={e => update("applicant_citizenship", e.target.value)} /></div>
          <div className="itar-field"><label>निवेदकको फोन नं. *</label><input type="text" value={form.applicant_phone} onChange={e => update("applicant_phone", e.target.value)} /></div>
        </div>

        <div className="itar-submit-row">
          <button className="itar-submit-btn" type="submit" disabled={submitting}>{submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className={`itar-message ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}
      </form>

      <footer className="itar-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}
