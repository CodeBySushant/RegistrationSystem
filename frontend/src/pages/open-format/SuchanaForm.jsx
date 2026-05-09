import React, { useState } from "react";
import "./SuchanaForm.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const SuchanaForm = () => {
  const [form, setForm] = useState({
    patra_sankhya: "२०८२/८३",
    suchana_no: "",
    date_nepali: "२०८२-१२-१८",
    header_title: "सूचना !!! सूचना !!! सूचना !!!",
    subject: "",
    additional_info: "",
    body_text: "",
    signatory_name: "",
    signatory_designation: ""
  });

  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  // ✅ ADD THIS SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Basic validation
    if (!form.suchana_no || !form.signatory_name) {
      alert("सूचना नं. र हस्ताक्षरकर्ताको नाम आवश्यक छ!");
      return;
    }

    setLoading(true);
    
    try {
      // Optional: Save to backend
      // await saveFormData(form);
      
      // Trigger print dialog
      window.print();
    } catch (error) {
      console.error("Error:", error);
      alert("केही गडबड भयो!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <form className="suchana-paper-container" onSubmit={handleSubmit}>
        {/* Official Header */}
        <header className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.jpg" alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">{MUNICIPALITY.ward} नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </header>

        {/* Metadata Row */}
        <div className="meta-data-row">
          <div className="meta-left">
            <div>पत्र संख्या : <input type="text" className="dotted-input" value={form.patra_sankhya} onChange={update("patra_sankhya")} /></div>
            <div>सूचना नं. : <span className="red">*</span> <input type="text" className="dotted-input" value={form.suchana_no} onChange={update("suchana_no")} required /></div>
          </div>
          <div className="meta-right">
            <div>मिति : <input type="text" className="dotted-input" value={form.date_nepali} onChange={update("date_nepali")} /></div>
            <p className="nepali-date-string">ने.सं. ११४६ चौलागा, २४ शनिबार</p>
          </div>
        </div>

        {/* Main Subject Boxes */}
        <div className="suchana-title-box">
          <input className="title-input-box" value={form.header_title} onChange={update("header_title")} />
        </div>

        <div className="info-grid-row">
           <textarea placeholder="थप जानकारी..." className="info-box-left" value={form.additional_info} onChange={update("additional_info")} />
           <div className="subject-box-center">
             <input placeholder="विषय थप्नुहोस्" className="subject-input-main" value={form.subject} onChange={update("subject")} />
           </div>
        </div>

        {/* Editor Area */}
        <div className="rich-editor-mock">
          <div className="editor-toolbar">
            <span>File Edit View Insert Format Tools Table Help</span>
            <span className="upgrade-btn">⚡ Upgrade</span>
          </div>
          <textarea className="editor-textarea" value={form.body_text} onChange={update("body_text")} placeholder="सूचनाको व्यहोरा यहाँ लेख्नुहोस्..." />
          <div className="word-count">0 words</div>
        </div>

        {/* Signature */}
        <div className="signature-section">
           <div className="signature-block">
              <div className="required-wrapper">
                <span className="star">*</span>
                <input type="text" className="dotted-input full-width" value={form.signatory_name} onChange={update("signatory_name")} required />
              </div>
              <select className="designation-select" value={form.signatory_designation} onChange={update("signatory_designation")}>
                <option value="">पद छनौट गर्नुहोस्</option>
                <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
                <option value="वडा सचिव">वडा सचिव</option>
              </select>
           </div>
        </div>

        <div className="footer-button-container">
          <button 
            type="submit" 
            className="save-print-btn"
            disabled={loading}
          >
            {loading ? "प्रिन्ट गर्दैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="bottom-copyright">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
};

export default SuchanaForm;