// src/components/CitizenshipRecommendation.jsx
import React, { useState } from "react";
import "./CitizenshipRecommendation.css";

const FORM_KEY = "citizenship-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipRecommendation() {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "",
    recipient_office: "जिल्ला प्रशासन कार्यालय",
    recipient_district: "काठमाडौँ",
    husband_name: "",
    husband_prpn_no: "",
    father_name: "",
    mother_name: "",
    permanent_local_unit: "",
    ward_no: "",
    local_citizenship_type: "",
    marriage_date: "",
    local_witness_citizenship_type: "",
    relation_to_recommendee: "",
    local_second_name: "",
    photo_filename: "",
    recommender_name: "",
    recommender_position: "",
    recommender_date: "",
    signatory_name: "",
    signatory_date: "",
    signatory_position: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k) => (e) => {
    setForm(s => ({ ...s, [k]: e.target.value }));
  };

  const validate = () => {
    if (!form.applicant_name && !form.applicant_citizenship_no) return "निवेदकको नाम वा नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const payload = { ...form };
      // ensure date strings are in YYYY-MM-DD (use date inputs in UI)
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
      console.error(err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-rec-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        नेपाली नागरिकताको सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; नेपाली नागरिकताको सिफारिस</span>
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
          <span>श्री प्रमुख जिल्ला अधिकारी</span>
        </div>
        <div className="addressee-row">
          <input value={form.recipient_office} onChange={update("recipient_office")} className="line-input medium-input" /> 
          <span className="red">*</span>
          <span className="bold-text">{form.recipient_district}</span>
        </div>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          महोदय,
          <br/>
          यस नागरिकता प्रचलित विवरण रहेकोले नेपाली नागरिकताको प्रमाण पत्र पाउनको लागि सिफारिस पाउँ भनि निवेदन दिनु भएको हुँदा निज निवेदकलाई स्थायी नेपाली नागरिकताको प्रमाण पत्र उपलब्ध गराईदिन सिफारिस साथ अनुरोध गर्दछु ।
        </p>

        <div className="form-details-grid">
          <div className="detail-row">
            <label>पतिको नाम, थर, वतन :</label>
            <input value={form.husband_name} onChange={update("husband_name")} className="dotted-input medium-input" />
            <label>पतिको ना.प्र.नं.:</label>
            <input value={form.husband_prpn_no} onChange={update("husband_prpn_no")} className="dotted-input medium-input" />
          </div>

          <div className="detail-row">
            <label>बाबुको नाम, थर, वतन :</label>
            <input value={form.father_name} onChange={update("father_name")} className="dotted-input medium-input" />
            <label>आमाको नाम, थर, वतन :</label>
            <input value={form.mother_name} onChange={update("mother_name")} className="dotted-input medium-input" />
          </div>

          <div className="detail-row">
            <label>स्थायी ठेगाना :</label>
            <input value={form.permanent_local_unit} onChange={update("permanent_local_unit")} className="dotted-input medium-input" />
            <label>वडा नं. :</label>
            <input value={form.ward_no} onChange={update("ward_no")} className="dotted-input tiny-input" />
          </div>

          <div className="detail-row">
            <label>जन्म मिति :</label>
            <input type="date" value={form.date} onChange={update("date")} className="dotted-input medium-input" />
            <label>स्थानीय ठेगाना :</label>
            <input value={form.local_citizenship_type} onChange={update("local_citizenship_type")} className="dotted-input medium-input" />
          </div>

          <div className="detail-row">
            <label>विवाह मिति :</label>
            <input type="date" value={form.marriage_date} onChange={update("marriage_date")} className="dotted-input medium-input" />
            <label>रोहबर बस्नेको नागरिकताको किसिम :</label>
            <input value={form.local_witness_citizenship_type} onChange={update("local_witness_citizenship_type")} className="dotted-input medium-input" />
          </div>

          <div className="detail-row">
            <label>सिफारिस गर्न खोजेकोको नाता :</label>
            <input value={form.relation_to_recommendee} onChange={update("relation_to_recommendee")} className="dotted-input medium-input" />
            <label>स्थानीय तहको नागरिकको दोश्रो नाम :</label>
            <input value={form.local_second_name} onChange={update("local_second_name")} className="dotted-input medium-input" />
          </div>
        </div>

        {/* photo / signatures */}
        <div className="photo-signatures-grid">
          <div className="photo-box">फोटो</div>

          <div className="signatures-container">
            <div className="sig-item">
              <label>निवेदक</label>
              <div className="sig-line"></div>
            </div>
            <div className="sig-item">
              <label>सिफारिस गर्नेको सहीछाप</label>
              <div className="sig-line"></div>
            </div>
            <div className="sig-item">
              <label>दस्तखत</label>
              <div className="sig-line"></div>
            </div>
          </div>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="sig-item">
              <label>दस्तखत</label>
              <div className="sig-line"></div>
            </div>
            <div className="sig-item">
              <label>नाम:</label>
              <input value={form.signatory_name} onChange={update("signatory_name")} className="line-input full-width-input" />
            </div>
            <div className="sig-item">
              <label>मिति:</label>
              <input type="date" value={form.signatory_date} onChange={update("signatory_date")} className="line-input full-width-input" />
            </div>
            <div className="sig-item">
              <label>पद:</label>
              <select value={form.signatory_position} onChange={update("signatory_position")} className="designation-select">
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input value={form.applicant_name} onChange={update("applicant_name")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input value={form.applicant_address} onChange={update("applicant_address")} className="detail-input bg-gray" />
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
