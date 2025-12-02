// src/components/CitizenshipRecommendationOnHusbandDetail.jsx
import React, { useState } from "react";
import "./CitizenshipRecommendationOnHusbandDetail.css";

const FORM_KEY = "citizenship-recommendation-husband";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipRecommendationOnHusbandDetail() {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "", // YYYY-MM-DD
    pre_marriage_district: "",
    pre_marriage_office: "",
    pre_marriage_ward: "",
    pre_marriage_prpn_no: "",
    marriage_district: "",
    marriage_municipality: "",
    marriage_ward: "",
    marriage_date: "",
    applicant_title: "",
    applicant_name: "",
    wife_name: "",
    husband_name: "",
    husband_address: "",
    recommender_name: "",
    recommender_position: "",
    recommender_date: "",
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
    if (!form.applicant_name && !form.applicant_name_footer) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no) return "नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const v = validate();
    if (v) { setMessage({ type: "error", text: v }); return; }

    setLoading(true);
    try {
      const payload = { ...form }; // backend will stringify any objects if present
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
    } catch (err) {
      console.error("submit error", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सम्भव भएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="husband-detail-rec-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        नेपाली नागरिकताको प्रमाण पत्र ।
        <span className="top-right-bread">नागरिकता &gt; नेपाली नागरिकताको प्रमाण पत्र</span>
      </div>

      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
          <p>चलानी नं. : <input className="dotted-input small-input" value={form.reference_no} onChange={upd("reference_no")} /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input type="date" className="dotted-input small-input" value={form.date} onChange={upd("date")} /></p>
        </div>
      </div>

      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री जिल्ला प्रशासन कार्यालय,</span>
          <input className="line-input medium-input" value={form.pre_marriage_district} onChange={upd("pre_marriage_district")} placeholder="जिल्ला" />
          <span>,</span>
          <input className="line-input medium-input" value={form.pre_marriage_office} onChange={upd("pre_marriage_office")} placeholder="गा.पा./न.पा." />
        </div>
      </div>

      <div className="subject-section">
        <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा ।</span></p>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bg-gray-text">1</span> निवासी
          <select className="inline-select" value={form.applicant_title} onChange={upd("applicant_title")}>
            <option value="">-- छान्नुहोस् --</option>
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input className="inline-box-input long-box" value={form.applicant_name} onChange={upd("applicant_name")} placeholder="निवेदकको नाम" required /> को श्रीमति
          <input className="inline-box-input long-box" value={form.wife_name} onChange={upd("wife_name")} placeholder="श्रीमतीको नाम" required /> ले नेपाली नागरिकताको प्रमाण पत्र पाउनका लागि सिफारिस दिएका कारण, 
          विवाह पूर्व जिल्ला <input className="inline-box-input medium-box" value={form.pre_marriage_district} onChange={upd("pre_marriage_district")} placeholder="पूर्व जिल्ला" /> प्रशासन कार्यालय
          <input className="inline-box-input medium-box" value={form.pre_marriage_office} onChange={upd("pre_marriage_office")} placeholder="प्रशासन कार्यालय" /> वडा नं.
          <input className="inline-box-input tiny-box" value={form.pre_marriage_ward} onChange={upd("pre_marriage_ward")} placeholder="वडा" /> बाट ना.प्र.नं.
          <input className="inline-box-input medium-box" value={form.pre_marriage_prpn_no} onChange={upd("pre_marriage_prpn_no")} placeholder="ना.प्र.नं." /> को प्रमाण पत्र मिति
          <input className="inline-box-input medium-box" value={form.pre_marriage_prpn_no /* reused for example */} onChange={upd("pre_marriage_prpn_no")} placeholder="प्रमाण पत्र मिति (यदि छ)" />
          लिनुभएको र विवाह मिति <input type="date" className="inline-box-input medium-box" value={form.marriage_date} onChange={upd("marriage_date")} /> मा भएको हुँदा निजलाई पतिको घर ठेगाना राखेर प्रमाण पत्र उपलब्ध गराइदिन सिफारिस गर्दछु।
        </p>
      </div>

      <div className="signature-section">
        <div className="signature-block">
          <input className="line-input full-width-input" value={form.recommender_name} onChange={upd("recommender_name")} placeholder="सिफारिस गर्नेको नाम" required />
          <select className="designation-select" value={form.recommender_position} onChange={upd("recommender_position")}>
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
            <input className="detail-input bg-gray" value={form.applicant_name_footer} onChange={upd("applicant_name_footer")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input className="detail-input bg-gray" value={form.applicant_address_footer} onChange={upd("applicant_address_footer")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={upd("applicant_citizenship_no")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input className="detail-input bg-gray" value={form.applicant_phone} onChange={upd("applicant_phone")} />
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
