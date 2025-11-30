import React, { useState } from "react";
import "./LekhaParikshyan.css";

export default function LekhaParikshyan() {
  const [form, setForm] = useState({
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
    bodartha: "",
    signature_name: "",
    designation: "",
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship: "",
    applicant_phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    if (!form.subject_to) return "प्राप्तकर्ता (श्री …) अनिवार्य छ";
    if (!form.organization_name) return "संस्थाको नाम आवश्यक छ";
    if (!form.auditor_name) return "लेखा परीक्षकको नाम आवश्यक छ";
    if (!form.signature_name) return "दस्तखत गर्ने नाम आवश्यक छ";
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
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMsg({ type: "success", text: "रेकर्ड सेभ भयो! ID: " + data.id });

      // Reset form
      setForm({
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
        bodartha: "",
        signature_name: "",
        designation: "",
        applicant_name: "",
        applicant_address: "",
        applicant_citizenship: "",
        applicant_phone: ""
      });
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
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
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
              type="text"
              className="dotted-input small-input"
              value={form.chalani_no}
              onChange={(e) => update("chalani_no", e.target.value)}
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
            type="text"
            className="line-input medium-input"
            value={form.subject_to}
            onChange={(e) => update("subject_to", e.target.value)}
          />
        </div>
        <div className="addressee-row">
          <input
            type="text"
            className="line-input medium-input"
            value={form.subject_org}
            onChange={(e) => update("subject_org", e.target.value)}
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
            type="text"
            className="inline-box-input medium-box"
            value={form.office_name}
            onChange={(e) => update("office_name", e.target.value)}
          />{" "}
          वडा नं.{" "}
          <input
            type="text"
            className="inline-box-input tiny-box"
            value={form.ward_no}
            onChange={(e) => update("ward_no", e.target.value)}
          />{" "}
          मा रहेको श्री{" "}
          <input
            type="text"
            className="inline-box-input long-box"
            value={form.organization_name}
            onChange={(e) => update("organization_name", e.target.value)}
          />{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            value={form.organization_extra}
            onChange={(e) => update("organization_extra", e.target.value)}
          />{" "}
          को आ.व.{" "}
          <input
            type="text"
            className="inline-box-input small-box"
            value={form.fiscal_year}
            onChange={(e) => update("fiscal_year", e.target.value)}
          />{" "}
          को लेखा परिक्षण गर्न… लेखा परिक्षक श्री{" "}
          <input
            type="text"
            className="inline-box-input long-box"
            value={form.auditor_name}
            onChange={(e) => update("auditor_name", e.target.value)}
          />{" "}
          प्रमाण पत्र नं.{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            value={form.auditor_certificate_no}
            onChange={(e) =>
              update("auditor_certificate_no", e.target.value)
            }
          />{" "}
          संस्था दर्ता नम्बर{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            value={form.organization_reg_no}
            onChange={(e) => update("organization_reg_no", e.target.value)}
          />{" "}
          भएको{" "}
          <input
            type="text"
            className="inline-box-input long-box"
            value={form.auditor_org_name}
            onChange={(e) => update("auditor_org_name", e.target.value)}
          />{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            value={form.auditor_org_extra}
            onChange={(e) => update("auditor_org_extra", e.target.value)}
          />{" "}
          का{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            value={form.auditor_extra_role}
            onChange={(e) => update("auditor_extra_role", e.target.value)}
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
            className="line-input full-width-input"
            value={form.bodartha}
            onChange={(e) => update("bodartha", e.target.value)}
          />
        </div>
      </div>

      {/* Signature */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input
            type="text"
            className="line-input full-width-input"
            placeholder="दस्तखत गर्ने नाम"
            value={form.signature_name}
            onChange={(e) => update("signature_name", e.target.value)}
          />
          <select
            className="designation-select"
            value={form.designation}
            onChange={(e) => update("designation", e.target.value)}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>वडा अध्यक्ष</option>
            <option>वडा सचिव</option>
            <option>कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* Applicant */}
      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>

        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_name}
              onChange={(e) => update("applicant_name", e.target.value)}
            />
          </div>

          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_address}
              onChange={(e) => update("applicant_address", e.target.value)}
            />
          </div>

          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_citizenship}
              onChange={(e) =>
                update("applicant_citizenship", e.target.value)
              }
            />
          </div>

          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input
              type="text"
              className="detail-input bg-gray"
              value={form.applicant_phone}
              onChange={(e) => update("applicant_phone", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="form-footer">
        <button
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
            fontWeight: "bold"
          }}
        >
          {msg.text}
        </p>
      )}

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
}
