import React, { useState } from "react";
import "./ShopAgriculturalForm.css";

export default function ShopAgriculturalForm() {
  const [form, setForm] = useState({
    province: "बागमती प्रदेश",
    district: "काठमाडौं",
    municipality: "नागार्जुन नगरपालिका",
    ward: "",
    sabik: "",
    sabik_no: "",
    owner_age: "",
    owner_name: "",
    on_behalf_of: "",
    location_name: "",
    registration_no: "",
    operation_from: "",
    operation_to: "",
    period_year: "",
    period_month: "",
    boundary_east: "",
    boundary_west: "",
    boundary_north: "",
    boundary_south: "",
    rohabar_ward_no: "",
    rohabar_post: "",
    rohabar_person: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: "",
    notes: null
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const validate = () => {
    if (!form.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!form.applicant_citizenship?.trim()) return "नागरिकता नं आवश्यक छ";
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
      const payload = { ...form };
      // Convert empty strings to null to keep columns count stable
      Object.keys(payload).forEach(k => { if (payload[k] === "") payload[k] = null; });

      const res = await fetch("/api/forms/shop-agricultural-form", {
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
        province: "बागमती प्रदेश",
        district: "काठमाडौं",
        municipality: "नागार्जुन नगरपालिका",
        ward: "",
        sabik: "",
        sabik_no: "",
        owner_age: "",
        owner_name: "",
        on_behalf_of: "",
        location_name: "",
        registration_no: "",
        operation_from: "",
        operation_to: "",
        period_year: "",
        period_month: "",
        boundary_east: "",
        boundary_west: "",
        boundary_north: "",
        boundary_south: "",
        rohabar_ward_no: "",
        rohabar_post: "",
        rohabar_person: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizenship: "",
        applicant_phone: "",
        notes: null
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="saf-page">
      <header className="saf-topbar">
        <div className="saf-top-left">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</div>
        <div className="saf-top-right">अवलोकन पृष्ठ / पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</div>
      </header>

      <form className="saf-paper" onSubmit={handleSubmit}>
        <h2 className="saf-main-title">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</h2>

        <div className="saf-inline-row">
          <span>लिखित</span>
          <select value={form.province} onChange={e => update("province", e.target.value)}>
            <option>बागमती प्रदेश</option>
          </select>
          <span>जिल्ला</span>
          <select value={form.district} onChange={e => update("district", e.target.value)}>
            <option>काठमाडौं</option>
          </select>
          <span>स्थानीय तह</span>
          <select value={form.municipality} onChange={e => update("municipality", e.target.value)}>
            <option>नागार्जुन नगरपालिका</option>
          </select>
          <span>वडा नं.</span>
          <input type="text" className="saf-small" value={form.ward} onChange={e => update("ward", e.target.value)} />
        </div>

        <div className="saf-inline-row">
          <span>साबिक</span>
          <input type="text" className="saf-medium" value={form.sabik} onChange={e => update("sabik", e.target.value)} />
          <span>का</span>
          <input type="text" className="saf-small" value={form.sabik_no} onChange={e => update("sabik_no", e.target.value)} />
          <span>वर्ष</span>
          <input type="text" className="saf-tiny" value={form.owner_age} onChange={e => update("owner_age", e.target.value)} />
          <span>का श्री</span>
          <input type="text" className="saf-medium" value={form.owner_name} onChange={e => update("owner_name", e.target.value)} />
          <span>को तर्फबाट</span>
          <input type="text" className="saf-medium" value={form.on_behalf_of} onChange={e => update("on_behalf_of", e.target.value)} />
        </div>

        <div className="saf-inline-row">
          <span>उक्त</span>
          <input type="text" className="saf-medium" value={form.location_name} onChange={e => update("location_name", e.target.value)} />
          <span>को नाममा पासल / कृषि फार्म दर्ता मन्जुर भएको पूर्व</span>
          <input type="text" className="saf-medium" value={form.registration_no} onChange={e => update("registration_no", e.target.value)} />
          <span>नं. नागार्जुन नगरपालिका वडा नं.</span>
          <input type="text" className="saf-tiny" value={form.ward} onChange={e => update("ward", e.target.value)} />
          <span>साबिक वडा नं.</span>
          <input type="text" className="saf-tiny" value={form.sabik_no} onChange={e => update("sabik_no", e.target.value)} />
        </div>

        <div className="saf-inline-row">
          <span>जमिन</span>
          <input type="text" className="saf-medium" value={form.location_name} onChange={e => update("location_name", e.target.value)} />
          <span>को स्थानमा रहेको</span>
          <input type="text" className="saf-medium" value={form.location_name} onChange={e => update("location_name", e.target.value)} />
          <span>किराना / कृषि / पशुपंक्षी फार्मको मिति</span>
          <input type="text" className="saf-small" value={form.operation_from} onChange={e => update("operation_from", e.target.value)} />
          <span>देखि</span>
          <input type="text" className="saf-small" value={form.operation_to} onChange={e => update("operation_to", e.target.value)} />
          <span>सम्म संचालन गर्न मन्जुरी दिएको छ ।</span>
        </div>

        <p className="saf-body">
          सोही अनुसार उल्लेखित स्थानीय तहमा पर्ने आयु क्षेत्र भित्र उल्लेखित स्थानमा पसल, कृषि, पशुपंक्षी फार्म सञ्चालन गर्न अनुमति दिईयो ।
        </p>

        <div className="saf-inline-row">
          <span>यी शब्दमा, साल</span>
          <input type="text" className="saf-small" value={form.period_year} onChange={e => update("period_year", e.target.value)} />
          <span>महिना</span>
          <input type="text" className="saf-small" value={form.period_month} onChange={e => update("period_month", e.target.value)} />
        </div>

        <h3 className="saf-subtitle">तपशिल</h3>
        <div className="saf-field-row"><span>१) पूर्व दिशाको सीमाना *</span><input type="text" value={form.boundary_east} onChange={e => update("boundary_east", e.target.value)} /></div>
        <div className="saf-field-row"><span>२) पश्चिम दिशाको सीमाना *</span><input type="text" value={form.boundary_west} onChange={e => update("boundary_west", e.target.value)} /></div>
        <div className="saf-field-row"><span>३) उत्तर दिशाको सीमाना *</span><input type="text" value={form.boundary_north} onChange={e => update("boundary_north", e.target.value)} /></div>
        <div className="saf-field-row"><span>४) दक्षिण दिशाको सीमाना *</span><input type="text" value={form.boundary_south} onChange={e => update("boundary_south", e.target.value)} /></div>

        <h3 className="saf-subtitle">रोहबर</h3>
        <div className="saf-inline-row">
          <span>नागार्जुन नगरपालिका</span>
          <input type="text" className="saf-tiny" value={form.rohabar_ward_no} onChange={e => update("rohabar_ward_no", e.target.value)} />
          <span>नं. वडा का पदधारी</span>
          <select value={form.rohabar_post} onChange={e => update("rohabar_post", e.target.value)}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
          </select>
          <span>श्री</span>
          <input type="text" className="saf-medium" value={form.rohabar_person} onChange={e => update("rohabar_person", e.target.value)} />
        </div>

        <h3 className="saf-subtitle">निवेदकको विवरण</h3>
        <div className="saf-applicant-box">
          <div className="saf-field"><label>निवेदकको नाम *</label><input type="text" value={form.applicant_name} onChange={e => update("applicant_name", e.target.value)} /></div>
          <div className="saf-field"><label>निवेदकको ठेगाना *</label><input type="text" value={form.applicant_address} onChange={e => update("applicant_address", e.target.value)} /></div>
          <div className="saf-field"><label>निवेदकको नागरिकता नं. *</label><input type="text" value={form.applicant_citizenship} onChange={e => update("applicant_citizenship", e.target.value)} /></div>
          <div className="saf-field"><label>निवेदकको फोन नं. *</label><input type="text" value={form.applicant_phone} onChange={e => update("applicant_phone", e.target.value)} /></div>
        </div>

        <div className="saf-submit-row">
          <button className="saf-submit-btn" type="submit" disabled={submitting}>{submitting ? "सेभ गर्दै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
        </div>

        {message && <div className={`saf-message ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}
      </form>

      <footer className="saf-footer">© सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः</footer>
    </div>
  );
}
