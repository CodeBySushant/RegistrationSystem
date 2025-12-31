// src/components/RamanaPatra.jsx
import React, { useState } from "react";
import "./RamanaPatra.css";

const FORM_KEY = "ramana-patra";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function RamanaPatra() {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD

    addressee_name: "",
    addressee_line2: "",

    decision_no: "",
    decision_date: "",

    permit_for: "",
    permit_quantity: "",
    contractor_name: "",
    contractor_contact: "",

    amount_total: "",
    amount_to_withdraw: "",
    amount_in_words: "",
    deadline_days: 7,
    remarks: "",

    signatory_name: "",
    signatory_position: "",

    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_no: "",
    applicant_phone: "",

    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const upd = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (!form.addressee_name) return "प्राप्तकर्ता (addressee)को नाम आवश्यक छ।";
    if (!form.amount_to_withdraw) return "निकासा रकम आवश्यक छ।";
    if (!form.signatory_name) return "सही/दस्तखत आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const v = validate();
    if (v) { setMessage({ type: "error", text: v }); return; }

    setLoading(true);
    try {
      // backend will stringify arrays/objects automatically if present.
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error(body.message || JSON.stringify(body) || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सफल—ID: ${body.id || "unknown"}` });
      // optionally reset form here if you want
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="ramana-patra-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        रमाना पत्र ।
        <span className="top-right-bread">आर्थिक प्रबेश &gt; रमाना पत्र</span>
      </div>

      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="logo" /></div>
        <div className="header-text">
          <h1>नागार्जुन नगरपालिका</h1>
          <h2>१ नं. वडा कार्यालय</h2>
          <p>नागार्जुन, काठमाडौँ</p>
        </div>
      </div>

      <div className="meta-data-row">
        <div>
          <label>पत्र संख्या:</label>
          <input value={form.letter_no} onChange={upd("letter_no")} />
        </div>
        <div>
          <label>चलानी नं.:</label>
          <input value={form.reference_no} onChange={upd("reference_no")} />
        </div>
        <div>
          <label>मिति:</label>
          <input type="date" value={form.date} onChange={upd("date")} />
        </div>
      </div>

      <div className="main-content-section">
        <div className="addressee-section">
          <label>श्री:</label>
          <input value={form.addressee_name} onChange={upd("addressee_name")} placeholder="प्राप्तकर्ता नाम" />
          <input value={form.addressee_line2} onChange={upd("addressee_line2")} placeholder="additional line" />
        </div>

        <div className="body-paragraph">
          <p>
            यस कार्यालयका मिति 
            <input type="date" value={form.decision_date} onChange={upd("decision_date")} style={{marginLeft:6, marginRight:6}} />
            को निर्णय नं 
            <input value={form.decision_no} onChange={upd("decision_no")} style={{width:120}} /> ले स्वीकृत भई&nbsp;
            <input value={form.permit_for} onChange={upd("permit_for")} placeholder="कार्य/वस्तु" /> का लागि 
            <input value={form.permit_quantity} onChange={upd("permit_quantity")} placeholder="परिमाण" /> को 
            <input value={form.contractor_name} onChange={upd("contractor_name")} placeholder="नाम" /> (फोन: 
            <input value={form.contractor_contact} onChange={upd("contractor_contact")} placeholder="फोन" />) को नाममा जम्मा भएको रकम 
            <input value={form.amount_total} onChange={upd("amount_total")} placeholder="कुल रकम" /> मध्ये रु 
            <input value={form.amount_to_withdraw} onChange={upd("amount_to_withdraw")} placeholder="निकासा रकम" /> 
            (अक्षरेपी रु <input value={form.amount_in_words} onChange={upd("amount_in_words")} placeholder="अक्षरेपी" /> ) रकम आजको मितिदेखि 
            <input type="number" value={form.deadline_days} onChange={upd("deadline_days")} style={{width:70}} /> दिन भित्र निकासा गरि लिनुहुन...
          </p>
        </div>

        <div className="editor-section">
          <h4>कैफियत :</h4>
          <textarea className="editor-textarea" rows={6} value={form.remarks} onChange={upd("remarks")} />
        </div>

        <div className="signature-section">
          <input value={form.signatory_name} onChange={upd("signatory_name")} placeholder="दस्तखत/नाम" required />
          <select value={form.signatory_position} onChange={upd("signatory_position")}>
            <option value="">पद छान्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
          </select>
        </div>

        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div>
            <label>नाम</label>
            <input value={form.applicant_name_footer} onChange={upd("applicant_name_footer")} />
          </div>
          <div>
            <label>ठेगाना</label>
            <input value={form.applicant_address_footer} onChange={upd("applicant_address_footer")} />
          </div>
          <div>
            <label>नागरिकता नं.</label>
            <input value={form.applicant_citizenship_no} onChange={upd("applicant_citizenship_no")} />
          </div>
          <div>
            <label>फोन</label>
            <input value={form.applicant_phone} onChange={upd("applicant_phone")} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Notes</label>
        <textarea rows={2} value={form.notes} onChange={upd("notes")} />
      </div>

      <div className="form-footer" style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>{loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {message && (
        <div style={{ marginTop: 8, color: message.type === "error" ? "crimson" : "green" }}>
          {message.text}
        </div>
      )}
    </form>
  );
}
