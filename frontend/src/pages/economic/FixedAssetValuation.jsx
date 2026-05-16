import React, { useState } from "react";
import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const styles = `
  /* --- Main Container --- */
  .valuation-container {
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

  /* --- Top Bar --- */
  .valuation-container .top-bar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }

  .valuation-container .top-right-bread {
    font-size: 0.9rem;
    color: #777;
    font-weight: normal;
  }

  /* --- Header Section --- */
  .valuation-container .form-header-section {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }

  .valuation-container .header-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
  }

  .valuation-container .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .valuation-container .municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .valuation-container .ward-title {
    color: #e74c3c;
    font-size: 2.5rem;
    margin: 5px 0;
    font-weight: bold;
  }

  .valuation-container .address-text,
  .valuation-container .province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  /* --- Meta Data --- */
  .valuation-container .meta-data-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-size: 1rem;
  }

  .valuation-container .meta-left p,
  .valuation-container .meta-right p { margin: 5px 0; }

  .valuation-container .bold-text { font-weight: bold; }

  .valuation-container .dotted-input {
    border: none;
    border-bottom: 1px dotted #000;
    background: transparent;
    outline: none;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .valuation-container .small-input { width: 120px; }

  /* --- Subject --- */
  .valuation-container .subject-section {
    text-align: center;
    margin: 20px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .valuation-container .underline-text { text-decoration: underline; }

  /* --- Fieldsets --- */
  .valuation-container fieldset {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px 20px;
    margin-bottom: 20px;
    background-color: rgba(255,255,255,0.35);
  }

  .valuation-container legend {
    font-weight: bold;
    font-size: 1rem;
    padding: 0 8px;
    color: #2c3e50;
  }

  /* --- Grid Row --- */
  .valuation-container .grid-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px 20px;
    margin-bottom: 14px;
    align-items: center;
  }

  .valuation-container .grid-row label {
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
  }

  .valuation-container .grid-row input,
  .valuation-container .grid-row textarea,
  .valuation-container .grid-row select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 0.95rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
  }

  .valuation-container .grid-row textarea {
    resize: vertical;
    min-height: 60px;
  }

  /* --- Table Section --- */
  .valuation-container .tapashil-section {
    margin-top: 20px;
  }

  .valuation-container .tapashil-section h4 {
    text-decoration: underline;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .valuation-container .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .valuation-container .valuation-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.6);
    min-width: 700px;
  }

  .valuation-container .valuation-table th {
    background-color: #eee;
    border: 1px solid #777;
    padding: 8px;
    text-align: center;
    font-size: 0.88rem;
    font-weight: bold;
    color: #444;
  }

  .valuation-container .valuation-table td {
    border: 1px solid #777;
    padding: 4px;
  }

  .valuation-container .table-input {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    padding: 4px;
    font-size: 0.95rem;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    box-sizing: border-box;
  }

  .valuation-container .row-btn {
    background: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 3px 8px;
    cursor: pointer;
    font-size: 1rem;
    margin: 2px;
  }

  .valuation-container .row-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .valuation-container .row-btn.remove { background: #c0392b; }
  .valuation-container .row-btn.add    { background: #27ae60; }

  /* --- Signature Section --- */
  .valuation-container .signature-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    margin-bottom: 30px;
  }

  .valuation-container .signature-block {
    width: 220px;
    text-align: center;
  }

  .valuation-container .signature-line {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    width: 100%;
  }

  .valuation-container .inline-input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .valuation-container .input-required-star {
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-weight: bold;
    pointer-events: none;
    font-size: 14px;
  }

  .valuation-container .sig-name-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    background: transparent;
    padding-left: 18px;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    box-sizing: border-box;
  }

  .valuation-container .designation-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    margin-top: 6px;
  }

  /* --- Applicant Details Box --- */
  .valuation-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.4);
    margin-top: 20px;
    border-radius: 4px;
  }

  .valuation-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .valuation-container .applicant-details-box .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }

  .valuation-container .detail-group { display: flex; flex-direction: column; }

  .valuation-container .detail-group label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .valuation-container .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .valuation-container .bg-gray { background-color: #eef2f5; }

  /* --- Footer --- */
  .valuation-container .form-footer { text-align: center; margin-top: 40px; }

  .valuation-container .save-print-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Kalimati', 'Kokila', sans-serif;
  }

  .valuation-container .save-print-btn:hover { background-color: #1a252f; }
  .valuation-container .save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .valuation-container .copyright-footer {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 768px) {
    .valuation-container {
      padding: 20px 16px;
    }

    .valuation-container .header-logo img {
      position: static;
      display: block;
      margin: 0 auto 10px;
    }

    .valuation-container .municipality-name { font-size: 1.5rem; }
    .valuation-container .ward-title { font-size: 1.6rem; }

    .valuation-container .grid-row {
      grid-template-columns: 1fr;
    }

    .valuation-container .signature-section {
      justify-content: center;
    }

    .valuation-container .meta-data-row {
      flex-direction: column;
    }
  }

  /* ================= PRINT STYLES ================= */
  @media print {
    body * { visibility: hidden; }

    .valuation-container,
    .valuation-container * { visibility: visible; }

    .valuation-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0;
      padding: 0;
      background: white;
    }

    .valuation-container .form-footer { display: none; }
    .valuation-container .top-bar-title { display: none; }
  }
`;

// ── Helpers ──────────────────────────────────────────────────────────────────

const emptyRow = () => ({
  owner_name: "",
  owner_sabik: "",
  owner_ward: "",
  owner_kitta_no: "",
  owner_area: "",
  owner_rate: "",
  owner_remarks: "",
});

