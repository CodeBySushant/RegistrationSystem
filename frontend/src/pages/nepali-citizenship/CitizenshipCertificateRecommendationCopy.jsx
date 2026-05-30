// src/pages/nepali-citizenship/CitizenshipCertificateRecommendationCopy.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const FORM_KEY = "citizenship-certificate-copy";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES — all classes prefixed "ccrc-"
───────────────────────────────────────────────────────────────────────────── */
const styles = `
.ccrc-container {
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
  box-sizing: border-box;
}

/* ── Utility ── */
.ccrc-bold      { font-weight: bold; }
.ccrc-underline { text-decoration: underline; text-underline-offset: 4px; }
.ccrc-center    { text-align: center; }
.ccrc-text-right { text-align: right; }
.ccrc-uppercase  { text-transform: uppercase; }
.ccrc-mt-10 { margin-top: 10px; }
.ccrc-mt-20 { margin-top: 20px; }
.ccrc-mt-30 { margin-top: 30px; }
.ccrc-mb-10 { margin-bottom: 10px; }
.ccrc-mb-20 { margin-bottom: 20px; }

/* ── Top bar ── */
.ccrc-top-bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ccrc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Addressee header ── */
.ccrc-addressee-block {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.05rem;
  line-height: 1.9;
}
.ccrc-addressee-block p {
  margin: 4px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

/* ── Subject ── */
.ccrc-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Body ── */
.ccrc-body        { font-size: 1.05rem; line-height: 1.9; }
.ccrc-body-paragraph { line-height: 2.4; text-align: justify; margin: 12px 0; }
.ccrc-indent { text-indent: 40px; }

/* ── Inputs — now white bg + border + radius (was dotted-bottom) ── */
.ccrc-input {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  outline: none;
  padding: 4px 8px;
  margin: 0 2px;
  font-family: inherit;
  font-size: 1rem;
  color: #000;
  box-sizing: border-box;
  vertical-align: middle;
  display: inline-block;
}
.ccrc-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.12); }
.ccrc-select {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  padding: 4px 6px;
  margin: 0 2px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  vertical-align: middle;
}

.ccrc-tiny    { width: 60px;  text-align: center; }
.ccrc-small   { width: 110px; }
.ccrc-medium  { width: 160px; }
.ccrc-long    { width: 250px; }
.ccrc-xlong   { width: 360px; }
.ccrc-date    { width: 170px; }

.ccrc-en-label { font-family: 'Arial', sans-serif; font-size: 0.92rem; }

/* ── Red * wrapper ── */
.ccrc-req-wrap {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.ccrc-req-wrap.ccrc-req-block { display: block; width: 100%; }
.ccrc-req-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 13px;
  z-index: 1;
}
.ccrc-req-wrap input { padding-left: 18px; }

/* ── Details box (restructured) ── */
.ccrc-details-box {
  border: 1px solid #999;
  border-radius: 6px;
  padding: 18px 22px;
  background-color: rgba(255,255,255,0.55);
  margin: 14px 0;
}
.ccrc-details-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.05rem;
  margin: 16px 0 12px;
}
.ccrc-section-row {
  display: grid;
  gap: 14px 18px;
  margin-bottom: 14px;
  align-items: start;
}
.ccrc-cols-1 { grid-template-columns: 1fr; }
.ccrc-cols-2 { grid-template-columns: 1fr 1fr; }
.ccrc-cols-3 { grid-template-columns: 1fr 1fr 1fr; }
.ccrc-field { display: flex; flex-direction: column; gap: 4px; }
.ccrc-field > label { font-size: 0.92rem; font-weight: 600; color: #333; }
.ccrc-field .ccrc-req-wrap,
.ccrc-field .ccrc-select { width: 100%; }
.ccrc-field input { width: 100%; }
.ccrc-section-label {
  grid-column: 1 / -1;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 2px;
  font-size: 0.98rem;
}

/* ── Thumbprint & signature ── */
.ccrc-sig-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap;
}
.ccrc-thumb-container { width: 200px; text-align: center; }
.ccrc-thumb-title {
  margin-bottom: 5px;
  font-size: 0.9rem;
  border-bottom: 1px solid #000;
  display: inline-block;
  padding: 0 20px;
}
.ccrc-thumb-boxes { display: flex; justify-content: center; }
.ccrc-thumb-box {
  width: 80px;
  height: 100px;
  border: 1px solid #000;
  border-right: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
  font-size: 0.8rem;
}
.ccrc-thumb-box:last-child { border-right: 1px solid #000; }
.ccrc-sig-block { text-align: right; font-size: 1.05rem; flex: 1; min-width: 250px; }
.ccrc-sig-block p { margin: 10px 0; }
.ccrc-sig-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
}

/* ── Recommendation box ── */
.ccrc-recommendation-box {
  border: 1px solid #999;
  border-radius: 6px;
  padding: 20px;
  background-color: rgba(255,255,255,0.45);
  margin-top: 30px;
}
.ccrc-rec-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.ccrc-photo-container { width: 150px; }
.ccrc-photo-box {
  width: 120px;
  height: 140px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.85rem;
  padding: 10px;
  box-sizing: border-box;
}
.ccrc-office-stamp-container { flex: 1; padding-top: 20px; min-width: 200px; text-align: center; }
.ccrc-rec-signatory-container { width: 280px; text-align: right; }

/* ── Bottom admin ── */
.ccrc-bottom-admin p { margin: 5px 0; line-height: 1.6; }

/* ── Signer name input — white bg + margin ── */
.ccrc-sig-name-input {
  width: 200px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  padding: 5px 10px;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  box-sizing: border-box;
}

/* ── Toast ── */
.ccrc-toast {
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
  animation: ccrc-toast-in 0.25s ease;
  max-width: 380px;
}
.ccrc-toast--success { background: #1a7f3c; color: #fff; }
.ccrc-toast--error   { background: #c0392b; color: #fff; }
@keyframes ccrc-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.ccrc-footer { text-align: center; margin-top: 40px; }
.ccrc-save-btn {
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: filter 0.2s;
  margin: 0 6px;
}
.ccrc-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
.ccrc-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.ccrc-copyright {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Hide on print ── */
.ccrc-hide-print { /* default display preserved on screen */ }
@media print {
  .ccrc-hide-print { display: none !important; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ccrc-container { padding: 20px 14px; }
  .ccrc-tiny, .ccrc-small, .ccrc-medium, .ccrc-long, .ccrc-xlong, .ccrc-date {
    width: 100% !important;
    margin: 4px 0;
  }
  .ccrc-req-wrap { display: block; width: 100%; }
  .ccrc-cols-2, .ccrc-cols-3 { grid-template-columns: 1fr; }
  .ccrc-sig-flex { flex-direction: column; align-items: stretch; }
  .ccrc-sig-block { text-align: left; min-width: 0; }
  .ccrc-sig-row { justify-content: flex-start; }
  .ccrc-rec-footer { flex-direction: column; align-items: stretch; }
  .ccrc-rec-signatory-container { width: 100%; text-align: left; }
  .ccrc-sig-name-input { width: 100%; }
  .ccrc-footer { display: flex; flex-direction: column; gap: 10px; }
  .ccrc-footer button { width: 100%; margin: 0; }
}
`;

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS / CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const CIT_TYPE_OPTIONS = ["नागरिकताको किसिम", "वंशज", "अंगीकृत", "जन्म"];

