// src/pages/application/BusinessDeregistrationForm.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import "./BusinessDeregistrationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  headerTo: "श्रीमान्",
  headerMunicipality: MUNICIPALITY?.name || "",
  headerOffice: MUNICIPALITY?.englishDistrict || "",
  date: new Date().toISOString().slice(0, 10),
  municipality: MUNICIPALITY?.name || "",
  firmType: "प्राइभेट फर्म",
  firmRegNo: "",
  firmName: "",
  dissolveReason: "",
  applicantNameForDissolve: "",
  sigSignature: "",
  sigName: "",
  sigAddress: "",
  sigFirmStamp: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  wardNo: MUNICIPALITY?.wardNumber || "",
};

// ─────────────────────────────────────────────────────────────────
//  PrintField — shows <input> on screen, <span> when printing
//  This is the ONLY reliable cross-browser solution.
// ─────────────────────────────────────────────────────────────────
const PrintField = ({ value, isPrint, className = "", inputProps = {} }) => {
  if (isPrint) {
    return (
      <span className={`pf-value ${className}`}>
        {value || ""}
      </span>
    );
  }
  return (
    <input
      type="text"
      value={value}
      className={`pf-input ${className}`}
      {...inputProps}
    />
  );
};

const PrintSelect = ({ value, isPrint, className = "", children, selectProps = {} }) => {
  if (isPrint) {
    return (
      <span className={`pf-value ${className}`}>
        {value || ""}
      </span>
    );
  }
  return (
    <select value={value} className={`pf-select ${className}`} {...selectProps}>
      {children}
    </select>
  );
};

// ─────────────────────────────────────────────────────────────────

