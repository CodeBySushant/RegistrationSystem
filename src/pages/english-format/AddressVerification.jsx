import React, { useState } from "react";
import "./AddressVerification.css";

const AddressVerification = () => {
  const [formData, setFormData] = useState({
    letterNo: "2082/83",
    refNo: "",
    date: "2025-10-31",
    govLocation: "",
    oldWardNo: "",
    newWardNo: "1",
    newMunicipality: "Kathmandu",
    newDistrict: "Kathmandu",
    newProvince: "",
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
    const required = ["applicantName", "applicantAddress", "applicantCitizenship", "applicantPhone", "designation"];
    for (let k of required) {
      if (!formData[k] || formData[k].toString().trim() === "") return { ok: false, missing: k };
    }
    return { ok: true };
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
      const res = await fetch("/api/forms/address-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
    <div className="address-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img
            src="https://i.imgur.com/YOUR_LOGO_URL.png"
            alt="Nagarjun Municipality Logo"
            className="logo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h1>Nagarjun Municipality</h1>
          <h2>1 No. Ward Office</h2>
          <h3>Kathmandu, Kathmandu</h3>
          <h3>Bagmati Province, Nepal</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
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
          This is to certify that according to the ministry level meeting of Nepal Government,
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
          <select name="newWardNo" value={formData.newWardNo} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
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
          . All of the addresses are same and does not make any difference using any of them.
        </p>

        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        <div className="applicant-details">
          <h3>Applicant Details</h3>
          <div className="form-group-column">
            <label>Applicant Name *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Address *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Citizenship Number *</label>
            <input
              type="text"
              name="applicantCitizenship"
              value={formData.applicantCitizenship}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-column">
            <label>Applicant Phone Number *</label>
            <input type="tel" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
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
