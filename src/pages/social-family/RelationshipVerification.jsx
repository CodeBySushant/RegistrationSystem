import React, { useState } from 'react';
import './RelationshipVerification.css';

/* Safe API base resolver for CRA / Vite / window.__API_BASE */
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

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/relationship-verification_form`;

const emptyRelationRow = () => ({ name: '', relation: '', id_no: '', alive: true });

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const RelationshipVerification = () => {
  const [form, setForm] = useState({
    reference_no: '२०८२/८३',
    chalani_no: '',
    date_bs: '२०८२-०८-०६',
    addressee_line1: '',
    addressee_line2: '',
    ward_no: '1', // small input in form
    applicant_prefix: 'श्री',
    applicant_name: '',
    applicant_relation_to_subject: '',
    subject_prefix: 'श्री',
    subject_name: '',
    subject_role: '',

    signatory_name: '',
    signatory_designation: '',

    applicant_name_box: '',
    applicant_address_box: '',
    applicant_citizenship_no: '',
    applicant_phone: '',
    municipality_name: 'नागार्जुन नगरपालिका',
    ward_title: '१ नं. वडा कार्यालय'
  });

  const [relations, setRelations] = useState([ emptyRelationRow() ]);
  const [saving, setSaving] = useState(false);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const onRelationChange = (idx, key, value) => {
    setRelations(prev => {
      const copy = prev.map(r => ({ ...r }));
      copy[idx][key] = value;
      return copy;
    });
  };

  const addRelation = () => setRelations(prev => ([ ...prev, emptyRelationRow() ]));
  const removeRelation = (idx) => setRelations(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();
      const payload = {
        reference_no: form.reference_no ?? '',
        chalani_no: form.chalani_no ?? '',
        date_bs: form.date_bs ?? null,
        addressee_line1: form.addressee_line1 ?? '',
        addressee_line2: form.addressee_line2 ?? '',
        ward_no: form.ward_no ?? '',
        applicant_prefix: form.applicant_prefix ?? '',
        applicant_name: form.applicant_name ?? '',
        applicant_relation_to_subject: form.applicant_relation_to_subject ?? '',
        subject_prefix: form.subject_prefix ?? '',
        subject_name: form.subject_name ?? '',
        subject_role: form.subject_role ?? '',
        // relations array -> stored as JSON in DB
        relations: relations && relations.length ? relations : [],
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
    <form className="relationship-verification-container" onSubmit={handleSubmit}>
      {/* Top bar */}
      <div className="top-bar-title">
        नाता प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; नाता प्रमाणित</span>
      </div>

      {/* Header */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
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

      {/* Addressee */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input value={form.addressee_line1} onChange={e => setField('addressee_line1', e.target.value)} type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input value={form.addressee_line2} onChange={e => setField('addressee_line2', e.target.value)} type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">नाता प्रमाणित प्रमाणपत्र ।</span></p>
      </div>

      {/* Main paragraph */}
      <div className="form-body">
        <p className="body-paragraph">
          देहायका व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध रहेको सो नाता सम्बन्ध प्रमाणित गरी पाउँ भनि &nbsp;
          <span className="bold-text">{form.municipality_name}</span> <input value={form.ward_no} onChange={e => setField('ward_no', e.target.value)} className="inline-box-input tiny-box" required />
          नं. वडा कार्यालयमा मिति <input value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="inline-box-input medium-box" />
          मा <select value={form.applicant_prefix} onChange={e => setField('applicant_prefix', e.target.value)} className="inline-select">
              <option>श्री</option><option>सुश्री</option><option>श्रीमती</option>
          </select>
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> का नाति
          <select value={form.subject_prefix} onChange={e => setField('subject_prefix', e.target.value)} className="inline-select">
              <option>श्री</option><option>सुश्री</option>
          </select>
          <input value={form.subject_name} onChange={e => setField('subject_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> को
          <select value={form.subject_role} onChange={e => setField('subject_role', e.target.value)} className="inline-select">
              <option>छोरा</option><option>छोरी</option>
          </select>
          {/* rest of the paragraph left as static text */}
          ले दिनुभएको दरखास्त बमोजिम यस कार्यालयबाट आवश्यक जाँचबुझ गरी बुझ्दा तपाईको देहाय बमोजिमको व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध कायम रहेको देखिएकोले स्थानीय सरकार संचालन ऐन २०७४ को दफा १२ उपदफा २ को खण्ड (ङ) १ बमोजिम नाता प्रमाणित गरी यो प्रमाण पत्र प्रदान गरीएको छ ।
        </p>
      </div>

      {/* Table of relations */}
      <div className="table-section">
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>क्र.स.</th>
                <th style={{width: '35%'}}>नाता सम्बन्ध कायम गरेको व्यक्तिको नाम</th>
                <th style={{width: '20%'}}>नाता</th>
                <th style={{width: '30%'}}>नागरिकता नं. / जन्म दर्ता नं.</th>
                <th style={{width: '5%'}}>जीवित/मृत्यु</th>
                <th style={{width: '5%'}}></th>
              </tr>
            </thead>
            <tbody>
              {relations.map((r, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td><input value={r.name} onChange={e => onRelationChange(i, 'name', e.target.value)} className="table-input" required /></td>
                  <td><input value={r.relation} onChange={e => onRelationChange(i, 'relation', e.target.value)} className="table-input" required /></td>
                  <td><input value={r.id_no} onChange={e => onRelationChange(i, 'id_no', e.target.value)} className="table-input" required /></td>
                  <td className="text-center"><input type="checkbox" checked={!!r.alive} onChange={e => onRelationChange(i, 'alive', e.target.checked)} /></td>
                  <td className="action-cell">
                    <button type="button" className="add-btn" onClick={() => addRelation()}>+</button>
                    {relations.length > 1 && <button type="button" className="add-btn" onClick={() => removeRelation(i)}>-</button>}
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
             <option value="">पद छनौट गर्नुहोस्</option>
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

export default RelationshipVerification;
