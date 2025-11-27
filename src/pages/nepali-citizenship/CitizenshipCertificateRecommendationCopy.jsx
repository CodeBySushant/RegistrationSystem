// 1
import React from 'react';
import './CitizenshipCertificateRecommendationCopy.css';

const CitizenshipCertificateRecommendationCopy = () => {
  return (
    <div className="citizenship-copy-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नागरिकता प्रमाण पत्रको प्रतिलिपि सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; नागरिकता प्रमाण पत्रको प्रतिलिपि सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-text center-text">
            {/* The provided image only shows the text "श्री प्रमुख जिल्ला अधिकारी ज्यु" and address, no logo/title block here */}
        </div>
      </div>

      {/* --- Addressee --- */}
      <div className="addressee-section">
          <p className="bold-text addressee-title">श्री प्रमुख जिल्ला अधिकारी ज्यु</p>
          <div className="addressee-row">
              <label>जिल्ला</label>
              <input type="text" className="line-input medium-input" defaultValue="प्रशासन कार्यालय" />
              <span>, काठमाडौँ</span>
          </div>
      </div>
      
      {/* --- Subject --- */}
      <div className="subject-section center-text">
        <p>विषय: <span className="underline-text">नेपाली नागरिकताको प्रमाण पत्रको प्रतिलिपि पाऊँ।</span></p>
      </div>

      {/* --- Introductory Paragraph --- */}
      <div className="intro-paragraph-section">
          <p className="body-paragraph">
              महोदय,
              <br />
              मेरो निम्न विवरण भएको नेपाली नागरिकताको प्रमाण पत्र देहायका विवरण फरक परेको वा केरमेट भएको कारणले रु. ५ को टिकट टाँस गरी प्रतिलिपिको लागि निवेदन पेश गरेको छु। मेरो निम्न बमोजिमको विवरण रहेको व्यहोरा सिफारिस गरिन्छ ।
          </p>
      </div>

      {/* --- Main Application Form Grid --- */}
      <div className="application-form-grid">
          
          {/* 1. Citizenship Details */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">१. नागरिकताको प्रमाण पत्रको प्रकार</h4>
              <div className="detail-row">
                  <label className="bold-text">प्र.प.नं. :</label>
                  <input type="text" className="dotted-input medium-input" required />
                  <label>जारी जिल्ला :</label>
                  <input type="text" className="dotted-input medium-input" required />
                  <label>जारी मिति :</label>
                  <input type="text" className="dotted-input medium-input" required />
                  <label>किसिम :</label>
                  <select className="inline-select">
                      <option>जन्म</option>
                      <option>वंशज</option>
                      <option>अंगीकृत</option>
                  </select>
              </div>
          </div>

          {/* 2. Applicant's Details (Name, Sex, DOB) */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">२. निवेदकको विवरण</h4>
              <div className="detail-row">
                  <label>पूरा नाम, थर : <span className="red">*</span></label>
                  <input type="text" className="dotted-input long-input" />
                  <label className="en-label">FULL NAME (IN BLOCK) :</label>
                  <input type="text" className="dotted-input long-input" />
              </div>
               <div className="detail-row">
                  <label>जन्म मिति (वि.स.):</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>जन्म मिति (ई.स.):</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>लिङ्ग/Sex :</label>
                  <select className="inline-select">
                      <option>Male</option>
                      <option>Female</option>
                  </select>
              </div>
          </div>
          
          {/* 3. Address Details */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">३. ठेगाना</h4>
              <div className="detail-row">
                  <label>स्थायी ठेगाना :</label>
                  <input type="text" className="dotted-input long-input" />
                  <label>अस्थायी ठेगाना :</label>
                  <input type="text" className="dotted-input long-input" />
              </div>
               <div className="detail-row">
                  <label>गाउँपालिका/नगरपालिका :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>वडा नं :</label>
                  <input type="text" className="dotted-input tiny-input" />
                  <label>टोल :</label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
          </div>

          {/* 4. Relationship Details */}
          <div className="grid-item full-width-grid">
              <h4 className="section-title">४. नाता र हकदार</h4>
              <div className="detail-row">
                  <label>बाबुको नाम :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>जन्म मिति (वि.स.):</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>नाता:</label>
                  <input type="text" className="dotted-input small-input" />
              </div>
              <div className="detail-row">
                  <label>आमाको नाम :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>बाजेको नाम :</label>
                  <input type="text" className="dotted-input medium-input" />
                  <label>नाता:</label>
                  <input type="text" className="dotted-input small-input" />
              </div>
          </div>

          {/* 5. Verification/Witness */}
           <div className="grid-item full-width-grid">
              <h4 className="section-title">५. प्रमाणित गर्ने व्यक्ति</h4>
              <div className="detail-row">
                  <label>सिफारिस गर्ने :</label>
                  <input type="text" className="dotted-input long-input" />
                  <label>पद :</label>
                  <input type="text" className="dotted-input medium-input" />
              </div>
               <div className="detail-row">
                  <label>साक्षी :</label>
                  <input type="text" className="dotted-input long-input" />
                  <label>नाता:</label>
                  <input type="text" className="dotted-input small-input" />
              </div>
          </div>

          {/* 6. Reason and Decision */}
           <div className="grid-item full-width-grid">
              <h4 className="section-title">६. कारण र निर्णय</h4>
              <div className="detail-row">
                  <label>प्रतिलिपि पाउने कारण :</label>
                  <input type="text" className="dotted-input long-input" />
              </div>
              <div className="detail-row">
                  <label>कार्यालयको सिफारिस :</label>
                  <input type="text" className="dotted-input long-input" />
              </div>
          </div>
        
      </div>
      
      {/* --- Signature Block --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
          </select>
          <input type="text" className="line-input full-width-input" defaultValue="२०८२-०८-०६" />
        </div>
      </div>

      {/* --- Applicant Details Box (Footer) --- */}
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

export default CitizenshipCertificateRecommendationCopy;