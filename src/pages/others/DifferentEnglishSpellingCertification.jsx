// 3
import React from 'react';
import './DifferentEnglishSpellingCertification.css';

const DifferentEnglishSpellingCertification = () => {
  return (
    <div className="english-spelling-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        फरक फरक अंग्रेजी हिज्जे प्रमाणित ।
        <span className="top-right-bread">अन्य &gt; फरक फरक अंग्रेजी हिज्जे प्रमाणित</span>
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
        <p>विषय: <span className="underline-text">फरक फरक अंग्रेजी हिज्जे प्रमाणित ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा <span className="bold-text">नागार्जुन</span> <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" /> वडा नं. <span className="bold-text">१</span> (साविक 
          <input type="text" className="inline-box-input medium-box" />
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          , वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) निवासी 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाम थर मा अंग्रेजी हिज्जे <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को आधारमा <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> हुनुपर्नेमा निजको तल उल्लेखित कागजातमा निजको अंग्रेजी हिज्जे फरक हुन गएको हुनाले सो फरक अंग्रेजी हिज्जे भएको व्यक्ति एकै भएको प्रमाणित गरि पाउँ भनी निवेदन गरेकोमा निजले पेश गरेको प्रमाण कागजातका आधारमा व्यहोरा मनासिव भएको खुल्न आएकोले सो फरक, फरक अंग्रेजी हिज्जे भएको ब्यक्ति एकै भएको प्रमाणित गरिन्छ ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <h4 className="table-title underline-text bold-text center-text">फरक अंग्रेजी हिज्जे र कागजात विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '50%'}}>फरक भएको कागजात</th>
                        <th style={{width: '50%'}}>फरक भएको नाम थर</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
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

export default DifferentEnglishSpellingCertification;