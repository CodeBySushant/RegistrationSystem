import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useWardForm } from "../../hooks/useWardForm";
import "./NepaliLanguage.css";
import { MUNICIPALITY } from "../../config/municipalityConfig"; // ✅ Single import
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  // Header fields
  patra_sankhya: "२०८२/८३",
  chalani_no: "",
  date_nepali: "२०८२-१२-१८",

  // Main form fields
  subject: "",
  recipient_name: "",
  body_text: "",
  bodartha: "",

  // Signature
  signatory_name: "",
  signatory_designation: "",

  // ✅ Fixed: Match ApplicantDetailsNp field names
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const NepaliLanguage = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/forms/nepali-language", form);
      setLoading(false);

      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
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
      const res = await axios.post("/api/forms/nepali-language", form);

      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ Print first
        setForm(initialState); // ✅ Reset after print
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nepali-language-container">
      <div className="top-bar-title">
        नेपाली भाषामा पत्र लेखन
        <span className="top-right-bread">खुला ढाँचा &gt; नेपाली प्रपत्र</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ✅ ROBUST DYNAMIC Header */}
        <header className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {
                user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : user?.ward
                    ? `वडा नं. ${user.ward} वडा कार्यालय`
                    : "वडा कार्यालय" // ✅ Safe fallback
              }
            </h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
          </div>
        </header>

        {/* Metadata Row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <div className="meta-item">
              पत्र संख्या :{" "}
              <span className="bold-text">{form.patra_sankhya}</span>
            </div>
            <div className="meta-item">
              चलानी नं. :
              <input
                name="chalani_no"
                type="text"
                className="dotted-input small-input"
                value={form.chalani_no}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="meta-right">
            <div className="meta-item">
              मिति : <span className="bold-text">{form.date_nepali}</span>
            </div>
            <p className="nepali-date-string">ने.सं. ११४६ चौलागा, २४ शनिबार</p>
          </div>
        </div>

        {/* Subject */}
        <div className="subject-section">
          विषय:
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="subject"
              type="text"
              className="dotted-input medium-input"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            श्री
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input
                name="recipient_name"
                type="text"
                className="dotted-input long-input"
                value={form.recipient_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="addressee-row">
            <input
              type="text"
              className="dotted-input long-input"
              placeholder="पद/कार्यालय"
            />
          </div>
          <div className="addressee-row">
            <input
              type="text"
              className="dotted-input long-input"
              placeholder="ठेगाना"
            />
          </div>
        </div>

        {/* Body Text */}
        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <span>पत्रको विवरण यहाँ लेख्नुहोस्: </span>
            </div>
            <textarea
              name="body_text"
              className="editor-textarea"
              value={form.body_text}
              onChange={handleChange}
              placeholder="यहाँ पत्रको मुख्य विवरण लेख्नुहोस्..."
              rows={12}
            />
            <div className="word-count">
              {(form.body_text || "").length} अक्षर
            </div>
          </div>
        </div>

        {/* Bodartha */}
        <div className="bodartha-section">
          बोधार्थ:-
          <textarea
            name="bodartha"
            className="full-width-textarea"
            value={form.bodartha}
            onChange={handleChange}
            rows={2}
            placeholder="बोधार्थ लेख्नुहोस्..."
          />
        </div>

        {/* Signature */}
        <div className="signature-container">
          <div className="signature-block">
            <div className="signature-line"></div>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input
                name="signatory_name"
                type="text"
                className="dotted-input full-width-input"
                value={form.signatory_name}
                onChange={handleChange}
                placeholder="नाम"
                required
              />
            </div>
            <select
              name="signatory_designation"
              className="designation-select"
              value={form.signatory_designation}
              onChange={handleChange}
              required
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

        {/* Applicant Details */}
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* Footer */}
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
      </form>

      {/* ✅ Dynamic footer */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default NepaliLanguage;
