import React, { useState } from "react";
import "./PropertyValuationReport.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const PropertyValuationReport = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: new Date().toISOString().slice(0, 10),
    applicantTitle: "Mr.",
    applicantNameBody: "",
    relation: "Grandson",
    guardianTitle: "Mr.",
    guardianName: "",
    residencyType: "permanent/temporary",
    municipality: MUNICIPALITY.englishMunicipality || "",
    wardNo1: user?.ward?.toString() || "",
    district1: MUNICIPALITY.englishDistrict || "",
    propertyMunicipality: MUNICIPALITY.englishMunicipality || "",
    wardNo2: "",
    propertyDistrict: MUNICIPALITY.englishDistrict || "",
    valuationNRs: "",
    valuationWords: "",
    usdRate: "",
    equivalentUSD: "",
    equivalentUSDWords: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",
  });

  const [properties, setProperties] = useState([
    {
      id: 1,
      description: "",
      ownerTitle: "Mr.",
      ownerName: "",
      location: "",
      plotNo: "",
      area: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyChange = (index, e) => {
    const { name, value } = e.target;
    setProperties((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addPropertyRow = () => {
    setProperties((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: "",
        ownerTitle: "Mr.",
        ownerName: "",
        location: "",
        plotNo: "",
        area: "",
      },
    ]);
  };

  const validate = () => {
    const requiredMain = [
      "applicantNameBody",
      "guardianName",
      "wardNo2",
      "valuationNRs",
      "usdRate",
      "equivalentUSD",
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
    // at least one property must have description and ownerName
    const okProp = properties.some((p) => p.description && p.ownerName);
    if (!okProp)
      return {
        ok: false,
        missing: "property (at least one with description & ownerName)",
      };
    return { ok: true };
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
        "/api/forms/property-valuation-report",
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
    <div className="property-valuation-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <MunicipalityHeader showLogo variant="english" showWardLine />
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
            Subject: <u>Property Valuation Report</u>
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
            <option>Miss.</option>
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
            <option>Grandson</option>
            <option>Son</option>
            <option>Daughter</option>
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
            placeholder="Guardian's Name"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />{" "}
          is a
          <select
            name="residencyType"
            value={formData.residencyType}
            onChange={handleChange}
          >
            <option>permanent/temporary</option>
            <option>permanent</option>
            <option>temporary</option>
          </select>
          resident of
          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          >
            <option>{MUNICIPALITY.englishMunicipality || ""}</option>
          </select>
          Ward No.
          <input
            type="text"
            name="wardNo1"
            value={formData.wardNo1}
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="district1"
            value={formData.district1}
            onChange={handleChange}
          />{" "}
          District,
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
          , Nepal. The following properties are in
          <select
            name="propertyMunicipality"
            value={formData.propertyMunicipality}
            onChange={handleChange}
          >
            <option>{MUNICIPALITY.englishMunicipality || ""}</option>
          </select>
          Ward No.
          <input
            type="text"
            name="wardNo2"
            placeholder="Ward"
            value={formData.wardNo2}
            onChange={handleChange}
            required
          />
          District
          <input
            type="text"
            name="propertyDistrict"
            value={formData.propertyDistrict}
            onChange={handleChange}
          />
          , Nepal which have been valuated as per the current prevailing market
          rate as follows:
        </p>

        <strong>Land and Building Details</strong>
        <table className="properties-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Description</th>
              <th>Owner's Name</th>
              <th>Location</th>
              <th>Plot No.</th>
              <th>Area in Ropani ..</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop, idx) => (
              <tr key={prop.id}>
                <td>{idx + 1}</td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={prop.description}
                    onChange={(e) => handlePropertyChange(idx, e)}
                    required
                  />
                </td>
                <td className="owner-name-cell">
                  <select
                    name="ownerTitle"
                    value={prop.ownerTitle}
                    onChange={(e) => handlePropertyChange(idx, e)}
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Miss.</option>
                    <option>Ms.</option>
                  </select>
                  <input
                    type="text"
                    name="ownerName"
                    value={prop.ownerName}
                    onChange={(e) => handlePropertyChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="location"
                    value={prop.location}
                    onChange={(e) => handlePropertyChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="plotNo"
                    value={prop.plotNo}
                    onChange={(e) => handlePropertyChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="area"
                    value={prop.area}
                    onChange={(e) => handlePropertyChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  {idx === properties.length - 1 && (
                    <button
                      type="button"
                      onClick={addPropertyRow}
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

        <div className="measurements-info">
          <p>
            <strong>
              All the measurements are carried as the below relation:
            </strong>
          </p>
          <p>0-0-0-0 = Ropani-Aana-Paisa-Dam</p>
          <p>16 Aana = 1 Ropani</p>
          <p>4 Paisa = 1 Aana</p>
          <p>4 Dam = 1 Paisa</p>
        </div>

        <div className="valuation-section">
          {/* Row 1 */}
          <div className="valuation-row">
            <label>
              Properties Valuation NRs. <span className="required">*</span>
            </label>
            <input
              type="text"
              name="valuationNRs"
              value={formData.valuationNRs}
              onChange={handleChange}
              required
            />
            <span className="inline-text">(In words:</span>
            <input
              type="text"
              name="valuationWords"
              value={formData.valuationWords}
              onChange={handleChange}
              required
              className="words-input"
            />
            <span className="inline-text">)</span>
          </div>
          {/* Row 2 */}
          <div className="valuation-row">
            <label>Today's Selling Rate</label>
            <select className="currency-select">
              <option>USD</option>
            </select>
            <span className="inline-text">1 = NRs.</span>
            <input
              type="text"
              name="usdRate"
              value={formData.usdRate}
              onChange={handleChange}
              required
            />
            <span className="required">*</span>
          </div>
          {/* Row 3 */}
          <div className="valuation-row">
            <label>
              Equivalent to <u>USD</u>
            </label>
            <span className="inline-text">=</span>
            <input
              type="text"
              name="equivalentUSD"
              value={formData.equivalentUSD}
              onChange={handleChange}
              required
            />
            <span className="required">*</span>
            <span className="inline-text">(In words:</span>
            <input
              type="text"
              name="equivalentUSDWords"
              value={formData.equivalentUSDWords}
              onChange={handleChange}
              required
              className="words-input"
            />
            <span className="required">*</span>
            <span className="inline-text">)</span>
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

export default PropertyValuationReport;
