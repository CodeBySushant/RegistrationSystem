// NonProfitOrgRegCertificate.jsx
import React, { useState } from "react";
import axios from "axios";
import "./NonProfitOrgRegCertificate.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  fiscalYear: "2082/83",
  date: "२०८२.०७.१५",
  chalaniNo: "",
  regNo: "",
  regDate: "",
  organizationName: "",
  organizationAddress: "",
  subjectArea: "",
  startDate: "",
  email: "",
  phone: "",
  presidentName: "",
  presidentAddress: "",
  presidentEmail: "",
  presidentPhone: "",
  bankAccountInfo: "",
  bankEmail: "",
  bankPhone: "",
  signerName: "",
  signerDesignation: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

export default function NonProfitOrgRegCertificate() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = (f) => {
    if (!f.organizationName?.trim()) return "संस्थाको नाम आवश्यक छ";
    if (!f.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const err = validate(form);
    if (err) {
      alert(err);
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form };
      // convert empty strings to null to keep DB clean
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });

      const url = "/api/forms/non-profit-org-registration-certificate";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setForm(initialState);
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg =
        error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="nprc-page">
      <header className="nprc-topbar">
        <div className="nprc-top-left">गैर नाफामूलक संस्था दर्ता</div>
        <div className="nprc-top-right">
          अवलोकन पृष्ठ / गैर नाफामूलक संस्था दर्ता प्रमाण पत्र
        </div>
      </header>

      <div className="nprc-paper">
        <div className="nprc-letterhead">
          <div className="nprc-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="nprc-head-text">
            <div className="nprc-head-main">{MUNICIPALITY.name}</div>
            <div className="nprc-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="nprc-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>

          <div className="nprc-head-meta">
            <div>
              पत्र संख्या :
              <select
                name="fiscalYear"
                value={form.fiscalYear}
                onChange={handleChange}
                className="nprc-fy-select"
              >
                <option>2082/83</option>
                <option>2081/82</option>
                <option>2080/81</option>
              </select>
            </div>
            <div className="nprc-meta-line">
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="nprc-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="nprc-ref-row">
            <div className="nprc-ref-block">
              <label>चलानी नं. :</label>
              <input
                type="text"
                name="chalaniNo"
                value={form.chalaniNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="nprc-subject-block">
            <div className="nprc-subject-wrap">
              <span className="nprc-sub-label">विषयः</span>
              <span className="nprc-subject-text">
                गैर नाफामूलक संस्था दर्ता प्रमाण पत्र ।
              </span>
            </div>

            <div className="nprc-stamp-box">
              <div>संस्थाको छाप वा</div>
              <div>फोटो</div>
            </div>
          </div>

          <section className="nprc-section">
            <div className="nprc-field-row">
              <label>दर्ता नं. :</label>
              <input
                type="text"
                name="regNo"
                className="nprc-medium-input"
                value={form.regNo}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>दर्ता मिति :</label>
              <input
                type="text"
                name="regDate"
                className="nprc-medium-input"
                value={form.regDate}
                onChange={handleChange}
              />
            </div>

            <div className="nprc-field-row">
              <label>१) संस्थाको नाम :</label>
              <input
                type="text"
                name="organizationName"
                className="nprc-wide-input"
                value={form.organizationName}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>ठेगाना :</label>
              <input
                type="text"
                name="organizationAddress"
                className="nprc-wide-input"
                value={form.organizationAddress}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>विषयगत क्षेत्र :</label>
              <input
                type="text"
                name="subjectArea"
                className="nprc-medium-input"
                value={form.subjectArea}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>संस्थाको कारोबार शुरू भएको मिति :</label>
              <input
                type="text"
                name="startDate"
                className="nprc-medium-input"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>ई–मेल :</label>
              <input
                type="text"
                name="email"
                className="nprc-wide-input"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input
                type="text"
                name="phone"
                className="nprc-medium-input"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="nprc-section">
            <div className="nprc-field-row">
              <label>२) सभापति / अध्यक्ष / मुख्य व्यक्तिको नाम, थर :</label>
              <input
                type="text"
                name="presidentName"
                className="nprc-wide-input"
                value={form.presidentName}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>ठेगाना :</label>
              <input
                type="text"
                name="presidentAddress"
                className="nprc-wide-input"
                value={form.presidentAddress}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>ई–मेल :</label>
              <input
                type="text"
                name="presidentEmail"
                className="nprc-wide-input"
                value={form.presidentEmail}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input
                type="text"
                name="presidentPhone"
                className="nprc-medium-input"
                value={form.presidentPhone}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="nprc-section">
            <div className="nprc-field-row">
              <label>३) बैंकमा खाता भएका भए सम्बन्धित नाम, थर, ठेगाना :</label>
              <input
                type="text"
                name="bankAccountInfo"
                className="nprc-wide-input"
                value={form.bankAccountInfo}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>ई–मेल :</label>
              <input
                type="text"
                name="bankEmail"
                className="nprc-wide-input"
                value={form.bankEmail}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input
                type="text"
                name="bankPhone"
                className="nprc-medium-input"
                value={form.bankPhone}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="nprc-section nprc-cert-section">
            <p className="nprc-body">
              ऐसागर्ने अन्य निकायबाट स्वीकृत वा इजाजत लिनु पर्ने छ । साथै यो
              प्रमाण पत्र सावधानी नवीकरण गर्नु पर्नेछ ।
            </p>

            <div className="nprc-sign-line-wrapper">
              <span>प्रमाणित गर्ने</span>
              <div className="nprc-sign-line" />
            </div>
          </section>

          <div className="nprc-sign-top">
            <input
              type="text"
              name="signerName"
              className="nprc-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              name="signerDesignation"
              className="nprc-post-select"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="nprc-section-title">निवेदकको विवरण</h3>
          <div className="nprc-applicant-box">
            <div className="nprc-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="nprc-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="nprc-submit-row">
            <button
              className="nprc-submit-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "पठाइँ हुँदैछ..."
                : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>

      <footer className="nprc-footer">
        <footer className="nprc-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}
