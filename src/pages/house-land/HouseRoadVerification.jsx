// HouseRoadVerification.jsx
import React, { useState } from "react";
import "./HouseRoadVerification.css";

const emptyRow = () => ({
  ward_no: "",
  seat_no: "",
  plot_no: "",
  area: "",
  road_name: "",
  has_house: "घरभएको", // or 'घरनभएको'
  road_type: "",
  remarks: ""
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  addressee_office: "मालपोत कार्यालय",
  addressee_location: "",
  municipality: "नागार्जुन",
  ward_no: "1",
  owner_prefix: "श्री",
  owner_name: "",
  notes: ""
};

export default function HouseRoadVerification() {
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
    if (!form.owner_name) return "कृपया नाम/निवेदकको नाम भर्नुहोस्।";
    if (!rows.length) return "कम्तिमा एक घर बाटो विवरण हुनुपर्छ।";
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!r.ward_no || !r.plot_no || !r.area || !r.road_type) {
        return `तालिका पंक्ति ${i + 1} मा अनिवार्य क्षेत्रहरू भर्नुहोस् (वडा नं, कित्ता नं, क्षेत्रफल, बाटोको प्रकार)।`;
      }
    }
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
        roads: JSON.stringify(rows)
      };

      const res = await fetch("/api/forms/house-road-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${data.id})`);
      // optionally reset:
      // setForm(initialState); setRows([emptyRow()]);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="house-road-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          घरबाटो प्रमाणित ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; घरबाटो प्रमाणित</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* Meta */}
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

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री {form.addressee_office}</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_location" value={form.addressee_location} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
            <span className="bold-text">, काठमाडौँ</span>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">घर बाटो प्रमाणित।</span></p>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा जिल्ला काठमाडौँ <span className="bg-gray-text">{form.municipality}</span> वडा नं. <input name="ward_no" value={form.ward_no} onChange={handleChange} className="inline-box-input tiny-box" /> (साविकको ठेगाना <select className="inline-select medium-select" name="previous_type" onChange={(e)=>setForm(p=>({...p, previous_type: e.target.value}))}><option></option><option>गा.वि.स.</option><option>नगरपालिका</option></select>, वडा नं. <input name="prev_ward_no" onChange={(e)=>setForm(p=>({...p, prev_ward_no: e.target.value}))} className="inline-box-input tiny-box" />) बस्ने{" "}
            <select name="owner_prefix" value={form.owner_prefix} onChange={handleChange} className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>{" "}
            <input name="owner_name" value={form.owner_name} onChange={handleChange} className="inline-box-input medium-box" required />{" "}
            को नाममा ... उक्त जग्गाको घरबाटो तलको तपशिल बमोजिम भएको व्यहोरा प्रमाणित गरिन्छ।
          </p>
        </div>

        {/* Table of roads */}
        <div className="table-section">
          <h4 className="table-title">घर बाटो विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width: '5%'}}>क्र.स.</th>
                  <th style={{width: '8%'}}>वडा नं.</th>
                  <th style={{width: '8%'}}>सिट नं.</th>
                  <th style={{width: '8%'}}>कित्ता नं.</th>
                  <th style={{width: '20%'}}>क्षेत्रफल</th>
                  <th style={{width: '15%'}}>बाटोको नाम</th>
                  <th style={{width: '10%'}}>घरभएको/नभएको</th>
                  <th style={{width: '10%'}}>बाटोको प्रकार</th>
                  <th style={{width: '10%'}}>कैफियत</th>
                  <th style={{width: '5%'}}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input value={r.ward_no} onChange={(e) => setRow(i, "ward_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={r.seat_no} onChange={(e) => setRow(i, "seat_no", e.target.value)} className="table-input" /></td>
                    <td><input value={r.plot_no} onChange={(e) => setRow(i, "plot_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={r.area} onChange={(e) => setRow(i, "area", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input value={r.road_name} onChange={(e) => setRow(i, "road_name", e.target.value)} className="table-input" /></td>
                    <td>
                      <select value={r.has_house} onChange={(e) => setRow(i, "has_house", e.target.value)} className="table-select">
                        <option>घरभएको</option>
                        <option>घरनभएको</option>
                      </select>
                    </td>
                    <td><input value={r.road_type} onChange={(e) => setRow(i, "road_type", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
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
          <div style={{marginTop: 8}}>
            <button type="button" onClick={addRow} className="add-btn">कतार थप्नुहोस्</button>
          </div>
        </div>

        {/* Note */}
        <div className="note-section">
          <label>नोट</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="note-textarea" rows="2" />
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name || ""} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" value={form.signer_designation || ""} onChange={handleChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="owner_name" type="text" className="detail-input bg-gray" value={form.owner_name} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" value={form.applicant_address || ""} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" value={form.applicant_citizenship_no || ""} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" value={form.applicant_phone || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className="success-message" style={{ marginTop: 12 }}>{message}</div>}
        {error && <div className="error-message" style={{ marginTop: 12 }}>{error}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
