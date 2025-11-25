// 7
import React from 'react';
import './KittaKatRecommendation.css';

const KittaKatRecommendation = () => {
  return (
    <div className="kittakat-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कित्ताकाट सिफारिस ।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; कित्ताकाट सिफारिस</span>
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
        <p>विषय:<span className="underline-text">कित्ताकाट सिफारिस।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <select className="bold-select">
              <option>नापी कार्यालय</option>
              <option>मालपोत कार्यालय</option>
          </select>
          <span>,</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
           <span className="bold-text">, काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">काठमाडौँ</span> , <span className="bold-text ml-20">नागार्जुन नगरपालिका</span> <select className="inline-select"><option>गाउँपालिका</option></select> वडा नं. <span className="bold-text">१</span> स्थायी बासिन्दा (साविकको ठेगाना <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" /> <span className="red">*</span> ) श्री 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाममा श्रेस्ता दर्ता कायम रहेको तल उल्लेखित विवरण को घर-जग्गा मध्ये <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> तर्फबाट <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> क्षेत्रफल जग्गा <select className="inline-select"><option>कित्ताकाट</option></select> गर्न प्राबिधिक निरीक्षण गर्दा मापदण्ड अनुसार मिल्ने देखिएको हुनाले सोको लागि सिफारिस गरिन्छ ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <h4 className="table-title">घर रहेको जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '10%'}}>क्र.स.</th>
                        <th style={{width: '30%'}}>सिट नं</th>
                        <th style={{width: '30%'}}>कित्ता नं.</th>
                        <th style={{width: '30%'}}>क्षेत्रफल</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>

      {/* --- Field Inspection Report Section --- */}
      <div className="field-report-section">
          <h4 className="report-title underline-text">कित्ताकाट सिफारिस फिल्ड निरीक्षण प्रतिवेदन</h4>
          
          <div className="report-row">
              <label>घर बनेको जग्गाको क्षेत्रफल</label>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>घरको जम्मा क्षेत्रफल</label>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>घरको भुइँ तल्लाको क्षेत्रफल</label>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>पाउने फार</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>सिफारिस दिन मिल्ने कारण</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>सिफारिस गर्ने:</label>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>प्राबिधिकको नाम</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" />
          </div>
          <div className="report-row">
              <label>प्राबिधिकको हस्ताक्षर</label>
              <input type="text" className="line-input long-input" />
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

export default KittaKatRecommendation;