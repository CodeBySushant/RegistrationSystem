import React, { useState } from "react";
import "./RelationshipVerificationEnglish.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const RelationshipVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    mainPersonTitle: "Mr.",
    mainPersonName: "",
    relation: "grandson",
    grandTitle: "Mr.",
    grandsName: "",
    fatherTitle: "Mr.",
    fatherName: "",
    motherRelation: "son",
    motherTitle: "Mrs.",
    motherName: "",
    residencyType: "Permanent",
    municipality: MUNICIPALITY.englishMunicipality,
    ward_number: "",
    district1: MUNICIPALITY.englishDistrict,
    country1: "Nepal",
    prevWardNo: "",
    prevDistrict: MUNICIPALITY.englishProvince,
    prevCountry: "Nepal",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [relatives, setRelatives] = useState([
    { id: 1, title: "Mr.", name: "", relation: "Grandfather" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelativeChange = (index, e) => {
    const { name, value } = e.target;
    setRelatives((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const handlePrint = async () => {
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const addRelative = () => {
    setRelatives((prev) => [
      ...prev,
      { id: prev.length + 1, title: "Mr.", name: "", relation: "" },
    ]);
  };

  const validate = () => {
    const required = [
      "mainPersonName",
      "fatherName",
      "motherName",
      "ward_number",
      "district1",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];

    for (let k of required) {
      if (String(formData[k] ?? "").trim() === "") {
        return { ok: false, missing: k };
      }
    }

    const okRel = relatives.some((r) => String(r?.name ?? "").trim() !== "");

    if (!okRel) {
      return { ok: false, missing: "relative (at least one with name)" };
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
      const payload = { ...formData, table_rows: relatives };

      const res = await axiosInstance.post(
        "/api/forms/relationship-verification",
        payload
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
    <div className="verification-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo variant="english" showWardLine />
        </div>

        {/* top meta */}
        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              readOnly
              className="readonly-input"
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

        {/* ref */}
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
            Subject: <u>Relationship Verification</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        {/* certificate body (condensed markup) */}
        <p className="certificate-body">
          This is to certify that
          <select
            name="mainPersonTitle"
            value={formData.mainPersonTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Ms.</option>
          </select>
          <input
            type="text"
            name="mainPersonName"
            placeholder="Full Name"
            value={formData.mainPersonName}
            onChange={handleChange}
            required
          />
          ,
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          >
            <option>grandson</option>
            <option>granddaughter</option>
            <option>daughter-in-law</option>
            <option>granddaughter-in-law</option>
            <option>grandson-in-law</option>
            <option>son-in-law</option>
            <option>wife</option>
            <option>husband</option>
            <option>father-in-law</option>
            <option>mother-in-law</option>
            <option>grandfather-in-law</option>
            <option>grandmother-in-law</option>
            <option>son</option>
            <option>daughter</option>
            <option>niece-in-law</option>
          </select>
          of
          <select
            name="grandTitle"
            value={formData.grandTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Ms.</option>
          </select>
          <input
            type="text"
            name="grandsName"
            value={formData.grandsName}
            onChange={handleChange}
            required
          />
          ,
          <select
            name="motherRelation"
            value={formData.motherRelation}
            onChange={handleChange}
          >
            <option>son</option>
            <option>daughter</option>
            <option>daughter-in-law</option>
            <option>granddaughter</option>
            <option>grandson</option>
            <option>grandson-in-law</option>
            <option>granddaughter-in-law</option>
            <option>wife</option>
            <option>husband</option>
            <option>father-in-law</option>
            <option>mother-in-law</option>
          </select>
          of Mr
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
          <span className="inline-text">and Mrs.</span>
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={formData.motherName}
            onChange={handleChange}
            className="inline-input"
            required
          />
          ,
          <select
            name="residencyType"
            value={formData.residencyType}
            onChange={handleChange}
          >
            <option>Permanent</option>
            <option>Temporary</option>
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
          <input
            type="text"
            name="ward_number"
            value={formData.ward_number}
            onChange={handleChange}
            placeholder="Ward No."
            required
          />
          ,
          <input
            type="text"
            name="district1"
            value={formData.district1}
            onChange={handleChange}
          />{" "}
          District, {formData.country1}
          (Previously: Ward No.
          <input
            type="text"
            name="prevWardNo"
            value={formData.prevWardNo}
            onChange={handleChange}
            required
          />{" "}
          ,
          <select
            name="prevDistrict"
            value={formData.prevDistrict}
            onChange={handleChange}
          >
            <option>{MUNICIPALITY.englishProvince}</option>
            <option>Koshi Province</option>
            <option>Madhesh Province</option>
            <option>Bagmati Province</option>
            <option>Gandaki Province</option>
            <option>Lumbini Province</option>
            <option>Karnali Province</option>
            <option>Sudurpashchim Province</option>
          </select>
          District,{" "}
          <input
            type="text"
            name="prevCountry"
            value={formData.prevCountry}
            onChange={handleChange}
          />{" "}
          ). This certificate is issued according to Section 12, Sub-Section 2
          (E) (1) of Local Government Operation Act 2074 B.S. (2017 A.D.) As per
          the application proceeded in this office following members are the
          relatives of the applicant as mentioned below.
        </p>

        {/* relatives table */}
        <table className="relatives-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Relative's Name</th>
              <th>Relation with Applicant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {relatives.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>
                  <select
                    name="title"
                    value={r.title}
                    onChange={(e) => handleRelativeChange(i, e)}
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Miss.</option>
                    <option>Ms.</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={r.name}
                    onChange={(e) => handleRelativeChange(i, e)}
                    required
                  />
                </td>
                <td>
                  <select
                    name="relation"
                    value={r.relation}
                    onChange={(e) => handleRelativeChange(i, e)}
                  >
                    <option>Grandfather</option>
                    <option>Grandmother</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Uncle</option>
                    <option>Aunt</option>
                    <option>Sister</option>
                    <option>Brother</option>
                    <option>Cousin</option>
                    <option>Niece</option>
                  </select>
                </td>
                <td>
                  {i === relatives.length - 1 && (
                    <button
                      type="button"
                      onClick={addRelative}
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
            <option value="Acting-Ward-Secretary">Act. Ward Chairperson</option>
          </select>
        </div>

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

export default RelationshipVerification;
