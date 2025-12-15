import React from 'react';
import './ElectricityInstallationRecommendation.css';
// 2
const ElectricityInstallationRecommendation = () => {
  return (
    <div className="electricity-installation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        बिजुली जडान सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; बिजुली जडान सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
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
        <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span className="bold-text underline-text">श्री बुटवल पावर कम्पनी लिमिटेड</span>
        </div>
        <div className="addressee-row">
           <span className="bold-text">नागार्जुन</span>
           <span className="bold-text" style={{marginLeft: '150px'}}>, काठमाडौँ</span>
           <span style={{float: 'right'}}>|</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ साविक <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red-asterisk">*</span> भई हाल काठमाडौँ जिल्ला नागार्जुन नगरपालिका वडा नं. १ मा बस्ने श्री 
          <select className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input long-box" required /> <span className="red-asterisk">*</span> को नाममा नम्बरी दर्ता रहेको तपसिल बमोजिम जग्गा र सोही भित्र बनेको काठ/पक्की घरमा विद्युत सम्बन्धि वायरिङ्ग कार्य पुरा भइसकेकोले निजको घरमा नियम अनुसार विद्युत मिटर जडानको लागि सिफारिस साथ अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Tapashil Table --- */}
      <div className="table-section">
          <h4 className="table-title">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.सं.</th>
                        <th style={{width: '20%'}}>जग्गा वतन</th>
                        <th style={{width: '8%'}}>वडा नं.</th>
                        <th style={{width: '8%'}}>सिट नं.</th>
                        <th style={{width: '8%'}}>कि. नं.</th>
                        <th style={{width: '10%'}}>क्षेत्रफल</th>
                        <th style={{width: '13%'}}>पूर्व</th>
                        <th style={{width: '13%'}}>पश्चिम</th>
                        <th style={{width: '13%'}}>उत्तर</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
          {/* Fake scrollbar to match image */}
          <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
          </div>
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

export default ElectricityInstallationRecommendation;