import React, { useState } from 'react';
import './SurnameVerificationCertificateNew.css'; // The CSS file for styling

const SurnameVerificationCertificateNew = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-11-01',
    applicantTitle: 'Mr.',
    applicantNameBody: 'Manjit Thapa Magar (Appli',
    surname1: 'Thapa Magar',
    applicantNameAgain: 'Mr. Manjit Thapa Magar',
    surname2: 'Thapa',
    surnameContext: 'cl',
    fatherName: 'Late Min Bahadur Thapa',
    surname3: 'Thapa Magar',
    surname4: 'Thapa',
    relationship: 'son',
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
    console.log('Surname Verification Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="surname-verification-new-container">
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
          <strong>Subject: <u>Surname Verification Certifi</u></strong>
          <br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          As per the application submitted by
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="applicantNameBody" value={formData.applicantNameBody} onChange={handleChange} required />
          ,to verify the family surname and this is verified that there is
          "
          <input type="text" name="surname1" value={formData.surname1} onChange={handleChange} required />
          " in the name of
          <input type="text" name="applicantNameAgain" value={formData.applicantNameAgain} onChange={handleChange} required />
          and there is "
          <input type="text" name="surname2" value={formData.surname2} onChange={handleChange} required />
          " in fathers' surname,
          <input type="text" name="surnameContext" value={formData.surnameContext} onChange={handleChange} required />
          "
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          ". However, it is verified that "
          <input type="text" name="surname3" value={formData.surname3} onChange={handleChange} required />
          " and "
          <input type="text" name="surname4" value={formData.surname4} onChange={handleChange} required />
          " are similar surnames and they are father and
          <select name="relationship" value={formData.relationship} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          . It is requested to forward document without any hesitation.
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

export default SurnameVerificationCertificateNew;