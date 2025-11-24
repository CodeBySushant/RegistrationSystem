import React, { useState } from 'react';
import './EconomicStatus.css'; // The CSS file for styling

const EconomicStatus = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantTitle: 'Mr.',
    applicantNameBody: '',
    relation: 'Grand Son',
    grandFatherTitle: 'Mr.',
    grandFatherName: '',
    sonOfTitle: 'Mr.',
    sonOfName: '',
    motherTitle: 'Mrs.',
    motherName: '',
    residencyType: 'permanent',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    district1: 'Kathmandu',
    district2: 'Kathmandu',
    province: 'Bagmati Province',
    country: 'Nepal',
    retiredFrom: '',
    retirementDateBS: '2082-07-15',
    retirementDateAD: '2025-11-01',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Economic Status Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="economic-status-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          {/* Replace with your logo path */}
          <img src="https://i.imgur.com/YOUR_LOGO_URL.png" alt="Nagarjun Municipality Logo" className="logo" />
          <h1>Nagarjun Municipality</h1>
          <h2>1 No. Ward Office</h2>
          <h3>Kathmandu, Kathmandu</h3>
          <h3>Bagmati Province, Nepal</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input
              type="text"
              name="refNo"
              value={formData.refNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>Subject: <u>Economic Status Verification</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />
          ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>Grand Son</option>
            <option>Son</option>
            <option>Daughter</option>
            <option>Grand Daughter</option>
          </select>
          of
          <select name="grandFatherTitle" value={formData.grandFatherTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="grandFatherName" placeholder="Grandfather's Name" value={formData.grandFatherName} onChange={handleChange} required />
          , Son of
          <select name="sonOfTitle" value={formData.sonOfTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="sonOfName" placeholder="Father's Name" value={formData.sonOfName} onChange={handleChange} required />
          &
          <select name="motherTitle" value={formData.motherTitle} onChange={handleChange}>
            <option>Mrs.</option>
          </select>
          <input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required />
          ,
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}>
            <option>permanent</option>
            <option>temporary</option>
          </select>
          resident of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          , Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          ,
          <input type="text" name="district1" value={formData.district1} onChange={handleChange} />
          ,
          <input type="text" name="district2" value={formData.district2} onChange={handleChange} />
          District,
          <input type="text" name="province" value={formData.province} onChange={handleChange} />
          ,
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          was retired from
          <input type="text" name="retiredFrom" placeholder="Organization" value={formData.retiredFrom} onChange={handleChange} required />
          . Nowadays, his economic status is not good. According to his self-declaration and witness at the ward level, he is alive till
          <input type="text" name="retirementDateBS" value={formData.retirementDateBS} onChange={handleChange} />
          B.S. (
          <input type="text" name="retirementDateAD" value={formData.retirementDateAD} onChange={handleChange} />
          A.D.).
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
          <button type="submit" className="submit-btn">Save and Print Record</button>
        </div>
      </form>
    </div>
  );
};

export default EconomicStatus;