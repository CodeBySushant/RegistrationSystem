// src/pages/MRP/PassportRecommendation.jsx
import React, { useState, useRef } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const FORM_KEY = "passport-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
/* ── Container ── */
.passport-rec-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 30px 50px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: "Mangal", "Noto Sans Devanagari", "Kalimati", sans-serif;
  color: #000;
  position: relative;
  box-sizing: border-box;
}

/* ── Required star ── */
.pr-required, .required {
  color: #c0392b;
  font-weight: 700;
  margin-left: 2px;
  font-size: 0.95rem;
}

/* ── Divider ── */
.pr-divider {
  border: none;
  border-top: 2px solid #bbb;
  margin: 14px 0 20px;
}

/* ── Meta row ── */
.pr-meta-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1rem;
}
.pr-meta-left,
.pr-meta-right { display: flex; flex-direction: column; gap: 6px; }
.pr-meta-right { text-align: right; align-items: flex-end; }

/* ── Inline field ── */
.pr-field-inline { display: flex; align-items: center; gap: 6px; }
.pr-field-inline label {
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  color: #222;
}
.pr-field-inline input,
.pr-field-inline select {
  padding: 5px 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  background: #fff;
  color: #111;
  box-sizing: border-box;
}

/* ── Addressee ── */
.pr-addressee { margin-bottom: 18px; display: flex; flex-direction: column; gap: 6px; }
.pr-addressee-line {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 4px 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
  width: 280px;
  max-width: 100%;
  color: #111;
  box-sizing: border-box;
}

/* ── Body paragraph ── */
.pr-body-paragraph {
  font-size: 1rem;
  line-height: 3;
  text-align: justify;
  color: #111;
  margin-bottom: 20px;
}
.pr-inline-wrap { display: inline-flex; align-items: center; gap: 2px; }
.pr-inline-input {
  display: inline-block;
  padding: 3px 6px;
  font-family: inherit;
  font-size: 0.92rem;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  color: #111;
  width: 130px;
  box-sizing: border-box;
  vertical-align: baseline;
  margin: 0 4px;
}
.pr-inline-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}
.pr-inline-input.pr-short  { width: 90px; }
.pr-inline-input.pr-xshort { width: 60px; }
.pr-inline-input.pr-long   { width: 180px; }
.pr-inline-input.pr-date   { width: 160px; }

