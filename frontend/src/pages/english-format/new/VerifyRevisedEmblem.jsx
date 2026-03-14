// src/pages/english-format/new/VerifyRevisedEmblem.jsx
import React, { useState } from "react";
import "./VerifyRevisedEmblem.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

const VerifyRevisedEmblem = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "1970/60",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),

    billName: "",
    amendmentName: "",
    mapLocation: "",

    villageName: "",
    stampMunicipality: MUNICIPALITY.englishMunicipality || "",
    stampWardNo: "",

    provinceNameLetterhead: "",
    provinceNameStamp: MUNICIPALITY.englishProvince || "",
    stampWardNo2: "",

    wardOfficeName1: "",
    wardOfficeName2: "",
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
      "billName",
      "amendmentName",
      "mapLocation",
      "villageName",
      "stampMunicipality",
      "stampWardNo",
      "provinceNameLetterhead",
      "provinceNameStamp",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "")
        return { ok: false, missing: k };
    }
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone))) {
      return { ok: false, missing: "applicantPhone (invalid)" };
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
      const payload = { ...formData };

      const res = await axiosInstance.post(
        "/api/forms/verify-revised-emblem",
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
    <div className="verify-emblem-container">
      <form onSubmit={handleSubmit}>
        {/* Reusable header (English) */}
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
            Subject: <u>Verification Revise Emblem</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          This certificate is issued to certify that The House of
          Representatives (HOR) has unanimously passed the government's
          constitution (2nd Amendment) Bill,
          <input
            type="text"
            name="billName"
            value={formData.billName}
            onChange={handleChange}
            required
          />{" "}
          , which seeks to amend
          <input
            type="text"
            name="amendmentName"
            value={formData.amendmentName}
            onChange={handleChange}
            required
          />{" "}
          of the constitution to update the national map by incorporating
          <input
            type="text"
            name="mapLocation"
            value={formData.mapLocation}
            onChange={handleChange}
            required
          />
          .
          <br />
          Although we have already changed the emblem of Nepal on the
          letterhead, due to inconvenience we are not yet able to change the
          emblem imprinted on the Stamp of our Ward Office. We are sorry for the
          inconvenience and will revice the imprinted emblem of Nepal on Stamp
          of our Ward Office as we get favorable condition.
          <br />
          Furthermore, the village name "
          <input
            type="text"
            name="villageName"
            value={formData.villageName}
            onChange={handleChange}
            required
          />
          " is written in Nepali font only on the letterhead and not on the
          stamp of this
          <input
            type="text"
            name="stampMunicipality"
            value={formData.stampMunicipality}
            onChange={handleChange}
            required
          />{" "}
          , Ward No.
          <input
            type="text"
            name="stampWardNo"
            value={formData.stampWardNo}
            onChange={handleChange}
            required
          />{" "}
          but both are genuine.
          <br />
          Note: The province name is written as "
          <input
            type="text"
            name="provinceNameLetterhead"
            value={formData.provinceNameLetterhead}
            onChange={handleChange}
            required
          />
          " in the letterhead and as "
          <input
            type="text"
            name="provinceNameStamp"
            value={formData.provinceNameStamp}
            onChange={handleChange}
            required
          />
          " on the stamp of this Ward Office (Ward No.{" "}
          <input
            type="text"
            name="stampWardNo2"
            value={formData.stampWardNo2}
            onChange={handleChange}
            required
          />
          ). Both refer to the same province.
          <br />
          We would to ratify and apologize for the inconvenience caused by this
          matter, please feel free to contact us for further information
          required in this regard.
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

export default VerifyRevisedEmblem;
