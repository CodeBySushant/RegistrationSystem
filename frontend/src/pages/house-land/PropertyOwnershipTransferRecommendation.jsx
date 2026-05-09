// PropertyOwnershipTransferRecommendation.jsx
import React, { useState } from "react";
import "./PropertyOwnershipTransferRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyHeir = () => ({
  name: "",
  relation: "",
  father_or_husband: "",
  citizenship_no: "",
  remarks: "",
});
const emptyPropertyRow = () => ({
  local_body: "",
  ward_no: "",
  area: "",
  plot_no: "",
  remarks: "",
});

const initial = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),

  // main subject fields
  previous_type: "",
  previous_ward_no: "",
  current_local: "नागार्जुन",
  current_municipality: "नागार्जुन",
  current_ward_no: "1",
  deceased_indicator: "", // e.g. name of deceased / applicant relationship
  applicant_prefix: "श्री",
  applicant_name: "",
  requested_by: "",

  // tables
  other_heirs: [emptyHeir()],
  property_details: [emptyPropertyRow()],

  // signature / applicant
  signature_name: "",
  signature_designation: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

export default function PropertyOwnershipTransferRecommendation() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/property-ownership-transfer-recommendation", form);
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
      const res = await axios.post("/api/forms/property-ownership-transfer-recommendation", form);
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
    <div className="transfer-recommendation-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          घर जग्गा नामसारी सिफारिस ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस
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
                onChange={(e) => setField("chalani_no", e.target.value)}
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

        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">घर जग्गा नामसारी सिफारिस।</span>
          </p>
        </div>

        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री मालपोत कार्यालय</span>
          </div>
          <div className="addressee-row">
            <input
              name="addressee_place"
              value={form.addressee_place || ""}
              onChange={(e) => setField("addressee_place", e.target.value)}
              className="line-input medium-input"
            />
            <span className="red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त विषयमा जिल्ला <span className="bold-text">काठमाडौँ</span>{" "}
            <span className="bold-text ml-20">{form.current_local}</span>{" "}
            <span className="bold-text ml-20">{form.current_municipality}</span>{" "}
            वडा नं. <span className="bold-text">{form.current_ward_no}</span>{" "}
            (साविक
            <select
              name="previous_type"
              value={form.previous_type}
              onChange={(e) => setField("previous_type", e.target.value)}
              className="inline-select medium-select"
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            , वडा नं.
            <input
              name="previous_ward_no"
              value={form.previous_ward_no}
              onChange={(e) => setField("previous_ward_no", e.target.value)}
              className="inline-box-input tiny-box"
            />
            ) अन्तर्गत निवेदक
            <select
              name="applicant_prefix"
              value={form.applicant_prefix}
              onChange={(e) => setField("applicant_prefix", e.target.value)}
              className="inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
              <option>श्रीमती</option>
            </select>
            <input
              name="applicant_name"
              value={form.applicant_name}
              onChange={(e) => setField("applicant_name", e.target.value)}
              className="inline-box-input medium-box"
              required
            />
            निवेदन अनुसार निजको{" "}
            <input
              name="deceased_indicator"
              value={form.deceased_indicator}
              onChange={(e) => setField("deceased_indicator", e.target.value)}
              className="inline-box-input medium-box"
            />{" "}
            मा मृत्यु भएको हुनाले... Requested by:
            <input
              name="requested_by"
              value={form.requested_by}
              onChange={(e) => setField("requested_by", e.target.value)}
              className="inline-box-input medium-box"
            />
          </p>
        </div>

        {/* Other heirs table */}
        <div className="table-section">
          <h4 className="table-title">अन्य हकदारको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>हकदारहरुको नाम</th>
                  <th>नाता</th>
                  <th>बाबु पतिको नाम</th>
                  <th>नागरिकता नं.</th>
                  <th>कैफियत</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {form.other_heirs.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.name}
                        onChange={(e) =>
                          updateArray("other_heirs", i, "name", e.target.value)
                        }
                        className="table-input"
                        required
                      />
                    </td>
                    <td>
                      <input
                        value={r.relation}
                        onChange={(e) =>
                          updateArray(
                            "other_heirs",
                            i,
                            "relation",
                            e.target.value,
                          )
                        }
                        className="table-input"
                        required
                      />
                    </td>
                    <td>
                      <input
                        value={r.father_or_husband}
                        onChange={(e) =>
                          updateArray(
                            "other_heirs",
                            i,
                            "father_or_husband",
                            e.target.value,
                          )
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.citizenship_no}
                        onChange={(e) =>
                          updateArray(
                            "other_heirs",
                            i,
                            "citizenship_no",
                            e.target.value,
                          )
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.remarks}
                        onChange={(e) =>
                          updateArray(
                            "other_heirs",
                            i,
                            "remarks",
                            e.target.value,
                          )
                        }
                        className="table-input"
                      />
                    </td>
                    <td className="action-cell">
                      <button
                        type="button"
                        onClick={() => addRow("other_heirs", emptyHeir)}
                        className="add-btn"
                      >
                        +
                      </button>
                      {form.other_heirs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow("other_heirs", i)}
                        >
                          -
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Property details table */}
        <div className="table-section">
          <h4 className="table-title">नामसारी गर्ने घर/जग्गाको विवरण</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>स्थानीय तह (वडा)</th>
                  <th>क्षेत्रफल</th>
                  <th>कित्ता नं.</th>
                  <th>कैफियत</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {form.property_details.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.local_body}
                        onChange={(e) =>
                          updateArray(
                            "property_details",
                            i,
                            "local_body",
                            e.target.value,
                          )
                        }
                        className="table-input half-input"
                      />
                      <span className="cell-label">वडा नं.</span>
                      <input
                        value={r.ward_no}
                        onChange={(e) =>
                          updateArray(
                            "property_details",
                            i,
                            "ward_no",
                            e.target.value,
                          )
                        }
                        className="table-input tiny-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.area}
                        onChange={(e) =>
                          updateArray(
                            "property_details",
                            i,
                            "area",
                            e.target.value,
                          )
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.plot_no}
                        onChange={(e) =>
                          updateArray(
                            "property_details",
                            i,
                            "plot_no",
                            e.target.value,
                          )
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.remarks}
                        onChange={(e) =>
                          updateArray(
                            "property_details",
                            i,
                            "remarks",
                            e.target.value,
                          )
                        }
                        className="table-input"
                      />
                    </td>
                    <td className="action-cell">
                      <button
                        type="button"
                        onClick={() =>
                          addRow("property_details", emptyPropertyRow)
                        }
                        className="add-btn"
                      >
                        +
                      </button>
                      {form.property_details.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow("property_details", i)}
                        >
                          -
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* signature */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input
              name="signature_name"
              value={form.signature_name}
              onChange={(e) => setField("signature_name", e.target.value)}
              className="line-input full-width-input"
              required
            />
            <select
              name="signature_designation"
              value={form.signature_designation}
              onChange={(e) =>
                setField("signature_designation", e.target.value)
              }
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
