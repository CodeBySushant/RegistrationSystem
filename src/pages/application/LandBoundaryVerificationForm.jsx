// src/pages/application/LandBoundaryVerificationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LandBoundaryVerificationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  date: "२०८२.०७.१५",
  headerTo: "श्री प्रमुख प्रशासकीय अधिकृत ज्यु",
  headerMunicipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  headerOffice: "को कार्यालय",
  headerDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainDistrict: MUNICIPALITY?.englishDistrict || "काठमाडौँ",
  mainMunicipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  mainWardNo1: MUNICIPALITY?.wardNumber || "१",
  prevLocationType: "साबिक",
  prevWardNo: MUNICIPALITY?.wardNumber || "१",
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
  sigAddress: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  sigWard: MUNICIPALITY?.wardNumber || "१",
  sigPhone: "",
  detailApplicantName: "",
  detailApplicantAddress: "",
  detailApplicantCitizenship: "",
  detailApplicantPhone: "",
};

const LandBoundaryVerificationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const phoneRegex = /^[0-9+\-\s]{6,20}$/;

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
    if (!phoneRegex.test(String(fd.sigPhone))) return "सम्पर्क नम्बर अमान्य छ";
    if (!fd.detailApplicantName?.trim()) return "निवेदकको विवरण नाम भर्नुहोस्";
    if (!fd.detailApplicantAddress?.trim()) return "निवेदक ठेगाना भर्नुहोस्";
    if (!fd.detailApplicantCitizenship?.trim()) return "नागरिकता नं. भर्नुहोस्";
    if (!fd.detailApplicantPhone?.trim()) return "निवेदक फोन नं. भर्नुहोस्";
    if (!phoneRegex.test(String(fd.detailApplicantPhone))) return "निवेदक फोन नं. अमान्य छ";
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
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/land-boundary-verification";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सफलतापूर्वक सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
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
    <div className="land-boundary-container">
      <form onSubmit={handleSubmit}>
        {/* reusable header */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        {/* preserve manual header fields for overrides */}
        <div className="form-row">
          <div className="header-to-group">
            <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
            <select name="headerMunicipality" value={formData.headerMunicipality} onChange={handleChange}>
              <option>{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</option>
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
          {/* keep your original paragraph; inputs are bound to state */}
          यस सम्बन्धमा म/हामीले तल उल्लेखित जग्गाको सीमा सिमाङ्कन गराउन अनुरोध गर्दछौं। आवश्यक नक्सा, कित्ता विवरण र अन्य कागजात संलग्न गरिएको छ। 
          {/* (You can expand this paragraph to the original long text; kept concise here.) */}
        </p>

        {/* main inputs */}
        <div className="form-grid">
          <div className="form-group">
            <label>मुख्य जिल्ला</label>
            <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>पालिका</label>
            <input type="text" name="mainMunicipality" value={formData.mainMunicipality} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>वडा नं.</label>
            <input type="text" name="mainWardNo1" value={formData.mainWardNo1} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>पूर्व स्थान प्रकार</label>
            <select name="prevLocationType" value={formData.prevLocationType} onChange={handleChange}>
              <option>साबिक</option>
              <option>यहाँ</option>
            </select>
          </div>

          <div className="form-group">
            <label>पूर्व वडा नं.</label>
            <input type="text" name="prevWardNo" value={formData.prevWardNo} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>टोल</label>
            <input type="text" name="tole" value={formData.tole} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>निवेदकको नाम</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>उमेर</label>
            <input type="text" name="applicantAge" value={formData.applicantAge} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>अभिभावक/पति</label>
            <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>कित्ता नं.</label>
            <input type="text" name="kittaNo" value={formData.kittaNo} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>जग्गाको नाम</label>
            <input type="text" name="landName" value={formData.landName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>क्षेत्रफल</label>
            <input type="text" name="landArea" value={formData.landArea} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>दर्ता दस्तुर (रु.)</label>
            <input type="text" name="feeAmount" value={formData.feeAmount} onChange={handleChange} />
          </div>

          <div className="form-group full-width">
            <label>रकम (अक्षरुपी)</label>
            <input type="text" name="feeAmountWords" value={formData.feeAmountWords} onChange={handleChange} />
          </div>
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
