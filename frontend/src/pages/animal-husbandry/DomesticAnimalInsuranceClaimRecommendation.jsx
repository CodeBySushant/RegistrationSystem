import React, { useState, useRef } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const STYLES = `
  .daic-container {
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

  .daic-bold      { font-weight: bold; }
  .daic-underline { text-decoration: underline; }
  .daic-required  { color: red; margin-left: 4px; }

  .daic-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .daic-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  .daic-header { text-align: center; margin-bottom: 20px; position: relative; min-height: 100px; }
  .daic-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .daic-header-text { display: flex; flex-direction: column; align-items: center; }
  .daic-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .daic-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .daic-address-text,
  .daic-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  .daic-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .daic-meta-left p, .daic-meta-right p { margin: 5px 0; }
  .daic-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .daic-w-small  { width: 120px; }
  .daic-w-medium { width: 160px; }
  .daic-w-long   { width: 250px; }

  .daic-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  .daic-addressee { margin-bottom: 20px; font-size: 1.05rem; }
  .daic-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

  .daic-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .daic-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    display: inline-block;
    vertical-align: middle;
  }
  .daic-inline-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    font-family: inherit;
  }

  .daic-req-wrap {
    position: relative;
    display: inline-block;
  }
  .daic-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }
  .daic-req-wrap input { padding-left: 18px; }

  .daic-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .daic-signature-block   { width: 220px; text-align: center; }
  .daic-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .daic-sig-name-input    { width: 100%; margin-bottom: 5px; border: none; border-bottom: 1px solid #000; outline: none; background: transparent; font-family: inherit; font-size: 1rem; }
  .daic-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  .daic-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .daic-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
  }

  .daic-footer { text-align: center; margin-top: 40px; }
  .daic-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .daic-save-print-btn:hover    { background-color: #1a252f; }
  .daic-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .daic-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print styles ── */
  /* Hide everything except the print area */
  @media print {
    body * { visibility: hidden !important; }

    #daic-print-area,
    #daic-print-area * { visibility: visible !important; }

    #daic-print-area {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      padding: 15mm 20mm !important;
      background: white !important;
      font-family: 'Kalimati', 'Kokila', sans-serif !important;
      color: #000 !important;
      font-size: 11pt !important;
    }

    /* Hide UI controls in print */
    .daic-top-bar,
    .daic-footer,
    .daic-copyright,
    .applicant-details-box { display: none !important; }

    /* Show values as clean text, hide input styling */
    .daic-print-value {
      display: inline !important;
      border: none !important;
      background: transparent !important;
      padding: 0 !important;
      font-family: inherit !important;
      font-size: inherit !important;
    }
  }
`;

