// LeaveRequestApplication.jsx
import React, { useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from LeaveRequestApplication.css)
   All classes prefixed with "lra-" to avoid global collisions.
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
  .lra-header-logo img { position: absolute; left: 0; top: 0; width: 78px; }
  .lra-header-text { display: flex; flex-direction: column; align-items: center; }
  .lra-municipality-name { font-size: 2.1rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .lra-ward-title        { font-size: 1.7rem; margin: 4px 0; font-weight: normal; }
  .lra-address-text      { margin: 0; font-size: 1.1rem; }
  .lra-form-main-title   { margin-top: 10px; font-size: 1.4rem; font-weight: bold; }

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
  .lra-date-range-group { column-span: all; }
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

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .lra-container,
    .lra-container * { visibility: visible; }
    .lra-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
      min-height: unset;
    }
    .lra-footer,
    .lra-msg { display: none !important; }
    .lra-dotted-input,
    .lra-reason-textarea {
      border: none !important;
      background: transparent !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
    }
    .lra-leave-table th {
      background-color: #ccc !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .lra-row-selected {
      background-color: #f5f5f5 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
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
};

/* ─────────────────────────────────────────────────────────────────────────────
   API helper with Authorization header
───────────────────────────────────────────────────────────────────────────── */
const apiPost = async (url, body) => {
  try {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token") ||
      (typeof window !== "undefined" && window.__AUTH_TOKEN__) ||
      "";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        data: null,
        error: errData?.message || `Error ${res.status}: ${res.statusText}`,
      };
    }

    const data = await res.json().catch(() => ({}));
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "Network error" };
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const LeaveRequestApplication = ({ employees = [] }) => {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]       = useState(null);

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

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    };

    setLoading(true);
    const { data, error } = await apiPost(`/api/forms/${FORM_KEY}`, payload);
    setLoading(false);

    if (error) {
      setMsg({ type: "error", text: error });
    } else {
      setMsg({ type: "success", text: `सेभ भयो (id: ${data?.id ?? "unknown"})` });
      // Wait for success message to render, then open print preview
      setTimeout(() => window.print(), 300);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form className="lra-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top Bar ── */}
        <div className="lra-top-bar">
          बिदाको निवेदन ।
          <span className="lra-breadcrumb">अन्य &gt; बिदाको निवेदन</span>
        </div>

        {/* ── Header ── */}
        <div className="lra-header">
          <div className="lra-header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Government Logo" />
          </div>
          <div className="lra-header-text">
            <h1 className="lra-municipality-name lra-red">{MUNICIPALITY.name}</h1>
            <h2 className="lra-ward-title lra-red">{MUNICIPALITY.officeLine}</h2>
            <p className="lra-address-text lra-red">{MUNICIPALITY.provinceLine}</p>
            <h3 className="lra-form-main-title lra-red">बिदाको निवेदन</h3>
          </div>
        </div>

        {/* ── Meta row ── */}
        <div className="lra-meta-row">
          <div className="lra-meta-left">
            <p>पत्र संख्या : <span className="lra-bold">{form.letter_no}</span></p>
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
              <div className="lra-star-wrap">
                <span className="lra-star">*</span>
                <input
                  type="text"
                  className="lra-dotted-input lra-full-width"
                  value={form.employee_name}
                  onChange={update("employee_name")}
                  placeholder="कर्मचारीको नाम"
                />
              </div>
            )}
          </div>

          {/* Position */}
          <div className="lra-form-group">
            <label>पद : <span className="lra-req">*</span></label>
            <div className="lra-star-wrap">
              <span className="lra-star">*</span>
              <input
                type="text"
                className="lra-dotted-input lra-full-width"
                value={form.position}
                onChange={update("position")}
                placeholder="पद"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="lra-form-group">
            <label>फोन न. : <span className="lra-req">*</span></label>
            <div className="lra-star-wrap">
              <span className="lra-star">*</span>
              <input
                type="text"
                className="lra-dotted-input lra-medium-width"
                value={form.phone}
                onChange={update("phone")}
                placeholder="फोन नं."
              />
            </div>
          </div>

          {/* Leave date range */}
          <div className="lra-form-group lra-date-range-group">
            <label>बिदाको मिति :</label>
            <div className="lra-star-wrap">
              <span className="lra-star">*</span>
              <input
                type="text"
                className="lra-dotted-input lra-small-width"
                value={form.leave_from_bs}
                onChange={update("leave_from_bs")}
                placeholder="देखि"
              />
            </div>
            <span className="lra-range-sep">देखि</span>
            <div className="lra-star-wrap">
              <span className="lra-star">*</span>
              <input
                type="text"
                className="lra-dotted-input lra-small-width"
                value={form.leave_to_bs}
                onChange={update("leave_to_bs")}
                placeholder="सम्म"
              />
            </div>
            <span className="lra-range-sep">सम्म</span>
          </div>

          {/* Leave days */}
          <div className="lra-form-group">
            <label>हाल माँगेको बिदाको अवधि : <span className="lra-req">*</span></label>
            <div className="lra-star-wrap">
              <span className="lra-star">*</span>
              <input
                type="text"
                className="lra-dotted-input lra-small-width"
                value={form.leave_days}
                onChange={update("leave_days")}
                placeholder="दिन"
              />
            </div>
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
                    {c.selected ? (
                      <div className="lra-star-wrap">
                        <span className="lra-star">*</span>
                        <input
                          type="text"
                          className="lra-dotted-input lra-small-width"
                          value={c.requested_days}
                          onChange={updateLeaveDays(idx)}
                          placeholder="दिन"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="lra-dotted-input lra-small-width"
                        value=""
                        disabled
                        readOnly
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Footer ── */}
        <div className="lra-footer">
          <button className="lra-save-print-btn" type="submit" disabled={loading}>
            {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
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