// LandClassificationRecommendation.jsx
import React, { useState } from "react";
import "./LandClassificationRecommendation.css";

const emptyEntry = () => ({
  owner_name: "",
  owner_address: "",
  plot_no: "",
  classification: "",
  classification_zone: ""
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",
  decision_date: "२०७९/१०/२५",
  standard_version: "२०७९",
  signer_name: "",
  signer_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

export default function LandClassificationRecommendation() {
  const [form, setForm] = useState(initialState);
  const [entries, setEntries] = useState([emptyEntry()]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const setEntry = (idx, key, value) =>
    setEntries((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));

  const addEntry = () => setEntries((p) => [...p, emptyEntry()]);
  const removeEntry = (i) => setEntries((p) => p.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.decision_date) return "कृपया निर्णय मिति भर्नुहोस्।";
    if (!form.standard_version) return "कृपया वर्गीकरण मापदण्ड भर्नुहोस्।";
    if (!entries.length) return "कम्तिमा एक तपशिल पङ्क्ति आवश्यक छ।";
    for (let i = 0; i < entries.length; i++) {
      const r = entries[i];
      if (!r.owner_name || !r.plot_no || !r.classification || !r.classification_zone) {
        return `तालिका पङ्क्ति ${i + 1} का अनिवार्य क्षेत्रहरू भर्नुहोस्।`;
      }
    }
    if (!form.signer_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const payload = {
        ...form,
        entries: JSON.stringify(entries)
      };

      const res = await fetch("/api/forms/land-classification-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optional reset:
      // setForm(initialState); setEntries([emptyEntry()]);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="land-classification-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          जग्गा वर्गीकरण
          <span className="top-right-bread">घर / जग्गा जमिन &gt; जग्गा वर्गीकरण</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/logo.png" alt="Nepal Emblem" /></div>
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
          <p>विषय: <span className="underline-text">जग्गा वर्गीकरण सिफारिस सम्बन्धमा।</span></p>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा यस <span className="bold-text">नागार्जुन नगरपालिका</span> स्थानीय भू-उपयोग परिषद तथा नगरकार्यपालिकाको{" "}
            <input name="decision_date" value={form.decision_date} onChange={handleChange} className="inline-box-input medium-box" /> गतेको निर्णयबाट स्वीकृत भई जारी भएको नागार्जुन नगरपालिका को भू-उपयोग वर्गीकरण मापदण्ड{" "}
            <input name="standard_version" value={form.standard_version} onChange={handleChange} className="inline-box-input medium-box" /> मुताविक निवेदकको जग्गा निम्न क्षेत्रमा रहेको व्यहोरा जानकारीको लागि अनुरोध छ ।
          </p>
        </div>

        <div className="table-section">
          <h4 className="table-title">तपशिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width:'5%'}}>क्र.स.</th>
                  <th style={{width:'20%'}}>जग्गाधनीको नाम</th>
                  <th style={{width:'15%'}}>ठेगाना</th>
                  <th style={{width:'10%'}}>कित्ता नं</th>
                  <th style={{width:'25%'}}>श्रेस्तामा कायम गर्न स्वीकृत भएको जग्गाको वर्गीकरण</th>
                  <th style={{width:'25%'}}>वर्गीकरण क्षेत्र</th>
                  <th style={{width:'5%'}}></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input name={`owner_name_${i}`} value={r.owner_name} onChange={(e) => setEntry(i, "owner_name", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input name={`owner_address_${i}`} value={r.owner_address} onChange={(e) => setEntry(i, "owner_address", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input name={`plot_no_${i}`} value={r.plot_no} onChange={(e) => setEntry(i, "plot_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input name={`classification_${i}`} value={r.classification} onChange={(e) => setEntry(i, "classification", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input name={`classification_zone_${i}`} value={r.classification_zone} onChange={(e) => setEntry(i, "classification_zone", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td className="action-cell">
                      {entries.length > 1 ? (
                        <button type="button" onClick={() => removeEntry(i)} className="add-btn">-</button>
                      ) : (
                        <button type="button" onClick={addEntry} className="add-btn">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop:8}}>
            <button type="button" onClick={addEntry} className="add-btn">कतार थप्नुहोस्</button>
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