/* ── Print-only value display ── */
/* In screen mode shows an input, in print mode shows plain text */
const PrintField = ({ name, value, onChange, className = "", required = false, type = "text" }) => (
  <>
    {/* Screen: editable input */}
    <input
      name={name}
      type={type}
      className={`${className} daic-screen-only`}
      value={value}
      onChange={onChange}
      required={required}
      style={{ display: "inline-block" }}
    />
    {/* Print: plain text span — hidden on screen, visible on print */}
    <span
      className="daic-print-value"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      {value || ""}
    </span>
  </>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state — fixed: proper field names, all applicant fields present
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  chalan_no: "",
  subject: "सिफारिस सम्बन्धमा",
  addressee_line1: "",           // fixed: was applicant_name — causes clash
  addressee_line2: "",
  municipality_name: MUNICIPALITY.name,
  municipality_city: MUNICIPALITY.city,
  ward_no: "",
  resident_name_in_paragraph: "",
  local_select_type: "गुयुल्का",
  animal_type: "",
  animal_inspected_by: "",
  report_brief: "",
  damaged_area_description: "",
  tag_number: "",
  tag_subtype: "",
  animal_color: "",
  death_date: "",
  signer_name: "",
  signer_designation: "",
  // Footer applicant details — were missing entirely
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const DomesticAnimalInsuranceClaimRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const printRef = useRef();

  /* ── Single save function — no duplicate records ── */
  const handleSave = async (shouldPrint = false) => {
    // Basic validation
    if (!form.addressee_line1?.trim()) {
      alert("प्राप्तकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.resident_name_in_paragraph?.trim()) {
      alert("निवासीको नाम आवश्यक छ");
      return;
    }
    if (!form.animal_type?.trim()) {
      alert("पशुको प्रकार आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/domestic-animal", form);
      if (res.status === 201) {
        if (shouldPrint) {
          // Trigger clean print
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + res.data.id);
        }
        setForm(initialState);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — opens isolated print window with only the form ── */
  const handleCleanPrint = () => {
    const wardTitle = user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>पशु बिमा सिफारिस</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .addressee { margin-bottom: 16px; font-size: 11pt; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 24px; }
          .value { font-weight: bold; border-bottom: 1px dotted #333; padding: 0 4px; display: inline-block; min-width: 60px; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 200px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { border-bottom: 1px dotted #999; flex: 1; }
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

        <div class="meta">
          <div>
            <div>पत्र संख्या : <strong>२०८२/८३</strong></div>
            <div>चलानी नं. : <span class="value">${form.chalan_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <strong>२०८२-०८-०६</strong></div>
          </div>
        </div>

        <div class="subject">विषय: ${form.subject}</div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_line1 || ""}</span><br/>
          <span class="value">${form.addressee_line2 || ""}</span> ।
        </div>

        <div class="body-text">
          प्रस्तुत विषयमा जिल्ला
          <span class="value">${form.municipality_city || ""}</span>
          <span class="value">${form.municipality_name || ""}</span>
          वडा नं. <span class="value">${form.ward_no || ""}</span>
          मा बसोवास गर्ने श्री
          <span class="value">${form.resident_name_in_paragraph || ""}</span>
          ले यस पशु सेवा शाखामा पेश गरेको निवेदन, वडा
          <span class="value">${form.local_select_type || ""}</span>
          तथा पशु
          <span class="value">${form.animal_type || ""}</span>
          श्री
          <span class="value">${form.animal_inspected_by || ""}</span>
          को जाँच प्रतिवेदन अनुसार बिगा लेख
          <span class="value">${form.damaged_area_description || ""}</span>
          भएको ट्याग नं.
          <span class="value">${form.tag_number || ""}</span>
          को
          <span class="value">${form.tag_subtype || ""}</span>
          रङको
          <span class="value">${form.animal_color || ""}</span>
          मिति
          <span class="value">${form.death_date || ""}</span>
          गतेका दिन
          <span class="value">${form.report_brief || ""}</span>
          रोग लागि उपचारको क्रममा मृत्यु भएको व्यहोरा प्रमाणित साथ आवश्यक
          कारवाहिको लागि सिफारिस गरि पठाइएको व्यहोरा अनुरोध छ।
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signer_name || ""}</div>
            <div>${form.signer_designation || ""}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${form.applicant_name || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${form.applicant_address || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${form.applicant_citizenship_no || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${form.applicant_phone || ""}</span>
          </div>
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

  return (
    <>
      <style>{STYLES}</style>

      <form
        className="daic-container"
        onSubmit={(e) => { e.preventDefault(); handleSave(false); }}
      >
        {/* ── Top Bar ── */}
        <div className="daic-top-bar">
          पशु बिमा पाउँ ।
          <span className="daic-breadcrumb">पशुपालन &gt; पशु बिमा पाउँ</span>
        </div>

        {/* ── Header ── */}
        <div className="daic-header" id="daic-print-area">
          <div className="daic-header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="daic-header-text">
            <h1 className="daic-municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="daic-ward-title">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || " "} नं. वडा कार्यालय`}
            </h2>
            <p className="daic-address-text">{MUNICIPALITY.officeLine}</p>
            <p className="daic-province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="daic-meta-row">
          <div className="daic-meta-left">
            <p>पत्र संख्या : <span className="daic-bold">२०८२/८३</span></p>
            <p>
              चलानी नं. :
              <input
                name="chalan_no"
                type="text"
                className="daic-dotted-input daic-w-small"
                value={form.chalan_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="daic-meta-right">
            <p>मिति : <span className="daic-bold">२०८२-०८-०६</span></p>
            <p>ने.सं - 1146 पोहेलाथ्व, 1 आइतबार</p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="daic-subject">
          <p>विषय: <span className="daic-underline">{form.subject}</span></p>
        </div>

        {/* ── Addressee — fixed field name ── */}
        <div className="daic-addressee">
          <div className="daic-addressee-row">
            <span>श्री</span>
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="addressee_line1"
                type="text"
                className="daic-inline-input daic-w-medium"
                value={form.addressee_line1}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="daic-addressee-row">
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="addressee_line2"
                type="text"
                className="daic-inline-input daic-w-medium"
                value={form.addressee_line2}
                onChange={handleChange}
                required
              />
            </div>
            <span>,</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="daic-body">
          <p>
            प्रस्तुत विषयमा जिल्ला
            <input
              name="municipality_city"
              type="text"
              className="daic-inline-input daic-w-medium"
              value={form.municipality_city}
              onChange={handleChange}
            />
            <input
              name="municipality_name"
              type="text"
              className="daic-inline-input daic-w-medium"
              value={form.municipality_name}
              onChange={handleChange}
            />
            वडा नं.
            <input
              name="ward_no"
              type="text"
              className="daic-inline-input daic-w-small"
              value={form.ward_no}
              onChange={handleChange}
            />
            मा बसोवास गर्ने श्री
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="resident_name_in_paragraph"
                type="text"
                className="daic-inline-input daic-w-long"
                required
                value={form.resident_name_in_paragraph}
                onChange={handleChange}
              />
            </div>
            ले यस पशु सेवा शाखामा पेश गरेको निवेदन, वडा
            <select
              name="local_select_type"
              className="daic-inline-select"
              value={form.local_select_type}
              onChange={handleChange}
            >
              <option value="गुयुल्का">गुयुल्का</option>
              <option value="वडा">वडा</option>
            </select>
            तथा पशु
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="animal_type"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.animal_type}
                onChange={handleChange}
              />
            </div>
            श्री
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="animal_inspected_by"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.animal_inspected_by}
                onChange={handleChange}
              />
            </div>
            को जाँच प्रतिवेदन अनुसार बिगा लेख
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="damaged_area_description"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.damaged_area_description}
                onChange={handleChange}
              />
            </div>
            भएको ट्याग नं.
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="tag_number"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.tag_number}
                onChange={handleChange}
              />
            </div>
            को
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="tag_subtype"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.tag_subtype}
                onChange={handleChange}
              />
            </div>
            रङको
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="animal_color"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.animal_color}
                onChange={handleChange}
              />
            </div>
            मिति
            <input
              name="death_date"
              type="date"
              className="daic-inline-input daic-w-medium"
              value={form.death_date}
              onChange={handleChange}
            />
            गतेका दिन
            <div className="daic-req-wrap">
              <span className="daic-req-star">*</span>
              <input
                name="report_brief"
                type="text"
                className="daic-inline-input daic-w-medium"
                required
                value={form.report_brief}
                onChange={handleChange}
              />
            </div>
            रोग लागि उपचारको क्रममा मृत्यु भएको व्यहोरा प्रमाणित साथ आवश्यक
            कारवाहिको लागि सिफारिस गरि पठाइएको व्यहोरा अनुरोध छ।
          </p>
        </div>

        {/* ── Signature ── */}
        <div className="daic-signature-section">
          <div className="daic-signature-block">
            <div className="daic-signature-line"></div>
            <div className="daic-req-wrap" style={{ width: "100%" }}>
              <span className="daic-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="daic-sig-name-input"
                required
                value={form.signer_name}
                onChange={handleChange}
              />
            </div>
            <select
              name="signer_designation"
              className="daic-designation-select"
              value={form.signer_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons ── */}
        <div className="daic-footer">
          <button
            type="submit"
            className="daic-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="daic-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="daic-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default DomesticAnimalInsuranceClaimRecommendation;