// DClassConstructionBusinessLicense.jsx
import React, { useState } from "react";
import "./DClassConstructionBusinessLicense.css";

const DClassConstructionBusinessLicense = () => {
  const [form, setForm] = useState({
    license_no: "७/२०८२/८३",
    fiscal_year: "२०८२/८३",
    issue_date: new Date().toISOString().slice(0, 10), // ISO-like yyyy-mm-dd
    business_name: "",
    office_address: "",
    firm_or_company: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    signatory_name: "",
    signatory_position: "",
    signatory_seal: "",
    signatory_date: "2082-08-06",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      // Your generic route expects POST /api/forms/:formKey
      const res = await fetch("/api/forms/d-class-construction-business-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    <form className="construction-license-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घ वर्गको निर्माण व्यवसाय इजाजत पत्र ।
        <span className="top-right-bread">व्यापार / व्यवसाय &gt; घ वर्गको निर्माण व्यवसाय इजाजत पत्र</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data & Photo Box --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>इजाजत पत्र नं :
            <input type="text" className="line-input medium-input" value={form.license_no} onChange={update("license_no")} />
          </p>
          <p>आ.व. :
            <input type="text" className="line-input medium-input" value={form.fiscal_year} onChange={update("fiscal_year")} />
          </p>
          <p>मिति :
            <input type="date" className="line-input medium-input" value={form.issue_date} onChange={update("issue_date")} />
          </p>
        </div>

        <div className="meta-right">
          <div className="photo-box" aria-hidden>
            निवेदकको दुबै कान देखिने पासपोर्ट साइजको फोटो
            {/* If you later add file upload, replace this with <input type="file"> and update backend */}
          </div>
        </div>
      </div>

      {/* --- Certificate Title --- */}
      <div className="certificate-title-section">
        <h3 className="underline-text">'घ' वर्गको निर्माण व्यवसाय इजाजत पत्र</h3>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          ...प्रचलित कानुनको परिधिभित्र रही निर्माण व्यवसाय सञ्चालन गर्न
          <input type="text" className="line-input long-input" value={form.business_name} onChange={update("business_name")} placeholder="व्यवसाय/व्यवसायीको नाम" required /> स्थित कार्यालय
          <input type="text" className="line-input long-input" value={form.office_address} onChange={update("office_address")} placeholder="कार्यालय ठेगाना" required />
          फर्म वा कम्पनीलाई
          <input type="text" className="inline-select" value={form.firm_or_company} onChange={update("firm_or_company")} placeholder="फर्म वा कम्पनी" />
          "घ" वर्गको इजाजतपत्र प्रदान गरिएको छ।
        </p>
      </div>

      {/* --- Bottom (Signature) --- */}
      <div className="bottom-section">
        <div className="big-letter-box"><span>घ</span></div>

        <div className="signature-details">
          <p className="bold-text">इजाजतपत्र दिनेको :</p>

          <div className="sig-row">
            <label>दस्तखत :</label>
            <input type="text" className="line-input medium-input" value={form.signatory_name} onChange={update("signatory_name")} />
          </div>

          <div className="sig-row">
            <label>नाम : <span className="red">*</span></label>
            <input type="text" className="line-input medium-input" value={form.signatory_name} onChange={update("signatory_name")} required />
          </div>

          <div className="sig-row">
            <label>पद : <span className="red">*</span></label>
            <input type="text" className="line-input medium-input" value={form.signatory_position} onChange={update("signatory_position")} required />
          </div>

          <div className="sig-row">
            <label>छाप:</label>
            <input type="text" className="line-input medium-input" value={form.signatory_seal} onChange={update("signatory_seal")} />
          </div>

          <div className="sig-row">
            <label>मिति :</label>
            <input type="date" className="line-input medium-input" value={form.signatory_date} onChange={update("signatory_date")} />
          </div>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_name} onChange={update("applicant_name")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_address} onChange={update("applicant_address")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_phone} onChange={update("applicant_phone")} />
          </div>
        </div>
      </div>

      {/* --- Notes / Footer Action --- */}
      <div style={{ marginTop: 12 }}>
        <label>नोट / अतिरिक्त जानकारी</label>
        <textarea className="full-width-textarea" rows="3" value={form.notes} onChange={update("notes")} />
      </div>

      <div className="form-footer" style={{ marginTop: 12 }}>
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
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

export default DClassConstructionBusinessLicense;
