// src/pages/social-family/EthnicIdentityRecommendation.jsx
import { useState } from "react";
import "./EthnicIdentityRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "ethnic-identity-recommendation";

/**
 * Resolve API base safely:
 * - prefer process.env (CRA / Node env)
 * - fallback to import.meta.env (Vite)
 * - final fallback empty string
 */
const API_BASE =
  (typeof process !== "undefined" &&
    process.env &&
    (process.env.REACT_APP_API_BASE || process.env.API_BASE)) ||
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  "";

const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const EthnicIdentityRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/ethnic-identity-recommendation", form);
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
      const res = await axios.post("/api/forms/ethnic-identity-recommendation", form);
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
    <form className="ethnic-identity-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        जातीय पहिचान सिफारिस
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; जातीय पहिचान सिफारिस
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
          विषय:{" "}
          <span className="underline-text">
            जातीय पहिचान सिफारिस सम्बन्धमा।
          </span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_office"
            type="text"
            className="line-input medium-input"
            defaultValue="जिल्ला प्रशासन कार्यालय"
          />
        </div>
        <div className="addressee-row">
          <span className="red">*</span>
          <input
            name="addressee_district"
            type="text"
            className="line-input medium-input"
            defaultValue="काठमाडौँ"
          />
          <span className="red">*</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          <input
            name="residence_district"
            type="text"
            className="inline-box-input medium-box"
            defaultValue="नागार्जुन"
          />
          <input
            name="residence_municipality"
            type="text"
            className="inline-box-input medium-box"
            defaultValue="नागार्जुन"
          />
          वडा नं{" "}
          <input
            name="residence_ward_no"
            type="text"
            className="inline-box-input tiny-box"
            defaultValue="1"
          />{" "}
          निवासी श्री
          <select name="person_title" className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input
            name="person_name"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को नाति
          <select name="relation_title" className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input
            name="relation_name"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को
          <select name="relation_child_type" className="inline-select">
            <option>छोरा</option>
            <option>छोरी</option>
          </select>
          <select name="relation_child_title" className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input
            name="relation_child_name"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> (ना.प्र. पत्र नं{" "}
          <input
            name="na_pr_no"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> ) ले आफ्नो जातीय पहिचान सिफारिस पाउँ
          भनी यस वडा कार्यालयमा निवेदन दिनुभएकोमा निजले नेपाली नागरिकताको
          प्रमाणपत्र, शैक्षिक योग्यताका प्रमाणपत्र, नेपाल सरकारबाट सुचिकृत भएको
          जात जातिको सुची बमोजिम निज
          <input
            name="requested_ethnicity"
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> जातिमा पर्ने व्यहोरा स्थानीय सरकार
          संचालन ऐन २०७४ को दफा १२ (२) ङ (३५) बमोजिम सिफारिस गरिन्छ ।
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

export default EthnicIdentityRecommendation;
