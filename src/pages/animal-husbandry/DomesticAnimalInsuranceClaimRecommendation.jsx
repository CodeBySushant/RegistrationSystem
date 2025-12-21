// DomesticAnimalInsuranceClaimRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import "./DomesticAnimalInsuranceClaimRecommendation.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const initialState = {
  // meta / header
  chalan_no: "",
  subject: "सिफारिस सम्बन्धमा",

  // addressee
  addressee_line1: "",
  addressee_line2: "",
  addressee_line3: "",

  municipality_name: MUNICIPALITY.name,
  municipality_city: MUNICIPALITY.city,
  ward_no: "",

  // paragraph inline fields
  resident_name_in_paragraph: "",
  local_select_type: "गुयुल्का",
  animal_type: "",
  animal_inspected_by: "",
  report_brief: "",
  damaged_area_description: "",
  tag_number: "",
  tag_subtype: "",
  animal_color: "",
  death_date: "", // YYYY-MM-DD

  // applicant box
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // signature
  signer_name: "",
  signer_designation: "",
};

const DomesticAnimalInsuranceClaimRecommendation = () => {
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
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <form className="insurance-claim-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        पशु बिमा पाउँ ।
        <span className="top-right-bread">पशुपालन &gt; पशु बिमा पाउँ</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>

        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>

          <h2 className="ward-title">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || " "} नं. वडा कार्यालय`}
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
            चलानी नं. :
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
          <p>ने.सं - 1146 पोहेलाथ्व, 1 आइतबार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय: <span className="underline-text">{form.subject}</span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <div className="addressee-row">
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input
                name="applicant_name"
                type="text"
                className="inline-box-input medium-box"
                value={form.applicant_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="addressee-row">
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="addressee_line2"
              type="text"
              className="inline-box-input medium-input"
              required
              value={form.addressee_line2}
              onChange={handleChange}
            />
          </div>
          <span>,</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा जिल्ला
          <input
            name="municipality_city"
            type="text"
            className="inline-box-input medium-box"
            value={form.municipality_city}
            onChange={handleChange}
          />
          <input
            name="municipality_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.municipality_name}
            onChange={handleChange}
          />
          वडा नं.
          <input
            name="ward_no"
            type="text"
            className="inline-box-input small-input"
            value={form.ward_no}
            onChange={handleChange}
          />
          मा बसोवास गर्ने श्री
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="resident_name_in_paragraph"
              type="text"
              className="inline-box-input long-box"
              required
              value={form.resident_name_in_paragraph}
              onChange={handleChange}
            />
          </div>
          ले यस पशु सेवा शाखामा पेश गरेको निवेदन, वडा
          <select
            name="local_select_type"
            className="inline-select"
            value={form.local_select_type}
            onChange={handleChange}
          >
            <option value="गुयुल्का">गुयुल्का</option>
            <option value="वडा">वडा</option>
          </select>
          तथा पशु
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="animal_type"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.animal_type}
              onChange={handleChange}
            />
          </div>
          श्री
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="animal_inspected_by"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.animal_inspected_by}
              onChange={handleChange}
            />
          </div>
          को जाँच प्रतिवेदन अनुसार बिगा लेख
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="damaged_area_description"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.damaged_area_description}
              onChange={handleChange}
            />
          </div>
          भएको ट्याग नं.
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="tag_number"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.tag_number}
              onChange={handleChange}
            />
          </div>
          को
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="tag_subtype"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.tag_subtype}
              onChange={handleChange}
            />{" "}
          </div>
          रङको
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="animal_color"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.animal_color}
              onChange={handleChange}
            />
          </div>
          मिति
          <input
            name="death_date"
            type="date"
            className="inline-box-input medium-box"
            value={form.death_date}
            onChange={handleChange}
          />
          गतेका दिन
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="report_brief"
              type="text"
              className="inline-box-input medium-box"
              required
              value={form.report_brief}
              onChange={handleChange}
            />
          </div>
          रोग लागि उपचारको क्रममा मृत्यु भएको व्यहोरा प्रमाणित साथ आवश्यक
          कारवाहिको लागि सिफारिस गरि पठाइएको व्यहोरा अनुरोध छ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="signer_name"
              type="text"
              className="line-input full-width-input"
              required
              value={form.signer_name}
              onChange={handleChange}
            />
          </div>
          <select
            name="signer_designation"
            className="designation-select"
            value={form.signer_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
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
    </form>
  );
};

export default DomesticAnimalInsuranceClaimRecommendation;
