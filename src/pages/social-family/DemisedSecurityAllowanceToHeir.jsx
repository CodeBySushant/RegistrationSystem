// src/components/DemisedSecurityAllowanceToHeir.jsx
import React, { useState } from "react";
import "./DemisedSecurityAllowanceToHeir.css";

const FORM_KEY = "demised-security-allowance-to-heir";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DemisedSecurityAllowanceToHeir = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const fd = new FormData(e.target);
      const flat = {};
      for (const [k, v] of fd.entries()) flat[k] = v;

      // group some logical parts as objects (generic controller will stringify them)
      const address = {
        province: flat.province || null,
        district: flat.district || null,
        local_unit_type: flat.local_unit_type || null,
        local_unit_name: flat.local_unit_name || null,
        ward_no: flat.ward_no || null
      };

      const deceasedBenefit = {
        deceased_name: flat.deceased_name || null,
        relation_of_applicant: flat.relation_of_applicant || null,
        bank_account_no: flat.bank_account_no || null,
        bank_name: flat.bank_name || null,
        amount_reason: flat.amount_reason || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      const payload = {
        chalani_no: flat.chalani_no || null,
        addressee_name: flat.addressee_name || null,
        addressee_line2: flat.addressee_line2 || null,
        addressee_line3: flat.addressee_line3 || null,
        address,
        deceasedBenefit,
        applicant,
        signatory_name: flat.signatory_name || null,
        signatory_designation: flat.signatory_designation || null
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved (id: ${data.id})` });
      // optionally e.target.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  // render — identical structure/classes, only added `name` attributes and form element
  return (
    <form className="demised-allowance-form" onSubmit={handleSubmit}>
      <div className="demised-allowance-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई ।
          <span className="top-right-bread">सामाजिक / पारिवारिक &gt; मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई</span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/logo.png" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* --- Meta Data (Date/Ref) --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
            <p>चलानी नं. : <input name="chalani_no" type="text" className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" type="text" className="line-input medium-input" required />
            <span className="red">*</span>
            <span>,</span>
          </div>
          <div className="addressee-row">
             <input name="addressee_line2" type="text" className="line-input medium-input" required />
             <span className="red">*</span>
          </div>
          <div className="addressee-row">
             <input name="addressee_line3" type="text" className="line-input medium-input" required />
             <span className="red">*</span>
             <span className="bold-text">काठमाडौँ</span>
             <span style={{float: 'right'}}>|</span>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">मृतकको सा.सु. भत्ता वापतको रकम उपलब्ध गराईदिने सम्बन्धमा ।</span></p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा बागमती प्रदेश 
            <input name="province" type="text" className="inline-box-input medium-box" defaultValue="काठमाडौँ" /> 
            जिल्ला <input name="district" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
            <select name="local_unit_type" className="inline-select">
                <option value="गाउँपालिका">गाउँपालिका</option>
                <option value="नगरपालिका">नगरपालिका</option>
            </select>
            वडा नं <input name="ward_no" type="text" className="inline-box-input tiny-box" defaultValue="1" />
            स्थायी घर भएका <input name="local_unit_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले मेरो 
            <input name="deceased_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नाता पर्ने 
            <input name="relation_of_applicant" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को मिति २०८२-०८-०६ मा मृत्यु भएको हुँदा निजको नाममा तहाँ बैंकको खाता नं. 
            <input name="bank_account_no" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> मा जम्मा भएको सामाजिक सुरक्षा भत्ता वापतको रकम मृतकको 
            <input name="beneficiary_relation" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नाताका ना.प्र.न. 
            <input name="beneficiary_citizenship_no" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
            <input name="beneficiary_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> लाई उपलब्ध गराइदिनुहुन सिफारिस साथ अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signatory_name" type="text" className="line-input full-width-input" required />
            <select name="signatory_designation" className="designation-select">
               <option value="">पद छनौट गर्नुहोस्</option>
               <option>वडा अध्यक्ष</option>
               <option>वडा सचिव</option>
               <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* --- Applicant Details Box --- */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {msg && (
          <div style={{ marginTop: 8, color: msg.type === "error" ? "red" : "green" }}>
            {msg.text}
          </div>
        )}

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
        </div>
      </div>
    </form>
  );
};

export default DemisedSecurityAllowanceToHeir;
