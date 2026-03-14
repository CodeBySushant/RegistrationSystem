import React, { useState } from "react";
import "./ScholarshipVerification.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const ScholarshipVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "grandson",
    guardianTitle: "Mr.",
    guardianName: "",
    residentOf: MUNICIPALITY.englishDistrict,
    district: MUNICIPALITY.englishDistrict,
    previouslyKnownAs: "",
    ward_number: "",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo2: "",
    annualIncome: "",
    pronounHeShe: "He",
    pronounHimHer: "him",
    pronounHisHer: "his",
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

    const handlePrint = async () => {
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const validate = () => {
    const required = [
      "applicantNameBody",
      "guardianName",
      "municipality",
      "annualIncome",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (let k of required) {
      if (!formData[k] || formData[k].toString().trim() === "")
        return { ok: false, missing: k };
    }
    // numeric check for annualIncome (loose) — allow commas/spaces
    const numStr = formData.annualIncome.toString().replace(/[, ]+/g, "");
    if (numStr === "" || Number.isNaN(Number(numStr)))
      return { ok: false, missing: "annualIncome (must be numeric)" };
    return { ok: true };
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
      const res = await axiosInstance.post(
        "/api/forms/scholarship-verification",
        formData
      );

      alert("Saved successfully (id: " + res.data.id + ")");
      window.print();
    } catch (err) {
      console.error("Submit error:", err);
      alert(err?.response?.data?.message || "Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scholarship-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo variant="english" showWardLine />
        </div>

        {/* meta */}
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
            Subject: <u>Scholarship Verification</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          With reference to the above and pursuant to the application of
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
            <option>grandson</option>
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
            placeholder="Guardian's Name"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
          , a resident of
          <input
            type="text"
            name="residentOf"
            value={formData.residentOf}
            onChange={handleChange}
          />{" "}
          District, previously known as
          <input
            type="text"
            name="previouslyKnownAs"
            value={formData.previouslyKnownAs}
            onChange={handleChange}
          />
          Ward No.
          <select
            name="ward_number"
            value={formData.ward_number}
            onChange={handleChange}
          >
            <option value={formData.ward_number}>{formData.ward_number}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          , currently known as
          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          >
            <option>{formData.municipality}</option>
          </select>
          , Ward No.
          <select
            name="wardNo2"
            value={formData.wardNo2}
            onChange={handleChange}
          >
            <option value={formData.wardNo2}>{formData.wardNo2}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          is recommended for the scholarship. {formData.pronounHeShe} belongs to
          a low-income family with annual income less than NPR
          <input
            type="text"
            name="annualIncome"
            placeholder="Amount"
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />{" "}
          only.
          <br />
          <br />I would like to wish {formData.pronounHimHer} best for{" "}
          {formData.pronounHisHer} future studies.
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

export default ScholarshipVerification;
