// src/pages/application/DalitCasteCertification.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import "./DalitCasteCertification.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// FIX: removed unused `useAuth` import
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// ─────────────────────────────────────────────────────────────────
// PrintField & PrintSelect MUST be at MODULE SCOPE — never inside
// a component. Defining them inside causes React to treat them as
// a new component type on every render → input unmounts each
// keystroke → only 1 character can be typed at a time.
// ─────────────────────────────────────────────────────────────────

const PrintField = ({ value, isPrint, className = "", name, onChange, ...rest }) => {
  if (isPrint) {
    return <span className={`pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`pf-input ${className}`}
      {...rest}
    />
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`pf-select ${className}`}
    >
      {children}
    </select>
  );
};

// ─────────────────────────────────────────────────────────────────

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: MUNICIPALITY?.wardNumber || "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  casteName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const DalitCasteCertification = () => {
  const [formData, setFormData]     = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  // FIX: isPrint drives print-mode rendering so window.print()
  // always sees real <span> values — not blank transparent inputs
  const [isPrint, setIsPrint]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // FIX: removed sigName / sigMobile — don't exist in initialState
  // or JSX; their presence made validate() always fail so the form
  // could never be submitted
  const validate = (d) => {
    if (!d.mainDistrict?.trim())  return "जिल्लाको नाम आवश्यक छ";
    if (!d.palikaName?.trim())    return "पालिकाको नाम आवश्यक छ";
    if (!d.wardNo?.trim())        return "वडा नम्बर आवश्यक छ";
    if (!d.residentName?.trim())  return "निवासीको नाम आवश्यक छ";
    if (!d.casteName?.trim())     return "जातिको नाम आवश्यक छ";
    if (!d.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!d.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post("/api/forms/dalit-caste-certification", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        // FIX: do NOT reset form here — data must stay so isPrint
        // renders correct <span> values before print fires.
        // Reset happens in useEffect after printing.
        setIsPrint(true);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Submission failed";
      // FIX: was JSON.stringify(msg) — wraps string in extra quotes
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  // FIX: requestAnimationFrame guarantees React has finished
  // painting span-based layout before print dialog opens.
  // setTimeout(150) is an unreliable race condition.
  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      setFormData(initialState);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  return (
    <div className="dalit-cert-container">
      <form onSubmit={handleSubmit}>

        {/* ── Municipal Header ── */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* ── Addressee + Date ── */}
        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            {/* FIX: was plain <input> with transparent bg → PrintField */}
            <PrintField
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              isPrint={isPrint}
              className="header-field"
              required
            />
          </div>

          <div className="form-group date-group">
            <label>मिति :</label>
            {isPrint
              ? <span className="pf-value">{formData.date}</span>
              : <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
            }
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="subject-line">
          <strong>
            विषय: <u>दलित जाति प्रमाणित गरि पाउँ ।</u>
          </strong>
        </div>

        {/* ── Body paragraph — all inline fields now PrintField/PrintSelect ── */}
        <p className="certificate-body">
          <PrintField
            name="mainDistrict"
            value={formData.mainDistrict}
            onChange={handleChange}
            isPrint={isPrint}
            required
          />
          &nbsp;जिल्ला&nbsp;
          <PrintField
            name="palikaName"
            value={formData.palikaName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="गाउँपालिका/नगरपालिका"
            required
          />
          &nbsp;वडा नं.&nbsp;
          <PrintField
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="वडा"
            className="short"
            required
          />
          &nbsp;निवासी&nbsp;
          <PrintField
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="निवासीको नाम"
            required
          />
          &nbsp;को&nbsp;
          <PrintSelect
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            isPrint={isPrint}
          >
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </PrintSelect>
          &nbsp;म&nbsp;
          <PrintField
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="अभिभावकको नाम"
          />
          &nbsp;दलित जाति अन्तर्गत&nbsp;
          <PrintField
            name="casteName"
            value={formData.casteName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="जातिको नाम"
            required
          />
          &nbsp;जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
          सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
          निवेदन पेश गरेको छु ।
        </p>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* ── Submit (hidden in print mode) ── */}
        {!isPrint && (
          <div className="submit-area">
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DalitCasteCertification;