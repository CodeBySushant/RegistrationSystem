import React, { useState } from "react";
import "./CertificateofOccupation.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const FORM_KEY = "certificate-of-occupation";
const API_URL = `/api/forms/${FORM_KEY}`;

const CertificateOfOccupation = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "",
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "Son",
    fatherTitle: "Mr.",
    fatherName: "",
    motherTitle: "Mrs.",
    motherName: "",
    residencyType: "permanent",

    // 🔹 From config instead of hard-coded
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo: MUNICIPALITY.wardNumber.toString(),
    district: MUNICIPALITY.englishDistrict,
    country: "Nepal",

    applicantNameAgain: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [occupations, setOccupations] = useState([
    {
      id: 1,
      ownerTitle: "Mr.",
      ownerName: "",
      relationship: "",
      occupation: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOccupationChange = (index, e) => {
    const { name, value } = e.target;
    setOccupations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addOccupationRow = () => {
    setOccupations((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ownerTitle: "Mr.",
        ownerName: "",
        relationship: "",
        occupation: "",
      },
    ]);
  };

  const validate = () => {
    const requiredMain = [
      "applicantNameAgain",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (let k of requiredMain) {
      if (!formData[k] || formData[k].toString().trim() === "") {
        return { ok: false, missing: k };
      }
    }
    // At least one occupation row must have ownerName and occupation
    const hasValidRow = occupations.some((r) => r.ownerName && r.occupation);
    if (!hasValidRow) {
      return { ok: false, missing: "occupation row (ownerName & occupation)" };
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
      const payload = { ...formData, table_rows: occupations };
      const res = await axiosInstance.post(
        "/api/forms/certificate-of-occupation",
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
    <div className="certificate-of-occupation-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          {/* 🔹 Reusable header driven by config */}
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
            Subject: <u>Certificate Of Occupation</u>
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
          and
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
            <option>{MUNICIPALITY.englishMunicipality}</option>
          </select>
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option value={MUNICIPALITY.wardNumber.toString()}>
              {MUNICIPALITY.wardNumber}
            </option>
          </select>
          ,
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
          ,
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          .
          <br />
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
            name="applicantNameAgain"
            placeholder="Applicant Name"
            value={formData.applicantNameAgain}
            onChange={handleChange}
            required
          />
          has been involving in following occupations.
        </p>

        <table className="occupations-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Owner's Name</th>
              <th>Relationship with Applicant</th>
              <th>Occupation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {occupations.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td className="owner-name-cell">
                  <select
                    name="ownerTitle"
                    value={item.ownerTitle}
                    onChange={(e) => handleOccupationChange(idx, e)}
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                  <input
                    type="text"
                    name="ownerName"
                    value={item.ownerName}
                    onChange={(e) => handleOccupationChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="relationship"
                    value={item.relationship}
                    onChange={(e) => handleOccupationChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="occupation"
                    value={item.occupation}
                    onChange={(e) => handleOccupationChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  {idx === occupations.length - 1 && (
                    <button
                      type="button"
                      onClick={addOccupationRow}
                      className="add-btn"
                    >
                      +
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default CertificateOfOccupation;
