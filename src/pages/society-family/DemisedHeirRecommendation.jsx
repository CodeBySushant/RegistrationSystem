// 17
import React from 'react';
import './DemisedHeirRecommendation.css';

const DemisedHeirRecommendation = () => {
  return (
    <div className="demised-heir-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        मृतक हकदारको सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; मृतक हकदारको सिफारिस</span>
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

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <span className="bg-gray-text">काठमाडौँ</span> <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. <span className="bg-gray-text">१</span> स्थायी ठेगाना (साविक 
          <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) बस्ने श्री 
          <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> ले हकदार प्रमाणित गरी पाउँ भनी यस वडा कार्यालयमा निवेदन दिनुभएको हुँदा सो सम्बन्धमा <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> बाट मिति <span className="bg-gray-text">२०८२-०८-०६</span> मा गरिएको द.न. 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाता प्रमाणित प्रमाणपत्र अनुसार मृतक श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> का हकदारहरु देहाय बमोजिम उल्लेखित <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> जना मात्र भएको व्यहोरा सिफारिस गरिन्छ ।
        </p>
      </div>

      {/* --- Tapsil Table --- */}
      <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '20%'}}>हकदारहरुको नाम थर</th>
                        <th style={{width: '15%'}}>नाता</th>
                        <th style={{width: '20%'}}>बाबु/पतिको नाम</th>
                        <th style={{width: '10%'}}>नागरिकता नं.</th>
                        <th style={{width: '10%'}}>घर नं</th>
                        <th style={{width: '10%'}}>कित्ता नं.</th>
                        <th style={{width: '10%'}}>बाटोको नाम</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
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

export default DemisedHeirRecommendation;