// BusinessClosed.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BusinessClosed.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  municipality: MUNICIPALITY.name,
  wardNo: MUNICIPALITY.wardNumber,
  introText: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  toOfficePerson: "", // optional salutation target
};

const initialBusinessRow = {
  id: 1,
  type: "",
  name: "",
  houseNo: "",
  tole: "",
  wardNo: "",
  remarks: "",
};

export default function BusinessClosed() {
  const [form, setForm] = useState(initialForm);
  const [rows, setRows] = useState([initialBusinessRow]);
  const [submitting, setSubmitting] = useState(false);

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

  const addRow = () =>
    setRows((p) => [
      ...p,
      {
        id: p.length + 1,
        type: "",
        name: "",
        houseNo: "",
        tole: "",
        wardNo: "",
        remarks: "",
      },
    ]);

  const validate = () => {
    if (!form.applicantName?.trim()) return "Applicant name required";
    if (!form.applicantCitizenship?.trim())
      return "Applicant citizenship required";
    // ensure no partial business rows (if any field filled, all required)
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const any =
        r.type || r.name || r.houseNo || r.tole || r.wardNo || r.remarks;
      if (any && (!r.type || !r.name))
        return `Complete business row ${i + 1} (type & name required)`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस्: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...form };
      // convert empty strings -> null
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });
      // send business rows as JSON string (backend in your project tends to expect JSON strings)
      payload.businesses = JSON.stringify(
        rows.filter(
          (r) =>
            r.type || r.name || r.houseNo || r.tole || r.wardNo || r.remarks
        )
      );
      const url = "/api/forms/business-closed";
      const res = await axios.post(url, payload);
      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully. ID: " + (res.data?.id ?? ""));
        setForm(initialForm);
        setRows([initialBusinessRow]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bc-page">
      <form className="bc-paper" onSubmit={handleSubmit}>
        <div className="bc-letterhead">
          <div className="bc-logo">
            <img
              src="./nepallogo.svg"
              alt="Logo"
            />
          </div>
          <div className="bc-head-text">
            <div className="bc-head-main">{MUNICIPALITY.name}</div>
            <div className="bc-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="bc-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="bc-head-meta">
            <div>
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={onChange}
                className="bc-small-input"
              />
            </div>
            <div className="bc-head-day">ने.सं.: ११४६ भाद्र, २ शनिवार</div>
          </div>
        </div>

        <div className="bc-ref-row">
          <div className="bc-ref-block">
            <label>पत्र संख्या :</label>
            <input
              name="refLetterNo"
              value={form.refLetterNo}
              onChange={onChange}
            />
          </div>
          <div className="bc-ref-block">
            <label>चलानी नं. :</label>
            <input
              name="chalaniNo"
              value={form.chalaniNo}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="bc-subject-row">
          <span className="bc-subject-label">विषयः</span>
          <span className="bc-subject-text">व्यवसाय बन्द बारे ।</span>
        </div>

        <p className="bc-salutation">
          श्री{" "}
          <input
            name="toOfficePerson"
            value={form.toOfficePerson}
            onChange={onChange}
            placeholder="ज्युलाई नाम"
          />{" "}
          ज्यु,
        </p>

        <div className="bc-address-line">
          <span>उपर्युक्त सम्बन्धमा</span>
                    <select name="municipality" value={form.municipality} onChange={onChange}>
            <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
          </select>
          <span>नगरपालिका वडा नं</span>
          <input
            name="wardNo"
            value={form.wardNo}
            onChange={onChange}
            className="bc-ward-input"
          />
        </div>

        <p className="bc-body-text">
          <textarea
            name="introText"
            value={form.introText}
            onChange={onChange}
            rows="3"
            placeholder="व्यवसाय बन्द सम्बन्धी छोटो व्यहोरा / कारण (optional)"
            style={{ width: "100%" }}
          />
        </p>

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
                  <td>
                    <input
                      name="type"
                      value={r.type}
                      onChange={(e) => onRowChange(i, e)}
                    />
                  </td>
                  <td>
                    <input
                      name="name"
                      value={r.name}
                      onChange={(e) => onRowChange(i, e)}
                    />
                  </td>
                  <td>
                    <input
                      name="houseNo"
                      value={r.houseNo}
                      onChange={(e) => onRowChange(i, e)}
                    />
                  </td>
                  <td>
                    <input
                      name="tole"
                      value={r.tole}
                      onChange={(e) => onRowChange(i, e)}
                    />
                  </td>
                  <td>
                    <input
                      name="wardNo"
                      value={r.wardNo}
                      onChange={(e) => onRowChange(i, e)}
                    />
                  </td>
                  <td>
                    <input
                      name="remarks"
                      value={r.remarks}
                      onChange={(e) => onRowChange(i, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addRow}>
              Add row +
            </button>
          </div>
        </div>

        <h3 className="bc-section-title">निवेदकको विवरण</h3>
        <div className="bc-applicant-box">
          <div className="bc-field">
            <label>निवेदकको नाम *</label>
            <input
              name="applicantName"
              value={form.applicantName}
              onChange={onChange}
              required
            />
          </div>
          <div className="bc-field">
            <label>निवेदकको ठेगाना *</label>
            <input
              name="applicantAddress"
              value={form.applicantAddress}
              onChange={onChange}
            />
          </div>
          <div className="bc-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input
              name="applicantCitizenship"
              value={form.applicantCitizenship}
              onChange={onChange}
              required
            />
          </div>
          <div className="bc-field">
            <label>निवेदकको फोन नं. *</label>
            <input
              name="applicantPhone"
              value={form.applicantPhone}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="bc-submit-row">
          <button className="bc-submit-btn" type="submit" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>

      <footer className="bc-footer">
        <footer className="bc-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}
