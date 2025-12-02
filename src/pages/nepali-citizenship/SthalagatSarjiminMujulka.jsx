// src/components/SthalagatSarjiminMujulka.jsx
import React, { useState } from "react";
import "./SthalagatSarjiminMujulka.css";

const FORM_KEY = "sthalagat-sarjimin-mujulka";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function SthalagatSarjiminMujulka() {
  const [form, setForm] = useState({
    letter_date: "2025-01-11", // yyyy-mm-dd
    district: "काठमाडौँ",
    office: "जिल्ला प्रशासन कार्यालय",
    municipality: "नागार्जुन नगरपालिका",
    ward_no: "1",
    applicant_title: "श्री",
    applicant_name: "",
    claim_reason: "",
    certificate_details: "",
    tapsil: [
      // default single row
      { name: "", watan: "", prpn_no: "", issue_date: "", remark: "" }
    ],
    signatory_name: "",
    signatory_position: "",
    signatory_date: "",
    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const upd = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  // tapsil editors
  const updateTapsilRow = (idx, key) => (e) => {
    setForm(s => {
      const rows = s.tapsil.slice();
      rows[idx] = { ...rows[idx], [key]: e.target.value };
      return { ...s, tapsil: rows };
    });
  };
  const addTapsilRow = () => setForm(s => ({ ...s, tapsil: s.tapsil.concat({ name: "", watan: "", prpn_no: "", issue_date: "", remark: "" }) }));
  const removeTapsilRow = (idx) => setForm(s => ({ ...s, tapsil: s.tapsil.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.applicant_name && !form.applicant_name_footer) return "निवेदकको नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const v = validate();
    if (v) { setMessage({ type: "error", text: v }); return; }

    setLoading(true);
    try {
      // payload: tapsil will be an array — backend will stringify it
      const payload = { ...form };
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

      setMessage({ type: "success", text: `रेकर्ड सेभ भयो (id: ${body.id || "unknown"})` });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकेन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sarjimin-mujulka-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        स्थलगत सर्जमिन मुचुल्का
        <span className="top-right-bread">फिर्ता नागरिकता &gt; स्थलगत सर्जमिन मुचुल्का</span>
      </div>

      <div className="form-header-details">
        <h3>अनुसूची-३</h3>
        <p>नियम ३ को उपनियम (३) को खण्ड (क) सँग सम्बन्धित</p>
      </div>

      <div className="intro-paragraph">
        <div>
          <label>लिखत मिति: </label>
          <input type="date" value={form.letter_date} onChange={upd("letter_date")} />
        </div>

        <div>
          <label>जिल्ला:</label>
          <input value={form.district} onChange={upd("district")} />
          <label> कार्यालय:</label>
          <input value={form.office} onChange={upd("office")} />
        </div>

        <div>
          <label>गा.पा./न.पा.:</label>
          <input value={form.municipality} onChange={upd("municipality")} />
          <label> वडा नं:</label>
          <input value={form.ward_no} onChange={upd("ward_no")} />
        </div>

        <div>
          <label>निवेदक शीर्षक:</label>
          <select value={form.applicant_title} onChange={upd("applicant_title")}>
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input placeholder="निवेदकको नाम" value={form.applicant_name} onChange={upd("applicant_name")} />
        </div>

        <div>
          <label>दाबी/कारण:</label>
          <input value={form.claim_reason} onChange={upd("claim_reason")} />
        </div>

        <div>
          <label>प्रमाणपत्र / दर्ता विवरण:</label>
          <input value={form.certificate_details} onChange={upd("certificate_details")} />
        </div>
      </div>

      <div className="table-section">
        <h4>तपसिल</h4>
        <table className="details-table">
          <thead>
            <tr>
              <th>#</th>
              <th>नाम थर</th>
              <th>वतन</th>
              <th>ना.प्र.प.नं</th>
              <th>जारी मिति</th>
              <th>कैफियत</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form.tapsil.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td><input value={row.name} onChange={updateTapsilRow(idx, "name")} /></td>
                <td><input value={row.watan} onChange={updateTapsilRow(idx, "watan")} /></td>
                <td><input value={row.prpn_no} onChange={updateTapsilRow(idx, "prpn_no")} /></td>
                <td><input type="date" value={row.issue_date} onChange={updateTapsilRow(idx, "issue_date")} /></td>
                <td><input value={row.remark} onChange={updateTapsilRow(idx, "remark")} /></td>
                <td>
                  <button type="button" onClick={() => removeTapsilRow(idx)}>−</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 8 }}>
          <button type="button" onClick={addTapsilRow}>+ नयाँ रो थप्नुहोस्</button>
        </div>
      </div>

      <div className="signature-section">
        <div>
          <label>नाम: </label>
          <input value={form.signatory_name} onChange={upd("signatory_name")} />
        </div>
        <div>
          <label>पद: </label>
          <input value={form.signatory_position} onChange={upd("signatory_position")} />
        </div>
        <div>
          <label>मिति: </label>
          <input type="date" value={form.signatory_date} onChange={upd("signatory_date")} />
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div>
          <label>नाम</label>
          <input value={form.applicant_name_footer} onChange={upd("applicant_name_footer")} />
        </div>
        <div>
          <label>ठेगाना</label>
          <input value={form.applicant_address_footer} onChange={upd("applicant_address_footer")} />
        </div>
        <div>
          <label>ना.प्र.नं.</label>
          <input value={form.applicant_citizenship_no} onChange={upd("applicant_citizenship_no")} />
        </div>
        <div>
          <label>फोन</label>
          <input value={form.applicant_phone} onChange={upd("applicant_phone")} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>नोट्स</label>
        <textarea value={form.notes} onChange={upd("notes")} rows={3} />
      </div>

      <div className="form-footer" style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>{loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
      </div>

      {message && <div style={{ marginTop: 8, color: message.type === "error" ? "crimson" : "green" }}>{message.text}</div>}
    </form>
  );
}
