import React, { useState } from 'react';
import './SurnameVerificationAfterMarriage.css';

const SurnameVerificationAfterMarriage = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-11-01',
    applicantNameBody: '',
    residencyType1: 'permanent resident',
    municipality1: 'Nagarjun Municipality',
    wardNo1: '1',
    district1: 'Kathmandu',
    province1: 'Bagmati Province',
    country1: 'Nepal',
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    residencyType2: 'permanent/temporary resident',
    municipality2: 'Nagarjun Municipality',
    wardNo2: '1',
    district2: 'Kathmandu',
    province2: 'Bagmati Province',
    country2: 'Nepal',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = [
      'applicantNameBody',
      'name1', 'name2', 'name3', 'name4',
      'applicantName',
      'applicantAddress',
      'applicantCitizenship',
      'applicantPhone',
      'designation'
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === '') return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone))) {
      return { ok: false, missing: 'applicantPhone (invalid)' };
    }
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) {
      alert('Please fill/validate field: ' + v.missing);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      const res = await fetch('/api/forms/surname-verification-after-marriage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `Server returned ${res.status}`);
      }
      const body = await res.json();
      alert('Saved successfully (id: ' + body.id + ')');
      setTimeout(() => window.print(), 200);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save: ' + (err.message || 'unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surname-verification-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img src="https://i.imgur.com/YOUR_LOGO_URL.png" alt="Nagarjun Municipality Logo" className="logo" />
          <h1>Nagarjun Municipality</h1>
          <h2>1 No. Ward Office</h2>
          <h3>Kathmandu, Kathmandu</h3>
          <h3>Bagmati Province, Nepal</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>Subject: <u>Surname Verification</u></strong><br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          According to the application submitted by
          <input type="text" name="applicantNameBody" placeholder="Applicant's Name" value={formData.applicantNameBody} onChange={handleChange} required />
          an
          <select name="residencyType1" value={formData.residencyType1} onChange={handleChange}>
            <option>permanent resident</option>
            <option>temporary resident</option>
          </select>
          of
          <select name="municipality1" value={formData.municipality1} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          Ward No.
          <select name="wardNo1" value={formData.wardNo1} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>,
          <input type="text" name="district1" value={formData.district1} onChange={handleChange} />,
          <input type="text" name="province1" value={formData.province1} onChange={handleChange} />,
          <input type="text" name="country1" value={formData.country1} onChange={handleChange} />.
          It is to certify that his
          <input type="text" name="name1" placeholder="Name 1" value={formData.name1} onChange={handleChange} required />
          named
          <input type="text" name="name2" placeholder="Name 2" value={formData.name2} onChange={handleChange} required />
          , the named
          <input type="text" name="name3" placeholder="Name 3" value={formData.name3} onChange={handleChange} required />
          and the named
          <input type="text" name="name4" placeholder="Name 4" value={formData.name4} onChange={handleChange} required />
          is the same person,
          <select name="residencyType2" value={formData.residencyType2} onChange={handleChange}>
            <option>permanent/temporary resident</option>
            <option>permanent resident</option>
            <option>temporary resident</option>
          </select>
          of
          <select name="municipality2" value={formData.municipality2} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          , Ward No.
          <select name="wardNo2" value={formData.wardNo2} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>,
          <input type="text" name="district2" value={formData.district2} onChange={handleChange} />,
          <input type="text" name="province2" value={formData.province2} onChange={handleChange} />,
          <input type="text" name="country2" value={formData.country2} onChange={handleChange} />.
        </p>

        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        <div className="applicant-details">
          <h3>Applicant Details</h3>
          <div className="form-group-column">
            <label>Applicant Name *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Address *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Citizenship Number *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Phone Number *</label>
            <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save and Print Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurnameVerificationAfterMarriage;
