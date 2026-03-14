import React, { useState } from 'react';
import './NewBirthVerification.css';

/* Safe API base resolver:
   - process.env.REACT_APP_API_BASE (CRA)
   - attempt import.meta.env via Function(...) to avoid syntax errors in non-Vite builds
   - fallback window.__API_BASE
*/
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    // safely evaluate import.meta if available (avoids static parser errors)
    const meta = Function('return import.meta')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/new-birth-verification`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const NewBirthVerification = () => {
  const [form, setForm] = useState({
    ref_no: '',
    letter_no: '2082/83',
    date_bs: new Date().toISOString().slice(0, 10),
    applicant_prefix: 'Mr.',
    applicant_name: '',
    subject_person_prefix: 'Mr.',
    subject_person_name: '',
    full_name_np: '',
    full_name_en: '',
    dob_bs: '2082-08-06',
    dob_ad: '',
    sex: 'Male',
    perm_province: '',
    perm_district: '',
    perm_palika: '',
    perm_ward: '',
    perm_palika_en: '',
    perm_ward_en: '',
    birth_province: '',
    birth_district: '',
    birth_palika: '',
    birth_ward: '',
    birth_place_name: '',
    birth_palika_en: '',
    birth_ward_en: '',
    father_full_name_np: '',
    father_full_name_en: '',
    father_document_type: '',
    father_document_no: '',
    mother_full_name_np: '',
    mother_full_name_en: '',
    mother_document_type: '',
    mother_document_no: '',
    signatory_designation: '',
    signatory_name: '',
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
        // meta
        letter_no: form.letter_no ?? '',
        ref_no: form.ref_no ?? '',
        date_bs: form.date_bs ?? null,

        // applicant / subject
        applicant_prefix: form.applicant_prefix ?? '',
        applicant_name: form.applicant_name ?? '',
        subject_person_prefix: form.subject_person_prefix ?? '',
        subject_person_name: form.subject_person_name ?? '',

        // names
        full_name_np: form.full_name_np ?? '',
        full_name_en: form.full_name_en ?? '',

        // DOB
        dob_bs: form.dob_bs ?? '',
        dob_ad: form.dob_ad ?? null,
        sex: form.sex ?? '',

        // permanent address (nepali + english)
        perm_province: form.perm_province ?? '',
        perm_district: form.perm_district ?? '',
        perm_palika: form.perm_palika ?? '',
        perm_ward: form.perm_ward ?? '',
        perm_palika_en: form.perm_palika_en ?? '',
        perm_ward_en: form.perm_ward_en ?? '',

        // birth place (nepali + english)
        birth_province: form.birth_province ?? '',
        birth_district: form.birth_district ?? '',
        birth_palika: form.birth_palika ?? '',
        birth_ward: form.birth_ward ?? '',
        birth_place_name: form.birth_place_name ?? '',
        birth_palika_en: form.birth_palika_en ?? '',
        birth_ward_en: form.birth_ward_en ?? '',

        // father
        father_full_name_np: form.father_full_name_np ?? '',
        father_full_name_en: form.father_full_name_en ?? '',
        father_document_type: form.father_document_type ?? '',
        father_document_no: form.father_document_no ?? '',

        // mother
        mother_full_name_np: form.mother_full_name_np ?? '',
        mother_full_name_en: form.mother_full_name_en ?? '',
        mother_document_type: form.mother_document_type ?? '',
        mother_document_no: form.mother_document_no ?? '',

        // signature
        signatory_designation: form.signatory_designation ?? '',
        signatory_name: form.signatory_name ?? '',

        municipality_name: form.municipality_name ?? '',
        ward_title: form.ward_title ?? '',

        // timestamps so backend insert won't fail for NOT NULL
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
    <form className="birth-verification-english-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जन्ममिति प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; जन्म मिति प्रमाणित</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name-np">नागार्जुन नगरपालिका</h1>
          <h2 className="municipality-name-en">Nagarjun Municipality</h2>
          <h3 className="ward-title-np">१ नं वडा कार्यालय <span className="ward-title-en">(1 No. Ward Office)</span></h3>
          <p className="address-text-np">काठमाडौँ जिल्ला <span className="address-text-en">(Kathmandu District)</span></p>
          <p className="province-text-np">बागमती प्रदेश <span className="province-text-en">(Bagmati Province)</span></p>
          <p className="country-text">नेपाल (Nepal)</p>
        </div>
      </div>

      {/* --- Letter/Ref Info --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>Letter No. : <span className="bold-text">{form.letter_no}</span></p>
          <p>Ref No.: <input value={form.ref_no} onChange={e => setField('ref_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>Date : <input value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Main Title --- */}
      <div className="main-form-title"><h3>जन्म प्रमाणीकरण (Birth Verification)</h3></div>

      {/* --- Introductory Paragraph --- */}
      <div className="intro-paragraph">
        <p>
          श्री <select className="inline-select" value={form.applicant_prefix} onChange={e => setField('applicant_prefix', e.target.value)}>
            <option>Mr.</option><option>Mrs.</option>
          </select>
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} type="text" className="line-input medium-input" /> ले दिएको निवेदन अनुसार श्री 
          <select className="inline-select" value={form.subject_person_prefix} onChange={e => setField('subject_person_prefix', e.target.value)}><option>Mr.</option><option>Mrs.</option></select>
          <input value={form.subject_person_name} onChange={e => setField('subject_person_name', e.target.value)} type="text" className="line-input medium-input" /> को देहाय बमोजिम जन्मको विवरण रहेको प्रमाणित गरिन्छ।
        </p>
        <p className="en-text">
          (According to the application given by
          <select className="inline-select" value={form.applicant_prefix} onChange={e => setField('applicant_prefix', e.target.value)}><option>Mr.</option><option>Mrs.</option></select>
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} type="text" className="line-input medium-input" />, it is verified that the birth of
          <select className="inline-select" value={form.subject_person_prefix} onChange={e => setField('subject_person_prefix', e.target.value)}><option>Mr.</option><option>Mrs.</option></select>
          <input value={form.subject_person_name} onChange={e => setField('subject_person_name', e.target.value)} type="text" className="line-input medium-input" /> are as follows.)
        </p>
      </div>

      {/* --- Form Table --- */}
      <div className="form-table-container">
        <table className="verification-table">
          <tbody>
            <tr>
              <td className="label-cell">पूरा नाम:</td>
              <td className="input-cell"><input value={form.full_name_np} onChange={e => setField('full_name_np', e.target.value)} type="text" className="table-input" /></td>
            </tr>
            <tr>
              <td className="label-cell en-label">Full Name:</td>
              <td className="input-cell"><input value={form.full_name_en} onChange={e => setField('full_name_en', e.target.value)} type="text" className="table-input" /></td>
            </tr>

            <tr>
              <td className="label-cell">जन्म मिति/Date of Birth:</td>
              <td className="input-cell flex-cell">
                <span>{form.dob_bs}</span>
                <span className="bold-text">(B.S.) /</span>
                <input value={form.dob_ad} onChange={e => setField('dob_ad', e.target.value)} type="text" className="table-input medium-input" />
                <span className="bold-text">(A.D.)</span>
              </td>
            </tr>

            <tr>
              <td className="label-cell">लिङ्ग/Sex:</td>
              <td className="input-cell">
                <select value={form.sex} onChange={e => setField('sex', e.target.value)} className="table-select">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </td>
            </tr>

            <tr>
              <td className="label-cell">स्थायी ठेगाना :</td>
              <td className="input-cell address-grid">
                <select value={form.perm_province} onChange={e => setField('perm_province', e.target.value)} className="table-select"><option>Province</option></select>
                <select value={form.perm_district} onChange={e => setField('perm_district', e.target.value)} className="table-select"><option>District</option></select>
                <input value={form.perm_palika} onChange={e => setField('perm_palika', e.target.value)} type="text" className="table-input" placeholder="पालिका" />
                <input value={form.perm_ward} onChange={e => setField('perm_ward', e.target.value)} type="text" className="table-input" placeholder="वडा" />
              </td>
            </tr>

            <tr>
              <td className="label-cell en-label">Permanent Address:</td>
              <td className="input-cell address-grid">
                <select value={form.perm_palika_en} onChange={e => setField('perm_palika_en', e.target.value)} className="table-select"><option>Palika</option></select>
                <select value={form.perm_ward_en} onChange={e => setField('perm_ward_en', e.target.value)} className="table-select"><option>WardNo</option></select>
                <input type="text" className="table-input" placeholder="Palika" />
                <input type="text" className="table-input" placeholder="WardNo" />
              </td>
            </tr>

            <tr>
              <td className="label-cell">जन्म स्थान:</td>
              <td className="input-cell address-grid-5">
                <select value={form.birth_province} onChange={e => setField('birth_province', e.target.value)} className="table-select"><option>Province</option></select>
                <select value={form.birth_district} onChange={e => setField('birth_district', e.target.value)} className="table-select"><option>District</option></select>
                <input value={form.birth_palika} onChange={e => setField('birth_palika', e.target.value)} type="text" className="table-input" placeholder="पालिका" />
                <input value={form.birth_ward} onChange={e => setField('birth_ward', e.target.value)} type="text" className="table-input" placeholder="वडा" />
                <input value={form.birth_place_name} onChange={e => setField('birth_place_name', e.target.value)} type="text" className="table-input" placeholder="ठाउँको नाम" />
              </td>
            </tr>

            <tr>
              <td className="label-cell en-label">Birth Place:</td>
              <td className="input-cell address-grid-5">
                <select value={form.birth_palika_en} onChange={e => setField('birth_palika_en', e.target.value)} className="table-select"><option>Palika</option></select>
                <select value={form.birth_ward_en} onChange={e => setField('birth_ward_en', e.target.value)} className="table-select"><option>WardNo</option></select>
                <input type="text" className="table-input" placeholder="Palika" />
                <input type="text" className="table-input" placeholder="Ward No" />
                <input type="text" className="table-input" placeholder="Place Name" />
              </td>
            </tr>

            {/* Father's Details */}
            <tr>
              <td rowSpan="3" className="label-cell bg-gray section-header">बाबुको विवरण (Father's Details)</td>
              <td className="input-cell flex-row">
                <span className="sub-label">पूरा नाम:</span>
                <input value={form.father_full_name_np} onChange={e => setField('father_full_name_np', e.target.value)} type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label en-label">Full Name:</span>
                <input value={form.father_full_name_en} onChange={e => setField('father_full_name_en', e.target.value)} type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label">परिचय पत्र(Document):</span>
                <select value={form.father_document_type} onChange={e => setField('father_document_type', e.target.value)} className="table-select medium-select"><option>Select Document Type</option></select>
                <input value={form.father_document_no} onChange={e => setField('father_document_no', e.target.value)} type="text" className="table-input" />
              </td>
            </tr>

            {/* Mother's Details */}
            <tr>
              <td rowSpan="3" className="label-cell bg-gray section-header">आमाको विवरण(Mother's Details)</td>
              <td className="input-cell flex-row">
                <span className="sub-label">पूरा नाम:</span>
                <input value={form.mother_full_name_np} onChange={e => setField('mother_full_name_np', e.target.value)} type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label en-label">Full Name:</span>
                <input value={form.mother_full_name_en} onChange={e => setField('mother_full_name_en', e.target.value)} type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label">परिचय पत्र(Document):</span>
                <select value={form.mother_document_type} onChange={e => setField('mother_document_type', e.target.value)} className="table-select medium-select"><option>Select Document Type</option></select>
                <input value={form.mother_document_no} onChange={e => setField('mother_document_no', e.target.value)} type="text" className="table-input" />
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-dots">....................................</div>
          <select value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
             <option>पद छनौट गर्नुहोस्</option><option>वडा अध्यक्ष</option><option>वडा सचिव</option>
          </select>
          <input value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} type="text" className="line-input full-width-input" />
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

export default NewBirthVerification;
