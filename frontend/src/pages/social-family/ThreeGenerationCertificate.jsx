import React, { useState } from 'react';
import './ThreeGenerationCertificate.css';

/** Safe API base detection (CRA / Vite / window.__API_BASE) */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // safely access import.meta in environments that support it
    const meta = Function('return typeof import !== "undefined" && import.meta ? import.meta : undefined')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/three-generation-certificate`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const emptyLandRow = () => ({ plot_no: '', seat_no: '', area: '' });
const emptyGenRow = () => ({ name: '', relation: '', citizenship_no: '', issue_date: '', district: '' });

const ThreeGenerationCertificate = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',
    previous_admin_type: '',
    previous_ward_no: '',
    resident_prefix: 'श्री',
    resident_name: '',
    municipality_name: 'नागार्जुन नगरपालिका',
    ward_title: '१ नं. वडा कार्यालय',
    signatory_name: '',
    signatory_designation: '',
    applicant_name: '',
    applicant_address: '',
    applicant_citizenship_no: '',
    applicant_phone: ''
  });

  const [lands, setLands] = useState([emptyLandRow()]);
  const [generations, setGenerations] = useState([emptyGenRow()]);
  const [saving, setSaving] = useState(false);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const onLandChange = (i, k, v) => setLands(prev => {
    const copy = prev.map(r => ({ ...r }));
    copy[i][k] = v;
    return copy;
  });
  const addLand = () => setLands(prev => ([ ...prev, emptyLandRow() ]));
  const removeLand = (i) => setLands(prev => prev.filter((_, idx) => idx !== i));

  const onGenChange = (i, k, v) => setGenerations(prev => {
    const copy = prev.map(r => ({ ...r }));
    copy[i][k] = v;
    return copy;
  });
  const addGen = () => setGenerations(prev => ([ ...prev, emptyGenRow() ]));
  const removeGen = (i) => setGenerations(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();
      const payload = {
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        previous_admin_type: form.previous_admin_type ?? '',
        previous_ward_no: form.previous_ward_no ?? '',
        resident_prefix: form.resident_prefix ?? '',
        resident_name: form.resident_name ?? '',
        lands: lands && lands.length ? lands : [],
        generations: generations && generations.length ? generations : [],
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

      // debug output — paste this if server still errors
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
    <form className="three-generation-container" onSubmit={handleSubmit}>
      {/* Top bar */}
      <div className="top-bar-title">
        तीन पुस्ते प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; तीन पुस्ते प्रमाणित</span>
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
          उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ <span className="bold-text ml-20">{form.municipality_name}</span> वडा नं. <span className="bold-text">१</span> (साविक
          <input name="previous_admin_type" value={form.previous_admin_type} onChange={e => setField('previous_admin_type', e.target.value)} className="inline-box-input medium-box" />
          वडा नं. <input name="previous_ward_no" value={form.previous_ward_no} onChange={e => setField('previous_ward_no', e.target.value)} className="inline-box-input tiny-box" required /> ) निवासी
          <select name="resident_prefix" value={form.resident_prefix} onChange={e => setField('resident_prefix', e.target.value)} className="inline-select">
            <option>श्री</option><option>सुश्री</option><option>श्रीमती</option>
          </select>
          <input name="resident_name" value={form.resident_name} onChange={e => setField('resident_name', e.target.value)} className="inline-box-input medium-box" required /> को तीन पुस्ते तपसिलमा उल्लेख भए अनुसार रहेको व्यहोरा प्रमाणित साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* Land table */}
      <div className="table-section">
        <h4 className="table-title">जग्गाको विवरण</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '10%'}}>क्र.स.</th>
                <th style={{width: '20%'}}>कित्ता नं.</th>
                <th style={{width: '30%'}}>सिट नं.</th>
                <th style={{width: '35%'}}>क्षेत्रफल</th>
                <th style={{width: '5%'}}></th>
              </tr>
            </thead>
            <tbody>
              {lands.map((r, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td><input value={r.plot_no} onChange={e => onLandChange(i, 'plot_no', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input value={r.seat_no} onChange={e => onLandChange(i, 'seat_no', e.target.value)} className="table-input" /></td>
                  <td><input value={r.area} onChange={e => onLandChange(i, 'area', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td className="action-cell">
                    <button type="button" className="add-btn" onClick={addLand}>+</button>
                    {lands.length > 1 && <button type="button" className="add-btn" onClick={() => removeLand(i)}>-</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generations table */}
      <div className="table-section">
        <h4 className="table-title">तीन पुस्ते विवरण</h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>क्र.स.</th>
                <th style={{width: '20%'}}>नाम</th>
                <th style={{width: '15%'}}>नाता</th>
                <th style={{width: '20%'}}>नागरिकता नं.</th>
                <th style={{width: '20%'}}>जारी मिति</th>
                <th style={{width: '15%'}}>जिल्ला</th>
                <th style={{width: '5%'}}></th>
              </tr>
            </thead>
            <tbody>
              {generations.map((g, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td><input value={g.name} onChange={e => onGenChange(i, 'name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input value={g.relation} onChange={e => onGenChange(i, 'relation', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input value={g.citizenship_no} onChange={e => onGenChange(i, 'citizenship_no', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input value={g.issue_date} onChange={e => onGenChange(i, 'issue_date', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td><input value={g.district} onChange={e => onGenChange(i, 'district', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                  <td className="action-cell">
                    <button type="button" className="add-btn" onClick={addGen}>+</button>
                    {generations.length > 1 && <button type="button" className="add-btn" onClick={() => removeGen(i)}>-</button>}
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
          <input name="signatory_name" value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} className="line-input full-width-input" required />
          <select name="signatory_designation" value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option><option>वडा सचिव</option><option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* Applicant details */}
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

      {/* Footer */}
      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={saving}>{saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}</button>
      </div>

      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default ThreeGenerationCertificate;
