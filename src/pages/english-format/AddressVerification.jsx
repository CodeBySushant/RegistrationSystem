import React, { useState } from "react";
import "./AddressVerification.css";

// NEW imports
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import axiosInstance from "../../utils/axiosInstance";

const AddressVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    govLocation: "",
    oldWardNo: "",
    // 🔹 Defaults now from MUNICIPALITY config
    newWardNo: "",
    newMunicipality: MUNICIPALITY.englishMunicipality || "",
    newDistrict: MUNICIPALITY.englishDistrict || "",
    newProvince: MUNICIPALITY.englishProvince || "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const required = [
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
      "designation",
    ];
    for (let k of required) {
      if (!formData[k] || formData[k].toString().trim() === "") {
        return { ok: false, missing: k };
      }
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
      alert(`Please fill required field: ${v.missing}`);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };

      const res = await axiosInstance.post(
        "/api/forms/address-verification",
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
    <div className="address-container">
      <form onSubmit={handleSubmit}>
        {/* 🔁 Replaced old hardcoded header with reusable component */}
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
            Subject: <u>Address Verification</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          This is to certify that according to the ministry level meeting of
          Nepal Government,
          <input
            className="inline-input"
            type="text"
            name="govLocation"
            placeholder="Location"
            value={formData.govLocation}
            onChange={handleChange}
            required
          />{" "}
          Ward No.
          <input
            className="inline-input small"
            type="text"
            name="oldWardNo"
            placeholder="Old Ward"
            value={formData.oldWardNo}
            onChange={handleChange}
            required
          />{" "}
          Nepal has been changed to Ward No.
          <select
            name="newWardNo"
            value={formData.newWardNo}
            onChange={handleChange}
          >
            {/* you can expand this as needed */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>{" "}
          <input
            className="inline-input"
            type="text"
            name="newMunicipality"
            value={formData.newMunicipality}
            onChange={handleChange}
          />
          ,{" "}
          <input
            className="inline-input"
            type="text"
            name="newDistrict"
            value={formData.newDistrict}
            onChange={handleChange}
          />
          ,{" "}
          <input
            className="inline-input"
            type="text"
            name="newProvince"
            value={formData.newProvince}
            onChange={handleChange}
          />
          . All of the addresses are same and does not make any difference using
          any of them.
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

export default AddressVerification;
