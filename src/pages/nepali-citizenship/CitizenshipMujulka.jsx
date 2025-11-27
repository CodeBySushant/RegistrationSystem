// 2
import React from 'react';
import './CitizenshipMujulka.css';

const CitizenshipMujulka = () => {
  return (
    <div className="citizenship-mujulka-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नागरिकताको लागि मुचुल्का ।
        <span className="top-right-bread">नागरिकता &gt; नागरिकताको लागि मुचुल्का</span>
      </div>

      {/* --- Header --- */}
      <div className="header-text center-text">
        <p>लिखत मिति हामी तपसिलमा उल्लेखित मानिसहरु आजै बागमती प्रदेश <input type="text" className="dotted-input medium-input" defaultValue="काठमाडौँ" /> जिल्ला <input type="text" className="dotted-input medium-input" defaultValue="नागार्जुन नगरपालिका" /> वडा नं १ को कार्यालय मा मिति २०८२-०८-०६ वडा नं <input type="text" className="dotted-input tiny-input" required /> <span className="red">*</span> मा तपसिलको निवेदकको निवेदन अनुसार साविक <input type="text" className="dotted-input medium-input" /> <select className="inline-select"><option>गाउँपालिका</option></select> वडा नं <input type="text" className="dotted-input tiny-input" required /> <span className="red">*</span> का स्थायी निवासी श्री <input type="text" className="dotted-input medium-input" required /> <span className="red">*</span> ले हालसम्म नेपाली नागरिकताको प्रमाण-पत्र नलिएको र मेरो शैक्षिक योग्यताको प्रमाण-पत्र अनुसार जन्म मिति <input type="text" className="dotted-input medium-input" defaultValue="२०८२-०८-०६" /> कायम गरी स्थायी नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि मुचुल्का गरी पाउँ भनी यस वडा समक्ष गरेको निवेदन अनुसार निजलाई सहयोग गरीनेछन् ।</p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          साविकको ठेगाना हालसम्म <span className="underline-text bold-text">नेपाली नागरिकताको प्रमाण-पत्र</span> नलिएको र निजको माग अनुसार स्थायी नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गराईदिन सिफारिस गरिनु पर्ने भन्ने व्यहोरा ठीक साँचो हो झुटा ठहरे कानून बमोजिम सहुँला बुझाउँला भनी मुचुल्का गर्ने मानिसहरु नागार्जुन नगरपालिका वडा नं १ का स्थायी नागरिकहरु काठमाडौँ जिल्ला प्रशासन कार्यालयमा नागरिकताका लागि मुचुल्का गर्न तयार छन् ।
        </p>

        {/* --- Table Section --- */}
        <div className="table-section">
            <h4 className="table-title center-text bold-text">तपसिल</h4>
            <div className="table-responsive">
              <table className="details-table">
                  <thead>
                      <tr>
                          <th style={{width: '5%'}}>क्र.स.</th>
                          <th style={{width: '15%'}}>जिल्ला</th>
                          <th style={{width: '15%'}}>गाउँपालिका</th>
                          <th style={{width: '10%'}}>वडा नं.</th>
                          <th style={{width: '20%'}}>निवास</th>
                          <th style={{width: '20%'}}>ना.प्र.प.नं.</th>
                          <th style={{width: '15%'}}></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>१</td>
                          <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                          <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                          <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                          <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                          <td><input type="text" className="table-input" required /> <span className="red">*</span></td>
                          <td className="action-cell"><button className="add-btn">+</button></td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
        
        {/* --- Signature Block (Right Aligned) --- */}
        <div className="signature-section-bottom">
            <h4 className="center-text bold-text">रोहवर</h4>
            <div className="signatures-grid">
                <div className="sig-item">
                    <label>जिल्ला</label>
                    <input type="text" className="dotted-input medium-input" defaultValue="काठमाडौँ" />
                </div>
                <div className="sig-item">
                    <label>गाउँपालिका/वडा नं.</label>
                    <input type="text" className="dotted-input medium-input" />
                </div>
                <div className="sig-item">
                    <label>पद छनौट गर्नुहोस्</label>
                    <select className="inline-select medium-input"><option>श्री</option></select>
                </div>
            </div>
             <div className="signatures-grid mt-20">
                <div className="sig-item">
                    <label>काम लाग्ने गरी</label>
                    <input type="text" className="dotted-input medium-input" />
                </div>
                <div className="sig-item">
                    <label>गाउँपालिका</label>
                    <input type="text" className="dotted-input medium-input" />
                </div>
                <div className="sig-item">
                    <label>वडा कार्यालय</label>
                    <input type="text" className="dotted-input medium-input" />
                </div>
            </div>
        </div>

        {/* --- Footer Signature --- */}
        <div className="footer-signature-row">
            <div className="footer-sig-item">
                <label>मिति <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" defaultValue="२०८२-०८-०६" />
            </div>
            <div className="footer-sig-item">
                 <label>पदास्र्तमा श्री <span className="red">*</span></label>
                 <input type="text" className="dotted-input medium-input" />
            </div>
            <div className="footer-sig-item">
                <label>सहीछाप <span className="red">*</span></label>
                <input type="text" className="dotted-input medium-input" />
            </div>
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

export default CitizenshipMujulka;