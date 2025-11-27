// 3
import React from 'react';
import './OpenApplication.css';

const OpenApplication = () => {
  return (
    <div className="open-format-english-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        Open Format
        <span className="top-right-bread">Open Format &gt; Open Format</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name en-text">Nagarjun Municipality</h1>
          <h2 className="ward-title en-text">1 No. Ward Office</h2>
          <p className="address-text en-text">Kathmandu, Kathmandu</p>
          <p className="province-text en-text">Bagmati Province, Nepal</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <label className="en-label">Letter No. :</label>
          <span className="bold-text">2082/83</span>
          <div className="ref-input-row">
             <label className="en-label">Ref No. :</label>
             <input type="text" className="dotted-input small-input" />
          </div>
        </div>
        <div className="meta-right">
          <label className="en-label">Date :</label>
          <span className="bold-text">2025.11.27</span>
        </div>
      </div>

      {/* --- Addressee & Subject --- */}
      <div className="addressee-subject-section">
          <div className="subject-block">
              <label className="en-label">Subject: <span className="red">*</span></label>
              <input type="text" className="line-input large-input" required />
          </div>
          <div className="addressee-row">
              <span className="en-label">Shree</span>
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

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <select className="designation-select">
             <option>Select Designation</option>
             <option>Ward Chairperson</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3 className="en-label bold-text">Applicant Details</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label className="en-label">Applicant Name <span className="red">*</span></label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label className="en-label">Applicant Address <span className="red">*</span></label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label className="en-label">Applicant Citizenship Number <span className="red">*</span></label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label className="en-label">Applicant Phone Number <span className="red">*</span></label>
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

export default OpenApplication;