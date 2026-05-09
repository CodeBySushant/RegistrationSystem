// src/components/DemisedSecurityAllowanceToHeir.jsx
import React, { useState } from "react";
import "./DemisedSecurityAllowanceToHeir.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "demised-security-allowance-to-heir";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DemisedSecurityAllowanceToHeir = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/demised-security-allowance-to-heir", form);
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
      const res = await axios.post("/api/forms/demised-security-allowance-to-heir", form);
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


  // render — identical structure/classes, only added `name` attributes and form element
  return (
    <form className="demised-allowance-form" onSubmit={handleSubmit}>
      <div className="demised-allowance-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई
          </span>
        </div>

        {/* --- Header Section --- */}
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

        {/* --- Meta Data (Date/Ref) --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <span className="bold-text">२०८२-०८-०६</span>
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input
              name="addressee_name"
              type="text"
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_line2"
              type="text"
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_line3"
              type="text"
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
            <span className="bold-text">काठमाडौँ</span>
            <span style={{ float: "right" }}>|</span>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              मृतकको सा.सु. भत्ता वापतको रकम उपलब्ध गराईदिने सम्बन्धमा ।
            </span>
          </p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा बागमती प्रदेश
            <input
              name="province"
              type="text"
              className="inline-box-input medium-box"
              defaultValue="काठमाडौँ"
            />
            जिल्ला{" "}
            <input
              name="district"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span>
            <select name="local_unit_type" className="inline-select">
              <option value="गाउँपालिका">गाउँपालिका</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            वडा नं{" "}
            <input
              name="ward_no"
              type="text"
              className="inline-box-input tiny-box"
              defaultValue="1"
            />
            स्थायी घर भएका{" "}
            <input
              name="local_unit_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> ले मेरो
            <input
              name="deceased_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> नाता पर्ने
            <input
              name="relation_of_applicant"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को मिति २०८२-०८-०६ मा मृत्यु भएको
            हुँदा निजको नाममा तहाँ बैंकको खाता नं.
            <input
              name="bank_account_no"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> मा जम्मा भएको सामाजिक सुरक्षा भत्ता
            वापतको रकम मृतकको
            <input
              name="beneficiary_relation"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> नाताका ना.प्र.न.
            <input
              name="beneficiary_citizenship_no"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> को
            <input
              name="beneficiary_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> लाई उपलब्ध गराइदिनुहुन सिफारिस साथ
            अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              required
            />
            <select name="signatory_designation" className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
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
      </div>
    </form>
  );
};

export default DemisedSecurityAllowanceToHeir;
