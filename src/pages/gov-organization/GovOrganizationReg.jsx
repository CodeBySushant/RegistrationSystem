import React, { useState } from "react";
import "./GovOrganizationReg.css";

const GovOrganizationReg = () => {
  const [formData, setFormData] = useState({
    date: "2078-05-05", // Nepali BS sample; backend expects string (you can use AD if you prefer)
    letterNo: "2082/83",
    refNo: "",
    proposalName: "",
    wardNo: "",
    purpose: "",
    activities: "",
    headOffice: "",
    branchOffice: "",
    liability: "",
    femaleMembers: "",
    maleMembers: "",
    totalShareCapital: "",
    entranceFee: "",
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
    // basic required checks
    const required = [
      "proposalName",
      "wardNo",
      "purpose",
      "activities",
      "headOffice",
      "liability",
      "totalShareCapital",
      "entranceFee",
      "applicantName",
      "applicantAddress",
      "applicantCitizenship",
      "applicantPhone",
    ];
    for (const k of required) {
      if (!formData[k] || String(formData[k]).trim() === "") return { ok: false, missing: k };
    }
    // phone simple check
    if (!/^[0-9+\-\s]{6,20}$/.test(String(formData.applicantPhone))) {
      return { ok: false, missing: "applicantPhone (invalid)" };
    }
    return { ok: true };
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
      const payload = { ...formData };
      const res = await fetch("/api/forms/gov-organization-registration", {
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
      setTimeout(() => window.print(), 200);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="header-title">सहकारी संस्था दर्ता सिफारिस ।</div>

        <div className="sub-header">
          <span>अनुसूची २</span>
          <br />
          <span>दर्ता दरखास्तको नमुना</span>
        </div>

        <div className="top-info">
          श्री दर्ता गर्ने अधिकारी _______ ज्यु, <br />
          ______ नगर कार्यपालिकाको कार्यालय <br />
          <br />
          मिति:{" "}
          <input
            type="text"
            className="date-input"
            name="date"
            placeholder="२०७८-०५-०५"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <h3 className="subject">विषय : सहकारी संस्था दर्ता ।</h3>

        <p className="paragraph">
          महोदय,
          <br />
          <br />
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
        </p>

        <h3 className="section-title">संस्थासम्बन्धी विवरण</h3>

        <div className="section">
          <label>(क) प्रस्तावित संस्था नामः *</label>
          <input type="text" name="proposalName" value={formData.proposalName} onChange={handleChange} />

          <label>(ख) ठेगाना: वडा नं. *</label>
          <input type="text" name="wardNo" value={formData.wardNo} onChange={handleChange} />

          <label>(ग) उद्देश्य: *</label>
          <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />

          <label>(घ) गतिविधि: *</label>
          <input type="text" name="activities" value={formData.activities} onChange={handleChange} />

          <label>(ङ) मुख्य कार्यालय: *</label>
          <input type="text" name="headOffice" value={formData.headOffice} onChange={handleChange} />

          <label>(च) शाखा कार्यालय:</label>
          <input type="text" name="branchOffice" value={formData.branchOffice} onChange={handleChange} />

          <label>(छ) दायित्व: *</label>
          <input type="text" name="liability" value={formData.liability} onChange={handleChange} />

          <label>(ज) सदस्य संख्या:</label>
          <div className="inline-row">
            महिला: <input type="text" name="femaleMembers" value={formData.femaleMembers} onChange={handleChange} /> जना
            पुरुष: <input type="text" name="maleMembers" value={formData.maleMembers} onChange={handleChange} /> जना
          </div>

          <label>(झ) कुल शेयर पूँजीको रकमः *</label>
          <input type="text" name="totalShareCapital" value={formData.totalShareCapital} onChange={handleChange} />

          <label>(ञ) प्राप्त प्रवेश शुल्कको रकमः *</label>
          <input type="text" name="entranceFee" value={formData.entranceFee} onChange={handleChange} />
        </div>

        <h3 className="section-title">निवेदकको विवरण</h3>

        <div className="section">
          <label>निवेदकको नाम *</label>
          <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />

          <label>निवेदकको ठेगाना *</label>
          <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} />

          <label>निवेदकको नागरिकता नं *</label>
          <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} />

          <label>निवेदकको फोन नं. *</label>
          <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} />
        </div>

        <div className="submit-box">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <footer className="footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
};

export default GovOrganizationReg;
