import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   PrintField & PrintSelect — MODULE SCOPE ONLY.
   Never define these inside the component —
   React would create a new type on every render,
   unmounting the input each keystroke.
───────────────────────────────────────────── */
const PrintField = ({ value, isPrint, className = "", name, onChange, ...rest }) => {
  if (isPrint) {
    return <span className={`cwos-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`cwos-pf-input ${className}`}
      {...rest}
    />
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`cwos-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`cwos-pf-select ${className}`}
    >
      {children}
    </select>
  );
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  date:               new Date().toISOString().slice(0, 10),
  districtOffice:     MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  preMarriageDate:    "२०८२.०७.१५",
  preMarriageDistrict:"",
  relationshipStatus: "सम्बन्धविच्छेद",
  certificateInfo:    "",
  currentHusbandName: "",
  currentDistrict:    MUNICIPALITY?.englishDistrict || "जिल्ला",
  currentPalikaType:  "गा.पा.",
  currentPalikaName:  MUNICIPALITY?.name || "",
  applicantName:      "",
  applicantAddress:   "",
  applicantCitizenship:"",
  applicantPhone:     "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: cwos-)
───────────────────────────────────────────── */
const styles = `
.cwos-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: "Arial", sans-serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 1.6;
}

.cwos-header-row { margin-bottom: 16px; }

.cwos-form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  gap: 20px;
}

.cwos-header-to-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cwos-header-to-group h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.cwos-date-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-weight: bold;
  gap: 8px;
}
.cwos-date-group input {
  border: none;
  border-bottom: 1px dotted #000;
  background-color: #fff;
  color: #000;
  font-family: inherit;
  font-size: 14px;
  padding: 2px 6px;
  outline: none;
}
.cwos-date-group input:focus { border-bottom-color: #3b7dd8; }

.cwos-subject-line {
  text-align: center;
  margin: 25px 0;
  font-size: 16px;
}

.cwos-certificate-body {
  line-height: 2.8;
  font-size: 15px;
  text-align: justify;
}

/* PrintField — screen (input) */
.cwos-pf-input {
  display: inline-block;
  vertical-align: baseline;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 15px;
  color: #000;
  background-color: #fff;
  border: none;
  border-bottom: 1px dotted #555;
  outline: none;
  width: 150px;
  max-width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s, background-color 0.15s;
}
.cwos-pf-input:focus {
  border-bottom-color: #3b7dd8;
  background-color: #f0f7ff;
}
.cwos-pf-input.short        { width: 70px; }
.cwos-pf-input.long         { width: 220px; }
.cwos-pf-input.header-field {
  font-size: 16px;
  font-weight: bold;
  width: 260px;
  border-bottom: 1px dotted #000;
}

/* PrintField — print mode (span) */
.cwos-pf-value {
  display: inline-block;
  vertical-align: baseline;
  padding: 0 4px;
  font-family: inherit;
  font-size: 15px;
  color: #000;
  min-width: 60px;
  border-bottom: 1px solid #000;
  word-break: break-word;
}
.cwos-pf-value.short        { min-width: 40px; }
.cwos-pf-value.long         { min-width: 160px; }
.cwos-pf-value.header-field {
  font-size: 16px;
  font-weight: bold;
  min-width: 200px;
}

/* PrintSelect — screen */
.cwos-pf-select {
  display: inline-block;
  vertical-align: baseline;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 15px;
  color: #000;
  background-color: #fff;
  border: none;
  border-bottom: 1px dotted #555;
  outline: none;
  min-width: 80px;
  cursor: pointer;
}
.cwos-pf-select:focus { border-bottom-color: #3b7dd8; }

.cwos-submit-area {
  clear: both;
  text-align: center;
  margin-top: 30px;
  padding-top: 30px;
}
.cwos-submit-btn {
  background-color: #343a40;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.cwos-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.cwos-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }

  .cwos-container,
  .cwos-container * { visibility: visible; }

  .cwos-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    max-width: none;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 15px;
    background: white !important;
    background-image: none !important;
    font-size: 14px;
    line-height: 1.8;
    color: #000;
  }

  .cwos-submit-area { display: none !important; }

  .cwos-pf-value {
    border-bottom: 1px solid #000 !important;
    color: #000 !important;
    background: transparent !important;
  }

  /* Fallback for inputs inside ApplicantDetailsNp */
  input, select, textarea {
    color: #000 !important;
    -webkit-text-fill-color: #000 !important;
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    opacity: 1 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  input::placeholder, textarea::placeholder {
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cwos-container { width: 100%; padding: 15px; }
  .cwos-form-row { flex-direction: column; }
  .cwos-pf-input { width: 110px; }
  .cwos-pf-input.long { width: 160px; }
  .cwos-pf-input.header-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const CitizenshipwithoutHusbandSurname = () => {
  const [formData, setFormData]     = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [isPrint, setIsPrint]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

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
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/citizenship-remove-husband",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        // Keep data in state — isPrint renders spans with correct
        // values before window.print() fires (see useEffect).
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

  // RAF guarantees React finishes painting spans before print dialog.
  // Reset happens after print dialog closes.
  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      setFormData(INITIAL_STATE);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  return (
    <>
      <style>{styles}</style>

      <div className="cwos-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality header ── */}
          <div className="cwos-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee + Date ── */}
          <div className="cwos-form-row">
            <div className="cwos-header-to-group">
              <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
              <PrintField
                name="districtOffice"
                value={formData.districtOffice}
                onChange={handleChange}
                isPrint={isPrint}
                className="header-field"
                required
              />
            </div>

            <div className="cwos-date-group">
              <label>मिति :</label>
              {isPrint
                ? <span className="cwos-pf-value">{formData.date}</span>
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
          <div className="cwos-subject-line">
            <strong>
              विषय:{" "}
              <u>
                पूर्व पतिको नामथर हटाई हालको पतिको नाम थर वतन कायम गरी
                नागरिकताको प्रतिलिपि पाउँ ।
              </u>
            </strong>
          </div>

          {/* ── Body paragraph ── */}
          <p className="cwos-certificate-body">
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
            &nbsp;जिल्लाबाट नेपाली नागरिकताको प्रमाणपत्र प्राप्त गरेकोमा
            मेरो श्रीमानसँग&nbsp;
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

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Submit (hidden in print mode) ── */}
          {!isPrint && (
            <div className="cwos-submit-area">
              <button
                type="submit"
                className="cwos-submit-btn"
                disabled={submitting}
              >
                {submitting
                  ? "पठाइँ हुँदैछ..."
                  : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
              </button>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default CitizenshipwithoutHusbandSurname;