// PropertyOwnerCertificateHouseMaintainRecommendation.jsx
import React, { useState } from "react";
import "./PropertyOwnerCertificateHouseMaintainRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),

  applicant_type: "मेरो", // "मेरो" | "हाम्रो"
  previous_place_text: "",
  previous_place_type: "",
  previous_ward_no: "",
  plot_number: "",
  area: "",

  // signer / official
  signer_name: "",
  signer_designation: "",

  // applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  notes: "",
};

export default function PropertyOwnerCertificateHouseMaintainRecommendation() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/property-owner-certificate-house-maintain-recommendation", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState); // reset form on success
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/property-owner-certificate-house-maintain-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ print first
        setForm(initialState); // ✅ reset AFTER print
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="certificate-house-maintain-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस
          </span>
        </div>

        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार্জुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">{form.letter_no}</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="dotted-input small-input"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <span className="bold-text">{form.date_nep}</span>
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <select
              name="addressee_office"
              onChange={(e) => {}}
              className="bold-select"
              disabled
            >
              <option>जिल्ला प्रशासन कार्यालय</option>
              <option>मालपोत कार्यालय</option>
              <option>नापी कार्यालय</option>
            </select>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_place"
              className="line-input medium-input"
              placeholder="ठेगाना (उदा. काठमाडौँ)"
            />
          </div>
        </div>

        <div className="subject-section">
          <p>
            विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा
            <select
              name="applicant_type"
              value={form.applicant_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option>मेरो</option>
              <option>हाम्रो</option>
            </select>
            नाममा एकलौटी दर्ता श्रेस्ता भएको{" "}
            <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं.{" "}
            <span className="bg-gray-text">१</span> (साविकको ठेगाना
            <input
              name="previous_place_text"
              value={form.previous_place_text}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />
            <select
              name="previous_place_type"
              value={form.previous_place_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />
            ) कि.नं.
            <input
              name="plot_number"
              value={form.plot_number}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />
            को क्षे.फ.
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />
            जग्गाको जग्गाधनी श्रेस्ता पुर्जामा घर कायम गरी पाउन भनी निवेदन
            दिइएको हुँदा सो सम्बन्धमा यहाँको नियमानुसार घर कायम गराई दिनुहुन
            सिफारिस गरिन्छ।
          </p>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="line-input full-width-input"
              required
            />
            <select
              name="signer_designation"
              value={form.signer_designation}
              onChange={handleChange}
              className="designation-select"
            >
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
}
