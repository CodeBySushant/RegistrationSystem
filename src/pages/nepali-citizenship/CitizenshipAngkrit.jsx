// 7
import React from 'react';
import './CitizenshipAngkrit.css';

const OldAgeAllowanceForm = () => {
  return (
    <div className="old-age-allowance-container">
      {/* --- Main Title and Schedule --- */}
      <div className="center-text">
        <h2 className="main-form-title">वृद्धा भत्ताको निवेदन।</h2>
        <div classNamesub-header-text>
          <p>अनुसूची - ३ (क)</p>
          <p>(दफा ६ को उपदफा ३ सँग सम्बन्धित)</p>
        </div>
      </div>

      {/* --- Addressee & Date Row --- */}
      <div className="addressee-date-row">
        <div className="addressee-block">
          <p>श्री अध्यक्ष ज्यू,</p>
          <div className="addressee-details">
            <input type="text" className="dotted-input medium-input" defaultValue="नागार्जुन नगरपालिका" />
            <span className="red">*</span>
            <span className="ward-text">वडा १</span>
          </div>
        </div>
        <div className="date-block">
            <p>मिति: <span className="bold-text">२०८२-०७-०५</span></p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section center-text">
        <p>विषय: <span className="underline-text bold-text">नाम दर्ता सम्बन्धमा</span></p>
      </div>

      {/* --- Main Body Introduction --- */}
      <div className="form-body-text">
        <p>महोदय,</p>
        <p className="body-paragraph">
        उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम सहुँला बुझाउँला।
        </p>
      </div>

      {/* --- Target Group Select --- */}
      <div className="target-group-section">
          <label>लक्षित समूह:</label>
          <select className="styled-select border-select">
              <option>जेष्ठ नागरिक (दलित)</option>
              <option>जेष्ठ नागरिक (अन्य)</option>
              <option>विधवा</option>
              {/* Other options would be here */}
          </select>
          <span className="small-text">(उपयुक्त कुनै एकमा चिन्ह लगाउने)</span>
      </div>

      {/* --- Applicant Details Section (निवेदक) --- */}
      <div className="applicant-details-section">
        <h3 className="section-title underline-text center-text">निवेदक</h3>
        <div className="applicant-grid">
            {/* Left Col */}
            <div className="grid-col">
                <div className="form-row">
                    <label>नाम, थर: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="form-row">
                    <label>बाबुको नाम: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="form-row">
                    <label>ठेगाना: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="form-row">
                    <label>ना.प्र.नं.: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="form-row">
                    <label>जेष्ठ नागरिकको हकमा उमेर पुग्ने मिति:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
            </div>
            
            {/* Right Col */}
            <div className="grid-col">
                <div className="form-row">
                    <label>लिङ्ग:</label>
                    <select className="styled-select" style={{width: '60%'}}><option>पुरुष</option></select>
                </div>
                <div className="form-row">
                    <label>आमाको नाम: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="form-row">
                    <label>जन्ममिति: <span className="bold-text">२०८२-०७-०५</span></label>
                </div>
                <div className="form-row">
                    <label>जारी जिल्ला: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="form-row">
                    <label>सम्पर्क मोवाईल नं.: <span className="red">*</span></label>
                    <input type="text" className="dotted-input full-width" />
                </div>
            </div>
             <div className="form-row full-span mt-20">
                <label>दस्तखत:</label>
                <input type="text" className="dotted-input full-width-line" />
            </div>
        </div>
      </div>

      {/* --- Office Use Section --- */}
      <div className="office-use-box mt-30">
        <h3 className="section-title center-text underline-text">कार्यालय प्रयोजनको लागि</h3>
        <div className="office-grid">
             <div className="form-row">
                <label>नाम दर्ता निर्णय मिति: २०८२-०७-०५</label>
            </div>
             <div className="form-row">
                <label>भत्ताको किसिम:</label>
                <input type="text" className="dotted-input full-width" />
            </div>
             <div className="form-row">
                <label>परिचय पत्र नं.:</label>
                <input type="text" className="dotted-input full-width" />
            </div>
             <div className="form-row full-span">
                <label>भत्ता पाउन सुरु मिति: आ.व. <span className="red">*</span></label>
                <input type="text" className="dotted-input tiny-input" />
                <label>को</label>
                <select className="dotted-input tiny-input">
                    <option>पहिलो</option>
                    <option>दोस्रो</option>
                </select>
                <label>चौमासिकदेखि</label>
            </div>
        </div>
      </div>

      {/* --- Footer Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid-footer">
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

export default OldAgeAllowanceForm;