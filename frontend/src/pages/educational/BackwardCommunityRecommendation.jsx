import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import "./BackwardCommunityRecommendation.css";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  // applicant details
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // signer
  signer_name: "",
  signer_designation: "",

  // meta / letter fields
  chalani_no: "",

  // form body fields
  tole_address: "",
  ward_no: "",
  applicant_gender: "श्री",
  applicant_fullname: "",
};

const BackwardCommunityRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };

      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axiosInstance.post(
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
      const res = await axiosInstance.post(
        "/api/forms/animal-maternity-allowance",
        form,
      );

      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);

        window.print();

        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backward-community-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        विपन्नको सिफारिस ।
        <span className="top-right-bread">शैक्षिक &gt; विपन्नको सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
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
              type="text"
              name="chalani_no"
              value={form.chalani_no}
              onChange={handleChange}
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
          <span className="underline-text">विपन्नको सिफारिस सम्बन्धमा।</span>
        </p>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
        <p>श्री यो जो जस सँग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा{" "}
          <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
          वडा नं. {MUNICIPALITY.wardNumber}{" "}
          <input
            type="text"
            name="tole_address"
            value={form.tole_address}
            onChange={handleChange}
            className="inline-box-input medium-box"
          />
          , वडा नं.{" "}
          <input
            type="text"
            name="ward_no"
            value={form.ward_no}
            onChange={handleChange}
            className="inline-box-input tiny-box"
            required
          />{" "}
          ) निवासी श्री
          <select
            name="applicant_gender"
            value={form.applicant_gender}
            onChange={handleChange}
            className="inline-select bold-text"
          >
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          <input
            type="text"
            name="applicant_fullname"
            value={form.applicant_fullname}
            onChange={handleChange}
            className="inline-box-input long-box"
            required
          />{" "}
          ले मेरो पारिवारिक आर्थिक स्थिति नाजुक भएको कारणले विपन्न भएको हुनाले
          मेरो परिवार मेरो उच्च शिक्षाको खर्च जुटाउन असमर्थ भएकोले सो खुलाई
          सिफारिस पाऊँ भनी यस कार्यालयमा निवेदन पेश गरेकोले सो सम्बन्धमा बुझ्दा
          जानेबुझे सम्म व्यहोरा मनासिब भएकोले निजलाई विपन्न व्यक्तिका लागि
          आरक्षित गरिएको स्थानमा सहभागी हुन पाउने व्यवस्था गरी दिनुहुन सिफारिस
          गरिएको छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input
            type="text"
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
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
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

export default BackwardCommunityRecommendation;