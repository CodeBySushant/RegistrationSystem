import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   ROW FACTORIES
───────────────────────────────────────────── */
const emptyDeceased = () => ({ name: "", relation: "", death_date: "२०८२-०८-०६" });
const emptyHeir     = () => ({ name: "", relation: "", father_or_husband: "", citizenship_no: "", remarks: "" });

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:                "२०८२/८३",
  chalani_no:               "",
  date_nep:                 new Date().toISOString().slice(0, 10),
  addressee_place:          "",
  previous_type:            "",
  previous_ward_no:         "",
  current_ward_no:          MUNICIPALITY.wardNumber || "१",
  deceased_person_name:     "",
  deceased_person_relation: "नाति",
  deceased_death_date:      "२०८२-०८-०६",
  plot_no:                  "",
  jb_no:                    "",
  jb_area:                  "",
  sarjimin_village_no:      "",
  sarjimin_ward_no:         "",
  sarjimin_year:            "",
  sarjimin_extra:           "",
  signature_name:           "",
  signature_designation:    "",
  applicant_name:           "",
  applicant_address:        "",
  applicant_citizenship_no: "",
  applicant_phone:          "",
};

const INITIAL_ARRAYS = {
  deceased_heirs: [emptyDeceased()],
  living_heirs:   [emptyHeir()],
  transfer_heirs: [emptyHeir()],
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: potk-)
───────────────────────────────────────────── */
const styles = `
.potk-container {
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

.potk-bold-text      { font-weight: bold; }
.potk-underline-text { text-decoration: underline; }
.potk-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }

.potk-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.potk-top-right-bread { font-size: 0.9rem; color: #777; font-weight: normal; }

.potk-form-header-section { text-align: center; margin-bottom: 20px; position: relative; }
.potk-header-logo img { position: absolute; left: 0; top: 0; width: 80px; }
.potk-header-text       { display: flex; flex-direction: column; align-items: center; }
.potk-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.potk-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.potk-address-text,
.potk-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.potk-meta-data-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1rem; }
.potk-meta-left p, .potk-meta-right p { margin: 5px 0; }

.potk-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.potk-small-input { width: 80px; }

.potk-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.potk-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.potk-addressee-row     { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.potk-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.potk-medium-input { width: 200px; }

.potk-form-body { font-size: 1.05rem; line-height: 2.6; text-align: justify; margin-bottom: 30px; }

.potk-inline-input {
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
.potk-inline-input:focus { border-color: #3b7dd8; }

.potk-inline-select {
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
.potk-medium-select { width: 120px; }
.potk-tiny-box  { width: 40px; text-align: center; }
.potk-small-box { width: 100px; }
.potk-medium-box{ width: 150px; }

/* Tables */
.potk-table-section { margin-bottom: 30px; }
.potk-table-title { text-align: center; color: #2c5d8f; font-weight: bold; margin-bottom: 10px; }

.potk-details-table { width: 100%; border-collapse: collapse; background-color: rgba(255,255,255,0.6); }
.potk-details-table th {
  background-color: #e0e0e0; border: 1px solid #555;
  padding: 8px; text-align: left; font-size: 0.9rem; font-weight: bold; color: #333;
}
.potk-details-table td { border: 1px solid #555; padding: 5px; }
.potk-table-input {
  width: 90%; border: none; background: transparent; outline: none;
  padding: 4px; font-size: 1rem; font-family: inherit;
}
.potk-action-cell { text-align: center; width: 60px; }
.potk-add-btn {
  background-color: #2563eb; color: white; border: none;
  width: 22px; height: 22px; border-radius: 3px;
  cursor: pointer; font-size: 1.1rem; line-height: 1;
}
.potk-remove-btn {
  background-color: #e74c3c; color: white; border: none;
  width: 22px; height: 22px; border-radius: 3px;
  cursor: pointer; font-size: 1.1rem; line-height: 1; margin-left: 4px;
}

/* Sarjimin */
.potk-sarjimin-section p { font-size: 1.05rem; line-height: 2.4; text-align: justify; margin-bottom: 10px; }
.potk-full-width-textarea {
  width: 100%; border: 1px solid #000; background-color: #fff;
  padding: 10px; font-family: inherit; font-size: 1rem; resize: vertical;
  box-sizing: border-box;
}

.potk-signature-section { display: flex; justify-content: flex-end; margin-top: 40px; margin-bottom: 30px; }
.potk-signature-block { width: 220px; text-align: center; position: relative; }
.potk-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.potk-sig-input {
  width: 100%; margin-bottom: 5px;
  border: none; border-bottom: 1px solid #000;
  outline: none; background: transparent;
  font-family: inherit; font-size: 1rem;
}
.potk-designation-select { width: 100%; padding: 5px; border: 1px solid #ccc; background: #fff; font-family: inherit; font-size: 1rem; }

.potk-footer { text-align: center; margin-top: 40px; }
.potk-save-print-btn {
  background-color: #2c3e50; color: white;
  padding: 12px 30px; border: none; border-radius: 4px;
  font-size: 1rem; cursor: pointer; font-family: inherit; font-weight: bold;
}
.potk-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.potk-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.potk-copyright-footer { text-align: right; font-size: 0.8rem; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }

@media print {
  body * { visibility: hidden; }
  .potk-container, .potk-container * { visibility: visible; }
  .potk-container {
    position: absolute; left: 0; top: 0; width: 100%;
    box-shadow: none; border: none; margin: 0; padding: 20px 40px;
    background: white !important; background-image: none !important;
  }
  .potk-footer, .potk-top-right-bread, .potk-copyright-footer,
  .potk-add-btn, .potk-remove-btn { display: none !important; }
  .potk-details-table th, .potk-details-table td { border: 1px solid #000 !important; }
  input, select, textarea {
    background: white !important; color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important; border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}

@media (max-width: 768px) {
  .potk-container { padding: 15px; }
  .potk-meta-data-row { flex-direction: column; gap: 8px; }
  .potk-inline-input { width: 100px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function PropertyOwnershipTransferKitani() {
  const [form, setForm]     = useState(INITIAL_STATE);
  const [arrays, setArrays] = useState(INITIAL_ARRAYS);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Generic array row updater
  const updateArray = (arrayKey, idx, field, value) => {
    setArrays((prev) => {
      const copy = [...prev[arrayKey]];
      copy[idx] = { ...copy[idx], [field]: value };
      return { ...prev, [arrayKey]: copy };
    });
  };

  const addRow = (arrayKey, factory) => {
    setArrays((prev) => ({
      ...prev,
      [arrayKey]: [...prev[arrayKey], factory()],
    }));
  };

  const removeRow = (arrayKey, idx) => {
    setArrays((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((_, i) => i !== idx),
    }));
  };

  const validate = () => {
    if (!form.addressee_place?.trim())      return "मालपोत ठेगाना आवश्यक छ";
    if (!form.previous_ward_no?.trim())     return "साविक वडा नम्बर आवश्यक छ";
    if (!form.deceased_person_name?.trim()) return "मृतकको नाम आवश्यक छ";
    if (!form.plot_no?.trim())             return "कित्ता नम्बर आवश्यक छ";
    if (!form.applicant_phone?.trim())     return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) { alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + err); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        deceased_heirs: JSON.stringify(arrays.deceased_heirs),
        living_heirs:   JSON.stringify(arrays.living_heirs),
        transfer_heirs: JSON.stringify(arrays.transfer_heirs),
      };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post(
        "/api/forms/property-ownership-transfer-kitani",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => { setForm(INITIAL_STATE); setArrays(INITIAL_ARRAYS); }, 500);
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

  /* ── Reusable heir row renderer ── */
  const renderDeceasedTable = () => (
    <div className="potk-table-section">
      <h4 className="potk-table-title">मृत्यु भैसकेका हकदार</h4>
      <table className="potk-details-table">
        <thead>
          <tr><th>क्र.स.</th><th>नाम थर</th><th>नाता</th><th>मृत्यु मिति</th><th></th></tr>
        </thead>
        <tbody>
          {arrays.deceased_heirs.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><input value={r.name}       onChange={(e) => updateArray("deceased_heirs", i, "name",       e.target.value)} className="potk-table-input" /></td>
              <td><input value={r.relation}   onChange={(e) => updateArray("deceased_heirs", i, "relation",   e.target.value)} className="potk-table-input" /></td>
              <td><input value={r.death_date} onChange={(e) => updateArray("deceased_heirs", i, "death_date", e.target.value)} className="potk-table-input" /></td>
              <td className="potk-action-cell">
                <button type="button" onClick={() => addRow("deceased_heirs", emptyDeceased)} className="potk-add-btn">+</button>
                {arrays.deceased_heirs.length > 1 && (
                  <button type="button" onClick={() => removeRow("deceased_heirs", i)} className="potk-remove-btn">-</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHeirTable = (arrayKey, title) => (
    <div className="potk-table-section">
      <h4 className="potk-table-title">{title}</h4>
      <table className="potk-details-table">
        <thead>
          <tr><th>क्र.स.</th><th>नाम</th><th>नाता</th><th>बाबु/पति</th><th>नागरिकता नं.</th><th>कैफियत</th><th></th></tr>
        </thead>
        <tbody>
          {arrays[arrayKey].map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><input value={r.name}             onChange={(e) => updateArray(arrayKey, i, "name",             e.target.value)} className="potk-table-input" /></td>
              <td><input value={r.relation}         onChange={(e) => updateArray(arrayKey, i, "relation",         e.target.value)} className="potk-table-input" /></td>
              <td><input value={r.father_or_husband}onChange={(e) => updateArray(arrayKey, i, "father_or_husband",e.target.value)} className="potk-table-input" /></td>
              <td><input value={r.citizenship_no}   onChange={(e) => updateArray(arrayKey, i, "citizenship_no",   e.target.value)} className="potk-table-input" /></td>
              <td><input value={r.remarks}          onChange={(e) => updateArray(arrayKey, i, "remarks",          e.target.value)} className="potk-table-input" /></td>
              <td className="potk-action-cell">
                <button type="button" onClick={() => addRow(arrayKey, emptyHeir)} className="potk-add-btn">+</button>
                {arrays[arrayKey].length > 1 && (
                  <button type="button" onClick={() => removeRow(arrayKey, i)} className="potk-remove-btn">-</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      <div className="potk-container">
        <form onSubmit={handleSubmit}>

          <div className="potk-top-bar-title">
            घर जग्गा नामसारी सिफारिस (कितानी)।
            <span className="potk-top-right-bread">
              घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस (कितानी)
            </span>
          </div>

          <div className="potk-form-header-section">
            <div className="potk-header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
            <div className="potk-header-text">
              <h1 className="potk-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="potk-ward-title">{MUNICIPALITY.wardNumber} नं. वडा कार्यालय</h2>
              <p className="potk-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="potk-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          <div className="potk-meta-data-row">
            <div className="potk-meta-left">
              <p>पत्र संख्या : <span className="potk-bold-text">{form.letter_no}</span></p>
              <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} className="potk-dotted-input potk-small-input" /></p>
            </div>
            <div className="potk-meta-right">
              <p>मिति : <span className="potk-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          <div className="potk-subject-section">
            <p>विषय: <span className="potk-underline-text">घर जग्गा नामसारी सिफारिस।</span></p>
          </div>

          <div className="potk-addressee-section">
            <div className="potk-addressee-row"><span>श्री मालपोत कार्यालय</span></div>
            <div className="potk-addressee-row">
              <input name="addressee_place" value={form.addressee_place} onChange={handleChange} className="potk-line-input potk-medium-input" required />
              <span className="potk-red">*</span>
              <span>, काठमाडौँ</span>
            </div>
          </div>

          <div className="potk-form-body">
            <p>
              उपरोक्त सम्बन्धमा जिल्ला <span className="potk-bold-text">काठमाडौँ</span>{" "}
              <span className="potk-bold-text" style={{ marginLeft: 20 }}>{MUNICIPALITY.name}</span> वडा नं.{" "}
              <span className="potk-bold-text">{form.current_ward_no}</span> (साविक
              <select name="previous_type" value={form.previous_type} onChange={handleChange} className="potk-inline-select potk-medium-select">
                <option value=""></option>
                <option value="गा.वि.स.">गा.वि.स.</option>
                <option value="नगरपालिका">नगरपालिका</option>
              </select>
              , वडा नं.
              <input name="previous_ward_no" value={form.previous_ward_no} onChange={handleChange} className="potk-inline-input potk-tiny-box" required />{" "}
              ) बस्ने
              <input name="deceased_person_name" value={form.deceased_person_name} onChange={handleChange} className="potk-inline-input potk-medium-box" required />{" "}
              को
              <select name="deceased_person_relation" value={form.deceased_person_relation} onChange={handleChange} className="potk-inline-select">
                <option value="नाति">नाति</option>
                <option value="नातिनी">नातिनी</option>
                <option value="छोरा">छोरा</option>
                <option value="छोरी">छोरी</option>
              </select>
              इत्यादि ... मृतकको मिति
              <input name="deceased_death_date" value={form.deceased_death_date} onChange={handleChange} className="potk-inline-input potk-small-box" />
              भएको हुनाले निज मृतकका नाममा दर्ता कायम रहेको ... कि.न.{" "}
              <input name="plot_no" value={form.plot_no} onChange={handleChange} className="potk-inline-input potk-small-box" required />{" "}
              ज.बि{" "}
              <input name="jb_no" value={form.jb_no} onChange={handleChange} className="potk-inline-input potk-small-box" required />{" "}
              भएको मृतक जग्गा/घर ... नामसारीका लागि सिफारिस गरिन्छ।
            </p>
          </div>

          {renderDeceasedTable()}
          {renderHeirTable("living_heirs",   "जीवित हकदारको विवरण")}
          {renderHeirTable("transfer_heirs", "नामसारी गरिने हकदारको विवरण")}

          {/* Sarjimin */}
          <div className="potk-sarjimin-section">
            <p>
              निवेदकको निवेदन अनुसार सर्जमिन बुझ्दा
              <input name="sarjimin_village_no" value={form.sarjimin_village_no} onChange={handleChange} className="potk-inline-input potk-tiny-box" />{" "}
              वडा नं.
              <input name="sarjimin_ward_no" value={form.sarjimin_ward_no} onChange={handleChange} className="potk-inline-input potk-tiny-box" />{" "}
              बस्ने बर्ष
              <input name="sarjimin_year" value={form.sarjimin_year} onChange={handleChange} className="potk-inline-input potk-tiny-box" />{" "}
              को{" "}
              <input name="sarjimin_extra" value={form.sarjimin_extra} onChange={handleChange} className="potk-inline-input potk-medium-box" />{" "}
              समेत ...
            </p>
            <textarea
              name="sarjimin_extra"
              value={form.sarjimin_extra}
              onChange={handleChange}
              className="potk-full-width-textarea"
              rows="3"
            />
          </div>

          <div className="potk-signature-section">
            <div className="potk-signature-block">
              <div className="potk-signature-line"></div>
              <input name="signature_name" value={form.signature_name} onChange={handleChange} className="potk-sig-input" required />
              <select name="signature_designation" value={form.signature_designation} onChange={handleChange} className="potk-designation-select">
                <option value="">पद छनौट गर्नुहोस्</option>
                <option>वडा अध्यक्ष</option>
                <option>वडा सचिव</option>
                <option>कार्यवाहक वडा अध्यक्ष</option>
              </select>
            </div>
          </div>

          <ApplicantDetailsNp formData={footerForm} handleChange={handleFooterChange} />

          <div className="potk-footer">
            <button type="submit" className="potk-save-print-btn" disabled={loading}>
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="potk-copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>

        </form>
      </div>
    </>
  );
}