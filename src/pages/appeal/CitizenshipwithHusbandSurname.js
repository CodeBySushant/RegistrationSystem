import React, { useState } from 'react';
import './CitizenshipwithHusbandSurname.css'; // The CSS file for styling

const CitizenshipwithHusbandSurname = () => {
  const [formData, setFormData] = useState({
    date: '२०८२.०७.१५',
    districtOffice: 'काठमाडौँ',
    preMarriageDate: '२०८२.०७.१५',
    preMarriageDistrict: '',
    currentMunicipality: '',
    currentWard: '',
    husbandName: '',
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
    console.log('Citizenship with Husband Surname Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="citizenship-husband-container">
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
          <strong>विषय: <u>पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          प्रस्तुत विषयमा मेरो विवाह नहुँदै मिति
          <input type="text" name="preMarriageDate" value={formData.preMarriageDate} onChange={handleChange} required />
          मा
          <input type="text" name="preMarriageDistrict" placeholder="जिल्ला" value={formData.preMarriageDistrict} onChange={handleChange} required />
          जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा हाल यस जिल्लाको
          <input type="text" name="currentMunicipality" placeholder="गा.पा. / न.पा." value={formData.currentMunicipality} onChange={handleChange} required />
          गा.पा. / न.पा. वडा नं
          <input type="text" name="currentWard" placeholder="वडा" value={formData.currentWard} onChange={handleChange} required className="short-input" />
          बस्ने
          <input type="text" name="husbandName" placeholder="पतिको नाम" value={formData.husbandName} onChange={handleChange} required />
          सँग वैवाहिक सम्बन्ध कायम भएकोले पतिको नाम, थर र वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ भनी आवश्यक कागजातहरु संलग्न राखी यो निवेदन पेश गर्दछु ।
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

export default CitizenshipwithHusbandSurname;