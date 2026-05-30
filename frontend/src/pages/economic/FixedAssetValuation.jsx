import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";

/* ─────────────────────────────────────────────
   STYLES — scoped under .valuation-container
───────────────────────────────────────────── */
const styles = `
  /* --- Main Container --- */
  .valuation-container {
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

  /* --- Top Bar --- */
  .valuation-container .top-bar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }

  .valuation-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Meta Data --- */
  .valuation-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .valuation-container .meta-left p,
  .valuation-container .meta-right p { margin: 5px 0; }

  /* Meta input — was transparent; now white bg + border */
  .valuation-container .dotted-input {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    outline: none;
    padding: 4px 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .valuation-container .small-input { width: 120px; }
  .valuation-container .date-input  { width: 170px; }

  /* --- Subject --- */
  .valuation-container .subject-section {
    text-align: center;
    margin: 20px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .valuation-container .underline-text { text-decoration: underline; }
  .valuation-container .bold-text { font-weight: bold; }

  /* --- Fieldsets --- */
  .valuation-container fieldset {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px 20px;
    margin-bottom: 20px;
    background-color: rgba(255,255,255,0.35);
  }

  .valuation-container legend {
    font-weight: bold;
    font-size: 1rem;
    padding: 0 8px;
    color: #2c3e50;
  }

  /* --- Grid Row --- */
  .valuation-container .grid-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px 20px;
    margin-bottom: 14px;
    align-items: center;
  }

  .valuation-container .grid-row label {
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
  }

  .valuation-container .grid-row input,
  .valuation-container .grid-row textarea,
  .valuation-container .grid-row select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 0.95rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
  }

  .valuation-container .grid-row textarea {
    resize: vertical;
    min-height: 60px;
  }

  /* --- Table Section --- */
  .valuation-container .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .valuation-container .valuation-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
    min-width: 700px;
  }

  .valuation-container .valuation-table th {
    background-color: #eee;
    border: 1px solid #777;
    padding: 8px;
    text-align: center;
    font-size: 0.88rem;
    font-weight: bold;
    color: #444;
  }

  .valuation-container .valuation-table td {
    border: 1px solid #777;
    padding: 4px;
    vertical-align: middle;
  }

  .valuation-container .table-input {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 0.95rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    box-sizing: border-box;
  }

  .valuation-container .row-btn {
    background: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 3px 8px;
    cursor: pointer;
    font-size: 1rem;
    margin: 2px;
  }

  .valuation-container .row-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .valuation-container .row-btn.remove { background: #c0392b; }
  .valuation-container .row-btn.add    { background: #27ae60; }

  /* --- Signature Section --- */
  .valuation-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .valuation-container .signature-block {
    width: 240px;
    text-align: center;
  }

  .valuation-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    width: 100%;
  }

  /* Signer name — was transparent; now white bg + border + margin */
  .valuation-container .sig-name-input {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 3px;
    padding: 6px 10px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  .valuation-container .designation-select {
    width: 100%;
    margin-top: 4px;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 1rem;
  }

  /* --- Red * wrapper --- */
  .valuation-container .val-req-wrap {
    position: relative;
    display: inline-block;
  }
  .valuation-container .val-req-wrap.val-req-block {
    display: block;
    width: 100%;
  }
  .valuation-container .val-req-star {
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
  .valuation-container .val-req-wrap input { padding-left: 18px; }

  /* --- Notes section (standalone) --- */
  .valuation-container .notes-section {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .valuation-container .notes-section label {
    display: block;
    font-weight: bold;
    color: #333;
    margin-bottom: 6px;
  }
  .valuation-container .notes-section textarea {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    padding: 8px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    font-size: 0.95rem;
    box-sizing: border-box;
    resize: vertical;
    min-height: 80px;
  }

  /* --- Footer --- */
  .valuation-container .form-footer { text-align: center; margin-top: 40px; }

  .valuation-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .valuation-container .save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .valuation-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .valuation-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .valuation-container { padding: 20px 16px; }
    .valuation-container .grid-row { grid-template-columns: 1fr; }
    .valuation-container .signature-section { justify-content: center; }
    .valuation-container .meta-data-row { flex-direction: column; }
    .valuation-container .small-input,
    .valuation-container .date-input { width: 100% !important; }
    .valuation-container .form-footer { display: flex; flex-direction: column; gap: 10px; }
    .valuation-container .form-footer button { width: 100%; margin: 0 !important; }
  }
`;

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const emptyRow = () => ({
  owner_name: "",
  owner_sabik: "",
  owner_ward: "",
  owner_kitta_no: "",
  owner_area: "",
  owner_rate: "",
  owner_remarks: "",
});

