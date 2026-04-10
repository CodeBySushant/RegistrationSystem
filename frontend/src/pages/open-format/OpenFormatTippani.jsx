import React, { useState } from "react";
import "./OpenFormatTippani.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "open-format-tippani";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const OpenFormatTippani = () => {
  const [form, setForm] = useState({
    date: "२०८२-१२-१८",
    addressee: "",
    subject: "",
    body_text: "",
    archive: false,
    approve: false,
    signature_name: "",
    signature_designation: "",
  });

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMsg({ type: "success", text: "सफलपूर्वक सुरक्षित गरियो" });
      } else {
        const data = await res.json();
        throw new Error(data.message || "त्रुटि भयो");
      }
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tippani-outer-wrapper">
      <form className="tippani-container" onSubmit={handleSubmit}>
        {/* Top Breadcrumb Style */}
        <div className="top-bar-title">
          टिप्पणी
          <span className="top-right-bread">खुला ढाँचा &gt; टिप्पणी</span>
        </div>

        {/* Letterhead Header */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">{MUNICIPALITY.ward} नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
            <h3 className="certificate-title red-text">टिप्पणी र आदेश</h3>
          </div>
        </div>

        {/* Date on Right */}
        <div className="date-section-row">
          मिति : <input type="text" className="dotted-input" value={form.date} onChange={update("date")} />
        </div>

        {/* Addressee & Subject */}
        <div className="addressee-subject-section">
          <div className="addressee-row">
            <span>श्रीमान्</span>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" className="dotted-input large-input" value={form.addressee} onChange={update("addressee")} required />
            </div>
            <span>,</span>
          </div>

          <div className="subject-block">
            <label>विषय:</label>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input type="text" className="dotted-input large-input" value={form.subject} onChange={update("subject")} required />
            </div>
          </div>
        </div>

        {/* Rich Text Area Mockup */}
        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <div className="toolbar-left">File Edit View Insert Format Tools Table Help</div>
              <div className="upgrade-btn">⚡ Upgrade</div>
            </div>
            <textarea
              className="editor-textarea"
              value={form.body_text}
              onChange={update("body_text")}
              placeholder="यहाँ टिप्पणी लेख्नुहोस्..."
            />
            <div className="word-count">0 words</div>
          </div>
        </div>

        {/* Approval and Signature Grid */}
        <div className="checkbox-signature-grid">
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input type="checkbox" checked={form.archive} onChange={update("archive")} /> अर्को थप्नुहोस्
            </label>
            <label className="checkbox-item">
              <input type="checkbox" checked={form.approve} onChange={update("approve")} /> अर्को थप्नुहोस्
            </label>
          </div>

          <div className="approver-block">
            <label className="certifier-label">प्रमाणीत गर्ने</label>
            <div className="inline-input-wrapper full-width">
              <span className="input-required-star">*</span>
              <input type="text" className="dotted-input full-width" value={form.signature_name} onChange={update("signature_name")} required />
            </div>
            <select className="designation-select" value={form.signature_designation} onChange={update("signature_designation")}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {msg && (
          <div className={`status-msg ${msg.type === "error" ? "error-text" : "success-text"}`}>
            {msg.text}
          </div>
        )}

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
};

export default OpenFormatTippani;