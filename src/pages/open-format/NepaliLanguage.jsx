// 1
import React from 'react';
import './NepaliLanguage.css';

const NepaliLanguage = () => {
  return (
    <div className="angikrit-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अंगिकृत नागरिकता सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; अंगिकृत नागरिकता सिफारिस</span>
      </div>

      {/* --- Form Header --- */}
      <div className="form-header-details center-text">
        <h3 className="schedule-title">अनुसूची - २</h3>
        <p className="rule-text">नियम ३ को उपनियम (२) र (३) नियम ५ को उपनियम (४) र नियम १६ को उपनियम (२) सँग सम्बन्धित</p>
        <p className="form-type-title bold-text">नेपाली नागरिकताको प्रमाण पत्र पाउँ।</p>
      </div>

      {/* --- Addressee & Subject --- */}
      <div className="addressee-section">
          <p className="bold-text">श्रीमान् प्रमुख जिल्ला अधिकारी ज्यू,</p>
          <div className="addressee-row">
              <label>जिल्ला प्रशासन कार्यालय</label>
              <input type="text" className="dotted-input medium-input" defaultValue="काठमाडौँ" />
          </div>
      </div>
      
      {/* --- Introductory Paragraph --- */}
      <div className="intro-paragraph-section">
          <p className="body-paragraph">
              महोदय,
              <br />
              मेरो निम्न विवरण भएको र नेपाली नागरिकताको विवरण सहित नेपाली नागरिकताको प्रमाण पत्र पाउनको लागि सिफारिस साथ रु. १० को टिकट टाँसी निवेदन पेश गरेको छु। मेरो निम्न बमोजिमको विवरण रहेको व्यहोरा प्रमाणित गरिन्छ ।
          </p>
      </div>

      {/* --- Main Application Form Grid --- */}
      <div className="application-form-grid">
         
          {/* 1. Applicant's Details (Name, Sex, DOB) */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">१. निवेदकको विवरण</h4>
               <div className="detail-row">
                  <label>पूरा नाम : <span className="red">*</span></label>
                  <input type="text" className="dotted-input long-input" />
                  <label>जारी मिति:</label>
                  <input type="text" className="dotted-input medium-input" defaultValue="२०८२-०८-०६" />
                  <label>जिल्ला:</label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
               <div className="detail-row">
                  <label className="en-label">Full Name (In Block) : <span className="red">*</span></label>
                  <input type="text" className="dotted-input long-input" />
                  <label>लिङ्ग/Sex :</label>
                  <select className="inline-select"><option>Male</option></select>
                  <label>विवाह मिति:</label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
          </div>
          
          {/* 2. Address Details */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">२. ठेगाना (हालको / स्थाई)</h4>
              <div className="detail-row">
                  <label>स्थायी ठेगाना : जिल्ला:</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>गाउँपालिका/नगरपालिका :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>वडा नं :</label>
                  <input type="text" className="dotted-input tiny-input" />
              </div>
               <div className="detail-row">
                  <label>अस्थायी ठेगाना : जिल्ला:</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>गाउँपालिका/नगरपालिका :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>वडा नं :</label>
                  <input type="text" className="dotted-input tiny-input" />
              </div>
          </div>

          {/* 3. Father/Husband Details */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">३. बाबु/पतिको विवरण</h4>
              <div className="detail-row">
                  <label>बाबुको नाम : <span className="red">*</span></label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>आमाको नाम : <span className="red">*</span></label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
              <div className="detail-row">
                  <label>पतिको नाम :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>ठेगाना : <span className="red">*</span></label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
          </div>

          {/* 4. Birth Details */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">४. जन्म विवरण</h4>
              <div className="detail-row">
                  <label>जन्म स्थान (देश): <span className="red">*</span></label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>जन्म मिति (वि.स.) :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>जन्म मिति (ई.स.) :</label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
          </div>
          
          {/* 5. Acquired Citizenship Details */}
           <div className="grid-item full-width-grid">
              <h4 className="section-title">५. अंगीकृत नागरिकताको विवरण</h4>
              <div className="detail-row">
                  <label>अंगीकृत नागरिकताको कारण :</label>
                  <input type="text" className="dotted-input long-input" />
              </div>
              <div className="detail-row">
                  <label>विवाहको मिति:</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>मिति:</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>जिल्ला:</label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
          </div>
        
      </div>
      
      {/* --- Signature Block --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
          </select>
          <input type="text" className="line-input full-width-input" defaultValue="२०८२-०८-०६" />
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
      <div className form-footer>
        <button className="save-print-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
      </div>
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default NepaliLanguage;