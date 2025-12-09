import React, { useState } from "react";
import "./IndustryClosedNotify.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

export default function IndustryClosedNotify() {
  const [form, setForm] = useState({
    date: "२०८२.०७.१५",
    to_line1: MUNICIPALITY.officeLine || "", // e.g. "नगर कार्यपालिकाको कार्यालय, ..."
    to_line2: MUNICIPALITY.name || "", // e.g. "नागार्जुन नगरपालिका"
    place_text: `${MUNICIPALITY.name}, ${MUNICIPALITY.city || ""}`, // e.g. "नागार्जुन, काठमाडौं"
    place_extra: "",
    registered_date: "",
    registered_municipality: MUNICIPALITY.name || "",
    ward: MUNICIPALITY.wardNumber || "",
    industry_name: "",
    shown_reason: "",
    closure_from_date: "",
    closure_to_date: "",
    closure_effective_from: "",
    closure_effective_to: "",
    short_reason: "",
    detailed_description: "",
    attached_docs: "",
    signature: "",
    signer_name: "",
    signer_position: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizen_no: "",
    applicant_phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    // minimal validation
    if (!form.applicant_name?.trim()) {
      alert("निवेदकको नाम आवश्यक छ");
      return;
    }
    setSubmitting(true);
    setMessage(null);

    try {
      // prepare payload — keep shape matching forms.json columns
      const payload = { ...form };

      // normalize empty strings to null (optional)
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await fetch("/api/forms/industry-closed-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessage({ type: "success", text: `सेभ भयो (id: ${data.id})` });
      // reset optionally
      setForm({
        date: "",
        to_line1: "",
        to_line2: "",
        place_text: "",
        place_extra: "",
        registered_date: "",
        registered_municipality: "",
        ward: "",
        industry_name: "",
        shown_reason: "",
        closure_from_date: "",
        closure_to_date: "",
        closure_effective_from: "",
        closure_effective_to: "",
        short_reason: "",
        detailed_description: "",
        attached_docs: "",
        signature: "",
        signer_name: "",
        signer_position: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizen_no: "",
        applicant_phone: "",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ucn-page">
      <header className="ucn-topbar">
        <div className="ucn-top-left">उद्योग बन्द भएको जानकारी पत्र ।</div>
        <div className="ucn-top-right">
          अवलोकन पृष्ठ / उद्योग बन्द भएको जानकारी पत्र
        </div>
      </header>

      <form className="ucn-paper" onSubmit={handleSubmit}>
        <div className="ucn-annex">
          <div>अनुसूची–३३</div>
          <div>(नियम ९ संग सम्बन्धित)</div>
          <div className="ucn-annex-title">उद्योग बन्द भएको जानकारी पत्र</div>
        </div>

        <div className="ucn-date-row">
          मिति :
          <input
            type="text"
            className="ucn-date-input"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            placeholder="YYYY-MM-DD or Nepali date"
          />
        </div>

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
          <span>
            {MUNICIPALITY.name}, {MUNICIPALITY.city || "काठमाडौं"}
          </span>
          <input
            type="text"
            className="ucn-medium-input"
            value={form.place_extra}
            onChange={(e) => update("place_extra", e.target.value)}
          />
        </div>

        <div className="ucn-subject-row">
          <span className="ucn-subject-label">विषयः</span>
          <span className="ucn-subject-text">
            उद्योग बन्द भएको जानकारी सम्बन्धमा ।
          </span>
        </div>

        <p className="ucn-body">
          उपरोक्त विषयमा उद्योग मिति
          <input
            type="text"
            className="ucn-small-input"
            value={form.registered_date}
            onChange={(e) => update("registered_date", e.target.value)}
          />{" "}
          मा दर्ता भई
          <input
            type="text"
            className="ucn-small-input"
            value={form.registered_municipality || MUNICIPALITY.name}
            onChange={(e) => update("registered_municipality", e.target.value)}
          />{" "}
          नगरपालिका वडा नं.
          <input
            type="text"
            className="ucn-tiny-input"
            value={form.ward || MUNICIPALITY.wardNumber || ""}
            onChange={(e) => update("ward", e.target.value)}
          />{" "}
          मा स्थापना भई संचालन गर्न गराइएको परेको यस
          <input
            type="text"
            className="ucn-medium-input"
            value={form.industry_name}
            onChange={(e) => update("industry_name", e.target.value)}
          />{" "}
          उद्योग देखाएको कारणले मिति
          <input
            type="text"
            className="ucn-small-input"
            value={form.closure_from_date}
            onChange={(e) => update("closure_from_date", e.target.value)}
          />{" "}
          देखि अपरिहार्य कारणवश
          <input
            type="text"
            className="ucn-small-input"
            value={form.closure_to_date}
            onChange={(e) => update("closure_to_date", e.target.value)}
          />{" "}
          देखि बन्द गरेको भनी बुझाई दिनुको लागि अनुरोध गर्दछु / गर्दछौं ।
        </p>

        <div className="ucn-reasons">
          <div className="ucn-reasons-title">
            उद्योग बन्द हुने सम्भावित कारणहरू:
          </div>
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

        <div className="ucn-bottom-grid">
          <div className="ucn-docs">
            <div className="ucn-docs-title">संलग्न कागजातः</div>
            <ol>
              <li>
                उद्योग बन्द हुने कारण / कारणहरू स्पष्ट हुने गरी तयार गरिएको
                विस्तृत प्रतिवेदन।
              </li>
              <li>
                नियमावलीको नियम ९ को उपनियम (३) मा उल्लेखित कागजातको विवरण।
              </li>
            </ol>
            <div style={{ marginTop: 8 }}>
              <label>अन्य संलग्न: </label>
              <input
                type="text"
                value={form.attached_docs}
                onChange={(e) => update("attached_docs", e.target.value)}
              />
            </div>
          </div>

          <div className="ucn-sign-box">
            <div className="ucn-sign-caption">निवेदकको :</div>
            <div className="ucn-sign-field">
              <span>हस्ताक्षर :</span>
              <input
                type="text"
                value={form.signature}
                onChange={(e) => update("signature", e.target.value)}
              />
            </div>
            <div className="ucn-sign-field">
              <span>नाम, थर :</span>
              <input
                type="text"
                value={form.signer_name}
                onChange={(e) => update("signer_name", e.target.value)}
              />
            </div>
            <div className="ucn-sign-field">
              <span>पद :</span>
              <input
                type="text"
                value={form.signer_position}
                onChange={(e) => update("signer_position", e.target.value)}
              />
            </div>
          </div>
        </div>

        <h3 className="ucn-section-title">निवेदकको विवरण</h3>
        <div className="ucn-applicant-box">
          <div className="ucn-field">
            <label>निवेदकको नाम *</label>
            <input
              type="text"
              value={form.applicant_name}
              onChange={(e) => update("applicant_name", e.target.value)}
            />
          </div>
          <div className="ucn-field">
            <label>निवेदकको ठेगाना *</label>
            <input
              type="text"
              value={form.applicant_address}
              onChange={(e) => update("applicant_address", e.target.value)}
            />
          </div>
          <div className="ucn-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input
              type="text"
              value={form.applicant_citizen_no}
              onChange={(e) => update("applicant_citizen_no", e.target.value)}
            />
          </div>
          <div className="ucn-field">
            <label>निवेदकको फोन नं. *</label>
            <input
              type="text"
              value={form.applicant_phone}
              onChange={(e) => update("applicant_phone", e.target.value)}
            />
          </div>
        </div>

        <div className="ucn-submit-row">
          <button
            className="ucn-submit-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div
            className={`ucn-message ${
              message.type === "error" ? "error" : "success"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <footer className="ucn-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
    </div>
  );
}
