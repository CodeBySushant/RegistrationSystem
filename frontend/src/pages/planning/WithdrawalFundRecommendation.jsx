// src/pages/WithdrawalFundRecommendation/WithdrawalFundRecommendation.jsx
import React, { useState } from "react";
import "./WithdrawalFundRecommendation.css";

import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

// ─────────────────────────────────────────────
// Initial State
// ─────────────────────────────────────────────
const initialState = {
  // Meta
  chalan_no: "",

  // Addressee
  addressee_line1:          "प्रमुख प्रशासकीय अधिकृत",
  addressee_municipality:   MUNICIPALITY.name,
  addressee_implement_unit: "",
  addressee_district:       "",

  // Body
  body_municipality:       MUNICIPALITY.name,
  fiscal_year:             "२०८२/८३",
  requested_amount:        "",
  body_municipality_2:     MUNICIPALITY.name,
  committee_chair:         "",
  consumer_committee_name: "",
  implement_unit_name:     "",

  // Tapsil
  budget_subcode:   "",
  expense_type:     "",
  program_name:     "",
  allocated_amount: "",
  previous_payment: "",
  current_payment:  "",
  payee_name:       "",

  // Signature
  signatory_name:        "",
  signatory_designation: "",

  // Applicant
  applicantName:        "",
  applicantAddress:     "",
  applicantCitizenship: "",
  applicantPhone:       "",
};

