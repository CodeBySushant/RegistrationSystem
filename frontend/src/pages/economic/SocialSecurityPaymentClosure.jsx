// SocialSecurityPaymentClosure.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles — all classes prefixed "sspc-" to avoid global collisions
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .sspc-container {
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

  .sspc-bold      { font-weight: bold; }
  .sspc-underline { text-decoration: underline; }

  .sspc-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .sspc-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  .sspc-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .sspc-meta-left p, .sspc-meta-right p { margin: 5px 0; }
  .sspc-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .sspc-w-small  { width: 120px; }
  .sspc-w-medium { width: 160px; }

  .sspc-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  .sspc-addressee     { margin-bottom: 20px; font-size: 1.05rem; }
  .sspc-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

  .sspc-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 30px;
  }
  .sspc-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .sspc-w-tiny-box   { width: 60px;  text-align: center; }
  .sspc-w-medium-box { width: 160px; }

  /* ── Red * wrapper — works inline and inside table cells ── */
  .sspc-req-wrap {
    position: relative;
    display: inline-block;
  }
  .sspc-req-wrap.sspc-req-block { display: block; width: 100%; }
  .sspc-req-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
    z-index: 1;
  }
  .sspc-req-wrap input { padding-left: 18px; }

  /* ── Table ── */
  .sspc-table-section { margin-top: 20px; margin-bottom: 30px; }
  .sspc-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .sspc-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }
  .sspc-table td     { border: 1px solid #555; padding: 5px; vertical-align: middle; }
  .sspc-table-input  {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px 4px 4px 18px;
    font-size: 1rem;
    color: #e74c3c;
    font-family: inherit;
    box-sizing: border-box;
  }
  .sspc-row-num      { text-align: center; font-weight: 600; }
  .sspc-row-actions  { text-align: center; width: 50px; }
  .sspc-remove-row-btn {
    background: #c0392b;
    color: #fff;
    border: none;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    font-family: inherit;
  }
  .sspc-remove-row-btn:hover { background: #962d22; }
  .sspc-remove-row-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .sspc-add-row-btn {
    margin-top: 10px;
    background: #2c3e50;
    color: #fff;
    border: none;
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    font-family: inherit;
  }
  .sspc-add-row-btn:hover { background: #1a252f; }

  /* ── Signature ── */
  .sspc-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .sspc-signature-block   { width: 220px; text-align: center; }
  .sspc-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .sspc-sig-name-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  .sspc-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Footer ── */
  .sspc-footer { text-align: center; margin-top: 40px; }
  .sspc-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .sspc-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .sspc-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .sspc-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   - Hardcoded dates moved into editable fields
   - Table fields replaced with table_rows[] for dynamic rows
   - ApplicantDetailsNp fields included
───────────────────────────────────────────────────────────────────────────── */
const emptyRow = {
  name: "",
  citizenship_no: "",
  amount: "",
  return_amount: "",
  beneficiary_no: "",
};

const initialState = {
  // Meta
  chalani_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  nepali_date_label: "",

  // Subject (fixed)
  subject: "सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिदिने",

  // Addressee
  addressee_office: "",
  addressee_address: "",

  // Body
  municipality_name: MUNICIPALITY?.name || "",
  ward_no: MUNICIPALITY?.wardNumber || "",
  old_ward_no: "",
  ward_no_new: "",
  fiscal_year: "",
  allowance_type: "",
  death_date: "",
  citizenship_no_inline: "",
  citizenship_issue_date: "",
  beneficiary_inline_name: "",

  // Dynamic table
  table_rows: [{ ...emptyRow }],

  // Signature
  signer_name: "",
  signer_designation: "",

  // ApplicantDetailsNp
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const SocialSecurityPaymentClosure = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Dynamic table row handlers ── */
  const handleRowChange = (index, field, value) => {
    setForm((prev) => {
      const rows = [...prev.table_rows];
      rows[index] = { ...rows[index], [field]: value };
      return { ...prev, table_rows: rows };
    });
  };

  const addRow = () => {
    setForm((prev) => ({
      ...prev,
      table_rows: [...prev.table_rows, { ...emptyRow }],
    }));
  };

  const removeRow = (index) => {
    setForm((prev) => {
      if (prev.table_rows.length <= 1) return prev;
      return {
        ...prev,
        table_rows: prev.table_rows.filter((_, i) => i !== index),
      };
    });
  };

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.addressee_office?.trim()) {
      alert("प्राप्तकर्ताको कार्यालय आवश्यक छ");
      return;
    }
    if (!form.addressee_address?.trim()) {
      alert("प्राप्तकर्ताको ठेगाना आवश्यक छ");
      return;
    }
    if (!form.signer_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!form.table_rows?.length || !form.table_rows[0].name?.trim()) {
      alert("कम्तीमा एक लाभग्राहीको विवरण आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/forms/social-security-payment-closure",
        form,
      );
      if (res.status === 201) {
        if (shouldPrint) {
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

  /* ── Clean print — isolated window, no surrounding UI ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const tableRowsHtml = form.table_rows
      .map(
        (row, i) => `
        <tr>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${i + 1}</td>
          <td style="border:1px solid #555; padding:6px;">${row.name || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${row.citizenship_no || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${row.amount || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${row.return_amount || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${row.beneficiary_no || ""}</td>
        </tr>`,
      )
      .join("");

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>सामाजिक सुरक्षा भत्ता रकम भुक्तानी</title>
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
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .data-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10.5pt; }
          .data-table th { background: #e0e0e0; border: 1px solid #555; padding: 6px; text-align: left; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 200px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
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

        <div class="meta">
          <div>
            <div>पत्र संख्या : <strong>२०८२/८३</strong></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <strong>${form.issue_date || ""}</strong></div>
            <div>ने.सं : <strong>${form.nepali_date_label || ""}</strong></div>
          </div>
        </div>

        <div class="subject">विषय: ${form.subject}</div>

        <div class="addressee">
          श्री <span class="value">${form.addressee_office || ""}</span><br/>
          <span class="value">${form.addressee_address || ""}</span> ।
        </div>

        <div class="body-text">
          प्रस्तुत विषयमा यस
          <span class="value">${form.municipality_name || ""}</span>
          वडा नं. <span class="value">${form.ward_no || ""}</span>
          साविक <span class="value">${form.old_ward_no || ""}</span>
          वडा नं. <span class="value">${form.ward_no_new || ""}</span>
          बाट आ.व. <span class="value">${form.fiscal_year || ""}</span>
          को <span class="value">${form.allowance_type || ""}</span>
          बापतको सामाजिक सुरक्षा भत्ता प्राप्त गर्ने तपसिल बमोजिमको लाभग्राहीको
          मिति <span class="value">${form.death_date || ""}</span>
          मा मृत्यु भएको हुँदा उक्त लाभग्राहीको नाममा जम्मा भएको सामाजिक सुरक्षा
          भत्ता रकम कानुन बमोजिम निजको हकवाला ना.प्र.नं.
          <span class="value">${form.citizenship_no_inline || ""}</span>
          जारी मिति <span class="value">${form.citizenship_issue_date || ""}</span>
          भएको <span class="value">${form.beneficiary_inline_name || ""}</span>
          लाई उपलब्ध गरि निज मृतकको खाता बन्द गरिदिन हुन अनुरोध छ ।
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th style="width:6%">क्र.सं.</th>
              <th style="width:24%">नाम थर</th>
              <th style="width:17%">ना.प्र.नं</th>
              <th style="width:16%">पाउने रकम</th>
              <th style="width:16%">फिर्ता रकम</th>
              <th style="width:21%">लाभग्राही नं</th>
            </tr>
          </thead>
          <tbody>${tableRowsHtml}</tbody>
        </table>

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

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form
        className="sspc-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Top Bar ── */}
        <div className="sspc-top-bar">
          सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिदिने
          <span className="sspc-breadcrumb">
            आर्थिक &gt; सामाजिक सुरक्षा भत्ता रकम भुक्तानी
          </span>
        </div>

        {/* ── Header — replaced inline block with shared component ── */}
        <MunicipalityHeader />

        {/* ── Meta — all hardcoded values now inputs ── */}
        <div className="sspc-meta-row">
          <div className="sspc-meta-left">
            <p>
              पत्र संख्या :
              <span className="sspc-req-wrap">
                <span className="sspc-req-star">*</span>
                <input
                  name="patra_sankhya"
                  type="text"
                  className="sspc-dotted-input sspc-w-small"
                  value={form.patra_sankhya || "२०८२/८३"}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :
              <span className="sspc-req-wrap">
                <span className="sspc-req-star">*</span>
                <input
                  name="chalani_no"
                  type="text"
                  className="sspc-dotted-input sspc-w-small"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="sspc-meta-right">
            <p>
              मिति :
              <span className="sspc-req-wrap">
                <span className="sspc-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="sspc-dotted-input sspc-w-medium"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                  style={{ backgroundColor: "#fff" }}
                />
              </span>
            </p>
            <p>
              ने.सं :
              <span className="sspc-req-wrap">
                <span className="sspc-req-star">*</span>
                <input
                  name="nepali_date_label"
                  type="text"
                  className="sspc-dotted-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  value={form.nepali_date_label || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="sspc-subject">
          <p>
            विषय: <span className="sspc-underline">{form.subject}</span>
          </p>
        </div>

        {/* ── Addressee ── */}
        <div className="sspc-addressee">
          <div className="sspc-addressee-row">
            <span>श्री</span>
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="addressee_office"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.addressee_office}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="sspc-addressee-row">
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="addressee_address"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.addressee_address}
                onChange={handleChange}
                required
              />
            </span>
            <span>,</span>
          </div>
        </div>

        {/* ── Body — every input wrapped with red *, hardcoded dates now editable ── */}
        <div className="sspc-body">
          <p>
            प्रस्तुत विषयमा यस
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="municipality_name"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.municipality_name}
                onChange={handleChange}
              />
            </span>
            वडा नं.
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="ward_no"
                type="text"
                className="sspc-inline-input sspc-w-tiny-box"
                value={form.ward_no}
                onChange={handleChange}
              />
            </span>
            साविक
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="old_ward_no"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.old_ward_no}
                onChange={handleChange}
              />
            </span>
            वडा नं.
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="ward_no_new"
                type="text"
                className="sspc-inline-input sspc-w-tiny-box"
                value={form.ward_no_new}
                onChange={handleChange}
              />
            </span>
            बाट आ.व.
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="fiscal_year"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.fiscal_year}
                onChange={handleChange}
              />
            </span>
            को
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="allowance_type"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.allowance_type}
                onChange={handleChange}
              />
            </span>
            बापतको सामाजिक सुरक्षा भत्ता प्राप्त गर्ने तपसिल बमोजिमको
            लाभग्राहीको मिति
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="death_date"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                placeholder="जस्तै: २०८२-०८-०६"
                value={form.death_date}
                onChange={handleChange}
              />
            </span>
            मा मृत्यु भएको हुँदा उक्त लाभग्राहीको नाममा जम्मा भएको सामाजिक
            सुरक्षा भत्ता रकम कानुन बमोजिम निजको हकवाला ना.प्र.नं.
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="citizenship_no_inline"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.citizenship_no_inline}
                onChange={handleChange}
              />
            </span>
            जारी मिति
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="citizenship_issue_date"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                placeholder="जस्तै: २०८२-०८-०६"
                value={form.citizenship_issue_date}
                onChange={handleChange}
              />
            </span>
            भएको
            <span className="sspc-req-wrap">
              <span className="sspc-req-star">*</span>
              <input
                name="beneficiary_inline_name"
                type="text"
                className="sspc-inline-input sspc-w-medium-box"
                value={form.beneficiary_inline_name}
                onChange={handleChange}
              />
            </span>
            लाई उपलब्ध गरि निज मृतकको खाता बन्द गरिदिन हुन अनुरोध छ ।
          </p>
        </div>

        {/* ── Dynamic Table — add/remove rows ── */}
        <div className="sspc-table-section">
          <table className="sspc-table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>क्र.सं.</th>
                <th style={{ width: "22%" }}>नाम थर</th>
                <th style={{ width: "16%" }}>ना.प्र.नं</th>
                <th style={{ width: "15%" }}>पाउने रकम</th>
                <th style={{ width: "15%" }}>फिर्ता रकम</th>
                <th style={{ width: "17%" }}>लाभग्राही नं</th>
                <th style={{ width: "10%" }}>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {form.table_rows.map((row, i) => (
                <tr key={i}>
                  <td className="sspc-row-num">{i + 1}</td>
                  <td>
                    <span className="sspc-req-wrap sspc-req-block">
                      <span className="sspc-req-star">*</span>
                      <input
                        type="text"
                        className="sspc-table-input"
                        value={row.name}
                        onChange={(e) =>
                          handleRowChange(i, "name", e.target.value)
                        }
                        required
                      />
                    </span>
                  </td>
                  <td>
                    <span className="sspc-req-wrap sspc-req-block">
                      <span className="sspc-req-star">*</span>
                      <input
                        type="text"
                        className="sspc-table-input"
                        value={row.citizenship_no}
                        onChange={(e) =>
                          handleRowChange(i, "citizenship_no", e.target.value)
                        }
                        required
                      />
                    </span>
                  </td>
                  <td>
                    <span className="sspc-req-wrap sspc-req-block">
                      <span className="sspc-req-star">*</span>
                      <input
                        type="text"
                        className="sspc-table-input"
                        value={row.amount}
                        onChange={(e) =>
                          handleRowChange(i, "amount", e.target.value)
                        }
                        required
                      />
                    </span>
                  </td>
                  <td>
                    <span className="sspc-req-wrap sspc-req-block">
                      <span className="sspc-req-star">*</span>
                      <input
                        type="text"
                        className="sspc-table-input"
                        value={row.return_amount}
                        onChange={(e) =>
                          handleRowChange(i, "return_amount", e.target.value)
                        }
                        required
                      />
                    </span>
                  </td>
                  <td>
                    <span className="sspc-req-wrap sspc-req-block">
                      <span className="sspc-req-star">*</span>
                      <input
                        type="text"
                        className="sspc-table-input"
                        value={row.beneficiary_no}
                        onChange={(e) =>
                          handleRowChange(i, "beneficiary_no", e.target.value)
                        }
                        required
                      />
                    </span>
                  </td>
                  <td className="sspc-row-actions">
                    <button
                      type="button"
                      className="sspc-remove-row-btn"
                      onClick={() => removeRow(i)}
                      disabled={form.table_rows.length <= 1}
                      title="यो पङ्क्ति हटाउनुहोस्"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="sspc-add-row-btn" onClick={addRow}>
            + पङ्क्ति थप्नुहोस्
          </button>
        </div>

        {/* ── Signature ── */}
        <div className="sspc-signature-section">
          <div className="sspc-signature-block">
            <div className="sspc-signature-line"></div>
            <span className="sspc-req-wrap sspc-req-block">
              <span className="sspc-req-star">*</span>
              <input
                name="signer_name"
                type="text"
                className="sspc-sig-name-input"
                value={form.signer_name}
                onChange={handleChange}
                required
              />
            </span>
            <select
              name="signer_designation"
              className="sspc-designation-select"
              value={form.signer_designation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
            </select>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons — Save (submit) + Save & Print (button) ── */}
        <div className="sspc-footer">
          <button
            type="submit"
            className="sspc-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="sspc-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="sspc-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default SocialSecurityPaymentClosure;
