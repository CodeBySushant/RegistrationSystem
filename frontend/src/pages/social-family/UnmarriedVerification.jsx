import React, { useState } from 'react';
import './UnmarriedVerification.css';

/**
 * Safe API base detection:
 * - uses process.env.REACT_APP_API_BASE (CRA)
 * - tries import.meta.env.VITE_API_BASE safely using Function wrapper
 * - falls back to window.__API_BASE
 */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // safely access import.meta without causing ReferenceError in non-vite envs
    const meta = Function('try { return import.meta; } catch(e) { return undefined; }')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/unmarried-verification_form`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const UnmarriedVerification = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',
    district: 'काठमाडौँ',
    municipality: 'नागार्जुन नगरपालिका',
    previous_admin: '',
    previous_ward_no: '',
    resident_name: '',
    spouse_name: '',
    child_relation: '', // छोरा / छोरी
    child_name: '',
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

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();

      const payload = {
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        district: form.district ?? '',
        municipality: form.municipality ?? '',
        previous_admin: form.previous_admin ?? '',
        previous_ward_no: form.previous_ward_no ?? '',
        resident_name: form.resident_name ?? '',
        spouse_name: form.spouse_name ?? '',
        child_relation: form.child_relation ?? '',
        child_name: form.child_name ?? '',
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

      // Debug: copy this output if server errors appear
      console.log('OUTGOING PAYLOAD:', JSON.stringify(payload, null, 2));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Server returned ${res.status}`);
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
    <form className="unmarried-verification-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अविवाह प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; अविवाह प्रमाणित</span>
      </div>

      {/* --- Header --- */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* Meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">
            <input name="reference_no" value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" />
          </span></p>
          <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input name="date_bs" value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा जिल्ला काठमाडौँ
          <input name="district" value={form.district} onChange={e => setField('district', e.target.value)} className="inline-box-input medium-box" />
          वडा नं.
          <input name="previous_ward_no" value={form.previous_ward_no} onChange={e => setField('previous_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> (साविक
          <input name="previous_admin" value={form.previous_admin} onChange={e => setField('previous_admin', e.target.value)} className="inline-box-input medium-box" />)
          निवासी श्री
          <input name="resident_name" value={form.resident_name} onChange={e => setField('resident_name', e.target.value)} className="inline-box-input medium-box" required /> तथा श्रीमती
          <input name="spouse_name" value={form.spouse_name} onChange={e => setField('spouse_name', e.target.value)} className="inline-box-input medium-box" required /> को
          <select name="child_relation" value={form.child_relation} onChange={e => setField('child_relation', e.target.value)} className="inline-select">
            <option value="">छोरा/छोरी</option>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>
          <input name="child_name" value={form.child_name} onChange={e => setField('child_name', e.target.value)} className="inline-box-input medium-box" required /> आजको मितिसम्म अविवाहित रहेको व्यहोरा प्रमाणित गरिन्छ।
        </p>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input name="signatory_name" value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} className="line-input full-width-input" required />
          <select name="signatory_designation" value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
             <option value="">पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* Applicant details */}
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

      {/* Footer */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={saving}>{saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default UnmarriedVerification;
