// OnsiteInspectionRecommendation.jsx
import React, { useState } from "react";
import "./OnsiteInspectionRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  addressee_name: "",
  addressee_line2: "",
  previous_municipality: "",
  previous_type: "न.पा.",
  previous_ward_no: "",
  applicant_name: "",
  applicant_current_municipality: "नागार्जुन",
  applicant_current_ward_no: "1",
  plot_details: "", // free text or serialized list
  plot_prev_municipality: "",
  plot_prev_ward_no: "",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: "",
};

export default function OnsiteInspectionRecommendation() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/onsite-inspection-recommendation", form);
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
      const res = await axios.post("/api/forms/onsite-inspection-recommendation", form);
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
    <div className="onsite-inspection-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          स्थलगत निरीक्षण
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; स्थलगत निरीक्षण
          </span>
        </div>

        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
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

        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">स्थलगत निरीक्षण सम्बन्धमा।</span>
          </p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input
              name="addressee_name"
              value={form.addressee_name}
              onChange={handleChange}
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_line2"
              value={form.addressee_line2}
              onChange={handleChange}
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा{" "}
            <input
              name="previous_municipality"
              value={form.previous_municipality}
              onChange={handleChange}
              className="inline-box-input medium-box"
              required
            />{" "}
            <select
              name="previous_type"
              value={form.previous_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option>न.पा.</option>
              <option>गा.पा.</option>
            </select>{" "}
            वडा नं.{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            बस्ने श्री/सुश्री/श्रीमती{" "}
            <input
              name="applicant_name"
              value={form.applicant_name}
              onChange={handleChange}
              className="inline-box-input medium-box"
              required
            />{" "}
            को नाममा दर्ता भएको साविक{" "}
            <input
              name="plot_prev_municipality"
              value={form.plot_prev_municipality}
              onChange={handleChange}
              className="inline-box-input medium-box"
              required
            />{" "}
            वडा नं.{" "}
            <input
              name="plot_prev_ward_no"
              value={form.plot_prev_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            हो। हाल {form.applicant_current_municipality} वडा नं{" "}
            <input
              name="applicant_current_ward_no"
              value={form.applicant_current_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
            />{" "}
            मा पर्ने तपसिल बमोजिम कित्ता भएको जग्गा:{" "}
            <input
              name="plot_details"
              value={form.plot_details}
              onChange={handleChange}
              className="inline-box-input medium-box"
              required
            />{" "}
            ।
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
