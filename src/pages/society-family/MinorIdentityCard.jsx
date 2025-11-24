// 16
import React from 'react';
import './MinorIdentityCard.css';

const MinorIdentityCard = () => {
  return (
    <div className="minor-card-application-container">
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

      {/* --- Photo Box --- */}
      <div className="photo-box-wrapper">
          <div className="photo-box">
              नाबालकको फोटो
          </div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
          <p className="bold-text">श्रीमान प्रमुख जिल्ला अधिकारी ज्यू,</p>
          <div className="addressee-row">
              <select className="inline-select">
                  <option>जिल्ला</option>
                  <option>इलाका</option>
              </select>
              <span> प्रशासन कार्यालय,</span>
          </div>
          <div className="addressee-row">
              <input type="text" className="line-input medium-input" />
              <span className="red">*</span>
              <span>,</span>
              <input type="text" className="line-input medium-input" />
              <span className="red">*</span>
          </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय:- <span className="underline-text">नाबालक परिचय पत्र पाउँ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
            महोदय,<br/>
            मेरो निम्न विवरण भएको छोरा/छोरी <input type="text" className="line-input medium-input" /> <span className="red">*</span> को नाबालक परिचयपत्र आवश्यक भएको हुदा रु. १०/- को टिकट टाँसी नाबालक परिचयपत्र पाउँन यो निवेदन पेश गरेको छु ।
        </p>
        <div className="section-header underline-text center-text bold-text">विवरण:</div>
        
        {/* Form Fields Grid */}
        <div className="form-fields-grid">
            {/* Row 1: Name & Gender */}
            <div className="form-row">
                <label>नामथर : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                
                <label className="ml-20">लिङ्ग :</label>
                <select className="inline-select">
                    <option>पुरुष</option>
                    <option>महिला</option>
                    <option>अन्य</option>
                </select>
            </div>

            {/* Row 2: Full Name (Eng) & Sex */}
            <div className="form-row">
                <label className="en-label">FULL NAME(In Block): <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                
                <label className="en-label ml-20">Sex:</label>
                <span className="en-label">Male</span>
            </div>

            {/* Row 3: Birthplace (Nepali) */}
            <div className="form-row">
                <label>जन्मस्थान: जिल्ला: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                
                <label>गाउँपालिका <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
                
                <label>वडा नं.: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
            </div>

            {/* Row 4: Birthplace (English) */}
            <div className="form-row">
                <label className="en-label">Place of Birth(In Block) District: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                
                <label className="en-label">R.M. : <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
                
                <label className="en-label">WardNo: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
            </div>

            {/* Row 5: Permanent Address (Nepali) */}
            <div className="form-row">
                <label>स्थायी ठेगाना : जिल्ला: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                
                <label>गाउँपालिका <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
                
                <label>वडा नं.: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
            </div>

            {/* Row 6: Permanent Address (English) */}
            <div className="form-row">
                <label className="en-label">Permanent Address(In Block): District: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                
                <label className="en-label">R.M. : <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
                
                <label className="en-label">WardNo: <span className="red">*</span></label>
                <input type="text" className="line-input small-input" />
            </div>

            {/* Row 7: DOB */}
            <div className="form-row">
                <label>जन्म मिति: २०८२-०८-०६</label>
            </div>
            <div className="form-row">
                <label className="en-label">BirthDate: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <span className="en-label">A.D.</span>
            </div>

            {/* Row 8: Father's Name */}
            <div className="form-row">
                <label>बाबुको नामथर : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label>ठेगाना : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="form-row">
                <label className="en-label">Father's Name: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label className="en-label">Address: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>

            {/* Row 9: Mother's Name */}
            <div className="form-row">
                <label>आमाको नामथर : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label>ठेगाना : <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="form-row">
                <label className="en-label">Mother's Name: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
                <label className="en-label">Address: <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>

            {/* Row 10: Citizenship */}
            <div className="form-row">
                <label>बाबुको वा आमाको नागरिकता नं. <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>
            <div className="form-row">
                <label className="en-label">Father's or Mother's Citizenship No. <span className="red">*</span></label>
                <input type="text" className="line-input medium-input" />
            </div>

            {/* Row 11: Guardian */}
            <div className="form-row">
                <label>संरक्षकको नाम ठेगाना : <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
                <span>,</span>
                <input type="text" className="line-input medium-input" />
                <span className="red">*</span>
            </div>
            <div className="form-row">
                <label className="en-label">Name/Address of Guardian: <span className="red">*</span></label>
                <input type="text" className="line-input long-input" />
                <span>,</span>
                <input type="text" className="line-input medium-input" />
                <span className="red">*</span>
            </div>
        </div>

        {/* Thumb Prints (Minor) */}
        <div className="thumb-section">
            <p>नाबालकको औंठा छाप</p>
            <div className="thumb-box-container">
                <div className="thumb-box">दायाँ</div>
                <div className="thumb-box">बायाँ</div>
            </div>
        </div>

        <div className="signature-line-section">
            <label>नाबालकको हस्ताक्षर : ........................</label>
        </div>

        <p className="declaration-text bold-text">
            माथि लेखिएको व्यहोरा ठिक साँचो हो, झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनी सही गर्ने ।
        </p>

        {/* Applicant Thumb & Signature Row */}
        <div className="applicant-sign-row">
            <div className="thumb-section">
                <p className="bold-text">निवेदकको सहीछाप</p>
                <div className="thumb-box-container">
                    <div className="thumb-box">दायाँ</div>
                    <div className="thumb-box">बायाँ</div>
                </div>
            </div>
            <div className="applicant-info-right">
                <div className="info-row">
                    <label className="bold-text">निवेदकको हस्ताक्षर:</label>
                </div>
                <div className="info-row">
                    <label>नामथर : <span className="red">*</span></label>
                    <input type="text" className="line-input medium-input" />
                </div>
                <div className="info-row">
                    <label>ठेगाना : <span className="red">*</span></label>
                    <input type="text" className="line-input medium-input" />
                </div>
            </div>
        </div>

        {/* --- Recommendation Block --- */}
        <div className="recommendation-block">
            <p className="body-paragraph">
                निवेदक, श्री 
                <select className="inline-select"><option>श्री</option></select>
                <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को छोरा श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को नाबालक परिचयपत्र माग गरि पेश गरेको विवरण ठिक छ। निवेदक र निज नाबालक दुवैलाई म राम्ररी चिन्दछु।
            </p>
            
            <h4 className="bold-text" style={{marginTop: '10px'}}>सिफारिस गर्नेको:</h4>
            
            <div className="rec-footer-row">
                <div className="rec-left">
                    <div className="row">
                        <label>मिति <input type="text" className="line-input small-input" defaultValue="२०८२-०८-०६" /></label>
                    </div>
                </div>
                <div className="rec-right">
                    <div className="row">
                        <label>दस्तखत: ........................</label>
                    </div>
                    <div className="row">
                        <label>नामथर : <span className="red">*</span></label>
                        <input type="text" className="line-input medium-input" />
                    </div>
                    <div className="row">
                        <label>पद: <select className="inline-select"><option>पद छनौट गर्नुहोस्</option></select></label>
                    </div>
                    <div className="row">
                        <label>कार्यालयको नाम र छाप:</label>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* --- Applicant Details Box (Bottom) --- */}
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

export default MinorIdentityCard;