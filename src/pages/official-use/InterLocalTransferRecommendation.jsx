// 1
import React from 'react';
import './InterLocalTransferRecommendation.css';

const InterLocalTransferRecommendation = () => {
  return (
    <div className="inter-local-transfer-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अन्तर स्थानीय संस्थागत सरुवा सहमति ।
        <span className="top-right-bread">आर्थिक प्रबेश &gt; अन्तर स्थानीय संस्थागत सरुवा सहमति</span>
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
          <p>मिति : <span className="bold-text">२०८२-०८-११</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 7 बिहीबार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className subject-section>
        <p>विषय: <span className="underline-text">अन्तर स्थानीय सरुवा सहमति दिईएको सम्बन्धमा।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          श्री <input type="text" className="inline-box-input medium-input" required /> <span className="red">*</span> ले यस कार्यालयमा मिति <span className="bold-text">२०८२-०८-११</span> मा माथि स्वीकृति भई <span className="bold-text">सरुवा जाने स्थानीय तह</span> <input type="text" className="inline-box-input medium-input" required /> <span className="red">*</span> को पद <select className="inline-select"><option>छनौट गर्नुहोस्</option></select> <span className="red">*</span> को च.न. <input type="text" className="inline-box-input small-input" required /> <span className="red">*</span> मा प्राप्त भएको निवेदन अनुसार कर्मचारी <input type="text" className="inline-box-input medium-input" required /> <span className="red">*</span> को पदनाम प्र.पा. बमोजिम <input type="text" className="inline-box-input medium-input" required /> <span className="red">*</span> लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ ।
        </p>
      </div>

      {/* --- Details Section --- */}
      <div className="details-section">
        <h4 className="bold-text underline-text">देहाय</h4>
        <div className="details-grid">
            <div className="detail-col-left">
                <div className="detail-item">
                    <label>नाम थर:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="detail-item">
                    <label>पद/तह:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="detail-item">
                    <label>सेवा/समूह/उपसमूह:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="detail-item">
                    <label>नियुक्ति दिने स्थानीय तह:</label>
                    <input type="text" className="dotted-input full-width" defaultValue="नागार्जुन नगरपालिका, काठमाडौँ" />
                </div>
                 <div className="detail-item">
                    <label>सरुवा जाने स्थानीय तह:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                 <div className="detail-item">
                    <label>स्थायी ठेगाना:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
            </div>
            <div className="detail-col-right">
                <div className="detail-item">
                    <label>फोन नं:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="detail-item">
                    <label>जन्म मिति:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                 <div className="detail-item">
                    <label>ना.प्र.नं:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                 <div className="detail-item">
                    <label>जारी मिति:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
                <div className="detail-item">
                    <label>जारी जिल्ला:</label>
                    <input type="text" className="dotted-input full-width" />
                </div>
            </div>
        </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>प्रमुख प्रशासकीय अधिकृत</option>
             <option>वडा सचिव</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box (Nivedak Bibaran) --- */}
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

export default InterLocalTransferRecommendation;