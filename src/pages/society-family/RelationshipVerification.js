// 9
import React from 'react';
import './RelationshipVerification.css';

const RelationshipVerification = () => {
  return (
    <div className="relationship-verification-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नाता प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; नाता प्रमाणित</span>
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
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">नाता प्रमाणित प्रमाणपत्र ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          देहायका व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध रहेको सो नाता सम्बन्ध प्रमाणित गरी पाउँ भनि <span className="bold-text">नागार्जुन नगरपालिका</span> <input type="text" className="inline-box-input tiny-box" required /> नं. वडा कार्यालयमा मिति <input type="text" className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> मा 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> का नाति 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
          <select className="inline-select">
              <option>छोरा</option>
              <option>छोरी</option>
          </select>
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले दिनुभएको दरखास्त बमोजिम यस कार्यालयबाट आवश्यक जाँचबुझ गरी बुझ्दा तपाईको देहाय बमोजिमको व्यक्तिसँग देहाय बमोजिमको नाता सम्बन्ध कायम रहेको देखिएकोले स्थानीय सरकार संचालन ऐन २०७४ को दफा १२ उपदफा २ को खण्ड (ङ) १ बमोजिम नाता प्रमाणित गरी यो प्रमाण पत्र प्रदान गरीएको छ ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '35%'}}>नाता सम्बन्ध कायम गरेको व्यक्तिको नाम</th>
                        <th style={{width: '20%'}}>नाता</th>
                        <th style={{width: '30%'}}>नागरिकता नं. / जन्म दर्ता नं.</th>
                        <th style={{width: '5%'}}>जीवित/मृत्यु</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td className="text-center">
                            <input type="checkbox" />
                        </td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
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

export default RelationshipVerification;