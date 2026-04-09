// LeaveRequestApplication.jsx
import React, { useState } from "react";
import "./LeaveRequestApplication.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";

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

/* ── API helper with Authorization header ── */
const apiPost = async (url, body) => {
  try {
    // Resolve token from common storage locations
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

const LeaveRequestApplication = ({ employees = [] }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  /* ── helpers ── */
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

  /* ── validation ── */
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

  /* ── submit ── */
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
      // Wait for the success message to render, then open print preview
      setTimeout(() => window.print(), 300);
    }
  };

  /* ── render ── */
  return (
    <form className="leave-request-container" onSubmit={handleSubmit} noValidate>

      {/* ── Top bar ── */}
      <div className="top-bar-title">
        बिदाको निवेदन ।
        <span className="top-right-bread">अन्य &gt; बिदाको निवेदन</span>
      </div>

      {/* ── Header ── */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Government Logo" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name red-text">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title red-text">{MUNICIPALITY.officeLine}</h2>
          <p className="address-text red-text">{MUNICIPALITY.provinceLine}</p>
          <h3 className="form-main-title red-text">बिदाको निवेदन</h3>
        </div>
      </div>

      {/* ── Meta row ── */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
        </div>
        <div className="meta-right">
          <p>
            मिति (BS) :{" "}
            <input
              type="text"
              className="dotted-line-input small-width"
              value={form.date_bs}
              onChange={update("date_bs")}
            />
          </p>
        </div>
      </div>

      {/* ── Form fields grid ── */}
      <div className="form-grid">

        {/* Employee name / selector */}
        <div className="form-group">
          <label>नाम : <span className="req">*</span></label>
          {employees.length > 0 ? (
            <select
              className="line-select"
              value={form.employee_id}
              onChange={selectEmployee}
            >
              <option value="">नाम चयन गर्नुहोस्</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          ) : (
            <div className="input-star-wrap">
              <span className="input-req-star">*</span>
              <input
                type="text"
                className="dotted-line-input full-width"
                value={form.employee_name}
                onChange={update("employee_name")}
                placeholder="कर्मचारीको नाम"
              />
            </div>
          )}
        </div>

        {/* Position */}
        <div className="form-group">
          <label>पद : <span className="req">*</span></label>
          <div className="input-star-wrap">
            <span className="input-req-star">*</span>
            <input
              type="text"
              className="dotted-line-input full-width"
              value={form.position}
              onChange={update("position")}
              placeholder="पद"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>फोन न. : <span className="req">*</span></label>
          <div className="input-star-wrap">
            <span className="input-req-star">*</span>
            <input
              type="text"
              className="dotted-line-input medium-width"
              value={form.phone}
              onChange={update("phone")}
              placeholder="फोन नं."
            />
          </div>
        </div>

        {/* Leave date range */}
        <div className="form-group date-range-group">
          <label>बिदाको मिति :</label>
          <div className="input-star-wrap">
            <span className="input-req-star">*</span>
            <input
              type="text"
              className="dotted-line-input small-width"
              value={form.leave_from_bs}
              onChange={update("leave_from_bs")}
              placeholder="देखि"
            />
          </div>
          <span className="range-sep">देखि</span>
          <div className="input-star-wrap">
            <span className="input-req-star">*</span>
            <input
              type="text"
              className="dotted-line-input small-width"
              value={form.leave_to_bs}
              onChange={update("leave_to_bs")}
              placeholder="सम्म"
            />
          </div>
          <span className="range-sep">सम्म</span>
        </div>

        {/* Leave days */}
        <div className="form-group">
          <label>हाल माँगेको बिदाको अवधि : <span className="req">*</span></label>
          <div className="input-star-wrap">
            <span className="input-req-star">*</span>
            <input
              type="text"
              className="dotted-line-input small-width"
              value={form.leave_days}
              onChange={update("leave_days")}
              placeholder="दिन"
            />
          </div>
          <span style={{ marginLeft: 6 }}>दिन</span>
        </div>

        {/* Reason label */}
        <div className="form-group reason-label-group">
          <label>कारण :</label>
        </div>
      </div>

      {/* ── Reason textarea ── */}
      <div className="reason-section">
        <textarea
          className="reason-textarea"
          rows={3}
          value={form.reason}
          onChange={update("reason")}
          placeholder="बिदा लिनुपर्नुको कारण यहाँ लेख्नुहोस्..."
        />
      </div>

      {/* ── Leave type table ── */}
      <div className="leave-table-section">
        <table className="leave-table">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>चिन्ह लगाउने</th>
              <th style={{ width: "55%" }}>माँगेको बिदाको किसिम</th>
              <th style={{ width: "30%" }}>बिदाको अवधि (दिन)</th>
            </tr>
          </thead>
          <tbody>
            {form.leave_choices.map((c, idx) => (
              <tr key={c.id} className={c.selected ? "row-selected" : ""}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={c.selected}
                    onChange={() => toggleLeaveType(idx)}
                  />
                </td>
                <td>{c.label}</td>
                <td>
                  {c.selected ? (
                    <div className="input-star-wrap">
                      <span className="input-req-star">*</span>
                      <input
                        type="text"
                        className="dotted-line-input small-width"
                        value={c.requested_days}
                        onChange={updateLeaveDays(idx)}
                        placeholder="दिन"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="dotted-line-input small-width"
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

      {/* ── Actions ── */}
      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && (
        <div className={`form-msg ${msg.type === "error" ? "form-msg--error" : "form-msg--success"}`}>
          {msg.text}
        </div>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
};

export default LeaveRequestApplication;