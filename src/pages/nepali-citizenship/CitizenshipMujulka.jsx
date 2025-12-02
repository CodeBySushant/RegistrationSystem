// src/components/CitizenshipMujulka.jsx
import React, { useState } from "react";
import "./CitizenshipMujulka.css";

const FORM_KEY = "citizenship-mujulka";
const API_URL = `/api/forms/${FORM_KEY}`;

const emptyRow = () => ({ district: "", local_unit: "", ward_no: "", residence: "", prpn_no: "" });

export default function CitizenshipMujulka() {
  const [form, setForm] = useState({
    municipality: "नागार्जुन नगरपालिका",
    district: "काठमाडौँ",
    ward_no: "1",
    written_date: "",
    permanent_place: "",
    previous_local_unit: "",
    applicant_name: "",
    applicant_citizenship_no: "",
    applicant_address: "",
    table_rows: [emptyRow()],
    signer_district: "काठमाडौँ",
    signer_local_unit: "",
    signer_role: "",
    footer_date: "",
    footer_role_person: "",
    footer_signature: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (key) => (e) => setForm(s => ({ ...s, [key]: e.target.value }));

  // table rows handlers
  const updateRow = (idx, key) => (e) => {
    setForm(s => {
      const rows = s.table_rows.slice();
      rows[idx] = { ...rows[idx], [key]: e.target.value };
      return { ...s, table_rows: rows };
    });
  };
  const addRow = () => setForm(s => ({ ...s, table_rows: [...s.table_rows, emptyRow()] }));
  const removeRow = (idx) => setForm(s => ({ ...s, table_rows: s.table_rows.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.applicant_name.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no.trim()) return "निवेदकको नागरिकता नं. आवश्यक छ।";
    // simple check that at least one table row has district+residence
    const goodRow = form.table_rows.some(r => (r.district || r.residence));
    if (!goodRow) return "तपसिलमा कम्तिमा एक पंक्ति आवश्यक छ।";
    return null;
  };

  const toPayload = (f) => ({
    municipality: f.municipality || null,
    district: f.district || null,
    ward_no: f.ward_no || null,
    written_date: f.written_date || null,
    permanent_place: f.permanent_place || null,
    previous_local_unit: f.previous_local_unit || null,
    applicant_name: f.applicant_name || null,
    applicant_citizenship_no: f.applicant_citizenship_no || null,
    applicant_address: f.applicant_address || null,
    // stringify table rows so generic controller stores single column value
    table_rows: JSON.stringify(f.table_rows || []),
    signer_district: f.signer_district || null,
    signer_local_unit: f.signer_local_unit || null,
    signer_role: f.signer_role || null,
    footer_date: f.footer_date || null,
    footer_role_person: f.footer_role_person || null,
    footer_signature: f.footer_signature || null,
    notes: f.notes || null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const payload = toPayload(form);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }
      setMessage({ type: "success", text: `सेभ भयो (id: ${body.id || "unknown"})` });
      // keep form or reset — here we keep and clear message after
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-mujulka-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        नागरिकताको लागि मुचुल्का ।
        <span className="top-right-bread">नागरिकता &gt; नागरिकताको लागि मुचुल्का</span>
      </div>

      <div className="header-text center-text">
        <p>
          लिखत मिति: <input type="date" className="dotted-input medium-input" value={form.written_date} onChange={update("written_date")} />
          &nbsp; जिल्ला <input type="text" className="dotted-input medium-input" value={form.district} onChange={update("district")} /> 
          &nbsp; {form.municipality} वडा नं <input type="text" className="dotted-input tiny-input" value={form.ward_no} onChange={update("ward_no")} />
        </p>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          साविकको ठेगाना हालसम्म <span className="underline-text bold-text">नेपाली नागरिकताको प्रमाण-पत्र</span> नलिएको...
        </p>

        <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>जिल्ला</th>
                  <th>गाउँपालिका</th>
                  <th>वडा नं.</th>
                  <th>निवास</th>
                  <th>ना.प्र.प.नं.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {form.table_rows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td><input value={row.district} onChange={updateRow(idx, "district")} className="table-input" /></td>
                    <td><input value={row.local_unit} onChange={updateRow(idx, "local_unit")} className="table-input" /></td>
                    <td><input value={row.ward_no} onChange={updateRow(idx, "ward_no")} className="table-input" /></td>
                    <td><input value={row.residence} onChange={updateRow(idx, "residence")} className="table-input" /></td>
                    <td><input value={row.prpn_no} onChange={updateRow(idx, "prpn_no")} className="table-input" /></td>
                    <td className="action-cell">
                      <button type="button" onClick={() => removeRow(idx)} disabled={form.table_rows.length === 1}>−</button>
                      <button type="button" onClick={addRow}>＋</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures / footer fields */}
        <div className="signature-section-bottom">
          <div>
            <label>जिल्ला</label>
            <input type="text" className="dotted-input medium-input" value={form.signer_district} onChange={update("signer_district")} />
          </div>
          <div>
            <label>गाउँपालिका/वडा नं.</label>
            <input type="text" className="dotted-input medium-input" value={form.signer_local_unit} onChange={update("signer_local_unit")} />
          </div>
          <div>
            <label>पद</label>
            <input type="text" className="dotted-input medium-input" value={form.signer_role} onChange={update("signer_role")} />
          </div>
        </div>

        <div className="footer-signature-row">
          <div>
            <label>मिति</label>
            <input type="date" className="dotted-input medium-input" value={form.footer_date} onChange={update("footer_date")} />
          </div>
          <div>
            <label>पदास्र्तमा श्री</label>
            <input type="text" className="dotted-input medium-input" value={form.footer_role_person} onChange={update("footer_role_person")} />
          </div>
          <div>
            <label>सहीछाप</label>
            <input type="text" className="dotted-input medium-input" value={form.footer_signature} onChange={update("footer_signature")} />
          </div>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input type="text" value={form.applicant_name} onChange={update("applicant_name")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>ठेगाना</label>
            <input type="text" value={form.applicant_address} onChange={update("applicant_address")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>नागरिकता नं.</label>
            <input type="text" value={form.applicant_citizenship_no} onChange={update("applicant_citizenship_no")} className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>फोन नं.</label>
            <input type="text" value={form.notes} onChange={update("notes")} className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {message && <div style={{ marginTop: 10, color: message.type === "error" ? "crimson" : "green" }}>{message.text}</div>}
    </form>
  );
}
