import React, { useState } from "react";
import "./NepaliLanguage.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "nepali-language";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const NepaliLanguage = () => {
  const [form, setForm] = useState({
    patra_sankhya: "२०८२/८३",
    chalani_no: "",
    date_nepali: "२०८२-१२-१८",
    subject: "",
    recipient_name: "",
    body_text: "",
    bodartha: "",
    signatory_name: "",
    signatory_designation: "",
    // Applicant details (passed to ApplicantDetailsNp)
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setMessage({ type: "success", text: "सफलपूर्वक सुरक्षित गरियो" });
    } catch (err) {
      setMessage({ type: "error", text: "त्रुटि भयो" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="angikrit-container">
      <div className="top-bar-title">
        नेपाली भाषामा ।
        <span className="top-right-bread">खुला ढाँचा &gt; नेपाली प्रपत्र</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Header Section */}
        <header className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">{MUNICIPALITY.ward} नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </header>

        {/* Metadata Row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <div className="meta-item">
              पत्र संख्या : <input type="text" className="dotted-input" value={form.patra_sankhya} onChange={update("patra_sankhya")} />
            </div>
            <div className="meta-item">
              चलानी नं. : <input type="text" className="dotted-input" value={form.chalani_no} onChange={update("chalani_no")} />
            </div>
          </div>
          <div className="meta-right">
            <div className="meta-item">
              मिति : <input type="text" className="dotted-input" value={form.date_nepali} onChange={update("date_nepali")} />
            </div>
            <p className="nepali-date-string">ने.सं. ११४६ चौलागा, २४ शनिबार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          विषय: 
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input type="text" className="dotted-input medium-input" value={form.subject} onChange={update("subject")} required />
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            श्री 
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" className="dotted-input long-input" value={form.recipient_name} onChange={update("recipient_name")} required />
            </div>
          </div>
          <div className="addressee-row"><input type="text" className="dotted-input long-input" /></div>
          <div className="addressee-row"><input type="text" className="dotted-input long-input" /></div>
        </div>

        {/* Rich Editor Area Mockup */}
        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <span>Write Here: </span>
              <span className="upgrade-btn">⚡ Upgrade</span>
            </div>
            <textarea 
               className="editor-textarea" 
               value={form.body_text} 
               onChange={update("body_text")} 
               placeholder="यहाँ पत्रको विवरण लेख्नुहोस्..."
            />
            <div className="word-count"> {(form.body_text || "").length} words </div>
          </div>
        </div>

        {/* Checkbox and Bodartha */}
        <div className="extra-options">
           <label><input type="checkbox" /> अर्को थप्नुहोस्</label>
        </div>

        {/* Signature and Designation Area */}
        <div className="signature-container">
           <div className="signature-block">
              <div className="inline-input-wrapper">
                <span className="input-required-star">*</span>
                <input type="text" className="dotted-input" value={form.signatory_name} onChange={update("signatory_name")} placeholder="दस्तखत" required />
              </div>
              <select className="designation-select" value={form.signatory_designation} onChange={update("signatory_designation")}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
           </div>
        </div>

        <div className="bodartha-section">
           बोधार्थ:- <textarea className="full-width-textarea" value={form.bodartha} onChange={update("bodartha")} rows={2} />
        </div>

        {/* Applicant Details Component */}
        <ApplicantDetailsNp formData={form} handleChange={update} />

        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default NepaliLanguage;