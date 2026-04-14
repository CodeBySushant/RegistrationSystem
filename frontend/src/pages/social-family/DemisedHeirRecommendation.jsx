// src/components/DemisedHeirRecommendation.jsx
import React, { useState } from "react";
import "./DemisedHeirRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const FORM_KEY = "demised-heir-recommendation";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite; if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

const DemisedHeirRecommendation = () => {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/demised-heir-recommendation", form);
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
      const res = await axios.post("/api/forms/demised-heir-recommendation", form);
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
    <form className="demised-heir-form" onSubmit={handleSubmit}>
      <div className="demised-heir-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          मृतक हकदारको सिफारिस ।
          <span className="top-right-bread">
            सामाजिक / पारिवारिक &gt; मृतक हकदारको सिफारिस
          </span>
        </div>

        {/* --- Header Section --- */}
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

        {/* --- Salutation --- */}
        <div className="salutation-section">
          <p>श्री जो जस संग सम्बन्ध राख्दछ।</p>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:<span className="underline-text">सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला{" "}
            <span className="bg-gray-text">काठमाडौँ</span>{" "}
            <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं.{" "}
            <span className="bg-gray-text">१</span> स्थायी ठेगाना (साविक
            <input
              name="old_unit_name"
              type="text"
              className="inline-box-input medium-box"
            />
            <select name="old_unit_type" className="inline-select">
              <option value="">--</option>
              <option>गा.वि.स.</option>
              <option>न.पा.</option>
            </select>
            वडा नं.{" "}
            <input
              name="old_unit_ward"
              type="text"
              className="inline-box-input tiny-box"
              required
            />{" "}
            <span className="red">*</span> ) बस्ने श्री
            <input
              name="applicant_declarant"
              type="text"
              className="inline-box-input long-box"
              required
            />{" "}
            <span className="red">*</span> ले हकदार प्रमाणित गरी पाउँ भनी यस वडा
            कार्यालयमा निवेदन दिनुभएको हुँदा सो सम्बन्धमा
            {/* deceased inputs */}
            <input
              name="deceased_title"
              type="text"
              className="inline-box-input medium-box"
              placeholder="श्री/सुश्री/श्रीमती"
              required
            />{" "}
            <span className="red">*</span>
            <input
              name="deceased_name"
              type="text"
              className="inline-box-input medium-box"
              required
            />{" "}
            <span className="red">*</span> का हकदारहरु देहाय बमोजिम उल्लेखित
            <input
              name="heirs_count"
              type="text"
              className="inline-box-input small-box"
              required
            />{" "}
            <span className="red">*</span> जना मात्र भएको व्यहोरा सिफारिस गरिन्छ
            ।
          </p>
        </div>

        {/* --- Tapsil Table --- */}
        <div className="table-section">
          <h4 className="table-title center-text bold-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>क्र.स.</th>
                  <th style={{ width: "20%" }}>हकदारहरुको नाम थर</th>
                  <th style={{ width: "15%" }}>नाता</th>
                  <th style={{ width: "20%" }}>बाबु/पतिको नाम</th>
                  <th style={{ width: "10%" }}>नागरिकता नं.</th>
                  <th style={{ width: "10%" }}>घर नं</th>
                  <th style={{ width: "10%" }}>कित्ता नं.</th>
                  <th style={{ width: "10%" }}>बाटोको नाम</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td>
                    <input
                      name="heir_name_0"
                      className="table-input heir-name"
                      required
                    />
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="heir_relation_0"
                      className="table-input heir-relation"
                      required
                    />
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="heir_parent_0"
                      className="table-input heir-parent"
                      required
                    />
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="heir_citizenship_0"
                      className="table-input heir-citizenship"
                      required
                    />
                    <span className="red-asterisk in-cell">*</span>
                  </td>
                  <td>
                    <input
                      name="heir_house_0"
                      className="table-input heir-house"
                    />
                  </td>
                  <td>
                    <input
                      name="heir_kitta_0"
                      className="table-input heir-kitta"
                    />
                  </td>
                  <td>
                    <input
                      name="heir_road_0"
                      className="table-input heir-road"
                    />
                  </td>
                  <td className="action-cell">
                    <button
                      type="button"
                      className="add-btn"
                      onClick={(ev) => {
                        // quick client-side row clone: clone row and clear inputs
                        const tbody = ev.currentTarget
                          .closest("table")
                          .querySelector("tbody");
                        const newRow = tbody.rows[0].cloneNode(true);
                        // clear input values and update names/index
                        const idx = tbody.rows.length;
                        Array.from(newRow.querySelectorAll("input")).forEach(
                          (inp) => {
                            inp.value = "";
                            // update name attributes to use index suffix
                            const cls = Array.from(inp.classList).find((c) =>
                              c.startsWith("heir-"),
                            );
                            if (cls) {
                              // set new name like heir_name_1 etc.
                              const base = cls.replace("-", "_"); // heir_name
                              inp.name = base + "_" + idx;
                            }
                          },
                        );
                        tbody.appendChild(newRow);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input
              name="signatory_name"
              type="text"
              className="line-input full-width-input"
              required
            />
            <select name="signatory_designation" className="designation-select">
              <option value="">पद छनौट गर्नुहोस्</option>
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
      </div>
    </form>
  );
};

export default DemisedHeirRecommendation;
