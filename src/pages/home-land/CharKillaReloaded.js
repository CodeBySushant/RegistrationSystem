// 10
import React from 'react';
import './CharKillaReloaded.css';

const CharKillaReloaded = () => {
  return (
    <div className="char-killa-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        चार किल्ला खुलाई सिफारिस गरिएको(२)।
        <span className="top-right-bread">घर / जग्गा जमिन &gt; चार किल्ला खुलाई सिफारिस</span>
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
        <p>विषय: <span className="underline-text">चार किल्ला खुलाई सिफारिस सम्वन्धमा</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
          <span className="red">*</span>
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
           <span className="red">*</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा सम्बन्धित ज.ध. श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> ले आफ्नो नाममा मालपोत कार्यालय <span className="underline-text">काठमाडौँ / कलंकीमा</span> <input type="text" className="inline-box-input medium-box" /> दर्ता प्रमाणित रही आफ्नै हक भोग रहेको तपसिलमा उल्लेखित जग्गाको चार किल्ला खुलाई सिफारिस माग गर्नु भएकोमा सो सम्बन्धी बुझ्दा व्यहोरा मनासिब देखिएकोले निम्न 
          <select className="inline-select">
              <option>घर / जग्गाको</option>
              <option>जग्गाको</option>
              <option>घरको</option>
          </select>
          निम्न अनुसार किल्ला रहेको हुँदा माग निवेदन अनुसार चार किल्ला खुलाई सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <h4 className="table-title">तपसिल</h4>
          <div className="table-header-label">जग्गाको विवरण:</div>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>सि.नं.</th>
                        <th style={{width: '15%'}}>साविक</th>
                        <th style={{width: '8%'}}>वडा नं.</th>
                        <th style={{width: '15%'}}>सिट नं.</th>
                        <th style={{width: '15%'}}>कित्ता नं.</th>
                        <th style={{width: '15%'}}>क्षेत्रफल</th>
                        <th style={{width: '27%'}}>पूर्व कि.नं</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td>
                            <select className="table-select">
                                <option>गा.वि.स.</option>
                                <option>न.पा.</option>
                            </select>
                        </td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
          {/* Fake scrollbar */}
          <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
          </div>
      </div>

      {/* --- Declaration Section --- */}
      <div className="declaration-section">
          <p className="body-paragraph">
            यसमा उल्लेखित चारकिल्ला प्रमाणित म आफैं वा मेरो 
            <select className="inline-select">
                <option>वारेश</option>
                <option>स्वयं</option>
            </select>
            मार्फत न.पा. वडा कार्यालयमा उपस्थित भई दिएको छु । यसको आधिकारिकताको जिम्मेवारी जध म आफैं भएको व्यहोरा ठिक साँचो हो फरक ठहरे प्रचलित कानून बमोजिम सहुँला बुझाउँला भनी सहीछाप गर्ने ज.ध.वा निजको 
            <select className="inline-select">
                <option>वारेश</option>
                <option>हकवाला</option>
            </select>
            श्री <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> दस्तखत.................................
          </p>
          <textarea className="full-width-textarea" rows="3"></textarea>
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

export default CharKillaReloaded;