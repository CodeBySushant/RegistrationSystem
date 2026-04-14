import React, { useState } from "react";
import "./SocialSecurityViaGuardian.css";

import { useWardForm } from "../../hooks/useWardForm";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
// 8
const initialState = {
  // Applicant
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",

  // Addressee
  addressee_office: "",
  addressee_ward: "",

  // Main body
  applicant_request_name: "", // (your plan_name rename better)
  ward_chairperson_name: "",
  beneficiary_name: "",
  relation: "",
  guardian_name: "",

  // Beneficiary details
  beneficiary_full_name: "",
  beneficiary_issue_district: "",
  beneficiary_issue_date: "२०८२-०८-०६",
  beneficiary_citizenship_no: "",
  beneficiary_account_no: "",

  // Guardian details
  guardian_full_name: "",
  guardian_issue_district: "",
  guardian_issue_date: "२०८२-०८-०६",
  guardian_citizenship_no: "",
  guardian_account_no: "",

  // Signature
  signer_name: "",
  signer_designation: "",
};

const SocialSecurityViaGuardian = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/social-security-guardian", form);
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
    setLoading(true);
    try {
      const res = await axios.post("/api/forms/social-security-guardian", form);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print(); // ✅ print first
        setForm(initialState); // ✅ reset AFTER print
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="guardian-allowance-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध गराउने सम्बन्धमा ।
        <span className="top-right-bread">
          आर्थिक &gt; संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध गराउने
          सम्बन्धमा ।
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
            {MUNICIPALITY.wardNumber} नं. वडा कार्यालय
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
            <input type="text" className="dotted-input small-input" />
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
            संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध गराउने सम्बन्धमा ।
          </span>
        </p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <div className="addressee-row">
          <span>श्री</span>
          <input
            name="addressee_office"
            type="text"
            className="line-input large-input"
            value={form.addressee_office}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addressee-row">
          <input
            name="addressee_ward"
            type="text"
            className="line-input medium-input"
            value={form.addressee_ward}
            onChange={handleChange}
          />
          <span>।</span>
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          उपरोक्त सम्बन्धमा निवेदक श्री{" "}
          <input
            name="applicant_request_name"
            type="text"
            className="inline-box-input long-box"
            value={form.applicant_request_name}
            onChange={handleChange}
            required
          />{" "}
          को माग माथि आवश्यक स्थलगत अवलोकन गरी बुझ्दा निज निवेदक को निवेदन सही
          साँचो रहेको बुझिएकोले पछी आईपर्न सम्पूर्ण कानूनी र आर्थिक जवाफदेहिता म
          वडा अध्यक्ष{" "}
          <input
            name="ward_chairperson_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.ward_chairperson_name}
            onChange={handleChange}
            required
          />{" "}
          ले बहन गर्ने गरी सामाजिक सुरक्षा लाभग्राही श्री{" "}
          <input
            name="beneficiary_name"
            type="text"
            className="inline-box-input long-box"
            value={form.beneficiary_name}
            onChange={handleChange}
            required
          />{" "}
          को संरक्षक निजको परिवार सदस्य
          <select
            name="relation"
            className="inline-select"
            value={form.relation}
            onChange={handleChange}
          >
            <option value="">छान्नुहोस्</option>
            <option value="श्रीमान">श्रीमान</option>
            <option value="श्रीमती">श्रीमती</option>
            <option value="छोरा">छोरा</option>
            <option value="बुहारी">बुहारी</option>
            <option value="नाति">नाति</option>
          </select>
          नाता पर्ने श्री{" "}
          <input
            name="guardian_name"
            type="text"
            className="inline-box-input long-box"
            value={form.guardian_name}
            onChange={handleChange}
            required
          />{" "}
          लाई संरक्षक सिफारिस गर्दछु ।
        </p>
      </div>

      {/* --- Beneficiary Details Section --- */}
      <div className="details-section">
        <h3 className="section-title underline-text">लाभग्राही विवरण</h3>
        <div className="details-grid-2-col">
          <div className="form-group-row">
            <label>नाम :</label>
            <input
              name="beneficiary_full_name"
              type="text"
              className="dotted-input full-width"
              value={form.beneficiary_full_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row empty-label"></div>{" "}
          {/* Spacer for grid alignment */}
          <div className="form-group-row">
            <label>
              जारी जिल्ला : <span className="red">*</span>
            </label>
            <input
              name="beneficiary_issue_district"
              type="text"
              className="dotted-input full-width"
              value={form.beneficiary_issue_district}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row">
            <label>जारी मिति :</label>

            <input
              name="beneficiary_issue_date"
              type="text"
              className="dotted-input full-width"
              value={form.beneficiary_issue_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row">
            <label>
              ना.प्र. नं. : <span className="red">*</span>
            </label>
            <input
              name="beneficiary_citizenship_no"
              type="text"
              className="dotted-input full-width"
              value={form.beneficiary_citizenship_no}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row empty-label"></div>
          <div className="form-group-row">
            <label>
              खाता नम्बर : <span className="red">*</span>
            </label>
            <input
              name="beneficiary_account_no"
              type="text"
              className="dotted-input full-width"
              value={form.beneficiary_account_no}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* --- Guardian Details Section --- */}
      <div className="details-section mt-30">
        <h3 className="section-title underline-text">संरक्षकको विवरण :</h3>
        <div className="details-grid-2-col">
          <div className="form-group-row">
            <label>नाम :</label>
            <input
              name="guardian_full_name"
              type="text"
              className="dotted-input full-width"
              value={form.guardian_full_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row empty-label"></div>
          <div className="form-group-row">
            <label>
              जारी जिल्ला : <span className="red">*</span>
            </label>
            <input
              name="guardian_issue_district"
              type="text"
              className="dotted-input full-width"
              value={form.guardian_issue_district}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row">
            <label>जारी मिति :</label>

            <input
              name="guardian_issue_date"
              type="text"
              className="dotted-input full-width"
              value={form.guardian_issue_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row">
            <label>
              ना.प्र. नं. : <span className="red">*</span>
            </label>
            <input
              name="guardian_citizenship_no"
              type="text"
              className="dotted-input full-width"
              value={form.guardian_citizenship_no}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-row empty-label"></div>
          <div className="form-group-row">
            <label>
              खाता नम्बर : <span className="red">*</span>
            </label>
            <input
              name="guardian_account_no"
              type="text"
              className="dotted-input full-width"
              value={form.guardian_account_no}
              onChange={handleChange}
            />
          </div>
        </div>
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

      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

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

export default SocialSecurityViaGuardian;
