import React, { useState, useEffect } from "react";
import "./CitizenshipCertificateCopy.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "citizenship-proof-copy";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipCertificateCopy() {
  const { user } = useAuth();

  // 1 & 2. FIXED: Fully defined initial state matching the exact image fields
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10),

    // Addressee
    recipient_office_type: "जिल्ला",
    recipient_location: "",
    
    // Body paragraph
    current_district: "काठमाडौँ",
    current_local_unit: MUNICIPALITY?.name?.replace(" नगरपालिका", "") || "नागार्जुन",
    current_local_unit_type: "नगरपालिका",
    current_ward: "१",
    
    prev_district: "काठमाडौँ",
    prev_local_unit_type: "",
    prev_ward: "",
    
    applicant_name_body: "",
    cit_no: "",
    relation: "",
    issue_district: "काठमाडौँ",
    condition: "झुत्रो भएको",

    // Signatory
    signatory_name: "",
    signatory_position: "",

    // ApplicantDetailsNp footer
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, current_ward: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.applicant_name) return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no) return "नागरिकता नं. आवश्यक छ।";
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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const info = typeof body === "object" ? body.message || JSON.stringify(body) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो` });
      window.print();
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ हुन सकेन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="citizenship-copy-container" onSubmit={handleSubmit}>
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
        <span className="top-right-bread">
          नेपाली नागरिकता &gt; नेपाली नागरिकताको प्रमाण-पत्र प्रतिलिपि पाऊँ।
        </span>
      </div>

      {/* HEADER SECTION (Matching specific image design) */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src={MUNICIPALITY?.logoSrc || "/nepallogo.svg"} alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}</h1>
          <h2 className="ward-title">{user?.ward || "१"} नं. वडा कार्यालय</h2>
          <p className="address-text">{MUNICIPALITY?.officeLine || "नागार्जुन, काठमाडौँ"}</p>
          <p className="province-text">{MUNICIPALITY?.provinceLine || "बागमती प्रदेश, नेपाल"}</p>
        </div>
      </div>

      {/* META DATA */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">{form.letter_no}</span></p>
          <p>
            चलानी नं. :
            <input name="reference_no" value={form.reference_no} onChange={handleChange} className="dotted-input small-input" />
          </p>
        </div>
        <div className="meta-right text-right">
          <p>
            मिति :
            <input type="date" name="date" value={form.date} onChange={handleChange} className="dotted-input" />
          </p>
          <p className="nepali-date-text">ने.सं - 1146 चौलागा, 24 शनिबार</p>
        </div>
      </div>

      {/* ADDRESSEE */}
      <div className="addressee-section">
        <p>
          श्री <select name="recipient_office_type" className="inline-select" value={form.recipient_office_type} onChange={handleChange}>
            <option value="जिल्ला">जिल्ला</option>
            <option value="इलाका">इलाका</option>
          </select> प्रशासन कार्यालय,
        </p>
        <p>
          <span className="red">*</span>
          <input name="recipient_location" value={form.recipient_location} onChange={handleChange} className="dotted-input medium-input" /> , काठमाडौँ ।
        </p>
      </div>

      {/* SUBJECT */}
      <div className="subject-section">
        <p>विषय: <u>सिफारिस सम्बन्धमा ।</u></p>
      </div>

      {/* BODY PARAGRAPH */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा जिल्ला काठमाडौँ 
          <input name="current_local_unit" value={form.current_local_unit} onChange={handleChange} className="dotted-input medium-input bold-text" /> 
          <input name="current_local_unit_type" value={form.current_local_unit_type} onChange={handleChange} className="dotted-input medium-input" /> 
          वडा नं {form.current_ward} (साविक जिल्ला काठमाडौँ 
          <select name="prev_local_unit_type" className="inline-select" value={form.prev_local_unit_type} onChange={handleChange}>
            <option value=""></option>
            <option value="गा.वि.स.">गा.वि.स.</option>
            <option value="नगरपालिका">नगरपालिका</option>
          </select> 
          वडा नं <span className="red">*</span><input name="prev_ward" value={form.prev_ward} onChange={handleChange} className="dotted-input tiny-input" /> ) मा स्थायी रुपले बसोबास गरि बस्ने 
          <span className="red">*</span><input name="applicant_name_body" value={form.applicant_name_body} onChange={handleChange} className="dotted-input long-input" /> ले 
          <span className="red">*</span><input name="cit_no" value={form.cit_no} onChange={handleChange} className="dotted-input medium-input" /> नं. 
          <span className="red">*</span><input name="relation" value={form.relation} onChange={handleChange} className="dotted-input small-input" /> नाताले जि.प्र.का. 
          <input name="issue_district" value={form.issue_district} onChange={handleChange} className="dotted-input small-input" /> बाट नागरिकता प्रमाण पत्र प्राप्त गर्नु भएकोमा सो नागरिकता प्रमाणपत्र 
          <select name="condition" className="inline-select" value={form.condition} onChange={handleChange}>
            <option value="झुत्रो भएको">झुत्रो भएको</option>
            <option value="हराएको">हराएको</option>
          </select> ले निजलाई प्रतिलिपी नागरिकता नियमानुसार उपलब्ध गराइदिनु हुन स्थायी बसोबास प्रमाणित, साथ सिफारिस गरिएको व्यहोरा अनुरोध छ ।
        </p>
      </div>

      {/* SIGNATURE SECTION */}
      <div className="signature-section">
        <div className="signature-block">
          <span className="red-star">*</span>
          <input
            name="signatory_name"
            value={form.signatory_name}
            onChange={handleChange}
            className="line-input full-width-input"
          />
          <select
            name="signatory_position"
            value={form.signatory_position}
            onChange={handleChange}
            className="designation-select"
          >
            <option value="">| पद छनौट गर्नुहोस् |</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* APPLICANT DETAILS BOX (Bottom) */}
      <div className="hide-print">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      {/* FOOTER ACTION */}
      <div className="form-footer hide-print">
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
        {message && (
          <div style={{ marginTop: 15, color: message.type === "error" ? "crimson" : "green", fontWeight: "bold" }}>
            {message.text}
          </div>
        )}
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
      </div>
    </form>
  );
}