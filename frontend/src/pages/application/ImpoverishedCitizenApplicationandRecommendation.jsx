// src/pages/application/ImpoverishedCitizenApplicationandRecommendation.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import "./ImpoverishedCitizenApplicationandRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// FIX: removed unused `useAuth` import
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// ─────────────────────────────────────────────────────────────────
// PrintField MUST be at MODULE SCOPE — not inside the component.
// If defined inside, React creates a new component type on every
// render → input unmounts each keystroke → 1-char typing bug.
// ─────────────────────────────────────────────────────────────────

const PrintField = ({ value, isPrint, className = "", name, onChange, type = "text", ...rest }) => {
  if (isPrint) {
    return <span className={`pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type={type}
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
  headerTo: "श्रीमान् अध्यक्षज्यु",
  headerOffice: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",

  // Section 1
  patientName: "",
  age: "",
  gender: "पुरुष",
  permJilla: MUNICIPALITY?.englishDistrict || "",
  permPalika: MUNICIPALITY?.name || "",
  permWarda: MUNICIPALITY?.wardNumber || "",
  tempJilla: MUNICIPALITY?.englishDistrict || "",
  tempPalika: MUNICIPALITY?.name || "",
  tempWarda: MUNICIPALITY?.wardNumber || "",
  ethnicity: "ब्राहमण",
  familySize: "",

  // Section 2
  incomeSource: "",
  monthlyIncome: "",

  // Section 4 (bank)
  bankName: "",
  bankBranch: "",
  accountNo: "",

  // Section 5
  healthStatus: "रुहु रोग",

  // Section 7
  recommenderRelation: "",

  // Applicant Signature
  applicantSigName: "",
  applicantSigAddress: "",
  applicantSigDate: "",
  applicantSigPhone: "",

  // Recommender
  recName: "",
  recPosition: "पद छनोट गर्नुहोस्",
  recDate: "",
  recOfficeStamp: "",

  // Footer applicant details
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const initialLand = [{ id: 1, description: "", location: "" }];

const ImpoverishedCitizenApplicationandRecommendation = () => {
  const [formData, setFormData]       = useState(initialState);
  const [landDetails, setLandDetails] = useState(initialLand);
  const [submitting, setSubmitting]   = useState(false);
  // FIX: isPrint drives print-mode rendering so window.print()
  // always sees real <span> values — not blank transparent inputs
  const [isPrint, setIsPrint]         = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleLandChange = (index, e) => {
    const { name, value } = e.target;
    setLandDetails((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addLandRow = () => {
    setLandDetails((prev) => [
      ...prev,
      { id: prev.length + 1, description: "", location: "" },
    ]);
  };

  const validate = (fd, lands) => {
    if (!fd.patientName?.trim()) return "बिरामीको नाम आवश्यक छ";
    if (!fd.permPalika?.trim())  return "स्थायी पालिका आवश्यक छ";
    if (!fd.tempPalika?.trim())  return "अस्थायी पालिका आवश्यक छ";
    if (!fd.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";

    const phoneRegex = /^[0-9+\-\s]{6,20}$/;
    if (fd.applicantSigPhone && !phoneRegex.test(String(fd.applicantSigPhone))) {
      return "निवेदकको फोन नम्बर अमान्य छ";
    }
    if (fd.applicantPhone && !phoneRegex.test(String(fd.applicantPhone))) {
      return "सम्पर्क फोन नम्बर अमान्य छ";
    }

    for (let i = 0; i < lands.length; i++) {
      const desc = lands[i].description?.trim();
      const loc  = lands[i].location?.trim();
      if ((desc && !loc) || (!desc && loc)) {
        return `जग्गा पङ्क्ति ${i + 1} मा क्षेत्रफल र स्थान दुवै भर्नुहोस्`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData, landDetails);
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
      payload.landDetails = JSON.stringify(landDetails);

      const res = await axios.post("/api/forms/impoverished-citizen-application", payload);

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
        error.response?.data?.message || error.message || "Submission failed";
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
      // Reset after print dialog closes
      setFormData(initialState);
      setLandDetails(initialLand);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  return (
    <div className="impoverished-container">
      <form onSubmit={handleSubmit}>

        {/* ── Municipal Header ── */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* ── Header meta (addressee) ── */}
        <div className="top-meta-row">
          <div className="form-group-inline header-inputs">
            {/* FIX: was plain <input> with transparent bg → PrintField */}
            <PrintField
              name="headerTo"
              value={formData.headerTo}
              onChange={handleChange}
              isPrint={isPrint}
              className="header-field"
            />
            <PrintField
              name="headerOffice"
              value={formData.headerOffice}
              onChange={handleChange}
              isPrint={isPrint}
              className="header-field"
            />
          </div>
        </div>

        {/* ── Section 1: बिरामीको विवरण ── */}
        <fieldset className="form-section">
          <legend>१. बिरामीको विवरण</legend>
          <div className="form-grid">

            <div className="form-group">
              <label>नाम: <span className="req">*</span></label>
              <PrintField
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                isPrint={isPrint}
                required
              />
            </div>

            <div className="form-group">
              <label>उमेर:</label>
              <PrintField
                name="age"
                value={formData.age}
                onChange={handleChange}
                isPrint={isPrint}
                className="short"
              />
            </div>

            <div className="form-group">
              <label>लिङ्ग:</label>
              <PrintSelect
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isPrint={isPrint}
              >
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </PrintSelect>
            </div>

            <div className="form-group">
              <label>स्थायी जिल्ला:</label>
              <PrintField
                name="permJilla"
                value={formData.permJilla}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>स्थायी पालिका: <span className="req">*</span></label>
              <PrintField
                name="permPalika"
                value={formData.permPalika}
                onChange={handleChange}
                isPrint={isPrint}
                required
              />
            </div>
            <div className="form-group">
              <label>स्थायी वडा:</label>
              <PrintField
                name="permWarda"
                value={formData.permWarda}
                onChange={handleChange}
                isPrint={isPrint}
                className="short"
              />
            </div>

            <div className="form-group">
              <label>अस्थायी जिल्ला:</label>
              <PrintField
                name="tempJilla"
                value={formData.tempJilla}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>अस्थायी पालिका: <span className="req">*</span></label>
              <PrintField
                name="tempPalika"
                value={formData.tempPalika}
                onChange={handleChange}
                isPrint={isPrint}
                required
              />
            </div>
            <div className="form-group">
              <label>अस्थायी वडा:</label>
              <PrintField
                name="tempWarda"
                value={formData.tempWarda}
                onChange={handleChange}
                isPrint={isPrint}
                className="short"
              />
            </div>

            <div className="form-group">
              <label>जात:</label>
              <PrintField
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>परिवार संख्या:</label>
              <PrintField
                name="familySize"
                value={formData.familySize}
                onChange={handleChange}
                isPrint={isPrint}
                className="short"
              />
            </div>

          </div>
        </fieldset>

        {/* ── Section 2: आय स्रोत ── */}
        <fieldset className="form-section">
          <legend>२. आय स्रोत र मासिक आम्दानी</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>आय स्रोत:</label>
              <PrintField
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>मासिक आम्दानी:</label>
              <PrintField
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                isPrint={isPrint}
                className="short"
              />
            </div>
          </div>
        </fieldset>

        {/* ── Section 3: Land table ── */}
        <fieldset className="form-section">
          <legend>३. नगद जग्गा (अचल र चलन सम्पत्ति):</legend>
          <div className="table-wrapper">
            <table className="land-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>क्षेत्रफल</th>
                  <th>भूमिस स्थान</th>
                  {!isPrint && <th></th>}
                </tr>
              </thead>
              <tbody>
                {landDetails.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {isPrint
                        ? <span className="pf-value">{item.description}</span>
                        : <input
                            type="text"
                            name="description"
                            value={item.description}
                            onChange={(e) => handleLandChange(index, e)}
                          />
                      }
                    </td>
                    <td>
                      {isPrint
                        ? <span className="pf-value">{item.location}</span>
                        : <input
                            type="text"
                            name="location"
                            value={item.location}
                            onChange={(e) => handleLandChange(index, e)}
                          />
                      }
                    </td>
                    {!isPrint && (
                      <td className="action-cell">
                        {index === landDetails.length - 1 && (
                          <button type="button" onClick={addLandRow} className="add-btn">
                            +
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>

        {/* ── Section 4: Bank ── */}
        <fieldset className="form-section">
          <legend>४. बैंक विवरण</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>बैंकको नाम:</label>
              <PrintField
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>शाखा:</label>
              <PrintField
                name="bankBranch"
                value={formData.bankBranch}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>खाता नं.:</label>
              <PrintField
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
          </div>
        </fieldset>

        {/* ── Section 5: Health ── */}
        <fieldset className="form-section">
          <legend>५. स्वास्थ्य अवस्था</legend>
          <div className="form-group">
            <label>रोगको किसिम:</label>
            <PrintField
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              isPrint={isPrint}
            />
          </div>
        </fieldset>

        {/* ── Section 7: Recommender relation ── */}
        <fieldset className="form-section">
          <legend>७. सिफारिसकर्ताको विवरण</legend>
          <div className="form-group">
            <label>सम्बन्ध:</label>
            <PrintField
              name="recommenderRelation"
              value={formData.recommenderRelation}
              onChange={handleChange}
              isPrint={isPrint}
            />
          </div>
        </fieldset>

        {/* ── Applicant Signature ── */}
        <fieldset className="form-section">
          <legend>निवेदक हस्ताक्षर</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>नाम:</label>
              <PrintField
                name="applicantSigName"
                value={formData.applicantSigName}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>ठेगाना:</label>
              <PrintField
                name="applicantSigAddress"
                value={formData.applicantSigAddress}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>मिति:</label>
              <PrintField
                name="applicantSigDate"
                value={formData.applicantSigDate}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>फोन:</label>
              <PrintField
                name="applicantSigPhone"
                value={formData.applicantSigPhone}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
          </div>
        </fieldset>

        {/* ── Recommender ── */}
        <fieldset className="form-section">
          <legend>सिफारिस गर्नेको विवरण</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>नाम:</label>
              <PrintField
                name="recName"
                value={formData.recName}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>पद:</label>
              <PrintSelect
                name="recPosition"
                value={formData.recPosition}
                onChange={handleChange}
                isPrint={isPrint}
              >
                <option>पद छनोट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>वडा सदस्य</option>
              </PrintSelect>
            </div>
            <div className="form-group">
              <label>मिति:</label>
              <PrintField
                name="recDate"
                value={formData.recDate}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
            <div className="form-group">
              <label>कार्यालय छाप:</label>
              <PrintField
                name="recOfficeStamp"
                value={formData.recOfficeStamp}
                onChange={handleChange}
                isPrint={isPrint}
              />
            </div>
          </div>
        </fieldset>

        {/* ── Applicant Details (footer box) ── */}
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

export default ImpoverishedCitizenApplicationandRecommendation;