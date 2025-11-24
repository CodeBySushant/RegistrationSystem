// 18
import React from 'react';
import './PropertyVerificationRecommendation.css';

const PropertyVerificationRecommendation = () => {
  return (
    <div className="property-verification-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सम्पत्ति प्रमाणीकरण सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; सम्पत्ति प्रमाणीकरण सिफारिस</span>
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

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
          <p>चलानी नं. : <input type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>,</span>
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">सिफारिस गरिएको बारे।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा साविक जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> भै हाल यस <span className="bg-gray-text">नागार्जुन</span> वडा नं. १ मा बस्ने <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाममा नम्बरी दर्ता रहेको तपसिलको जग्गामा घर 
          <select className="inline-select">
              <option>भएको</option>
              <option>नभएको</option>
          </select>
          भए घरको किसिम 
          <select className="inline-select">
              <option>घरको किसिम छान्नुहोस्</option>
              <option>पक्की</option>
              <option>कच्ची</option>
          </select>
          लम्बाई <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span>
          <select className="inline-select">
              <option>लम्बाईको किसिम छान्नुहोस्</option>
              <option>फिट</option>
              <option>मिटर</option>
          </select>
          चौडाई र <input type="text" className="inline-box-input small-box" /> 
          <select className="inline-select">
              <option>चौडाईको किसिम छान्नुहोस्</option>
              <option>फिट</option>
              <option>मिटर</option>
          </select>
          को र उक्त घर जग्गामा <input type="text" className="inline-box-input medium-box" /> <span className="red">*</span> <input type="text" className="inline-box-input small-box" /> <span className="red">*</span> फिट 
          <select className="inline-select">
              <option>बाटो बाटो समेत</option>
              <option>बाटो बाहेक</option>
          </select>
          पर्ने भएकोले सिफारिस साथ सादर अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Tapashil Table --- */}
      <div className="table-section">
          <h4 className="table-title underline-text bold-text center-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '30%'}}>स्थानीय तह</th>
                        <th style={{width: '15%'}}>वडा नं.</th>
                        <th style={{width: '15%'}}>कित्ता नं.</th>
                        <th style={{width: '25%'}}>क्षेत्रफल</th>
                        <th style={{width: '10%'}}>कार्य</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
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

export default PropertyVerificationRecommendation;