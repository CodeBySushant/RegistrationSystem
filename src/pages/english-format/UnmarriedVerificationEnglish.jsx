import React, { useState } from "react";
import "./UnmarriedVerificationEnglish.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const UnmarriedVerification = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "0000/00",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "son",
    fatherTitle: "Mr.",
    fatherName: "",
    motherTitle: "Mrs.",
    motherName: "",
    docType: "Citizenship",
    docNo: "",
    residencyType: "permanent",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo1: user?.ward?.toString() || "",
    district1: MUNICIPALITY.englishDistrict,
    country1: "Nepal",
    prevDesignation: "",
    prevWardNo: "",
    prevDistrict: "",
    pronoun: "he",
    asOfDate: "", // let user pick
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
    // Only validate keys that actually exist and make sense.
    const required = [
      "applicantNameBody",
      "fatherName",
      "motherName",
      "docNo",
      "wardNo1",
      "asOfDate",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];

    for (let k of required) {
      if (!formData[k] || formData[k].toString().trim() === "") {
        return { ok: false, missing: k };
      }
    }

    // Loose phone validation: allow +, digits, spaces and -; between 6 and 20 chars
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
      alert("Please fill/validate required field: " + v.missing);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };

      const res = await axiosInstance.post(
        "/api/forms/unmarried-verification",
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
    <div className="unmarried-container">
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
            Subject: <u>Unmarried Verification</u>
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
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          >
            <option>son</option>
            <option>daughter</option>
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
          having
          <select
            name="docType"
            value={formData.docType}
            onChange={handleChange}
          >
            <option>Citizenship</option>
            <option>Birth Certificate</option>
          </select>
          no.
          <input
            type="text"
            name="docNo"
            placeholder="Document No."
            value={formData.docNo}
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
            <option>{formData.municipality}</option>
          </select>
          Ward No.
          <select
            name="wardNo1"
            value={formData.wardNo1}
            onChange={handleChange}
          >
            <option value={formData.wardNo1}>{formData.wardNo1}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
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
            name="country1"
            value={formData.country1}
            onChange={handleChange}
          />
          (Previously:
          <select
            name="prevDesignation"
            value={formData.prevDesignation}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="VDC">V.D.C</option>
            <option value="Municipality">Municipality</option>
          </select>
          Ward No.
          <input
            type="text"
            name="prevWardNo"
            placeholder="Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
          />
          ,
          <input
            type="text"
            name="prevDistrict"
            placeholder="District"
            value={formData.prevDistrict}
            onChange={handleChange}
          />
          , Nepal) has submitted an application for Marital Status Certificate
          and according to witnesses at ward level,
          <select
            name="pronoun"
            value={formData.pronoun}
            onChange={handleChange}
          >
            <option>he</option>
            <option>she</option>
          </select>
          has been found to be single in Marital Status as of
          <input
            type="date"
            name="asOfDate"
            value={formData.asOfDate}
            onChange={handleChange}
            required
          />{" "}
          A.D.
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

export default UnmarriedVerification;
