import React, { useState } from "react";
import "./MinorIdentityCardRecommendation.css";

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

const API_URL = `${getApiBase().replace(/\/$/, "")}/api/forms/minor-identity-card-recommendation`;

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const MinorIdentityCardRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/minor-identity-card-recommendation", form);
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
      const res = await axios.post("/api/forms/minor-identity-card-recommendation", form);
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
    <form className="minor-card-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        नाबालक परिचय पत्र ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; नाबालक परिचय पत्र
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

      {/* --- Photo Box (Positioned Absolute or Flex) --- */}
      <div className="photo-box-container">
        <div className="photo-box">नाबालकको फोटो</div>
      </div>

      {/* --- Title & Subtitle --- */}
      <div className="form-title-section">
        <h4 className="underline-text bold-text">
          नाबालक परिचयपत्रको अनुसूची।
        </h4>
      </div>

      {/* --- Addressee --- */}
      <div className="addressee-section">
        <p className="bold-text">श्रीमान प्रमुख जिल्ला अधिकारी</p>
        <div className="addressee-row">
          <select
            className="inline-select"
            value={form.addressee_type}
            onChange={(e) => setField("addressee_type", e.target.value)}
          >
            <option>जिल्ला</option>
            <option>इलाका</option>
          </select>
          <span>प्रशासन कार्यालय,</span>
          <input
            type="text"
            className="line-input medium-input"
            value={form.addressee_place}
            onChange={(e) => setField("addressee_place", e.target.value)}
          />
          <span>|</span>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय: <span className="underline-text">नाबालक परिचय पत्र पाउँ।</span>
        </p>
      </div>

      {/* --- Main Form Body --- */}
      <div className="form-body">
        <p className="intro-text">
          मेरो निम्ननुसारको विवरण भएको नाबालकको परिचयपत्र बनाउन परेकोले सिफारिस
          साथ रु. १० को टिकट टाँस गरी यो निवेदन पेश गरेको छु। मेरो
          <select
            className="inline-select"
            value={form.child_type}
            onChange={(e) => setField("child_type", e.target.value)}
          >
            <option>छोरा</option>
            <option>छोरी</option>
          </select>
          <input
            type="text"
            className="line-input medium-input"
            value={form.child_name_ne}
            onChange={(e) => setField("child_name_ne", e.target.value)}
          />{" "}
          <span className="red">*</span>
          ले यस अघि नाबालक परिचयपत्र बनाएको छैन ।
        </p>

        {/* 1. Name */}
        <div className="form-group-block">
          <div className="row">
            <label>
              १. नाबालकको नाम,थर : <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.child_name_ne}
              onChange={(e) => setField("child_name_ne", e.target.value)}
            />
          </div>
          <div className="row">
            <label className="en-label">
              Full Name(In Block): <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.child_fullname_en}
              onChange={(e) => setField("child_fullname_en", e.target.value)}
            />
          </div>
        </div>

        {/* 2. Gender */}
        <div className="form-group-block">
          <div className="row">
            <label>२. लिङ्ग</label>
            <select
              className="inline-select"
              value={form.child_gender}
              onChange={(e) => setField("child_gender", e.target.value)}
            >
              <option>पुरुष</option>
              <option>महिला</option>
              <option>अन्य</option>
            </select>
            <label className="en-label ml-20">Sex:</label>
            <span className="en-label">{form.child_gender}</span>
          </div>
        </div>

        {/* 3. Birth Place */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ३. नाबालकको जन्मस्थान (जन्म दर्ता प्र. प्र. बमोजिम): देश:{" "}
              <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.birth_country}
              onChange={(e) => setField("birth_country", e.target.value)}
            />
            <label>
              प्रदेश: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.birth_province}
              onChange={(e) => setField("birth_province", e.target.value)}
            />
            <label>जिल्ला:</label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.birth_district}
              onChange={(e) => setField("birth_district", e.target.value)}
            />
            <label>न.पा/गा.पा:</label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.birth_rm_mun}
              onChange={(e) => setField("birth_rm_mun", e.target.value)}
            />
          </div>
        </div>

        {/* 4. Father's Details */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ४. बाबुको नाम थर: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.father_name}
              onChange={(e) => setField("father_name", e.target.value)}
            />
            <label>
              ना.प्र.नं. र जारी मिति: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.father_citizenship}
              onChange={(e) => setField("father_citizenship", e.target.value)}
            />
          </div>
        </div>

        {/* 5. Mother's Details */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ५. आमाको नाम थर: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.mother_name}
              onChange={(e) => setField("mother_name", e.target.value)}
            />
            <label>
              ना.प्र.नं. र जारी जिल्ला: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.mother_citizenship}
              onChange={(e) => setField("mother_citizenship", e.target.value)}
            />
          </div>
        </div>

        {/* 6. Guardian's Details */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ६. संरक्षकको नाम थर: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input long-input"
              value={form.guardian_name}
              onChange={(e) => setField("guardian_name", e.target.value)}
            />
          </div>
          <div className="row">
            <label>संरक्षकको ठेगाना</label>
            <input
              type="text"
              className="line-input full-width"
              value={form.guardian_address}
              onChange={(e) => setField("guardian_address", e.target.value)}
            />
          </div>
        </div>

        {/* 7. Permanent Address */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ७. नाबालकको स्थायी ठेगाना: जिल्ला{" "}
              <span className="underline-text">{form.permanent_district}</span>
            </label>
            <label className="ml-20">
              गा.पा/न.पा:{" "}
              <span className="underline-text">{form.permanent_mun}</span>
            </label>
            <label className="ml-20">
              वडा नं:{" "}
              <span className="underline-text">{form.permanent_ward}</span>
            </label>
          </div>
        </div>

        {/* 8. Date of Birth */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ८. नाबालकको जन्म मिति: वि.स.{" "}
              <span className="underline-text">{form.birth_date_bs}</span>
            </label>
            <label className="ml-20">
              AD: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.birth_date_ad}
              onChange={(e) => setField("birth_date_ad", e.target.value)}
            />
          </div>
        </div>

        {/* 9. Grandparents */}
        <div className="form-group-block">
          <div className="row">
            <label>
              ९. हजुरबुबाको नाम थर <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.grandfather_name}
              onChange={(e) => setField("grandfather_name", e.target.value)}
            />
            <label>
              हजुर आमाको नाम थर <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.grandmother_name}
              onChange={(e) => setField("grandmother_name", e.target.value)}
            />
          </div>
        </div>

        <p className="declaration-text">
          मैले माथि लेखेको व्यहोरा ठीक साँचो हो, झुट्टा ठहरे कानुन बमोजिम सहुँला
          बुझाउँला भनी सही गर्ने।
        </p>

        {/* --- Applicant Signature --- */}
        <div className="applicant-signature-section">
          <h4 className="bold-text">निवेदक</h4>
          <div className="sig-row">
            <label>दस्तखत:</label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.applicant_signature_name}
              onChange={(e) =>
                setField("applicant_signature_name", e.target.value)
              }
            />
          </div>
          <div className="sig-row">
            <label>
              नाम थर: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.applicant_name}
              onChange={(e) => setField("applicant_name", e.target.value)}
            />
          </div>
          <div className="sig-row">
            <label>
              नाबालकसँगको नाता: <span className="red">*</span>
            </label>
            <input
              type="text"
              className="line-input medium-input"
              value={form.applicant_relationship}
              onChange={(e) =>
                setField("applicant_relationship", e.target.value)
              }
            />
          </div>
          <div className="sig-row">
            <label>
              मिति:{" "}
              <span className="underline-text">{form.applicant_date}</span>
            </label>
          </div>
        </div>

        <hr className="section-divider" />

        {/* Recommendation Section (Bottom) */}
        <div className="recommendation-section">
          <h4 className="center-text underline-text bold-text">
            गाउँपालिका / नगरपालिका वडा अध्यक्षको सिफारिस
          </h4>

          <div className="rec-body">
            <p>
              जिल्ला <span className="bold-text">काठमाडौँ</span>{" "}
              <span className="bold-text ml-10">नागार्जुन नगरपालिका</span> वडा
              नं <span className="bold-text">१</span> मा स्थायी बसोबास गरी बस्ने
              यसमा लेखिएका श्री
              <select className="inline-select">
                <option>श्री</option>
              </select>
              <input
                type="text"
                className="inline-box-input medium-box"
                value={form.recommender_name}
                onChange={(e) => setField("recommender_name", e.target.value)}
                required
              />{" "}
              को नाम उल्लेखित ब्यहोरा सहि भएकोले सिफारिस गरिन्छ ।
            </p>
          </div>

          <div className="rec-footer-row">
            <div className="rec-left">
              <div className="row">
                <label>कार्यालयको नाम :</label>
                <span className="underline-text">नागार्जुन नगरपालिका</span>
              </div>
              <div className="row">
                <label>
                  मिति{" "}
                  <span className="underline-text">{form.applicant_date}</span>
                </label>
              </div>
            </div>
            <div className="rec-right">
              <div className="row">
                <label>सिफारिस गर्ने:</label>
              </div>
              <div className="row">
                <label>दस्तखत:</label>
                <input
                  type="text"
                  className="line-input medium-input"
                  value={form.recommender_name}
                  onChange={(e) => setField("recommender_name", e.target.value)}
                />
              </div>
              <div className="row">
                <label>
                  नाम थर: <span className="red">*</span>
                </label>
                <input
                  type="text"
                  className="line-input medium-input"
                  value={form.recommender_name}
                  onChange={(e) => setField("recommender_name", e.target.value)}
                />
              </div>
              <div className="row">
                <label>पद: </label>
                <select
                  className="inline-select"
                  value={form.recommender_designation}
                  onChange={(e) =>
                    setField("recommender_designation", e.target.value)
                  }
                >
                  <option>पद छनौट गर्नुहोस्</option>
                </select>
              </div>
            </div>
          </div>
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

export default MinorIdentityCardRecommendation;
