import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   PrintField & PrintSelect — MODULE SCOPE ONLY.
   Never define inside the component — React
   creates a new type each render → input
   unmounts every keystroke → 1-char limit.
───────────────────────────────────────────── */
const PrintField = ({ value, isPrint, className = "", name, onChange, type = "text", ...rest }) => {
  if (isPrint) {
    return <span className={`icar-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`icar-pf-input ${className}`}
      {...rest}
    />
  );
};

const PrintSelect = ({ value, isPrint, className = "", name, onChange, children }) => {
  if (isPrint) {
    return <span className={`icar-pf-value ${className}`}>{value || ""}</span>;
  }
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`icar-pf-select ${className}`}
    >
      {children}
    </select>
  );
};

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  headerTo:            "श्रीमान् अध्यक्षज्यु",
  headerOffice:        MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  patientName:         "",
  age:                 "",
  gender:              "पुरुष",
  permJilla:           MUNICIPALITY?.englishDistrict || "",
  permPalika:          MUNICIPALITY?.name            || "",
  permWarda:           MUNICIPALITY?.wardNumber      || "",
  tempJilla:           MUNICIPALITY?.englishDistrict || "",
  tempPalika:          MUNICIPALITY?.name            || "",
  tempWarda:           MUNICIPALITY?.wardNumber      || "",
  ethnicity:           "ब्राहमण",
  familySize:          "",
  incomeSource:        "",
  monthlyIncome:       "",
  bankName:            "",
  bankBranch:          "",
  accountNo:           "",
  healthStatus:        "रुहु रोग",
  recommenderRelation: "",
  applicantSigName:    "",
  applicantSigAddress: "",
  applicantSigDate:    "",
  applicantSigPhone:   "",
  recName:             "",
  recPosition:         "पद छनोट गर्नुहोस्",
  recDate:             "",
  recOfficeStamp:      "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship:"",
  applicantPhone:      "",
};

const INITIAL_LAND = [{ id: 1, description: "", location: "" }];

/* ─────────────────────────────────────────────
   STYLES  (prefix: icar-)
───────────────────────────────────────────── */
const styles = `
.icar-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
}

.icar-header-row { margin-bottom: 16px; }

.icar-top-meta-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.icar-header-inputs {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

/* PrintField — screen (input) */
.icar-pf-input {
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
.icar-pf-input:focus {
  border-bottom-color: #3b7dd8;
  background-color: #f0f7ff;
}
.icar-pf-input.short        { width: 70px; }
.icar-pf-input.long         { width: 220px; }
.icar-pf-input.header-field {
  font-size: 16px;
  font-weight: bold;
  width: 240px;
  border-bottom: 1px dotted #000;
}

/* PrintField — print mode (span) */
.icar-pf-value {
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
.icar-pf-value.short        { min-width: 40px; }
.icar-pf-value.long         { min-width: 160px; }
.icar-pf-value.header-field {
  font-size: 16px;
  font-weight: bold;
  min-width: 200px;
}

/* PrintSelect — screen */
.icar-pf-select {
  display: inline-block;
  vertical-align: baseline;
  padding: 4px 6px;
  font-family: inherit;
  font-size: 14px;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

/* Form sections */
.icar-form-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.icar-form-section legend {
  font-weight: bold;
  font-size: 16px;
  padding: 0 10px;
}

.icar-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.icar-form-group {
  display: flex;
  flex-direction: column;
}
.icar-form-group label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.icar-req { color: red; font-weight: bold; }

/* Land table */
.icar-table-wrapper {
  width: 100%;
  overflow-x: auto;
  margin: 10px 0;
}
.icar-land-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}
.icar-land-table th,
.icar-land-table td {
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
  vertical-align: middle;
}
.icar-land-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}
.icar-land-table input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 6px;
  font-family: inherit;
}
.icar-action-cell { width: 50px; text-align: center; }
.icar-add-btn {
  width: 30px;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.icar-add-btn:hover { background-color: #0056b3; }

/* Submit */
.icar-submit-area {
  clear: both;
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}
.icar-submit-btn {
  background-color: #343a40;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
}
.icar-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.icar-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }

  .icar-container,
  .icar-container * { visibility: visible; }

  .icar-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
    font-size: 14px;
    line-height: 1.6;
  }

  .icar-submit-area { display: none !important; }
  .icar-action-cell { display: none !important; }

  .icar-pf-value {
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

  .icar-form-section {
    border: 1px solid #aaa !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .icar-container { width: 100%; padding: 15px; }
  .icar-form-grid { grid-template-columns: 1fr; }
  .icar-pf-input { width: 110px; }
  .icar-pf-input.header-field { width: 100%; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ImpoverishedCitizenApplicationandRecommendation = () => {
  const [formData, setFormData]       = useState(INITIAL_STATE);
  const [landDetails, setLandDetails] = useState(INITIAL_LAND);
  const [submitting, setSubmitting]   = useState(false);
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
    if (!fd.patientName?.trim())   return "बिरामीको नाम आवश्यक छ";
    if (!fd.permPalika?.trim())    return "स्थायी पालिका आवश्यक छ";
    if (!fd.tempPalika?.trim())    return "अस्थायी पालिका आवश्यक छ";
    if (!fd.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";

    const phoneRegex = /^[0-9+\-\s]{6,20}$/;
    if (fd.applicantSigPhone && !phoneRegex.test(String(fd.applicantSigPhone)))
      return "निवेदकको फोन नम्बर अमान्य छ";
    if (fd.applicantPhone && !phoneRegex.test(String(fd.applicantPhone)))
      return "सम्पर्क फोन नम्बर अमान्य छ";

    for (let i = 0; i < lands.length; i++) {
      const desc = lands[i].description?.trim();
      const loc  = lands[i].location?.trim();
      if ((desc && !loc) || (!desc && loc))
        return `जग्गा पङ्क्ति ${i + 1} मा क्षेत्रफल र स्थान दुवै भर्नुहोस्`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData, landDetails);
    if (err) { alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err); return; }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });
      payload.landDetails = JSON.stringify(landDetails);

      const res = await axios.post(
        "/api/forms/impoverished-citizen-application",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सेव भयो। ID: " + (res.data?.id ?? ""));
        setIsPrint(true);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isPrint) return;
    const id = requestAnimationFrame(() => {
      window.print();
      setFormData(INITIAL_STATE);
      setLandDetails(INITIAL_LAND);
      setIsPrint(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isPrint]);

  return (
    <>
      <style>{styles}</style>

      <div className="icar-container">
        <form onSubmit={handleSubmit}>

          {/* ── Municipality header ── */}
          <div className="icar-header-row">
            <MunicipalityHeader showLogo />
          </div>

          {/* ── Addressee ── */}
          <div className="icar-top-meta-row">
            <div className="icar-header-inputs">
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
          <fieldset className="icar-form-section">
            <legend>१. बिरामीको विवरण</legend>
            <div className="icar-form-grid">

              <div className="icar-form-group">
                <label>नाम: <span className="icar-req">*</span></label>
                <PrintField
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  isPrint={isPrint}
                  required
                />
              </div>

              <div className="icar-form-group">
                <label>उमेर:</label>
                <PrintField
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  isPrint={isPrint}
                  className="short"
                />
              </div>

              <div className="icar-form-group">
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

              <div className="icar-form-group">
                <label>स्थायी जिल्ला:</label>
                <PrintField name="permJilla" value={formData.permJilla} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>स्थायी पालिका: <span className="icar-req">*</span></label>
                <PrintField name="permPalika" value={formData.permPalika} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>स्थायी वडा:</label>
                <PrintField name="permWarda" value={formData.permWarda} onChange={handleChange} isPrint={isPrint} className="short" />
              </div>

              <div className="icar-form-group">
                <label>अस्थायी जिल्ला:</label>
                <PrintField name="tempJilla" value={formData.tempJilla} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>अस्थायी पालिका: <span className="icar-req">*</span></label>
                <PrintField name="tempPalika" value={formData.tempPalika} onChange={handleChange} isPrint={isPrint} required />
              </div>
              <div className="icar-form-group">
                <label>अस्थायी वडा:</label>
                <PrintField name="tempWarda" value={formData.tempWarda} onChange={handleChange} isPrint={isPrint} className="short" />
              </div>

              <div className="icar-form-group">
                <label>जात:</label>
                <PrintField name="ethnicity" value={formData.ethnicity} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>परिवार संख्या:</label>
                <PrintField name="familySize" value={formData.familySize} onChange={handleChange} isPrint={isPrint} className="short" />
              </div>

            </div>
          </fieldset>

          {/* ── Section 2: आय स्रोत ── */}
          <fieldset className="icar-form-section">
            <legend>२. आय स्रोत र मासिक आम्दानी</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>आय स्रोत:</label>
                <PrintField name="incomeSource" value={formData.incomeSource} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>मासिक आम्दानी:</label>
                <PrintField name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} isPrint={isPrint} className="short" />
              </div>
            </div>
          </fieldset>

          {/* ── Section 3: Land table ── */}
          <fieldset className="icar-form-section">
            <legend>३. नगद जग्गा (अचल र चलन सम्पत्ति):</legend>
            <div className="icar-table-wrapper">
              <table className="icar-land-table">
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
                          ? <span className="icar-pf-value">{item.description}</span>
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
                          ? <span className="icar-pf-value">{item.location}</span>
                          : <input
                              type="text"
                              name="location"
                              value={item.location}
                              onChange={(e) => handleLandChange(index, e)}
                            />
                        }
                      </td>
                      {!isPrint && (
                        <td className="icar-action-cell">
                          {index === landDetails.length - 1 && (
                            <button
                              type="button"
                              onClick={addLandRow}
                              className="icar-add-btn"
                            >
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
          <fieldset className="icar-form-section">
            <legend>४. बैंक विवरण</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>बैंकको नाम:</label>
                <PrintField name="bankName" value={formData.bankName} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>शाखा:</label>
                <PrintField name="bankBranch" value={formData.bankBranch} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>खाता नं.:</label>
                <PrintField name="accountNo" value={formData.accountNo} onChange={handleChange} isPrint={isPrint} />
              </div>
            </div>
          </fieldset>

          {/* ── Section 5: Health ── */}
          <fieldset className="icar-form-section">
            <legend>५. स्वास्थ्य अवस्था</legend>
            <div className="icar-form-group">
              <label>रोगको किसिम:</label>
              <PrintField name="healthStatus" value={formData.healthStatus} onChange={handleChange} isPrint={isPrint} />
            </div>
          </fieldset>

          {/* ── Section 7: Recommender relation ── */}
          <fieldset className="icar-form-section">
            <legend>७. सिफारिसकर्ताको विवरण</legend>
            <div className="icar-form-group">
              <label>सम्बन्ध:</label>
              <PrintField name="recommenderRelation" value={formData.recommenderRelation} onChange={handleChange} isPrint={isPrint} />
            </div>
          </fieldset>

          {/* ── Applicant Signature ── */}
          <fieldset className="icar-form-section">
            <legend>निवेदक हस्ताक्षर</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>नाम:</label>
                <PrintField name="applicantSigName" value={formData.applicantSigName} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>ठेगाना:</label>
                <PrintField name="applicantSigAddress" value={formData.applicantSigAddress} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>मिति:</label>
                <PrintField name="applicantSigDate" value={formData.applicantSigDate} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>फोन:</label>
                <PrintField name="applicantSigPhone" value={formData.applicantSigPhone} onChange={handleChange} isPrint={isPrint} />
              </div>
            </div>
          </fieldset>

          {/* ── Recommender ── */}
          <fieldset className="icar-form-section">
            <legend>सिफारिस गर्नेको विवरण</legend>
            <div className="icar-form-grid">
              <div className="icar-form-group">
                <label>नाम:</label>
                <PrintField name="recName" value={formData.recName} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>पद:</label>
                <PrintSelect name="recPosition" value={formData.recPosition} onChange={handleChange} isPrint={isPrint}>
                  <option>पद छनोट गर्नुहोस्</option>
                  <option>वडा अध्यक्ष</option>
                  <option>वडा सचिव</option>
                  <option>वडा सदस्य</option>
                </PrintSelect>
              </div>
              <div className="icar-form-group">
                <label>मिति:</label>
                <PrintField name="recDate" value={formData.recDate} onChange={handleChange} isPrint={isPrint} />
              </div>
              <div className="icar-form-group">
                <label>कार्यालय छाप:</label>
                <PrintField name="recOfficeStamp" value={formData.recOfficeStamp} onChange={handleChange} isPrint={isPrint} />
              </div>
            </div>
          </fieldset>

          {/* ── Applicant details footer ── */}
          <ApplicantDetailsNp
            formData={formData}
            handleChange={handleChange}
          />

          {/* ── Submit (hidden in print mode) ── */}
          {!isPrint && (
            <div className="icar-submit-area">
              <button
                type="submit"
                className="icar-submit-btn"
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

export default ImpoverishedCitizenApplicationandRecommendation;