// PropertyOwnershipTransferKitani.jsx
import React, { useState } from "react";
import "./PropertyOwnershipTransferKitani.css";

const emptyDeceased = () => ({ name: "", relation: "", death_date: "२०८२-०८-०६" });
const emptyHeir = () => ({ name: "", relation: "", father_or_husband: "", citizenship_no: "", remarks: "" });

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),

  // basic subject/addressee
  addressee_place: "",
  previous_type: "",
  previous_ward_no: "",
  current_ward_no: "१",

  deceased_person_name: "",
  deceased_person_relation: "",
  deceased_person_spouse: "",
  deceased_death_date: "२०८२-०८-०६",
  deceased_prev_type: "",
  deceased_prev_ward_no: "",
  plot_no: "",
  jb_no: "",
  jb_area: "",

  // arrays (tables)
  deceased_heirs: [emptyDeceased()],
  living_heirs: [emptyHeir()],
  transfer_heirs: [emptyHeir()],

  // sarjimin block
  sarjimin_village_no: "",
  sarjimin_ward_no: "",
  sarjimin_year: "",
  sarjimin_extra: "",

  signature_name: "",
  signature_designation: "",

  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: ""
};

export default function PropertyOwnershipTransferKitani() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErr(null);
    setMsg(null);
  };

  // array helpers
  const updateArray = (key, idx, field, value) => {
    setForm((p) => {
      const arr = (p[key] || []).map((r, i) => (i === idx ? { ...r, [field]: value } : r));
      return { ...p, [key]: arr };
    });
  };
  const addRow = (key, factory) => {
    setForm((p) => ({ ...p, [key]: [...(p[key] || []), factory()] }));
  };
  const removeRow = (key, idx) => {
    setForm((p) => ({ ...p, [key]: p[key].filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    if (!form.addressee_place) return "कृपया सम्वोधन ठेगाना दिनुहोस्।";
    if (!form.deceased_person_name) return "कृपया मृतकको नाम भर्नुहोस्।";
    if (!form.plot_no) return "कृपया कि.नं. भर्नुहोस्।";
    if (!form.jb_no) return "कृपया ज.बि भर्नुहोस्।";
    if (!form.signature_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
    // check first transfer heir minimally
    const th = form.transfer_heirs && form.transfer_heirs[0];
    if (!th || !th.name) return "कृपया नामसारी गरिने कम्तिमा एक हकदारको नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const v = validate();
    if (v) { setErr(v); return; }

    setLoading(true);
    try {
      const payload = {
        letter_no: form.letter_no,
        chalani_no: form.chalani_no,
        date_nep: form.date_nep,
        addressee_place: form.addressee_place,
        previous_type: form.previous_type,
        previous_ward_no: form.previous_ward_no,
        current_ward_no: form.current_ward_no,

        deceased_person_name: form.deceased_person_name,
        deceased_person_relation: form.deceased_person_relation,
        deceased_person_spouse: form.deceased_person_spouse,
        deceased_death_date: form.deceased_death_date,
        deceased_prev_type: form.deceased_prev_type,
        deceased_prev_ward_no: form.deceased_prev_ward_no,
        plot_no: form.plot_no,
        jb_no: form.jb_no,
        jb_area: form.jb_area,

        deceased_heirs: JSON.stringify(form.deceased_heirs),
        living_heirs: JSON.stringify(form.living_heirs),
        transfer_heirs: JSON.stringify(form.transfer_heirs),

        sarjimin_village_no: form.sarjimin_village_no,
        sarjimin_ward_no: form.sarjimin_ward_no,
        sarjimin_year: form.sarjimin_year,
        sarjimin_extra: form.sarjimin_extra,

        signature_name: form.signature_name,
        signature_designation: form.signature_designation,

        applicant_name: form.applicant_name,
        applicant_address: form.applicant_address,
        applicant_citizenship_no: form.applicant_citizenship_no,
        applicant_phone: form.applicant_phone
      };

      const res = await fetch("/api/forms/property-ownership-transfer-kitani", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMsg(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optionally reset:
      // setForm(initialState);
    } catch (e) {
      setErr(e.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-kitani-container">
      <form onSubmit={handle}>
        <div className="top-bar-title">
          घर जग्गा नामसारी सिफारिस (कितानी)।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस (कितानी)</span>
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
            <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={handle} className="dotted-input small-input" /></p>
          </div>
          <div className="meta-right">
            <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="subject-section">
          <p>विषय: <span className="underline-text">घर जग्गा नामसारी सिफारिस।</span></p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री मालपोत कार्यालय</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={handle} className="line-input medium-input" required />
            <span className="red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">नागार्जुन नगरपालिका</span> वडा नं. <span className="bold-text">{form.current_ward_no}</span> (साविक
            <select name="previous_type" value={form.previous_type} onChange={handle} className="inline-select medium-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            , वडा नं.
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={handle} className="inline-box-input tiny-box" required /> ) बस्ने
            <input name="deceased_person_name" value={form.deceased_person_name} onChange={handle} className="inline-box-input medium-box" required /> को
            <select name="deceased_person_relation" value={form.deceased_person_relation} onChange={handle} className="inline-select">
              <option>नाति</option>
              <option>नातिनी</option>
            </select>
            इत्यादि ... मृतकको मिति
            <input name="deceased_death_date" value={form.deceased_death_date} onChange={handle} className="inline-box-input small-box" />
            भएको हुनाले निज मृतकका नाममा दर्ता कायम रहेको ... कि.न. <input name="plot_no" value={form.plot_no} onChange={handle} className="inline-box-input small-box" required /> ज.बि <input name="jb_no" value={form.jb_no} onChange={handle} className="inline-box-input small-box" required /> भएको मृतक जग्गा/घर ... नामसारीका लागि सिफारिस गरिन्छ।
          </p>
        </div>

        {/* Table 1: deceased_heirs */}
        <div className="table-section">
          <h4 className="table-title">मृत्यु भैसकेका हकदार</h4>
          <table className="details-table">
            <thead>
              <tr>
                <th>क्र.स.</th><th>नाम थर</th><th>नाता</th><th>मृत्यु मिति</th><th></th>
              </tr>
            </thead>
            <tbody>
              {form.deceased_heirs.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input value={r.name} onChange={(e)=>updateArray("deceased_heirs", i, "name", e.target.value)} className="table-input" required /></td>
                  <td><input value={r.relation} onChange={(e)=>updateArray("deceased_heirs", i, "relation", e.target.value)} className="table-input" required /></td>
                  <td><input value={r.death_date} onChange={(e)=>updateArray("deceased_heirs", i, "death_date", e.target.value)} className="table-input" /></td>
                  <td className="action-cell">
                    <button type="button" onClick={()=>addRow("deceased_heirs", emptyDeceased)} className="add-btn">+</button>
                    {form.deceased_heirs.length>1 && <button type="button" onClick={()=>removeRow("deceased_heirs", i)}>-</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 2: living_heirs */}
        <div className="table-section">
          <h4 className="table-title">जीवित हकदारको विवरण</h4>
          <table className="details-table">
            <thead>
              <tr><th>क्र.स.</th><th>नाम</th><th>नाता</th><th>बाबु/पति</th><th>नागरिकता नं.</th><th>कैफियत</th><th></th></tr>
            </thead>
            <tbody>
              {form.living_heirs.map((r, i)=>(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td><input value={r.name} onChange={(e)=>updateArray("living_heirs", i, "name", e.target.value)} className="table-input" /></td>
                  <td><input value={r.relation} onChange={(e)=>updateArray("living_heirs", i, "relation", e.target.value)} className="table-input" /></td>
                  <td><input value={r.father_or_husband} onChange={(e)=>updateArray("living_heirs", i, "father_or_husband", e.target.value)} className="table-input" /></td>
                  <td><input value={r.citizenship_no} onChange={(e)=>updateArray("living_heirs", i, "citizenship_no", e.target.value)} className="table-input" /></td>
                  <td><input value={r.remarks} onChange={(e)=>updateArray("living_heirs", i, "remarks", e.target.value)} className="table-input" /></td>
                  <td className="action-cell">
                    <button type="button" onClick={()=>addRow("living_heirs", emptyHeir)} className="add-btn">+</button>
                    {form.living_heirs.length>1 && <button type="button" onClick={()=>removeRow("living_heirs", i)}>-</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table 3: transfer_heirs */}
        <div className="table-section">
          <h4 className="table-title">नामसारी गरिने हकदारको विवरण</h4>
          <table className="details-table">
            <thead>
              <tr><th>क्र.स.</th><th>नाम</th><th>नाता</th><th>बाबु/पति</th><th>नागरिकता नं.</th><th>कैफियत</th><th></th></tr>
            </thead>
            <tbody>
              {form.transfer_heirs.map((r,i)=>(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td><input value={r.name} onChange={(e)=>updateArray("transfer_heirs", i, "name", e.target.value)} className="table-input" /></td>
                  <td><input value={r.relation} onChange={(e)=>updateArray("transfer_heirs", i, "relation", e.target.value)} className="table-input" /></td>
                  <td><input value={r.father_or_husband} onChange={(e)=>updateArray("transfer_heirs", i, "father_or_husband", e.target.value)} className="table-input" /></td>
                  <td><input value={r.citizenship_no} onChange={(e)=>updateArray("transfer_heirs", i, "citizenship_no", e.target.value)} className="table-input" /></td>
                  <td><input value={r.remarks} onChange={(e)=>updateArray("transfer_heirs", i, "remarks", e.target.value)} className="table-input" /></td>
                  <td className="action-cell">
                    <button type="button" onClick={()=>addRow("transfer_heirs", emptyHeir)} className="add-btn">+</button>
                    {form.transfer_heirs.length>1 && <button type="button" onClick={()=>removeRow("transfer_heirs", i)}>-</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sarjimin block */}
        <div className="sarjimin-section">
          <p>
            निवेदकको निवेदन अनुसार सर्जमिन बुझ्दा
            <input name="sarjimin_village_no" value={form.sarjimin_village_no} onChange={handle} className="inline-box-input tiny-box" required /> वडा नं.
            <input name="sarjimin_ward_no" value={form.sarjimin_ward_no} onChange={handle} className="inline-box-input tiny-box" required /> बस्ने बर्ष
            <input name="sarjimin_year" value={form.sarjimin_year} onChange={handle} className="inline-box-input tiny-box" required /> को <input name="sarjimin_extra" value={form.sarjimin_extra} onChange={handle} className="inline-box-input medium-box" required /> समेत ...
          </p>
          <textarea className="full-width-textarea" rows="3" value={form.sarjimin_extra} onChange={(e)=>setForm(p=>({...p, sarjimin_extra: e.target.value}))}></textarea>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input name="signature_name" value={form.signature_name} onChange={handle} className="line-input full-width-input" required />
            <select name="signature_designation" value={form.signature_designation} onChange={handle} className="designation-select">
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" value={form.applicant_name} onChange={handle} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={handle} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={handle} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={handle} className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {msg && <div className="success-message" style={{marginTop:12}}>{msg}</div>}
        {err && <div className="error-message" style={{marginTop:12}}>{err}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
}
