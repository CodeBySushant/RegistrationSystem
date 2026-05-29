// LeaveRequestApplication.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .lra-container {
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
    min-height: 100vh;
  }

  /* ── Utility ── */
  .lra-bold { font-weight: bold; }
  .lra-red  { color: #c0392b; }
  .lra-req  { color: red; font-weight: bold; margin: 0 2px; vertical-align: middle; }

  /* ── Top Bar ── */
  .lra-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .lra-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .lra-header {
    text-align: center;
    margin-bottom: 28px;
    position: relative;
    min-height: 90px;
  }

  /* ── Meta row ── */
  .lra-meta-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .lra-meta-left p,
  .lra-meta-right p { margin: 4px 0; }

  /* ── Required-star input wrapper ── */
  .lra-star-wrap {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    flex: 1;
  }
  .lra-star {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    font-size: 13px;
    pointer-events: none;
    z-index: 1;
    line-height: 1;
  }
  .lra-star-wrap .lra-dotted-input { padding-left: 16px; width: 100%; }

  /* ── Shared inputs ── */
  .lra-dotted-input {
    border: none;
    border-bottom: 1px dotted #555;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-size: 1rem;
    font-family: inherit;
  }
  .lra-dotted-input:disabled { opacity: 0.45; cursor: not-allowed; }
  .lra-full-width   { width: 100%; }
  .lra-medium-width { width: 200px; }
  .lra-small-width  { width: 90px; text-align: center; }

  .lra-line-select {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px;
    font-size: 1rem;
    font-family: inherit;
    min-width: 200px;
    border-radius: 3px;
  }

  /* ── Form grid ── */
  .lra-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 48px;
    row-gap: 20px;
    margin-bottom: 10px;
  }
  @media (max-width: 640px) {
    .lra-form-grid { grid-template-columns: 1fr; }
  }
  .lra-form-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .lra-form-group label { white-space: nowrap; font-size: 1rem; flex-shrink: 0; }
  .lra-date-range-group { grid-column: 1 / -1; }
  .lra-range-sep        { font-size: 0.95rem; flex-shrink: 0; margin: 0 2px; }
  .lra-reason-label-group { align-items: flex-start; }

  /* ── Reason textarea ── */
  .lra-reason-section { margin-bottom: 28px; }
  .lra-reason-textarea {
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    background-color: rgba(255,255,255,0.8);
    border-radius: 3px;
    outline: none;
    box-sizing: border-box;
  }
  .lra-reason-textarea:focus { border-color: #aaa; }

  /* ── Leave type table ── */
  .lra-leave-table-section { margin-bottom: 40px; }
  .lra-leave-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #555;
  }
  .lra-leave-table th {
    background-color: #bbb;
    border: 1px solid #555;
    padding: 9px 12px;
    text-align: center;
    font-weight: bold;
    color: #222;
    font-size: 0.95rem;
  }
  .lra-leave-table td {
    border: 1px solid #555;
    padding: 7px 10px;
    font-size: 0.98rem;
    vertical-align: middle;
  }
  .lra-text-center  { text-align: center; }
  .lra-row-selected { background-color: rgba(255,255,255,0.55); }

  .lra-leave-table input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #2c3e50;
  }
  .lra-leave-table .lra-star-wrap      { display: inline-flex; align-items: center; }
  .lra-leave-table .lra-small-width    { width: 80px; }

  /* ── Footer ── */
  .lra-footer { text-align: center; margin-top: 36px; }
  .lra-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 28px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .lra-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .lra-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Status messages ── */
  .lra-msg {
    margin-top: 12px;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.95rem;
    text-align: center;
  }
  .lra-msg--error   { color: #a93226; background: #fdf2f2; border: 1px solid #f5c6c6; }
  .lra-msg--success { color: #196f3d; background: #f2fdf5; border: 1px solid #b7e4c7; }

  /* ── Copyright ── */
  .lra-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 28px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const FORM_KEY = "leave-request-application";

const DEFAULT_LEAVE_TYPES = [
  { id: 1, key: "casual",    label: "अनिवार्य / क्यासुअल" },
  { id: 2, key: "sick",      label: "रोग/स्वास्थ्य सम्बन्धी" },
  { id: 3, key: "annual",    label: "वार्षिक" },
  { id: 4, key: "maternity", label: "गर्भवती/प्रसूत" },
  { id: 5, key: "other",     label: "अन्य" },
];

const INITIAL_FORM = {
  letter_no: "२०८२/८३",
  date_bs: "२०८२-०८-०६",
  employee_id: "",
  employee_name: "",
  position: "",
  phone: "",
  leave_from_bs: "",
  leave_to_bs: "",
  leave_days: "",
  reason: "",
  leave_choices: DEFAULT_LEAVE_TYPES.map((t) => ({
    ...t,
    selected: false,
    requested_days: "",
  })),
  // Applicant footer details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const LeaveRequestApplication = ({ employees = [] }) => {
  const { form, setForm, handleChange } = useWardForm(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const { user } = useAuth();

  /* ── Helpers ── */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const selectEmployee = (e) => {
    const id = e.target.value;
    const emp = employees.find((x) => String(x.id) === String(id));
    setForm((s) => ({
      ...s,
      employee_id:   id,
      employee_name: emp ? emp.name     : "",
      position:      emp ? emp.position : "",
      phone:         emp ? emp.phone    : "",
    }));
  };

  const toggleLeaveType = (idx) =>
    setForm((s) => ({
      ...s,
      leave_choices: s.leave_choices.map((c, i) =>
        i === idx
          ? { ...c, selected: !c.selected, requested_days: c.selected ? "" : c.requested_days }
          : c
      ),
    }));

  const updateLeaveDays = (idx) => (e) =>
    setForm((s) => ({
      ...s,
      leave_choices: s.leave_choices.map((c, i) =>
        i === idx ? { ...c, requested_days: e.target.value } : c
      ),
    }));

  /* ── Validation ── */
  const validate = () => {
    if (!form.employee_name.trim() && !form.employee_id)
      return "कृपया कर्मचारीको नाम प्रविष्ट गर्नुहोस्।";
    if (!form.position.trim())
      return "कृपया पद प्रविष्ट गर्नुहोस्।";
    if (!form.leave_from_bs.trim() || !form.leave_to_bs.trim())
      return "कृपया बिदाको मिति शुरुआत र अन्त्य दुवै प्रविष्ट गर्नुहोस्।";
    if (!form.leave_days.trim())
      return "कृपया मागेको बिदाको अवधि प्रविष्ट गर्नुहोस्।";
    if (!form.leave_choices.some((c) => c.selected))
      return "कृपया कम्तिमा एक बिदाको किसिम चयन गर्नुहोस्।";
    return null;
  };

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;
    setMsg(null);

    const err = validate();
    if (err) { setMsg({ type: "error", text: err }); return; }

    const payload = {
      letter_no:     form.letter_no,
      date_bs:       form.date_bs,
      employee_id:   form.employee_id || null,
      employee_name: form.employee_name,
      position:      form.position,
      phone:         form.phone,
      leave_from_bs: form.leave_from_bs,
      leave_to_bs:   form.leave_to_bs,
      leave_days:    form.leave_days,
      reason:        form.reason,
      leave_choices: form.leave_choices
        .filter((c) => c.selected)
        .map(({ key, label, requested_days }) => ({ key, label, requested_days })),
      applicant_name:           form.applicant_name,
      applicant_address:        form.applicant_address,
      applicant_citizenship_no: form.applicant_citizenship_no,
      applicant_phone:          form.applicant_phone,
    };

    setLoading(true);
    try {
      const res = await axios.post(`/api/forms/${FORM_KEY}`, payload);
      if (shouldPrint) {
        handleCleanPrint();
      } else {
        setMsg({ type: "success", text: `सेभ भयो (id: ${res.data?.id ?? "unknown"})` });
      }
      setForm(INITIAL_FORM);
    } catch (err) {
      const text =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      setMsg({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print — isolated window, values sized to content ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || ""} नं. वडा कार्यालय`;

    const esc = (v) =>
      String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const selectedRows = form.leave_choices
      .filter((c) => c.selected)
      .map(
        (c) => `
          <tr>
            <td>${esc(c.label)}</td>
            <td style="text-align:center">${esc(c.requested_days)}</td>
          </tr>`
      )
      .join("");

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>बिदाको निवेदन</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000; background: white;
            padding: 15mm 20mm; font-size: 11pt; line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .meta { display: flex; justify-content: space-between; margin: 16px 0; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          /* value sizes to content — no fixed min-width, no forced nowrap on long text */
          .value { font-weight: bold; padding: 0 4px; }
          .value-inline { white-space: nowrap; }
          .field-line { margin: 10px 0; }
          .reason-block { margin: 18px 0; text-align: justify; }
          table.leave { width: 100%; border-collapse: collapse; border: 1px solid #555; margin-top: 16px; }
          table.leave th { background: #ccc; border: 1px solid #555; padding: 8px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          table.leave td { border: 1px solid #555; padding: 7px 10px; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 200px; text-align: center; }
          .sig-line { border-top: 1px solid #000; padding-top: 6px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${esc(MUNICIPALITY.name)}</div>
          <div class="ward-title">${esc(wardTitle)}</div>
          <div class="addr">${esc(MUNICIPALITY.officeLine)}</div>
          <div class="addr">${esc(MUNICIPALITY.provinceLine)}</div>
        </div>

        <div class="meta">
          <div>पत्र संख्या : <span class="value value-inline">${esc(form.letter_no)}</span></div>
          <div>मिति : <span class="value value-inline">${esc(form.date_bs)}</span></div>
        </div>

        <div class="subject">विषय: बिदाको निवेदन</div>

        <div class="field-line">
          कर्मचारीको नाम <span class="value">${esc(form.employee_name)}</span>,
          पद <span class="value">${esc(form.position)}</span>,
          फोन नं. <span class="value value-inline">${esc(form.phone)}</span>
        </div>

        <div class="field-line">
          बिदाको मिति <span class="value value-inline">${esc(form.leave_from_bs)}</span>
          देखि <span class="value value-inline">${esc(form.leave_to_bs)}</span> सम्म,
          हाल माँगेको बिदाको अवधि <span class="value value-inline">${esc(form.leave_days)}</span> दिन।
        </div>

        ${
          form.reason?.trim()
            ? `<div class="reason-block">कारण: <span class="value">${esc(form.reason)}</span></div>`
            : ""
        }

        <table class="leave">
          <thead>
            <tr>
              <th style="width:70%">माँगेको बिदाको किसिम</th>
              <th style="width:30%">बिदाको अवधि (दिन)</th>
            </tr>
          </thead>
          <tbody>
            ${selectedRows}
          </tbody>
        </table>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div>${esc(form.employee_name)}</div>
            <div>${esc(form.position)}</div>
          </div>
        </div>

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row"><span class="field-label">नाम:</span><span>${esc(form.applicant_name)}</span></div>
          <div class="field-row"><span class="field-label">ठेगाना:</span><span>${esc(form.applicant_address)}</span></div>
          <div class="field-row"><span class="field-label">नागरिकता नं.:</span><span>${esc(form.applicant_citizenship_no)}</span></div>
          <div class="field-row"><span class="field-label">फोन:</span><span>${esc(form.applicant_phone)}</span></div>
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
        className="lra-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        noValidate
      >

        {/* ── Top Bar ── */}
        <div className="lra-top-bar">
          बिदाको निवेदन ।
          <span className="lra-breadcrumb">अन्य &gt; बिदाको निवेदन</span>
        </div>

        {/* ── Header ── */}
        <div className="lra-header">
          <MunicipalityHeader formTitle="बिदाको निवेदन" />
        </div>

        {/* ── Meta row ── */}
        <div className="lra-meta-row">
          <div className="lra-meta-left">
            <p>
              पत्र संख्या :{" "}
              <input
                type="text"
                className="lra-dotted-input lra-medium-width"
                value={form.letter_no}
                onChange={update("letter_no")}
              />
            </p>
          </div>
          <div className="lra-meta-right">
            <p>
              मिति (BS) :{" "}
              <input
                type="text"
                className="lra-dotted-input lra-small-width"
                value={form.date_bs}
                onChange={update("date_bs")}
              />
            </p>
          </div>
        </div>

        {/* ── Form grid ── */}
        <div className="lra-form-grid">

          {/* Employee name / selector */}
          <div className="lra-form-group">
            <label>नाम : <span className="lra-req">*</span></label>
            {employees.length > 0 ? (
              <select
                className="lra-line-select"
                value={form.employee_id}
                onChange={selectEmployee}
              >
                <option value="">नाम चयन गर्नुहोस्</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="lra-dotted-input lra-full-width"
                value={form.employee_name}
                onChange={update("employee_name")}
                placeholder="कर्मचारीको नाम"
              />
            )}
          </div>

          {/* Position */}
          <div className="lra-form-group">
            <label>पद : <span className="lra-req">*</span></label>
            <input
              type="text"
              className="lra-dotted-input lra-full-width"
              value={form.position}
              onChange={update("position")}
              placeholder="पद"
            />
          </div>

          {/* Phone */}
          <div className="lra-form-group">
            <label>फोन न. : <span className="lra-req">*</span></label>
            <input
              type="text"
              className="lra-dotted-input lra-medium-width"
              value={form.phone}
              onChange={update("phone")}
              placeholder="फोन नं."
            />
          </div>

          {/* Leave date range */}
          <div className="lra-form-group lra-date-range-group">
            <label>बिदाको मिति : <span className="lra-req">*</span></label>
            <input
              type="text"
              className="lra-dotted-input lra-small-width"
              value={form.leave_from_bs}
              onChange={update("leave_from_bs")}
              placeholder="देखि"
            />
            <span className="lra-range-sep">देखि</span>
            <input
              type="text"
              className="lra-dotted-input lra-small-width"
              value={form.leave_to_bs}
              onChange={update("leave_to_bs")}
              placeholder="सम्म"
            />
            <span className="lra-range-sep">सम्म</span>
          </div>

          {/* Leave days */}
          <div className="lra-form-group">
            <label>हाल माँगेको बिदाको अवधि : <span className="lra-req">*</span></label>
            <input
              type="text"
              className="lra-dotted-input lra-small-width"
              value={form.leave_days}
              onChange={update("leave_days")}
              placeholder="दिन"
            />
            <span style={{ marginLeft: 6 }}>दिन</span>
          </div>

          {/* Reason label */}
          <div className="lra-form-group lra-reason-label-group">
            <label>कारण :</label>
          </div>

        </div>

        {/* ── Reason textarea ── */}
        <div className="lra-reason-section">
          <textarea
            className="lra-reason-textarea"
            rows={3}
            value={form.reason}
            onChange={update("reason")}
            placeholder="बिदा लिनुपर्नुको कारण यहाँ लेख्नुहोस्..."
          />
        </div>

        {/* ── Leave type table ── */}
        <div className="lra-leave-table-section">
          <table className="lra-leave-table">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>चिन्ह लगाउने</th>
                <th style={{ width: "55%" }}>माँगेको बिदाको किसिम</th>
                <th style={{ width: "30%" }}>बिदाको अवधि (दिन)</th>
              </tr>
            </thead>
            <tbody>
              {form.leave_choices.map((c, idx) => (
                <tr key={c.id} className={c.selected ? "lra-row-selected" : ""}>
                  <td className="lra-text-center">
                    <input
                      type="checkbox"
                      checked={c.selected}
                      onChange={() => toggleLeaveType(idx)}
                    />
                  </td>
                  <td>{c.label}</td>
                  <td>
                    <input
                      type="text"
                      className="lra-dotted-input lra-small-width"
                      value={c.selected ? c.requested_days : ""}
                      onChange={updateLeaveDays(idx)}
                      disabled={!c.selected}
                      placeholder="दिन"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer buttons ── */}
        <div className="lra-footer">
          <button
            type="submit"
            className="lra-save-print-btn"
            disabled={loading}
            style={{ marginRight: 12 }}
          >
            {loading ? "सेभ गर्दै..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="lra-save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "सेभ गर्दै..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {msg && (
          <div className={`lra-msg ${msg.type === "error" ? "lra-msg--error" : "lra-msg--success"}`}>
            {msg.text}
          </div>
        )}

        <div className="lra-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default LeaveRequestApplication;