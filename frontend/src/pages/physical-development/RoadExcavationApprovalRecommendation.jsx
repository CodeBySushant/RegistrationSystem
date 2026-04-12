// src/components/RoadExcavationApprovalRecommendation.jsx
import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import MunicipalityHeader from '../../components/MunicipalityHeader.jsx';
import { MUNICIPALITY } from '../../config/municipalityConfig';
import { useAuth } from '../../context/AuthContext';
import "./RoadExcavationApprovalRecommendation.css";

const FORM_KEY = "road-excavation-approval";

const emptyState = {
  chalan_no: "",
  date_nepali: "",
  addressee_name: "",
  addressee_place: "",
  subject_text: "सडक खन्ने स्वीकृति ।",
  place_for_excavation: "",
  completion_days: "",
  approved_road: "",
  approved_unit: "",
  approved_unit_value: "",
  deposit_amount: "",
  applicant_previous_address: "",
  designation: "",
};

export default function RoadExcavationApprovalRecommendation() {
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

    if (!form.addressee_name || !form.place_for_excavation) {
      setError("कृपया आवस्यक फिल्डहरू भर्नुहोस् (नाम, स्थान)।");
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
    <div className="road-excavation-container">
      <form onSubmit={handleSubmit}>

        {/* Top Bar */}
        <div className="top-bar-title">
          सडक खन्ने स्वीकृतिको सिफारिस ।
          <span className="top-right-bread">भौतिक निर्माण &gt; सडक खन्ने स्वीकृतिको सिफारिस</span>
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
          <p>विषय: <span className="underline-text bold-text">{form.subject_text}</span></p>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" value={form.addressee_name} onChange={onChange} type="text" className="line-input medium-input" placeholder="नाम" required />
          </div>
          <div className="addressee-row">
            <input name="addressee_place" value={form.addressee_place} onChange={onChange} type="text" className="line-input medium-input" placeholder="ठेगाना" />
          </div>
        </div>

        {/* Body */}
        <div className="form-body">
          <p className="body-paragraph">
            तपाईंले यस वडा कार्यालयमा मिति
            <input name="date_nepali" value={form.date_nepali} onChange={onChange} className="inline-box-input small-box" placeholder="मिति" />
            मा दिनु भएको निवेदन अनुसार निम्न बमोजिम स्थानको
            <input name="place_for_excavation" value={form.place_for_excavation} onChange={onChange} className="inline-box-input medium-box" placeholder="स्थान" required />
            सडक खन्ने अनुमति दिईएको छ | लेखिए बमोजिमको शर्तहरु पालना गरी यो पत्र प्राप्त भएको मितिले
            <input name="completion_days" value={form.completion_days} onChange={onChange} className="inline-box-input tiny-box" placeholder="दिन" />
            दिन भित्र कार्य सम्पन्न गर्नुहोला |
          </p>

          <div className="specific-details-grid">
            <div className="form-group-row">
              <label className="bold-text">खन्न स्वीकृति प्रदान गरेको सडक</label>
              <input name="approved_road" value={form.approved_road} onChange={onChange} className="dotted-input full-width" />
            </div>
            <div className="form-group-row">
              <label className="bold-text">सडक खन्न स्वीकृति इकाइ</label>
              <input name="approved_unit" value={form.approved_unit} onChange={onChange} className="dotted-input medium-input" />
              <span>बर्ग मिटर</span>
              <input name="approved_unit_value" value={form.approved_unit_value} onChange={onChange} className="dotted-input small-input" placeholder="मान" />
            </div>
            <div className="form-group-row">
              <label className="bold-text">धरौटी रकम (रु.)</label>
              <input name="deposit_amount" value={form.deposit_amount} onChange={onChange} className="dotted-input full-width" />
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="conditions-section">
          <h4 className="bold-text">शर्तहरु :</h4>
          <ol className="conditions-list">
            <li>सडक खन्ने कार्य सम्पन्न भएपछि खनेको ठाउँ पहिलेकै अवस्थामा पुनर्स्थापना गर्नु पर्नेछ।</li>
            <li>कार्य अवधिभर सुरक्षा व्यवस्था मिलाउनु पर्नेछ।</li>
            <li>तोकिएको समयभित्र कार्य सम्पन्न नभएमा धरौटी जफत हुनेछ।</li>
            <li>सम्बन्धित निकायको निर्देशन पालना गर्नु पर्नेछ।</li>
          </ol>
        </div>

        {/* Former Address */}
        <div className="former-address-section">
          <label className="bold-text">निवेदकको साविकको ठेगाना</label>
          <div className="address-input-wrapper">
            <input name="applicant_previous_address" value={form.applicant_previous_address} onChange={onChange} className="dotted-input full-width" />
          </div>
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

        {/* Bodartha */}
        <div className="bodartha-section">
          <h4 className="bold-text">बोधार्थ</h4>
          <div className="bodartha-item">
            <p className="bold-text">१. श्री प्राबिधिक शाखा :</p>
            <p>माथि उल्लेखित शर्तहरु पालना भए नभएको अनुगमन गरी प्रतिवेदन पेश गर्नु हुन |</p>
          </div>
          <div className="bodartha-item">
            <p className="bold-text">२. श्री ट्राफिक प्रहरी कार्यालय :</p>
            <p>सवारी साधनको सहजताको लागि अनुरोध छ |</p>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <button className="save-print-btn" type="submit" disabled={loading}>
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