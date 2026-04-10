import React, { useState } from "react";
import "./OpenApplication.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "open-application";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const OpenApplication = () => {
  const [form, setForm] = useState({
    date: "२०८२-१२-१८",
    subject: "",
    recipient_name: "",
    rel_subject: "", 
    district: "",
    municipality: "गाउँपालिका",
    ward_no: "",
    savik_address: "",
    savik_vdc: "",
    savik_ward: "",
    body_text: "",
    // Fields expected by ApplicantDetailsNp based on your screenshot
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_cit_issued_date: "", // Added from image
    applicant_nid_no: "",          // Added from image
    applicant_phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Parent update function
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
      if (res.ok) setMsg({ type: "success", text: "सुरक्षित गरियो" });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="khulla-nivedan-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          खुल्ला निवेदन
          <span className="top-right-bread">खुल्ला ढाँचा &gt; खुल्ला निवेदन</span>
        </div>

        <div className="date-row">
          मिति : <input type="text" className="dotted-input" value={form.date} onChange={update("date")} />
        </div>

        <div className="recipient-section">
          श्रीमान् <input type="text" className="dotted-input" value={form.recipient_name} onChange={update("recipient_name")} /> ज्यू,
          <br /><input type="text" className="dotted-input" style={{ width: '200px' }} /> ,
          <br /><input type="text" className="dotted-input" style={{ width: '200px' }} /> ।
        </div>

        <div className="subject-row">
          विषय:- <input type="text" className="dotted-input" style={{ width: '300px' }} value={form.subject} onChange={update("subject")} required /> ।
        </div>

        <div className="salutation">महोदय,</div>

        <div className="inline-meta-fields">
          उपरोक्त सम्बन्धमा <input type="text" className="dotted-input" value={form.rel_subject} onChange={update("rel_subject")} /> 
          जिल्ला <input type="text" className="dotted-input" value={form.district} onChange={update("district")} /> 
          <select className="inline-select" value={form.municipality} onChange={update("municipality")}>
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select> 
          वडा नं. <input type="text" className="dotted-input tiny-input" value={form.ward_no} onChange={update("ward_no")} /> 
          साविक <input type="text" className="dotted-input" value={form.savik_address} onChange={update("savik_address")} /> 
          गाविस <input type="text" className="dotted-input" value={form.savik_vdc} onChange={update("savik_vdc")} /> 
          वडा नं. <input type="text" className="dotted-input tiny-input" value={form.savik_ward} onChange={update("savik_ward")} /> मा बस्ने ।
        </div>

        {/* Editor Area */}
        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <span>File Edit View Insert Format Tools Table Help</span>
              <span className="upgrade-btn">⚡ Upgrade</span>
            </div>
            <textarea
              className="editor-textarea"
              value={form.body_text}
              onChange={update("body_text")}
              placeholder="यहाँ पत्रको व्यहोरा लेख्नुहोस्..."
            />
          </div>
        </div>

        {/* Applicant Details Component Integrated Here */}
        <div className="applicant-details-wrapper">
           <ApplicantDetailsNp formData={form} handleChange={update} />
        </div>

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

export default OpenApplication;