// 20
import React from 'react';
import './GharKayamNewFormat.css';

const GharKayamNewFormat = () => {
  return (
    <div className="ghar-kayam-new-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        घर कायम नयाँ फर्म्याट ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; घर कायम नयाँ फर्म्याट</span>
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
          <span>श्री मालपोत कार्यालय</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन, काठमाडौँ" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">घर कायम सिफारिस सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा जिल्ला <input type="text" className="inline-box-input medium-box" defaultValue="गुल्मी ग्वादा" /> वडा नं. १ बस्ने <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> निवेदन अनुसार निजको नाममा दर्ता प्रमाणित रहेको तपसिलमा उल्लेखित कित्ता जग्गामा बनेको घरको मिति <span className="bg-gray-text">२०८२-०८-०६</span> मा निर्माण इजाजत लिई मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> मा <input type="text" className="inline-box-input long-box" required /> <span className="red">*</span> प्रमाण पत्र लिई सकेकोले श्रेस्ता पूर्जामा घर कायम गरी पाउ भनी यस वडा कार्यालयमा निवेदन दिएको हुँदा निवेदकको मागबमोजिम तहाँ कार्यालयको नियमानुसार श्रेस्तामा घर कायम हुने व्यवस्थाको लागि सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Tapashil Table --- */}
      <div className="table-section">
          <h4 className="table-title underline-text bold-text">तपसिल:</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '20%'}}>गा.बि.स./नगरपालिका</th>
                        <th style={{width: '15%'}}>वडा नं</th>
                        <th style={{width: '20%'}}>सिट नं</th>
                        <th style={{width: '20%'}}>कित्ता नं</th>
                        <th style={{width: '20%'}}>क्षेत्रफल</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
          {/* Fake scrollbar */}
          <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
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

export default GharKayamNewFormat;