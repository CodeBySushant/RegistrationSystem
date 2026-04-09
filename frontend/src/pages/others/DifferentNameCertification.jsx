// DifferentNameCertification.jsx
import React, { useState } from "react";
import "./DifferentNameCertification.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "different-name-certification";

const emptyRow = () => ({
  id: Date.now() + Math.random(),
  doc: "",
  name_on_doc: "",
  diff_doc: "",
  diff_name: "",
});

const INITIAL_FORM = {
  letter_no: "२०८२/८३",
  reference_no: "",
  date_bs: "२०८२-०८-०६",
  municipality: MUNICIPALITY.name,
  previous_unit_type: "",
  previous_ward: "",
  salutation: "श्री",
  applicant_name: "",
  rows: [emptyRow()],
  recommender_name: "",
  recommender_designation: "",
  // ApplicantDetailsNp fields
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ── Inline API helper with Authorization header ── */
const apiPost = async (url, body) => {
  try {
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("token") ||
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
      let errMsg = `Server error: ${res.status}`;
      try {
        const errData = await res.json();
        errMsg = errData?.message || errData?.error || errMsg;
      } catch (_) {
        // response body is not JSON — keep the status message
      }
      return { data: null, error: errMsg };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "Network error" };
  }
};

const DifferentNameCertification = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  /* ── helpers ── */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const updateRow = (idx, key) => (e) =>
    setForm((s) => ({
      ...s,
      rows: s.rows.map((r, i) =>
        i === idx ? { ...r, [key]: e.target.value } : r
      ),
    }));

  const addRow = () =>
    setForm((s) => ({ ...s, rows: [...s.rows, emptyRow()] }));

  const removeRow = (idx) =>
    setForm((s) => ({ ...s, rows: s.rows.filter((_, i) => i !== idx) }));

  /* ── validation ── */
  const validate = () => {
    if (!form.applicant_name.trim())
      return "कृपया निवेदकको नाम (माथि) प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_name.trim())
      return "सिफारिसकर्ताको नाम प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_designation)
      return "सिफारिसकर्ताको पद छनौट गर्नुहोस्।";
    if (form.rows.length === 0)
      return "कागजातको तालिका खाली हुन सक्दैन।";
    for (const r of form.rows) {
      if (!r.doc.trim() || !r.name_on_doc.trim() || !r.diff_doc.trim() || !r.diff_name.trim())
        return "तालिकाका सबै पंक्तिहरू पूरा गर्नुहोस्।";
    }
    if (!form.applicantName.trim())
      return "निवेदकको नाम (तल) प्रविष्ट गर्नुहोस्।";
    if (!form.applicantAddress.trim())
      return "निवेदकको ठेगाना प्रविष्ट गर्नुहोस्।";
    if (!form.applicantCitizenship.trim())
      return "नागरिकता नं. प्रविष्ट गर्नुहोस्।";
    if (!form.applicantPhone.trim())
      return "फोन नं. प्रविष्ट गर्नुहोस्।";
    return null;
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const err = validate();
    if (err) { setMsg({ type: "error", text: err }); return; }

    // Build explicit payload (exclude internal `id` fields from table rows)
    const payload = {
      letter_no:            form.letter_no,
      reference_no:         form.reference_no,
      date_bs:              form.date_bs,
      municipality:         form.municipality,
      previous_unit_type:   form.previous_unit_type,
      previous_ward:        form.previous_ward,
      salutation:           form.salutation,
      applicant_name:       form.applicant_name,
      rows:                 form.rows.map(({ id: _id, ...rest }) => rest),
      recommender_name:     form.recommender_name,
      recommender_designation: form.recommender_designation,
      applicantName:        form.applicantName,
      applicantAddress:     form.applicantAddress,
      applicantCitizenship: form.applicantCitizenship,
      applicantPhone:       form.applicantPhone,
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
    <form className="name-cert-container" onSubmit={handleSubmit} noValidate>

      {/* ── Top bar ── */}
      <div className="top-bar-title">
        फरक फरक नाम र थर सिफारिस ।
        <span className="top-right-bread">
          अन्य &gt; फरक फरक नाम र थर सिफारिस
        </span>
      </div>

      {/* ── Meta ── */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
          <p>
            चलानी नं. :{" "}
            <input
              type="text"
              className="dotted-input small-input"
              value={form.reference_no}
              onChange={update("reference_no")}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति (BS) :{" "}
            <input
              type="text"
              className="dotted-input medium-input"
              value={form.date_bs}
              onChange={update("date_bs")}
            />
          </p>
        </div>
      </div>

      {/* ── Addressee ── */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              type="text"
              className="line-input medium-input"
              value={form.recommender_name}
              onChange={update("recommender_name")}
              placeholder="सिफारिसकर्ताको नाम"
            />
          </div>
        </div>
        <div className="addressee-row">
          <input
            type="text"
            className="line-input long-input"
            value={form.recommender_designation}
            onChange={update("recommender_designation")}
            placeholder="पद / संस्था"
          />
        </div>
        <div className="addressee-row">
          <input
            type="text"
            className="line-input long-input"
            placeholder="ठेगाना"
          />
        </div>
      </div>

      {/* ── Subject ── */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">फरक फरक नाम र थर सिफारिस ।</span>
        </p>
      </div>

      {/* ── Body paragraph ── */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            value={form.municipality}
            onChange={update("municipality")}
          />{" "}
          वडा नं. <span className="bold-text">१</span> (साविक{" "}
          <input
            type="text"
            className="inline-box-input small-box"
            value={form.previous_unit_type}
            onChange={update("previous_unit_type")}
            placeholder="इकाई"
          />
          <select
            className="inline-select"
            value={form.previous_unit_type}
            onChange={update("previous_unit_type")}
          >
            <option value="">--</option>
            <option>गा.वि.स.</option>
            <option>न.पा.</option>
          </select>
          , वडा नं.{" "}
          <input
            type="text"
            className="inline-box-input tiny-box"
            value={form.previous_ward}
            onChange={update("previous_ward")}
          />{" "}
          ) निवासी{" "}
          <select
            className="inline-select"
            value={form.salutation}
            onChange={update("salutation")}
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.applicant_name}
              onChange={update("applicant_name")}
              placeholder="निवेदकको नाम"
            />
          </div>{" "}
          को तल उल्लेखित कागजात अनुसार नाम थर फरक भएकोले सिफारिस गरिन्छ ।
        </p>
      </div>

      {/* ── Table ── */}
      <div className="table-section">
        <h4 className="table-title underline-text bold-text center-text">
          फरक नाम, थर र कागजात विवरण
        </h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "23%" }}>कागजात</th>
                <th style={{ width: "23%" }}>नाम थर</th>
                <th style={{ width: "27%" }}>फरक भएको कागजात</th>
                <th style={{ width: "27%" }}>फरक भएको नाम थर</th>
              </tr>
            </thead>
            <tbody>
              {form.rows.map((r, idx) => (
                <tr key={r.id}>
                  <td>
                    <input
                      className="table-input"
                      value={r.doc}
                      onChange={updateRow(idx, "doc")}
                      placeholder="कागजात"
                    />
                  </td>
                  <td>
                    <input
                      className="table-input"
                      value={r.name_on_doc}
                      onChange={updateRow(idx, "name_on_doc")}
                      placeholder="नाम थर"
                    />
                  </td>
                  <td>
                    <input
                      className="table-input"
                      value={r.diff_doc}
                      onChange={updateRow(idx, "diff_doc")}
                      placeholder="फरक कागजात"
                    />
                  </td>
                  <td className="last-col">
                    <input
                      className="table-input"
                      value={r.diff_name}
                      onChange={updateRow(idx, "diff_name")}
                      placeholder="फरक नाम थर"
                    />
                    {idx !== 0 && (
                      <button
                        type="button"
                        className="rm-row-btn"
                        onClick={() => removeRow(idx)}
                      >
                        −
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="add-row-btn" onClick={addRow}>
            + पंक्ति थप्नुहोस्
          </button>
        </div>
      </div>

      {/* ── Signature ── */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line" />
          <div
            className="inline-input-wrapper"
            style={{ display: "block", marginBottom: 6 }}
          >
            <span className="input-required-star">*</span>
            <input
              type="text"
              className="line-input full-width-input"
              value={form.recommender_name}
              onChange={update("recommender_name")}
              placeholder="सिफारिसकर्ताको नाम"
            />
          </div>
          <select
            className="designation-select"
            value={form.recommender_designation}
            onChange={update("recommender_designation")}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* ── Applicant details ── */}
      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

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

export default DifferentNameCertification;