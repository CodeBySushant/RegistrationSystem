import React, { useState } from "react";
import "./JesthaNagarikSifarisWada.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// Safe API base resolver (works with CRA, Vite, or fallback)
const getApiBase = () => {
  if (
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE
  ) {
    return process.env.REACT_APP_API_BASE;
  }
  try {
    // eslint-disable-next-line no-undef
    if (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) {
      return import.meta.env.VITE_API_BASE;
    }
  } catch (e) {
    // ignore
  }
  if (typeof window !== "undefined" && window.__API_BASE) {
    return window.__API_BASE;
  }
  return "";
};

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/jestha-nagarik-sifaris-wada`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const JesthaNagarikSifarisWada = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/jestha-nagarik-sifaris-wada", form);
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
      const res = await axios.post("/api/forms/jestha-nagarik-sifaris-wada", form);
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
    <form className="jestha-nagarik-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        ज्येष्ठ नागरिक सिफारिस ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; ज्येष्ठ नागरिक सिफारिस
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">{form.date}</span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input
              type="text"
              className="dotted-input small-input"
              value={form.chalani_no}
              onChange={(e) => setField("chalani_no", e.target.value)}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति :{" "}
            <input
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              className="line-input tiny-input"
            />
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            <input
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
              className="line-input"
            />
          </span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>{form.addressee_line1}</span>
        </div>
        <div className="addressee-row">
          <span>{form.addressee_line2}</span>
        </div>
        <div className="addressee-row">
          <input
            type="text"
            className="line-input medium-input"
            value={form.addressee_line3}
            onChange={(e) => setField("addressee_line3", e.target.value)}
          />
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा{" "}
          <input
            className="inline-box-input medium-box red-text-input"
            value={form.from_district}
            onChange={(e) => setField("from_district", e.target.value)}
          />{" "}
          जिल्ला
          <input
            className="inline-box-input medium-box red-text-input"
            value={form.from_place}
            onChange={(e) => setField("from_place", e.target.value)}
          />
          वडा नं{" "}
          <input
            className="inline-box-input tiny-box red-text-input"
            value={form.from_ward_no}
            onChange={(e) => setField("from_ward_no", e.target.value)}
          />{" "}
          स्थायी ठेगाना भई हाल
          <input
            className="inline-box-input medium-box"
            value={form.current_municipality}
            onChange={(e) => setField("current_municipality", e.target.value)}
          />
          वडा नं 1 मा बसोबास गर्ने{" "}
          <input
            className="inline-box-input medium-box"
            value={form.applicant_reason_text}
            onChange={(e) => setField("applicant_reason_text", e.target.value)}
            required
          />{" "}
          <span className="red">*</span> ले दिनुभएको निवेदन अनुसार ग कानुन
          बमोजिम ज्येष्ठ नागरिक भएको हुँदा ज्येष्ठ नागरिक परिचय-पत्र उपलब्ध गराइ
          पाउँ भनि यस वडा कार्यालयमा निवेदन दिनुभएको हुँदा तहाँ कार्यालयको
          नियमानुसार निज
          <input
            className="inline-box-input medium-box"
            value={form.signatory_name}
            onChange={(e) => setField("signatory_name", e.target.value)}
            required
          />{" "}
          <span className="red">*</span> लाई ज्येष्ठ नागरिक परिचय-पत्र उपलब्ध
          गराई दिनुहुन सिफारिस साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input
            type="text"
            className="line-input full-width-input"
            value={form.signatory_name}
            onChange={(e) => setField("signatory_name", e.target.value)}
            required
          />
          <select
            className="designation-select"
            value={form.signatory_designation}
            onChange={(e) => setField("signatory_designation", e.target.value)}
          >
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

export default JesthaNagarikSifarisWada;
