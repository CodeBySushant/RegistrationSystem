import React, { useState } from "react";
import "./AnnualIncomeCertificate.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const AnnualIncomeCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "son",
    guardianTitle: "Mr.",
    guardianName: "",
    guardianRelation: "wife",
    residencyType: "permanent resident",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo: MUNICIPALITY.wardNumber.toString(),
    district: MUNICIPALITY.englishDistrict,
    province: MUNICIPALITY.englishProvince,
    totalIncomeNRs: "",
    totalIncomeWords: "",
    usdRate: "",
    equivalentUSD: "",
    equivalentUSDWords: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [incomes, setIncomes] = useState([
    {
      id: 1,
      ownerTitle: "Mr.",
      ownerName: "",
      relation: "",
      sourceDescription: "",
      sourceEntity: "",
      annualIncome: "",
      remark: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncomeChange = (index, e) => {
    const { name, value } = e.target;
    setIncomes((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addIncomeRow = () => {
    setIncomes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ownerTitle: "Mr.",
        ownerName: "",
        relation: "",
        sourceDescription: "",
        sourceEntity: "",
        annualIncome: "",
        remark: "",
      },
    ]);
  };

  const validate = () => {
    const requiredMain = [
      "totalIncomeNRs",
      "totalIncomeWords",
      "usdRate",
      "equivalentUSD",
      "equivalentUSDWords",
      "designation",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (let k of requiredMain) {
      if (!formData[k] || formData[k].toString().trim() === "")
        return { ok: false, missing: k };
    }
    // At least one income row with ownerName and annualIncome
    for (let i = 0; i < incomes.length; i++) {
      if (incomes[i].ownerName && incomes[i].annualIncome) return { ok: true };
    }
    return { ok: false, missing: "income row (ownerName & annualIncome)" };
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
      const payload = { ...formData, table_rows: incomes };
      const res = await axiosInstance.post(
        "/api/forms/annual-income-certificate",
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
      console.error(err);
      alert("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="annual-income-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo />
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
            Subject: <u>Annual Income Certificate</u>
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
          ,
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          >
            <option>son</option>
            <option>wife</option>
            <option>daughter</option>
          </select>
          of
          <select
            name="guardianTitle"
            value={formData.guardianTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
          </select>
          <input
            type="text"
            name="guardianName"
            placeholder="Father/Husband's Name"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
          and
          <input
            type="text"
            name="guardianRelation"
            placeholder="e.g., wife"
            value={formData.guardianRelation}
            onChange={handleChange}
          />
          of
          <select
            name="residencyType"
            value={formData.residencyType}
            onChange={handleChange}
          >
            <option>permanent resident</option>
            <option>temporary resident</option>
          </select>
          of
          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          >
            <option>{MUNICIPALITY.englishMunicipality}</option>
          </select>
          Ward No.
          <select name="wardNo" value={formData.wardNo} onChange={handleChange}>
            <option>{MUNICIPALITY.wardNumber}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />{" "}
          District,
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />{" "}
          Nepal has following sources of income...
        </p>

        <table className="incomes-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Owner's Name</th>
              <th>Relation</th>
              <th>Sources on Income</th>
              <th>Annual Income</th>
              <th>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, idx) => (
              <tr key={income.id}>
                <td>{idx + 1}</td>
                <td className="owner-name-cell">
                  <select
                    name="ownerTitle"
                    value={income.ownerTitle}
                    onChange={(e) => handleIncomeChange(idx, e)}
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                  <input
                    type="text"
                    name="ownerName"
                    value={income.ownerName}
                    onChange={(e) => handleIncomeChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="relation"
                    value={income.relation}
                    onChange={(e) => handleIncomeChange(idx, e)}
                    required
                  />
                </td>
                <td className="source-cell">
                  <input
                    type="text"
                    name="sourceDescription"
                    value={income.sourceDescription}
                    onChange={(e) => handleIncomeChange(idx, e)}
                    required
                    placeholder="Description"
                  />
                  <label style={{ display: "block", fontSize: "0.8em" }}>
                    Income from
                  </label>
                  <input
                    type="text"
                    name="sourceEntity"
                    value={income.sourceEntity}
                    onChange={(e) => handleIncomeChange(idx, e)}
                    required
                    placeholder="Entity"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="annualIncome"
                    value={income.annualIncome}
                    onChange={(e) => handleIncomeChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="remark"
                    value={income.remark}
                    onChange={(e) => handleIncomeChange(idx, e)}
                  />
                </td>
                <td>
                  {idx === incomes.length - 1 && (
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

        <div className="summary-section">
          <div className="summary-row">
            <label>Total Annual Income in NRs. *</label>
            <input
              type="number"
              name="totalIncomeNRs"
              value={formData.totalIncomeNRs}
              onChange={handleChange}
              required
            />
            <label>(In words: *</label>
            <input
              type="text"
              name="totalIncomeWords"
              value={formData.totalIncomeWords}
              onChange={handleChange}
              required
              className="words-input"
            />
            )
          </div>

          <div className="summary-row">
            <label>Today's Buying Rate USD 1 = NRs. *</label>
            <input
              type="number"
              step="0.01"
              name="usdRate"
              value={formData.usdRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="summary-row">
            <label>Equivalent to USD *</label>
            <input
              type="number"
              name="equivalentUSD"
              value={formData.equivalentUSD}
              onChange={handleChange}
              required
            />
            <label>(In words: *</label>
            <input
              type="text"
              name="equivalentUSDWords"
              value={formData.equivalentUSDWords}
              onChange={handleChange}
              required
              className="words-input"
            />
            )
          </div>
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

export default AnnualIncomeCertificate;
