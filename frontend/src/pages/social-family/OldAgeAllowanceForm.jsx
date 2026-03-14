import React, { useState } from 'react';
import './OldAgeAllowanceForm.css';

/* Safe API base resolver for CRA, Vite and window fallback */
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

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/old-age-allowance`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const emptyState = {
  municipality: 'नागार्जुन नगरपालिका',
  ward_no: '',
  date_bs: '२०८२-०८-०५',
  subject: 'नाम दर्ता सम्बन्धमा',
  target_group: 'जेष्ठ नागरिक (अन्य)',

  // applicant details
  applicant_name: '',
  father_name: '',
  mother_name: '',
  address: '',
  npr_no: '',
  npr_issue_district: '',
  gender: 'पुरुष',
  dob_bs: '२०८२-०८-०५',
  age_reach_date: '',

  municipality_name: 'नागार्जुन नगरपालिका',
  ward_title: '१ नं. वडा कार्यालय'
};

const OldAgeAllowanceForm = () => {
  const [form, setForm] = useState({ ...emptyState });
  const [saving, setSaving] = useState(false);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const now = timestampNow();
      // Build full payload to match forms.json / db columns
      const payload = {
        municipality: form.municipality ?? '',
        ward_no: form.ward_no ?? '',
        date_bs: form.date_bs ?? null,
        subject: form.subject ?? '',
        target_group: form.target_group ?? '',

        applicant_name: form.applicant_name ?? '',
        father_name: form.father_name ?? '',
        mother_name: form.mother_name ?? '',
        address: form.address ?? '',
        npr_no: form.npr_no ?? '',
        npr_issue_district: form.npr_issue_district ?? '',
        gender: form.gender ?? '',
        dob_bs: form.dob_bs ?? '',
        age_reach_date: form.age_reach_date ?? null,

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
    <form className="old-age-allowance-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        वृद्धा भत्ताको निवेदन
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; वृद्धा भत्ताको निवेदन</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <h1 className="main-title">वृद्धा भत्ताको निवेदन ।</h1>
        <h2 className="sub-title">(दफा ६ को उपदफा ३ सँग सम्बन्धित)</h2>
      </div>

      {/* --- Salutation & Date --- */}
      <div className="salutation-row">
        <div className="salutation-left">
          <p className="bold-text">श्री अध्यक्ष ज्यू,</p>
          <div className="input-group">
            <label htmlFor="municipality">नागार्जुन नगरपालिका</label>
            <span className="red">*</span>
            <input id="municipality" value={form.municipality} onChange={e => setField('municipality', e.target.value)} type="text" className="line-input medium-input" />
          </div>
        </div>
        <div className="salutation-right">
          <p>मिति : <input value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
        </div>
      </div>

      <div className="ward-row">
        <div className="input-group">
            <label htmlFor="wardNo" style={{marginLeft: '200px'}}>वडा नं</label>
            <span className="red">*</span>
            <input id="wardNo" value={form.ward_no} onChange={e => setField('ward_no', e.target.value)} type="text" className="line-input small-input" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text bold-text"><input value={form.subject} onChange={e => setField('subject', e.target.value)} className="line-input" /></span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p>महोदय,</p>
        <p className="body-paragraph">
          उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम सहुँला बुझाउँला।
        </p>
      </div>

      {/* --- Target Group --- */}
      <div className="target-group-section">
        <label htmlFor="targetGroup">लक्षित समूह:</label>
        <select id="targetGroup" value={form.target_group} onChange={e => setField('target_group', e.target.value)} className="styled-select">
          <option>जेष्ठ नागरिक (दलित)</option>
          <option>जेष्ठ नागरिक (अन्य)</option>
          <option>एकल महिला</option>
          <option>विधवा</option>
          <option>पूर्ण अपाङ्गता</option>
          <option>अति अशक्त अपाङ्गता</option>
          <option>लोपोन्मुख आदिवासी/जनजाति</option>
          <option>बालबालिका</option>
        </select>
      </div>

      {/* --- Applicant Details Section --- */}
      <div className="applicant-section">
        <h3 className="section-title center-text">निवेदक</h3>
        <div className="applicant-grid">
          <div className="grid-column">
            <div className="input-group">
              <label>नाम, थर: <span className="red">*</span></label>
              <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>बाबुको नाम: <span className="red">*</span></label>
              <input value={form.father_name} onChange={e => setField('father_name', e.target.value)} type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>ठेगाना: <span className="red">*</span></label>
              <input value={form.address} onChange={e => setField('address', e.target.value)} type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>ना.प्र.नं.: <span className="red">*</span></label>
              <input value={form.npr_no} onChange={e => setField('npr_no', e.target.value)} type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>जारी जिल्ला: <span className="red">*</span></label>
              <input value={form.npr_issue_district} onChange={e => setField('npr_issue_district', e.target.value)} type="text" className="line-input full-width" />
            </div>
          </div>

          <div className="grid-column">
            <div className="input-group">
              <label>लिङ्ग: <span className="red">*</span></label>
              <select value={form.gender} onChange={e => setField('gender', e.target.value)} className="styled-select full-width">
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </select>
            </div>
            <div className="input-group">
              <label>आमाको नाम: <span className="red">*</span></label>
              <input value={form.mother_name} onChange={e => setField('mother_name', e.target.value)} type="text" className="line-input full-width" />
            </div>
            <div className="input-group pt-20">
              <label>जन्ममिति: <span className="bold-text"><input value={form.dob_bs} onChange={e => setField('dob_bs', e.target.value)} className="line-input" /></span></label>
            </div>
            <div className="input-group">
              <label>जेष्ठ नागरिकको हकमा उमेर पुग्ने मिति:</label>
              <input value={form.age_reach_date} onChange={e => setField('age_reach_date', e.target.value)} type="text" className="line-input full-width" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="form-footer" style={{ marginTop: 20 }}>
        <button type="submit" className="save-print-btn" disabled={saving}>
          {saving ? 'Saving...' : 'रेकर्ड सेभ र प्रिन्ट गर्नुहोस्'}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </form>
  );
};

export default OldAgeAllowanceForm;
