import React, { useState } from 'react';
import './BusinessDeregistrationForm.css'; // The CSS file for styling

const BusinessDeregistrationForm = () => {
  const [formData, setFormData] = useState({
    headerTo: 'श्रीमान्',
    headerMunicipality: 'नागार्जुन नगरपालिका',
    headerOffice: 'काठमाडौँ',
    date: '२०८२.०७.१५',
    municipality: 'नागार्जुन नगरपालिका',
    firmType: 'प्राइभेट फर्म',
    firmRegNo: '',
    firmName: '',
    dissolveReason: '',
    applicantNameForDissolve: '',
    sigSignature: '',
    sigName: '',
    sigAddress: '',
    sigFirmStamp: '',
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
    console.log('Business Deregistration Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="business-dereg-container">
      <form onSubmit={handleSubmit}>
        <div className="title-header">
          <h3>अनुसूची-१५.३</h3>
          <h4>प्राइभेट फर्म तथा साझेदारी फर्म खारेजीको लागि निवेदन</h4>
        </div>

        <div className="form-row">
          <div className="header-to-group">
            <div className="form-group-inline">
              <input
                type="text"
                name="headerTo"
                value={formData.headerTo}
                onChange={handleChange}
                className="header-input"
              />
              <span>ज्यु,</span>
            </div>
            <input
              type="text"
              name="headerMunicipality"
              value={formData.headerMunicipality}
              onChange={handleChange}
              className="header-input"
            />
            <input
              type="text"
              name="headerOffice"
              value={formData.headerOffice}
              onChange={handleChange}
              className="header-input"
            />
          </div>
          <div className="header-meta">
            <div className="stamp-box">
              रु. २० को टिकट
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
        </div>

        <div className="subject-line">
          <strong>विषय: <u>फर्म खारेजी सम्बन्धमा ।</u></strong>
        </div>

        <p className="certificate-body">
          उपर्युक्त सम्बन्धमा मेरो नाममा यस
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>नागार्जुन नगरपालिका</option>
          </select>
          मा व्यापारिक प्रयोजनको लागि दर्ता भएको
          <select name="firmType" value={formData.firmType} onChange={handleChange}>
            <option>प्राइभेट फर्म</option>
            <option>साझेदारी फर्म</option>
          </select>
          नं.
          <input type="text" name="firmRegNo" value={formData.firmRegNo} onChange={handleChange} required className="short-input" />
          को
          <input type="text" name="firmName" placeholder="फर्मको नाम" value={formData.firmName} onChange={handleChange} required />
          नामको फर्म
          <input type="text" name="dissolveReason" placeholder="कारण" value={formData.dissolveReason} onChange={handleChange} required />
          कारणले खारेज गरी पाउन रु. २० को टिकट टाँसी यो निवेदन दिएको छु। उक्त फर्मको नामबाट नेपाल सरकार र अन्य कुनै निकायमा कुनै राजस्व र अन्य रकम बुझाउन बाँकी छैन। कुनै किसिमको रकमा वा राजस्व बुझाउन बाँकी देखिएमा पछि कुनै उजुरबाजुर नगरी सम्बन्धित निकायमा बुझाउन मेरो मन्जुरी छ। निम्नानुसार लाग्ने दस्तुर तिरी मेरो
          <input type="text" name="applicantNameForDissolve" placeholder="तपाईको नाम" value={formData.applicantNameForDissolve} onChange={handleChange} required />
          नामको उक्त फर्म खारेज गरी पाउन श्रीमान समक्ष अनुरोध गर्दछु।
        </p>

        <div className="documents-list">
          <strong>संलग्न कागजातहरु:</strong>
          <ol>
            <li>सक्कल प्रमाणपत्र</li>
            <li>नागरिकता दर्ता प्रमाणपत्रको प्रतिलिपि</li>
            <li>कर तिरेको निस्सा</li>
            <li>लेखा परिक्षण प्रतिवेदन</li>
            <li>अन्य (भएमा उल्लेख गर्ने)</li>
          </ol>
        </div>

        <div className="signature-wrapper">
          <div className="thumb-section">
            <label className="section-title">औंठा छाप</label>
            <div className="thumb-boxes">
              <div className="thumb-box">
                <label>बायाँ</label>
                <div className="thumb-area"></div>
              </div>
              <div className="thumb-box">
                <label>दायाँ</label>
                <div className="thumb-area"></div>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <p className="signature-label">निवेदक</p>
            <div className="form-group-inline">
              <label>दस्तखत : *</label>
              <input type="text" name="sigSignature" value={formData.sigSignature} onChange={handleChange} required />
            </div>
            <div className="form-group-inline">
              <label>नाम : *</label>
              <input type="text" name="sigName" value={formData.sigName} onChange={handleChange} required />
            </div>
            <div className="form-group-inline">
              <label>ठेगाना : *</label>
              <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} required />
            </div>
            <div className="form-group-inline">
              <label>फर्मको छाप : *</label>
              <input type="text" name="sigFirmStamp" value={formData.sigFirmStamp} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div className="form-group-column">
            <label>निवेदकको नाम *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDeregistrationForm;