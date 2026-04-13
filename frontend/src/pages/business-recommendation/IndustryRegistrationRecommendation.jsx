import React, { useState, useEffect } from "react";
import "./IndustryRegistrationRecommendation.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  to_line1: "",
  to_line2: "",
  sabik_district: "",
  sabik_ward_no: "",
  current_residence: "",
  residence_from: "",
  residence_to: "",
  place_details: "",
  industry_place_details: "",
  kitta_no: "",
  area_size: "",
  boundary_east: "",
  boundary_west: "",
  boundary_north: "",
  boundary_south: "",
  structure_types: "",
  inspection_notes: "",
  sign_name: "",
  sign_position: "",
  ward_no: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function IndustryRegistrationRecommendation() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axiosInstance.post(
        "/api/forms/industry-registration-recommendation",
        payload
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
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axiosInstance.post(
        "/api/forms/industry-registration-recommendation",
        payload
      );
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="irr-page">
      <header className="irr-topbar">
        <div className="irr-top-left">उद्योग दर्ता सिफारिस ।</div>
        <div className="irr-top-right">अवलोकन पृष्ठ / उद्योग दर्ता सिफारिस</div>
      </header>

      <form className="irr-paper" onSubmit={handleSubmit}>
        {/* Letterhead */}
        <div className="irr-letterhead">
          <div className="irr-logo">
            <img alt="Emblem" src={MUNICIPALITY.logoSrc} />
          </div>
          <div className="irr-head-text">
            <div className="irr-head-main">{MUNICIPALITY.name}</div>
            <div className="irr-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="irr-head-sub">
              {MUNICIPALITY.officeLine}
              <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="irr-head-meta">
            <div>
              मिति :{" "}
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="irr-small-input"
              />
            </div>
          </div>
        </div>

        <div className="irr-ref-row">
          <div className="irr-ref-block">
            <label>पत्र संख्या :</label>
            <input
              name="refLetterNo"
              value={form.refLetterNo}
              onChange={handleChange}
            />
          </div>
          <div className="irr-ref-block">
            <label>चलानी नं. :</label>
            <input
              name="chalaniNo"
              value={form.chalaniNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="irr-to-block">
          <span>श्री</span>
          <input
            name="to_line1"
            value={form.to_line1}
            onChange={handleChange}
            className="irr-long-input"
          />
          <span>ज्यु,</span>
          <br />
          <input
            name="to_line2"
            value={form.to_line2}
            onChange={handleChange}
            className="irr-long-input irr-to-second"
          />
        </div>

        <div className="irr-subject-row">
          <span className="irr-sub-label">विषयः</span>
          <span className="irr-subject-text">
            प्रमाणित सिफारिस गरिएको बारे ।
          </span>
        </div>

        <p className="irr-body">
          उपरोक्त सम्बन्धमा जिल्ला {MUNICIPALITY.englishDistrict} साबिक{" "}
          <input
            type="text"
            name="sabik_district"
            className="irr-small-field"
            value={form.sabik_district}
            onChange={handleChange}
          />{" "}
          वडा नं.{" "}
          <input
            type="text"
            name="sabik_ward_no"
            className="irr-tiny-field"
            value={form.sabik_ward_no}
            onChange={handleChange}
          />{" "}
          भई हाल {MUNICIPALITY.name} वडा नं. {user?.ward || ""} मा बस्ने{" "}
          <input
            type="text"
            name="current_residence"
            className="irr-medium-field"
            value={form.current_residence}
            onChange={handleChange}
          />{" "}
          ले{" "}
          <input
            type="text"
            name="place_details"
            className="irr-small-field"
            value={form.place_details}
            onChange={handleChange}
          />{" "}
          उद्योग दर्ता गर्न सिफारिस पाऊँ भनी निवेदन अनुसार, मिति{" "}
          <input
            type="text"
            name="residence_from"
            className="irr-small-field"
            value={form.residence_from}
            onChange={handleChange}
          />{" "}
          देखि{" "}
          <input
            type="text"
            name="residence_to"
            className="irr-small-field"
            value={form.residence_to}
            onChange={handleChange}
          />{" "}
          सम्म स्थानमा रहेर व्यवसाय संचालन गर्दै आएको र सो स्थान{" "}
          <input
            type="text"
            name="industry_place_details"
            className="irr-medium-field"
            value={form.industry_place_details}
            onChange={handleChange}
          />{" "}
          को किता नं.{" "}
          <input
            type="text"
            name="kitta_no"
            className="irr-small-field"
            value={form.kitta_no}
            onChange={handleChange}
          />{" "}
          को क्षेत्रफल{" "}
          <input
            type="text"
            name="area_size"
            className="irr-small-field"
            value={form.area_size}
            onChange={handleChange}
          />{" "}
          मा रहेको देखिन्छ ।
        </p>

        <p className="irr-body">
          स्थानमा पूर्व{" "}
          <input
            name="boundary_east"
            className="irr-medium-field"
            value={form.boundary_east}
            onChange={handleChange}
          />{" "}
          पश्चिम{" "}
          <input
            name="boundary_west"
            className="irr-medium-field"
            value={form.boundary_west}
            onChange={handleChange}
          />{" "}
          उत्तर{" "}
          <input
            name="boundary_north"
            className="irr-medium-field"
            value={form.boundary_north}
            onChange={handleChange}
          />{" "}
          दक्षिण{" "}
          <input
            name="boundary_south"
            className="irr-medium-field"
            value={form.boundary_south}
            onChange={handleChange}
          />{" "}
          गरी चार किल्ला घेरिएको जग्गामा कस्ता प्रकारका संरचना रहेको...
        </p>

        {/* Signature */}
        <div className="irr-sign-top">
          <input
            name="sign_name"
            placeholder="नाम, थर"
            value={form.sign_name}
            onChange={handleChange}
            className="irr-sign-name"
          />
          <select
            name="sign_position"
            className="irr-post-select"
            value={form.sign_position}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        <div className="form-footer">
          <button className="save-print-btn" type="button" onClick={handlePrint}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
}