// src/pages/english-format/new/TaxClearanceNewFormat.jsx
import React, { useState } from "react";
import MunicipalityHeader from "../../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../../config/municipalityConfig";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import ApplicantDetailsEn from "../../../components/ApplicantDetailsEn";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const makeIncomeRow = (id) => ({
  id,
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
});

/* ─────────────────────────────────────────────
   STYLES  (prefix: tcnf-)
───────────────────────────────────────────── */
const styles = `
.tcnf-container {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Times New Roman', Times, serif;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  box-sizing: border-box;
}

.tcnf-header { text-align: center; margin-bottom: 20px; color: #8B0000; }

.tcnf-form-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
.tcnf-form-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 10px;
}
.tcnf-form-group label { font-weight: bold; margin-right: 8px; }
.tcnf-form-group input {
  width: 200px; max-width: 100%;
  padding: 5px; border: 1px solid #ccc;
  border-radius: 4px; box-sizing: border-box;
  font-family: inherit;
}

.tcnf-subject-line { text-align: center; margin: 25px 0; font-size: 16px; }

.tcnf-certificate-body { line-height: 2.8; font-size: 16px; text-align: justify; }
.tcnf-certificate-body input[type="text"],
.tcnf-certificate-body select {
  display: inline-block; vertical-align: baseline;
  padding: 4px 6px; font-family: inherit; font-size: 15px;
  background-color: transparent; border: none;
  border-bottom: 1px dotted #000; margin: 0 5px;
  width: 120px; max-width: 100%; box-sizing: border-box;
}
.tcnf-certificate-body select { width: auto; min-width: 80px; }

.tcnf-table-wrapper { width: 100%; overflow-x: auto; margin: 20px 0; }
.tcnf-income-table {
  width: 100%; min-width: 800px;
  border-collapse: collapse; text-align: center;
}
.tcnf-income-table th,
.tcnf-income-table td {
  border: 1px solid #000; padding: 8px;
  vertical-align: middle; font-size: 14px;
}
.tcnf-income-table th { background-color: #f0f0f0; font-weight: bold; }
.tcnf-income-table input[type="text"] {
  width: 100%; box-sizing: border-box;
  border: 1px solid #ccc; padding: 4px; text-align: center;
  font-family: inherit;
}
.tcnf-income-table input[name="sourceName"] { text-align: left; font-weight: bold; }
.tcnf-status-cell { background-color: #f9f9f9; font-weight: bold; }
.tcnf-action-cell { vertical-align: top !important; padding-top: 15px !important; }

.tcnf-add-btn {
  width: 30px; height: 30px;
  font-size: 20px; font-weight: bold;
  background-color: #007bff; color: white;
  border: none; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.tcnf-add-btn:hover { background-color: #0056b3; }

.tcnf-info-notes { font-size: 12px; line-height: 1.5; margin-top: 10px; }
.tcnf-info-notes p { margin: 5px 0; }

.tcnf-designation-section {
  display: flex; flex-direction: column;
  align-items: flex-end;
  margin-top: 40px; margin-right: 20px;
}
.tcnf-designation-section input {
  width: 220px; max-width: 100%;
  border: none; border-bottom: 1px solid #000;
  margin-bottom: 5px; text-align: center;
  background: transparent; box-sizing: border-box;
}
.tcnf-designation-section select {
  width: 220px; max-width: 100%;
  padding: 5px; border: 1px solid #ccc;
  border-radius: 4px; text-align: center;
  box-sizing: border-box; font-family: inherit;
}

.tcnf-applicant-box {
  border: 1px solid #ddd; padding: 20px;
  background-color: rgba(255,255,255,0.6);
  margin-top: 20px; border-radius: 4px;
}
.tcnf-applicant-box h3 {
  color: #777; font-size: 1.1rem;
  margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px;
}
.tcnf-details-grid { display: flex; flex-direction: column; gap: 18px; }
.tcnf-detail-group { display: flex; flex-direction: column; }
.tcnf-detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.tcnf-detail-input {
  border: 1px solid #ddd; padding: 8px; border-radius: 4px;
  width: 100%; max-width: 400px; box-sizing: border-box;
  background-color: #eef2f5; font-family: inherit; font-size: 1rem;
}
.tcnf-required { color: red; margin-left: 4px; }

.tcnf-submit-area { text-align: center; margin-top: 30px; }
.tcnf-submit-btn {
  background-color: #343a40; color: white;
  padding: 12px 25px; border: none; border-radius: 5px;
  cursor: pointer; font-size: 16px; font-weight: bold;
  font-family: inherit;
}
.tcnf-submit-btn:hover:not(:disabled) { background-color: #23272b; }
.tcnf-submit-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .tcnf-container, .tcnf-container * { visibility: visible; }
  .tcnf-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 0;
    background: white !important; background-image: none !important;
  }
  .tcnf-submit-area { display: none; }
  input, select {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .tcnf-container { width: 100%; padding: 15px; }
  .tcnf-form-row { flex-direction: column; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
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

  const [incomeSources, setIncomeSources] = useState([makeIncomeRow(1)]);
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
    setIncomeSources((prev) => [...prev, makeIncomeRow(prev.length + 1)]);
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
        return "Please fill required field: " + k;
    }
    if (!incomeSources.length)
      return "At least one income source row is required";
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone)))
      return "Invalid phone number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        incomeSources: JSON.stringify(incomeSources),
      };

      const res = await axiosInstance.post(
        "/api/forms/tax-clearance-new-format",
        payload,
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
    <>
      <style>{styles}</style>

      <div className="tcnf-container">
        <form onSubmit={handleSubmit}>
          {/* ── Header ── */}
          <div className="tcnf-header">
            <MunicipalityHeader showLogo english />
          </div>

          {/* ── Letter No / Date ── */}
          <div className="tcnf-form-row">
            <div className="tcnf-form-group">
              <label>Letter No.:</label>
              <input
                type="text"
                name="letterNo"
                value={formData.letterNo}
                onChange={handleChange}
              />
            </div>
            <div className="tcnf-form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ── Ref No ── */}
          <div className="tcnf-form-row">
            <div className="tcnf-form-group">
              <label>Ref No.:</label>
              <input
                type="text"
                name="refNo"
                value={formData.refNo}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="tcnf-subject-line">
            <strong>
              Subject: <u>Tax Clearance Certificate</u>
            </strong>
            <br />
            <strong>
              <u>To Whom It May Concern</u>
            </strong>
          </div>

          {/* ── Certificate body ── */}
          <p className="tcnf-certificate-body">
            This is to certify that
            <select
              name="applicantTitle"
              value={formData.applicantTitle}
              onChange={handleChange}
            >
              <option>Master.</option>
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
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
              <option value="son">son</option>
              <option value="daughter">daughter</option>
            </select>
            of
            <select
              name="guardianTitle"
              value={formData.guardianTitle}
              onChange={handleChange}
            >
              <option>Master.</option>
              <option>Mr.</option>
              <option>Ms.</option>
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
            <select
              name="wardNo"
              value={formData.wardNo}
              onChange={handleChange}
            >
              {["1", "2", "3", "4", "5", "6", "7"].map((w) => (
                <option key={w}>{w}</option>
              ))}
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
            has been regularly paying all applicable government taxes up to
            fiscal year
            <input
              type="text"
              name="fiscalYear"
              value={formData.fiscalYear}
              onChange={handleChange}
              required
            />
            .<br />
            We have issued this Tax Clearance Certificate after related
            verification and investigation from the records division of our
            office. We would also like to inform you that Government Tax is
            exemption for agricultural income according to income Tax Act. 2058
            B.S. (2002 A.D.), Chapter 4 Section 11 Clause 1 &amp; 2.
          </p>

          {/* ── Income table ── */}
          <div className="tcnf-table-wrapper">
            <table className="tcnf-income-table">
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
                      <td rowSpan="4" className="tcnf-action-cell">
                        {idx === incomeSources.length - 1 && (
                          <button
                            type="button"
                            onClick={addIncomeSource}
                            className="tcnf-add-btn"
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
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="initialIncomeFY2"
                          value={s.initialIncomeFY2}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="initialIncomeFY3"
                          value={s.initialIncomeFY3}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>Tax</td>
                      <td>
                        <input
                          type="text"
                          name="taxAmountFY1"
                          value={s.taxAmountFY1}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="taxAmountFY2"
                          value={s.taxAmountFY2}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="taxAmountFY3"
                          value={s.taxAmountFY3}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>After</td>
                      <td>
                        <input
                          type="text"
                          name="incomeAfterFY1"
                          value={s.incomeAfterFY1}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="incomeAfterFY2"
                          value={s.incomeAfterFY2}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="incomeAfterFY3"
                          value={s.incomeAfterFY3}
                          onChange={(e) => handleIncomeChange(idx, e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">Status</td>
                      <td colSpan="3" className="tcnf-status-cell">
                        Tax Cleared
                      </td>
                      <td colSpan="3" className="tcnf-status-cell">
                        Tax Cleared
                      </td>
                      <td colSpan="3" className="tcnf-status-cell">
                        Tax Cleared
                      </td>
                    </tr>
                    <tr style={{ height: "6px" }}></tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Info notes ── */}
          <div className="tcnf-info-notes">
            <p>
              For details about income tax exemption, you may check the website
              of Nepal Government Income Tax Act:{" "}
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

          {/* ── Designation ── */}
          <div className="tcnf-designation-section">
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

          {/* Applicant details — using ApplicantDetailsEn */}
          <ApplicantDetailsEn formData={formData} handleChange={handleChange} />

          {/* ── Submit ── */}
          <div className="tcnf-submit-area">
            <button
              type="submit"
              className="tcnf-submit-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save and Print Record"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaxClearanceNewFormat;