const initialState = {
  // Meta — defaults + ne_sa added for consistency with other forms
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  ne_sa: "",

  // Former location
  former_area: "",
  former_vdc_mun: "",
  former_ward: "",

  // Current location (defaults to current municipality)
  current_municipality: MUNICIPALITY?.name || "",
  current_ward: MUNICIPALITY?.wardNumber || "",

  // Person / application
  person_title: "",
  person_name: "",
  application_to: "",
  application_ward: "",

  // Signature
  signature_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // Notes
  notes: "",
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const FixedAssetValuation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [rows, setRows] = useState([emptyRow()]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /* ── Table row handlers ── */
  const updateRow = (index, field, value) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Single save function — one POST, optionally print after ── */
  const handleSave = async (shouldPrint = false) => {
    if (!form.person_name?.trim()) {
      alert("निवेदकको नाम आवश्यक छ");
      return;
    }
    if (!form.signature_name?.trim()) {
      alert("हस्ताक्षरकर्ताको नाम आवश्यक छ");
      return;
    }
    if (!rows.length || !rows[0].owner_name?.trim()) {
      alert("कम्तीमा एक जग्गा धनीको विवरण आवश्यक छ");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, tapashil_rows: rows };
      const res = await axios.post("/api/forms/fixed-asset-valuation", payload);
      if (res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + res.data.id);
        }
        setForm(initialState);
        setRows([emptyRow()]);
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

  /* ── Clean print — isolated window ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const tableRowsHtml = rows
      .map(
        (r, i) => `
        <tr>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${i + 1}</td>
          <td style="border:1px solid #555; padding:6px;">${r.owner_name || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.owner_sabik || ""}</td>
          <td style="border:1px solid #555; padding:6px; text-align:center;">${r.owner_ward || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.owner_kitta_no || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.owner_area || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.owner_rate || ""}</td>
          <td style="border:1px solid #555; padding:6px;">${r.owner_remarks || ""}</td>
        </tr>`
      )
      .join("");

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>अचल सम्पत्ति मुल्यांकन</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.7;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          /* value spans size to content — small values stay tight, long values don't merge */
          .value { font-weight: bold; padding: 0 4px; white-space: nowrap; }
          .section-box { border: 1px solid #999; padding: 14px; margin-top: 16px; border-radius: 3px; }
          .section-title { font-weight: bold; text-decoration: underline; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; font-size: 11pt; }
          .field-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 30px;
            row-gap: 6px;
          }
          .field-row { display: flex; font-size: 10pt; margin-bottom: 4px; }
          .field-label { min-width: 140px; font-weight: 600; }
          .field-val { flex: 1; }
          .data-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
          .data-table th { background: #e0e0e0; border: 1px solid #555; padding: 6px; text-align: center; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .signature { display: flex; justify-content: flex-end; margin-top: 40px; margin-bottom: 24px; }
          .sig-block { width: 200px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; margin-bottom: 4px; }
          .notes-box { margin-top: 16px; padding: 10px; border: 1px solid #ddd; border-radius: 3px; min-height: 40px; font-size: 10pt; }
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
            <div>पत्र संख्या : <span class="value">${form.patra_sankhya || ""}</span></div>
            <div>चलानी नं. : <span class="value">${form.chalani_no || ""}</span></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <span class="value">${form.issue_date || ""}</span></div>
            <div>ने.सं : <span class="value">${form.ne_sa || ""}</span></div>
          </div>
        </div>

        <div class="subject">विषय: अचल सम्पत्ति मुल्यांकन सम्बन्धमा।</div>

        <div class="section-box">
          <div class="section-title">मुख्य विवरण</div>
          <div class="field-grid">
            <div class="field-row"><span class="field-label">साविक जिल्ला/क्षेत्र:</span><span class="field-val">${form.former_area || ""}</span></div>
            <div class="field-row"><span class="field-label">साविक गा.वि.स./नगर:</span><span class="field-val">${form.former_vdc_mun || ""}</span></div>
            <div class="field-row"><span class="field-label">साविक वडा नं.:</span><span class="field-val">${form.former_ward || ""}</span></div>
            <div class="field-row"><span class="field-label">हालको नगरपालिका:</span><span class="field-val">${form.current_municipality || ""}</span></div>
            <div class="field-row"><span class="field-label">हालको वडा नं.:</span><span class="field-val">${form.current_ward || ""}</span></div>
            <div class="field-row"><span class="field-label">निवेदक पद:</span><span class="field-val">${form.person_title || ""}</span></div>
            <div class="field-row"><span class="field-label">निवेदकको नाम:</span><span class="field-val">${form.person_name || ""}</span></div>
            <div class="field-row"><span class="field-label">सम्बोधन:</span><span class="field-val">${form.application_to || ""}</span></div>
            <div class="field-row"><span class="field-label">सम्बोधन वडा:</span><span class="field-val">${form.application_ward || ""}</span></div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">तपशीिल — जमीन विवरण</div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:5%">#</th>
                <th style="width:18%">जग्गा धनी</th>
                <th style="width:15%">साविक</th>
                <th style="width:7%">वडा</th>
                <th style="width:12%">कित्ता नं.</th>
                <th style="width:12%">क्षेत्रफल</th>
                <th style="width:14%">दर/प्रति कठ्ठा</th>
                <th style="width:17%">कैफियत</th>
              </tr>
            </thead>
            <tbody>${tableRowsHtml}</tbody>
          </table>
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${form.signature_name || ""}</div>
            <div>${form.signer_designation || ""}</div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span class="field-val">${form.applicant_name || ""}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span class="field-val">${form.applicant_address || ""}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span class="field-val">${form.applicant_citizenship_no || ""}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span class="field-val">${form.applicant_phone || ""}</span></div>
        </div>

        ${form.notes?.trim() ? `
        <div class="section-box">
          <div class="section-title">कैफियत / नोट्स</div>
          <div class="notes-box">${form.notes}</div>
        </div>` : ""}
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

  /* ─────────────────────────────────────────────
     Render
  ───────────────────────────────────────────── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="valuation-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          अचल सम्पत्ति मुल्यांकन
          <span className="top-right-bread">
            आर्थिक &gt; अचल सम्पत्ति मुल्यांकन
          </span>
        </div>

        {/* --- Header (shared component replaces inline block) --- */}
        <MunicipalityHeader />

        {/* --- Meta Data — all hardcoded values now editable, ne_sa added --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <span className="val-req-wrap">
                <span className="val-req-star">*</span>
                <input
                  name="patra_sankhya"
                  type="text"
                  className="dotted-input small-input"
                  value={form.patra_sankhya}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              चलानी नं. :{" "}
              <span className="val-req-wrap">
                <span className="val-req-star">*</span>
                <input
                  name="chalani_no"
                  type="text"
                  className="dotted-input small-input"
                  placeholder="जस्तै: ००१"
                  value={form.chalani_no}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <span className="val-req-wrap">
                <span className="val-req-star">*</span>
                <input
                  name="issue_date"
                  type="date"
                  className="dotted-input date-input"
                  value={form.issue_date || ""}
                  onChange={handleChange}
                />
              </span>
            </p>
            <p>
              ने.सं :{" "}
              <span className="val-req-wrap">
                <span className="val-req-star">*</span>
                <input
                  name="ne_sa"
                  type="text"
                  className="dotted-input"
                  style={{ width: "220px" }}
                  placeholder="जस्तै: 1146 थिंलाथ्व, 2 शनिवार"
                  value={form.ne_sa}
                  onChange={handleChange}
                />
              </span>
            </p>
          </div>
        </div>

        {/* --- Subject (hardcoded) --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              अचल सम्पत्ति मुल्यांकन सम्बन्धमा।
            </span>
          </p>
        </div>

        {/* --- Main Details Fieldset --- */}
        <fieldset>
          <legend>मुख्य विवरण</legend>

          <div className="grid-row">
            <label>साविक जिल्ला / क्षेत्र</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="former_area"
                value={form.former_area}
                onChange={handleChange}
              />
            </span>
            <label>साविक (गा.वि.स./नगर)</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="former_vdc_mun"
                value={form.former_vdc_mun}
                onChange={handleChange}
              />
            </span>
            <label>साविक वडा नं.</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="former_ward"
                value={form.former_ward}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className="grid-row">
            <label>हालको नगरपालिका</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="current_municipality"
                value={form.current_municipality}
                onChange={handleChange}
              />
            </span>
            <label>हालको वडा नं.</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="current_ward"
                value={form.current_ward}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className="grid-row">
            <label>निवेदक पद</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="person_title"
                value={form.person_title}
                onChange={handleChange}
              />
            </span>
            <label>निवेदकको नाम</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="person_name"
                value={form.person_name}
                onChange={handleChange}
                required
              />
            </span>
            <label>सम्बोधन (to)</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="application_to"
                value={form.application_to}
                onChange={handleChange}
              />
            </span>
            <label>सम्बोधन वडा</label>
            <span className="val-req-wrap val-req-block">
              <span className="val-req-star">*</span>
              <input
                name="application_ward"
                value={form.application_ward}
                onChange={handleChange}
              />
            </span>
          </div>
        </fieldset>

        {/* --- Tapashil Table Fieldset --- */}
        <fieldset>
          <legend>तपशीिल (Tapashil) — जमीन विवरण</legend>
          <div className="table-responsive">
            <table className="valuation-table">
              <thead>
                <tr>
                  <th style={{ width: "30px" }}>#</th>
                  <th>जग्गा धनी</th>
                  <th>साविक</th>
                  <th style={{ width: "60px" }}>वडा</th>
                  <th style={{ width: "90px" }}>कित्ता नं.</th>
                  <th style={{ width: "100px" }}>क्षेत्रफल</th>
                  <th style={{ width: "110px" }}>दर/प्रति कठ्ठा</th>
                  <th>कैफियत</th>
                  <th style={{ width: "80px" }}>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td>
                      <span className="val-req-wrap val-req-block">
                        <span className="val-req-star">*</span>
                        <input
                          className="table-input"
                          value={r.owner_name}
                          onChange={(e) => updateRow(i, "owner_name", e.target.value)}
                          required
                        />
                      </span>
                    </td>
                    <td>
                      <span className="val-req-wrap val-req-block">
                        <span className="val-req-star">*</span>
                        <input
                          className="table-input"
                          value={r.owner_sabik}
                          onChange={(e) => updateRow(i, "owner_sabik", e.target.value)}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="val-req-wrap val-req-block">
                        <span className="val-req-star">*</span>
                        <input
                          className="table-input"
                          value={r.owner_ward}
                          onChange={(e) => updateRow(i, "owner_ward", e.target.value)}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="val-req-wrap val-req-block">
                        <span className="val-req-star">*</span>
                        <input
                          className="table-input"
                          value={r.owner_kitta_no}
                          onChange={(e) => updateRow(i, "owner_kitta_no", e.target.value)}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="val-req-wrap val-req-block">
                        <span className="val-req-star">*</span>
                        <input
                          className="table-input"
                          value={r.owner_area}
                          onChange={(e) => updateRow(i, "owner_area", e.target.value)}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="val-req-wrap val-req-block">
                        <span className="val-req-star">*</span>
                        <input
                          className="table-input"
                          value={r.owner_rate}
                          onChange={(e) => updateRow(i, "owner_rate", e.target.value)}
                        />
                      </span>
                    </td>
                    <td>
                      <input
                        className="table-input"
                        value={r.owner_remarks}
                        onChange={(e) => updateRow(i, "owner_remarks", e.target.value)}
                      />
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <button
                        type="button"
                        className="row-btn remove"
                        onClick={() => removeRow(i)}
                        disabled={rows.length === 1}
                        title="पङ्क्ति हटाउनुहोस्"
                      >
                        −
                      </button>
                      {i === rows.length - 1 && (
                        <button
                          type="button"
                          className="row-btn add"
                          onClick={addRow}
                          title="पङ्क्ति थप्नुहोस्"
                        >
                          +
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>

        {/* --- Signature Fieldset (own fieldset, no longer merged with applicant) --- */}
        <fieldset>
          <legend>हस्ताक्षर</legend>
          <div className="signature-section">
            <div className="signature-block">
              <div className="signature-line"></div>
              <span className="val-req-wrap val-req-block">
                <span className="val-req-star">*</span>
                <input
                  name="signature_name"
                  type="text"
                  className="sig-name-input"
                  required
                  value={form.signature_name}
                  onChange={handleChange}
                />
              </span>
              <select
                name="signer_designation"
                className="designation-select"
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
        </fieldset>

        {/* --- Applicant Details (own container — no longer inside fieldset) --- */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Notes (standalone section) --- */}
        <div className="notes-section">
          <label>कैफियत / नोट्स</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="कुनै अतिरिक्त जानकारी..."
          />
        </div>

        {/* --- Footer buttons --- */}
        <div className="form-footer">
          <button
            type="submit"
            className="save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default FixedAssetValuation;