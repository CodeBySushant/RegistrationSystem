import React, { useState } from 'react';
import './RelationTemporaryResidence.css';

/* Safe API base resolver (CRA / Vite / window.__API_BASE) */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // avoid direct import.meta reference that can throw; evaluate safely
    const meta = Function('return import.meta')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/relation-temporary-residence`;

const emptyFamilyRow = () => ({ name: '', relation: 'आफै', remarks: '' });
const emptyLocationRow = () => ({ tol: '', road_name: '', house_no: '' });

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const RelationTemporaryResidence = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',
    subject_prefix: '',
    applicant_name: '',
    permanent_district: 'काठमाडौँ',
    permanent_prev_unit: '',
    permanent_prev_unit_type: '', // गा.वि.स. / न.पा.
    permanent_ward_no: '1',
    current_municipality: 'नागार्जुन नगरपालिका',
    current_ward_no: '1',
    person_name: '',
    person_family_head: '',
    family_origin_district: '',
    family_origin_unit: '',
    family_origin_ward_no: '',
    residence_since_bs: '२०८२-०८-०६',
    signatory_name: '',
    signatory_designation: '',
    applicant_name_box: '',
    applicant_address_box: '',
    applicant_citizenship_no: '',
    applicant_phone: '',
    municipality_name: 'नागार्जुन नगरपालिका',
    ward_title: '१ नं. वडा कार्यालय'
  });

  const [familyDetails, setFamilyDetails] = useState([ emptyFamilyRow() ]);
  const [residenceLocations, setResidenceLocations] = useState([ emptyLocationRow() ]);
  const [saving, setSaving] = useState(false);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const onFamilyChange = (idx, key, value) => {
    setFamilyDetails(prev => {
      const copy = prev.map(r => ({ ...r }));
      copy[idx][key] = value;
      return copy;
    });
  };
  const addFamilyRow = () => setFamilyDetails(prev => ([ ...prev, emptyFamilyRow() ]));
  const removeFamilyRow = (idx) => setFamilyDetails(prev => prev.filter((_, i) => i !== idx));

  const onLocationChange = (idx, key, value) => {
    setResidenceLocations(prev => {
      const copy = prev.map(r => ({ ...r }));
      copy[idx][key] = value;
      return copy;
    });
  };
  const addLocationRow = () => setResidenceLocations(prev => ([ ...prev, emptyLocationRow() ]));
  const removeLocationRow = (idx) => setResidenceLocations(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();

      const payload = {
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        subject_prefix: form.subject_prefix ?? '',
        applicant_name: form.applicant_name ?? '',
        permanent_district: form.permanent_district ?? '',
        permanent_prev_unit: form.permanent_prev_unit ?? '',
        permanent_prev_unit_type: form.permanent_prev_unit_type ?? '',
        permanent_ward_no: form.permanent_ward_no ?? '',
        current_municipality: form.current_municipality ?? '',
        current_ward_no: form.current_ward_no ?? '',
        person_name: form.person_name ?? '',
        person_family_head: form.person_family_head ?? '',
        family_origin_district: form.family_origin_district ?? '',
        family_origin_unit: form.family_origin_unit ?? '',
        family_origin_ward_no: form.family_origin_ward_no ?? '',
        residence_since_bs: form.residence_since_bs ?? null,

        // table groups as JSON
        family_details: familyDetails && familyDetails.length ? familyDetails : [],
        residence_locations: residenceLocations && residenceLocations.length ? residenceLocations : [],

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

      // debug: paste this output if server returns an error
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
    <form className="relation-residence-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        ज्येष्ठ नागरिक सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; ज्येष्ठ नागरिक सिफारिस</span>
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
            <input value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" />
          </span></p>
          <p>चलानी नं. : <input value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">अस्थायी बसोबास प्रमाणित सम्बन्धमा ।</span></p>
      </div>

      {/* Salutation */}
      <div className="salutation-section"><p>श्री जो जस संग सम्बन्ध राख्दछ । ,</p></div>

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा जिल्ला <span className="bold-text">{form.permanent_district}</span> साविक
          <input value={form.permanent_prev_unit} onChange={e => setField('permanent_prev_unit', e.target.value)} className="inline-box-input medium-box" />
          <select value={form.permanent_prev_unit_type} onChange={e => setField('permanent_prev_unit_type', e.target.value)} className="inline-select">
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <span className="bold-text">{form.permanent_ward_no}</span> स्थायी घर भई हाल <span className="bg-gray-text">{form.current_municipality}</span> वडा नं. <span className="bg-gray-text">{form.current_ward_no}</span> बस्ने
          <input value={form.person_name} onChange={e => setField('person_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस कार्यालयमा पेश गर्नुभएको निवेदनका आधारमा निज
          <input value={form.person_family_head} onChange={e => setField('person_family_head', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> आफ्नो परिवार सहित जिल्ला
          <input value={form.family_origin_district} onChange={e => setField('family_origin_district', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span>
          <input value={form.family_origin_unit} onChange={e => setField('family_origin_unit', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> वडा नं.
          <input value={form.family_origin_ward_no} onChange={e => setField('family_origin_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> <span className="red">*</span> मा मिति
          <input value={form.residence_since_bs} onChange={e => setField('residence_since_bs', e.target.value)} className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> साल देखि बमोजिमका परिवार सहित अस्थायी बसोबास गर्दै आएको व्यहोरा प्रमाणित गरिन्छ।
        </p>
      </div>

      {/* Table 1: family details */}
      <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width: '5%'}}>क्र.सं.</th>
                  <th style={{width: '35%'}}>नामथर</th>
                  <th style={{width: '20%'}}>नाता</th>
                  <th style={{width: '35%'}}>कैफियत</th>
                  <th style={{width: '5%'}}></th>
                </tr>
              </thead>
              <tbody>
                {familyDetails.map((r, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><input value={r.name} onChange={e => onFamilyChange(i, 'name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td>
                      <select value={r.relation} onChange={e => onFamilyChange(i, 'relation', e.target.value)} className="table-select">
                        <option>आफै</option><option>पति</option><option>पत्नी</option><option>छोरा</option><option>छोरी</option>
                      </select>
                    </td>
                    <td><input value={r.remarks} onChange={e => onFamilyChange(i, 'remarks', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td className="action-cell">
                      <button type="button" className="add-btn" onClick={() => addFamilyRow()}>+</button>
                      {familyDetails.length > 1 && <button type="button" className="add-btn" onClick={() => removeFamilyRow(i)}>-</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

      {/* Table 2: residence locations */}
      <div className="table-section">
          <h4 className="table-title center-text bold-text">बसोबास स्थान</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width: '5%'}}>क्र.सं.</th>
                  <th style={{width: '35%'}}>टोल</th>
                  <th style={{width: '40%'}}>बाटोको नाम</th>
                  <th style={{width: '15%'}}>घर नं</th>
                  <th style={{width: '5%'}}></th>
                </tr>
              </thead>
              <tbody>
                {residenceLocations.map((l, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><input value={l.tol} onChange={e => onLocationChange(i, 'tol', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={l.road_name} onChange={e => onLocationChange(i, 'road_name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={l.house_no} onChange={e => onLocationChange(i, 'house_no', e.target.value)} className="table-input" /></td>
                    <td className="action-cell">
                      <button type="button" className="add-btn" onClick={() => addLocationRow()}>+</button>
                      {residenceLocations.length > 1 && <button type="button" className="add-btn" onClick={() => removeLocationRow(i)}>-</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} className="line-input full-width-input" required />
          <select value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* Applicant box */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group"><label>निवेदकको नाम</label><input value={form.applicant_name_box} onChange={e => setField('applicant_name_box', e.target.value)} className="detail-input bg-gray" /></div>
          <div className="detail-group"><label>निवेदकको ठेगाना</label><input value={form.applicant_address_box} onChange={e => setField('applicant_address_box', e.target.value)} className="detail-input bg-gray" /></div>
          <div className="detail-group"><label>निवेदकको नागरिकता नं.</label><input value={form.applicant_citizenship_no} onChange={e => setField('applicant_citizenship_no', e.target.value)} className="detail-input bg-gray" /></div>
          <div className="detail-group"><label>निवेदकको फोन नं.</label><input value={form.applicant_phone} onChange={e => setField('applicant_phone', e.target.value)} className="detail-input bg-gray" /></div>
        </div>
      </div>

      {/* Footer action */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={saving}>{saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default RelationTemporaryResidence;
