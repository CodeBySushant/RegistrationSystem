import React, { useState } from 'react';
// Renamed CSS import
import './OccupationVerificationNew.css'; 

// Renamed Component
const OccupationVerificationNew = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantTitle: 'Master.',
    applicantNameBody: '',
    relation: 'son',
    fatherTitle: 'Master.',
    fatherName: '',
    residencyType: 'permanent',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    prevAddress1: '',
    prevWardNo: '',
    prevAddress2: '',
    prevProvince: 'Koshi Province',
    prevCountry: 'Nepal',
    description: 'is a respected person as well as one of the renowned farmer ...',
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
    // Updated console log
    console.log('Occupation Verification (New) Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    // Renamed main container class
    <div className="occupation-verification-new-container">
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
          {/* The subject is still "BIRTH CERTIFICATE" as per the image */ }
          <strong>Subject: <u>OCCUPATION VERIFICATION CERTIFICATE</u></strong>
          <br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
            <option>Miss.</option>
            <option>Mrs.</option>
          </select>
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />
          ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />
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
          , (Previously:
          <input type="text" name="prevAddress1" placeholder="Address" value={formData.prevAddress1} onChange={handleChange} required />
          Ward No.
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} required />
          ),
          <input type="text" name="prevAddress2" placeholder="Address" value={formData.prevAddress2} onChange={handleChange} required />
          ,
          <select name="prevProvince" value={formData.prevProvince} onChange={handleChange}>
            <option>Koshi Province</option>
            <option>Bagmati Province</option>
          </select>
          ,
          <select name="prevCountry" value={formData.prevCountry} onChange={handleChange}>
            <option>Nepal</option>
          </select>
        </p>
        <div className="certificate-body">
           <textarea
             name="description"
             value={formData.description}
             onChange={handleChange}
             rows="3"
             required
           ></textarea>
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

// Renamed export
export default OccupationVerificationNew;