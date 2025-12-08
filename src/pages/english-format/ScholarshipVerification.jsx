import React, { useState } from "react";
import "./ScholarshipVerification.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";

const ScholarshipVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "",
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "grandson",
    guardianTitle: "Mr.",
    guardianName: "",
    residentOf: MUNICIPALITY.englishDistrict || "Kathmandu",
    district: MUNICIPALITY.englishDistrict || "Kathmandu",
    previouslyKnownAs: "",
    wardNo1: (MUNICIPALITY.wardNumber ?? 1).toString(),
    municipality: MUNICIPALITY.englishMunicipality || "Nagarjun Municipality",
    wardNo2: (MUNICIPALITY.wardNumber ?? 1).toString(),
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

  const validate = () => {
    const required = [
      "applicantNameBody",
      "guardianName",
      "wardNo2",
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
      const res = await fetch("/api/forms/scholarship-verification", {
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
    <div className="scholarship-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo variant="english" showWardLine />
        </div>

        {/* meta */}
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

        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>Subject: <u>Scholarship Verification</u></strong><br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          With reference to the above and pursuant to the application of
          <select name="applicantTitle" value={formData.applicantTitle} onChange={handleChange}>
            <option>Mr.</option><option>Mrs.</option><option>Ms.</option>
          </select>
          <input type="text" name="applicantNameBody" placeholder="Name" value={formData.applicantNameBody} onChange={handleChange} required />,
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>son</option><option>daughter</option><option>grandson</option>
          </select>
          of
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}><option>Mr.</option></select>
          <input type="text" name="guardianName" placeholder="Guardian's Name" value={formData.guardianName} onChange={handleChange} required />,
          a resident of
          <input type="text" name="residentOf" value={formData.residentOf} onChange={handleChange} /> District,
          previously known as
          <input type="text" name="previouslyKnownAs" value={formData.previouslyKnownAs} onChange={handleChange} />
          Ward No.
          <select name="wardNo1" value={formData.wardNo1} onChange={handleChange}><option value={formData.wardNo1}>{formData.wardNo1}</option><option>1</option><option>2</option><option>3</option></select>,
          currently known as
          <select name="municipality" value={formData.municipality} onChange={handleChange}>
            <option>{formData.municipality}</option>
          </select>,
          Ward No.
          <select name="wardNo2" value={formData.wardNo2} onChange={handleChange}><option value={formData.wardNo2}>{formData.wardNo2}</option><option>1</option><option>2</option><option>3</option></select>
          is recommended for the scholarship. {formData.pronounHeShe} belongs to a low-income family with annual income less than NPR
          <input type="text" name="annualIncome" placeholder="Amount" value={formData.annualIncome} onChange={handleChange} required /> only.
          <br/><br/>
          I would like to wish {formData.pronounHimHer} best for {formData.pronounHisHer} future studies.
        </p>

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
          <div className="form-group-column"><label>Applicant Name *</label><input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required /></div>
          <div className="form-group-column"><label>Applicant Address *</label><input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required /></div>
          <div className="form-group-column"><label>Applicant Citizenship Number *</label><input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required /></div>
          <div className="form-group-column"><label>Applicant Phone Number *</label><input type="tel" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required /></div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>{loading ? "Saving..." : "Save and Print Record"}</button>
        </div>
      </form>
    </div>
  );
};

export default ScholarshipVerification;
