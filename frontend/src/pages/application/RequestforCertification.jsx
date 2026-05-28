// src/pages/application/RequestforCertification.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────── Styles ─────────────────────────── */
const STYLES = `
  .rfc-container {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 30px 40px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: 'Kalimati', 'Kokila', 'Arial', sans-serif;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    box-sizing: border-box;
  }

  /* ── All inputs/selects white ── */
  .rfc-container input[type="text"],
  .rfc-container input[type="date"],
  .rfc-container select {
    background-color: #fff;
    font-family: inherit;
  }
  .rfc-container input[type="text"]:focus,
  .rfc-container input[type="date"]:focus,
  .rfc-container select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
  }

  /* ── Top row (addressee + date) ── */
  .rfc-form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
    gap: 16px;
    align-items: flex-start;
  }

  /* Addressee block */
  .rfc-addressee-block { display: flex; flex-direction: column; gap: 8px; font-size: 1rem; }
  .rfc-addr-line       { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .rfc-addr-label      { font-weight: bold; white-space: nowrap; }

  /* Shared inline inputs */
  .rfc-input {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
  }
  .rfc-select {
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
    cursor: pointer;
  }
  .rfc-w-xs   { width: 60px; }
  .rfc-w-sm   { width: 110px; }
  .rfc-w-md   { width: 170px; }
  .rfc-w-lg   { width: 260px; }
  .rfc-w-date { width: 150px; }

  /* Date block */
  .rfc-date-block { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 1rem; }
  .rfc-date-block label { white-space: nowrap; }

.rfc-chief-input {
  width: 300px;
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
}

.rfc-addr-line {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.rfc-district-input {
  width: 220px;
  height: 38px;
  font-size: 1rem;
}

.rfc-addr-label {
  font-size: 0.9rem;
  font-weight: 600;
}

  /* ── Subject ── */
  .rfc-subject-line { text-align: center; margin: 20px 0; font-size: 1rem; }

  /* ── Body paragraph inline inputs ── */
  .rfc-certificate-body {
    line-height: 2.8;
    font-size: 1rem;
    text-align: justify;
    margin-bottom: 20px;
  }
  .rfc-certificate-body .rfc-input,
  .rfc-certificate-body .rfc-select {
    display: inline-block;
    vertical-align: baseline;
    margin: 0 4px;
  }

  /* ── Variation field ── */
  .rfc-variation-block { margin-bottom: 20px; }
  .rfc-variation-block label { font-size: 1rem; font-weight: bold; display: block; margin-bottom: 6px; }
  .rfc-variation-block input { width: 55%; box-sizing: border-box; }

  /* ── निवेदकको विवरण — RIGHT aligned with signature box below ── */
  .rfc-applicant-sig-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 30px 0 20px;
  }
  .rfc-applicant-sig-card {
    width: 320px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px 20px;
    background-color: rgba(255,255,255,0.6);
  }
  .rfc-applicant-sig-card h4 {
    font-size: 1rem;
    font-weight: bold;
    margin: 0 0 14px 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
  }
  .rfc-field-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  .rfc-field-group label {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }
  .rfc-field-group input {
    width: 100%;
    padding: 7px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 0.95rem;
    background-color: #fff;
    box-sizing: border-box;
  }

  /* Signature box (display-only, for signing after printing) */
  .rfc-signature-box {
    margin-top: 16px;
    border-top: 1px dashed #aaa;
    padding-top: 14px;
  }
  .rfc-signature-box p {
    font-size: 0.85rem;
    color: #777;
    margin: 0 0 8px 0;
    font-style: italic;
  }
  .rfc-signature-line-area {
    width: 100%;
    height: 60px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: rgba(255,255,255,0.4);
    display: flex;
    align-items: flex-end;
    padding-bottom: 6px;
    box-sizing: border-box;
  }
  .rfc-signature-line-label {
    font-size: 0.8rem;
    color: #999;
    padding: 0 8px;
    width: 100%;
    text-align: center;
    border-top: 1px solid #ccc;
    margin: 0 8px;
    padding-top: 4px;
  }

  /* ── Required star ── */
  .rfc-req { color: red; margin-left: 3px; }

  /* ── Applicant details overrides ── */
  .rfc-container .applicant-details-box {
    border: 1px solid #ddd !important;
    padding: 20px !important;
    background-color: rgba(255,255,255,0.4) !important;
    margin-top: 20px !important;
    border-radius: 4px !important;
    clear: both;
  }
  .rfc-container .applicant-details-box h3 {
    color: #777 !important; font-size: 1.1rem !important;
    margin: 0 0 15px 0 !important;
    border-bottom: 1px solid #eee !important; padding-bottom: 8px !important;
  }
  .rfc-container .applicant-details-box .details-grid {
    display: flex !important; flex-direction: column !important; gap: 18px !important;
  }
  .rfc-container .applicant-details-box .detail-input {
    max-width: 400px !important; width: 100% !important;
    border: 1px solid #ddd !important; padding: 8px !important;
    border-radius: 4px !important; box-sizing: border-box !important;
    background-color: #fff !important; font-family: inherit !important;
  }
  .rfc-container .applicant-details-box .detail-input:focus {
    border-color: #2563eb !important; outline: none !important;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.12) !important;
  }
  .rfc-container .applicant-details-box .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer buttons ── */
  .rfc-footer {
    clear: both;
    text-align: center;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .rfc-btn {
    padding: 10px 26px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.15s;
  }
  .rfc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .rfc-btn-save  { background-color: #2c3e50; color: #fff; }
  .rfc-btn-save:hover:not(:disabled)  { background-color: #1a252f; }
  .rfc-btn-print { background-color: #1a6b3a; color: #fff; }
  .rfc-btn-print:hover:not(:disabled) { background-color: #145230; }

  /* ── Copyright ── */
  .rfc-copyright { text-align: right; font-size: 0.8rem; color: #666; margin-top: 24px; border-top: 1px solid #eee; padding-top: 10px; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    .rfc-container { padding: 18px 14px; }
    .rfc-form-row  { flex-direction: column; }
    .rfc-applicant-sig-card { width: 100%; }
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .rfc-container, .rfc-container * { visibility: visible; }
    .rfc-container {
      position: absolute; left: 0; top: 0;
      width: 100%; box-shadow: none; border: none;
      margin: 0; padding: 12mm 16mm; background: white;
    }
    .rfc-footer, .rfc-copyright { display: none !important; }
    input, select {
      border: none !important; background: transparent !important;
      color: #000 !important; -webkit-text-fill-color: #000 !important;
    }
    input::placeholder { color: transparent !important; }
    .rfc-signature-line-area { border: 1px solid #ccc !important; background: transparent !important; }
  }
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const makeInitialState = () => ({
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: "प्रमुख जिल्ला अधिकारी",
  mainDistrict: MUNICIPALITY.city,
  palikaName: MUNICIPALITY.name,
  wardNo: MUNICIPALITY.wardNumber,
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  doc1Type: "नागरिकता",
  doc1Detail: "",
  doc2Type: "शैक्षिक योग्यता",
  doc2Detail: "",
  variationDetail: "",
  sigName: "",
  sigMobile: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
});

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

const validate = (fd) => {
  if (!fd.mainDistrict?.trim()) return "मुख्य जिल्ला भर्नुहोस्";
  if (!fd.palikaName?.trim()) return "पालिका/नगरपालिका भर्नुहोस्";
  if (!fd.wardNo?.toString().trim()) return "वडा नं. भर्नुहोस्";
  if (!fd.residentName?.trim()) return "निवासीको नाम भर्नुहोस्";
  if (!fd.guardianName?.trim()) return "अभिभावक/सम्बन्धको नाम भर्नुहोस्";
  if (!fd.doc1Detail?.trim()) return "पहिलो कागजात विवरण भर्नुहोस्";
  if (!fd.doc2Detail?.trim()) return "दोश्रो कागजात विवरण भर्नुहोस्";
  if (!fd.sigName?.trim()) return "दस्तखत गर्नेको नाम भर्नुहोस्";
  if (!fd.sigMobile?.trim()) return "मोबाइल नम्बर भर्नुहोस्";
  if (!phoneRegex.test(String(fd.sigMobile))) return "मोबाइल नम्बर अमान्य छ";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const RequestforCertification = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(makeInitialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  /* ── Clean print window ── */
  const handleCleanPrint = () => {
    const v = (val) => `<span class="value">${val || ""}</span>`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>प्रमाणित गरि पाउँ</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000; background: white;
            padding: 15mm 20mm; font-size: 11pt; line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo   { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name  { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title{ color: #c0392b; font-size: 16pt; font-weight: 700; margin: 4px 0; }
          .addr      { color: #c0392b; font-size: 10pt; }
          .top-row   { display: flex; justify-content: space-between; margin: 16px 0 10px; }
          .subject   { text-align: center; font-weight: bold; font-size: 12pt; margin: 18px 0; text-decoration: underline; }
          .body-text { font-size: 11pt; line-height: 2.4; text-align: justify; margin-bottom: 18px; }
          .value     { font-weight: bold; padding: 0 3px; display: inline-block; min-width: 50px; }
          .variation { margin: 14px 0; font-size: 11pt; }
          .bottom-wrapper { display: flex; justify-content: flex-end; margin-top: 30px; }
          .sig-card  { width: 280px; border: 1px solid #ccc; padding: 14px 16px; border-radius: 4px; }
          .sig-title { font-weight: bold; font-size: 11pt; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
          .sig-row   { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .sig-label { min-width: 90px; font-weight: 600; }
          .sig-val   { flex: 1; border-bottom: 1px solid #000; }
          .sign-area { margin-top: 14px; border-top: 1px dashed #aaa; padding-top: 12px; }
          .sign-label{ font-size: 9pt; color: #777; margin-bottom: 6px; font-style: italic; }
          .sign-box  { height: 55px; border: 1px solid #ccc; border-radius: 3px; display: flex; align-items: flex-end; padding-bottom: 4px; }
          .sign-line-label { font-size: 9pt; color: #aaa; text-align: center; width: 100%; border-top: 1px solid #ccc; margin: 0 8px; padding-top: 3px; }
          .applicant-box { border: 1px solid #999; padding: 12px; margin-top: 20px; border-radius: 3px; }
          .ap-title  { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; font-size: 11pt; }
          .ap-row    { display: flex; margin-bottom: 7px; font-size: 10pt; }
          .ap-label  { min-width: 160px; font-weight: 600; }
          .ap-val    { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="${MUNICIPALITY.logoSrc}" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardLabel}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <div class="top-row">
          <div>
            <strong>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</strong><br/>
            ${v(formData.headerDistrict)}
          </div>
          <div><strong>मिति :</strong> ${v(formData.date)}</div>
        </div>

        <div class="subject">विषय: प्रमाणित गरि पाउँ ।</div>

        <div class="body-text">
          ${v(formData.mainDistrict)} जिल्ला
          ${v(formData.palikaName)} वडा नं.
          ${v(formData.wardNo)} निवासी
          ${v(formData.residentName)} को
          ${v(formData.relation)} म
          ${v(formData.guardianName)} को
          ${v(formData.doc1Type)} प्रमाणपत्रमा
          ${v(formData.doc1Detail)} भएको र
          ${v(formData.doc2Type)} प्रमाणपत्रमा
          ${v(formData.doc2Detail)}
          भई फरक पर्नु व्यक्ति एउटै भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा
          कार्यालयको सिफारिस, नागरिकता प्रमाणपत्र र शैक्षिक प्रमाणपत्रको फोटोकपी
          सहित रु १०।- को टिकट टाँसी यो निवेदन पेश गरेको छु ।
        </div>

        ${formData.variationDetail ? `<div class="variation"><strong>अन्तर विवरण:</strong> ${v(formData.variationDetail)}</div>` : ""}

        <div class="bottom-wrapper">
          <div class="sig-card">
            <div class="sig-title">निवेदकको विवरण</div>
            <div class="sig-row"><span class="sig-label">नाम :</span><span class="sig-val">${formData.sigName || ""}</span></div>
            <div class="sig-row"><span class="sig-label">मोबाइल नं. :</span><span class="sig-val">${formData.sigMobile || ""}</span></div>
            <div class="sign-area">
              <p class="sign-label">प्रिन्ट गरेपछि यहाँ दस्तखत गर्नुहोस्</p>
              <div class="sign-box">
                <span class="sign-line-label">दस्तखत</span>
              </div>
            </div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="ap-title">निवेदकको विवरण (कार्यालय प्रयोजन)</div>
          <div class="ap-row"><span class="ap-label">नाम:</span><span class="ap-val">${formData.applicantName || ""}</span></div>
          <div class="ap-row"><span class="ap-label">ठेगाना:</span><span class="ap-val">${formData.applicantAddress || ""}</span></div>
          <div class="ap-row"><span class="ap-label">नागरिकता नं.:</span><span class="ap-val">${formData.applicantCitizenship || ""}</span></div>
          <div class="ap-row"><span class="ap-label">फोन:</span><span class="ap-val">${formData.applicantPhone || ""}</span></div>
        </div>
      </body>
      </html>
    `;

    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(content);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
      w.close();
    }, 500);
  };

  /* ── Single save — no duplicate POSTs ── */
  const handleSave = async (shouldPrint = false) => {
    const err = validate(formData);
    if (err) {
      alert("कृपया: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v === "" ? null : v]),
      );

      const res = await axios.post(
        "/api/forms/request-for-certification",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
          setTimeout(() => setFormData(makeInitialState()), 600);
        } else {
          alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
          setFormData(makeInitialState());
        }
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <form
        className="rfc-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* Municipality header */}
        <MunicipalityHeader showLogo />

        {/* ── Addressee + Date ── */}
        <div className="rfc-form-row">
          <div className="rfc-addressee-block">
            <div className="rfc-addr-line">
              <span className="rfc-addr-label">
                श्रीमान् <span className="rfc-req">*</span>
              </span>

              <input
                type="text"
                name="headerDistrict"
                value={formData.headerDistrict}
                onChange={handleChange}
                className="rfc-input rfc-chief-input"
                required
              />

              <span className="rfc-addr-label">ज्यु,</span>
            </div>

            <div className="rfc-addr-line">
              <input
                type="text"
                name="mainDistrict"
                value={formData.mainDistrict}
                onChange={handleChange}
                className="rfc-input rfc-district-input"
                placeholder="जिल्ला *"
                required
              />
            </div>
          </div>

          <div className="rfc-date-block">
            <label>मिति :</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="rfc-input rfc-w-date"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="rfc-subject-line">
          <strong>
            विषय: <u>प्रमाणित गरि पाउँ ।</u>
          </strong>
        </div>

        {/* Body */}
        <p className="rfc-certificate-body">
          <input
            type="text"
            name="mainDistrict"
            value={formData.mainDistrict}
            onChange={handleChange}
            className="rfc-input rfc-w-sm"
            placeholder="जिल्ला *"
            required
          />{" "}
          जिल्ला{" "}
          <input
            type="text"
            name="palikaName"
            value={formData.palikaName}
            onChange={handleChange}
            className="rfc-input rfc-w-md"
            placeholder="गाउँपालिका/नगरपालिका *"
            required
          />{" "}
          वडा नं.{" "}
          <input
            type="text"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            className="rfc-input rfc-w-xs"
            placeholder="वडा *"
            required
          />{" "}
          निवासी{" "}
          <input
            type="text"
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            className="rfc-input rfc-w-md"
            placeholder="निवासीको नाम *"
            required
          />{" "}
          को{" "}
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className="rfc-select rfc-w-sm"
          >
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </select>{" "}
          म{" "}
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="rfc-input rfc-w-md"
            placeholder="अभिभावक/सम्बन्धको नाम *"
            required
          />{" "}
          को{" "}
          <input
            type="text"
            name="doc1Type"
            value={formData.doc1Type}
            onChange={handleChange}
            className="rfc-input rfc-w-sm"
          />{" "}
          प्रमाणपत्रमा{" "}
          <input
            type="text"
            name="doc1Detail"
            value={formData.doc1Detail}
            onChange={handleChange}
            className="rfc-input rfc-w-md"
            placeholder="विवरण *"
            required
          />{" "}
          भएको र{" "}
          <input
            type="text"
            name="doc2Type"
            value={formData.doc2Type}
            onChange={handleChange}
            className="rfc-input rfc-w-sm"
          />{" "}
          प्रमाणपत्रमा{" "}
          <input
            type="text"
            name="doc2Detail"
            value={formData.doc2Detail}
            onChange={handleChange}
            className="rfc-input rfc-w-md"
            placeholder="विवरण *"
            required
          />{" "}
          भई फरक पर्नु व्यक्ति एउटै भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा
          कार्यालयको सिफारिस, नागरिकता प्रमाणपत्र र शैक्षिक प्रमाणपत्रको फोटोकपी
          सहित रु १०।- को टिकट टाँसी यो निवेदन पेश गरेको छु ।
        </p>

        {/* Variation */}
        <div className="rfc-variation-block">
          <label>अन्तर (भिन्नता) विवरण (यदि छ):</label>
          <input
            type="text"
            name="variationDetail"
            value={formData.variationDetail}
            onChange={handleChange}
            className="rfc-input"
          />
        </div>

        {/* ── निवेदकको विवरण — RIGHT side with signature box below ── */}
        <div className="rfc-applicant-sig-wrapper">
          <div className="rfc-applicant-sig-card">
            <h4>निवेदकको विवरण</h4>

            <div className="rfc-field-group">
              <label>
                नाम : <span className="rfc-req">*</span>
              </label>
              <input
                type="text"
                name="sigName"
                value={formData.sigName}
                onChange={handleChange}
                placeholder="पूरा नाम"
                required
              />
            </div>
            <div className="rfc-field-group">
              <label>
                मोबाइल नं. : <span className="rfc-req">*</span>
              </label>
              <input
                type="text"
                name="sigMobile"
                value={formData.sigMobile}
                onChange={handleChange}
                placeholder="मोबाइल नम्बर"
                required
              />
            </div>

            {/* Signature box — display only, for signing after printing */}
            <div className="rfc-signature-box">
              <p>प्रिन्ट गरेपछि यहाँ दस्तखत गर्नुहोस्</p>
              <div className="rfc-signature-line-area">
                <span className="rfc-signature-line-label">दस्तखत</span>
              </div>
            </div>
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Footer — two buttons */}
        <div className="rfc-footer">
          <button
            type="submit"
            className="rfc-btn rfc-btn-save"
            disabled={submitting}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="rfc-btn rfc-btn-print"
            disabled={submitting}
            onClick={() => handleSave(true)}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="rfc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default RequestforCertification;
