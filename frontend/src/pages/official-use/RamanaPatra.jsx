import React, { useState } from "react";
import "./RamanaPatra.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "ramana-patra";
const API_URL = `/api/forms/${FORM_KEY}`;

export default function RamanaPatra() {
  const [form, setForm] = useState({
    letter_no: "२०८२/८३",
    reference_no: "",
    date: "२०८२-१२-१८",
    recipient_name: "",
    recipient_address: "",
    
    // Narrative Body
    decision_no: "",
    decision_date: "",
    emp_post: "",
    emp_name: "",
    transfer_office: "",
    transfer_date: "",
    attendance_date: "",

    // Numbered List Data
    point1_name: "",
    point2_signal: "",
    point3_a_level: "",
    point3_b_class: "",
    point3_c_service: "",
    point4_a_birth_date: "",
    point4_b_birth_dist: "",
    point5_appoint_date: "",
    point6_promotion_date: "",
    point7_a_salary: "",
    point7_b_grade: "",
    point8_a_provident: "",
    point8_b_investment: "",
    point9_pan: "",
    point10_leave: "",
    point11_med_claim: "",
    point12_loan: "",
    point13_last_payment_date: "",
    point14_a_social_tax: "",
    point14_b_income_tax: "",
    point15_travel_allowance: "",
    point16_other: "",

    bodartha: "",
    signatory_name: "",
    signatory_position: ""
  });

  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  return (
    <div className="ramana-patra-container">
      <div className="top-bar-title">
        रमाना पत्र ।
        <span className="top-right-bread">आधिकारिक प्रयोग &gt; रमाना पत्र</span>
      </div>

      <form>
        {/* Header Section */}
        <header className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.jpg" alt="logo" /></div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">{MUNICIPALITY.ward} नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </header>

        {/* Metadata */}
        <div className="meta-data-row">
          <div className="meta-left">
            <p>पत्र संख्या: <input className="dotted-input" value={form.letter_no} onChange={update("letter_no")} /></p>
            <p>चलानी नं.: <input className="dotted-input" value={form.reference_no} onChange={update("reference_no")} /></p>
          </div>
          <div className="meta-right">
            <p>मिति: <input className="dotted-input" value={form.date} onChange={update("date")} /></p>
            <p className="ne-sambat">ने.सं ११४६ चौलागा, २४ शनिबार</p>
          </div>
        </div>

        <div className="subject-section center-text">
          <h3 className="underline-text">विषय: रमाना पत्र ।</h3>
        </div>

        {/* Recipient */}
        <div className="addressee-section">
          श्री <input className="dotted-input medium-input" value={form.recipient_name} onChange={update("recipient_name")} /> ज्यू,
          <br /><input className="dotted-input long-input" value={form.recipient_address} onChange={update("recipient_address")} />
        </div>

        {/* Narrative Paragraph */}
        <div className="body-paragraph">
          यस कार्यालयको निर्णय नं <input className="dotted-input tiny-input" value={form.decision_no} /> मिति <input className="dotted-input" value={form.decision_date} /> को निर्णय अनुसार 
          <span className="red-label"> Employee Designation: </span> <input className="dotted-input" value={form.emp_post} /> 
          <span className="red-label"> Employee Name: </span> <input className="dotted-input" value={form.emp_name} /> लाई यस कार्यालयबाट 
          मिति <input className="dotted-input" value={form.transfer_date} /> देखि लागू हुने गरी 
          <input className="dotted-input long-input" value={form.transfer_office} /> मा सरुवा/काजमा खटाई पठाइएको हुनाले देहाय बमोजिमको विवरण खुलाई रमाना दिइएको व्यहोरा अनुरोध छ ।
        </div>

        {/* The 16 Points Numbered Section */}
        <div className="numbered-details">
          <div className="num-row">१. कर्मचारीको नाम थर : <input className="dotted-input long-input" value={form.point1_name} onChange={update("point1_name")} /></div>
          
          <div className="num-row">२. कर्मचारीको संकेत नम्बर : <input className="dotted-input" value={form.point2_signal} onChange={update("point2_signal")} /></div>
          
          <div className="num-row">
            ३. साविक (अ) तह : <input className="dotted-input tiny-input" /> (आ) श्रेणी : <input className="dotted-input tiny-input" /> (इ) सेवा : <input className="dotted-input" />
          </div>
          
          <div className="num-row">
            ४. जन्म मिति (वि.सं.) : <input className="dotted-input" /> (ई.सं.) : <input className="dotted-input" /> जिल्ला : <input className="dotted-input" />
          </div>
          
          <div className="num-row">५. नियुक्ति मिति : <input className="dotted-input" /></div>
          
          <div className="num-row">
            ६. खाइपाई आएको (अ) मासिक तलब रु. : <input className="dotted-input" /> (आ) ग्रेड दर रु. : <input className="dotted-input" /> 
          </div>
          
          <div className="num-row">
            ७. सञ्चय कोष कट्टी नम्बर : <input className="dotted-input" />
          </div>

          <div className="num-row">
            ८. नागरिक लगानी कोष कट्टी : <input className="dotted-input" />
          </div>

          <div className="num-row">९. व्यक्तिगत प्यान नम्बर : <input className="dotted-input" /></div>

          <div className="num-row">१०. बिदाको विवरण : <input className="dotted-input long-input" /></div>

          <div className="num-row">११. औषधि उपचार बापत बाँकी रकम रु. : <input className="dotted-input" /></div>

          <div className="num-row">१२. ऋण वा सापटी केहि भए : <input className="dotted-input long-input" /></div>

          <div className="num-row">१३. तलब भत्ता भुक्तानी भएको अन्तिम मिति : <input className="dotted-input" /></div>

          <div className="num-row">
            १४. (अ) सामाजिक सुरक्षा कर कट्टी : <input className="dotted-input" /> (आ) आयकर कट्टी : <input className="dotted-input" />
          </div>

          <div className="num-row">१५. भ्रमण खर्च एवं पेश्की बाँकी : <input className="dotted-input" /></div>

          <div className="num-row">१६. अन्य केहि भए : <input className="dotted-input long-input" /></div>
        </div>

        {/* Bodartha / Editor Area */}
        <div className="editor-section">
          <h4>बोधार्थ:</h4>
          <textarea className="editor-textarea" rows={6} value={form.bodartha} onChange={update("bodartha")} />
        </div>

        {/* Signature Area */}
        <div className="signature-section">
          <div className="signature-block">
            <input className="line-input" value={form.signatory_name} onChange={update("signatory_name")} placeholder="दस्तखत" />
            <select className="designation-select" value={form.signatory_position} onChange={update("signatory_position")}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={update} />

        <div className="form-footer">
          <button type="submit" className="save-print-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </form>
    </div>
  );
}