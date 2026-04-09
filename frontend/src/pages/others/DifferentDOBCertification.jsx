// DifferentDOBCertification.jsx
import React, { useState } from "react";
import "./DifferentDOBCertification.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "different-dob-certification";

const emptyDoc = () => ({
  id: Date.now() + Math.random(),
  document: "",
  dob_original: "",
  doc_diff: "",
  dob_diff: "",
});

// Defined outside component — stable reference, never recreated on re-render
const INITIAL_FORM = {
  reference_no: "",
  municipality: MUNICIPALITY.name,
  previous_unit_type: "",
  previous_ward: "",
  salutation: "श्री",
  applicant_name: "",
  docs: [emptyDoc()],
  recommender_name: "",
  recommender_designation: "",
  // These names must exactly match the `name` attrs in <ApplicantDetailsNp>
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

/* ── Inline API helper with Authorization header ── */
const apiPost = async (url, body) => {
  try {
    // Read token from wherever your app stores it.
    // Common patterns: localStorage, sessionStorage, a cookie, or a React context.
    // Adjust the key name to match your auth implementation.
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

    // Handle non-2xx responses
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

const DifferentDOBCertification = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  /* ── helpers ── */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  // <ApplicantDetailsNp> fires onChange with e.target.name + e.target.value
  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const updateDoc = (idx, key) => (e) =>
    setForm((s) => ({
      ...s,
      docs: s.docs.map((d, i) =>
        i === idx ? { ...d, [key]: e.target.value } : d
      ),
    }));

  const addDocRow = () =>
    setForm((s) => ({ ...s, docs: [...s.docs, emptyDoc()] }));

  const removeDocRow = (idx) =>
    setForm((s) => ({ ...s, docs: s.docs.filter((_, i) => i !== idx) }));

  /* ── validation ── */
  const validate = () => {
    if (!form.applicant_name.trim())
      return "कृपया निवेदकको नाम (माथि) प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_name.trim())
      return "सिफारिसकर्ताको नाम प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_designation)
      return "सिफारिसकर्ताको पद छनौट गर्नुहोस्।";
    for (const d of form.docs) {
      if (!d.document.trim() || !d.dob_original.trim())
        return "कागजात र जन्म मिति अनिवार्य छ।";
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

    setLoading(true);
    const { data, error } = await apiPost(`/api/forms/${FORM_KEY}`, form);
    setLoading(false);

    if (error) {
      setMsg({ type: "error", text: error });
    } else {
      setMsg({ type: "success", text: `सेभ भयो (id: ${data?.id ?? "unknown"})` });
      // Wait for the success message to render, then open print preview
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  /* ── render ── */
  return (
    <form className="dob-cert-container" onSubmit={handleSubmit} noValidate>

      {/* ── Top bar ── */}
      <div className="top-bar-title">
        फरक फरक जन्म मिति सिफारिस ।
        <span className="top-right-bread">
          अन्य &gt; फरक फरक जन्म मिति सिफारिस
        </span>
      </div>

      {/* ── Meta ── */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
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
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
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
      </div>

      {/* ── Subject ── */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">फरक फरक जन्म मिति सिफारिस ।</span>
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
          को तल उल्लेखित कागजात अनुसार जन्म मिति फरक भएकोले सिफारिस गरिन्छ ।
        </p>
      </div>

      {/* ── Documents table ── */}
      <div className="table-section">
        <h4 className="table-title underline-text bold-text center-text">
          फरक जन्म मिति र कागजात विवरण
        </h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "23%" }}>कागजात</th>
                <th style={{ width: "23%" }}>जन्म मिति</th>
                <th style={{ width: "23%" }}>फरक भएको कागजात</th>
                <th style={{ width: "23%" }}>फरक भएको जन्म मिति</th>
                <th style={{ width: "8%" }}></th>
              </tr>
            </thead>
            <tbody>
              {form.docs.map((d, idx) => (
                <tr key={d.id}>
                  <td>
                    <input
                      value={d.document}
                      onChange={updateDoc(idx, "document")}
                      className="table-input"
                      placeholder="कागजात"
                    />
                  </td>
                  <td>
                    <input
                      value={d.dob_original}
                      onChange={updateDoc(idx, "dob_original")}
                      className="table-input"
                      placeholder="जन्म मिति"
                    />
                  </td>
                  <td>
                    <input
                      value={d.doc_diff}
                      onChange={updateDoc(idx, "doc_diff")}
                      className="table-input"
                      placeholder="फरक कागजात"
                    />
                  </td>
                  <td>
                    <input
                      value={d.dob_diff}
                      onChange={updateDoc(idx, "dob_diff")}
                      className="table-input"
                      placeholder="फरक जन्म मिति"
                    />
                  </td>
                  <td>
                    {idx !== 0 && (
                      <button
                        type="button"
                        className="rm-row-btn"
                        onClick={() => removeDocRow(idx)}
                      >
                        −
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="add-row-btn" onClick={addDocRow}>
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

export default DifferentDOBCertification;