// src/pages/english-format/new/SurnameVerificationCertificateNew.jsx
import React, { useState } from "react";
import "./SurnameVerificationCertificateNew.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";

const SurnameVerificationCertificateNew = () => {
  const [formData, setFormData] = useState({
    letterNo: "0000/00",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),

    applicantTitle: "Mr.",
    applicantNameBody: "Manjit Thapa Magar",
    surname1: "Thapa Magar",
    applicantNameAgain: "Mr. Manjit Thapa Magar",
    surname2: "Thapa",
    surnameContext: "cl",
    fatherName: "Late Min Bahadur Thapa",
    surname3: "Thapa Magar",
    surname4: "Thapa",
    relationship: "son",

    // defaults from MUNICIPALITY (kept if you later want to show or use them)
    municipality: MUNICIPALITY.englishMunicipality || "",
    wardNo: MUNICIPALITY.wardNumber || "",
    district: MUNICIPALITY.englishDistrict || "",
    province: MUNICIPALITY.englishProvince || "",
    country: "Nepal",

    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const required = [
      "applicantNameBody",
      "surname1",
      "applicantNameAgain",
      "surname2",
      "fatherName",
      "surname3",
      "surname4",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
      "designation",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone))) {
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
      alert("Please fill/validate field: " + v.missing);
      return;
    }
    setLoading(true);
    try {
      const payload = { ...formData };
      const res = await fetch(
        "/api/forms/surname-verification-certificate-new",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `Server returned ${res.status}`);
      }
      const body = await res.json();
      alert("Saved successfully (id: " + body.id + ")");
      setTimeout(() => window.print(), 250);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surname-verification-new-container">
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
            Subject: <u>Surname Verification Certificate</u>
          </strong>
          <br />
          <strong>
            <u>TO WHOM IT MAY CONCERN</u>
          </strong>
        </div>

        <p className="certificate-body">
          As per the application submitted by
          <select
            name="applicantTitle"
            value={formData.applicantTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input
            type="text"
            name="applicantNameBody"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
          />{" "}
          , to verify the family surname and this is verified that "
          <input
            type="text"
            name="surname1"
            value={formData.surname1}
            onChange={handleChange}
            required
          />{" "}
          " in the name of
          <input
            type="text"
            name="applicantNameAgain"
            value={formData.applicantNameAgain}
            onChange={handleChange}
            required
          />{" "}
          and there is "
          <input
            type="text"
            name="surname2"
            value={formData.surname2}
            onChange={handleChange}
            required
          />{" "}
          " in father's surname,
          <input
            type="text"
            name="surnameContext"
            value={formData.surnameContext}
            onChange={handleChange}
            required
          />{" "}
          "
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />{" "}
          ". However, it is verified that "
          <input
            type="text"
            name="surname3"
            value={formData.surname3}
            onChange={handleChange}
            required
          />{" "}
          " and "
          <input
            type="text"
            name="surname4"
            value={formData.surname4}
            onChange={handleChange}
            required
          />{" "}
          " are similar surnames and they are father and
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
          >
            <option>son</option>
            <option>daughter</option>
          </select>
          . It is requested to forward document without any hesitation.
        </p>

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

export default SurnameVerificationCertificateNew;
