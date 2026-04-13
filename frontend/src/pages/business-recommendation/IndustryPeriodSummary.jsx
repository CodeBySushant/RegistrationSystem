// IndustryPeriodSummary.jsx
import React, { useState, useEffect } from "react";
import "./IndustryPeriodSummary.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const defaultProductionRow = {
  description: "", quantity: "", unit: "", productOutput: "",
  outputUnit: "", unitPrice: "", percentTotal: "",
};
const defaultRawRow = { description: "", unit: "", quantity: "", unitPrice: "" };
const defaultManRow = { type: "", female: "", male: "", total: "" };

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  industryName: "",
  address: "",
  periodFrom: "",
  periodTo: "",
  fiscalYear: "",
  registrationDate: "",
  industryType: "",
  establishedDate: "",
  operatingDuration: "",
  exportCountry: "",
  exportValue: "",
  exportQuantity: "",
  governmentBenefits: "",
  environmentMeasures: "",
  preparer: "",
  opener: "",
  water_unit: "", water_quantity: "", water_unit_price: "",
  power_unit: "", power_quantity: "", power_unit_price: "",
  raw_unit: "", raw_quantity: "", raw_unit_price: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function IndustryPeriodSummary() {
  const { user } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [productionRows, setProductionRows] = useState([{ ...defaultProductionRow }]);
  const [rawMaterialRows, setRawMaterialRows] = useState([{ ...defaultRawRow }]);
  const [manpowerRows, setManpowerRows] = useState([
    { ...defaultManRow, type: "प्राविधिक" },
    { ...defaultManRow, type: "प्रशासनिक" },
    { ...defaultManRow, type: "श्रमिक" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleProductionChange = (index, e) => {
    const { name, value } = e.target;
    setProductionRows((prev) => { const c = [...prev]; c[index] = { ...c[index], [name]: value }; return c; });
  };
  const addProductionRow = () => setProductionRows((p) => [...p, { ...defaultProductionRow }]);
  const removeProductionRow = (i) => setProductionRows((p) => p.filter((_, idx) => idx !== i));

  const handleRawChange = (index, e) => {
    const { name, value } = e.target;
    setRawMaterialRows((prev) => { const c = [...prev]; c[index] = { ...c[index], [name]: value }; return c; });
  };
  const addRawRow = () => setRawMaterialRows((p) => [...p, { ...defaultRawRow }]);
  const removeRawRow = (i) => setRawMaterialRows((p) => p.filter((_, idx) => idx !== i));

  const handleManpowerChange = (index, e) => {
    const { name, value } = e.target;
    setManpowerRows((prev) => { const c = [...prev]; c[index] = { ...c[index], [name]: value }; return c; });
  };
  const addManRow = () => setManpowerRows((p) => [...p, { ...defaultManRow }]);
  const removeManRow = (i) => setManpowerRows((p) => p.filter((_, idx) => idx !== i));

  const buildPayload = () => {
    const payload = { ...form };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.productionRows = JSON.stringify(productionRows);
    payload.rawMaterialRows = JSON.stringify(rawMaterialRows);
    payload.manpowerRows = JSON.stringify(manpowerRows);
    return payload;
  };

  const resetAll = () => {
    setForm(initialForm);
    setProductionRows([{ ...defaultProductionRow }]);
    setRawMaterialRows([{ ...defaultRawRow }]);
    setManpowerRows([
      { ...defaultManRow, type: "प्राविधिक" },
      { ...defaultManRow, type: "प्रशासनिक" },
      { ...defaultManRow, type: "श्रमिक" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/forms/industry-period-summary", buildPayload());
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        resetAll();
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ups-page">
      <div className="ups-topbar">
        उद्योग वार्षिक विवरण ।
        <span className="ups-top-right">उद्योग &gt; उद्योग वार्षिक विवरण</span>
      </div>

      <form className="ups-paper" onSubmit={handleSubmit}>

        {/* --- Annex Heading --- */}
        <div className="ups-annex">
          <div>अनुसूची–२०</div>
          <div>(नियम ८ को उपनियम (३) को खण्ड (ख) र नियम १२ को उपनियम (१) को खण्ड (ग) संग सम्बन्धित)</div>
        </div>
        <h2 className="ups-main-title">उद्योगको वार्षिक विवरण</h2>

        {/* --- Section 1: Basic Info --- */}
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

        {/* --- Section 6: Production Table --- */}
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
                  <td><input name="description" value={r.description} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="quantity" value={r.quantity} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="unit" value={r.unit} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="productOutput" value={r.productOutput} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="outputUnit" value={r.outputUnit} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="unitPrice" value={r.unitPrice} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td><input name="percentTotal" value={r.percentTotal} onChange={(e) => handleProductionChange(i, e)} /></td>
                  <td className="ups-action-cell">
                    {productionRows.length > 1 && <button type="button" className="ups-remove-btn" onClick={() => removeProductionRow(i)}>−</button>}
                    {i === productionRows.length - 1 && <button type="button" className="ups-add-btn" onClick={addProductionRow}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* --- Section 7: Raw Materials --- */}
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
                  <td><input name="unit" value={r.unit} onChange={(e) => handleRawChange(i, e)} /></td>
                  <td><input name="quantity" value={r.quantity} onChange={(e) => handleRawChange(i, e)} /></td>
                  <td><input name="unitPrice" value={r.unitPrice} onChange={(e) => handleRawChange(i, e)} /></td>
                  <td className="ups-action-cell">
                    {rawMaterialRows.length > 1 && <button type="button" className="ups-remove-btn" onClick={() => removeRawRow(i)}>−</button>}
                    {i === rawMaterialRows.length - 1 && <button type="button" className="ups-add-btn" onClick={addRawRow}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* --- Section 8: Export --- */}
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

        {/* --- Section 9: Other Resources (static rows) --- */}
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
                <td><input type="text" name="water_unit" value={form.water_unit} onChange={handleChange} /></td>
                <td><input type="text" name="water_quantity" value={form.water_quantity} onChange={handleChange} /></td>
                <td><input type="text" name="water_unit_price" value={form.water_unit_price} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>२</td><td>विद्धुत शक्ति / इन्धन इत्यादि</td>
                <td><input type="text" name="power_unit" value={form.power_unit} onChange={handleChange} /></td>
                <td><input type="text" name="power_quantity" value={form.power_quantity} onChange={handleChange} /></td>
                <td><input type="text" name="power_unit_price" value={form.power_unit_price} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>३</td><td>कच्चा माल / सहयोगी सामग्री</td>
                <td><input type="text" name="raw_unit" value={form.raw_unit} onChange={handleChange} /></td>
                <td><input type="text" name="raw_quantity" value={form.raw_quantity} onChange={handleChange} /></td>
                <td><input type="text" name="raw_unit_price" value={form.raw_unit_price} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* --- Section 10: Manpower --- */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१०. उद्योगमा कार्यरत जनशक्ति :</h3>
          <table className="ups-table">
            <thead>
              <tr>
                <th rowSpan="2">क्र.स.</th><th rowSpan="2">विवरण</th><th colSpan="3">संख्या</th>
              </tr>
              <tr><th>महिला</th><th>पुरुष</th><th>कुल</th></tr>
            </thead>
            <tbody>
              {manpowerRows.map((m, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name="type" value={m.type} onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td><input name="female" value={m.female} onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td><input name="male" value={m.male} onChange={(e) => handleManpowerChange(i, e)} /></td>
                  <td><input name="total" value={m.total} onChange={(e) => handleManpowerChange(i, e)} /></td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" style={{ textAlign: "right" }}>
                  <button type="button" className="ups-add-btn" onClick={addManRow}>+ थप</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* --- Section 11: Environment --- */}
        <section className="ups-section">
          <h3 className="ups-subtitle">११. उद्योग संचालन गर्दा वातावरणमा पर्न जाने प्रतिकूल प्रभाव न्युनिकरणको लागि अपनाएको उपायहरू:</h3>
          <textarea
            className="ups-textarea"
            rows="4"
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

        {/* --- Applicant Details Box --- */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button className="save-print-btn" type="button" onClick={handlePrint}>
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </form>
    </div>
  );
}