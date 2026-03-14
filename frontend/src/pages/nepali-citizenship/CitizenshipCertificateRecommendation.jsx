// src/components/CitizenshipCertificateRecommendation.jsx
import React, { useState } from "react";
import "./CitizenshipCertificateRecommendation.css";

const FORM_KEY = "citizenship-certificate-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

const initialState = {
  full_name_np: "",
  full_name_en: "",
  sex: "पुरुष",
  dob_bs: "",
  dob_ad: "",
  birth_district_np: "",
  birth_municipality_np: "",
  birth_ward_np: "",
  birth_district_en: "",
  birth_municipality_en: "",
  birth_ward_en: "",
  permanent_district_np: "",
  permanent_municipality_np: "",
  permanent_ward_np: "",
  grandfather_name: "",
  grandfather_relation: "",
  father_name: "",
  father_address: "",
  father_citizenship_no: "",
  husband_name: "",
  husband_address: "",
  husband_citizenship_no: "",
  mother_name: "",
  mother_citizenship_no: "",
  witness_name: "",
  witness_address: "",
  witness_citizenship_no: "",
  witness_signature: "",
  declaration_text: "",
  recommender_name: "",
  recommender_designation: "",
  recommender_date: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function CitizenshipCertificateRecommendation() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (!form.full_name_np.trim()) return "पूरा नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no.trim()) return "निवेदकको नागरिकता नं. आवश्यक छ।";
    if (!form.applicant_name.trim()) return "निवेदकको नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      // Generic API expects snake_case keys matching forms.json — form already in snake_case.
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }
      setMessage({ type: "success", text: `सेभ भयो (id: ${body.id || "unknown"})` });
      // optional: reset form
      setForm(initialState);
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-rec-container" onSubmit={handleSubmit}>
      {/* Keep your layout markup — use controlled inputs (examples below) */}
      <div className="top-bar-title">
        नेपाली नागरिकताको प्रमाण पत्र पाउँ।
        <span className="top-right-bread">नागरिकता &gt; नेपाली नागरिकताको प्रमाण पत्र पाउँ</span>
      </div>

      {/* Minimal example of many fields — you'll want to expand/repeat pattern for the rest */}
      <div className="applicant-details-grid">
        <div className="row-group">
          <label>पूरा नाम : <span className="red">*</span></label>
          <input type="text" value={form.full_name_np} onChange={update("full_name_np")} className="dotted-input long-input" />
        </div>

        <div className="row-group">
          <label className="en-label">Full Name (In Block) :</label>
          <input type="text" value={form.full_name_en} onChange={update("full_name_en")} className="dotted-input long-input" />
        </div>

        <div className="row-group-split">
          <div className="split-item">
            <label>लिङ्ग :</label>
            <select value={form.sex} onChange={update("sex")}>
              <option>पुरुष</option>
              <option>महिला</option>
              <option>अन्य</option>
            </select>
          </div>

          <div className="split-item">
            <label>जन्म मिति (वि.स.) :</label>
            <input type="text" value={form.dob_bs} onChange={update("dob_bs")} className="dotted-input medium-input" />
            <label>Date of Birth (A.D.) :</label>
            <input type="date" value={form.dob_ad} onChange={update("dob_ad")} className="dotted-input medium-input" />
          </div>
        </div>

        {/* ... repeat for remaining fields; below are some key controlled inputs ... */}

        <div className="row-group-full">
          <label>बाबुको नाम, ठेगाना, नागरिकता नं :</label>
          <input type="text" value={form.father_name} onChange={update("father_name")} placeholder="बाबुको नाम" className="dotted-input medium-input" />
          <input type="text" value={form.father_address} onChange={update("father_address")} placeholder="ठेगाना" className="dotted-input medium-input" />
          <input type="text" value={form.father_citizenship_no} onChange={update("father_citizenship_no")} placeholder="नागरिकता नं" className="dotted-input small-input" />
        </div>

        <div className="row-group-full">
          <label>आमाको नाम, नागरिकता नं :</label>
          <input type="text" value={form.mother_name} onChange={update("mother_name")} className="dotted-input full-width" />
          <input type="text" value={form.mother_citizenship_no} onChange={update("mother_citizenship_no")} className="dotted-input full-width" />
        </div>

        <div className="witness-details-row">
          <h4 className="section-title">रोहबर</h4>
          <input type="text" value={form.witness_name} onChange={update("witness_name")} placeholder="नाम थर" />
          <input type="text" value={form.witness_address} onChange={update("witness_address")} placeholder="ठेगाना" />
          <input type="text" value={form.witness_citizenship_no} onChange={update("witness_citizenship_no")} placeholder="नागरिकता नं" />
          <input type="text" value={form.witness_signature} onChange={update("witness_signature")} placeholder="सहीछाप" />
        </div>

        <div className="declaration-text">
          <textarea value={form.declaration_text} onChange={update("declaration_text")} placeholder="घोषणा..."></textarea>
        </div>

        <div className="recommendation-footer-section">
          <input type="text" value={form.recommender_name} onChange={update("recommender_name")} placeholder="सिफारिस गर्नेको नाम" />
          <select value={form.recommender_designation} onChange={update("recommender_designation")}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
          </select>
          <input type="date" value={form.recommender_date} onChange={update("recommender_date")} />
        </div>

        <div className="applicant-details-box">
          <input type="text" value={form.applicant_name} onChange={update("applicant_name")} placeholder="निवेदकको नाम" />
          <input type="text" value={form.applicant_address} onChange={update("applicant_address")} placeholder="ठेगाना" />
          <input type="text" value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} placeholder="नागरिकता नं" />
          <input type="text" value={form.applicant_phone} onChange={update("applicant_phone")} placeholder="फोन नं" />
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" disabled={loading} className="save-print-btn">
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {message && <div style={{ color: message.type === "error" ? "crimson" : "green" }}>{message.text}</div>}
    </form>
  );
}
