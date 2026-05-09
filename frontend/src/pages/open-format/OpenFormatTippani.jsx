import React, { useState } from "react";
import axios from "../../utils/axiosInstance"; // ✅ Fixed
import { useWardForm } from "../../hooks/useWardForm"; // ✅ Added
import "./OpenFormatTippani.css";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext"; // ✅ Added
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp"; // ✅ Optional

const initialState = {
  date: "",
  addressee: "",
  subject: "",
  body_text: "",
  archive: false,
  approve: false,
  signature_name: "",
  signature_designation: "",
};

const OpenFormatTippani = () => {
  const { form, setForm, handleChange } = useWardForm(initialState); // ✅ Hook
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // ✅ Dynamic ward

  const handlePrint = async () => { // ✅ Print + Save
    // ✅ Skip date validation
    const submitData = {
      ...form,
      date: form.date || null  // ✅ Safe date handling
    };

    setLoading(true);
    try {
      const res = await axios.post("/api/forms/open-format-tippani", submitData);
      if (res.status === 201) {
        alert("सफल! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      alert("त्रुटि: " + (err.response?.data?.message || "पठाउन सकिएन"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tippani-outer-wrapper">
      <form className="tippani-container">
        <div className="top-bar-title">
          टिप्पणी
          <span className="top-right-bread">खुला ढाँचा &gt; टिप्पणी</span>
        </div>

        {/* ✅ DYNAMIC HEADER */}
        <div className="form-header-section">
          <div className="header-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Logo" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
            <h2 className="ward-title">
              {user?.role === "SUPERADMIN" 
                ? "सबै वडा कार्यालय"
                : user?.ward 
                  ? `वडा नं. ${user.ward} वडा कार्यालय`
                  : "वडा कार्यालय"
              }
            </h2>
            <p className="address-text">{MUNICIPALITY.officeLine}</p>
            <p className="province-text">{MUNICIPALITY.provinceLine}</p>
            <h3 className="certificate-title red-text">टिप्पणी र आदेश</h3>
          </div>
        </div>

        <div className="date-section-row">
          मिति : 
          <input 
            name="date" 
            type="text" 
            className="dotted-input" 
            value={form.date} 
            onChange={handleChange} 
          />
        </div>

        <div className="addressee-subject-section">
          <div className="addressee-row">
            <span>श्रीमान्</span>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input 
                name="addressee" 
                type="text" 
                className="dotted-input large-input" 
                value={form.addressee} 
                onChange={handleChange} 
              />
            </div>
            <span>,</span>
          </div>

          <div className="subject-block">
            <label>विषय:</label>
            <div className="inline-input-wrapper">
              <span className="input-required-star">*</span>
              <input 
                name="subject" 
                type="text" 
                className="dotted-input large-input" 
                value={form.subject} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div className="editor-area">
          <div className="rich-editor-mock">
            <div className="editor-toolbar">
              <div className="toolbar-left">File Edit View Insert Format Tools Table Help</div>
            </div>
            <textarea
              name="body_text"
              className="editor-textarea"
              value={form.body_text}
              onChange={handleChange}
              placeholder="यहाँ टिप्पणी लेख्नुहोस्..."
            />
          </div>
        </div>

        <div className="checkbox-signature-grid">
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input 
                name="archive" 
                type="checkbox" 
                checked={form.archive} 
                onChange={handleChange} 
              /> 
              अर्को थप्नुहोस्
            </label>
            <label className="checkbox-item">
              <input 
                name="approve" 
                type="checkbox" 
                checked={form.approve} 
                onChange={handleChange} 
              /> 
              स्वीकृत गर्नुहोस्
            </label>
          </div>

          <div className="approver-block">
            <label className="certifier-label">प्रमाणीत गर्ने</label>
            <div className="inline-input-wrapper full-width">
              <span className="input-required-star">*</span>
              <input 
                name="signature_name" 
                type="text" 
                className="dotted-input full-width" 
                value={form.signature_name} 
                onChange={handleChange} 
              />
            </div>
            <select 
              name="signature_designation" 
              className="designation-select" 
              value={form.signature_designation} 
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <button 
            type="button" 
            className="save-print-btn" 
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
};

export default OpenFormatTippani;