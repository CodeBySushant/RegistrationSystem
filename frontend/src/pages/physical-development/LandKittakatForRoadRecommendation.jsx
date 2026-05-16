import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   INITIAL STATE — matches forms.json columns
   for "land-kittakat-for-road"
───────────────────────────────────────────── */
const INITIAL_STATE = {
  chalan_no:             "",
  date_nepali:           "",
  subject_number:        "",
  subject_text:          "फिट बाटो कायम सिफारिस।",
  addressee:             "श्री मालपोत कार्यालय",
  addressee_place:       "",
  district:              "",
  municipality_name:     MUNICIPALITY.name       || "",
  ward_no:               MUNICIPALITY.wardNumber || "",
  previous_address_type: "",
  previous_ward_no:      "",
  parcel_kitta_no:       "",
  area:                  "",
  owner_name:            "",
  applicant_name:        "",
  applicant_address:     "",
  applicant_citizenship_no: "",
  applicant_phone:       "",
  designation:           "",
};

/* ─────────────────────────────────────────────
   STYLES  (prefix: lkrr-)
───────────────────────────────────────────── */
const styles = `
.lkrr-container {
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

.lkrr-bold-text      { font-weight: bold; }
.lkrr-underline-text { text-decoration: underline; }
.lkrr-red            { color: red; font-weight: bold; margin-left: 2px; vertical-align: sub; }
.lkrr-center-text    { text-align: center; }

.lkrr-top-bar-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
.lkrr-top-right-bread {
  font-size: 0.9rem;
  color: #777;
  font-weight: normal;
}

.lkrr-form-header-section {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.lkrr-header-logo img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.lkrr-header-text       { display: flex; flex-direction: column; align-items: center; }
.lkrr-municipality-name { color: #e74c3c; font-size: 2.2rem; margin: 0; font-weight: bold; line-height: 1.2; }
.lkrr-ward-title        { color: #e74c3c; font-size: 2.5rem; margin: 5px 0; font-weight: bold; }
.lkrr-address-text,
.lkrr-province-text     { color: #e74c3c; margin: 0; font-size: 1rem; }

.lkrr-meta-data-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1rem;
}
.lkrr-meta-left label,
.lkrr-meta-right label { display: flex; align-items: center; gap: 6px; }

.lkrr-dotted-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  padding: 2px 5px;
  font-family: inherit;
  font-size: 1rem;
}
.lkrr-small-input { width: 120px; }

.lkrr-subject-section {
  text-align: center;
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.lkrr-addressee-section { margin-bottom: 20px; font-size: 1.05rem; }
.lkrr-addressee-row     { margin-bottom: 8px; }

.lkrr-line-input {
  border: none;
  border-bottom: 1px dotted #000;
  background: #fff;
  outline: none;
  margin: 0 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 5px;
}
.lkrr-medium-input { width: 200px; }

.lkrr-form-body {
  font-size: 1.05rem;
  line-height: 2.6;
  text-align: justify;
  margin-bottom: 30px;
}

.lkrr-inline-input {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  font-family: inherit;
}
.lkrr-inline-input:focus { border-color: #3b7dd8; }

.lkrr-inline-select {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  border-radius: 3px;
  margin: 0 5px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.lkrr-tiny-box   { width: 50px; text-align: center; }
.lkrr-small-box  { width: 100px; }
.lkrr-medium-box { width: 150px; }

.lkrr-signature-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 30px;
}
.lkrr-signature-block { width: 220px; text-align: center; position: relative; }
.lkrr-signature-line  { border-bottom: 1px solid #ccc; margin-bottom: 5px; width: 100%; }
.lkrr-designation-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
}

.lkrr-applicant-details-box {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: rgba(255,255,255,0.4);
  margin-top: 20px;
  border-radius: 4px;
}
.lkrr-applicant-details-box h3 {
  color: #777;
  font-size: 1.1rem;
  margin: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
.lkrr-details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
.lkrr-detail-group { display: flex; flex-direction: column; }
.lkrr-detail-group label { font-size: 0.9rem; margin-bottom: 5px; font-weight: bold; color: #333; }
.lkrr-detail-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  background: #fff;
}
.lkrr-detail-input:focus { border-color: #3b7dd8; outline: none; }

.lkrr-footer { text-align: center; margin-top: 40px; }
.lkrr-save-print-btn {
  background-color: #2c3e50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
.lkrr-save-print-btn:hover:not(:disabled) { background-color: #1a252f; }
.lkrr-save-print-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.lkrr-error-msg   { color: red;   margin-top: 10px; }
.lkrr-success-msg { color: green; margin-top: 10px; }

.lkrr-copyright-footer {
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

  .lkrr-container,
  .lkrr-container * { visibility: visible; }

  .lkrr-container {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 20px 40px;
    background: white !important;
    background-image: none !important;
  }

  .lkrr-footer,
  .lkrr-top-right-bread,
  .lkrr-error-msg,
  .lkrr-success-msg,
  .lkrr-copyright-footer { display: none !important; }

  input, select, textarea {
    background: white !important;
    color: black !important;
    -webkit-text-fill-color: black !important;
    border: none !important;
    border-bottom: 1px solid #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .lkrr-container { padding: 15px; }
  .lkrr-meta-data-row { flex-direction: column; gap: 8px; }
  .lkrr-inline-input { width: 100px; }
  .lkrr-medium-box { width: 120px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const LandKittakatForRoadRecommendation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL_STATE);
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
      const payload = { ...form };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const resp = await axiosInstance.post(
        "/api/forms/land-kittakat-for-road",
        payload,
      );
      setResult(resp.data);
      window.print();
      setTimeout(() => setForm(INITIAL_STATE), 500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="lkrr-container">
        <form onSubmit={handleSubmit}>

          {/* ── Top bar ── */}
          <div className="lkrr-top-bar-title">
            सडक सिफारिसको लागि भूमि कित्ताकाट ।
            <span className="lkrr-top-right-bread">
              भौतिक निर्माण &gt; सडक सिफारिसको लागि भूमि कित्ताकाट ।
            </span>
          </div>

          {/* ── Header ── */}
          <div className="lkrr-form-header-section">
            <div className="lkrr-header-logo">
              <img src={MUNICIPALITY.logoSrc || "/nepallogo.svg"} alt="Nepal Emblem" />
            </div>
            <div className="lkrr-header-text">
              <h1 className="lkrr-municipality-name">{MUNICIPALITY.name}</h1>
              {user?.role === "SUPERADMIN" ? (
                <h2 className="lkrr-ward-title">सबै वडा कार्यालय</h2>
              ) : (
                <h2 className="lkrr-ward-title">
                  वडा नं. {user?.ward} वडा कार्यालय
                </h2>
              )}
              <p className="lkrr-address-text">{MUNICIPALITY.officeLine}</p>
              <p className="lkrr-province-text">{MUNICIPALITY.provinceLine}</p>
            </div>
          </div>

          {/* ── Meta ── */}
          <div className="lkrr-meta-data-row">
            <div className="lkrr-meta-left">
              <label>
                पत्र संख्या :
                <input
                  name="chalan_no"
                  value={form.chalan_no}
                  onChange={onChange}
                  className="lkrr-dotted-input lkrr-small-input"
                  placeholder="२०८२/८३ ..."
                />
              </label>
            </div>
            <div className="lkrr-meta-right">
              <label>
                मिति :
                <input
                  name="date_nepali"
                  value={form.date_nepali}
                  onChange={onChange}
                  className="lkrr-dotted-input lkrr-small-input"
                  placeholder="२०८२-०८-०६"
                />
              </label>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="lkrr-subject-section">
            <p>
              विषय:
              <input
                name="subject_number"
                value={form.subject_number}
                onChange={onChange}
                className="lkrr-dotted-input lkrr-small-input lkrr-center-text lkrr-bold-text"
              />
              <span className="lkrr-underline-text lkrr-bold-text">
                {form.subject_text}
              </span>
            </p>
          </div>

          {/* ── Addressee ── */}
          <div className="lkrr-addressee-section">
            <div className="lkrr-addressee-row">
              <span>{form.addressee},</span>
            </div>
            <div className="lkrr-addressee-row">
              <input
                name="addressee_place"
                value={form.addressee_place}
                onChange={onChange}
                className="lkrr-line-input lkrr-medium-input"
                placeholder="ठेगाना"
              />
            </div>
          </div>

          {/* ── Body ── */}
          <div className="lkrr-form-body">
            <p>
              उपरोक्त सम्बन्धमा जिल्ला
              <input
                name="district"
                value={form.district}
                onChange={onChange}
                className="lkrr-inline-input lkrr-medium-box"
                placeholder="जिल्ला"
              />
              <input
                name="municipality_name"
                value={form.municipality_name}
                onChange={onChange}
                className="lkrr-inline-input lkrr-medium-box"
                placeholder="नगरपालिका / गापा"
              />
              वडा नं.
              <input
                name="ward_no"
                value={form.ward_no}
                onChange={onChange}
                className="lkrr-inline-input lkrr-tiny-box"
              />
              (साविक ठेगाना
              <select
                name="previous_address_type"
                value={form.previous_address_type}
                onChange={onChange}
                className="lkrr-inline-select"
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
                className="lkrr-inline-input lkrr-tiny-box"
              />
              ) कि.नं.
              <input
                name="parcel_kitta_no"
                value={form.parcel_kitta_no}
                onChange={onChange}
                className="lkrr-inline-input lkrr-small-box"
              />
              क्षेत्रफल
              <input
                name="area"
                value={form.area}
                onChange={onChange}
                className="lkrr-inline-input lkrr-small-box"
              />
              जग्गालाई २० फिट बाटो कायम गरी सार्वजनिक गरि दिनु भनि यस
              कार्यालयमा जग्गा धनी
              <input
                name="owner_name"
                value={form.owner_name}
                onChange={onChange}
                className="lkrr-inline-input lkrr-medium-box"
                placeholder="जग्गाधनीको नाम"
              />
              ले दिनु भएको निवेदन अनुसार तहाँ कार्यालयबाट नेपाल सरकारको
              नियमानुसार सो २० फिट बाटो कायमका लागि सिफारिस साथ अनुरोध
              गरिन्छ।
            </p>
          </div>

          {/* ── Signature ── */}
          <div className="lkrr-signature-section">
            <div className="lkrr-signature-block">
              <div className="lkrr-signature-line"></div>
              <select
                name="designation"
                value={form.designation}
                onChange={onChange}
                className="lkrr-designation-select"
              >
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
                <option value="कार्यवाहक वडा अध्यक्ष">
                  कार्यवाहक वडा अध्यक्ष
                </option>
              </select>
            </div>
          </div>

          {/* ── Applicant details ── */}
          <div className="lkrr-applicant-details-box">
            <h3>निवेदकको विवरण</h3>
            <div className="lkrr-details-grid">
              <div className="lkrr-detail-group">
                <label>
                  निवेदकको नाम <span className="lkrr-red">*</span>
                </label>
                <input
                  name="applicant_name"
                  value={form.applicant_name}
                  onChange={onChange}
                  type="text"
                  className="lkrr-detail-input"
                  required
                />
              </div>
              <div className="lkrr-detail-group">
                <label>
                  निवेदकको ठेगाना <span className="lkrr-red">*</span>
                </label>
                <input
                  name="applicant_address"
                  value={form.applicant_address}
                  onChange={onChange}
                  type="text"
                  className="lkrr-detail-input"
                  required
                />
              </div>
              <div className="lkrr-detail-group">
                <label>निवेदकको नागरिकता नं.</label>
                <input
                  name="applicant_citizenship_no"
                  value={form.applicant_citizenship_no}
                  onChange={onChange}
                  type="text"
                  className="lkrr-detail-input"
                />
              </div>
              <div className="lkrr-detail-group">
                <label>निवेदकको फोन नं.</label>
                <input
                  name="applicant_phone"
                  value={form.applicant_phone}
                  onChange={onChange}
                  type="text"
                  className="lkrr-detail-input"
                />
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="lkrr-footer">
            <button
              type="submit"
              className="lkrr-save-print-btn"
              disabled={loading}
            >
              {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>

          {error  && <div className="lkrr-error-msg">{error}</div>}
          {result && (
            <div className="lkrr-success-msg">
              सफलतापूर्वक सेभ भयो। ID: {result.id}
            </div>
          )}

          <div className="lkrr-copyright-footer">
            © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
          </div>

        </form>
      </div>
    </>
  );
};

export default LandKittakatForRoadRecommendation;