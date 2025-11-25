// 5
import React from 'react';
import './PropertyOwnershipTransferRecommendation.css';

const PropertyOwnershipTransferRecommendation = () => {
  return (
    <div className="transfer-recommendation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घर जग्गा नामसारी सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस</span>
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
        <p>विषय: <span className="underline-text">घर जग्गा नामसारी सिफारिस।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री मालपोत कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span>, काठमाडौँ</span>
           <span style={{float: 'right'}}>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">नागार्जुन</span> <span className="bold-text ml-20">नागार्जुन</span> वडा नं. <span className="bold-text">१</span> (साविक 
          <select className="inline-select medium-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) अन्तर्गत निवेदक 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> निवेदन अनुसार निजको 
          <input type="text" className="inline-box-input medium-box" /> 
          मा मृत्यु भएको हुनाले निज मृतकका नाममा दर्ता कायम रहेको तल उल्लेखित विवरणको घर जग्गा नामसारीको लागि 
          <span className="bold-text"> श्री</span> <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
          ले निवेदन दिनु भएकोमा मृतकका हकदारहरु नाता प्रमाणित प्रमाण पत्रमा उल्लेखित भएअनुसार रहेकोले निज मृतकका नाममा रहेको सो 
          <select className="inline-select">
              <option>जग्गा</option>
              <option>घर</option>
          </select>
          त्यहाँको नियमानुसार हकदारहरु <input type="text" className="inline-box-input long-box" /> नाममा नामसारीको लागि सिफारिस साथ अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Table 1: Other Heirs Details --- */}
      <div className="table-section">
          <h4 className="table-title">अन्य हकदारको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '25%'}}>हकदारहरुको नाम</th>
                        <th style={{width: '15%'}}>नाता</th>
                        <th style={{width: '20%'}}>बाबु पतिको नाम</th>
                        <th style={{width: '15%'}}>नागरिकता नं.</th>
                        <th style={{width: '15%'}}>कैफियत</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" required /></td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>

      {/* --- Table 2: Property Details --- */}
      <div className="table-section">
          <h4 className="table-title">नामसारी गर्ने घर/जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '45%'}}>स्थानीय तह</th>
                        <th style={{width: '20%'}}>क्षेत्रफल</th>
                        <th style={{width: '15%'}}>कित्ता नं.</th>
                        <th style={{width: '10%'}}>कैफियत</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td>
                            <input type="text" className="table-input half-input" required /> <span className="red-asterisk in-cell">*</span>
                            <span className="cell-label">वडा नं.</span>
                            <input type="text" className="table-input tiny-input" required /> <span className="red-asterisk in-cell">*</span>
                        </td>
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

export default PropertyOwnershipTransferRecommendation;