const buildInitialState = (ward) => ({
  // Addressee
  addressee_title:         "प्रमुख जिल्ला अधिकारी",
  recipient_office_type:   "जिल्ला",
  recipient_district:      MUNICIPALITY?.city || "",

  // Body intro
  issue_office_district:   MUNICIPALITY?.city || "",
  copy_reason:             "झुत्रो भएको",

  // Details — basics
  prpn_no:                 "",
  issue_date:              "",
  certificate_type:        "नागरिकताको किसिम",
  full_name_np:            "",
  full_name_en:            "",
  sex_np:                  "पुरुष",
  sex_en:                  "Male",
  birth_place_np:          "",
  birth_place_en:          "",

  // Permanent address (NP)
  perm_district_np:        MUNICIPALITY?.city || "",
  perm_local_np:           MUNICIPALITY?.name || "",
  perm_ward_np:            ward ? String(ward) : "१",

  // Permanent address (EN) — was hardcoded "Kathmandu"
  perm_district_en:        MUNICIPALITY?.city || "",
  perm_local_en:           MUNICIPALITY?.englishName || MUNICIPALITY?.name || "",
  perm_ward_en:            ward ? String(ward) : "1",

  // DOB
  dob_bs:                  "",
  dob_ad:                  "",

  // Father / Mother / Spouse
  father_name:             "",
  father_address:          "",
  father_cit_type:         "नागरिकताको किसिम",
  mother_name:             "",
  mother_address:          "",
  mother_cit_type:         "नागरिकताको किसिम",
  spouse_name:             "",
  spouse_address:          "",
  spouse_cit_type:         "नागरिकताको किसिम",

  // Issuing office reference
  issued_office:           "",
  issued_no:               "",

  // Applicant signature
  applicant_sign_name:     "",
  applicant_sign_date:     new Date().toISOString().slice(0, 10),

  // Recommendation
  rec_birth_local:         "",
  rec_birth_ward:          ward ? String(ward) : "१",
  rec_birth_date:          "",
  rec_current_local:       MUNICIPALITY?.name || "",
  rec_current_ward:        ward ? String(ward) : "१",
  rec_guardian_title:      "श्रीमान्",
  rec_guardian_name:       "",
  rec_relation_type:       "छोरा",
  rec_applicant_title:     "श्री",
  rec_applicant_name:      "",
  rec_cit_no:              "",
  rec_cit_date:            "",
  rec_cit_reason:          "झुत्रो भएको",
  rec_signatory_name:      "",
  rec_signatory_position:  "वडा अध्यक्ष",

  // Bottom admin
  bottom_date:             new Date().toISOString().slice(0, 10),
  bottom_admin_district:   MUNICIPALITY?.city || "",
  bottom_applicant_name:   "",
  bottom_applicant_relation: "",
  bottom_sanakhat_name:    "",

  // ApplicantDetailsNp footer
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no: "",
  applicant_phone:         "",

  notes:                   "",
});

