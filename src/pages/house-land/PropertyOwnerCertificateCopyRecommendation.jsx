// 11
import React from 'react';
import './PropertyOwnerCertificateCopyRecommendation.css';

const PropertyOwnerCertificateCopyRecommendation = () => {
  return (
    <div className="certificate-copy-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जग्गाधनी प्रमाण पत्रको प्रतिलिपि सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; जग्गाधनी प्रमाण पत्रको प्रतिलिपि सिफारिस</span>
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
          <select className="bold-select">
              <option>मालपोत कार्यालय</option>
              <option>भुमि सुधार कार्यालय</option>
          </select>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span className="bold-text">, काठमाडौँ</span>
           <span style={{float: 'right'}}>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाममा दर्ता श्रेस्ता भएको <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bg-gray-text">१</span>
          <br />
          <input type="text" className="inline-box-input medium-box" /> 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> कि.नं. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> को क्षे.फ. <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> भएको जग्गाको जग्गाधनी प्रमाण पुर्जा 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> सोको प्रतिलिपिको सिफारिस गरी पाउँ भनी जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span>
          <select className="inline-select">
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> (साविक <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" /> ) बस्ने श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले यस वडा कार्यालयमा निवेदन दिनु भएको हुँदा सो सम्बन्धमा यहाँको नियमानुसार जग्गाधनी प्रमाण पुर्जाको प्रतिलिपि उपलब्ध गराई दिनुहुन सिफारिस गरिन्छ।
        </p>
      </div>

      {/* --- Personal Details Columns (3 Cols) --- */}
      <div className="personal-details-grid">
          {/* Column 1 */}
          <div className="details-column">
              <div className="form-group">
                  <label>निवेदक <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>ना.प्र.नं. <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>जारी मिति</label>
                  <input type="text" className="line-input full-width" defaultValue="२०८२-०८-०६" />
              </div>
              <div className="form-group">
                  <label>पिता <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>बाजे <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
          </div>

          {/* Column 2 */}
          <div className="details-column">
              <div className="form-group">
                  <label>निवेदक <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>ना.प्र.नं. <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>जारी मिति <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>पिता <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>बाजे <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
          </div>

          {/* Column 3 */}
          <div className="details-column">
              <div className="form-group">
                  <label>निवेदक <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>ना.प्र.नं. <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>जारी मिति <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>पिता <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
              <div className="form-group">
                  <label>बाजे <span className="red">*</span></label>
                  <input type="text" className="line-input full-width" />
              </div>
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

      {/* --- Applicant Details Box (Footer 3 Cols) --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण <span style={{fontSize: '0.8rem', fontWeight: 'normal'}}>(लाल पुर्जा पेसको नाममा जुन व्यक्त हुनेले पनि लिन जान सक्ने ब्यहोरा बिन अनुरोध छ ।)</span></h3>
        <div className="applicant-grid-3">
            {/* Col 1 */}
            <div className="detail-column">
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
            {/* Col 2 */}
            <div className="detail-column">
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
            {/* Col 3 */}
            <div className="detail-column">
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

export default PropertyOwnerCertificateCopyRecommendation;