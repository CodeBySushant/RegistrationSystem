// PropertyVerificationRecommendation.jsx
import React, { useState } from "react";
import "./PropertyVerificationRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyTapashilRow = () => ({
  local_body: "",
  ward_no: "",
  plot_no: "",
  area: "",
  action: "",
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),

  prev_district: "",
  prev_type: "",
  prev_ward_no: "",
  resident_local: "",
  resident_ward_no: "1",

  applicant_relation_prefix: "",
  applicant_relation_name: "",
  applicant_child_prefix: "",
  applicant_child_name: "",

  house_present: "भएको", // "भएको" or "नभएको"
  house_type: "", // पक्की / कच्ची
  length: "",
  length_unit: "फिट",
  width: "",
  width_unit: "फिट",
  additional_measure_1: "",
  additional_measure_2: "",
  road_included: "बाटो बाटो समेत",

  tapashil: [emptyTapashilRow()],

  signature_name: "",
  signature_designation: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

export default function PropertyVerificationRecommendation() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/property-verification-recommendation", form);
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
      const res = await axios.post("/api/forms/property-verification-recommendation", form);
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
    <div className="property-verification-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          सम्पत्ति प्रमाणीकरण सिफारिस ।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; सम्पत्ति प्रमाणीकरण सिफारिस
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

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा साविक जिल्ला
            <input
              value={form.prev_district}
              onChange={(e) => setField("prev_district", e.target.value)}
              className="inline-box-input medium-box"
            />
            <select
              value={form.prev_type}
              onChange={(e) => setField("prev_type", e.target.value)}
              className="inline-select"
            >
              <option></option>
              <option>गा.वि.स.</option>
              <option>नगरपालिका</option>
            </select>
            वडा नं.
            <input
              value={form.prev_ward_no}
              onChange={(e) => setField("prev_ward_no", e.target.value)}
              className="inline-box-input tiny-box"
            />
            भै हाल यस <span className="bg-gray-text">नागार्जुन</span> वडा नं. १
            मा बस्ने
            <input
              value={form.applicant_relation_name}
              onChange={(e) =>
                setField("applicant_relation_name", e.target.value)
              }
              className="inline-box-input medium-box"
            />
            को नाति
            <select
              value={form.applicant_relation_prefix}
              onChange={(e) =>
                setField("applicant_relation_prefix", e.target.value)
              }
              className="inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
            </select>
            <input
              value={form.applicant_child_name}
              onChange={(e) => setField("applicant_child_name", e.target.value)}
              className="inline-box-input medium-box"
            />
            को छोरा
            <select
              value={form.applicant_child_prefix}
              onChange={(e) =>
                setField("applicant_child_prefix", e.target.value)
              }
              className="inline-select"
            >
              <option>श्री</option>
              <option>सुश्री</option>
            </select>
            {/* house data */}
            <span> को नाममा नम्बरी दर्ता रहेको तपसिलको जग्गामा घर </span>
            <select
              value={form.house_present}
              onChange={(e) => setField("house_present", e.target.value)}
              className="inline-select"
            >
              <option>भएको</option>
              <option>नभएको</option>
            </select>
            भए घरको किसिम
            <select
              value={form.house_type}
              onChange={(e) => setField("house_type", e.target.value)}
              className="inline-select"
            >
              <option>घरको किसिम छान्नुहोस्</option>
              <option>पक्की</option>
              <option>कच्ची</option>
            </select>
            लम्बाई
            <input
              value={form.length}
              onChange={(e) => setField("length", e.target.value)}
              className="inline-box-input small-box"
            />
            <select
              value={form.length_unit}
              onChange={(e) => setField("length_unit", e.target.value)}
              className="inline-select"
            >
              <option>फिट</option>
              <option>मिटर</option>
            </select>
            चौडाई
            <input
              value={form.width}
              onChange={(e) => setField("width", e.target.value)}
              className="inline-box-input small-box"
            />
            <select
              value={form.width_unit}
              onChange={(e) => setField("width_unit", e.target.value)}
              className="inline-select"
            >
              <option>फिट</option>
              <option>मिटर</option>
            </select>
            र उक्त घर जग्गामा
            <input
              value={form.additional_measure_1}
              onChange={(e) => setField("additional_measure_1", e.target.value)}
              className="inline-box-input medium-box"
            />
            <input
              value={form.additional_measure_2}
              onChange={(e) => setField("additional_measure_2", e.target.value)}
              className="inline-box-input small-box"
            />
            फिट
            <select
              value={form.road_included}
              onChange={(e) => setField("road_included", e.target.value)}
              className="inline-select"
            >
              <option>बाटो बाटो समेत</option>
              <option>बाटो बाहेक</option>
            </select>
            पर्ने भएकोले सिफारिस साथ सादर अनुरोध गरिन्छ।
          </p>
        </div>

        <div className="table-section">
          <h4 className="table-title underline-text bold-text center-text">
            तपसिल
          </h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>स्थानीय तह</th>
                  <th>वडा नं.</th>
                  <th>कित्ता नं.</th>
                  <th>क्षेत्रफल</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {form.tapashil.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        value={r.local_body}
                        onChange={(e) =>
                          updateTapashil(i, "local_body", e.target.value)
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.ward_no}
                        onChange={(e) =>
                          updateTapashil(i, "ward_no", e.target.value)
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.plot_no}
                        onChange={(e) =>
                          updateTapashil(i, "plot_no", e.target.value)
                        }
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={r.area}
                        onChange={(e) =>
                          updateTapashil(i, "area", e.target.value)
                        }
                        className="table-input"
                      />
                    </td>
                    <td className="action-cell">
                      <button
                        type="button"
                        onClick={addTapashil}
                        className="add-btn"
                      >
                        +
                      </button>
                      {form.tapashil.length > 1 && (
                        <button type="button" onClick={() => removeTapashil(i)}>
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

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input
              value={form.signature_name}
              onChange={(e) => setField("signature_name", e.target.value)}
              className="line-input full-width-input"
            />
            <select
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