const validate = (form) => {
  if (!form.full_name_np?.trim())   return "पूरा नाम (नेपाली) आवश्यक छ।";
  if (!form.full_name_en?.trim())   return "FULL NAME (English) आवश्यक छ।";
  if (!form.applicant_sign_name?.trim()) return "निवेदकको हस्ताक्षरमा नाम आवश्यक छ।";
  if (!form.rec_signatory_name?.trim())  return "सिफारिस गर्नेको नाम आवश्यक छ।";
  return null;
};

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipCertificateRecommendationCopy() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({
        ...prev,
        perm_ward_np:     String(user.ward),
        perm_ward_en:     String(user.ward),
        rec_birth_ward:   String(user.ward),
        rec_current_ward: String(user.ward),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    setToast(null);

    const err = validate(form);
    if (err) {
      showToast("error", err);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      if (shouldPrint) {
        handleCleanPrint();
      } else {
        showToast("success", `रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      }
      setForm(buildInitialState(user?.ward));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "सेभ हुन सकेन";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated window ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>नागरिकता प्रमाण-पत्र प्रतिलिपि सिफारिस</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 12mm 18mm;
            font-size: 10.5pt;
            line-height: 1.7;
          }
          .header { text-align: center; margin-bottom: 16px; position: relative; min-height: 80px; }
          .logo { position: absolute; left: 0; top: 0; width: 65px; }
          .mun-name { color: #c0392b; font-size: 18pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 15pt; font-weight: 700; margin: 2px 0; }
          .addr { color: #c0392b; font-size: 9.5pt; }
          .subject { text-align: center; font-weight: bold; font-size: 11pt; margin: 16px 0; text-decoration: underline; }
          .addressee { margin-bottom: 14px; font-size: 10.5pt; line-height: 1.9; }
          .body-text { font-size: 10.5pt; line-height: 2.0; text-align: justify; margin-bottom: 12px; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .details-box { border: 1px solid #999; padding: 12px 16px; margin: 12px 0; border-radius: 3px; }
          .details-title { text-align: center; font-weight: bold; font-size: 10.5pt; margin-bottom: 10px; }
          .row { display: grid; gap: 6px 14px; margin-bottom: 8px; }
          .cols-1 { grid-template-columns: 1fr; }
          .cols-2 { grid-template-columns: 1fr 1fr; }
          .cols-3 { grid-template-columns: 1fr 1fr 1fr; }
          .field { display: flex; flex-wrap: wrap; gap: 4px; font-size: 9.8pt; line-height: 1.5; }
          .field .label { font-weight: 600; min-width: 0; }
          .section-label { font-weight: bold; font-size: 10pt; margin-top: 6px; }
          .sig-flex { display: flex; justify-content: space-between; align-items: flex-start; margin: 24px 0; }
          .thumb { display: flex; flex-direction: column; align-items: center; }
          .thumb-row { display: flex; }
          .thumb-cell { width: 70px; height: 90px; border: 1px solid #555; font-size: 9pt; text-align: center; padding-top: 4px; }
          .thumb-cell + .thumb-cell { border-left: 0; }
          .sig-right { text-align: right; font-size: 10.5pt; }
          .rec-box { border: 1px solid #999; padding: 14px 16px; margin-top: 18px; border-radius: 3px; }
          .rec-title { text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 10px; font-size: 11pt; }
          .rec-footer { display: flex; justify-content: space-between; margin-top: 16px; }
          .photo-box { width: 100px; height: 120px; border: 1px solid #555; font-size: 8.5pt; padding: 6px; text-align: center; display: flex; align-items: center; justify-content: center; }
          .stamp-block { flex: 1; text-align: center; padding-top: 16px; }
          .sig-block-right { width: 220px; text-align: right; font-size: 10pt; }
          .sig-block-right p { margin: 5px 0; }
          .bottom-admin { text-align: center; margin-top: 24px; font-size: 10.5pt; line-height: 1.8; }
          .applicant-box { border: 1px solid #999; padding: 12px 14px; margin-top: 18px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 8px; font-size: 10pt; }
          .applicant-row { display: flex; margin-bottom: 5px; font-size: 9.8pt; }
          .applicant-label { min-width: 140px; font-weight: 600; }
          .applicant-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine || ""}</div>
          <div class="addr">${MUNICIPALITY.provinceLine || ""}</div>
        </div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_title || ""}</span> ज्यू,<br/>
          <span class="value">${form.recipient_office_type || ""}</span> प्रशासन कार्यालय,<br/>
          <span class="value">${form.recipient_district || ""}</span> ।
        </div>

        <div class="subject">विषय: नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ ।</div>

        <div class="body-text">
          महोदय,<br/>
          मैले जिल्ला <span class="value">${form.issue_office_district || ""}</span>
          प्रशासन कार्यालयबाट देहायको विवरण भएको नेपाली नागरिकता प्रमाणपत्र लिएकोमा सो प्रमाणपत्रको सक्कल
          <span class="value">${form.copy_reason || ""}</span>
          हुँदा सोको प्रतिलिपि पाउनको लागि यो नागरिकता प्रमाणपत्रको प्रति संलग्न राखि रु. १० (दश) को टिकट टाँसी सिफारिस सहित यो निवेदन पेश गरेको छु।
        </div>

        <div class="center bold" style="margin: 14px 0 6px;">मैले नागरिकताको प्रमाण-पत्र लिएको विवरण यस प्रकार छ ।</div>

        <div class="details-box">
          <div class="row cols-3">
            <div class="field"><span class="label">१. ना.प्र.प.नं.:</span><span class="value">${form.prpn_no || ""}</span></div>
            <div class="field"><span class="label">जारी मिति:</span><span class="value">${form.issue_date || ""}</span></div>
            <div class="field"><span class="label">किसिम:</span><span class="value">${form.certificate_type || ""}</span></div>
          </div>

          <div class="row cols-1">
            <div class="field"><span class="label">२. नाम, थर:</span><span class="value">${form.full_name_np || ""}</span></div>
            <div class="field"><span class="label">FULL NAME:</span><span class="value">${(form.full_name_en || "").toUpperCase()}</span></div>
          </div>

          <div class="row cols-2">
            <div class="field"><span class="label">३. लिङ्ग:</span><span class="value">${form.sex_np || ""}</span></div>
            <div class="field"><span class="label">Sex:</span><span class="value">${form.sex_en || ""}</span></div>
          </div>

          <div class="row cols-1">
            <div class="field"><span class="label">४. जन्म स्थान:</span><span class="value">${form.birth_place_np || ""}</span></div>
            <div class="field"><span class="label">PLACE OF BIRTH:</span><span class="value">${(form.birth_place_en || "").toUpperCase()}</span></div>
          </div>

          <div class="section-label">५. स्थायी बासस्थान:</div>
          <div class="row cols-3">
            <div class="field"><span class="label">जिल्ला:</span><span class="value">${form.perm_district_np || ""}</span></div>
            <div class="field"><span class="label">स्थानीय:</span><span class="value">${form.perm_local_np || ""}</span></div>
            <div class="field"><span class="label">वडा नं:</span><span class="value">${form.perm_ward_np || ""}</span></div>
          </div>
          <div class="row cols-3">
            <div class="field"><span class="label">District:</span><span class="value">${form.perm_district_en || ""}</span></div>
            <div class="field"><span class="label">Local:</span><span class="value">${form.perm_local_en || ""}</span></div>
            <div class="field"><span class="label">Ward:</span><span class="value">${form.perm_ward_en || ""}</span></div>
          </div>

          <div class="row cols-2">
            <div class="field"><span class="label">६. जन्म मिति (वि.सं.):</span><span class="value">${form.dob_bs || ""}</span></div>
            <div class="field"><span class="label">Date of birth (A.D.):</span><span class="value">${form.dob_ad || ""}</span></div>
          </div>

          <div class="section-label">७. बाबु :</div>
          <div class="row cols-3">
            <div class="field"><span class="label">नाम:</span><span class="value">${form.father_name || ""}</span></div>
            <div class="field"><span class="label">वतन:</span><span class="value">${form.father_address || ""}</span></div>
            <div class="field"><span class="label">नागरिकताको किसिम:</span><span class="value">${form.father_cit_type || ""}</span></div>
          </div>

          <div class="section-label">८. आमा :</div>
          <div class="row cols-3">
            <div class="field"><span class="label">नाम:</span><span class="value">${form.mother_name || ""}</span></div>
            <div class="field"><span class="label">वतन:</span><span class="value">${form.mother_address || ""}</span></div>
            <div class="field"><span class="label">नागरिकताको किसिम:</span><span class="value">${form.mother_cit_type || ""}</span></div>
          </div>

          <div class="section-label">९. पति/पत्नी :</div>
          <div class="row cols-3">
            <div class="field"><span class="label">नाम:</span><span class="value">${form.spouse_name || ""}</span></div>
            <div class="field"><span class="label">वतन:</span><span class="value">${form.spouse_address || ""}</span></div>
            <div class="field"><span class="label">नागरिकताको किसिम:</span><span class="value">${form.spouse_cit_type || ""}</span></div>
          </div>
        </div>

        <div class="body-text">
          माथि उल्लेखित विवरण मेरो <span class="value">${form.issued_office || ""}</span>
          कार्यालयबाट लिएको नं <span class="value">${form.issued_no || ""}</span>
          को ना.प्र.प. को व्यहोरा संग दुरुस्त छ फरक छैन। लेखिएको व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउँला ।
        </div>

        <div class="sig-flex">
          <div class="thumb">
            <div style="font-size:9pt; margin-bottom:4px;">औंठा छाप</div>
            <div class="thumb-row">
              <div class="thumb-cell">दायाँ</div>
              <div class="thumb-cell">बायाँ</div>
            </div>
          </div>
          <div class="sig-right">
            <p class="bold">भवदीय,</p>
            <p>निवेदकको दस्तखत: ........................</p>
            <p>नाम थर: <span class="value">${form.applicant_sign_name || ""}</span></p>
            <p>मिति: <span class="value">${form.applicant_sign_date || ""}</span></p>
          </div>
        </div>

        <div class="rec-box">
          <div class="rec-title">यो प्रतिलिपि ना.प्र.प. को लागि सिफारिस</div>
          <div class="body-text">
            <span class="value">${form.rec_birth_local || ""}</span> वडा नं.
            <span class="value">${form.rec_birth_ward || ""}</span> मा मिति
            <span class="value">${form.rec_birth_date || ""}</span> मा जन्म भई हाल
            <span class="value">${form.rec_current_local || ""}</span> वडा नं.
            <span class="value">${form.rec_current_ward || ""}</span> मा स्थायी रुपमा बसोबास गरी आएका यसमा लेखिएका
            <span class="value">${form.rec_guardian_title || ""}</span>
            <span class="value">${form.rec_guardian_name || ""}</span> को
            <span class="value">${form.rec_relation_type || ""}</span> को
            <span class="value">${form.rec_applicant_title || ""}</span>
            <span class="value">${form.rec_applicant_name || ""}</span> लाई म चिन्दछु । निजको माग बमोजिम उपयुक्त विवरण भएको नं
            <span class="value">${form.rec_cit_no || ""}</span> मिति
            <span class="value">${form.rec_cit_date || ""}</span> को नागरिकता प्रमाणपत्रको सक्कल प्रति
            <span class="value">${form.rec_cit_reason || ""}</span> व्यहोरा साँचो हुँदा प्रतिलिपि दिएमा फरक नपर्ने व्यहोरा सिफारिस गर्दछु । उक्त विवरण झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला ।
          </div>

          <div class="rec-footer">
            <div class="photo-box">दुवै कान देखिने हाल खिचिएको २.५ x ३ से.मी. फोटो</div>
            <div class="stamp-block">
              <p>कार्यालयको नाम र छाप</p>
              <p class="bold">${MUNICIPALITY.name}</p>
            </div>
            <div class="sig-block-right">
              <p>सिफारिस गर्नेको :</p>
              <p>दस्तखत: ........................</p>
              <p>नाम थर: <span class="value">${form.rec_signatory_name || ""}</span></p>
              <p>पद: <span class="value">${form.rec_signatory_position || ""}</span></p>
            </div>
          </div>
        </div>

        <div class="bottom-admin">
          <p>मिति <span class="value">${form.bottom_date || ""}</span></p>
          <p>जिल्ला प्रशासन कार्यालय, <span class="value">${form.bottom_admin_district || ""}</span></p>
          <p>बाट</p>
        </div>

        <div class="body-text" style="margin-top: 14px;">
          निवेदक श्री <span class="value">${form.bottom_applicant_name || ""}</span>
          नाता भएकोले निजले मागअनुसार पतिको नाम थर वतन समावेश गरि नागरिकता प्रमाणपत्रको प्रतिलिपि दिएको कुनै फरक पर्दैन।
          व्यहोरा साँचो हो, झुठो ठहरे ऐन-कानुनअनुसारको सजाय भोग्न तयार छु भनि सहिछाप गर्ने निवेदकको
          <span class="value">${form.bottom_applicant_relation || ""}</span> नाता पर्ने म
          <span class="value">${form.bottom_sanakhat_name || ""}</span>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="applicant-row"><span class="applicant-label">नाम:</span><span class="applicant-val">${form.applicant_name || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">ठेगाना:</span><span class="applicant-val">${form.applicant_address || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">नागरिकता नं.:</span><span class="applicant-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="applicant-row"><span class="applicant-label">फोन:</span><span class="applicant-val">${form.applicant_phone || ""}</span></div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
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
      <style>{styles}</style>

      <form
        className="ccrc-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* Toast */}
        {toast && (
          <div className={`ccrc-toast ccrc-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="ccrc-top-bar ccrc-hide-print">
          नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
          <span className="ccrc-breadcrumb">
            नेपाली नागरिकता &gt; नागरिकता प्रतिलिपि सिफारिस
          </span>
        </div>

        {/* Header (shared component) */}
        <MunicipalityHeader />

        {/* Addressee — title now editable */}
        <div className="ccrc-addressee-block">
          <p>
            श्री{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input
                name="addressee_title"
                className="ccrc-input ccrc-long"
                value={form.addressee_title}
                onChange={handleChange}
              />
            </span>
            {" "}ज्यु
          </p>
          <p>
            <select
              name="recipient_office_type"
              className="ccrc-select"
              value={form.recipient_office_type}
              onChange={handleChange}
            >
              <option value="जिल्ला">जिल्ला</option>
              <option value="इलाका">इलाका</option>
            </select>
            {" "}प्रशासन कार्यालय
          </p>
          <p>
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input
                name="recipient_district"
                className="ccrc-input ccrc-medium ccrc-bold"
                value={form.recipient_district}
                onChange={handleChange}
              />
            </span>
            {" "}।
          </p>
        </div>

        {/* Subject */}
        <div className="ccrc-subject">
          <p>विषय: <span className="ccrc-underline">नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।</span></p>
        </div>

        {/* Body */}
        <div className="ccrc-body">
          <p>महोदय,</p>
          <p className="ccrc-body-paragraph ccrc-indent">
            मैले जिल्ला{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input
                name="issue_office_district"
                className="ccrc-input ccrc-small"
                value={form.issue_office_district}
                onChange={handleChange}
              />
            </span>{" "}
            प्रशासन कार्यालयबाट देहायको विवरण भएको नेपाली नागरिकता प्रमाणपत्र लिएकोमा सो प्रमाणपत्रको सक्कल{" "}
            <select
              name="copy_reason"
              className="ccrc-select"
              value={form.copy_reason}
              onChange={handleChange}
            >
              <option value="झुत्रो भएको">झुत्रो भएको</option>
              <option value="हराएको">हराएको</option>
              <option value="नष्ट भएको">नष्ट भएको</option>
            </select>{" "}
            हुँदा सोको प्रतिलिपि पाउनको लागि यो नागरिकता प्रमाणपत्रको प्रति संलग्न राखि रु. १० (दश) को टिकट टाँसी सिफारिस सहित यो निवेदन पेश गरेको छु।
          </p>

          {/* Details section — properly structured grid */}
          <p className="ccrc-details-title">मैले नागरिकताको प्रमाण-पत्र लिएको विवरण यस प्रकार छ ।</p>

          <div className="ccrc-details-box">

            {/* Row 1: 3 cols */}
            <div className="ccrc-section-row ccrc-cols-3">
              <div className="ccrc-field">
                <label>१. ना.प्र.प.नं. :</label>
                <span className="ccrc-req-wrap">
                  <span className="ccrc-req-star">*</span>
                  <input name="prpn_no" className="ccrc-input" value={form.prpn_no} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>नागरिकता जारी मिति :</label>
                <span className="ccrc-req-wrap">
                  <span className="ccrc-req-star">*</span>
                  <input type="date" name="issue_date" className="ccrc-input" value={form.issue_date} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>किसिम :</label>
                <select name="certificate_type" className="ccrc-select" value={form.certificate_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: name NP + name EN (stacked, both full width) */}
            <div className="ccrc-section-row ccrc-cols-1">
              <div className="ccrc-field">
                <label>२. नाम थर :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input
                    name="full_name_np"
                    className="ccrc-input"
                    value={form.full_name_np}
                    onChange={handleChange}
                    required
                  />
                </span>
              </div>
              <div className="ccrc-field">
                <label className="ccrc-en-label">FULL NAME (IN BLOCK) :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input
                    name="full_name_en"
                    className="ccrc-input ccrc-uppercase"
                    value={form.full_name_en}
                    onChange={handleChange}
                    required
                  />
                </span>
              </div>
            </div>

            {/* Row 3: sex NP + sex EN */}
            <div className="ccrc-section-row ccrc-cols-2">
              <div className="ccrc-field">
                <label>३. लिङ्ग :</label>
                <select name="sex_np" className="ccrc-select" value={form.sex_np} onChange={handleChange}>
                  <option value="पुरुष">पुरुष</option>
                  <option value="महिला">महिला</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>
              <div className="ccrc-field">
                <label className="ccrc-en-label">Sex :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="sex_en" className="ccrc-input" value={form.sex_en} onChange={handleChange} />
                </span>
              </div>
            </div>

            {/* Row 4: birth place NP + EN (stacked) */}
            <div className="ccrc-section-row ccrc-cols-1">
              <div className="ccrc-field">
                <label>४. जन्म स्थान :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="birth_place_np" className="ccrc-input" value={form.birth_place_np} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label className="ccrc-en-label">PLACE OF BIRTH (IN BLOCK) :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="birth_place_en" className="ccrc-input ccrc-uppercase" value={form.birth_place_en} onChange={handleChange} />
                </span>
              </div>
            </div>

            {/* Row 5: permanent address (NP row + EN row) */}
            <div className="ccrc-section-label">५. स्थायी बासस्थान :</div>
            <div className="ccrc-section-row ccrc-cols-3">
              <div className="ccrc-field">
                <label>जिल्ला :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="perm_district_np" className="ccrc-input" value={form.perm_district_np} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>स्थानीय तह :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="perm_local_np" className="ccrc-input" value={form.perm_local_np} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>वडा नं :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="perm_ward_np" className="ccrc-input" value={form.perm_ward_np} onChange={handleChange} />
                </span>
              </div>
            </div>
            <div className="ccrc-section-row ccrc-cols-3">
              <div className="ccrc-field">
                <label className="ccrc-en-label">District :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="perm_district_en" className="ccrc-input ccrc-uppercase" value={form.perm_district_en} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label className="ccrc-en-label">Local :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="perm_local_en" className="ccrc-input ccrc-uppercase" value={form.perm_local_en} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label className="ccrc-en-label">Ward no :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="perm_ward_en" className="ccrc-input" value={form.perm_ward_en} onChange={handleChange} />
                </span>
              </div>
            </div>

            {/* Row 6: DOB BS + DOB AD */}
            <div className="ccrc-section-row ccrc-cols-2">
              <div className="ccrc-field">
                <label>६. जन्म मिति (वि.सं.) :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="dob_bs" className="ccrc-input" value={form.dob_bs} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label className="ccrc-en-label">Date of birth (A.D.) :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input type="date" name="dob_ad" className="ccrc-input" value={form.dob_ad} onChange={handleChange} />
                </span>
              </div>
            </div>

            {/* Father */}
            <div className="ccrc-section-label">७. बाबु :</div>
            <div className="ccrc-section-row ccrc-cols-3">
              <div className="ccrc-field">
                <label>नाम, थर :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="father_name" className="ccrc-input" value={form.father_name} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>वतन :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="father_address" className="ccrc-input" value={form.father_address} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>नागरिकताको किसिम :</label>
                <select name="father_cit_type" className="ccrc-select" value={form.father_cit_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Mother */}
            <div className="ccrc-section-label">८. आमा :</div>
            <div className="ccrc-section-row ccrc-cols-3">
              <div className="ccrc-field">
                <label>नाम, थर :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="mother_name" className="ccrc-input" value={form.mother_name} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>वतन :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="mother_address" className="ccrc-input" value={form.mother_address} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>नागरिकताको किसिम :</label>
                <select name="mother_cit_type" className="ccrc-select" value={form.mother_cit_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Spouse */}
            <div className="ccrc-section-label">९. पति/पत्नी :</div>
            <div className="ccrc-section-row ccrc-cols-3">
              <div className="ccrc-field">
                <label>नाम, थर :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="spouse_name" className="ccrc-input" value={form.spouse_name} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>वतन :</label>
                <span className="ccrc-req-wrap ccrc-req-block">
                  <span className="ccrc-req-star">*</span>
                  <input name="spouse_address" className="ccrc-input" value={form.spouse_address} onChange={handleChange} />
                </span>
              </div>
              <div className="ccrc-field">
                <label>नागरिकताको किसिम :</label>
                <select name="spouse_cit_type" className="ccrc-select" value={form.spouse_cit_type} onChange={handleChange}>
                  {CIT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

          </div>

          {/* After-details paragraph */}
          <p className="ccrc-body-paragraph ccrc-mt-20">
            माथि उल्लेखित विवरण मेरो{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input name="issued_office" className="ccrc-input ccrc-medium" value={form.issued_office} onChange={handleChange} />
            </span>{" "}
            कार्यालयबाट लिएको नं{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input name="issued_no" className="ccrc-input ccrc-small" value={form.issued_no} onChange={handleChange} />
            </span>{" "}
            को ना.प्र.प. को व्यहोरा संग दुरुस्त छ फरक छैन। लेखिएको व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउँला ।
          </p>

          {/* Thumbprint + applicant signature */}
          <div className="ccrc-sig-flex">
            <div className="ccrc-thumb-container">
              <p className="ccrc-thumb-title">औंठा छाप</p>
              <div className="ccrc-thumb-boxes">
                <div className="ccrc-thumb-box">दायाँ</div>
                <div className="ccrc-thumb-box">बायाँ</div>
              </div>
            </div>
            <div className="ccrc-sig-block">
              <p className="ccrc-bold">भवदीय,</p>
              <p>निवेदकको दस्तखत: ........................</p>
              <div className="ccrc-sig-row">
                नाम थर:{" "}
                <span className="ccrc-req-wrap">
                  <span className="ccrc-req-star">*</span>
                  <input
                    name="applicant_sign_name"
                    className="ccrc-input ccrc-medium"
                    value={form.applicant_sign_name}
                    onChange={handleChange}
                    required
                  />
                </span>
              </div>
              <div className="ccrc-sig-row">
                मिति:{" "}
                <span className="ccrc-req-wrap">
                  <span className="ccrc-req-star">*</span>
                  <input
                    type="date"
                    name="applicant_sign_date"
                    className="ccrc-input ccrc-date"
                    value={form.applicant_sign_date}
                    onChange={handleChange}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Recommendation box */}
          <div className="ccrc-recommendation-box">
            <h4 className="ccrc-center ccrc-bold ccrc-underline ccrc-mb-20">यो प्रतिलिपि ना.प्र.प. को लागि सिफारिस</h4>
            <p className="ccrc-body-paragraph">
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_birth_local"
                  className="ccrc-input ccrc-medium"
                  value={form.rec_birth_local}
                  onChange={handleChange}
                  placeholder="जन्म ठाउँ"
                />
              </span>{" "}
              वडा नं.{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_birth_ward"
                  className="ccrc-input ccrc-tiny"
                  value={form.rec_birth_ward}
                  onChange={handleChange}
                />
              </span>{" "}
              मा मिति{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  type="date"
                  name="rec_birth_date"
                  className="ccrc-input ccrc-date"
                  value={form.rec_birth_date}
                  onChange={handleChange}
                />
              </span>{" "}
              मा जन्म भई हाल{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_current_local"
                  className="ccrc-input ccrc-medium"
                  value={form.rec_current_local}
                  onChange={handleChange}
                  placeholder="हाल ठाउँ"
                />
              </span>{" "}
              वडा नं.{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_current_ward"
                  className="ccrc-input ccrc-tiny"
                  value={form.rec_current_ward}
                  onChange={handleChange}
                />
              </span>{" "}
              मा स्थायी रुपमा बसोबास गरी आएका यसमा लेखिएका{" "}
              <select name="rec_guardian_title" className="ccrc-select" value={form.rec_guardian_title} onChange={handleChange}>
                <option value="श्रीमान्">श्रीमान्</option>
                <option value="श्रीमती">श्रीमती</option>
              </select>{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_guardian_name"
                  className="ccrc-input ccrc-long"
                  value={form.rec_guardian_name}
                  onChange={handleChange}
                  placeholder="अभिभावकको नाम"
                />
              </span>{" "}
              को{" "}
              <select name="rec_relation_type" className="ccrc-select" value={form.rec_relation_type} onChange={handleChange}>
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
                <option value="पत्नी">पत्नी</option>
              </select>{" "}
              को{" "}
              <select name="rec_applicant_title" className="ccrc-select" value={form.rec_applicant_title} onChange={handleChange}>
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_applicant_name"
                  className="ccrc-input ccrc-long"
                  value={form.rec_applicant_name}
                  onChange={handleChange}
                  placeholder="निवेदकको नाम"
                />
              </span>{" "}
              लाई म चिन्दछु । निजको माग बमोजिम उपयुक्त विवरण भएको नं{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="rec_cit_no"
                  className="ccrc-input ccrc-small"
                  value={form.rec_cit_no}
                  onChange={handleChange}
                />
              </span>{" "}
              मिति{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  type="date"
                  name="rec_cit_date"
                  className="ccrc-input ccrc-date"
                  value={form.rec_cit_date}
                  onChange={handleChange}
                />
              </span>{" "}
              को नागरिकता प्रमाणपत्रको सक्कल प्रति{" "}
              <select name="rec_cit_reason" className="ccrc-select" value={form.rec_cit_reason} onChange={handleChange}>
                <option value="झुत्रो भएको">झुत्रो भएको</option>
                <option value="हराएको">हराएको</option>
                <option value="नष्ट भएको">नष्ट भएको</option>
              </select>{" "}
              व्यहोरा साँचो हुँदा प्रतिलिपि दिएमा फरक नपर्ने व्यहोरा सिफारिस गर्दछु । उक्त विवरण झुट्टा ठहरे कानुन बमोजिम सहुँला बुझाउँला ।
            </p>

            <div className="ccrc-rec-footer">
              <div className="ccrc-photo-container">
                <div className="ccrc-photo-box">
                  दुवै कान देखिने हाल<br />खिचिएको २.५ x ३<br />से.मी. फोटो
                </div>
              </div>
              <div className="ccrc-office-stamp-container">
                <p>कार्यालयको नाम र छाप</p>
                <p className="ccrc-bold">{MUNICIPALITY?.name}</p>
              </div>
              <div className="ccrc-rec-signatory-container">
                <p>सिफारिस गर्नेको :</p>
                <p>दस्तखत: ........................</p>
                <div className="ccrc-sig-row">
                  नाम थर{" "}
                  <span className="ccrc-req-wrap">
                    <span className="ccrc-req-star">*</span>
                    <input
                      name="rec_signatory_name"
                      className="ccrc-sig-name-input"
                      value={form.rec_signatory_name}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </div>
                <div className="ccrc-sig-row">
                  पद{" "}
                  <select
                    name="rec_signatory_position"
                    className="ccrc-select"
                    style={{ width: 200 }}
                    value={form.rec_signatory_position}
                    onChange={handleChange}
                  >
                    <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                    <option value="वडा सचिव">वडा सचिव</option>
                    <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom admin section */}
          <div className="ccrc-bottom-admin ccrc-center ccrc-mt-30">
            <p>
              मिति{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  type="date"
                  name="bottom_date"
                  className="ccrc-input ccrc-date"
                  value={form.bottom_date}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              जिल्ला प्रशासन कार्यालय,{" "}
              <span className="ccrc-req-wrap">
                <span className="ccrc-req-star">*</span>
                <input
                  name="bottom_admin_district"
                  className="ccrc-input ccrc-medium"
                  value={form.bottom_admin_district}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>बाट</p>
          </div>

          <p className="ccrc-body-paragraph ccrc-mt-20">
            निवेदक श्री{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input
                name="bottom_applicant_name"
                className="ccrc-input ccrc-medium"
                value={form.bottom_applicant_name}
                onChange={handleChange}
              />
            </span>{" "}
            नाता भएकोले निजले मागअनुसार पतिको नाम थर वतन समावेश गरि नागरिकता प्रमाणपत्रको प्रतिलिपि दिएको कुनै फरक पर्दैन।
            व्यहोरा साँचो हो, झुठो ठहरे ऐन-कानुनअनुसारको सजाय भोग्न तयार छु भनि सहिछाप गर्ने निवेदकको{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input
                name="bottom_applicant_relation"
                className="ccrc-input ccrc-small"
                value={form.bottom_applicant_relation}
                onChange={handleChange}
              />
            </span>{" "}
            नाता पर्ने म{" "}
            <span className="ccrc-req-wrap">
              <span className="ccrc-req-star">*</span>
              <input
                name="bottom_sanakhat_name"
                className="ccrc-input ccrc-medium"
                value={form.bottom_sanakhat_name}
                onChange={handleChange}
              />
            </span>
          </p>
        </div>

        {/* Applicant details */}
        <div className="ccrc-hide-print ccrc-mt-30">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* Footer — two buttons */}
        <div className="ccrc-footer ccrc-hide-print">
          <button
            type="submit"
            className="ccrc-save-btn"
            disabled={loading}
            style={{ backgroundColor: "#2c3e50" }}
          >
            {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="ccrc-save-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="ccrc-copyright ccrc-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
        </div>
      </form>
    </>
  );
}