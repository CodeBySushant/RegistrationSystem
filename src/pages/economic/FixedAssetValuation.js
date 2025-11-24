import React from 'react';
import './FixedAssetValuation.css';
// 2
const FixedAssetValuation = () => {
  return (
    <div className="valuation-container">
      {/* --- Top Bar (Breadcrumb style) --- */}
      <div className="top-bar-title">
        अचल सम्पत्ति मुल्यांकन ।
        <span className="top-right-bread">सम्पत्ति &gt; अचल सम्पत्ति मुल्यांकन</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your logo path */}
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

      {/* --- Salutation & Subject --- */}
      <div className="salutation-row">
        <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      <div className="subject-section">
        <p>विषय: <span className="underline-text">अचल सम्पत्ति मुल्यांकन सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body Paragraph --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा जिल्ला <span className="bold-text">काठमाडौँ</span> (साविक 
          <input type="text" className="inline-box-input medium-box" /> 
          <select className="inline-select">
            <option></option>
            <option>गा.वि.स.</option>
            <option>नगरपालिका</option>
          </select>
          वडा नं <input type="text" className="inline-box-input tiny-box" required /> ) भे हाल 
          <span className="bold-text">नागार्जुन</span> 
          <select className="inline-select">
            <option>गाउँपालिका</option>
            <option selected>नगरपालिका</option>
          </select>
          वडा नं <span className="bold-text">1</span> मा बस्ने श्री 
          <select className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required />
          ले मेरो नाममा नम्बरी दर्ता कायम रहेको तपशिल बमोजिमको जमिन हाल तपशिल बमोजिमको दरभाउमा खरिद बिक्री भै रहेकोले सोहि बमोजिम मुल्यांकन गरिपाउँ भनि यस 
          <input type="text" className="inline-box-input small-box" required />
          <select className="inline-select">
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>
          वडा नं <input type="text" className="inline-box-input tiny-box" required />
          को वडा कार्यालयमा दिनु भएको निवेदन बमोजिम यस वडा कार्यालयबाट बुझ्दा व्यहोरा सहि सत्य बुझिन आएकोले निम्नानुसार मुल्यांकन गरि पठाइएको व्यहोरा अनुरोध छ।
        </p>
      </div>

      {/* --- Tapashil (Details) Table --- */}
      <div className="tapashil-section">
        <h4>तपशिल:</h4>
        <div className="table-responsive">
          <table className="valuation-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>सी.न.</th>
                <th style={{width: '20%'}}>जग्गा धनीको नाम</th>
                <th style={{width: '20%'}}>साविक</th>
                <th style={{width: '8%'}}>वडा नं.</th>
                <th style={{width: '8%'}}>कित्ता नं.</th>
                <th style={{width: '10%'}}>क्षेत्रफल</th>
                <th style={{width: '20%'}}>चलन चल्तीको मूल्य / प्रति कठ्ठा</th>
                <th style={{width: '9%'}}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" className="table-input" required /></td>
                <td>
                   {/* Simulating the dropdown combo seen in image */}
                   <div className="combo-input">
                      <input type="text" style={{width: '80%'}} />
                      <span className="dropdown-arrow">▼</span>
                   </div>
                </td>
                <td><input type="text" className="table-input" required /></td>
                <td><input type="text" className="table-input" required /></td>
                <td><input type="text" className="table-input" required /></td>
                <td><input type="text" className="table-input" required /></td>
                <td><input type="text" className="table-input" required /></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Scrollbar visual cue */}
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

export default FixedAssetValuation;