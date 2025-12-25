import React, { useState } from "react";
import "./SamePersonCertificate.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const SamePersonCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "2025-10-31",
    applicantTitle: "Mr.",
    applicantNameBody: "",
    applicantRelation: "Son",
    applicantGuardianTitle: "Mr.",
    applicantGuardianName: "",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo: (MUNICIPALITY.wardNumber ?? 1).toString(),
    district: MUNICIPALITY.englishDistrict,
    province: MUNICIPALITY.englishProvince,
    doc1Source: "",
    doc1NameTitle: "Mr.",
    doc1Name: "",
    doc2Source: "",
    doc2NameTitle: "Mr.",
    doc2Name: "",
    doc2Relation: "Son",
    doc2GuardianTitle: "Mr.",
    doc2GuardianName: "",
    doc3Source: "",
    doc4Source: "",
    doc4NameTitle: "Mr.",
    doc4Name: "",
    doc4Relation: "Son",
    doc4GuardianTitle: "Mr.",
    doc4GuardianName: "",
    finalName1Title: "Mr.",
    finalName1: "",
    finalName2Title: "Mr.",
    finalName2: "",
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
      "applicantGuardianName",
      "wardNo",
      "district",
      "province",
      "doc1Source",
      "doc1Name",
      "doc2Source",
      "doc2Name",
      "doc2GuardianName",
      "doc3Source",
      "doc4Source",
      "doc4Name",
      "doc4GuardianName",
      "finalName1",
      "finalName2",
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
        "/api/forms/same-person-certificate",
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
    <div className="same-person-container">
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
            Subject: <u>Same Person Certificate</u>
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
            name="applicantRelation"
            value={formData.applicantRelation}
            onChange={handleChange}
          >
            <option>Son</option>
            <option>Daughter</option>
            <option>Grandson</option>
          </select>
          of
          <select
            name="applicantGuardianTitle"
            value={formData.applicantGuardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="applicantGuardianName"
            placeholder="Guardian's Name"
            value={formData.applicantGuardianName}
            onChange={handleChange}
            required
          />
          , is permanent resident of
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          ,
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />{" "}
          District,
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />{" "}
          , Nepal.
        </p>

        <p className="certificate-body">
          His name according to
          <input
            type="text"
            name="doc1Source"
            placeholder="Doc 1"
            value={formData.doc1Source}
            onChange={handleChange}
            required
          />
          is
          <select
            name="doc1NameTitle"
            value={formData.doc1NameTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="doc1Name"
            placeholder="Name 1"
            value={formData.doc1Name}
            onChange={handleChange}
            required
          />
          and
          <input
            type="text"
            name="doc2Source"
            placeholder="Doc 2"
            value={formData.doc2Source}
            onChange={handleChange}
            required
          />
          is
          <select
            name="doc2NameTitle"
            value={formData.doc2NameTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="doc2Name"
            placeholder="Name 2"
            value={formData.doc2Name}
            onChange={handleChange}
            required
          />
          ({" "}
          <select
            name="doc2Relation"
            value={formData.doc2Relation}
            onChange={handleChange}
          >
            <option>Son</option>
          </select>
          of
          <select
            name="doc2GuardianTitle"
            value={formData.doc2GuardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="doc2GuardianName"
            placeholder="Name 2's Father"
            value={formData.doc2GuardianName}
            onChange={handleChange}
            required
          />{" "}
          ).
        </p>

        <p className="certificate-body">
          Mentioned in
          <input
            type="text"
            name="doc3Source"
            placeholder="Doc 3"
            value={formData.doc3Source}
            onChange={handleChange}
            required
          />
          and in
          <input
            type="text"
            name="doc4Source"
            placeholder="Doc 4"
            value={formData.doc4Source}
            onChange={handleChange}
            required
          />
          is
          <select
            name="doc4NameTitle"
            value={formData.doc4NameTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="doc4Name"
            placeholder="Name 3"
            value={formData.doc4Name}
            onChange={handleChange}
            required
          />
          ({" "}
          <select
            name="doc4Relation"
            value={formData.doc4Relation}
            onChange={handleChange}
          >
            <option>Son</option>
          </select>
          of
          <select
            name="doc4GuardianTitle"
            value={formData.doc4GuardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="doc4GuardianName"
            placeholder="Name 3's Father"
            value={formData.doc4GuardianName}
            onChange={handleChange}
            required
          />{" "}
          ) both are the same person.
        </p>

        <p className="certificate-body summary-line">
          So, this is certified that the name
          <select
            name="finalName1Title"
            value={formData.finalName1Title}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="finalName1"
            placeholder="Name 1"
            value={formData.finalName1}
            onChange={handleChange}
            required
          />
          and
          <select
            name="finalName2Title"
            value={formData.finalName2Title}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="finalName2"
            placeholder="Name 2"
            value={formData.finalName2}
            onChange={handleChange}
            required
          />
          stand for the same person.
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

export default SamePersonCertificate;
