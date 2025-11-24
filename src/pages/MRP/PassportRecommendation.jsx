import React, { useState } from 'react';
import './PassportRecommendation.css'; // The CSS file for styling

const PassportRecommendation = () => {
  const [formData, setFormData] = useState({
    letterNo: '२०८२/८३',
    refNo: '',
    date: '२०८२.०७.१५',
    day: 'ने.सं. - 1146 यलथाय्, 10 शनिबार',
    headerTo: 'श्री ईलाका प्रशासन कार्यालय,',
    headerDistrict: 'काठमाडौँ',
    mainDistrict: 'काठमाडौँ',
    prevLocationType: 'साबिक',
    prevWardNo: '',
    currentMunicipality: 'नागार्जुन नगरपालिका',
    currentWardNo: '१',
    residentAddress: 'स्थायी',
    residentDistrict: 'जिल्ला',
    citizenIssueDate: '',
    citizenNo: '',
    applicantName: '',
    designation: 'पद छनोट गर्नुहोस्',
    detailApplicantName: '',
    detailApplicantAddress: '',
    detailApplicantCitizenship: '',
    detailApplicantPhone: '',
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
    console.log('Passport Recommendation Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="passport-rec-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img src="https://i.imgur.com/YOUR_LOGO_URL.png" alt="Logo" className="logo" />
          <h1>नागार्जुन नगरपालिका</h1>
          <h2>१ नं. वडा कार्यालय</h2>
          <h3>नागार्जुन, काठमाडौँ</h3>
          <h4>बाग्मती प्रदेश, नेपाल</h4>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>पत्र संख्या :</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>मिति :</label>
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
            <label>चलानी नं. :</label>
            <input
              type="text"
              name="refNo"
              value={formData.refNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="day-input"
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>सिफारिस सम्बन्धमा।</u></strong>
        </div>

        <div className="header-to-group">
            <input
              type="text"
              name="headerTo"
              value={formData.headerTo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              required
            />
        </div>

        <p className="certificate-body">
          उपरोक्त सम्बन्धमा जिल्ला
          <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} required />
          (
          <input type="text" name="prevLocationType" value={formData.prevLocationType} onChange={handleChange} />
          )
          <input type="text" name="prevWardNo" placeholder="साविक वडा" value={formData.prevWardNo} onChange={handleChange} />
          वडा नं.
          <input type="text" name="currentWardNo" value={formData.currentWardNo} onChange={handleChange} required className="short-input" />
          हाल
          <input type="text" name="currentMunicipality" value={formData.currentMunicipality} onChange={handleChange} required />
          वडा नं.
          <input type="text" name="currentWardNo" value={formData.currentWardNo} onChange={handleChange} required className="short-input" />
          <input type="text" name="residentAddress" value={formData.residentAddress} onChange={handleChange} required />
          वसोवास भै जिल्ला
          <input type="text" name="residentDistrict" value={formData.residentDistrict} onChange={handleChange} required />
          बाट जारी गरिएको ना.प्र.नं.
          <input type="text" name="citizenIssueDate" placeholder="जारी मिति" value={formData.citizenIssueDate} onChange={handleChange} required />
          भएको
          <input type="text" name="citizenNo" placeholder="ना.प्र.नं." value={formData.citizenNo} onChange={handleChange} required />
          ले
          <input type="text" name="applicantName" placeholder="निवेदकको नाम" value={formData.applicantName} onChange={handleChange} required />
          को नाताले नागरिकता प्रमाणपत्र प्राप्त गरेकै व्यहोराको सिफारिस भएको हुँदा निजको MRP राहदानी प्रमाण पत्र आवश्यक परेको हुँदा त्यस कार्यालयको नियमानुसार MRP राहदानीको लागि स्थायी बसोबास प्रमाणित साथ सिफारिस गरिएको व्यहोरा अनुरोध छ।
        </p>


        <div className="designation-section">
          <input type="text" placeholder="हस्ताक्षर" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option>पद छनोट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
          </select>
        </div>

        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div className="form-group-column">
            <label>निवेदकको नाम *</label>
            <input type="text" name="detailApplicantName" value={formData.detailApplicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" name="detailApplicantAddress" value={formData.detailApplicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" name="detailApplicantCitizenship" value={formData.detailApplicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" name="detailApplicantPhone" value={formData.detailApplicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </form>
    </div>
  );
};

export default PassportRecommendation;