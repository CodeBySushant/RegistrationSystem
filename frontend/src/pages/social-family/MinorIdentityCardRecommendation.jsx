import React, { useState } from 'react';
import './MinorIdentityCardRecommendation.css';

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

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/minor-identity-card-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const MinorIdentityCardRecommendation = () => {
  const [form, setForm] = useState({
    chalani_no: '',
    date: '२०८२-०८-०६',
    addressee_type: 'जिल्ला',
    addressee_office: 'प्रशासन',
    addressee_place: 'काठमाडौँ',
    child_type: 'छोरा',
    child_name_ne: '',
    child_fullname_en: '',
    child_gender: 'पुरुष',
    birth_country: '',
    birth_province: '',
    birth_district: '',
    birth_rm_mun: '',
    father_name: '',
    father_citizenship: '',
    mother_name: '',
    mother_citizenship: '',
    guardian_name: '',
    guardian_address: '',
    permanent_district: 'काठमाडौँ',
    permanent_mun: 'नागार्जुन नगरपालिका',
    permanent_ward: '1',
    birth_date_bs: '२०८२-०८-०६',
    birth_date_ad: '',
    grandfather_name: '',
    grandmother_name: '',
    applicant_signature_name: '',
    applicant_relationship: '',
    applicant_date: '२०८२-०८-०६',
    recommender_name: '',
    recommender_designation: '',
    recommender_office_seal: '',
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
        chalani_no: form.chalani_no ?? '',
        date: form.date ?? null,
        addressee_type: form.addressee_type ?? '',
        addressee_office: form.addressee_office ?? '',
        addressee_place: form.addressee_place ?? '',
        child_type: form.child_type ?? '',
        child_name_ne: form.child_name_ne ?? '',
        child_fullname_en: form.child_fullname_en ?? '',
        child_gender: form.child_gender ?? '',
        birth_country: form.birth_country ?? '',
        birth_province: form.birth_province ?? '',
        birth_district: form.birth_district ?? '',
        birth_rm_mun: form.birth_rm_mun ?? '',
        father_name: form.father_name ?? '',
        father_citizenship: form.father_citizenship ?? '',
        mother_name: form.mother_name ?? '',
        mother_citizenship: form.mother_citizenship ?? '',
        guardian_name: form.guardian_name ?? '',
        guardian_address: form.guardian_address ?? '',
        permanent_district: form.permanent_district ?? '',
        permanent_mun: form.permanent_mun ?? '',
        permanent_ward: form.permanent_ward ?? '',
        birth_date_bs: form.birth_date_bs ?? '',
        birth_date_ad: form.birth_date_ad ?? null,
        grandfather_name: form.grandfather_name ?? '',
        grandmother_name: form.grandmother_name ?? '',
        applicant_signature_name: form.applicant_signature_name ?? '',
        applicant_relationship: form.applicant_relationship ?? '',
        applicant_date: form.applicant_date ?? null,
        recommender_name: form.recommender_name ?? '',
        recommender_designation: form.recommender_designation ?? '',
        recommender_office_seal: form.recommender_office_seal ?? '',
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
    <form className="minor-card-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नाबालक परिचय पत्र ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; नाबालक परिचय पत्र</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Photo Box (Positioned Absolute or Flex) --- */}
      <div className="photo-box-container">
          <div className="photo-box">नाबालकको फोटो</div>
      </div>

      {/* --- Title & Subtitle --- */}
      <div className="form-title-section">
          <h4 className="underline-text bold-text">नाबालक परिचयपत्रको अनुसूची।</h4>
      </div>

      {/* --- Addressee --- */}
      <div className="addressee-section">
          <p className="bold-text">श्रीमान प्रमुख जिल्ला अधिकारी</p>
          <div className="addressee-row">
              <select className="inline-select" value={form.addressee_type} onChange={e => setField('addressee_type', e.target.value)}>
                  <option>जिल्ला</option>
                  <option>इलाका</option>
              </select>
              <span>प्रशासन कार्यालय,</span>
              <input type="text" className="line-input medium-input" value={form.addressee_place} onChange={e => setField('addressee_place', e.target.value)} />
              <span>|</span>
          </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">नाबालक परिचय पत्र पाउँ।</span></p>
      </div>

      {/* --- Main Form Body --- */}
      <div className="form-body">
        <p className="intro-text">
            मेरो निम्ननुसारको विवरण भएको नाबालकको परिचयपत्र बनाउन परेकोले सिफारिस साथ रु. १० को टिकट टाँस गरी यो निवेदन पेश गरेको छु। मेरो 
            <select className="inline-select" value={form.child_type} onChange={e => setField('child_type', e.target.value)}>
                <option>छोरा</option>
                <option>छोरी</option>
            </select>
            <input type="text" className="line-input medium-input" value={form.child_name_ne} onChange={e => setField('child_name_ne', e.target.value)} /> <span className="red">*</span>
            ले यस अघि नाबालक परिचयपत्र बनाएको छैन ।
        </p>

        {/* 1. Name */}
        <div className="form-group-block">
            <div className="row">
                <label>१. नाबालकको नाम,थर : <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.child_name_ne} onChange={e => setField('child_name_ne', e.target.value)} />
            </div>
            <div className="row">
                <label className="en-label">Full Name(In Block): <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.child_fullname_en} onChange={e => setField('child_fullname_en', e.target.value)} />
            </div>
        </div>

        {/* 2. Gender */}
        <div className="form-group-block">
            <div className="row">
                <label>२. लिङ्ग</label>
                <select className="inline-select" value={form.child_gender} onChange={e => setField('child_gender', e.target.value)}>
                    <option>पुरुष</option>
                    <option>महिला</option>
                    <option>अन्य</option>
                </select>
                <label className="en-label ml-20">Sex:</label>
                <span className="en-label">{form.child_gender}</span>
            </div>
        </div>

        {/* 3. Birth Place */}
        <div className="form-group-block">
            <div className="row">
                <label>३. नाबालकको जन्मस्थान (जन्म दर्ता प्र. प्र. बमोजिम): देश: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.birth_country} onChange={e => setField('birth_country', e.target.value)} />
                <label>प्रदेश: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.birth_province} onChange={e => setField('birth_province', e.target.value)} />
                <label>जिल्ला:</label>
                <input type="text" className="line-input medium-input" value={form.birth_district} onChange={e => setField('birth_district', e.target.value)} />
                <label>न.पा/गा.पा:</label>
                <input type="text" className="line-input medium-input" value={form.birth_rm_mun} onChange={e => setField('birth_rm_mun', e.target.value)} />
            </div>
        </div>

        {/* 4. Father's Details */}
        <div className="form-group-block">
            <div className="row">
                <label>४. बाबुको नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.father_name} onChange={e => setField('father_name', e.target.value)} />
                <label>ना.प्र.नं. र जारी मिति: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.father_citizenship} onChange={e => setField('father_citizenship', e.target.value)} />
            </div>
        </div>

        {/* 5. Mother's Details */}
        <div className="form-group-block">
            <div className="row">
                <label>५. आमाको नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.mother_name} onChange={e => setField('mother_name', e.target.value)} />
                <label>ना.प्र.नं. र जारी जिल्ला: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.mother_citizenship} onChange={e => setField('mother_citizenship', e.target.value)} />
            </div>
        </div>

        {/* 6. Guardian's Details */}
        <div className="form-group-block">
            <div className="row">
                <label>६. संरक्षकको नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.guardian_name} onChange={e => setField('guardian_name', e.target.value)} />
            </div>
            <div className="row">
                <label>संरक्षकको ठेगाना</label>
                <input type="text" className="line-input full-width" value={form.guardian_address} onChange={e => setField('guardian_address', e.target.value)} />
            </div>
        </div>

        {/* 7. Permanent Address */}
        <div className="form-group-block">
            <div className="row">
                <label>७. नाबालकको स्थायी ठेगाना: जिल्ला <span className="underline-text">{form.permanent_district}</span></label>
                <label className="ml-20">गा.पा/न.पा: <span className="underline-text">{form.permanent_mun}</span></label>
                <label className="ml-20">वडा नं: <span className="underline-text">{form.permanent_ward}</span></label>
            </div>
        </div>

        {/* 8. Date of Birth */}
        <div className="form-group-block">
            <div className="row">
                <label>८. नाबालकको जन्म मिति: वि.स. <span className="underline-text">{form.birth_date_bs}</span></label>
                <label className="ml-20">AD: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.birth_date_ad} onChange={e => setField('birth_date_ad', e.target.value)} />
            </div>
        </div>

        {/* 9. Grandparents */}
        <div className="form-group-block">
            <div className="row">
                <label>९. हजुरबुबाको नाम थर <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.grandfather_name} onChange={e => setField('grandfather_name', e.target.value)} />
                <label>हजुर आमाको नाम थर <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.grandmother_name} onChange={e => setField('grandmother_name', e.target.value)} />
            </div>
        </div>

        <p className="declaration-text">
            मैले माथि लेखेको व्यहोरा ठीक साँचो हो, झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनी सही गर्ने।
        </p>

        {/* --- Applicant Signature --- */}
        <div className="applicant-signature-section">
            <h4 className="bold-text">निवेदक</h4>
            <div className="sig-row">
                <label>दस्तखत:</label>
                <input type="text" className="line-input medium-input" value={form.applicant_signature_name} onChange={e => setField('applicant_signature_name', e.target.value)} />
            </div>
            <div className="sig-row">
                <label>नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} />
            </div>
            <div className="sig-row">
                <label>नाबालकसँगको नाता: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.applicant_relationship} onChange={e => setField('applicant_relationship', e.target.value)} />
            </div>
            <div className="sig-row">
                <label>मिति: <span className="underline-text">{form.applicant_date}</span></label>
            </div>
        </div>

        <hr className="section-divider" />

        {/* Recommendation Section (Bottom) */}
        <div className="recommendation-section">
            <h4 className="center-text underline-text bold-text">गाउँपालिका / नगरपालिका वडा अध्यक्षको सिफारिस</h4>

            <div className="rec-body">
                <p>
                    जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-10">नागार्जुन नगरपालिका</span> वडा नं <span className="bold-text">१</span> मा स्थायी बसोबास गरी बस्ने यसमा लेखिएका श्री
                    <select className="inline-select"><option>श्री</option></select>
                    <input type="text" className="inline-box-input medium-box" value={form.recommender_name} onChange={e => setField('recommender_name', e.target.value)} required /> को नाम उल्लेखित ब्यहोरा सहि भएकोले सिफारिस गरिन्छ ।
                </p>
            </div>

            <div className="rec-footer-row">
                <div className="rec-left">
                    <div className="row">
                        <label>कार्यालयको नाम :</label>
                        <span className="underline-text">नागार्जुन नगरपालिका</span>
                    </div>
                    <div className="row">
                        <label>मिति <span className="underline-text">{form.applicant_date}</span></label>
                    </div>
                </div>
                <div className="rec-right">
                    <div className="row">
                        <label>सिफारिस गर्ने:</label>
                    </div>
                    <div className="row">
                        <label>दस्तखत:</label>
                        <input type="text" className="line-input medium-input" value={form.recommender_name} onChange={e => setField('recommender_name', e.target.value)} />
                    </div>
                    <div className="row">
                        <label>नाम थर: <span className="red">*</span></label>
                        <input type="text" className="line-input medium-input" value={form.recommender_name} onChange={e => setField('recommender_name', e.target.value)} />
                    </div>
                    <div className="row">
                        <label>पद: </label>
                        <select className="inline-select" value={form.recommender_designation} onChange={e => setField('recommender_designation', e.target.value)}>
                          <option>पद छनौट गर्नुहोस्</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* --- Footer Applicant Details Box --- */}
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

export default MinorIdentityCardRecommendation;
