// 1
import React from 'react';
import './FarmerGroupOrCommitteeRegistrationCertificate.css';

const FarmerGroupOrCommitteeRegistrationCertificate = () => {
  return (
    <div className="farmer-registration-certificate-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कृषक समूह/समिति दर्ता प्रमाणपत्र
        <span className="top-right-bread">संस्था / समिति &gt; कृषक समूह/समिति दर्ता प्रमाणपत्र</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
          <h3 className="certificate-title underline-text">कृषक समूह/समिति दर्ता प्रमाणपत्र</h3>
        </div>
      </div>

      {/* --- Registration Details --- */}
      <div className="registration-details">
        <div className="detail-row">
          <label>दर्ता मिति :</label>
          <span className="bold-text">२०८२-०८-०६</span>
        </div>
        <div className="detail-row">
          <label>दर्ता नं. :</label>
          <input type="text" className="dotted-input small-input" />
        </div>
      </div>

      {/* --- Photo Box --- */}
      <div className="photo-box-container">
        <div className="photo-box">
          अधिकृत व्यक्तिको फोटो
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          यस <span className="bold-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bold-text">१</span> अन्तर्गत देहाय बमोजिमको कृषक समूह/समिति नागार्जुन नगरपालिकाको कृषि व्यवसाय प्रवर्द्धन ऐन, २०७७ को दफा ४ उपदफा (१) बमोजिम दर्ता गरी यो प्रमाणपत्र प्रदान गरिएको छ।
        </p>

        <div className="form-grid">
          <div className="form-row">
            <label className="bold-text">१. कृषक समूह/समितिको नाम :</label>
            <input type="text" className="line-input long-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">२. ठेगाना :</label>
            <input type="text" className="line-input long-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">३. उद्देश्य :</label>
            <input type="text" className="line-input long-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">४. मुख्य काम :</label>
            <input type="text" className="line-input long-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">५. कार्यक्षेत्र :</label>
            <input type="text" className="line-input long-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">६. अख्तियारवालाको नाम, थर :</label>
            <input type="text" className="line-input long-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">७. पद :</label>
            <input type="text" className="line-input medium-input" />
          </div>
          <div className="form-row">
            <label className="bold-text">८. हस्ताक्षर :</label>
            <div className="signature-box"></div>
          </div>
        </div>
      </div>

      {/* --- Bottom Section (Signature & Date) --- */}
      <div className="bottom-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <p className="bold-text">वडा अध्यक्ष</p>
        </div>
        <div className="date-block">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
      </div>
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default FarmerGroupOrCommitteeRegistrationCertificate;