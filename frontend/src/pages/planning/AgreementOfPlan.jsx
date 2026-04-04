// src/pages/AgreementOfPlan/AgreementOfPlan.jsx
import React, { useState } from "react";
import "./AgreementOfPlan.css";

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
  fiscal_year: "२०८२/८३",

  // Addressee
  addressee_line1: "प्रमुख प्रशासकीय अधिकृत",
  addressee_line2: "नगर कार्यपालिकाको कार्यालय",
  addressee_implement_unit: "",
  addressee_district: "",

  // Body paragraph
  district: "",
  implement_unit: "",
  project_title: "",
  agreement_amount: "",
  allocated_amount: "",
  allocated_amount_in_words: "",
  party_a: "",
  party_b: "",

  // Tapsil
  name_of_program: "",
  total_allocated: "",
  amount_to_be_agreed: "",
  budget_subcode: "",
  expense_type: "",
  ceiling: "",
  work_description: "",
  consumer_committee: "",

  // Signature
  signatory_name: "",
  signatory_designation: "",

  // Applicant
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

// ─────────────────────────────────────────────
// StarInput — wraps any input with your existing
// .inline-input-wrapper + .input-required-star CSS
// ─────────────────────────────────────────────
const StarInput = ({ className = "", ...props }) => (
  <div className="inline-input-wrapper">
    <span className="input-required-star">*</span>
    <input className={className} {...props} />
  </div>
);

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function AgreementOfPlan() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
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

      const res = await axios.post("/api/forms/agreement-of-plan", payload);

      if (res.status === 201 || res.status === 200) {
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
    setLoading(true);

    try {
      const res = await axios.post("/api/forms/agreement-of-plan", form);

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

  // ─────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="plan-agreement-container">

      {/* ── Top Bar ── */}
      <div className="top-bar-title">
        योजना सम्झौता सिफारिस
        <span className="top-right-bread">
          योजना &gt; योजना सम्झौता सिफारिस
        </span>
      </div>

      {/* ── Letterhead ── */}
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
            <StarInput
              name="chalan_no"
              type="text"
              className="dotted-input small-input"
              value={form.chalan_no}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* ── Subject ── */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            योजना सम्झौता गरिदिने सम्बन्धमा।
          </span>
        </p>
      </div>

      {/* ── Addressee ── */}
      <div className="addressee-section">
        <div className="addressee-row">
          <StarInput
            name="addressee_line1"
            type="text"
            className="line-input medium-input"
            value={form.addressee_line1}
            onChange={handleChange}
          />
        </div>
        <div className="addressee-row">
          <StarInput
            name="addressee_line2"
            type="text"
            className="line-input medium-input"
            value={form.addressee_line2}
            onChange={handleChange}
          />
        </div>
        <div className="addressee-row">
          <StarInput
            name="addressee_implement_unit"
            type="text"
            className="line-input medium-input"
            placeholder="कार्यान्वयन इकाइ"
            value={form.addressee_implement_unit}
            onChange={handleChange}
          />
          <StarInput
            name="addressee_district"
            type="text"
            className="line-input medium-input"
            placeholder="जिल्ला"
            value={form.addressee_district}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* ── Body Paragraph ── */}
      <p className="body-paragraph">
        उपरोक्त सम्बन्धमा{" "}
        <StarInput
          name="district"
          type="text"
          className="inline-box-input medium-box"
          placeholder="जिल्ला"
          value={form.district}
          onChange={handleChange}
          required
        />{" "}
        <StarInput
          name="implement_unit"
          type="text"
          className="inline-box-input medium-box"
          placeholder="कार्यान्वयन इकाइ"
          value={form.implement_unit}
          onChange={handleChange}
          required
        />{" "}
        को चालु आ.व.{" "}
        <StarInput
          name="fiscal_year"
          type="text"
          className="inline-box-input medium-box"
          value={form.fiscal_year}
          onChange={handleChange}
        />{" "}
        को स्वीकृत बजेट तथा निति कार्यक्रम अनुसार{" "}
        <StarInput
          name="project_title"
          type="text"
          className="inline-box-input long-box"
          placeholder="योजनाको शीर्षक"
          value={form.project_title}
          onChange={handleChange}
          required
        />{" "}
        लाई{" "}
        <StarInput
          name="agreement_amount"
          type="text"
          className="inline-box-input medium-box"
          placeholder="सम्झौता रकम"
          value={form.agreement_amount}
          onChange={handleChange}
          required
        />{" "}
        कार्य गर्न रु{" "}
        <StarInput
          name="allocated_amount"
          type="text"
          className="inline-box-input medium-box"
          placeholder="विनियोजित रकम"
          value={form.allocated_amount}
          onChange={handleChange}
          required
        />{" "}
        ({" "}
        <StarInput
          name="allocated_amount_in_words"
          type="text"
          className="inline-box-input long-box"
          placeholder="अक्षरमा रकम"
          value={form.allocated_amount_in_words}
          onChange={handleChange}
          required
        />{" "}
        ) विनियोजन भएको हुदा त्यहाँ कार्यालयको नियम अनुसार{" "}
        <StarInput
          name="party_a"
          type="text"
          className="inline-box-input long-box"
          placeholder="पक्ष क"
          value={form.party_a}
          onChange={handleChange}
          required
        />{" "}
        , र{" "}
        <StarInput
          name="party_b"
          type="text"
          className="inline-box-input long-box"
          placeholder="पक्ष ख"
          value={form.party_b}
          onChange={handleChange}
          required
        />{" "}
        , विच योजना / कार्यक्रम सम्झौता गरि दिनुहुन यो सिफारिस गरिएको
        व्यहोरा अनुरोध छ।
      </p>

      {/* ── Tapsil ── */}
      <div className="tapsil-section">
        <h4 className="underline-text bold-text">तपशिल</h4>
        <div className="tapsil-list">
          {[
            { label: "१. योजना तथा कार्यक्रमको नाम",  name: "name_of_program"     },
            { label: "२. विनियोजित रकम जम्मा",         name: "total_allocated"     },
            { label: "३. हाल सम्झौता हुने रकम",         name: "amount_to_be_agreed" },
            { label: "४. बजेट उपशिर्षक नं.",            name: "budget_subcode"      },
            { label: "५. खर्चको प्रकार",                name: "expense_type"        },
            { label: "६. सिलिङ",                        name: "ceiling"             },
            { label: "७. कामको विवरण",                  name: "work_description"    },
            { label: "८. उपभोक्ता समितिको नाम",         name: "consumer_committee"  },
          ].map(({ label, name }) => (
            <div className="tapsil-item" key={name}>
              <label>{label}</label>
              <StarInput
                name={name}
                type="text"
                className="line-input long-input"
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Signature ── */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line" />
          <StarInput
            name="signatory_name"
            type="text"
            className="line-input full-width-input"
            placeholder="नाम, थर"
            value={form.signatory_name}
            onChange={handleChange}
            required
          />
          <select
            name="signatory_designation"
            className="designation-select"
            value={form.signatory_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="सचिव">सचिव</option>
            <option value="अध्यक्ष">अध्यक्ष</option>
            <option value="का.वा अध्यक्ष">का.वा अध्यक्ष</option>
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