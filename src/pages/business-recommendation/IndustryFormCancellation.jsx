import React, { useState } from "react";
import "./IndustryFormCancellation.css";

export default function IndustryFormCancellation() {
  const [form, setForm] = useState({
    date: "",
    to_line1: "",
    to_line2: "",
    reg_certificate_date: "",
    province: "बागमती प्रदेश",
    district: "",
    municipality: "नागार्जुन नगरपालिका",
    ward: "",
    industry_location: "",
    started_date: "",
    closed_date: "",
    reason_short: "",
    reason_long: "",
    signature: "",
    signer_name: "",
    signer_position: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizen_no: "",
    applicant_phone: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const validate = () => {
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_citizen_no?.trim()) return "नागरिकता नं आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { alert(err); return; }
    setSubmitting(true);
    setMessage(null);

    try {
      // normalize empty strings to null
      const payload = { ...form };
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });

      const res = await fetch("/api/forms/industry-form-cancellation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessage({ type: "success", text: `सेभ भयो (id: ${data.id})` });
      // optional reset
      setForm({
        date: "",
        to_line1: "",
        to_line2: "",
        reg_certificate_date: "",
        province: "बागमती प्रदेश",
        district: "",
        municipality: "नागार्जुन नगरपालिका",
        ward: "",
        industry_location: "",
        started_date: "",
        closed_date: "",
        reason_short: "",
        reason_long: "",
        signature: "",
        signer_name: "",
        signer_position: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizen_no: "",
        applicant_phone: ""
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ufc-page">
      <header className="ufc-topbar">
        <div className="ufc-top-left">उद्योगको दर्ता खारेजी ।</div>
        <div className="ufc-top-right">डाउनलोड / उद्योगको दर्ता खारेजी</div>
      </header>

      <form className="ufc-paper" onSubmit={handleSubmit}>
        <div className="ufc-annex">
          <div>अनुसूची–३२</div>
          <div>(नियम १० को उपनियम (३) संग सम्बन्धित)</div>
          <div className="ufc-annex-title">उद्योगको दर्ता खारेजको लागि दिइने निवेदन</div>
        </div>

        <div className="ufc-date-row">
          मिति :
          <input type="text" className="ufc-date-input" value={form.date} onChange={e => update("date", e.target.value)} placeholder="YYYY-MM-DD or Nepali date" />
        </div>

        <div className="ufc-to-block">
          <span>श्री</span>
          <input type="text" className="ufc-long-input" value={form.to_line1} onChange={e => update("to_line1", e.target.value)} />
          <span>ज्यु,</span>
          <br />
          <input type="text" className="ufc-long-input second" value={form.to_line2} onChange={e => update("to_line2", e.target.value)} />
        </div>

        <div className="ufc-subject-row">
          <span className="ufc-subject-label">विषयः</span>
          <span className="ufc-subject-text">उद्योग दर्ता खारेज गरिदिने सम्बन्धमा ।</span>
        </div>

        <p className="ufc-body">
          उद्योग दर्ता प्रमाण मिति
          <input type="text" className="ufc-small-input" value={form.reg_certificate_date} onChange={e => update("reg_certificate_date", e.target.value)} />
          मा दर्ता भई {form.province}
          <input type="text" className="ufc-small-input" value={form.district} onChange={e => update("district", e.target.value)} /> जिल्ला
          <input type="text" className="ufc-small-input" value={form.municipality} onChange={e => update("municipality", e.target.value)} /> वडा नं.
          <input type="text" className="ufc-tiny-input" value={form.ward} onChange={e => update("ward", e.target.value)} /> मा स्थित यस उद्योग
          <input type="text" className="ufc-small-input" value={form.industry_location} onChange={e => update("industry_location", e.target.value)} /> मिति
          <input type="text" className="ufc-small-input" value={form.started_date} onChange={e => update("started_date", e.target.value)} /> देखि संचालन भएको र मिति
          <input type="text" className="ufc-small-input" value={form.closed_date} onChange={e => update("closed_date", e.target.value)} /> देखि उद्योग बन्द भएकोले ...
        </p>

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
              <label>कुनै छोटो कारण लेख्नुहोस्:</label>
              <input type="text" value={form.reason_short} onChange={e => update("reason_short", e.target.value)} />
            </div>
          </div>

          <div className="ufc-sign-box">
            <div className="ufc-sign-title">निवेदकको</div>
            <div className="ufc-sign-field">
              <span>हस्ताक्षर :</span>
              <input type="text" value={form.signature} onChange={e => update("signature", e.target.value)} />
            </div>
            <div className="ufc-sign-field">
              <span>नाम, थर :</span>
              <input type="text" value={form.signer_name} onChange={e => update("signer_name", e.target.value)} />
            </div>
            <div className="ufc-sign-field">
              <span>पद :</span>
              <input type="text" value={form.signer_position} onChange={e => update("signer_position", e.target.value)} />
            </div>
          </div>
        </div>

        <h3 className="ufc-section-title">निवेदकको विवरण</h3>
        <div className="ufc-applicant-box">
          <div className="ufc-field"><label>निवेदकको नाम *</label><input type="text" value={form.applicant_name} onChange={e => update("applicant_name", e.target.value)} /></div>
          <div className="ufc-field"><label>निवेदकको ठेगाना *</label><input type="text" value={form.applicant_address} onChange={e => update("applicant_address", e.target.value)} /></div>
          <div className="ufc-field"><label>निवेदकको नागरिकता नं. *</label><input type="text" value={form.applicant_citizen_no} onChange={e => update("applicant_citizen_no", e.target.value)} /></div>
          <div className="ufc-field"><label>निवेदकको फोन नं. *</label><input type="text" value={form.applicant_phone} onChange={e => update("applicant_phone", e.target.value)} /></div>
        </div>

        <div className="ufc-submit-row">
          <button className="ufc-submit-btn" type="submit" disabled={submitting}>{submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className={`ufc-message ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}
      </form>

      <footer className="ufc-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
