import React, { useState } from "react";
import "./TaxCleranceCertificate.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const TaxClearanceCertificate = () => {
  const [formData, setFormData] = useState({
    letterNo: "0000/00",
    refNo: "",
    date: "",
    ownerTitle: "Mr.",
    ownerNameBody: "",
    municipality: MUNICIPALITY.englishMunicipality,
    wardNo: (MUNICIPALITY.wardNumber ?? 1).toString(),
    district: MUNICIPALITY.englishDistrict,
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

  const addProperty = () => {
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
    const required = [
      "ownerNameBody",
      "municipality",
      "wardNo",
      "district",
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

    const okProp = properties.some(
      (p) => p.description && p.description.trim() !== ""
    );
    if (!okProp)
      return {
        ok: false,
        missing: "properties (at least one with description)",
      };

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
      const payload = { ...formData, table_rows: properties };
      const res = await axiosInstance.post(
        "/api/forms/tax-clearance-certificate",
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
    <div className="tax-clearance-container">
      <form onSubmit={handleSubmit}>
        {/* 🔥 MUNICIPALITY HEADER */}
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
            name="ownerTitle"
            value={formData.ownerTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input
            type="text"
            name="ownerNameBody"
            placeholder="Name"
            value={formData.ownerNameBody}
            onChange={handleChange}
            required
          />
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          (
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
          , Nepal) have paid all the taxes of their properties.
        </p>

        <div className="table-wrapper">
          <table className="properties-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Description</th>
                <th>Owner's Name</th>
                <th>Location</th>
                <th>Plot No.</th>
                <th>Area</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={property.description}
                      onChange={(e) => handlePropertyChange(index, e)}
                      required
                    />
                  </td>

                  <td className="owner-name-cell">
                    <select
                      name="ownerTitle"
                      value={property.ownerTitle}
                      onChange={(e) => handlePropertyChange(index, e)}
                    >
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select>
                    <input
                      type="text"
                      name="ownerName"
                      value={property.ownerName}
                      onChange={(e) => handlePropertyChange(index, e)}
                      required
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="location"
                      value={property.location}
                      onChange={(e) => handlePropertyChange(index, e)}
                      required
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="plotNo"
                      value={property.plotNo}
                      onChange={(e) => handlePropertyChange(index, e)}
                      required
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="area"
                      value={property.area}
                      onChange={(e) => handlePropertyChange(index, e)}
                      required
                    />
                  </td>

                  <td>
                    {index === properties.length - 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={addProperty}
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

export default TaxClearanceCertificate;
