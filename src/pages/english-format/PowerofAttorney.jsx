import React, { useState } from "react";
import "./PowerofAttorney.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import MunicipalityHeader from "../../components/MunicipalityHeader";
import axiosInstance from "../../utils/axiosInstance";

const PowerOfAttorney = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "2025-10-31",
    deceasedTitle: "Mr.",
    deceasedName: "",
    passportNo: "",
    expiredOn: "",
    dueTo: "",
    delegationLocation: "",
    issuedPowerOfAttorneyOn: "",
    designation: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: "",

    // from config
    municipality: MUNICIPALITY.englishMunicipality || "Biratnagar Municipality",
    wardNo: (MUNICIPALITY.wardNumber ?? 1).toString(),
    district: MUNICIPALITY.englishDistrict || "Biratnagar",
    province: MUNICIPALITY.englishProvince || "Koshi Province",
  });

  const [relatives, setRelatives] = useState([
    {
      id: 1,
      title: "Mr.",
      name: "",
      address: "",
      age: "",
      signature: "",
      relationship: "Grandfather",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelativeChange = (index, e) => {
    const { name, value } = e.target;
    setRelatives((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addRelative = () => {
    setRelatives((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "Mr.",
        name: "",
        address: "",
        age: "",
        signature: "",
        relationship: "",
      },
    ]);
  };

  const validate = () => {
    const requiredMain = [
      "deceasedName",
      "passportNo",
      "expiredOn",
      "dueTo",
      "issuedPowerOfAttorneyOn",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
      "designation",
    ];
    for (let k of requiredMain) {
      if (!formData[k] || formData[k].toString().trim() === "")
        return { ok: false, missing: k };
    }
    // validate at least one relative with name
    const okRel = relatives.some(
      (r) => r.name && r.name.toString().trim() !== ""
    );
    if (!okRel)
      return { ok: false, missing: "relative (at least one with name)" };
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
      const payload = { ...formData, table_rows: relatives };
      const res = await axiosInstance.post(
        "/api/forms/power-of-attorney",
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
    <div className="power-of-attorney-container">
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
            Subject: <u>POWER OF ATTORNEY</u>
          </strong>
          <br />
          <strong>
            <u>To Whom It May Concern</u>
          </strong>
        </div>

        <p className="certificate-body">
          We undersigned are the legal heirs of late
          <select
            name="deceasedTitle"
            value={formData.deceasedTitle}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
          <input
            type="text"
            name="deceasedName"
            placeholder="Name"
            value={formData.deceasedName}
            onChange={handleChange}
            required
          />
          of Nepal holder Nepalese Passport
          <input
            type="text"
            name="passportNo"
            placeholder="Passport No."
            value={formData.passportNo}
            onChange={handleChange}
            required
          />
          who expired on
          <input
            type="date"
            name="expiredOn"
            value={formData.expiredOn}
            onChange={handleChange}
            required
          />
          due to
          <input
            type="text"
            name="dueTo"
            placeholder="Reason"
            value={formData.dueTo}
            onChange={handleChange}
            required
          />
          .
          <br />
          We have issued this power of attorney in favor of the Nepalese
          Ambassador/Chargé d’Affaires a.i. at the Nepalese Embassy to act on
          our behalf before judicial, labour and other concerned government
          authorities.
          <br />
          The Nepalese Ambassador/Chargé d’Affaires a.i. is hereby authorized to
          defend, receive dues and any amount as decided by the
          judicial/administrative authorities, settle issues by compromise, pay
          lawyer's fees from compensation amount received, follow up all the
          matters and take necessary actions. The Nepalese Ambassador may
          delegate these powers to subordinates at the Embassy or to the
          designated lawyer in
          <input
            type="text"
            name="delegationLocation"
            placeholder="Location"
            value={formData.delegationLocation}
            onChange={handleChange}
          />
          .
          <br />
          We have issued this power of attorney on
          <input
            type="date"
            name="issuedPowerOfAttorneyOn"
            value={formData.issuedPowerOfAttorneyOn}
            onChange={handleChange}
            required
          />{" "}
          A.D. from Nepal.
        </p>

        <div className="undersigned">
          <strong>
            <u>Undersigned</u>
          </strong>
        </div>

        <table className="relatives-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Relative's Name</th>
              <th>Address</th>
              <th>Age</th>
              <th>Signature/Thumb</th>
              <th>Relationship</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {relatives.map((r, idx) => (
              <tr key={r.id}>
                <td>{idx + 1}</td>
                <td>
                  <select
                    name="title"
                    value={r.title}
                    onChange={(e) => handleRelativeChange(idx, e)}
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={r.name}
                    onChange={(e) => handleRelativeChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={r.address}
                    onChange={(e) => handleRelativeChange(idx, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="age"
                    value={r.age}
                    onChange={(e) => handleRelativeChange(idx, e)}
                    min="0"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="signature"
                    value={r.signature}
                    onChange={(e) => handleRelativeChange(idx, e)}
                    placeholder="Sign/Thumb"
                  />
                </td>
                <td>
                  <select
                    name="relationship"
                    value={r.relationship}
                    onChange={(e) => handleRelativeChange(idx, e)}
                  >
                    <option>Grandfather</option>
                    <option>Grandmother</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Spouse</option>
                  </select>
                </td>
                <td>
                  {idx === relatives.length - 1 && (
                    <button
                      type="button"
                      onClick={addRelative}
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

export default PowerOfAttorney;
