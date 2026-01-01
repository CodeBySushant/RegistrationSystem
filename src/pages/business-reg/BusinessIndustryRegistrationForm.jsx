// 1
import React, { useState } from "react";
import "./BusinessIndustryRegistrationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const BusinessIndustryRegistrationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrint = async () => {
    const success = await handleSubmit();
    if (success) {
      window.print();
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        applicant_name: formData.applicantName,
        applicant_address: formData.applicantAddress,
        applicant_citizenship: formData.applicantCitizenship,
        applicant_phone: formData.applicantPhone,
        ward_no: user?.ward,
        municipality: MUNICIPALITY.name,
      };

      const res = await axiosInstance.post(
        "/api/forms/business-industry-registration-form",
        payload
      );

      console.log("API RESPONSE:", res.data);

      if (res.status === 200) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो");
        return true;
      }

      throw new Error("Insert failed");
    } catch (err) {
      console.error("Save failed:", err);
      alert("सेभ गर्दा समस्या आयो");
      return false;
    }
  };

  return (
    <div className="business-registration-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        व्यवसाय/उद्योग दर्ता
        <span className="top-right-bread">
          व्यापार / व्यवसाय &gt; व्यवसाय/उद्योग दर्ता
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
          <p className="red-text tiny-text center-text">प्रतिलिपि </p>
        </div>
        <div className="header-text">
          <h1 className="municipality-name red-text">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title red-text">
            वडा नं. {user?.ward?.toString()} वडा कार्यालय
          </h2>
          <p className="address-text red-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text red-text">{MUNICIPALITY.provinceLine}</p>

          <h3 className="certificate-title red-text underline-text">
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
          <input type="text" className="dotted-input small-input" />
        </div>
        <div className="right-info">
          <p>
            मिति : <span className="bold-text">{new Date().toISOString().slice(0, 10)}</span>
          </p>
        </div>
      </div>

      {/* --- Main Form Body --- */}
      <div className="form-body">
        <p>(क) व्यवसाय व्यवसायीको विवरण :-</p>

        <div className="form-group-row">
          <label>
            १. पूरा नाम, थर : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>२.नागरिकता नं :</label>
          <input type="text" className="dotted-input medium-input" />
          <label>जारी मिति : २०८२-०८-०६</label>
          <label style={{ marginLeft: "20px" }}>जिल्ला : काठमाडौँ</label>
        </div>

        <div className="form-group-row">
          <label>३. गाउँपालिका/नगरपालिका : {MUNICIPALITY.name}</label>
          <label style={{ marginLeft: "20px" }}>वडा नं : १</label>
          <label style={{ marginLeft: "20px" }}>
            टोल : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label style={{ marginLeft: "20px" }}>
            जिल्ला : {MUNICIPALITY.city}
          </label>
        </div>

        <div className="form-group-row">
          <label>४. बाबुको नाम, थर :</label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>
            ५. पति/पत्नीको नाम ,थर : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <span className="small-text">(बाबुको नाम उल्लेख नभएको भए मात्र)</span>
        </div>

        <div className="form-group-row">
          <label>
            ६. व्यवसायको नाम : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            व्यवसायको किसिम : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
        </div>

        <div className="form-group-row">
          <label>
            ख. व्यवसायको किसिम/प्रकृति : <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <div className="form-group-row">
          <label>
            ग. व्यवसाय रहेको बाटोको नाम <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input long-input" />
        </div>

        <p>१. व्यवसायको ठेगाना</p>
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
          <input type="text" className="dotted-input medium-input" />{" "}
          <span className="red">*</span>
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
            २. उद्देश्य : <span className="red">*</span>
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

        <p>ग. बहालमा बसेको भए</p>
        <div className="form-group-row">
          <label>
            १. घरधनीको नाम, थर: <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            ना.प्र.नं <span className="red">*</span>
          </label>
          <input type="text" className="dotted-input medium-input" />
          <label>
            जारी मिति: <span className="red">*</span>
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

        <p>२. पूँजी:</p>
        <p>कम्पनीको हकमा</p>
        <div className="capital-grid">
          <div className="capital-row">
            <label>
              अधिकृत पूँजी : <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              चालू पूँजी : <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              जारी पूँजी : <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              स्थिर पूँजी : <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              चुक्ता पूँजी : <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
          <div className="capital-row">
            <label>
              कुल पूँजी : <span className="red">*</span>
            </label>
            <input type="text" className="dotted-input medium-input" />
          </div>
        </div>

        <div className="kaifiyat-section">
          <label>कैफियत</label>
          <textarea className="kaifiyat-box" rows="3"></textarea>
        </div>

        <div className="declaration-section">
          <p>................................................</p>
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

      <div className="designation-section">
        <input type="text" disabled />
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">पद छनौट गर्नुहोस्</option>
          <option value="Secretary">सचिव</option>
          <option value="Chairperson">अध्यक्ष</option>
          <option value="Acting Chairperson">का.वा अध्यक्ष</option>
        </select>
      </div>

      {/* Applicants details */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>
              निवेदकको नाम<span className="required">*</span>
            </label>
            <input
              name="applicantName"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicantName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="detail-group">
            <label>
              निवेदकको ठेगाना<span className="required">*</span>
            </label>
            <input
              name="applicantAddress"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicantAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="detail-group">
            <label>
              निवेदकको नागरिकता नं.<span className="required">*</span>
            </label>
            <input
              name="applicantCitizenship"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicantCitizenship}
              onChange={handleChange}
              required
            />
          </div>

          <div className="detail-group">
            <label>
              निवेदकको फोन नं.<span className="required">*</span>
            </label>
            <input
              name="applicantPhone"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicantPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button type="button" className="save-print-btn" onClick={handlePrint}>
          रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default BusinessIndustryRegistrationForm;
