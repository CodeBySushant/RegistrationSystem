import React, { useState } from 'react';
import './DigitalVerification.css'; // The CSS file for styling

const DigitalVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantTitle: 'Mr.',
    applicantNameBody: '',
    relation: 'son',
    guardianTitle: 'Mr.',
    guardianName: '',
    motherName: '',
    residencyType: 'permanent',
    municipality: 'Nagarjun Municipality',
    wardNo1: '1',
    prevDesignation: '',
    prevWardNo: '',
    prevDistrict: '',
    district: 'Bagmati Province',
    city: 'Kathmandu',
    country: 'Nepal',
    purpose: 'student visa',
    destination: 'Australia',
    contactName: '',
    contactDesignation: '',
    contactNumber: '',
    contactEmail: '',
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
    console.log('Digital Verification Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="digital-verification-container">
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
          <strong>Subject: <u>DIGITAL VERIFICATION CERTIFICATE</u></strong>
          <br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that all the documents provided by our office to
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />
          ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="guardianName" placeholder="Father's Name" value={formData.guardianName} onChange={handleChange} required />
          and
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
          Ward No.
          <select name="wardNo1" value={formData.wardNo1} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          (Previously
          <input type="text" name="prevDesignation" placeholder="e.g., VDC" value={formData.prevDesignation} />
          Ward No.
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} required />
          ),
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          ,
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          ,
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          for the purpose of
          <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />
          for
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} />
          are genuine and authentic. So, if you have any inquiry about above mentioned documents, please feel free to contact us at mentioned below:
        </p>

        <div className="contact-details-inline">
          <div className="contact-row">
            <label>Name: *</label>
            <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required />
          </div>
          <div className="contact-row">
            <label>Designation: *</label>
            <input type="text" name="contactDesignation" value={formData.contactDesignation} onChange={handleChange} required />
          </div>
          <div className="contact-row">
            <label>Contact Number: *</label>
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="contact-row">
            <label>Email: *</label>
            <input type="text" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
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

export default DigitalVerification;