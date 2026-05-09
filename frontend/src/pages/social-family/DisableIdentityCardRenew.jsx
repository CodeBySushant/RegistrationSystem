// src/pages/social-family/DisableIdentityCardRenew.jsx
import React, { useState } from "react";
import "./DisableIdentityCardRenew.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// form key used by backend generic form controller
const FORM_KEY = "disable-identity-card-renew";

/** Safe API base resolver (Vite / CRA / runtime global) */
function getApiBase() {
  try {
    // Vite: import.meta.env
    // wrap in try so environments that don't support import.meta won't throw
    // eslint-disable-next-line no-undef
    if (
      typeof import.meta !== "undefined" &&
      import.meta &&
      import.meta.env &&
      import.meta.env.VITE_API_BASE
    ) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof process !== "undefined" && process.env) {
      const v = process.env.REACT_APP_API_BASE || process.env.API_BASE;
      if (v) return v;
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof globalThis !== "undefined" && globalThis.__API_BASE__) {
      return globalThis.__API_BASE__;
    }
  } catch (e) {}

  return "";
}

const API_BASE = getApiBase();
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DisableIdentityCardRenew = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/disable-identity-card-renew", form);
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
      const res = await axios.post("/api/forms/disable-identity-card-renew", form);
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
    <form className="renew-card-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        परिचय पत्र नवीकरण ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; परिचय पत्र नवीकरण
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

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:
          <select
            name="certificate_type"
            className="inline-select bold-text"
            style={{ border: "1px solid #ccc" }}
          >
            <option value="">प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
            <option value="disability">अपाङ्गता परिचयपत्र</option>
            <option value="senior">ज्येष्ठ नागरिक परिचयपत्र</option>
          </select>
          <span className="underline-text bold-text"> नवीकरण बारे ।</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री नागार्जुन नगरपालिका ,</span>
        </div>
        <div className="addressee-row">
          <span>नगर कार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
          <input
            type="text"
            name="municipality_display"
            className="line-input medium-input"
            defaultValue="नागार्जुन"
          />
          <span>, काठमाडौँ ।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला{" "}
          <span className="bg-gray-text">काठमाडौँ</span>{" "}
          <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं{" "}
          <span className="bg-gray-text">१</span> (साविक जिल्ला काठमाडौँ
          <input
            name="prev_unit_name"
            type="text"
            className="inline-box-input medium-box"
          />
          वडा नं{" "}
          <input
            name="prev_unit_ward"
            type="text"
            className="inline-box-input tiny-box"
            required
          />{" "}
          <span className="red">*</span> ) मा बस्ने
          <input
            name="relation_text"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को
          <select name="relation_child_type" className="inline-select">
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>
          <input
            name="relation_child_name"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> ले यस कार्यालयमा दिनु भएको निवेदन
          अनुसार निजले मिति
          <input
            name="certificate_date"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> नम्बर नं
          <input
            name="certificate_number"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> प्राप्त गरेकोले तहाँ कार्यालयको
          नियमानुसार
          <input
            name="renewal_type"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> नवीकरण गरिदिनुहुन सिफारिस साथ सादर
          अनुरोध गरिन्छ।
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
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
};

export default DisableIdentityCardRenew;
