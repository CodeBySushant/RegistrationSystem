import React, { useState } from "react";
import "./DigitalVerification.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const DigitalVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "2025-10-31",
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "son",
    guardianTitle: "Mr.",
    guardianName: "",
    motherName: "",
    residencyType: "permanent",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo1: MUNICIPALITY.wardNumber.toString(),
    prevDesignation: "",
    prevWardNo: "",
    prevDistrict: "",
    district: MUNICIPALITY.englishDistrict,
    city: MUNICIPALITY.englishCity,
    country: "Nepal",
    purpose: "student visa",
    destination: "Australia",
    contactName: "",
    contactDesignation: "",
    contactNumber: "",
    contactEmail: "",
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
      "guardianName",
      "motherName",
      "village", // not present — ignore
      "contactName",
      "contactDesignation",
      "contactNumber",
      "contactEmail",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    // We only test required fields that exist in state
    const check = [
      "applicantNameBody",
      "guardianName",
      "motherName",
      "contactName",
      "contactDesignation",
      "contactNumber",
      "contactEmail",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (let k of check) {
      if (!formData[k] || formData[k].toString().trim() === "")
        return { ok: false, missing: k };
    }
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) {
      alert("Please fill required field: " + v.missing);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forms/digital-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `Server returned ${res.status}`);
      }
      const body = await res.json();
      alert("Saved successfully (id: " + body.id + ")");
      window.print();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="digital-verification-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader
            showLogo
            variant="english"
            showWardLine
            showCountry
          />
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
            Subject: <u>DIGITAL VERIFICATION CERTIFICATE</u>
          </strong>
          <br />
          <strong>
            <u>TO WHOM IT MAY CONCERN</u>
          </strong>
        </div>

        <p className="certificate-body">
          This is to certify that all the documents provided by our office to
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
            placeholder="Name"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
          />
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
            name="guardianTitle"
            value={formData.guardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="guardianName"
            placeholder="Father's Name"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
          and
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={formData.motherName}
            onChange={handleChange}
            required
          />
          , a
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
            <option>{MUNICIPALITY.englishMunicipality}</option>
          </select>
          , Ward No.
          <select
            name="wardNo1"
            value={formData.wardNo1}
            onChange={handleChange}
          >
            <option value={MUNICIPALITY.wardNumber.toString()}>
              {MUNICIPALITY.wardNumber}
            </option>
          </select>
          (Previously
          <input
            type="text"
            name="prevDesignation"
            placeholder="e.g., VDC"
            value={formData.prevDesignation}
            onChange={handleChange}
          />
          Ward No.
          <input
            type="text"
            name="prevWardNo"
            placeholder="Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
          />
          ,{" "}
          <input
            type="text"
            name="prevDistrict"
            placeholder="District"
            value={formData.prevDistrict}
            onChange={handleChange}
          />
          ),
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
          ,
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          ,
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />{" "}
          for the purpose of
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />{" "}
          for
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />{" "}
          are genuine and authentic. If you have any inquiry, contact:
        </p>

        <div className="contact-details-inline">
          <div className="contact-row">
            <label>Name: *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-row">
            <label>Designation: *</label>
            <input
              type="text"
              name="contactDesignation"
              value={formData.contactDesignation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-row">
            <label>Contact Number: *</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-row">
            <label>Email: *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
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

        <div className="applicant-details">
          <h3>Applicant Details</h3>
          <div className="form-group-column">
            <label>Applicant Name *</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-column">
            <label>Applicant Address *</label>
            <input
              type="text"
              name="applicantAddress"
              value={formData.applicantAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-column">
            <label>Applicant Citizenship Number *</label>
            <input
              type="text"
              name="applicantCitizenship"
              value={formData.applicantCitizenship}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-column">
            <label>Applicant Phone Number *</label>
            <input
              type="tel"
              name="applicantPhone"
              value={formData.applicantPhone}
              onChange={handleChange}
              required
            />
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

export default DigitalVerification;
