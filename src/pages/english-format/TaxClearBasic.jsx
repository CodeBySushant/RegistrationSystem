import React, { useState } from "react";
import "./TaxClearBasic.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const TaxClearBasic = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "",
    applicantNameBody: "",
    residencyType: "Permanent/Temporary",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo: (MUNICIPALITY.wardNumber ?? 1).toString(),
    prevWardNo: "",
    district: MUNICIPALITY.englishDistrict,
    country: "Nepal",
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
      "residencyType",
      "municipality",
      "wardNo",
      "prevWardNo",
      "district",
      "country",
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
        "/api/forms/tax-clear-basic",
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
    <div className="tax-clear-basic-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader
            showLogo
            variant="english"
            showWardLine
            showCountry
          />
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
            Subject: <u>TAX CLEARANCE CERTIFICATE</u>
          </strong>
          <br />
          <strong>
            <u>TO WHOM IT MAY CONCERN</u>
          </strong>
        </div>

        <p className="certificate-body">
          As per the submission of documents required for the given application,
          this is to certify that
          <input
            type="text"
            name="applicantNameBody"
            placeholder="Applicant Name"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
            className="long-input"
          />
          ,
          <select
            name="residencyType"
            value={formData.residencyType}
            onChange={handleChange}
          >
            <option>Permanent/Temporary</option>
            <option>Permanent</option>
            <option>Temporary</option>
          </select>
          resident of
          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          >
            <option>{formData.municipality}</option>
          </select>
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option value={formData.wardNo}>{formData.wardNo}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          (previously Ward No.
          <input
            type="text"
            name="prevWardNo"
            placeholder="Prev. Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
            required
          />
          )
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
          , Nepal have paid all the taxes of properties, and annual income as
          per the rules of Nepal Government.
          <br />
          <br />
          As per the office record and our observation, there are no pending
          dues to be paid to this office till date.
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

export default TaxClearBasic;
