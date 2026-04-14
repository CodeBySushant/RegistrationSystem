import React, { useState } from 'react';
import './PermanentResidenceRecommendation.css';

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

/* Safe API base resolver (CRA / Vite / window.__API_BASE) */
const getApiBase = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) {
      return process.env.REACT_APP_API_BASE;
    }
  } catch (e) { /* ignore */ }

  try {
    const meta = Function('return import.meta')();
    if (meta && meta.env && meta.env.VITE_API_BASE) return meta.env.VITE_API_BASE;
  } catch (e) { /* ignore */ }

  if (typeof window !== 'undefined' && window.__API_BASE) return window.__API_BASE;
  return '';
};

const API_URL = `${getApiBase().replace(/\/$/, '')}/api/forms/permanent-residence-recommendation`;

const emptyLocationRow = () => ({ tol: '', road_name: '', house_no: '' });

const timestampNow = () => {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const PermanentResidenceRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/permanent-residence-recommendation", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState); // reset form on success
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/permanent-residence-recommendation", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ print first
        setForm(initialState); // ✅ reset AFTER print
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className="permanent-residence-container" onSubmit={handleSubmit}>
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        स्थायी बसोबास सिफारिस ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; स्थायी बसोबास सिफारिस</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
        <div className="header-text">
          <h1 className="municipality-name">{form.municipality_name}</h1>
          <h2 className="ward-title">{form.ward_title}</h2>
          <p className="address-text">{form.current_municipality}, {form.current_municipality_display}</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">
            <input value={form.reference_no} onChange={e => setField('reference_no', e.target.value)} className="line-input tiny-input" />
          </span></p>
          <p>चलानी नं. : <input value={form.chalani_no} onChange={e => setField('chalani_no', e.target.value)} type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input value={form.date_bs} onChange={e => setField('date_bs', e.target.value)} className="line-input tiny-input" /></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Salutation --- */}
      <div className="salutation-section">
         <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">
          <input value={form.salutation_person_prefix} onChange={e => setField('salutation_person_prefix', e.target.value)} className="line-input tiny-input" />&nbsp;
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="line-input" />
          {/* keep underline style */}
        </span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त विषयमा निवेदक&nbsp;
          <input value={form.applicant_name} onChange={e => setField('applicant_name', e.target.value)} className="inline-box-input medium-box" required /> <span className="red">*</span> ले पेश गर्नुभएको निवेदनका आधारमा&nbsp;
          <input value={form.previous_unit} onChange={e => setField('previous_unit', e.target.value)} className="inline-box-input medium-box" /> <span className="red">*</span>
          <input value={form.current_municipality} onChange={e => setField('current_municipality', e.target.value)} className="inline-box-input medium-box" />
          <input value={form.current_municipality_display} onChange={e => setField('current_municipality_display', e.target.value)} className="inline-box-input medium-box" />
          वडा नं <input value={form.ward_no} onChange={e => setField('ward_no', e.target.value)} className="inline-box-input tiny-box" required /> (साविक&nbsp;
          <input value={form.previous_unit} onChange={e => setField('previous_unit', e.target.value)} className="inline-box-input medium-box" />
          <select className="inline-select"><option></option><option>गा.वि.स.</option><option>न.पा.</option></select>
          वडा नं. <input className="inline-box-input tiny-box" required /> ) अन्तर्गत तल उल्लेखित स्थानमा विगत मिति <input value={form.since_date_bs} onChange={e => setField('since_date_bs', e.target.value)} className="inline-box-input medium-box" defaultValue="२०८२-०८-०६" /> देखि स्थाई बसोबास गर्दै आउनु भएको व्यहोरा सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* --- Resident Details (table rows stored to locations[]) --- */}
      <div className="resident-details-section">
          <h4 className="bold-text">बसोबास गर्नेको :-</h4>
          <div className="resident-row">
              <label>ना.प्रा.प.नं. : <span className="red">*</span></label>
              <input value={form.npr_no} onChange={e => setField('npr_no', e.target.value)} type="text" className="line-input medium-input" />
              <label> / जिल्ला : <span className="red">*</span></label>
              <input value={form.npr_issue_district} onChange={e => setField('npr_issue_district', e.target.value)} type="text" className="line-input medium-input" />
              <label> / जारी मिति :</label>
              <input value={form.npr_issue_date_bs} onChange={e => setField('npr_issue_date_bs', e.target.value)} type="text" className="line-input medium-input" />
          </div>
      </div>

      {/* --- Table Section (locations) --- */}
      <div className="table-section">
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.सं.</th>
                        <th style={{width: '35%'}}>टोल</th>
                        <th style={{width: '35%'}}>बाटोको नाम</th>
                        <th style={{width: '20%'}}>घर नं</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                  {locations.map((loc, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td><input value={loc.tol} onChange={e => onLocationChange(i, 'tol', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                      <td><input value={loc.road_name} onChange={e => onLocationChange(i, 'road_name', e.target.value)} className="table-input" required /> <span className="red-asterisk in-cell">*</span></td>
                      <td><input value={loc.house_no} onChange={e => onLocationChange(i, 'house_no', e.target.value)} className="table-input" /></td>
                      <td className="action-cell">
                        <button type="button" className="add-btn" onClick={() => addLocation()}>+</button>
                        {locations.length > 1 && <button type="button" className="add-btn" onClick={() => removeLocation(i)}>-</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input value={form.signatory_name} onChange={e => setField('signatory_name', e.target.value)} className="line-input full-width-input" required />
          <select value={form.signatory_designation} onChange={e => setField('signatory_designation', e.target.value)} className="designation-select">
             <option value="">पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </form>
  );
};

export default PermanentResidenceRecommendation;
