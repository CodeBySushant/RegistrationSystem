// OldNonProfitOrgCertificate.jsx
import React, { useState } from "react";
import axios from "axios";
import "./OldNonProfitOrgRegCertificate.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  fiscalYear: "2082/83",
  date: "२०८२.०७.१५",
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

export default function OldNonProfitOrgCertificate() {
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
      Object.keys(payload).forEach((k) => {
        if (payload[k] === "") payload[k] = null;
      });
      const url = "/api/forms/old-non-profit-org-certificate";
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
    <div className="onp-page">
      <header className="onp-topbar">
        <div className="onp-top-left">गैर नाफामूलक संस्था दर्ता</div>
        <div className="onp-top-right">
          दर्ता विवरण / गैर नाफामूलक संस्था दर्ता
        </div>
      </header>

      <div className="onp-paper">
        <div className="onp-letterhead">
          <div className="onp-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Nepal.svg/240px-Emblem_of_Nepal.svg.png"
              alt="Emblem"
            />
          </div>

          <div className="onp-head-text">
            <div className="onp-head-main">{MUNICIPALITY.name}</div>
            <div className="onp-head-ward">
              {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
            </div>
            <div className="onp-head-sub">
              {MUNICIPALITY.officeLine} <br /> {MUNICIPALITY.provinceLine}
            </div>
          </div>

          <div className="onp-head-meta">
            <div className="onp-meta-line">
              आ. व :
              <select
                name="fiscalYear"
                value={form.fiscalYear}
                onChange={handleChange}
                className="onp-fy-select"
              >
                <option>2082/83</option>
                <option>2081/82</option>
                <option>2080/81</option>
              </select>
            </div>
            <div className="onp-meta-line">
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="onp-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="onp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="onp-subject-block">
            <div className="onp-subject-wrap">
              <span className="onp-sub-label">विषयः</span>
              <span className="onp-subject-text">
                गैर नाफामूलक संस्था दर्ता प्रमाण पत्र ।
              </span>
            </div>

            <div className="onp-stamp-box">
              <div>संस्थाको छाप वा</div>
              <div>फोटो</div>
            </div>
          </div>

          <section className="onp-section">
            <div className="onp-field-row">
              <label>दर्ता नं. :</label>
              <input
                type="text"
                name="regNo"
                className="onp-medium-input"
                value={form.regNo}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>दर्ता मिति :</label>
              <input
                type="text"
                name="regDate"
                className="onp-medium-input"
                value={form.regDate}
                onChange={handleChange}
              />
            </div>

            <div className="onp-field-row">
              <label>१) संस्थाको नाम :</label>
              <input
                type="text"
                name="organizationName"
                className="onp-wide-input"
                value={form.organizationName}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>ठेगाना :</label>
              <input
                type="text"
                name="organizationAddress"
                className="onp-wide-input"
                value={form.organizationAddress}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>विषयगत क्षेत्र :</label>
              <input
                type="text"
                name="subjectArea"
                className="onp-medium-input"
                value={form.subjectArea}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>संस्थाको कारोबार शुरू भएको मिति :</label>
              <input
                type="text"
                name="startDate"
                className="onp-medium-input"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>ई–मेल :</label>
              <input
                type="text"
                name="email"
                className="onp-wide-input"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input
                type="text"
                name="phone"
                className="onp-medium-input"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="onp-section">
            <div className="onp-field-row">
              <label>२) सभापति / अध्यक्ष / मुख्य व्यक्तिको नाम, थर :</label>
              <input
                type="text"
                name="presidentName"
                className="onp-wide-input"
                value={form.presidentName}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>ठेगाना :</label>
              <input
                type="text"
                name="presidentAddress"
                className="onp-wide-input"
                value={form.presidentAddress}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>ई–मेल :</label>
              <input
                type="text"
                name="presidentEmail"
                className="onp-wide-input"
                value={form.presidentEmail}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input
                type="text"
                name="presidentPhone"
                className="onp-medium-input"
                value={form.presidentPhone}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="onp-section">
            <div className="onp-field-row">
              <label>३) बैंकमा खाता भएका भए सम्बन्धीत नाम, थर, ठेगाना :</label>
              <input
                type="text"
                name="bankAccountInfo"
                className="onp-wide-input"
                value={form.bankAccountInfo}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>ई–मेल :</label>
              <input
                type="text"
                name="bankEmail"
                className="onp-wide-input"
                value={form.bankEmail}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field-row">
              <label>सम्पर्क फोन नं. :</label>
              <input
                type="text"
                name="bankPhone"
                className="onp-medium-input"
                value={form.bankPhone}
                onChange={handleChange}
              />
            </div>
          </section>

          <div className="onp-sign-top">
            <input
              type="text"
              name="signerName"
              className="onp-sign-name"
              placeholder="नाम, थर"
              value={form.signerName}
              onChange={handleChange}
            />
            <select
              name="signerDesignation"
              className="onp-post-select"
              value={form.signerDesignation}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>अध्यक्ष</option>
              <option>सचिव</option>
              <option>अधिकृत</option>
            </select>
          </div>

          <h3 className="onp-section-title">निवेदकको विवरण</h3>
          <div className="onp-applicant-box">
            <div className="onp-field">
              <label>निवेदकको नाम *</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field">
              <label>निवेदकको ठेगाना *</label>
              <input
                type="text"
                name="applicantAddress"
                value={form.applicantAddress}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input
                type="text"
                name="applicantCitizenship"
                value={form.applicantCitizenship}
                onChange={handleChange}
              />
            </div>
            <div className="onp-field">
              <label>निवेदकको फोन नं. *</label>
              <input
                type="text"
                name="applicantPhone"
                value={form.applicantPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="onp-submit-row">
            <button
              className="onp-submit-btn"
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

      <footer className="onp-footer">
        <footer className="onp-footer">© सर्वाधिकार सुरक्षित {MUNICIPALITY.name}</footer>
      </footer>
    </div>
  );
}
