// src/pages/business-reg/BusinessRegistrationCertificate.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ── Fiscal year list: last 5 + next 2 (Bikram Sambat) ── */
const buildFiscalYears = () => {
  const currentStart = 2082;
  const years = [];
  for (let y = currentStart - 5; y <= currentStart + 2; y++) {
    years.push(`${y}/${String((y + 1) % 100).padStart(2, "0")}`);
  }
  return years;
};
const FISCAL_YEARS = buildFiscalYears();

const CAPITAL_FIELDS = [
  ["authorized_capital", "अधिकृत पूँजी"],
  ["current_capital",    "चालु पूँजी"],
  ["issued_capital",     "जारी पूँजी"],
  ["fixed_capital",      "स्थिर पूँजी"],
  ["paidup_capital",     "चुक्ता पूँजी"],
  ["total_capital",      "कुल पूँजी"],
];

const STYLES = `
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

  .brc-bold      { font-weight: bold; }
  .brc-underline { text-decoration: underline; }
  .brc-red       { color: red; font-weight: bold; margin-left: 2px; vertical-align: middle; }
  .brc-red-text  { color: #e74c3c; }
  .brc-small     { font-size: 0.85rem; color: #555; margin-left: 10px; }
  .brc-center    { text-align: center; }

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

  /* ── Certificate header extras around MunicipalityHeader ── */
  .brc-cert-header-wrap { position: relative; }
  .brc-copy-text { color: #e74c3c; font-weight: bold; text-align: center; margin: 4px 0 0; }
  .brc-cert-title { font-size: 2rem; margin-top: 10px; font-weight: bold; color: #e74c3c; text-align: center; }
  .brc-photo-container { position: absolute; top: 0; right: 0; }
  .brc-photo-box {
    width: 120px; height: 140px; border: 1px solid #000; background-color: #f9f9f9;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .brc-photo-box img { width: 100%; height: 100%; object-fit: cover; }

  .brc-reg-info-row {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .brc-left-info { display: flex; flex-direction: column; gap: 8px; }
  .brc-right-info { display: flex; align-items: center; gap: 6px; }

  /* ── White-bg inputs ── */
  .brc-input {
    border: 1px solid #ccc;
    background-color: #fff;
    outline: none;
    padding: 4px 8px;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
  }
  .brc-input:focus { border-color: #2563eb; }
  .brc-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
  }
  .brc-w-small  { width: 120px; }
  .brc-w-medium { width: 180px; }
  .brc-w-long   { flex: 1; min-width: 240px; }
  .brc-w-tiny   { width: 60px; text-align: center; }

  .brc-body { font-size: 1rem; line-height: 1.8; text-align: justify; margin-bottom: 30px; }
  .brc-section-title { font-weight: bold; margin-top: 15px; margin-bottom: 10px; }
  .brc-form-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    gap: 6px;
  }
  .brc-form-row label { margin-right: 3px; white-space: nowrap; }

  .brc-capital-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; margin-bottom: 20px; }
  .brc-capital-row { display: flex; align-items: center; gap: 8px; }
  .brc-capital-row label { min-width: 110px; }
  .brc-capital-row input {
    border: 1px solid #ccc;
    background-color: #fff;
    outline: none;
    padding: 4px 8px;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    flex: 1;
  }
  .brc-capital-row input:focus { border-color: #2563eb; }

  .brc-kaifiyat-box {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 8px;
    resize: vertical;
    margin-top: 5px;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    border-radius: 3px;
  }

  .brc-declaration { margin-top: 20px; }
  .brc-declaration p { margin-bottom: 10px; }
  .brc-sign-dash { letter-spacing: 1px; }

  /* ── Old photo / file input ── */
  .brc-old-photo { margin-top: 24px; margin-bottom: 24px; }
  .brc-old-photo > label { display: block; margin-bottom: 8px; }
  .brc-file-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
  .brc-file-name {
    font-size: 0.9rem;
    color: #555;
    font-style: italic;
  }
  .brc-file-name.has-file { color: #1a7f3c; font-style: normal; font-weight: 600; }
  .brc-checkbox-wrapper { margin-top: 14px; display: flex; align-items: center; gap: 6px; }

  /* ── Signature block ── */
  .brc-signature-list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 40px;
    margin-bottom: 40px;
    padding-right: 20px;
    gap: 10px;
  }
  .brc-sig-name-input {
    width: 240px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    padding: 7px;
    text-align: center;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
  }
  .brc-sig-select {
    width: 240px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    padding: 7px;
    text-align: center;
    font-family: inherit;
    font-size: 1rem;
  }
  .brc-sig-label { font-weight: bold; margin-top: 4px; }

  .brc-container .applicant-details-box { border: 1px solid #ddd; padding: 20px; background-color: rgba(255,255,255,0.4); margin-top: 20px; border-radius: 4px; }
  .brc-container .applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
  .brc-container .applicant-details-box .details-grid { display: flex !important; flex-direction: column !important; gap: 18px !important; }
  .brc-container .applicant-details-box .detail-input { max-width: 400px; width: 100%; border: 1px solid #ddd; padding: 8px; border-radius: 4px; box-sizing: border-box; background: #fff; }

  .brc-footer { text-align: center; margin-top: 40px; }
  .brc-save-print-btn {
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: filter 0.15s;
  }
  .brc-save-print-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .brc-save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .brc-copyright { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

  @media (max-width: 700px) {
    .brc-container { padding: 20px 14px; }
    .brc-top-bar { flex-direction: column; gap: 4px; }
    .brc-capital-grid { grid-template-columns: 1fr; }
    .brc-form-row { flex-direction: column; align-items: flex-start; }
    .brc-photo-container { position: static; margin: 10px auto; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
───────────────────────────────────────────────────────────────────────────── */
const makeInitialState = (user) => ({
  registration_no: "",
  fiscal_year: "",
  certificate_date: new Date().toISOString().slice(0, 10),
  full_name: "",
  citizenship_no: "",
  citizenship_issue_date: "",
  citizenship_issue_district: "",
  municipality: MUNICIPALITY.name,
  ward_no: user?.ward ? String(user.ward) : "",
  residence_tole: "",
  residence_district: MUNICIPALITY.city || "",
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
  landlord_issue_district: "",
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
  prover_name: "",
  prover_post: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  close_business: false,
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BusinessRegistrationCertificate = () => {
  const { user } = useAuth();
  const { form: formData, setForm: setFormData, handleChange: baseChange } =
    useWardForm(makeInitialState(user));
  const [loading, setLoading] = useState(false);

  // Local-only photo preview (data URL) — not sent to backend
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState("");

  useEffect(() => {
    if (user?.ward !== undefined && user?.ward !== null) {
      setFormData((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
  }, [user, setFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ── File → local base64 preview (no upload, no external storage) ── */
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("कृपया फोटो (image) फाइल छान्नुहोस्।");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("फाइल धेरै ठूलो छ (अधिकतम 2MB)।");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  /* ── Single save function — one POST, no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;

    if (!formData.full_name?.trim()) {
      alert("पूरा नाम आवश्यक छ");
      return;
    }
    if (!formData.business_name?.trim()) {
      alert("व्यवसायको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const safe = (v) => (v === undefined || v === "" ? null : v);
      const num  = (v) => (v ? Number(v) : null);

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
        landlordIssueDistrict: safe(formData.landlord_issue_district),
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
        authorizedCapital:   num(formData.authorized_capital),
        currentCapital:      num(formData.current_capital),
        issuedCapital:       num(formData.issued_capital),
        fixedCapital:        num(formData.fixed_capital),
        paidCapital:         num(formData.paidup_capital),
        totalCapital:        num(formData.total_capital),
        remarks:             safe(formData.kaifiyat),
        proverName:          safe(formData.prover_name),
        proverPost:          safe(formData.prover_post),
        applicantName:        safe(formData.applicantName),
        applicantAddress:     safe(formData.applicantAddress),
        applicantCitizenship: safe(formData.applicantCitizenship),
        applicantPhone:       safe(formData.applicantPhone),
        isClosed:    formData.close_business ? 1 : 0,
        closeReason: null,
      };

      const res = await axios.post(
        "/api/forms/business-registration-certificate",
        payload
      );

      if (res.status >= 200 && res.status < 300) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("रेकर्ड सफलतापूर्वक सेभ भयो");
        }
        setFormData(makeInitialState(user));
        setPhotoPreview(null);
        setPhotoName("");
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + res.status);
      }
    } catch (err) {
      console.error("BACKEND ERROR:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      alert("सेभ गर्दा समस्या आयो: " + (err.response?.data?.message || err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated print window, certificate layout ── */
  const handleCleanPrint = () => {
    const wardLabel =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `वडा नं. ${user?.ward || MUNICIPALITY.wardNumber || "१"} वडा कार्यालय`;

    const v = (val) => (val === null || val === undefined ? "" : String(val));

    const cap = CAPITAL_FIELDS.map(
      ([name, label]) =>
        `<div class="cap-row"><span>${label} :</span> <span class="value">${v(formData[name])}</span></div>`
    ).join("");

    const photoHtml = photoPreview ? `<img src="${photoPreview}" alt="photo" />` : "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>व्यवसाय दर्ता प्रमाण पत्र</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 12mm 16mm;
            font-size: 11pt;
            line-height: 1.9;
          }
          .header { text-align: center; margin-bottom: 14px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .copy-mark { color: #c0392b; font-size: 8pt; position: absolute; left: 4px; top: 74px; }
          .mun-name { color: #c0392b; font-size: 20pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 15pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .cert-title { color: #c0392b; font-size: 16pt; font-weight: 700; margin-top: 10px; }
          .photo-box { position: absolute; top: 30px; right: 0; width: 90px; height: 110px; border: 1px solid #000; overflow: hidden; }
          .photo-box img { width: 100%; height: 100%; object-fit: cover; }
          .reg-info { display: flex; justify-content: space-between; margin: 18px 0; font-weight: 700; font-size: 11pt; }
          .section-label { font-weight: 700; margin: 12px 0 6px; }
          .line { margin-bottom: 6px; font-size: 11pt; }
          /* value sizes to content — small values stay tight, long ones don't clip/merge */
          .value { font-weight: bold; padding: 0 4px; border-bottom: 1px solid #555; }
          .cap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin: 8px 0 16px; }
          .cap-row { font-size: 11pt; }
          .declaration { margin-top: 18px; font-size: 11pt; }
          .declaration p { margin-bottom: 10px; }
          .signature { text-align: right; margin-top: 30px; margin-right: 10px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 22px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="copy-mark">प्रतिलिपि</div>
          <div class="photo-box">${photoHtml}</div>
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardLabel}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
          <div class="cert-title">व्यवसाय दर्ता प्रमाण पत्र</div>
        </div>

        <div class="reg-info">
          <div>दर्ता नं : <span class="value">${v(formData.registration_no)}</span>
            &nbsp; आ.व : <span class="value">${v(formData.fiscal_year)}</span></div>
          <div>मिति : <span class="value">${v(formData.certificate_date)}</span></div>
        </div>

        <div class="section-label">(क) व्यवसाय व्यवसायीको विवरण :-</div>

        <div class="line">१. पूरा नाम, थर : <span class="value">${v(formData.full_name)}</span></div>
        <div class="line">२. नागरिकता नं : <span class="value">${v(formData.citizenship_no)}</span>
          जारी मिति : <span class="value">${v(formData.citizenship_issue_date)}</span>
          जिल्ला : <span class="value">${v(formData.citizenship_issue_district)}</span></div>
        <div class="line">३. गाउँपालिका/नगरपालिका : <span class="value">${v(formData.municipality)}</span>
          वडा नं : <span class="value">${v(formData.ward_no)}</span>
          टोल : <span class="value">${v(formData.residence_tole)}</span>
          जिल्ला : <span class="value">${v(formData.residence_district)}</span></div>
        <div class="line">४. बाबुको नाम, थर : <span class="value">${v(formData.father_name)}</span></div>
        <div class="line">५. पति/पत्नीको नाम, थर : <span class="value">${v(formData.spouse_name)}</span></div>
        <div class="line">६. व्यवसायको नाम : <span class="value">${v(formData.business_name)}</span>
          व्यवसायको किसिम : <span class="value">${v(formData.business_type)}</span></div>
        <div class="line">ख. व्यवसायको विवरण/प्रकृति : <span class="value">${v(formData.business_nature)}</span></div>
        <div class="line">ग. व्यवसाय रहेको बाटोको नाम : <span class="value">${v(formData.business_road)}</span></div>

        <div class="section-label">१. व्यवसायको ठेगाना</div>
        <div class="line">
          <span class="value">${v(formData.business_address_line)}</span> जिल्ला,
          <span class="value">${v(formData.business_district)}</span>
          गाउँपालिका/नगरपालिका वडा नं
          <span class="value">${v(formData.business_ward)}</span>
          टोल: <span class="value">${v(formData.business_tole)}</span>
        </div>
        <div class="line">
          फोन नं.: <span class="value">${v(formData.phone)}</span>
          मोबाइल नं. <span class="value">${v(formData.mobile)}</span>
          इमेल: <span class="value">${v(formData.email)}</span>
        </div>
        <div class="line">
          पान/भ्याट नं. : <span class="value">${v(formData.pan_vat)}</span>
          वेबसाईट : <span class="value">${v(formData.website)}</span>
        </div>
        <div class="line">२. उद्देश्य : <span class="value">${v(formData.objective)}</span></div>
        <div class="line">अन्यत्र दर्ता भएको भए: दर्ता नं : <span class="value">${v(formData.other_registration_no)}</span>
          कार्यालय : <span class="value">${v(formData.other_registration_office)}</span></div>

        <div class="section-label">ग. बहालमा बसेको भए</div>
        <div class="line">१. घरधनीको नाम, थर: <span class="value">${v(formData.landlord_name)}</span>
          ना.प्र.नं. <span class="value">${v(formData.landlord_citizenship)}</span>
          जारी मिति: <span class="value">${v(formData.landlord_issue_date)}</span>
          जारी जिल्ला: <span class="value">${v(formData.landlord_issue_district)}</span></div>
        <div class="line">ठेगाना: <span class="value">${v(formData.landlord_address)}</span>
          जिल्ला: <span class="value">${v(formData.landlord_district)}</span>
          नगरपालिका: <span class="value">${v(formData.landlord_municipality)}</span></div>
        <div class="line">वडा नं.: <span class="value">${v(formData.landlord_ward)}</span>
          टोल: <span class="value">${v(formData.landlord_tole)}</span>
          फोन नं.: <span class="value">${v(formData.landlord_phone)}</span></div>

        <div class="section-label">२. पूँजी: (कम्पनीको हकमा)</div>
        <div class="cap-grid">${cap}</div>

        <div class="line">कैफियत : <span class="value">${v(formData.kaifiyat)}</span></div>
        ${formData.close_business ? `<div class="line"><span class="value">व्यवसाय बन्द</span></div>` : ""}

        <div class="declaration">
          <p>................................................</p>
          <p style="font-weight:700;text-decoration:underline">व्यवसायीको छाप</p>
          <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
          <p>................................................</p>
          <p style="font-weight:700">निवेदकको दस्तखत</p>
        </div>

        <div class="signature">
          <div class="value">${v(formData.prover_name)}</div>
          <div>${v(formData.prover_post)}</div>
          <div>प्रमाण गर्ने व्यक्तिको नाम</div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${v(formData.applicantName)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${v(formData.applicantAddress)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${v(formData.applicantCitizenship)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${v(formData.applicantPhone)}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
      return;
    }
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form
        className="brc-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="brc-top-bar">
          व्यवसाय / उद्योग दर्ता
          <span className="brc-breadcrumb">व्यवसाय &gt; व्यवसाय / उद्योग दर्ता</span>
        </div>

        {/* ── Certificate header — MunicipalityHeader + photo box + title ── */}
        <div className="brc-cert-header-wrap">
          <div className="brc-photo-container">
            <div className="brc-photo-box">
              {photoPreview && <img src={photoPreview} alt="preview" />}
            </div>
          </div>
          <MunicipalityHeader />
          <p className="brc-copy-text">प्रतिलिपि □</p>
          <h3 className="brc-cert-title">व्यवसाय दर्ता प्रमाण पत्र</h3>
        </div>

        {/* ── Reg info ── */}
        <div className="brc-reg-info-row">
          <div className="brc-left-info">
            <label>
              दर्ता नं :{" "}
              <input
                type="text"
                name="registration_no"
                value={formData.registration_no}
                onChange={handleChange}
                className="brc-input brc-w-small brc-bold"
              />
            </label>
            <select
              name="fiscal_year"
              value={formData.fiscal_year}
              onChange={handleChange}
              className="brc-inline-select brc-bold"
            >
              <option value="">आ.व छान्नुहोस्</option>
              {FISCAL_YEARS.map((fy) => (
                <option key={fy} value={fy}>{fy}</option>
              ))}
            </select>
          </div>
          <div className="brc-right-info">
            <label>मिति :</label>
            <input
              type="date"
              name="certificate_date"
              value={formData.certificate_date}
              onChange={handleChange}
              className="brc-input"
            />
          </div>
        </div>

        {/* ── Form body ── */}
        <div className="brc-body">
          <p className="brc-section-title">(क) व्यवसाय व्यवसायीको विवरण :-</p>

          <div className="brc-form-row">
            <label>१.पूरा नाम, थर: <span className="brc-red">*</span></label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="brc-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>२.नागरिकता नं : <span className="brc-red">*</span></label>
            <input name="citizenship_no"             value={formData.citizenship_no}             onChange={handleChange} className="brc-input brc-w-medium" />
            <label>जारी मिति : <span className="brc-red">*</span></label>
            <input name="citizenship_issue_date"     value={formData.citizenship_issue_date}     onChange={handleChange} className="brc-input brc-w-medium" />
            <label>जिल्ला : <span className="brc-red">*</span></label>
            <input name="citizenship_issue_district" value={formData.citizenship_issue_district} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>३.गाउँपालिका/नगरपालिका: {formData.municipality}</label>
            <label style={{ marginLeft: 16 }}>वडा नं : {formData.ward_no}</label>
            <label style={{ marginLeft: 16 }}>टोल: <span className="brc-red">*</span></label>
            <input name="residence_tole"     value={formData.residence_tole}     onChange={handleChange} className="brc-input brc-w-tiny" />
            <label>जिल्ला:</label>
            <input name="residence_district" value={formData.residence_district} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>४.बाबुको नाम, थर: <span className="brc-red">*</span></label>
            <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="brc-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>५.पति/पत्नीको नाम, थर: </label>
            <input type="text" name="spouse_name" value={formData.spouse_name} onChange={handleChange} className="brc-input brc-w-long" />
            <span className="brc-small">बाबुको नाम उल्लेख नभएको भए मात्र</span>
          </div>

          <div className="brc-form-row">
            <label>६.व्यवसायको नाम: <span className="brc-red">*</span></label>
            <input name="business_name" value={formData.business_name} onChange={handleChange} className="brc-input brc-w-medium" />
            <label>व्यवसायको किसिम: <span className="brc-red">*</span></label>
            <input name="business_type" value={formData.business_type} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>ख.व्यवसायको विवरण/प्रकृति : <span className="brc-red">*</span></label>
            <input name="business_nature" value={formData.business_nature} onChange={handleChange} className="brc-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>ग. व्यवसाय रहेको बाटोको नाम <span className="brc-red">*</span></label>
            <input name="business_road" value={formData.business_road} onChange={handleChange} className="brc-input brc-w-long" />
          </div>

          <p className="brc-section-title">१.व्यवसायको ठेगाना</p>
          <div className="brc-form-row">
            <input name="business_address_line" value={formData.business_address_line} onChange={handleChange} className="brc-input brc-w-medium" />
            <label>जिल्ला,</label>
            <input name="business_district" value={formData.business_district} onChange={handleChange} className="brc-input brc-w-medium" />
            <label>गाउँपालिका/नगरपालिका</label>
            <label>वडा नं</label>
            <input name="business_ward" value={formData.business_ward} onChange={handleChange} className="brc-input brc-w-tiny" />
            <label>टोल:</label>
            <input name="business_tole" value={formData.business_tole} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>फोन नं.:</label>
            <input name="phone"  value={formData.phone}  onChange={handleChange} className="brc-input brc-w-medium" />
            <label>मोबाइल नं. <span className="brc-red">*</span></label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} className="brc-input brc-w-medium" />
            <label>इमेल:</label>
            <input name="email"  value={formData.email}  onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>पान/ भ्याट नं. :</label>
            <input name="pan_vat" value={formData.pan_vat} onChange={handleChange} className="brc-input brc-w-medium" />
            <label>वेबसाईट :</label>
            <input name="website" value={formData.website} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <div className="brc-form-row">
            <label>२.उद्देश्य : <span className="brc-red">*</span></label>
            <input type="text" name="objective" value={formData.objective} onChange={handleChange} className="brc-input brc-w-long" />
          </div>

          <div className="brc-form-row">
            <label>अन्यत्र दर्ता भएको भए: दर्ता नं :</label>
            <input name="other_registration_no"     value={formData.other_registration_no}     onChange={handleChange} className="brc-input brc-w-medium" />
            <label>कार्यालय :</label>
            <input name="other_registration_office" value={formData.other_registration_office} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <p className="brc-section-title">ग.बहालमा बसेको भए</p>
          <div className="brc-form-row">
            <label>१.घरधनीको नाम, थर:</label>
            <input name="landlord_name"        value={formData.landlord_name}        onChange={handleChange} className="brc-input brc-w-medium" />
            <label>ना.प्र.नं.</label>
            <input name="landlord_citizenship" value={formData.landlord_citizenship} onChange={handleChange} className="brc-input brc-w-medium" />
            <label>जारी मिति</label>
            <input name="landlord_issue_date"  value={formData.landlord_issue_date}  onChange={handleChange} className="brc-input brc-w-medium" />
            <label>जारी जिल्ला:</label>
            <input name="landlord_issue_district" value={formData.landlord_issue_district} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>
          <div className="brc-form-row">
            <label>ठेगाना:</label>
            <input name="landlord_address"      value={formData.landlord_address}      onChange={handleChange} className="brc-input brc-w-medium" />
            <label>जिल्ला:</label>
            <input name="landlord_district"     value={formData.landlord_district}     onChange={handleChange} className="brc-input brc-w-medium" />
            <label>नगरपालिका:</label>
            <input name="landlord_municipality" value={formData.landlord_municipality} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>
          <div className="brc-form-row">
            <label>वडा नं.:</label>
            <input name="landlord_ward"  value={formData.landlord_ward}  onChange={handleChange} className="brc-input brc-w-tiny" />
            <label>टोल:</label>
            <input name="landlord_tole"  value={formData.landlord_tole}  onChange={handleChange} className="brc-input brc-w-medium" />
            <label>फोन नं.:</label>
            <input name="landlord_phone" value={formData.landlord_phone} onChange={handleChange} className="brc-input brc-w-medium" />
          </div>

          <p className="brc-section-title">२. पूँजी:</p>
          <p>कम्पनीको हकमा</p>
          <div className="brc-capital-grid">
            {CAPITAL_FIELDS.map(([name, label]) => (
              <div className="brc-capital-row" key={name}>
                <label>{label} : <span className="brc-red">*</span></label>
                <input name={name} value={formData[name]} onChange={handleChange} />
              </div>
            ))}
          </div>

          <div>
            <label>कैफियत</label>
            <textarea name="kaifiyat" value={formData.kaifiyat} onChange={handleChange} className="brc-kaifiyat-box" rows="3" />
          </div>

          <div className="brc-declaration">
            {/* dash underline above व्यवसायीको छाप (stamp line) */}
            <p className="brc-sign-dash">................................................</p>
            <p className="brc-bold brc-underline">व्यवसायीको छाप</p>
            <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
            <p className="brc-sign-dash">................................................</p>
            <p className="brc-bold">निवेदकको दस्तखत</p>
          </div>
        </div>

        {/* ── Old photo (local preview only, no upload) ── */}
        <div className="brc-old-photo">
          <label className="brc-red-text brc-bold">पुरानो उद्योग दर्ता फोटो</label>
          <div className="brc-file-input-wrapper">
            <input type="file" accept="image/*" onChange={handlePhoto} />
            <span className={`brc-file-name${photoName ? " has-file" : ""}`}>
              {photoName || "कुनै फाइल छानिएको छैन"}
            </span>
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

        {/* ── Signature block ── */}
        <div className="brc-signature-list">
          <input
            type="text"
            name="prover_name"
            value={formData.prover_name}
            onChange={handleChange}
            placeholder="हस्ताक्षरकर्ताको नाम"
            className="brc-sig-name-input"
          />
          <select
            name="prover_post"
            value={formData.prover_post}
            onChange={handleChange}
            className="brc-sig-select"
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="सचिव">सचिव</option>
            <option value="अध्यक्ष">अध्यक्ष</option>
            <option value="का.वा अध्यक्ष">का.वा अध्यक्ष</option>
          </select>
          <p className="brc-sig-label">प्रमाण गर्ने व्यक्तिको नाम</p>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* ── Footer buttons ── */}
        <div className="brc-footer">
          <button
            type="submit"
            className="brc-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#34495e" }}
          >
            {loading ? "सेभ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="brc-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "सेभ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="brc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default BusinessRegistrationCertificate;