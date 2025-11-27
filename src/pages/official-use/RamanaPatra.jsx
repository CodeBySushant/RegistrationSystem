// 2
import React from 'react';
import './RamanaPatra.css';

const RamanaPatra = () => {
  return (
    <div className="ramana-patra-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        रमाना पत्र ।
        <span className="top-right-bread">आर्थिक प्रबेश &gt; रमाना पत्र</span>
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
          <p>ने.सं - 1146 थिंलाथ्व, 7 बिहीबार</p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="main-content-section">
        
        {/* --- Addressee --- */}
        <div className="addressee-section">
            <div className="addressee-row">
                <span>श्री</span>
                <input type="text" className="line-input large-input" required />
            </div>
            <div className="addressee-row">
                <input type="text" className="line-input large-input" required />
            </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section center-text">
          <p>विषय: <span className="underline-text">रमाना पत्र।</span></p>
        </div>

        {/* --- Body Paragraph --- */}
        <div className="body-paragraph">
          <p>
            यस कार्यालयका मिति <span className="bold-text">२०८२-०८-०६</span> को निर्णय नं 
            <input type="text" className="dotted-input tiny-input" required /> <span className="red">*</span> ले स्वीकृत भई <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> 
            निर्माण कार्यका लागि <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> को <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> <input type="text" className="dotted-input small-input" required /> <span className="red">*</span> <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span>
            को नाममा <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> <input type="text" className="dotted-input small-input" required /> <span className="red">*</span> मा जम्मा भएको रकम
            <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> मध्ये रु <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> (अक्षरेपी रु <input type="text" className="dotted-input long-input" required /> <span className="red">*</span> ) रकम आजको मितिदेखि सात दिन भित्र निकासा गरि लिनुहुन र निर्माण कार्य पुरा गरी फरफारक गर्नुहुन निमित्त रमाना दिईएको छ |
          </p>
          <p>
            रमाना दिनेको : मिति <span className="bold-text">२०८२-०८-०६</span>
          </p>
        </div>

        {/* --- Rich Text Editor Mock (The long textarea) --- */}
        <div className="editor-section">
            <h4 className="bold-text">कैफियत :</h4>
            <div className="rich-editor-mock">
                <div className="editor-toolbar">
                    <span className="tool-btn bold">B</span>
                    <span className="tool-btn italic">I</span>
                    <span className="tool-btn underline">U</span>
                    <span className="tool-btn strike">S</span>
                    <span className="tool-sep">|</span>
                    <span className="tool-btn">X<sub>2</sub></span>
                    <span className="tool-btn">X<sup>2</sup></span>
                    <span className="tool-sep">|</span>
                    {/* Simplified mock buttons */}
                    <span className="tool-btn">¶</span>
                    <span className="tool-btn">﹖</span>
                </div>
                <textarea className="editor-textarea" rows="8"></textarea>
            </div>
        </div>

        {/* --- Signature Block (Right Aligned) --- */}
        <div className="signature-section">
            <div className="signature-block">
                <div className="signature-line"></div>
                <span className="red-mark">*</span>
                <input type="text" className="line-input full-width-input" required />
                <select className="designation-select">
                    <option>पद छनौट गर्नुहोस्</option>
                    <option>वडा अध्यक्ष</option>
                    <option>वडा सचिव</option>
                </select>
            </div>
        </div>

        {/* --- Applicant Details Box (Footer) --- */}
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

export default RamanaPatra;