// RequestforCertificationMotherFather.jsx
import React, { useState } from "react";
import axios from "axios";
import "./RequestforCertificationMotherFather.css";

const initialState = {
  date: "२०८२.०७.१५",
  headerDistrict: "काठमाडौँ",
  mainDistrict: "काठमाडौँ",
  palikaName: "",
  wardNo: "",
  residentName: "",
  relation: "छोरा",
  guardianName: "",
  doc1Detail: "",
  doc2Detail: "",
  sigName: "",
  sigAddress: "",
  sigMobile: "",
  sigSignature: "",
};

const RequestforCertificationMotherFather = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (fd) => {
    if (!fd.mainDistrict?.trim()) return "मुख्य जिल्ला भर्नुहोस्";
    if (!fd.palikaName?.trim()) return "पालिका/नगरपालिका भर्नुहोस्";
    if (!fd.wardNo?.trim()) return "वडा नं. भर्नुहोस्";
    if (!fd.residentName?.trim()) return "निवेदकको नाम भर्नुहोस्";
    if (!fd.guardianName?.trim()) return "वुवा/आमाको नाम भर्नुहोस्";
    if (!fd.doc1Detail?.trim()) return "निवेदकको नागरिकताको विवरण भर्नुहोस्";
    if (!fd.doc2Detail?.trim()) return "वुवा/आमाको नागरिकताको विवरण भर्नुहोस्";
    if (!fd.sigName?.trim()) return "दस्तखत गर्नेको नाम भर्नुहोस्";
    if (!fd.sigMobile?.trim()) return "मोबाइल नम्बर भर्नुहोस्";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const err = validate(formData);
    if (err) {
      alert("कृपया: " + err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });

      const url = "/api/forms/request-for-certification-mf";
      const res = await axios.post(url, payload);

      if (res.status === 201 || res.status === 200) {
        alert("रेकर्ड सेभ भयो। ID: " + (res.data?.id ?? ""));
        setFormData(initialState);
      } else {
        alert("अनपेक्षित प्रतिक्रिया: " + JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || error.message || "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="request-cert-mf-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="header-to-group">
            <h3>श्रीमान् प्रमुख जिल्ला अधिकारीज्यु,</h3>
            <input type="text" name="headerDistrict" value={formData.headerDistrict} onChange={handleChange} required />
          </div>
          <div className="form-group date-group">
            <label>मिति :</label>
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>प्रमाणित गरि पाउँ ।</u></strong>
        </div>

        <p className="certificate-body">
          <input type="text" name="mainDistrict" value={formData.mainDistrict} onChange={handleChange} required />
          जिल्ला
          <input type="text" name="palikaName" placeholder="गाउँपालिका/नगरपालिका" value={formData.palikaName} onChange={handleChange} required />
          वडा नं.
          <input type="text" name="wardNo" placeholder="वडा" value={formData.wardNo} onChange={handleChange} required className="short-input" />
          निवासी
          <input type="text" name="residentName" placeholder="निवासीको नाम" value={formData.residentName} onChange={handleChange} required />
          को
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </select>
          म
          <input type="text" name="guardianName" placeholder="वुवा/आमाको नाम" value={formData.guardianName} onChange={handleChange} required />
          को नागरिकता प्रमाणपत्रमा
          <input type="text" name="doc1Detail" placeholder="निवेदकको नागरिकता विवरण" value={formData.doc1Detail} onChange={handleChange} required />
          भएको र वुवा/आमाको नागरिकतामा
          <input type="text" name="doc2Detail" placeholder="वुवा/आमाको नागरिकता विवरण" value={formData.doc2Detail} onChange={handleChange} required />
          भई फरक परे पनि हामीहरु बाबु, आमा र छोरा भएकोले सोही व्यहोरा प्रमाणित गरि पाउन, वडा कार्यालयको सिफारिस र कागजात संलग्न राखी यो निवेदन पेश गरेको छु ।
        </p>

        <div className="signature-section-left">
          <h4>निवेदक</h4>
          <div className="form-group-column">
            <label>नामथर: *</label>
            <input type="text" name="sigName" value={formData.sigName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>ठेगाना: *</label>
            <input type="text" name="sigAddress" value={formData.sigAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>मोबाइल नं: *</label>
            <input type="text" name="sigMobile" value={formData.sigMobile} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>हस्ताक्षर:</label>
            <input type="text" name="sigSignature" value={formData.sigSignature} onChange={handleChange} />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestforCertificationMotherFather;
