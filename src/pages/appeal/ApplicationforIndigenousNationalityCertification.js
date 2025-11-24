import React, { useState } from 'react';
import './ApplicationforIndigenousNationalityCertification.css'; // The CSS file for styling

const ApplicationforIndigenousNationalityCertification = () => {
  const [formData, setFormData] = useState({
    date: '२०८२.०७.१५',
    headerDistrict: 'काठमाडौँ',
    mainDistrict: 'काठमाडौँ',
    palikaName: '',
    wardNo: '',
    residentName: '',
    relation: 'छोरा',
    guardianName: '',
    tribeName: '',
    sigName: '',
    sigAddress: '',
    sigMobile: '',
    sigSignature: '',
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
    console.log('Application for Indigenous/Nationality Certification Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="indigenous-cert-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group date-group">
            <label>मिति :</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>जनजाति प्रमाणित गरि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} required />
          जिल्ला
          <input type="text" name="palikaName" placeholder="गाउँपालिका/नगरपालिका" value={formData.palikaName} onChange={handleChange} required />
          वडा नं.
          <input type="text" name="wardNo" placeholder="वडा" value={formData.wardNo} onChange={handleChange} required className="short-input" />
          निवासी
          <input type="text" name="residentName" placeholder="निवासीको नाम" value={formData.residentName} onChange={handleChange} required />
          को
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </select>
          म
          <input type="text" name="guardianName" placeholder="अभिभावकको नाम" value={formData.guardianName} onChange={handleChange} required />
          जनजाति अन्तर्गत
          <input type="text" name="tribeName" placeholder="जातिको नाम" value={formData.tribeName} onChange={handleChange} required />
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो निवेदन पेश गरेको छु ।
        </p>

        <div className="signature-section-left">
          <h4>निवेदक</h4>
          <div className="form-group-column">
            <label>नामथर: *</label>
            <input type="text" name="sigName" value={formData.sigName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>ठेगाना: *</label>
            <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>मोबाइल नं: *</label>
            <input type="text" name="sigMobile" value={formData.sigMobile} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>हस्ताक्षर:</label>
            <input type="text" name="sigSignature" value={formData.sigSignature} onChange={handleChange} />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationforIndigenousNationalityCertification;