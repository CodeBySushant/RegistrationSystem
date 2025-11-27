// 3
import React from 'react';
import './SthalagatSarjiminMujulka.css';

const SthalagatSarjiminMujulka = () => {
  return (
    <div className="sarjimin-mujulka-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        स्थलगत सर्जमिन मुचुल्का
        <span className="top-right-bread">फिर्ता नागरिकता &gt; स्थलगत सर्जमिन मुचुल्का</span>
      </div>

      {/* --- Form Header --- */}
      <div className="form-header-details">
        <h3 className="schedule-title">अनुसूची-३</h3>
        <p className="rule-text">नियम ३ को उपनियम (३) को खण्ड (क) सँग सम्बन्धित</p>
        <p className="form-type-title bold-text">स्थलगत सर्जमिन मुचुल्काको ढाँचा</p>
        <p className="sub-type-text underline-text">वंशजको नाताले</p>
      </div>

      {/* --- Main Body Paragraph --- */}
      <div className="intro-paragraph">
        <p>
          <span className="bold-text">लिखत मिति</span>
          <input type="text" className="dotted-input small-input" defaultValue="२०८२-०८-११" />
          हामी तपसिलका हामीहरु आजै जिल्ला प्रशासन कार्यालय, काठमाडौँ
          <input type="text" className="dotted-input medium-input" />
          सम्बन्धी नागरिकताको विवरण कार्यको लागि आएको
          <input type="text" className="dotted-input long-input" />
          को
          <select className="inline-select"><option>श्री</option></select>
          <input type="text" className="dotted-input medium-input" />
          समक्ष यस जिल्लाको नागार्जुन नगरपालिका
          <input type="text" className="dotted-input tiny-input" defaultValue="१" />
          वडा नं १
          <input type="text" className="dotted-input tiny-input" />
          को कार्यालय मा बस्ने <select className="inline-select"><option>श्री</option></select>
          <input type="text" className="dotted-input medium-input" />
          ले नेपाली नागरिकताको प्रमाण पत्र पाउनको लागि निवेदन दिनु भएकोमा सत्यता हामीहरुलाई जानकारी भएकोले सिफारिस गरिन्छ ।
        </p>
        <p>
          निवेदक <select className="inline-select"><option>श्री</option></select>
          <input type="text" className="dotted-input medium-input" />
          का छोरा-बुहारी इनि निवेदक वंशजको नाताले नेपाली नागरिक हुन् । निजलाई नेपाली नागरिकताको प्रमाण पत्र दिनुपर्ने भन्ने व्यहोरा फरक परेको वा केरमेट भएकोले कानून बमोजिम सहुँला बुझाउँला भनी यस वडा कार्यालयमा मुचुल्का गरिएको छ ।
        </p>
        <p>
          <span className="bold-text">प्रमाण पत्र</span>
          <input type="text" className="dotted-input medium-input" />
          <span className="bold-text">र दर्ता विवरण</span>
          <input type="text" className="dotted-input long-input" />
          माथि तपसिलमा निम्न बमोजिमका व्यक्तिहरु रोहवरमा छन् ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <h4 className="center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.स.</th>
                        <th style={{width: '20%'}}>नाम थर</th>
                        <th style={{width: '15%'}}>वतन</th>
                        <th style={{width: '15%'}}>ना.प्र.प.नं</th>
                        <th style={{width: '15%'}}>नागरिकता जारी मिति</th>
                        <th style={{width: '15%'}}></th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" defaultValue="२०८२-०८-११" required /> <span className="red">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
      
      {/* --- Signature Block --- */}
      <div className="signature-section">
          <div className="signature-line"></div>
          <p className="center-text bold-text">नाम: <span className="red">*</span></p>
          <div className="sig-row">
              <label>पद:</label>
              <select className="inline-select medium-select"><option>पद छनौट गर्नुहोस्</option></select>
          </div>
          <p className="center-text">मिति: <span className="bold-text">२०८२-०८-११</span></p>
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

export default SthalagatSarjiminMujulka;