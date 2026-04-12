// src/components/TapInstallationRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import "./TapInstallationRecommendation.css";

const FORM_KEY = "tap-installation-recommendation";

const emptyKitta = { description: "", kitta_no: "" };

const emptyState = {
  chalan_no: "",
  date_nepali: "",
  addressee_name: "",
  addressee_place: "",
  previous_address: "",
  owner_name: "",
  kitta_main_no: "",
  construction_type: "आंशिक",
  tap_count: "",
  kitta_list: [{ ...emptyKitta }],
  designation: "",
  bodartha_text: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

export default function TapInstallationRecommendation() {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const setKitta = (index, key, value) => {
    setForm((s) => {
      const list = s.kitta_list.slice();
      list[index] = { ...list[index], [key]: value };
      return { ...s, kitta_list: list };
    });
  };

  const addKittaRow = () => {
    setForm((s) => ({ ...s, kitta_list: [...s.kitta_list, { ...emptyKitta }] }));
  };

  const removeKittaRow = (index) => {
    setForm((s) => {
      const list = s.kitta_list.slice();
      list.splice(index, 1);
      return { ...s, kitta_list: list.length ? list : [{ ...emptyKitta }] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.addressee_name || !form.owner_name || !form.kitta_list.length) {
      setError("कृपया आवस्यक फिल्डहरू भर्नुहोस् (प्राप्तकर्ता, जग्गाधनी, कम्तिमा एक कित्ता)।");
      return;
    }

    setLoading(true);
    try {
      const resp = await axiosInstance.post(`/api/forms/${FORM_KEY}`, form);
      setResult(resp.data);
      window.print();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tap-installation-container">
      <form onSubmit={handleSubmit}>

        {/* Top Bar */}
        <div className="top-bar-title">
          धारा जडान सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; धारा जडान सिफारिस</span>
        </div>

        {/* Header */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            {user?.role === "SUPERADMIN" ? (
              <h2 className="ward-title">सबै वडा कार्यालय</h2>
            ) : (
              <h2 className="ward-title">वडा नं. {user?.ward} वडा कार्यालय</h2>
            )}
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </div>

        {/* Meta Row — fixed: chalan_no and kitta_main_no are separate fields */}
        <div className="meta-data-row">
          <div className="meta-left">
            <label>
              पत्र संख्या :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" placeholder="२०८२/८३ ..." />
            </label>
            <label>
              कित्ता मु. नं. :
              <input name="kitta_main_no" value={form.kitta_main_no} onChange={onChange} className="dotted-input small-input" placeholder="कित्ता नं." />
            </label>
          </div>
          <div className="meta-right">
            <label>
              मिति :
              <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="dotted-input small-input" placeholder="२०८२-०८-०६" />
            </label>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>विषय: <span className="underline-text bold-text">धारा जडान सिफारिस।</span></p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" value={form.addressee_name} onChange={onChange} className="line-input medium-input" placeholder="नाम" required />
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange} className="line-input medium-input" placeholder="ठेगाना" />
          </div>
        </div>

        {/* Body — fixed: municipality from config, kitta_main_no not duplicated */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा <strong>{MUNICIPALITY.name}</strong> वडा नं. <strong>{user?.ward || "__"}</strong> (साविकको ठेगाना
            <input name="previous_address" value={form.previous_address} onChange={onChange} className="inline-box-input medium-box" placeholder="साविक ठेगाना" />
            ) बस्ने श्री
            <input name="owner_name" value={form.owner_name} onChange={onChange} className="inline-box-input long-box" placeholder="जग्गाधनीको नाम" required />
            को नाममा दर्ता कायम रहेको कि.नं.
            <input name="kitta_main_no" value={form.kitta_main_no} onChange={onChange} className="inline-box-input small-box" placeholder="कित्ता नं." required />
            को जग्गामा मिति
            <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="inline-box-input small-box" placeholder="मिति" />
            मा भवन निर्माण स्वीकृति लिनु भई
            <select name="construction_type" value={form.construction_type} onChange={onChange} className="inline-select">
              <option value="आंशिक">आंशिक</option>
              <option value="पूर्ण">पूर्ण</option>
            </select>
            रुपमा निर्माण सम्पन्न गर्नुभएको वा अभिलेखीकरण गर्नुभएको हुँदा
            <input name="tap_count" value={form.tap_count} onChange={onChange} className="inline-box-input medium-box" placeholder="धारा संख्या" required />
            धारा जडान गरिदिन हुन सिफारिस साथ अनुरोध गरिन्छ।
          </p>
        </div>

        {/* Kitta Table */}
        <div className="table-section">
          <h4 className="table-title">कित्ता नं. को विवरण</h4>
          <table className="kitta-table">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>क्र.स.</th>
                <th style={{ width: "55%" }}>जग्गाको विवरण</th>
                <th style={{ width: "30%" }}>कित्ता नं.</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {form.kitta_list.map((r, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>{i + 1}</td>
                  <td>
                    <input value={r.description} onChange={(e) => setKitta(i, "description", e.target.value)} className="table-input" />
                  </td>
                  <td>
                    <input value={r.kitta_no} onChange={(e) => setKitta(i, "kitta_no", e.target.value)} className="table-input" />
                  </td>
                  <td className="action-cell">
                    {form.kitta_list.length > 1 && (
                      <button type="button" onClick={() => removeKittaRow(i)} className="add-row-btn remove-btn">−</button>
                    )}
                    {i === form.kitta_list.length - 1 && (
                      <button type="button" onClick={addKittaRow} className="add-row-btn">+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature — fixed: removed duplicate signature_name input, only designation select */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <select name="designation" value={form.designation} onChange={onChange} className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* Bodartha */}
        <div className="bodartha-section">
          <p className="bodartha-label bold-text">बोधार्थ:-</p>
          <div className="bodartha-row">
            <input name="bodartha_text" value={form.bodartha_text} onChange={onChange} className="line-input medium-input" placeholder="बोधार्थ" />
            <span>- जानकारीको लागि |</span>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम <span className="red">*</span></label>
              <input name="applicant_name" value={form.applicant_name} onChange={onChange} className="detail-input bg-gray" required />
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

        {/* Footer */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        {result && <div style={{ color: "green", marginTop: "10px" }}>सफलतापूर्वक सेभ भयो। ID: {result.id}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>
      </form>
    </div>
  );
}