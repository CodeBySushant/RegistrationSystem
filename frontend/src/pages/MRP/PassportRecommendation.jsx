// src/components/PassportRecommendation.jsx
import React, { useState } from "react";
import "./PassportRecommendation.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import axios from "../../utils/axiosInstance";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "passport-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

const PassportRecommendation = () => {
  const { user } = useAuth();

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const [formData, setFormData] = useState({
    letterNo: "२०८२/८३",
    refNo: "",
    dateOfLetter: new Date().toISOString().slice(0, 10),
    dayText: "",
    headerTo: "श्री ईलाका प्रशासन कार्यालय,",
    headerDistrict: MUNICIPALITY.city || "",
    mainDistrict: MUNICIPALITY.city || "",
    prevLocationType: "साबिक",
    prevWardNo: "",
    currentMunicipality: MUNICIPALITY.name || "",
    currentWardNo: user?.ward || "1",
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
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.headerDistrict.trim()) return "हेडर जिल्ला आवश्यक छ।";
    if (!formData.mainDistrict.trim()) return "जिल्ला आवश्यक छ।";
    if (!formData.currentMunicipality.trim()) return "नगरपालिका आवश्यक छ।";
    if (!formData.currentWardNo.toString().trim()) return "हालको वडा नं. आवश्यक छ।";
    if (!formData.residentDistrict.trim()) return "बासिन्दाको जिल्ला आवश्यक छ।";
    if (!formData.citizenIssueDate.trim()) return "नागरिकता जारी मिति आवश्यक छ।";
    if (!formData.citizenNo.trim()) return "नागरिकता नं. आवश्यक छ।";
    if (!formData.applicantName.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!formData.designation) return "पद छनोट गर्नुहोस्।";
    if (!formData.applicantAddress.trim()) return "निवेदकको ठेगाना आवश्यक छ।";
    if (!formData.applicantCitizenship.trim()) return "नागरिकता नं. आवश्यक छ।";
    if (!formData.applicantPhone.trim()) return "फोन नं. आवश्यक छ।";
    return null;
  };

  const toPayload = (data) => ({
    letter_no: data.letterNo || null,
    ref_no: data.refNo || null,
    date_of_letter: data.dateOfLetter || null,
    day_text: data.dayText || null,
    header_to: data.headerTo || null,
    header_district: data.headerDistrict || null,
    main_district: data.mainDistrict || null,
    prev_location_type: data.prevLocationType || null,
    prev_ward_no: data.prevWardNo || null,
    current_municipality: data.currentMunicipality || null,
    current_ward_no: data.currentWardNo || null,
    resident_address_type: data.residentAddressType || null,
    resident_district: data.residentDistrict || null,
    citizen_issue_date: data.citizenIssueDate || null,
    citizen_no: data.citizenNo || null,
    applicant_name: data.applicantName || null,
    designation: data.designation || null,
    applicant_address: data.applicantAddress || null,
    applicant_citizenship: data.applicantCitizenship || null,
    applicant_phone: data.applicantPhone || null,
    notes: data.notes || null,
  });

  const handleSaveAndPrint = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate();
    if (err) {
      showToast("error", err);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, toPayload(formData));
      showToast("success", `सफलतापूर्वक सेभ भयो (id: ${res.data?.id || "unknown"})`);
      // small delay so toast renders before print dialog opens
      setTimeout(() => window.print(), 300);
    } catch (err) {
      const info = err.response?.data?.message || err.message || "सेभ गर्न असफल भयो।";
      showToast("error", info);
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="passport-rec-container" onSubmit={handleSaveAndPrint}>

      {/* ── Toast notice ── */}
      {toast && (
        <div className={`pr-toast pr-toast--${toast.type}`}>
          <span>{toast.type === "success" ? "✔" : "✖"}</span>
          {toast.text}
        </div>
      )}

      {/* ── Municipality Header ── */}
      <div className="pr-header">
        <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" className="pr-logo" />
        <div className="pr-header-text">
          <div className="pr-muni-name">{MUNICIPALITY.name}</div>
          <div className="pr-ward-name">{wardLabel}</div>
          <div className="pr-address">{MUNICIPALITY.officeLine}</div>
          <div className="pr-address">{MUNICIPALITY.provinceLine}</div>
        </div>
      </div>

      <div className="pr-divider" />

      {/* ── Top meta row ── */}
      <div className="pr-meta-row">
        <div className="pr-field-inline">
          <label>पत्र संख्या :</label>
          <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
        </div>
        <div className="pr-field-inline">
          <label>चलानी नं. :</label>
          <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
        </div>
        <div className="pr-field-inline">
          <label>मिति :</label>
          <input type="date" name="dateOfLetter" value={formData.dateOfLetter} onChange={handleChange} />
        </div>
      </div>

      <div className="pr-field-inline" style={{ marginBottom: 12 }}>
        <label>नेपाली दिन/विवरण :</label>
        <input type="text" name="dayText" value={formData.dayText} onChange={handleChange} style={{ width: 260 }} />
      </div>

      {/* ── Addressee ── */}
      <div className="pr-addressee">
        <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} className="pr-addressee-line" />
        <div className="pr-field-inline">
          <input type="text" name="headerDistrict" value={formData.headerDistrict} onChange={handleChange} className="pr-addressee-line" placeholder="जिल्ला" />
          <span className="pr-required">*</span>
        </div>
      </div>

      {/* ── Certificate body paragraph ── */}
      <div className="pr-body-paragraph">
        <span>जिल्ला</span>
        <span className="pr-inline-wrap">
          <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} className="pr-inline-input" />
          <span className="pr-required">*</span>
        </span>

        <span>(</span>
        <input type="text" name="prevLocationType" value={formData.prevLocationType} onChange={handleChange} className="pr-inline-input pr-short" />
        <span>)</span>

        <input type="text" name="prevWardNo" placeholder="साविक वडा" value={formData.prevWardNo} onChange={handleChange} className="pr-inline-input pr-short" />

        <span>हाल वडा नं.</span>
        <input type="text" name="currentWardNo" value={formData.currentWardNo} onChange={handleChange} className="pr-inline-input pr-xshort" />

        <span>हाल</span>
        <span className="pr-inline-wrap">
          <input type="text" name="currentMunicipality" value={formData.currentMunicipality} onChange={handleChange} className="pr-inline-input pr-long" />
          <span className="pr-required">*</span>
        </span>

        <span>स्थायी/अस्थायी :</span>
        <input type="text" name="residentAddressType" value={formData.residentAddressType} onChange={handleChange} className="pr-inline-input pr-short" />

        <span>जिल्ला</span>
        <span className="pr-inline-wrap">
          <input type="text" name="residentDistrict" value={formData.residentDistrict} onChange={handleChange} className="pr-inline-input" placeholder="जिल्ला" />
          <span className="pr-required">*</span>
        </span>

        <span>नागरिकता जारी मिति :</span>
        <span className="pr-inline-wrap">
          <input type="date" name="citizenIssueDate" value={formData.citizenIssueDate} onChange={handleChange} className="pr-inline-input pr-date" />
          <span className="pr-required">*</span>
        </span>

        <span>नागरिकता नं. :</span>
        <span className="pr-inline-wrap">
          <input type="text" name="citizenNo" value={formData.citizenNo} onChange={handleChange} className="pr-inline-input" />
          <span className="pr-required">*</span>
        </span>

        <span>निवेदक :</span>
        <span className="pr-inline-wrap">
          <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="pr-inline-input pr-long" />
          <span className="pr-required">*</span>
        </span>
        <span>को राहदानी सिफारिस गरिन्छ।</span>
      </div>

      {/* ── Designation / Signature ── */}
      <div className="pr-signature-section">
        <div className="pr-signature-line">हस्ताक्षर</div>
        <div className="pr-field-inline">
          <select name="designation" value={formData.designation} onChange={handleChange} className="pr-select">
            <option value="">पद छनोट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
          </select>
          <span className="pr-required">*</span>
        </div>
      </div>

      {/* ── Applicant Details (shared component) ── */}
      <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

      {/* ── Notes ── */}
      <div className="pr-notes-group">
        <label>कैफियत / टिप्पणी</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} />
      </div>

      {/* ── Submit ── */}
      <div className="form-footer">
        <button type="submit" disabled={loading} className="save-print-btn">
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>

    </form>
  );
};

export default PassportRecommendation;