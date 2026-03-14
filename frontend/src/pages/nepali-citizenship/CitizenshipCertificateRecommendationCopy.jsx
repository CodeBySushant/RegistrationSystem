// src/components/CitizenshipCertificateRecommendationCopy.jsx
import React, { useState } from "react";
import "./CitizenshipCertificateRecommendationCopy.css";

const FORM_KEY = "citizenship-certificate-copy";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipCertificateRecommendationCopy() {
  const [form, setForm] = useState({
    prpn_no: "",
    issue_district: "",
    issue_date: "",
    certificate_type: "जन्म",
    full_name_np: "",
    full_name_en: "",
    sex: "पुरुष",
    dob_bs: "",
    dob_ad: "",
    permanent_address: "",
    temporary_address: "",
    municipality: "",
    ward_no: "",
    tol: "",
    father_name: "",
    father_dob_bs: "",
    father_relation: "",
    father_address: "",
    father_citizenship_no: "",
    husband_name: "",
    husband_address: "",
    husband_citizenship_no: "",
    mother_name: "",
    mother_citizenship_no: "",
    grandfather_name: "",
    grandfather_relation: "",
    recommender_name: "",
    recommender_position: "",
    witness_name: "",
    witness_relation: "",
    reason_for_copy: "",
    office_recommendation: "",
    recommender_date: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type, text }

  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (!form.full_name_np.trim()) return "पूरा नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no.trim()) return "निवेदकको नागरिकता नं आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      // post snake_case payload (form object already uses snake_case keys)
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

      setMessage({ type: "success", text: `रेकर्ड सेभ भयो (id: ${body.id || "unknown"})` });
      // optional: reset form
      // setForm({ ...initial state... });
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-copy-container" onSubmit={handleSubmit}>
      {/* You can keep your original markup. For brevity I show crucial inputs controlled below */}
      <div className="top-bar-title">
        नागरिकता प्रमाण पत्रको प्रतिलिपि सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; नागरिकता प्रमाण पत्रको प्रतिलिपि सिफारिस</span>
      </div>

      <div className="application-form-grid">
        <div className="grid-item full-width-grid">
          <h4 className="section-title">१. नागरिकताको प्रमाण पत्रको प्रकार</h4>
          <label>प्र.प.नं. :</label>
          <input type="text" value={form.prpn_no} onChange={update("prpn_no")} className="dotted-input medium-input" />
          <label>जारी जिल्ला :</label>
          <input type="text" value={form.issue_district} onChange={update("issue_district")} className="dotted-input medium-input" />
          <label>जारी मिति :</label>
          <input type="date" value={form.issue_date} onChange={update("issue_date")} className="dotted-input medium-input" />
          <label>किसिम :</label>
          <select value={form.certificate_type} onChange={update("certificate_type")} className="inline-select">
            <option>जन्म</option>
            <option>वंशज</option>
            <option>अंगीकृत</option>
          </select>
        </div>

        <div className="grid-item full-width-grid">
          <h4 className="section-title">२. निवेदकको विवरण</h4>
          <label>पूरा नाम, थर :</label>
          <input type="text" value={form.full_name_np} onChange={update("full_name_np")} className="dotted-input long-input" required />
          <label>FULL NAME (IN BLOCK) :</label>
          <input type="text" value={form.full_name_en} onChange={update("full_name_en")} className="dotted-input long-input" />
          <label>जन्म मिति (वि.स.):</label>
          <input type="text" value={form.dob_bs} onChange={update("dob_bs")} className="dotted-input medium-input" />
          <label>जन्म मिति (ई.स.):</label>
          <input type="date" value={form.dob_ad} onChange={update("dob_ad")} className="dotted-input medium-input" />
          <label>लिङ्ग/Sex :</label>
          <select value={form.sex} onChange={update("sex")} className="inline-select">
            <option>पुरुष</option>
            <option>महिला</option>
            <option>अन्य</option>
          </select>
        </div>

        {/* more fields - keep the same pattern (value + onChange) for all inputs in real form */}
        <div className="grid-item full-width-grid">
          <h4 className="section-title">३. ठेगाना</h4>
          <label>स्थायी ठेगाना :</label>
          <input type="text" value={form.permanent_address} onChange={update("permanent_address")} className="dotted-input long-input" />
          <label>अस्थायी ठेगाना :</label>
          <input type="text" value={form.temporary_address} onChange={update("temporary_address")} className="dotted-input long-input" />
          <label>गाउँपालिका/नगरपालिका :</label>
          <input type="text" value={form.municipality} onChange={update("municipality")} className="dotted-input medium-input" />
          <label>वडा नं :</label>
          <input type="text" value={form.ward_no} onChange={update("ward_no")} className="dotted-input tiny-input" />
          <label>टोल :</label>
          <input type="text" value={form.tol} onChange={update("tol")} className="dotted-input medium-input" />
        </div>

        {/* relationship, recommender, witness, reason etc follow same pattern */}
        <div className="grid-item full-width-grid">
          <h4 className="section-title">५. प्रमाणित गर्ने व्यक्ति</h4>
          <label>सिफारिस गर्ने :</label>
          <input type="text" value={form.recommender_name} onChange={update("recommender_name")} className="dotted-input long-input" />
          <label>पद :</label>
          <input type="text" value={form.recommender_position} onChange={update("recommender_position")} className="dotted-input medium-input" />
          <label>साक्षी :</label>
          <input type="text" value={form.witness_name} onChange={update("witness_name")} className="dotted-input long-input" />
          <label>नाता:</label>
          <input type="text" value={form.witness_relation} onChange={update("witness_relation")} className="dotted-input small-input" />
        </div>

        <div className="grid-item full-width-grid">
          <h4 className="section-title">६. कारण र निर्णय</h4>
          <label>प्रतिलिपि पाउने कारण :</label>
          <input type="text" value={form.reason_for_copy} onChange={update("reason_for_copy")} className="dotted-input long-input" />
          <label>कार्यालयको सिफारिस :</label>
          <input type="text" value={form.office_recommendation} onChange={update("office_recommendation")} className="dotted-input long-input" />
        </div>

        <div className="grid-item full-width-grid">
          <label>निवेदकको नाम</label>
          <input type="text" value={form.applicant_name} onChange={update("applicant_name")} className="detail-input bg-gray" />
          <label>निवेदकको ठेगाना</label>
          <input type="text" value={form.applicant_address} onChange={update("applicant_address")} className="detail-input bg-gray" />
          <label>निवेदकको नागरिकता नं.</label>
          <input type="text" value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} className="detail-input bg-gray" />
          <label>निवेदकको फोन नं.</label>
          <input type="text" value={form.applicant_phone} onChange={update("applicant_phone")} className="detail-input bg-gray" />
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {message && <div style={{ marginTop: 10, color: message.type === "error" ? "crimson" : "green" }}>{message.text}</div>}
    </form>
  );
}
