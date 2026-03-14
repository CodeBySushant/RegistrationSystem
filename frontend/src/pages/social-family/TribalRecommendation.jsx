import React, { useState } from 'react';
import './TribalRecommendation.css';

/**
 * Safe API base detection:
 * - process.env.REACT_APP_API_BASE (CRA)
 * - import.meta.env.VITE_API_BASE (Vite) accessed safely
 * - window.__API_BASE fallback
 */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // safe import.meta access (avoids ReferenceError in some runtimes)
    const meta = Function('try { return import.meta; } catch(e) { return undefined; }')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/tribal-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const TribalRecommendation = () => {
  // Controlled form state: fields mapped from the form markup
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',
    subject: '',
    person_name: '',
    person_relation_type: '', // नाति / नातिनी etc.
    person_role: '', // छोरा / छोरी
    previous_admin_type: '', // गा.वि.स. / न.पा.
    previous_ward_no: '',
    current_municipality: 'नागार्जुन नगरपालिका',
    current_ward_no: '1',
    citizenship_no: '',
    citizenship_issue_date: '',
    requester_name: '', // who is requesting (input later in text)
    claimed_type: 'आदिवासी', // आदिवासी / जनजाति
    registered_list_name: '',
    claimed_caste: '',
    signatory_name: '',
    signatory_designation: '',
    applicant_name: '',
    applicant_address: '',
    applicant_citizenship_no: '',
    applicant_phone: '',
    municipality_name: 'नागार्जुन नगरपालिका',
    ward_title: '१ नं. वडा कार्यालय'
  });

  const [saving, setSaving] = useState(false);

  const setField = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();
      const payload = {
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        subject: form.subject ?? '',
        person_name: form.person_name ?? '',
        person_relation_type: form.person_relation_type ?? '',
        person_role: form.person_role ?? '',
        previous_admin_type: form.previous_admin_type ?? '',
        previous_ward_no: form.previous_ward_no ?? '',
        current_municipality: form.current_municipality ?? '',
        current_ward_no: form.current_ward_no ?? '',
        citizenship_no: form.citizenship_no ?? '',
        citizenship_issue_date: form.citizenship_issue_date ?? '',
        requester_name: form.requester_name ?? '',
        claimed_type: form.claimed_type ?? '',
        registered_list_name: form.registered_list_name ?? '',
        claimed_caste: form.claimed_caste ?? '',
        signatory_name: form.signatory_name ?? '',
        signatory_designation: form.signatory_designation ?? '',
        applicant_name: form.applicant_name ?? '',
        applicant_address: form.applicant_address ?? '',
        applicant_citizenship_no: form.applicant_citizenship_no ?? '',
        applicant_phone: form.applicant_phone ?? '',
        municipality_name: form.municipality_name ?? '',
        ward_title: form.ward_title ?? '',
        created_at: now,
        updated_at: now
      };

      // Debug: copy this console output if server complains
      console.log('OUTGOING PAYLOAD:', JSON.stringify(payload, null, 2));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server returned ${res.status}`);
      }

      const json = await res.json();
      alert(`Record created with id: ${json.id}`);
    } catch (err) {
      console.error(err);
      alert('Error saving record: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="tribal-recommendation-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        आदिवासी सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; आदिवासी सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">
            <input name="reference_no" value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" />
          </span></p>
          <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input name="date_bs" value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input name="addressee_line1" value={form.requester_name} onChange={e => setField('requester_name', e.target.value)} type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input name="addressee_line2" value={form.registered_list_name} onChange={e => setField('registered_list_name', e.target.value)} type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त बिषयमा <input name="person_name" value={form.person_name} onChange={e => setField('person_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          को <select name="person_relation_type" value={form.person_relation_type} onChange={e => setField('person_relation_type', e.target.value)} className="inline-select">
            <option value="">नाति/नातिनी</option>
            <option value="नाति">नाति</option>
            <option value="नातिनी">नातिनी</option>
          </select>
          <input name="person_role" value={form.person_role} onChange={e => setField('person_role', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को
          <select name="person_role_select" value={form.person_role_select} onChange={e => setField('person_role_select', e.target.value)} className="inline-select">
            <option value="">छोरा/छोरी</option>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>
          जिल्ला काठमाडौँ साविक
          <select name="previous_admin_type" value={form.previous_admin_type} onChange={e => setField('previous_admin_type', e.target.value)} className="inline-select">
            <option value=""></option>
            <option value="गा.वि.स.">गा.वि.स.</option>
            <option value="न.पा.">न.पा.</option>
          </select>
          वडा नं <input name="previous_ward_no" value={form.previous_ward_no} onChange={e => setField('previous_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> <span className="red">*</span> भै हाल जिल्ला काठमाडौँ {form.current_municipality} वडा नं {form.current_ward_no} बस्ने (ना.प्र.नं. <input name="citizenship_no" value={form.citizenship_no} onChange={e => setField('citizenship_no', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> मिति {form.date_bs}) को <input name="claimed_caste" value={form.claimed_caste} onChange={e => setField('claimed_caste', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> ले म 
          <select name="claimed_type" value={form.claimed_type} onChange={e => setField('claimed_type', e.target.value)} className="inline-select">
            <option value="आदिवासी">आदिवासी</option>
            <option value="जनजाति">जनजाति</option>
          </select>
          अन्तरगत <input name="registered_list_name" value={form.registered_list_name} onChange={e => setField('registered_list_name', e.target.value)} className="inline-box-input medium-box" /> जाति भएकोले सोही बमोजिम सिफारिस गरिपाउँ भनि माग भै आएकोले नेपाल सरकारले सुचिकृत गरेको <input name="registered_list_name_2" value={form.registered_list_name_2} onChange={e => setField('registered_list_name_2', e.target.value)} className="inline-box-input medium-box" required /> मध्ये निज <input name="claimed_caste_confirm" value={form.claimed_caste_confirm} onChange={e => setField('claimed_caste_confirm', e.target.value)} className="inline-box-input medium-box" required /> जाति भएकोले सोही व्यहोरा प्रमाणित गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input name="signatory_name" value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} className="line-input full-width-input" required />
          <select name="signatory_designation" value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
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
            <input name="applicant_name" value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input name="applicant_address" value={form.applicant_address} onChange={e => setField('applicant_address', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={e => setField('applicant_citizenship_no', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input name="applicant_phone" value={form.applicant_phone} onChange={e => setField('applicant_phone', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={saving}>{saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default TribalRecommendation;
