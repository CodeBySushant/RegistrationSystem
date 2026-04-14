// PropertyOwnershipTransferKitani.jsx
import React, { useState } from "react";
import "./PropertyOwnershipTransferKitani.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyDeceased = () => ({
  name: "",
  relation: "",
  death_date: "२०८२-०८-०६",
});
const emptyHeir = () => ({
  name: "",
  relation: "",
  father_or_husband: "",
  citizenship_no: "",
  remarks: "",
});

const initialState = {
  letter_no: "२०८२/८३",
  chalani_no: "",
  date_nep: new Date().toISOString().slice(0, 10),

  // basic subject/addressee
  addressee_place: "",
  previous_type: "",
  previous_ward_no: "",
  current_ward_no: "१",

  deceased_person_name: "",
  deceased_person_relation: "",
  deceased_person_spouse: "",
  deceased_death_date: "२०८२-०८-०६",
  deceased_prev_type: "",
  deceased_prev_ward_no: "",
  plot_no: "",
  jb_no: "",
  jb_area: "",

  // arrays (tables)
  deceased_heirs: [emptyDeceased()],
  living_heirs: [emptyHeir()],
  transfer_heirs: [emptyHeir()],

  // sarjimin block
  sarjimin_village_no: "",
  sarjimin_ward_no: "",
  sarjimin_year: "",
  sarjimin_extra: "",

  signature_name: "",
  signature_designation: "",

  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
};

