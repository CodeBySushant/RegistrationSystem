// DifferentEnglishSpellingCertification.jsx
import React, { useState } from "react";
import "./DifferentEnglishSpellingCertification.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "different-english-spelling-certification";

const emptyDoc = () => ({
  id: Date.now() + Math.random(),
  doc_name: "",
  diff_name: "",
});

const INITIAL_FORM = {
  reference_no: "",
  municipality: MUNICIPALITY.name,
  previous_unit_type: "",
  previous_ward: "",
  salutation: "श्री",
  applicant_name: "",
  english_spelling_basis: "",
  docs: [emptyDoc()],
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

const DifferentEnglishSpellingCertification = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  /* ── helpers ── */
  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

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
    if (!form.english_spelling_basis.trim())
      return "अंग्रेजी हिज्जेको आधार प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_name.trim())
      return "सिफारिसकर्ताको नाम प्रविष्ट गर्नुहोस्।";
    if (!form.recommender_designation)
      return "सिफारिसकर्ताको पद छनौट गर्नुहोस्।";
    for (const d of form.docs) {
      if (!d.doc_name.trim() || !d.diff_name.trim())
        return "कागजात र फरक नाम थर पूरा गर्नुहोस्।";
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
      setTimeout(() => window.print(), 300);
    }
  };

  /* ── render ── */
  return (
    <form className="spelling-cert-container" onSubmit={handleSubmit} noValidate>

      {/* ── Top bar ── */}
      <div className="top-bar-title">
        फरक फरक अंग्रेजी हिज्जे प्रमाणित ।
        <span className="top-right-bread">
          अन्य &gt; फरक फरक अंग्रेजी हिज्जे प्रमाणित
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

      {/* ── Subject ── */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">फरक फरक अंग्रेजी हिज्जे प्रमाणित ।</span>
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
          को नाम थर मा अंग्रेजी हिज्जे{" "}
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              type="text"
              className="inline-box-input medium-box"
              value={form.english_spelling_basis}
              onChange={update("english_spelling_basis")}
              placeholder="हिज्जेको आधार"
            />
          </div>{" "}
          को आधारमा तल उल्लेखित कागजातमा अंग्रेजी हिज्जे फरक भएकोले प्रमाणित गरिन्छ ।
        </p>
      </div>

      {/* ── Documents table ── */}
      <div className="table-section">
        <h4 className="table-title underline-text bold-text center-text">
          फरक अंग्रेजी हिज्जे र कागजात विवरण
        </h4>
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th style={{ width: "47%" }}>फरक भएको कागजात</th>
                <th style={{ width: "47%" }}>फरक भएको नाम थर</th>
                <th style={{ width: "6%" }}></th>
              </tr>
            </thead>
            <tbody>
              {form.docs.map((d, idx) => (
                <tr key={d.id}>
                  <td>
                    <input
                      className="table-input"
                      value={d.doc_name}
                      onChange={updateDoc(idx, "doc_name")}
                      placeholder="कागजात"
                    />
                  </td>
                  <td>
                    <input
                      className="table-input"
                      value={d.diff_name}
                      onChange={updateDoc(idx, "diff_name")}
                      placeholder="फरक नाम थर"
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

export default DifferentEnglishSpellingCertification;