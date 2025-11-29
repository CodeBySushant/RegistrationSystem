// OrganizationRegistrationPunishment.jsx
import React, { useState } from "react";
import axios from "axios";
import "./OrganizationRegistrationPunishment.css";

const initialState = {
  date: "२०८२.०७.१५",
  refLetterNo: "",
  chalaniNo: "",
  toOffice: "",
  introText: "",
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: ""
};

const initialRow = {
  name: "",
  fatherName: "",
  permAddress: "",
  tempAddress: "",
  area: "",
  religion: ""
};

export default function OrganizationRegistrationPunishment() {
  const [form, setForm] = useState(initialState);
  const [rows, setRows] = useState([ { ...initialRow } ]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    setRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addRow = () => setRows((r) => [...r, { ...initialRow }]);
  const removeRow = (i) => setRows((r) => r.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    // require at least one person row with name
    if (!rows.some((r) => r.name?.trim())) return "कम्तिमा एक व्यक्तिको नाम हाल्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) { alert(err); return; }

    setSubmitting(true);
    try {
      // prepare payload
      const payload = { ...form };
      // normalize empty strings to null (optional)
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      // attach rows as JSON string
      payload.persons = JSON.stringify(rows);

      const url = "/api/forms/organization-registration-punishment";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setForm(initialState);
        setRows([ { ...initialRow } ]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="orp-page">
      <header className="orp-topbar">
        <div className="orp-top-left">सजाय पाएका नपाएको ।</div>
        <div className="orp-top-right">अवलोकन पृष्ठ / सजाय पाएका नपाएको सिफारिस</div>
      </header>

      <div className="orp-paper">
        <div className="orp-letterhead">
          <div className="orp-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png" alt="Emblem" />
          </div>

          <div className="orp-head-text">
            <div className="orp-head-main">नागार्जुन नगरपालिका</div>
            <div className="orp-head-ward">१ नं. वडा कार्यालय</div>
            <div className="orp-head-sub">नागार्जुन, काठमाडौं <br/> बागमती प्रदेश, नेपाल</div>
          </div>

          <div className="orp-head-meta">
            <div className="orp-meta-line">मिति : <input type="text" name="date" className="orp-small-input" value={form.date} onChange={handleChange} /></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="orp-ref-row">
            <div className="orp-ref-block">
              <label>पत्र संख्या :</label>
              <input type="text" name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
            </div>
            <div className="orp-ref-block">
              <label>चलानी नं. :</label>
              <input type="text" name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
            </div>
          </div>

          <div className="orp-to-block">
            <span>श्री</span>
            <input type="text" name="toOffice" className="orp-long-input" value={form.toOffice || ""} onChange={handleChange} />
            <span>ज्यु,</span>
            <br/>
            <input type="text" name="toOffice2" className="orp-long-input orp-to-second" value={form.toOffice2 || ""} onChange={handleChange} />
          </div>

          <div className="orp-subject-row">
            <span className="orp-sub-label">विषयः</span>
            <span className="orp-subject-text">सजाय पाएको नपाएकोबारे ।</span>
          </div>

          <p className="orp-body">
            {/* allow admin to edit intro if needed */}
            <textarea name="introText" value={form.introText || ""} onChange={handleChange} placeholder="मुख्य परिचय / उद्देश्य (यदि चाहियो)"></textarea>
          </p>

          <div className="orp-table-wrapper">
            <table className="orp-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>व्यक्तिको नाम थर</th>
                  <th>बाबुको नाम थर</th>
                  <th>स्थायी ठेगाना</th>
                  <th>अस्थायी ठेगाना</th>
                  <th>क्षेत्रफल</th>
                  <th>धर्म</th>
                  <th className="orp-table-actions">क्रिया</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input type="text" name="name" value={r.name} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="fatherName" value={r.fatherName} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="permAddress" value={r.permAddress} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="tempAddress" value={r.tempAddress} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="area" value={r.area} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td><input type="text" name="religion" value={r.religion} onChange={(e) => handleRowChange(i, e)} /></td>
                    <td className="orp-table-actions">
                      {rows.length > 1 && <button type="button" onClick={() => removeRow(i)}>-</button>}
                      {i === rows.length - 1 && <button type="button" onClick={addRow}>+</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="orp-sign-top">
            <input type="text" name="signerName" className="orp-sign-name" placeholder="नाम, थर" value={form.signerName} onChange={handleChange} />
            <select name="signerDesignation" className="orp-post-select" value={form.signerDesignation || ""} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="orp-section-title">निवेदकको विवरण</h3>
          <div className="orp-applicant-box">
            <div className="orp-field">
              <label>निवेदकको नाम *</label>
              <input type="text" name="applicantName" value={form.applicantName} onChange={handleChange} />
            </div>
            <div className="orp-field">
              <label>निवेदकको ठेगाना *</label>
              <input type="text" name="applicantAddress" value={form.applicantAddress} onChange={handleChange} />
            </div>
            <div className="orp-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input type="text" name="applicantCitizenship" value={form.applicantCitizenship} onChange={handleChange} />
            </div>
            <div className="orp-field">
              <label>निवेदकको फोन नं. *</label>
              <input type="text" name="applicantPhone" value={form.applicantPhone} onChange={handleChange} />
            </div>
          </div>

          <div className="orp-submit-row">
            <button className="orp-submit-btn" type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>

      <footer className="orp-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
