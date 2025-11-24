// 4
import React from 'react';
import './HouseMaintainRecommendation.css';

const HouseMaintainRecommendation = () => {
  return (
    <div className="house-maintain-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घर कायम सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; घर कायम सिफारिस</span>
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
        <p>विषय: <span className="underline-text">घर कायम सिफारिस।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री मालपोत कार्यालय</span>
          <input type="text" className="line-input medium-input" />
          <span>,</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>, काठमाडौँ</span>
           <span style={{float: 'right'}}>|</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा जिल्ला काठमाडौँ <span className="bold-text ml-20">नागार्जुन नगरपालिका</span> वडा नं. <span className="bold-text">१</span> (साविक 
          <input type="text" className="inline-box-input medium-box" /> 
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) निवासी श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> को नाममा त्यस कार्यालयमा श्रेस्ता दर्ता कायम रहेको निम्न उल्लेखित जग्गामा 
          <select className="inline-select bold-text">
              <option>पूर्ण</option>
              <option>आंशिक</option>
          </select>
          घर निर्माण गरी यस वडा कार्यालयमा निजले चालु आर्थिक वर्षसम्मको घरजग्गा कर/ एकीकृत सम्पत्ति कर चुक्ता गरिसकेको हुनाले निजको जग्गा धनी प्रमाण पुर्जामा घर कायम गरी दिनुहुन सिफारिस साथ अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <h4 className="table-title">घर कायम गर्नु पर्ने जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="house-table">
                <thead>
                    <tr>
                        <th rowSpan="2" style={{width: '5%'}}>क्र.स.</th>
                        <th colSpan="2" style={{width: '25%', textAlign: 'center'}}>साविक</th>
                        <th colSpan="2" style={{width: '25%', textAlign: 'center'}}>हाल</th>
                        <th rowSpan="2" style={{width: '15%'}}>सिट नं/कि.नं.</th>
                        <th rowSpan="2" style={{width: '10%'}}>क्षेत्रफल</th>
                        <th rowSpan="2" style={{width: '15%'}}>घर निर्माण भएको साल / अनुमति लिएको</th>
                        <th rowSpan="2" style={{width: '5%'}}></th>
                    </tr>
                    <tr>
                        <th>गा.वि.स.</th>
                        <th>वडा नं</th>
                        <th>गाउँपालिका</th>
                        <th>वडा नं</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td>
                            <select className="table-select">
                                <option>--छान्नुहोस्--</option>
                                <option>गा.वि.स.</option>
                                <option>न.पा.</option>
                            </select>
                            <span className="red-asterisk in-cell">*</span>
                        </td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td>
                             <select className="table-select">
                                <option>नागार्जुन</option>
                            </select>
                            <span className="red-asterisk in-cell">*</span>
                        </td>
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

export default HouseMaintainRecommendation;