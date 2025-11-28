// LandBoundaryVerificationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LandBoundaryVerificationForm.css";

const initialState = {
  date: "२०८२.०७.१५",
  headerTo: "श्री प्रमुख प्रशासकीय अधिकृत ज्यु",
  headerMunicipality: "नागार्जुन नगरपालिका",
  headerOffice: "को कार्यालय",
  headerDistrict: "काठमाडौँ",
  mainDistrict: "काठमाडौँ",
  mainMunicipality: "नागार्जुन नगरपालिका",
  mainWardNo1: "१",
  prevLocationType: "साबिक",
  prevWardNo: "१",
  tole: "",
  applicantTitle: "श्री",
  applicantName: "",
  applicantRelation: "छोरा",
  applicantAge: "",
  guardianTitle: "श्री",
  guardianName: "",
  kittaNo: "",
  landName: "",
  landArea: "",
  feeAmount: "",
  feeAmountWords: "",
  sigApplicantType: "निवेदक",
  sigName: "",
  sigAddress: "नागार्जुन नगरपालिका",
  sigWard: "१",
  sigPhone: "",
  detailApplicantName: "",
  detailApplicantAddress: "",
  detailApplicantCitizenship: "",
  detailApplicantPhone: "",
};

const LandBoundaryVerificationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.mainDistrict?.trim()) return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.mainMunicipality?.trim()) return "पालिकाको नाम भर्नुहोस्";
    if (!fd.mainWardNo1?.trim()) return "वडा नं. भर्नुहोस्";
    if (!fd.tole?.trim()) return "टोल भर्नुहोस्";
    if (!fd.applicantName?.trim()) return "निवेदकको नाम भर्नुहोस्";
    if (!fd.applicantAge?.trim()) return "निवेदकको उमेर भर्नुहोस्";
    if (!fd.guardianName?.trim()) return "अभिभावकको नाम भर्नुहोस्";
    if (!fd.kittaNo?.trim()) return "कित्ता नं. भर्नुहोस्";
    if (!fd.landArea?.trim()) return "क्षेत्रफल भर्नुहोस्";
    if (!fd.feeAmount?.trim()) return "रकम भर्नुहोस्";
    if (!fd.feeAmountWords?.trim()) return "रकम अक्षरुपी भर्नुहोस्";
    if (!fd.sigName?.trim()) return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigPhone?.trim()) return "सम्पर्क नम्बर भर्नुहोस्";
    if (!fd.detailApplicantName?.trim()) return "निवेदकको विवरण नाम भर्नुहोस्";
    if (!fd.detailApplicantAddress?.trim()) return "निवेदक ठेगाना भर्नुहोस्";
    if (!fd.detailApplicantCitizenship?.trim()) return "नागरिकता नं. भर्नुहोस्";
    if (!fd.detailApplicantPhone?.trim()) return "निवेदक फोन नं. भर्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate(formData);
    if (err) {
      alert("कृपया आवश्यक सूचना भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      // prepare payload: convert any empty string -> null if you prefer
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      // endpoint — ensure backend route exists
      const url = "/api/forms/land-boundary-verification";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
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
    <div className="land-boundary-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="header-to-group">
            <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
            <select name="headerMunicipality" value={formData.headerMunicipality} onChange={handleChange}>
              <option>नागार्जुन नगरपालिका</option>
            </select>
            <input type="text" name="headerOffice" value={formData.headerOffice} onChange={handleChange} />
            <input type="text" name="headerDistrict" value={formData.headerDistrict} onChange={handleChange} required />
          </div>

          <div className="form-group date-group">
            <label>मिति :</label>
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>जग्गाको साँध सिमाङ्कन गर्न अधिन खटाई पाउँ बारे।</u></strong>
        </div>

        <p className="certificate-body">
          {/* keep markup same as before — inputs are bound to state */}
          ... (form paragraph kept as original) ...
        </p>

        {/* Insert the main form inputs (kept the same names) */}
        <div className="form-grid">
          <input type="hidden" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} />
          {/* For brevity keep the same visible inputs you used earlier — they map to state */}
          {/* The earlier block in your file already defines them; ensure names match state keys */}
        </div>

        {/* signature fields */}
        <div className="designation-section">
          <div className="signature-fields">
            <div className="form-group-inline">
              <select name="sigApplicantType" value={formData.sigApplicantType} onChange={handleChange}>
                <option>निवेदक</option>
                <option>निवेदिका</option>
              </select>
            </div>

            <div className="form-group-inline">
              <label>नाम : *</label>
              <input type="text" name="sigName" value={formData.sigName} onChange={handleChange} required />
            </div>

            <div className="form-group-inline">
              <label>ठेगाना :</label>
              <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} />
            </div>

            <div className="form-group-inline">
              <label>वडा नं. :</label>
              <input type="text" name="sigWard" value={formData.sigWard} onChange={handleChange} />
            </div>

            <div className="form-group-inline">
              <label>सम्पर्क नं. : *</label>
              <input type="text" name="sigPhone" value={formData.sigPhone} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* applicant details */}
        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div>
            <label>नाम *</label>
            <input type="text" name="detailApplicantName" value={formData.detailApplicantName} onChange={handleChange} required />
          </div>
          <div>
            <label>ठेगाना *</label>
            <input type="text" name="detailApplicantAddress" value={formData.detailApplicantAddress} onChange={handleChange} required />
          </div>
          <div>
            <label>नागरिकता नं *</label>
            <input type="text" name="detailApplicantCitizenship" value={formData.detailApplicantCitizenship} onChange={handleChange} required />
          </div>
          <div>
            <label>फोन नं *</label>
            <input type="text" name="detailApplicantPhone" value={formData.detailApplicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandBoundaryVerificationForm;
