import React, { useState } from 'react';
import './MarriageCertificateEnglish.css'; // The CSS file for styling

const MarriageCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    groomTitle: 'Mr.',
    groomName: '',
    groomRelation: 'grandson',
    groomGuardianTitle: 'Mr.',
    groomGuardianName: '',
    groomMotherTitle: 'Mrs.',
    groomMotherName: '',
    residencyType: 'permanent',
    municipality: 'Nagarjun Municipality',
    wardNo1: '1',
    prevDesignation: 'ward no',
    prevWardNo: '',
    prevDistrict: 'Kathmandu',
    district: 'Bagmati Province',
    brideTitle: 'Miss.',
    brideName: '',
    brideRelation: 'granddaughter',
    brideGuardianTitle: 'Mr.',
    brideGuardianName: '',
    brideMotherTitle: 'Mrs.',
    brideMotherName: '',
    marriageDateBS: '2082-07-15',
    marriageDateAD: '2025-11-1',
    groomCitizenship: '',
    brideCitizenship: '',
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
    console.log('Marriage Certificate Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="marriage-certificate-container">
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
          <strong>Subject: <u>Marriage Certificate</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select name="groomTitle" value={formData.groomTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="groomName" placeholder="Groom's Name" value={formData.groomName} onChange={handleChange} required />
          ,
          <select name="groomRelation" value={formData.groomRelation} onChange={handleChange}>
            <option>grandson</option>
            <option>son</option>
          </select>
          of
          <select name="groomGuardianTitle" value={formData.groomGuardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="groomGuardianName" placeholder="Father/Grandfather's Name" value={formData.groomGuardianName} onChange={handleChange} required />
          and
          <select name="groomMotherTitle" value={formData.groomMotherTitle} onChange={handleChange}>
            <option>Mrs.</option>
          </select>
          <input type="text" name="groomMotherName" placeholder="Groom's Mother's Name" value={formData.groomMotherName} onChange={handleChange} required />
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
          <select name="wardNo1" value={formData.wardNo1} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          , (Previously
          <select name="prevDesignation" value={formData.prevDesignation} onChange={handleChange}>
            <option>ward no</option>
            <option>VDC</option>
          </select>
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} />
          ),
          <input type="text" name="prevDistrict" value={formData.prevDistrict} onChange={handleChange} />
          , district,
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          , Nepal is married to
          <select name="brideTitle" value={formData.brideTitle} onChange={handleChange}>
            <option>Miss.</option>
            <option>Mrs.</option>
          </select>
          <input type="text" name="brideName" placeholder="Bride's Name" value={formData.brideName} onChange={handleChange} required />
          ,
          <select name="brideRelation" value={formData.brideRelation} onChange={handleChange}>
            <option>granddaughter</option>
            <option>daughter</option>
          </select>
          of
          <select name="brideGuardianTitle" value={formData.brideGuardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="brideGuardianName" placeholder="Father/Grandfather's Name" value={formData.brideGuardianName} onChange={handleChange} required />
          and
          <select name="brideMotherTitle" value={formData.brideMotherTitle} onChange={handleChange}>
            <option>Mrs.</option>
          </select>
          <input type="text" name="brideMotherName" placeholder="Bride's Mother's Name" value={formData.brideMotherName} onChange={handleChange} required />
          , dated on
          <input type="text" name="marriageDateBS" value={formData.marriageDateBS} onChange={handleChange} />
          B.S. (
          <input type="text" name="marriageDateAD" value={formData.marriageDateAD} onChange={handleChange} />
          A.D.), according to their social custom.
        </p>

        <div className="citizenship-fields">
          <div className="form-group-inline">
            <label>Bridegroom's Citizenship No.: *</label>
            <input type="text" name="groomCitizenship" value={formData.groomCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-inline">
            <label>Bride's Citizenship No.: *</label>
            <input type="text" name="brideCitizenship" value={formData.brideCitizenship} onChange={handleChange} required />
          </div>
        </div>

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

export default MarriageCertificate;