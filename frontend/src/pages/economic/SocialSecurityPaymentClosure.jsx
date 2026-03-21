import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import './SocialSecurityPaymentClosure.css';
import { useAuth } from "../../context/AuthContext";

import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
// 7
const initialState = {
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const SocialSecurityPaymentClosure = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/domestic-animal", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState); // reset form on success
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    await handleSubmit(new Event("submit"));
    setTimeout(() => {
      window.print();
    }, 500);
  };
  return (
    <div className="closure-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिदिने
        <span className="top-right-bread">आर्थिक &gt; सामाजिक सुरक्षा भत्ता रकम भुक्तानी</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">{MUNICIPALITY.wardNumber} नं. वडा कार्यालय</h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>पत्र संख्या : <span className="bold-text">२०८२/८३</span></p>
          <p>चलानी नं. : <input type="text" className="dotted-input small-input" /></p>
        </div>
        <div className="meta-right">
          <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिदिने</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input type="text" className="line-input medium-input" required />
        </div>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" required />
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" required /> साविक <input type="text" className="inline-box-input medium-box" /> वडा नं. <input type="text" className="inline-box-input tiny-box" required /> बाट आ.व. 
          <input type="text" className="inline-box-input medium-box" required /> को <input type="text" className="inline-box-input medium-box" required /> बापतको सामाजिक सुरक्षा भत्ता प्राप्त गर्ने तपसिल बमोजिमको लाभग्राहीको मिति 
          २०८२-०८-०६ मा मृत्यु भएको हुँदा उक्त लाभग्राहीको नाममा जम्मा भएको सामाजिक सुरक्षा भत्ता रकम कानुन बमोजिम निजको हकवाला ना.प्र.नं. 
          <input type="text" className="inline-box-input medium-box" required /> जारी मिति २०८२-०८-०६ भएको <input type="text" className="inline-box-input medium-box" required /> लाई उपलब्ध गरि निज मृतकको खाता बन्द गरिदिन हुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
          <table className="closure-table">
              <thead>
                  <tr>
                      <th style={{width: '5%'}}>क्र.सं.</th>
                      <th style={{width: '20%'}}>नाम थर</th>
                      <th style={{width: '15%'}}>ना.प्र.नं</th>
                      <th style={{width: '15%'}}>पाउने रकम</th>
                      <th style={{width: '15%'}}>फिर्ता रकम</th>
                      <th style={{width: '15%'}}>लाभग्राही नं</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>१</td>
                      <td><input type="text" className="table-input" required /></td>
                      <td><input type="text" className="table-input" required /></td>
                      <td><input type="text" className="table-input" required /></td>
                      <td><input type="text" className="table-input" required /></td>
                      <td><input type="text" className="table-input" required /></td>
                  </tr>
              </tbody>
          </table>
           {/* Scrollbar visual cue */}
        <div className="fake-scrollbar">
            <div className="scroll-thumb"></div>
        </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
             <option>पद छनौट गर्नुहोस्</option>
             <option>वडा अध्यक्ष</option>
             <option>वडा सचिव</option>
             <option>कार्यवाहक वडा अध्यक्ष</option>
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

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default SocialSecurityPaymentClosure;