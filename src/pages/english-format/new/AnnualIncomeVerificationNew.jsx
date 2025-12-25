// src/pages/english-format/new/AnnualIncomeVerificationNew.jsx
import React, { useState } from "react";
import "./AnnualIncomeVerificationNew.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";

const AnnualIncomeVerificationNew = () => {
  const [formData, setFormData] = useState({
    letterNo: "0000/00",
    refNo: "",
    date: "",

    applicantNameBody: "",
    relation: "son",
    guardianTitle: "Mr.",
    guardianName: "",

    // defaults from MUNICIPALITY config where appropriate
    municipality: MUNICIPALITY.englishMunicipality || "",
    wardNo: MUNICIPALITY.wardNumber || "1",
    prevAddress: "",
    prevWardNo: "",
    district: MUNICIPALITY.englishDistrict || "",
    province: MUNICIPALITY.englishProvince || "",
    country: "Nepal",

    totalNPR_fy1: "",
    totalNPR_fy2: "",
    totalNPR_fy3: "",
    currency: "USD",
    totalCurrency_fy1: "",
    totalCurrency_fy2: "",
    totalCurrency_fy3: "",
    usdRate: "",
    rateDate: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [incomeSources, setIncomeSources] = useState([
    { id: 1, sourceName: "", fy1_amount: "", fy2_amount: "", fy3_amount: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    const arr = [...incomeSources];
    arr[index] = { ...arr[index], [name]: value };
    setIncomeSources(arr);
  };

  const addIncomeRow = () => {
    setIncomeSources((p) => [
      ...p,
      {
        id: p.length + 1,
        sourceName: "",
        fy1_amount: "",
        fy2_amount: "",
        fy3_amount: "",
      },
    ]);
  };

  const validate = () => {
    const required = [
      "applicantNameBody",
      "guardianName",
      "municipality",
      "wardNo",
      "district",
      "province",
      "country",
      "totalNPR_fy1",
      "totalNPR_fy2",
      "totalNPR_fy3",
      "currency",
      "usdRate",
      "rateDate",
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
    // simple phone check
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
      alert("Please fill/validate field: " + v.missing);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        table_rows: incomeSources,
      };

      const res = await fetch("/api/forms/annual-income-verification-new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `Server returned ${res.status}`);
      }
      const body = await res.json();
      alert("Saved successfully (id: " + body.id + ")");
      setTimeout(() => window.print(), 100);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="annual-income-verification-container">
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

        {/* incomes table */}
        <div className="table-wrapper">
          <table className="income-table">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Owner/Sources of Income</th>
                <th>Fiscal Year 1</th>
                <th>Fiscal Year 2</th>
                <th>Fiscal Year 3</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {incomeSources.map((source, index) => (
                <tr key={source.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="sourceName"
                      value={source.sourceName}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="fy1_amount"
                      value={source.fy1_amount}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="fy2_amount"
                      value={source.fy2_amount}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="fy3_amount"
                      value={source.fy3_amount}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    {index === incomeSources.length - 1 && (
                      <button
                        type="button"
                        onClick={addIncomeRow}
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

export default AnnualIncomeVerificationNew;
