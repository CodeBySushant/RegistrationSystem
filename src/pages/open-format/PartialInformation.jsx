// PartialInformation.jsx
import React, { useState } from "react";
import "./PartialInformation.css";

const FORM_KEY = "partial-information";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const PartialInformation = () => {
  const [form, setForm] = useState({
    full_name_np: "",
    full_name_en: "",
    sex: "पुरुष",
    dob_bs: "",        // nepali BS text if you want (but DB date fields must be ISO if DATE used)
    dob_ad: "",       // ISO yyyy-mm-dd recommended
    birth_district_np: "",
    birth_municipality_np: "",
    birth_ward_np: "",
    birth_district_en: "",
    birth_municipality_en: "",
    birth_ward_en: "",
    permanent_district: "",
    permanent_municipality: "",
    permanent_ward: "",
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
    witness1_name: "",
    witness1_address: "",
    witness1_citizenship_no: "",
    witness1_signature: "",
    witness2_name: "",
    witness2_address: "",
    witness2_citizenship_no: "",
    witness2_signature: "",
    declaration_text: "",
    recommender_name: "",
    recommender_designation: "",
    recommender_date: "", // ISO date
    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_footer: "",
    applicant_phone_footer: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
  };

  const validate = () => {
    if (!form.full_name_np && !form.full_name_en) return "Please provide applicant name (Nepali or English).";
    // example: ensure recommender_date is ISO or empty
    if (form.recommender_date && !/^\d{4}-\d{2}-\d{2}$/.test(form.recommender_date)) {
      return "Recommender date must be in YYYY-MM-DD format.";
    }
    if (form.dob_ad && !/^\d{4}-\d{2}-\d{2}$/.test(form.dob_ad)) {
      return "Date of birth (AD) must be in YYYY-MM-DD format.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const body = await res.json();
      if (!res.ok) {
        setMsg({ type: "error", text: body.message || JSON.stringify(body) });
      } else {
        setMsg({ type: "success", text: `Saved (id: ${body.id || "unknown"})` });
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
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

      {/* Header */}
      <div className="form-header-details center-text">
        <h3 className="schedule-title">अनुसूची - २</h3>
        <p className="rule-text">नियम ३ को उपनियम (२) र (३) ...</p>
        <p className="form-type-title bold-text">नेपाली नागरिकताको प्रमाण पत्र पाऊँ।</p>
      </div>

      {/* Addressee */}
      <div className="addressee-section">
        <p className="bold-text">श्रीमान् प्रमुख जिल्ला अधिकारी ज्यु,</p>
        <div className="addressee-row">
          <label>जिल्ला प्रशासन कार्यालय</label>
          <input type="text" className="dotted-input medium-input" defaultValue="काठमाडौँ" onChange={update("birth_district_np")} />
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section center-text">
        <p>विषय: <span className="underline-text">नेपाली नागरिकताको प्रमाण पत्र पाऊँ।</span></p>
      </div>

      {/* Intro */}
      <div className="intro-paragraph-section">
        <p className="body-paragraph">
          महोदय, <br />
          मेरो निम्न विवरण... 
        </p>
      </div>

      {/* Main Grid - show a subset of fields (you can expand) */}
      <div className="application-form-grid">
        <div className="row-group">
          <label>पूरा नाम (ने) :</label>
          <input type="text" className="dotted-input long-input" value={form.full_name_np} onChange={update("full_name_np")} />
        </div>

        <div className="row-group">
          <label>Full Name (EN) :</label>
          <input type="text" className="dotted-input long-input" value={form.full_name_en} onChange={update("full_name_en")} />
        </div>

        <div className="row-group-split">
          <div className="split-item">
            <label>लिङ्ग :</label>
            <select value={form.sex} onChange={update("sex")} className="inline-select">
              <option>पुरुष</option>
              <option>महिला</option>
              <option>अन्य</option>
            </select>
          </div>

          <div className="split-item">
            <label>जन्म मिति (AD) :</label>
            <input type="date" className="dotted-input medium-input" value={form.dob_ad} onChange={update("dob_ad")} />
          </div>
        </div>

        <div className="row-group-full">
          <label>जन्म स्थान (जिल्ला) :</label>
          <input type="text" className="dotted-input medium-input" value={form.birth_district_np} onChange={update("birth_district_np")} />
          <label>गा.पा./न.पा. :</label>
          <input type="text" className="dotted-input medium-input" value={form.birth_municipality_np} onChange={update("birth_municipality_np")} />
          <label>वडा नं :</label>
          <input type="text" className="dotted-input tiny-input" value={form.birth_ward_np} onChange={update("birth_ward_np")} />
        </div>

        {/* Parents / relations */}
        <div className="row-group-full">
          <label>बाबुको नाम :</label>
          <input type="text" className="dotted-input medium-input" value={form.father_name} onChange={update("father_name")} />
          <label>नागरिकता नं :</label>
          <input type="text" className="dotted-input small-input" value={form.father_citizenship_no} onChange={update("father_citizenship_no")} />
        </div>

        <div className="row-group-full">
          <label>आमाको नाम :</label>
          <input type="text" className="dotted-input medium-input" value={form.mother_name} onChange={update("mother_name")} />
          <label>नागरिकता नं :</label>
          <input type="text" className="dotted-input small-input" value={form.mother_citizenship_no} onChange={update("mother_citizenship_no")} />
        </div>

        {/* Witnesses */}
        <div className="witness-details-row">
          <h4 className="section-title">रोहबर</h4>
          <div className="witness-grid">
            <div className="witness-item">
              <label>नाम थर</label>
              <input type="text" className="dotted-input full-width" value={form.witness1_name} onChange={update("witness1_name")} />
            </div>
            <div className="witness-item">
              <label>ठेगाना</label>
              <input type="text" className="dotted-input full-width" value={form.witness1_address} onChange={update("witness1_address")} />
            </div>
            <div className="witness-item">
              <label>नागरिकता नं</label>
              <input type="text" className="dotted-input full-width" value={form.witness1_citizenship_no} onChange={update("witness1_citizenship_no")} />
            </div>
          </div>
        </div>

        {/* Declaration */}
        <p className="declaration-text bold-text mt-20">
          माथि लेखिएको व्यहोरा ठिक साँचो हो झुटा ठहरे कानून बमोजिम सहुँला बुझाउँला।
        </p>

        <div className="recommendation-footer-section">
          <p className="rec-text">यस वडा कार्यालयका कर्मचारीले आवश्यक जाँचबुझ गरी ...</p>
          <div className="signature-section">
            <div className="signature-block">
              <input type="text" className="line-input full-width-input" placeholder="सिफारिस गर्नेको नाम" value={form.recommender_name} onChange={update("recommender_name")} />
              <select className="designation-select" value={form.recommender_designation} onChange={update("recommender_designation")}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
              </select>
              <input type="date" className="line-input full-width-input" value={form.recommender_date} onChange={update("recommender_date")} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer fields */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_name_footer} onChange={update("applicant_name_footer")} />
          </div>
          <div className="detail-group">
            <label>ठेगाना</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_address_footer} onChange={update("applicant_address_footer")} />
          </div>
          <div className="detail-group">
            <label>नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_citizenship_footer} onChange={update("applicant_citizenship_footer")} />
          </div>
          <div className="detail-group">
            <label>फोन नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_phone_footer} onChange={update("applicant_phone_footer")} />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && <div style={{ color: msg.type === "error" ? "crimson" : "green", marginTop: 8 }}>{msg.text}</div>}

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default PartialInformation;
