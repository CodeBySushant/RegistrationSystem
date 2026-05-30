import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES — all classes prefixed "ca-"
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .ca-container {
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
  .ca-bold      { font-weight: bold; }
  .ca-underline { text-decoration: underline; text-underline-offset: 4px; }
  .ca-center    { text-align: center; }
  .ca-mt-10     { margin-top: 10px; }
  .ca-mt-20     { margin-top: 20px; }
  .ca-mb-20     { margin-bottom: 20px; }
  .ca-sep       { white-space: nowrap; flex-shrink: 0; font-size: 0.95rem; }

  /* ── Top Bar ── */
  .ca-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.05rem;
    color: #333;
  }
  .ca-breadcrumb { font-size: 0.85rem; color: #777; font-weight: normal; }

  /* ── Schedule Sections ── */
  .ca-schedule    { margin-bottom: 40px; }
  .ca-sch-header  { text-align: center; margin-bottom: 30px; }
  .ca-sch-title   { font-size: 1.1rem; margin: 0; font-weight: bold; }
  .ca-rule-text   { font-size: 0.9rem; margin: 5px 0; color: #333; }
  .ca-form-title  { font-size: 1.3rem; margin: 15px 0 10px 0; color: #333; font-weight: bold; }

  /* ── Addressee / Subject ── */
  .ca-addressee   { margin-bottom: 20px; font-size: 1rem; line-height: 2; }
  .ca-addressee p { margin: 2px 0; }
  .ca-subject     { text-align: center; margin: 30px 0; font-size: 1.05rem; font-weight: bold; }

  /* ── Form Body ── */
  .ca-body        { font-size: 1rem; line-height: 1.9; }
  .ca-para        { line-height: 2.2; text-align: justify; margin: 10px 0; }
  .ca-indent      { text-indent: 40px; }

  /* ── Inputs — now with border-radius like other forms ── */
  .ca-input {
    display: inline-block;
    height: 28px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    outline: none;
    padding: 2px 8px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 3px;
  }
  .ca-input:focus { border-color: #c0392b; background-color: #fffaf9; }

  /* ── Select ── */
  .ca-select {
    display: inline-block;
    height: 28px;
    border: 1px solid #888;
    background-color: #ffffff;
    padding: 0 4px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: middle;
    box-sizing: border-box;
  }
  .ca-select:focus { border-color: #c0392b; outline: none; }

  /* Input width variants */
  .ca-tiny   { width: 60px;  text-align: center; }
  .ca-small  { width: 110px; }
  .ca-medium { width: 160px; }
  .ca-long   { width: 250px; }
  .ca-date   { width: 150px; }

  /* ── Red * wrapper ── */
  .ca-req-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .ca-req-wrap.ca-req-block {
    display: block;
    width: 100%;
  }
  .ca-req-star {
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
  .ca-req-wrap input { padding-left: 18px; }
  .ca-req-wrap input[type="date"] { padding-left: 18px; }

  /* ── Details List ── */
  .ca-details-list   { margin-top: 20px; }
  .ca-details-indent { padding-left: 20px; }
  .ca-detail-row {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ca-detail-row label { flex-shrink: 0; line-height: 1.4; font-size: 0.95rem; }

  /* ── Family Table — restructured ── */
  .ca-family-section { margin-top: 14px; margin-bottom: 24px; }
  .ca-family-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    border: 1px solid #2c3e50;
    background-color: #fff;
  }
  .ca-family-table th {
    border: 1px solid #2c3e50;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: #2c3e50;
    color: #fff;
  }
  .ca-family-table td {
    border: 1px solid #bdc3c7;
    padding: 6px;
    background-color: #fff;
    vertical-align: middle;
  }
  .ca-table-input {
    width: 100%;
    height: 28px;
    border: 1px solid #ddd;
    background: #fff;
    outline: none;
    padding: 2px 6px 2px 18px;
    font-size: 0.9rem;
    font-family: inherit;
    box-sizing: border-box;
    border-radius: 3px;
    color: #000;
  }
  .ca-table-input:focus { border-color: #c0392b; background-color: #fffaf9; }
  .ca-action-cell { text-align: center; vertical-align: middle; width: 60px; }
  .ca-remove-btn {
    background-color: #c0392b;
    color: #fff;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
  }
  .ca-remove-btn:hover:not(:disabled) { background-color: #962d22; }
  .ca-remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .ca-add-row-btn {
    margin-top: 10px;
    background: #2c3e50;
    color: #fff;
    border: none;
    padding: 7px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.92rem;
    font-family: inherit;
  }
  .ca-add-row-btn:hover { background: #1a252f; }

  /* ── Thumbprint / Signature ── */
  .ca-sig-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;
    margin-bottom: 40px;
    gap: 20px;
    flex-wrap: wrap;
  }
  .ca-thumbprint { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .ca-thumb-title {
    font-size: 0.9rem;
    font-weight: bold;
    border-bottom: 1.5px solid #2c3e50;
    padding-bottom: 4px;
    margin: 0;
    letter-spacing: 1px;
    color: #2c3e50;
  }
  .ca-thumb-boxes {
    display: flex;
    border: 2px solid #2c3e50;
    border-radius: 4px;
    overflow: hidden;
  }
  .ca-thumb-box {
    width: 80px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 8px;
    background-color: #fafafa;
    border-right: 1.5px solid #2c3e50;
    position: relative;
  }
  .ca-thumb-box:last-child { border-right: none; }
  .ca-thumb-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #555;
    text-align: center;
    padding: 0 4px;
    background: #f0f0f0;
    border-radius: 3px;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }
  .ca-thumb-inner {
    flex: 1;
    width: 100%;
    background-image: repeating-radial-gradient(
      circle at 40px 50px,
      transparent 0px,
      transparent 8px,
      rgba(0,0,0,0.04) 8px,
      rgba(0,0,0,0.04) 9px
    );
  }
  .ca-sig-block       { text-align: right; font-size: 1rem; flex: 1; min-width: 250px; }
  .ca-sig-block p     { margin: 10px 0; }

  /* ── Recommendation ── */
  .ca-recommendation  { margin-top: 30px; }
  .ca-section-title   { font-size: 1.1rem; font-weight: bold; margin-bottom: 15px; }
  .ca-rec-sig         { text-align: right; margin-top: 30px; font-size: 1rem; }
  .ca-rec-sig p       { margin: 10px 0; }
  .ca-sig-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  /* ── Anusuchi 8 ── */
  .ca-anusuchi-8 {
    border-top: 2px dashed #666;
    padding-top: 40px;
    margin-top: 40px;
  }
  .ca-gov-header   { margin-bottom: 20px; }
  .ca-gov-header p { margin: 5px 0; font-size: 1.05rem; }
  .ca-cert-body    { font-size: 1rem; }
  .ca-cert-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ca-cert-row label { flex-shrink: 0; font-size: 0.95rem; }
  .ca-right-align    { justify-content: flex-end; }
  .ca-cert-sig       { text-align: right; margin-top: 40px; }
  .ca-cert-sig p     { margin: 10px 0; }

  /* ── Submit message ── */
  .ca-msg {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.95rem;
    margin-bottom: 12px;
    display: inline-block;
  }
  .ca-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .ca-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  /* ── Footer ── */
  .ca-footer { text-align: center; margin-top: 40px; }
  .ca-save-btn {
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    margin: 0 6px;
  }
  .ca-save-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .ca-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ca-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Hide on print (no display override for screen — would break table cells) ── */
  .ca-hide-print { /* default display preserved */ }
  @media print {
    .ca-hide-print { display: none !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .ca-container { padding: 20px 16px; }
    .ca-tiny, .ca-small, .ca-medium, .ca-long, .ca-date {
      width: 100% !important;
      margin: 4px 0;
    }
    .ca-req-wrap { display: block; width: 100%; }
    .ca-sig-flex { flex-direction: column; align-items: stretch; }
    .ca-sig-block { text-align: left; }
    .ca-footer { display: flex; flex-direction: column; gap: 10px; }
    .ca-footer button { width: 100%; margin: 0; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */
const API_URL = "/api/forms/citizenship-angkrit";

const emptyFamilyRow = () => ({ name: "", relation: "", age: "" });

const buildInitialState = (ward) => ({
  // Addressee
  addressee_title:               "प्रमुख जिल्ला अधिकारी",
  dao_district:                  MUNICIPALITY?.city || "",

  // Applicant body
  applicant_name_body:           "",
  application_fee:               "",

  // Personal details
  main_applicant_name:           "",
  birth_place:                   "",
  dob:                           "",
  perm_district:                 MUNICIPALITY?.city || "",
  perm_municipality:             MUNICIPALITY?.name || "",
  perm_ward:                     ward ? String(ward) : "१",
  perm_tole:                     "",
  father_name:                   "",
  father_nationality:            "",
  mother_name:                   "",
  mother_nationality:            "",
  husband_name:                  "",
  husband_nationality:           "",
  religion:                      "",
  education:                     "",
  occupation:                    "",
  marriage_date:                 "",
  residence_years:               "",
  language_spoken:               "नेपाली",
  foreign_citizenship_renounced: "",
  other_country_citizenship:     "नलिएको",
  nepal_business:                "",
  family_members:                [emptyFamilyRow()],
  sign_date:                     new Date().toISOString().slice(0, 10),

  // Recommendation
  rec_municipality:              MUNICIPALITY?.name || "",
  rec_ward:                      ward ? String(ward) : "१",
  rec_father_name:               "",
  rec_relation_type:             "छोरा",
  rec_name:                      "",
  rec_signatory_name:            "",
  rec_signatory_position:        "",
  rec_date:                      new Date().toISOString().slice(0, 10),

  // Certificate (Anusuchi-8)
  cert_dao_district:             MUNICIPALITY?.city || "",
  cert_no:                       "",
  cert_name:                     "",
  cert_birth_place:              "",
  cert_dob:                      "",
  cert_perm_district:            MUNICIPALITY?.city || "",
  cert_perm_municipality:        MUNICIPALITY?.name || "",
  cert_perm_ward:                ward ? String(ward) : "१",
  cert_perm_tole:                "",
  cert_father_name:              "",
  cert_father_address:           "",
  cert_father_citizenship:       "",
  cert_mother_name:              "",
  cert_mother_address:           "",
  cert_mother_citizenship:       "",
  cert_husband_name:             "",
  cert_husband_address:          "",
  cert_husband_citizenship:      "",
  cert_officer_name:             "",
  cert_officer_position:         "",
  cert_date:                     new Date().toISOString().slice(0, 10),

  // ApplicantDetailsNp footer
  applicant_name:                "",
  applicant_address:             "",
  applicant_citizenship_no:      "",
  applicant_phone:               "",

  notes:                         "",
  status:                        "pending",
});

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipAngkrit() {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* Sync ward when user loads */
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({
        ...prev,
        perm_ward:      String(user.ward),
        rec_ward:       String(user.ward),
        cert_perm_ward: String(user.ward),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ── Family row handlers ── */
  const updateFamilyRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      family_members: prev.family_members.map((r, i) =>
        i === idx ? { ...r, [key]: val } : r
      ),
    }));
  };

  const addFamilyRow = () =>
    setForm((prev) => ({
      ...prev,
      family_members: [...prev.family_members, emptyFamilyRow()],
    }));

  const removeFamilyRow = (idx) => {
    if (form.family_members.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      family_members: prev.family_members.filter((_, i) => i !== idx),
    }));
  };

  /* ── Validation ── */
  const validate = () => {
    if (!form.main_applicant_name?.trim()) return "निवेदकको नाम (फारम भित्र) आवश्यक छ।";
    if (!form.cert_name?.trim())           return "प्रमाणपत्रमा नाम आवश्यक छ।";
    return null;
  };

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        family_members:  JSON.stringify(form.family_members),
        perm_ward:       String(form.perm_ward),
        rec_ward:        String(form.rec_ward),
        cert_perm_ward:  String(form.cert_perm_ward),
      };

      const res = await axios.post(API_URL, payload);
      if (res.status === 200 || res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          setMessage({
            type: "success",
            text: "रेकर्ड सफलतापूर्वक सेभ भयो । ID: " + (res.data?.id ?? ""),
          });
        }
        setForm(buildInitialState(user?.ward));
      } else {
        throw new Error("Unexpected response: " + res.status);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "सेभ गर्न सकिएन",
      });
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

    const familyRowsHtml = form.family_members
      .map(
        (r, i) => `
        <tr>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${i + 1}</td>
          <td style="border:1px solid #555; padding:6px;">${r.name || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.relation || ""}</td>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${r.age || ""}</td>
        </tr>`
      )
      .join("");

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 18mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 20pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 16pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .anusuchi-hdr { text-align: center; margin: 24px 0 16px; }
          .anusuchi-title { font-size: 12pt; font-weight: bold; }
          .anusuchi-rule { font-size: 10pt; margin: 4px 0; }
          .form-title { font-size: 13pt; font-weight: bold; margin-top: 8px; }
          .subject { text-align: center; font-weight: bold; font-size: 11pt; margin: 14px 0; text-decoration: underline; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .body-text { font-size: 10.5pt; line-height: 2.0; text-align: justify; margin: 10px 0; }
          .detail-line { font-size: 10.5pt; line-height: 1.9; margin: 6px 0; padding-left: 20px; }
          .family-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
          .family-table th { background: #e0e0e0; border: 1px solid #555; padding: 6px; text-align: center; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .sig-flex { display: flex; justify-content: space-between; align-items: flex-end; margin: 30px 0; }
          .thumb { width: 180px; height: 110px; border: 1.5px solid #333; display: flex; }
          .thumb-half { flex: 1; border-right: 1px solid #333; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 4px; font-size: 9pt; }
          .thumb-half:last-child { border-right: none; }
          .sig-block-right { text-align: right; font-size: 10.5pt; }
          .sig-block-right p { margin: 6px 0; }
          .anusuchi-divider { border-top: 2px dashed #666; padding-top: 30px; margin-top: 30px; }
          .gov-hdr { text-align: center; margin: 10px 0 20px; }
          .gov-hdr p { font-weight: bold; margin: 4px 0; font-size: 11pt; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 6px; font-size: 10pt; }
          .field-label { min-width: 140px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <!-- ANUSUCHI 7 -->
        <div class="anusuchi-hdr">
          <div class="anusuchi-title">अनुसूची-७</div>
          <div class="anusuchi-rule">(नियम ९ को उपनियम (१), नियम १४ को उपनियम (१) र नियम १५ सँग सम्बन्धित)</div>
          <div class="form-title">अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि दिइने निवेदन</div>
        </div>

        <div class="body-text">
          श्रीमान् <span class="value">${form.addressee_title || ""}</span> ज्यू,<br/>
          जिल्ला प्रशासन कार्यालय, <span class="value">${form.dao_district || ""}</span> ।
        </div>

        <div class="subject">विषय : नेपाली नागरिकताको प्रमाण-पत्र पाऊँ ।</div>

        <div class="body-text">
          महोदय,<br/>
          मेरो जन्म नेपालमा भई नेपालमा नै स्थायी बसोबास गर्दै आएको /
          <span class="value">${form.applicant_name_body || ""}</span>
          ले जन्मको नाताले नेपाली नागरिकताको प्रमाण-पत्र पाएको हुँदा नेपाली
          नागरिकताको प्रमाण-पत्र पाउनको लागि तोकिएको दस्तुर रु.
          <span class="value">${form.application_fee || ""}</span>
          यसै साथ राखी यो निवेदन पत्र चढाएको छु ।
        </div>

        <div class="body-text" style="font-weight:bold">१. मेरो विवरण :</div>
        <div class="detail-line">(क) नाम, थर : <span class="value">${form.main_applicant_name || ""}</span></div>
        <div class="detail-line">(ख) जन्म स्थान : <span class="value">${form.birth_place || ""}</span></div>
        <div class="detail-line">(ग) जन्म मिति : <span class="value">${form.dob || ""}</span></div>
        <div class="detail-line">(घ) स्थायी ठेगाना :
          जिल्ला <span class="value">${form.perm_district || ""}</span>
          गा.पा./न.पा. <span class="value">${form.perm_municipality || ""}</span>
          वडा नं. <span class="value">${form.perm_ward || ""}</span>
          गाउँ/टोल <span class="value">${form.perm_tole || ""}</span>
        </div>
        <div class="detail-line">(ङ) बाबुको नाम, थर : <span class="value">${form.father_name || ""}</span> राष्ट्रियता : <span class="value">${form.father_nationality || ""}</span></div>
        <div class="detail-line">(च) आमाको नाम, थर : <span class="value">${form.mother_name || ""}</span> राष्ट्रियता : <span class="value">${form.mother_nationality || ""}</span></div>
        <div class="detail-line">(छ) पतिको नाम, थर : <span class="value">${form.husband_name || ""}</span> राष्ट्रियता : <span class="value">${form.husband_nationality || ""}</span></div>
        <div class="detail-line">(ज) धर्म : <span class="value">${form.religion || ""}</span></div>
        <div class="detail-line">(झ) शैक्षिक योग्यता : <span class="value">${form.education || ""}</span></div>
        <div class="detail-line">(ञ) पेशा : <span class="value">${form.occupation || ""}</span></div>
        <div class="detail-line">(ट) विवाह भएको मिति : <span class="value">${form.marriage_date || ""}</span></div>

        <div class="detail-line">२. नेपालमा बसोबास गरेको वर्ष : <span class="value">${form.residence_years || ""}</span></div>
        <div class="detail-line">३. नेपाली भाषा वा अन्य भाषा : <span class="value">${form.language_spoken || ""}</span></div>
        <div class="detail-line">४. विदेशी नागरिकता त्यागेको निस्सा : <span class="value">${form.foreign_citizenship_renounced || ""}</span></div>
        <div class="detail-line">५. अन्य देशको नागरिकता लिए/नलिएको : <span class="value">${form.other_country_citizenship || ""}</span></div>
        <div class="detail-line">६. नेपालमा पेशा/व्यवसायको विवरण : <span class="value">${form.nepal_business || ""}</span></div>

        <div class="detail-line" style="font-weight:bold; margin-top:10px;">७. सगोलका परिवारका सदस्यहरुको विवरण :</div>
        <table class="family-table">
          <thead>
            <tr>
              <th style="width:10%">क्र.स.</th>
              <th>नाम, थर</th>
              <th style="width:25%">नाता</th>
              <th style="width:15%">उमेर</th>
            </tr>
          </thead>
          <tbody>${familyRowsHtml}</tbody>
        </table>

        <div class="body-text" style="font-weight:bold">
          ८. मैले नेपाली नागरिकताको प्रमाण-पत्र पाएमा नेपाल राज्य र नेपाल सरकारप्रति बफादार रही नेपालको संविधान र प्रचलित कानुनको पूर्ण रुपले पालना गर्नेछु ।
        </div>

        <div class="sig-flex">
          <div>
            <div style="font-weight:bold; text-align:center; margin-bottom:4px;">औंठा छाप</div>
            <div class="thumb">
              <div class="thumb-half">दायाँ</div>
              <div class="thumb-half">बायाँ</div>
            </div>
          </div>
          <div class="sig-block-right">
            <p>निवेदकको सही: ........................</p>
            <p>मिति: <span class="value">${form.sign_date || ""}</span></p>
          </div>
        </div>

        <!-- Recommendation -->
        <div style="margin-top:30px;">
          <div style="text-align:center; font-weight:bold; text-decoration:underline; font-size:11pt; margin-bottom:10px;">सिफारिस</div>
          <div class="body-text">
            यसमा लेखिएको व्यहोरा ठिक साँचो हो, झुठा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनी यस
            <span class="value">${form.rec_municipality || ""}</span>
            वडा नं. <span class="value">${form.rec_ward || ""}</span>
            मा बस्ने श्री <span class="value">${form.rec_father_name || ""}</span>
            को <span class="value">${form.rec_relation_type || ""}</span>
            श्री <span class="value">${form.rec_name || ""}</span>
            ले मेरो रोहवरमा सहीछाप गरेको साँचो हो ।
          </div>
          <div class="sig-block-right">
            <p>सिफारिस गर्नेको सही: ........................</p>
            <p>नाम: <span class="value">${form.rec_signatory_name || ""}</span></p>
            <p>पद: <span class="value">${form.rec_signatory_position || ""}</span></p>
            <p>मिति: <span class="value">${form.rec_date || ""}</span></p>
          </div>
        </div>

        <!-- ANUSUCHI 8 -->
        <div class="anusuchi-divider">
          <div class="anusuchi-hdr">
            <div class="anusuchi-title">अनुसूची-८</div>
            <div class="anusuchi-rule">(नियम ९ को उपनियम (२) सँग सम्बन्धित)</div>
            <div class="form-title">अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र</div>
          </div>

          <div class="gov-hdr">
            <p>नेपाल सरकार</p>
            <p>गृह मन्त्रालय</p>
            <p>जिल्ला प्रशासन कार्यालय <span class="value">${form.cert_dao_district || ""}</span></p>
          </div>

          <div style="text-align:right; margin:10px 0;">प्रमाणपत्र नं. : <span class="value">${form.cert_no || ""}</span></div>

          <div class="detail-line">१. नाम, थर : <span class="value">${form.cert_name || ""}</span></div>
          <div class="detail-line">२. जन्म स्थान : <span class="value">${form.cert_birth_place || ""}</span></div>
          <div class="detail-line">३. जन्म मिति/उमेर : <span class="value">${form.cert_dob || ""}</span></div>
          <div class="detail-line">४. स्थायी ठेगाना :
            जिल्ला <span class="value">${form.cert_perm_district || ""}</span>
            गा.पा./न.पा. <span class="value">${form.cert_perm_municipality || ""}</span>
            वडा नं. <span class="value">${form.cert_perm_ward || ""}</span>
            टोल <span class="value">${form.cert_perm_tole || ""}</span>
          </div>
          <div class="detail-line">५. बाबुको नाम : <span class="value">${form.cert_father_name || ""}</span> ठेगाना : <span class="value">${form.cert_father_address || ""}</span> नागरिकता : <span class="value">${form.cert_father_citizenship || ""}</span></div>
          <div class="detail-line">६. आमाको नाम : <span class="value">${form.cert_mother_name || ""}</span> ठेगाना : <span class="value">${form.cert_mother_address || ""}</span> नागरिकता : <span class="value">${form.cert_mother_citizenship || ""}</span></div>
          <div class="detail-line">७. पतिको नाम : <span class="value">${form.cert_husband_name || ""}</span> ठेगाना : <span class="value">${form.cert_husband_address || ""}</span> नागरिकता : <span class="value">${form.cert_husband_citizenship || ""}</span></div>

          <div class="body-text" style="text-indent:30px; margin-top:14px;">
            निजले नेपालको संविधान बमोजिम अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाएको छ ।
          </div>

          <div class="sig-block-right" style="margin-top:30px;">
            <p style="font-weight:bold;">प्रमाणपत्र दिने अधिकारीको :</p>
            <p>सही: ........................</p>
            <p>नाम, थर: <span class="value">${form.cert_officer_name || ""}</span></p>
            <p>पद: <span class="value">${form.cert_officer_position || ""}</span></p>
            <p>मिति: <span class="value">${form.cert_date || ""}</span></p>
          </div>
        </div>

        <!-- Applicant box -->
        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${form.applicant_name || ""}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${form.applicant_address || ""}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${form.applicant_phone || ""}</span></div>
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
      <style>{STYLES}</style>

      <form
        className="ca-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >
        {/* ── Top Bar ── */}
        <div className="ca-top-bar ca-hide-print">
          अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र ।
          <span className="ca-breadcrumb">
            नेपाली नागरिकता &gt; अंगीकृत नेपाली नागरिकता
          </span>
        </div>

        {/* ── Municipality Header (shared component) ── */}
        <MunicipalityHeader />

        {/* ══════════════════════════════════════════════════════════════
            ANUSUCHI - 7
        ══════════════════════════════════════════════════════════════ */}
        <div className="ca-schedule">
          <div className="ca-sch-header">
            <h3 className="ca-sch-title">अनुसूची-७</h3>
            <p className="ca-rule-text">
              (नियम ९ को उपनियम (१), नियम १४ को उपनियम (१) र नियम १५ सँग सम्बन्धित)
            </p>
            <h2 className="ca-form-title">
              अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि दिइने निवेदन
            </h2>
          </div>

          {/* Addressee — title now editable */}
          <div className="ca-addressee">
            <p>
              श्रीमान्{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input
                  name="addressee_title"
                  className="ca-input ca-long"
                  value={form.addressee_title}
                  onChange={handleChange}
                />
              </span>
              {" "}ज्यू,
            </p>
            <p>
              जिल्ला प्रशासन कार्यालय,{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input
                  name="dao_district"
                  className="ca-input ca-medium"
                  value={form.dao_district}
                  onChange={handleChange}
                />
              </span>{" "}
              ।
            </p>
          </div>

          <div className="ca-subject">
            <p>विषय : <u>नेपाली नागरिकताको प्रमाण-पत्र पाऊँ ।</u></p>
          </div>

          <div className="ca-body">
            <p>महोदय,</p>
            <p className="ca-para ca-indent">
              मेरो जन्म नेपालमा भई नेपालमा नै स्थायी बसोबास गर्दै आएको /{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input
                  name="applicant_name_body"
                  className="ca-input ca-long"
                  value={form.applicant_name_body}
                  onChange={handleChange}
                  placeholder="नाम"
                />
              </span>{" "}
              ले जन्मको नाताले नेपाली नागरिकताको प्रमाण-पत्र पाएको हुँदा
              नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि तोकिएको दस्तुर रु.{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input
                  name="application_fee"
                  className="ca-input ca-small"
                  value={form.application_fee}
                  onChange={handleChange}
                />
              </span>{" "}
              यसै साथ राखी यो निवेदन पत्र चढाएको छु ।
            </p>

            <div className="ca-details-list">
              <p className="ca-bold">१. मेरो विवरण :</p>
              <div className="ca-details-indent">
                <div className="ca-detail-row">
                  <label>(क) नाम, थर :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="main_applicant_name" className="ca-input ca-long" value={form.main_applicant_name} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(ख) जन्म स्थान :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="birth_place" className="ca-input ca-long" value={form.birth_place} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(ग) जन्म मिति :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input type="date" name="dob" className="ca-input ca-date" value={form.dob} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(घ) स्थायी ठेगाना :</label>
                  <span className="ca-sep">जिल्ला</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="perm_district" className="ca-input ca-small" value={form.perm_district} onChange={handleChange} />
                  </span>
                  <span className="ca-sep">गा.पा./न.पा.</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="perm_municipality" className="ca-input ca-medium" value={form.perm_municipality} onChange={handleChange} />
                  </span>
                  <span className="ca-sep">वडा नं.</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="perm_ward" className="ca-input ca-tiny" value={form.perm_ward} onChange={handleChange} />
                  </span>
                  <span className="ca-sep">गाउँ/टोल</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="perm_tole" className="ca-input ca-medium" value={form.perm_tole} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(ङ) बाबुको नाम, थर :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="father_name" className="ca-input ca-medium" value={form.father_name} onChange={handleChange} />
                  </span>
                  <span className="ca-sep">राष्ट्रियता :</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="father_nationality" className="ca-input ca-small" value={form.father_nationality} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(च) आमाको नाम, थर :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="mother_name" className="ca-input ca-medium" value={form.mother_name} onChange={handleChange} />
                  </span>
                  <span className="ca-sep">राष्ट्रियता :</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="mother_nationality" className="ca-input ca-small" value={form.mother_nationality} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(छ) पतिको नाम, थर :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="husband_name" className="ca-input ca-medium" value={form.husband_name} onChange={handleChange} />
                  </span>
                  <span className="ca-sep">राष्ट्रियता :</span>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="husband_nationality" className="ca-input ca-small" value={form.husband_nationality} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(ज) धर्म :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="religion" className="ca-input ca-medium" value={form.religion} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(झ) शैक्षिक योग्यता :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="education" className="ca-input ca-medium" value={form.education} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(ञ) पेशा :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input name="occupation" className="ca-input ca-medium" value={form.occupation} onChange={handleChange} />
                  </span>
                </div>
                <div className="ca-detail-row">
                  <label>(ट) विवाह भएको मिति (विवाहितको हकमा) :</label>
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input type="date" name="marriage_date" className="ca-input ca-date" value={form.marriage_date} onChange={handleChange} />
                  </span>
                </div>
              </div>

              <div className="ca-detail-row ca-mt-10">
                <label>२. नेपालमा बसोबास गरेको वर्ष :</label>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="residence_years" className="ca-input ca-small" value={form.residence_years} onChange={handleChange} />
                </span>
              </div>
              <div className="ca-detail-row">
                <label>३. नेपाली भाषा वा अन्य कुन भाषा बोल्न र लेख्न जानेको छ :</label>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="language_spoken" className="ca-input ca-medium" value={form.language_spoken} onChange={handleChange} />
                </span>
              </div>
              <div className="ca-detail-row">
                <label>४. विदेशी नागरिकता त्यागेको वा त्याग्न कारवाही चलाएको निस्सा :</label>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="foreign_citizenship_renounced" className="ca-input ca-long" value={form.foreign_citizenship_renounced} onChange={handleChange} />
                </span>
              </div>
              <div className="ca-detail-row">
                <label>५. अन्य देशको नागरिकता लिए/नलिएको :</label>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="other_country_citizenship" className="ca-input ca-small" value={form.other_country_citizenship} onChange={handleChange} />
                </span>
              </div>
              <div className="ca-detail-row">
                <label>६. नेपालमा कुनै पेशा वा व्यवसाय गरी बसेको भए सो को विवरण :</label>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="nepal_business" className="ca-input ca-long" value={form.nepal_business} onChange={handleChange} />
                </span>
              </div>

              {/* ── Family Table — fixed UI ── */}
              <div className="ca-family-section">
                <p className="ca-bold ca-mb-20" style={{ marginBottom: 8 }}>
                  ७. सगोलका परिवारका सदस्यहरुको विवरण :
                </p>
                <table className="ca-family-table">
                  <thead>
                    <tr>
                      <th style={{ width: "8%" }}>क्र.स.</th>
                      <th>नाम, थर</th>
                      <th style={{ width: "22%" }}>नाता</th>
                      <th style={{ width: "15%" }}>उमेर</th>
                      <th className="ca-hide-print" style={{ width: "60px" }}>कार्य</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.family_members.map((row, idx) => (
                      <tr key={idx}>
                        <td className="ca-center">{idx + 1}</td>
                        <td>
                          <span className="ca-req-wrap ca-req-block">
                            <span className="ca-req-star">*</span>
                            <input
                              className="ca-table-input"
                              value={row.name}
                              onChange={updateFamilyRow(idx, "name")}
                            />
                          </span>
                        </td>
                        <td>
                          <span className="ca-req-wrap ca-req-block">
                            <span className="ca-req-star">*</span>
                            <input
                              className="ca-table-input"
                              value={row.relation}
                              onChange={updateFamilyRow(idx, "relation")}
                            />
                          </span>
                        </td>
                        <td>
                          <span className="ca-req-wrap ca-req-block">
                            <span className="ca-req-star">*</span>
                            <input
                              className="ca-table-input"
                              value={row.age}
                              onChange={updateFamilyRow(idx, "age")}
                            />
                          </span>
                        </td>
                        <td className="ca-action-cell ca-hide-print">
                          <button
                            type="button"
                            className="ca-remove-btn"
                            onClick={() => removeFamilyRow(idx)}
                            disabled={form.family_members.length <= 1}
                            title="पङ्क्ति हटाउनुहोस्"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="ca-add-row-btn ca-hide-print"
                  onClick={addFamilyRow}
                >
                  + पङ्क्ति थप्नुहोस्
                </button>
              </div>

              <div className="ca-detail-row ca-bold">
                <label>
                  ८. मैले नेपाली नागरिकताको प्रमाण-पत्र पाएमा नेपाल राज्य र नेपाल
                  सरकारप्रति बफादार रही नेपालको संविधान र प्रचलित कानुनको पूर्ण
                  रुपले पालना गर्नेछु ।
                </label>
              </div>
            </div>

            {/* Thumbprint + Signature */}
            <div className="ca-sig-flex">
              <div className="ca-thumbprint">
                <p className="ca-thumb-title">औंठा छाप</p>
                <div className="ca-thumb-boxes">
                  <div className="ca-thumb-box">
                    <span className="ca-thumb-label">दायाँ</span>
                    <div className="ca-thumb-inner" />
                  </div>
                  <div className="ca-thumb-box">
                    <span className="ca-thumb-label">बायाँ</span>
                    <div className="ca-thumb-inner" />
                  </div>
                </div>
              </div>
              <div className="ca-sig-block">
                <p>निवेदकको सही: ................................</p>
                <p>
                  मिति:{" "}
                  <span className="ca-req-wrap">
                    <span className="ca-req-star">*</span>
                    <input type="date" name="sign_date" className="ca-input ca-date" value={form.sign_date} onChange={handleChange} />
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Ward Recommendation */}
          <div className="ca-recommendation">
            <h3 className="ca-section-title ca-center ca-underline">सिफारिस</h3>
            <p className="ca-para ca-indent">
              यसमा लेखिएको व्यहोरा ठिक साँचो हो, झुठा ठहरे कानुन बमोजिम सहुँला
              बुझाउँला भनी यस{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="rec_municipality" className="ca-input ca-medium" value={form.rec_municipality} onChange={handleChange} />
              </span>{" "}
              वडा नं.{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="rec_ward" className="ca-input ca-tiny" value={form.rec_ward} onChange={handleChange} />
              </span>{" "}
              मा बस्ने श्री{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="rec_father_name" className="ca-input ca-medium" value={form.rec_father_name} onChange={handleChange} />
              </span>{" "}
              को{" "}
              <select name="rec_relation_type" className="ca-select" value={form.rec_relation_type} onChange={handleChange}>
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
                <option value="पत्नी">पत्नी</option>
              </select>{" "}
              श्री{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="rec_name" className="ca-input ca-medium" value={form.rec_name} onChange={handleChange} />
              </span>{" "}
              ले मेरो रोहवरमा सहीछाप गरेको साँचो हो । निजलाई अंगीकृत नेपाली
              नागरिकताको प्रमाण-पत्र दिएमा फरक पर्दैन भनी सिफारिस गर्दछु ।
            </p>
            <div className="ca-rec-sig">
              <p>सिफारिस गर्नेको सही: ........................</p>
              <div className="ca-sig-row">
                <span className="ca-sep">नाम:</span>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="rec_signatory_name" className="ca-input ca-medium" value={form.rec_signatory_name} onChange={handleChange} />
                </span>
              </div>
              <div className="ca-sig-row">
                <span className="ca-sep">पद:</span>
                <select name="rec_signatory_position" className="ca-select" value={form.rec_signatory_position} onChange={handleChange}>
                  <option value="">पद छनौट गर्नुहोस्</option>
                  <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                  <option value="वडा सचिव">वडा सचिव</option>
                </select>
              </div>
              <p>
                मिति:{" "}
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input type="date" name="rec_date" className="ca-input ca-date" value={form.rec_date} onChange={handleChange} />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ANUSUCHI - 8
        ══════════════════════════════════════════════════════════════ */}
        <div className="ca-anusuchi-8">
          <div className="ca-sch-header">
            <h3 className="ca-sch-title">अनुसूची-८</h3>
            <p className="ca-rule-text">(नियम ९ को उपनियम (२) सँग सम्बन्धित)</p>
            <h2 className="ca-form-title">अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र</h2>
          </div>

          <div className="ca-gov-header ca-center">
            <p className="ca-bold">नेपाल सरकार</p>
            <p className="ca-bold">गृह मन्त्रालय</p>
            <p className="ca-bold">
              जिल्ला प्रशासन कार्यालय{" "}
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_dao_district" className="ca-input ca-medium" value={form.cert_dao_district} onChange={handleChange} />
              </span>
            </p>
          </div>

          <div className="ca-cert-body">
            <div className="ca-cert-row ca-right-align">
              <label>प्रमाणपत्र नं. :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_no" className="ca-input ca-medium" value={form.cert_no} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row ca-mt-10">
              <label>१. नाम, थर :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_name" className="ca-input ca-long" value={form.cert_name} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row">
              <label>२. जन्म स्थान :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_birth_place" className="ca-input ca-long" value={form.cert_birth_place} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row">
              <label>३. जन्म मिति वा उमेर :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input type="date" name="cert_dob" className="ca-input ca-date" value={form.cert_dob} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row">
              <label>४. स्थायी ठेगाना :</label>
              <span className="ca-sep">जिल्ला</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_perm_district" className="ca-input ca-small" value={form.cert_perm_district} onChange={handleChange} />
              </span>
              <span className="ca-sep">गा.पा./न.पा.</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_perm_municipality" className="ca-input ca-medium" value={form.cert_perm_municipality} onChange={handleChange} />
              </span>
              <span className="ca-sep">वडा नं.</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_perm_ward" className="ca-input ca-tiny" value={form.cert_perm_ward} onChange={handleChange} />
              </span>
              <span className="ca-sep">टोल</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_perm_tole" className="ca-input ca-medium" value={form.cert_perm_tole} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row">
              <label>५. बाबुको नाम, थर :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_father_name" className="ca-input ca-medium" value={form.cert_father_name} onChange={handleChange} />
              </span>
              <span className="ca-sep">ठेगाना :</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_father_address" className="ca-input ca-medium" value={form.cert_father_address} onChange={handleChange} />
              </span>
              <span className="ca-sep">नागरिकता :</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_father_citizenship" className="ca-input ca-small" value={form.cert_father_citizenship} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row">
              <label>६. आमाको नाम, थर :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_mother_name" className="ca-input ca-medium" value={form.cert_mother_name} onChange={handleChange} />
              </span>
              <span className="ca-sep">ठेगाना :</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_mother_address" className="ca-input ca-medium" value={form.cert_mother_address} onChange={handleChange} />
              </span>
              <span className="ca-sep">नागरिकता :</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_mother_citizenship" className="ca-input ca-small" value={form.cert_mother_citizenship} onChange={handleChange} />
              </span>
            </div>
            <div className="ca-cert-row">
              <label>७. पतिको नाम, थर :</label>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_husband_name" className="ca-input ca-medium" value={form.cert_husband_name} onChange={handleChange} />
              </span>
              <span className="ca-sep">ठेगाना :</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_husband_address" className="ca-input ca-medium" value={form.cert_husband_address} onChange={handleChange} />
              </span>
              <span className="ca-sep">नागरिकता :</span>
              <span className="ca-req-wrap">
                <span className="ca-req-star">*</span>
                <input name="cert_husband_citizenship" className="ca-input ca-small" value={form.cert_husband_citizenship} onChange={handleChange} />
              </span>
            </div>

            <p className="ca-para ca-indent ca-mt-20">
              निजले नेपालको संविधान बमोजिम अंगीकृत नेपाली नागरिकताको प्रमाण-पत्र पाएको छ ।
            </p>

            <div className="ca-cert-sig">
              <p className="ca-bold">प्रमाणपत्र दिने अधिकारीको :</p>
              <p>सही : ........................</p>
              <div className="ca-sig-row">
                <span className="ca-sep">नाम, थर :</span>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="cert_officer_name" className="ca-input ca-medium" value={form.cert_officer_name} onChange={handleChange} />
                </span>
              </div>
              <div className="ca-sig-row">
                <span className="ca-sep">पद :</span>
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input name="cert_officer_position" className="ca-input ca-medium" value={form.cert_officer_position} onChange={handleChange} />
                </span>
              </div>
              <p>
                मिति:{" "}
                <span className="ca-req-wrap">
                  <span className="ca-req-star">*</span>
                  <input type="date" name="cert_date" className="ca-input ca-date" value={form.cert_date} onChange={handleChange} />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <div className="ca-hide-print ca-mt-20">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer ── Two buttons: Save (submit) + Save & Print (button) */}
        <div className="ca-footer ca-hide-print">
          {message && (
            <div className={`ca-msg ${message.type === "error" ? "ca-msg-error" : "ca-msg-success"}`}>
              {message.text}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="ca-save-btn"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ गर्नुहोस्"}
            </button>
            <button
              type="button"
              className="ca-save-btn"
              disabled={loading}
              onClick={() => handleSave(true)}
              style={{ backgroundColor: "#1a6b3a" }}
            >
              {loading ? "सेभ हुँदै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </div>

        <div className="ca-copyright ca-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>
      </form>
    </>
  );
}