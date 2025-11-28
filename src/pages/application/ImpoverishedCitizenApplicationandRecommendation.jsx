// ImpoverishedCitizenApplicationandRecommendation.jsx
import React, { useState } from "react";
import axios from "axios";
import "./ImpoverishedCitizenApplicationandRecommendation.css";

const initialState = {
  headerTo: "श्रीमान् अध्यक्षज्यु",
  headerOffice: "वं वडा कार्यालय,",
  // Section 1
  patientName: "",
  age: "",
  gender: "पुरुष",
  permJilla: "",
  permPalika: "",
  permWarda: "",
  tempJilla: "",
  tempPalika: "",
  tempWarda: "",
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
  applicantSigDate: "२०८२/०७/१५",
  applicantSigPhone: "",
  // Recommender
  recName: "",
  recPosition: "पद छनोट गर्नुहोस्",
  recDate: "२०८२/०७/१५",
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
    // require at least one land row or allow empty — here we allow empty but ensure non-empty rows are complete
    for (let i = 0; i < lands.length; i++) {
      if ((lands[i].description && !lands[i].location) || (!lands[i].description && lands[i].location)) {
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
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      // attach landDetails as JSON string
      payload.landDetails = JSON.stringify(landDetails);

      const url = "/api/forms/impoverished-citizen-application";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
        setLandDetails(initialLand);
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
        {/* (You can keep the JSX markup you already have; below only key parts shown for brevity) */}
        <div className="top-meta-row">
          <div className="form-group-inline header-inputs">
            <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
            <input type="text" name="headerOffice" value={formData.headerOffice} onChange={handleChange} />
          </div>
        </div>

        {/* ... keep all your fieldsets and inputs here (you already provided them) ... */}
        {/* I'll paste your land table section and submit button to ensure land handling works */}

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

        {/* ... rest of fields (bank, health, signatures, applicant details) ... */}
        {/* Keep your existing input JSX — they map to the same state names used above */}

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