export default function PropertyOwnershipTransferKitani() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/property-ownership-transfer-kitani", form);
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
      const res = await axios.post("/api/forms/property-ownership-transfer-kitani", form);
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
    <div className="transfer-kitani-container">
      <form onSubmit={handle}>
        <div className="top-bar-title">
          घर जग्गा नामसारी सिफारिस (कितानी)।
          <span className="top-right-bread">
            घर / जग्गा जमिन &gt; घर जग्गा नामसारी सिफारिस (कितानी)
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
                onChange={handle}
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
              value={form.addressee_place}
              onChange={handle}
              className="line-input medium-input"
              required
            />
            <span className="red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा जिल्ला <span className="bold-text">काठमाडौँ</span>{" "}
            <span className="bold-text ml-20">नागार्जुन नगरपालिका</span> वडा नं.{" "}
            <span className="bold-text">{form.current_ward_no}</span> (साविक
            <select
              name="previous_type"
              value={form.previous_type}
              onChange={handle}
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
              onChange={handle}
              className="inline-box-input tiny-box"
              required
            />{" "}
            ) बस्ने
            <input
              name="deceased_person_name"
              value={form.deceased_person_name}
              onChange={handle}
              className="inline-box-input medium-box"
              required
            />{" "}
            को
            <select
              name="deceased_person_relation"
              value={form.deceased_person_relation}
              onChange={handle}
              className="inline-select"
            >
              <option>नाति</option>
              <option>नातिनी</option>
            </select>
            इत्यादि ... मृतकको मिति
            <input
              name="deceased_death_date"
              value={form.deceased_death_date}
              onChange={handle}
              className="inline-box-input small-box"
            />
            भएको हुनाले निज मृतकका नाममा दर्ता कायम रहेको ... कि.न.{" "}
            <input
              name="plot_no"
              value={form.plot_no}
              onChange={handle}
              className="inline-box-input small-box"
              required
            />{" "}
            ज.बि{" "}
            <input
              name="jb_no"
              value={form.jb_no}
              onChange={handle}
              className="inline-box-input small-box"
              required
            />{" "}
            भएको मृतक जग्गा/घर ... नामसारीका लागि सिफारिस गरिन्छ।
          </p>
        </div>

        {/* Table 1: deceased_heirs */}
        <div className="table-section">
          <h4 className="table-title">मृत्यु भैसकेका हकदार</h4>
          <table className="details-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>नाम थर</th>
                <th>नाता</th>
                <th>मृत्यु मिति</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {form.deceased_heirs.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={r.name}
                      onChange={(e) =>
                        updateArray("deceased_heirs", i, "name", e.target.value)
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
                          "deceased_heirs",
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
                      value={r.death_date}
                      onChange={(e) =>
                        updateArray(
                          "deceased_heirs",
                          i,
                          "death_date",
                          e.target.value,
                        )
                      }
                      className="table-input"
                    />
                  </td>
                  <td className="action-cell">
                    <button
                      type="button"
                      onClick={() => addRow("deceased_heirs", emptyDeceased)}
                      className="add-btn"
                    >
                      +
                    </button>
                    {form.deceased_heirs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow("deceased_heirs", i)}
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

        {/* Table 2: living_heirs */}
        <div className="table-section">
          <h4 className="table-title">जीवित हकदारको विवरण</h4>
          <table className="details-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>नाम</th>
                <th>नाता</th>
                <th>बाबु/पति</th>
                <th>नागरिकता नं.</th>
                <th>कैफियत</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {form.living_heirs.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={r.name}
                      onChange={(e) =>
                        updateArray("living_heirs", i, "name", e.target.value)
                      }
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      value={r.relation}
                      onChange={(e) =>
                        updateArray(
                          "living_heirs",
                          i,
                          "relation",
                          e.target.value,
                        )
                      }
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      value={r.father_or_husband}
                      onChange={(e) =>
                        updateArray(
                          "living_heirs",
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
                          "living_heirs",
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
                          "living_heirs",
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
                      onClick={() => addRow("living_heirs", emptyHeir)}
                      className="add-btn"
                    >
                      +
                    </button>
                    {form.living_heirs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow("living_heirs", i)}
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

        {/* Table 3: transfer_heirs */}
        <div className="table-section">
          <h4 className="table-title">नामसारी गरिने हकदारको विवरण</h4>
          <table className="details-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>नाम</th>
                <th>नाता</th>
                <th>बाबु/पति</th>
                <th>नागरिकता नं.</th>
                <th>कैफियत</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {form.transfer_heirs.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={r.name}
                      onChange={(e) =>
                        updateArray("transfer_heirs", i, "name", e.target.value)
                      }
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      value={r.relation}
                      onChange={(e) =>
                        updateArray(
                          "transfer_heirs",
                          i,
                          "relation",
                          e.target.value,
                        )
                      }
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      value={r.father_or_husband}
                      onChange={(e) =>
                        updateArray(
                          "transfer_heirs",
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
                          "transfer_heirs",
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
                          "transfer_heirs",
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
                      onClick={() => addRow("transfer_heirs", emptyHeir)}
                      className="add-btn"
                    >
                      +
                    </button>
                    {form.transfer_heirs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow("transfer_heirs", i)}
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

        {/* Sarjimin block */}
        <div className="sarjimin-section">
          <p>
            निवेदकको निवेदन अनुसार सर्जमिन बुझ्दा
            <input
              name="sarjimin_village_no"
              value={form.sarjimin_village_no}
              onChange={handle}
              className="inline-box-input tiny-box"
              required
            />{" "}
            वडा नं.
            <input
              name="sarjimin_ward_no"
              value={form.sarjimin_ward_no}
              onChange={handle}
              className="inline-box-input tiny-box"
              required
            />{" "}
            बस्ने बर्ष
            <input
              name="sarjimin_year"
              value={form.sarjimin_year}
              onChange={handle}
              className="inline-box-input tiny-box"
              required
            />{" "}
            को{" "}
            <input
              name="sarjimin_extra"
              value={form.sarjimin_extra}
              onChange={handle}
              className="inline-box-input medium-box"
              required
            />{" "}
            समेत ...
          </p>
          <textarea
            className="full-width-textarea"
            rows="3"
            value={form.sarjimin_extra}
            onChange={(e) =>
              setForm((p) => ({ ...p, sarjimin_extra: e.target.value }))
            }
          ></textarea>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <input
              name="signature_name"
              value={form.signature_name}
              onChange={handle}
              className="line-input full-width-input"
              required
            />
            <select
              name="signature_designation"
              value={form.signature_designation}
              onChange={handle}
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
