import React, { useState } from 'react';
import './MinorIdentityCard.css';

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

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/minor-identity-card`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const MinorIdentityCard = () => {
  const [form, setForm] = useState({
    chalani_no: '',
    date: '२०८२-०८-०६',
    addressee_type: 'जिल्ला',
    addressee_office: '',
    addressee_place1: '',
    addressee_place2: '',
    child_name_ne: '',
    child_gender: 'पुरुष',
    child_fullname_en: '',
    birth_district: '',
    birth_rm: '',
    birth_ward_no: '',
    permanent_district: '',
    permanent_rm: '',
    permanent_ward_no: '',
    birth_date_bs: '',
    birth_date_ad: '',
    father_name: '',
    father_address: '',
    mother_name: '',
    mother_address: '',
    parent_citizenship_no: '',
    guardian_name: '',
    guardian_address: '',
    applicant_thumb_right: '',
    applicant_thumb_left: '',
    applicant_name: '',
    applicant_address: '',
    applicant_citizenship_no: '',
    applicant_phone: '',
    recommender_date: '२०८२-०८-०६',
    recommender_name: '',
    recommender_designation: '',
    recommender_office_seal: '',
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
        addressee_place1: form.addressee_place1 ?? '',
        addressee_place2: form.addressee_place2 ?? '',
        child_name_ne: form.child_name_ne ?? '',
        child_gender: form.child_gender ?? '',
        child_fullname_en: form.child_fullname_en ?? '',
        birth_district: form.birth_district ?? '',
        birth_rm: form.birth_rm ?? '',
        birth_ward_no: form.birth_ward_no ?? '',
        permanent_district: form.permanent_district ?? '',
        permanent_rm: form.permanent_rm ?? '',
        permanent_ward_no: form.permanent_ward_no ?? '',
        birth_date_bs: form.birth_date_bs ?? '',
        birth_date_ad: form.birth_date_ad ?? '',
        father_name: form.father_name ?? '',
        father_address: form.father_address ?? '',
        mother_name: form.mother_name ?? '',
        mother_address: form.mother_address ?? '',
        parent_citizenship_no: form.parent_citizenship_no ?? '',
        guardian_name: form.guardian_name ?? '',
        guardian_address: form.guardian_address ?? '',
        applicant_thumb_right: form.applicant_thumb_right ?? '',
        applicant_thumb_left: form.applicant_thumb_left ?? '',
        applicant_name: form.applicant_name ?? '',
        applicant_address: form.applicant_address ?? '',
        applicant_citizenship_no: form.applicant_citizenship_no ?? '',
        applicant_phone: form.applicant_phone ?? '',
        recommender_date: form.recommender_date ?? null,
        recommender_name: form.recommender_name ?? '',
        recommender_designation: form.recommender_designation ?? '',
        recommender_office_seal: form.recommender_office_seal ?? '',
        municipality_name: form.municipality_name ?? '',
        ward_title: form.ward_title ?? '',
        // timestamps so backend won't set them null
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
    <form className="minor-card-application-container" onSubmit={handleSubmit}>
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

      {/* --- Photo Box --- */}
      <div className="photo-box-wrapper">
          <div className="photo-box">नाबालकको फोटो</div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
          <p className="bold-text">श्रीमान प्रमुख जिल्ला अधिकारी ज्यू,</p>
          <div className="addressee-row">
              <select className="inline-select" value={form.addressee_type} onChange={e => setField('addressee_type', e.target.value)}>
                  <option>जिल्ला</option>
                  <option>इलाका</option>
              </select>
              <span> प्रशासन कार्यालय,</span>
          </div>
          <div className="addressee-row">
              <input type="text" className="line-input medium-input" value={form.addressee_office} onChange={e => setField('addressee_office', e.target.value)} />
              <span className="red">*</span>
              <span>,</span>
              <input type="text" className="line-input medium-input" value={form.addressee_place1} onChange={e => setField('addressee_place1', e.target.value)} />
              <span className="red">*</span>
          </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:- <span className="underline-text">नाबालक परिचय पत्र पाउँ।</span></p>
      </div>

      {/* --- Main Body (selected fields wired) --- */}
      <div className="form-body">
        <p className="body-paragraph">
            महोदय,<br/>
            मेरो निम्न विवरण भएको छोरा/छोरी <input type="text" className="line-input medium-input" value={form.child_name_ne} onChange={e => setField('child_name_ne', e.target.value)} /> <span className="red">*</span> को नाबालक परिचयपत्र आवश्यक भएको हुदा रु. १०/- को टिकट टाँसी नाबालक परिचयपत्र पाउँन यो निवेदन पेश गरेको छु ।
        </p>
        <div className="section-header underline-text center-text bold-text">विवरण:</div>
        
        <div className="form-fields-grid">
            <div className="form-row">
                <label>नामथर : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.child_name_ne} onChange={e => setField('child_name_ne', e.target.value)} />
                
                <label className="ml-20">लिङ्ग :</label>
                <select className="inline-select" value={form.child_gender} onChange={e => setField('child_gender', e.target.value)}>
                    <option>पुरुष</option>
                    <option>महिला</option>
                    <option>अन्य</option>
                </select>
            </div>

            <div className="form-row">
                <label className="en-label">FULL NAME(In Block): <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.child_fullname_en} onChange={e => setField('child_fullname_en', e.target.value)} />
                
                <label className="en-label ml-20">Sex:</label>
                <span className="en-label">{form.child_gender}</span>
            </div>

            <div className="form-row">
                <label>जन्मस्थान: जिल्ला: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.birth_district} onChange={e => setField('birth_district', e.target.value)} />
                
                <label>गाउँपालिका <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.birth_rm} onChange={e => setField('birth_rm', e.target.value)} />
                
                <label>वडा नं.: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.birth_ward_no} onChange={e => setField('birth_ward_no', e.target.value)} />
            </div>

            <div className="form-row">
                <label className="en-label">Place of Birth(In Block) District: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.birth_district} onChange={e => setField('birth_district', e.target.value)} />
                
                <label className="en-label">R.M. : <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.birth_rm} onChange={e => setField('birth_rm', e.target.value)} />
                
                <label className="en-label">WardNo: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.birth_ward_no} onChange={e => setField('birth_ward_no', e.target.value)} />
            </div>

            <div className="form-row">
                <label>स्थायी ठेगाना : जिल्ला: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.permanent_district} onChange={e => setField('permanent_district', e.target.value)} />
                
                <label>गाउँपालिका <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.permanent_rm} onChange={e => setField('permanent_rm', e.target.value)} />
                
                <label>वडा नं.: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.permanent_ward_no} onChange={e => setField('permanent_ward_no', e.target.value)} />
            </div>

            <div className="form-row">
                <label className="en-label">Permanent Address(In Block): District: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.permanent_district} onChange={e => setField('permanent_district', e.target.value)} />
                
                <label className="en-label">R.M. : <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.permanent_rm} onChange={e => setField('permanent_rm', e.target.value)} />
                
                <label className="en-label">WardNo: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" value={form.permanent_ward_no} onChange={e => setField('permanent_ward_no', e.target.value)} />
            </div>

            <div className="form-row">
                <label>जन्म मिति: </label>
                <input type="text" className="line-input medium-input" value={form.birth_date_bs} onChange={e => setField('birth_date_bs', e.target.value)} placeholder="YYYY-MM-DD (BS)" />
            </div>
            <div className="form-row">
                <label className="en-label">BirthDate: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.birth_date_ad} onChange={e => setField('birth_date_ad', e.target.value)} placeholder="YYYY-MM-DD (AD)" />
                <span className="en-label">A.D.</span>
            </div>

            <div className="form-row">
                <label>बाबुको नामथर : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.father_name} onChange={e => setField('father_name', e.target.value)} />
                <label>ठेगाना : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.father_address} onChange={e => setField('father_address', e.target.value)} />
            </div>

            <div className="form-row">
                <label>आमाको नामथर : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.mother_name} onChange={e => setField('mother_name', e.target.value)} />
                <label>ठेगाना : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.mother_address} onChange={e => setField('mother_address', e.target.value)} />
            </div>

            <div className="form-row">
                <label>बाबुको वा आमाको नागरिकता नं. <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" value={form.parent_citizenship_no} onChange={e => setField('parent_citizenship_no', e.target.value)} />
            </div>

            <div className="form-row">
                <label>संरक्षकको नाम ठेगाना : <span className="red">*</span></label>
                <input type="text" className="line-input long-input" value={form.guardian_name} onChange={e => setField('guardian_name', e.target.value)} />
                <span>,</span>
                <input type="text" className="line-input medium-input" value={form.guardian_address} onChange={e => setField('guardian_address', e.target.value)} />
            </div>
        </div>

        <div className="thumb-section">
            <p>नाबालकको औंठा छाप</p>
            <div className="thumb-box-container">
                <div className="thumb-box">दायाँ</div>
                <div className="thumb-box">बायाँ</div>
            </div>
        </div>

        <div className="signature-line-section">
            <label>नाबालकको हस्ताक्षर : ........................</label>
        </div>

        <p className="declaration-text bold-text">
            माथि लेखिएको व्यहोरा ठिक साँचो हो, झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनी सही गर्ने ।
        </p>

        <div className="applicant-sign-row">
            <div className="thumb-section">
                <p className="bold-text">निवेदकको सहीछाप</p>
                <div className="thumb-box-container">
                    <div className="thumb-box">दायाँ</div>
                    <div className="thumb-box">बायाँ</div>
                </div>
            </div>
            <div className="applicant-info-right">
                <div className="info-row">
                    <label className="bold-text">निवेदकको हस्ताक्षर:</label>
                </div>
                <div className="info-row">
                    <label>नामथर : <span className="red">*</span></label>
                    <input type="text" className="line-input medium-input" value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} />
                </div>
                <div className="info-row">
                    <label>ठेगाना : <span className="red">*</span></label>
                    <input type="text" className="line-input medium-input" value={form.applicant_address} onChange={e => setField('applicant_address', e.target.value)} />
                </div>
            </div>
        </div>

        <div className="recommendation-block">
            <p className="body-paragraph">
                निवेदक, श्री 
                <select className="inline-select"><option>श्री</option></select>
                <input type="text" className="inline-box-input medium-box" value={form.recommender_name} onChange={e => setField('recommender_name', e.target.value)} required /> <span className="red">*</span> ले श्री <input type="text" className="inline-box-input medium-box" value={form.child_name_ne} onChange={e => setField('child_name_ne', e.target.value)} required /> को छोरा श्री <input type="text" className="inline-box-input medium-box" value={form.father_name} onChange={e => setField('father_name', e.target.value)} required /> को नाबालक परिचयपत्र माग गरि पेश गरेको विवरण ठिक छ। निवेदक र निज नाबालक दुवैलाई म राम्ररी चिन्दछु।
            </p>
            
            <h4 className="bold-text" style={{marginTop: '10px'}}>सिफारिस गर्नेको:</h4>
            
            <div className="rec-footer-row">
                <div className="rec-left">
                    <div className="row">
                        <label>मिति <input type="text" className="line-input small-input" value={form.recommender_date} onChange={e => setField('recommender_date', e.target.value)} /></label>
                    </div>
                </div>
                <div className="rec-right">
                    <div className="row">
                        <label>दस्तखत: ........................</label>
                    </div>
                    <div className="row">
                        <label>नामथर : <span className="red">*</span></label>
                        <input type="text" className="line-input medium-input" value={form.recommender_name} onChange={e => setField('recommender_name', e.target.value)} />
                    </div>
                    <div className="row">
                        <label>पद: <select className="inline-select" value={form.recommender_designation} onChange={e => setField('recommender_designation', e.target.value)}><option>पद छनौट गर्नुहोस्</option></select></label>
                    </div>
                    <div className="row">
                        <label>कार्यालयको नाम र छाप:</label>
                        <input type="text" className="line-input medium-input" value={form.recommender_office_seal} onChange={e => setField('recommender_office_seal', e.target.value)} />
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* --- Applicant Details Box (Bottom) --- */}
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

export default MinorIdentityCard;
