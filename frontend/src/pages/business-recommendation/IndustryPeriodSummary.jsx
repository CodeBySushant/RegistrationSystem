// IndustryPeriodSummary.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from IndustryPeriodSummary.css)
   CSS already used "ups-" prefix for component classes.
   Non-prefixed generic classes (.form-footer, .save-print-btn, etc.) are
   now prefixed with "ups-" too.

   NOTE: Bare `body` rule dropped — background/font moved to .ups-page.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .ups-page {
    max-width: 950px;
    margin: 0 auto;
    background: #d6d7da;
    font-family: "Kalimati", "Kokila", "Mangal", sans-serif;
  }

  /* ── Top Bar ── */
  .ups-topbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .ups-top-right { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Paper ── */
  .ups-paper {
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: "Kalimati", "Kokila", sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Annex / Title ── */
  .ups-annex       { text-align: center; font-size: 1rem; line-height: 1.8; }
  .ups-main-title  { text-align: center; margin: 8px 0 16px; font-size: 1.3rem; font-weight: bold; }

  /* ── Sections ── */
  .ups-section  { margin-top: 20px; }
  .ups-subtitle { font-size: 1rem; font-weight: bold; margin-bottom: 8px; }

  /* ── Field Rows ── */
  .ups-field-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    font-size: 1rem;
    margin-top: 8px;
  }
  .ups-field-row input {
    padding: 4px 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
  }
  .ups-small-input  { width: 90px; }
  .ups-medium-input { width: 160px; }
  .ups-wide-input   { flex: 1; min-width: 220px; }

  /* ── Tables ── */
  .ups-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    margin-top: 8px;
  }
  .ups-table th,
  .ups-table td { border: 1px solid #c2c2c2; padding: 6px 5px; vertical-align: middle; }
  .ups-table th  { background-color: #f0f0f0; text-align: center; font-weight: bold; }
  .ups-table td input {
    width: 100%;
    border: none;
    padding: 3px 4px;
    outline: none;
    background: #fff;
    font-family: inherit;
    font-size: 0.95rem;
  }
  .ups-action-cell { text-align: center; white-space: nowrap; }
  .ups-add-btn {
    background: #2c3e50;
    color: white;
    padding: 3px 9px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 1px;
    font-family: inherit;
  }
  .ups-add-btn:hover { background: #1a252f; }
  .ups-remove-btn {
    background: #c0392b;
    color: white;
    padding: 3px 9px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 1px;
    font-family: inherit;
  }
  .ups-remove-btn:hover { background: #922b21; }

  /* ── Textarea ── */
  .ups-textarea {
    width: 100%;
    box-sizing: border-box;
    margin-top: 8px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 8px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    border-radius: 3px;
  }

  /* ── Sign Row ── */
  .ups-sign-row {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 1rem;
  }
  .ups-sign-left,
  .ups-sign-right { display: flex; flex-direction: column; gap: 6px; }
  .ups-sign-right .ups-medium-input,
  .ups-sign-left  .ups-medium-input {
    border: none;
    border-bottom: 1px dotted #000;
    border-radius: 0;
    background: #fff;
  }
  .ups-sign-role { font-size: 0.9rem; color: #555; }

  /* ── Applicant details (scoped) ── */
  .ups-paper .applicant-details-box {
    border: 2px solid #999;
    padding: 20px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 4px;
  }
  .ups-paper .applicant-details-box h3 {
    color: #777; font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .ups-paper .details-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 18px !important;
  }
  .ups-paper .detail-group { display: flex; flex-direction: column; }
  .ups-paper .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .ups-paper .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    background: #fff;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    font-family: inherit;
  }
  .ups-paper .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .ups-form-footer { text-align: center; margin-top: 40px; }
  .ups-save-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
  }
  .ups-save-btn:hover:not(:disabled) { background-color: #1a252f; }
  .ups-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .ups-copyright {
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
    .ups-paper, .ups-paper * { visibility: visible; }
    .ups-paper {
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
    .ups-topbar, .ups-form-footer { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Row defaults
───────────────────────────────────────────────────────────────────────────── */
const defaultProductionRow = {
  description: "", quantity: "", unit: "", productOutput: "",
  outputUnit: "", unitPrice: "", percentTotal: "",
};
const defaultRawRow = { description: "", unit: "", quantity: "", unitPrice: "" };
const defaultManRow = { type: "", female: "", male: "", total: "" };

/* ─────────────────────────────────────────────────────────────────────────────
   Initial Form
───────────────────────────────────────────────────────────────────────────── */
const initialForm = {
  date:                new Date().toISOString().slice(0, 10),
  industryName:        "",
  address:             "",
  periodFrom:          "",
  periodTo:            "",
  fiscalYear:          "",
  registrationDate:    "",
  industryType:        "",
  establishedDate:     "",
  operatingDuration:   "",
  exportCountry:       "",
  exportValue:         "",
  exportQuantity:      "",
  governmentBenefits:  "",
  environmentMeasures: "",
  preparer:            "",
  opener:              "",
  water_unit: "", water_quantity: "", water_unit_price: "",
  power_unit: "", power_quantity: "", power_unit_price: "",
  raw_unit:   "", raw_quantity:   "", raw_unit_price:   "",
  applicantName:       "",
  applicantAddress:    "",
  applicantCitizenship: "",
  applicantPhone:      "",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function IndustryPeriodSummary() {
  const { user } = useAuth();

  const [form,            setForm]            = useState(initialForm);
  const [productionRows,  setProductionRows]  = useState([{ ...defaultProductionRow }]);
  const [rawMaterialRows, setRawMaterialRows] = useState([{ ...defaultRawRow }]);
  const [manpowerRows,    setManpowerRows]    = useState([
    { ...defaultManRow, type: "प्राविधिक"   },
    { ...defaultManRow, type: "प्रशासनिक"  },
    { ...defaultManRow, type: "श्रमिक"     },
  ]);
  const [loading, setLoading] = useState(false);

  /* ── Field handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ── Production table ── */
  const handleProductionChange = (i, e) => {
    const { name, value } = e.target;
    setProductionRows((p) => p.map((r, idx) => idx === i ? { ...r, [name]: value } : r));
  };
  const addProductionRow    = () => setProductionRows((p) => [...p, { ...defaultProductionRow }]);
  const removeProductionRow = (i) => setProductionRows((p) => p.filter((_, idx) => idx !== i));

  /* ── Raw material table ── */
  const handleRawChange = (i, e) => {
    const { name, value } = e.target;
    setRawMaterialRows((p) => p.map((r, idx) => idx === i ? { ...r, [name]: value } : r));
  };
  const addRawRow    = () => setRawMaterialRows((p) => [...p, { ...defaultRawRow }]);
  const removeRawRow = (i) => setRawMaterialRows((p) => p.filter((_, idx) => idx !== i));

  /* ── Manpower table ── */
  const handleManpowerChange = (i, e) => {
    const { name, value } = e.target;
    setManpowerRows((p) => p.map((r, idx) => idx === i ? { ...r, [name]: value } : r));
  };
  const addManRow    = () => setManpowerRows((p) => [...p, { ...defaultManRow }]);
  const removeManRow = (i) => setManpowerRows((p) => p.filter((_, idx) => idx !== i));

  /* ── Build payload ── */
  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.productionRows  = JSON.stringify(productionRows);
    payload.rawMaterialRows = JSON.stringify(rawMaterialRows);
    payload.manpowerRows    = JSON.stringify(manpowerRows);
    return payload;
  };

  const resetAll = () => {
    setForm(initialForm);
    setProductionRows([{ ...defaultProductionRow }]);
    setRawMaterialRows([{ ...defaultRawRow }]);
    setManpowerRows([
      { ...defaultManRow, type: "प्राविधिक"  },
      { ...defaultManRow, type: "प्रशासनिक" },
      { ...defaultManRow, type: "श्रमिक"    },
    ]);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-period-summary", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        resetAll();
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Save → Print → Reset ── */
  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-period-summary", buildPayload());
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        resetAll();
      }
    } catch (err) {
      console.error("Print error:", err);
      alert("Error saving before print.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="ups-page">
      <style>{STYLES}</style>

      {/* ── Top Bar ── */}
      <div className="ups-topbar">
        उद्योग वार्षिक विवरण ।
        <span className="ups-top-right">उद्योग &gt; उद्योग वार्षिक विवरण</span>
      </div>

      <form className="ups-paper" onSubmit={handleSubmit}>

        {/* ── Annex Heading ── */}
        <div className="ups-annex">
          <div>अनुसूची–२०</div>
          <div>(नियम ८ को उपनियम (३) को खण्ड (ख) र नियम १२ को उपनियम (१) को खण्ड (ग) संग सम्बन्धित)</div>
        </div>
        <h2 className="ups-main-title">उद्योगको वार्षिक विवरण</h2>

        {/* ── Section 1: Basic Info ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१. उद्योगको सामान्य विवरण</h3>
          <div className="ups-field-row">
            <span>१. उद्योगको नाम :</span>
            <input type="text" className="ups-wide-input" name="industryName" value={form.industryName} onChange={handleChange} />
          </div>
          <div className="ups-field-row">
            <span>२. ठेगाना :</span>
            <input type="text" className="ups-wide-input" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="ups-field-row">
            <span>३. विवरण पेश गरेको अवधि : मिति</span>
            <input type="text" className="ups-small-input" name="periodFrom" value={form.periodFrom} onChange={handleChange} />
            <span>देखि</span>
            <input type="text" className="ups-small-input" name="periodTo" value={form.periodTo} onChange={handleChange} />
            <span>सम्म</span>
          </div>
          <div className="ups-field-row">
            <span>आर्थिक वर्ष :</span>
            <input type="text" className="ups-small-input" name="fiscalYear" value={form.fiscalYear} onChange={handleChange} />
            <span>उद्योगको दर्ता मिति :</span>
            <input type="text" className="ups-small-input" name="registrationDate" value={form.registrationDate} onChange={handleChange} />
          </div>
          <div className="ups-field-row">
            <span>४. उद्योगको प्रकार :</span>
            <input type="text" className="ups-medium-input" name="industryType" value={form.industryType} onChange={handleChange} />
          </div>
          <div className="ups-field-row">
            <span>५. उद्योग स्थापना / संचालनको मिति :</span>
            <input type="text" className="ups-small-input" name="establishedDate" value={form.establishedDate} onChange={handleChange} />
            <span>उद्योग संचालन भएको अवधि :</span>
            <input type="text" className="ups-small-input" name="operatingDuration" value={form.operatingDuration} onChange={handleChange} />
          </div>
        </section>

        {/* ── Section 6: Production Table ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">६. उत्पादनको विवरण :</h3>
          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th><th>विवरण</th><th>परिमाण</th><th>एकाई</th>
                <th>उत्पाद परिणाम</th><th>एकाइ</th><th>प्रति एकाइ मूल्य</th>
                <th>कुल परिमाण (प्रतिशत)</th><th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {productionRows.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name="description"  value={r.description}  onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="quantity"      value={r.quantity}      onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="unit"          value={r.unit}          onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="productOutput" value={r.productOutput} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="outputUnit"    value={r.outputUnit}    onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="unitPrice"     value={r.unitPrice}     onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="percentTotal"  value={r.percentTotal}  onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td className="ups-action-cell">
                    {productionRows.length > 1 && (
                      <button type="button" className="ups-remove-btn" onClick={() => removeProductionRow(i)}>−</button>
                    )}
                    {i === productionRows.length - 1 && (
                      <button type="button" className="ups-add-btn" onClick={addProductionRow}>+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Section 7: Raw Materials ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">७. कच्चा पदार्थ, केमिकल एवं यांत्रिक सामान :</h3>
          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th><th>विवरण</th><th>एकाइ</th><th>परिमाण</th><th>सरदर एकाइको मूल्य</th><th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterialRows.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name="description" value={r.description} onChange={(e) => handleRawChange(i, e)} /></td>
                  <td><input name="unit"        value={r.unit}        onChange={(e) => handleRawChange(i, e)} /></td>
                  <td><input name="quantity"    value={r.quantity}    onChange={(e) => handleRawChange(i, e)} /></td>
                  <td><input name="unitPrice"   value={r.unitPrice}   onChange={(e) => handleRawChange(i, e)} /></td>
                  <td className="ups-action-cell">
                    {rawMaterialRows.length > 1 && (
                      <button type="button" className="ups-remove-btn" onClick={() => removeRawRow(i)}>−</button>
                    )}
                    {i === rawMaterialRows.length - 1 && (
                      <button type="button" className="ups-add-btn" onClick={addRawRow}>+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Section 8: Export ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">८. उत्पादित सामानको निकासी :</h3>
          <div className="ups-field-row">
            <span>(क) बिक्री गरेको मुलुकको नाम :</span>
            <input type="text" className="ups-wide-input" name="exportCountry" value={form.exportCountry} onChange={handleChange} />
          </div>
          <div className="ups-field-row">
            <span>(ख) बिक्री रकम :</span>
            <input type="text" className="ups-medium-input" name="exportValue" value={form.exportValue} onChange={handleChange} />
            <span>(ग) निकासी परिमाण :</span>
            <input type="text" className="ups-medium-input" name="exportQuantity" value={form.exportQuantity} onChange={handleChange} />
          </div>
          <div className="ups-field-row">
            <span>९. कुनै पनि तहबाट नेपाल सरकारबाट उद्योगले प्राप्त गरेको कुनै छुट सुविधा:</span>
            <input type="text" className="ups-wide-input" name="governmentBenefits" value={form.governmentBenefits} onChange={handleChange} />
          </div>
        </section>

        {/* ── Section 9: Other Resources (static) ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">९. उद्योगले प्रयोग गरेको अन्य आवश्यकताहरू :</h3>
          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th><th>विवरण</th><th>एकाइ</th><th>परिमाण</th><th>सरदर एकाइको मूल्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td><td>पानी</td>
                <td><input type="text" name="water_unit"       value={form.water_unit}       onChange={handleChange} /></td>
                <td><input type="text" name="water_quantity"   value={form.water_quantity}   onChange={handleChange} /></td>
                <td><input type="text" name="water_unit_price" value={form.water_unit_price} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>२</td><td>विद्धुत शक्ति / इन्धन इत्यादि</td>
                <td><input type="text" name="power_unit"       value={form.power_unit}       onChange={handleChange} /></td>
                <td><input type="text" name="power_quantity"   value={form.power_quantity}   onChange={handleChange} /></td>
                <td><input type="text" name="power_unit_price" value={form.power_unit_price} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>३</td><td>कच्चा माल / सहयोगी सामग्री</td>
                <td><input type="text" name="raw_unit"       value={form.raw_unit}       onChange={handleChange} /></td>
                <td><input type="text" name="raw_quantity"   value={form.raw_quantity}   onChange={handleChange} /></td>
                <td><input type="text" name="raw_unit_price" value={form.raw_unit_price} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ── Section 10: Manpower ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१०. उद्योगमा कार्यरत जनशक्ति :</h3>
          <table className="ups-table">
            <thead>
              <tr>
                <th rowSpan={2}>क्र.स.</th>
                <th rowSpan={2}>विवरण</th>
                <th colSpan={3}>संख्या</th>
                <th rowSpan={2}></th>
              </tr>
              <tr><th>महिला</th><th>पुरुष</th><th>कुल</th></tr>
            </thead>
            <tbody>
              {manpowerRows.map((m, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name="type"   value={m.type}   onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td><input name="female" value={m.female} onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td><input name="male"   value={m.male}   onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td><input name="total"  value={m.total}  onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td className="ups-action-cell">
                    <button type="button" className="ups-add-btn" onClick={addManRow}>+</button>
                    {manpowerRows.length > 1 && (
                      <button type="button" className="ups-remove-btn" onClick={() => removeManRow(i)}>−</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Section 11: Environment ── */}
        <section className="ups-section">
          <h3 className="ups-subtitle">११. उद्योग संचालन गर्दा वातावरणमा पर्न जाने प्रतिकूल प्रभाव न्युनिकरणको लागि अपनाएको उपायहरू:</h3>
          <textarea
            className="ups-textarea"
            rows={4}
            name="environmentMeasures"
            placeholder="यहाँ उद्योग संचालनका क्रममा अपनाइएका वातावरणीय उपायहरू उल्लेख गर्नुहोस्…"
            value={form.environmentMeasures}
            onChange={handleChange}
          />
          <div className="ups-sign-row">
            <div className="ups-sign-left">
              <span>तयार गर्ने</span>
              <input type="text" className="ups-medium-input" name="preparer" value={form.preparer} onChange={handleChange} />
            </div>
            <div className="ups-sign-right">
              <span>खुल्ने गर्ने</span>
              <input type="text" className="ups-medium-input" name="opener" value={form.opener} onChange={handleChange} />
              <div className="ups-sign-role">संचालक/व्यवस्थापक</div>
            </div>
          </div>
        </section>

        {/* ── Applicant Details ── */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* ── Footer ── */}
        <div className="ups-form-footer">
          <button className="ups-save-btn" type="button" onClick={handlePrint} disabled={loading}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="ups-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}