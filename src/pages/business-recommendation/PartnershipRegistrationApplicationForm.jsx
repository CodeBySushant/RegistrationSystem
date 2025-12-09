import React, { useState } from "react";
import "./PartnershipRegistrationApplicationForm.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

export default function PartnershipRegistrationApplicationForm() {
  const [form, setForm] = useState({
    date: "",
    to_line1: "",
    to_line2: "",
    firm_name_np: "",
    firm_name_en: "",
    firm_address_full: "",
    firm_nature: "",
    partnership_duration_years: "",
    firm_phone: "",
    firm_email: "",
    firm_category: "सानो",
    partners: [
      // default one partner
      { name: "", father_or_spouse: "", address: "", age: "", investment: "", share_percent: "" }
    ],
    partners_guardian_info: [],     // optional array for guardians/tirpura style
    first_registration_info: "",
    representative_name: "",
    name_registered_date: "",
    firm_start_date: "",
    office_check_officer: "",
    report_received_date: "",
    inspection_table: [],           // rows for office use
    deed_signature: "",
    deed_holder_name: "",
    deed_date: "",
    deed_year: "",
    deed_month: "",
    deed_day: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (key, value) => setForm(s => ({ ...s, [key]: value }));

  // helpers for arrays
  const updatePartner = (idx, key, value) => {
    setForm(s => {
      const copy = [...s.partners];
      copy[idx] = { ...copy[idx], [key]: value };
      return { ...s, partners: copy };
    });
  };
  const addPartner = () => setForm(s => ({ ...s, partners: [...s.partners, { name: "", father_or_spouse: "", address: "", age: "", investment: "", share_percent: "" }] }));
  const removePartner = (idx) => setForm(s => ({ ...s, partners: s.partners.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_citizenship?.trim()) return "नागरिकता नं आवश्यक छ";
    // require at least one partner name
    if (!form.partners.some(p => p.name && p.name.trim())) return "कम्तिमा एक साझेदारको नाम आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { alert(err); return; }
    if (submitting) return;
    setSubmitting(true);
    setMessage(null);

    try {
      // prepare payload - stringify arrays so MySQL JSON/text column can accept
      const payload = { ...form,
        partners: JSON.stringify(form.partners),
        partners_guardian_info: JSON.stringify(form.partners_guardian_info || []),
        inspection_table: JSON.stringify(form.inspection_table || [])
      };
      // normalize empty strings to null
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });

      const res = await fetch("/api/forms/partnership-registration-application-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessage({ type: "success", text: `सेभ भयो (id: ${data.id})` });

      // optional reset
      setForm({
        date: "",
        to_line1: "",
        to_line2: "",
        firm_name_np: "",
        firm_name_en: "",
        firm_address_full: "",
        firm_nature: "",
        partnership_duration_years: "",
        firm_phone: "",
        firm_email: "",
        firm_category: "सानो",
        partners: [{ name: "", father_or_spouse: "", address: "", age: "", investment: "", share_percent: "" }],
        partners_guardian_info: [],
        first_registration_info: "",
        representative_name: "",
        name_registered_date: "",
        firm_start_date: "",
        office_check_officer: "",
        report_received_date: "",
        inspection_table: [],
        deed_signature: "",
        deed_holder_name: "",
        deed_date: "",
        deed_year: "",
        deed_month: "",
        deed_day: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizenship: "",
        applicant_phone: ""
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="praf-page">
      <form className="praf-paper" onSubmit={handleSubmit}>
        <h2 className="praf-main-title">साझेदारी रजिष्ट्रेशन गर्ने दरखास्त फाराम</h2>

        <div className="praf-date-row">मिति : <input value={form.date} onChange={e => update("date", e.target.value)} className="praf-date-input" /></div>

        <div className="praf-to-block">
          <span>श्रीमान</span>
          <input value={form.to_line1} onChange={e => update("to_line1", e.target.value)} className="praf-long-input" />
          <br/>
          <input value={form.to_line2} onChange={e => update("to_line2", e.target.value)} className="praf-long-input praf-to-second" />
        </div>

        {/* basic fields */}
        <section className="praf-section">
          <div className="praf-field-row">
            <span>१) फर्मको पूरा नाम (नेपालीमा) :</span>
            <input value={form.firm_name_np} onChange={e => update("firm_name_np", e.target.value)} className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>२) फर्मको पूरा नाम (अंग्रेजीमा) :</span>
            <input value={form.firm_name_en} onChange={e => update("firm_name_en", e.target.value)} className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>३) फर्मको पूर्ण ठेगाना :</span>
            <input value={form.firm_address_full} onChange={e => update("firm_address_full", e.target.value)} className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>४) फर्मको प्रकृति :</span>
            <input value={form.firm_nature} onChange={e => update("firm_nature", e.target.value)} className="praf-medium-input" />
            <span> अवधि (वर्ष):</span>
            <input value={form.partnership_duration_years} onChange={e => update("partnership_duration_years", e.target.value)} className="praf-small-input" />
          </div>
          <div className="praf-field-row">
            <span>५) फर्म सम्पर्क फोन :</span>
            <input value={form.firm_phone} onChange={e => update("firm_phone", e.target.value)} className="praf-medium-input" />
            <span>इमेल :</span>
            <input value={form.firm_email} onChange={e => update("firm_email", e.target.value)} className="praf-medium-input" />
            <span>वर्ग :</span>
            <select value={form.firm_category} onChange={e => update("firm_category", e.target.value)} className="praf-select">
              <option>सानो</option><option>मझौला</option><option>ठूलो</option>
            </select>
          </div>
        </section>

        {/* partners table (editable) */}
        <section className="praf-section">
          <h3 className="praf-subtitle">साझेदारहरु</h3>
          <table className="praf-table">
            <thead>
              <tr><th>क्र.स.</th><th>नाम</th><th>बाजे/बाबु</th><th>ठेगाना</th><th>उमेर</th><th>लगानी</th><th>लाभ प्रतिशत</th><th>कार्य</th></tr>
            </thead>
            <tbody>
              {form.partners.map((p, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td><input value={p.name} onChange={e => updatePartner(i, "name", e.target.value)} /></td>
                  <td><input value={p.father_or_spouse} onChange={e => updatePartner(i, "father_or_spouse", e.target.value)} /></td>
                  <td><input value={p.address} onChange={e => updatePartner(i, "address", e.target.value)} /></td>
                  <td><input value={p.age} onChange={e => updatePartner(i, "age", e.target.value)} /></td>
                  <td><input value={p.investment} onChange={e => updatePartner(i, "investment", e.target.value)} /></td>
                  <td><input value={p.share_percent} onChange={e => updatePartner(i, "share_percent", e.target.value)} /></td>
                  <td>
                    {form.partners.length > 1 && <button type="button" onClick={() => removePartner(i)}>-</button>}
                    {i === form.partners.length - 1 && <button type="button" onClick={addPartner}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* deed & office use */}
        <section className="praf-section">
          <div className="praf-field-row">
            <span>१०) नाम दर्ता मिति :</span><input value={form.name_registered_date} onChange={e => update("name_registered_date", e.target.value)} className="praf-small-input" />
          </div>
          <div className="praf-field-row">
            <span>११) संचालन थालिएको मिति :</span><input value={form.firm_start_date} onChange={e => update("firm_start_date", e.target.value)} className="praf-small-input" />
          </div>

          <div className="praf-field-row">
            <label>टिप्पणी (कार्यालयले भर्ने): जाँच अधिकारी</label>
            <input value={form.office_check_officer} onChange={e => update("office_check_officer", e.target.value)} className="praf-medium-input" />
            <label>रिपोर्ट प्राप्त मिति</label>
            <input value={form.report_received_date} onChange={e => update("report_received_date", e.target.value)} className="praf-small-input" />
          </div>
        </section>

        <section className="praf-section">
          <div className="praf-field-row">
            <span>दस्तखत :</span>
            <input value={form.deed_signature} onChange={e => update("deed_signature", e.target.value)} className="praf-medium-input" />
          </div>
          <div className="praf-field-row">
            <span>प्रोपाइटर/साझेदार पुरा नाम :</span>
            <input value={form.deed_holder_name} onChange={e => update("deed_holder_name", e.target.value)} className="praf-medium-input" />
          </div>
          <div className="praf-field-row">
            <span>हस्ती मानेको मिति :</span>
            <input value={form.deed_date} onChange={e => update("deed_date", e.target.value)} className="praf-small-input" />
            <span>साल :</span><input value={form.deed_year} onChange={e => update("deed_year", e.target.value)} className="praf-small-input" />
            <span>महिना :</span><input value={form.deed_month} onChange={e => update("deed_month", e.target.value)} className="praf-small-input" />
            <span>गते रोज :</span><input value={form.deed_day} onChange={e => update("deed_day", e.target.value)} className="praf-small-input" />
          </div>
        </section>

        {/* applicant */}
        <section className="praf-section">
          <h3 className="praf-subtitle">निवेदकको विवरण</h3>
          <div className="praf-applicant-box">
            <div className="praf-field"><label>निवेदकको नाम *</label><input value={form.applicant_name} onChange={e => update("applicant_name", e.target.value)} /></div>
            <div className="praf-field"><label>ठेगाना *</label><input value={form.applicant_address} onChange={e => update("applicant_address", e.target.value)} /></div>
            <div className="praf-field"><label>नागरिकता नं. *</label><input value={form.applicant_citizenship} onChange={e => update("applicant_citizenship", e.target.value)} /></div>
            <div className="praf-field"><label>फोन नं. *</label><input value={form.applicant_phone} onChange={e => update("applicant_phone", e.target.value)} /></div>
          </div>
        </section>

        <div className="praf-submit-row">
          <button className="praf-submit-btn" type="submit" disabled={submitting}>{submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className={`praf-message ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}
      </form>
    </div>
  );
}
