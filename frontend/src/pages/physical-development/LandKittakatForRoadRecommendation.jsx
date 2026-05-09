// src/components/LandKittakatForRoadRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import "./LandKittakatForRoadRecommendation.css";

const FORM_KEY = "land-kittakat-for-road";

const emptyState = {
  chalan_no: "",
  date_nepali: "",
  subject_number: "",
  subject_text: "फिट बाटो कायम सिफारिस।",
  addressee: "श्री मालपोत कार्यालय",
  addressee_place: "",
  district: "",
  municipality_name: "",
  ward_no: "",
  previous_address_type: "",
  previous_ward_no: "",
  owner_name: "",
  parcel_kitta_no: "",
  area: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  designation: "",
};

const LandKittakatForRoadRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.applicant_name || !form.applicant_address) {
      setError("कृपया निवेदकको नाम र ठेगाना भर्नुहोस्।");
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
    <div className="land-kittakat-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          सडक सिफारिसको लागि भूमि कित्ताकाट ।
          <span className="top-right-bread">
            भौतिक निर्माण &gt; सडक सिफारिसको लागि भूमि कित्ताकाट ।
          </span>
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
              <input
                name="chalan_no"
                value={form.chalan_no}
                onChange={onChange}
                className="dotted-input small-input"
                placeholder="२०८२/८३ ..."
              />
            </label>
          </div>
          <div className="meta-right">
            <label>
              मिति :
              <input
                name="date_nepali"
                value={form.date_nepali}
                onChange={onChange}
                className="dotted-input small-input"
                placeholder="२०८२-०८-०६"
              />
            </label>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          <p>
            विषय:
            <input
              name="subject_number"
              value={form.subject_number}
              onChange={onChange}
              className="dotted-input small-input center-text bold-text"
            />
            <span className="underline-text bold-text">{form.subject_text}</span>
          </p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>{form.addressee},</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_place"
              value={form.addressee_place}
              onChange={onChange}
              className="line-input medium-input"
              placeholder="ठेगाना"
            />
          </div>
        </div>

        {/* Body */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला
            <input
              name="district"
              value={form.district}
              onChange={onChange}
              className="inline-box-input medium-box"
              placeholder="जिल्ला"
            />
            <input
              name="municipality_name"
              value={form.municipality_name}
              onChange={onChange}
              className="inline-box-input medium-box"
              placeholder="नगरपालिका / गापा"
            />
            वडा नं.
            <input
              name="ward_no"
              value={form.ward_no}
              onChange={onChange}
              className="inline-box-input tiny-box"
            />
            (साविक ठेगाना
            <select
              name="previous_address_type"
              value={form.previous_address_type}
              onChange={onChange}
              className="inline-select"
            >
              <option value="">छनौट</option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            , वडा नं.
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={onChange}
              className="inline-box-input tiny-box"
            />
            ) कि.नं.
            <input
              name="parcel_kitta_no"
              value={form.parcel_kitta_no}
              onChange={onChange}
              className="inline-box-input small-box"
            />
            क्षेत्रफल
            <input
              name="area"
              value={form.area}
              onChange={onChange}
              className="inline-box-input small-box"
            />
            जग्गालाई २० फिट बाटो कायम गरी सार्वजनिक गरि दिनु भनि यस कार्यालयमा जग्गा धनी
            <input
              name="owner_name"
              value={form.owner_name}
              onChange={onChange}
              className="inline-box-input medium-box"
              placeholder="जग्गाधनीको नाम"
            />
            ले दिनु भएको निवेदन अनुसार तहाँ कार्यालयबाट नेपाल सरकारको नियमानुसार सो २० फिट बाटो कायमका लागि सिफारिस साथ अनुरोध गरिन्छ।
          </p>
        </div>

        {/* Signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <select
              name="designation"
              value={form.designation}
              onChange={onChange}
              className="designation-select"
            >
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
              <input
                name="applicant_name"
                value={form.applicant_name}
                onChange={onChange}
                type="text"
                className="detail-input bg-gray"
                required
              />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना <span className="red">*</span></label>
              <input
                name="applicant_address"
                value={form.applicant_address}
                onChange={onChange}
                type="text"
                className="detail-input bg-gray"
                required
              />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input
                name="applicant_citizenship_no"
                value={form.applicant_citizenship_no}
                onChange={onChange}
                type="text"
                className="detail-input bg-gray"
              />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input
                name="applicant_phone"
                value={form.applicant_phone}
                onChange={onChange}
                type="text"
                className="detail-input bg-gray"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {error && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        {result && <div className="success-message" style={{ color: "green", marginTop: "10px" }}>सफलतापूर्वक सेभ भयो। ID: {result.id}</div>}

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</div>
      </form>
    </div>
  );
};

export default LandKittakatForRoadRecommendation;