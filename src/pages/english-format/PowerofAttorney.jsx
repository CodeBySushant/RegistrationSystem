import React, { useState } from 'react';
import './PowerofAttorney.css'; // Link to the CSS file

const PowerOfAttorney = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    deceasedTitle: 'Mr.',
    deceasedName: '',
    passportNo: '',
    expiredOn: '',
    dueTo: '',
    issuedPowerOfAttorneyOn: '', // This date input is for the "A.D. from Nepal" line
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [relatives, setRelatives] = useState([
    { id: 1, title: 'Mr.', name: '', address: '', age: '', signature: '', relationship: 'Grandfather' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRelativeChange = (index, e) => {
    const { name, value } = e.target;
    const newRelatives = [...relatives];
    newRelatives[index][name] = value;
    setRelatives(newRelatives);
  };

  const addRelative = () => {
    setRelatives((prev) => [
      ...prev,
      { id: prev.length + 1, title: 'Mr.', name: '', address: '', age: '', signature: '', relationship: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Power Of Attorney Form Data:', formData);
    console.log('Relatives:', relatives);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="power-of-attorney-container">
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
          <strong>Subject: <u>POWER OF ATTORNEY</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          We undersigned are the legal heirs of late
          <select name="deceasedTitle" value={formData.deceasedTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input type="text" name="deceasedName" placeholder="Name" value={formData.deceasedName} onChange={handleChange} required />
          of Nepal holder Nepalese Passport
          <input type="text" name="passportNo" placeholder="Passport No." value={formData.passportNo} onChange={handleChange} required />
          who expired on
          <input type="date" name="expiredOn" value={formData.expiredOn} onChange={handleChange} required />
          due to
          <input type="text" name="dueTo" placeholder="Reason" value={formData.dueTo} onChange={handleChange} required />
          .
          <br />
          We have issued this power of attorney in favor of the Nepalese Ambassador/Charged Affairs a.i.at the Nepalese Embassy
          to act on our behalf before judicial authorities labor authorities and other concerned government authorities.
          <br />
          The Nepalese Ambassador/Charged/Affaire a.i.is hereby authorized to defind, receive dues and any amount as decided by the judicial/administrative
          authorities, settle issue by compromise, pay lawyer's fee from compensation amount received, following up all the matters and take all necessary
          actions the Nepalese Ambassador is empowered to delegate all or some of his power hereof to his subordinates at the Nepalese Embassy in
          <input type="text" name="delegationLocation" placeholder="Location" value={formData.delegationLocation} onChange={handleChange} />
          or the designated lawyer.
          <br />
          We have issued this power of attorney on
          <input type="date" name="issuedPowerOfAttorneyOn" value={formData.issuedPowerOfAttorneyOn} onChange={handleChange} required />
          A.D. from Nepal
        </p>

        <div className="undersigned">
            <strong><u>Undersigned</u></strong>
        </div>

        <table className="relatives-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Relative's Name</th>
              <th>Relative's Address</th>
              <th>Age</th>
              <th>Signature or Thumb Print</th>
              <th>Relationship with Deceased</th>
              <th></th>
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
                  <input type="text" name="address" value={relative.address} onChange={(e) => handleRelativeChange(index, e)} required />
                </td>
                <td>
                  <input type="number" name="age" value={relative.age} onChange={(e) => handleRelativeChange(index, e)} min="0" required />
                </td>
                <td>
                    <input type="text" name="signature" placeholder="Sign/Thumb" value={relative.signature} onChange={(e) => handleRelativeChange(index, e)} />
                </td>
                <td>
                  <select name="relationship" value={relative.relationship} onChange={(e) => handleRelativeChange(index, e)}>
                    <option>Grandfather</option>
                    <option>Grandmother</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Spouse</option>
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

export default PowerOfAttorney;