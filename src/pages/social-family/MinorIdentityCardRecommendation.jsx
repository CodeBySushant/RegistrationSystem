// 15
import React from 'react';
import './MinorIdentityCardRecommendation.css';

const MinorIdentityCardRecommendation = () => {
  return (
    <div className="minor-card-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नाबालक परिचय पत्र ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; नाबालक परिचय पत्र</span>
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

      {/* --- Photo Box (Positioned Absolute or Flex) --- */}
      <div className="photo-box-container">
          <div className="photo-box">
              नाबालकको फोटो
          </div>
      </div>

      {/* --- Title & Subtitle --- */}
      <div className="form-title-section">
          <h4 className="underline-text bold-text">नाबालक परिचयपत्रको अनुसूची।</h4>
      </div>

      {/* --- Addressee --- */}
      <div className="addressee-section">
          <p className="bold-text">श्रीमान प्रमुख जिल्ला अधिकारी</p>
          <div className="addressee-row">
              <select className="inline-select">
                  <option>जिल्ला</option>
                  <option>इलाका</option>
              </select>
              <span>प्रशासन कार्यालय,</span>
              <input type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
              <span>|</span>
          </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">नाबालक परिचय पत्र पाउँ।</span></p>
      </div>

      {/* --- Main Form Body --- */}
      <div className="form-body">
        <p className="intro-text">
            मेरो निम्ननुसारको विवरण भएको नाबालकको परिचयपत्र बनाउन परेकोले सिफारिस साथ रु. १० को टिकट टाँस गरी यो निवेदन पेश गरेको छु। मेरो 
            <select className="inline-select">
                <option>छोरा</option>
                <option>छोरी</option>
            </select>
            <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            ले यस अघि नाबालक परिचयपत्र बनाएको छैन ।
        </p>

        {/* 1. Name */}
        <div className="form-group-block">
            <div className="row">
                <label>१. नाबालकको नाम,थर : <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
            <div className="row">
                <label className="en-label">Full Name(In Block): <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
        </div>

        {/* 2. Gender */}
        <div className="form-group-block">
            <div className="row">
                <label>२. लिङ्ग</label>
                <select className="inline-select">
                    <option>पुरुष</option>
                    <option>महिला</option>
                    <option>अन्य</option>
                </select>
                <label className="en-label ml-20">Sex:</label>
                <span className="en-label">Male</span>
            </div>
        </div>

        {/* 3. Birth Place */}
        <div className="form-group-block">
            <div className="row">
                <label>३. नाबालकको जन्मस्थान (जन्म दर्ता प्र. प्र. बमोजिम): देश: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label>प्रदेश: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label>जिल्ला:</label>
                <input type="text" className="line-input medium-input" />
                <span className="red">*</span>
                <label>न.पा/गा.पा:</label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="row">
                <label className="en-label">Place of Birth(According to birth certificate): Country: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label className="en-label">Province: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label className="en-label">District:</label>
                <span className="red">*</span>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="row">
                <label className="en-label">RM/MUN: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
        </div>

        {/* 4. Father's Details */}
        <div className="form-group-block">
            <div className="row">
                <label>४. बाबुको नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
                <label>ना.प्र.नं. र जारी मिति: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
            <div className="row">
                <label className="en-label">Father's Name: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
        </div>

        {/* 5. Mother's Details */}
        <div className="form-group-block">
            <div className="row">
                <label>५. आमाको नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
                <label>ना.प्र.नं. र जारी जिल्ला: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
            <div className="row">
                <label className="en-label">Mother's Name: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
        </div>

        {/* 6. Guardian's Details */}
        <div className="form-group-block">
            <div className="row">
                <label>६. संरक्षकको नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
            <div className="row">
                <label className="en-label">Guardian's Name: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
            </div>
            <div className="row">
                <label>संरक्षकको ठेगाना</label>
                <input type="text" className="line-input full-width" />
            </div>
        </div>

        {/* 7. Permanent Address */}
        <div className="form-group-block">
            <div className="row">
                <label>७. नाबालकको स्थायी ठेगाना: जिल्ला <span className="underline-text">काठमाडौँ</span></label>
                <label className="ml-20">गा.पा/न.पा: <span className="underline-text">नागार्जुन नगरपालिका</span></label>
                <label className="ml-20">वडा नं: <span className="underline-text">१</span></label>
            </div>
            <div className="row">
                <label className="en-label">Permanent Address: District <span className="underline-text">Kathmandu</span></label>
                <label className="en-label ml-20">RM/MUN: <span className="underline-text">Nagarjun Municipality</span></label>
                <label className="en-label ml-20">Ward no: <span className="underline-text">1</span></label>
            </div>
        </div>

        {/* 8. Date of Birth */}
        <div className="form-group-block">
            <div className="row">
                <label>८. नाबालकको जन्म मिति: वि.स. <span className="underline-text">२०८२-०८-०६</span></label>
                <label className="ml-20">AD: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
        </div>

        {/* 9. Grandparents */}
        <div className="form-group-block">
            <div className="row">
                <label>९. हजुरबुबाको नाम थर <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label>हजुर आमाको नाम थर <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
        </div>

        {/* 10. Thumb Print */}
        <div className="form-group-block">
            <label>१०. नाबालकको औंठा छाप</label>
            <div className="thumb-print-container">
                <div className="thumb-box">दायाँ</div>
                <div className="thumb-box">बायाँ</div>
            </div>
        </div>

        <p className="declaration-text">
            मैले माथि लेखेको व्यहोरा ठीक साँचो हो, झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनी सही गर्ने।
        </p>

        {/* --- Applicant Signature --- */}
        <div className="applicant-signature-section">
            <h4 className="bold-text">निवेदक</h4>
            <div className="sig-row">
                <label>दस्तखत:</label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="sig-row">
                <label>नाम थर: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="sig-row">
                <label>नाबालकसँगको नाता: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="sig-row">
                <label>मिति: <span className="underline-text">२०८२-०८-०६</span></label>
            </div>
        </div>

        <hr className="section-divider" />

        {/* --- Recommendation Section (Bottom) --- */}
        <div className="recommendation-section">
            <h4 className="center-text underline-text bold-text">गाउँपालिका / नगरपालिका वडा अध्यक्षको सिफारिस</h4>
            
            <div className="rec-body">
                <p>
                    जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-10">नागार्जुन नगरपालिका</span> वडा नं <span className="bold-text">१</span> मा स्थायी बसोबास गरी बस्ने यसमा लेखिएका श्री 
                    <select className="inline-select"><option>श्री</option></select>
                    <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को 
                    <select className="inline-select"><option>नाति</option></select> 
                    <select className="inline-select"><option>श्री</option></select>
                    <input type="text" className="inline-box-input medium-box" /> लाई म राम्ररी चिन्दछु । माथि लेखिए बमोजिम निजको ब्यहोरा मैले जाने बुझेसम्म साँचो हो । निजलाई नाबालक परिचय उपलब्ध गराउन सिफारिस गर्दछु । उक्त विवरण झुठ्ठा ठहरे कानुन बमोजिम सहुँला बुझाउँला ।
                </p>
            </div>

            <div className="rec-footer-row">
                <div className="rec-left">
                    <div className="row">
                        <label>कार्यालयको नाम :</label>
                        <span className="underline-text">नागार्जुन नगरपालिका</span>
                    </div>
                    <div className="row">
                        <label>मिति <span className="underline-text">२०८२-०८-०६</span></label>
                    </div>
                </div>
                <div className="rec-right">
                    <div className="row">
                        <label>सिफारिस गर्ने:</label>
                    </div>
                    <div className="row">
                        <label>दस्तखत:</label>
                        <input type="text" className="line-input medium-input" />
                    </div>
                    <div className="row">
                        <label>नाम थर: <span className="red">*</span></label>
                        <input type="text" className="line-input medium-input" />
                    </div>
                    <div className="row">
                        <label>पद: <select className="inline-select"><option>पद छनौट गर्नुहोस्</option></select></label>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* --- Footer Applicant Details Box --- */}
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

export default MinorIdentityCardRecommendation;