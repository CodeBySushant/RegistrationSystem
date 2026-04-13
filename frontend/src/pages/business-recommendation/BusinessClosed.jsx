// BusinessClosed.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./BusinessClosed.css";

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
  municipality: MUNICIPALITY.name,
  wardNo: "",
  introText: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  toOfficePerson: "",
};

const makeNewRow = (id) => ({
  id,
  type: "",
  name: "",
  houseNo: "",
  tole: "",
  wardNo: "",
  remarks: "",
});

export default function BusinessClosed() {
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [rows, setRows] = useState([makeNewRow(1)]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.wardNo) {
      setForm((prev) => ({ ...prev, wardNo: user.ward }));
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onRowChange = (index, e) => {
    const { name, value } = e.target;
    setRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addRow = () => setRows((p) => [...p, makeNewRow(p.length + 1)]);

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "") payload[k] = null;
    });
    payload.businesses = JSON.stringify(
      rows.filter((r) => r.type || r.name || r.houseNo || r.tole || r.wardNo || r.remarks)
    );
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = buildPayload();
      const res = await axiosInstance.post("/api/forms/business-closed", payload);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialForm);
        setRows([makeNewRow(1)]);
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
      const payload = buildPayload();
      const res = await axiosInstance.post("/api/forms/business-closed", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialForm);
        setRows([makeNewRow(1)]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bc-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="bc-topbar">
        व्यवसाय बन्द ।
        <span className="bc-topbar-right">व्यवसाय &gt; व्यवसाय बन्द</span>
      </div>

      {/* --- Header / Letterhead --- */}
      <div className="bc-letterhead">
        <div className="bc-logo">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
        </div>
        <div className="bc-head-text">
          <div className="bc-head-main">{MUNICIPALITY.name}</div>
          <div className="bc-head-ward">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || ""} नं. वडा कार्यालय`}
          </div>
          <div className="bc-head-sub">
            {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
          </div>
        </div>
        <div className="bc-head-meta">
          <div>
            मिति :{" "}
            <input
              readOnly
              className="bc-small-input"
              value={toNepaliDigits(form.date)}
            />
          </div>
          <div className="bc-head-day">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
        </div>
      </div>

      {/* --- Ref Numbers --- */}
      <div className="bc-ref-row">
        <div className="bc-ref-block">
          <label>पत्र संख्या :</label>
          <input name="refLetterNo" value={form.refLetterNo} onChange={onChange} />
        </div>
        <div className="bc-ref-block">
          <label>चलानी नं. :</label>
          <input name="chalaniNo" value={form.chalaniNo} onChange={onChange} />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="bc-subject-row">
        <span className="bc-subject-label">विषयः</span>
        <span className="bc-subject-text">व्यवसाय बन्द बारे ।</span>
      </div>

      {/* --- Salutation --- */}
      <p className="bc-salutation">
        श्री{" "}
        <input
          name="toOfficePerson"
          value={form.toOfficePerson}
          onChange={onChange}
          placeholder="ज्युलाई नाम"
          className="bc-inline-input"
        />{" "}
        ज्यु,
      </p>

      {/* --- Address Line --- */}
      <div className="bc-address-line">
        <span>उपर्युक्त सम्बन्धमा</span>
        <select name="municipality" value={form.municipality} onChange={onChange}>
          <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
        </select>
        <span>वडा नं.</span>
        <input
          name="wardNo"
          value={form.wardNo}
          onChange={onChange}
          className="bc-ward-input"
        />
      </div>

      {/* --- Body Text --- */}
      <div className="bc-body-text">
        <textarea
          name="introText"
          value={form.introText}
          onChange={onChange}
          rows="3"
          placeholder="व्यवसाय बन्द सम्बन्धी छोटो व्यहोरा / कारण (optional)"
        />
      </div>

      {/* --- Business Table --- */}
      <div className="bc-table-wrapper">
        <table className="bc-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>व्यवसायको प्रकार</th>
              <th>व्यवसायको नाम</th>
              <th>घर नं.</th>
              <th>टोलको नाम</th>
              <th>वडा नं.</th>
              <th>कैफियत</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td><input name="type" value={r.type} onChange={(e) => onRowChange(i, e)} /></td>
                <td><input name="name" value={r.name} onChange={(e) => onRowChange(i, e)} /></td>
                <td><input name="houseNo" value={r.houseNo} onChange={(e) => onRowChange(i, e)} /></td>
                <td><input name="tole" value={r.tole} onChange={(e) => onRowChange(i, e)} /></td>
                <td><input name="wardNo" value={r.wardNo} onChange={(e) => onRowChange(i, e)} /></td>
                <td><input name="remarks" value={r.remarks} onChange={(e) => onRowChange(i, e)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="bc-add-row-btn" onClick={addRow}>
          + पङ्क्ति थप्नुहोस्
        </button>
      </div>

      {/* --- Applicant Details Box --- */}
      <ApplicantDetailsNp formData={form} handleChange={onChange} />

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
}