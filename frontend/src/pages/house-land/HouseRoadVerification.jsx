import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const emptyRow = () => ({
  ward_no:   "",
  seat_no:   "",
  plot_no:   "",
  area:      "",
  road_name: "",
  has_house: "घरभएको",
  road_type: "",
  remarks:   "",
});

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:           "२०८२/८३",
  chalani_no:          "",
  date_nep:            new Date().toISOString().slice(0, 10),
  addressee_office:    "मालपोत कार्यालय",
  addressee_location:  "",
  municipality:        MUNICIPALITY.name       || "नागार्जुन",
  ward_no:             MUNICIPALITY.wardNumber || "1",
  previous_type:       "",
  prev_ward_no:        "",
  owner_prefix:        "श्री",
  owner_name:          "",
  signer_name:         "",
  signer_designation:  "",
  notes:               "",
  applicant_name:      "",
  applicant_address:   "",
  applicant_citizenship_no: "",
  applicant_phone:     "",
};

const INITIAL_ROWS = [emptyRow()];

/* ─────────────────────────────────────────────
   STYLES  (prefix: hrv-)
───────────────────────────────────────────── */
const styles = `
.hrv-container {
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

.hrv-bold-text      { font-weight: bold; }
.hrv-underline-text { text-decoration: underline; }
.hrv-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.hrv-red-mark       { color: red; position: absolute; top: 0; left: 0; }
.hrv-red-asterisk   { color: red; font-size: 1rem; vertical-align: middle; margin-left: 2px; }
.hrv-bg-gray-text   { background-color: #eee; padding: 2px 5px; border-radius: 3px; margin: 0 5px; }

.hrv-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.hrv-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.hrv-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.hrv-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.hrv-header-text       { display: flex; flex-direction: column; align-items: center; }
.hrv-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.hrv-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.hrv-address-text,
.hrv-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.hrv-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.hrv-meta-left p, .hrv-meta-right p { margin: 5px 0; }

.hrv-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.hrv-small-input { width: 120px; }

.hrv-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.hrv-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.hrv-line-input {
  border: none; border-bottom: 1px dotted #000;
  background: transparent; outline: none;
  margin: 0 10px; font-family: inherit; font-size: 1rem; padding: 2px 5px;
}
.hrv-medium-input { width: 200px; }

.hrv-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.hrv-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.hrv-inline-input {
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
.hrv-inline-input:focus { border-color: #3b7dd8; }

.hrv-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}
.hrv-medium-select { width: 120px; }
.hrv-tiny-box   { width: 40px; text-align: center; }
.hrv-medium-box { width: 150px; }

/* Table */
.hrv-table-section    { margin-top: 20px; margin-bottom: 20px; }
.hrv-table-title      { text-align: center; font-weight: bold; margin-bottom: 10px; color: #555; }
.hrv-table-responsive { overflow-x: auto; }
.hrv-details-table { width: 100%; border-collapse: collapse; background-color: rgba(255,255,255,0.6); }
.hrv-details-table th {
  background-color: #e0e0e0;
  border: 1px solid #555;
  padding: 8px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
}
.hrv-details-table td { border: 1px solid #555; padding: 5px; }
.hrv-table-input {
  width: 80%;
  border: none;
  background: transparent;
  outline: none;
  padding: 4px;
  font-size: 1rem;
  font-family: inherit;
}
.hrv-table-select { border: 1px solid #ccc; background: #fff; padding: 2px; width: 100%; font-family: inherit; }
.hrv-action-cell { text-align: center; width: 40px; }
.hrv-add-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  width: 24px; height: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
}
.hrv-add-row-btn {
  margin-top: 8px;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 5px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
}

.hrv-note-section { margin-bottom: 30px; }
.hrv-note-section label { font-size: 0.9rem; color: #666; display: block; margin-bottom: 5px; }
.hrv-note-textarea {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  resize: vertical;
  padding: 5px;
  font-family: inherit;
  font-size: 1rem;
  box-sizing: border-box;
}

.hrv-signature-section { display: flex; justify-content: flex-end; margin-top: 30px; margin-bottom: 30px; }
.hrv-signature-block { width: 220px; text-align: center; position: relative; }
.hrv-signature-line { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.hrv-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.hrv-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; font-size: 1rem; }

.hrv-footer { text-align: center; margin-top: 40px; }
.hrv-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.hrv-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.hrv-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.hrv-copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

@media print {
  body * { visibility: hidden; }
  .hrv-container, .hrv-container * { visibility: visible; }
  .hrv-container { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; border: none; margin: 0; padding: 20px 40px; background: white !important; background-image: none !important; }
  .hrv-footer, .hrv-top-right-bread, .hrv-copyright-footer, .hrv-add-btn, .hrv-add-row-btn { display: none !important; }
  .hrv-details-table th, .hrv-details-table td { border: 1px solid #000 !important; }
  input, select, textarea { background: white !important; color: black !important; -webkit-text-fill-color: black !important; border: none !important; border-bottom: 1px solid #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}

@media (max-width: 768px) {
  .hrv-container { padding: 15px; }
  .hrv-meta-data-row { flex-direction: column; gap: 8px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HouseRoadVerification() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setRow = (idx, key, value) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [key]: value };
      return copy;
    });
  };

  const addRow    = () => setRows((r) => [...r, emptyRow()]);
  const removeRow = (idx) => {
    if (rows.length > 1) setRows((r) => r.filter((_, i) => i !== idx));
  };

  const validate = () => {
    if (!form.addressee_location?.trim()) return "ठेगाना आवश्यक छ";
    if (!form.owner_name?.trim())         return "जग्गाधनीको नाम आवश्यक छ";
    if (!form.applicant_phone?.trim())    return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setLoading(true);
    try {
      const payload = { ...form, rows: JSON.stringify(rows) };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/house-road-verification", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => { setForm(INITIAL_STATE); setRows(INITIAL_ROWS); }, 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship_no,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = { applicantName: "applicant_name", applicantAddress: "applicant_address", applicantCitizenship: "applicant_citizenship_no", applicantPhone: "applicant_phone" };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hrv-container">
        <form onSubmit={handleSubmit}>

          <div className="hrv-top-bar-title">
            घरबाटो प्रमाणित ।
            <span className="hrv-top-right-bread">घर / जग्गा जमिन &gt; घरबाटो प्रमाणित</span>
          </div>

          <div className="hrv-form-header-section">
            <div className="hrv-header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
            <div className="hrv-header-text">
              <h1 className="hrv-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="hrv-ward-title">{MUNICIPALITY.wardNumber} नं. वडा कार्यालय</h2>
              <p className="hrv-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="hrv-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="hrv-meta-data-row">
            <div className="hrv-meta-left">
              <p>पत्र संख्या : <span className="hrv-bold-text">{form.letter_no}</span></p>
              <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="hrv-dotted-input hrv-small-input" /></p>
            </div>
            <div className="hrv-meta-right">
              <p>मिति : <span className="hrv-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          <div className="hrv-addressee-section">
            <div className="hrv-addressee-row">
              <span>श्री {form.addressee_office}</span>
            </div>
            <div className="hrv-addressee-row">
              <input name="addressee_location" value={form.addressee_location} onChange={handleChange} type="text" className="hrv-line-input hrv-medium-input" required />
              <span className="hrv-red">*</span>
              <span className="hrv-bold-text">, काठमाडौँ</span>
            </div>
          </div>

          <div className="hrv-subject-section">
            <p>विषय: <span className="hrv-underline-text">घर बाटो प्रमाणित।</span></p>
          </div>

          <div className="hrv-form-body">
            <p>
              प्रस्तुत विषयमा जिल्ला काठमाडौँ{" "}
              <span className="hrv-bg-gray-text">{form.municipality}</span> वडा नं.{" "}
              <input name="ward_no" value={form.ward_no} onChange={handleChange} className="hrv-inline-input hrv-tiny-box" />{" "}
              (साविकको ठेगाना{" "}
              <select name="previous_type" value={form.previous_type} onChange={handleChange} className="hrv-inline-select hrv-medium-select">
                <option value=""></option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="नगरपालिका">नगरपालिका</option>
              </select>
              , वडा नं.{" "}
              <input name="prev_ward_no" value={form.prev_ward_no} onChange={handleChange} className="hrv-inline-input hrv-tiny-box" />
              ) बस्ने{" "}
              <select name="owner_prefix" value={form.owner_prefix} onChange={handleChange} className="hrv-inline-select">
                <option>श्री</option>
                <option>सुश्री</option>
                <option>श्रीमती</option>
              </select>{" "}
              <input name="owner_name" value={form.owner_name} onChange={handleChange} className="hrv-inline-input hrv-medium-box" required />{" "}
              को नाममा ... उक्त जग्गाको घरबाटो तलको तपशिल बमोजिम भएको व्यहोरा
              प्रमाणित गरिन्छ।
            </p>
          </div>

          {/* Road table */}
          <div className="hrv-table-section">
            <h4 className="hrv-table-title">घर बाटो विवरण</h4>
            <div className="hrv-table-responsive">
              <table className="hrv-details-table">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>क्र.स.</th>
                    <th style={{ width: "8%" }}>वडा नं.</th>
                    <th style={{ width: "8%" }}>सिट नं.</th>
                    <th style={{ width: "8%" }}>कित्ता नं.</th>
                    <th style={{ width: "12%" }}>क्षेत्रफल</th>
                    <th style={{ width: "15%" }}>बाटोको नाम</th>
                    <th style={{ width: "12%" }}>घरभएको/नभएको</th>
                    <th style={{ width: "12%" }}>बाटोको प्रकार</th>
                    <th style={{ width: "12%" }}>कैफियत</th>
                    <th style={{ width: "5%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <input value={r.ward_no} onChange={(e) => setRow(i, "ward_no", e.target.value)} className="hrv-table-input" required />
                        <span className="hrv-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td><input value={r.seat_no} onChange={(e) => setRow(i, "seat_no", e.target.value)} className="hrv-table-input" /></td>
                      <td>
                        <input value={r.plot_no} onChange={(e) => setRow(i, "plot_no", e.target.value)} className="hrv-table-input" required />
                        <span className="hrv-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td>
                        <input value={r.area} onChange={(e) => setRow(i, "area", e.target.value)} className="hrv-table-input" required />
                        <span className="hrv-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td><input value={r.road_name} onChange={(e) => setRow(i, "road_name", e.target.value)} className="hrv-table-input" /></td>
                      <td>
                        <select value={r.has_house} onChange={(e) => setRow(i, "has_house", e.target.value)} className="hrv-table-select">
                          <option>घरभएको</option>
                          <option>घरनभएको</option>
                        </select>
                      </td>
                      <td>
                        <input value={r.road_type} onChange={(e) => setRow(i, "road_type", e.target.value)} className="hrv-table-input" required />
                        <span className="hrv-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td><input value={r.remarks} onChange={(e) => setRow(i, "remarks", e.target.value)} className="hrv-table-input" /></td>
                      <td className="hrv-action-cell">
                        {rows.length > 1 ? (
                          <button type="button" onClick={() => removeRow(i)} className="hrv-add-btn">-</button>
                        ) : (
                          <button type="button" onClick={addRow} className="hrv-add-btn">+</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={addRow} className="hrv-add-row-btn">कतार थप्नुहोस्</button>
            </div>
          </div>

          <div className="hrv-note-section">
            <label>नोट</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="hrv-note-textarea" rows="2" />
          </div>

          <div className="hrv-signature-section">
            <div className="hrv-signature-block">
              <div className="hrv-signature-line"></div>
              <span className="hrv-red-mark">*</span>
              <input name="signer_name" value={form.signer_name} onChange={handleChange} className="hrv-sig-input" required />
              <select name="signer_designation" value={form.signer_designation} onChange={handleChange} className="hrv-designation-select">
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp formData={footerForm} handleChange={handleFooterChange} />

          <div className="hrv-footer">
            <button type="submit" className="hrv-save-print-btn" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="hrv-copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>
        </form>
      </div>
    </>
  );
}