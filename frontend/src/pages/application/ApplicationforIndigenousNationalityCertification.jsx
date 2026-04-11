// src/pages/application/ApplicationforIndigenousNationalityCertification.jsx
import React, { useState } from "react";
import "./ApplicationforIndigenousNationalityCertification.css";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  headerDesignation: "",
  headerOffice: "",
  headerDistrict: "",
  bodyDistrict: "",
  palikaName: MUNICIPALITY?.name || "",
  wardNo: "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  tribeName: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const ApplicationforIndigenousNationalityCertification = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.residentName.trim()) return "निवासीको नाम आवश्यक छ";
    if (!formData.guardianName.trim()) return "अभिभावकको नाम आवश्यक छ";
    if (!formData.tribeName.trim()) return "जातिको नाम आवश्यक छ";
    if (!formData.applicantName.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicantPhone.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach(
        (k) => payload[k] === "" && (payload[k] = null),
      );

      // 🔥 1. SAVE TO DATABASE FIRST
      const res = await axios.post(
        "/api/forms/indigenous-certification",
        payload,
      );

      if (res.status === 200 || res.status === 201) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));

        // 🔥 2. CAPTURE COMPLETE FORM HTML WITH ALL DATA
        const container = document.querySelector(".indigenous-container");
        const formHTML = container.outerHTML;

        // 🔥 3. NEW PRINT WINDOW - DATA LOCKED FOREVER
        const printWin = window.open("", "_blank", "width=850,height=1100");
        printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>जनजाति प्रमाणपत्र - Print</title>
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
            .indigenous-container {
              background: white !important;
              background-image: none !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
            }
            
            /* FORCE ALL INPUTS TO SHOW DATA */
            input, select, textarea {
              background: white !important;
              color: black !important;
              -webkit-text-fill-color: black !important;
              border-bottom: 1px solid black !important !important;
              border: 1px solid #333 !important;
              font-family: inherit !important;
              font-size: 14px !important;
              padding: 2px 4px !important;
            }
            
            .certificate-body input,
            .certificate-body select,
            .inline-input,
            .inline-select {
              background: white !important;
              color: black !important;
              border-bottom: 1px solid black !important;
            }
            
            .applicant-details-box input,
            .detail-input {
              background: white !important;
              color: black !important;
              border: 2px solid #333 !important;
              font-size: 14px !important;
            }
            
            /* Hide UI elements */
            .submit-area,
            .submit-btn,
            .top-right-bread,
            button { display: none !important; }
            
            @page { margin: 1cm; }
            @media print {
              body { padding: 10px; }
              input, select { border-bottom: 1px solid black !important; }
            }
          </style>
        </head>
        <body>${formHTML}</body>
        </html>
      `);
        printWin.document.close();

        // 🔥 4. AUTO PRINT & CLOSE
        printWin.onload = () => {
          printWin.focus();
          printWin.print();
          setTimeout(() => printWin.close(), 1000);
        };

        // 🔥 5. RESET MAIN FORM AFTER PRINT
        setTimeout(() => {
          setFormData(initialState);
        }, 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "त्रुटि भयो";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="indigenous-container">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="top-bar-title">
          जनजाति प्रमाणपत्र जारी गर्ने दरखास्त
          <span className="top-right-bread">
            प्रमाणपत्र &gt; जनजाति प्रमाणपत्र
          </span>
        </div>

        {/* श्री */}
        <div className="shree-block">
          <div className="shree-row">
            <span>श्रीमान्</span>
            <input
              name="headerDesignation"
              value={formData.headerDesignation}
              onChange={handleChange}
              className="inline-input name-input"
              placeholder="पद"
            />
            <input
              name="headerOffice"
              value={formData.headerOffice}
              onChange={handleChange}
              className="inline-input name-input"
              placeholder="कार्यालय"
            />
            <span>ज्यू,</span>
          </div>

          <div className="stack-row">
            <input
              type="text"
              name="headerDistrict"
              value={formData.headerDistrict}
              onChange={handleChange}
              className="stack-input"
              placeholder="जिल्ला"
            />
          </div>
        </div>

        {/* Date */}
        <div className="form-group-inline">
          <label>मिति:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Subject */}
        <div className="subject-line">
          विषय: <u>जनजाति प्रमाणित गरि पाउँ।</u>
        </div>

        {/* Body */}
        <p className="certificate-body">
          <input
            name="bodyDistrict"
            value={formData.bodyDistrict}
            onChange={handleChange}
            className="inline-input medium"
          />
          जिल्ला
          <input
            name="palikaName"
            value={formData.palikaName}
            onChange={handleChange}
            className="inline-input medium"
          />
          वडा नं.
          <input
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            className="inline-input small"
          />
          निवासी
          <input
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            className="inline-input long"
          />
          को
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className="inline-select"
          >
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
            <option value="पति">पति</option>
            <option value="पत्नी">पत्नी</option>
          </select>
          म
          <input
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="inline-input long"
          />
          जनजाति अन्तर्गत
          <input
            name="tribeName"
            value={formData.tribeName}
            onChange={handleChange}
            className="inline-input long"
          />
          जातिमा पर्ने भएकोले प्रमाणित गरि पाउन निवेदन पेश गरेको छु।
        </p>

        {/* Applicant Box */}
        <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

        {/* Submit */}
        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationforIndigenousNationalityCertification;
