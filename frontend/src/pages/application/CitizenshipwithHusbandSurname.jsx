// src/pages/application/CitizenshipwithHusbandSurname.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import "./CitizenshipwithHusbandSurname.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// ─────────────────────────────────────────────────────────────────
// PrintField & PrintSelect MUST be at module scope.
// Defining them inside the component causes React to treat them as
// a new component type on every render → input unmounts every
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

// ─────────────────────────────────────────────────────────────────

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  districtOffice: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  preMarriageDate: "२०८२.०७.१५",
  preMarriageDistrict: "",
  currentMunicipality: MUNICIPALITY?.name || "",
  currentWard: MUNICIPALITY?.wardNumber || "",
  husbandName: "",
  // applicant fields (used by ApplicantDetailsNp)
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const CitizenshipwithHusbandSurname = () => {
  const [formData, setFormData]     = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  // isPrint: when true React renders <span> instead of <input>
  // so window.print() always sees the real values in the DOM
  const [isPrint, setIsPrint]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // FIX: removed references to sigName/sigMobile which didn't exist
  // in initialState or JSX — they caused validate() to always fail
  const validate = (data) => {
    if (!data.preMarriageDistrict?.trim()) return "विवाहपूर्वको जिल्ला आवश्यक छ";
    if (!data.currentMunicipality?.trim()) return "हालको गा.पा./न.पा. आवश्यक छ";
    if (!data.currentWard?.trim())         return "वडा नम्बर आवश्यक छ";
    if (!data.husbandName?.trim())         return "पतिको नाम आवश्यक छ";
    if (!data.applicantName?.trim())       return "निवेदकको नाम आवश्यक छ";
    if (!data.applicantPhone?.trim())      return "फोन नम्बर आवश्यक छ";
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

      const res = await axios.post("/api/forms/citizenship-husband-surname", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        // FIX: do NOT reset form here — data must stay in state so
        // isPrint renders the correct values before window.print() fires.
        // Reset happens inside the useEffect after printing.
        setIsPrint(true);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  // FIX: use requestAnimationFrame instead of setTimeout(150).
  // RAF guarantees React has finished painting the span-based layout
  // before the print dialog opens — setTimeout is a guess and races.
  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      // Reset AFTER print dialog closes
      setFormData(initialState);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  return (
    <div className="citizenship-husband-container">
      <form onSubmit={handleSubmit}>

        {/* ── Municipal Header ── */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* ── Addressee + Date ── */}
        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            {/* FIX: was a plain <input> with transparent bg — now PrintField */}
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
            {/* Date field: simple conditional — no PrintField needed */}
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
            विषय: <u>पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रतिलिपि पाउँ ।</u>
          </strong>
        </div>

        {/* ── Body paragraph — all inputs now PrintField ── */}
        <p className="certificate-body">
          प्रस्तुत विषयमा मेरो विवाह नहुँदै मिति&nbsp;
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
          &nbsp;जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा हाल यस
          जिल्लाको&nbsp;
          <PrintField
            name="currentMunicipality"
            value={formData.currentMunicipality}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="गा.पा. / न.पा."
            required
          />
          &nbsp;गा.पा. / न.पा. वडा नं&nbsp;
          <PrintField
            name="currentWard"
            value={formData.currentWard}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="वडा"
            className="short"
            required
          />
          &nbsp;बस्ने&nbsp;
          <PrintField
            name="husbandName"
            value={formData.husbandName}
            onChange={handleChange}
            isPrint={isPrint}
            placeholder="पतिको नाम"
            required
          />
          &nbsp;सँग वैवाहिक सम्बन्ध कायम भएकोले पतिको नाम, थर र वतन कायम गरी
          नागरिकताको प्रतिलिपि पाउँ भनी आवश्यक कागजातहरु संलग्न राखी यो निवेदन
          पेश गर्दछु ।
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

export default CitizenshipwithHusbandSurname;