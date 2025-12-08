import React, { useState } from 'react';
import './BirthCertificateNew.css';

const BirthCertificateNew = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-11-01',
    childTitle: 'Master.',
    childName: '',
    relation: 'son',
    fatherTitle: 'Master.',
    fatherName: '',
    motherTitle: 'Master.',
    motherName: '',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    prevAddress1: '',
    prevWardNo: '',
    prevAddress2: '',
    prevProvince: 'Koshi Province',
    prevCountry: 'Nepal',
    dobBS: '',
    dobAD: '',
    birthMunicipality: 'Nagarjun Municipality',
    birthWardNo: '1',
    birthPrevAddress1: '',
    birthPrevWardNo: '',
    birthPrevAddress2: '',
    birthPrevProvince: 'Koshi Province',
    birthPrevCountry: 'Nepal',
    recordLocation: 'this Nagarjun Municipality',
    recordWardNo: '1',
    recordOffice: 'No. ward Office',
    imageBoxTitle: 'Master.',
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
    // minimal validation: required applicant fields and child/father/mother names
    const required = [
      'childName', 'fatherName', 'motherName',
      'applicantName', 'applicantAddress', 'applicantCitizenship', 'applicantPhone'
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
      const res = await fetch('/api/forms/birth-certificate-new', {
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
    <div className="birth-cert-new-container">
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
          <strong>Subject: <u>BIRTH CERTIFICATE</u></strong><br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select name="childTitle" value={formData.childTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
            <option>Miss.</option>
          </select>
          <input type="text" name="childName" placeholder="Child's Name" value={formData.childName} onChange={handleChange} required /> ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required /> and
          <select name="motherTitle" value={formData.motherTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mrs.</option>
          </select>
          <input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required /> of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>, Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select> (Previously:
          <input type="text" name="prevAddress1" placeholder="Address" value={formData.prevAddress1} onChange={handleChange} /> , Ward No.
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} /> ),
          <input type="text" name="prevAddress2" placeholder="Address" value={formData.prevAddress2} onChange={handleChange} /> ,
          <select name="prevProvince" value={formData.prevProvince} onChange={handleChange}>
            <option>Koshi Province</option>
            <option>Bagmati Province</option>
          </select> ,
          <select name="prevCountry" value={formData.prevCountry} onChange={handleChange}>
            <option>Nepal</option>
          </select> was born on (
          <input type="text" name="dobBS" placeholder="DOB B.S." value={formData.dobBS} onChange={handleChange} /> /
          <input type="date" name="dobAD" placeholder="DOB A.D." value={formData.dobAD} onChange={handleChange} /> ) at
          <select name="birthMunicipality" value={formData.birthMunicipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>, Ward No.
          <select name="birthWardNo" value={formData.birthWardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select> (Previously:
          <input type="text" name="birthPrevAddress1" placeholder="Address" value={formData.birthPrevAddress1} onChange={handleChange} /> , Ward No.
          <input type="text" name="birthPrevWardNo" placeholder="Ward" value={formData.birthPrevWardNo} onChange={handleChange} /> ),
          <input type="text" name="birthPrevAddress2" placeholder="Address" value={formData.birthPrevAddress2} onChange={handleChange} /> ,
          <select name="birthPrevProvince" value={formData.birthPrevProvince} onChange={handleChange}>
            <option>Koshi Province</option>
            <option>Bagmati Province</option>
          </select> ,
          <select name="birthPrevCountry" value={formData.birthPrevCountry} onChange={handleChange}>
            <option>Nepal</option>
          </select> according to the record of
          <input type="text" name="recordLocation" value={formData.recordLocation} onChange={handleChange} /> , Ward No.
          <input type="text" name="recordWardNo" value={formData.recordWardNo} onChange={handleChange} /> <input type="text" name="recordOffice" value={formData.recordOffice} onChange={handleChange} /> .
        </p>

        <div className="image-box-container">
          <div className="image-box"></div>
          <select name="imageBoxTitle" value={formData.imageBoxTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
            <option>Miss.</option>
          </select>
        </div>

        <p className="final-text">
          This Birth Certificate is issued according to the local Government Operation Act 2074 B.S. (2017 A.D.), Chapter 3, Section 12, Sub-section 2, Clause (E-7).
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

export default BirthCertificateNew;
