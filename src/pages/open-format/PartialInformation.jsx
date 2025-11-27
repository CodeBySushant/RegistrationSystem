// 4
import React from 'react';
import './PartialInformation.css';

const PartialInformation = () => {
  return (
    <div className="angikrit-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अंगिकृत नागरिकता सिफारिस ।
        <span className="top-right-bread">नागरिकता &gt; अंगिकृत नागरिकता सिफारिस</span>
      </div>

      {/* --- Header Section (Anusuchi 2) --- */}
      <div className="form-header-details center-text">
        <h3 className="schedule-title">अनुसूची - २</h3>
        <p className="rule-text">नियम ३ को उपनियम (२) र (३) नियम ५ को उपनियम (४) र नियम १६ को उपनियम (२) सँग सम्बन्धित</p>
        <p className="form-type-title bold-text">नेपाली नागरिकताको प्रमाण पत्र पाऊँ।</p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p className="bold-text">श्रीमान् प्रमुख जिल्ला अधिकारी ज्यु,</p>
        <div className="addressee-row">
          <label>जिल्ला प्रशासन कार्यालय</label>
          <input type="text" className="dotted-input medium-input" defaultValue="काठमाडौँ" />
        </div>
      </div>
      
      {/* --- Subject --- */}
      <div className="subject-section center-text">
        <p>विषय: <span className="underline-text">नेपाली नागरिकताको प्रमाण पत्र पाऊँ।</span></p>
      </div>

      {/* --- Introductory Paragraph --- */}
      <div className="intro-paragraph-section">
        <p className="body-paragraph">
          महोदय,
          <br />
          मेरो निम्न विवरण भएको र नेपाली नागरिकताको विवरण सहित नेपाली नागरिकताको प्रमाण पत्र पाउनको लागि सिफारिस साथ रु. १० को टिकट टाँसी निवेदन पेश गरेको छु। मेरो निम्न बमोजिमको विवरण रहेको व्यहोरा प्रमाणित गरिन्छ ।
        </p>
      </div>

      {/* --- Main Form Grid (Bilingual Details) --- */}
      <div className="application-form-grid">
         
        {/* Row 1: Name (Nepali) */}
        <div className="row-group">
          <label>पूरा नाम : <span className="red">*</span></label>
          <input type="text" className="dotted-input long-input" />
        </div>

        {/* Row 2: Name (English) */}
        <div className="row-group">
          <label className="en-label">Full Name (In Block) : <span className="red">*</span></label>
          <input type="text" className="dotted-input long-input" />
        </div>

        {/* Row 3: Sex & Date of Birth */}
        <div className="row-group-split">
          <div className="split-item">
            <label>लिङ्ग : <span className="red">*</span></label>
            <select className="inline-select"><option>पुरुष</option></select>
            <label className="en-label ml-20">Sex :</label>
            <span className="en-label">Male</span>
          </div>
          <div className="split-item">
            <label>जन्म मिति (वि.स.):</label>
            <input type="text" className="dotted-input medium-input" />
            <label className="en-label">Date of Birth (A.D.)</label>
            <input type="text" className="dotted-input medium-input" />
          </div>
        </div>

        {/* Row 4: Birth Place (Nepali) */}
        <div className="row-group-full">
          <label>जन्म स्थान (नेपालीमा): जिल्ला: <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label>गा.पा./न.पा.: <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label>वडा नं: <span className="red">*</span></label>
          <input type="text" className="dotted-input tiny-input" />
        </div>

        {/* Row 5: Birth Place (English) */}
        <div className="row-group-full">
          <label className="en-label">Place of Birth (English): District <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label className="en-label">Nagarjun Municipality <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label className="en-label">Ward No: <span className="red">*</span></label>
          <input type="text" className="dotted-input tiny-input" />
        </div>

        {/* Row 6: Permanent Address (Nepali) */}
        <div className="row-group-full">
          <label>स्थायी ठेगाना : जिल्ला: <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label>गा.पा./न.पा.: <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label>वडा नं: <span className="red">*</span></label>
          <input type="text" className="dotted-input tiny-input" />
        </div>

        {/* Row 7: Permanent Address (English) */}
        <div className="row-group-full">
          <label className="en-label">Permanent Address: District <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label className="en-label">Nagarjun Municipality <span className="red">*</span></label>
          <input type="text" className="dotted-input medium-input" />
          <label className="en-label">Ward No: <span className="red">*</span></label>
          <input type="text" className="dotted-input tiny-input" />
        </div>

        {/* Row 8: Grandparents and Parents */}
        <div className="relationship-table-grid">
          <div className="rel-header-left">
            <label>हजुरबुबाको नाम, थर: <span className="red">*</span></label>
            <input type="text" className="dotted-input full-width" />
          </div>
          <div className="rel-header-right">
            <label>नाता:</label>
            <input type="text" className="dotted-input small-input" />
          </div>

          <div className="rel-details-grid">
            <div className="rel-detail-row">
              <label>बाबुको नाम, थर : <span className="red">*</span></label>
              <input type="text" className="dotted-input medium-input" />
              <label>ठेगाना : <span className="red">*</span></label>
              <input type="text" className="dotted-input medium-input" />
              <label>नागरिकता नं : <span className="red">*</span></label>
              <input type="text" className="dotted-input small-input" />
            </div>
            <div className="rel-detail-row">
              <label>पतिको नाम, थर : <span className="red">*</span></label>
              <input type="text" className="dotted-input medium-input" />
              <label>ठेगाना : <span className="red">*</span></label>
              <input type="text" className="dotted-input medium-input" />
              <label>नागरिकता नं : <span className="red">*</span></label>
              <input type="text" className="dotted-input small-input" />
            </div>
          </div>

          <div className="rel-header-right">
            <label>आमाको नाम, थर: <span className="red">*</span></label>
            <input type="text" className="dotted-input full-width" />
          </div>
          <div className="rel-header-right">
            <label>नागरिकता नं:</label>
            <input type="text" className="dotted-input full-width" />
          </div>
        </div>

        {/* Witness Details */}
        <div className="witness-details-row">
          <h4 className="section-title">रोहबर</h4>
          <div className="witness-grid">
            <div className="witness-item">
              <label>नाम थर</label>
              <input type="text" className="dotted-input full-width" />
            </div>
            <div className="witness-item">
              <label>ठेगाना</label>
              <input type="text" className="dotted-input full-width" />
            </div>
            <div className="witness-item">
              <label>नागरिकता नं</label>
              <input type="text" className="dotted-input full-width" />
            </div>
            <div className="witness-item">
              <label>सहीछाप</label>
              <input type="text" className="dotted-input full-width" />
            </div>
          </div>
        </div>

        {/* Declaration */}
        <p className="declaration-text bold-text mt-20">
          माथि लेखिएको व्यहोरा ठिक साँचो हो झुटा ठहरे कानून बमोजिम सहुँला बुझाउँला।
        </p>
        <div className="applicant-signature-block">
          <label>निवेदकको दस्तखत: ........................</label>
        </div>
      </div>

      {/* --- Footer Signature (Recommendation Block) --- */}
      <div className="recommendation-footer-section">
        <p className="rec-text">
          यस वडा कार्यालयका कर्मचारीले आवश्यक जाँचबुझ गरी बुझ्दा निवेदकको विवरण सही देखिएकोले निजलाई नेपाली नागरिकताको प्रमाण पत्र उपलब्ध गराउन सिफारिस गरिन्छ।
        </p>
        <div className="signature-section">
          <div className="signature-block">
            <input type="text" className="line-input full-width-input" required />
            <select className="designation-select">
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
            </select>
            <input type="text" className="line-input full-width-input" defaultValue="२०८२-०८-०६" />
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

export default PartialInformation;
