import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const emptyPlotRow = () => ({
  type_of_place: "गा.वि.स.",
  ward_no:        "",
  seat_no:        "",
  plot_no:        "",
  area:           "",
  east_plot_no:   "",
});

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "char-killa-reloaded"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  letter_no:            "२०८२/८३",
  chalani_no:           "",
  date_nep:             new Date().toISOString().slice(0, 10),
  addressee_line1:      "",
  addressee_line2:      "",
  applicant_name:       "",
  malpot_office_place:  "काठमाडौँ / कलंकीमा",
  registration_text:    "",
  place_type:           "जग्गाको",
  declaration_person:   "वारेश",
  declaration_relation: "वारेश",
  declaration_name:     "",
  signer_name:          "",
  signer_designation:   "",
  notes:                "",
  // footer applicant details
  applicant_address:       "",
  applicant_citizenship_no:"",
  applicant_phone:         "",
};

const INITIAL_PLOTS = [emptyPlotRow()];

/* ─────────────────────────────────────────────
   STYLES  (prefix: ckr-)
───────────────────────────────────────────── */
const styles = `
.ckr-container {
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

.ckr-bold-text      { font-weight: bold; }
.ckr-underline-text { text-decoration: underline; }
.ckr-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.ckr-red-mark       { color: red; position: absolute; top: 0; left: 0; }
.ckr-red-asterisk   { color: red; font-size: 1.2rem; vertical-align: middle; margin-left: 2px; }

.ckr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.ckr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.ckr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.ckr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.ckr-header-text       { display: flex; flex-direction: column; align-items: center; }
.ckr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.ckr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.ckr-address-text,
.ckr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.ckr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.ckr-meta-left p,
.ckr-meta-right p { margin: 5px 0; }

.ckr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.ckr-small-input { width: 120px; }

.ckr-subject-section { text-align: center; margin: 30px 0; font-size: 1.1rem; font-weight: bold; }

.ckr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.ckr-addressee-row { margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }

.ckr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: transparent;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.ckr-medium-input { width: 200px; }

.ckr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.ckr-inline-input {
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
.ckr-inline-input:focus { border-color: #3b7dd8; }
.ckr-medium-box { width: 160px; }

.ckr-inline-select {
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

/* Table */
.ckr-table-section    { margin-top: 20px; margin-bottom: 40px; }
.ckr-table-title      { text-align: center; font-weight: bold; margin-bottom: 5px; color: #555; }
.ckr-table-sub-label  { text-align: center; font-weight: bold; margin-bottom: 10px; font-size: 0.9rem; color: #555; }
.ckr-table-responsive { overflow-x: auto; }

.ckr-details-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255,255,255,0.6);
}
.ckr-details-table th {
  background-color: #e0e0e0;
  border: 1px solid #555;
  padding: 8px;
  text-align: left;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
}
.ckr-details-table td {
  border: 1px solid #555;
  padding: 5px;
}

.ckr-table-input {
  width: 85%;
  border: none;
  background: transparent;
  outline: none;
  padding: 4px;
  font-size: 1rem;
  font-family: inherit;
}
.ckr-table-select {
  border: 1px solid #ccc;
  background: #fff;
  padding: 2px;
  width: 100%;
  font-family: inherit;
}

.ckr-small-add-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
}
.ckr-small-remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.ckr-add-row-btn {
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

/* Declaration */
.ckr-declaration-section { margin-bottom: 30px; }
.ckr-full-width-textarea {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 10px;
  resize: vertical;
  margin-top: 10px;
  font-family: inherit;
  font-size: 1rem;
  box-sizing: border-box;
}

/* Signature */
.ckr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  margin-bottom: 30px;
}
.ckr-signature-block { width: 220px; text-align: center; position: relative; }
.ckr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.ckr-sig-input {
  width: 100%;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
}
.ckr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.ckr-footer { text-align: center; margin-top: 40px; }
.ckr-save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.ckr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.ckr-save-print-btn:disabled { background-color: #6c757d; cursor: not-allowed; }

.ckr-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* ── Print ── */
@media print {
  body * { visibility: hidden; }
  .ckr-container,
  .ckr-container * { visibility: visible; }
  .ckr-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }
  .ckr-footer,
  .ckr-top-right-bread,
  .ckr-copyright-footer { display: none !important; }
  input, select, textarea {
    background: white !important;
    color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .ckr-details-table th,
  .ckr-details-table td { border: 1px solid #000 !important; }
  .ckr-small-add-btn,
  .ckr-small-remove-btn,
  .ckr-add-row-btn { display: none !important; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .ckr-container { padding: 15px; }
  .ckr-meta-data-row { flex-direction: column; gap: 8px; }
  .ckr-inline-input { width: 120px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const CharKillaReloaded = () => {
  const [form, setForm]   = useState(INITIAL_STATE);
  const [plots, setPlots] = useState(INITIAL_PLOTS);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlotChange = (idx, key, value) => {
    setPlots((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [key]: value };
      return copy;
    });
  };

  const addPlotRow    = () => setPlots((p) => [...p, emptyPlotRow()]);
  const removePlotRow = (idx) => {
    if (plots.length > 1) setPlots((p) => p.filter((_, i) => i !== idx));
  };

  const validate = () => {
    if (!form.addressee_line1?.trim()) return "प्राप्तकर्ताको नाम आवश्यक छ";
    if (!form.applicant_name?.trim())  return "जग्गाधनीको नाम आवश्यक छ";
    if (!form.applicant_address?.trim()) return "निवेदकको ठेगाना आवश्यक छ";
    if (!form.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
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
        plots: JSON.stringify(plots),
      };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const res = await axios.post(
        "/api/forms/char-killa-reloaded",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        window.print();
        setTimeout(() => {
          setForm(INITIAL_STATE);
          setPlots(INITIAL_PLOTS);
        }, 500);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  // Adapter for ApplicantDetailsNp (camelCase)
  const footerForm = {
    applicantName:        form.applicant_name,
    applicantAddress:     form.applicant_address,
    applicantCitizenship: form.applicant_citizenship_no,
    applicantPhone:       form.applicant_phone,
  };
  const handleFooterChange = (e) => {
    const map = {
      applicantName:        "applicant_name",
      applicantAddress:     "applicant_address",
      applicantCitizenship: "applicant_citizenship_no",
      applicantPhone:       "applicant_phone",
    };
    const key = map[e.target.name] || e.target.name;
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <>
      <style>{styles}</style>

      <div className="ckr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top bar ── */}
          <div className="ckr-top-bar-title">
            चार किल्ला खुलाई सिफारिस गरिएको(२)।
            <span className="ckr-top-right-bread">
              घर / जग्गा जमिन &gt; चार किल्ला खुलाई सिफारिस
            </span>
          </div>

          {/* ── Header ── */}
          <div className="ckr-form-header-section">
            <div className="ckr-header-logo">
              <img src="/nepallogo.svg" alt="Nepal Emblem" />
            </div>
            <div className="ckr-header-text">
              <h1 className="ckr-municipality-name">{MUNICIPALITY.name}</h1>
              <h2 className="ckr-ward-title">
                {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
              </h2>
              <p className="ckr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="ckr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="ckr-meta-data-row">
            <div className="ckr-meta-left">
              <p>पत्र संख्या : <span className="ckr-bold-text">{form.letter_no}</span></p>
              <p>
                चलानी नं. :{" "}
                <input
                  name="chalani_no"
                  value={form.chalani_no}
                  onChange={handleChange}
                  type="text"
                  className="ckr-dotted-input ckr-small-input"
                />
              </p>
            </div>
            <div className="ckr-meta-right">
              <p>मिति : <span className="ckr-bold-text">{form.date_nep}</span></p>
              <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="ckr-subject-section">
            <p>
              विषय:{" "}
              <span className="ckr-underline-text">
                चार किल्ला खुलाई सिफारिस सम्वन्धमा
              </span>
            </p>
          </div>

          {/* ── Addressee ── */}
          <div className="ckr-addressee-section">
            <div className="ckr-addressee-row">
              <span>श्री</span>
              <input
                name="addressee_line1"
                value={form.addressee_line1}
                onChange={handleChange}
                type="text"
                className="ckr-line-input ckr-medium-input"
                required
              />
              <span className="ckr-red">*</span>
            </div>
            <div className="ckr-addressee-row">
              <input
                name="addressee_line2"
                value={form.addressee_line2}
                onChange={handleChange}
                type="text"
                className="ckr-line-input ckr-medium-input"
              />
            </div>
          </div>

          {/* ── Body ── */}
          <div className="ckr-form-body">
            <p>
              प्रस्तुत विषयमा सम्बन्धित ज.ध. श्री{" "}
              <input
                name="applicant_name"
                value={form.applicant_name}
                onChange={handleChange}
                className="ckr-inline-input ckr-medium-box"
                required
              />{" "}
              <span className="ckr-red">*</span> ले आफ्नो नाममा मालपोत कार्यालय{" "}
              <span className="ckr-underline-text">{form.malpot_office_place}</span>{" "}
              <input
                name="registration_text"
                value={form.registration_text}
                onChange={handleChange}
                className="ckr-inline-input ckr-medium-box"
              />{" "}
              दर्ता प्रमाणित रही आफ्नै हक भोग रहेको तपसिलमा उल्लेखित जग्गाको
              चार किल्ला खुलाई सिफारिस माग गर्नु भएकोमा ...
              <select
                name="place_type"
                className="ckr-inline-select"
                value={form.place_type}
                onChange={handleChange}
              >
                <option value="घर / जग्गाको">घर / जग्गाको</option>
                <option value="जग्गाको">जग्गाको</option>
                <option value="घरको">घरको</option>
              </select>{" "}
              निम्न अनुसार किल्ला रहेको हुँदा माग निवेदन अनुसार चार किल्ला
              खुलाई सिफारिस साथ अनुरोध गरिन्छ ।
            </p>
          </div>

          {/* ── Plot table ── */}
          <div className="ckr-table-section">
            <h4 className="ckr-table-title">तपसिल</h4>
            <div className="ckr-table-sub-label">जग्गाको विवरण:</div>
            <div className="ckr-table-responsive">
              <table className="ckr-details-table">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>सि.नं.</th>
                    <th style={{ width: "15%" }}>साविक</th>
                    <th style={{ width: "8%" }}>वडा नं.</th>
                    <th style={{ width: "15%" }}>सिट नं.</th>
                    <th style={{ width: "15%" }}>कित्ता नं.</th>
                    <th style={{ width: "15%" }}>क्षेत्रफल</th>
                    <th style={{ width: "22%" }}>पूर्व कि.नं</th>
                    <th style={{ width: "5%" }}>—</th>
                  </tr>
                </thead>
                <tbody>
                  {plots.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <select
                          className="ckr-table-select"
                          value={r.type_of_place}
                          onChange={(e) => handlePlotChange(i, "type_of_place", e.target.value)}
                        >
                          <option value="गा.वि.स.">गा.वि.स.</option>
                          <option value="न.पा.">न.पा.</option>
                        </select>
                      </td>
                      <td>
                        <input className="ckr-table-input" value={r.ward_no} onChange={(e) => handlePlotChange(i, "ward_no", e.target.value)} />
                      </td>
                      <td>
                        <input className="ckr-table-input" value={r.seat_no} onChange={(e) => handlePlotChange(i, "seat_no", e.target.value)} />
                        <span className="ckr-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td>
                        <input className="ckr-table-input" value={r.plot_no} onChange={(e) => handlePlotChange(i, "plot_no", e.target.value)} />
                        <span className="ckr-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td>
                        <input className="ckr-table-input" value={r.area} onChange={(e) => handlePlotChange(i, "area", e.target.value)} />
                      </td>
                      <td>
                        <input className="ckr-table-input" value={r.east_plot_no} onChange={(e) => handlePlotChange(i, "east_plot_no", e.target.value)} />
                        <span className="ckr-red-asterisk" style={{ fontSize: "0.8rem" }}>*</span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {plots.length > 1 ? (
                          <button type="button" className="ckr-small-remove-btn" onClick={() => removePlotRow(i)}>x</button>
                        ) : (
                          <button type="button" className="ckr-small-add-btn" onClick={addPlotRow}>+</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 8 }}>
                <button type="button" className="ckr-add-row-btn" onClick={addPlotRow}>
                  कतार थप्नुहोस्
                </button>
              </div>
            </div>
          </div>

          {/* ── Declaration ── */}
          <div className="ckr-declaration-section">
            <p>
              यसमा उल्लेखित चारकिल्ला प्रमाणित म आफैं वा मेरो{" "}
              <select
                name="declaration_person"
                className="ckr-inline-select"
                value={form.declaration_person}
                onChange={handleChange}
              >
                <option value="वारेश">वारेश</option>
                <option value="स्वयं">स्वयं</option>
              </select>{" "}
              मार्फत न.पा. वडा कार्यालयमा उपस्थित भई दिएको छु । यसको
              आधिकारिकताको जिम्मेवारी म आफैं भएको व्यहोरा ...
              <select
                name="declaration_relation"
                className="ckr-inline-select"
                value={form.declaration_relation}
                onChange={handleChange}
              >
                <option value="वारेश">वारेश</option>
                <option value="हकवाला">हकवाला</option>
              </select>{" "}
              श्री{" "}
              <input
                name="declaration_name"
                value={form.declaration_name}
                onChange={handleChange}
                type="text"
                className="ckr-inline-input ckr-medium-box"
              />{" "}
              <span className="ckr-red">*</span> दस्तखत...
            </p>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="ckr-full-width-textarea"
              rows="3"
            />
          </div>

          {/* ── Signature ── */}
          <div className="ckr-signature-section">
            <div className="ckr-signature-block">
              <div className="ckr-signature-line" />
              <span className="ckr-red-mark">*</span>
              <input
                name="signer_name"
                value={form.signer_name}
                onChange={handleChange}
                className="ckr-sig-input"
                required
              />
              <select
                name="signer_designation"
                className="ckr-designation-select"
                value={form.signer_designation}
                onChange={handleChange}
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">
                  कार्यवाहक वडा अध्यक्ष
                </option>
              </select>
            </div>
          </div>

          {/* ── Applicant details ── */}
          <ApplicantDetailsNp
            formData={footerForm}
            handleChange={handleFooterChange}
          />

          {/* ── Submit ── */}
          <div className="ckr-footer">
            <button
              type="submit"
              className="ckr-save-print-btn"
              disabled={loading}
            >
              {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          <div className="ckr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default CharKillaReloaded;