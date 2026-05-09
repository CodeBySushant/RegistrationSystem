// BusinessRegSummary.jsx
import React, { useState, useEffect } from "react";
import "./BusinessRegSummary.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const toNepaliDigits = (str) => {
  const map = { 0: "०", 1: "१", 2: "२", 3: "३", 4: "४", 5: "५", 6: "६", 7: "७", 8: "८", 9: "९" };
  return String(str).replace(/[0-9]/g, (d) => map[d]);
};

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  addressee: "",
  mailTo: "",
  introText: "",
  description: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  positionTitle: "",
};

const makeEmptyBusiness = () => ({
  regNo: "", regDate: "", businessName: "", address: "", proprietor: "",
});

export default function BusinessRegSummary() {
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [businessList, setBusinessList] = useState([makeEmptyBusiness()]);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onBusinessChange = (index, e) => {
    const { name, value } = e.target;
    setBusinessList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addBusinessRow = () => setBusinessList((prev) => [...prev, makeEmptyBusiness()]);

  const removeBusinessRow = (index) => {
    setBusinessList((prev) => prev.filter((_, i) => i !== index));
  };

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.businesses = JSON.stringify(
      businessList.filter((b) => b.regNo || b.businessName)
    );
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/business-reg-summary", buildPayload());
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialForm);
        setBusinessList([makeEmptyBusiness()]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/business-reg-summary", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialForm);
        setBusinessList([makeEmptyBusiness()]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brs-page">
      <form className="brs-paper" onSubmit={handleSubmit}>

        {/* --- Top Bar --- */}
        <div className="brs-topbar">
          व्यवसाय दर्ता विवरण ।
          <span className="brs-topbar-right">व्यवसाय &gt; व्यवसाय दर्ता विवरण</span>
        </div>

        {/* --- Letterhead --- */}
        <div className="brs-letterhead">
          <div className="brs-logo">
            <img alt="Nepal Emblem" src={MUNICIPALITY.logoSrc} />
          </div>
          <div className="brs-head-text">
            <div className="brs-head-main">{MUNICIPALITY.name}</div>
            <div className="brs-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `${user?.ward || ""} नं. वडा कार्यालय`}
            </div>
            <div className="brs-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="brs-head-meta">
            <div>
              मिति :{" "}
              <input
                readOnly
                className="brs-small-input"
                value={toNepaliDigits(form.date)}
              />
            </div>
            <div className="brs-meta-line">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
          </div>
        </div>

        {/* --- Ref Numbers --- */}
        <div className="brs-ref-row">
          <div className="brs-ref-block">
            <label>पत्र संख्या :</label>
            <input name="refLetterNo" value={form.refLetterNo} onChange={onChange} />
          </div>
          <div className="brs-ref-block">
            <label>चलानी नं. :</label>
            <input name="chalaniNo" value={form.chalaniNo} onChange={onChange} />
          </div>
        </div>

        {/* --- Addressee --- */}
        <div className="brs-to-block">
          <label>श्री</label>
          <input
            name="addressee"
            value={form.addressee}
            onChange={onChange}
            className="brs-long-input"
          />
          <br />
          <span>{MUNICIPALITY.name}, {MUNICIPALITY.city}</span>
        </div>

        {/* --- Subject --- */}
        <div className="brs-subject-row">
          <span className="brs-subject-label">विषयः</span>
          <span className="brs-subject-text">व्यवसाय दर्ताको विवरण पठाईदिनु बारे ।</span>
        </div>

        {/* --- Body --- */}
        <p className="brs-body-para">
          प्रस्तुत विषयमा {MUNICIPALITY.name} को उद्योग, व्यवसाय, दर्ता, नविकरण, संचालन र नियमन
          सम्बन्धी ... कार्यालयले मेल{" "}
          <input
            name="mailTo"
            value={form.mailTo}
            onChange={onChange}
            className="brs-under-input"
          />{" "}
          मा पठाईदिन अनुरोध गरेको छ ।
        </p>

        {/* --- Business Table --- */}
        <div className="brs-table-wrapper">
          <table className="brs-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>दर्ता नं.</th>
                <th>दर्ता मिति</th>
                <th>व्यवसायको नाम</th>
                <th>ठेगाना</th>
                <th>प्रोप्राइटर</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {businessList.map((b, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name="regNo" value={b.regNo} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="regDate" value={b.regDate} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="businessName" value={b.businessName} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="address" value={b.address} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td><input name="proprietor" value={b.proprietor} onChange={(e) => onBusinessChange(i, e)} /></td>
                  <td>
                    {businessList.length > 1 && (
                      <button type="button" className="brs-row-btn" onClick={() => removeBusinessRow(i)}>−</button>
                    )}
                    {i === businessList.length - 1 && (
                      <button type="button" className="brs-row-btn" onClick={addBusinessRow}>+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Description --- */}
        <div className="brs-desc-block">
          <label>बिस्तृतः</label>
          <textarea name="description" rows="4" value={form.description} onChange={onChange} />
        </div>

        {/* --- Applicant Details --- */}
        <ApplicantDetailsNp formData={form} handleChange={onChange} />

        {/* --- Position + Footer --- */}
        <div className="brs-bottom-row">
          <input
            name="positionTitle"
            value={form.positionTitle}
            onChange={onChange}
            className="brs-post-input"
            placeholder="पद"
          />
          <button className="save-print-btn" type="button" onClick={handlePrint}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
}