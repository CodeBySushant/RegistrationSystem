// 7
import React from 'react';
import './NewBirthVerification.css';

const NewBirthVerification = () => {
  return (
    <div className="birth-verification-english-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जन्ममिति प्रमाणित ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; जन्म मिति प्रमाणित</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name-np">नागार्जुन नगरपालिका</h1>
          <h2 className="municipality-name-en">Nagarjun Municipality</h2>
          <h3 className="ward-title-np">१ नं वडा कार्यालय <span className="ward-title-en">(1 No. Ward Office)</span></h3>
          <p className="address-text-np">काठमाडौँ जिल्ला <span className="address-text-en">(Kathmandu District)</span></p>
          <p className="province-text-np">बागमती प्रदेश <span className="province-text-en">(Bagmati Province)</span></p>
          <p className="country-text">नेपाल (Nepal)</p>
        </div>
      </div>

      {/* --- Letter/Ref Info --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>Letter No. : <span className="bold-text">2082/83</span></p>
          <p>Ref No.: <input type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>Date : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Main Title --- */}
      <div className="main-form-title">
        <h3>जन्म प्रमाणीकरण (Birth Verification)</h3>
      </div>

      {/* --- Introductory Paragraph --- */}
      <div className="intro-paragraph">
        <p>
          श्री <input type="text" className="line-input medium-input" /> ले दिएको निवेदन अनुसार श्री 
          <select className="inline-select"><option>Mr.</option><option>Mrs.</option></select>
          <input type="text" className="line-input medium-input" /> को देहाय बमोजिम जन्मको विवरण रहेको प्रमाणित गरिन्छ।
        </p>
        <p className="en-text">
          (According to the application given by 
          <select className="inline-select"><option>Mr.</option><option>Mrs.</option></select>
          <input type="text" className="line-input medium-input" />, it is verified that the birth of 
          <select className="inline-select"><option>Mr.</option><option>Mrs.</option></select>
          <input type="text" className="line-input medium-input" /> are as follows.)
        </p>
      </div>

      {/* --- Form Table --- */}
      <div className="form-table-container">
        <table className="verification-table">
          <tbody>
            {/* Full Name */}
            <tr>
              <td className="label-cell">पूरा नाम:</td>
              <td className="input-cell">
                <input type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="label-cell en-label">Full Name:</td>
              <td className="input-cell">
                <input type="text" className="table-input" />
              </td>
            </tr>

            {/* Date of Birth */}
            <tr>
              <td className="label-cell">जन्म मिति/Date of Birth:</td>
              <td className="input-cell flex-cell">
                <span>2082-08-06</span>
                <span className="bold-text">(B.S.) /</span>
                <input type="text" className="table-input medium-input" />
                <span className="bold-text">(A.D.)</span>
              </td>
            </tr>

            {/* Sex */}
            <tr>
              <td className="label-cell">लिङ्ग/Sex:</td>
              <td className="input-cell">
                <select className="table-select">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </td>
            </tr>

            {/* Permanent Address (Nepali) */}
            <tr>
              <td className="label-cell">स्थायी ठेगाना :</td>
              <td className="input-cell address-grid">
                <select className="table-select"><option>कोशी प्रदेश</option></select>
                <select className="table-select"><option>ताप्लेजुङ</option></select>
                <input type="text" className="table-input" placeholder="पालिका" />
                <input type="text" className="table-input" placeholder="वडा" />
              </td>
            </tr>

            {/* Permanent Address (English) */}
            <tr>
              <td className="label-cell en-label">Permanent Address:</td>
              <td className="input-cell address-grid">
                <select className="table-select"><option>Koshi Province</option></select>
                <select className="table-select"><option>Taplejung</option></select>
                <input type="text" className="table-input" placeholder="Palika" />
                <input type="text" className="table-input" placeholder="WardNo" />
              </td>
            </tr>

            {/* Birth Place (Nepali) */}
            <tr>
              <td className="label-cell">जन्म स्थान:</td>
              <td className="input-cell address-grid-5">
                <select className="table-select"><option>कोशी प्रदेश</option></select>
                <select className="table-select"><option>ताप्लेजुङ</option></select>
                <input type="text" className="table-input" placeholder="पालिका" />
                <input type="text" className="table-input" placeholder="वडा" />
                <input type="text" className="table-input" placeholder="ठाउँको नाम" />
              </td>
            </tr>

            {/* Birth Place (English) */}
            <tr>
              <td className="label-cell en-label">Birth Place:</td>
              <td className="input-cell address-grid-5">
                <select className="table-select"><option>Koshi Province</option></select>
                <select className="table-select"><option>Taplejung</option></select>
                <input type="text" className="table-input" placeholder="Palika" />
                <input type="text" className="table-input" placeholder="Ward No" />
                <input type="text" className="table-input" placeholder="Place Name" />
              </td>
            </tr>

            {/* Father's Details */}
            <tr>
              <td rowSpan="3" className="label-cell bg-gray section-header">बाबुको विवरण (Father's Details)</td>
              <td className="input-cell flex-row">
                <span className="sub-label">पूरा नाम:</span>
                <input type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label en-label">Full Name:</span>
                <input type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label">परिचय पत्र(Document):</span>
                <select className="table-select medium-select"><option>Select Document Type</option></select>
                <input type="text" className="table-input" />
              </td>
            </tr>

            {/* Mother's Details */}
            <tr>
              <td rowSpan="3" className="label-cell bg-gray section-header">आमाको विवरण(Mother's Details)</td>
              <td className="input-cell flex-row">
                <span className="sub-label">पूरा नाम:</span>
                <input type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label en-label">Full Name:</span>
                <input type="text" className="table-input" />
              </td>
            </tr>
            <tr>
              <td className="input-cell flex-row">
                <span className="sub-label">परिचय पत्र(Document):</span>
                <select className="table-select medium-select"><option>Select Document Type</option></select>
                <input type="text" className="table-input" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-dots">....................................</div>
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
          </select>
          <input type="text" className="line-input full-width-input" />
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

export default NewBirthVerification;