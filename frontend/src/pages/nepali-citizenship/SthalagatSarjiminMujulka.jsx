import React, { useState, useEffect } from "react";
import "./SthalagatSarjiminMujulka.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "sthalagat-sarjimin-mujulka";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function SthalagatSarjiminMujulka() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    district_office_1: "",
    team_no_1: "",
    municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
    ward_no: "१",
    person_title: "श्री",
    person_name: "",
    relation_type_1: "छोरा",
    applicant_name_1: "",
    applicant_title: "श्री",
    applicant_name_2: "",
    relation_type_2: "छोरा",
    district_office_2: "",
    team_no_2: "",

    tapsil: [
      { name: "", watan: "", prpn_no: "", issue_date: new Date().toISOString().slice(0, 10) }
    ],

    signatory_name: "",
    signatory_position: "",
    signatory_date: new Date().toISOString().slice(0, 10),

    // Applicant Details Bottom Footer
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  // 4. FIXED: Standardized handleChange for main inputs and ApplicantDetailsNp component
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tapsil Table Handlers
  const updateTapsilRow = (idx, key) => (e) => {
    setForm(s => {
      const rows = s.tapsil.slice();
      rows[idx] = { ...rows[idx], [key]: e.target.value };
      return { ...s, tapsil: rows };
    });
  };

  const addTapsilRow = () => {
    setForm(s => ({
      ...s,
      tapsil: s.tapsil.concat({ name: "", watan: "", prpn_no: "", issue_date: new Date().toISOString().slice(0, 10) })
    }));
  };

  const removeTapsilRow = (idx) => {
    if (form.tapsil.length > 1) {
      setForm(s => ({ ...s, tapsil: s.tapsil.filter((_, i) => i !== idx) }));
    }
  };

  const validate = () => {
    if (!form.applicant_name) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no) return "नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const v = validate();
    if (v) { setMessage({ type: "error", text: v }); return; }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो` });
      window.print(); // Prompt print on success
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सम्भव भएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sarjimin-mujulka-container" onSubmit={handleSubmit}>
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        स्थलगत सर्जमिन मुचुल्का ।
        <span className="top-right-bread">नेपाली नागरिकता &gt; स्थलगत सर्जमिन मुचुल्का</span>
      </div>

      {/* HEADER SECTION */}
      <div className="form-header-details">
        <h3 className="schedule-title">अनुसूची-३</h3>
        <p className="rule-text">नियम ३ को उपनियम (३) को खण्ड (क) सँग सम्बन्धित</p>
        <h2 className="form-type-title">स्थलगत सर्जमिन मुचुल्काको ढाँचा</h2>
        <h3 className="sub-type-text">वंशजको नाताले</h3>
      </div>

      {/* 3. FIXED: Body Paragraph designed as a continuous inline block */}
      <div className="intro-paragraph">
        <p className="body-paragraph">
          लिखितम तपशिल बमोजिमका हामीहरु आगे जिल्ला प्रशासन कार्यालय, काठमाडौँ <input name="district_office_1" className="dotted-input medium-input" value={form.district_office_1} onChange={handleChange} /> समक्षबाट नागरिकता वितरण कार्यको खटिइ आएको टोली नम्बर <span className="red">*</span> 
          <input name="team_no_1" className="dotted-input small-input" value={form.team_no_1} onChange={handleChange} /> समक्ष यस जिल्लाको 
          <input name="municipality" className="dotted-input medium-input" value={form.municipality} onChange={handleChange} /> वडा नं 
          <input name="ward_no" className="dotted-input tiny-input" value={form.ward_no} onChange={handleChange} /> मा बसोबास गर्ने 
          <select name="person_title" className="inline-select" value={form.person_title} onChange={handleChange}>
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select> <span className="red">*</span>
          <input name="person_name" className="dotted-input long-input" value={form.person_name} onChange={handleChange} /> को 
          <select name="relation_type_1" className="inline-select" value={form.relation_type_1} onChange={handleChange}>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
            <option value="श्रीमती">श्रीमती</option>
          </select> <span className="red">*</span>
          <input name="applicant_name_1" className="dotted-input long-input" value={form.applicant_name_1} onChange={handleChange} /> ले नेपाली नागरिकताको प्रमाण पत्र पाउनका लागि निवेदन दिनु भएको सम्बन्धमा हामीहरुलाई सोधनी हुँदा हाम्रो चित्त बुझ्यो निज निवेदक 
          <select name="applicant_title" className="inline-select" value={form.applicant_title} onChange={handleChange}>
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select> <span className="red">*</span>
          <input name="applicant_name_2" className="dotted-input long-input" value={form.applicant_name_2} onChange={handleChange} /> का 
          <select name="relation_type_2" className="inline-select" value={form.relation_type_2} onChange={handleChange}>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
            <option value="श्रीमती">श्रीमती</option>
          </select> हुन् निज निवेदक वंशजको नाताले नेपाली नागरिक हुन् निजलाई वंशजको नाताले नेपाली नागरिकता प्रमाण पत्र दिएमा फरक पर्ने छैन व्यहोरा फरक परेमा प्रचलित कानून बमोजिम हुने सजाय सहुँला बुझाउँला भनी हामी तपशिलका व्यक्तिहरु सही छाप गरी यो सर्जमिन मुचुल्का जिल्ला प्रशासन कार्यालय काठमाडौँ 
          <input name="district_office_2" className="dotted-input medium-input" value={form.district_office_2} onChange={handleChange} /> को नागरिकता वितरण टोली नम्बर 
          <input name="team_no_2" className="dotted-input medium-input" value={form.team_no_2} onChange={handleChange} /> मार्फत नेपाल सरकारमा चढायौं ।
        </p>
      </div>

      {/* TABLE SECTION */}
      <div className="table-section">
        <div className="table-responsive">
          <table className="details-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>नाम थर</th>
                <th>वतन</th>
                <th>ना.प्र.प.नं</th>
                <th>नागरिकता जारी मिति</th>
                <th className="hide-print">थप</th>
              </tr>
            </thead>
            <tbody>
              {form.tapsil.map((row, idx) => (
                <tr key={idx}>
                  <td className="center-text">{idx + 1}</td>
                  <td><span className="red hide-print">*</span><input className="table-input" value={row.name} onChange={updateTapsilRow(idx, "name")} /></td>
                  <td><span className="red hide-print">*</span><input className="table-input" value={row.watan} onChange={updateTapsilRow(idx, "watan")} /></td>
                  <td><span className="red hide-print">*</span><input className="table-input" value={row.prpn_no} onChange={updateTapsilRow(idx, "prpn_no")} /></td>
                  <td><input type="date" className="table-input" value={row.issue_date} onChange={updateTapsilRow(idx, "issue_date")} /></td>
                  <td className="action-cell hide-print">
                    {idx === 0 ? (
                      <button type="button" className="add-btn" onClick={addTapsilRow}>+</button>
                    ) : (
                      <button type="button" className="remove-btn" onClick={() => removeTapsilRow(idx)}>×</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIGNATURE BLOCK */}
      <div className="signature-container">
        <div className="signature-section">
          <div className="sig-row">
            <label>नाम: <span className="red hide-print">*</span></label>
            <input name="signatory_name" className="dotted-input medium-input" value={form.signatory_name} onChange={handleChange} />
          </div>
          <div className="sig-row">
            <label>पद: </label>
            <select name="signatory_position" className="inline-select medium-select" value={form.signatory_position} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
          </div>
          <div className="sig-row">
            <label>मिति: </label>
            <input type="date" name="signatory_date" className="dotted-input medium-input" value={form.signatory_date} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* APPLICANT DETAILS FOOTER */}
      <div className="hide-print">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      {/* FOOTER ACTIONS */}
      <div className="form-footer hide-print">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
        {message && <div style={{ marginTop: 15, color: message.type === "error" ? "crimson" : "green", fontWeight: "bold" }}>{message.text}</div>}
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
      </div>
    </form>
  );
}