// src/pages/open-format/EnglishLanguage.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import ApplicantDetailsEn from "../../components/ApplicantDetailsEn.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const FORM_KEY = "open-application";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.open-format-container {
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

/* ── Header ── */
.open-format-container .form-header-section {
  text-align: center;
  position: relative;
  margin-bottom: 30px;
}
.open-format-container .header-logo img {
  position: absolute;
  left: 0; top: 0;
  width: 90px;
}
.open-format-container .header-text .municipality-name {
  color: #d32f2f; font-size: 1.8rem; margin: 0; font-weight: bold;
}
.open-format-container .header-text .ward-title {
  color: #d32f2f; font-size: 2.8rem; margin: 5px 0; font-weight: bold;
}
.open-format-container .header-text .address-text,
.open-format-container .header-text .province-text {
  color: #d32f2f; margin: 2px 0; font-size: 1.1rem; font-weight: 500;
}

/* ── Meta row ── */
.open-format-container .meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 8px;
}
.open-format-container .meta-left p,
.open-format-container .meta-right p { margin: 5px 0; }

/* ── Shared inputs ── */
.open-format-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-size: 1rem;
  font-family: inherit;
}
.open-format-container .dotted-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
}
.large-input { width: 300px; }
.long-input  { width: 400px; }

/* ── Required-star wrapper ── */
.open-format-container .inline-input-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.open-format-container .input-required-star {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-weight: bold;
  pointer-events: none;
  font-size: 13px;
  z-index: 1;
}
.open-format-container .inline-input-wrapper input { padding-left: 16px; }

/* ── Subject / addressee block ── */
.addressee-subject-section { margin-top: 20px; }
.subject-block {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-weight: bold;
}
.addressee-row { margin-bottom: 8px; }

/* ── Editor area ── */
.editor-area { margin-top: 20px; }
.rich-editor-mock {
  border: 1px solid #ddd;
  background: #fff;
}
.editor-toolbar {
  background: #f8f9fa;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
}
.upgrade-btn {
  background: #f0f4ff;
  color: #2563eb;
  border: 1px solid #c7d7ff;
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 0.8rem;
  cursor: pointer;
}
.editor-textarea {
  width: 100%;
  min-height: 400px;
  border: none;
  padding: 20px;
  box-sizing: border-box;
  font-size: 1.1rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  outline: none;
  display: block;
}
.word-count {
  padding: 4px 12px;
  font-size: 0.8rem;
  color: #999;
  border-top: 1px solid #eee;
  text-align: right;
}

/* ── Signature ── */
.signature-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}
.signature-block { width: 250px; text-align: right; }
.open-format-container .designation-select {
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: inherit;
  font-size: 0.95rem;
  cursor: pointer;
}
.open-format-container .designation-select:focus {
  outline: none;
  border-color: #2563eb;
}