/* ── Signature ── */
.pr-signature-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 32px 16px 24px 0;
  gap: 8px;
}
.pr-signature-line {
  width: 220px;
  border-bottom: 1px dotted #555;
  text-align: center;
  padding-bottom: 4px;
  font-size: 0.9rem;
  color: #444;
}
.pr-select {
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  background: #fff;
  color: #111;
  min-width: 180px;
  cursor: pointer;
}
.pr-select:focus { outline: none; border-color: #2563eb; }

/* ── Notes ── */
.pr-notes-group { display: flex; flex-direction: column; gap: 5px; margin-top: 16px; }
.pr-notes-group label { font-size: 0.88rem; font-weight: 600; color: #333; }
.pr-notes-group textarea {
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  color: #111;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  transition: border-color 0.15s;
}
.pr-notes-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* ── Footer / Submit ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .passport-rec-container { padding: 20px 14px; }
  .pr-meta-row { flex-direction: column; gap: 10px; }
  .details-grid { grid-template-columns: 1fr; }
  .pr-body-paragraph { line-height: 3.2; }
  .pr-inline-input,
  .pr-inline-input.pr-long,
  .pr-inline-input.pr-date { width: 100px; }
  .pr-signature-section { align-items: flex-start; margin-right: 0; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .passport-rec-container,
  .passport-rec-container * { visibility: visible; }
  .passport-rec-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 10mm 14mm;
    background: white;
  }
  .form-footer,
  .copyright-footer,
  .pr-required,
  .required,
  .applicant-details-box { display: none !important; }
}
`;

/* ─────────────────────────── Initial State ─────────────────────────── */
const initialState = {
  letterNo: "२०८२/८३",
  refNo: "",
  dateOfLetter: new Date().toISOString().slice(0, 10),
  dayText: "",
  headerTo: "ईलाका प्रशासन कार्यालय,",
  headerDistrict: MUNICIPALITY.city || "",
  mainDistrict: MUNICIPALITY.city || "",
  prevLocationType: "साबिक",
  prevWardNo: "",
  currentMunicipality: MUNICIPALITY.name || "",
  currentWardNo: "", // populated by useWardForm via ward_no — kept separate below
  residentAddressType: "स्थायी",
  residentDistrict: "",
  citizenIssueDate: "",
  citizenNo: "",
  applicantName: "",
  designation: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  notes: "",
};

/* ─────────────────────────── Component ─────────────────────────── */
const PassportRecommendation = () => {
  const { user } = useAuth();
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  /* ── Single save function — mirrors DomesticAnimal pattern ── */
  const handleSave = async (shouldPrint = false) => {
    // Validation — alert style, consistent with DomesticAnimal
    if (!form.headerDistrict?.trim()) {
      alert("हेडर जिल्ला आवश्यक छ।");
      return;
    }
    if (!form.mainDistrict?.trim()) {
      alert("जिल्ला आवश्यक छ।");
      return;
    }
    if (!form.currentMunicipality?.trim()) {
      alert("नगरपालिका/गाउँपालिका आवश्यक छ।");
      return;
    }
    if (!form.residentDistrict?.trim()) {
      alert("बासिन्दाको जिल्ला आवश्यक छ।");
      return;
    }
    if (!form.citizenIssueDate?.trim()) {
      alert("नागरिकता जारी मिति आवश्यक छ।");
      return;
    }
    if (!form.citizenNo?.trim()) {
      alert("नागरिकता नं. आवश्यक छ।");
      return;
    }
    if (!form.applicantName?.trim()) {
      alert("निवेदकको नाम आवश्यक छ।");
      return;
    }
    if (!form.designation?.trim()) {
      alert("पद छनोट गर्नुहोस्।");
      return;
    }
    if (!form.applicantAddress?.trim()) {
      alert("निवेदकको ठेगाना आवश्यक छ।");
      return;
    }
    if (!form.applicantCitizenship?.trim()) {
      alert("निवेदकको नागरिकता नं. आवश्यक छ।");
      return;
    }
    if (!form.applicantPhone?.trim()) {
      alert("फोन नं. आवश्यक छ।");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        letter_no: form.letterNo || null,
        ref_no: form.refNo || null,
        date_of_letter: form.dateOfLetter || null,
        day_text: form.dayText || null,
        header_to: form.headerTo || null,
        header_district: form.headerDistrict || null,
        main_district: form.mainDistrict || null,
        prev_location_type: form.prevLocationType || null,
        prev_ward_no: form.prevWardNo || null,
        current_municipality: form.currentMunicipality || null,
        current_ward_no: form.ward_no || null,
        resident_address_type: form.residentAddressType || null,
        resident_district: form.residentDistrict || null,
        citizen_issue_date: form.citizenIssueDate || null,
        citizen_no: form.citizenNo || null,
        applicant_name: form.applicantName || null,
        designation: form.designation || null,
        applicant_address: form.applicantAddress || null,
        applicant_citizenship: form.applicantCitizenship || null,
        applicant_phone: form.applicantPhone || null,
        notes: form.notes || null,
      };

      const res = await axios.post(API_URL, payload);
      if (res.status === 201) {
        if (shouldPrint) {
          handleCleanPrint();
        } else {
          alert("सफलतापूर्वक सुरक्षित भयो! ID: " + res.data.id);
        }
        setForm(initialState);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Clean isolated print window — mirrors DomesticAnimal pattern ── */
  const handleCleanPrint = () => {
    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || ""} नं. वडा कार्यालय`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>राहदानी सिफारिस</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Mangal', 'Noto Sans Devanagari', 'Kalimati', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name  { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .divider { border: none; border-top: 2px solid #bbb; margin: 12px 0 16px; }
          .meta { display: flex; justify-content: space-between; margin: 12px 0 16px; font-size: 10pt; }
          .addressee { margin-bottom: 16px; font-size: 11pt; font-weight: 600; }
          .body-text { font-size: 11pt; line-height: 2.2; text-align: justify; margin-bottom: 24px; }
          .value { font-weight: bold; padding: 0 4px; display: inline-block; min-width: 50px; }
          .signature { display: flex; justify-content: flex-end; margin-top: 48px; margin-bottom: 24px; }
          .sig-block { width: 220px; text-align: center; }
          .sig-line { border-top: 1px dotted #555; padding-top: 6px; margin-bottom: 4px; font-size: 9pt; color: #555; }
          .notes-box { margin-top: 16px; font-size: 10pt; }
          .notes-label { font-weight: 600; margin-bottom: 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 20px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <div class="divider"></div>

        <div class="meta">
          <div>
            <div>पत्र संख्या : <strong>${form.letterNo || ""}</strong></div>
            <div>चलानी नं. : <strong>${form.refNo || ""}</strong></div>
          </div>
          <div style="text-align:right">
            <div>मिति : <strong>${form.dateOfLetter || ""}</strong></div>
            <div>ने.सं : <strong>${form.dayText || ""}</strong></div>
          </div>
        </div>

        ${form.dayText ? `` : ""}

        <div class="addressee">
          ${form.headerTo || ""}<br/>
          <span class="value">${form.headerDistrict || ""}</span>
        </div>

        <div class="body-text">
          जिल्ला <span class="value">${form.mainDistrict || ""}</span>
          (<span class="value">${form.prevLocationType || ""}</span>)
          <span class="value">${form.prevWardNo || ""}</span>
          हाल वडा नं. <span class="value">${form.ward_no || ""}</span>
          हाल <span class="value">${form.currentMunicipality || ""}</span>
          ${form.residentAddressType || ""} जिल्ला
          <span class="value">${form.residentDistrict || ""}</span>
          नागरिकता जारी मिति : <span class="value">${form.citizenIssueDate || ""}</span>
          नागरिकता नं. : <span class="value">${form.citizenNo || ""}</span>
          निवेदक : <span class="value">${form.applicantName || ""}</span>
          को राहदानी सिफारिस गरिन्छ।
        </div>

        <div class="signature">
          <div class="sig-block">
            <div class="sig-line">हस्ताक्षर</div>
            <div>${form.designation || ""}</div>
          </div>
        </div>

        ${
          form.notes
            ? `
        <div class="notes-box">
          <div class="notes-label">कैफियत / टिप्पणी :</div>
          <div>${form.notes}</div>
        </div>`
            : ""
        }

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${form.applicantName || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${form.applicantAddress || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${form.applicantCitizenship || ""}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${form.applicantPhone || ""}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /* ─────────────────────────── Render ─────────────────────────── */
  return (
    <>
      <style>{styles}</style>

      <form
        className="passport-rec-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        {/* ── Municipality Header ── */}
        <MunicipalityHeader />

        <div className="pr-divider" />

        {/* ── Meta row — left: पत्र संख्या + चलानी नं., right: मिति + नेपाली दिन ── */}
        <div className="pr-meta-row">
          <div className="pr-meta-left">
            <div className="pr-field-inline">
              <label>पत्र संख्या :</label>
              <input
                type="text"
                name="letterNo"
                value={form.letterNo}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field-inline">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="refNo"
                value={form.refNo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="pr-meta-right">
            <div className="pr-field-inline">
              <label>मिति :</label>
              <input
                type="date"
                name="dateOfLetter"
                value={form.dateOfLetter}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field-inline">
              <label>ने.सं :</label>
              <input
                type="text"
                name="dayText"
                value={form.dayText}
                onChange={handleChange}
                style={{ width: 200 }}
                placeholder="जस्तै: १४६ थिंलागा, ३० शनिबार"
              />
            </div>
          </div>
        </div>

        {/* ── Addressee ── */}
        <div className="pr-addressee">
          <div className="pr-field-inline">
            <span style={{ fontWeight: 600, fontSize: "1rem" }}>श्री</span>
            <input
              type="text"
              name="headerTo"
              value={form.headerTo}
              onChange={handleChange}
              className="pr-addressee-line"
            />
          </div>
          <div className="pr-field-inline">
            <input
              type="text"
              name="headerDistrict"
              value={form.headerDistrict}
              onChange={handleChange}
              className="pr-addressee-line"
              placeholder="जिल्ला"
            />
            <span className="pr-required">*</span>
          </div>
        </div>

        {/* ── Body paragraph ── */}
        <div className="pr-body-paragraph">
          <span>जिल्ला</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="mainDistrict"
              value={form.mainDistrict}
              onChange={handleChange}
              className="pr-inline-input"
            />
            <span className="pr-required">*</span>
          </span>

          <span>(</span>
          <input
            type="text"
            name="prevLocationType"
            value={form.prevLocationType}
            onChange={handleChange}
            className="pr-inline-input pr-short"
          />
          <span>)</span>

          <input
            type="text"
            name="prevWardNo"
            placeholder="साविक वडा"
            value={form.prevWardNo}
            onChange={handleChange}
            className="pr-inline-input pr-short"
          />

          <span>हाल वडा नं.</span>
          <input
            type="text"
            name="ward_no"
            value={form.ward_no}
            onChange={handleChange}
            className="pr-inline-input pr-xshort"
          />

          <span>हाल</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="currentMunicipality"
              value={form.currentMunicipality}
              onChange={handleChange}
              className="pr-inline-input pr-long"
            />
            <span className="pr-required">*</span>
          </span>

          <span>स्थायी/अस्थायी :</span>
          <input
            type="text"
            name="residentAddressType"
            value={form.residentAddressType}
            onChange={handleChange}
            className="pr-inline-input pr-short"
          />

          <span>जिल्ला</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="residentDistrict"
              value={form.residentDistrict}
              onChange={handleChange}
              className="pr-inline-input"
              placeholder="जिल्ला"
            />
            <span className="pr-required">*</span>
          </span>

          <span>नागरिकता जारी मिति :</span>
          <span className="pr-inline-wrap">
            <input
              type="date"
              name="citizenIssueDate"
              value={form.citizenIssueDate}
              onChange={handleChange}
              className="pr-inline-input pr-date"
            />
            <span className="pr-required">*</span>
          </span>

          <span>नागरिकता नं. :</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="citizenNo"
              value={form.citizenNo}
              onChange={handleChange}
              className="pr-inline-input"
            />
            <span className="pr-required">*</span>
          </span>

          <span>निवेदक :</span>
          <span className="pr-inline-wrap">
            <input
              type="text"
              name="applicantName"
              value={form.applicantName}
              onChange={handleChange}
              className="pr-inline-input pr-long"
            />
            <span className="pr-required">*</span>
          </span>
          <span>को राहदानी सिफारिस गरिन्छ।</span>
        </div>

        {/* ── Signature ── */}
        <div className="pr-signature-section">
          <div className="pr-signature-line">हस्ताक्षर</div>
          <div className="pr-field-inline">
            <select
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="pr-select"
            >
              <option value="">पद छनोट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
            </select>
            <span className="pr-required">*</span>
          </div>
        </div>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Notes ── */}
        <div className="pr-notes-group">
          <label>कैफियत / टिप्पणी</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* ── Footer — two buttons, same as DomesticAnimal ── */}
        <div className="form-footer">
          <button
            type="submit"
            className="save-print-btn"
            disabled={loading}
            style={{ marginRight: 12, backgroundColor: "#2c3e50" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ गर्नुहोस्"}
          </button>
          <button
            type="button"
            className="save-print-btn"
            disabled={loading}
            onClick={() => handleSave(true)}
            style={{ backgroundColor: "#1a6b3a" }}
          >
            {loading ? "पठाइँ हुँदैछ..." : "सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </>
  );
};

export default PassportRecommendation;
