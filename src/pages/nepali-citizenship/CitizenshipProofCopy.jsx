// src/components/CitizenshipCertificateCopy.jsx
import React, { useState } from "react";
import "./CitizenshipCertificateCopy.css";

const FORM_KEY = "citizenship-proof-copy"; // <-- updated formKey
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipCertificateCopy() {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "", // yyyy-mm-dd
    recipient_name: "",
    recipient_address: "",
    recipient_district: "काठमाडौँ",
    municipality: "नागार्जुन",
    ward_no: "1",
    permanent_municipality: "",
    permanent_ward: "",
    applicant_relation_to: "",
    applicant_name: "",
    applicant_relation_title: "",
    subject_prpn_no: "",
    subject_issue_district: "",
    subject_issue_date: "",
    certificate_kind: "जन्म",
    permanent_address: "",
    temporary_address: "",
    municipality_name: "",
    ward_number: "",
    tol: "",
    father_name: "",
    father_dob_bs: "",
    father_relation: "",
    mother_name: "",
    mother_name_citizenship: "",
    recommender_name: "",
    recommender_position: "",
    recommender_date: "",
    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    // minimal validation
    if (!form.applicant_name && !form.applicant_name_footer) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no) return "नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      // Send snake_case payload matching forms.json columns
      const payload = { ...form };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सेभ भयो (id: ${body.id || "unknown"})` });
      // optionally reset form: setForm({...}) if desired
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ हुन सकेन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-copy-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        नेपाली नागरिकताको प्रमाण पत्र प्रतिलिपि पाऊँ।
        <span className="top-right-bread">नेपाली नागरिकता &gt; नागरिकता प्रमाण पत्र प्रतिलिपि</span>
      </div>

      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
          <p>चलानी नं. : <input value={form.reference_no} onChange={update("reference_no")} className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input type="date" value={form.date} onChange={update("date")} className="dotted-input small-input" /></p>
        </div>
      </div>

      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input value={form.recipient_name} onChange={update("recipient_name")} className="line-input medium-input" />
          <span>,</span>
          <input value={form.recipient_address} onChange={update("recipient_address")} className="line-input medium-input" />
        </div>
        <div className="addressee-row">
          <span>जिल्ला प्रशासन कार्यालय ,</span>
          <input value={form.recipient_district} onChange={update("recipient_district")} className="line-input medium-input" />
        </div>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <strong>{form.recipient_district}</strong> {form.municipality} वडा नं. {form.ward_no} मा स्थायी बसोबास गर्ने
          <input value={form.applicant_name} onChange={update("applicant_name")} className="inline-box-input medium-box" placeholder="निवेदकको नाम" /> को नाति
          <select value={form.applicant_relation_title} onChange={update("applicant_relation_title")} className="inline-select">
            <option value="">-- छान्नुहोस् --</option>
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input value={form.applicant_relation_to} onChange={update("applicant_relation_to")} className="inline-box-input medium-box" placeholder="नाति/छोरा/छोरी" />
          ले मेरो नागरिकताको प्रमाण पत्र <input value={form.subject_prpn_no} onChange={update("subject_prpn_no")} className="inline-box-input medium-box" placeholder="प्र.प.नं." />
          सोको प्रतिलिपि पाउनुहुन सिफारिस पाऊँ भनि निवेदन दिनुभएको हुँदा निजलाई नागरिकता नियमानुसार उपलब्ध गराई दिनुहुन स्थायी बसोबास प्रमाणित साथ सिफारिस गरिएको व्यहोरा अनुरोध छ।
        </p>
      </div>

      <div className="signature-section">
        <div className="signature-block">
          <input value={form.recommender_name} onChange={update("recommender_name")} className="line-input full-width-input" placeholder="सिफारिसकर्ता नाम" required />
          <select value={form.recommender_position} onChange={update("recommender_position")} className="designation-select">
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input value={form.applicant_name_footer} onChange={update("applicant_name_footer")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input value={form.applicant_address_footer} onChange={update("applicant_address_footer")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input value={form.applicant_phone} onChange={update("applicant_phone")} className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {message && <div style={{ marginTop: 10, color: message.type === "error" ? "crimson" : "green" }}>{message.text}</div>}
    </form>
  );
}
