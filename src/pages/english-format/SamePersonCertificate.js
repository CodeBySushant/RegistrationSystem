import React, { useState } from 'react';
import './SamePersonCertificate.css'; // The CSS file for styling

const SamePersonCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    // Main applicant
    applicantTitle: 'Mr.',
    applicantNameBody: '',
    applicantRelation: 'Son',
    applicantGuardianTitle: 'Mr.',
    applicantGuardianName: '',
    // Address
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    // First name variation
    doc1Source: '',
    doc1NameTitle: 'Mr.',
    doc1Name: '',
    // Second name variation
    doc2Source: '',
    doc2NameTitle: 'Mr.',
    doc2Name: '',
    doc2Relation: 'Son',
    doc2GuardianTitle: 'Mr.',
    doc2GuardianName: '',
    // Third name variation
    doc3Source: '',
    doc4Source: '',
    doc4NameTitle: 'Mr.',
    doc4Name: '',
    doc4Relation: 'Son',
    doc4GuardianTitle: 'Mr.',
    doc4GuardianName: '',
    // Final summary names
    finalName1Title: 'Mr.',
    finalName1: '',
    finalName2Title: 'Mr.',
    finalName2: '',
    // Other fields
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
    console.log('Same Person Certificate Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="same-person-container">
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
          <strong>Subject: <u>Same Person Certificate</u></strong>
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
          <select name="applicantRelation" value={formData.applicantRelation} onChange={handleChange}>
            <option>Son</option>
            <option>Daughter</option>
            <option>Grandson</option>
          </select>
          of
          <select name="applicantGuardianTitle" value={formData.applicantGuardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="applicantGuardianName" placeholder="Guardian's Name" value={formData.applicantGuardianName} onChange={handleChange} required />
          , is permanent resident of
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
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          District,
          <input type="text" name="province" value={formData.province} onChange={handleChange} />
          , Nepal. His name according to
          <input type="text" name="doc1Source" placeholder="Doc 1" value={formData.doc1Source} onChange={handleChange} required />
          is
          <select name="doc1NameTitle" value={formData.doc1NameTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="doc1Name" placeholder="Name 1" value={formData.doc1Name} onChange={handleChange} required />
          and
          <input type="text" name="doc2Source" placeholder="Doc 2" value={formData.doc2Source} onChange={handleChange} required />
          is
          <select name="doc2NameTitle" value={formData.doc2NameTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="doc2Name" placeholder="Name 2" value={formData.doc2Name} onChange={handleChange} required />
          (
          <select name="doc2Relation" value={formData.doc2Relation} onChange={handleChange}>
            <option>Son</option>
          </select>
          of
          <select name="doc2GuardianTitle" value={formData.doc2GuardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="doc2GuardianName" placeholder="Name 2's Father" value={formData.doc2GuardianName} onChange={handleChange} required />
          ). Mentioned in
          <input type="text" name="doc3Source" placeholder="Doc 3" value={formData.doc3Source} onChange={handleChange} required />
          and in
          <input type="text" name="doc4Source" placeholder="Doc 4" value={formData.doc4Source} onChange={handleChange} required />
          is
          <select name="doc4NameTitle" value={formData.doc4NameTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="doc4Name" placeholder="Name 3" value={formData.doc4Name} onChange={handleChange} required />
          (
          <select name="doc4Relation" value={formData.doc4Relation} onChange={handleChange}>
            <option>Son</option>
          </select>
          of
          <select name="doc4GuardianTitle" value={formData.doc4GuardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="doc4GuardianName" placeholder="Name 3's Father" value={formData.doc4GuardianName} onChange={handleChange} required />
          ) both are the same person.
        </p>

        <p className="certificate-body summary-line">
          So, this is certified that the name
          <select name="finalName1Title" value={formData.finalName1Title} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="finalName1" placeholder="Name 1" value={formData.finalName1} onChange={handleChange} required />
          and
          <select name="finalName2Title" value={formData.finalName2Title} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="finalName2" placeholder="Name 2" value={formData.finalName2} onChange={handleChange} required />
          stand for the same person.
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

export default SamePersonCertificate;