import React, { useState } from "react";
import "./MarriageCertificateEnglish.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const MarriageCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    groomTitle: "Mr.",
    groomName: "",
    groomRelation: "grandson",
    groomGuardianTitle: "Mr.",
    groomGuardianName: "",
    groomMotherTitle: "Mrs.",
    groomMotherName: "",
    residencyType: "permanent",
    municipality: MUNICIPALITY.englishMunicipality || "Nagarjun Municipality",
    wardNo1: (MUNICIPALITY.wardNumber ?? 1).toString(),
    prevDesignation: "ward no",
    prevWardNo: "",
    prevDistrict: MUNICIPALITY.englishDistrict || "Kathmandu",
    district: MUNICIPALITY.englishProvince || "Bagmati Province",
    brideTitle: "Miss.",
    brideName: "",
    brideRelation: "granddaughter",
    brideGuardianTitle: "Mr.",
    brideGuardianName: "",
    brideMotherTitle: "Mrs.",
    brideMotherName: "",
    marriageDateBS: "2082-07-15",
    marriageDateAD: "2025-11-01",
    groomCitizenship: "",
    brideCitizenship: "",
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
      "groomName",
      "groomGuardianName",
      "groomMotherName",
      "brideName",
      "brideGuardianName",
      "brideMotherName",
      "marriageDateBS",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
      "designation",
      "groomCitizenship",
      "brideCitizenship",
    ];
    for (let k of required) {
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
      const res = await axiosInstance.post(
        "/api/forms/marriage-certificate",
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

  const handlePrint = async () => {
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="marriage-certificate-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo />
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
            Subject: <u>Marriage Certificate</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <select
            name="groomTitle"
            value={formData.groomTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input
            type="text"
            name="groomName"
            placeholder="Groom's Name"
            value={formData.groomName}
            onChange={handleChange}
            required
          />
          ,
          <select
            name="groomRelation"
            value={formData.groomRelation}
            onChange={handleChange}
          >
            <option>grandson</option>
            <option>son</option>
          </select>
          of
          <select
            name="groomGuardianTitle"
            value={formData.groomGuardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="groomGuardianName"
            placeholder="Father/Grandfather's Name"
            value={formData.groomGuardianName}
            onChange={handleChange}
            required
          />
          and
          <select
            name="groomMotherTitle"
            value={formData.groomMotherTitle}
            onChange={handleChange}
          >
            <option>Mrs.</option>
          </select>
          <input
            type="text"
            name="groomMotherName"
            placeholder="Groom's Mother's Name"
            value={formData.groomMotherName}
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
            <option>Nagarjun Municipality</option>
          </select>
          , Ward No.
          <select
            name="wardNo1"
            value={formData.wardNo1}
            onChange={handleChange}
          >
            <option value={(MUNICIPALITY.wardNumber ?? 1).toString()}>
              {MUNICIPALITY.wardNumber ?? 1}
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          , (Previously
          <select
            name="prevDesignation"
            value={formData.prevDesignation}
            onChange={handleChange}
          >
            <option>ward no</option>
            <option>VDC</option>
          </select>
          <input
            type="text"
            name="prevWardNo"
            placeholder="Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
          />
          ),
          <input
            type="text"
            name="prevDistrict"
            value={formData.prevDistrict}
            onChange={handleChange}
          />{" "}
          ,{" "}
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
          , Nepal is married to
          <select
            name="brideTitle"
            value={formData.brideTitle}
            onChange={handleChange}
          >
            <option>Miss.</option>
            <option>Mrs.</option>
          </select>
          <input
            type="text"
            name="brideName"
            placeholder="Bride's Name"
            value={formData.brideName}
            onChange={handleChange}
            required
          />
          ,
          <select
            name="brideRelation"
            value={formData.brideRelation}
            onChange={handleChange}
          >
            <option>granddaughter</option>
            <option>daughter</option>
          </select>
          of
          <select
            name="brideGuardianTitle"
            value={formData.brideGuardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="brideGuardianName"
            placeholder="Father/Grandfather's Name"
            value={formData.brideGuardianName}
            onChange={handleChange}
            required
          />
          and
          <select
            name="brideMotherTitle"
            value={formData.brideMotherTitle}
            onChange={handleChange}
          >
            <option>Mrs.</option>
          </select>
          <input
            type="text"
            name="brideMotherName"
            placeholder="Bride's Mother's Name"
            value={formData.brideMotherName}
            onChange={handleChange}
            required
          />
          , dated on
          <input
            type="text"
            name="marriageDateBS"
            value={formData.marriageDateBS}
            onChange={handleChange}
          />{" "}
          B.S. (
          <input
            type="date"
            name="marriageDateAD"
            value={formData.marriageDateAD}
            onChange={handleChange}
          />{" "}
          A.D.), according to their social custom.
        </p>

        <div className="citizenship-fields">
          <div className="form-group-inline">
            <label>Groom's Citizenship No.: *</label>
            <input
              type="text"
              name="groomCitizenship"
              value={formData.groomCitizenship}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-inline">
            <label>Bride's Citizenship No.: *</label>
            <input
              type="text"
              name="brideCitizenship"
              value={formData.brideCitizenship}
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

export default MarriageCertificate;
