import React, { useState, useEffect } from "react";
import "./CitizenshipRecommendationOnHusbandDetail.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "citizenship-recommendation-husband";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function CitizenshipRecommendationOnHusbandDetail() {
  const { user } = useAuth();

  // 1 & 2. FIXED: Completely mapped all initial states to the provided image
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: new Date().toISOString().slice(0, 10),

    // Addressee
    recipient_office: "जिल्ला",
    recipient_district: "काठमाडौँ",
    recipient_municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",

    // Body Paragraph
    local_unit: "",
    ward_no: "१",
    husband_name_body: "",
    wife_name_body: "",
    
    pre_marriage_office: "जिल्ला",
    pre_marriage_district: "",
    pre_marriage_prpn_no: "",
    pre_marriage_cit_date: new Date().toISOString().slice(0, 10),
    
    marriage_district: "काठमाडौँ",
    marriage_municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
    marriage_ward: "",
    husband_name: "",
    marriage_date: new Date().toISOString().slice(0, 10),

    // Signature
    signatory_name: "",
    signatory_position: "",

    // Bottom Applicant Details (Controlled by ApplicantDetailsNp)
    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Auto-fill ward if available from user context
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  // 4. FIXED: Standardized handleChange for child components (ApplicantDetailsNp)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!form.applicant_name) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicant_citizenship_no) return "नागरिकता नं. आवश्यक छ।";
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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();
      
      if (!res.ok) {
        const info = typeof body === "object" ? (body.message || JSON.stringify(body)) : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो` });
      window.print(); // Prompt print on success
    } catch (err) {
      console.error("submit error", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सम्भव भएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="husband-detail-rec-container" onSubmit={handleSubmit}>
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        पतिको नाममा नेपाली नागरिकताको प्रमाण-पत्र ।
        <span className="top-right-bread">
          नेपाली नागरिकता &gt; पतिको नाममा नेपाली नागरिकताको प्रमाण पत्र
        </span>
      </div>

      {/* HEADER */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
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
            <input name="reference_no" className="dotted-input small-input" value={form.reference_no} onChange={handleChange} />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति :
            <input type="date" name="date" className="dotted-input" value={form.date} onChange={handleChange} />
          </p>
          <p className="nepali-date-text">ने.सं - 1146 चौलागा, 23 शुक्रबार</p>
        </div>
      </div>

      {/* ADDRESSEE */}
      <div className="addressee-section">
        <p>
          श्री <select name="recipient_office" className="dotted-input select-input" value={form.recipient_office} onChange={handleChange}>
            <option value="जिल्ला">जिल्ला</option>
            <option value="इलाका">इलाका</option>
          </select> प्रशासन कार्यालय,
        </p>
        <p>
          <input name="recipient_district" className="dotted-input medium-input bold-text" value={form.recipient_district} onChange={handleChange} placeholder="काठमाडौँ" /> , 
          <input name="recipient_municipality" className="dotted-input medium-input bold-text" value={form.recipient_municipality} onChange={handleChange} placeholder="नगरपालिका" /> ।
        </p>
      </div>

      {/* SUBJECT */}
      <div className="subject-section">
        <p>विषय: <u>सिफारिस सम्बन्धमा ।</u></p>
      </div>

      {/* 3. FIXED: Replaced Box Inputs with exact Document inline layout */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"} 
          <input name="local_unit" className="dotted-input small-input" value={form.local_unit} onChange={handleChange} /> वडा नं. 
          <input name="ward_no" className="dotted-input tiny-input" value={form.ward_no} onChange={handleChange} /> , निवासी <span className="red">*</span> 
          <input name="husband_name_body" className="dotted-input long-input" value={form.husband_name_body} onChange={handleChange} /> को श्रीमति <span className="red">*</span> 
          <input name="wife_name_body" className="dotted-input long-input" value={form.wife_name_body} onChange={handleChange} /> ले विवाह पूर्व 
          
          <select name="pre_marriage_office" className="dotted-input select-input" value={form.pre_marriage_office} onChange={handleChange}>
            <option value="जिल्ला">जिल्ला</option>
            <option value="इलाका">इलाका</option>
          </select> प्रशासन कार्यालय <span className="red">*</span> 
          
          <input name="pre_marriage_district" className="dotted-input medium-input" value={form.pre_marriage_district} onChange={handleChange} /> बाट ना.प्र.नं. <span className="red">*</span> 
          <input name="pre_marriage_prpn_no" className="dotted-input medium-input" value={form.pre_marriage_prpn_no} onChange={handleChange} /> को नेपाली नागरिकताको प्रमाण-पत्र मिति 
          <input type="date" name="pre_marriage_cit_date" className="dotted-input" value={form.pre_marriage_cit_date} onChange={handleChange} /> मा लिनु भई निजको विवाह 
          
          <input name="marriage_district" className="dotted-input small-input" value={form.marriage_district} onChange={handleChange} placeholder="काठमाडौँ" /> जिल्ला 
          <input name="marriage_municipality" className="dotted-input medium-input" value={form.marriage_municipality} onChange={handleChange} placeholder="नगरपालिका" /> वडा नं. <span className="red">*</span> 
          <input name="marriage_ward" className="dotted-input tiny-input" value={form.marriage_ward} onChange={handleChange} /> निवासी <span className="red">*</span> 
          <input name="husband_name" className="dotted-input long-input" value={form.husband_name} onChange={handleChange} /> संग मिति 
          <input type="date" name="marriage_date" className="dotted-input" value={form.marriage_date} onChange={handleChange} /> मा भएको हुँदा निजलाई पतिको थर र ठेगाना राखी नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध गराई दिन हुन सिफारिस साथ अनुरोध छ ।
        </p>
      </div>

      {/* SIGNATURE */}
      <div className="signature-section">
        <div className="signature-block">
          <span className="red-star">*</span>
          <input name="signatory_name" className="line-input full-width-input" value={form.signatory_name} onChange={handleChange} placeholder="नाम" />
          <select name="signatory_position" className="designation-select" value={form.signatory_position} onChange={handleChange}>
            <option value="">| पद छनौट गर्नुहोस् |</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* APPLICANT DETAILS (BOTTOM) */}
      <div className="hide-print">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      {/* FOOTER */}
      <div className="form-footer hide-print">
        <button className="save-print-btn" type="submit" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
        {message && <div style={{ marginTop: 15, color: message.type === "error" ? "crimson" : "green", fontWeight: "bold" }}>{message.text}</div>}
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
      </div>
    </form>
  );
}