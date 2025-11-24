import React, { useState } from 'react';
import './TaxClearBasic.css'; // The CSS file for styling

const TaxClearBasic = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantNameBody: '',
    residencyType: 'Permanent/Temporary',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    prevWardNo: '',
    district: 'Kathmandu',
    country: 'Nepal',
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
    console.log('Tax Clear Basic Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="tax-clear-basic-container">
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
          <strong>Subject: <u>TAX CLEARANCE CERTIFICATE</u></strong>
          <br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          As per the submission of documents required for the given application, this is to certify that
          <input type="text" name="applicantNameBody" placeholder="Applicant Name" value={formData.applicantNameBody} onChange={handleChange} required className="long-input" />
          ,
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}>
            <option>Permanent/Temporary</option>
            <option>Permanent</option>
            <option>Temporary</option>
          </select>
          resident of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          (previously Ward No.
          <input type="text" name="prevWardNo" placeholder="Prev. Ward" value={formData.prevWardNo} onChange={handleChange} required />
          )
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          ,
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          , Nepal have paid all the taxes of properties, and annual income as per the rules of Nepal Government.
          <br /><br />
          As per the office record and our observation, there are no pending dues to be paid to this office till date.
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

export default TaxClearBasic;