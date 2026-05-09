// HouseMaintainRecommendation.jsx
import React, { useState } from "react";
import "./HouseMaintainRecommendation.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyProperty = () => ({
  previous_gb_np: "",
  previous_ward_no: "",
  current_gb_np: "नागार्जुन",
  current_ward_no: "",
  seat_or_plot: "",
  area: "",
  construction_year_or_permission: "",
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),
  addressee_office: "मालपोत कार्यालय",
  addressee_location: "",
  district: "काठमाडौँ",
  municipality: "नागार्जुन",
  ward_no: "1",
  owner_prefix: "श्री",
  owner_name: "",
  ownership_type: "पूर्ण", // पूर्ण | आंशिक
  signer_name: "",
  signer_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  notes: "",
};

export default function HouseMaintainRecommendation() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/house-maintain-recommendation", form);
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
      const res = await axios.post("/api/forms/house-maintain-recommendation", form);
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
    <div className="house-maintain-container">
      <form onSubmit={handleSubmit}>
        {/* Top Bar */}
        <div className="top-bar-title">
          घर कायम सिफारिस ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; घर कायम सिफारिस
          </span>
        </div>

        {/* Header */}
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

        {/* Meta */}
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

        {/* Addressee */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री {form.addressee_office}</span>
            <input
              name="addressee_location"
              value={form.addressee_location}
              onChange={handleChange}
              className="line-input medium-input"
            />
            <span>,</span>
          </div>
          <div className="addressee-row">
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        {/* Main Body */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त विषयमा जिल्ला {form.district}{" "}
            <span className="bold-text ml-20">{form.municipality}</span> वडा नं.{" "}
            <span className="bold-text">{form.ward_no}</span> (साविक{" "}
            <input
              name="previous_gb_np"
              onChange={handleChange}
              className="inline-box-input medium-box"
            />{" "}
            , वडा नं.{" "}
            <input
              name="previous_ward_no"
              value={form.previous_ward_no || ""}
              onChange={handleChange}
              className="inline-box-input tiny-box"
              required
            />{" "}
            ) निवासी{" "}
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
              className="inline-box-input long-box"
              required
            />{" "}
            <span className="red">*</span> को नाममा ...{" "}
            {/* shorted for readability */}
            <select
              name="ownership_type"
              value={form.ownership_type}
              onChange={handleChange}
              className="inline-select bold-text"
            >
              <option value="पूर्ण">पूर्ण</option>
              <option value="आंशिक">आंशिक</option>
            </select>{" "}
            घर निर्माण गरी यस वडा कार्यालयमा निजले चालु आर्थिक वर्षसम्मको कर
            चुक्ता गरिसकेको हुनाले घर कायम गरी दिनुहुन सिफारिस गरिन्छ।
          </p>
        </div>

        {/* Table of properties */}
        <div className="table-section">
          <h4 className="table-title">घर कायम गर्नु पर्ने जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="house-table">
              <thead>
                <tr>
                  <th rowSpan="2" style={{ width: "5%" }}>
                    क्र.स.
                  </th>
                  <th colSpan="2" style={{ width: "25%", textAlign: "center" }}>
                    साविक
                  </th>
                  <th colSpan="2" style={{ width: "25%", textAlign: "center" }}>
                    हाल
                  </th>
                  <th rowSpan="2" style={{ width: "15%" }}>
                    सिट नं/कि.नं.
                  </th>
                  <th rowSpan="2" style={{ width: "10%" }}>
                    क्षेत्रफल
                  </th>
                  <th rowSpan="2" style={{ width: "15%" }}>
                    घर निर्माण भएको साल / अनुमति लिएको
                  </th>
                  <th rowSpan="2" style={{ width: "5%" }}></th>
                </tr>
                <tr>
                  <th>गा.वि.स.</th>
                  <th>वडा नं</th>
                  <th>गाउँपालिका</th>
                  <th>वडा नं</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <select
                        value={row.previous_gb_np}
                        onChange={(e) =>
                          setProperty(i, "previous_gb_np", e.target.value)
                        }
                        className="table-select"
                      >
                        <option value="">--छान्नुहोस्--</option>
                        <option value="गा.वि.स.">गा.वि.स.</option>
                        <option value="न.पा.">न.पा.</option>
                      </select>
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={row.previous_ward_no || ""}
                        onChange={(e) =>
                          setProperty(i, "previous_ward_no", e.target.value)
                        }
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <select
                        value={row.current_gb_np}
                        onChange={(e) =>
                          setProperty(i, "current_gb_np", e.target.value)
                        }
                        className="table-select"
                      >
                        <option value="नागार्जुन">नागार्जुन</option>
                      </select>
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={row.current_ward_no || ""}
                        onChange={(e) =>
                          setProperty(i, "current_ward_no", e.target.value)
                        }
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={row.seat_or_plot}
                        onChange={(e) =>
                          setProperty(i, "seat_or_plot", e.target.value)
                        }
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={row.area}
                        onChange={(e) => setProperty(i, "area", e.target.value)}
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td>
                      <input
                        value={row.construction_year_or_permission}
                        onChange={(e) =>
                          setProperty(
                            i,
                            "construction_year_or_permission",
                            e.target.value,
                          )
                        }
                        className="table-input"
                        required
                      />{" "}
                      <span className="red-asterisk in-cell">*</span>
                    </td>
                    <td className="action-cell">
                      {properties.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeRow(i)}
                          className="add-btn"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={addRow}
                          className="add-btn"
                        >
                          +
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addRow} className="add-btn">
              कतार थप्नुहोस्
            </button>
          </div>
        </div>

        {/* Signature */}
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
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">
                कार्यवाहक वडा अध्यक्ष
              </option>
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
