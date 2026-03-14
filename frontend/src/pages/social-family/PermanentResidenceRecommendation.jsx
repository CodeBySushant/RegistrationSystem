import React, { useState } from 'react';
import './PermanentResidenceRecommendation.css';

/* Safe API base resolver (CRA / Vite / window.__API_BASE) */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    const meta = Function('return import.meta')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/permanent-residence-recommendation`;

const emptyLocationRow = () => ({ tol: '', road_name: '', house_no: '' });

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const PermanentResidenceRecommendation = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',   // store BS as string (VARCHAR)
    salutation_person_prefix: 'श्री',
    applicant_name: '',
    current_municipality: 'नागार्जुन',
    current_municipality_display: 'नागार्जुन',
    ward_no: '1',
    previous_unit: '', // साविक ... text
    since_date_bs: '२०८२-०८-०६',
    npr_no: '',
    npr_issue_district: '',
    npr_issue_date_bs: '२०८२-०८-०६',
    signatory_name: '',
    signatory_designation: '',
    applicant_name_box: '',
    applicant_address_box: '',
    applicant_citizenship_no: '',
    applicant_phone: '',
    municipality_name: 'नागार्जुन नगरपालिका',
    ward_title: '१ नं. वडा कार्यालय'
  });

  const [locations, setLocations] = useState([ emptyLocationRow() ]);
  const [saving, setSaving] = useState(false);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const onLocationChange = (idx, key, value) => {
    setLocations(prev => {
      const copy = prev.map(r => ({ ...r }));
      copy[idx][key] = value;
      return copy;
    });
  };

  const addLocation = () => setLocations(prev => ([ ...prev, emptyLocationRow() ]));
  const removeLocation = (idx) => setLocations(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();

      // build full payload matching forms.json / SQL columns
      const payload = {
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        salutation_person_prefix: form.salutation_person_prefix ?? '',
        applicant_name: form.applicant_name ?? '',
        current_municipality: form.current_municipality ?? '',
        current_municipality_display: form.current_municipality_display ?? '',
        ward_no: form.ward_no ?? '',
        previous_unit: form.previous_unit ?? '',
        since_date_bs: form.since_date_bs ?? null,

        npr_no: form.npr_no ?? '',
        npr_issue_district: form.npr_issue_district ?? '',
        npr_issue_date_bs: form.npr_issue_date_bs ?? null,

        // locations will be stored as JSON in DB
        locations: locations && locations.length ? locations : [],

        signatory_name: form.signatory_name ?? '',
        signatory_designation: form.signatory_designation ?? '',

        applicant_name_box: form.applicant_name_box ?? '',
        applicant_address_box: form.applicant_address_box ?? '',
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
    <form className="permanent-residence-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        स्थायी बसोबास सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; स्थायी बसोबास सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">{form.current_municipality}, {form.current_municipality_display}</p>
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
          <p>मिति : <input value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">
          <input value={form.salutation_person_prefix} onChange={e => setField('salutation_person_prefix', e.target.value)} className="line-input tiny-input" />&nbsp;
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="line-input" />
          {/* keep underline style */}
        </span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा निवेदक&nbsp;
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> ले पेश गर्नुभएको निवेदनका आधारमा&nbsp;
          <input value={form.previous_unit} onChange={e => setField('previous_unit', e.target.value)} className="inline-box-input medium-box" /> <span className="red">*</span>
          <input value={form.current_municipality} onChange={e => setField('current_municipality', e.target.value)} className="inline-box-input medium-box" />
          <input value={form.current_municipality_display} onChange={e => setField('current_municipality_display', e.target.value)} className="inline-box-input medium-box" />
          वडा नं <input value={form.ward_no} onChange={e => setField('ward_no', e.target.value)} className="inline-box-input tiny-box" required /> (साविक&nbsp;
          <input value={form.previous_unit} onChange={e => setField('previous_unit', e.target.value)} className="inline-box-input medium-box" />
          <select className="inline-select"><option></option><option>गा.वि.स.</option><option>न.पा.</option></select>
          वडा नं. <input className="inline-box-input tiny-box" required /> ) अन्तर्गत तल उल्लेखित स्थानमा विगत मिति <input value={form.since_date_bs} onChange={e => setField('since_date_bs', e.target.value)} className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> देखि स्थाई बसोबास गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* --- Resident Details (table rows stored to locations[]) --- */}
      <div className="resident-details-section">
          <h4 className="bold-text">बसोबास गर्नेको :-</h4>
          <div className="resident-row">
              <label>ना.प्रा.प.नं. : <span className="red">*</span></label>
              <input value={form.npr_no} onChange={e => setField('npr_no', e.target.value)} type="text" className="line-input medium-input" />
              <label> / जिल्ला : <span className="red">*</span></label>
              <input value={form.npr_issue_district} onChange={e => setField('npr_issue_district', e.target.value)} type="text" className="line-input medium-input" />
              <label> / जारी मिति :</label>
              <input value={form.npr_issue_date_bs} onChange={e => setField('npr_issue_date_bs', e.target.value)} type="text" className="line-input medium-input" />
          </div>
      </div>

      {/* --- Table Section (locations) --- */}
      <div className="table-section">
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.सं.</th>
                        <th style={{width: '35%'}}>टोल</th>
                        <th style={{width: '35%'}}>बाटोको नाम</th>
                        <th style={{width: '20%'}}>घर नं</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                  {locations.map((loc, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td><input value={loc.tol} onChange={e => onLocationChange(i, 'tol', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                      <td><input value={loc.road_name} onChange={e => onLocationChange(i, 'road_name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                      <td><input value={loc.house_no} onChange={e => onLocationChange(i, 'house_no', e.target.value)} className="table-input" /></td>
                      <td className="action-cell">
                        <button type="button" className="add-btn" onClick={() => addLocation()}>+</button>
                        {locations.length > 1 && <button type="button" className="add-btn" onClick={() => removeLocation(i)}>-</button>}
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
            <input value={form.applicant_name_box} onChange={e => setField('applicant_name_box', e.target.value)} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input value={form.applicant_address_box} onChange={e => setField('applicant_address_box', e.target.value)} className="detail-input bg-gray" />
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

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default PermanentResidenceRecommendation;
