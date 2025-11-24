import React, { useState } from 'react';
import './AnnualIncomeCertificate.css'; // The CSS file for styling

const AnnualIncomeCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantTitle: 'Mr.',
    applicantNameBody: '',
    relation: 'son',
    guardianTitle: 'Mr.',
    guardianName: '',
    guardianRelation: 'wife', // This field seems to be in the screenshot but separate
    residencyType: 'permanent resident',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    totalIncomeNRs: '',
    totalIncomeWords: '',
    usdRate: '',
    equivalentUSD: '',
    equivalentUSDWords: '',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [incomes, setIncomes] = useState([
    { id: 1, ownerTitle: 'Mr.', ownerName: '', relation: '', sourceDescription: '', sourceEntity: '', annualIncome: '', remark: '' },
  ]);

  // Handle changes for main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes within the incomes table
  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    const newIncomes = [...incomes];
    newIncomes[index][name] = value;
    setIncomes(newIncomes);
  };

  // Add a new row to the incomes table
  const addIncomeRow = () => {
    setIncomes((prev) => [
      ...prev,
      { id: prev.length + 1, ownerTitle: 'Mr.', ownerName: '', relation: '', sourceDescription: '', sourceEntity: '', annualIncome: '', remark: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    console.log('Income Sources:', incomes);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="annual-income-container">
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
          <strong>Subject: <u>Annual Income Certificate</u></strong>
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
            <option>son</option>
            <option>wife</option>
            <option>daughter</option>
          </select>
          of
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="guardianName" placeholder="Father/Husband's Name" value={formData.guardianName} onChange={handleChange} required />
          and
          <input type="text" name="guardianRelation" placeholder="e.g., wife" value={formData.guardianRelation} onChange={handleChange} />
          of
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}>
            <option>permanent resident</option>
            <option>temporary resident</option>
          </select>
          of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          District,
          <input type="text" name="province" value={formData.province} onChange={handleChange} />
          Nepal has following sources of income from the following sources. The details have been verified according to the evidence and records that are provided to office.
        </p>

        <table className="incomes-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Owner's Name</th>
              <th>Relation</th>
              <th>Sources on Income</th>
              <th>Annual Income</th>
              <th>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, index) => (
              <tr key={income.id}>
                <td>{index + 1}</td>
                <td className="owner-name-cell">
                  <select name="ownerTitle" value={income.ownerTitle} onChange={(e) => handleIncomeChange(index, e)}>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                  <input type="text" name="ownerName" value={income.ownerName} onChange={(e) => handleIncomeChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="relation" value={income.relation} onChange={(e) => handleIncomeChange(index, e)} required />
                </td>
                <td className="source-cell">
                  <input type="text" name="sourceDescription" value={income.sourceDescription} onChange={(e) => handleIncomeChange(index, e)} required />
                  <label>Income from</label>
                  <input type="text" name="sourceEntity" value={income.sourceEntity} onChange={(e) => handleIncomeChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="annualIncome" value={income.annualIncome} onChange={(e) => handleIncomeChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="remark" value={income.remark} onChange={(e) => handleIncomeChange(index, e)} />
                </td>
                <td>
                  {index === incomes.length - 1 && (
                    <button type="button" onClick={addIncomeRow} className="add-btn">+</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-section">
          <div className="summary-row">
            <div className="form-group-inline">
              <label>Total Annual Income in NRs. *</label>
              <input type="text" name="totalIncomeNRs" value={formData.totalIncomeNRs} onChange={handleChange} required />
            </div>
            <div className="form-group-inline">
              <label>(In words: *</label>
              <input type="text" name="totalIncomeWords" value={formData.totalIncomeWords} onChange={handleChange} required className="words-input" /> )
            </div>
          </div>
          <div className="summary-row">
            <div className="form-group-inline">
              <label>Today's Buying Rate USD 1 = NRs. *</label>
              <input type="text" name="usdRate" value={formData.usdRate} onChange={handleChange} required />
            </div>
          </div>
           <div className="summary-row">
             <div className="form-group-inline">
                <label>Equivalent to USD *</label>
                <input type="text" name="equivalentUSD" value={formData.equivalentUSD} onChange={handleChange} required />
             </div>
            <div className="form-group-inline">
              <label>(In words: *</label>
              <input type="text" name="equivalentUSDWords" value={formData.equivalentUSDWords} onChange={handleChange} required className="words-input" /> )
            </div>
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

export default AnnualIncomeCertificate;