// src/pages/PassbookOfConstructionWork.jsx
import React, { useState, useRef } from "react";
import "./PassbookOfConstructionWork.css";
import axiosInstance from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const FORM_KEY = "passbook-construction-work";
const API_URL = `/api/forms/${FORM_KEY}`;

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  reg_date: todayIso(),
  business_name: "",
  owner_name: "",
  phone: "",
  work_description: "",
  remarks: "",
  notes: "",
};

const PassbookOfConstructionWork = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [scanFile, setScanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const printRef = useRef(null);

  const update = (k) => (e) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setScanFile(e.target.files[0] || null);
  };

  const validate = () => {
    if (!form.business_name.trim()) return "व्यवसाय वा फार्मको नाम आवश्यक छ।";
    if (!form.owner_name.trim()) return "व्यवसाय वा फार्मको मालिक आवश्यक छ।";
    if (!form.phone.trim()) return "टेलिफोन नं. आवश्यक छ।";
    if (!form.work_description.trim()) return "कार्यको विवरण आवश्यक छ।";
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
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v));
      if (scanFile) payload.append("scan_file", scanFile);

      const res = await axiosInstance.post(API_URL, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const savedId = res.data?.id || "unknown";
      setMessage({ type: "success", text: `रेकर्ड सफलतापूर्वक सेभ भयो (id: ${savedId})` });

      // Trigger print after successful save
      setTimeout(() => window.print(), 300);

      // Reset form after print
      setForm({ ...initialForm, reg_date: todayIso() });
      setScanFile(null);
    } catch (err) {
      const info = err.response?.data?.message || err.message || "Failed to save";
      setMessage({ type: "error", text: `Error: ${info}` });
      console.error("submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passbook-container" ref={printRef}>
      {/* Top bar — hidden on print */}
      <div className="top-bar-header no-print">
        <h1>निर्माण कार्यको पासबुक</h1>
        <button type="button" className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>

      {/* Print-only header */}
      <div className="print-only">
        <MunicipalityHeader showLogo={true} />
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>निर्माण कार्यको पासबुक</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-card">
          <div className="form-group-row">
            <label className="form-label">दर्ताको मिति</label>
            <div className="input-wrapper">
              <input
                type="date"
                value={form.reg_date}
                onChange={update("reg_date")}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="form-label">व्यवसाय वा फार्मको नाम <span className="required-asterisk">*</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                value={form.business_name}
                onChange={update("business_name")}
                placeholder="व्यवसाय वा फार्मको नाम"
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="form-label">व्यवसाय वा फार्मको मालिक <span className="required-asterisk">*</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                value={form.owner_name}
                onChange={update("owner_name")}
                placeholder="मालिकको नाम"
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="form-label">टेलिफोन नं. <span className="required-asterisk">*</span></label>
            <div className="input-wrapper">
              <input
                type="tel"
                className="form-input"
                value={form.phone}
                onChange={update("phone")}
                placeholder="टेलिफोन नम्बर"
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="form-label">कार्यको विवरण <span className="required-asterisk">*</span></label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                value={form.work_description}
                onChange={update("work_description")}
                placeholder="कार्यको विवरण"
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="form-label">कैफियत</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                value={form.remarks}
                onChange={update("remarks")}
                placeholder="कैफियत (ऐच्छिक)"
              />
            </div>
          </div>

          <div className="form-group-row no-print">
            <label className="form-label">स्क्यान फाइल</label>
            <div className="input-wrapper file-upload-wrapper">
              <input
                type="file"
                id="scanFile"
                className="file-input"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="scanFile" className="file-label-text">
                <span className="choose-file-btn">Choose File</span>
                {scanFile ? scanFile.name : "No file chosen"}
              </label>
            </div>
          </div>
        </div>

        <div className="form-footer no-print">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ गर्नुहोस"}
          </button>
        </div>

        {message && (
          <div
            className="no-print"
            style={{
              textAlign: "center",
              marginTop: 12,
              color: message.type === "error" ? "crimson" : "green",
              fontWeight: "bold",
            }}
          >
            {message.text}
          </div>
        )}
      </form>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default PassbookOfConstructionWork;