// src/pages/application/TribalVerificationRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────── Styles ─────────────────────────── */
const STYLES = `
  .tvr-container {
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
  .tvr-container input[type="text"],
  .tvr-container input[type="date"],
  .tvr-container select,
  .tvr-container textarea {
    background-color: #fff;
    font-family: inherit;
  }
  .tvr-container input[type="text"]:focus,
  .tvr-container input[type="date"]:focus,
  .tvr-container select:focus,
  .tvr-container textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
  }

  /* ── Addressee + date row ── */
  .tvr-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
  }

  /* Addressee block — clean gov-form layout */
  .tvr-addressee-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1rem;
  }
  .tvr-addr-line { display: flex; align-items: center; gap: 8px; }
  .tvr-addr-label { font-weight: bold; white-space: nowrap; min-width: auto; }
  .tvr-post-input { width: 220px; }
  .tvr-municipality-input { width: 320px; }
  .tvr-ward-input { width: 70px; }
  .tvr-district-input { width: 180px; }

  /* Shared inline input style */
  .tvr-input {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
  }
  .tvr-select {
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    outline: none;
    cursor: pointer;
  }
  .tvr-w-xs   { width: 55px; }
  .tvr-w-sm   { width: 110px; }
  .tvr-w-md   { width: 180px; }
  .tvr-w-lg   { width: 280px; }
  .tvr-w-date { width: 140px; }

  /* Date block */
  .tvr-date-block { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: bold; }
  .tvr-date-block label { white-space: nowrap; }

  /* ── Subject ── */
  .tvr-subject-line { text-align: center; margin: 20px 0; font-size: 1rem; font-weight: bold; }

  /* ── Certificate body ── */
  .tvr-certificate-body {
    line-height: 2.8;
    font-size: 1rem;
    text-align: justify;
    margin-bottom: 20px;
  }
  /* Inline inputs inside paragraph */
  .tvr-certificate-body .tvr-input,
  .tvr-certificate-body .tvr-select {
    display: inline-block;
    vertical-align: baseline;
    margin: 0 4px;
  }

  /* ── Extra content textarea ── */
  .tvr-extra-block { margin-top: 16px; }
  .tvr-extra-block label { font-size: 1rem; font-weight: bold; display: block; margin-bottom: 6px; }
  .tvr-extra-block textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    line-height: 1.8;
    resize: vertical;
    background-color: #fff;
  }

  /* ── Signature section ── */
  .tvr-signature-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 8px;
    margin-right: 20px;
  }

  .tvr-signature-title { font-weight: bold; font-size: 1rem; margin-bottom: 10px; }
  .tvr-sig-field {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .tvr-sig-field label { font-weight: bold; white-space: nowrap; min-width: 80px; text-align: right; }
  .tvr-sig-field input { width: 220px; }

  /* ── Required star ── */
  .tvr-req { color: red; margin-left: 3px; }

  /* ── Applicant details overrides ── */
  .tvr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .tvr-container .applicant-details-box h3 {
    color: #777; font-size: 1.1rem; margin: 0 0 15px 0;
    border-bottom: 1px solid #eee; padding-bottom: 8px;
  }
  .tvr-container .applicant-details-box .details-grid {
    display: flex !important; flex-direction: column !important; gap: 18px !important;
  }
  .tvr-container .applicant-details-box .detail-input {
    max-width: 400px; width: 100%;
    border: 1px solid #ddd; padding: 8px;
    border-radius: 4px; box-sizing: border-box;
    background-color: #fff;
  }

  /* ── Footer buttons ── */
  .tvr-footer { text-align: center; margin-top: 30px; display: flex; justify-content: center; gap: 12px; }
  .tvr-btn {
    padding: 10px 26px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.15s;
  }
  .tvr-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .tvr-btn-save  { background-color: #2c3e50; color: #fff; }
  .tvr-btn-save:hover:not(:disabled)  { background-color: #1a252f; }
  .tvr-btn-print { background-color: #1a6b3a; color: #fff; }
  .tvr-btn-print:hover:not(:disabled) { background-color: #145230; }

  /* ── Copyright ── */
  .tvr-copyright { text-align: right; font-size: 0.8rem; color: #666; margin-top: 24px; border-top: 1px solid #eee; padding-top: 10px; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    .tvr-container { padding: 18px 14px; }
    .tvr-top-row   { flex-direction: column; }
    .tvr-addr-line { flex-wrap: wrap; }
    .tvr-w-lg      { width: 100%; }
  }
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const WARD_OPTIONS = [
  "१", "२", "३", "४", "५", "६", "७", "८", "९", "१०", "११", "१२",
];

const makeInitialState = () => ({
  date: new Date().toISOString().slice(0, 10),
  // Addressee
  addresseePost: "वडा सचिव ज्यु",
  addresseeMunicipality: MUNICIPALITY.name,
  addresseeWardNo: MUNICIPALITY.wardNumber || "१",
  addresseeOfficeSuffix: "वडा कार्यालय",
  addresseeDistrict: MUNICIPALITY.city || "",
  // Body
  municipality2: MUNICIPALITY.name,
  wardNo2: MUNICIPALITY.wardNumber || "१",
  residentTitle: "श्री",
  residentName: "",
  relation: "बाबु",
  guardianTitle: "श्री",
  guardianName: "",
  tribeCategory: "आदिवासी जनजाती",
  tribeName: "",
  mainContent: "",
  // Signature
  applicantNameSignature: "",
  applicantAddressSignature: "",
  // Applicant details
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
});

const phoneRegex = /^[0-9+\-\s]{6,20}$/;

const validate = (fd) => {
  if (!fd.residentName?.trim()) return "निवासीको नाम भर्नुहोस्";
  if (!fd.guardianName?.trim()) return "अभिभावकको नाम भर्नुहोस्";
  if (!fd.tribeName?.trim()) return "जाति नाम भर्नुहोस्";
  if (!fd.applicantNameSignature?.trim())
    return "निवेदकको नाम (दस्तखत) भर्नुहोस्";
  if (!fd.applicantAddressSignature?.trim())
    return "निवेदकको ठेगाना (दस्तखत) भर्नुहोस्";
  if (!fd.applicantName?.trim()) return "निवेदकको नाम भर्नुहोस्";
  if (!fd.applicantAddress?.trim()) return "निवेदकको ठेगाना भर्नुहोस्";
  if (!fd.applicantCitizenship?.trim()) return "नागरिकता नं. भर्नुहोस्";
  if (!fd.applicantPhone?.trim()) return "सम्पर्क नं. भर्नुहोस्";
  if (!phoneRegex.test(String(fd.applicantPhone)))
    return "सम्पर्क नं. अमान्य छ";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const TribalVerificationRecommendation = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(makeInitialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Clean print — isolated window, body + textarea + applicant box ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const f = formData;
    const v = (val) => `<span class="value">${val || ""}</span>`;

    const content = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<title>आदिवासी जनजाती प्रमाणित सिफारिस</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Kalimati','Noto Sans Devanagari',Arial,sans-serif; color:#000; background:white; padding:15mm 20mm; font-size:11pt; line-height:1.8; }
  .header { text-align:center; margin-bottom:16px; position:relative; min-height:90px; }
  .logo { position:absolute; left:0; top:0; width:70px; }
  .mun-name   { color:#c0392b; font-size:20pt; font-weight:700; }
  .ward-title { color:#c0392b; font-size:16pt; font-weight:700; margin:4px 0; }
  .addr       { color:#c0392b; font-size:10pt; }
  .meta { display:flex; justify-content:space-between; align-items:flex-start; margin:14px 0; }
  .addressee { font-size:11pt; font-weight:bold; line-height:1.9; }
  .subject { text-align:center; font-weight:bold; font-size:12pt; margin:18px 0; text-decoration:underline; }
  /* value spans size to content — no fixed min-width so small values
     don't leave big gaps and long values don't get clipped/merged */
  .value { font-weight:bold; padding:0 3px; white-space:nowrap; }
  .body-text { font-size:11pt; line-height:2.3; text-align:justify; margin-bottom:14px; }
  .extra { font-size:11pt; line-height:1.9; text-align:justify; margin-bottom:16px; white-space:pre-wrap; }
  .sig-section { display:flex; flex-direction:column; align-items:flex-end; margin:18px 20px 0 0; gap:6px; }
  .sig-title { font-weight:bold; margin-bottom:4px; font-size:11pt; }
  .sig-row { display:flex; gap:8px; align-items:baseline; font-size:10pt; }
  .sig-label { font-weight:600; min-width:80px; text-align:right; }
  .applicant-box { border:1px solid #999; padding:14px; margin-top:24px; border-radius:3px; }
  .applicant-title { font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:6px; margin-bottom:10px; font-size:11pt; }
  .field-row { display:flex; margin-bottom:8px; font-size:10pt; }
  .field-label { min-width:160px; font-weight:600; }
  .field-val { flex:1; }
</style>
</head><body>
  <div class="header">
    <img class="logo" src="/nepallogo.svg" alt="Nepal"/>
    <div class="mun-name">${MUNICIPALITY.name}</div>
    <div class="ward-title">${wardTitle}</div>
    <div class="addr">${MUNICIPALITY.officeLine}</div>
    <div class="addr">${MUNICIPALITY.provinceLine}</div>
  </div>

  <div class="meta">
    <div class="addressee">
      श्री ${v(f.addresseePost)},<br/>
      ${v(f.addresseeMunicipality)}<br/>
      ${v(f.addresseeWardNo)} नं. वडा कार्यालय<br/>
      ${v(f.addresseeDistrict)}
    </div>
    <div>मिति : <strong>${f.date || ""}</strong></div>
  </div>

  <div class="subject">विषय: आदिवासी जनजाती - प्रमाणित सिफारिस पाउँ।</div>

  <div class="body-text">
    प्रस्तुत विषयमा यस ${v(f.municipality2)} वडा नं ${v(f.wardNo2)} निवासी
    ${v(f.residentTitle)} ${v(f.residentName)} को ${v(f.relation)}
    ${v(f.guardianTitle)} ${v(f.guardianName)} ${v(f.tribeCategory)}
    जाती अन्तर्गत ${v(f.tribeName)} जाती भएको व्यहोरा सिफारिस उपलब्ध गराई पाउन
    यो निवेदन पेश गरेको छु ।
  </div>

  ${f.mainContent ? `<div class="extra">${f.mainContent}</div>` : ""}

  <div class="sig-section">
    <div class="sig-title">निवेदक / निवेदिका</div>
    <div class="sig-row"><span class="sig-label">नाम, थर :</span><span class="value">${f.applicantNameSignature || ""}</span></div>
    <div class="sig-row"><span class="sig-label">ठेगाना :</span><span class="value">${f.applicantAddressSignature || ""}</span></div>
  </div>

  <div class="applicant-box">
    <div class="applicant-title">निवेदकको विवरण</div>
    <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${f.applicantName || ""}</span></div>
    <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${f.applicantAddress || ""}</span></div>
    <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${f.applicantCitizenship || ""}</span></div>
    <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${f.applicantPhone || ""}</span></div>
  </div>
</body></html>`;

    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(content);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 500);
  };

  /* Single save — no duplicate POSTs */
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
        "/api/forms/tribal-verification-recommendation",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        }
        setFormData(makeInitialState());
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
        className="tvr-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* Municipality header */}
        <MunicipalityHeader showLogo />

        {/* ── Addressee + Date ── clean structured layout ── */}
        <div className="tvr-top-row">
          {/* Addressee — two clear lines like a gov letter */}
          <div className="tvr-addressee-block">
            <div className="tvr-addr-line">
              <span className="tvr-addr-label">श्री</span>

              <input
                type="text"
                name="addresseePost"
                value={formData.addresseePost}
                onChange={handleChange}
                className="tvr-input tvr-post-input"
              />

              <span style={{ marginLeft: "-4px" }}>,</span>
            </div>

            <div className="tvr-addr-line">
              <input
                type="text"
                name="addresseeMunicipality"
                value={formData.addresseeMunicipality}
                onChange={handleChange}
                className="tvr-input tvr-municipality-input"
              />
            </div>

            <div className="tvr-addr-line">
              <select
                name="addresseeWardNo"
                value={formData.addresseeWardNo}
                onChange={handleChange}
                className="tvr-select tvr-ward-input"
              >
                {WARD_OPTIONS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>

              <span>नं. वडा कार्यालय</span>
            </div>

            <div className="tvr-addr-line">
              <input
                type="text"
                name="addresseeDistrict"
                value={formData.addresseeDistrict}
                onChange={handleChange}
                className="tvr-input tvr-district-input"
              />
            </div>
          </div>

          {/* Date */}
          <div className="tvr-date-block">
            <label>मिति :</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="tvr-input tvr-w-date"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="tvr-subject-line">
          <strong>
            विषय: <u>आदिवासी जनजाती - प्रमाणित सिफारिस पाउँ।</u>
          </strong>
        </div>

        {/* Body */}
        <p className="tvr-certificate-body">
          प्रस्तुत विषयमा यस{" "}
          <select
            name="municipality2"
            value={formData.municipality2}
            onChange={handleChange}
            className="tvr-select tvr-w-md"
          >
            <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
          </select>{" "}
          वडा नं{" "}
          <select
            name="wardNo2"
            value={formData.wardNo2}
            onChange={handleChange}
            className="tvr-select tvr-w-xs"
          >
            {WARD_OPTIONS.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>{" "}
          निवासी{" "}
          <select
            name="residentTitle"
            value={formData.residentTitle}
            onChange={handleChange}
            className="tvr-select tvr-w-sm"
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>{" "}
          <input
            type="text"
            name="residentName"
            placeholder="निवासीको नाम"
            value={formData.residentName}
            onChange={handleChange}
            className="tvr-input tvr-w-md"
          />{" "}
          को{" "}
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className="tvr-select tvr-w-sm"
          >
            <option>बाबु</option>
            <option>आमा</option>
            <option>पति</option>
          </select>{" "}
          <select
            name="guardianTitle"
            value={formData.guardianTitle}
            onChange={handleChange}
            className="tvr-select tvr-w-sm"
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>{" "}
          <input
            type="text"
            name="guardianName"
            placeholder="नाम *"
            value={formData.guardianName}
            onChange={handleChange}
            className="tvr-input tvr-w-md"
            required
          />{" "}
          <select
            name="tribeCategory"
            value={formData.tribeCategory}
            onChange={handleChange}
            className="tvr-select tvr-w-md"
          >
            <option>आदिवासी जनजाती</option>
          </select>{" "}
          जाती अन्तर्गत{" "}
          <input
            type="text"
            name="tribeName"
            placeholder="जातीको नाम *"
            value={formData.tribeName}
            onChange={handleChange}
            className="tvr-input tvr-w-md"
            required
          />{" "}
          जाती भएको व्यहोरा सिफारिस उपलब्ध गराई पाउन यो निवेदन पेश गरेको छु ।
        </p>

        {/* Extra content textarea */}
        <div className="tvr-extra-block">
          <label>निवेदन व्यहोरा (थप विवरण):</label>
          <textarea
            name="mainContent"
            value={formData.mainContent}
            onChange={handleChange}
            rows="5"
            placeholder="थप विवरण यहाँ लेख्नुहोस् (वैकल्पिक)"
          />
        </div>

        {/* Signature */}
        <div className="tvr-signature-section">
          <p className="tvr-signature-title">निवेदक / निवेदिका</p>
          <div className="tvr-sig-field">
            <label>
              नाम, थर :<span className="tvr-req">*</span>
            </label>
            <input
              type="text"
              name="applicantNameSignature"
              value={formData.applicantNameSignature}
              onChange={handleChange}
              className="tvr-input"
              required
            />
          </div>
          <div className="tvr-sig-field">
            <label>
              ठेगाना :<span className="tvr-req">*</span>
            </label>
            <input
              type="text"
              name="applicantAddressSignature"
              value={formData.applicantAddressSignature}
              onChange={handleChange}
              className="tvr-input"
              required
            />
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Footer — two buttons */}
        <div className="tvr-footer">
          <button
            type="submit"
            className="tvr-btn tvr-btn-save"
            disabled={submitting}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="tvr-btn tvr-btn-print"
            disabled={submitting}
            onClick={() => handleSave(true)}
          >
            {submitting ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="tvr-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default TribalVerificationRecommendation;