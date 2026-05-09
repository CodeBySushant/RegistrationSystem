// src/components/CitizenshipRecommendation.jsx
import React, { useState, useEffect } from "react";
import "./CitizenshipRecommendation.css";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "citizenship-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

const buildInitialState = (ward) => ({
  letter_no: "२०८२/८३",
  reference_no: "",
  date: new Date().toISOString().slice(0, 10),

  // Recipient Info
  recipient_office: "जिल्ला प्रशासन कार्यालय",
  recipient_district: MUNICIPALITY?.city || "काठमाडौँ",

  // Body Intro
  applicant_name_body: "",

  // Main Details
  birth_place: "",
  father_name: "",
  father_address: "",
  mother_name: "",
  mother_address: "",
  spouse_name: "",
  spouse_address: "",
  permanent_local_unit: MUNICIPALITY?.name || "",
  ward_no: ward ? String(ward) : "",
  relative_name: "",
  relative_address: "",
  dob: "",
  cit_team_reg_name: "",
  applicant_signature: "",

  // Signature Block
  signatory_name: "",
  signatory_position: "",

  // Sanakhat Section
  sanakhat_applicant_name: "",
  sanakhat_relation: "",
  sanakhat_name: "",
  sanakhat_prpn_no: "",
  sanakhat_signature: "",
  sanakhat_date: "",

  // ✅ FIX: camelCase keys to match ApplicantDetailsNp props
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  notes: "",
});

