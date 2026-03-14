import React, { useState } from "react";
import "./OccupationVerification.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const OccupationVerification = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "2197/60",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "Son",
    fatherTitle: "Mr.",
    fatherName: "",
    motherTitle: "Mrs.",
    motherName: "",
    residencyType: "Permanent",
    wardNo: user?.ward?.toString() || "",
    municipality: MUNICIPALITY.englishMunicipality || "",
    district: MUNICIPALITY.englishDistrict || "",
    province: MUNICIPALITY.englishProvince || "",
    prevVDC: "",
    prevWardNo: "",
    prevDistrict: "",
    occupation: "",
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
      "motherName",
      "occupation",
      "designation",
      "wardNo",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
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
      const payload = { ...formData };

      const res = await axiosInstance.post(
        "/api/forms/occupation-verification",
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
    <div className="occupation-container">
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
            Subject: <u>Occupation Verification</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          As per the record of the office, it is hereby certified that
          <select
            name="applicantTitle"
            value={formData.applicantTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss.</option>
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
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          >
            <option>Son</option>
            <option>Daughter</option>
          </select>
          of
          <select
            name="fatherTitle"
            value={formData.fatherTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
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
          , a
          <select
            name="residencyType"
            value={formData.residencyType}
            onChange={handleChange}
          >
            <option>Permanent</option>
            <option>Temporary</option>
          </select>
          resident of Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          ,
          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          >
            <option>{MUNICIPALITY.englishMunicipality}</option>
          </select>
          ,
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />{" "}
          District (Previously known as
          <input
            type="text"
            name="prevVDC"
            placeholder="V.D.C"
            value={formData.prevVDC}
            onChange={handleChange}
          />
          ward no
          <input
            type="text"
            name="prevWardNo"
            placeholder="Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="prevDistrict"
            placeholder="District"
            value={formData.prevDistrict}
            onChange={handleChange}
          />{" "}
          District Nepal) is involved in
          <input
            type="text"
            name="occupation"
            placeholder="Occupation details"
            value={formData.occupation}
            onChange={handleChange}
            required
            className="long-input"
          />
          .
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

export default OccupationVerification;
