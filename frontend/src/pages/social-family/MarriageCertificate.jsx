import React, { useState } from "react";
import "./MarriageCertificate.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// Safe API base resolver (CRA, Vite, fallback)
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

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/marriage-certificate`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const MarriageCertificate = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/marriage-certificate", form);
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
      const res = await axios.post("/api/forms/marriage-certificate", form);
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
    <form className="marriage-certificate-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        विवाह प्रमाण पत्र ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; विवाह प्रमाण पत्र
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
            पत्र संख्या :{" "}
            <span className="bold-text">
              <input
                value={form.reference_no}
                onChange={(e) => setField("reference_no", e.target.value)}
                className="line-input tiny-input"
              />
            </span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input
              value={form.chalani_no}
              onChange={(e) => setField("chalani_no", e.target.value)}
              type="text"
              className="dotted-input small-input"
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

      {/* --- Salutation --- */}
      <div className="salutation-section">
        <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:
          <span className="underline-text bold-text">
            विवाह प्रमाणित सम्बन्धमा।
          </span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा जिल्ला काठमाडौँ साविक
          <input
            value={form.prev_district}
            onChange={(e) => setField("prev_district", e.target.value)}
            className="inline-box-input medium-box"
          />
          <select
            value={form.prev_unit_type}
            onChange={(e) => setField("prev_unit_type", e.target.value)}
            className="inline-select"
          >
            <option value=""></option>
            <option>गा.वि.स.</option>
            <option>न.पा.</option>
          </select>
          वडा नं.
          <input
            value={form.prev_ward_no}
            onChange={(e) => setField("prev_ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />{" "}
          <span className="red">*</span>
          हाल {form.resident_municipality} नगरपालिका वडा नं.
          <input
            value={form.resident_ward_no}
            onChange={(e) => setField("resident_ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />{" "}
          निवासी श्री
          <input
            value={form.groom_name}
            onChange={(e) => setField("groom_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>
          को नाति श्री{" "}
          <input
            value={form.groom_parent_relation}
            onChange={(e) => setField("groom_parent_relation", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>
          तथा श्रीमती{" "}
          <input
            value={form.bride_name}
            onChange={(e) => setField("bride_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>
          को छोरा ना.प्र.नं.{" "}
          <input
            value={form.registration_no}
            onChange={(e) => setField("registration_no", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>
          {/* trimmed mid-sentence but fields preserved */}
          ... को{" "}
          <input
            value={form.bride_parent_relation}
            onChange={(e) => setField("bride_parent_relation", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          रङ्ग जिल्ला{" "}
          <input
            value={form.marriage_place}
            onChange={(e) => setField("marriage_place", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          साविक
          <select className="inline-select">
            <option></option>
            <option>गा.वि.स.</option>
            <option>न.पा.</option>
          </select>
          वडा नं. <input className="inline-box-input tiny-box" required />
          भई हाल{" "}
          <input
            value={form.marriage_place}
            onChange={(e) => setField("marriage_place", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          वडा नं. <input className="inline-box-input tiny-box" required /> मा
          बस्ने श्री <input className="inline-box-input medium-box" required />{" "}
          को नातिनी श्री{" "}
          <input className="inline-box-input medium-box" required /> तथा श्रीमती{" "}
          <input className="inline-box-input medium-box" required /> को छोरी{" "}
          <input className="inline-box-input medium-box" required /> बीच मिति
          <input
            value={form.marriage_date}
            onChange={(e) => setField("marriage_date", e.target.value)}
            className="inline-box-input medium-box"
          />{" "}
          गतेमा सामाजिक परम्परा अनुसार विवाह भएकोले विवाह प्रमाणित सिफारिस माग
          गरे अनुसार{" "}
          <input
            value={form.remarks}
            onChange={(e) => setField("remarks", e.target.value)}
            className="inline-box-input long-box"
          />{" "}
          विवाह प्रमाणित सिफारिस गरिएको व्यहोरा अनुरोध गरिन्छ। साथै निजहरुको
          फोटो यस पत्र साथ प्रमाणित गरिएको व्यहोरा अनुरोध गरिन्छ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input
            value={form.signatory_name}
            onChange={(e) => setField("signatory_name", e.target.value)}
            type="text"
            className="line-input full-width-input"
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

export default MarriageCertificate;
