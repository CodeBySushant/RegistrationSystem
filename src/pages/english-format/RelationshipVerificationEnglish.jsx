import React, { useState } from "react";
import "./RelationshipVerificationEnglish.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const RelationshipVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "2025-10-31",
    mainPersonTitle: "Mr.",
    mainPersonName: "",
    relation: "grandson",
    fatherTitle: "Mr.",
    fatherName: "",
    motherRelation: "son",
    motherTitle: "Mrs.",
    motherName: "",
    mrsName: "",
    residencyType: "Permanent",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo1: (MUNICIPALITY.wardNumber ?? 1).toString(),
    district1: MUNICIPALITY.englishDistrict,
    country1: MUNICIPALITY.englishCountry,
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

  const addRelative = () => {
    setRelatives((prev) => [...prev, { id: prev.length + 1, title: "Mr.", name: "", relation: "" }]);
  };

  const validate = () => {
    const required = [
      "mainPersonName", "fatherName", "motherName", "mrsName",
      "wardNo1", "district1", "designation",
      "applicantName", "applicantAddress", "applicantCitizenship", "applicantPhone"
    ];
    for (let k of required) {
      if (!formData[k] || formData[k].toString().trim() === "") return { ok: false, missing: k };
    }
    // at least one relative name
    const okRel = relatives.some(r => r.name && r.name.toString().trim() !== "");
    if (!okRel) return { ok: false, missing: "relative (at least one with name)" };
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) { alert("Please fill required field: " + v.missing); return; }

    setLoading(true);
    try {
      const payload = { ...formData, table_rows: relatives };
      const res = await fetch("/api/forms/relationship-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>null);
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
    <div className="verification-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo variant="english" showWardLine />
        </div>

        {/* top meta */}
        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        {/* ref */}
        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>Subject: <u>Relationship Verification</u></strong><br/>
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        {/* certificate body (condensed markup) */}
        <p className="certificate-body">
          This is to certify that
          <select name="mainPersonTitle" value={formData.mainPersonTitle} onChange={handleChange}><option>Mr.</option><option>Mrs.</option><option>Ms.</option></select>
          <input type="text" name="mainPersonName" placeholder="Full Name" value={formData.mainPersonName} onChange={handleChange} required />,
          <select name="relation" value={formData.relation} onChange={handleChange}><option>son</option><option>daughter</option><option>grandson</option><option>granddaughter</option></select>
          of
          <select name="fatherTitle" value={formData.fatherTitle} onChange={handleChange}><option>Mr.</option></select>
          <input type="text" name="fatherName" placeholder="Father's/Grandfather's Name" value={formData.fatherName} onChange={handleChange} required />,
          <select name="motherRelation" value={formData.motherRelation} onChange={handleChange}><option>son</option><option>daughter</option></select>
          of
          <select name="motherTitle" value={formData.motherTitle} onChange={handleChange}><option>Mrs.</option><option>Ms.</option></select>
          <input type="text" name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required />
          and Mrs.
          <input type="text" name="mrsName" value={formData.mrsName} onChange={handleChange} required />,
          <select name="residencyType" value={formData.residencyType} onChange={handleChange}><option>Permanent</option><option>Temporary</option></select>
          resident of
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>{MUNICIPALITY.englishMunicipality || "Nagarjun Municipality"}</option>
          </select>
          , Ward No.
          <select name="wardNo1" value={formData.wardNo1} onChange={handleChange}>
            <option value={(MUNICIPALITY.wardNumber ?? 1).toString()}>{MUNICIPALITY.wardNumber ?? 1}</option>
            <option>1</option><option>2</option><option>3</option>
          </select>,
          <input type="text" name="district1" value={formData.district1} onChange={handleChange} /> District, {formData.country1}
          (Previously: Ward No.
          <input type="text" name="prevWardNo" value={formData.prevWardNo} onChange={handleChange} required /> ,
          <select name="prevDistrict" value={formData.prevDistrict} onChange={handleChange}>
            <option>{MUNICIPALITY.englishProvince || "Koshi Province"}</option>
            <option>Bagmati Province</option>
            <option>Gandaki Province</option>
          </select>
          District, <input type="text" name="prevCountry" value={formData.prevCountry} onChange={handleChange} /> ). This certificate is issued according to Section 12...
        </p>

        {/* relatives table */}
        <table className="relatives-table">
          <thead>
            <tr><th>SN</th><th>Title</th><th>Relative's Name</th><th>Relation with Applicant</th><th>Action</th></tr>
          </thead>
          <tbody>
            {relatives.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>
                  <select name="title" value={r.title} onChange={(e) => handleRelativeChange(i, e)}><option>Mr.</option><option>Mrs.</option><option>Ms.</option></select>
                </td>
                <td><input type="text" name="name" value={r.name} onChange={(e) => handleRelativeChange(i, e)} required /></td>
                <td>
                  <select name="relation" value={r.relation} onChange={(e) => handleRelativeChange(i, e)}>
                    <option>Grandfather</option><option>Grandmother</option><option>Father</option><option>Mother</option><option>Son</option><option>Daughter</option>
                  </select>
                </td>
                <td>{i === relatives.length - 1 && <button type="button" onClick={addRelative} className="add-btn">+</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        <div className="applicant-details">
          <h3>Applicant Details</h3>
          <div className="form-group"><label>Applicant Name *</label><input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required /></div>
          <div className="form-group"><label>Applicant Address *</label><input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required /></div>
          <div className="form-group"><label>Applicant Citizenship Number *</label><input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required /></div>
          <div className="form-group"><label>Applicant Phone Number *</label><input type="tel" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required /></div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>{loading ? "Saving..." : "Save and Print Record"}</button>
        </div>
      </form>
    </div>
  );
};

export default RelationshipVerification;