// ─────────────────────────────────────────────
// Red star helper
// ─────────────────────────────────────────────
const R = () => <span className="required">*</span>;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function WithdrawalFundRecommendation() {
  const { user } = useAuth();
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);

  // ── handleChange ──────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── handleSubmit ──────────────────────────
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return false;

    setLoading(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v === "" ? null : v])
      );

      const res = await axios.post(
        "/api/forms/withdrawal-fund-recommendation",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setForm(initialState);
        return true;
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
        return false;
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Submission failed";
      alert("त्रुटि: " + msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ── handlePrint — save → print → reset ───
  const handlePrint = async () => {
    const ok = await handleSubmit(null);
    if (ok) {
      window.print();
      setForm(initialState);
    }
  };

  // ─────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="withdrawal-fund-container">

      {/* ── Top Bar ── */}
      <div className="top-bar-title">
        रकम निकासा सिफारिस ।
        <span className="top-right-bread">योजना &gt; रकम निकासा सिफारिस</span>
      </div>

      {/* ── Header / Letterhead ── */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || MUNICIPALITY.wardNumber} नं. वडा कार्यालय`}
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* ── Meta Row ── */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">२०८२/८३</span>
          </p>
          <p>
            चलानी नं. :{" "}
            <span className="input-wrap">
              <R />
              <input
                name="chalan_no"
                type="text"
                className="dotted-input small-input"
                value={form.chalan_no}
                onChange={handleChange}
              />
            </span>
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* ── Subject ── */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">रकम निकासा सम्बन्धमा।</span>
        </p>
      </div>

      {/* ── Addressee — exact layout from screenshot ── */}
      <div className="addressee-section">

        {/* Row 1 — single input */}
        <div className="addressee-row">
          <span className="input-wrap">
            <input 
              name="addressee_line1"
              type="text"
              className="line-input long-box"
              value={form.addressee_line1}
              onChange={handleChange}
            />
          </span>
        </div>

        {/* Row 2 — input + plain text "नगर कार्यपालिकाको कार्यालय" */}
        <div className="addressee-row">
          <span className="input-wrap">
            <input
              name="addressee_municipality"
              type="text"
              className="line-input long-box"
              value={form.addressee_municipality}
              onChange={handleChange}
            />
          </span>
          <span className="addressee-plain-text">
            नगर कार्यपालिकाको कार्यालय
          </span>
        </div>

        {/* Row 3 — two inputs side by side */}
        <div className="addressee-row">
          <span className="input-wrap">
            <input
              name="addressee_implement_unit"
              type="text"
              className="line-input long-box"
              placeholder="कार्यान्वयन इकाइ"
              value={form.addressee_implement_unit}
              onChange={handleChange}
            />
          </span>
          <span className="input-wrap">
            <input
              name="addressee_district"
              type="text"
              className="line-input long-box"
              placeholder="जिल्ला"
              value={form.addressee_district}
              onChange={handleChange}
            />
          </span>
        </div>

      </div>

      {/* ── Body Paragraph ── */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस{" "}
          <span className="input-wrap">
            <R />
            <input
              name="body_municipality"
              type="text"
              className="inline-box-input long-box"
              value={form.body_municipality}
              onChange={handleChange}
            />
          </span>{" "}
          सभाबाट स्वीकृत आ.व.{" "}
          <span className="input-wrap">
            <R />
            <input
              name="fiscal_year"
              type="text"
              className="inline-box-input medium-box"
              value={form.fiscal_year}
              onChange={handleChange}
            />
          </span>{" "}
          को स्वीकृत वार्षिक बजेट तथा कार्यक्रम अन्तर्गत विनियोजन भएको बजेट
          बाट{" "}
          <span className="input-wrap">
            <R />
            <input
              name="requested_amount"
              type="text"
              className="inline-box-input medium-box"
              placeholder="रकम"
              value={form.requested_amount}
              onChange={handleChange}
              required
            />
          </span>{" "}
          कार्य गर्न प्राबिधिक ल.ई अनुसार योजना सम्झौता भई आयोजना सम्पन्न
          भएकोले{" "}
          <span className="input-wrap">
            <R />
            <input
              name="body_municipality_2"
              type="text"
              className="inline-box-input long-box"
              value={form.body_municipality_2}
              onChange={handleChange}
            />
          </span>{" "}
          रकम निकासा गर्न सिफारिस गरी पाउँ भनि यस वडा कार्यालयमा समितिका{" "}
          <span className="input-wrap">
            <R />
            <input
              name="committee_chair"
              type="text"
              className="inline-box-input medium-box"
              placeholder="अध्यक्षको नाम"
              value={form.committee_chair}
              onChange={handleChange}
              required
            />
          </span>{" "}
          निवेदन दिनुभएको सो सम्बन्धमा{" "}
          <span className="input-wrap">
            <R />
            <input
              name="consumer_committee_name"
              type="text"
              className="inline-box-input medium-box"
              placeholder="उपभोक्ता समिति"
              value={form.consumer_committee_name}
              onChange={handleChange}
            />
          </span>{" "}
          उपभोक्ता समितिले{" "}
          <span className="input-wrap">
            <R />
            <input
              name="implement_unit_name"
              type="text"
              className="inline-box-input medium-box"
              placeholder="कार्यान्वयन इकाइ"
              value={form.implement_unit_name}
              onChange={handleChange}
            />
          </span>{" "}
          निर्माण कार्य सम्पन्न गरेकोले तहाँ कार्यालयको नियमानुसार प्राविधिक
          लागत मूल्याङ्कन फाराम अनुसारको रकम निकासा गरिदिनु हुन सिफारिस साथ
          अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* ── Tapsil ── */}
      <div className="tapsil-section">
        <h4 className="underline-text bold-text">तपशिल</h4>
        <div className="tapsil-list">

          {[
            { label: "१. बजेट उपशिर्षक नं.",                name: "budget_subcode"   },
            { label: "२. खर्चको प्रकार",                     name: "expense_type"     },
            { label: "३. योजना तथा कार्यक्रमको नाम",         name: "program_name"     },
            { label: "४. कार्यक्रमको लागि विनियोजित रकम रु", name: "allocated_amount" },
            { label: "५. यस अघि भुक्तानी रकम रु",            name: "previous_payment" },
            { label: "६. हाल भुक्तानी हुने रकम रु",           name: "current_payment"  },
            { label: "७. भुक्तानी पाउनेको नाम थर",            name: "payee_name"       },
          ].map(({ label, name }) => (
            <div className="tapsil-item" key={name}>
              <label>{label}</label>
              <span className="input-wrap">
                <R />
                <input
                  name={name}
                  type="text"
                  className="line-input long-input"
                  value={form[name]}
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* ── Signature ── */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line" />
          <span className="input-wrap">
            <R />
            <input
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              placeholder="नाम, थर"
              value={form.signatory_name}
              onChange={handleChange}
              required
            />
          </span>
          <select
            name="signatory_designation"
            className="designation-select"
            value={form.signatory_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* ── Applicant Details ── */}
      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

      {/* ── Footer ── */}
      <div className="form-footer">
        <button
          type="button"
          className="save-print-btn"
          onClick={handlePrint}
          disabled={loading}
        >
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>

    </form>
  );
}