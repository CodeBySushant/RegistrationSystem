// src/pages/english-format/new/OccupationVerificationNew.jsx
import React, { useState } from "react";
import "./OccupationVerificationNew.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

const OccupationVerificationNew = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "1970/60",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),

    applicantTitle: "Master.",
    applicantNameBody: "",
    relation: "son",

    fatherTitle: "Master.",
    fatherName: "",

    residencyType: "permanent",

    // defaults from MUNICIPALITY
    municipality: MUNICIPALITY.englishMunicipality || "",
    wardNo: MUNICIPALITY.wardNumber || "",

    prevAddress1: "",
    prevWardNo: "",
    prevAddress2: "",
    prevProvince: MUNICIPALITY.englishProvince || "",
    prevCountry: "Nepal",

    description: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = [
      "applicantNameBody",
      "fatherName",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
      "designation",
    ];
    // Required field check (trim-safe)
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "") {
        return { ok: false, missing: k };
      }
    }
    // Phone validation (Nepal mobile numbers)
    const phone = String(formData.applicantPhone).trim();
    if (!/^(\+977)?9[678]\d{8}$/.test(phone)) {
      return { ok: false, missing: "applicantPhone (invalid)" };
    }
    return { ok: true };
  };

  const handlePrint = async () => {
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validate();
    if (!v.ok) {
      alert("Please fill/validate required field: " + v.missing);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };

      const res = await axiosInstance.post(
        "/api/forms/occupation-verification-new",
        payload
      );

      alert("Saved successfully (id: " + res.data.id + ")");
      window.print();
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.message || err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="occupation-verification-new-container">
      <form onSubmit={handleSubmit}>
        {/* Reusable header (English) */}
        <div className="header">
          <MunicipalityHeader showLogo english />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input
              type="text"
              name="refNo"
              value={formData.refNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>
            Subject: <u>OCCUPATION VERIFICATION CERTIFICATE</u>
          </strong>
          <br />
          <strong>
            <u>TO WHOM IT MAY CONCERN</u>
          </strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select
            name="applicantTitle"
            value={formData.applicantTitle}
            onChange={handleChange}
          >
            <option>Master.</option>
            <option>Mr.</option>
            <option>Miss.</option>
            <option>Mrs.</option>
          </select>
          <input
            type="text"
            name="applicantNameBody"
            placeholder="Name"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
          />{" "}
          ,
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          >
            <option>son</option>
            <option>daughter</option>
          </select>
          of
          <select
            name="fatherTitle"
            value={formData.fatherTitle}
            onChange={handleChange}
          >
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />{" "}
          ,
          <select
            name="residencyType"
            value={formData.residencyType}
            onChange={handleChange}
          >
            <option>permanent</option>
            <option>temporary</option>
          </select>
          resident of
          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          >
            <option>
              {MUNICIPALITY.englishMunicipality || "Nagarjun Municipality"}
            </option>
          </select>
          , Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>{MUNICIPALITY.wardNumber || "1"}</option>
            <option>2</option>
            <option>3</option>
          </select>
          , (Previously:
          <input
            type="text"
            name="prevAddress1"
            placeholder="Address"
            value={formData.prevAddress1}
            onChange={handleChange}
          />{" "}
          Ward No.
          <input
            type="text"
            name="prevWardNo"
            placeholder="Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
          />{" "}
          ),
          <input
            type="text"
            name="prevAddress2"
            placeholder="Address"
            value={formData.prevAddress2}
            onChange={handleChange}
          />{" "}
          ,
          <select
            name="prevProvince"
            value={formData.prevProvince}
            onChange={handleChange}
          >
            <option>
              {MUNICIPALITY.englishProvince || "Bagmati Province"}
            </option>
            <option>Koshi Province</option>
          </select>
          ,
          <select
            name="prevCountry"
            value={formData.prevCountry}
            onChange={handleChange}
          >
            <option>Nepal</option>
          </select>
        </p>

        <div className="certificate-body">
          <div className="textarea-wrapper">
            <textarea
              name="description"
              placeholder="is a respected person as well as one of the renowned farmer ..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
        </div>

        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        {/* Applicants details */}
        <div className="applicant-details-box">
          <h3>Applicant Details</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>
                Applicant Name<span className="required">*</span>
              </label>
              <input
                name="applicantName"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                Applicant Address<span className="required">*</span>
              </label>
              <input
                name="applicantAddress"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                Applicant Citizenship Number<span className="required">*</span>
              </label>
              <input
                name="applicantCitizenship"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantCitizenship}
                onChange={handleChange}
                required
              />
            </div>

            <div className="detail-group">
              <label>
                Applicant Phone Number<span className="required">*</span>
              </label>
              <input
                name="applicantPhone"
                type="text"
                className="detail-input bg-gray"
                value={formData.applicantPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save and Print Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OccupationVerificationNew;
