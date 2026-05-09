import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import "./ScholarshipRecommendation.css";
// 1
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  chalan_no: "",

  // addressee
  addressee_name: "",

  // ward info
  ward_no: "",
  previous_vdc: "",

  // residence
  residence_type: "स्थायी",

  // parents
  father_name: "",
  mother_name: "",

  // economic status
  economic_status: "कमजोर",

  // student
  child_type: "छोरा",
  title: "श्री",
  student_name: "",

  // applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // signer
  signer_name: "",
  signer_designation: "",
};

const ScholarshipRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = "http://localhost:5000/api/forms/animal-maternity-allowance";
      const payload = { ...form };

      // optional: convert empty strings -> undefined so model factory treats them as null
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/animal-maternity-allowance",
        payload,
      );

      setLoading(false);

      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
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
      const res = await axios.post("/api/forms/animal-maternity-allowance", form);

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
    <div className="scholarship-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        छात्रवृत्ति सिफारिस ।
        <span className="top-right-bread">
          शैक्षिक &gt; छात्रवृत्ति सिफारिस
        </span>
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
            <input
              name="chalan_no"
              type="text"
              className="dotted-input small-input"
              value={form.chalan_no}
              onChange={handleChange}
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
          विषय: <span className="underline-text">छात्रवृत्ति सिफारिस ।</span>
        </p>
      </div>

      {/* --- Salutation (Jo Sanga...) --- */}
      <div className="salutation-section">
        <label className="red-text">जो सँग ...</label>
        <input type="text" className="line-input medium-input" />
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा{" "}
          <span className="bold-text underline-text">{MUNICIPALITY.name}</span>{" "}
          वडा नं.{" "}
          <input
            name="ward_no"
            type="text"
            className="inline-box-input tiny-box"
            value={form.ward_no}
            onChange={handleChange}
          />{" "}
          (साविक <input type="text" className="inline-box-input medium-box" />,
          वडा नं.{" "}
          <input type="text" className="inline-box-input tiny-box" required /> )
          अन्तर्गत
          <select className="inline-select bold-text">
            <option>स्थायी</option>
            <option>अस्थायी</option>
          </select>
          बसोबास गर्ने श्री{" "}
          <input type="text" className="inline-box-input long-box" required /> )
          तथा श्रीमती{" "}
          <input type="text" className="inline-box-input long-box" required /> )
          को आर्थिक अवस्था
          <select className="inline-select bold-text">
            <option>कमजोर</option>
            <option>मध्यम</option>
            <option>सम्पन्न</option>
          </select>
          भएको हुँदा निजहरूको
          <select className="inline-select bold-text">
            <option>छोरा</option>
            <option>छोरी</option>
          </select>
          <select className="inline-select bold-text">
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input long-box" required /> )
          लाई नियमानुसार छात्रवृत्ति को लागि सिफारिस गरिन्छ ।
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
    </div>
  );
};

export default ScholarshipRecommendation;
