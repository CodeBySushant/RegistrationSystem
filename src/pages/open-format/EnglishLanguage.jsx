// 2
import React from 'react';
import './EnglishLanguage.css';

const EnglishLanguage = () => {
  return (
    <div className="open-format-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नेपाली भाषामा ।
        <span className="top-right-bread">खुला ढाँचा &gt; नेपाली प्रपत्र</span>
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
          <p>मिति : <span className="bold-text">२०८२-०८-११</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 7 बिहीबार</p>
        </div>
      </div>

      {/* --- Addressee & Subject --- */}
      <div className="addressee-subject-section">
          <div className="subject-block">
              <label>विषय:</label>
              <input type="text" className="line-input large-input" required />
          </div>
          <div className="addressee-row">
              <span>श्री</span>
              <input type="text" className="line-input long-input" required />
              <span className="red">*</span>
          </div>
          <div className="addressee-row">
             <input type="text" className="line-input long-input" required />
             <span className="red">*</span>
          </div>
      </div>

      {/* --- Rich Text Editor Mock --- */}
      <div className="editor-area">
        <div className="rich-editor-mock">
            <div className="editor-toolbar">
                <span className="tool-btn bold">File</span>
                <span className="tool-btn italic">Edit</span>
                <span className="tool-btn">View</span>
                <span className="tool-btn">Insert</span>
                <span className="tool-btn">Format</span>
                <span className="tool-btn">Tools</span>
                <span className="tool-btn">Table</span>
                <span className="tool-btn">Help</span>
                
                <span className="upgrade-btn">Upgrade</span>
            </div>
            <div className="editor-toolbar-2">
                 <span className="tool-btn">⟲</span>
                 <span className="tool-btn">⟳</span>
                 <span className="tool-sep">|</span>
                 <select className="editor-select"><option>Paragraph</option></select>
                 <select className="editor-select"><option>12pt</option></select>
                 <span className="tool-sep">|</span>
                 <span className="tool-btn">B</span>
                 <span className="tool-btn">I</span>
                 <span className="tool-btn">U</span>
                 <span className="tool-btn">S</span>
                 {/* Mock alignment and other tools */}
                 <span className="tool-sep ml-20">|</span>
                 <span className="tool-btn">▤</span>
                 <span className="tool-btn">☰</span>
                 <span className="tool-btn">☷</span>
                 <span className="tool-btn">☱</span>
            </div>
            <textarea className="editor-textarea" rows="10" placeholder="p"></textarea>
            <div className="word-count">
                <span>0 words</span>
                <span className="ml-20">@tiny</span>
            </div>
        </div>
      </div>

      {/* --- Footer Options --- */}
      <div className="footer-options">
          <input type="checkbox" id="archive" />
          <label htmlFor="archive">अभिलेख गर्नुहोस्</label>
      </div>

      <div className="footer-options">
          <label>बोधार्थ:</label>
          <input type="text" className="line-input long-input" />
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

export default EnglishLanguage;