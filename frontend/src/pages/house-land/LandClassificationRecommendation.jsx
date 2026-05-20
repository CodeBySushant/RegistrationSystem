// LandClassificationRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from LandClassificationRecommendation.css)
   All classes prefixed with "lcr-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .lcr-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Utility ── */
  .lcr-bold      { font-weight: bold; }
  .lcr-underline { text-decoration: underline; }
  .lcr-red       { color: red; font-weight: bold; margin: 0 2px; vertical-align: middle; }
  .lcr-red-mark  { color: red; position: absolute; top: 0; left: 0; }
  .lcr-red-star  { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
  .lcr-in-cell   { font-size: 0.8rem; }

  /* ── Top Bar ── */
  .lcr-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .lcr-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Header ── */
  .lcr-header { text-align: center; margin-bottom: 20px; position: relative; }
  .lcr-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
  .lcr-header-text { display: flex; flex-direction: column; align-items: center; }
  .lcr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
  .lcr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
  .lcr-address-text,
  .lcr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

  /* ── Meta ── */
  .lcr-meta-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
  .lcr-meta-left p, .lcr-meta-right p { margin: 5px 0; }
  .lcr-dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    padding: 2px 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .lcr-w-small { width: 120px; }

  /* ── Subject ── */
  .lcr-subject { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

  /* ── Body ── */
  .lcr-body {
    font-size: 1.05rem;
    line-height: 2.6;
    text-align: justify;
    margin-bottom: 20px;
  }
  .lcr-inline-input {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
    margin: 0 5px;
    font-size: 1rem;
    outline: none;
    display: inline-block;
    vertical-align: middle;
    font-family: inherit;
  }
  .lcr-w-medium-box { width: 200px; }

  /* ── Table ── */
  .lcr-table-section    { margin-top: 20px; margin-bottom: 40px; }
  .lcr-table-title      { text-align: center; font-weight: bold; margin-bottom: 10px; }
  .lcr-table-responsive { overflow-x: auto; }
  .lcr-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
  }
  .lcr-table th {
    background-color: #e0e0e0;
    border: 1px solid #555;
    padding: 8px;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
  }
  .lcr-table td { border: 1px solid #555; padding: 5px; }
  .lcr-table-input {
    width: 80%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 1rem;
    color: #e74c3c;
    font-family: inherit;
  }
  .lcr-action-cell { text-align: center; }
  .lcr-add-btn {
    background-color: #2c3e50;
    color: white;
    border: none;
    width: 26px;
    height: 26px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    margin: 1px;
  }
  .lcr-add-btn:hover { background-color: #1a252f; }

  /* ── Signature ── */
  .lcr-signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
  .lcr-signature-block   { width: 220px; text-align: center; position: relative; }
  .lcr-signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
  .lcr-sig-name-input {
    width: 100%;
    margin-bottom: 5px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 1rem;
  }
  .lcr-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; }

  /* ── Applicant details overrides ── */
  .lcr-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }
  .lcr-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .lcr-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .lcr-container .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* ── Footer ── */
  .lcr-footer { text-align: center; margin-top: 40px; }
  .lcr-save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .lcr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .lcr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Copyright ── */
  .lcr-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print (was completely missing) ── */
  @media print {
    body * { visibility: hidden; }
    .lcr-container,
    .lcr-container * { visibility: visible; }
    .lcr-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 20px 40px;
      background: white;
    }
    .lcr-top-bar,
    .lcr-footer { display: none !important; }
    .lcr-add-btn { display: none !important; }
    input, select, textarea {
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 1px solid #000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .lcr-table th {
      background-color: #e0e0e0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .lcr-municipality-name,
    .lcr-ward-title,
    .lcr-address-text,
    .lcr-province-text {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row factory
   BUG FIX: entries/setEntry/addEntry/removeEntry were referenced but never defined
───────────────────────────────────────────────────────────────────────────── */
const emptyEntry = () => ({
  owner_name: "", owner_address: "", plot_no: "",
  classification: "", classification_zone: "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Initial state
   BUG FIX: useWardForm(initialState) used but neither defined.
   BUG FIX: applicantName was missing — ApplicantDetailsNp needs it.
───────────────────────────────────────────────────────────────────────────── */
const initialState = {
  letter_no:         "२०८२/८३",
  chalani_no:        "",
  date_nep:          new Date().toISOString().slice(0, 10),
  decision_date:     "२०७९/१०/२५",
  standard_version:  "२०७९",
  signer_name:       "",
  signer_designation: "",
  notes:             "",
  // ApplicantDetailsNp fields — BUG FIX: all four were missing
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function LandClassificationRecommendation() {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Dynamic entries table (BUG FIX: was referenced but never defined) ── */
  const [entries, setEntries] = useState([emptyEntry()]);

  const setEntry = (idx, key, value) =>
    setEntries((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );

  const addEntry    = () => setEntries((r) => [...r, emptyEntry()]);
  const removeEntry = (idx) =>
    setEntries((r) => r.filter((_, i) => i !== idx));

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, entries };
      const res = await axios.post("/api/forms/land-classification-recommendation", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
        setEntries([emptyEntry()]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save + Print ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const payload = { ...form, entries };
      const res = await axios.post("/api/forms/land-classification-recommendation", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
        setEntries([emptyEntry()]);
      }
    } catch (err) {
      console.error("Print error:", err.response || err.message || err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="lcr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top Bar ── */}
          <div className="lcr-top-bar">
            जग्गा वर्गीकरण
            <span className="lcr-breadcrumb">
              घर / जग्गा जमिन &gt; जग्गा वर्गीकरण
            </span>
          </div>

          {/* ── Header ──
              BUG FIX: was hardcoded — now dynamic from MUNICIPALITY config */}
          <div className="lcr-header">
            <div className="lcr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="lcr-header-text">
              <h1 className="lcr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="lcr-ward-title">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`}
              </h2>
              <p className="lcr-address-text">{MUNICIPALITY.officeLine  || "नागार्जुन, काठमाडौँ"}</p>
              <p className="lcr-province-text">{MUNICIPALITY.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="lcr-meta-row">
            <div className="lcr-meta-left">
              <p>पत्र संख्या : <span className="lcr-bold">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  className="lcr-dotted-input lcr-w-small"
                />
              </p>
            </div>
            <div className="lcr-meta-right">
              <p>मिति : <span className="lcr-bold">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="lcr-subject">
            <p>
              विषय:{" "}
              <span className="lcr-underline">जग्गा वर्गीकरण सिफारिस सम्बन्धमा।</span>
            </p>
          </div>

          {/* ── Body ── */}
          <div className="lcr-body">
            <p>
              उपरोक्त सम्बन्धमा यस{" "}
              <span className="lcr-bold">{MUNICIPALITY.name}</span> स्थानीय
              भू-उपयोग परिषद तथा नगरकार्यपालिकाको{" "}
              <input
                name="decision_date"
                value={form.decision_date}
                onChange={handleChange}
                className="lcr-inline-input lcr-w-medium-box"
              />{" "}
              गतेको निर्णयबाट स्वीकृत भई जारी भएको {MUNICIPALITY.name} को भू-उपयोग
              वर्गीकरण मापदण्ड{" "}
              <input
                name="standard_version"
                value={form.standard_version}
                onChange={handleChange}
                className="lcr-inline-input lcr-w-medium-box"
              />{" "}
              मुताविक निवेदकको जग्गा निम्न क्षेत्रमा रहेको व्यहोरा जानकारीको लागि
              अनुरोध छ ।
            </p>
          </div>

          {/* ── Entries table ── */}
          <div className="lcr-table-section">
            <h4 className="lcr-table-title">तपशिल</h4>
            <div className="lcr-table-responsive">
              <table className="lcr-table">
                <thead>
                  <tr>
                    <th style={{ width: "5%"  }}>क्र.स.</th>
                    <th style={{ width: "20%" }}>जग्गाधनीको नाम</th>
                    <th style={{ width: "15%" }}>ठेगाना</th>
                    <th style={{ width: "10%" }}>कित्ता नं</th>
                    <th style={{ width: "25%" }}>श्रेस्तामा कायम गर्न स्वीकृत भएको जग्गाको वर्गीकरण</th>
                    <th style={{ width: "25%" }}>वर्गीकरण क्षेत्र</th>
                    <th style={{ width: "5%"  }}></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <input value={r.owner_name}         onChange={(e) => setEntry(i, "owner_name",         e.target.value)} className="lcr-table-input" required />
                        <span className="lcr-red-star lcr-in-cell">*</span>
                      </td>
                      <td>
                        <input value={r.owner_address}      onChange={(e) => setEntry(i, "owner_address",      e.target.value)} className="lcr-table-input" required />
                        <span className="lcr-red-star lcr-in-cell">*</span>
                      </td>
                      <td>
                        <input value={r.plot_no}            onChange={(e) => setEntry(i, "plot_no",            e.target.value)} className="lcr-table-input" required />
                        <span className="lcr-red-star lcr-in-cell">*</span>
                      </td>
                      <td>
                        <input value={r.classification}     onChange={(e) => setEntry(i, "classification",     e.target.value)} className="lcr-table-input" required />
                        <span className="lcr-red-star lcr-in-cell">*</span>
                      </td>
                      <td>
                        <input value={r.classification_zone} onChange={(e) => setEntry(i, "classification_zone", e.target.value)} className="lcr-table-input" required />
                        <span className="lcr-red-star lcr-in-cell">*</span>
                      </td>
                      <td className="lcr-action-cell">
                        {entries.length > 1 ? (
                          <button type="button" className="lcr-add-btn" onClick={() => removeEntry(i)}>−</button>
                        ) : (
                          <button type="button" className="lcr-add-btn" onClick={addEntry}>+</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 8 }}>
              <button type="button" className="lcr-add-btn" onClick={addEntry}>
                + कतार थप्नुहोस्
              </button>
            </div>
          </div>

          {/* ── Signature ── */}
          <div className="lcr-signature-section">
            <div className="lcr-signature-block">
              <div className="lcr-signature-line"></div>
              <span className="lcr-red-mark">*</span>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="lcr-sig-name-input"
                required
              />
              <select
                name="signer_designation"
                value={form.signer_designation}
                onChange={handleChange}
                className="lcr-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          {/* ── Applicant Details ── */}
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* ── Footer ── */}
          <div className="lcr-footer">
            <button
              className="lcr-save-print-btn"
              type="button"
              onClick={handlePrint}
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="lcr-copyright">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
}