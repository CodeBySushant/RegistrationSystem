// 10
import React from 'react';
import './ElectricityConnectionRecommendation.css';

const ElectricityConnectionRecommendation = () => {
  return (
    <div className="electricity-connection-container">
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

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p className="bold-text">श्री बुटवल पावर कम्पनी लिमिटेड</p>
        <div className="addressee-location">
          <input type="text" className="line-input medium-input" />
          <span>, काठमाडौँ</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">बिजुली जडान सिफारिस।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p>
          त्यहाँ विद्युत शक्ति सप्लाई गर्न आवेदन दिने <input type="text" className="inline-box-input long-box" defaultValue="नागार्जुन" /> वडा नं. <input type="text" className="inline-box-input tiny-box" defaultValue="१" /> बस्ने श्री <input type="text" className="inline-box-input long-box" /> तिन पुस्ते र घर जग्गाको निम्न बमोजिम भएकोले सो घरको विद्युत जडानको लागि सिफारिस गरिएको छ ।
        </p>

        <div className="family-details">
          <div className="detail-row">
            <label>पति/पिता को नाम, थर, वतन :</label>
            <input type="text" className="line-input long-input" />
            <span className="red">*</span>
          </div>
          <div className="detail-row">
            <label>ससुरा को नाम, थर, वतन :</label>
            <input type="text" className="line-input long-input" />
            <span className="red">*</span>
          </div>
        </div>

        <p className="section-title">घर रहेको जग्गाको विवरण :-</p>
        <p>
          साविक <select className="inline-select"><option></option></select> वडा नं. <input type="text" className="inline-box-input tiny-box" /> कि.नं. <input type="text" className="inline-box-input small-box" /> क्षेत्रफल <input type="text" className="inline-box-input small-box" />
        </p>

        <p className="section-title">घर रहेको जग्गाको विवरण :-</p>
        <p>
          घर रहेको टोल,वस्ती,गाउँ:- नागार्जुन नगरपालिका वडा नं. १ टोल <input type="text" className="line-input medium-input" />
        </p>

        <p className="section-title underline-text">जग्गाको चार किल्ला:</p>
        <div className="boundaries-section">
          <div className="boundary-row">
            <div className="boundary-item">
              <label>पूर्वमा:-</label>
              <input type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
            <div className="boundary-item">
              <label>पश्चिममा:-</label>
              <input type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
          </div>
          <div className="boundary-row">
            <div className="boundary-item">
              <label>उत्तरमा:-</label>
              <input type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
            <div className="boundary-item">
              <label>दक्षिणमा:-</label>
              <input type="text" className="line-input medium-input" />
              <span className="red">*</span>
            </div>
          </div>
        </div>

        <p className="section-title">घरको विवरण :</p>
        <p>
          लागि आवेदन घर <input type="text" className="inline-box-input medium-box" /> ले बनेको <input type="text" className="inline-box-input small-box" /> तले <input type="text" className="inline-box-input medium-box" /> को नाममा छ।
        </p>

        <p>विद्युत शक्ति दिन यस नगरपालिकालाई कुनै आपत्ति छैन।</p>
        <p>निजले आवेदन दिएको घरमा:</p>
        <ul className="declarations-list">
          <li>- पहिले विद्युत सप्लाई पिएन तथापि निजलाई नयाँ मीटर आवश्यक भएको हो।</li>
          <li>- विद्युत सप्लाई भएको हो छुट्टै मित्र भएकोले आवेदकलाई नयाँ मीटर दिन आवश्यक भएको हो।</li>
        </ul>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
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

export default ElectricityConnectionRecommendation;