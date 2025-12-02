import React, { useState } from "react";
import "./OpenFormatTippani.css";

const FORM_KEY = "open-format-tippani";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const OpenFormatTippani = () => {

  const [form, setForm] = useState({
    date: "",
    addressee: "",
    subject: "",
    body_text: "",
    archive: false,
    approve: false,
    signature_name: "",
    signature_designation: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: ""
  });

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: value }));
  };

  function validate() {
    if (!form.date) return "Please provide a valid date (YYYY-MM-DD)";
    if (!form.subject) return "Subject is required.";
    if (!form.addressee) return "Addressee is required.";
    return null;
  }

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
        setMsg({ type: "error", text: body.message || "Error submitting form" });
      } else {
        setMsg({ type: "success", text: "Saved successfully" });
      }
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tippani-container" onSubmit={handleSubmit}>

      <div className="top-bar-title">
        टिप्पणी
        <span className="top-right-bread">खुला ढाँचा &gt; टिप्पणी</span>
      </div>

      <div className="form-header-section">
        <div className="header-logo">
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>

        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
          <h3 className="certificate-title red-text">टिप्पणी र आदेश</h3>
        </div>
      </div>

      <div className="date-section">
        <label>मिति :</label>
        <input type="date" value={form.date} onChange={update("date")} />
      </div>

      <div className="addressee-subject-section">
        <div className="addressee-row">
          <span>श्रीमान्</span>
          <input type="text" className="line-input large-input" onChange={update("addressee")} />
        </div>

        <div className="subject-block">
          <label>विषय: <span className="red">*</span></label>
          <input type="text" className="line-input large-input" onChange={update("subject")} />
        </div>
      </div>

      <div className="editor-area">
        <div className="rich-editor-mock">
          <div className="editor-toolbar">
            <span className="tool-btn">File</span>
            <span className="tool-btn">Edit</span>
            <span className="tool-btn">View</span>
            <span className="tool-btn">Insert</span>
            <span className="tool-btn">Format</span>
          </div>

          <textarea
            className="editor-textarea"
            rows="10"
            placeholder="Write notes..."
            value={form.body_text}
            onChange={update("body_text")}
          ></textarea>
        </div>
      </div>

      <div className="checkbox-options">
        <input type="checkbox" id="archive" checked={form.archive} onChange={update("archive")} />
        <label htmlFor="archive">अभिलेख गर्नुहोस्</label>

        <input type="checkbox" id="approve" className="ml-20" checked={form.approve} onChange={update("approve")} />
        <label htmlFor="approve">स्वीकृत गर्नुपर्ने</label>
      </div>

      <div className="signature-section">
        <div className="signature-block">
          <input
            type="text"
            placeholder="नाम"
            className="line-input full-width-input"
            onChange={update("signature_name")}
          />

          <select className="designation-select" onChange={update("signature_designation")}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
          </select>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>

        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" onChange={update("applicant_name")} className="detail-input bg-gray" />
          </div>

          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" onChange={update("applicant_address")} className="detail-input bg-gray" />
          </div>

          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" onChange={update("applicant_citizenship_no")} className="detail-input bg-gray" />
          </div>

          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" onChange={update("applicant_phone")} className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "Saving..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && (
        <div style={{ color: msg.type === "error" ? "red" : "green", marginTop: 10 }}>
          {msg.text}
        </div>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>

    </form>
  );
};

export default OpenFormatTippani;
