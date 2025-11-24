import React from 'react';
import './ElectricityInstallation.css';
// 3
const ElectricityInstallation = () => {
  return (
    <div className="electricity-application-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        बिजुली जडान सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; बिजुली जडान सिफारिस</span>
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

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p className="bold-text">श्री बुटवल पावर कम्पनी लिमिटेड</p>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" />
           <span className="bold-text">, काठमाडौँ</span>
        </div>
      </div>

      {/* --- Main Body Paragraph --- */}
      <div className="form-body">
        <p className="body-paragraph">
          त्यहाँ विद्युत शक्ति सप्लाई गर्ने आवेदन दिने <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन" /> 
          <input type="text" className="inline-box-input medium-box" defaultValue="नगरपालिका" /> 
          वडा नं. <input type="text" className="inline-box-input tiny-box" defaultValue="१" /> बस्ने 
          <select className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
          </select>
          <input type="text" className="inline-box-input long-box" required /> तिन पुस्ते र घर जग्गाको निम्न बमोजिम भएकोले सो घरको विद्युत जडानको लागि सिफारिस गरिएको छ ।
        </p>
      </div>

      {/* --- Family Details --- */}
      <div className="family-details-section">
          <div className="form-row">
              <select className="inline-select">
                  <option>पति</option>
                  <option>पिता</option>
              </select>
              <label>को नाम, थर, वतन :-</label>
              <input type="text" className="dotted-input medium-input" required />
              <span className="red">*</span>
              <span>,</span>
              <input type="text" className="dotted-input medium-input" required />
              <span className="red">*</span>
              <span>,</span>
          </div>
          <div className="form-row">
              <select className="inline-select">
                  <option>ससुरा</option>
                  <option>बाजे</option>
              </select>
              <label>को नाम, थर, वतन :-</label>
              <input type="text" className="dotted-input medium-input" required />
              <span className="red">*</span>
              <span>,</span>
              <input type="text" className="dotted-input medium-input" required />
              <span className="red">*</span>
          </div>
      </div>

      {/* --- Property Details --- */}
      <div className="property-details-section mt-20">
          <p className="section-label">घर रहेको जग्गाको विवरण :-</p>
          <div className="form-row">
              <label>साविक</label>
              <select className="inline-select medium-select">
                  <option></option>
                  <option>गा.वि.स.</option>
                  <option>नगरपालिका</option>
              </select>
              <span className="red">*</span>
              <input type="text" className="dotted-input medium-input" />
              <label>वडा नं.</label>
              <span className="red">*</span>
              <input type="text" className="dotted-input tiny-input" />
              <label>कि.नं.</label>
              <span className="red">*</span>
              <input type="text" className="dotted-input small-input" />
              <label>क्षेत्रफल</label>
              <span className="red">*</span>
              <input type="text" className="dotted-input medium-input" />
          </div>
      </div>

      {/* --- Current Address --- */}
      <div className="current-address-section mt-20">
          <p className="section-label">घर रहेको जग्गाको विवरण :-</p>
          <div className="form-row">
              <label>घर रहेको टोल,बस्ती,गाउँ:-</label>
              <span className="bg-gray-text">नागार्जुन</span>
              <input type="text" className="dotted-input medium-input" />
              <span className="bg-gray-text">नागार्जुन</span>
              <input type="text" className="dotted-input medium-input" />
              <span className="bg-gray-text">वडा नं. १</span>
              <label>टोल</label>
              <input type="text" className="dotted-input medium-input" />
          </div>
      </div>

      {/* --- Four Boundaries (Char Killa) --- */}
      <div className="killa-section mt-20">
          <p className="section-label underline-text">जग्गाको चार किल्ला:-</p>
          <div className="killa-grid">
              <div className="killa-item">
                  <label>पूर्वमा:-</label>
                  <span className="red">*</span>
                  <input type="text" className="dotted-input full-killa-input" />
              </div>
              <div className="killa-item">
                  <label>पश्चिममा:-</label>
                  <span className="red">*</span>
                  <input type="text" className="dotted-input full-killa-input" />
              </div>
              <div className="killa-item">
                  <label>उत्तरमा:-</label>
                  <span className="red">*</span>
                  <input type="text" className="dotted-input full-killa-input" />
              </div>
              <div className="killa-item">
                  <label>दक्षिणमा:-</label>
                  <span className="red">*</span>
                  <input type="text" className="dotted-input full-killa-input" />
              </div>
          </div>
      </div>

      {/* --- House Description --- */}
      <div className="house-desc-section mt-20">
          <div className="form-body">
            <p className="body-paragraph">
              घरको विवरण : <input type="text" className="dotted-input medium-input" /> <span className="red">*</span> ले बनेको 
              <input type="text" className="dotted-input small-input" /> <span className="red">*</span> तल्ले 
              <input type="text" className="dotted-input small-input" /> <span className="red">*</span> घर -१ निजले विद्युत सप्लाईको लागि आवेदन घर 
              <input type="text" className="dotted-input medium-input" /> <span className="red">*</span> को नाममा छ।
            </p>
          </div>
      </div>

      {/* --- Declarations --- */}
      <div className="declarations-section mt-10">
          <p>विद्युत शक्ति दिन यस नगरपालिकालाई कुनै आपत्ति छैन।</p>
          <p className="underline-text">निजले आवेदन दिएको घरमा :</p>
          <ul className="dashed-list">
              <li>- पहिले विद्युत सप्लाई थिएन तसर्थ निजलाई नयाँ मीटर आवश्यक भएको हो।</li>
              <li>- विद्युत सप्लाई भएको हो छुट्टै भित्र भएकोले आवेदकलाई नयाँ मीटर दिन आवश्यक भएको हो।</li>
          </ul>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
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

export default ElectricityInstallation;