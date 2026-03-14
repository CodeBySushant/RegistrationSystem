// src/pages/PassbookOfConstructionWork.jsx
import React, { useState } from "react";
import "./PassbookOfConstructionWork.css";

const FORM_KEY = "passbook-construction-work";
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => {
  // placeholder default date in YYYY-MM-DD (you can change to Nepali date conversion if needed)
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const PassbookOfConstructionWork = () => {
  const [form, setForm] = useState({
    reg_date: todayIso(),
    business_name: "",
    owner_name: "",
    phone: "",
    work_description: "",
    remarks: "",
    scan_filename: "", // we'll set filename from input; consider proper file upload later
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const update = (k) => (e) => {
    const v = e.target.type === "file" ? (e.target.files[0] ? e.target.files[0].name : "") : e.target.value;
    setForm((s) => ({ ...s, [k]: v }));
  };

  const validate = () => {
    // simple required checks
    if (!form.business_name.trim()) return "व्यवसाय वा फार्मको नाम आवश्यक छ।";
    if (!form.owner_name.trim()) return "व्यवसाय वा फार्मको मालिक आवश्यक छ।";
    if (!form.phone.trim()) return "टेलिफोन नं. आवश्यक छ।";
    if (!form.work_description.trim()) return "कार्यको विवरण आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(`Server: ${info || `HTTP ${res.status}`}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${body.id || "unknown"})` });
      // reset or keep form as needed:
      setForm((s) => ({ ...s, business_name: "", owner_name: "", phone: "", work_description: "", remarks: "", scan_filename: "", notes: "" }));
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save" });
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="passbook-container" onSubmit={handleSubmit}>
      <div className="top-bar-header">
        <h1>निर्माण कार्यको पासबुक ।</h1>
        <button type="button" className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      <div className="form-card">
        <div className="form-group-row">
          <label className="form-label">दर्ताको मिति</label>
          <div className="input-wrapper">
            <input type="date" value={form.reg_date} onChange={update("reg_date")} className="form-input" />
          </div>
        </div>

        <div className="form-group-row">
          <label className="form-label">व्यवसाय वा फार्मको नाम</label>
          <div className="input-wrapper">
            <input type="text" className="form-input" value={form.business_name} onChange={update("business_name")} required />
            <span className="required-asterisk">*</span>
          </div>
        </div>

        <div className="form-group-row">
          <label className="form-label">व्यवसाय वा फार्मको मालिक</label>
          <div className="input-wrapper">
            <input type="text" className="form-input" value={form.owner_name} onChange={update("owner_name")} required />
            <span className="required-asterisk">*</span>
          </div>
        </div>

        <div className="form-group-row">
          <label className="form-label">टेलिफोन नं.</label>
          <div className="input-wrapper">
            <input type="tel" className="form-input" value={form.phone} onChange={update("phone")} required />
            <span className="required-asterisk">*</span>
          </div>
        </div>

        <div className="form-group-row">
          <label className="form-label">कार्यको विवरण</label>
          <div className="input-wrapper">
            <input type="text" className="form-input" value={form.work_description} onChange={update("work_description")} required />
            <span className="required-asterisk">*</span>
          </div>
        </div>

        <div className="form-group-row">
          <label className="form-label">कैफियत</label>
          <div className="input-wrapper">
            <input type="text" className="form-input" value={form.remarks} onChange={update("remarks")} />
          </div>
        </div>

        <div className="form-group-row">
          <label className="form-label">स्क्यान (फाइल नाम मात्र)</label>
          <div className="input-wrapper file-upload-wrapper">
            <input type="file" id="scanFile" className="file-input" onChange={update("scan_filename")} />
            <label htmlFor="scanFile" className="file-label-text">
              <span className="choose-file-btn">Choose File</span> {form.scan_filename || "No file chosen"}
            </label>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ गर्नुहोस"}
        </button>
      </div>

      {message && (
        <div style={{ marginTop: 12, color: message.type === "error" ? "crimson" : "green" }}>
          {message.text}
        </div>
      )}

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default PassbookOfConstructionWork;
