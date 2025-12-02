// src/pages/citizenship/NepaliLanguage.jsx
import React, { useState } from "react";
import "./NepaliLanguage.css";

const FORM_KEY = "nepali-language"; // use this in forms.json and backend route
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

// helper: convert Devanagari digits to ASCII digits
function devanagariToAscii(s = "") {
  if (!s) return s;
  const map = { '०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9' };
  return s.replace(/[०-९]/g, (d) => map[d] || d);
}

const NepaliLanguage = () => {
  const [form, setForm] = useState({
    applicant_full_name: "",
    issued_date_nepali: "२०८२-०८-०६", // sample
    issued_date_ad: "", // ISO date yyyy-mm-dd — required for DB
    issue_district: "",
    full_name_en: "",
    sex: "पुरुष",
    marriage_date_nepali: "",
    marriage_date_ad: "",
    permanent_district: "",
    permanent_municipality: "",
    permanent_ward: "",
    temporary_district: "",
    temporary_municipality: "",
    temporary_ward: "",
    father_name: "",
    mother_name: "",
    husband_name: "",
    birth_place: "",
    birth_date_nepali: "",
    birth_date_ad: "",
    angikrit_reason: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  // prepare payload: convert devanagari digits -> ascii in date strings (but DO NOT convert BS->AD)
  // The important part: you MUST send date_ad in ISO (YYYY-MM-DD). If you want BS->AD conversion, do it server-side (example provided below).
  const preparePayload = () => {
    const payload = { ...form };

    // normalize Nepali-digit date fields to ASCII so they can be stored as text (if you want)
    // keep originals too
    if (payload.issued_date_nepali) {
      payload.issued_date_nepali_ascii = devanagariToAscii(payload.issued_date_nepali);
    }
    if (payload.birth_date_nepali) {
      payload.birth_date_nepali_ascii = devanagariToAscii(payload.birth_date_nepali);
    }
    if (payload.marriage_date_nepali) {
      payload.marriage_date_nepali_ascii = devanagariToAscii(payload.marriage_date_nepali);
    }

    // IMPORTANT: DB DATE column expects ISO AD date (yyyy-mm-dd) — ensure date_ad fields are provided
    // If user filled Nepali date only, you must convert BS->AD separately (not implemented here).
    // We'll include date_ad fields exactly as set in form; backend will validate.
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Basic client-side validation: require issued_date_ad if you plan to store a DATE column
    if (!form.issued_date_ad) {
      setMessage({ type: "error", text: "कृपया 'मिति (AD)' मा ISO मिति (YYYY-MM-DD) राख्नुहोस् — MySQL DATE फरम्याट हो।" });
      return;
    }

    setLoading(true);
    try {
      const payload = preparePayload();
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: body.message || JSON.stringify(body) });
      } else {
        setMessage({ type: "success", text: `Saved (id: ${body.id || "unknown"})` });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="angikrit-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        अंगिकृत नागरिकता सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; अंगिकृत नागरिकता सिफारिस</span>
      </div>

      <div className="application-form-grid">
        <div className="grid-item full-width-grid">
          <label>पूरा नाम :</label>
          <input type="text" value={form.applicant_full_name} onChange={update("applicant_full_name")} className="dotted-input long-input" required />

          <label>जारी मिति (नेपाली)</label>
          <input type="text" value={form.issued_date_nepali} onChange={update("issued_date_nepali")} className="dotted-input medium-input" />

          <label>जारी मिति (AD, YYYY-MM-DD) *</label>
          <input type="date" value={form.issued_date_ad} onChange={update("issued_date_ad")} className="dotted-input medium-input" required />

          <label>जिल्ला:</label>
          <input type="text" value={form.issue_district} onChange={update("issue_district")} className="dotted-input medium-input" />
        </div>

        <div className="grid-item full-width-grid">
          <label>लिङ्ग / Sex :</label>
          <select value={form.sex} onChange={update("sex")} className="inline-select">
            <option>पुरुष</option>
            <option>महिला</option>
            <option>अन्य</option>
          </select>

          <label>जन्म मिति (नेपाली)</label>
          <input type="text" value={form.birth_date_nepali} onChange={update("birth_date_nepali")} className="dotted-input medium-input" />

          <label>जन्म मिति (AD YYYY-MM-DD)</label>
          <input type="date" value={form.birth_date_ad} onChange={update("birth_date_ad")} className="dotted-input medium-input" />

          <label>जन्म स्थान</label>
          <input type="text" value={form.birth_place} onChange={update("birth_place")} className="dotted-input medium-input" />
        </div>

        <div className="grid-item full-width-grid">
          <h4>ठेगाना (स्थायी / अस्थायी)</h4>
          <input type="text" placeholder="स्थायी जिल्ला" value={form.permanent_district} onChange={update("permanent_district")} className="dotted-input medium-input" />
          <input type="text" placeholder="स्थायी गाउँ/नगर" value={form.permanent_municipality} onChange={update("permanent_municipality")} className="dotted-input medium-input" />
          <input type="text" placeholder="वडा नं." value={form.permanent_ward} onChange={update("permanent_ward")} className="dotted-input tiny-input" />

          <input type="text" placeholder="अस्थायी जिल्ला" value={form.temporary_district} onChange={update("temporary_district")} className="dotted-input medium-input" />
          <input type="text" placeholder="अस्थायी गाउँ/नगर" value={form.temporary_municipality} onChange={update("temporary_municipality")} className="dotted-input medium-input" />
          <input type="text" placeholder="वडा नं." value={form.temporary_ward} onChange={update("temporary_ward")} className="dotted-input tiny-input" />
        </div>

        <div className="grid-item full-width-grid">
          <h4>बाबु / आमाको नाम</h4>
          <input type="text" placeholder="बाबुको नाम" value={form.father_name} onChange={update("father_name")} className="dotted-input medium-input" />
          <input type="text" placeholder="आमाको नाम" value={form.mother_name} onChange={update("mother_name")} className="dotted-input medium-input" />
          <input type="text" placeholder="पतिको नाम (यदि लागु)" value={form.husband_name} onChange={update("husband_name")} className="dotted-input medium-input" />
        </div>

        <div className="grid-item full-width-grid">
          <h4>अंगीकृत नागरिकताको विवरण</h4>
          <input type="text" placeholder="कारण" value={form.angikrit_reason} onChange={update("angikrit_reason")} className="dotted-input long-input" />
          <label>विवाह मिति (नेपाली)</label>
          <input type="text" value={form.marriage_date_nepali} onChange={update("marriage_date_nepali")} className="dotted-input medium-input" />
          <label>विवाह मिति (AD)</label>
          <input type="date" value={form.marriage_date_ad} onChange={update("marriage_date_ad")} className="dotted-input medium-input" />
        </div>

        <div>
          <label>नोट्स / कैफियत</label>
          <textarea value={form.notes} onChange={update("notes")} rows={3} className="full-width-textarea" />
        </div>

      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {message && (
        <div style={{ marginTop: 8, color: message.type === "error" ? "crimson" : "green" }}>
          {message.text}
        </div>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default NepaliLanguage;
