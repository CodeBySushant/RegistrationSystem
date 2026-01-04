// 2
import React, { useState } from "react";
import "./BusinessRegistrationCertificate.css";

import { MUNICIPALITY } from "../../config/municipalityConfig";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const BusinessRegistrationCertificate = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    registration_no: "",
    fiscal_year: "",
    certificate_date: new Date().toISOString().slice(0, 10),

    full_name: "",
    citizenship_no: "",
    citizenship_issue_date: "",
    citizenship_issue_district: "",

    municipality: MUNICIPALITY.name,
    ward_no: user?.ward ? String(user.ward) : null,
    residence_tole: "",
    residence_district: "",

    father_name: "",
    spouse_name: "",

    business_name: "",
    business_type: "",
    business_nature: "",
    business_road: "",

    business_address_line: "",
    business_district: "",
    business_ward: "",
    business_tole: "",

    landlord_name: "",
    landlord_citizenship: "",
    landlord_issue_date: "",
    landlord_municipality: "",
    landlord_district: "",
    landlord_address: "",
    landlord_ward: "",
    landlord_tole: "",
    landlord_phone: "",

    phone: "",
    mobile: "",
    email: "",

    pan_vat: "",
    website: "",

    objective: "",
    other_registration_no: "",
    other_registration_office: "",

    authorized_capital: "",
    current_capital: "",
    issued_capital: "",
    fixed_capital: "",
    paidup_capital: "",
    total_capital: "",

    kaifiyat: "",

    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: "",

    close_business: false,
  });

  React.useEffect(() => {
    if (user?.ward !== undefined && user?.ward !== null) {
      setFormData((prev) => ({
        ...prev,
        ward_no: String(user.ward),
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const safe = (v) => (v === undefined || v === "" ? null : v);
      const payload = {
        registrationNo: safe(formData.registration_no),
        fiscalYear: safe(formData.fiscal_year),
        certificateDate: safe(formData.certificate_date),

        fullName: safe(formData.full_name),
        citizenshipNo: safe(formData.citizenship_no),
        issuedDate: safe(formData.citizenship_issue_date),
        issuedDistrict: safe(formData.citizenship_issue_district),

        municipality: safe(formData.municipality),
        wardNo: safe(formData.ward_no),
        tole: safe(formData.residence_tole),
        district: safe(formData.residence_district),

        fatherName: safe(formData.father_name),
        spouseName: safe(formData.spouse_name),

        businessName: safe(formData.business_name),
        businessType: safe(formData.business_type),
        businessNature: safe(formData.business_nature),
        roadName: safe(formData.business_road),

        businessAddress: safe(formData.business_address_line),
        businessDistrict: safe(formData.business_district),
        businessMunicipality: safe(formData.municipality),
        businessWard: safe(formData.business_ward),
        businessTole: safe(formData.business_tole),

        landlordName: safe(formData.landlord_name),
        landlordCitizenship: safe(formData.landlord_citizenship),
        landlordIssueDate: safe(formData.landlord_issue_date),
        landlordMunicipality: safe(formData.landlord_municipality),
        landlordDistrict: safe(formData.landlord_district),
        landlordAddress: safe(formData.landlord_address),
        landlordWard: safe(formData.landlord_ward),
        landlordTole: safe(formData.landlord_tole),
        landlordPhone: safe(formData.landlord_phone),

        phone: safe(formData.phone),
        mobile: safe(formData.mobile),
        email: safe(formData.email),

        panVatNo: safe(formData.pan_vat),
        website: safe(formData.website),

        objective: safe(formData.objective),
        otherRegNo: safe(formData.other_registration_no),
        otherOffice: safe(formData.other_registration_office),

        authorizedCapital: formData.authorized_capital
          ? Number(formData.authorized_capital)
          : null,
        currentCapital: formData.current_capital
          ? Number(formData.current_capital)
          : null,
        issuedCapital: formData.issued_capital
          ? Number(formData.issued_capital)
          : null,
        fixedCapital: formData.fixed_capital
          ? Number(formData.fixed_capital)
          : null,
        paidCapital: formData.paidup_capital
          ? Number(formData.paidup_capital)
          : null,
        totalCapital: formData.total_capital
          ? Number(formData.total_capital)
          : null,

        remarks: safe(formData.kaifiyat),

        applicantName: safe(formData.applicant_name),
        applicantAddress: safe(formData.applicant_address),
        applicantCitizenship: safe(formData.applicant_citizenship),
        applicantPhone: safe(formData.applicant_phone),

        isClosed: formData.close_business ? 1 : 0,
        closeReason: null,
      };

      const res = await axiosInstance.post(
        "/api/forms/business-registration-certificate",
        payload
      );

      if (res.status >= 200 && res.status < 300) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो");
        return true;
      }

      throw new Error("Insert failed");
    } catch (err) {
      console.error("🔥 BACKEND ERROR:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      alert("सेभ गर्दा समस्या आयो");
      return false;
    }
  };

  const handlePrint = async () => {
    const success = await handleSubmit();
    if (success) {
      window.print();
    }
  };

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
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
          <p className="copy-text">प्रतिलिपि □</p>
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">वडा नं. {user?.ward} वडा कार्यालय</h2>
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
          <span className="red-text bold-text">
            <input
              type="text"
              name="registration_no"
              value={formData.registration_no}
              onChange={handleChange}
              className="inline-input bold-text"
            />
          </span>
          <div className="line-break"></div>
          <select
            name="fiscal_year"
            value={formData.fiscal_year}
            onChange={handleChange}
            className="inline-select bold-text"
          >
            <option value="">आ.व छान्नुहोस्</option>
            <option value="2081/82">2081/82</option>
            <option value="2082/83">2082/83</option>
          </select>
        </div>
        <div className="right-info">
          <p>
            मिति :{" "}
            <input
              type="date"
              name="certificate_date"
              value={formData.certificate_date}
              onChange={handleChange}
              className="bold-text"
            />
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
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            २.नागरिकता नं : <span className="red">*</span>
          </label>
          <input
            name="citizenship_no"
            value={formData.citizenship_no}
            onChange={handleChange}
          />
          <label>
            जारी मिति : <span className="red">*</span>
          </label>
          <input
            name="citizenship_issue_date"
            value={formData.citizenship_issue_date}
            onChange={handleChange}
          />
          <label>
            जिल्ला : <span className="red">*</span>
          </label>
          <input
            name="citizenship_issue_district"
            value={formData.citizenship_issue_district}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-row">
          <label>
            ३.गाउँपालिका/नगरपालिका: <span className="red">*</span>
          </label>
          <span className="dotted-input medium-input bold-text">
            {formData.municipality}
          </span>
          <label>
            वडा नं : <span className="red">*</span>
          </label>
          <span className="dotted-input tiny-input bold-text">
            {formData.ward_no}
          </span>
          <label>
            टोल: <span className="red">*</span>
          </label>
          <input
            name="residence_tole"
            value={formData.residence_tole}
            onChange={handleChange}
            className="dotted-input tiny-input"
          />
          <label>
            जिल्ला: <span className="red">*</span>
          </label>
          <input
            name="residence_district"
            value={formData.residence_district}
            onChange={handleChange}
            className="dotted-input tiny-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            ४.बाबुको नाम, थर: <span className="red">*</span>
          </label>
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            ५.पति/पत्नीको नाम, थर: <span className="red">*</span>
          </label>
          <input
            type="text"
            name="spouse_name"
            value={formData.spouse_name}
            onChange={handleChange}
            className="dotted-input long-input"
          />
          <span className="small-text">बाबुको नाम उल्लेख नभएको भए मात्र</span>
        </div>

        <div className="form-group-row">
          <label>
            ६.व्यवसायको नाम: <span className="red">*</span>
          </label>
          <input
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
          />
          <label>
            व्यवसायको किसिम: <span className="red">*</span>
          </label>
          <input
            name="business_type"
            value={formData.business_type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-row">
          <label>
            ख.व्यवसायको विवरण/प्रकृति : <span className="red">*</span>
          </label>
          <input
            name="business_nature"
            value={formData.business_nature}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-row">
          <label>
            ग. व्यवसाय रहेको बाटोको नाम <span className="red">*</span>
          </label>
          <input
            name="business_road"
            value={formData.business_road}
            onChange={handleChange}
          />
        </div>

        <p className="section-title">१.व्यवसायको ठेगाना</p>
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
            name="business_district"
            value={formData.business_district}
            onChange={handleChange}
          />{" "}
          <span className="red">*</span>
          <label>गाउँपालिका/नगरपालिका</label>
          <label>वडा नं</label>{" "}
          <input
            name="business_ward"
            value={formData.business_ward}
            onChange={handleChange}
            className="dotted-input tiny-input"
          />{" "}
          <span className="red">*</span>
          <label>टोल:</label>
          <input
            name="business_tole"
            value={formData.business_tole}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-row">
          <label>फोन नं.:</label>{" "}
          <input name="phone" value={formData.phone} onChange={handleChange} />{" "}
          <span className="red">*</span>
          <label>
            मोबाइल नं. <span className="red">*</span>
          </label>{" "}
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <label>
            इमेल: <span className="red">*</span>
          </label>{" "}
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group-row">
          <label>
            पान/ भ्याट नं. : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="pan_vat"
            value={formData.pan_vat}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            वेबसाईट : <span className="red">*</span>
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>

        <div className="form-group-row">
          <label>
            २.उद्देश्य : <span className="red">*</span>
          </label>
          <input
            type="text"
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

        <p className="section-title">ग.बहालमा बसेको भए</p>
        <div className="form-group-row">
          <label>
            १.घरधनीको नाम, थर: <span className="red">*</span>
          </label>
          <input
            name="landlord_name"
            value={formData.landlord_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            ना.प्र.नं. <span className="red">*</span>
          </label>
          <input
            name="landlord_citizenship"
            value={formData.landlord_citizenship}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <label>
            जारी मिति <span className="red">*</span>
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
            name="landlord_address"
            value={formData.landlord_address}
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
        </div>
        <div className="form-group-row">
          <label>
            वडा नं.: <span className="red">*</span>
          </label>
          <input
            name="landlord_ward"
            value={formData.landlord_ward}
            onChange={handleChange}
            className="dotted-input medium-input"
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

        <p className="section-title">२. पूँजी:</p>
        <p>कम्पनीको हकमा</p>
        <div className="capital-grid">
          <div className="capital-row">
            <label>
              अधिकृत पूँजी: <span className="red">*</span>
            </label>
            <input
              name="authorized_capital"
              value={formData.authorized_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              चालु पूँजी: <span className="red">*</span>
            </label>
            <input
              name="current_capital"
              value={formData.current_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              जारी पूँजी: <span className="red">*</span>
            </label>
            <input
              name="issued_capital"
              value={formData.issued_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              स्थिर पूँजी: <span className="red">*</span>
            </label>
            <input
              name="fixed_capital"
              value={formData.fixed_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              चुक्ता पूँजी: <span className="red">*</span>
            </label>
            <input
              name="paidup_capital"
              value={formData.paidup_capital}
              onChange={handleChange}
            />
          </div>
          <div className="capital-row">
            <label>
              कुल पूँजी <span className="red">*</span>
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
          />
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
          <input
            type="checkbox"
            id="closeIndustry"
            name="close_business"
            checked={formData.close_business}
            onChange={handleChange}
          />
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
        <button
          type="button"
          className="save-print-btn"
          onClick={async () => {
            const ok = await handleSubmit();
            if (ok) window.print();
          }}
        >
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
