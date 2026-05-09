import React, { useState } from "react";
import "./TemporaryResidenceRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/** Safe API base detection (CRA / Vite / window.__API_BASE) */
const getApiBase = () => {
  try {
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_API_BASE
    ) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) {
    /* ignore */
  }

  try {
    // access import.meta safely in environments that support it
    const meta = Function(
      'return typeof import !== "undefined" && import.meta ? import.meta : undefined',
    )();
    if (meta && meta.env && meta.env.VITE_API_BASE)
      return meta.env.VITE_API_BASE;
  } catch (e) {
    /* ignore */
  }

  if (typeof window !== "undefined" && window.__API_BASE)
    return window.__API_BASE;
  return "";
};

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/temporary-residence-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const TemporaryResidenceRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/temporary-residence-recommendation", form);
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
      const res = await axios.post("/api/forms/temporary-residence-recommendation", form);
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
    <form className="temp-residence-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        अस्थायी बसोबास सिफारिस ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; अस्थायी बसोबास सिफारिस
        </span>
      </div>

      {/* Header */}
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

      {/* Meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या :{" "}
            <span className="bold-text">
              <input
                name="reference_no"
                value={form.reference_no}
                onChange={(e) => setField("reference_no", e.target.value)}
                className="line-input tiny-input"
              />
            </span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input
              name="chalani_no"
              value={form.chalani_no}
              onChange={(e) => setField("chalani_no", e.target.value)}
              className="dotted-input small-input"
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति :{" "}
            <input
              name="date_bs"
              value={form.date_bs}
              onChange={(e) => setField("date_bs", e.target.value)}
              className="line-input tiny-input"
            />
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा {/* salutation */}
          <select
            value={form.salutation_prefix}
            onChange={(e) => setField("salutation_prefix", e.target.value)}
            className="inline-select"
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input
            name="applicant_name_full"
            value={form.applicant_name_full}
            onChange={(e) => setField("applicant_name_full", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span>,
          <input
            name="current_municipality"
            value={form.current_municipality}
            onChange={(e) => setField("current_municipality", e.target.value)}
            className="inline-box-input medium-box"
          />
          वडा नं १ (साविक
          <select
            value={form.previous_admin_type}
            onChange={(e) => setField("previous_admin_type", e.target.value)}
            className="inline-select medium-select"
          >
            <option></option>
            <option>गा.वि.स.</option>
            <option>न.पा.</option>
          </select>
          वडा नं.{" "}
          <input
            name="previous_ward_no"
            value={form.previous_ward_no}
            onChange={(e) => setField("previous_ward_no", e.target.value)}
            className="inline-box-input tiny-box"
            required
          />{" "}
          <span className="red">*</span> ) अन्तर्गत रहेको घरधनि
          <select
            value={form.house_owner_prefix}
            onChange={(e) => setField("house_owner_prefix", e.target.value)}
            className="inline-select"
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input
            name="house_owner_name"
            value={form.house_owner_name}
            onChange={(e) => setField("house_owner_name", e.target.value)}
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> कित्ता नं.
          <input
            name="plot_no"
            value={form.plot_no}
            onChange={(e) => setField("plot_no", e.target.value)}
            className="inline-box-input small-box"
            required
          />{" "}
          <span className="red">*</span> को घरमा विगत मिति
          <input
            name="since_date_bs"
            value={form.since_date_bs}
            onChange={(e) => setField("since_date_bs", e.target.value)}
            className="inline-box-input medium-box"
            defaultValue={form.since_date_bs}
          />{" "}
          देखि अस्थायी बसोबास गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध गरिन्छ
          ।
        </p>
      </div>

      {/* Foreigner checkbox */}
      <div className="foreigner-check-section">
        <input
          type="checkbox"
          id="foreignerCheck"
          checked={!!form.is_foreigner}
          onChange={(e) => setField("is_foreigner", e.target.checked)}
        />
        <label htmlFor="foreignerCheck" className="red-text">
          विदेशीको हकमा
        </label>
      </div>

      {/* Resident Details */}
      <div className="resident-details-section">
        <h4 className="bold-text">बसोबास गर्नेको :-</h4>
        <div className="resident-row">
          <label>
            ना.प्रा.प.नं. : <span className="red">*</span>
          </label>
          <input
            name="resident_napr_no"
            value={form.resident_napr_no}
            onChange={(e) => setField("resident_napr_no", e.target.value)}
            className="line-input medium-input"
          />
          <label>
            {" "}
            / जिल्ला : <span className="red">*</span>
          </label>
          <input
            name="resident_district"
            value={form.resident_district}
            onChange={(e) => setField("resident_district", e.target.value)}
            className="line-input medium-input"
          />
          <label> / जारी मिति :</label>
          <input
            name="resident_issue_date"
            value={form.resident_issue_date}
            onChange={(e) => setField("resident_issue_date", e.target.value)}
            className="line-input medium-input"
          />
        </div>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input
            name="signatory_name"
            value={form.signatory_name}
            onChange={(e) => setField("signatory_name", e.target.value)}
            className="line-input full-width-input"
            required
          />
          <select
            name="signatory_designation"
            value={form.signatory_designation}
            onChange={(e) => setField("signatory_designation", e.target.value)}
            className="designation-select"
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

export default TemporaryResidenceRecommendation;
