// LandConsolidationRecommendation.jsx
import React, { useState } from "react";
import "./LandConsolidationRecommendation.css";

const emptyRow = () => ({
  current_gbv: "",
  previous_gbv: "",
  seat_no: "",
  plot_no: "",
  area: "",
  remarks: ""
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  municipality_text: "नागार्जुन नगरपालिका",
  ward_no: "1",
  applicant_relation_prefix: "श्री",
  applicant_relation_name: "",
  relation_type: "छोरा",
  relation_name: "",
  notes: "",
  signer_name: "",
  signer_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: ""
};

export default function LandConsolidationRecommendation() {
  const [form, setForm] = useState(initialState);
  const [rows, setRows] = useState([emptyRow()]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const setRow = (i, key, value) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));

  const addRow = () => setRows((r) => [...r, emptyRow()]);
  const removeRow = (i) => setRows((r) => r.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.applicant_relation_name) return "कृपया सम्बन्धित व्यक्तिको नाम भर्नुहोस्।";
    if (!rows.length) return "कम्तिमा एक तपशिल पङ्क्ति आवश्यक छ।";
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!r.current_gbv || !r.previous_gbv) return `तालिका पंक्ति ${i + 1} मा हाल/साविक गा.वि.स. भर्नुहोस्।`;
    }
    if (!form.signer_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        entries: JSON.stringify(rows)
      };

      const res = await fetch("/api/forms/land-consolidation-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optional: reset
      // setForm(initialState); setRows([emptyRow()]);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="land-consolidation-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          जग्गा एकिकृत सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; जग्गा एकिकृत सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">सिफारिस सम्बन्धमा।</span></p>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ <input name="municipality_text" value={form.municipality_text} onChange={handleChange} className="inline-box-input medium-box" /> वडा नं. {form.ward_no} बस्ने{" "}
            <input name="applicant_relation_name" value={form.applicant_relation_name} onChange={handleChange} className="inline-box-input medium-box" required /> <span className="red">*</span> को नाति/नातिनी/आदि सम्बन्धी विवरण अनुसारका कित्ताहरूलाई एकिकृत गर्न सिफारिस माग गरिएकोले कार्यालयको नियमानुसार ती कित्ताहरू एकिकृत गरिदिन सिफारिस गरिन्छ।
          </p>
        </div>

        <div className="table-section">
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width: '5%'}}>क्र.स.</th>
                  <th style={{width: '20%'}}>हालको गा. वि. स.</th>
                  <th style={{width: '20%'}}>साविक गा. वि. स.</th>
                  <th style={{width: '10%'}}>सिट नं.</th>
                  <th style={{width: '15%'}}>कि. नं.</th>
                  <th style={{width: '15%'}}>क्षेत्रफल</th>
                  <th style={{width: '15%'}}>कैफियत</th>
                  <th style={{width: '5%'}}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input value={r.current_gbv} onChange={(e) => setRow(i, "current_gbv", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={r.previous_gbv} onChange={(e) => setRow(i, "previous_gbv", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={r.seat_no} onChange={(e) => setRow(i, "seat_no", e.target.value)} className="table-input" /></td>
                    <td><input value={r.plot_no} onChange={(e) => setRow(i, "plot_no", e.target.value)} className="table-input" /></td>
                    <td><input value={r.area} onChange={(e) => setRow(i, "area", e.target.value)} className="table-input" /></td>
                    <td><input value={r.remarks} onChange={(e) => setRow(i, "remarks", e.target.value)} className="table-input" /></td>
                    <td className="action-cell">
                      {rows.length > 1 ? (
                        <button type="button" onClick={() => removeRow(i)} className="add-btn">-</button>
                      ) : (
                        <button type="button" onClick={addRow} className="add-btn">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addRow} className="add-btn">कतार थप्नुहोस्</button>
          </div>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={handleChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={handleChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={handleChange} className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && <div className="success-message" style={{ marginTop: 12 }}>{message}</div>}
        {error && <div className="error-message" style={{ marginTop: 12 }}>{error}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
