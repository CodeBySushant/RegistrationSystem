// 2
import React from 'react';
import './DClassConstructionBusinessLicense.css';

const DClassConstructionBusinessLicense = () => {
  return (
    <div className="construction-license-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घ वर्गको निर्माण व्यवसाय इजाजत पत्र ।
        <span className="top-right-bread">व्यापार / व्यवसाय &gt; घ वर्गको निर्माण व्यवसाय इजाजत पत्र</span>
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
        </div>
      </div>

      {/* --- Meta Data & Photo Box --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>इजाजत पत्र नं : <span className="bold-text">७/२०८२/८३</span></p>
          <p>आ.व. : <span className="bold-text">२०८२/८३</span></p>
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
        </div>
        <div className="meta-right">
            <div className="photo-box">
                निवेदकको दुबै कान देखिने पासपोर्ट साइजको फोटो
            </div>
        </div>
      </div>

      {/* --- Certificate Title --- */}
      <div className="certificate-title-section">
        <h3 className="underline-text">'घ' वर्गको निर्माण व्यवसाय इजाजत पत्र</h3>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          निर्माण व्यवसाय ऐन २०५५ को दफा ४ को उप दफा (३), निर्माण व्यवसाय नियमावली २०५६ को नियम ६ को उपनियम (१) बमोजिम निर्माण व्यवसाय गर्ने स्थानीय सरकार सञ्चालन ऐन २०७४ को दफा (११) को उप दफा (२) को देहाय छ (१०) र 'घ' वर्गको निर्माण व्यवसाय इजाजतपत्र सम्वन्धी कार्यविधि, २०७९ को दफा २ को उपदफा (४) बमोजिम प्रचलित कानुनको परिधिभित्र रही निर्माण व्यवसाय सञ्चालन गर्न <input type="text" className="line-input long-input" required /> <span className="red">*</span> स्थित कार्यालय भएको <input type="text" className="line-input long-input" required /> <span className="red">*</span> फर्म वा कम्पनीलाई "घ" वर्गको <select className="inline-select"><option>इजाजतपत्र</option></select> प्रदान गरिएको छ ।
        </p>
      </div>

      {/* --- Bottom Section (Big Letter & Signature) --- */}
      <div className="bottom-section">
          <div className="big-letter-box">
              <span>घ</span>
          </div>
          <div className="signature-details">
              <p className="bold-text">इजाजतपत्र दिनेको :</p>
              <div className="sig-row">
                  <label>दस्तखत :</label>
                  <input type="text" className="line-input medium-input" />
              </div>
              <div className="sig-row">
                  <label>नाम : <span className="red">*</span></label>
                  <input type="text" className="line-input medium-input" />
              </div>
              <div className="sig-row">
                  <label>पद : <span className="red">*</span></label>
                  <input type="text" className="line-input medium-input" />
              </div>
              <div className="sig-row">
                  <label>छाप:</label>
                  <input type="text" className="line-input medium-input" />
              </div>
              <div className="sig-row">
                  <label>मिति :</label>
                  <input type="text" className="line-input medium-input" defaultValue="२०८२-०८-०६" />
              </div>
          </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
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

export default DClassConstructionBusinessLicense;