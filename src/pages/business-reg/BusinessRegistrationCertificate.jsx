// 2
import React from "react";
import "./BusinessRegistrationCertificate.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const BusinessRegistrationCertificate = () => {
  return (
    <div className="business-certificate-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        व्यवसाय / उद्योग दर्ता
        <span className="top-right-bread">
          व्यवसाय &gt; व्यवसाय / उद्योग दर्ता
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
          <p className="copy-text">प्रतिलिपि □</p>
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          <h3 className="certificate-title red-text">
            व्यवसाय दर्ता प्रमाण पत्र
          </h3>
        </div>
        <div className="photo-box-container">
          <div className="photo-box"></div>
        </div>
      </div>

      {/* --- Registration Info --- */}
      <div className="reg-info-row">
        <div className="left-info">
          <label>दर्ता नं :</label>
          <span className="red-text bold-text">७/२०८०/८१</span>
          <div className="line-break"></div>
          <label>आ.व :</label>
          <select className="inline-select bold-text">
            <option>2082/83</option>
          </select>
        </div>
        <div className="right-info">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
        </div>
      </div>

      {/* --- Main Form Body --- */}
      <div className="form-body">
        <p className="section-title">(क) व्यवसाय व्यवसायीको विवरण :-</p>

        <div className="form-group-row">
          <label>
            १.पूरा नाम, थर: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>
            २.नागरिकता नं : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            जारी मिति : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            जिल्ला : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <div className="form-group-row">
          <label>
            ३.गाउँपालिका/नगरपालिका: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            वडा नं : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input tiny-input" />
          <label>
            टोल: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            जिल्ला: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <div className="form-group-row">
          <label>
            ४.बाबुको नाम, थर: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>
            ५.पति/पत्नीको नाम, थर: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
          <span className="small-text">बाबुको नाम उल्लेख नभएको भए मात्र</span>
        </div>

        <div className="form-group-row">
          <label>
            ६.व्यवसायको नाम: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            व्यवसायको किसिम: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <div className="form-group-row">
          <label>
            ख.व्यवसायको विवरण/प्रकृति : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>
            ग. व्यवसाय रहेको बाटोको नाम <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <p className="section-title">१.व्यवसायको ठेगाना</p>
        <div className="form-group-row">
          <input type="text" className="dotted-input medium-input" />{" "}
          <span className="red">*</span>
          <label>जिल्ला,</label>
          <input type="text" className="dotted-input medium-input" />{" "}
          <span className="red">*</span>
          <label>गाउँपालिका/नगरपालिका</label>
          <label>वडा नं</label>{" "}
          <input type="text" className="dotted-input tiny-input" />{" "}
          <span className="red">*</span>
          <label>टोल:</label>
          <input type="text" className="dotted-input medium-input" />
        </div>
        <div className="form-group-row">
          <label>फोन नं.:</label>{" "}
          <input type="text" className="dotted-input medium-input" />{" "}
          <span className="red">*</span>
          <label>
            मोबाइल नं. <span className="red">*</span>
          </label>{" "}
          <input type="text" className="dotted-input medium-input" />
          <label>
            इमेल: <span className="red">*</span>
          </label>{" "}
          <input type="text" className="dotted-input medium-input" />
        </div>

        <div className="form-group-row">
          <label>
            पान/ भ्याट नं. : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            वेबसाईट : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <div className="form-group-row">
          <label>
            २.उद्देश्य : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>
            अन्यत्र दर्ता भएको भए: दर्ता नं : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            कार्यालय : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <p className="section-title">ग.बहालमा बसेको भए</p>
        <div className="form-group-row">
          <label>
            १.घरधनीको नाम, थर: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            ना.प्र.नं. <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            जारी मिति <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>जारी जिल्ला:</label>
        </div>
        <div className="form-group-row">
          <label>
            <span className="red">*</span> ठेगाना:{" "}
            <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            जिल्ला: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            नगरपालिका: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <span className="red">*</span>
        </div>
        <div className="form-group-row">
          <label>
            वडा नं.: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input tiny-input" />
          <label>
            टोल: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            फोन नं.: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <p className="section-title">२. पूँजी:</p>
        <p>कम्पनीको हकमा</p>
        <div className="capital-grid">
          <div className="capital-row">
            <label>
              अधिकृत पूँजी: <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              चालु पूँजी: <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              जारी पूँजी: <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              स्थिर पूँजी: <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              चुक्ता पूँजी: <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              कुल पूँजी <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
        </div>

        <div className="kaifiyat-section">
          <label>कैफियत</label>
          <textarea className="kaifiyat-box" rows="3"></textarea>
        </div>

        <div className="declaration-section">
          <p className="bold-text underline-text">व्यवसायीको छाप</p>
          <p>
            माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला
            बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा
            चढाएको छु ।
          </p>
          <p>................................................</p>
          <p className="bold-text">निवेदकको दस्तखत</p>
        </div>
      </div>

      {/* --- Old Industry Registration Photo --- */}
      <div className="old-photo-section">
        <label className="red-text bold-text">पुरानो उद्योग दर्ता फोटो</label>
        <div className="file-input-wrapper">
          <input type="file" />
          <span>No file chosen</span>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" id="closeIndustry" />
          <label htmlFor="closeIndustry" className="red-text">
            व्यवसाय बन्द
          </label>
        </div>
      </div>

      {/* --- Signature Section (Right Aligned) --- */}
      <div className="signature-list-section">
        <p className="bold-text">प्रमाण गर्ने व्यक्तिको नाम</p>
        {/* Signature inputs usually go here, but image is cut off or blank here */}
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
        <button className="save-print-btn">
          रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default BusinessRegistrationCertificate;
