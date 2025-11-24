// 27
import React from 'react';
import './NoSecondMarriageRecommendation.css';

const NoSecondMarriageRecommendation = () => {
  return (
    <div className="no-marriage-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        दोश्रो विवाह नगरेको सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; दोश्रो विवाह नगरेको सिफारिस</span>
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
        <p>विषय: <span className="underline-text">दोश्रो विवाह नगरेको सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस सँग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त बिषयमा जिल्ला <input type="text" className="inline-box-input medium-box" defaultValue="काठमाडौँ" /> , 
          <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" />
          वडा नं १ बस्ने <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नातिनी 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरी <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को पत्नी 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ना.प्र.नं. <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> जारी मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> जिल्ला <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले आफ्नो श्रीमानको मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> गतेमा मृत्यु भएको र निजको मृत्यु पश्चात नेपाल सरकार मार्फत प्रदान गरिदै आएको बिधवा महिला वर्ग अन्तर्गतको सामाजिक सुरक्षा भत्ता प्राप्त गरि सके पश्चात कोहि, कसै सँग दोश्रो विवाह नगरेको व्यहोराको सिफारिस गरिदिनु भनि यस १ नं. वडा कार्यालयमा मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> मा दिनु भएको निवेदन तथा सो साथ संलग्न आवश्यक कागजात एवं निजले यस वडा कार्यालयमा उपस्थित गर्नु भएको सनाखत र स्थानीय जाँचबुझ मार्फत निजको निवेदनमा उल्लेख भएको व्यहोरा मनासिब देखिन आएको हुँदा निवेदक <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> सम्म निजको श्रीमान <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को मृत्यु पश्चात दोश्रो विवाह नगरेको व्यहोरा सिफारिस गरिन्छ।
        </p>
      </div>

      {/* --- Witness (Sakshi) Rich Text Mock --- */}
      <div className="sakshi-section">
          <label>साक्षी :</label>
          <div className="rich-editor-mock">
              <div className="editor-toolbar">
                  <span className="tool-btn bold">B</span>
                  <span className="tool-btn italic">I</span>
                  <span className="tool-btn underline">U</span>
                  <span className="tool-btn strike">S</span>
                  <span className="tool-sep">|</span>
                  <span className="tool-btn">x<sub>2</sub></span>
                  <span className="tool-btn">x<sup>2</sup></span>
                  <span className="tool-sep">|</span>
                  <span className="tool-btn">Format</span>
                  {/* Other mock icons */}
              </div>
              <textarea className="editor-textarea" rows="4"></textarea>
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

export default NoSecondMarriageRecommendation;