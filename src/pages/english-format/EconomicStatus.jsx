import React, { useState } from "react";
import "./EconomicStatus.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const EconomicStatus = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "Grand Son",
    grandFatherTitle: "Mr.",
    grandFatherName: "",
    sonOfTitle: "Mr.",
    sonOfName: "",
    motherTitle: "Mrs.",
    motherName: "",
    residencyType: "permanent",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo: (MUNICIPALITY.wardNumber ?? 1).toString(),
    district1: MUNICIPALITY.englishDistrict,
    province: MUNICIPALITY.englishProvince,
    country: "Nepal",
    retiredFrom: "",
    retirementDateBS: "",
    retirementDateAD: "",
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
      "grandFatherName",
      "sonOfName",
      "motherName",
      "retiredFrom",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
      "designation",
    ];
    for (let k of required) {
      if (!formData[k] || formData[k].toString().trim() === "")
        return { ok: false, missing: k };
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
      alert("Please fill required field: " + v.missing);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/api/forms/economic-status",
        payload
      );
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
    <div className="economic-status-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo variant="english" showWardLine />
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
            Subject: <u>Economic Status Verification</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          This is to certify that
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
            <option>Grand Son</option>
            <option>Son</option>
            <option>Daughter</option>
            <option>Grand Daughter</option>
          </select>
          of
          <select
            name="grandFatherTitle"
            value={formData.grandFatherTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="grandFatherName"
            placeholder="Grandfather's Name"
            value={formData.grandFatherName}
            onChange={handleChange}
            required
          />
          , Son of
          <select
            name="sonOfTitle"
            value={formData.sonOfTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="sonOfName"
            placeholder="Father's Name"
            value={formData.sonOfName}
            onChange={handleChange}
            required
          />
          &
          <select
            name="motherTitle"
            value={formData.motherTitle}
            onChange={handleChange}
          >
            <option>Mrs.</option>
          </select>
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={formData.motherName}
            onChange={handleChange}
            required
          />
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
            <option value={(MUNICIPALITY.wardNumber ?? 1).toString()}>
              {MUNICIPALITY.wardNumber ?? 1}
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          ,
          <input
            type="text"
            name="district1"
            value={formData.district1}
            onChange={handleChange}
          />{" "}
          ,
          <input
            type="text"
            name="district2"
            value={formData.district2}
            onChange={handleChange}
          />{" "}
          District,
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
          ,{" "}
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          was retired from
          <input
            type="text"
            name="retiredFrom"
            placeholder="Organization"
            value={formData.retiredFrom}
            onChange={handleChange}
            required
          />
          . Nowadays, his economic status is not good. According to his
          self-declaration and witness at the ward level, he is alive till
          <input
            type="text"
            name="retirementDateBS"
            value={formData.retirementDateBS}
            onChange={handleChange}
          />{" "}
          B.S. (
          <input
            type="date"
            name="retirementDateAD"
            value={formData.retirementDateAD}
            onChange={handleChange}
          />{" "}
          A.D.).
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

export default EconomicStatus;
