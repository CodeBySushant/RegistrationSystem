import React, { useState } from 'react';
import './TaxClearanceNewFormat.css'; // The CSS file for styling

const TaxClearanceNewFormat = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-11-01',
    applicantTitle: 'Master.',
    applicantNameBody: '',
    relation: 'son',
    guardianTitle: 'Master.',
    guardianName: '',
    municipality: 'Nagarjun Municipality',
    wardNo: '1',
    prevAddress: '',
    prevWardNo: '',
    prevProvince: 'Koshi Province',
    prevCountry: 'Nepal',
    fiscalYear: '2022/2023',
    designation: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [incomeSources, setIncomeSources] = useState([
    {
      id: 1,
      sourceName: '',
      initialIncomeFY1: '',
      initialIncomeFY2: '',
      initialIncomeFY3: '',
      taxAmountFY1: '',
      taxAmountFY2: '',
      taxAmountFY3: '',
      incomeAfterFY1: '',
      incomeAfterFY2: '',
      incomeAfterFY3: '',
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    const newSources = [...incomeSources];
    newSources[index][name] = value;
    setIncomeSources(newSources);
  };

  const addIncomeSource = () => {
    setIncomeSources((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sourceName: '',
        initialIncomeFY1: '',
        initialIncomeFY2: '',
        initialIncomeFY3: '',
        taxAmountFY1: '',
        taxAmountFY2: '',
        taxAmountFY3: '',
        incomeAfterFY1: '',
        incomeAfterFY2: '',
        incomeAfterFY3: '',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    console.log('Income Sources:', incomeSources);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="tax-clearance-new-container">
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
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />
          ,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input type="text" name="guardianName" placeholder="Father's Name" value={formData.guardianName} onChange={handleChange} required />
          resident of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>Nagarjun Municipality</option>
          </select>
          , Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>1</option>
          </select>
          , (Previously:
          <input type="text" name="prevAddress" placeholder="Address" value={formData.prevAddress} onChange={handleChange} required />
          , Ward No.
          <input type="text" name="prevWardNo" placeholder="Ward" value={formData.prevWardNo} onChange={handleChange} required />
          ),
          <select name="prevProvince" value={formData.prevProvince} onChange={handleChange}>
            <option>Koshi Province</option>
            <option>Bagmati Province</option>
          </select>
          ,
          <select name="prevCountry" value={formData.prevCountry} onChange={handleChange}>
            <option>Nepal</option>
          </select>
          has been regularly paying all the applicable government taxes to till date & have no any does of tax up to the fiscal year
          <input type="text" name="fiscalYear" value={formData.fiscalYear} onChange={handleChange} required />
          A.D.
          <br />
          We have issued this Tax Clearance Certificate after related verification and investigation from the records division of our office. We would also like to
          inform you that government tax is exemption for agricultural income according to income tax Act. 2058 B.S. (2002 A.D.), Chapter 8 Section 11 Clause 1 & 2.
        </p>

        <div className="table-wrapper">
            <table className="income-table">
                <thead>
                    <tr>
                        <th rowSpan="2">S.N.</th>
                        <th rowSpan="2">Sources Of Income</th>
                        <th colSpan="3">Fiscal Year</th>
                        <th rowSpan="2"></th>
                    </tr>
                    <tr>
                        <th>2020/2021 A.D.</th>
                        <th>2021/2022 A.D.</th>
                        <th>2022/2023 A.D.</th>
                    </tr>
                </thead>
                {incomeSources.map((source, index) => (
                    <tbody key={source.id}>
                        <tr>
                            <td rowSpan="5">{index + 1}</td>
                            <td colSpan="4">
                                <input type="text" name="sourceName" value={source.sourceName} onChange={(e) => handleIncomeChange(index, e)} placeholder="Source of Income" required />
                            </td>
                            <td rowSpan="5" className="action-cell">
                                {index === incomeSources.length - 1 && (
                                    <button type="button" onClick={addIncomeSource} className="add-btn">+</button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Initial Income in NPR</td>
                            <td><input type="text" name="initialIncomeFY1" value={source.initialIncomeFY1} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                            <td><input type="text" name="initialIncomeFY2" value={source.initialIncomeFY2} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                            <td><input type="text" name="initialIncomeFY3" value={source.initialIncomeFY3} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                        </tr>
                        <tr>
                            <td>Tax Amount in NPR</td>
                            <td><input type="text" name="taxAmountFY1" value={source.taxAmountFY1} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                            <td><input type="text" name="taxAmountFY2" value={source.taxAmountFY2} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                            <td><input type="text" name="taxAmountFY3" value={source.taxAmountFY3} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                        </tr>
                        <tr>
                            <td>Income After Tax in NPR</td>
                            <td><input type="text" name="incomeAfterFY1" value={source.incomeAfterFY1} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                            <td><input type="text" name="incomeAfterFY2" value={source.incomeAfterFY2} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                            <td><input type="text" name="incomeAfterFY3" value={source.incomeAfterFY3} onChange={(e) => handleIncomeChange(index, e)} required /></td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="status-cell">Tax Cleared</td>
                            <td className="status-cell">Tax Cleared</td>
                            <td className="status-cell">Tax Cleared</td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>

        <div className="info-notes">
            <p>For details about income tax exemption, you may check the website of Nepal Government Income Tax Act.: <a href="http://www.lawcommission.gov.np" target="_blank" rel="noopener noreferrer">www.lawcommission.gov.np</a></p>
            <p>*Note: According to Income Tax Act, 2058 B.S. Government of Nepal, income from agriculture does not attract any income tax government taxes. Local Government may charge different fees to verify the income documents.</p>
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

export default TaxClearanceNewFormat;