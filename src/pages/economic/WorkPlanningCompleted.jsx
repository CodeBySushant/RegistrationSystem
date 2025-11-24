import React from 'react';
import './WorkPlanningCompleted.css';
// 3
const WorkPlanningCompleted = () => {
  return (
    <div className="planning-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कार्य योजना पूरा भयो सिफारिस ।
        <span className="top-right-bread">आर्थिक &gt; कार्य योजना पूरा भयो सिफारिस</span>
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
        <p>विषय: <span className="underline-text">सिफारिस गरिएको वारे ।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री नागार्जुन नगरपालिका</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input large-input" required />
        </div>
        <div className="addressee-row">
           <span>नागार्जुन</span>
           <input type="text" className="line-input medium-input" />
           <span>काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा <span className="bg-highlight">नागार्जुन नगरपालिका</span> <span className="bg-highlight">वडा नं १</span> मा आ.व. <span className="bg-highlight">२०८२/८३</span> मा संचालित 
          <input type="text" className="inline-box-input long-box" required />
          योजना कार्य सम्पन्न भएको भनि श्री 
          <input type="text" className="inline-box-input medium-box" required />
          ले मिति <span className="bg-highlight">२०८२-०८-०६</span> गतेमा दिनु भएको निवेदन अनुसार स्थलगत निरिक्षण गर्दा 
          <input type="text" className="inline-box-input long-box" required />
          योजना कार्य सम्पन्न देखिएकोले प्राविधिक वाट कार्य सम्पन्न मुल्यांकन गराई तहा कार्यालय नियमानुसार आवश्यक भुक्तानीका लागि सिफारिस साथ सादर अनुरोध छ।
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
             <option>इन्जिनियर</option>
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

export default WorkPlanningCompleted;