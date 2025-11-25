// 1
import React from 'react';
import './OldAgeAllowanceForm.css';

const OldAgeAllowanceForm = () => {
  return (
    <div className="old-age-allowance-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        वृद्धा भत्ताको निवेदन
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; वृद्धा भत्ताको निवेदन</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <h1 className="main-title">वृद्धा भत्ताको निवेदन ।</h1>
        <h2 className="sub-title">(दफा ६ को उपदफा ३ सँग सम्बन्धित)</h2>
      </div>

      {/* --- Salutation & Date --- */}
      <div className="salutation-row">
        <div className="salutation-left">
          <p className="bold-text">श्री अध्यक्ष ज्यू,</p>
          <div className="input-group">
            <label htmlFor="municipality">नागार्जुन नगरपालिका</label>
            <span className="red">*</span>
            <input type="text" id="municipality" className="line-input medium-input" />
          </div>
        </div>
        <div className="salutation-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०५</span></p>
        </div>
      </div>
      <div className="ward-row">
        <div className="input-group">
            <label htmlFor="wardNo" style={{marginLeft: '200px'}}>वडा नं</label>
            <span className="red">*</span>
            <input type="text" id="wardNo" className="line-input small-input" />
        </div>
      </div>


      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text bold-text">नाम दर्ता सम्बन्धमा</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p>महोदय,</p>
        <p className="body-paragraph">
          उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम सहुँला बुझाउँला।
        </p>
      </div>

      {/* --- Target Group --- */}
      <div className="target-group-section">
        <label htmlFor="targetGroup">लक्षित समूह:</label>
        <select id="targetGroup" className="styled-select">
          <option>जेष्ठ नागरिक (दलित)</option>
          <option>जेष्ठ नागरिक (अन्य)</option>
          <option>एकल महिला</option>
          <option>विधवा</option>
          <option>पूर्ण अपाङ्गता</option>
          <option>अति अशक्त अपाङ्गता</option>
          <option>लोपोन्मुख आदिवासी/जनजाति</option>
          <option>बालबालिका</option>
        </select>
      </div>

      {/* --- Applicant Details Section --- */}
      <div className="applicant-section">
        <h3 className="section-title center-text">निवेदक</h3>
        <div className="applicant-grid">
          {/* Left Column */}
          <div className="grid-column">
            <div className="input-group">
              <label>नाम, थर: <span className="red">*</span></label>
              <input type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>बाबुको नाम: <span className="red">*</span></label>
              <input type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>ठेगाना: <span className="red">*</span></label>
              <input type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>ना.प्र.नं.: <span className="red">*</span></label>
              <input type="text" className="line-input full-width" />
            </div>
            <div className="input-group">
              <label>जारी जिल्ला: <span className="red">*</span></label>
              <input type="text" className="line-input full-width" />
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-column">
            <div className="input-group">
              <label>लिङ्ग: <span className="red">*</span></label>
              <select className="styled-select full-width">
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </select>
            </div>
            <div className="input-group">
              <label>आमाको नाम: <span className="red">*</span></label>
              <input type="text" className="line-input full-width" />
            </div>
            <div className="input-group pt-20">
              <label>जन्ममिति: <span className="bold-text">२०८२-०८-०५</span></label>
            </div>
            <div className="input-group">
              <label>जेष्ठ नागरिकको हकमा उमेर पुग्ने मिति:</label>
              <input type="text" className="line-input full-width" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default OldAgeAllowanceForm;