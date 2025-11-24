import React from 'react';
import './TapInstallationRecommendation.css';
// 1
const TapInstallationRecommendation = () => {
  return (
    <div className="tap-installation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        धारा जडान सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; धारा जडान सिफारिस</span>
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

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">धारा जडान सिफारिस।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span>,</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" />
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा <span className="bold-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bold-text">१</span> (साविकको ठेगाना 
          <input type="text" className="inline-box-input medium-box" /> ) बस्ने श्री 
          <input type="text" className="inline-box-input long-box" />
          को नाममा दर्ता कायम रहेको कि.नं. <input type="text" className="inline-box-input small-box" required /> को जग्गामा मिति २०८२-०८-०६ मा भवन निर्माण स्वीकृति लिनु भई 
          <select className="inline-select">
              <option>आंशिक</option>
              <option>पूर्ण</option>
          </select>
          रुपमा निर्माण सम्पन्न गर्नुभएको वा अभिलेखीकरण गर्नुभएको हुँदा <input type="text" className="inline-box-input medium-box" required /> धारा जडान गरिदिन हुन सिफारिस साथ अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Kitta No Details Table --- */}
      <div className="table-section">
          <h4 className="table-title">कित्ता नं. को विवरण</h4>
          <table className="kitta-table">
              <thead>
                  <tr>
                      <th style={{width: '10%'}}>क्र.स.</th>
                      <th style={{width: '45%'}}>जग्गाको विवरण</th>
                      <th style={{width: '40%'}}>कित्ता नं.</th>
                      <th style={{width: '5%'}}></th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>१</td>
                      <td><input type="text" className="table-input" required /></td>
                      <td><input type="text" className="table-input" required /></td>
                      <td className="action-cell">
                          <button className="add-row-btn">+</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Bodartha (CC) Section --- */}
      <div className="bodartha-section">
          <p className="bodartha-label">बोधार्थ:-</p>
          <div className="bodartha-row">
             <input type="text" className="line-input medium-input" required />
             <span>- जानकारीको लागि |</span>
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

export default TapInstallationRecommendation;