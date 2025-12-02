// LeaveRequestApplication.jsx
import React, { useState } from "react";
import "./LeaveRequestApplication.css";

const FORM_KEY = "leave-request-application";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;


const DEFAULT_LEAVE_TYPES = [
  { id: 1, key: "casual", label: "अनिवार्य / क्यासुअल" },
  { id: 2, key: "sick", label: "रोग/स्वास्थ्य सम्बन्धी" },
  { id: 3, key: "annual", label: "वार्षिक" },
  { id: 4, key: "maternity", label: "गर्भवती/प्रसूत" },
  { id: 5, key: "other", label: "अन्य" }
];

const LeaveRequestApplication = ({ employees = [] /* optional list */ }) => {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    date_bs: "२०८२-०८-०६", // store BS date as string
    employee_id: "",
    employee_name: "",
    position: "",
    phone: "",
    leave_from_bs: "",
    leave_to_bs: "",
    leave_days: "",
    reason: "",
    leave_choices: DEFAULT_LEAVE_TYPES.map((t) => ({ ...t, selected: false, requested_days: "" })),
    created_at: null
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (key) => (e) => {
    const val = e.target.value;
    setForm((s) => ({ ...s, [key]: val }));
  };

  const selectEmployee = (e) => {
    const id = e.target.value;
    const emp = employees.find((x) => String(x.id) === String(id));
    setForm((s) => ({
      ...s,
      employee_id: id,
      employee_name: emp ? emp.name : "",
      position: emp ? emp.position : "",
      phone: emp ? emp.phone : ""
    }));
  };

  const toggleLeaveType = (idx) => {
    setForm((s) => {
      const leave_choices = s.leave_choices.map((c, i) => (i === idx ? { ...c, selected: !c.selected } : c));
      return { ...s, leave_choices };
    });
  };

  const updateLeaveDays = (idx) => (e) => {
    const v = e.target.value;
    setForm((s) => {
      const leave_choices = s.leave_choices.map((c, i) => (i === idx ? { ...c, requested_days: v } : c));
      return { ...s, leave_choices };
    });
  };

  const validate = () => {
    if (!form.employee_name && !form.employee_id) return "कृपया कर्मचारी चयन वा नाम प्रविष्ट गर्नुहोस्।";
    if (!form.position) return "कृपया पद प्रविष्ट गर्नुहोस्।";
    if (!form.leave_from_bs || !form.leave_to_bs) return "कृपया बिदाको मिति शुरुआत र अन्त्य दुवै प्रविष्ट गर्नुहोस् (BS)।";
    if (!form.leave_days) return "कृपया मागेको बिदाको अवधि प्रविष्ट गर्नुहोस्।";
    // ensure at least one leave type selected
    if (!form.leave_choices.some((c) => c.selected)) return "कृपया कम्तिमा एक बिदाको किसिम चयन गर्नुहोस्।";
    return null;
  };

  const buildPayload = () => ({
    letter_no: form.letter_no,
    date_bs: form.date_bs,
    employee_id: form.employee_id || null,
    employee_name: form.employee_name,
    position: form.position,
    phone: form.phone,
    leave_from_bs: form.leave_from_bs,
    leave_to_bs: form.leave_to_bs,
    leave_days: form.leave_days,
    reason: form.reason,
    leave_choices: form.leave_choices.filter((c) => c.selected).map((c) => ({ key: c.key, label: c.label, requested_days: c.requested_days })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const err = validate();
    if (err) { setMsg({ type: "error", text: err }); return; }

    const payload = buildPayload();
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setMsg({ type: "error", text: (body && body.message) || `सेभ असफल (${res.status})` });
      } else {
        setMsg({ type: "success", text: `सेभ भयो (id: ${body && body.id ? body.id : "unknown"})` });
        // Optionally clear or keep form
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="leave-request-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        बिदाको निवेदन ।
        <span className="top-right-bread">अन्य &gt; बिदाको निवेदन</span>
      </div>

      <div className="form-header-section">
        <div className="header-logo"><img src="/logo.png" alt="logo" /></div>
        <div className="header-text">
          <h1 className="municipality-name red-text">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title red-text">नगर कार्यपालिकाको कार्यालय</h2>
          <h3 className="form-main-title red-text">बिदाको निवेदन</h3>
        </div>
      </div>

      <div className="date-section">
        <label>मिति (BS): </label>
        <input type="text" value={form.date_bs} onChange={update("date_bs")} className="dotted-line-input small-width" />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>नाम :</label>
          {employees.length > 0 ? (
            <select className="line-select" value={form.employee_id} onChange={selectEmployee}>
              <option value="">नाम चयन गर्नुहोस्</option>
              {employees.map((emp) => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          ) : (
            <input type="text" className="dotted-line-input full-width" value={form.employee_name} onChange={update("employee_name")} placeholder="कर्मचारीको नाम" />
          )}
        </div>

        <div className="form-group">
          <label>पद : <span className="red">*</span></label>
          <input type="text" className="dotted-line-input full-width" value={form.position} onChange={update("position")} required />
        </div>

        <div className="form-group">
          <label>फोन न. : <span className="red">*</span></label>
          <input type="text" className="dotted-line-input medium-width" value={form.phone} onChange={update("phone")} required />
        </div>

        <div className="form-group date-range-group">
          <label>बिदाको मिति :</label>
          <input type="text" className="dotted-line-input small-width" value={form.leave_from_bs} onChange={update("leave_from_bs")} placeholder="देखि (BS)" />
          <label>देखि</label>
          <input type="text" className="dotted-line-input small-width" value={form.leave_to_bs} onChange={update("leave_to_bs")} placeholder="सम्म (BS)" />
        </div>

        <div className="form-group">
          <label>हाल माँगेको बिदाको अवधि: <span className="red">*</span></label>
          <input type="text" className="dotted-line-input small-width" value={form.leave_days} onChange={update("leave_days")} />
          <label>दिन</label>
        </div>

        <div className="form-group">
          <label>कारण:</label>
        </div>
      </div>

      <div className="reason-section">
        <textarea className="reason-textarea" rows="3" value={form.reason} onChange={update("reason")} />
      </div>

      <div className="leave-table-section">
        <table className="leave-table">
          <thead>
            <tr>
              <th style={{width: '20%'}}>चिन्ह लगाउने</th>
              <th style={{width: '50%'}}>माँगेको बिदाको किसिम</th>
              <th style={{width: '30%'}}>बिदाको अवधि (दिन)</th>
            </tr>
          </thead>
          <tbody>
            {form.leave_choices.map((c, idx) => (
              <tr key={c.id}>
                <td className="text-center">
                  <input type="checkbox" checked={c.selected} onChange={() => toggleLeaveType(idx)} />
                </td>
                <td>{c.label}</td>
                <td>
                  <input type="text" className="dotted-line-input small-width" value={c.requested_days} onChange={updateLeaveDays(idx)} disabled={!c.selected} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-footer">
        <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {msg && <div style={{ marginTop: 8, color: msg.type === "error" ? "crimson" : "green" }}>{msg.text}</div>}
      <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
    </form>
  );
};

export default LeaveRequestApplication;
