// 23
import React from 'react';
import './DemisedSecurityAllowanceToHeir.css';

const DemisedSecurityAllowanceToHeir = () => {
  return (
    <div className="demised-allowance-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई</span>
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
          <span>,</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span className="bold-text">काठमाडौँ</span>
           <span style={{float: 'right'}}>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">मृतकको सा.सु. भत्ता वापतको रकम उपलब्ध गराईदिने सम्बन्धमा ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा बागमती प्रदेश <input type="text" className="inline-box-input medium-box" defaultValue="काठमाडौँ" /> जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> 
          <select className="inline-select">
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
          </select>
          वडा नं १ स्थायी घर भएका <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले मेरो <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नाता पर्ने <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को मिति २०८२-०८-०६ मा मृत्यु भएको हुँदा निजको नाममा तहाँ बैंकको खाता नं. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> मा जम्मा भएको सामाजिक सुरक्षा भत्ता वापतको रकम मृतकको <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> नाताका ना.प्र.न. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> लाई उपलब्ध गराइदिनुहुन सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
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

export default DemisedSecurityAllowanceToHeir;