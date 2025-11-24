import React, { useState } from 'react';
import './TaxCleranceCertificate.css'; // Link to the CSS file

const TaxClearanceCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    ownerTitle: 'Mr.',
    ownerNameBody: '',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    district: 'Bagmati Province',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [properties, setProperties] = useState([
    { id: 1, description: '', ownerTitle: 'Mr.', ownerName: '', location: '', plotNo: '', area: '' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePropertyChange = (index, e) => {
    const { name, value } = e.target;
    const newProperties = [...properties];
    newProperties[index][name] = value;
    setProperties(newProperties);
  };

  const addProperty = () => {
    setProperties((prev) => [
      ...prev,
      { id: prev.length + 1, description: '', ownerTitle: 'Mr.', ownerName: '', location: '', plotNo: '', area: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tax Clearance Form Data:', formData);
    console.log('Properties:', properties);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="tax-clearance-container">
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
          <strong>Subject: <u>Tax Clearance Certificate</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select name="ownerTitle" value={formData.ownerTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="ownerNameBody" placeholder="Name" value={formData.ownerNameBody} onChange={handleChange} required />
          resident of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
            {/* Add other municipalities */}
          </select>
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            {/* Add other wards */}
          </select>
          (
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          , Nepal) have paid all the taxes of their properties.
        </p>

        <div className="table-wrapper"> {/* Added wrapper for overflow scrolling */ }
          <table className="properties-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Description</th>
                <th>Owner's Name</th>
                <th>Location</th>
                <th>Plot No.</th>
                <th>Area</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input type="text" name="description" value={property.description} onChange={(e) => handlePropertyChange(index, e)} required />
                  </td>
                  <td className="owner-name-cell">
                    <select name="ownerTitle" value={property.ownerTitle} onChange={(e) => handlePropertyChange(index, e)}>
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select>
                    <input type="text" name="ownerName" value={property.ownerName} onChange={(e) => handlePropertyChange(index, e)} required />
                  </td>
                  <td>
                    <input type="text" name="location" value={property.location} onChange={(e) => handlePropertyChange(index, e)} required />
                  </td>
                  <td>
                    <input type="text" name="plotNo" value={property.plotNo} onChange={(e) => handlePropertyChange(index, e)} required />
                  </td>
                  <td>
                    <input type="text" name="area" value={property.area} onChange={(e) => handlePropertyChange(index, e)} required />
                  </td>
                  <td>
                    {index === properties.length - 1 && (
                      <button type="button" onClick={addProperty} className="add-btn">+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default TaxClearanceCertificate;