/* ── Applicant details box ── */
.applicant-details-box {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

/* ── Toast ── */
.el-toast {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.92rem;
  font-family: 'Times New Roman', serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: el-toast-in 0.25s ease;
  max-width: 380px;
}
.el-toast--success { background: #1a7f3c; color: #fff; }
.el-toast--error   { background: #c0392b; color: #fff; }
@keyframes el-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 30px; }
.save-print-btn {
  background: #2c3e50;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background: #1a252f; }
.save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #777;
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .open-format-container { padding: 24px 16px; }
  .open-format-container .meta-data-row { flex-direction: column; }
  .large-input, .long-input { width: 100%; max-width: 100%; }
  .el-toast { right: 12px; left: 12px; max-width: none; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .open-format-container,
  .open-format-container * { visibility: visible; }
  .open-format-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    padding: 20px 40px;
    background: white !important;
    box-shadow: none;
  }
  .form-footer,
  .el-toast,
  .word-count,
  .upgrade-btn,
  .copyright-footer { display: none !important; }
  .rich-editor-mock   { border: none !important; background: transparent !important; }
  .editor-toolbar     { display: none !important; }
  .editor-textarea    { border: none !important; background: transparent !important; resize: none !important; }
  .dotted-input       { border: none !important; background: transparent !important; }
  select              { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

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
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const EnglishLanguage = () => {
  const { user } = useAuth();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  /* Generic updater — handles text, date, and checkbox inputs */
  const upd = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: v }));
  };

  /* ApplicantDetailsEn fires onChange(key)(e) — already matches upd signature */

  const wordCount = (form.body_text || "").split(/\s+/).filter(Boolean).length;

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "All Ward Offices"
      : `${user?.ward || MUNICIPALITY.wardNumber || "1"} No. Ward Office`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      showToast("success", `Saved successfully! ID: ${res.data?.id ?? "N/A"}`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Save failed.";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="open-format-container">

        {/* Toast */}
        {toast && (
          <div className={`el-toast el-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Header */}
          <header className="form-header-section">
            <div className="header-logo">
              <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
            </div>
            <div className="header-text">
              <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="ward-title">{wardLabel}</h2>
              <p className="address-text">{MUNICIPALITY.officeLine}</p>
              <p className="province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </header>

          {/* Meta row */}
          <div className="meta-data-row">
            <div className="meta-left">
              <p>
                Letter No. :{" "}
                <input type="text" className="dotted-input" value={form.letter_no} onChange={upd("letter_no")} />
              </p>
              <p>
                Ref No. :{" "}
                <input type="text" className="dotted-input" value={form.reference_no} onChange={upd("reference_no")} />
              </p>
            </div>
            <div className="meta-right">
              <p>
                Date :{" "}
                <input type="date" className="dotted-input" value={form.date} onChange={upd("date")} />
              </p>
            </div>
          </div>

          {/* Subject & Addressee */}
          <div className="addressee-subject-section">
            <div className="subject-block">
              <label>Subject:</label>
              <div className="inline-input-wrapper">
                <span className="input-required-star">*</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={upd("subject")}
                  className="dotted-input large-input"
                  required
                />
              </div>
            </div>
            <div className="addressee-row">
              <div className="inline-input-wrapper">
                <span className="input-required-star">*</span>
                <input
                  type="text"
                  value={form.addressee_name}
                  onChange={upd("addressee_name")}
                  className="dotted-input long-input"
                  placeholder="Addressee name"
                />
              </div>
            </div>
          </div>

          {/* Editor area */}
          <div className="editor-area">
            <div className="rich-editor-mock">
              <div className="editor-toolbar">
                <span>Write Here:</span>
                <span className="upgrade-btn">⚡ Upgrade</span>
              </div>
              <textarea
                className="editor-textarea"
                value={form.body_text}
                onChange={upd("body_text")}
                placeholder="Write your letter content here..."
              />
              <div className="word-count">{wordCount} words</div>
            </div>
          </div>

          {/* Signature */}
          <div className="signature-wrapper">
            <div className="signature-block">
              <div className="inline-input-wrapper">
                <span className="input-required-star">*</span>
                <input
                  type="text"
                  value={form.signatory_name}
                  onChange={upd("signatory_name")}
                  className="dotted-input"
                  placeholder="Signatory Name"
                  required
                />
              </div>
              <select
                className="designation-select"
                value={form.signatory_position}
                onChange={upd("signatory_position")}
              >
                <option value="">Select Designation</option>
                <option value="Ward Chairman">Ward Chairman</option>
                <option value="Ward Secretary">Ward Secretary</option>
              </select>
            </div>
          </div>

          {/* Applicant details */}
          <ApplicantDetailsEn formData={form} handleChange={upd} />

          {/* Footer */}
          <div className="form-footer">
            <button type="submit" className="save-print-btn" disabled={loading}>
              {loading ? "Saving..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

        </form>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </>
  );
};

export default EnglishLanguage;