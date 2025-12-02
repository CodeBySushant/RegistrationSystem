import React, { useState } from 'react';
import './InternalMigrationRecommendation.css';

/**
 * Safe API base detection:
 * - Checks process.env.REACT_APP_API_BASE (CRA / older setups)
 * - Checks import.meta.env.VITE_API_BASE (Vite) using try/catch to avoid ReferenceError
 * - Checks window.__API_BASE fallback
 */
const getApiBase = () => {
  // CRA / Webpack
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) {
    return process.env.REACT_APP_API_BASE;
  }

  // Vite (import.meta.env) — wrapped in try/catch so bundler won't complain
  try {
    // eslint-disable-next-line no-undef
    if (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {
    // ignore — happens in non-Vite builds
  }

  // Fallback (optional)
  if (typeof window !== "undefined" && window.__API_BASE) {
    return window.__API_BASE;
  }

  return "";
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/internal-migration-recommendation`;

const emptyDetailRow = () => ({
  sno: '',
  name: '',
  relation: '',
  dob_reg: '',
  house_no: '',
  road_name: '',
  age: ''
});

const timestampNow = () => {
  // return MySQL DATETIME / TIMESTAMP format: YYYY-MM-DD HH:MM:SS
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const InternalMigrationRecommendation = () => {
  // top-level form state matching columns in forms.json / DB
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date: '२०८२-०८-०६',
    subject: 'आन्तरिक बसाईँसराई',
    addressee_line1: '',
    addressee_line2: '',
    from_location: '',
    migration_type: 'एक्लै',
    from_date: '',
    to_date: '',
    from_district: '',
    from_municipality_type: 'नगरपालिका',
    from_ward_no: '',
    to_district: 'काठमाडौँ',
    to_municipality: 'नागार्जुन नगरपालिका',
    to_ward_no: '१',
    signatory_name: '',
    signatory_designation: '',
    applicant_name: '',
    applicant_address: '',
    applicant_citizenship_no: '',
    applicant_phone: '',
    municipality_name: 'नागार्जुन नगरपालिका',
    ward_title: '१ नं. वडा कार्यालय'
  });

  const [details, setDetails] = useState([ emptyDetailRow() ]);
  const [saving, setSaving] = useState(false);

  const setField = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  const onDetailChange = (index, key, value) => {
    setDetails(prev => {
      const copy = prev.map(r => ({ ...r }));
      copy[index][key] = value;
      return copy;
    });
  };

  const addDetailRow = () => setDetails(prev => ([ ...prev, emptyDetailRow() ]));

  const removeDetailRow = (index) => {
    setDetails(prev => prev.filter((_, i) => i !== index));
  };

  // handle submit — builds full payload (including timestamps) and sends to backend
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
        addressee_line1: form.addressee_line1 ?? '',
        addressee_line2: form.addressee_line2 ?? '',
        from_location: form.from_location ?? '',
        migration_type: form.migration_type ?? '',
        from_date: form.from_date ?? null,
        to_date: form.to_date ?? null,
        from_district: form.from_district ?? '',
        from_municipality_type: form.from_municipality_type ?? '',
        from_ward_no: form.from_ward_no ?? '',
        to_district: form.to_district ?? '',
        to_municipality: form.to_municipality ?? '',
        to_ward_no: form.to_ward_no ?? '',
        details: details && details.length ? details : [],
        signatory_name: form.signatory_name ?? '',
        signatory_designation: form.signatory_designation ?? '',
        applicant_name: form.applicant_name ?? '',
        applicant_address: form.applicant_address ?? '',
        applicant_citizenship_no: form.applicant_citizenship_no ?? '',
        applicant_phone: form.applicant_phone ?? '',
        municipality_name: form.municipality_name ?? '',
        ward_title: form.ward_title ?? '',
        // include both timestamps so backend won't inject null for columns listed in forms.json
        created_at: now,
        updated_at: now
      };

      // debug: print outgoing payload (paste this output if errors continue)
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
    <form className="internal-migration-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        आन्तरिक बसाईँसराई ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; आन्तरिक बसाईँसराई</span>
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
          <p>पत्र संख्या : <span className="bold-text">
            <input name="reference_no" value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" />
          </span></p>
          <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input name="date" value={form.date} onChange={e => setField('date', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">
          <input name="subject" value={form.subject} onChange={e => setField('subject', e.target.value)} className="line-input" />
        </span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input name="addressee_line1" value={form.addressee_line1} onChange={e => setField('addressee_line1', e.target.value)} type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input name="addressee_line2" value={form.addressee_line2} onChange={e => setField('addressee_line2', e.target.value)} type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          तपाईं <input name="from_location" value={form.from_location} onChange={e => setField('from_location', e.target.value)} type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> बाट 
          <select name="migration_type" value={form.migration_type} onChange={e => setField('migration_type', e.target.value)} className="inline-select">
              <option>एक्लै</option>
              <option>सपरिवार</option>
          </select>
          मिति <input name="from_date" value={form.from_date} onChange={e => setField('from_date', e.target.value)} className="inline-box-input medium-box" /> देखि <input name="to_date" value={form.to_date} onChange={e => setField('to_date', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> जिल्ला <input name="from_district" value={form.from_district} onChange={e => setField('from_district', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          <select name="from_municipality_type" value={form.from_municipality_type} onChange={e => setField('from_municipality_type', e.target.value)} className="inline-select">
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input name="from_ward_no" value={form.from_ward_no} onChange={e => setField('from_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> <span className="red">*</span> बाट यस जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text">{form.to_municipality}</span> वडा नं. {form.to_ward_no} अन्तर्गत नागार्जुन <input name="to_municipality" value={form.to_municipality} onChange={e => setField('to_municipality', e.target.value)} className="inline-box-input medium-box" /> बसाई सरी आउनुभएको व्यहोरा प्रमाणित गरिन्छ ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '20%'}}>नाम थर</th>
                        <th style={{width: '15%'}}>निवेदक संगको नाता</th>
                        <th style={{width: '20%'}}>ना.प्र.न/जन्म दर्ता</th>
                        <th style={{width: '10%'}}>घर नं</th>
                        <th style={{width: '20%'}}>बाटोको नाम</th>
                        <th style={{width: '5%'}}>उमेर</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                  {details.map((row, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td><input name={`name_${i}`} value={row.name} onChange={e => onDetailChange(i, 'name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input name={`relation_${i}`} value={row.relation} onChange={e => onDetailChange(i, 'relation', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input name={`dob_reg_${i}`} value={row.dob_reg} onChange={e => onDetailChange(i, 'dob_reg', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input name={`house_no_${i}`} value={row.house_no} onChange={e => onDetailChange(i, 'house_no', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input name={`road_name_${i}`} value={row.road_name} onChange={e => onDetailChange(i, 'road_name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input name={`age_${i}`} value={row.age} onChange={e => onDetailChange(i, 'age', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td className="action-cell">
                          <button type="button" className="add-btn" onClick={() => addDetailRow()}>+</button>
                          {details.length > 1 && <button type="button" className="add-btn" onClick={() => removeDetailRow(i)}>-</button>}
                        </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input name="signatory_name" value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} type="text" className="line-input full-width-input" required />
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
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default InternalMigrationRecommendation;
