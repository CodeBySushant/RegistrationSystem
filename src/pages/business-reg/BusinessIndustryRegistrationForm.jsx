// 1
import React, { useState, useEffect } from "react";
import "./BusinessIndustryRegistrationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const BusinessIndustryRegistrationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    // header
    registration_no: "",
    certificate_date: new Date().toISOString().slice(0, 10),
    copy_flag: "प्रतिलिपि",

    // proprietor
    full_name: "",
    citizenship_no: "",
    citizenship_issue_date: "",
    citizenship_issue_district: "",

    // residence
    municipality: MUNICIPALITY.name,
    ward_no: "",
    tole: "",
    residence_district: MUNICIPALITY.city,

    // family
    father_name: "",
    spouse_name: "",

    // business
    business_name: "",
    business_kind: "",
    business_nature: "",
    business_road: "",

    // business address
    business_address_line: "",
    business_address_district: "",
    business_address_ward: "",
    business_address_tole: "",

    // missing but required by SQL
    declaration_text: "",
    issuing_signature: "",
    issuing_seal: "",

    // contact
    phone: "",
    mobile: "",
    email: "",

    // tax
    pan_vat: "",
    website: "",

    // objective
    objective: "",
    other_registration_no: "",
    other_registration_office: "",

    // landlord (if leased)
    landlord_name: "",
    landlord_cit_no: "",
    landlord_issue_date: "",
    landlord_issue_district: "",
    landlord_address: "",
    landlord_district: "",
    landlord_municipality: "",
    landlord_ward: "",
    landlord_tole: "",
    landlord_phone: "",

    // capital
    authorized_capital: "",
    current_capital: "",
    issued_capital: "",
    fixed_capital: "",
    paidup_capital: "",
    total_capital: "",

    // remarks
    kaifiyat: "",

    // issuing authority
    issuing_name: "",
    issuing_post: "",
    issuing_date: new Date().toISOString().slice(0, 10),

    // applicant
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: "",
  });

  useEffect(() => {
    if (user?.ward) {
      setFormData((prev) => ({
        ...prev,
        ward_no: user.ward,
      }));
    }
  }, [user]);

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
        ...formData,
        authorized_capital: Number(formData.authorized_capital) || null,
        current_capital: Number(formData.current_capital) || null,
        issued_capital: Number(formData.issued_capital) || null,
        fixed_capital: Number(formData.fixed_capital) || null,
        paidup_capital: Number(formData.paidup_capital) || null,
        total_capital: Number(formData.total_capital) || null,
        ward_no: user?.ward,
        municipality: MUNICIPALITY.name,
      };

      const response = await axiosInstance.post(
        "/api/forms/business-industry-registration-form",
        payload
      );

      console.log("API RESPONSE:", response.data);
      alert("रेकर्ड सफलतापूर्वक सेभ भयो");
      return true;
    } catch (err) {
      console.error("🔥 AXIOS ERROR:", err);

      if (err.response) {
        console.error("🔥 BACKEND ERROR:", err.response.data);
        alert(err.response.data?.message || "सेभ गर्दा समस्या आयो");
      } else {
        alert("सर्भरमा जडान हुन सकेन");
      }

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
          <input
            type="text"
            name="registration_no"
            value={formData.registration_no}
            onChange={handleChange}
            className="dotted-input small-input"
          />
        </div>
        <div className="right-info">
          <p>
            मिति :{" "}
            <span className="bold-text">
              {new Date().toISOString().slice(0, 10)}
            </span>
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
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="dotted-input"
          />
        </div>

        <div className="form-group-row">
          <label>२.नागरिकता नं :</label>
          <input
            type="text"
            name="citizenship_no"
            value={formData.citizenship_no}
            onChange={handleChange}
          />
          <label>जारी मिति :</label>
          <input
            type="text"
            name="citizenship_issue_date"
            value={formData.citizenship_issue_date}
            onChange={handleChange}
            className="dotted-input medium-input"
          />

          <label>जिल्ला :</label>
          <input
            type="text"
            name="citizenship_issue_district"
            value={formData.citizenship_issue_district}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>

        <div className="form-group-row">
          <label>३. गाउँपालिका/नगरपालिका : {MUNICIPALITY.name}</label>
          <label style={{ marginLeft: "20px" }}>
            वडा नं : {user?.ward?.toString() || ""}
          </label>
          <label style={{ marginLeft: "20px" }}>
            टोल : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="tole"
            value={formData.tole}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label style={{ marginLeft: "20px" }}>
            जिल्ला : {MUNICIPALITY.city}
          </label>
        </div>

        <div className="form-group-row">
          <label>४. बाबुको नाम, थर :</label>
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-row">
          <label>
            ५. पति/पत्नीको नाम ,थर : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="spouse_name"
            value={formData.spouse_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <span className="small-text">(बाबुको नाम उल्लेख नभएको भए मात्र)</span>
        </div>

        <div className="form-group-row">
          <label>
            ६. व्यवसायको नाम : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
          />
          <label>
            व्यवसायको किसिम : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="business_kind"
            value={formData.business_kind}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-row">
          <label>
            ख. व्यवसायको किसिम/प्रकृति : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="business_nature"
            value={formData.business_nature}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            ग. व्यवसाय रहेको बाटोको नाम <span className="red">*</span>
          </label>
          <input
            type="text"
            name="business_road"
            value={formData.business_road}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>

        <p>१. व्यवसायको ठेगाना</p>
        <div className="form-group-row">
          <input
            name="business_address_line"
            value={formData.business_address_line}
            onChange={handleChange}
            className="dotted-input medium-input"
          />{" "}
          <span className="red">*</span>
          <label>जिल्ला,</label>
          <input
            name="business_address_district"
            value={formData.business_address_district}
            onChange={handleChange}
            className="dotted-input medium-input"
          />{" "}
          <span className="red">*</span>
          <label>गाउँपालिका/नगरपालिका</label>
          <label>वडा नं</label>{" "}
          <input
            name="business_address_ward"
            value={formData.business_address_ward}
            onChange={handleChange}
            className="dotted-input tiny-input"
          />{" "}
          <span className="red">*</span>
          <label>टोल:</label>
          <input
            name="business_address_tole"
            value={formData.business_address_tole}
            onChange={handleChange}
            className="dotted-input medium-input"
          />{" "}
          <span className="red">*</span>
        </div>
        <div className="form-group-row">
          <label>फोन नं.:</label>{" "}
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="dotted-input medium-input"
          />{" "}
          <span className="red">*</span>
          <label>
            मोबाइल नं. <span className="red">*</span>
          </label>{" "}
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            इमेल: <span className="red">*</span>
          </label>{" "}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            पान/ भ्याट नं. : <span className="red">*</span>
          </label>
          <input
            name="pan_vat"
            value={formData.pan_vat}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            वेबसाईट : <span className="red">*</span>
          </label>
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            २. उद्देश्य : <span className="red">*</span>
          </label>
          <input
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            अन्यत्र दर्ता भएको भए: दर्ता नं : <span className="red">*</span>
          </label>
          <input
            name="other_registration_no"
            value={formData.other_registration_no}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            कार्यालय : <span className="red">*</span>
          </label>
          <input
            name="other_registration_office"
            value={formData.other_registration_office}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>

        <p>ग. बहालमा बसेको भए</p>
        <div className="form-group-row">
          <label>
            १. घरधनीको नाम, थर: <span className="red">*</span>
          </label>
          <input
            name="landlord_name"
            value={formData.landlord_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            ना.प्र.नं <span className="red">*</span>
          </label>
          <input
            name="landlord_cit_no"
            value={formData.landlord_cit_no}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            जारी मिति: <span className="red">*</span>
          </label>
          <input
            name="landlord_issue_date"
            value={formData.landlord_issue_date}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>जारी जिल्ला:</label>
        </div>
        <div className="form-group-row">
          <label>
            <span className="red">*</span> ठेगाना:{" "}
            <span className="red">*</span>
          </label>
          <input
            name="landlord_issue_district"
            value={formData.landlord_issue_district}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            जिल्ला: <span className="red">*</span>
          </label>

          <input
            name="landlord_district"
            value={formData.landlord_district}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            नगरपालिका: <span className="red">*</span>
          </label>
          <input
            name="landlord_municipality"
            value={formData.landlord_municipality}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <span className="red">*</span>
        </div>
        <div className="form-group-row">
          <label>
            वडा नं.: <span className="red">*</span>
          </label>
          <input
            name="landlord_ward"
            value={formData.landlord_ward}
            onChange={handleChange}
            className="dotted-input tiny-input"
          />
          <label>
            टोल: <span className="red">*</span>
          </label>
          <input
            name="landlord_tole"
            value={formData.landlord_tole}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            फोन नं.: <span className="red">*</span>
          </label>
          <input
            name="landlord_phone"
            value={formData.landlord_phone}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>

        <p>२. पूँजी:</p>
        <p>कम्पनीको हकमा</p>
        <div className="capital-grid">
          <div className="capital-row">
            <label>
              अधिकृत पूँजी : <span className="red">*</span>
            </label>
            <input
              name="authorized_capital"
              value={formData.authorized_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              चालू पूँजी : <span className="red">*</span>
            </label>
            <input
              name="current_capital"
              value={formData.current_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              जारी पूँजी : <span className="red">*</span>
            </label>
            <input
              name="issued_capital"
              value={formData.issued_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              स्थिर पूँजी : <span className="red">*</span>
            </label>
            <input
              name="fixed_capital"
              value={formData.fixed_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              चुक्ता पूँजी : <span className="red">*</span>
            </label>
            <input
              name="paidup_capital"
              value={formData.paidup_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              कुल पूँजी : <span className="red">*</span>
            </label>
            <input
              name="total_capital"
              value={formData.total_capital}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="kaifiyat-section">
          <label>कैफियत</label>
          <textarea
            name="kaifiyat"
            value={formData.kaifiyat}
            onChange={handleChange}
            className="kaifiyat-box"
            rows="3"
          />
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
          name="issuing_post"
          value={formData.issuing_post}
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
              name="applicant_name"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicant_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="detail-group">
            <label>
              निवेदकको ठेगाना<span className="required">*</span>
            </label>
            <input
              name="applicant_address"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicant_address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="detail-group">
            <label>
              निवेदकको नागरिकता नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_citizenship"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicant_citizenship}
              onChange={handleChange}
              required
            />
          </div>

          <div className="detail-group">
            <label>
              निवेदकको फोन नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_phone"
              type="text"
              className="detail-input bg-gray"
              value={formData.applicant_phone}
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
