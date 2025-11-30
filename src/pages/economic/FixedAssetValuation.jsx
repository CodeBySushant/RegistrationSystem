// FixedAssetValuationForm.jsx
import React, { useState } from "react";
import "./FixedAssetValuation.css"; // keep your styles or tweak as needed

const emptyRow = () => ({
  owner_name: "",
  owner_sabik: "",
  owner_ward: "",
  owner_kitta_no: "",
  owner_area: "",
  owner_rate: "",
  owner_remarks: ""
});

export default function FixedAssetValuationForm() {
  const [form, setForm] = useState({
    letter_no: "",
    chalani_no: "",
    date: "",
    former_area: "",
    former_vdc_mun: "",
    former_ward: "",
    current_municipality: "नागार्जुन",
    current_ward: "१",
    person_title: "श्री",
    person_name: "",
    application_to: "नगरपालिका",
    application_ward: "",
    signature_name: "",
    designation: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: "",
    notes: ""
  });

  const [rows, setRows] = useState([emptyRow()]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const updateRow = (idx, key, value) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));

  const addRow = () => setRows((p) => [...p, emptyRow()]);
  const removeRow = (idx) => setRows((p) => p.filter((_, i) => i !== idx));

  const validate = () => {
    if (!form.person_name.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_name.trim()) return "निवेदकको विवरण भर्नुहोस्";
    // require at least one tapashil owner_name or kitta
    const hasTapashil = rows.some((r) => r.owner_name.trim() || r.owner_kitta_no.trim());
    if (!hasTapashil) return "कम्तिमा एउटा तपशीिल पंक्ति आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (submitting) return;
    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }
    setSubmitting(true);
    setMessage(null);

    // Build payload consistent with forms.json columns
    const payload = {
      ...form,
      // server expects business-like JSON string for complex fields if needed;
      // we send tapashil as JSON string field `tapashil` (or you can adapt server to accept array)
      tapashil: JSON.stringify(rows)
    };

    try {
      const res = await fetch("/api/forms/fixed-asset-valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessage({ type: "success", text: `रेकर्ड सेभ भयो (id: ${data.id ?? "n/a"})` });
      // optional: reset
      setForm({
        letter_no: "",
        chalani_no: "",
        date: "",
        former_area: "",
        former_vdc_mun: "",
        former_ward: "",
        current_municipality: "नागार्जुन",
        current_ward: "१",
        person_title: "श्री",
        person_name: "",
        application_to: "नगरपालिका",
        application_ward: "",
        signature_name: "",
        designation: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizenship: "",
        applicant_phone: "",
        notes: ""
      });
      setRows([emptyRow()]);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="valuation-form">
      <h2>अचल सम्पत्ति मुल्यांकन (Fixed Asset Valuation)</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid-row">
          <label>पत्र संख्या</label>
          <input name="letter_no" value={form.letter_no} onChange={(e) => update("letter_no", e.target.value)} />
          <label>चलानी नं.</label>
          <input name="chalani_no" value={form.chalani_no} onChange={(e) => update("chalani_no", e.target.value)} />
          <label>मिति</label>
          <input name="date" value={form.date} onChange={(e) => update("date", e.target.value)} placeholder="YYYY-MM-DD or २०८२-०८-०६" />
        </div>

        <fieldset>
          <legend>मुख्य विवरण</legend>
          <div className="grid-row">
            <label>साविक जिल्ला / क्षेत्र</label>
            <input name="former_area" value={form.former_area} onChange={(e) => update("former_area", e.target.value)} />
            <label>साविक (गा.वि.स./नगर)</label>
            <input name="former_vdc_mun" value={form.former_vdc_mun} onChange={(e) => update("former_vdc_mun", e.target.value)} />
            <label>साविक वडा नं.</label>
            <input name="former_ward" value={form.former_ward} onChange={(e) => update("former_ward", e.target.value)} />
          </div>

          <div className="grid-row">
            <label>हालको नगरपालिका</label>
            <input name="current_municipality" value={form.current_municipality} onChange={(e) => update("current_municipality", e.target.value)} />
            <label>हालको वडा नं.</label>
            <input name="current_ward" value={form.current_ward} onChange={(e) => update("current_ward", e.target.value)} />
          </div>

          <div className="grid-row">
            <label>निवेदक पद</label>
            <input name="person_title" value={form.person_title} onChange={(e) => update("person_title", e.target.value)} />
            <label>निवेदकको नाम</label>
            <input name="person_name" value={form.person_name} onChange={(e) => update("person_name", e.target.value)} />
            <label>सम्बोधन (to)</label>
            <input name="application_to" value={form.application_to} onChange={(e) => update("application_to", e.target.value)} />
            <label>सम्बोधन वडा</label>
            <input name="application_ward" value={form.application_ward} onChange={(e) => update("application_ward", e.target.value)} />
          </div>
        </fieldset>

        <fieldset>
          <legend>तपशीिल (Tapashil) — जमीन विवरण</legend>

          <table className="tapashil-table">
            <thead>
              <tr>
                <th>#</th>
                <th>जग्गा धनी</th>
                <th>साविक</th>
                <th>वडा</th>
                <th>कित्ता नं.</th>
                <th>क्षेत्रफल</th>
                <th>दर/प्रति कठ्ठा</th>
                <th>कैफियत</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><input name={`owner_name_${i}`} value={r.owner_name} onChange={(e) => updateRow(i, "owner_name", e.target.value)} /></td>
                  <td><input name={`owner_sabik_${i}`} value={r.owner_sabik} onChange={(e) => updateRow(i, "owner_sabik", e.target.value)} /></td>
                  <td><input name={`owner_ward_${i}`} value={r.owner_ward} onChange={(e) => updateRow(i, "owner_ward", e.target.value)} /></td>
                  <td><input name={`owner_kitta_no_${i}`} value={r.owner_kitta_no} onChange={(e) => updateRow(i, "owner_kitta_no", e.target.value)} /></td>
                  <td><input name={`owner_area_${i}`} value={r.owner_area} onChange={(e) => updateRow(i, "owner_area", e.target.value)} /></td>
                  <td><input name={`owner_rate_${i}`} value={r.owner_rate} onChange={(e) => updateRow(i, "owner_rate", e.target.value)} /></td>
                  <td><input name={`owner_remarks_${i}`} value={r.owner_remarks} onChange={(e) => updateRow(i, "owner_remarks", e.target.value)} /></td>
                  <td>
                    <button type="button" onClick={() => removeRow(i)} disabled={rows.length === 1}>-</button>
                    {i === rows.length - 1 && <button type="button" onClick={addRow}>+</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>हस्ताक्षर / निवेदक विवरण</legend>
          <div className="grid-row">
            <label>हस्ताक्षर नाम</label>
            <input name="signature_name" value={form.signature_name} onChange={(e) => update("signature_name", e.target.value)} />
            <label>पद</label>
            <input name="designation" value={form.designation} onChange={(e) => update("designation", e.target.value)} />
          </div>

          <div className="grid-row">
            <label>निवेदकको नाम</label>
            <input name="applicant_name" value={form.applicant_name} onChange={(e) => update("applicant_name", e.target.value)} />
            <label>ठेगाना</label>
            <input name="applicant_address" value={form.applicant_address} onChange={(e) => update("applicant_address", e.target.value)} />
          </div>

          <div className="grid-row">
            <label>नागरिकता नं.</label>
            <input name="applicant_citizenship" value={form.applicant_citizenship} onChange={(e) => update("applicant_citizenship", e.target.value)} />
            <label>फोन</label>
            <input name="applicant_phone" value={form.applicant_phone} onChange={(e) => update("applicant_phone", e.target.value)} />
          </div>

          <div className="grid-row">
            <label>कैफियत / नोट्स</label>
            <textarea name="notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>{submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && (
          <div className={`msg ${message.type === "error" ? "error" : "success"}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
