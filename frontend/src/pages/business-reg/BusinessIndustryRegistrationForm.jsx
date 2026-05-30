// src/pages/business-reg/BusinessIndustryRegistrationForm.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const FORM_KEY = "business-industry-registration-form";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.business-registration-container {
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
  border: 1px solid #ddd;
  box-sizing: border-box;
}

/* ── Utility ── */
.bold-text      { font-weight: bold; }
.underline-text { text-decoration: underline; }
.red            { color: red; font-weight: bold; margin: 0 2px; vertical-align: middle; }
.red-text       { color: red; }
.tiny-text      { font-size: 0.8rem; }
.center-text    { text-align: center; }
.small-text     { font-size: 0.85rem; color: #555; }

/* ── Top bar ── */
.top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Certificate header extras (photo box + title around MunicipalityHeader) ── */
.cert-header-wrap { position: relative; }
.copy-mark { color: red; font-size: 0.8rem; text-align: center; margin: 4px 0 0; }
.certificate-title { font-size: 1.6rem; margin-top: 12px; text-align: center; }
.photo-box-container { position: absolute; top: 0; right: 0; }
.photo-box { width: 120px; height: 140px; border: 1px solid #000; background-color: #f9f9f9; }

/* ── Registration info ── */
.reg-info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: bold;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.reg-info-row .left-info,
.reg-info-row .right-info { display: flex; align-items: center; gap: 6px; }

/* ── Shared inputs — white background ── */
.business-registration-container .field-input {
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  padding: 4px 8px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
}
.business-registration-container .field-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
}
.small-input  { width: 120px; }
.medium-input { width: 150px; }
.long-input   { width: 300px; }
.tiny-input   { width: 55px; text-align: center; }

/* ── Body ── */
.form-body { font-size: 1rem; line-height: 1.8; text-align: justify; margin-bottom: 30px; }
.form-group-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.form-group-row label { margin-right: 3px; }

/* ── Capital grid ── */
.capital-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.capital-row  { display: flex; align-items: center; gap: 8px; }
.capital-row label { min-width: 100px; }
.capital-row input {
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  padding: 4px 8px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1rem;
  width: 130px;
}
.capital-row input:focus { border-color: #2563eb; }

/* ── Kaifiyat ── */
.kaifiyat-section { margin-top: 16px; }
.kaifiyat-box {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 8px;
  resize: vertical;
  margin-top: 5px;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 3px;
}
.kaifiyat-box:focus { outline: none; border-color: #2563eb; }

/* ── Declaration ── */
.declaration-section { margin-top: 20px; }
.declaration-section p { margin-bottom: 10px; }

/* ── Designation ── */
.designation-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 40px;
  margin-right: 20px;
}
.designation-section input {
  width: 220px;
  max-width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  padding: 5px;
}
.designation-section select {
  width: 220px;
  max-width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  background-color: #fff;
}
.designation-section select:focus { outline: none; border-color: #2563eb; }

/* ── Applicant details box ── */
.applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 20px;
  border-radius: 4px;
}
.applicant-details-box h3 { color: #777; font-size: 1.1rem; margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.business-registration-container .applicant-details-box .details-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 18px !important;
}
.business-registration-container .applicant-details-box .detail-input { max-width: 400px; width: 100%; }
.detail-group  { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.9rem;
  background: #fff;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.birf-toast {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.92rem;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: birf-toast-in 0.25s ease;
  max-width: 360px;
}
.birf-toast--success { background: #1a7f3c; color: #fff; }
.birf-toast--error   { background: #c0392b; color: #fff; }
@keyframes birf-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: filter 0.15s;
}
.save-print-btn:hover:not(:disabled) { filter: brightness(0.9); }
.save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .business-registration-container { padding: 20px 14px; }
  .top-bar-title   { flex-direction: column; gap: 4px; }
  .capital-grid    { grid-template-columns: 1fr; }
  .form-group-row  { flex-direction: column; align-items: flex-start; }
  .birf-toast      { right: 12px; left: 12px; max-width: none; }
  .photo-box-container { position: static; margin: 10px auto; text-align: center; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */
const CAPITAL_FIELDS = [
  ["authorized_capital", "अधिकृत पूँजी"],
  ["current_capital",    "चालू पूँजी"],
  ["issued_capital",     "जारी पूँजी"],
  ["fixed_capital",      "स्थिर पूँजी"],
  ["paidup_capital",     "चुक्ता पूँजी"],
  ["total_capital",      "कुल पूँजी"],
];

const makeInitialForm = (user) => ({
  registration_no:            "",
  certificate_date:           new Date().toISOString().slice(0, 10),
  issue_date_label:           new Date().toISOString().slice(0, 10),
  full_name:                  "",
  citizenship_no:             "",
  citizenship_issue_date:     "",
  citizenship_issue_district: "",
  municipality:               MUNICIPALITY.name,
  ward_no:                    user?.ward || "",
  tole:                       "",
  residence_district:         MUNICIPALITY.city || "",
  father_name:                "",
  spouse_name:                "",
  business_name:              "",
  business_kind:              "",
  business_nature:            "",
  business_road:              "",
  business_address_line:      "",
  business_address_district:  "",
  business_address_ward:      "",
  business_address_tole:      "",
  declaration_text:           "",
  issuing_signature:          "",
  issuing_seal:               "",
  phone:                      "",
  mobile:                     "",
  email:                      "",
  pan_vat:                    "",
  website:                    "",
  objective:                  "",
  other_registration_no:      "",
  other_registration_office:  "",
  landlord_name:              "",
  landlord_cit_no:            "",
  landlord_issue_date:        "",
  landlord_issue_district:    "",
  landlord_address:           "",
  landlord_district:          "",
  landlord_municipality:      "",
  landlord_ward:              "",
  landlord_tole:              "",
  landlord_phone:             "",
  authorized_capital:         "",
  current_capital:            "",
  issued_capital:             "",
  fixed_capital:              "",
  paidup_capital:             "",
  total_capital:              "",
  kaifiyat:                   "",
  issuing_name:               "",
  issuing_post:               "",
  issuing_date:               new Date().toISOString().slice(0, 10),
  applicantName:              "",
  applicantAddress:           "",
  applicantCitizenship:       "",
  applicantPhone:             "",
});

/* ─────────────────────────── Component ─────────────────────────── */
const BusinessIndustryRegistrationForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState(() => makeInitialForm(user));
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Single save function — one POST, no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;
    setToast(null);

    // Basic validation
    if (!formData.full_name?.trim()) {
      showToast("error", "पूरा नाम आवश्यक छ");
      return;
    }
    if (!formData.business_name?.trim()) {
      showToast("error", "व्यवसायको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        ward_no:            user?.ward || formData.ward_no,
        municipality:       MUNICIPALITY.name,
        authorized_capital: Number(formData.authorized_capital) || null,
        current_capital:    Number(formData.current_capital)    || null,
        issued_capital:     Number(formData.issued_capital)     || null,
        fixed_capital:      Number(formData.fixed_capital)      || null,
        paidup_capital:     Number(formData.paidup_capital)     || null,
        total_capital:      Number(formData.total_capital)      || null,
      };

      const res = await axios.post(API_URL, payload);

      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          showToast("success", `रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
        }
        setFormData(makeInitialForm(user));
      } else {
        showToast("error", "अनपेक्षित प्रतिक्रिया: " + res.status);
      }
    } catch (err) {
      console.error("submit error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्दा समस्या आयो";
      showToast("error", msg);
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
          .copy-mark { color: #c0392b; font-size: 8pt; position: absolute; left: 6px; top: 74px; }
          .mun-name { color: #c0392b; font-size: 20pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 15pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .cert-title { color: #c0392b; font-size: 15pt; font-weight: 700; text-decoration: underline; margin-top: 10px; }
          .photo-box { position: absolute; top: 40px; right: 0; width: 90px; height: 110px; border: 1px solid #000; }
          .reg-info { display: flex; justify-content: space-between; margin: 18px 0; font-weight: 700; font-size: 11pt; }
          .section-label { font-weight: 700; margin: 12px 0 6px; }
          .line { margin-bottom: 6px; font-size: 11pt; }
          /* value sizes to content — small values stay tight, long ones don't clip/merge */
          .value { font-weight: bold; padding: 0 4px; }
          .cap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin: 8px 0 16px; }
          .cap-row { font-size: 11pt; }
          .kaifiyat { margin-top: 12px; }
          .declaration { margin-top: 18px; font-size: 11pt; }
          .declaration p { margin-bottom: 10px; }
          .sign-line { margin-top: 4px; }
          .designation { text-align: right; margin-top: 36px; margin-right: 10px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 22px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="${MUNICIPALITY.logoSrc || "/nepallogo.svg"}" alt="Nepal" />
          <div class="copy-mark">प्रतिलिपि</div>
          <div class="photo-box"></div>
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardLabel}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
          <div class="cert-title">व्यवसाय दर्ता प्रमाण पत्र</div>
        </div>

        <div class="reg-info">
          <div>दर्ता नं : <span class="value">${v(formData.registration_no)}</span></div>
          <div>मिति : <span class="value">${v(formData.issue_date_label)}</span></div>
        </div>

        <div class="section-label">(क) व्यवसाय व्यवसायीको विवरण :-</div>

        <div class="line">१. पूरा नाम, थर : <span class="value">${v(formData.full_name)}</span></div>
        <div class="line">२. नागरिकता नं : <span class="value">${v(formData.citizenship_no)}</span>
          जारी मिति : <span class="value">${v(formData.citizenship_issue_date)}</span>
          जिल्ला : <span class="value">${v(formData.citizenship_issue_district)}</span></div>
        <div class="line">३. गाउँपालिका/नगरपालिका : <span class="value">${MUNICIPALITY.name}</span>
          वडा नं : <span class="value">${v(formData.ward_no)}</span>
          टोल : <span class="value">${v(formData.tole)}</span>
          जिल्ला : <span class="value">${MUNICIPALITY.city || ""}</span></div>
        <div class="line">४. बाबुको नाम, थर : <span class="value">${v(formData.father_name)}</span></div>
        <div class="line">५. पति/पत्नीको नाम, थर : <span class="value">${v(formData.spouse_name)}</span></div>
        <div class="line">६. व्यवसायको नाम : <span class="value">${v(formData.business_name)}</span>
          व्यवसायको किसिम : <span class="value">${v(formData.business_kind)}</span></div>
        <div class="line">ख. व्यवसायको किसिम/प्रकृति : <span class="value">${v(formData.business_nature)}</span></div>
        <div class="line">ग. व्यवसाय रहेको बाटोको नाम : <span class="value">${v(formData.business_road)}</span></div>

        <div class="section-label">१. व्यवसायको ठेगाना</div>
        <div class="line">
          <span class="value">${v(formData.business_address_line)}</span> जिल्ला,
          <span class="value">${v(formData.business_address_district)}</span>
          गाउँपालिका/नगरपालिका वडा नं
          <span class="value">${v(formData.business_address_ward)}</span>
          टोल: <span class="value">${v(formData.business_address_tole)}</span>
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
          ना.प्र.नं <span class="value">${v(formData.landlord_cit_no)}</span>
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

        <div class="kaifiyat">कैफियत : <span class="value">${v(formData.kaifiyat)}</span></div>

        <div class="declaration">
          <p>................................................</p>
          <p style="font-weight:700;text-decoration:underline">व्यवसायीको छाप</p>
          <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
          <p>................................................</p>
          <p style="font-weight:700">निवेदकको दस्तखत</p>
        </div>

        <div class="designation">
          <div class="value">${v(formData.issuing_name)}</div>
          <div>${v(formData.issuing_post)}</div>
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
      showToast("error", "कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
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

  return (
    <>
      <style>{styles}</style>

      <form
        className="business-registration-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* Toast */}
        {toast && (
          <div className={`birf-toast birf-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          व्यवसाय/उद्योग दर्ता
          <span className="top-right-bread">व्यापार / व्यवसाय &gt; व्यवसाय/उद्योग दर्ता</span>
        </div>

        {/* Certificate header — MunicipalityHeader + photo box + title */}
        <div className="cert-header-wrap">
          <div className="photo-box-container">
            <div className="photo-box" />
          </div>
          <MunicipalityHeader />
          <p className="copy-mark">प्रतिलिपि</p>
          <h3 className="certificate-title red-text underline-text">व्यवसाय दर्ता प्रमाण पत्र</h3>
        </div>

        {/* Registration info */}
        <div className="reg-info-row">
          <div className="left-info">
            <label>दर्ता नं :</label>
            <input type="text" name="registration_no" value={formData.registration_no} onChange={handleChange} className="field-input small-input" />
          </div>
          <div className="right-info">
            <label>मिति :</label>
            <input type="date" name="issue_date_label" value={formData.issue_date_label} onChange={handleChange} className="field-input medium-input" />
          </div>
        </div>

        {/* Form body */}
        <div className="form-body">
          <p>(क) व्यवसाय व्यवसायीको विवरण :-</p>

          <div className="form-group-row">
            <label>१. पूरा नाम, थर : <span className="red">*</span></label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="field-input long-input" />
          </div>

          <div className="form-group-row">
            <label>२. नागरिकता नं :</label>
            <input type="text" name="citizenship_no" value={formData.citizenship_no} onChange={handleChange} className="field-input medium-input" />
            <label>जारी मिति :</label>
            <input type="text" name="citizenship_issue_date" value={formData.citizenship_issue_date} onChange={handleChange} className="field-input medium-input" />
            <label>जिल्ला :</label>
            <input type="text" name="citizenship_issue_district" value={formData.citizenship_issue_district} onChange={handleChange} className="field-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>३. गाउँपालिका/नगरपालिका : {MUNICIPALITY.name}</label>
            <label style={{ marginLeft: "20px" }}>वडा नं : {user?.ward || ""}</label>
            <label style={{ marginLeft: "20px" }}>टोल : <span className="red">*</span></label>
            <input type="text" name="tole" value={formData.tole} onChange={handleChange} className="field-input medium-input" />
            <label style={{ marginLeft: "20px" }}>जिल्ला : {MUNICIPALITY.city || ""}</label>
          </div>

          <div className="form-group-row">
            <label>४. बाबुको नाम, थर :</label>
            <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="field-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>५. पति/पत्नीको नाम ,थर :</label>
            <input type="text" name="spouse_name" value={formData.spouse_name} onChange={handleChange} className="field-input medium-input" />
            <span className="small-text">(बाबुको नाम उल्लेख नभएको भए मात्र)</span>
          </div>

          <div className="form-group-row">
            <label>६. व्यवसायको नाम : <span className="red">*</span></label>
            <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className="field-input medium-input" />
            <label>व्यवसायको किसिम : <span className="red">*</span></label>
            <input type="text" name="business_kind" value={formData.business_kind} onChange={handleChange} className="field-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>ख. व्यवसायको किसिम/प्रकृति : <span className="red">*</span></label>
            <input type="text" name="business_nature" value={formData.business_nature} onChange={handleChange} className="field-input long-input" />
          </div>

          <div className="form-group-row">
            <label>ग. व्यवसाय रहेको बाटोको नाम <span className="red">*</span></label>
            <input type="text" name="business_road" value={formData.business_road} onChange={handleChange} className="field-input long-input" />
          </div>

          <p>१. व्यवसायको ठेगाना</p>
          <div className="form-group-row">
            <input name="business_address_line"     value={formData.business_address_line}     onChange={handleChange} className="field-input medium-input" />
            <label>जिल्ला,</label>
            <input name="business_address_district" value={formData.business_address_district} onChange={handleChange} className="field-input medium-input" />
            <label>गाउँपालिका/नगरपालिका</label>
            <label>वडा नं</label>
            <input name="business_address_ward"     value={formData.business_address_ward}     onChange={handleChange} className="field-input tiny-input" />
            <label>टोल:</label>
            <input name="business_address_tole"     value={formData.business_address_tole}     onChange={handleChange} className="field-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>फोन नं.:</label>
            <input name="phone"  value={formData.phone}  onChange={handleChange} className="field-input medium-input" />
            <label>मोबाइल नं. <span className="red">*</span></label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} className="field-input medium-input" />
            <label>इमेल: <span className="red">*</span></label>
            <input name="email"  value={formData.email}  onChange={handleChange} className="field-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>पान/ भ्याट नं. : <span className="red">*</span></label>
            <input name="pan_vat" value={formData.pan_vat} onChange={handleChange} className="field-input medium-input" />
            <label>वेबसाईट : <span className="red">*</span></label>
            <input name="website" value={formData.website} onChange={handleChange} className="field-input medium-input" />
          </div>

          <div className="form-group-row">
            <label>२. उद्देश्य : <span className="red">*</span></label>
            <input name="objective" value={formData.objective} onChange={handleChange} className="field-input long-input" />
          </div>

          <div className="form-group-row">
            <label>अन्यत्र दर्ता भएको भए: दर्ता नं :</label>
            <input name="other_registration_no"     value={formData.other_registration_no}     onChange={handleChange} className="field-input medium-input" />
            <label>कार्यालय :</label>
            <input name="other_registration_office" value={formData.other_registration_office} onChange={handleChange} className="field-input medium-input" />
          </div>

          <p>ग. बहालमा बसेको भए</p>
          <div className="form-group-row">
            <label>१. घरधनीको नाम, थर:</label>
            <input name="landlord_name"           value={formData.landlord_name}           onChange={handleChange} className="field-input medium-input" />
            <label>ना.प्र.नं</label>
            <input name="landlord_cit_no"         value={formData.landlord_cit_no}         onChange={handleChange} className="field-input medium-input" />
            <label>जारी मिति:</label>
            <input name="landlord_issue_date"     value={formData.landlord_issue_date}     onChange={handleChange} className="field-input medium-input" />
            <label>जारी जिल्ला:</label>
            <input name="landlord_issue_district" value={formData.landlord_issue_district} onChange={handleChange} className="field-input medium-input" />
          </div>
          <div className="form-group-row">
            <label>ठेगाना:</label>
            <input name="landlord_address"      value={formData.landlord_address}      onChange={handleChange} className="field-input medium-input" />
            <label>जिल्ला:</label>
            <input name="landlord_district"     value={formData.landlord_district}     onChange={handleChange} className="field-input medium-input" />
            <label>नगरपालिका:</label>
            <input name="landlord_municipality" value={formData.landlord_municipality} onChange={handleChange} className="field-input medium-input" />
          </div>
          <div className="form-group-row">
            <label>वडा नं.:</label>
            <input name="landlord_ward"  value={formData.landlord_ward}  onChange={handleChange} className="field-input tiny-input" />
            <label>टोल:</label>
            <input name="landlord_tole"  value={formData.landlord_tole}  onChange={handleChange} className="field-input medium-input" />
            <label>फोन नं.:</label>
            <input name="landlord_phone" value={formData.landlord_phone} onChange={handleChange} className="field-input medium-input" />
          </div>

          <p>२. पूँजी:</p>
          <p>कम्पनीको हकमा</p>
          <div className="capital-grid">
            {CAPITAL_FIELDS.map(([name, label]) => (
              <div className="capital-row" key={name}>
                <label>{label} : <span className="red">*</span></label>
                <input name={name} value={formData[name]} onChange={handleChange} />
              </div>
            ))}
          </div>

          <div className="kaifiyat-section">
            <label>कैफियत</label>
            <textarea name="kaifiyat" value={formData.kaifiyat} onChange={handleChange} className="kaifiyat-box" rows="3" />
          </div>

          <div className="declaration-section">
            <p>................................................</p>
            <p className="bold-text underline-text">व्यवसायीको छाप</p>
            <p>माथि मैले भरेको विवरण ठीक साँचो हो झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो निवेदन तपाइहरु सम्मुख मार्फत नगरपालिका कार्यालयमा चढाएको छु ।</p>
            <p>................................................</p>
            <p className="bold-text">निवेदकको दस्तखत</p>
          </div>
        </div>

        {/* Designation */}
        <div className="designation-section">
          <input type="text" name="issuing_name" value={formData.issuing_name} onChange={handleChange} placeholder="हस्ताक्षरकर्ताको नाम" />
          <select name="issuing_post" value={formData.issuing_post} onChange={handleChange}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="सचिव">सचिव</option>
            <option value="अध्यक्ष">अध्यक्ष</option>
            <option value="का.वा अध्यक्ष">का.वा अध्यक्ष</option>
          </select>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Footer buttons */}
        <div className="form-footer">
          <button
            type="submit"
            className="save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#34495e" }}
          >
            {loading ? "सेभ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "सेभ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default BusinessIndustryRegistrationForm;