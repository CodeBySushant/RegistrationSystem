import React, { useState } from 'react';
import './JesthaNagarikSifarisWada.css';

// Safe API base resolver (works with CRA, Vite, or fallback)
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

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/jestha-nagarik-sifaris-wada`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const JesthaNagarikSifarisWada = () => {
  const [form, setForm] = useState({
    chalani_no: '',
    date: '२०८२-०८-०६',
    subject: 'ज्येष्ठ नागरिक परिचय पत्र उपलब्ध गरिदिने बारे',
    addressee_line1: 'श्री नागार्जुन नगरपालिकाकार्यालय ,',
    addressee_line2: 'महिला तथा बाल विकास कार्याल,',
    addressee_line3: 'काठमाडौँ',
    from_district: 'कञ्चनपुर',
    from_place: 'बेदकोट',
    from_ward_no: '७',
    current_municipality: 'नागार्जुन',
    applicant_reason_text: '',
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
        chalani_no: form.chalani_no ?? '',
        date: form.date ?? null,
        subject: form.subject ?? '',
        addressee_line1: form.addressee_line1 ?? '',
        addressee_line2: form.addressee_line2 ?? '',
        addressee_line3: form.addressee_line3 ?? '',
        from_district: form.from_district ?? '',
        from_place: form.from_place ?? '',
        from_ward_no: form.from_ward_no ?? '',
        current_municipality: form.current_municipality ?? '',
        applicant_reason_text: form.applicant_reason_text ?? '',
        signatory_name: form.signatory_name ?? '',
        signatory_designation: form.signatory_designation ?? '',
        applicant_name: form.applicant_name ?? '',
        applicant_address: form.applicant_address ?? '',
        applicant_citizenship_no: form.applicant_citizenship_no ?? '',
        applicant_phone: form.applicant_phone ?? '',
        municipality_name: form.municipality_name ?? '',
        ward_title: form.ward_title ?? '',
        // include timestamps to avoid backend setting them null
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
    <form className="jestha-nagarik-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        ज्येष्ठ नागरिक सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; ज्येष्ठ नागरिक सिफारिस</span>
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
          <p>पत्र संख्या : <span className="bold-text">{form.date}</span></p>
          <p>चलानी नं. : <input type="text" className="dotted-input small-input" value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input value={form.date} onChange={e => setField('date', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text"><input value={form.subject} onChange={e => setField('subject', e.target.value)} className="line-input" /></span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>{form.addressee_line1}</span>
        </div>
        <div className="addressee-row">
          <span>{form.addressee_line2}</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" value={form.addressee_line3} onChange={e => setField('addressee_line3', e.target.value)} />
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा <input className="inline-box-input medium-box red-text-input" value={form.from_district} onChange={e => setField('from_district', e.target.value)} /> जिल्ला 
          <input className="inline-box-input medium-box red-text-input" value={form.from_place} onChange={e => setField('from_place', e.target.value)} />
          वडा नं <input className="inline-box-input tiny-box red-text-input" value={form.from_ward_no} onChange={e => setField('from_ward_no', e.target.value)} /> स्थायी ठेगाना भई हाल 
          <input className="inline-box-input medium-box" value={form.current_municipality} onChange={e => setField('current_municipality', e.target.value)} />
          वडा नं 1 मा बसोबास गर्ने <input className="inline-box-input medium-box" value={form.applicant_reason_text} onChange={e => setField('applicant_reason_text', e.target.value)} required /> <span className="red">*</span> ले दिनुभएको निवेदन अनुसार ग कानुन बमोजिम ज्येष्ठ नागरिक भएको हुँदा ज्येष्ठ नागरिक परिचय-पत्र उपलब्ध गराइ पाउँ भनि यस वडा कार्यालयमा निवेदन दिनुभएको हुँदा तहाँ कार्यालयको नियमानुसार निज 
          <input className="inline-box-input medium-box" value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} required /> <span className="red">*</span> लाई ज्येष्ठ नागरिक परिचय-पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input type="text" className="line-input full-width-input" value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} required />
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
            <input type="text" className="detail-input bg-gray" value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_address} onChange={e => setField('applicant_address', e.target.value)} />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={e => setField('applicant_citizenship_no', e.target.value)} />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input bg-gray" value={form.applicant_phone} onChange={e => setField('applicant_phone', e.target.value)} />
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

export default JesthaNagarikSifarisWada;
