// src/pages/application/ImpoverishedCitizenApplicationandRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./ImpoverishedCitizenApplicationandRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

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
  const [formData, setFormData] = useState(initialState);
  const [landDetails, setLandDetails] = useState(initialLand);
  const [submitting, setSubmitting] = useState(false);

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
    setLandDetails((prev) => [...prev, { id: prev.length + 1, description: "", location: "" }]);
  };

  const validate = (fd, lands) => {
    if (!fd.patientName?.trim()) return "patientName is required";
    if (!fd.permPalika?.trim()) return "permPalika is required";
    if (!fd.tempPalika?.trim()) return "tempPalika is required";
    if (!fd.applicantName?.trim()) return "applicantName is required";

    // phone checks (basic)
    const phoneRegex = /^[0-9+\-\s]{6,20}$/;
    if (fd.applicantSigPhone && !phoneRegex.test(String(fd.applicantSigPhone))) {
      return "applicantSigPhone (invalid)";
    }
    if (fd.applicantPhone && !phoneRegex.test(String(fd.applicantPhone))) {
      return "applicantPhone (invalid)";
    }

    // require at least one complete land row OR allow empty rows but ensure no half-filled rows
    for (let i = 0; i < lands.length; i++) {
      const desc = lands[i].description?.trim();
      const loc = lands[i].location?.trim();
      if ((desc && !loc) || (!desc && loc)) {
        return `complete both description and location for land row ${i + 1}`;
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
      // build payload and normalize empty strings -> null
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      // attach landDetails as JSON string (controller expects table_rows / stringified)
      payload.landDetails = JSON.stringify(landDetails);

      const url = "/api/forms/impoverished-citizen-application";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        setLandDetails(initialLand);
        setTimeout(() => window.print(), 150);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="impoverished-container">
      <form onSubmit={handleSubmit}>
        {/* reusable Nepali header */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* keep header inputs for manual override if needed */}
        <div className="top-meta-row">
          <div className="form-group-inline header-inputs">
            <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
            <input type="text" name="headerOffice" value={formData.headerOffice} onChange={handleChange} />
          </div>
        </div>

        {/* --------------------------- */}
        {/* paste your full form JSX here (kept minimal below for brevity) */}
        {/* --------------------------- */}

        {/* Section 1 */}
        <fieldset className="form-section">
          <legend>१. बिरामीको विवरण</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>नाम:</label>
              <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>उमेर:</label>
              <input type="text" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>लिङ्ग:</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </select>
            </div>

            <div className="form-group">
              <label>स्थायी जिल्ला:</label>
              <input type="text" name="permJilla" value={formData.permJilla} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>स्थायी पालिका:</label>
              <input type="text" name="permPalika" value={formData.permPalika} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>स्थायी वडा:</label>
              <input type="text" name="permWarda" value={formData.permWarda} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>अस्थायी जिल्ला:</label>
              <input type="text" name="tempJilla" value={formData.tempJilla} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>अस्थायी पालिका:</label>
              <input type="text" name="tempPalika" value={formData.tempPalika} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>अस्थायी वडा:</label>
              <input type="text" name="tempWarda" value={formData.tempWarda} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>जात:</label>
              <input type="text" name="ethnicity" value={formData.ethnicity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>परिवार संख्या:</label>
              <input type="text" name="familySize" value={formData.familySize} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Land table */}
        <fieldset className="form-section">
          <legend>३. नगद जग्गा (अचल र चलन सम्पत्ति):</legend>
          <div className="table-wrapper">
            <table className="land-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>क्षेत्रफल</th>
                  <th>भूमिस स्थान</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {landDetails.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={item.description}
                        onChange={(e) => handleLandChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="location"
                        value={item.location}
                        onChange={(e) => handleLandChange(index, e)}
                      />
                    </td>
                    <td className="action-cell">
                      {index === landDetails.length - 1 && (
                        <button type="button" onClick={addLandRow} className="add-btn">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>

        {/* Bank, health, recommender, signatures (keep your original inputs if you prefer) */}
        <fieldset className="form-section">
          <legend>बैंक विवरण</legend>
          <div className="form-group">
            <label>बैंकको नाम:</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>शाखा:</label>
            <input type="text" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>खाता नं.:</label>
            <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>निवेदक हस्ताक्षर</legend>
          <div className="form-group-column">
            <label>नाम:</label>
            <input type="text" name="applicantSigName" value={formData.applicantSigName} onChange={handleChange} />
          </div>
          <div className="form-group-column">
            <label>ठेगाना:</label>
            <input type="text" name="applicantSigAddress" value={formData.applicantSigAddress} onChange={handleChange} />
          </div>
          <div className="form-group-column">
            <label>मिति:</label>
            <input type="text" name="applicantSigDate" value={formData.applicantSigDate} onChange={handleChange} />
          </div>
          <div className="form-group-column">
            <label>फोन:</label>
            <input type="text" name="applicantSigPhone" value={formData.applicantSigPhone} onChange={handleChange} />
          </div>
        </fieldset>

         {/* Applicants details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>
                निवेदकको नाम<span className="required">*</span>
              </label>
              <input
                name="applicantName"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                निवेदकको ठेगाना<span className="required">*</span>
              </label>
              <input
                name="applicantAddress"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                निवेदकको नागरिकता नं.<span className="required">*</span>
              </label>
              <input
                name="applicantNagarikta"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantNagarikta}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                निवेदकको फोन नं.<span className="required">*</span>
              </label>
              <input
                name="applicantPhone"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImpoverishedCitizenApplicationandRecommendation;
