import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import "./BankAccountForSocialSecurity.css";
import { useWardForm } from "../../hooks/useWardForm";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
// 5
const initialState = {
  // Meta
  chalani_no: "",

  // Addressee
  addressee_name: "",
  addressee_address: "",

  // Body
  old_place: "",
  old_place_type: "", // vdc / municipality
  old_ward_no: "",
  person_name: "",
  relation: "",
  relative_name: "",
  allowance_type: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

const BankAccountForSocialSecurity = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // backend URL - adjust if different
      const res = await axios.post(
        "/api/forms/bank-account-social-security",
        form,
      );
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
    await handleSubmit({ preventDefault: () => {} });
    setTimeout(() => window.print(), 500);
  };
  return (
    <div className="social-security-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सामाजिक सुरक्षाको बैंक खाता खोलिदिने
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षाको बैंक खाता खोलिदिने
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">२०८२/८३</span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input
              name="chalani_no"
              type="text"
              className="dotted-input small-input"
              value={form.chalani_no}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:{" "}
          <span className="underline-text">
            सामाजिक सुरक्षाको बैंक खाता खोलिदिने सिफारिस।
          </span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_name"
            type="text"
            className="line-input medium-input"
            value={form.addressee_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addressee-row">
          <input
            name="addressee_address"
            type="text"
            className="line-input medium-input"
            value={form.addressee_address}
            onChange={handleChange}
            required
          />
          <span>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत बिषयमा साविक
          <input
            name="old_place"
            type="text"
            className="inline-box-input medium-box"
            value={form.old_place}
            onChange={handleChange}
          />
          <select
            name="old_place_type"
            className="inline-select"
            value={form.old_place_type}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="vdc">गा.वि.स.</option>
            <option value="mun">नगरपालिका</option>
          </select>
          वडा नं{" "}
          <input
            name="old_ward_no"
            type="text"
            className="inline-box-input tiny-box"
            value={form.old_ward_no}
            onChange={handleChange}
            required
          />
          भई हाल{" "}
          <span className="bold-text underline-text">{MUNICIPALITY.name}</span>
          वडा नं वडा नं{" "}
          <span className="bold-text underline-text">
            {MUNICIPALITY.wardNumber}
          </span>
          बस्ने
          <input
            name="person_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.person_name}
            onChange={handleChange}
            required
          />
          को
          <select
            name="relation"
            className="inline-select"
            value={form.relation}
            onChange={handleChange}
          >
            <option value="">छान्नुहोस्</option>
            <option value="श्रीमान">श्रीमान</option>
            <option value="श्रीमती">श्रीमती</option>
            <option value="बुबा">बुबा</option>
            <option value="आमा">आमा</option>
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>
          <input
            name="relative_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.relative_name}
            onChange={handleChange}
            required
          />
          ले नेपाल सरकारबाट प्राप्त हुने सामाजिक सुरक्षा
          <select
            name="allowance_type"
            className="inline-select"
            value={form.allowance_type}
            onChange={handleChange}
          >
            <option value="">छान्नुहोस्</option>
            <option value="ज्येष्ठ नागरिक">ज्येष्ठ नागरिक</option>
            <option value="एकल महिला">एकल महिला</option>
            <option value="अपाङ्गता">अपाङ्गता</option>
            <option value="बाल पोषण">बाल पोषण</option>
          </select>
          भत्ता बैंक बाट पाउनका लागी ताहाँको बैंकमा बैंक खाता खोल्नु पर्ने
          भएकाले निजलाई बैंक खाता खोली दिनु हुन सिफारीशका साथ अनुरोध गरिन्छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <div className="inline-input-wrapper">
            <span className="input-required-star">*</span>
            <input
              name="signer_name"
              type="text"
              className="line-input full-width-input"
              required
              value={form.signer_name}
              onChange={handleChange}
            />
          </div>
          <select
            name="signer_designation"
            className="designation-select"
            value={form.signer_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
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

export default BankAccountForSocialSecurity;
