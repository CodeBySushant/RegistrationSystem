import React, { useState } from 'react';
import './AnnualIncomeVerificationNew.css'; // The CSS file for styling

const AnnualIncomeVerificationNew = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-11-01',
    applicantNameBody: '',
    relation: 'son',
    guardianTitle: 'Mr.',
    guardianName: '',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    prevAddress: '',
    prevWardNo: '',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    country: 'Nepal',
    totalNPR_fy1: '',
    totalNPR_fy2: '',
    totalNPR_fy3: '',
    currency: 'USD',
    totalCurrency_fy1: '',
    totalCurrency_fy2: '',
    totalCurrency_fy3: '',
    usdRate: '',
    rateDate: '',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [incomeSources, setIncomeSources] = useState([
    { id: 1, sourceName: '', fy1_amount: '', fy2_amount: '', fy3_amount: '' },
  ]);

  // Handle changes for main form fields (including table totals)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for the dynamic income source rows
  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    const newSources = [...incomeSources];
    newSources[index][name] = value;
    setIncomeSources(newSources);
  };

  // Add a new row to the income sources table
  const addIncomeRow = () => {
    setIncomeSources((prev) => [
      ...prev,
      { id: prev.length + 1, sourceName: '', fy1_amount: '', fy2_amount: '', fy3_amount: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    console.log('Income Sources:', incomeSources);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="annual-income-verification-container">
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
          <strong>Subject: <u>Verification Of Annual Income</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />
          ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>Mr.</option>
            <option>Mrs.</option>
          </select>
          <input type="text" name="guardianName" placeholder="Guardian's Name" value={formData.guardianName} onChange={handleChange} required />
          , permanent resident of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          , Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          (Previously:
          <input type="text" name="prevAddress" placeholder="Address" value={formData.prevAddress} onChange={handleChange} required />
          , Ward No.
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} required />
          ),
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          ,
          <input type="text" name="province" value={formData.province} onChange={handleChange} />
          ,
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          has income from the following sources as shown below.
        </p>

        <div className="table-wrapper">
          <table className="income-table">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Owner/Sources of Income</th>
                <th>Fiscal Year</th>
                <th>Fiscal Year</th>
                <th>Fiscal Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {incomeSources.map((source, index) => (
                <tr key={source.id}>
                  <td>{index + 1}</td>
                  <td><input type="text" name="sourceName" value={source.sourceName} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                  <td><input type="text" name="fy1_amount" value={source.fy1_amount} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                  <td><input type="text" name="fy2_amount" value={source.fy2_amount} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                  <td><input type="text" name="fy3_amount" value={source.fy3_amount} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                  <td className="action-cell">
                    {index === incomeSources.length - 1 && (
                      <button type="button" onClick={addIncomeRow} className="add-btn">+</button>
                    )}
                  </td>
                </tr>
              ))}
              {/* Static Footer Rows */}
              <tr className="total-row">
                <td colSpan="2">Total Income in NPR</td>
                <td><input type="text" name="totalNPR_fy1" value={formData.totalNPR_fy1} onChange={handleChange} required /></td>
                <td><input type="text" name="totalNPR_fy2" value={formData.totalNPR_fy2} onChange={handleChange} required /></td>
                <td><input type="text" name="totalNPR_fy3" value={formData.totalNPR_fy3} onChange={handleChange} required /></td>
                <td></td>
              </tr>
              <tr className="total-row">
                <td colSpan="2">
                  Total Income in
                  <select name="currency" value={formData.currency} onChange={handleChange} className="inline-select">
                    <option>USD</option>
                    <option>AUD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                  </select>
                </td>
                <td><input type="text" name="totalCurrency_fy1" value={formData.totalCurrency_fy1} onChange={handleChange} required /></td>
                <td><input type="text" name="totalCurrency_fy2" value={formData.totalCurrency_fy2} onChange={handleChange} required /></td>
                <td><input type="text" name="totalCurrency_fy3" value={formData.totalCurrency_fy3} onChange={handleChange} required /></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="note-body">
          *Note: 1 USD =
          <input type="text" name="usdRate" placeholder="Rate" value={formData.usdRate} onChange={handleChange} required />
          NPR (Nepal Rastra Bank Foreign Rate on date of
          <input type="text" name="rateDate" placeholder="Date" value={formData.rateDate} onChange={handleChange} required />
          )
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

export default AnnualIncomeVerificationNew;