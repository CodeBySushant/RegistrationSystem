// PropertyOwnershipTransferRecommendation.jsx
import React, { useState } from "react";
import "./PropertyOwnershipTransferRecommendation.css";

const emptyHeir = () => ({ name: "", relation: "", father_or_husband: "", citizenship_no: "", remarks: "" });
const emptyPropertyRow = () => ({ local_body: "", ward_no: "", area: "", plot_no: "", remarks: "" });

const initial = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",

  // main subject fields
  previous_type: "",
  previous_ward_no: "",
  current_local: "नागार्जुन",
  current_municipality: "नागार्जुन",
  current_ward_no: "1",
  deceased_indicator: "", // e.g. name of deceased / applicant relationship
  applicant_prefix: "श्री",
  applicant_name: "",
  requested_by: "",

  // tables
  other_heirs: [emptyHeir()],
  property_details: [emptyPropertyRow()],

  // signature / applicant
  signature_name: "",
  signature_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: ""
};

export default function PropertyOwnershipTransferRecommendation() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErr(null);
    setMsg(null);
  };

  // table helpers
  const updateArray = (key, idx, field, value) => {
    setForm((p) => {
      const arr = (p[key] || []).map((r, i) => (i === idx ? { ...r, [field]: value } : r));
      return { ...p, [key]: arr };
    });
  };
  const addRow = (key, factory) =>
    setForm((p) => ({ ...p, [key]: [...(p[key] || []), factory()] }));
  const removeRow = (key, idx) =>
    setForm((p) => ({ ...p, [key]: p[key].filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.applicant_name) return "कृपया निवेदकको नाम भर्नुहोस्।";
    if (!form.property_details || form.property_details.length === 0) return "कृपया कम्तिमा एक नामसारी गर्ने सम्पत्ती थप्नुहोस्।";
    const pd = form.property_details[0];
    if (!pd.local_body || !pd.area || !pd.plot_no) return "प्रॉपर्टी विवरणका मुख्य कोलमहरू भर्नुहोस (स्थानीय तह, क्षेत्रफल, कित्ता नं.).";
    if (!form.signature_name) return "कृपया हस्ताक्षरकर्ता नाम भर्नुहोस्।";
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

        previous_type: form.previous_type,
        previous_ward_no: form.previous_ward_no,
        current_local: form.current_local,
        current_municipality: form.current_municipality,
        current_ward_no: form.current_ward_no,
        deceased_indicator: form.deceased_indicator,
        applicant_prefix: form.applicant_prefix,
        applicant_name: form.applicant_name,
        requested_by: form.requested_by,

        // stringify arrays so backend stores them in single column
        other_heirs: JSON.stringify(form.other_heirs),
        property_details: JSON.stringify(form.property_details),

        signature_name: form.signature_name,
        signature_designation: form.signature_designation,

        applicant_address: form.applicant_address,
        applicant_citizenship_no: form.applicant_citizenship_no,
        applicant_phone: form.applicant_phone
      };

      const res = await fetch("/api/forms/property-ownership-transfer-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "सर्भर त्रुटि");
      setMsg(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // optionally reset: setForm(initial);
    } catch (e) {
      setErr(e.message || "अनजान त्रुटि भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-recommendation-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          घर जग्गा नामसारी सिफारिस ।
          <span className="top-right-bread">घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस</span>
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
            <p>चलानी नं. : <input name="chalani_no" value={form.chalani_no} onChange={(e)=>setField("chalani_no", e.target.value)} className="dotted-input small-input" /></p>
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
          <div className="addressee-row"><span>श्री मालपोत कार्यालय</span></div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place || ""} onChange={(e)=>setField("addressee_place", e.target.value)} className="line-input medium-input" />
            <span className="red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त विषयमा जिल्ला <span className="bold-text">काठमाडौँ</span> <span className="bold-text ml-20">{form.current_local}</span> <span className="bold-text ml-20">{form.current_municipality}</span> वडा नं. <span className="bold-text">{form.current_ward_no}</span> (साविक
            <select name="previous_type" value={form.previous_type} onChange={(e)=>setField("previous_type", e.target.value)} className="inline-select medium-select">
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            , वडा नं.
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={(e)=>setField("previous_ward_no", e.target.value)} className="inline-box-input tiny-box" />
            ) अन्तर्गत निवेदक
            <select name="applicant_prefix" value={form.applicant_prefix} onChange={(e)=>setField("applicant_prefix", e.target.value)} className="inline-select">
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input name="applicant_name" value={form.applicant_name} onChange={(e)=>setField("applicant_name", e.target.value)} className="inline-box-input medium-box" required />
            निवेदन अनुसार निजको <input name="deceased_indicator" value={form.deceased_indicator} onChange={(e)=>setField("deceased_indicator", e.target.value)} className="inline-box-input medium-box" /> मा मृत्यु भएको हुनाले...
            Requested by:
            <input name="requested_by" value={form.requested_by} onChange={(e)=>setField("requested_by", e.target.value)} className="inline-box-input medium-box" />
          </p>
        </div>

        {/* Other heirs table */}
        <div className="table-section">
          <h4 className="table-title">अन्य हकदारको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th><th>हकदारहरुको नाम</th><th>नाता</th><th>बाबु पतिको नाम</th><th>नागरिकता नं.</th><th>कैफियत</th><th></th>
                </tr>
              </thead>
              <tbody>
                {form.other_heirs.map((r, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><input value={r.name} onChange={(e)=>updateArray("other_heirs", i, "name", e.target.value)} className="table-input" required /></td>
                    <td><input value={r.relation} onChange={(e)=>updateArray("other_heirs", i, "relation", e.target.value)} className="table-input" required /></td>
                    <td><input value={r.father_or_husband} onChange={(e)=>updateArray("other_heirs", i, "father_or_husband", e.target.value)} className="table-input" /></td>
                    <td><input value={r.citizenship_no} onChange={(e)=>updateArray("other_heirs", i, "citizenship_no", e.target.value)} className="table-input" /></td>
                    <td><input value={r.remarks} onChange={(e)=>updateArray("other_heirs", i, "remarks", e.target.value)} className="table-input" /></td>
                    <td className="action-cell">
                      <button type="button" onClick={()=>addRow("other_heirs", emptyHeir)} className="add-btn">+</button>
                      {form.other_heirs.length>1 && <button type="button" onClick={()=>removeRow("other_heirs", i)}>-</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Property details table */}
        <div className="table-section">
          <h4 className="table-title">नामसारी गर्ने घर/जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th><th>स्थानीय तह (वडा)</th><th>क्षेत्रफल</th><th>कित्ता नं.</th><th>कैफियत</th><th></th>
                </tr>
              </thead>
              <tbody>
                {form.property_details.map((r,i)=>(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>
                      <input value={r.local_body} onChange={(e)=>updateArray("property_details", i, "local_body", e.target.value)} className="table-input half-input" />
                      <span className="cell-label">वडा नं.</span>
                      <input value={r.ward_no} onChange={(e)=>updateArray("property_details", i, "ward_no", e.target.value)} className="table-input tiny-input" />
                    </td>
                    <td><input value={r.area} onChange={(e)=>updateArray("property_details", i, "area", e.target.value)} className="table-input" /></td>
                    <td><input value={r.plot_no} onChange={(e)=>updateArray("property_details", i, "plot_no", e.target.value)} className="table-input" /></td>
                    <td><input value={r.remarks} onChange={(e)=>updateArray("property_details", i, "remarks", e.target.value)} className="table-input" /></td>
                    <td className="action-cell">
                      <button type="button" onClick={()=>addRow("property_details", emptyPropertyRow)} className="add-btn">+</button>
                      {form.property_details.length>1 && <button type="button" onClick={()=>removeRow("property_details", i)}>-</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input name="signature_name" value={form.signature_name} onChange={(e)=>setField("signature_name", e.target.value)} className="line-input full-width-input" required />
            <select name="signature_designation" value={form.signature_designation} onChange={(e)=>setField("signature_designation", e.target.value)} className="designation-select">
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
              <input name="applicant_name" value={form.applicant_name} onChange={(e)=>setField("applicant_name", e.target.value)} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" value={form.applicant_address} onChange={(e)=>setField("applicant_address", e.target.value)} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" value={form.applicant_citizenship_no} onChange={(e)=>setField("applicant_citizenship_no", e.target.value)} className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" value={form.applicant_phone} onChange={(e)=>setField("applicant_phone", e.target.value)} className="detail-input bg-gray" />
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
