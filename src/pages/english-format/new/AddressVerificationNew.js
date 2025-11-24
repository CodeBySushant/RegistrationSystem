import React, { useState } from 'react';
import './AddressVerificationNew.css'; // The CSS file for styling

const AddressVerificationNew = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantNameBody: '',
    oldWardNo: '1',
    oldMunicipality: '',
    oldProvince: 'Koshi Province',
    newMunicipality: 'Nagarjun Municipality',
    newWardNo: '',
    newProvince: '',
    newCountry: 'Nepal',
    decisionSource: 'Council of Ministry',
    govSource: 'Government of Nepal',
    decisionDate: '10th March, 2017',
    finalAddress1: '',
    finalAddress2: 'Nagarjun Municipality',
    finalWardNo: '1',
    finalProvince: 'Koshi Province',
    finalCountry: 'Nepal',
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
    console.log('Address Verification (New) Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="address-verification-new-container">
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
          <strong>Subject: <u>VERIFICATION OF ADDRESS</u></strong>
          <br />
          <strong><u>TO WHOM IT MAY CONCERN</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <input type="text" name="applicantNameBody" placeholder="Applicant's Name" value={formData.applicantNameBody} onChange={handleChange} required />
          , Ward No.
          <input type="text" name="oldWardNo" value={formData.oldWardNo} onChange={handleChange} required />
          ,
          <input type="text" name="oldMunicipality" placeholder="Old Municipality/VDC" value={formData.oldMunicipality} onChange={handleChange} required />
          ,
          <input type="text" name="oldProvince" value={formData.oldProvince} onChange={handleChange} required />
          has been changed into
          <input type="text" name="newMunicipality" value={formData.newMunicipality} onChange={handleChange} required />
          , Ward No.
          <input type="text" name="newWardNo" placeholder="New Ward" value={formData.newWardNo} onChange={handleChange} required />
          ,
          <input type="text" name="newProvince" placeholder="New Province" value={formData.newProvince} onChange={handleChange} required />
          ,
          <input type="text" name="newCountry" value={formData.newCountry} onChange={handleChange} required />
          . as per the decision of
          <input type="text" name="decisionSource" value={formData.decisionSource} onChange={handleChange} required />
          ,
          <input type="text" name="govSource" value={formData.govSource} onChange={handleChange} required />
          on
          <input type="text" name="decisionDate" value={formData.decisionDate} onChange={handleChange} required />
          .
          <br />
          Thus, addresses
          <input type="text" name="finalAddress1" placeholder="Old Address" value={formData.finalAddress1} onChange={handleChange} required />
          and
          <input type="text" name="finalAddress2" value={formData.finalAddress2} onChange={handleChange} required />
          , Ward No.
          <input type="text" name="finalWardNo" value={formData.finalWardNo} onChange={handleChange} required />
          ,
          <input type="text" name="finalProvince" value={formData.finalProvince} onChange={handleChange} required />
          ,
          <input type="text" name="finalCountry" value={formData.finalCountry} onChange={handleChange} required />
          represents same place.
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

export default AddressVerificationNew;