// src/pages/business-reg/BusinessRegistrationCertificate.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BusinessRegistrationCertificate.css)
   All classes prefixed with "brc-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .brc-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Utility ── */
  .brc-bold      { font-weight: bold; }
  .brc-underline { text-decoration: underline; }
  .brc-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: middle; }
  .brc-red-text  { color: #e74c3c; }
  .brc-small     { font-size: 0.85rem; color: #555; margin-left: 10px; }
  .brc-center    { text-align: center; }

  /* ── Top Bar ── */
  .brc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .brc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .brc-header { text-align: center; margin-bottom: 20px; position: relative; }
  .brc-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .brc-copy-text { position: absolute; left: 10px; top: 90px; font-weight: bold; }
  .brc-header-text { display: flex; flex-direction: column; align-items: center; }
  .brc-municipality-name  { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .brc-ward-title         { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .brc-address-text,
  .brc-province-text      { color: #e74c3c; margin: 0; font-size: 1rem; }
  .brc-cert-title         { font-size: 2rem; margin-top: 10px; font-weight: bold; color: #e74c3c; }
  .brc-photo-container    { position: absolute; top: 50px; right: 50px; }
  .brc-photo-box          { width: 120px; height: 140px; border: 1px solid #000; background-color: #f9f9f9; }

  /* ── Reg info row ── */
  .brc-reg-info-row {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .brc-left-info { display: flex; flex-direction: column; gap: 5px; }
  .brc-dotted-input {
    border: none;
    border-bottom: 1px dotted #999;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .brc-inline-input  { border: none; border-bottom: 1px dotted #999; background: transparent; outline: none; padding: 2px 5px; font-family: inherit; font-size: 1rem; }
  .brc-inline-select { border: 1px solid #ccc; padding: 2px; font-family: inherit; font-size: 1rem; }
  .brc-w-small  { width: 120px; }
  .brc-w-medium { width: 180px; }
  .brc-w-long   { flex-grow: 1; }
  .brc-w-tiny   { width: 50px; text-align: center; }

  /* ── Form body ── */
  .brc-body { font-size: 1rem; line-height: 1.8; text-align: justify; margin-bottom: 30px; }
  .brc-section-title { font-weight: bold; margin-top: 15px; margin-bottom: 10px; }
  .brc-form-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8px;
    gap: 4px;
  }
  .brc-form-row label { margin-right: 5px; white-space: nowrap; }
  .brc-form-row input { border: none; border-bottom: 1px dotted #999; background: transparent; font-family: inherit; font-size: 1rem; padding: 2px 5px; outline: none; }

  /* ── Capital grid ── */
  .brc-capital-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .brc-capital-row { display: flex; align-items: center; }
  .brc-capital-row label { min-width: 100px; }
  .brc-capital-row input { border: none; border-bottom: 1px dotted #999; background: transparent; font-family: inherit; font-size: 1rem; padding: 2px 5px; outline: none; flex: 1; }

  /* ── Kaifiyat ── */
  .brc-kaifiyat-box {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px;
    resize: vertical;
    margin-top: 5px;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
  }

  /* ── Declaration ── */
  .brc-declaration { margin-top: 20px; }
  .brc-declaration p { margin-bottom: 10px; }

  /* ── Old photo ── */
  .brc-old-photo { margin-top: 20px; margin-bottom: 20px; }
  .brc-file-input-wrapper { border: 1px solid #ccc; display: inline-block; padding: 2px; background: #fff; margin-top: 5px; }
  .brc-checkbox-wrapper { margin-top: 5px; }

  /* ── Signature list ── */
  .brc-signature-list { display: flex; flex-direction: column; align-items: flex-end; margin-top: 20px; margin-bottom: 40px; padding-right: 20px; }

  /* ── Applicant details overrides ── */
  .brc-container .applicant-details-box { border: 1px solid #ddd; padding: 20px; background-color: rgba(255,255,255,0.4); margin-top: 20px; border-radius: 4px; }
  .brc-container .applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
  .brc-container .applicant-details-box .details-grid { display: flex !important; flex-direction: column !important; gap: 18px !important; }
  .brc-container .applicant-details-box .detail-input { max-width: 400px; width: 100%; border: 1px solid #ddd; padding: 8px; border-radius: 4px; box-sizing: border-box; }

  /* ── Footer ── */
  .brc-footer { text-align: center; margin-top: 40px; }
  .brc-save-print-btn {
    background-color: #34495e;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .brc-save-print-btn:hover { background-color: #2c3e50; }

  /* ── Copyright ── */
  .brc-copyright { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .brc-container,
    .brc-container * { visibility: visible; }
    .brc-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }
    .brc-top-bar,
    .brc-footer { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px dotted #999 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .brc-municipality-name,
    .brc-ward-title,
    .brc-address-text,
    .brc-province-text,
    .brc-cert-title {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
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
    // ApplicantDetailsNp fields (camelCase — matches what the component reads)
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
    close_business: false,
  });

  React.useEffect(() => {
    if (user?.ward !== undefined && user?.ward !== null) {
      setFormData((prev) => ({ ...prev, ward_no: String(user.ward) }));
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
        registrationNo:      safe(formData.registration_no),
        fiscalYear:          safe(formData.fiscal_year),
        certificateDate:     safe(formData.certificate_date),
        fullName:            safe(formData.full_name),
        citizenshipNo:       safe(formData.citizenship_no),
        issuedDate:          safe(formData.citizenship_issue_date),
        issuedDistrict:      safe(formData.citizenship_issue_district),
        municipality:        safe(formData.municipality),
        wardNo:              safe(formData.ward_no),
        tole:                safe(formData.residence_tole),
        district:            safe(formData.residence_district),
        fatherName:          safe(formData.father_name),
        spouseName:          safe(formData.spouse_name),
        businessName:        safe(formData.business_name),
        businessType:        safe(formData.business_type),
        businessNature:      safe(formData.business_nature),
        roadName:            safe(formData.business_road),
        businessAddress:     safe(formData.business_address_line),
        businessDistrict:    safe(formData.business_district),
        businessMunicipality: safe(formData.municipality),
        businessWard:        safe(formData.business_ward),
        businessTole:        safe(formData.business_tole),
        landlordName:        safe(formData.landlord_name),
        landlordCitizenship: safe(formData.landlord_citizenship),
        landlordIssueDate:   safe(formData.landlord_issue_date),
        landlordMunicipality: safe(formData.landlord_municipality),
        landlordDistrict:    safe(formData.landlord_district),
        landlordAddress:     safe(formData.landlord_address),
        landlordWard:        safe(formData.landlord_ward),
        landlordTole:        safe(formData.landlord_tole),
        landlordPhone:       safe(formData.landlord_phone),
        phone:               safe(formData.phone),
        mobile:              safe(formData.mobile),
        email:               safe(formData.email),
        panVatNo:            safe(formData.pan_vat),
        website:             safe(formData.website),
        objective:           safe(formData.objective),
        otherRegNo:          safe(formData.other_registration_no),
        otherOffice:         safe(formData.other_registration_office),
        authorizedCapital:   formData.authorized_capital ? Number(formData.authorized_capital) : null,
        currentCapital:      formData.current_capital    ? Number(formData.current_capital)    : null,
        issuedCapital:       formData.issued_capital     ? Number(formData.issued_capital)     : null,
        fixedCapital:        formData.fixed_capital      ? Number(formData.fixed_capital)      : null,
        paidCapital:         formData.paidup_capital     ? Number(formData.paidup_capital)     : null,
        totalCapital:        formData.total_capital      ? Number(formData.total_capital)      : null,
        remarks:             safe(formData.kaifiyat),
        /* BUG FIX: original used formData.applicant_name/address/citizenship/phone
           (snake_case) which are not in state — they are always undefined → null.
           Corrected to the camelCase keys that handleChange and initialState use. */
        applicantName:        safe(formData.applicantName),
        applicantAddress:     safe(formData.applicantAddress),
        applicantCitizenship: safe(formData.applicantCitizenship),
        applicantPhone:       safe(formData.applicantPhone),
        isClosed:    formData.close_business ? 1 : 0,
        closeReason: null,
      };

      const res = await axiosInstance.post(
        "/api/forms/business-registration-certificate",
        payload,
      );

      if (res.status >= 200 && res.status < 300) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो");
        return true;
      }
      throw new Error("Insert failed");
    } catch (err) {
      console.error("BACKEND ERROR:", {
        status: err.response?.status,
        data:   err.response?.data,
        message: err.message,
      });
      alert("सेभ गर्दा समस्या आयो");
      return false;
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="brc-container">

        {/* ── Top Bar ── */}
        <div className="brc-top-bar">
          व्यवसाय / उद्योग दर्ता
          <span className="brc-breadcrumb">व्यवसाय &gt; व्यवसाय / उद्योग दर्ता</span>
        </div>

        {/* ── Header ── */}
        <div className="brc-header">
          <div className="brc-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
            <p className="brc-copy-text">प्रतिलिपि □</p>
          </div>
          <div className="brc-header-text">
            <h1 className="brc-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="brc-ward-title">वडा नं. {user?.ward} वडा कार्यालय</h2>
            <p className="brc-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="brc-province-text">{MUNICIPALITY.provinceLine}</p>
            <h3 className="brc-cert-title">व्यवसाय दर्ता प्रमाण पत्र</h3>
          </div>
          <div className="brc-photo-container">
            <div className="brc-photo-box"></div>
          </div>
        </div>

        {/* ── Reg info ── */}
        <div className="brc-reg-info-row">
          <div className="brc-left-info">
            <label>
              दर्ता नं :{" "}
              <span className="brc-red-text brc-bold">
                <input
                  type="text"
                  name="registration_no"
                  value={formData.registration_no}
                  onChange={handleChange}
                  className="brc-inline-input brc-bold"
                />
              </span>
            </label>
            <select
              name="fiscal_year"
              value={formData.fiscal_year}
              onChange={handleChange}
              className="brc-inline-select brc-bold"
            >
              <option value="">आ.व छान्नुहोस्</option>
              <option value="2081/82">2081/82</option>
              <option value="2082/83">2082/83</option>
            </select>
          </div>
          <div className="brc-right-info">
            <p>
              मिति :{" "}
              <input
                type="date"
                name="certificate_date"
                value={formData.certificate_date}
                onChange={handleChange}
                className="brc-bold"
              />
            </p>
          </div>
        </div>

        {/* ── Form body ── */}
        <div className="brc-body">
          <p className="brc-section-title">(क) व्यवसाय व्यवसायीको विवरण :-</p>

          <div className="brc-form-row">
            <label>१.पूरा नाम, थर: <span className="brc-red">*</span></label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="brc-dotted-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>२.नागरिकता नं : <span className="brc-red">*</span></label>
            <input name="citizenship_no"           value={formData.citizenship_no}           onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>जारी मिति : <span className="brc-red">*</span></label>
            <input name="citizenship_issue_date"   value={formData.citizenship_issue_date}   onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>जिल्ला : <span className="brc-red">*</span></label>
            <input name="citizenship_issue_district" value={formData.citizenship_issue_district} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>३.गाउँपालिका/नगरपालिका: <span className="brc-red">*</span></label>
            <span className="brc-dotted-input brc-w-medium brc-bold">{formData.municipality}</span>
            <label>वडा नं : <span className="brc-red">*</span></label>
            <span className="brc-dotted-input brc-w-tiny brc-bold">{formData.ward_no}</span>
            <label>टोल: <span className="brc-red">*</span></label>
            <input name="residence_tole"     value={formData.residence_tole}     onChange={handleChange} className="brc-dotted-input brc-w-tiny" />
            <label>जिल्ला: <span className="brc-red">*</span></label>
            <input name="residence_district" value={formData.residence_district} onChange={handleChange} className="brc-dotted-input brc-w-tiny" />
          </div>

          <div className="brc-form-row">
            <label>४.बाबुको नाम, थर: <span className="brc-red">*</span></label>
            <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="brc-dotted-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>५.पति/पत्नीको नाम, थर: <span className="brc-red">*</span></label>
            <input type="text" name="spouse_name" value={formData.spouse_name} onChange={handleChange} className="brc-dotted-input brc-w-long" />
            <span className="brc-small">बाबुको नाम उल्लेख नभएको भए मात्र</span>
          </div>

          <div className="brc-form-row">
            <label>६.व्यवसायको नाम: <span className="brc-red">*</span></label>
            <input name="business_name" value={formData.business_name} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>व्यवसायको किसिम: <span className="brc-red">*</span></label>
            <input name="business_type" value={formData.business_type} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>ख.व्यवसायको विवरण/प्रकृति : <span className="brc-red">*</span></label>
            <input name="business_nature" value={formData.business_nature} onChange={handleChange} className="brc-dotted-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>ग. व्यवसाय रहेको बाटोको नाम <span className="brc-red">*</span></label>
            <input name="business_road" value={formData.business_road} onChange={handleChange} className="brc-dotted-input brc-w-long" />
          </div>

          <p className="brc-section-title">१.व्यवसायको ठेगाना</p>
          <div className="brc-form-row">
            <input name="business_address_line" value={formData.business_address_line} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <span className="brc-red">*</span>
            <label>जिल्ला,</label>
            <input name="business_district" value={formData.business_district} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <span className="brc-red">*</span>
            <label>गाउँपालिका/नगरपालिका</label>
            <label>वडा नं</label>
            <input name="business_ward" value={formData.business_ward} onChange={handleChange} className="brc-dotted-input brc-w-tiny" />
            <span className="brc-red">*</span>
            <label>टोल:</label>
            <input name="business_tole" value={formData.business_tole} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>फोन नं.:</label>
            <input name="phone"  value={formData.phone}  onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <span className="brc-red">*</span>
            <label>मोबाइल नं. <span className="brc-red">*</span></label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>इमेल: <span className="brc-red">*</span></label>
            <input name="email"  value={formData.email}  onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>पान/ भ्याट नं. : <span className="brc-red">*</span></label>
            <input name="pan_vat" value={formData.pan_vat} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>वेबसाईट : <span className="brc-red">*</span></label>
            <input name="website" value={formData.website} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>२.उद्देश्य : <span className="brc-red">*</span></label>
            <input type="text" name="objective" value={formData.objective} onChange={handleChange} className="brc-dotted-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>अन्यत्र दर्ता भएको भए: दर्ता नं : <span className="brc-red">*</span></label>
            <input name="other_registration_no"     value={formData.other_registration_no}     onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>कार्यालय : <span className="brc-red">*</span></label>
            <input name="other_registration_office" value={formData.other_registration_office} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <p className="brc-section-title">ग.बहालमा बसेको भए</p>
          <div className="brc-form-row">
            <label>१.घरधनीको नाम, थर: <span className="brc-red">*</span></label>
            <input name="landlord_name"        value={formData.landlord_name}        onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>ना.प्र.नं. <span className="brc-red">*</span></label>
            <input name="landlord_citizenship" value={formData.landlord_citizenship} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>जारी मिति <span className="brc-red">*</span></label>
            <input name="landlord_issue_date"  value={formData.landlord_issue_date}  onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>जारी जिल्ला:</label>
          </div>
          <div className="brc-form-row">
            <label><span className="brc-red">*</span> ठेगाना: <span className="brc-red">*</span></label>
            <input name="landlord_address"      value={formData.landlord_address}      onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>जिल्ला: <span className="brc-red">*</span></label>
            <input name="landlord_district"     value={formData.landlord_district}     onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>नगरपालिका: <span className="brc-red">*</span></label>
            <input name="landlord_municipality" value={formData.landlord_municipality} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>
          <div className="brc-form-row">
            <label>वडा नं.: <span className="brc-red">*</span></label>
            <input name="landlord_ward"  value={formData.landlord_ward}  onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>टोल: <span className="brc-red">*</span></label>
            <input name="landlord_tole"  value={formData.landlord_tole}  onChange={handleChange} className="brc-dotted-input brc-w-medium" />
            <label>फोन नं.: <span className="brc-red">*</span></label>
            <input name="landlord_phone" value={formData.landlord_phone} onChange={handleChange} className="brc-dotted-input brc-w-medium" />
          </div>

          <p className="brc-section-title">२. पूँजी:</p>
          <p>कम्पनीको हकमा</p>
          <div className="brc-capital-grid">
            <div className="brc-capital-row"><label>अधिकृत पूँजी: <span className="brc-red">*</span></label><input name="authorized_capital" value={formData.authorized_capital} onChange={handleChange} /></div>
            <div className="brc-capital-row"><label>चालु पूँजी: <span className="brc-red">*</span></label>    <input name="current_capital"     value={formData.current_capital}     onChange={handleChange} /></div>
            <div className="brc-capital-row"><label>जारी पूँजी: <span className="brc-red">*</span></label>    <input name="issued_capital"      value={formData.issued_capital}      onChange={handleChange} /></div>
            <div className="brc-capital-row"><label>स्थिर पूँजी: <span className="brc-red">*</span></label>   <input name="fixed_capital"       value={formData.fixed_capital}       onChange={handleChange} /></div>
            <div className="brc-capital-row"><label>चुक्ता पूँजी: <span className="brc-red">*</span></label>  <input name="paidup_capital"      value={formData.paidup_capital}      onChange={handleChange} /></div>
            <div className="brc-capital-row"><label>कुल पूँजी <span className="brc-red">*</span></label>      <input name="total_capital"       value={formData.total_capital}       onChange={handleChange} /></div>
          </div>

          <div>
            <label>कैफियत</label>
            <textarea name="kaifiyat" value={formData.kaifiyat} onChange={handleChange} className="brc-kaifiyat-box" />
          </div>

          <div className="brc-declaration">
            <p className="brc-bold brc-underline">व्यवसायीको छाप</p>
            <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
            <p>................................................</p>
            <p className="brc-bold">निवेदकको दस्तखत</p>
          </div>
        </div>

        {/* ── Old photo ── */}
        <div className="brc-old-photo">
          <label className="brc-red-text brc-bold">पुरानो उद्योग दर्ता फोटो</label>
          <div className="brc-file-input-wrapper">
            <input type="file" />
            <span>No file chosen</span>
          </div>
          <div className="brc-checkbox-wrapper">
            <input
              type="checkbox"
              id="closeIndustry"
              name="close_business"
              checked={formData.close_business}
              onChange={handleChange}
            />
            <label htmlFor="closeIndustry" className="brc-red-text">व्यवसाय बन्द</label>
          </div>
        </div>

        {/* ── Signature list ── */}
        <div className="brc-signature-list">
          <p className="brc-bold">प्रमाण गर्ने व्यक्तिको नाम</p>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="brc-footer">
          <button
            type="button"
            className="brc-save-print-btn"
            onClick={async () => {
              const ok = await handleSubmit();
              if (ok) window.print();
            }}
          >
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>

        <div className="brc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </div>
    </>
  );
};

export default BusinessRegistrationCertificate;