import React, { useState } from 'react';
import './CitizenshipwithoutHusbandSurname.css'; // The CSS file for styling

const CitizenshipwithoutHusbandSurname = () => {
  const [formData, setFormData] = useState({
    date: '२०८२.०७.१५',
    districtOffice: 'काठमाडौँ',
    preMarriageDate: '२०८२.०७.१५',
    preMarriageDistrict: '',
    relationshipStatus: 'सम्बन्धविच्छेद',
    certificateInfo: '',
    currentHusbandName: '',
    currentDistrict: 'जिल्ला',
    currentPalikaType: 'गा.पा.',
    currentPalikaName: '',
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
    console.log('Citizenship (Remove Ex-Husband) Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="citizenship-remove-husband-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            <input
              type="text"
              name="districtOffice"
              value={formData.districtOffice}
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
          <strong>विषय: <u>पूर्व पतिको नामथर हटाई हालको पतिको नाम थर वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          प्रस्तुत विषयमा मेरो मिति
          <input type="text" name="preMarriageDate" value={formData.preMarriageDate} onChange={handleChange} required />
          मा
          <input type="text" name="preMarriageDistrict" placeholder="जिल्ला" value={formData.preMarriageDistrict} onChange={handleChange} required />
          जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा मेरो श्रीमानसँग
          <select name="relationshipStatus" value={formData.relationshipStatus} onChange={handleChange}>
            <option>सम्बन्धविच्छेद</option>
            <option>... (other status)</option>
          </select>
          भई
          <input type="text" name="certificateInfo" placeholder="सम्बन्धविच्छेद दर्ताको प्रमाणपत्र" value={formData.certificateInfo} onChange={handleChange} required className="long-input" />
          दर्ताको प्रमाणपत्र समेत प्राप्त गरिसकेको र हाल
          <input type="text" name="currentHusbandName" placeholder="हालको पतिको नाम" value={formData.currentHusbandName} onChange={handleChange} required />
          <input type="text" name="currentDistrict" value={formData.currentDistrict} onChange={handleChange} required />
          जिल्ला
          <select name="currentPalikaType" value={formData.currentPalikaType} onChange={handleChange}>
            <option>गा.पा.</option>
            <option>न.पा.</option>
          </select>
          <input type="text" name="currentPalikaName" placeholder="पालिकाको नाम" value={formData.currentPalikaName} onChange={handleChange} required />
          बस्ने
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

export default CitizenshipwithoutHusbandSurname;