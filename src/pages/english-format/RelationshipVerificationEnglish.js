import React, { useState } from 'react';
import './RelationshipVerificationEnglish.css';

const RelationshipVerification = () => {
  // State for most form fields
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    mainPersonTitle: 'Mr.',
    mainPersonName: '',
    relation: 'grandson',
    fatherTitle: 'Mr.',
    fatherName: '',
    motherRelation: 'son',
    motherTitle: '',
    motherName: '',
    mrsName: '',
    residencyType: 'Permanent',
    municipality: 'Nagarjun Municipality',
    wardNo1: '1',
    district1: 'Kathmandu',
    country1: 'Nepal',
    prevWardNo: '',
    prevDistrict: 'Koshi Province',
    prevCountry: 'Nepal',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  // State for the dynamic relatives table
  const [relatives, setRelatives] = useState([
    { id: 1, title: 'Mr.', name: '', relation: 'Grandfather' },
  ]);

  // Handle changes for standard form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes within the relatives table
  const handleRelativeChange = (index, e) => {
    const { name, value } = e.target;
    const newRelatives = [...relatives];
    newRelatives[index][name] = value;
    setRelatives(newRelatives);
  };

  // Add a new row to the relatives table
  const addRelative = () => {
    setRelatives((prev) => [
      ...prev,
      { id: prev.length + 1, title: 'Mr.', name: '', relation: '' },
    ]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Relatives:', relatives);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="verification-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img src="https://i.imgur.com/YOUR_LOGO_URL.png" alt="Nagarjun Municipality Logo" className="logo" />
          <h1>Nagarjun Municipality</h1>
          <h2>1 No. Ward Office</h2>
          <h3>Kathmandu, Bagmati Province, Nepal</h3>
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
          <strong>Subject: <u>Relationship Verification</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select name="mainPersonTitle" value={formData.mainPersonTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="mainPersonName" placeholder="Full Name" value={formData.mainPersonName} onChange={handleChange} required />
          ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
            <option>grandson</option>
            <option>granddaughter</option>
          </select>
          of
          <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="fatherName" placeholder="Father's/Grandfather's Name" value={formData.fatherName} onChange={handleChange} required />
          ,
          <select name="motherRelation" value={formData.motherRelation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select name="motherTitle" value={formData.motherTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required />
          and Mrs.
          <input type="text" name="mrsName" value={formData.mrsName} onChange={handleChange} required />,
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}>
            <option>Permanent</option>
            <option>Temporary</option>
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
            {/* Add other wards */}
          </select>
          ,
          <input type="text" name="district1" value={formData.district1} onChange={handleChange} />
          District,
          <select name="prevDistrict" value={formData.prevDistrict} onChange={handleChange}>
            <option>Koshi Province</option>
            <option>Bagmati Province</option>
            {/* Add other districts/provinces */}
          </select>
          ,
          <input type="text" name="country1" value={formData.country1} onChange={handleChange} />
          (Previously:
          Ward No.
          <input type="text" name="prevWardNo" value={formData.prevWardNo} onChange={handleChange} required />
          * ,
          <select name="prevDistrict" value={formData.prevDistrict} onChange={handleChange}>
            <option>Koshi Province</option>
            <option>Bagmati Province</option>
          </select>
          District,
          <input type="text" name="prevCountry" value={formData.prevCountry} onChange={handleChange} />
          , Nepal). This certificate
          is issued according to the Section 12, Sub-Section 2 (E) (1) of Local Government Operation Act 2074 B.S. (2017 A.D.) As per the application proceeded
          in this office following members are the relatives of the applicant as mentioned below:
        </p>

        <table className="relatives-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Relative's Name</th>
              <th>Relation with Applicant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {relatives.map((relative, index) => (
              <tr key={relative.id}>
                <td>{index + 1}</td>
                <td>
                  <select name="title" value={relative.title} onChange={(e) => handleRelativeChange(index, e)}>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                </td>
                <td>
                  <input type="text" name="name" value={relative.name} onChange={(e) => handleRelativeChange(index, e)} required />
                </td>
                <td>
                  <select name="relation" value={relative.relation} onChange={(e) => handleRelativeChange(index, e)}>
                    <option>Grandfather</option>
                    <option>Grandmother</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Son</option>
                    <option>Daughter</option>
                  </select>
                </td>
                <td>
                  {index === relatives.length - 1 && (
                    <button type="button" onClick={addRelative} className="add-btn">+</button>
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
          <div className="form-group">
            <label>Applicant Name *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Applicant Address *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Applicant Citizenship Number *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group">
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

export default RelationshipVerification;