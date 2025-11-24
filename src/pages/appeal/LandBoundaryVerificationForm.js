import React, { useState } from 'react';
import './LandBoundaryVerificationForm.css'; // The CSS file for styling

const LandBoundaryVerificationForm = () => {
  const [formData, setFormData] = useState({
    date: '२०८२.०७.१५',
    headerTo: 'श्री प्रमुख प्रशासकीय अधिकृत ज्यु',
    headerMunicipality: 'नागार्जुन नगरपालिका',
    headerOffice: 'को कार्यालय',
    headerDistrict: 'काठमाडौँ',
    mainDistrict: 'काठमाडौँ',
    mainMunicipality: 'नागार्जुन नगरपालिका',
    mainWardNo1: '१',
    prevLocationType: 'साबिक',
    prevWardNo: '१',
    tole: '',
    applicantTitle: 'श्री',
    applicantName: '',
    applicantRelation: 'छोरा',
    applicantAge: '',
    guardianTitle: 'श्री',
    guardianName: '',
    kittaNo: '',
    landName: '',
    landArea: '',
    feeAmount: '',
    feeAmountWords: '',
    sigApplicantType: 'निवेदक',
    sigName: '',
    sigAddress: 'नागार्जुन नगरपालिका',
    sigWard: '१',
    sigPhone: '',
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
    console.log('Land Boundary Verification Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="land-boundary-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="header-to-group">
            <input
              type="text"
              name="headerTo"
              value={formData.headerTo}
              onChange={handleChange}
            />
            <select
              name="headerMunicipality"
              value={formData.headerMunicipality}
              onChange={handleChange}
            >
              <option>नागार्जुन नगरपालिका</option>
            </select>
            <input
              type="text"
              name="headerOffice"
              value={formData.headerOffice}
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
          <strong>विषय: <u>जग्गाको साँध सिमाङ्कन गर्न अधिन खटाई पाउँ बारे।</u></strong>
        </div>

        <p className="certificate-body">
          महोदय,
          <br />
          उपरोक्त सम्बन्धमा म यो निम्न निवेदन चढाउन आएको व्यहोरा अनुरोध गर्दछु कि जिल्ला
          <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} required />
          <select name="mainMunicipality" value={formData.mainMunicipality} onChange={handleChange}>
            <option>नागार्जुन नगरपालिका</option>
          </select>
          वडा नं.
          <select name="mainWardNo1" value={formData.mainWardNo1} onChange={handleChange}>
            <option>१</option>
            <option>२</option>
            <option>३</option>
          </select>
          <select name="prevLocationType" value={formData.prevLocationType} onChange={handleChange}>
            <option>साबिक</option>
          </select>
          वडा नं.
          <input type="text" name="prevWardNo" value={formData.prevWardNo} onChange={handleChange} required className="short-input" />
          <input type="text" name="tole" placeholder="टोल" value={formData.tole} onChange={handleChange} required />
          टोल स्थायी बसोबास गर्ने
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input type="text" name="applicantName" placeholder="निवेदकको नाम" value={formData.applicantName} onChange={handleChange} required />
          को
          <select name="applicantRelation" value={formData.applicantRelation} onChange={handleChange}>
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </select>
          <input type="text" name="applicantAge" placeholder="उमेर" value={formData.applicantAge} onChange={handleChange} required className="short-input" />
          वर्ष
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>को श्री</option>
          </select>
          <input type="text" name="guardianName" placeholder="अभिभावकको नाम" value={formData.guardianName} onChange={handleChange} required />
          को नाममा दर्ता श्रेस्ता कायम रहेको जग्गा
          <input type="text" name="kittaNo" placeholder="कित्ता नं." value={formData.kittaNo} onChange={handleChange} required className="short-input" />
          को जग्गा
          <input type="text" name="landName" placeholder="जग्गाको नाम" value={formData.landName} onChange={handleChange} />
          (
          <input type="text" name="landArea" placeholder="क्षेत्रफल" value={formData.landArea} onChange={handleChange} required className="short-input" />
          ) क्षेत्रफल रहेको जग्गाको साँध सिमाङ्कन गरी पाउन मेरो नागरिकताको प्रमाणपत्रको प्रतिलिपि, जग्गा धनी पूर्जाको प्रतिलिपि, हालसालै बुझाएको मालपोत रसिदको प्रतिलिपि र नक्साको फाँटकोपी सहित यसै निवेदनमा संलग्न राखी रु
          <input type="text" name="feeAmount" placeholder="रकम" value={formData.feeAmount} onChange={handleChange} required className="short-input" />
          /- अक्षरुपी रु.
          <input type="text" name="feeAmountWords" placeholder="अक्षरुपी रकम" value={formData.feeAmountWords} onChange={handleChange} required />
          मात्रको मोटर रसिद काटी निम्न निवेदन चढाउन आएको छु।
        </p>

        <div className="designation-section">
            <div className="signature-fields">
                 <div className="form-group-inline">
                    <select name="sigApplicantType" value={formData.sigApplicantType} onChange={handleChange}>
                        <option>निवेदक</option>
                        <option>निवेदिका</option>
                    </select>
                 </div>
                 <div className="form-group-inline">
                    <label>नाम : *</label>
                    <input type="text" name="sigName" value={formData.sigName} onChange={handleChange} required />
                 </div>
                 <div className="form-group-inline">
                    <label>ठेगाना :</label>
                    <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} />
                 </div>
                 <div className="form-group-inline">
                    <label>वडा नं. :</label>
                    <input type="text" name="sigWard" value={formData.sigWard} onChange={handleChange} className="short-input" />
                 </div>
                 <div className="form-group-inline">
                    <label>सम्पर्क नं. : *</label>
                    <input type="text" name="sigPhone" value={formData.sigPhone} onChange={handleChange} required />
                 </div>
            </div>
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

export default LandBoundaryVerificationForm;