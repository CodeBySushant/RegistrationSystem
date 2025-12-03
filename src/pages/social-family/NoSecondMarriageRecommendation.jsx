import React, { useState } from 'react';
import './NoSecondMarriageRecommendation.css';

/* Safe API base resolver that works in CRA, Vite and with window.__API_BASE fallback */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // Use Function to access import.meta to avoid static parse errors in non-Vite environments
    const meta = Function('return import.meta')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/no-second-marriage-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const NoSecondMarriageRecommendation = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date: '२०८२-०८-०६',
    subject: 'दोश्रो विवाह नगरेको सिफारिस',
    district: 'काठमाडौँ',
    municipality: 'नागार्जुन',
    ward_no: '1',

    resident_name: '',           // person who lives in ward
    relative_name: '',           // नातिनी / relation
    daughter_name: '',
    wife_name: '',
    spouse_npr_no: '',
    spouse_npr_issue_date: '२०८२-०८-०६',
    spouse_death_date: '२०८२-०८-०६',
    application_date: '२०८२-०८-०६',
    recommended_until_date: '२०८२-०८-०६',

    witness_text: '',            // sakshi textarea

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
        date: form.date ?? null,
        subject: form.subject ?? '',
        district: form.district ?? '',
        municipality: form.municipality ?? '',
        ward_no: form.ward_no ?? '',

        resident_name: form.resident_name ?? '',
        relative_name: form.relative_name ?? '',
        daughter_name: form.daughter_name ?? '',
        wife_name: form.wife_name ?? '',
        spouse_npr_no: form.spouse_npr_no ?? '',
        spouse_npr_issue_date: form.spouse_npr_issue_date ?? null,
        spouse_death_date: form.spouse_death_date ?? null,
        application_date: form.application_date ?? null,
        recommended_until_date: form.recommended_until_date ?? null,

        witness_text: form.witness_text ?? '',

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

      // Helpful debug: copy/paste this if server errors continue
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
    <form className="no-marriage-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        दोश्रो विवाह नगरेको सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; दोश्रो विवाह नगरेको सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">{form.municipality}, {form.district}</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">
            <input value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" />
          </span></p>
          <p>चलानी नं. : <input value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input value={form.date} onChange={e => setField('date', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">
          <input value={form.subject} onChange={e => setField('subject', e.target.value)} className="line-input" />
        </span></p>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस सँग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त बिषयमा जिल्ला <input value={form.district} onChange={e => setField('district', e.target.value)} className="inline-box-input medium-box" /> , 
          <input value={form.municipality} onChange={e => setField('municipality', e.target.value)} className="inline-box-input medium-box" />
          वडा नं <input value={form.ward_no} onChange={e => setField('ward_no', e.target.value)} className="inline-box-input medium-box" /> बस्ने <input value={form.resident_name} onChange={e => setField('resident_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को नातिनी 
          <input value={form.relative_name} onChange={e => setField('relative_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरी <input value={form.daughter_name} onChange={e => setField('daughter_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को पत्नी 
          <input value={form.wife_name} onChange={e => setField('wife_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> ना.प्र.नं. <input value={form.spouse_npr_no} onChange={e => setField('spouse_npr_no', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> जारी मिति <input value={form.spouse_npr_issue_date} onChange={e => setField('spouse_npr_issue_date', e.target.value)} className="inline-box-input medium-box" /> जिल्ला <input value={form.district} onChange={e => setField('district', e.target.value)} className="inline-box-input medium-box" /> ले आफ्नो श्रीमानको मिति <input value={form.spouse_death_date} onChange={e => setField('spouse_death_date', e.target.value)} className="inline-box-input medium-box" /> गतेमा मृत्यु भएको र निजको मृत्यु पश्चात ... निवेदन मिति <input value={form.application_date} onChange={e => setField('application_date', e.target.value)} className="inline-box-input medium-box" /> मा दिनु भएको निवेदन ... निजले मिति <input value={form.recommended_until_date} onChange={e => setField('recommended_until_date', e.target.value)} className="inline-box-input medium-box" /> सम्म दोश्रो विवाह नगरेको व्यहोरा सिफारिस गरिन्छ।
        </p>
      </div>

      {/* --- Witness (Sakshi) Rich Text Mock --- */}
      <div className="sakshi-section">
          <label>साक्षी :</label>
          <div className="rich-editor-mock">
              <div className="editor-toolbar">
                  <span className="tool-btn bold">B</span>
                  <span className="tool-btn italic">I</span>
                  <span className="tool-btn underline">U</span>
                  <span className="tool-btn strike">S</span>
                  <span className="tool-sep">|</span>
                  <span className="tool-btn">x<sub>2</sub></span>
                  <span className="tool-btn">x<sup>2</sup></span>
                  <span className="tool-sep">|</span>
                  <span className="tool-btn">Format</span>
              </div>
              <textarea className="editor-textarea" rows="4" value={form.witness_text} onChange={e => setField('witness_text', e.target.value)} />
          </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} className="line-input full-width-input" required />
          <select value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
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
            <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input value={form.applicant_address} onChange={e => setField('applicant_address', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input value={form.applicant_citizenship_no} onChange={e => setField('applicant_citizenship_no', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input value={form.applicant_phone} onChange={e => setField('applicant_phone', e.target.value)} className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={saving}>{saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
      </div>
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default NoSecondMarriageRecommendation;
