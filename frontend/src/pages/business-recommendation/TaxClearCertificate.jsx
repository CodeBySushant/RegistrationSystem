import React, { useState, useEffect } from "react";
import "./TaxClearCertificate.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  to_line1: "",
  to_line2: "",
  resident_name: "",
  ward_no: "",
  // table row
  fiscal_year: "",
  amount_due: "",
  receipt_no_date: "",
  estimated_arrear: "",
  paid_arrear: "",
  sign_name: "",
  sign_position: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

function TaxClearanceCertificate() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      const res = await axiosInstance.post("/api/forms/tax-clearance-certificate", payload);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      const res = await axiosInstance.post("/api/forms/tax-clearance-certificate", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tcc-page">
      <header className="tcc-topbar">
        <div className="tcc-top-left">कर बुझ्ता प्रमाण पत्र सम्बन्धमा</div>
        <div className="tcc-top-right">अवलोकन पृष्ठ / कर बुझ्ता प्रमाण पत्र सम्बन्धमा</div>
      </header>

      <form className="tcc-paper" onSubmit={handleSubmit}>
        {/* Letterhead */}
        <div className="tcc-letterhead">
          <div className="tcc-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Emblem" />
          </div>
          <div className="tcc-head-text">
            <div className="tcc-head-main">{MUNICIPALITY.name}</div>
            <div className="tcc-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="tcc-head-sub">
              {MUNICIPALITY.officeLine} <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="tcc-head-meta">
            <div>
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="tcc-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* पत्र संख्या / चलानी */}
        <div className="tcc-ref-row">
          <div className="tcc-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
          </div>
          <div className="tcc-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
          </div>
        </div>

        {/* To block */}
        <div className="tcc-to-block">
          <span>श्री</span>
          <input type="text" name="to_line1" className="tcc-long-input" value={form.to_line1} onChange={handleChange} />
          <br />
          <input type="text" name="to_line2" className="tcc-long-input tcc-to-second" value={form.to_line2} onChange={handleChange} />
        </div>

        {/* Subject */}
        <div className="tcc-subject-row">
          <span className="tcc-sub-label">विषयः</span>
          <span className="tcc-subject-text">कर बुझ्ता प्रमाण पत्र सम्बन्धमा ।</span>
        </div>

        {/* Body */}
        <p className="tcc-body">
          प्रस्तुत विषयमा <span className="tcc-bold">{MUNICIPALITY.name}</span>{" "}
          वडा नं. {user?.ward || ""} मा बस्ने श्री{" "}
          <input
            type="text"
            name="resident_name"
            className="tcc-medium-input"
            value={form.resident_name}
            onChange={handleChange}
          />{" "}
          को नाममा रहेको व्यवसाय / घर जग्गा / अन्य कर सम्बन्धी विवरण अनुसार
          तल उल्लेख गरिएको आर्थिक वर्षहरू सम्मको कर भरपाई भएको / नभएको
          प्रमाणित गर्न अनुरोध गरिन्छ ।
        </p>

        {/* Detail table */}
        <section className="tcc-section">
          <h3 className="tcc-subtitle">किरसियत विवरण</h3>
          <table className="tcc-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>आ.व.</th>
                <th>बुझाउनु पर्ने रकम</th>
                <th>भर गरेको रसिद नं./मिति</th>
                <th>कर बक्यौता अनुमानित रकम</th>
                <th>कर बक्यौता रकम बुझाएको रकम</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" name="fiscal_year" value={form.fiscal_year} onChange={handleChange} /></td>
                <td><input type="text" name="amount_due" value={form.amount_due} onChange={handleChange} /></td>
                <td><input type="text" name="receipt_no_date" value={form.receipt_no_date} onChange={handleChange} /></td>
                <td><input type="text" name="estimated_arrear" value={form.estimated_arrear} onChange={handleChange} /></td>
                <td><input type="text" name="paid_arrear" value={form.paid_arrear} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signature */}
        <div className="tcc-sign-top">
          <input
            type="text"
            name="sign_name"
            className="tcc-sign-name"
            placeholder="नाम, थर"
            value={form.sign_name}
            onChange={handleChange}
          />
          <select
            name="sign_position"
            className="tcc-post-select"
            value={form.sign_position}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        <div className="form-footer">
          <button className="save-print-btn" type="button" onClick={handlePrint}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
}

export default TaxClearanceCertificate;