// 26
import React from 'react';
import './IncomeSourceCertification.css';

const IncomeSourceCertification = () => {
  return (
    <div className="income-source-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        आय श्रोत प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; आय श्रोत प्रमाणित</span>
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
        <p>विषय: <span className="underline-text">आय श्रोत प्रमाणित सम्बन्धमा ।</span></p>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस संग सम्बन्ध राख्दछ ।</p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          वडा नं. <input type="text" className="inline-box-input tiny-box" defaultValue="१" /> (साविक जिल्ला काठमाडौँ 
          <select className="inline-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
          </select>
          वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> ) मा बस्ने 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
          ले दिनु भएको निवेदन अनुसार निज निवेदकको आय श्रोत तपशिल बमोजिम रहेको व्यहोरा सिफारिस साथ सादर अनुरोध गर्दछु ।
        </p>
      </div>

      {/* --- Tapashil (Income Table) --- */}
      <div className="table-section">
          <h4 className="table-title">तपशिल</h4>
          <div className="table-responsive">
            <table className="income-table">
                <thead>
                    <tr>
                        <th style={{width: '10%'}}>क्र.सं.</th>
                        <th style={{width: '45%'}}>विवरण</th>
                        <th style={{width: '40%'}}>वार्षिक आय श्रोत</th>
                        <th style={{width: '5%'}}>थप</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
          </div>
          
          {/* Total Section */}
          <div className="total-row">
              <label>जम्मा : <span className="red">*</span></label>
              <input type="text" className="line-input medium-input" />
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

export default IncomeSourceCertification;