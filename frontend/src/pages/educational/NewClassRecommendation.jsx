import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import "./NewClassRecommendation.css";
// 4
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
const initialState = {
  // applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const NewClassRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/domestic-animal", form);
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
      await axios.post("/api/forms/scholarship", form);
      setLoading(false);
      setTimeout(() => window.print(), 500);
    } catch (err) {
      setLoading(false);
      alert("Submission failed");
    }
  };
  return (
    <div className="class-recommendation-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कक्षा थप सिफारिस
        <span className="top-right-bread">शिक्षा &gt; कक्षा थप सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
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
            <input type="text" className="dotted-input small-input" />
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
          <span className="underline-text">कक्षा थपको लागी अनुमति दिनुहुन</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री {MUNICIPALITY.name}</span>
          <input type="text" className="line-input medium-input" />
          <span>नगर कार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
          <input
            type="text"
            className="line-input medium-input"
            defaultValue={MUNICIPALITY.name}
          />
          <span>, {MUNICIPALITY.city}</span>
          <span style={{ float: "right" }}>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा {MUNICIPALITY.name}{" "}
          <input type="text" className="inline-box-input medium-box" />, वडा नं
          १ मा सञ्चालनमा रहेको श्री{" "}
          <input type="text" className="inline-box-input long-box" required />{" "}
          ले कक्षा{" "}
          <input type="text" className="inline-box-input medium-box" required />
          को कक्षा संचालन गर्न अनुमतिको लागि सिफारिस दिनुहुन भनि यस कार्यालयमा
          दिएको निवेदन अनुसार{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            defaultValue={MUNICIPALITY.name}
          />{" "}
          को शिक्षा नियमावली २०७४{" "}
          <input type="text" className="inline-box-input medium-box" /> को
          अनुसूची २{" "}
          <input type="text" className="inline-box-input medium-box" /> बमोजिम
          विद्यालय खोल्न चाहिने पूर्वाधार हरुको एकिन गरि नियम ५(३) अनुसार कक्षा{" "}
          <input type="text" className="inline-box-input small-box" required />{" "}
          संचालनको अनुमति दिनुहुन सो नियमावली को दफा ३{" "}
          <input type="text" className="inline-box-input medium-box" /> बमोजिम
          सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
            <option>पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>
              निवेदकको नाम<span className="required">*</span>
            </label>
            <input
              name="applicant_name"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_name}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको ठेगाना<span className="required">*</span>
            </label>
            <input
              name="applicant_address"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_address}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको नागरिकता नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_citizenship_no"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_citizenship_no}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको फोन नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_phone"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default NewClassRecommendation;
