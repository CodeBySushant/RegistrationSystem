// 5
import React from 'react';
import './OpenFormatTippani.css';

const OpenFormatTippani = () => {
  return (
    <div className="tippani-container">

      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        टिप्पणी
        <span className="top-right-bread">खुला ढाँचा &gt; टिप्पणी</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>

        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
          <h3 className="certificate-title red-text">टिप्पणी र आदेश</h3>
        </div>
      </div>

      {/* --- Date (Right Aligned) --- */}
      <div className="date-section">
        <p>मिति : <span className="bold-text">२०८२-०८-११</span></p>
      </div>

      {/* --- Addressee & Subject --- */}
      <div className="addressee-subject-section">
        <div className="addressee-row">
          <span>श्रीमान्</span>
          <input type="text" className="line-input large-input" required />
        </div>

        <div className="subject-block">
          <label>विषय: <span className="red">*</span></label>
          <input type="text" className="line-input large-input" required />
        </div>
      </div>

      {/* --- Rich Text Editor Mock --- */}
      <div className="editor-area">
        <div className="rich-editor-mock">

          <div className="editor-toolbar">
            <span className="tool-btn bold">File</span>
            <span className="tool-btn italic">Edit</span>
            <span className="tool-btn">View</span>
            <span className="tool-btn">Insert</span> {/* FIXED */}
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

            <select className="editor-select">
              <option>Paragraph</option>
            </select>

            <select className="editor-select">
              <option>12pt</option>
            </select>

            <span className="tool-sep">|</span>
            <span className="tool-btn bold">B</span>
            <span className="tool-btn italic">I</span>
            <span className="tool-btn underline">U</span>
            <span className="tool-btn strike">S</span>

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

      {/* --- Checkboxes --- */}
      <div className="checkbox-options">
        <input type="checkbox" id="archive" />
        <label htmlFor="archive">अभिलेख गर्नुहोस्</label>

        <input type="checkbox" id="approve" className="ml-20" />
        <label htmlFor="approve">स्वीकृत गर्नुपर्ने</label>
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

export default OpenFormatTippani;
