// src/components/TapInstallationRecommendation.jsx
import React, { useState } from "react";
import "./TapInstallationRecommendation.css";

const FORM_KEY = "tap-installation-recommendation";
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const emptyKitta = { description: "", kitta_no: "" };

export default function TapInstallationRecommendation() {
  const [form, setForm] = useState({
    chalan_no: "२०८२/८३",
    date_nepali: new Date().toISOString().slice(0, 10),
    addressee_prefix: "श्री",
    addressee_name: "",
    addressee_place: "",
    ward_no: "1",
    previous_address: "",
    owner_name: "",
    kitta_main_no: "",
    construction_type: "आंशिक",
    tap_count: "",
    kitta_list: [emptyKitta],
    signature_name: "",
    signature_designation: "",
    bodartha_text: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  };

  const setKitta = (index, key, value) => {
    setForm(s => {
      const list = s.kitta_list.slice();
      list[index] = { ...list[index], [key]: value };
      return { ...s, kitta_list: list };
    });
  };

  const addKittaRow = () => {
    setForm(s => ({ ...s, kitta_list: [...s.kitta_list, { ...emptyKitta }] }));
  };

  const removeKittaRow = (index) => {
    setForm(s => {
      const list = s.kitta_list.slice();
      list.splice(index, 1);
      return { ...s, kitta_list: list.length ? list : [{ ...emptyKitta }] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // basic validation
    if (!form.addressee_name || !form.owner_name || !form.kitta_list.length) {
      setError("कृपया आवस्यक फिल्डहरू भर्नुहोस् (प्राप्तकर्ता, जग्गाधनी, कम्तिमा एक कित्ता)।");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || data.error || "Server error");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tap-installation-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          धारा जडान सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; धारा जडान सिफारिस</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        <div className="meta-data-row">
          <div className="meta-left">
            <label>पत्र संख्या :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" />
            </label>
            <label>चलानी नं. :
              <input name="kitta_main_no" value={form.kitta_main_no} onChange={onChange} className="dotted-input small-input" />
            </label>
          </div>
          <div className="meta-right">
            <label>मिति :
              <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="dotted-input small-input" />
            </label>
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">धारा जडान सिफारिस।</span></p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>{form.addressee_prefix}</span>
            <input name="addressee_name" value={form.addressee_name} onChange={onChange} className="line-input medium-input" required />
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange} className="line-input medium-input" />
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा <strong>नागार्जुन नगरपालिका</strong> वडा नं. <strong>{form.ward_no}</strong> (साविकको ठेगाना
            <input name="previous_address" value={form.previous_address} onChange={onChange} className="inline-box-input medium-box" /> ) बस्ने श्री
            <input name="owner_name" value={form.owner_name} onChange={onChange} className="inline-box-input long-box" />
            को नाममा दर्ता कायम रहेको कि.नं.
            <input name="kitta_main_no" value={form.kitta_main_no} onChange={onChange} className="inline-box-input small-box" required /> को जग्गामा मिति {form.date_nepali} मा भवन निर्माण स्वीकृति लिनु भई
            <select name="construction_type" value={form.construction_type} onChange={onChange} className="inline-select">
              <option value="आंशिक">आंशिक</option>
              <option value="पूर्ण">पूर्ण</option>
            </select>
            रुपमा निर्माण सम्पन्न गर्नुभएको वा अभिलेखीकरण गर्नुभएको हुँदा <input name="tap_count" value={form.tap_count} onChange={onChange} className="inline-box-input medium-box" required /> धारा जडान गरिदिन हुन सिफारिस साथ अनुरोध गरिन्छ।
          </p>
        </div>

        <div className="table-section">
          <h4 className="table-title">कित्ता नं. को विवरण</h4>
          <table className="kitta-table">
            <thead>
              <tr>
                <th style={{width: '10%'}}>क्र.स.</th>
                <th style={{width: '55%'}}>जग्गाको विवरण</th>
                <th style={{width: '30%'}}>कित्ता नं.</th>
                <th style={{width: '5%'}}></th>
              </tr>
            </thead>
            <tbody>
              {form.kitta_list.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input value={r.description} onChange={(e) => setKitta(i, "description", e.target.value)} className="table-input" required /></td>
                  <td><input value={r.kitta_no} onChange={(e) => setKitta(i, "kitta_no", e.target.value)} className="table-input" required /></td>
                  <td className="action-cell">
                    <button type="button" onClick={() => removeKittaRow(i)} className="add-row-btn">−</button>
                    {i === form.kitta_list.length - 1 && <button type="button" onClick={addKittaRow} className="add-row-btn">+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input name="signature_name" value={form.signature_name} onChange={onChange} className="line-input full-width-input" required />
            <select name="signature_designation" value={form.signature_designation} onChange={onChange} className="designation-select">
               <option value="">पद छनौट गर्नुहोस्</option>
               <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
               <option value="वडा सचिव">वडा सचिव</option>
               <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <div className="bodartha-section">
          <p className="bodartha-label">बोधार्थ:-</p>
          <div className="bodartha-row">
             <input name="bodartha_text" value={form.bodartha_text} onChange={onChange} className="line-input medium-input" />
             <span>- जानकारीको लागि |</span>
          </div>
        </div>

        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" value={form.applicant_name} onChange={onChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={onChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={onChange} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={onChange} className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {result && <div style={{ color: "green", marginTop: 8 }}>Saved successfully. id: {result.id}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
