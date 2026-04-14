// PropertyOwnerCertificateCopyRecommendation.jsx
import React, { useState } from "react";
import "./PropertyOwnerCertificateCopyRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyCertificate = () => ({
  applicant_name: "",
  na_pr_no: "",
  issue_date: new Date().toISOString().slice(0, 10),
  father_name: "",
  grandfather_name: "",
});

const emptyFooterApplicant = () => ({
  name: "",
  address: "",
  citizenship_no: "",
  phone: "",
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: "२०८२-०८-०६",

  addressee_office: "मालपोत कार्यालय",
  addressee_place: "",
  owner_prefix: "श्री",
  owner_name: "",
  previous_muni_name: "",
  previous_muni_type: "",
  previous_ward_no: "",
  plot_no: "",
  area: "",
  request_district: "",
  request_local_body: "",
  request_local_body_type: "गाउँपालिका",
  request_local_body_ward_no: "",

  // arrays that will be stringified
  certificates: [emptyCertificate(), emptyCertificate(), emptyCertificate()],
  footer_applicants: [
    emptyFooterApplicant(),
    emptyFooterApplicant(),
    emptyFooterApplicant(),
  ],

  signer_name: "",
  signer_designation: "",
  notes: "",
};

export default function PropertyOwnerCertificateCopyRecommendation() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/property-owner-certificate-copy-recommendation", form);
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
      const res = await axios.post("/api/forms/property-owner-certificate-copy-recommendation", form);
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
    <div className="certificate-copy-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          जग्गाधनी प्रमाण पत्रको प्रतिलिपि सिफारिस ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; जग्गाधनी प्रमाण पत्रको प्रतिलिपि सिफारिस
          </span>
        </div>

        <div className="form-header-section">
          <div className="header-logo">
            <img src="/nepallogo.svg" alt="Nepal Emblem" />
          </div>
          <div className="header-text">
            <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
            <p className="address-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text">बागमती प्रदेश, नेपाल</p>
          </div>
        </div>

        <div className="meta-data-row">
          <div className="meta-left">
            <p>
              पत्र संख्या : <span className="bold-text">{form.letter_no}</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                name="chalani_no"
                value={form.chalani_no}
                onChange={handleChange}
                className="dotted-input small-input"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <span className="bold-text">{form.date_nep}</span>
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <select
              name="addressee_office"
              value={form.addressee_office}
              onChange={handleChange}
              className="bold-select"
            >
              <option>मालपोत कार्यालय</option>
              <option>भुमि सुधार कार्यालय</option>
            </select>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_place"
              value={form.addressee_place}
              onChange={handleChange}
              className="line-input medium-input"
            />
            <span className="red">*</span>
            <span className="bold-text">, काठमाडौँ</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा {/* owner and plot details */}
            <select
              name="owner_prefix"
              value={form.owner_prefix}
              onChange={handleChange}
              className="inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              name="owner_name"
              value={form.owner_name}
              onChange={handleChange}
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span>
            <br />
            <input
              name="previous_muni_name"
              value={form.previous_muni_name}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />
            <select
              name="previous_muni_type"
              value={form.previous_muni_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            वडा नं.{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span>
            कि.नं.{" "}
            <input
              name="plot_no"
              value={form.plot_no}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            <span className="red">*</span>
            क्षे.फ.{" "}
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              className="inline-box-input small-box"
              required
            />{" "}
            <span className="red">*</span>
            को जग्गाको जग्गाधनी प्रमाण पुर्जा{" "}
            <input
              name="plot_no_duplicate"
              className="inline-box-input medium-box"
            />{" "}
            <span className="red">*</span>
            <br />
            सोको प्रतिलिपिको सिफारिस गरी पाउन जिल्ला{" "}
            <input
              name="request_district"
              value={form.request_district}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />{" "}
            <span className="red">*</span>
            <input
              name="request_local_body"
              value={form.request_local_body}
              onChange={handleChange}
              className="inline-box-input medium-box"
            />{" "}
            <span className="red">*</span>
            <select
              name="request_local_body_type"
              value={form.request_local_body_type}
              onChange={handleChange}
              className="inline-select"
            >
              <option>गाउँपालिका</option>
              <option>नगरपालिका</option>
            </select>
            वडा नं.{" "}
            <input
              name="request_local_body_ward_no"
              value={form.request_local_body_ward_no}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span>
            <br />
            (साविक{" "}
            <input
              name="previous_muni_name2"
              className="inline-box-input medium-box"
            />{" "}
            वडा नं.{" "}
            <input
              name="previous_ward_no2"
              className="inline-box-input tiny-box"
            />{" "}
            ) बस्ने {/* continuer */}
            <select
              name="owner_prefix2"
              className="inline-select"
              value={form.owner_prefix}
              onChange={handleChange}
            >
              <option>श्री</option>
              <option>सुश्री</option>
            </select>
            <input name="owner_name2" className="inline-box-input medium-box" />
            ले यस वडा कार्यालयमा निवेदन दिनु भएको हुँदा सो सम्बन्धमा यहाँको
            नियमानुसार जग्गाधनी प्रमाण पुर्जाको प्रतिलिपि उपलब्ध गराई दिनुहुन
            सिफारिस गरिन्छ।
          </p>
        </div>

        {/* Certificates section (three blocks) */}
        <div className="personal-details-grid">
          {form.certificates.map((c, i) => (
            <div key={i} className="details-column">
              <div className="form-group">
                <label>
                  निवेदक <span className="red">*</span>
                </label>
                <input
                  value={c.applicant_name}
                  onChange={(e) =>
                    setCertificate(i, "applicant_name", e.target.value)
                  }
                  className="line-input full-width"
                />
              </div>
              <div className="form-group">
                <label>
                  ना.प्र.नं. <span className="red">*</span>
                </label>
                <input
                  value={c.na_pr_no}
                  onChange={(e) =>
                    setCertificate(i, "na_pr_no", e.target.value)
                  }
                  className="line-input full-width"
                />
              </div>
              <div className="form-group">
                <label>जारी मिति</label>
                <input
                  value={c.issue_date}
                  onChange={(e) =>
                    setCertificate(i, "issue_date", e.target.value)
                  }
                  className="line-input full-width"
                />
              </div>
              <div className="form-group">
                <label>
                  पिता <span className="red">*</span>
                </label>
                <input
                  value={c.father_name}
                  onChange={(e) =>
                    setCertificate(i, "father_name", e.target.value)
                  }
                  className="line-input full-width"
                />
              </div>
              <div className="form-group">
                <label>
                  बाजे <span className="red">*</span>
                </label>
                <input
                  value={c.grandfather_name}
                  onChange={(e) =>
                    setCertificate(i, "grandfather_name", e.target.value)
                  }
                  className="line-input full-width"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signer_name"
              value={form.signer_name}
              onChange={handleChange}
              className="line-input full-width-input"
              required
            />
            <select
              name="signer_designation"
              value={form.signer_designation}
              onChange={handleChange}
              className="designation-select"
            >
              <option>पद छनौट गर्नुहोस्</option>
              <option>वडा अध्यक्ष</option>
              <option>वडा सचिव</option>
              <option>कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button
            className="save-print-btn"
            type="button"
            onClick={handlePrint}
          >
            {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </form>
    </div>
  );
}
