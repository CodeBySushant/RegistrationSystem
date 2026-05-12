// src/pages/social-family/InternalMigrationRecommendation.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "internal-migration-recommendation";
const API_URL  = `/api/forms/${FORM_KEY}`;

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.internal-migration-container {
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
  box-sizing: border-box;
}

/* ── Utility ── */
.bold-text      { font-weight: bold; }
.underline-text { text-decoration: underline; }
.center-text    { text-align: center; }
.red-asterisk   { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }
.in-cell        { font-size: 0.8rem; }

/* ── Top bar ── */
.top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

/* ── Header ── */
.form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.header-logo img     { position: absolute; left: 0; top: 0; width: 80px; }
.header-text         { display: flex; flex-direction: column; align-items: center; }
.municipality-name   { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ward-title          { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.address-text,
.province-text       { color: #e74c3c; margin: 0; font-size: 1rem; }

/* ── Meta row ── */
.meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; flex-wrap: wrap; gap: 8px; }
.meta-left p,
.meta-right p  { margin: 5px 0; }

/* ── Shared inputs ── */
.internal-migration-container .dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.internal-migration-container .line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.internal-migration-container .inline-box-input {
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
.internal-migration-container .inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  vertical-align: middle;
}
.internal-migration-container .dotted-input:focus,
.internal-migration-container .line-input:focus,
.internal-migration-container .inline-box-input:focus,
.internal-migration-container .inline-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
}

/* Size variants */
.small-input      { width: 120px; }
.medium-input     { width: 200px; }
.full-width-input { width: 100%; }
.tiny-input       { width: 80px; }
.tiny-box         { width: 40px; text-align: center; }
.medium-box       { width: 180px; }
.subject-input    { width: 340px; }

/* ── Subject ── */
.subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

/* ── Addressee ── */
.addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.addressee-row     { margin-bottom: 8px; display: flex; align-items: center; flex-wrap: wrap; }

/* ── Body paragraph ── */
.form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

/* ── Table ── */
.table-section    { margin: 20px 0; }
.table-title      { margin-bottom: 5px; }
.table-responsive { overflow-x: auto; }
.details-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255,255,255,0.6);
}
.details-table th {
  background-color: #e0e0e0;
  border: 1px solid #555;
  padding: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
}
.details-table td { border: 1px solid #555; padding: 5px; vertical-align: middle; }
.table-input {
  width: 90%;
  border: none;
  background: transparent;
  outline: none;
  padding: 4px;
  font-size: 1rem;
  color: #e74c3c;
  font-family: inherit;
}
.table-input:focus { border-bottom: 1px solid #2563eb; }
.action-cell { text-align: center; white-space: nowrap; }
.add-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  margin: 0 2px;
  transition: background 0.15s;
}
.add-btn:hover { background-color: #1d4ed8; }
.rm-btn {
  background-color: #c0392b;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  margin: 0 2px;
  transition: background 0.15s;
}
.rm-btn:hover { background-color: #922b21; }

/* ── Signature ── */
.signature-section { display: flex; justify-content: flex-end; margin-top: 50px; margin-bottom: 30px; }
.signature-block   { width: 220px; text-align: center; position: relative; }
.signature-line    { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; height: 40px; }
.signature-block .line-input { width: 100%; margin: 0 0 5px 0; border-bottom: 1px solid #000; }
.designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  cursor: pointer;
}
.designation-select:focus { outline: none; border-color: #2563eb; }

/* ── Applicant details box ── */
.applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 20px;
  border-radius: 4px;
}
.applicant-details-box h3 {
  color: #777;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.details-grid  { display: grid; grid-template-columns: 1fr; gap: 15px; }
.detail-group  { display: flex; flex-direction: column; }
.detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.9rem;
}
.detail-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.15); }
.bg-gray  { background-color: #eef2f5; }
.required { color: red; margin-left: 4px; }

/* ── Toast ── */
.imr-toast {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.92rem;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: imr-toast-in 0.25s ease;
  max-width: 360px;
}
.imr-toast--success { background: #1a7f3c; color: #fff; }
.imr-toast--error   { background: #c0392b; color: #fff; }
@keyframes imr-toast-in {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Footer ── */
.form-footer { text-align: center; margin-top: 40px; }
.save-print-btn {
  background-color: #34495e;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.save-print-btn:hover:not(:disabled) { background-color: #2c3e50; }
.save-print-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .internal-migration-container { padding: 20px 14px; }
  .meta-data-row { flex-direction: column; }
  .top-bar-title { flex-direction: column; gap: 4px; }
  .imr-toast     { right: 12px; left: 12px; max-width: none; }
  .subject-input { width: 100%; }
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .internal-migration-container,
  .internal-migration-container * { visibility: visible; }
  .internal-migration-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 10mm 14mm;
    background: white;
  }
  .form-footer,
  .copyright-footer,
  .imr-toast,
  .top-bar-title,
  .action-cell { display: none !important; }
  .inline-box-input,
  .line-input,
  .dotted-input,
  .table-input,
  .detail-input { border: none !important; background: transparent !important; }
  select { border: none !important; background: transparent !important; }
}
`;

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyDetailRow = () => ({
  id:        Date.now() + Math.random(),
  name:      "",
  relation:  "",
  dob_reg:   "",
  house_no:  "",
  road_name: "",
  age:       "",
});

const INITIAL_FORM = {
  reference_no:           "२०८२/८३",
  chalani_no:             "",
  date:                   "",
  subject:                "आन्तरिक बसाईँसराई सम्बन्धमा ।",
  addressee_line1:        "",
  addressee_line2:        "",
  from_location:          "",
  migration_type:         "एक्लै",
  from_date:              "",
  to_date:                "",
  from_district:          "",
  from_municipality_type: "गाउँपालिका",
  from_ward_no:           "",
  to_municipality:        MUNICIPALITY.name,
  signatory_name:         "",
  signatory_designation:  "",
  // ApplicantDetailsNp
  applicantName:          "",
  applicantAddress:       "",
  applicantCitizenship:   "",
  applicantPhone:         "",
};

const validate = (form, details) => {
  if (!form.from_location.trim())  return "सरी आएको ठाउँ आवश्यक छ।";
  if (!form.to_date.trim())        return "अन्त्य मिति आवश्यक छ।";
  if (!form.from_district.trim())  return "जिल्ला आवश्यक छ।";
  if (!form.from_ward_no.trim())   return "वडा नं. आवश्यक छ।";
  for (const row of details) {
    if (!row.name.trim()) return "तपसिलमा नाम थर आवश्यक छ।";
  }
  if (!form.signatory_name.trim())    return "हस्ताक्षरकर्ताको नाम आवश्यक छ।";
  if (!form.signatory_designation)    return "पद छनौट गर्नुहोस्।";
  if (!form.applicantName.trim())     return "निवेदकको नाम आवश्यक छ।";
  if (!form.applicantAddress.trim())  return "निवेदकको ठेगाना आवश्यक छ।";
  if (!form.applicantCitizenship.trim()) return "नागरिकता नं. आवश्यक छ।";
  if (!form.applicantPhone.trim())    return "फोन नं. आवश्यक छ।";
  return null;
};

/* ─────────────────────────── Component ─────────────────────────── */
const InternalMigrationRecommendation = () => {
  const { user } = useAuth();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [details, setDetails] = useState([emptyDetailRow()]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), type === "success" ? 3000 : 5000);
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  /* Detail row updaters */
  const onDetailChange = (idx, key, value) =>
    setDetails((rows) =>
      rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );

  const addDetailRow    = ()    => setDetails((rows) => [...rows, emptyDetailRow()]);
  const removeDetailRow = (idx) => setDetails((rows) => rows.filter((_, i) => i !== idx));

  const wardLabel =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : `${user?.ward || MUNICIPALITY.wardNumber || "१"} नं. वडा कार्यालय`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    const err = validate(form, details);
    if (err) { showToast("error", err); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { ...form, details });
      showToast("success", `सफलतापूर्वक सेभ भयो (ID: ${res.data?.id ?? ""})`);
      setTimeout(() => {
        window.print();
        setForm(INITIAL_FORM);
        setDetails([emptyDetailRow()]);
      }, 300);
    } catch (err) {
      console.error("Submit error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "सेभ गर्न असफल भयो।";
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <form className="internal-migration-container" onSubmit={handleSubmit}>

        {/* Toast */}
        {toast && (
          <div className={`imr-toast imr-toast--${toast.type}`}>
            <span>{toast.type === "success" ? "✔" : "✖"}</span>
            {toast.text}
          </div>
        )}

        {/* Top bar */}
        <div className="top-bar-title">
          आन्तरिक बसाईँसराई ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; आन्तरिक बसाईँसराई
          </span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">{wardLabel}</h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या :{" "}
              <input
                name="reference_no"
                value={form.reference_no}
                onChange={handleChange}
                className="line-input tiny-input"
              />
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                type="text"
                className="dotted-input small-input"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                className="line-input tiny-input"
                placeholder="२०८२-०८-०६"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="line-input subject-input"
              />
            </span>
          </p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input
              name="addressee_line1"
              value={form.addressee_line1}
              onChange={handleChange}
              type="text"
              className="line-input medium-input"
              placeholder="प्राप्तकर्ताको नाम *"
              required
            />
          </div>
          <div className="addressee-row">
            <input
              name="addressee_line2"
              value={form.addressee_line2}
              onChange={handleChange}
              type="text"
              className="line-input medium-input"
              placeholder="ठेगाना *"
            />
          </div>
        </div>

        {/* Body paragraph */}
        <div className="form-body">
          <p>
            तपाईं{" "}
            <input
              name="from_location"
              value={form.from_location}
              onChange={handleChange}
              type="text"
              className="inline-box-input medium-box"
              placeholder="ठाउँ *"
              required
            />{" "}
            बाट{" "}
            <select
              name="migration_type"
              value={form.migration_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option>एक्लै</option>
              <option>सपरिवार</option>
            </select>
            {" "}मिति{" "}
            <input
              name="from_date"
              value={form.from_date}
              onChange={handleChange}
              className="inline-box-input medium-box"
              placeholder="सुरु मिति"
            />{" "}
            देखि{" "}
            <input
              name="to_date"
              value={form.to_date}
              onChange={handleChange}
              className="inline-box-input medium-box"
              placeholder="अन्त्य मिति *"
              required
            />{" "}
            जिल्ला{" "}
            <input
              name="from_district"
              value={form.from_district}
              onChange={handleChange}
              className="inline-box-input medium-box"
              placeholder="जिल्ला *"
              required
            />{" "}
            <select
              name="from_municipality_type"
              value={form.from_municipality_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
            </select>
            {" "}वडा नं.{" "}
            <input
              name="from_ward_no"
              value={form.from_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            बाट यस जिल्ला{" "}
            <span className="bold-text">{MUNICIPALITY.city || "काठमाडौँ"}</span>{" "}
            <input
              name="to_municipality"
              value={form.to_municipality}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />{" "}
            वडा नं. {user?.ward || MUNICIPALITY.wardNumber || "१"} अन्तर्गत
            बसाई सरी आउनुभएको व्यहोरा प्रमाणित गरिन्छ ।
          </p>
        </div>

        {/* Table */}
        <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>क्र.स.</th>
                  <th style={{ width: "20%" }}>नाम थर</th>
                  <th style={{ width: "15%" }}>निवेदक संगको नाता</th>
                  <th style={{ width: "18%" }}>ना.प्र.न/जन्म दर्ता</th>
                  <th style={{ width: "10%" }}>घर नं</th>
                  <th style={{ width: "18%" }}>बाटोको नाम</th>
                  <th style={{ width: "7%" }}>उमेर</th>
                  <th style={{ width: "7%" }}></th>
                </tr>
              </thead>
              <tbody>
                {details.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td><input className="table-input" value={row.name}      onChange={(e) => onDetailChange(i, "name",      e.target.value)} placeholder="नाम थर *" /></td>
                    <td><input className="table-input" value={row.relation}  onChange={(e) => onDetailChange(i, "relation",  e.target.value)} placeholder="नाता *" /></td>
                    <td><input className="table-input" value={row.dob_reg}   onChange={(e) => onDetailChange(i, "dob_reg",   e.target.value)} placeholder="ना.प्र.न. *" /></td>
                    <td><input className="table-input" value={row.house_no}  onChange={(e) => onDetailChange(i, "house_no",  e.target.value)} placeholder="घर नं" /></td>
                    <td><input className="table-input" value={row.road_name} onChange={(e) => onDetailChange(i, "road_name", e.target.value)} placeholder="बाटो" /></td>
                    <td><input className="table-input" value={row.age}       onChange={(e) => onDetailChange(i, "age",       e.target.value)} placeholder="उमेर" /></td>
                    <td className="action-cell">
                      <button type="button" className="add-btn" onClick={addDetailRow} title="थप्नुहोस्">+</button>
                      {details.length > 1 && (
                        <button type="button" className="rm-btn" onClick={() => removeDetailRow(i)} title="हटाउनुहोस्">−</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              type="text"
              className="line-input full-width-input"
              placeholder="हस्ताक्षरकर्ताको नाम *"
              required
            />
            <select
              name="signatory_designation"
              value={form.signatory_designation}
              onChange={handleChange}
              className="designation-select"
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </>
  );
};

export default InternalMigrationRecommendation;