const BusinessDeregistrationForm = () => {
  const [formData, setFormData]   = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  // isPrint flips to true just before window.print() so React
  // re-renders with span values, then resets after.
  const [isPrint, setIsPrint]     = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    const required = [
      "firmRegNo", "firmName", "dissolveReason",
      "applicantNameForDissolve", "sigSignature",
      "sigName", "sigAddress", "sigFirmStamp",
      "applicantName", "applicantAddress", "applicantCitizenship",
    ];
    for (const f of required) {
      if (!d[f] || !String(d[f]).trim()) return `${f} आवश्यक छ`;
    }
    if (d.applicantPhone && !/^[0-9+\-\s]{6,20}$/.test(String(d.applicantPhone))) {
      return "फोन नम्बर अमान्य";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्। (" + err + ")");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/business-deregistration", payload);

      if (res.status === 201 || res.status === 200) {
        alert("फर्म सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        // Switch to print mode → React re-renders spans → then print
        setIsPrint(true);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  // When isPrint becomes true, wait one frame for React to
  // finish rendering spans, then print, then reset everything.
  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      // After print dialog closes, reset form and exit print mode
      setFormData(initialState);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  // ── helpers so JSX stays readable ──────────────────────────────
  const F = ({ name, className, ...rest }) => (
    <PrintField
      value={formData[name]}
      isPrint={isPrint}
      className={className}
      inputProps={{ name, onChange: handleChange, ...rest }}
    />
  );

  const S = ({ name, className, children }) => (
    <PrintSelect
      value={formData[name]}
      isPrint={isPrint}
      className={className}
      selectProps={{ name, onChange: handleChange }}
    >
      {children}
    </PrintSelect>
  );
  // ───────────────────────────────────────────────────────────────

  return (
    <div className="business-dereg-container">
      <form onSubmit={handleSubmit}>

        {/* ── Header ── */}
        <div className="title-header">
          <MunicipalityHeader showLogo />
          <h3>अनुसूची-१५.३</h3>
          <h4>प्राइभेट फर्म तथा साझेदारी फर्म खारेजीको लागि निवेदन</h4>
        </div>

        <div className="form-row">
          <div className="header-to-group">
            <div className="form-group-inline">
              <F name="headerTo" className="header-field" />
              <span>ज्यु,</span>
            </div>
            <F name="headerMunicipality" className="header-field" />
            <F name="headerOffice"       className="header-field" />
          </div>

          <div className="header-meta">
            <div className="stamp-box">रु. २० को टिकट</div>
            <div className="form-group date-group">
              <label>मिति :</label>
              {isPrint
                ? <span className="pf-value">{formData.date}</span>
                : <input type="date" name="date" value={formData.date} onChange={handleChange} />
              }
            </div>
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="subject-line">
          <strong>विषय: <u>फर्म खारेजी सम्बन्धमा ।</u></strong>
        </div>

        {/* ── Body paragraph ── */}
        <p className="certificate-body">
          उपर्युक्त सम्बन्धमा मेरो नाममा यस&nbsp;
          <S name="municipality">
            <option>{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</option>
          </S>
          &nbsp;मा व्यापारिक प्रयोजनको लागि दर्ता भएको&nbsp;
          <S name="firmType">
            <option>प्राइभेट फर्म</option>
            <option>साझेदारी फर्म</option>
          </S>
          &nbsp;नं.&nbsp;
          <F name="firmRegNo" className="short" required />
          &nbsp;को&nbsp;
          <F name="firmName" placeholder="फर्मको नाम" required />
          &nbsp;नामको फर्म&nbsp;
          <F name="dissolveReason" placeholder="कारण" required />
          &nbsp;कारणले खारेज गरी पाउन रु. २० को टिकट टाँसी यो निवेदन दिएको छु।
          उक्त फर्मको नामबाट नेपाल सरकार र अन्य कुनै निकायमा कुनै राजस्व र अन्य रकम
          बुझाउन बाँकी छैन। कुनै किसिमको रकमा वा राजस्व बुझाउन बाँकी देखिएमा पछि
          कुनै उजुरबाजुर नगरी सम्बन्धित निकायमा बुझाउन मेरो मन्जुरी छ। निम्नानुसार
          लाग्ने दस्तुर तिरी मेरो&nbsp;
          <F name="applicantNameForDissolve" placeholder="तपाईको नाम" required />
          &nbsp;नामको उक्त फर्म खारेज गरी पाउन श्रीमान समक्ष अनुरोध गर्दछु।
        </p>

        {/* ── Documents list ── */}
        <div className="documents-list">
          <strong>संलग्न कागजातहरु:</strong>
          <ol>
            <li>सक्कल प्रमाणपत्र</li>
            <li>नागरिकता दर्ता प्रमाणपत्रको प्रतिलिपि</li>
            <li>कर तिरेको निस्सा</li>
            <li>लेखा परिक्षण प्रतिवेदन</li>
            <li>अन्य (भएमा उल्लेख गर्ने)</li>
          </ol>
        </div>

        {/* ── Signature & Thumbprint ── */}
        <div className="signature-wrapper">
          <div className="thumb-section">
            <label className="section-title">औंठा छाप</label>
            <div className="thumb-boxes">
              <div className="thumb-box"><label>बायाँ</label><div className="thumb-area" /></div>
              <div className="thumb-box"><label>दायाँ</label><div className="thumb-area" /></div>
            </div>
          </div>

          <div className="signature-section">
            <p className="signature-label">निवेदक</p>
            {[
              { label: "दस्तखत", name: "sigSignature" },
              { label: "नाम",    name: "sigName"      },
              { label: "ठेगाना", name: "sigAddress"   },
              { label: "फर्मको छाप", name: "sigFirmStamp" },
            ].map(({ label, name }) => (
              <div className="form-group-inline" key={name}>
                <label>{label} : <span className="req">*</span></label>
                <F name={name} required />
              </div>
            ))}
          </div>
        </div>

        {/* ── Applicant Details ── */}
        {/* ApplicantDetailsNp renders its own inputs; on print those
            are handled by the global print CSS (see stylesheet).      */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* ── Submit — hidden during print mode ── */}
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

export default BusinessDeregistrationForm;