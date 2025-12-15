// src/components/InterLocalTransferRecommendation.jsx
import React, { useState } from "react";
import "./InterLocalTransferRecommendation.css";

const FORM_KEY = "inter-local-transfer-recommendation";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function InterLocalTransferRecommendation() {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "", // yyyy-mm-dd
    subject: "अन्तर स्थानीय सरुवा सहमति दिईएको सम्बन्धमा",

    requested_person_name: "",
    requested_person_position: "",
    requested_person_position_code: "",

    transfer_to_local: "",
    transfer_to_position: "",

    employee_name: "",
    employee_post_title: "",
    service_group: "",

    appointing_local: "नागार्जुन नगरपालिका, काठमाडौँ",
    transfer_local: "",
    permanent_address: "",

    phone: "",
    dob: "",
    citizenship_no: "",
    citizenship_issue_date: "",
    citizenship_issue_district: "",

    signatory_name: "",
    signatory_position: "",

    applicant_name_footer: "",
    applicant_address_footer: "",
    applicant_citizenship_no: "",
    applicant_phone: "",

    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const upd = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    if (!form.employee_name) return "कर्मचारीको नाम आवश्यक छ।";
    if (!form.citizenship_no) return "निवेदक/कर्मचारीको नागरिकता नं. आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const v = validate();
    if (v) {
      setMessage({ type: "error", text: v });
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error((body && body.message) || JSON.stringify(body) || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सेभ भयो (ID: ${body.id || "unknown"})` });
      // optionally clear or keep form
    } catch (err) {
      console.error("save error", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="inter-local-transfer-container" onSubmit={handleSubmit}>
      <div className="top-bar-title">
        अन्तर स्थानीय संस्थागत सरुवा सहमति ।
        <span className="top-right-bread">आर्थिक प्रबेश &gt; अन्तर स्थानीय संस्थागत सरुवा सहमति</span>
      </div>

      <div className="form-header-section">
        <div className="header-logo"><img src="/nepallogo.svg" alt="logo" /></div>
        <div className="header-text">
          <h1>नागार्जुन नगरपालिका</h1>
          <h2>१ नं. वडा कार्यालय</h2>
          <p>नागार्जुन, काठमाडौँ</p>
        </div>
      </div>

      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <input value={form.letter_no} onChange={upd("letter_no")} /></p>
          <p>चलानी नं. : <input value={form.reference_no} onChange={upd("reference_no")} /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <input type="date" value={form.date} onChange={upd("date")} /></p>
        </div>
      </div>

      <div className="subject-section">
        <p>विषय: <input value={form.subject} onChange={upd("subject")} /></p>
      </div>

      <div className="form-body">
        <p className="body-paragraph">
          श्री <input className="inline-box-input medium-input" value={form.requested_person_name} onChange={upd("requested_person_name")} placeholder="नाम" /> 
          ले यस कार्यालयमा मिति <span className="bold-text">{form.date || "______"}</span> मा माथि स्वीकृति भई 
          <input className="inline-box-input medium-input" value={form.transfer_to_local} onChange={upd("transfer_to_local")} placeholder="सरुवा जाने स्थानीय तह" /> 
          को पद <input className="inline-box-input small-input" value={form.transfer_to_position} onChange={upd("transfer_to_position")} placeholder="पद" /> को च.न. 
          <input className="inline-box-input small-input" value={form.requested_person_position_code} onChange={upd("requested_person_position_code")} placeholder="च.न." /> 
          मा प्राप्त भएको निवेदन अनुसार कर्मचारी 
          <input className="inline-box-input medium-input" value={form.employee_name} onChange={upd("employee_name")} placeholder="कर्मचारीको नाम" /> 
          को पदनाम <input className="inline-box-input medium-input" value={form.employee_post_title} onChange={upd("employee_post_title")} placeholder="पद/तह" /> 
          बमोजिम <input className="inline-box-input medium-input" value={form.service_group} onChange={upd("service_group")} placeholder="सेवा/समूह/उपसमूह" /> लाई यस गाउँपालिकाबाट सरुवा भई देहायको विवरण सहित सहमति प्रदान गरिएको व्यहोरा अनुरोध छ।
        </p>
      </div>

      <div className="details-section">
        <h4 className="bold-text underline-text">देहाय</h4>
        <div className="details-grid">
          <div className="detail-col-left">
            <div className="detail-item">
              <label>नाम थर:</label>
              <input className="dotted-input full-width" value={form.employee_name} onChange={upd("employee_name")} />
            </div>
            <div className="detail-item">
              <label>पद/तह:</label>
              <input className="dotted-input full-width" value={form.employee_post_title} onChange={upd("employee_post_title")} />
            </div>
            <div className="detail-item">
              <label>सेवा/समूह/उपसमूह:</label>
              <input className="dotted-input full-width" value={form.service_group} onChange={upd("service_group")} />
            </div>
            <div className="detail-item">
              <label>नियुक्ति दिने स्थानीय तह:</label>
              <input className="dotted-input full-width" value={form.appointing_local} onChange={upd("appointing_local")} />
            </div>
            <div className="detail-item">
              <label>सरुवा जाने स्थानीय तह:</label>
              <input className="dotted-input full-width" value={form.transfer_local} onChange={upd("transfer_local")} />
            </div>
            <div className="detail-item">
              <label>स्थायी ठेगाना:</label>
              <input className="dotted-input full-width" value={form.permanent_address} onChange={upd("permanent_address")} />
            </div>
          </div>

          <div className="detail-col-right">
            <div className="detail-item">
              <label>फोन नं:</label>
              <input className="dotted-input full-width" value={form.phone} onChange={upd("phone")} />
            </div>
            <div className="detail-item">
              <label>जन्म मिति:</label>
              <input type="date" className="dotted-input full-width" value={form.dob} onChange={upd("dob")} />
            </div>
            <div className="detail-item">
              <label>ना.प्र.नं:</label>
              <input className="dotted-input full-width" value={form.citizenship_no} onChange={upd("citizenship_no")} />
            </div>
            <div className="detail-item">
              <label>जारी मिति:</label>
              <input type="date" className="dotted-input full-width" value={form.citizenship_issue_date} onChange={upd("citizenship_issue_date")} />
            </div>
            <div className="detail-item">
              <label>जारी जिल्ला:</label>
              <input className="dotted-input full-width" value={form.citizenship_issue_district} onChange={upd("citizenship_issue_district")} />
            </div>
          </div>
        </div>
      </div>

      <div className="signature-section">
        <div className="signature-block">
          <input className="line-input full-width-input" value={form.signatory_name} onChange={upd("signatory_name")} placeholder="दस्तखत" />
          <select className="designation-select" value={form.signatory_position} onChange={upd("signatory_position")}>
            <option value="">पद छनौट गर्नुहोस्</option>
            <option>प्रमुख प्रशासकीय अधिकृत</option>
            <option>वडा सचिव</option>
          </select>
        </div>
      </div>

      <div className="applicant-details-box">
        <h3>निवेदकको विवरण</h3>
        <div className="details-grid">
          <div className="detail-group">
            <label>निवेदकको नाम</label>
            <input className="detail-input bg-gray" value={form.applicant_name_footer} onChange={upd("applicant_name_footer")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input className="detail-input bg-gray" value={form.applicant_address_footer} onChange={upd("applicant_address_footer")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input className="detail-input bg-gray" value={form.applicant_citizenship_no} onChange={upd("applicant_citizenship_no")} />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input className="detail-input bg-gray" value={form.applicant_phone} onChange={upd("applicant_phone")} />
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      {message && (
        <div style={{ marginTop: 8, color: message.type === "error" ? "crimson" : "green" }}>
          {message.text}
        </div>
      )}
    </form>
  );
}
