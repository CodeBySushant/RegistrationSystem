import React, { useState } from "react";
import "./AddressVerificationNew.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";

const AddressVerificationNew = () => {
  const [formData, setFormData] = useState({
    letterNo: "0000/00",
    refNo: "",
    date: "",

    // body/applicant name in sentence
    applicantNameBody: "",

    // old (pre-change)
    oldWardNo: MUNICIPALITY.wardNumber || "1",
    oldMunicipality: MUNICIPALITY.englishMunicipality || "",
    oldProvince: MUNICIPALITY.englishProvince || "",

    // new (post-change) — default to municipality config where sensible
    newMunicipality: MUNICIPALITY.englishMunicipality || "",
    newWardNo: MUNICIPALITY.wardNumber || "",
    newProvince: MUNICIPALITY.englishProvince || "",
    newCountry: "Nepal",

    decisionSource: "Council of Ministry",
    govSource: "Government of Nepal",
    decisionDate: "10th March, 2017",

    // final addresses (use municipality config)
    finalAddress1: "",
    finalAddress2: MUNICIPALITY.englishMunicipality || "Nagarjun Municipality",
    finalWardNo: MUNICIPALITY.wardNumber || "1",
    finalProvince: MUNICIPALITY.englishProvince || "Bagmati Province",
    finalCountry: "Nepal",

    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const required = [
      "applicantNameBody",
      "oldWardNo",
      "oldMunicipality",
      "oldProvince",
      "newMunicipality",
      "newWardNo",
      "newProvince",
      "newCountry",
      "decisionSource",
      "govSource",
      "decisionDate",
      "finalAddress1",
      "finalAddress2",
      "finalWardNo",
      "finalProvince",
      "finalCountry",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (let k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    // basic phone check
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone))) {
      return { ok: false, missing: "applicantPhone (invalid format)" };
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
      alert("Please fill/validate field: " + v.missing);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forms/address-verification-new", {
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
    <div className="address-verification-new-container">
      <form onSubmit={handleSubmit}>
        {/* Reusable header — English */}
        <div className="header">
          <MunicipalityHeader showLogo english />
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
            Subject: <u>VERIFICATION OF ADDRESS</u>
          </strong>
          <br />
          <strong>
            <u>TO WHOM IT MAY CONCERN</u>
          </strong>
        </div>

        <p className="certificate-body">
          This is to certify that
          <input
            type="text"
            name="applicantNameBody"
            placeholder="Applicant's Name"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
          />
          , Ward No.
          <input
            type="text"
            name="oldWardNo"
            value={formData.oldWardNo}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="oldMunicipality"
            placeholder="Old Municipality/VDC"
            value={formData.oldMunicipality}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="oldProvince"
            value={formData.oldProvince}
            onChange={handleChange}
            required
          />
          has been changed into
          <input
            type="text"
            name="newMunicipality"
            value={formData.newMunicipality}
            onChange={handleChange}
            required
          />
          , Ward No.
          <input
            type="text"
            name="newWardNo"
            placeholder="New Ward"
            value={formData.newWardNo}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="newProvince"
            placeholder="New Province"
            value={formData.newProvince}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="newCountry"
            value={formData.newCountry}
            onChange={handleChange}
            required
          />
          .
          <br />
          As per the decision of{" "}
          <input
            type="text"
            name="decisionSource"
            value={formData.decisionSource}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="govSource"
            value={formData.govSource}
            onChange={handleChange}
            required
          />{" "}
          on{" "}
          <input
            type="text"
            name="decisionDate"
            value={formData.decisionDate}
            onChange={handleChange}
            required
          />
          .
          <br />
          Thus, addresses{" "}
          <input
            type="text"
            name="finalAddress1"
            placeholder="Old Address"
            value={formData.finalAddress1}
            onChange={handleChange}
            required
          />{" "}
          and{" "}
          <input
            type="text"
            name="finalAddress2"
            value={formData.finalAddress2}
            onChange={handleChange}
            required
          />
          , Ward No.{" "}
          <input
            type="text"
            name="finalWardNo"
            value={formData.finalWardNo}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="finalProvince"
            value={formData.finalProvince}
            onChange={handleChange}
            required
          />
          ,{" "}
          <input
            type="text"
            name="finalCountry"
            value={formData.finalCountry}
            onChange={handleChange}
            required
          />{" "}
          represent the same place.
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

export default AddressVerificationNew;
