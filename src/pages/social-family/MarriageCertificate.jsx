import React, { useState } from 'react';
import './MarriageCertificate.css';

// Safe API base resolver (CRA, Vite, fallback)
const getApiBase = () => {
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
    return process.env.REACT_APP_API_BASE;
  }
  try {
    // eslint-disable-next-line no-undef
    if (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {
    // ignore
  }
  if (typeof window !== 'undefined' && window.__API_BASE) {
    return window.__API_BASE;
  }
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/marriage-certificate`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const MarriageCertificate = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date: '२०८२-०८-०६',
    prev_district: '',
    prev_unit_type: '',
    prev_ward_no: '',
    resident_municipality: 'नागार्जुन',
    resident_ward_no: '१',
    groom_name: '',
    groom_parent_relation: '',
    bride_name: '',
    bride_parent_relation: '',
    registration_no: '',
    marriage_date: '२०८२-०८-०६',
    marriage_place: '',
    remarks: '',
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
        prev_district: form.prev_district ?? '',
        prev_unit_type: form.prev_unit_type ?? '',
        prev_ward_no: form.prev_ward_no ?? '',
        resident_municipality: form.resident_municipality ?? '',
        resident_ward_no: form.resident_ward_no ?? '',
        groom_name: form.groom_name ?? '',
        groom_parent_relation: form.groom_parent_relation ?? '',
        bride_name: form.bride_name ?? '',
        bride_parent_relation: form.bride_parent_relation ?? '',
        registration_no: form.registration_no ?? '',
        marriage_date: form.marriage_date ?? null,
        marriage_place: form.marriage_place ?? '',
        remarks: form.remarks ?? '',
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
    <form className="marriage-certificate-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        विवाह प्रमाण पत्र ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; विवाह प्रमाण पत्र</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
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
          <p>पत्र संख्या : <span className="bold-text"><input value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" /></span></p>
          <p>चलानी नं. : <input value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input value={form.date} onChange={e => setField('date', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text bold-text">विवाह प्रमाणित सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा जिल्ला काठमाडौँ साविक
          <input value={form.prev_district} onChange={e => setField('prev_district', e.target.value)} className="inline-box-input medium-box" />
          <select value={form.prev_unit_type} onChange={e => setField('prev_unit_type', e.target.value)} className="inline-select">
              <option value=""></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं.
          <input value={form.prev_ward_no} onChange={e => setField('prev_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> <span className="red">*</span>
          हाल {form.resident_municipality} नगरपालिका वडा नं.
          <input value={form.resident_ward_no} onChange={e => setField('resident_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> निवासी श्री
          <input value={form.groom_name} onChange={e => setField('groom_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          को नाति श्री <input value={form.groom_parent_relation} onChange={e => setField('groom_parent_relation', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          तथा श्रीमती <input value={form.bride_name} onChange={e => setField('bride_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          को छोरा ना.प्र.नं. <input value={form.registration_no} onChange={e => setField('registration_no', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          { /* trimmed mid-sentence but fields preserved */ }
          ... को <input value={form.bride_parent_relation} onChange={e => setField('bride_parent_relation', e.target.value)} className="inline-box-input medium-box" required /> रङ्ग जिल्ला <input value={form.marriage_place} onChange={e => setField('marriage_place', e.target.value)} className="inline-box-input medium-box" required /> साविक
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <input className="inline-box-input tiny-box" required />
          भई हाल <input value={form.marriage_place} onChange={e => setField('marriage_place', e.target.value)} className="inline-box-input medium-box" required /> वडा नं. <input className="inline-box-input tiny-box" required /> मा बस्ने श्री <input className="inline-box-input medium-box" required /> को नातिनी श्री <input className="inline-box-input medium-box" required /> तथा श्रीमती <input className="inline-box-input medium-box" required /> को छोरी <input className="inline-box-input medium-box" required /> बीच मिति
          <input value={form.marriage_date} onChange={e => setField('marriage_date', e.target.value)} className="inline-box-input medium-box" /> गतेमा सामाजिक परम्परा अनुसार विवाह भएकोले विवाह प्रमाणित सिफारिस माग गरे अनुसार <input value={form.remarks} onChange={e => setField('remarks', e.target.value)} className="inline-box-input long-box" /> विवाह प्रमाणित सिफारिस गरिएको व्यहोरा अनुरोध गरिन्छ। साथै निजहरुको फोटो यस पत्र साथ प्रमाणित गरिएको व्यहोरा अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} type="text" className="line-input full-width-input" required />
          <select className="designation-select" value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)}>
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
            <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input value={form.applicant_address} onChange={e => setField('applicant_address', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input value={form.applicant_citizenship_no} onChange={e => setField('applicant_citizenship_no', e.target.value)} type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input value={form.applicant_phone} onChange={e => setField('applicant_phone', e.target.value)} type="text" className="detail-input bg-gray" />
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

export default MarriageCertificate;