const initialState = {
  // Meta
  letter_no: "",
  chalani_no: "",
  date: "",

  // Main details
  former_area: "",
  former_vdc_mun: "",
  former_ward: "",
  current_municipality: MUNICIPALITY.name,
  current_ward: MUNICIPALITY.wardNumber,

  // Person
  person_title: "",
  person_name: "",
  application_to: "",
  application_ward: "",

  // Signature
  signature_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // Notes
  notes: "",
};

// ── Component ─────────────────────────────────────────────────────────────────

const FixedAssetValuation = () => {
  const [form, setForm] = useState(initialState);
  const [rows, setRows] = useState([emptyRow()]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Generic form field updater
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Table row updaters
  const updateRow = (index, field, value) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // Build full payload including rows
  const buildPayload = () => ({ ...form, tapashil_rows: rows });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/fixed-asset-valuation", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
        setRows([emptyRow()]);
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

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/fixed-asset-valuation", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
        setRows([emptyRow()]);
      }
    } catch (err) {
      console.error(err);
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

  return (
    <>
      <style>{styles}</style>
      <div className="valuation-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          अचल सम्पत्ति मुल्यांकन
          <span className="top-right-bread">
            आर्थिक &gt; अचल सम्पत्ति मुल्यांकन
          </span>
        </div>

        {/* --- Header --- */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
            </h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* --- Meta Data --- */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <input
                name="letter_no"
                type="text"
                className="dotted-input small-input"
                value={form.letter_no}
                onChange={handleChange}
              />
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <input
                name="date"
                type="text"
                className="dotted-input small-input"
                value={form.date}
                onChange={handleChange}
                placeholder="२०८२-०८-०६"
              />
            </p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              अचल सम्पत्ति मुल्यांकन सम्बन्धमा।
            </span>
          </p>
        </div>

        {/* --- Main Details Fieldset --- */}
        <fieldset>
          <legend>मुख्य विवरण</legend>

          <div className="grid-row">
            <label>साविक जिल्ला / क्षेत्र</label>
            <input
              name="former_area"
              value={form.former_area}
              onChange={handleChange}
            />
            <label>साविक (गा.वि.स./नगर)</label>
            <input
              name="former_vdc_mun"
              value={form.former_vdc_mun}
              onChange={handleChange}
            />
            <label>साविक वडा नं.</label>
            <input
              name="former_ward"
              value={form.former_ward}
              onChange={handleChange}
            />
          </div>

          <div className="grid-row">
            <label>हालको नगरपालिका</label>
            <input
              name="current_municipality"
              value={form.current_municipality}
              onChange={handleChange}
            />
            <label>हालको वडा नं.</label>
            <input
              name="current_ward"
              value={form.current_ward}
              onChange={handleChange}
            />
          </div>

          <div className="grid-row">
            <label>निवेदक पद</label>
            <input
              name="person_title"
              value={form.person_title}
              onChange={handleChange}
            />
            <label>निवेदकको नाम</label>
            <input
              name="person_name"
              value={form.person_name}
              onChange={handleChange}
            />
            <label>सम्बोधन (to)</label>
            <input
              name="application_to"
              value={form.application_to}
              onChange={handleChange}
            />
            <label>सम्बोधन वडा</label>
            <input
              name="application_ward"
              value={form.application_ward}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* --- Tapashil Table Fieldset --- */}
        <fieldset>
          <legend>तपशीिल (Tapashil) — जमीन विवरण</legend>
          <div className="table-responsive">
            <table className="valuation-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>जग्गा धनी</th>
                  <th>साविक</th>
                  <th>वडा</th>
                  <th>कित्ता नं.</th>
                  <th>क्षेत्रफल</th>
                  <th>दर/प्रति कठ्ठा</th>
                  <th>कैफियत</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: "center", width: "30px" }}>{i + 1}</td>
                    <td>
                      <input
                        className="table-input"
                        value={r.owner_name}
                        onChange={(e) => updateRow(i, "owner_name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        value={r.owner_sabik}
                        onChange={(e) => updateRow(i, "owner_sabik", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        style={{ width: "50px" }}
                        value={r.owner_ward}
                        onChange={(e) => updateRow(i, "owner_ward", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        style={{ width: "70px" }}
                        value={r.owner_kitta_no}
                        onChange={(e) => updateRow(i, "owner_kitta_no", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        style={{ width: "80px" }}
                        value={r.owner_area}
                        onChange={(e) => updateRow(i, "owner_area", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        style={{ width: "90px" }}
                        value={r.owner_rate}
                        onChange={(e) => updateRow(i, "owner_rate", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input"
                        value={r.owner_remarks}
                        onChange={(e) => updateRow(i, "owner_remarks", e.target.value)}
                      />
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <button
                        type="button"
                        className="row-btn remove"
                        onClick={() => removeRow(i)}
                        disabled={rows.length === 1}
                      >
                        −
                      </button>
                      {i === rows.length - 1 && (
                        <button
                          type="button"
                          className="row-btn add"
                          onClick={addRow}
                        >
                          +
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>

        {/* --- Signature & Applicant Fieldset --- */}
        <fieldset>
          <legend>हस्ताक्षर / निवेदक विवरण</legend>

          {/* Signature block */}
          <div className="signature-section">
            <div className="signature-block">
              <div className="signature-line"></div>
              <div className="inline-input-wrapper">
                <span className="input-required-star">*</span>
                <input
                  name="signature_name"
                  type="text"
                  className="sig-name-input"
                  required
                  value={form.signature_name}
                  onChange={handleChange}
                />
              </div>
              <select
                name="signer_designation"
                className="designation-select"
                value={form.signer_designation}
                onChange={handleChange}
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          {/* Notes */}
          <div className="grid-row" style={{ marginTop: "16px" }}>
            <label>कैफियत / नोट्स</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* --- Footer Actions --- */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </>
  );
};

export default FixedAssetValuation;