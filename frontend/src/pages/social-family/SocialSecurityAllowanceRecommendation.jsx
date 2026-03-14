import React, { useState } from 'react';
import './SocialSecurityAllowanceRecommendation.css';

/**
 * Safe API base detection (CRA / Vite / window.__API_BASE)
 * Avoids using bare import.meta that can throw in some bundlers/runtime checks.
 */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // attempt to access import.meta safely without referencing it directly in environments where it's undefined
    const meta = Function('return typeof import !== "undefined" && import.meta ? import.meta : undefined')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/social-security-allowance-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const SocialSecurityAllowanceRecommendation = () => {
  // top-level form state matching forms.json / DB columns
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',
    addressee_line1: '',
    addressee_line2: '',
    bank_name: '',
    bank_branch: '',
    beneficiary_name: '',
    beneficiary_address: '',
    beneficiary_citizenship_no: '',
    beneficiary_phone: '',
    allowance_type: '',       // e.g. वृद्धा/विधवा/अपाङ्गता etc.
    fiscal_year: '',          // आ.व.
    quarter: '',              // त्रैमासिक
    serial_no: '',            // सि.नं.
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
        // all columns explicitly included to avoid NULL timestamp errors
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        addressee_line1: form.addressee_line1 ?? '',
        addressee_line2: form.addressee_line2 ?? '',
        bank_name: form.bank_name ?? '',
        bank_branch: form.bank_branch ?? '',
        beneficiary_name: form.beneficiary_name ?? '',
        beneficiary_address: form.beneficiary_address ?? '',
        beneficiary_citizenship_no: form.beneficiary_citizenship_no ?? '',
        beneficiary_phone: form.beneficiary_phone ?? '',
        allowance_type: form.allowance_type ?? '',
        fiscal_year: form.fiscal_year ?? '',
        quarter: form.quarter ?? '',
        serial_no: form.serial_no ?? '',
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

      // debug log — copy/paste this if there are server errors
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
    <form className="allowance-recommendation-container" onSubmit={handleSubmit}>
      {/* Top Bar */}
      <div className="top-bar-title">
        सामाजिक सुरक्षा भत्ता उपलब्ध ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षा भत्ता उपलब्ध</span>
      </div>

      {/* Header */}
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
          <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input name="date_bs" value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* Addressee */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input name="addressee_line1" value={form.addressee_line1} onChange={e => setField('addressee_line1', e.target.value)} type="text" className="line-input medium-input" required />
          <span className="red">*</span>
          <span>बैंक</span>
        </div>
        <div className="addressee-row">
           <input name="addressee_line2" value={form.addressee_line2} onChange={e => setField('addressee_line2', e.target.value)} type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>,</span>
           <input name="bank_branch" value={form.bank_branch} onChange={e => setField('bank_branch', e.target.value)} type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text bold-text">सामाजिक सुरक्षा भत्ता उपलब्ध गराई दिने बारे।</span></p>
      </div>

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस <span className="bold-text underline-text">नागार्जुन</span> र त्यस बैंक बिच सामाजिक सुरक्षा भत्ता वितरण सम्बन्धी भएको सम्झौता अनुसार <span className="bg-gray-text">{form.municipality_name}</span> वडा नं. {form.ward_title} बस्ने 
          <input name="beneficiary_name" value={form.beneficiary_name} onChange={e => setField('beneficiary_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> ले नेपाल सरकारबाट उपलब्ध गराईएको 
          <input name="allowance_type" value={form.allowance_type} onChange={e => setField('allowance_type', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> भत्ता खान योग्य भई यस कार्यालयमा दिनु भएको निवेदन अनुसार निज 
          <input name="beneficiary_address" value={form.beneficiary_address} onChange={e => setField('beneficiary_address', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को यस कार्यालयबाट त्यहाँ उपलब्ध गराईएको आ.व. 
          <input name="fiscal_year" value={form.fiscal_year} onChange={e => setField('fiscal_year', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को <input name="quarter" value={form.quarter} onChange={e => setField('quarter', e.target.value)} className="inline-box-input small-box" required /> <span className="red">*</span> त्रैमासिकको सामाजिक सुरक्षा भत्ता भर्पाइमा सि.नं. 
          <input name="serial_no" value={form.serial_no} onChange={e => setField('serial_no', e.target.value)} className="inline-box-input small-box" required /> <span className="red">*</span> मा निजको नाम समावेश भएकोले त्यस बैंकको नियमानुसार खाता खोलि भत्ता रकम उपलब्ध गराई दिनु हुन अनुरोध छ ।
        </p>
      </div>

      {/* Signature */}
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

      {/* Applicant Details Box */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input name="applicant_name" value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input name="applicant_address" value={form.applicant_address} onChange={e => setField('applicant_address', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={e => setField('applicant_citizenship_no', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input name="applicant_phone" value={form.applicant_phone} onChange={e => setField('applicant_phone', e.target.value)} className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={saving}>{saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default SocialSecurityAllowanceRecommendation;
