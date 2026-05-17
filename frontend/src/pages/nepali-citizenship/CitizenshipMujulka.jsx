// CitizenshipMujulka.jsx
import React, { useState, useEffect, useRef } from "react";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from CitizenshipMujulka.css)
   All classes prefixed with "cm-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .cm-container {
    max-width: 950px;
    margin: 0 auto;
    padding: 30px 50px;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    color: #000;
    position: relative;
  }

  /* ── Utility ── */
  .cm-bold      { font-weight: bold; }
  .cm-underline { text-decoration: underline; text-underline-offset: 4px; }
  .cm-red       { color: red; font-weight: bold; margin: 0 2px; }
  .cm-center    { text-align: center; }
  .cm-mt20      { margin-top: 30px; }

  /* ── Top Bar ── */
  .cm-top-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .cm-breadcrumb { font-size: 0.9rem; color: #777; font-weight: normal; }

  /* ── Body ── */
  .cm-body           { margin-top: 20px; font-size: 1.05rem; }
  .cm-body-paragraph { line-height: 2.4; text-align: justify; margin: 0; }

  /* ── f-input ── */
  .cm-f-input {
    display: inline-block;
    height: 26px;
    border: none;
    border-bottom: 1.5px solid #555;
    background-color: #ffffff;
    outline: none;
    padding: 2px 5px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 1rem;
    color: #000;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 0;
  }
  .cm-f-input:focus { border-bottom-color: #c0392b; background-color: #fffaf9; }

  /* ── f-select ── */
  .cm-f-select {
    display: inline-block;
    height: 26px;
    border: 1px solid #999;
    background-color: #ffffff;
    padding: 1px 4px;
    margin: 0 2px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
    border-radius: 3px;
    cursor: pointer;
    vertical-align: middle;
    box-sizing: border-box;
  }
  .cm-f-select:focus { border-color: #c0392b; outline: none; }

  /* ── Width variants ── */
  .cm-tiny   { width: 52px;  text-align: center; }
  .cm-small  { width: 100px; }
  .cm-medium { width: 150px; }
  .cm-long   { width: 210px; }
  .cm-date   { width: 142px; }

  /* ── Table ── */
  .cm-table-section    { margin-top: 40px; margin-bottom: 40px; }
  .cm-table-title      { margin-bottom: 15px; color: #333; font-size: 1.1rem; font-weight: bold; }
  .cm-table-responsive { overflow-x: auto; }
  .cm-table            { width: 100%; border-collapse: collapse; }
  .cm-table th {
    border: 1px solid #000;
    padding: 7px 8px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: #000;
    background-color: #f0f0f0;
  }
  .cm-table td { border: 1px solid #000; padding: 3px 4px; background-color: #ffffff; }
  .cm-table-input {
    width: 95%;
    height: 24px;
    border: none;
    border-bottom: 1px solid #bbb;
    background-color: #ffffff;
    outline: none;
    padding: 2px 4px;
    font-size: 0.95rem;
    font-family: inherit;
    box-sizing: border-box;
    vertical-align: middle;
  }
  .cm-table-input:focus { border-bottom-color: #c0392b; }
  .cm-action-cell { text-align: center; vertical-align: middle; }
  .cm-add-btn,
  .cm-remove-btn {
    color: #fff;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .cm-add-btn          { background-color: #2471a3; }
  .cm-add-btn:hover    { background-color: #1a5276; }
  .cm-remove-btn       { background-color: #e74c3c; }
  .cm-remove-btn:hover { background-color: #c0392b; }

  /* ── Signature / roles blocks ── */
  .cm-sig-block      { margin-top: 30px; }
  .cm-sig-block h4   { margin-bottom: 12px; font-size: 1.05rem; color: #333; }

  /* ── Date block ── */
  .cm-date-block { margin-top: 20px; }

  /* ── Submit message ── */
  .cm-submit-msg {
    display: inline-block;
    padding: 8px 18px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 12px;
  }
  .cm-msg-success { background: #eafaf1; color: #1e8449; border: 1px solid #a9dfbf; }
  .cm-msg-error   { background: #fdecea; color: #c0392b; border: 1px solid #f5b7b1; }

  /* ── Applicant details overrides ── */
  .cm-container .applicant-details-box {
    border: 1px solid #ddd;
    padding: 20px;
    background-color: rgba(255,255,255,0.85);
    margin-top: 20px;
    border-radius: 4px;
  }
  .cm-container .applicant-details-box h3 {
    color: #777;
    font-size: 1.1rem;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  .cm-container .applicant-details-box .details-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
  .cm-container .applicant-details-box .detail-group { display: flex; flex-direction: column; }
  .cm-container .applicant-details-box .detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
  .cm-container .applicant-details-box .detail-input {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    font-family: inherit;
    font-size: 0.95rem;
    color: #000;
  }
  .cm-container .applicant-details-box .detail-input:focus { border-color: #c0392b; outline: none; background-color: #fffaf9; }
  .cm-container .applicant-details-box .bg-gray { background-color: #eef2f5 !important; }

  /* ── Footer ── */
  .cm-footer { text-align: center; margin-top: 40px; }
  .cm-save-print-btn {
    background-color: #2c3e50;
    color: #ffffff;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.2s;
  }
  .cm-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
  .cm-save-print-btn:disabled { background-color: #7f8c8d; cursor: not-allowed; }

  /* ── Copyright ── */
  .cm-copyright {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }

  /* ── Print ── */
  @media print {
    body * { visibility: hidden; }
    .cm-container,
    .cm-container * { visibility: visible; }
    .cm-container {
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      box-shadow: none;
      border: none;
      margin: 0; padding: 0;
      background: white;
    }
    .cm-f-input,
    .cm-table-input,
    .cm-container .detail-input {
      background-color: transparent !important;
      border-bottom: 1px dotted #999 !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
    }
    .cm-f-select {
      background-color: transparent !important;
      border: none !important;
      border-bottom: 1px dotted #999 !important;
      color: #000 !important;
      -webkit-text-fill-color: #000 !important;
    }
    .cm-hide-print { display: none !important; }
    .cm-footer      { display: none !important; }
    .cm-table th { background-color: #f0f0f0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants & helpers
───────────────────────────────────────────────────────────────────────────── */
const FORM_KEY = "citizenship-mujulka";
const API_URL  = `/api/forms/${FORM_KEY}`;

const emptyRow = () => ({
  district: "", local_unit: "", ward_no: "",
  residence: "", prpn_no: "", year: "",
});

const buildInitialState = (ward) => ({
  province: "",
  district_1: "काठमाडौँ",
  municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  ward_no: ward ? String(ward) : "१",
  prev_address_type: "",
  prev_address: "",
  prev_ward: "",
  grandfather_title: "श्री",
  grandfather_name: "",
  relation_1_type: "नाति",
  father_title: "श्री",
  father_name: "",
  relation_2_type: "छोरा",
  applicant_age: "",
  applicant_title: "श्री",
  applicant_name: "",
  dob_basis: "मेरो शैक्षिक योग्यताको प्रमाण-पत्र",
  dob: new Date().toISOString().slice(0, 10),
  check_applicant_title: "श्री",
  check_applicant_name: "",
  check_relation_type: "छोरा",
  check_relative_title: "श्री",
  check_relative_name: "",
  check_dob: new Date().toISOString().slice(0, 10),
  submit_municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  table_rows: [emptyRow()],
  rohawar_district: "",
  rohawar_local_unit: "",
  rohawar_position: "",
  rohawar_title: "श्री",
  rohawar_name: "",
  tamel_district: "",
  tamel_local_unit: "",
  tamel_ward: "",
  tamel_position: "",
  tamel_title: "श्री",
  tamel_name: "",
  date_year: "",
  date_month: "",
  date_day: "",
  date_day_name: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  notes: "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function CitizenshipMujulka() {
  const { user } = useAuth();

  const [form, setForm]         = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState(null);

  // RAF-based print trigger — fires AFTER React re-renders the success message
  const pendingPrintRef = useRef(false);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
  }, [user]);

  // Runs after every render; if flag is set → clear it → print
  useEffect(() => {
    if (pendingPrintRef.current) {
      pendingPrintRef.current = false;
      const t = setTimeout(() => window.print(), 200);
      return () => clearTimeout(t);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      table_rows: prev.table_rows.map((r, i) =>
        i === idx ? { ...r, [key]: val } : r
      ),
    }));
  };

  const addRow = () =>
    setForm((prev) => ({ ...prev, table_rows: [...prev.table_rows, emptyRow()] }));

  const removeRow = (idx) => {
    if (form.table_rows.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      table_rows: prev.table_rows.filter((_, i) => i !== idx),
    }));
  };

  const validate = () => {
    if (!form.applicant_name.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicantName.trim())  return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) { setMessage({ type: "error", text: err }); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        table_rows: JSON.stringify(form.table_rows),
        ward_no: String(form.ward_no),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct   = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object"
          ? body.message || JSON.stringify(body)
          : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: "रेकर्ड सफलतापूर्वक सेभ भयो" });
      pendingPrintRef.current = true;  // trigger print after next render
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <form className="cm-container" onSubmit={handleSubmit} noValidate>

        {/* ── Top Bar ── */}
        <div className="cm-top-bar cm-hide-print">
          नागरिकताको लागि मुचुल्का ।
          <span className="cm-breadcrumb">
            नेपाली नागरिकता &gt; नागरिकताको लागि मुचुल्का
          </span>
        </div>

        {/* ── Body ── */}
        <div className="cm-body">
          <p className="cm-body-paragraph">
            लिखितम हामी तपसिलमा उल्लेखित मानिसहरु आगे बागमती प्रदेश{" "}
            <input name="province"    className="cm-f-input cm-medium" value={form.province}    onChange={handleChange} />{" "}
            , काठमाडौँ जिल्ला{" "}
            <input name="municipality" className="cm-f-input cm-medium" value={form.municipality} onChange={handleChange} />{" "}
            वडा नं.{" "}
            <input name="ward_no"     className="cm-f-input cm-tiny"   value={form.ward_no}     onChange={handleChange} />{" "}
            को कार्यालय मार्फत (साविक{" "}
            <select name="prev_address_type" className="cm-f-select" value={form.prev_address_type} onChange={handleChange}>
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>{" "}
            <input name="prev_address" className="cm-f-input cm-medium" value={form.prev_address} onChange={handleChange} />{" "}
            , वडा नं.{" "}
            <input name="prev_ward"    className="cm-f-input cm-tiny"   value={form.prev_ward}    onChange={handleChange} />{" "}
            काठमाडौँ ) निवासी{" "}
            <select name="grandfather_title" className="cm-f-select" value={form.grandfather_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="grandfather_name" className="cm-f-input cm-long" value={form.grandfather_name} onChange={handleChange} />{" "}
            का{" "}
            <select name="relation_1_type" className="cm-f-select" value={form.relation_1_type} onChange={handleChange}>
              <option value="नाति">नाति</option>
              <option value="छोरा">छोरा</option>
            </select>{" "}
            <select name="father_title" className="cm-f-select" value={form.father_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="father_name" className="cm-f-input cm-long" value={form.father_name} onChange={handleChange} />{" "}
            को{" "}
            <select name="relation_2_type" className="cm-f-select" value={form.relation_2_type} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>{" "}
            वर्ष{" "}
            <input name="applicant_age"   className="cm-f-input cm-tiny"   value={form.applicant_age}   onChange={handleChange} />{" "}
            को{" "}
            <select name="applicant_title" className="cm-f-select" value={form.applicant_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="applicant_name"  className="cm-f-input cm-long"   value={form.applicant_name}  onChange={handleChange} />{" "}
            ले हालसम्म नेपाली नागरिकताको प्रमाण-पत्र नलिएको र{" "}
            <select name="dob_basis" className="cm-f-select" value={form.dob_basis} onChange={handleChange}>
              <option value="मेरो शैक्षिक योग्यताको प्रमाण-पत्र">मेरो शैक्षिक योग्यताको प्रमाण-पत्र</option>
              <option value="जन्म दर्ता">जन्म दर्ता</option>
            </select>{" "}
            अनुसार जन्म मिति{" "}
            <input type="date" name="dob" className="cm-f-input cm-date" value={form.dob} onChange={handleChange} />{" "}
            कायम गरी स्थायी नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि वडा
            मुचुल्का गरी पाउँ भनि हामी वडा वासी समक्ष गरेको निवेदन अनुसार
            निजलाई जाँचबुझ गरी राम्रोसँग चिनेजानेको हुँदा निज{" "}
            <select name="check_applicant_title" className="cm-f-select" value={form.check_applicant_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="check_applicant_name"  className="cm-f-input cm-long" value={form.check_applicant_name}  onChange={handleChange} />{" "}
            को{" "}
            <select name="check_relation_type" className="cm-f-select" value={form.check_relation_type} onChange={handleChange}>
              <option value="छोरा">छोरा</option>
              <option value="छोरी">छोरी</option>
            </select>{" "}
            <select name="check_relative_title" className="cm-f-select" value={form.check_relative_title} onChange={handleChange}>
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>{" "}
            <input name="check_relative_name" className="cm-f-input cm-long" value={form.check_relative_name} onChange={handleChange} />{" "}
            भएको निजको जन्ममिति{" "}
            <input type="date" name="check_dob" className="cm-f-input cm-date" value={form.check_dob} onChange={handleChange} />{" "}
            भएकोले निजले हाल सम्म स्थायी नेपाली नागरिकताको प्रमाण-पत्र नलिएको
            र निजको माग अनुसार स्थायी नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध
            गरिदिन सिफारिस गरिदिएमा कुनै फरक पर्ने छैन व्यहोरा ठीक साँचो हो
            झुठा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो वडा मुचुल्कामा
            सहिछाप गरी{" "}
            <input name="submit_municipality" className="cm-f-input cm-medium" value={form.submit_municipality} onChange={handleChange} />{" "}
            मार्फत जिल्ला प्रशासन कार्यालय काठमाडौँ नेपाल सरकारमा चढायौं ।
          </p>

          {/* ── Tapsil table ── */}
          <div className="cm-table-section">
            <h4 className="cm-table-title cm-center cm-underline">तपसिल</h4>
            <div className="cm-table-responsive">
              <table className="cm-table">
                <thead>
                  <tr>
                    <th>क्र.स.</th>
                    <th>जिल्ला</th>
                    <th>गाउँपालिका</th>
                    <th>वडा नं.</th>
                    <th>निवास</th>
                    <th>ना.प्र.प.नं.</th>
                    <th>वर्ष</th>
                    <th className="cm-hide-print"></th>
                  </tr>
                </thead>
                <tbody>
                  {form.table_rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="cm-center">{idx + 1}</td>
                      <td><input value={row.district}   onChange={updateRow(idx, "district")}   className="cm-table-input" /></td>
                      <td><input value={row.local_unit} onChange={updateRow(idx, "local_unit")} className="cm-table-input" /></td>
                      <td><input value={row.ward_no}    onChange={updateRow(idx, "ward_no")}    className="cm-table-input" /></td>
                      <td><input value={row.residence}  onChange={updateRow(idx, "residence")}  className="cm-table-input" /></td>
                      <td><input value={row.prpn_no}    onChange={updateRow(idx, "prpn_no")}    className="cm-table-input" /></td>
                      <td><input value={row.year}       onChange={updateRow(idx, "year")}       className="cm-table-input" /></td>
                      <td className="cm-action-cell cm-hide-print">
                        {idx === 0
                          ? <button type="button" className="cm-add-btn"    onClick={addRow}>+</button>
                          : <button type="button" className="cm-remove-btn" onClick={() => removeRow(idx)}>×</button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Rohawar ── */}
          <div className="cm-sig-block">
            <h4 className="cm-center cm-underline">रोहवर</h4>
            <p className="cm-body-paragraph">
              काठमाडौँ जिल्ला{" "}
              <input name="rohawar_district"   className="cm-f-input cm-medium" value={form.rohawar_district}   onChange={handleChange} />{" "}
              गाउँपालिका वडा नं.{" "}
              <input name="rohawar_local_unit" className="cm-f-input cm-medium" value={form.rohawar_local_unit} onChange={handleChange} />{" "}
              का{" "}
              <select name="rohawar_position" className="cm-f-select" value={form.rohawar_position} onChange={handleChange}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सदस्य">वडा सदस्य</option>
                <option value="स्थानीय">स्थानीय</option>
              </select>{" "}
              <select name="rohawar_title" className="cm-f-select" value={form.rohawar_title} onChange={handleChange}>
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>{" "}
              <input name="rohawar_name" className="cm-f-input cm-long" value={form.rohawar_name} onChange={handleChange} />
            </p>
          </div>

          {/* ── Kaam Tamel Garne ── */}
          <div className="cm-sig-block">
            <h4 className="cm-center cm-underline">काम तामेल गर्ने</h4>
            <p className="cm-body-paragraph">
              काठमाडौँ जिल्ला{" "}
              <input name="tamel_district"    className="cm-f-input cm-medium" value={form.tamel_district}    onChange={handleChange} />{" "}
              गाउँपालिका{" "}
              <input name="tamel_local_unit"  className="cm-f-input cm-medium" value={form.tamel_local_unit}  onChange={handleChange} />{" "}
              नं. वडा कार्यालय{" "}
              <input name="tamel_position"    className="cm-f-input cm-medium" value={form.tamel_position}    onChange={handleChange} />{" "}
              पदमा कार्यरत{" "}
              <select name="tamel_title" className="cm-f-select" value={form.tamel_title} onChange={handleChange}>
                <option value="श्री">श्री</option>
                <option value="सुश्री">सुश्री</option>
              </select>{" "}
              <input name="tamel_name" className="cm-f-input cm-long" value={form.tamel_name} onChange={handleChange} /> .
            </p>
          </div>

          {/* ── Date ── */}
          <div className="cm-date-block cm-mt20">
            <p className="cm-body-paragraph cm-center">
              इति सम्वत{" "}
              <input name="date_year"     className="cm-f-input cm-tiny"  value={form.date_year}     onChange={handleChange} />{" "}
              साल{" "}
              <input name="date_month"    className="cm-f-input cm-tiny"  value={form.date_month}    onChange={handleChange} />{" "}
              महिना{" "}
              <input name="date_day"      className="cm-f-input cm-tiny"  value={form.date_day}      onChange={handleChange} />{" "}
              गते रोज{" "}
              <input name="date_day_name" className="cm-f-input cm-small" value={form.date_day_name} onChange={handleChange} />{" "}
              शुभम् .
            </p>
          </div>
        </div>

        {/* ── Applicant Details (hidden on print) ── */}
        <div className="cm-hide-print cm-mt20">
          <ApplicantDetailsNp formData={form} handleChange={handleChange} />
        </div>

        {/* ── Footer (hidden on print) ── */}
        <div className="cm-footer cm-hide-print">
          {message && (
            <div className={`cm-submit-msg ${message.type === "error" ? "cm-msg-error" : "cm-msg-success"}`}>
              {message.text}
            </div>
          )}
          <button type="submit" className="cm-save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="cm-copyright cm-hide-print">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
        </div>

      </form>
    </>
  );
}