// 8
import React from 'react';
import './DrinkingWaterCommitteeRegistration.css';

const DrinkingWaterCommitteeRegistration = () => {
  return (
    <div className="drinking-water-certificate-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र
        <span className="top-right-bread">प्रमाण पत्र &gt; खानेपानी उपभोक्ता संस्था</span>
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
          <p>दर्ता नं. : <span className="bold-text">१/२०८२/८३</span></p>
        </div>
        <div className="meta-right">
          <p>दर्ता मिति : <span className="bold-text">२०८२-०८-०६</span></p>
        </div>
      </div>

      {/* --- Certificate Title --- */}
      <div className="certificate-title-section">
        <h3 className="color-purple bold-text">खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र</h3>
      </div>

      {/* --- Receiver Details --- */}
      <div className="receiver-details">
          <div className="receiver-row">
              <label>श्री</label>
              <input type="text" className="line-input long-input" required />
              <span className="red">*</span>
              <span>उपभोक्ता समिति</span>
          </div>
          <div className="receiver-row">
               <input type="text" className="line-input medium-input" required />
               <span className="red">*</span>
               <span>, काठमाडौँ</span>
          </div>
      </div>

      {/* --- Certificate Title (Underlined) --- */}
      <div className="certificate-title-section mt-20">
        <h3 className="underline-text">खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र</h3>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> उपभोक्ता समिति, 
          <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> , काठमाडौँ लाई <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span>
          जलस्रोत नियमावली, २०५७ को नियम ५ को उपनियम (१) बमोजिम २०८१ साल जेठ महिना २८ गते <input type="text" className="inline-box-input small-box" /> <span className="red">*</span> नियमावली , २०५७ बमोजिम आफ्नो कार्य सन्चालन गर्ने गराउने गरी देहाय बमोजिम उपायको लागी यस कार्यालयमा दर्ता गरी यो प्रमाण पत्र प्रदान गरिएको छ
        </p>

        <div className="details-section">
            <h4 className="bold-text">उपयोग गरिने जलस्रोत विवरण</h4>
            
            <div className="detail-row">
                <label>(भ) जलस्रोतको नाम(चार किल्ला सहित) भएको ठाउँ :</label>
                <input type="text" className="line-input long-input" required /> <span className="red">*</span>
                <label>(पूर्व:</label>
                <input type="text" className="line-input medium-input" required /> <span className="red">*</span>
                <label>, उत्तर:</label>
                <input type="text" className="line-input medium-input" required /> <span className="red">*</span>
            </div>
             <div className="detail-row">
                <label style={{marginLeft: '250px'}}>, पश्चिम:</label>
                <input type="text" className="line-input medium-input" required /> <span className="red">*</span>
                <label>, दक्षिण:</label>
                <input type="text" className="line-input medium-input" required /> <span className="red">*</span>
                <span>)</span>
            </div>

             <div className="detail-row mt-10">
                <label>(म) जलस्रोतबाट गरिने प्रयोग:</label>
                <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            </div>
             <div className="detail-row">
                <label>(य) उपभोक्ता संस्थाले उपयोग गर्न चाहेको जलस्रोतको परिणाम:</label>
                <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            </div>

            <h4 className="bold-text mt-20">उपभोक्ता संस्थाले पुर्याउन चाहेको सेवा सम्बनधी विवरण:</h4>
             <div className="detail-row">
                <label>(व) सेवाको किसिम :</label>
                <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            </div>
            <div className="detail-row">
                <label>(श) सेवा पुर्याउने क्षेत्र:</label>
                <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            </div>
             <div className="detail-row">
                <label>(ष) सेवाबाट लाभान्वित हुने उपभोक्ता घरधुरी ५५ जनसंख्या ३५५</label>
                <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            </div>
             <div className="detail-row">
                <label>(स) भविष्यमा सेवा विस्तार गर्न सकिने सम्भावना</label>
                <input type="text" className="line-input medium-input" /> <span className="red">*</span>
            </div>
        </div>
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

export default DrinkingWaterCommitteeRegistration;