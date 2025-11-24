import React from 'react';
import './RoadExcavationApprovalRecommendation.css';
// 5
const RoadExcavationApprovalRecommendation = () => {
  return (
    <div className="road-excavation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सडक खन्ने स्वीकृतिको सिफारिस ।
        <span className="top-right-bread">भौतिक निर्माण &gt; सडक खन्ने स्वीकृतिको सिफारिस</span>
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
        <p>विषय: <span className="underline-text">सडक खन्ने स्वीकृति ।</span></p>
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
           <span className="bold-text" style={{marginLeft: '20px'}}>वडा नं. १</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          तपाईंले यस वडा कार्यालयमा मिति २०८२-०८-०६ मा दिनु भएको निवेदन अनुसार निम्न बमोजिम स्थानको <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> सडक 
          खन्ने अनुमति दिईएको छ | लेखिए बमोजिमको शर्तहरु पालना गरी यो पत्र प्राप्त भएको मितिले <input type="text" className="inline-box-input small-box" required /> <span className="red">*</span> दिन भित्र कार्य सम्पन्न गर्नुहोला |
        </p>

        <div className="specific-details-grid">
            <div className="form-group-row">
                <label className="bold-text">खन्न स्वीकृति प्रदान गरेको सडक</label>
                <span className="red">*</span>
                <input type="text" className="dotted-input full-width" />
            </div>
            <div className="form-group-row">
                <label className="bold-text">सडक खन्न स्वीकृति प्रदान गरेको इकाइ</label>
                <span className="red">*</span>
                <input type="text" className="dotted-input medium-input" />
                <span>बर्ग मिटर</span>
            </div>
            <div className="form-group-row">
                <label className="bold-text">सडक खन्न स्वीकृति प्रदान धरौटी रकम रु.</label>
                <span className="red">*</span>
                <input type="text" className="dotted-input full-width" />
            </div>
        </div>
      </div>

      {/* --- Conditions (Shartaharu) --- */}
      <div className="conditions-section">
          <h4 className="bold-text">शर्तहरु :</h4>
          <ol className="conditions-list">
              <li>सडक खन्नु अघि खन्ने ठाउँको चारैतिर कमसेकम १०० मिटर टाढाबाट देखिने गरी १ मिटर अग्लो काठको बार लागाउनु पर्दछ र बारको चारैतिर रातो झण्डा राखी सवारी आगमन बाधा नपर्ने व्यवस्था मिलाउनु पर्नेछ |</li>
              <li>सडक खनेर निस्केको माटो, ढुङ्गा, बालुवा, आदि बाट सवारीको आगमनमा बाधा नपर्ने व्यस्था मिलाउनु पर्नेछ |</li>
              <li>काम समाप्त भएपछि पुरानै अवस्थामा हुने गरी मर्मत गर्नु पर्दछ|</li>
              <li>सम्बन्धित कार्यालयसंग सम्पर्क राखी लाइन पाएपछि मात्र काम सुरु गर्नु पर्नेछ|</li>
              <li>महत्वपूर्ण सडक खन्ने स्वीकृतिका हकमा सडक खन्न थालेको दिनमा काम समाप्त गर्नु पर्नेछ | कुनै कारणवश सोही दिनमा खम्पन्न गर्न नसकी रातभर यथावत राख्नुपर्ने भएमा सम्बन्धित कार्यालय /व्यक्तिले यस कार्यालयसंग सम्पर्क राखी ब्लिकिंग लाइट बाली राख्नु पर्नेछ|</li>
              <li>सडक खन्दा सडक भित्र भूमिगत अबस्थामा रहेको खानेपानी, बिधुत, टेलिफोन आदिसँग सम्बन्धित लाइन टुटफुट हुन गएमा सोको मर्मत गर्ने जिम्मेवारी पनि स्वीकृति लिन खनेका व्यक्ति / संस्थाको नै हुनेछ|</li>
              <li>पिच सडक खन्ने काम रातको १० बजेदेखि बिहान ५ बजे सक्नु पर्नेछ |</li>
              <li>उक्त कार्य पानी नपरेको दिन गर्नु पर्नेछ |</li>
              <li>पाइप बिछ्याउनु पर्ने अबस्थामा सडकभन्दा कम्तीमा १ फिट ६ इन्च तलबाट पाइप बिछ्यानु पर्नेछ</li>
              <li>सडक खन्ने ठाउँमा पुनः निर्माण गरी पूर्ववत आवस्थामा पुर्याउने जिम्मा सम्बन्धित व्यक्ति वा संस्थाको नै हुने छ |</li>
              <li>तोकिए बमोजिम धरौटी रकम सम्बन्धमा प्राबिधिक प्रतिवेदन प्राप्त भए पश्चात फिर्ता गरीने छ |</li>
              <li>कार्य प्रयोजन समाप्त भएको मितिले ठीक एक वर्षपछि धरौटी रकम फिर्ता हुने छैन |</li>
          </ol>
      </div>

      {/* --- Applicant Former Address --- */}
      <div className="former-address-section">
          <label className="bold-text">निवेदकको साविकको ठेगाना</label>
          <div className="address-input-wrapper">
             <input type="text" className="dotted-input full-width" />
             <span className="dropdown-arrow">▼</span>
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

      {/* --- Bodartha (CC) Section --- */}
      <div className="bodartha-section">
          <h4 className="bold-text">बोधार्थ</h4>
          <div className="bodartha-item">
              <p className="bold-text">१. श्री प्राबिधिक शाखा :</p>
              <p>माथि उल्लेखित शर्तहरु पालना भए नभएको अनुगमन गरी प्रतिवेदन पेश गर्नु हुन |</p>
          </div>
          <div className="bodartha-item">
              <p className="bold-text">२. श्री ट्राफिक प्रहरी कार्यालय :</p>
              <p>सवारी साधनको सहजताको लागि अनुरोध छ |</p>
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

export default RoadExcavationApprovalRecommendation;