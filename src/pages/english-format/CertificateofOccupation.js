import React, { useState } from 'react';
import './CertificateofOccupation.css'; // The CSS file for styling

const CertificateOfOccupation = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantTitle: 'Mr.',
    applicantNameBody: '',
    relation: 'Son',
    fatherTitle: 'Mr.',
    fatherName: '',
    motherTitle: 'Mrs.',
    motherName: '',
    residencyType: 'permanent',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    district: 'Kathmandu',
    country: 'Nepal',
    applicantNameAgain: '',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [occupations, setOccupations] = useState([
    { id: 1, ownerTitle: 'Mr.', ownerName: '', relationship: '', occupation: '' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOccupationChange = (index, e) => {
    const { name, value } = e.target;
    const newOccupations = [...occupations];
    newOccupations[index][name] = value;
    setOccupations(newOccupations);
  };

  const addOccupationRow = () => {
    setOccupations((prev) => [
      ...prev,
      { id: prev.length + 1, ownerTitle: 'Mr.', ownerName: '', relationship: '', occupation: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    console.log('Occupations:', occupations);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="certificate-of-occupation-container">
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
          <strong>Subject: <u>Certificate Of Occupation</u></strong>
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
            <option>Son</option>
            <option>Daughter</option>
          </select>
          of
          <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />
          and
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
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          ,
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          ,
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          .
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="applicantNameAgain" placeholder="Applicant Name" value={formData.applicantNameAgain} onChange={handleChange} required />
          has been involving in following occupations.
        </p>

        <table className="occupations-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Owner's Name</th>
              <th>Relationship with Applicant</th>
              <th>Occupation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {occupations.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="owner-name-cell">
                  <select name="ownerTitle" value={item.ownerTitle} onChange={(e) => handleOccupationChange(index, e)}>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                  <input type="text" name="ownerName" value={item.ownerName} onChange={(e) => handleOccupationChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="relationship" value={item.relationship} onChange={(e) => handleOccupationChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="occupation" value={item.occupation} onChange={(e) => handleOccupationChange(index, e)} required />
                </td>
                <td>
                  {index === occupations.length - 1 && (
                    <button type="button" onClick={addOccupationRow} className="add-btn">+</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default CertificateOfOccupation;