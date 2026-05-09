// src/pages/application/CitizenshipwithoutHusbandSurname.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import "./CitizenshipwithoutHusbandSurname.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// FIX: removed unused `useAuth` import
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// ─────────────────────────────────────────────────────────────────
// PrintField & PrintSelect MUST be at MODULE SCOPE — never inside
// a component. Defining them inside causes React to create a new
// component type on every render → input unmounts on each keystroke
// → only 1 character can be typed at a time.
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
  districtOffice: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  preMarriageDate: "२०८२.०७.१५",
  preMarriageDistrict: "",
  relationshipStatus: "सम्बन्धविच्छेद",
  certificateInfo: "",
  currentHusbandName: "",
  currentDistrict: MUNICIPALITY?.englishDistrict || "जिल्ला",
  currentPalikaType: "गा.पा.",
  currentPalikaName: MUNICIPALITY?.name || "",
  // applicant fields (used by ApplicantDetailsNp)
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const CitizenshipwithoutHusbandSurname = () => {
  const [formData, setFormData]     = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  // FIX: isPrint drives print-mode rendering so window.print()
  // always sees real <span> values in the DOM — not blank inputs
  const [isPrint, setIsPrint]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // FIX: removed sigName / sigMobile — they don't exist in
  // initialState or JSX, causing validate() to always fail and
  // making the form impossible to submit
  const validate = (d) => {
    if (!d.preMarriageDistrict?.trim()) return "विवाहपूर्वको जिल्ला आवश्यक छ";
    if (!d.certificateInfo?.trim())     return "प्रमाणपत्र विवरण आवश्यक छ";
    if (!d.currentHusbandName?.trim())  return "हालको पतिको नाम आवश्यक छ";
    if (!d.currentPalikaName?.trim())   return "हालको पालिकाको नाम आवश्यक छ";
    if (!d.applicantName?.trim())       return "निवेदकको नाम आवश्यक छ";
    if (!d.applicantPhone?.trim())      return "फोन नम्बर आवश्यक छ";
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

      const res = await axios.post("/api/forms/citizenship-remove-husband", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        // FIX: do NOT reset form here — data must stay in state so
        // isPrint renders correct <span> values before print fires.
        // Reset happens in useEffect after printing completes.
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
      // FIX: was JSON.stringify(msg) — if msg is already a string
      // that wraps it in extra quotes e.g. '"Network Error"'
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  // FIX: requestAnimationFrame guarantees React has finished
  // painting the span-based layout before print dialog opens.
  // setTimeout(150) is a race condition that loses on slow devices.
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
    <div className="citizenship-remove-husband-container">
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
              name="districtOffice"
              value={formData.districtOffice}
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
            विषय:{" "}
            <u>
              पूर्व पतिको नामथर हटाई हालको पतिको नाम थर वतन कायम गरी नागरिकताको
              प्रतिलिपि पाउँ ।
            </u>
          </strong>
        </div>

        {/* ── Body paragraph — all inline fields now PrintField/PrintSelect ── */}
        <p className="certificate-body">
          प्रस्तुत विषयमा मेरो मिति&nbsp;
          <PrintField
            name="preMarriageDate"
            value={formData.preMarriageDate}
            onChange={handleChange}
            isPrint={isPrint}
            required
          />
          &nbsp;मा&nbsp;
          <PrintField
            name="preMarriageDistrict"
            value={formData.preMarriageDistrict}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="जिल्ला"
            required
          />
          &nbsp;जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा मेरो श्रीमानसँग&nbsp;
          <PrintSelect
            name="relationshipStatus"
            value={formData.relationshipStatus}
            onChange={handleChange}
            isPrint={isPrint}
          >
            <option>सम्बन्धविच्छेद</option>
            <option>अन्य</option>
          </PrintSelect>
          &nbsp;भई&nbsp;
          <PrintField
            name="certificateInfo"
            value={formData.certificateInfo}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="सम्बन्धविच्छेद दर्ताको प्रमाणपत्र"
            className="long"
            required
          />
          &nbsp;दर्ताको प्रमाणपत्र समेत प्राप्त गरिसकेको र हाल&nbsp;
          <PrintField
            name="currentHusbandName"
            value={formData.currentHusbandName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="हालको पतिको नाम"
            required
          />
          &nbsp;
          <PrintField
            name="currentDistrict"
            value={formData.currentDistrict}
            onChange={handleChange}
            isPrint={isPrint}
            required
          />
          &nbsp;जिल्ला&nbsp;
          <PrintSelect
            name="currentPalikaType"
            value={formData.currentPalikaType}
            onChange={handleChange}
            isPrint={isPrint}
          >
            <option>गा.पा.</option>
            <option>न.पा.</option>
          </PrintSelect>
          &nbsp;
          <PrintField
            name="currentPalikaName"
            value={formData.currentPalikaName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="पालिकाको नाम"
            required
          />
          &nbsp;बस्ने
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

export default CitizenshipwithoutHusbandSurname;