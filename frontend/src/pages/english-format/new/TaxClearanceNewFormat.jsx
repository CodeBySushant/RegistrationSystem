// src/pages/english-format/new/TaxClearanceNewFormat.jsx
import React, { useState } from "react";
import "./TaxClearanceNewFormat.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

const TaxClearanceNewFormat = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "2097/60",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),

    applicantTitle: "Master.",
    applicantNameBody: "",
    relation: "son",
    guardianTitle: "Master.",
    guardianName: "",

    // defaults from MUNICIPALITY
    municipality: MUNICIPALITY.englishMunicipality || "",
    wardNo: user?.ward?.toString() || "",
    prevAddress: "",
    prevWardNo: "",
    prevProvince: MUNICIPALITY.englishProvince || "",
    prevCountry: "Nepal",

    fiscalYear: "2022/2023",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [incomeSources, setIncomeSources] = useState([
    {
      id: 1,
      sourceName: "",
      initialIncomeFY1: "",
      initialIncomeFY2: "",
      initialIncomeFY3: "",
      taxAmountFY1: "",
      taxAmountFY2: "",
      taxAmountFY3: "",
      incomeAfterFY1: "",
      incomeAfterFY2: "",
      incomeAfterFY3: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    setIncomeSources((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addIncomeSource = () => {
    setIncomeSources((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sourceName: "",
        initialIncomeFY1: "",
        initialIncomeFY2: "",
        initialIncomeFY3: "",
        taxAmountFY1: "",
        taxAmountFY2: "",
        taxAmountFY3: "",
        incomeAfterFY1: "",
        incomeAfterFY2: "",
        incomeAfterFY3: "",
      },
    ]);
  };

  const validate = () => {
    const required = [
      "applicantNameBody",
      "guardianName",
      "municipality",
      "wardNo",
      "fiscalYear",
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
    if (!Array.isArray(incomeSources) || incomeSources.length === 0) {
      return { ok: false, missing: "incomeSources (at least 1 row required)" };
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
        "/api/forms/tax-clearance-new-format",
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
    <div className="tax-clearance-new-container">
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
            Subject: <u>Tax Clearance Certificate</u>
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
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="applicantNameBody"
            placeholder="Name"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
          />{" "}
          ,
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
            name="guardianTitle"
            value={formData.guardianTitle}
            onChange={handleChange}
          >
            <option>Master.</option>
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="guardianName"
            placeholder="Guardian's Name"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />{" "}
          , resident of
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
          , (Previously:
          <input
            type="text"
            name="prevAddress"
            placeholder="Address"
            value={formData.prevAddress}
            onChange={handleChange}
          />{" "}
          , Ward No.
          <input
            type="text"
            name="prevWardNo"
            placeholder="Ward"
            value={formData.prevWardNo}
            onChange={handleChange}
          />{" "}
          ),
          <select
            name="prevProvince"
            value={formData.prevProvince}
            onChange={handleChange}
          >
            <option>
              {MUNICIPALITY.englishProvince || "Bagmati Province"}
            </option>
            <option>Koshi Province</option>
          </select>
          ,
          <select
            name="prevCountry"
            value={formData.prevCountry}
            onChange={handleChange}
          >
            <option>Nepal</option>
          </select>
          has been regularly paying all applicable government taxes up to fiscal
          year
          <input
            type="text"
            name="fiscalYear"
            value={formData.fiscalYear}
            onChange={handleChange}
            required
          />
          .
          <br></br>
          We have issued this Tax Clearance Certificate after related verification and investigation from the records division of our office. We would also like to inform you that Government Tax is exemption for agricultural income according to income Tax Act. 2058 B.S. (2002 A.D.), Chapter 4 Section 11 Clause 1 & 2.
        </p>

        <div className="table-wrapper">
          <table className="income-table">
            <thead>
              <tr>
                <th rowSpan="2">S.N.</th>
                <th rowSpan="2">Sources Of Income</th>
                <th colSpan="3">Initial Income (NPR)</th>
                <th colSpan="3">Tax Amount (NPR)</th>
                <th colSpan="3">Income After Tax (NPR)</th>
                <th rowSpan="2"></th>
              </tr>
              <tr>
                <th>FY1</th>
                <th>FY2</th>
                <th>FY3</th>
                <th>FY1</th>
                <th>FY2</th>
                <th>FY3</th>
                <th>FY1</th>
                <th>FY2</th>
                <th>FY3</th>
              </tr>
            </thead>
            <tbody>
              {incomeSources.map((s, idx) => (
                <React.Fragment key={s.id}>
                  <tr>
                    <td rowSpan="4">{idx + 1}</td>
                    <td colSpan="9">
                      <input
                        type="text"
                        name="sourceName"
                        value={s.sourceName}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        placeholder="Source of Income"
                        required
                      />
                    </td>
                    <td rowSpan="4" className="action-cell">
                      {idx === incomeSources.length - 1 && (
                        <button
                          type="button"
                          onClick={addIncomeSource}
                          className="add-btn"
                        >
                          +
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Initial</td>
                    <td>
                      <input
                        type="text"
                        name="initialIncomeFY1"
                        value={s.initialIncomeFY1}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="initialIncomeFY2"
                        value={s.initialIncomeFY2}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="initialIncomeFY3"
                        value={s.initialIncomeFY3}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>Tax</td>
                    <td>
                      <input
                        type="text"
                        name="taxAmountFY1"
                        value={s.taxAmountFY1}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="taxAmountFY2"
                        value={s.taxAmountFY2}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="taxAmountFY3"
                        value={s.taxAmountFY3}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>After</td>
                    <td>
                      <input
                        type="text"
                        name="incomeAfterFY1"
                        value={s.incomeAfterFY1}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="incomeAfterFY2"
                        value={s.incomeAfterFY2}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="incomeAfterFY3"
                        value={s.incomeAfterFY3}
                        onChange={(e) => handleIncomeChange(idx, e)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">Status</td>
                    <td colSpan="3" className="status-cell">
                      Tax Cleared
                    </td>
                    <td colSpan="3" className="status-cell">
                      Tax Cleared
                    </td>
                    <td colSpan="3" className="status-cell">
                      Tax Cleared
                    </td>
                  </tr>
                  <tr style={{ height: "6px" }}></tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-notes">
          <p>
            For details about income tax exemption, you may check the website of
            Nepal Government Income Tax Act:{" "}
            <a
              href="http://www.lawcommission.gov.np"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.lawcommission.gov.np
            </a>
          </p>
          <p>
            *Note: According to Income Tax Act, 2058 B.S., income from
            agriculture is exempt from income tax.
          </p>
        </div>

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

export default TaxClearanceNewFormat;
