import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./LekhaParikshyan.css";
import { useAuth } from "../../context/AuthContext";

import { useWardForm } from "../../hooks/useWardForm";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const initialState = {
  chalani_no: "",
  subject_to: "",
  subject_org: "",
  office_name: "",
  ward_no: "",
  organization_name: "",
  organization_extra: "",
  fiscal_year: "",
  auditor_name: "",
  auditor_certificate_no: "",
  organization_reg_no: "",
  auditor_org_name: "",
  auditor_org_extra: "",
  auditor_extra_role: "",
  bodartha: "",

  signer_name: "",
  signer_designation: "",

  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const LekhaParikshyan = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [msg, setMsg] = useState(null);

  const validate = () => {
    if (!form.subject_to) return "प्राप्तकर्ता (श्री …) अनिवार्य छ";
    if (!form.organization_name) return "संस्थाको नाम आवश्यक छ";
    if (!form.auditor_name) return "लेखा परीक्षकको नाम आवश्यक छ";
    if (!form.signer_name) return "दस्तखत गर्ने नाम आवश्यक छ";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/forms/lekha-parikshyan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMsg({ type: "success", text: "रेकर्ड सेभ भयो! ID: " + data.id });

      // Reset form
      setForm(initialState);
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    }

    setLoading(false);
  };

  return (
    <div className="audit-container">
      {/* Top Bar */}
      <div className="top-bar-title">
        लेखा परिक्षण सम्बन्धमा ।
        <span className="top-right-bread">
          आर्थिक &gt; लेखा परिक्षण सम्बन्धमा ।
        </span>
      </div>

      {/* Header */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">२०८२/८३</span>
          </p>
          <p>
            चलानी नं.:{" "}
            <input
              name="chalani_no"
              value={form.chalani_no}
              onChange={handleChange}
            />
          </p>
        </div>

        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
        </div>
      </div>

      {/* Addressee */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="subject_to"
            className="line-input medium-input"
            value={form.subject_to}
            onChange={handleChange}
          />
        </div>
        <div className="addressee-row">
          <input
            name="subject_org"
            className="line-input medium-input"
            value={form.subject_org}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="subject-section">
        <p>
          विषय: <span className="underline-text">लेखा परिक्षण सम्बन्धमा ।</span>
        </p>
      </div>

      {/* Main Body */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा यस{" "}
          <input
            name="office_name"
            value={form.office_name}
            onChange={handleChange}
          />{" "}
          वडा नं.{" "}
          <input name="ward_no" value={form.ward_no} onChange={handleChange} />{" "}
          मा रहेको श्री{" "}
          <input
            name="organization_name"
            value={form.organization_name}
            onChange={handleChange}
          />{" "}
          <input
            name="organization_extra"
            className="inline-box-input medium-box"
            value={form.organization_extra}
            onChange={handleChange}
          />{" "}
          को आ.व.{" "}
          <input
            name="fiscal_year"
            className="inline-box-input small-box"
            value={form.fiscal_year}
            onChange={handleChange}
          />{" "}
          को लेखा परिक्षण गर्न… लेखा परिक्षक श्री{" "}
          <input
            type="text"
            name="auditor_name"
            className="inline-box-input long-box"
            value={form.auditor_name}
            onChange={handleChange}
          />{" "}
          प्रमाण पत्र नं.{" "}
          <input
            type="text"
            name="auditor_certificate_no"
            className="inline-box-input medium-box"
            value={form.auditor_certificate_no}
            onChange={handleChange}
          />{" "}
          संस्था दर्ता नम्बर{" "}
          <input
            type="text"
            name="organization_reg_no"
            className="inline-box-input medium-box"
            value={form.organization_reg_no}
            onChange={handleChange}
          />{" "}
          भएको{" "}
          <input
            type="text"
            name="auditor_org_name"
            className="inline-box-input long-box"
            value={form.auditor_org_name}
            onChange={handleChange}
          />{" "}
          <input
            type="text"
            name="auditor_org_extra"
            className="inline-box-input medium-box"
            value={form.auditor_org_extra}
            onChange={handleChange}
          />{" "}
          का{" "}
          <input
            type="text"
            name="auditor_extra_role"
            className="inline-box-input medium-box"
            value={form.auditor_extra_role}
            onChange={handleChange}
          />{" "}
          लाई लेखा परिक्षणको अनुमति…
        </p>
      </div>

      {/* Bodartha */}
      <div className="bodartha-section">
        <label className="bold-text underline-text">बोधार्थ:</label>
        <div className="bodartha-input-container">
          <input
            type="text"
            name="bodartha"
            className="line-input full-width-input"
            value={form.bodartha}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="signer_name"
              type="text"
              className="line-input full-width-input"
              required
              value={form.signer_name}
              onChange={handleChange}
            />
          </div>
          <select
            name="signer_designation"
            className="designation-select"
            value={form.signer_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>
              निवेदकको नाम<span className="required">*</span>
            </label>
            <input
              name="applicant_name"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_name}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको ठेगाना<span className="required">*</span>
            </label>
            <input
              name="applicant_address"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_address}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको नागरिकता नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_citizenship_no"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_citizenship_no}
              onChange={handleChange}
            />
          </div>
          <div className="detail-group">
            <label>
              निवेदकको फोन नं.<span className="required">*</span>
            </label>
            <input
              name="applicant_phone"
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="form-footer">
        <button
          type="button"
          className="save-print-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {msg && (
        <p
          style={{
            color: msg.type === "error" ? "red" : "green",
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {msg.text}
        </p>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default LekhaParikshyan;
