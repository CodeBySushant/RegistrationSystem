// src/components/RoadMaintainRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import "./RoadMaintainRecommendation.css";

const FORM_KEY = "road-maintain-recommendation";

const emptyState = {
  chalan_no: "",
  date_nepali: "",
  district: "",
  municipality: "",
  ward_no: "",
  previous_address_type: "",
  previous_ward_no: "",
  kitta_no: "",
  area: "",
  side: "",
  width_ft: "",
  length_ft: "",
  owner_title: "श्री",
  owner_name: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  designation: "",
};

export default function RoadMaintainRecommendation() {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.kitta_no || !form.applicant_name || !form.owner_name) {
      setError("कृपया आवस्यक फिल्डहरू (कित्तानम्बर, निवेदक नाम, जग्गाधनी नाम) भर्नुहोस्।");
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
    <div className="road-maintain-container">
      <form onSubmit={handleSubmit}>

        {/* Top Bar */}
        <div className="top-bar-title">
          नेपाल सरकारको नाममा बाटो कायम सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; नेपाल सरकारको नाममा बाटो कायम सिफारिस</span>
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

        {/* Meta Row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <label>
              पत्र संख्या :
              <input name="chalan_no" value={form.chalan_no} onChange={onChange} className="dotted-input small-input" placeholder="२०८२/८३ ..." />
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
          <p>विषय: <span className="underline-text bold-text">नेपाल सरकारको नाममा बाटो कायम सिफारिस।</span></p>
        </div>

        {/* Body */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा मेरो नाममा दर्ता श्रेस्ता भएको
            <input name="district" value={form.district} onChange={onChange} className="inline-box-input medium-box" placeholder="जिल्ला" />
            <input name="municipality" value={form.municipality} onChange={onChange} className="inline-box-input medium-box" placeholder="नगरपालिका / गापा" />
            वडा नं.
            <input name="ward_no" value={form.ward_no} onChange={onChange} className="inline-box-input tiny-box" />
            (साविक
            <select name="previous_address_type" value={form.previous_address_type} onChange={onChange} className="inline-select medium-select">
              <option value="">छनौट</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            , वडा नं.
            <input name="previous_ward_no" value={form.previous_ward_no} onChange={onChange} className="inline-box-input tiny-box" />
            ) कि.न.
            <input name="kitta_no" value={form.kitta_no} onChange={onChange} className="inline-box-input small-box" required />
            को क्षे.फ.
            <input name="area" value={form.area} onChange={onChange} className="inline-box-input medium-box" />
            जग्गामध्ये
            <select name="side" value={form.side} onChange={onChange} className="inline-select medium-select">
              <option value="">दिशा</option>
              <option value="पूर्व">पूर्व</option>
              <option value="पश्चिम">पश्चिम</option>
              <option value="उत्तर">उत्तर</option>
              <option value="दक्षिण">दक्षिण</option>
            </select>
            तर्फबाट
            <input name="width_ft" value={form.width_ft} onChange={onChange} className="inline-box-input small-box" placeholder="चौडाइ (ft)" />
            चौडाइ र
            <input name="length_ft" value={form.length_ft} onChange={onChange} className="inline-box-input small-box" placeholder="लम्बाइ (ft)" />
            फिट लम्बाई नेपाल सरकारको नाममा कित्ताकाट गरी नेपाल सरकारको नाममा बाटो कायम गर्न सिफारिस गरी पाउँ भनी जग्गाधनी
            <select name="owner_title" value={form.owner_title} onChange={onChange} className="inline-select small-select">
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
              <option value="श्रीमती">श्रीमती</option>
            </select>
            <input name="owner_name" value={form.owner_name} onChange={onChange} className="inline-box-input long-box" required />
            ले यस वडा कार्यालयमा निवेदन दिनु भएको हुँदा सो सम्बन्धमा प्राबिधिक प्रतिवेदन अनुसार कित्ताकाट गर्न मिल्ने देखिएकोले प्राबिधिक फिल्ड निरीक्षण प्रतिवेदन सहित पठाइएको छ | तहाँको नियमानुसार नेपाल सरकारको नाममा बाटो कायम गरिदिनुहुन सिफारिस गरिन्छ |
          </p>
        </div>

        {/* Signature */}
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