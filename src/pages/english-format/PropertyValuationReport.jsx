import React, { useState } from 'react';
import './PropertyValuationReport.css'; // The CSS file for styling

const PropertyValuationReport = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-10-31',
    applicantTitle: 'Mr.',
    applicantNameBody: '',
    relation: 'Grandson',
    guardianTitle: 'Mr.',
    guardianName: '',
    residencyType: 'permanent/temporary',
    municipality: 'Nagarjun Municipality',
    wardNo1: '1',
    district1: 'Bagmati Province',
    propertyMunicipality: 'Nagarjun Municipality',
    wardNo2: '',
    propertyDistrict: 'Bagmati Province',
    valuationNRs: '',
    valuationWords: '',
    usdRate: '',
    equivalentUSD: '',
    equivalentUSDWords: '',
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

  const addPropertyRow = () => {
    setProperties((prev) => [
      ...prev,
      { id: prev.length + 1, description: '', ownerTitle: 'Mr.', ownerName: '', location: '', plotNo: '', area: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    console.log('Properties:', properties);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="property-valuation-container">
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
          <strong>Subject: <u>Property Valuation Report</u></strong>
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
            <option>Grandson</option>
            <option>Son</option>
            <option>Daughter</option>
          </select>
          of
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>Mr.</option>
          </select>
          <input type="text" name="guardianName" placeholder="Guardian's Name" value={formData.guardianName} onChange={handleChange} required />
          is a
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}>
            <option>permanent/temporary</option>
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
          <input type="text" name="district1" value={formData.district1} onChange={handleChange} />
          District,
          <input type="text" name="province" value={formData.province} onChange={handleChange} />
          , Nepal. The following properties are in
          <select name="propertyMunicipality" value={formData.propertyMunicipality} onChange={handleChange}>
             <option>Nagarjun Municipality</option>
          </select>
          Ward No.
          <input type="text" name="wardNo2" placeholder="Ward" value={formData.wardNo2} onChange={handleChange} required />
          District
          <input type="text" name="propertyDistrict" value={formData.propertyDistrict} onChange={handleChange} />
          , Nepal which have been valuated as per the current prevailing market rate as follows:
        </p>

        <strong>Land and Building Details</strong>
        <table className="properties-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Description</th>
              <th>Owner's Name</th>
              <th>Location</th>
              <th>Plot No.</th>
              <th>Area in Ropani ..</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop, index) => (
              <tr key={prop.id}>
                <td>{index + 1}</td>
                <td>
                  <input type="text" name="description" value={prop.description} onChange={(e) => handlePropertyChange(index, e)} required />
                </td>
                <td className="owner-name-cell">
                  <select name="ownerTitle" value={prop.ownerTitle} onChange={(e) => handlePropertyChange(index, e)}>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                  <input type="text" name="ownerName" value={prop.ownerName} onChange={(e) => handlePropertyChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="location" value={prop.location} onChange={(e) => handlePropertyChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="plotNo" value={prop.plotNo} onChange={(e) => handlePropertyChange(index, e)} required />
                </td>
                <td>
                  <input type="text" name="area" value={prop.area} onChange={(e) => handlePropertyChange(index, e)} required />
                </td>
                <td>
                  {index === properties.length - 1 && (
                    <button type="button" onClick={addPropertyRow} className="add-btn">+</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="measurements-info">
            <p><strong>All the measurements are carried as the below relation:</strong></p>
            <p>0-0-0-0 = Ropani-Aana-Paisa-Dam</p>
            <p>16 Aana = 1 Ropani</p>
            <p>4 Paisa = 1 Aana</p>
            <p>4 Dam = 1 Paisa</p>
        </div>

        <div className="summary-section">
          <div className="summary-row">
            <div className="form-group-inline">
              <label>Properties Valuation NRs. *</label>
              <input type="text" name="valuationNRs" value={formData.valuationNRs} onChange={handleChange} required />
            </div>
            <div className="form-group-inline">
              <label>(In words: *</label>
              <input type="text" name="valuationWords" value={formData.valuationWords} onChange={handleChange} required className="words-input" /> )
            </div>
          </div>
          <div className="summary-row">
            <div className="form-group-inline">
              <label>Today's Selling Rate USD 1 = NRs. *</label>
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

export default PropertyValuationReport;