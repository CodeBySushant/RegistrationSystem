import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import ApplicantDetailsEn from "../../components/ApplicantDetailsEn.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import MunicipalityHeaderEn from "../../components/MunicipalityHeaderEn";

const FORM_KEY = "open-application";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.el-container {
  max-width: 950px;
  margin: 20px auto;
  padding: 40px 60px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  font-family: 'Times New Roman', serif;
  color: #333;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

/* ── Meta row ── */
.el-meta-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 8px;
}
.el-meta-left p,
.el-meta-right p { margin: 5px 0; }

/* ── All inputs white ── */
.el-container input,
.el-container select,
.el-container textarea {
  background-color: #fff !important;
  color: #000;
  font-family: inherit;
}

/* ── Dotted input ── */
.el-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff !important;
  outline: none;
  padding: 2px 5px;
  font-size: 1rem;
  font-family: inherit;
}
.el-dotted-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.12); }
.el-large-input { width: 300px; }
.el-long-input  { width: 400px; }
.el-small-input { width: 140px; }

/* ── Required-star wrapper ── */
.el-req-wrap {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.el-req-star {
  position: absolute;
  left: 5px; top: 50%;
  transform: translateY(-50%);
  color: red; font-weight: bold;
  pointer-events: none; font-size: 13px; z-index: 1;
}
.el-req-wrap input { padding-left: 16px !important; }

/* ── Subject / addressee ── */
.el-addressee-section { margin-top: 20px; }
.el-subject-block {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 1.05rem;
  text-align: center;
}
.el-addressee-row { margin-bottom: 8px; }

/* ── Editor area ── */
.el-editor-area { margin-top: 20px; }
.el-rich-editor-mock { border: 1px solid #ddd; background: #fff; }
.el-editor-toolbar {
  background: #f8f9fa; padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.85rem; color: #666;
}
.el-upgrade-btn {
  background: #f0f4ff; color: #2563eb;
  border: 1px solid #c7d7ff; border-radius: 3px;
  padding: 2px 8px; font-size: 0.8rem; cursor: pointer;
}
.el-editor-textarea {
  width: 100%; min-height: 400px; border: none;
  padding: 20px; box-sizing: border-box;
  font-size: 1.1rem; line-height: 1.6;
  resize: vertical; font-family: inherit;
  outline: none; display: block;
  background-color: #fff !important;
}
.el-word-count {
  padding: 4px 12px; font-size: 0.8rem; color: #999;
  border-top: 1px solid #eee; text-align: right;
}

/* ── Signature ── */
.el-signature-wrapper { display: flex; justify-content: flex-end; margin-top: 40px; }
.el-signature-block { width: 250px; text-align: right; }
.el-designation-select {
  width: 100%; margin-top: 10px; padding: 5px;
  border: 1px solid #ccc; border-radius: 3px;
  font-family: inherit; font-size: 0.95rem; cursor: pointer;
  background-color: #fff !important;
}
.el-designation-select:focus { outline: none; border-color: #2563eb; }

/* ── Toast ── */
.el-toast {
  position: fixed; top: 20px; right: 24px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 6px;
  font-size: 0.92rem; font-family: 'Times New Roman', serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: el-toast-in 0.25s ease; max-width: 380px;
}
.el-toast--success { background: #1a7f3c; color: #fff; }
.el-toast--error   { background: #c0392b; color: #fff; }
@keyframes el-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer buttons ── */
.el-footer { display: flex; justify-content: center; gap: 12px; margin-top: 30px; }
.el-save-btn {
  background: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  cursor: pointer; font-size: 1rem; font-family: inherit; font-weight: bold;
}
.el-save-btn:hover:not(:disabled) { background: #1a252f; }
.el-save-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.el-print-btn {
  background: #1a6b3a; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  cursor: pointer; font-size: 1rem; font-family: inherit; font-weight: bold;
}
.el-print-btn:hover:not(:disabled) { background: #145530; }
.el-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.el-copyright {
  text-align: right; font-size: 0.8rem; color: #777;
  margin-top: 40px; border-top: 1px solid #eee; padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .el-container { padding: 24px 16px; }
  .el-meta-row { flex-direction: column; }
  .el-large-input, .el-long-input { width: 100%; max-width: 100%; }
  .el-toast { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .el-container, .el-container * { visibility: visible; }
  .el-container {
    position: absolute; left: 0; top: 0; width: 100%;
    padding: 20px 40px; background: white !important;
    box-shadow: none; background-image: none !important;
  }
  .el-footer, .el-toast, .el-word-count,
  .el-upgrade-btn, .el-copyright { display: none !important; }
  .el-rich-editor-mock  { border: none !important; background: transparent !important; }
  .el-editor-toolbar    { display: none !important; }
  .el-editor-textarea   { border: none !important; background: transparent !important; resize: none !important; min-height: 0 !important; height: auto !important; overflow: visible !important; }
  .el-dotted-input      { border: none !important; border-bottom: 1px solid #000 !important; background: transparent !important; width: auto !important; min-width: 40px; }
  select                { border: none !important; background: transparent !important; }
  .el-req-star          { display: none !important; }
  input, select, textarea {
    color: #000 !important; -webkit-text-fill-color: #000 !important;
    -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
  }
}
`;

/* ─────────────────────────── Initial State ─────────────────────────── */
const INITIAL_FORM = {
  letter_no:               "2082/83",
  reference_no:            "",
  date:                    new Date().toISOString().slice(0, 10),
  subject:                 "",
  addressee_name:          "",
  addressee_line2:         "",
  body_text:               "",
  signatory_name:          "",
  signatory_position:      "",
  applicant_name:          "",
  applicant_address:       "",
  applicant_citizenship_no:"",
  applicant_phone:         "",
};

const validate = (form) => {
  if (!form.subject.trim())        return "Subject is required.";
  if (!form.signatory_name.trim()) return "Signatory name is required.";
  if (!form.applicant_name.trim()) return "Applicant name is required.";
  if (!form.applicant_phone.trim()) return "Applicant phone is required.";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const EnglishLanguage = () => {
  const { user } = useAuth();
  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  // Generic updater — returns handler for a given key
  const upd = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: v }));
  };

  // Name-based handler for child components (ApplicantDetailsEn)
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const wordCount = (form.body_text || "").split(/\s+/).filter(Boolean).length;

  /* ── Single save — no duplicate POST ── */
  const handleSave = async (shouldPrint = false) => {
    if (loading) return;
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      if (shouldPrint) {
        handleCleanPrint();
      } else {
        showToast("success", `Saved successfully! ID: ${res.data?.id ?? "N/A"}`);
      }
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Save failed.";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean print window ── */
  const handleCleanPrint = () => {
    const wardLabel =
      user?.role === "SUPERADMIN"
        ? "All Ward Offices"
        : `${user?.ward || MUNICIPALITY.wardNumber || "1"} No. Ward Office`;

    const f = form;
    // Escape HTML to avoid injection in field values
    const esc = (v) => (v || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

    const content = `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8"/>
  <title>Open Application</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Times New Roman',serif; color:#000; background:white; padding:15mm 20mm; font-size:11pt; line-height:1.8; }
    .header { text-align:center; margin-bottom:20px; position:relative; min-height:90px; }
    .logo   { position:absolute; left:0; top:0; width:70px; }
    .mun-name   { color:#c0392b; font-size:18pt; font-weight:700; }
    .ward-title { color:#c0392b; font-size:14pt; font-weight:700; margin:4px 0; }
    .addr       { color:#c0392b; font-size:10pt; }
    .meta       { display:flex; justify-content:space-between; margin:14px 0; font-size:10pt; }
    /* subject centered */
    .subject    { text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 10px; }
    .addressee  { margin-bottom:12px; font-size:11pt; }
    /* body text preserves line breaks, wraps properly */
    .body-text  {
      font-size:11pt; line-height:1.8; text-align:justify;
      margin-bottom:20px; white-space:pre-wrap; word-break:break-word;
    }
    .signature  { display:flex; flex-direction:column; align-items:flex-end; margin-top:36px; }
    .sig-name   { border-bottom:1px solid #000; min-width:180px; text-align:center; padding:0 8px; font-weight:bold; }
    .sig-pos    { margin-top:4px; font-size:10pt; }
    .applicant-box { border:1px solid #999; padding:14px; margin-top:20px; border-radius:3px; }
    .a-title { font-weight:bold; margin-bottom:8px; font-size:11pt; border-bottom:1px solid #ddd; padding-bottom:4px; }
    .a-row { display:flex; margin-bottom:6px; font-size:10pt; }
    .a-label { min-width:180px; font-weight:600; }
  </style>
</head><body>
  <div class="header">
    <img class="logo" src="${MUNICIPALITY.logoSrc || "/nepallogo.svg"}" alt="Logo"/>
    <div class="mun-name">${esc(MUNICIPALITY.name)}</div>
    <div class="ward-title">${esc(wardLabel)}</div>
    <div class="addr">${esc(MUNICIPALITY.officeLine)}</div>
    <div class="addr">${esc(MUNICIPALITY.provinceLine)}</div>
  </div>

  <div class="meta">
    <div>
      <div>Letter No.: <strong>${esc(f.letter_no)}</strong></div>
      <div>Ref No.: <strong>${esc(f.reference_no)}</strong></div>
    </div>
    <div>Date: <strong>${esc(f.date)}</strong></div>
  </div>

  <div class="subject">Subject: <u>${esc(f.subject)}</u></div>

  <div class="addressee">
    <div>${esc(f.addressee_name)}</div>
    ${f.addressee_line2 ? `<div>${esc(f.addressee_line2)}</div>` : ""}
  </div>

  <div class="body-text">${esc(f.body_text)}</div>

  <div class="signature">
    <div class="sig-name">${esc(f.signatory_name)}</div>
    ${f.signatory_position ? `<div class="sig-pos">${esc(f.signatory_position)}</div>` : ""}
  </div>

  <div class="applicant-box">
    <div class="a-title">Applicant Details</div>
    <div class="a-row"><span class="a-label">Name:</span><span>${esc(f.applicant_name)}</span></div>
    <div class="a-row"><span class="a-label">Address:</span><span>${esc(f.applicant_address)}</span></div>
    <div class="a-row"><span class="a-label">Citizenship No.:</span><span>${esc(f.applicant_citizenship_no)}</span></div>
    <div class="a-row"><span class="a-label">Phone:</span><span>${esc(f.applicant_phone)}</span></div>
  </div>
</body></html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(content);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="el-container">

        {/* Toast */}
        {toast && (
          <div className={`el-toast el-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSave(false); }}>

          {/* ── English municipality header ── */}
          <MunicipalityHeaderEn showLogo />

          {/* ── Meta row ── */}
          <div className="el-meta-row">
            <div className="el-meta-left">
              <p>
                Letter No. :{" "}
                <span className="el-req-wrap">
                  <span className="el-req-star">*</span>
                  <input type="text" className="el-dotted-input el-small-input" value={form.letter_no} onChange={upd("letter_no")} required />
                </span>
              </p>
              <p>
                Ref No. :{" "}
                <input type="text" className="el-dotted-input el-small-input" value={form.reference_no} onChange={upd("reference_no")} />
              </p>
            </div>
            <div className="el-meta-right">
              <p>
                Date :{" "}
                <span className="el-req-wrap">
                  <span className="el-req-star">*</span>
                  <input type="date" className="el-dotted-input" value={form.date} onChange={upd("date")} required />
                </span>
              </p>
            </div>
          </div>

          {/* ── Subject & Addressee ── */}
          <div className="el-addressee-section">
            {/* Subject — centered */}
            <div className="el-subject-block">
              <label>Subject:</label>
              <span className="el-req-wrap">
                <span className="el-req-star">*</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={upd("subject")}
                  className="el-dotted-input el-large-input"
                  required
                />
              </span>
            </div>
            {/* Addressee */}
            <div className="el-addressee-row">
              <span className="el-req-wrap">
                <span className="el-req-star">*</span>
                <input
                  type="text"
                  value={form.addressee_name}
                  onChange={upd("addressee_name")}
                  className="el-dotted-input el-long-input"
                  placeholder="Addressee name / organisation"
                  required
                />
              </span>
            </div>
            <div className="el-addressee-row">
              <input
                type="text"
                value={form.addressee_line2}
                onChange={upd("addressee_line2")}
                className="el-dotted-input el-long-input"
                placeholder="Second address line (optional)"
              />
            </div>
          </div>

          {/* ── Editor area ── */}
          <div className="el-editor-area">
            <div className="el-rich-editor-mock">
              <div className="el-editor-toolbar">
                <span>Write Here:</span>
                <span className="el-upgrade-btn">⚡ Upgrade</span>
              </div>
              <textarea
                className="el-editor-textarea"
                value={form.body_text}
                onChange={upd("body_text")}
                placeholder="Write your letter content here..."
              />
              <div className="el-word-count">{wordCount} words</div>
            </div>
          </div>

          {/* ── Signature ── */}
          <div className="el-signature-wrapper">
            <div className="el-signature-block">
              <span className="el-req-wrap">
                <span className="el-req-star">*</span>
                <input
                  type="text"
                  value={form.signatory_name}
                  onChange={upd("signatory_name")}
                  className="el-dotted-input"
                  placeholder="Signatory Name"
                  required
                />
              </span>
              <select
                className="el-designation-select"
                value={form.signatory_position}
                onChange={upd("signatory_position")}
              >
                <option value="">Select Designation</option>
                <option value="Ward Chairman">Ward Chairman</option>
                <option value="Ward Secretary">Ward Secretary</option>
              </select>
            </div>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsEn formData={form} handleChange={handleChange} />

          {/* ── Two footer buttons ── */}
          <div className="el-footer">
            <button type="submit" className="el-save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Record"}
            </button>
            <button type="button" className="el-print-btn" disabled={loading} onClick={() => handleSave(true)}>
              {loading ? "Saving..." : "Save & Print"}
            </button>
          </div>

        </form>

        <div className="el-copyright">
          © All rights reserved {MUNICIPALITY.name}
        </div>
      </div>
    </>
  );
};

export default EnglishLanguage;