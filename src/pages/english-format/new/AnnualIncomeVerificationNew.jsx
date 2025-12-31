// src/pages/english-format/new/AnnualIncomeVerificationNew.jsx
import React, { useState } from "react";
import "./AnnualIncomeVerificationNew.css";

import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

const AnnualIncomeVerificationNew = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "1970/60",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),

    applicantNameBody: "",
    relation: "son",
    guardianTitle: "Mr.",
    guardianName: "",

    // defaults from MUNICIPALITY config where appropriate
    municipality: MUNICIPALITY.englishMunicipality || "",
    wardNo: user?.ward?.toString() || "",
    prevAddress: "",
    prevWardNo: "",
    district: MUNICIPALITY.englishDistrict || "",
    province: MUNICIPALITY.englishProvince || "",
    country: "Nepal",
    currency: "USD",
    totalAnnualIncome: "",
    totalAnnualIncomeWords: "",
    equivalentCurrency: "",
    equivalentCurrencyWords: "",
    usdRate: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [incomeSources, setIncomeSources] = useState([
    {
      id: 1,
      ownerTitle: "Mr.",
      ownerName: "",
      relation: "",
      incomeSource: "",
      incomeDetails: "",
      annualIncome: "",
      remarks: "",
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
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addIncomeRow = () => {
    setIncomeSources((p) => [
      ...p,
      {
        id: p.length + 1,
        ownerTitle: "Mr.",
        ownerName: "",
        relation: "",
        incomeSource: "",
        incomeDetails: "",
        annualIncome: "",
        remarks: "",
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
      "totalAnnualIncome",
      "totalAnnualIncomeWords",
      "equivalentCurrency",
      "equivalentCurrencyWords",
      "currency",
      "usdRate",
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
    const phone = String(formData.applicantPhone).trim();
    if (!/^[0-9+\-\s]{6,20}$/.test(phone)) {
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
      const payload = {
        ...formData,
        table_rows: incomeSources,
      };

      const res = await axiosInstance.post(
        "/api/forms/annual-income-verification-new",
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

        {/* Ref No */}
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

        {/* Subject */}
        <div className="subject-line">
          <strong>
            Subject: <u>Annual Income Certificate</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        {/* Certificate Body */}
        <p className="certificate-body">
          This is to certify that
          <select
            name="guardianTitle"
            value={formData.guardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
          </select>
          <input
            type="text"
            name="applicantNameBody"
            value={formData.applicantNameBody}
            onChange={handleChange}
            required
          />
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
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
          and
          <select>
            <option>wife</option>
          </select>
          of
          <input type="text" placeholder="Husband's Name" />,
          <span className="text-red"> permanent resident </span>
          of
          <strong> {formData.municipality} </strong>
          Ward No.
          <strong> {formData.wardNo} </strong>,
          <strong> {formData.district} </strong> District,
          <strong> {formData.province} </strong>, Nepal, his family has
          following sources of income from the following sources. The details
          have been verified according to the evidence and records that are
          provided to office.
        </p>

        {/* ===== INCOME SOURCES TABLE ===== */}
        <div className="table-wrapper">
          <table className="income-table">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Owner's Name</th>
                <th>Relation</th>
                <th>Sources on Income</th>
                <th>Annual Income</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {incomeSources.map((row, index) => (
                <tr key={row.id}>
                  {/* S.N. */}
                  <td>{index + 1}</td>

                  {/* Owner Name */}
                  <td>
                    <select
                      name="ownerTitle"
                      value={row.ownerTitle}
                      onChange={(e) => handleIncomeChange(index, e)}
                    >
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select>
                    <br />
                    <input
                      type="text"
                      name="ownerName"
                      value={row.ownerName}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>

                  {/* Relation */}
                  <td>
                    <input
                      type="text"
                      name="relation"
                      value={row.relation}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>

                  {/* Source of Income */}
                  <td>
                    Income from
                    <input
                      type="text"
                      name="incomeSource"
                      value={row.incomeSource}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                    <br />
                    (
                    <input
                      type="text"
                      name="incomeDetails"
                      value={row.incomeDetails}
                      onChange={(e) => handleIncomeChange(index, e)}
                    />
                    )
                  </td>

                  {/* Annual Income */}
                  <td>
                    <input
                      type="text"
                      name="annualIncome"
                      value={row.annualIncome}
                      onChange={(e) => handleIncomeChange(index, e)}
                      required
                    />
                  </td>

                  {/* Remarks */}
                  <td>
                    <input
                      type="text"
                      name="remarks"
                      value={row.remarks}
                      onChange={(e) => handleIncomeChange(index, e)}
                    />
                  </td>

                  <td>
                    {index === incomeSources.length - 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={addIncomeRow}
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

        {/* ===== TOTAL & EXCHANGE SECTION ===== */}
        <div className="note-body">
          <p>
            <strong>Total Annual Income in NRs.</strong>
            <input
              type="text"
              name="totalAnnualIncome"
              value={formData.totalAnnualIncome}
              onChange={handleChange}
              required
            />
            (In words:
            <input
              type="text"
              name="totalAnnualIncomeWords"
              value={formData.totalAnnualIncomeWords}
              onChange={handleChange}
              required
            />
            )
          </p>

          <p>
            <strong>Today's Buying Rate</strong>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="inline-select"
            >
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="KRW">KRW</option>
              <option value="CAD">CAD</option>
              <option value="NZD">NZD</option>
            </select>
            1 = NRs.
            <input
              type="text"
              name="usdRate"
              value={formData.usdRate}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <strong>Equivalent to currency =</strong>
            <input
              type="text"
              name="equivalentCurrency"
              value={formData.equivalentCurrency}
              onChange={handleChange}
              required
            />
            (In words:
            <input
              type="text"
              name="equivalentCurrencyWords"
              value={formData.equivalentCurrencyWords}
              onChange={handleChange}
              required
            />
            )
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

export default AnnualIncomeVerificationNew;