export default function CitizenshipRecommendation() {
  const { user } = useAuth();

  // ✅ FIX: init with ward immediately to avoid undefined→defined flip
  const [form, setForm] = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type, text }

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
  }, [user]);

  // ✅ Unified handleChange — works for all inputs and ApplicantDetailsNp
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name_body.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicantName.trim())
      return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, form);
      if (res.status === 201 || res.status === 200) {
        setMessage({ type: "success", text: "रेकर्ड सफलतापूर्वक सेभ भयो" });
        // ✅ FIX: defer print so React can render success message first
        setTimeout(() => window.print(), 200);
      } else {
        setMessage({ type: "error", text: "Unexpected response" });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "सेभ गर्न सकिएन",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="citizenship-rec-container"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        नेपाली नागरिकताको सिफारिस ।
        <span className="top-right-bread">
          नागरिकता &gt; नेपाली नागरिकताको सिफारिस
        </span>
      </div>

      {/* HEADER */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY?.name}</h1>
          <h2 className="ward-title">{user?.ward || "१"} नं. वडा कार्यालय</h2>
          <p className="address-text">{MUNICIPALITY?.officeLine}</p>
          <p className="province-text">{MUNICIPALITY?.provinceLine}</p>
        </div>
      </div>

      {/* META */}
      <div className="meta-data-row">
        <div>
          <p>
            पत्र संख्या : <span className="bold-text">{form.letter_no}</span>
          </p>
          <p>
            चलानी नं. :
            <input
              name="reference_no"
              value={form.reference_no}
              onChange={handleChange}
              className="dotted-input small-input"
            />
          </p>
        </div>
        <div className="text-right">
          <p>
            मिति :
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="dotted-input"
            />
          </p>
          <p className="nepali-date-text">ने.सं - 1146 चौलागा, 23 शुक्रबार</p>
        </div>
      </div>

      {/* RECIPIENT */}
      <div className="recipient-section">
        {/* ✅ FIX: select was missing name attr → uncontrolled */}
        <p>
          श्री{" "}
          <select
            name="recipient_office"
            value={form.recipient_office}
            onChange={handleChange}
            className="line-input"
          >
            <option value="जिल्ला प्रशासन कार्यालय">
              जिल्ला प्रशासन कार्यालय
            </option>
            <option value="इलाका प्रशासन कार्यालय">
              इलाका प्रशासन कार्यालय
            </option>
          </select>
        </p>
        <p className="bold-text">
          <input
            name="recipient_district"
            value={form.recipient_district}
            onChange={handleChange}
            className="dotted-input small-input"
            placeholder="काठमाडौँ"
          />{" "}
          ।
        </p>
      </div>

      {/* SUBJECT */}
      <div className="subject-section">
        विषय: <u>सिफारिस गरिएको ।</u>
      </div>

      {/* BODY INTRO */}
      <div className="intro-paragraph-section">
        महोदय,
        <br />
        यस {MUNICIPALITY?.name} अन्तर्गत निम्न लिखित विवरण भएका श्री{" "}
        <span className="red">*</span>
        <input
          name="applicant_name_body"
          value={form.applicant_name_body}
          onChange={handleChange}
          className="dotted-input medium-input"
          required
        />
        ले स्थायी नेपाली नागरिकताको प्रमाण-पत्र बनाउनको लागि सिफारिस पाऊँ
        भनि निवेदन दिएको हुँदा निम्न विवरणमा उल्लेखित व्यक्तिलाई स्थायी
        नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गराई दिनुहुन सिफारिस साथ
        अनुरोध गर्दछु !
      </div>

      {/* MAIN DETAILS LIST */}
      <div className="details-list-section">
        <div className="list-row">
          <span>
            जन्मस्थान :- <span className="red">*</span>
          </span>
          <input
            name="birth_place"
            value={form.birth_place}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>
        <div className="list-row">
          <span>
            बाबुको नाम थर, वतन :- <span className="red">*</span>
          </span>
          <input
            name="father_name"
            value={form.father_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <span className="red">*</span>
          <input
            name="father_address"
            value={form.father_address}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>
        <div className="list-row">
          <span>
            आमाको नाम थर, वतन :- <span className="red">*</span>
          </span>
          <input
            name="mother_name"
            value={form.mother_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <span className="red">*</span>
          <input
            name="mother_address"
            value={form.mother_address}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>
        <div className="list-row">
          <span>पति/पत्नीको नाम थर, वतन :-</span>
          <input
            name="spouse_name"
            value={form.spouse_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <input
            name="spouse_address"
            value={form.spouse_address}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>
        <div className="list-row">
          <span>स्थायी ठेगाना :-</span> {MUNICIPALITY?.name} वडा नं.{" "}
          {user?.ward || "१"}
        </div>
        <div className="list-row">
          <span>सम्बन्धित व्यक्तिको नाम थर, वतन :-</span>
          <input
            name="relative_name"
            value={form.relative_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
          <input
            name="relative_address"
            value={form.relative_address}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>
        <div className="list-row">
          <span>जन्म मिति :-</span>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="dotted-input"
          />
        </div>
        <div className="list-row">
          <span>
            जिल्ला प्रशासनबाट खटिएको नागरिकता टोलीमा नाम दर्ता :-
          </span>
          <input
            name="cit_team_reg_name"
            value={form.cit_team_reg_name}
            onChange={handleChange}
            className="dotted-input long-input"
          />
        </div>
        <div className="list-row">
          <span>सिफारिस माग गर्ने व्यक्तिको सही :-</span>
          <input
            name="applicant_signature"
            value={form.applicant_signature}
            onChange={handleChange}
            className="dotted-input medium-input"
          />
        </div>
      </div>

      {/* PHOTO BOX AND SIGNATURE */}
      <div className="photo-signature-flex">
        <div className="photo-container">
          <p>सिफारिस माग गर्नेको फोटो</p>
          <div className="photo-box">फोटो</div>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <span className="red-star">*</span>
            <input
              name="signatory_name"
              value={form.signatory_name}
              onChange={handleChange}
              className="line-input"
            />
            {/* ✅ FIX: select was missing name attr → uncontrolled */}
            <select
              name="signatory_position"
              value={form.signatory_position}
              onChange={handleChange}
            >
              <option value="">| पद छनौट गर्नुहोस् |</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
            </select>
          </div>
        </div>
      </div>

      {/* SANAKHAT SECTION */}
      <div className="sanakhat-section">
        <h3 className="sanakhat-title">सनाखत</h3>
        <p className="sanakhat-text">
          निवेदक{" "}
          <input
            name="sanakhat_applicant_name"
            value={form.sanakhat_applicant_name}
            onChange={handleChange}
            className="dotted-input medium-input"
          />{" "}
          मेरो{" "}
          <input
            name="sanakhat_relation"
            value={form.sanakhat_relation}
            onChange={handleChange}
            className="dotted-input small-input"
          />{" "}
          नाता हुन ! निजले हालसम्म कही कतैबाट नेपाली नागरिकताको प्रमाण-पत्र
          लिएको छैन ! व्यहोरा झुट्टा ठहरेमा कानुन बमोजिम सहुँला बुझाउला भनि
          सनाखत र सहिछाप गर्नेको :
        </p>

        <div className="sanakhat-details">
          <div className="sanakhat-fields">
            <div className="sanakhat-row">
              <label>नाम :-</label>
              <input
                name="sanakhat_name"
                value={form.sanakhat_name}
                onChange={handleChange}
                className="dotted-input"
              />
            </div>
            <div className="sanakhat-row">
              <label>ना.प्र.नं. :-</label>
              <input
                name="sanakhat_prpn_no"
                value={form.sanakhat_prpn_no}
                onChange={handleChange}
                className="dotted-input"
              />
            </div>
            <div className="sanakhat-row">
              <label>सही छाप :-</label>
              <input
                name="sanakhat_signature"
                value={form.sanakhat_signature}
                onChange={handleChange}
                className="dotted-input"
              />
            </div>
            <div className="sanakhat-row">
              <label>मिति :-</label>
              <input
                name="sanakhat_date"
                value={form.sanakhat_date}
                onChange={handleChange}
                className="dotted-input"
              />
            </div>
          </div>
          <div className="thumbprint-container">
            <p className="thumbprint-title">औंठा छाप</p>
            <div className="thumbprint-boxes">
              <div className="thumb-box">दायाँ</div>
              <div className="thumb-box">बायाँ</div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICANT DETAILS (BOTTOM) */}
      <div className="hide-print">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className={`submit-msg hide-print ${
            message.type === "error" ? "msg-error" : "msg-success"
          }`}
          style={{ marginTop: 12, display: "block" }}
        >
          {message.text}
        </div>
      )}

      {/* FOOTER */}
      <div className="form-footer hide-print">
        {/* ✅ FIX: added disabled={loading} to prevent double-submit */}
        <button
          type="submit"
          className="save-print-btn"
          disabled={loading}
        >
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name}
      </div>
    </form>
  );
}