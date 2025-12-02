// src/pages/social-family/EthnicIdentityRecommendation.jsx
import { useState } from 'react';
import './EthnicIdentityRecommendation.css';

const FORM_KEY = "ethnic-identity-recommendation";

/**
 * Resolve API base safely:
 * - prefer process.env (CRA / Node env)
 * - fallback to import.meta.env (Vite)
 * - final fallback empty string
 */
const API_BASE =
  (typeof process !== 'undefined' && process.env && (process.env.REACT_APP_API_BASE || process.env.API_BASE)) ||
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) ||
  '';

const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const EthnicIdentityRecommendation = () => {
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

      // logical groups (backend will stringify nested objects)
      const addressee = {
        office: flat.addressee_office || 'जिल्ला प्रशासन कार्यालय',
        district: flat.addressee_district || 'काठमाडौँ'
      };

      const residence = {
        district: flat.residence_district || 'नागार्जुन',
        municipality: flat.residence_municipality || 'नागार्जुन',
        ward_no: flat.residence_ward_no || '1'
      };

      const person = {
        title: flat.person_title || null,
        name: flat.person_name || null,
        na_pr_no: flat.na_pr_no || null,
        requested_ethnicity: flat.requested_ethnicity || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      const payload = {
        chalani_no: flat.chalani_no || null,
        addressee,
        residence,
        person,
        applicant,
        signatory_name: flat.signatory_name || null,
        signatory_designation: flat.signatory_designation || null,
        meta_date: flat.meta_date || null
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Server error');

      setMsg({ type: 'success', text: `Saved — id: ${data.id}` });
      // optionally reset form: e.target.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: 'error', text: err.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="ethnic-identity-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जातीय पहिचान सिफारिस
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; जातीय पहिचान सिफारिस</span>
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

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">जातीय पहिचान सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input name="addressee_office" type="text" className="line-input medium-input" defaultValue="जिल्ला प्रशासन कार्यालय" />
        </div>
        <div className="addressee-row">
           <span className="red">*</span>
           <input name="addressee_district" type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          <input name="residence_district" type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          <input name="residence_municipality" type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          वडा नं <input name="residence_ward_no" type="text" className="inline-box-input tiny-box" defaultValue="1" /> निवासी श्री 
          <select name="person_title" className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input name="person_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
          <select name="relation_title" className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input name="relation_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
          <select name="relation_child_type" className="inline-select">
              <option>छोरा</option>
              <option>छोरी</option>
          </select>
          <select name="relation_child_title" className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input name="relation_child_name" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> (ना.प्र. पत्र नं <input name="na_pr_no" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ) ले आफ्नो जातीय पहिचान सिफारिस पाउँ भनी यस वडा कार्यालयमा निवेदन दिनुभएकोमा निजले नेपाली नागरिकताको प्रमाणपत्र, शैक्षिक योग्यताका प्रमाणपत्र, नेपाल सरकारबाट सुचिकृत भएको जात जातिको सुची बमोजिम निज 
          <input name="requested_ethnicity" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> जातिमा पर्ने व्यहोरा स्थानीय सरकार संचालन ऐन २०७४ को दफा १२ (२) ङ (३५) बमोजिम सिफारिस गरिन्छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input name="signatory_name" type="text" className="line-input full-width-input" required />
          <select name="signatory_designation" className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
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
          {loading ? 'सेभ हुँदैछ...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}
        </button>
      </div>

      {msg && (
        <div style={{ marginTop: 8, color: msg.type === 'error' ? 'red' : 'green' }}>
          {msg.text}
        </div>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default EthnicIdentityRecommendation;
