// OpenApplication.jsx
import React, { useState } from "react";
import "./OpenApplication.css";

const FORM_KEY = "open-application";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const OpenApplication = () => {
  const [form, setForm] = useState({
    letter_no: "2082/83",
    ref_no: "",
    date: "",               // ISO date yyyy-mm-dd -> required for DB DATE column
    subject: "",
    addressee_name: "",
    addressee_line2: "",
    body_text: "",
    signature_designation: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  // Minimal client-side validation
  function validate() {
    if (!form.date) return "Please provide Date (use YYYY-MM-DD).";
    if (!form.subject) return "Please provide Subject.";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const v = validate();
    if (v) { setMsg({ type: "error", text: v }); return; }

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
        // optionally reset or keep values
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="open-format-english-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        Open Format
        <span className="top-right-bread">Open Format &gt; Open Format</span>
      </div>

      <div className="form-header-section">
        <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name en-text">Nagarjun Municipality</h1>
          <h2 className="ward-title en-text">1 No. Ward Office</h2>
          <p className="address-text en-text">Kathmandu, Kathmandu</p>
          <p className="province-text en-text">Bagmati Province, Nepal</p>
        </div>
      </div>

      <div className="meta-data-row">
        <div className="meta-left">
          <label className="en-label">Letter No. :</label>
          <input type="text" value={form.letter_no} onChange={update("letter_no")} className="dotted-input small-input" />
          <div className="ref-input-row">
            <label className="en-label">Ref No. :</label>
            <input type="text" value={form.ref_no} onChange={update("ref_no")} className="dotted-input small-input" />
          </div>
        </div>
        <div className="meta-right">
          <label className="en-label">Date :</label>
          <input type="date" value={form.date} onChange={update("date")} />
        </div>
      </div>

      <div className="addressee-subject-section">
        <div className="subject-block">
          <label className="en-label">Subject:</label>
          <input type="text" value={form.subject} onChange={update("subject")} className="line-input large-input" required />
        </div>

        <div className="addressee-row">
          <span className="en-label">Shree</span>
          <input type="text" value={form.addressee_name} onChange={update("addressee_name")} className="line-input long-input" />
        </div>
        <div className="addressee-row">
          <input type="text" value={form.addressee_line2} onChange={update("addressee_line2")} className="line-input long-input" />
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
            placeholder="Write body..."
            value={form.body_text}
            onChange={update("body_text")}
          />
        </div>
      </div>

      <div className="signature-section">
        <div className="signature-block">
          <select value={form.signature_designation} onChange={update("signature_designation")} className="designation-select">
            <option value="">Select Designation</option>
            <option>Ward Chairperson</option>
            <option>Ward Secretary</option>
          </select>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3 className="en-label bold-text">Applicant Details</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label className="en-label">Applicant Name</label>
            <input type="text" value={form.applicant_name} onChange={update("applicant_name")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label className="en-label">Applicant Address</label>
            <input type="text" value={form.applicant_address} onChange={update("applicant_address")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label className="en-label">Applicant Citizenship Number</label>
            <input type="text" value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label className="en-label">Applicant Phone Number</label>
            <input type="text" value={form.applicant_phone} onChange={update("applicant_phone")} className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      <div>
        <label>Notes</label>
        <textarea value={form.notes} onChange={update("notes")} rows={2} className="full-width-textarea" />
      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "Saving..." : "Save & Print"}
        </button>
      </div>

      {msg && <div style={{ marginTop: 8, color: msg.type === "error" ? "crimson" : "green" }}>{msg.text}</div>}

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default OpenApplication;
