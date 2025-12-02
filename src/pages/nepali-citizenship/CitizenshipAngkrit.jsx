// src/components/CitizenshipAngkrit.jsx
import React, { useState } from "react";
import "./CitizenshipAngkrit.css";

const FORM_KEY = "citizenship-angkrit";
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

export default function CitizenshipAngkrit() {
  const [form, setForm] = useState({
    reg_no: "",
    reg_date: todayIso(),
    target_group: "जेष्ठ नागरिक (अन्य)",
    applicant_name: "",
    father_name: "",
    mother_name: "",
    gender: "पुरुष",
    birth_date: "",
    age_reach_date: "",
    address: "",
    issue_district: "",
    citizenship_no: "",
    contact_phone: "",
    signature_text: "",
    decision_date: "",
    allowance_type: "",
    id_card_no: "",
    allowance_start_fy: "",
    allowance_quarter: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // {type:'success'|'error', text: ''}

  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (!form.applicant_name.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.citizenship_no.trim()) return "नागरिकता नं. आवश्यक छ।";
    if (!form.contact_phone.trim()) return "फोन नं. आवश्यक छ।";
    return null;
  };

  // map to DB-friendly payload (snake_case)
  const toPayload = (f) => ({
    reg_no: f.reg_no || null,
    reg_date: f.reg_date || null,
    target_group: f.target_group || null,
    applicant_name: f.applicant_name || null,
    father_name: f.father_name || null,
    mother_name: f.mother_name || null,
    gender: f.gender || null,
    birth_date: f.birth_date || null,
    age_reach_date: f.age_reach_date || null,
    address: f.address || null,
    issue_district: f.issue_district || null,
    citizenship_no: f.citizenship_no || null,
    contact_phone: f.contact_phone || null,
    signature_text: f.signature_text || null,
    decision_date: f.decision_date || null,
    allowance_type: f.allowance_type || null,
    id_card_no: f.id_card_no || null,
    allowance_start_fy: f.allowance_start_fy || null,
    allowance_quarter: f.allowance_quarter || null,
    notes: f.notes || null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const payload = toPayload(form);
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
      // optionally reset: setForm({ ...initial state... });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="old-age-allowance-container" onSubmit={handleSubmit}>
      <div className="center-text">
        <h2 className="main-form-title">वृद्धा भत्ताको निवेदन।</h2>
        <div className="sub-header-text">
          <p>अनुसूची - ३ (क)</p>
          <p>(दफा ६ को उपदफा ३ सँग सम्बन्धित)</p>
        </div>
      </div>

      <div className="addressee-date-row">
        <div className="addressee-block">
          <p>श्री अध्यक्ष ज्यू,</p>
          <div className="addressee-details">
            <input type="text" value={form.reg_no} onChange={update("reg_no")} placeholder="दर्ता नं." />
            <span className="red">*</span>
            <span className="ward-text">वडा 1</span>
          </div>
        </div>

        <div className="date-block">
          <label>मिति:</label>
          <input type="date" value={form.reg_date} onChange={update("reg_date")} />
        </div>
      </div>

      <div className="subject-section center-text">
        <p>विषय: <span className="underline-text bold-text">नाम दर्ता सम्बन्धमा</span></p>
      </div>

      <div className="target-group-section">
        <label>लक्षित समूह:</label>
        <select value={form.target_group} onChange={update("target_group")}>
          <option>जेष्ठ नागरिक (दलित)</option>
          <option>जेष्ठ नागरिक (अन्य)</option>
          <option>विधवा</option>
        </select>
        <span className="small-text">(उपयुक्त कुनै एकमा चिन्ह लगाउने)</span>
      </div>

      <h3 className="section-title underline-text center-text">निवेदक</h3>

      <div className="applicant-grid">
        <div className="grid-col">
          <label>नाम, थर: *</label>
          <input type="text" value={form.applicant_name} onChange={update("applicant_name")} />

          <label>बाबुको नाम: *</label>
          <input type="text" value={form.father_name} onChange={update("father_name")} />

          <label>ठेगाना: *</label>
          <input type="text" value={form.address} onChange={update("address")} />

          <label>ना.प्र.नं.: *</label>
          <input type="text" value={form.citizenship_no} onChange={update("citizenship_no")} />

          <label>जेष्ठ नागरिकको हकमा उमेर पुग्ने मिति:</label>
          <input type="date" value={form.age_reach_date} onChange={update("age_reach_date")} />
        </div>

        <div className="grid-col">
          <label>लिङ्ग:</label>
          <select value={form.gender} onChange={update("gender")}>
            <option>पुरुष</option>
            <option>महिला</option>
            <option>अन्य</option>
          </select>

          <label>आमाको नाम: *</label>
          <input type="text" value={form.mother_name} onChange={update("mother_name")} />

          <label>जन्ममिति:</label>
          <input type="date" value={form.birth_date} onChange={update("birth_date")} />

          <label>जारी जिल्ला: *</label>
          <input type="text" value={form.issue_district} onChange={update("issue_district")} />

          <label>सम्पर्क मोवाईल नं.: *</label>
          <input type="text" value={form.contact_phone} onChange={update("contact_phone")} />
        </div>

        <div className="form-row full-span mt-20">
          <label>दस्तखत:</label>
          <input type="text" value={form.signature_text} onChange={update("signature_text")} />
        </div>
      </div>

      <div className="office-use-box mt-30">
        <h3 className="section-title center-text underline-text">कार्यालय प्रयोजनको लागि</h3>

        <div className="office-grid">
          <label>नाम दर्ता निर्णय मिति</label>
          <input type="date" value={form.decision_date} onChange={update("decision_date")} />

          <label>भत्ताको किसिम</label>
          <input type="text" value={form.allowance_type} onChange={update("allowance_type")} />

          <label>परिचय पत्र नं.</label>
          <input type="text" value={form.id_card_no} onChange={update("id_card_no")} />

          <label>भत्ता पाउन सुरु मिति: आ.व.</label>
          <input type="text" value={form.allowance_start_fy} onChange={update("allowance_start_fy")} />

          <label>कुन चौमासिक</label>
          <input type="text" value={form.allowance_quarter} onChange={update("allowance_quarter")} />
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid-footer">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" value={form.applicant_name} onChange={update("applicant_name")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" value={form.address} onChange={update("address")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" value={form.citizenship_no} onChange={update("citizenship_no")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" value={form.contact_phone} onChange={update("contact_phone")} />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="save-print-btn" type="submit">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
      </div>

      {message && <div style={{ color: message.type === "error" ? "crimson" : "green" }}>{message.text}</div>}
    </form>
  );
}
