import React, { useState } from "react";
import "./NewBusinessPannumber.css";

export default function NewBusinessPannumber() {
  const [form, setForm] = useState({
    date: "",
    refLetterNo: "",
    chalaniNo: "",
    to_line1: "",
    to_line2: "",
    ward: "",
    sabik_ward: "",
    resident_name: "",
    resident_from: "",
    resident_to: "",
    firm_name: "",
    proprietor_name: "",
    proprietor_citizen_no: "",
    proprietor_address: "",
    firm_address: "",
    firm_capital: "",
    firm_purpose: "",
    notes: "",
    sign_name: "",
    sign_position: "",
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
    setSubmitting(true);
    setMessage(null);

    try {
      const payload = { ...form };
      // normalize empty strings to null to avoid column mismatch
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });

      const res = await fetch("/api/forms/new-business-pannumber", {
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
        refLetterNo: "",
        chalaniNo: "",
        to_line1: "",
        to_line2: "",
        ward: "",
        sabik_ward: "",
        resident_name: "",
        resident_from: "",
        resident_to: "",
        firm_name: "",
        proprietor_name: "",
        proprietor_citizen_no: "",
        proprietor_address: "",
        firm_address: "",
        firm_capital: "",
        firm_purpose: "",
        notes: "",
        sign_name: "",
        sign_position: "",
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
    <div className="nbp-page">
      <header className="nbp-topbar">
        <div className="nbp-top-left">नयाँ स्थायी लेखा नं.</div>
        <div className="nbp-top-right">अवलोकन पृष्ठ / नयाँ स्थायी लेखा नं.</div>
      </header>

      <form className="nbp-paper" onSubmit={handleSubmit}>
        <div className="nbp-letterhead">
          <div className="nbp-logo">
            <img alt="Emblem" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png" />
          </div>
          <div className="nbp-head-text">
            <div className="nbp-head-main">नागार्जुन नगरपालिका</div>
            <div className="nbp-head-ward">१ नं. वडा कार्यालय</div>
            <div className="nbp-head-sub">नागार्जुन, काठमाडौं<br/>बागमती प्रदेश, नेपाल</div>
          </div>
          <div className="nbp-head-meta">
            <div>मिति : <input name="date" value={form.date} onChange={e => update("date", e.target.value)} className="nbp-small-input" /></div>
            <div className="nbp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <div className="nbp-ref-row">
          <div className="nbp-ref-block"><label>पत्र संख्या :</label><input name="refLetterNo" value={form.refLetterNo} onChange={e => update("refLetterNo", e.target.value)} /></div>
          <div className="nbp-ref-block"><label>चलानी नं. :</label><input name="chalaniNo" value={form.chalaniNo} onChange={e => update("chalaniNo", e.target.value)} /></div>
        </div>

        <div className="nbp-to-block">
          <span>श्री</span>
          <input name="to_line1" value={form.to_line1} onChange={e => update("to_line1", e.target.value)} className="nbp-long-input" />
          <br />
          <input name="to_line2" value={form.to_line2} onChange={e => update("to_line2", e.target.value)} className="nbp-long-input nbp-to-second" />
        </div>

        <p className="nbp-body">
          उपर्युक्त सम्बन्धमा <span className="nbp-bold">नागार्जुन नगरपालिका</span>
          वडा नं. <input name="ward" value={form.ward} onChange={e => update("ward", e.target.value)} className="nbp-tiny-input" />
          (साबिक <input name="sabik_ward" value={form.sabik_ward} onChange={e => update("sabik_ward", e.target.value)} className="nbp-small-input" /> वडा नं.
          <input name="ward" value={form.ward} onChange={e => update("ward", e.target.value)} className="nbp-tiny-input" />) मा बस्ने श्री
          <input name="resident_name" value={form.resident_name} onChange={e => update("resident_name", e.target.value)} className="nbp-medium-input" /> ले मिति
          <input name="resident_from" value={form.resident_from} onChange={e => update("resident_from", e.target.value)} className="nbp-small-input" /> देखि
          <input name="resident_to" value={form.resident_to} onChange={e => update("resident_to", e.target.value)} className="nbp-small-input" /> सम्म व्यवसाय संचालन गर्दै आएको र उक्त व्यवसायको नाममा नयाँ स्थायी लेखा नं. प्राप्त गर्न सिफारिस गर्नु पर्ने भएकोले सिफारिस साथ अनुरोध गरिएको छ ।
        </p>

        <section className="nbp-section">
          <h3 className="nbp-subtitle">विवरण:</h3>

          <div className="nbp-field-row"><label>फर्मको नाम :</label><input name="firm_name" value={form.firm_name} onChange={e => update("firm_name", e.target.value)} className="nbp-wide-input" /></div>
          <div className="nbp-field-row"><label>प्रोपाइटरको नाम :</label><input name="proprietor_name" value={form.proprietor_name} onChange={e => update("proprietor_name", e.target.value)} className="nbp-wide-input" /></div>
          <div className="nbp-field-row"><label>प्रोपाइटरको नागरिकता नं. :</label><input name="proprietor_citizen_no" value={form.proprietor_citizen_no} onChange={e => update("proprietor_citizen_no", e.target.value)} className="nbp-medium-input" /></div>
          <div className="nbp-field-row"><label>ठेगाना :</label><input name="proprietor_address" value={form.proprietor_address} onChange={e => update("proprietor_address", e.target.value)} className="nbp-wide-input" /></div>
          <div className="nbp-field-row"><label>फर्मको ठेगाना :</label><input name="firm_address" value={form.firm_address} onChange={e => update("firm_address", e.target.value)} className="nbp-wide-input" /></div>
          <div className="nbp-field-row"><label>फर्म पूँजी :</label><input name="firm_capital" value={form.firm_capital} onChange={e => update("firm_capital", e.target.value)} className="nbp-medium-input" /></div>
          <div className="nbp-field-row"><label>फर्म उद्देश्य :</label><input name="firm_purpose" value={form.firm_purpose} onChange={e => update("firm_purpose", e.target.value)} className="nbp-wide-input" /></div>

          <div className="nbp-field-row nbp-textarea-row"><label>बोधार्थ :</label><textarea name="notes" rows="3" value={form.notes} onChange={e => update("notes", e.target.value)} className="nbp-textarea" /></div>
        </section>

        <div className="nbp-sign-top">
          <input name="sign_name" value={form.sign_name} onChange={e => update("sign_name", e.target.value)} className="nbp-sign-name" placeholder="नाम, थर" />
          <select className="nbp-post-select" value={form.sign_position} onChange={e => update("sign_position", e.target.value)}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>अध्यक्ष</option>
            <option>सचिव</option>
            <option>अधिकृत</option>
          </select>
        </div>

        <h3 className="nbp-section-title">निवेदकको विवरण</h3>
        <div className="nbp-applicant-box">
          <div className="nbp-field"><label>निवेदकको नाम *</label><input name="applicant_name" value={form.applicant_name} onChange={e => update("applicant_name", e.target.value)} /></div>
          <div className="nbp-field"><label>निवेदकको ठेगाना *</label><input name="applicant_address" value={form.applicant_address} onChange={e => update("applicant_address", e.target.value)} /></div>
          <div className="nbp-field"><label>निवेदकको नागरिकता नं. *</label><input name="applicant_citizenship" value={form.applicant_citizenship} onChange={e => update("applicant_citizenship", e.target.value)} /></div>
          <div className="nbp-field"><label>निवेदकको फोन नं. *</label><input name="applicant_phone" value={form.applicant_phone} onChange={e => update("applicant_phone", e.target.value)} /></div>
        </div>

        <div className="nbp-submit-row">
          <button className="nbp-submit-btn" type="submit" disabled={submitting}>{submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className={`nbp-message ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}
      </form>

      <footer className="nbp-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
