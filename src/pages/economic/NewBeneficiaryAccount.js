import React from 'react';
import './NewBeneficiaryAccount.css';
// 6
const NewBeneficiaryAccount = () => {
  return (
    <div className="new-beneficiary-container">
       {/* --- Top Bar --- */}
       <div className="top-bar-title">
        कार्य योजना पूरा भयो सिफारिस ।
        <span className="top-right-bread">आर्थिक &gt; नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा</span>
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
          <p style={{textAlign: 'right'}}>ने.सं : .........</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">नयाँ लाभग्राहीको खाता खोलिदिने सम्बन्धमा ।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
        </div>
         <div className="addressee-row">
           <span>नागार्जुन</span>
           <input type="text" className="line-input medium-input" />
           <span>काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body (Matches Image 9 specifically) --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस <span className="bold-text underline-text">नागार्जुन नगरपालिका</span> वडा नं <span className="bold-text underline-text">१</span> (साविक <input type="text" className="dotted-input medium-input" required /> ) बाट आ.व.
           <select className="inline-select">
               <option>2082/83</option>
               <option>2083/84</option>
           </select>
           को <input type="text" className="dotted-input medium-input" required /> बापतको सामाजिक सुरक्षा भत्ता पाउन योग्य लाभग्राही ना.प्र.नं. <input type="text" className="dotted-input medium-input" required /> जारी मिति <span className="bold-text">२०८२-०८-०६</span> भएको श्री <input type="text" className="dotted-input medium-input" required /> को सामाजिक सुरक्षा भत्ता प्रयोजनको लागि खाता खोलिदिन हुन अनुरोध छ ।
        </p>
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

      {/* --- Footer Applicant Details Box --- */}
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

export default NewBeneficiaryAccount;