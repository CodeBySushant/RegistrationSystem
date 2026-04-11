// src/pages/application/ApplicationforKhasAryaCasteCertification.jsx
import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./ApplicationforKhasAryaCasteCertification.css";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDistrict: "",
  mainDistrict: "",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  casteName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const ApplicationforKhasAryaCasteCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔥 FIXED VALIDATION - No sigMobile!
  const validate = () => {
    if (!formData.headerDistrict?.trim()) return "हेडर जिल्ला आवश्यक छ";
    if (!formData.mainDistrict?.trim()) return "मुख्य जिल्ला आवश्यक छ";
    if (!formData.residentName?.trim()) return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName?.trim()) return "अभिभावकको नाम आवश्यक छ";
    if (!formData.casteName?.trim()) return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + error);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => payload[k] === "" && (payload[k] = null));

      // 🔥 1. SAVE TO DATABASE FIRST
      const res = await axios.post("/api/forms/khas-arya-certification", payload);

      if (res.status === 200 || res.status === 201) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        
        // 🔥 2. CAPTURE COMPLETE FORM WITH DATA
        const container = document.querySelector('.khas-arya-cert-container');
        const formHTML = container.outerHTML;
        
        // 🔥 3. CREATE PRINT WINDOW WITH LOCKED DATA
        const printWin = window.open('', '_blank', 'width=850,height=1100,scrollbars=yes');
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>खस आर्य जाति प्रमाणपत्र - Print</title>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Arial', sans-serif; 
                font-size: 14px; 
                line-height: 1.6;
                background: white;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
              }
              .khas-arya-cert-container {
                background: white !important;
                background-image: none !important;
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                max-width: none !important;
              }
              
              /* Force ALL inputs to show data */
              input, select {
                background: white !important;
                color: black !important;
                -webkit-text-fill-color: black !important;
                border-bottom: 1px solid black !important;
                border: 1px solid #333 !important;
                font-family: inherit !important;
                font-size: inherit !important;
              }
              
              .certificate-body input,
              .certificate-body select {
                background: white !important;
                color: black !important;
                border-bottom: 1px solid black !important;
              }
              
              .applicant-details-box input {
                background: white !important;
                color: black !important;
                border: 2px solid #333 !important;
              }
              
              /* Hide buttons */
              .submit-area,
              .submit-btn,
              .top-right-bread { display: none !important; }
              
              @media print {
                body { padding: 10px; }
                input, select { border-bottom: 1px solid black !important; }
              }
              
              /* Copy your existing CSS here */
              ${document.querySelectorAll('style').length > 0 
                ? Array.from(document.querySelectorAll('style'))
                  .map(style => style.innerHTML).join('\n')
                : ''}
            </style>
          </head>
          <body>${formHTML}</body>
          </html>
        `);
        printWin.document.close();
        
        // 🔥 4. AUTO PRINT
        printWin.onload = () => {
          printWin.focus();
          printWin.print();
          // Auto close after print
          setTimeout(() => printWin.close(), 1000);
        };
        
        // 🔥 5. RESET FORM AFTER PRINT
        setTimeout(() => {
          setFormData(initialState);
        }, 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="khas-arya-cert-container">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="header-row">
          <MunicipalityHeader showLogo />
        </div>

        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
            />
          </div>
          <div className="form-group date-group">
            <label>मिति :</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>खस आर्य जाति प्रमाणित गरि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          <input
            type="text"
            name="mainDistrict"
            value={formData.mainDistrict}
            onChange={handleChange}
          />
          जिल्ला
          <input
            type="text"
            name="palikaName"
            value={formData.palikaName}
            onChange={handleChange}
          />
          वडा नं.
          <input
            type="text"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            className="short-input"
          />
          निवासी
          <input
            type="text"
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
          />
          को
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
            <option value="पति">पति</option>
            <option value="पत्नी">पत्नी</option>
          </select>
          म
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
          />
          खस आर्य जाति अन्तर्गत
          <input
            type="text"
            name="casteName"
            value={formData.casteName}
            onChange={handleChange}
          />
          जातिमा पर्ने भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको
          सिफारिस, नागरिकता प्रमाणपत्रको फोटोकपी सहित रु १०।- को टिकट टाँसी यो
          निवेदन पेश गरेको छु ।
        </p>

        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationforKhasAryaCasteCertification;