import React, { useState } from "react";
import axios from "axios";
import "./IndustryPeriodSummary.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

function IndustryPeriodSummary() {
  // ---- state + defaults (keeps original texts / structure) ----
  const defaultProductionRow = {
    description: "",
    quantity: "",
    unit: "",
    productOutput: "",
    outputUnit: "",
    unitPrice: "",
    percentTotal: ""
  };

  const defaultRawRow = { description: "", unit: "", quantity: "", unitPrice: "" };
  const defaultManRow = { type: "", female: "", male: "", total: "" };

  const [form, setForm] = useState({
    // matches the existing visible fields
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
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "",
    applicantPhone: ""
  });

  const [productionRows, setProductionRows] = useState([ { ...defaultProductionRow } ]);
  const [rawMaterialRows, setRawMaterialRows] = useState([ { ...defaultRawRow } ]);
  const [manpowerRows, setManpowerRows] = useState([
    { ...defaultManRow, type: "प्राविधिक" },
    { ...defaultManRow, type: "प्रशासनिक" },
    { ...defaultManRow, type: "श्रमिक" }
  ]);

  const [submitting, setSubmitting] = useState(false);

  // ---- handlers ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // Production table handlers
  const handleProductionChange = (index, e) => {
    const { name, value } = e.target;
    setProductionRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };
  const addProductionRow = () => setProductionRows((p) => [...p, { ...defaultProductionRow }]);
  const removeProductionRow = (i) => setProductionRows((p) => p.filter((_, idx) => idx !== i));

  // Raw material handlers
  const handleRawChange = (index, e) => {
    const { name, value } = e.target;
    setRawMaterialRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };
  const addRawRow = () => setRawMaterialRows((p) => [...p, { ...defaultRawRow }]);
  const removeRawRow = (i) => setRawMaterialRows((p) => p.filter((_, idx) => idx !== i));

  // Manpower handlers
  const handleManpowerChange = (index, e) => {
    const { name, value } = e.target;
    setManpowerRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };
  const addManRow = () => setManpowerRows((p) => [...p, { ...defaultManRow }]);
  const removeManRow = (i) => setManpowerRows((p) => p.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.industryName?.trim()) return "उद्योगको नाम आवश्यक छ";
    if (!form.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) { alert(err); return; }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        // many of your other forms send arrays as JSON strings; convert if backend expects that
        production: JSON.stringify(productionRows),
        rawMaterials: JSON.stringify(rawMaterialRows),
        manpower: JSON.stringify(manpowerRows)
      };

      // convert empty strings -> null (keeps DB tidy)
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const res = await axios.post("/api/forms/industry-period-summary", payload);

      if (res.status === 200 || res.status === 201) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        // reset visible fields (keeps structure, resets values)
        setForm((p) => ({
          ...p,
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
          applicantName: "",
          applicantAddress: "",
          applicantCitizenship: "",
          applicantPhone: ""
        }));
        setProductionRows([ { ...defaultProductionRow } ]);
        setRawMaterialRows([ { ...defaultRawRow } ]);
        setManpowerRows([
          { ...defaultManRow, type: "प्राविधिक" },
          { ...defaultManRow, type: "प्रशासनिक" },
          { ...defaultManRow, type: "श्रमिक" }
        ]);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.message || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ---- render (keeps your original structure & classes; inputs controlled) ----
  return (
    <div className="ups-page">
      {/* Top dark bar */}
      <header className="ups-topbar">
        <div className="ups-top-left">उद्योग वार्षिक विवरण</div>
        <div className="ups-top-right">अवलोकन पृष्ठ / उद्योग वार्षिक विवरण</div>
      </header>

      {/* Main paper */}
      <div className="ups-paper">
        {/* Annex heading */}
        <div className="ups-annex">
          <div>अनुसूची–२०</div>
          <div>
            (नियम ८ को उपनियम (३) को खण्ड (ख) र नियम १२ को उपनियम (१) को खण्ड (ग)
            संग सम्बन्धित)
          </div>
        </div>

        <h2 className="ups-main-title">उद्योगको वार्षिक विवरण</h2>

        {/* Basic industry info */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१. उद्योगको सामान्य विवरण</h3>

          <div className="ups-field-row">
            <span>१. उद्योगको नाम :</span>
            <input
              type="text"
              className="ups-wide-input"
              name="industryName"
              value={form.industryName}
              onChange={handleChange}
            />
          </div>

          <div className="ups-field-row">
            <span>२. ठेगाना :</span>
            <input
              type="text"
              className="ups-wide-input"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="ups-field-row">
            <span>३. विवरण पेश गरेको अवधि : मिति</span>
            <input
              type="text"
              className="ups-small-input"
              name="periodFrom"
              value={form.periodFrom}
              onChange={handleChange}
            />
            <span>देखि</span>
            <input
              type="text"
              className="ups-small-input"
              name="periodTo"
              value={form.periodTo}
              onChange={handleChange}
            />
            <span>सम्म</span>
          </div>

          <div className="ups-field-row">
            <span>आर्थिक वर्ष :</span>
            <input
              type="text"
              className="ups-small-input"
              name="fiscalYear"
              value={form.fiscalYear}
              onChange={handleChange}
            />
            <span>उद्योगको दर्ता मिति :</span>
            <input
              type="text"
              className="ups-small-input"
              name="registrationDate"
              value={form.registrationDate}
              onChange={handleChange}
            />
          </div>

          <div className="ups-field-row">
            <span>४. उद्योगको प्रकार :</span>
            <input
              type="text"
              className="ups-medium-input"
              name="industryType"
              value={form.industryType}
              onChange={handleChange}
            />
          </div>

          <div className="ups-field-row">
            <span>५. उद्योग स्थापना / संचालनको मिति :</span>
            <input
              type="text"
              className="ups-small-input"
              name="establishedDate"
              value={form.establishedDate}
              onChange={handleChange}
            />
            <span>उद्योग संचालन भएको अवधि :</span>
            <input
              type="text"
              className="ups-small-input"
              name="operatingDuration"
              value={form.operatingDuration}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Production table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">६. उत्पादनको विवरण :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विवरण</th>
                <th>परिमाण</th>
                <th>एकाई</th>
                <th>उत्पाद परिणाम</th>
                <th>एकाइ</th>
                <th>प्रति एकाइ मूल्य</th>
                <th>कुल परिमाण (प्रतिशत)</th>
                <th>कार्य</th>
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
                  <td>
                    {productionRows.length > 1 && <button type="button" onClick={() => removeProductionRow(i)}>−</button>}
                    {i === productionRows.length - 1 && <button type="button" onClick={addProductionRow}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Raw materials table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">७. कच्चा पदार्थ, केमिकल एवं यांत्रिक सामान :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विवरण</th>
                <th>एकाइ</th>
                <th>परिमाण</th>
                <th>सरदर एकाइको मूल्य</th>
                <th>कार्य</th>
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
                  <td>
                    {rawMaterialRows.length > 1 && <button type="button" onClick={() => removeRawRow(i)}>−</button>}
                    {i === rawMaterialRows.length - 1 && <button type="button" onClick={addRawRow}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Market / export info */}
        <section className="ups-section">
          <h3 className="ups-subtitle">८. उत्पादित सामानको निकासी :</h3>

          <div className="ups-field-row">
            <span>(क) बिक्री गरेको मुलुकको नाम :</span>
            <input
              type="text"
              className="ups-wide-input"
              name="exportCountry"
              value={form.exportCountry}
              onChange={handleChange}
            />
          </div>

          <div className="ups-field-row">
            <span>(ख) बिक्री रकम :</span>
            <input
              type="text"
              className="ups-medium-input"
              name="exportValue"
              value={form.exportValue}
              onChange={handleChange}
            />
            <span>(ग) निकासी परिमाण :</span>
            <input
              type="text"
              className="ups-medium-input"
              name="exportQuantity"
              value={form.exportQuantity}
              onChange={handleChange}
            />
          </div>

          <div className="ups-field-row">
            <span>
              ९. कुनै पनि तहबाट नेपाल सरकारबाट उद्योगले प्राप्त गरेको कुनै
              छुट सुविधा:
            </span>
            <input
              type="text"
              className="ups-wide-input"
              name="governmentBenefits"
              value={form.governmentBenefits}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Other resources table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">९. उद्योगले प्रयोग गरेको अन्य आवश्यकताहरू :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विवरण</th>
                <th>एकाइ</th>
                <th>परिमाण</th>
                <th>सरदर एकाइको मूल्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>पानी</td>
                <td><input type="text" name="water_unit" value={form.water_unit || ""} onChange={handleChange} /></td>
                <td><input type="text" name="water_quantity" value={form.water_quantity || ""} onChange={handleChange} /></td>
                <td><input type="text" name="water_unit_price" value={form.water_unit_price || ""} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>२</td>
                <td>विद्धुत शक्ति / इन्धन इत्यादि</td>
                <td><input type="text" name="power_unit" value={form.power_unit || ""} onChange={handleChange} /></td>
                <td><input type="text" name="power_quantity" value={form.power_quantity || ""} onChange={handleChange} /></td>
                <td><input type="text" name="power_unit_price" value={form.power_unit_price || ""} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>३</td>
                <td>कच्चा माल / सहयोगी सामग्री</td>
                <td><input type="text" name="raw_unit" value={form.raw_unit || ""} onChange={handleChange} /></td>
                <td><input type="text" name="raw_quantity" value={form.raw_quantity || ""} onChange={handleChange} /></td>
                <td><input type="text" name="raw_unit_price" value={form.raw_unit_price || ""} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Manpower table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१०. उद्योगमा कार्यरत जनशक्ति :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th rowSpan="2">क्र.स.</th>
                <th rowSpan="2">विवरण</th>
                <th colSpan="3">संख्या</th>
              </tr>
              <tr>
                <th>महिला</th>
                <th>पुरुष</th>
                <th>कुल</th>
              </tr>
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
                  <button type="button" onClick={addManRow}>+ थप</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Environment section */}
        <section className="ups-section">
          <h3 className="ups-subtitle">
            ११. उद्योग संचालन गर्दा वातावरणमा पर्न जाने प्रतिकूल प्रभाव न्युनिकरणको लागि अपनाएको उपायहरू:
          </h3>

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
              <input
                type="text"
                className="ups-medium-input"
                name="preparer"
                value={form.preparer}
                onChange={handleChange}
              />
            </div>

            <div className="ups-sign-right">
              <span>खुल्ने गर्ने</span>
              <input
                type="text"
                className="ups-medium-input"
                name="opener"
                value={form.opener}
                onChange={handleChange}
              />
              <div className="ups-sign-role">संचालक/व्यवस्थापक</div>
            </div>
          </div>
        </section>

        {/* Applicant details */}
        <section className="ups-section">
          <h3 className="ups-subtitle">निवेदकको विवरण</h3>
          <div className="ups-applicant-box">
            <div className="ups-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="ups-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="ups-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="ups-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Submit button */}
        <div className="ups-submit-row">
          <button className="ups-submit-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ups-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryPeriodSummary;
