// CharKillaReloaded.jsx
import React, { useState } from "react";
import "./CharKillaReloaded.css";

const emptyPlotRow = () => ({
  type_of_place: "जग्गाको", // default option value
  ward_no: "",
  seat_no: "",
  plot_no: "",
  area: "",
  east_plot_no: ""
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  addressee_line1: "",
  addressee_line2: "",
  applicant_name: "",
  malpot_office_place: "काठमाडौँ / कलंकीमा",
  registration_text: "",
  place_type: "जग्गाको",
  declaration_person: "वारेश",
  declaration_relation: "वारेश",
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: ""
};

const CharKillaReloaded = () => {
  const [form, setForm] = useState(initialState);
  const [plots, setPlots] = useState([emptyPlotRow()]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handlePlotChange = (index, key, value) => {
    setPlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addPlotRow = () => setPlots((p) => [...p, emptyPlotRow()]);
  const removePlotRow = (i) => setPlots((p) => p.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.applicant_name) return "निवेदकको नाम अनिवार्य छ।";
    if (!plots.length) return "कम्तिमा एक कित्ता विवरण हुनुपर्छ।";
    // check required fields inside plots
    for (let i = 0; i < plots.length; i++) {
      const r = plots[i];
      if (!r.seat_no || !r.plot_no || !r.east_plot_no) {
        return `कृपया तालिकाको पंक्ति ${i + 1} का अनिवार्य क्षेत्रहरू भर्नुहोस् (सिट, कित्ता, पूर्व कि.नं)।`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    // Prepare payload: keep plots as JSON string (backend will stringify objects too, but explicit is safer)
    const payload = {
      ...form,
      plots: JSON.stringify(plots)
    };

    setLoading(true);
    try {
      const res = await fetch("/api/forms/char-killa-reloaded", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMessage(`रेकर्ड सफलतापूर्वक सेभ भयो (ID: ${data.id})`);
      // optional: reset form or keep values
      // setForm(initialState); setPlots([emptyPlotRow()]);
    } catch (err) {
      setError(err.message || "अनजान त्रुटि");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="char-killa-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          चार किल्ला खुलाई सिफारिस गरिएको(२)।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; चार किल्ला खुलाई सिफारिस</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        {/* Meta */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handleChange} type="text" className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text">चार किल्ला खुलाई सिफारिस सम्वन्धमा</span></p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_line1" value={form.addressee_line1} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_line2" value={form.addressee_line2} onChange={handleChange} type="text" className="line-input medium-input" required />
            <span className="red">*</span>
          </div>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा सम्बन्धित ज.ध. श्री{" "}
            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} className="inline-box-input medium-box" required />
            {" "} <span className="red">*</span> ले आफ्नो नाममा मालपोत कार्यालय <span className="underline-text">{form.malpot_office_place}</span>{" "}
            <input name="registration_text" value={form.registration_text} onChange={handleChange} className="inline-box-input medium-box" />{" "}
            दर्ता प्रमाणित रही आफ्नै हक भोग रहेको तपसिलमा उल्लेखित जग्गाको चार किल्ला खुलाई सिफारिस माग गर्नु भएकोमा ...
            <select name="place_type" className="inline-select" value={form.place_type} onChange={handleChange}>
              <option value="घर / जग्गाको">घर / जग्गाको</option>
              <option value="जग्गाको">जग्गाको</option>
              <option value="घरको">घरको</option>
            </select>
            {" "} निम्न अनुसार किल्ला रहेको हुँदा माग निवेदन अनुसार चार किल्ला खुलाई सिफारिस साथ अनुरोध गरिन्छ ।
          </p>
        </div>

        {/* Table of plots */}
        <div className="table-section">
          <h4 className="table-title">तपसिल</h4>
          <div className="table-header-label">जग्गाको विवरण:</div>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{width: '5%'}}>सि.नं.</th>
                  <th style={{width: '15%'}}>साविक</th>
                  <th style={{width: '8%'}}>वडा नं.</th>
                  <th style={{width: '15%'}}>सिट नं.</th>
                  <th style={{width: '15%'}}>कित्ता नं.</th>
                  <th style={{width: '15%'}}>क्षेत्रफल</th>
                  <th style={{width: '27%'}}>पूर्व कि.नं</th>
                  <th style={{width: '5%'}}>—</th>
                </tr>
              </thead>
              <tbody>
                {plots.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <select
                        className="table-select"
                        value={r.type_of_place}
                        onChange={(e) => handlePlotChange(i, "type_of_place", e.target.value)}
                      >
                        <option value="गा.वि.स.">गा.वि.स.</option>
                        <option value="न.पा.">न.पा.</option>
                      </select>
                    </td>
                    <td><input name={`ward_no_${i}`} value={r.ward_no} onChange={(e) => handlePlotChange(i, "ward_no", e.target.value)} className="table-input" /></td>
                    <td><input name={`seat_no_${i}`} value={r.seat_no} onChange={(e) => handlePlotChange(i, "seat_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input name={`plot_no_${i}`} value={r.plot_no} onChange={(e) => handlePlotChange(i, "plot_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td><input name={`area_${i}`} value={r.area} onChange={(e) => handlePlotChange(i, "area", e.target.value)} className="table-input" /></td>
                    <td><input name={`east_plot_no_${i}`} value={r.east_plot_no} onChange={(e) => handlePlotChange(i, "east_plot_no", e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                    <td>
                      {plots.length > 1 ? (
                        <button type="button" onClick={() => removePlotRow(i)} aria-label={`remove row ${i+1}`} className="small-remove-btn">x</button>
                      ) : (
                        <button type="button" onClick={addPlotRow} className="small-add-btn">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={addPlotRow} className="small-add-btn">कतार थप्नुहोस्</button>
            </div>
          </div>
          <div className="fake-scrollbar"><div className="scroll-thumb" /></div>
        </div>

        {/* Declaration */}
        <div className="declaration-section">
          <p className="body-paragraph">
            यसमा उल्लेखित चारकिल्ला प्रमाणित म आफैं वा मेरो{" "}
            <select name="declaration_person" className="inline-select" value={form.declaration_person} onChange={handleChange}>
              <option value="वारेश">वारेश</option>
              <option value="स्वयं">स्वयं</option>
            </select>
            {" "}मार्फत न.पा. वडा कार्यालयमा उपस्थित भई दिएको छु । यसको आधिकारिकताको जिम्मेवारी म आफैं भएको व्यहोरा ...
            <select name="declaration_relation" className="inline-select" value={form.declaration_relation} onChange={handleChange}>
              <option value="वारेश">वारेश</option>
              <option value="हकवाला">हकवाला</option>
            </select>
            {" "} श्री <input name="declaration_name" value={form.declaration_name || ""} onChange={handleChange} type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> दस्तखत...
          </p>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="full-width-textarea" rows="3" />
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <span className="red-mark">*</span>
            <input name="signer_name" value={form.signer_name} onChange={handleChange} className="line-input full-width-input" required />
            <select name="signer_designation" className="designation-select" value={form.signer_designation} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Applicant details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" value={form.applicant_name} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" value={form.applicant_address} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={handleChange} />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" value={form.applicant_phone} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Footer action */}
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
};

export default CharKillaReloaded;
