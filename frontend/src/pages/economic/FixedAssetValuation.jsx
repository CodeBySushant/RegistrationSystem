// FixedAssetValuationForm.jsx
import React, { useState } from "react";
import "./FixedAssetValuation.css"; // keep your styles or tweak as needed
// Issue in form complete form is error
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const emptyRow = () => ({
  owner_name: "",
  owner_sabik: "",
  owner_ward: "",
  owner_kitta_no: "",
  owner_area: "",
  owner_rate: "",
  owner_remarks: "",
});

export default function FixedAssetValuationForm() {
  const { form, setForm, handleChange } = useWardForm(initialState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend URL - adjust if different
      const res = await axios.post("/api/forms/fixed-asset-valuation", form);
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
      const res = await axios.post("/api/forms/fixed-asset-valuation", form);
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
    <div className="valuation-form">
      <h2>अचल सम्पत्ति मुल्यांकन (Fixed Asset Valuation)</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid-row">
          <label>पत्र संख्या</label>
          <input
            name="letter_no"
            value={form.letter_no}
            onChange={(e) => update("letter_no", e.target.value)}
          />
          <label>चलानी नं.</label>
          <input
            name="chalani_no"
            value={form.chalani_no}
            onChange={(e) => update("chalani_no", e.target.value)}
          />
          <label>मिति</label>
          <input
            name="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            placeholder="YYYY-MM-DD or २०८२-०८-०६"
          />
        </div>

        <fieldset>
          <legend>मुख्य विवरण</legend>
          <div className="grid-row">
            <label>साविक जिल्ला / क्षेत्र</label>
            <input
              name="former_area"
              value={form.former_area}
              onChange={(e) => update("former_area", e.target.value)}
            />
            <label>साविक (गा.वि.स./नगर)</label>
            <input
              name="former_vdc_mun"
              value={form.former_vdc_mun}
              onChange={(e) => update("former_vdc_mun", e.target.value)}
            />
            <label>साविक वडा नं.</label>
            <input
              name="former_ward"
              value={form.former_ward}
              onChange={(e) => update("former_ward", e.target.value)}
            />
          </div>

          <div className="grid-row">
            <label>हालको नगरपालिका</label>
            <input
              name="current_municipality"
              value={form.current_municipality}
              onChange={(e) => update("current_municipality", e.target.value)}
            />
            <label>हालको वडा नं.</label>
            <input
              name="current_ward"
              value={form.current_ward}
              onChange={(e) => update("current_ward", e.target.value)}
            />
          </div>

          <div className="grid-row">
            <label>निवेदक पद</label>
            <input
              name="person_title"
              value={form.person_title}
              onChange={(e) => update("person_title", e.target.value)}
            />
            <label>निवेदकको नाम</label>
            <input
              name="person_name"
              value={form.person_name}
              onChange={(e) => update("person_name", e.target.value)}
            />
            <label>सम्बोधन (to)</label>
            <input
              name="application_to"
              value={form.application_to}
              onChange={(e) => update("application_to", e.target.value)}
            />
            <label>सम्बोधन वडा</label>
            <input
              name="application_ward"
              value={form.application_ward}
              onChange={(e) => update("application_ward", e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>तपशीिल (Tapashil) — जमीन विवरण</legend>

          <table className="tapashil-table">
            <thead>
              <tr>
                <th>#</th>
                <th>जग्गा धनी</th>
                <th>साविक</th>
                <th>वडा</th>
                <th>कित्ता नं.</th>
                <th>क्षेत्रफल</th>
                <th>दर/प्रति कठ्ठा</th>
                <th>कैफियत</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      name={`owner_name_${i}`}
                      value={r.owner_name}
                      onChange={(e) =>
                        updateRow(i, "owner_name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      name={`owner_sabik_${i}`}
                      value={r.owner_sabik}
                      onChange={(e) =>
                        updateRow(i, "owner_sabik", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      name={`owner_ward_${i}`}
                      value={r.owner_ward}
                      onChange={(e) =>
                        updateRow(i, "owner_ward", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      name={`owner_kitta_no_${i}`}
                      value={r.owner_kitta_no}
                      onChange={(e) =>
                        updateRow(i, "owner_kitta_no", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      name={`owner_area_${i}`}
                      value={r.owner_area}
                      onChange={(e) =>
                        updateRow(i, "owner_area", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      name={`owner_rate_${i}`}
                      value={r.owner_rate}
                      onChange={(e) =>
                        updateRow(i, "owner_rate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      name={`owner_remarks_${i}`}
                      value={r.owner_remarks}
                      onChange={(e) =>
                        updateRow(i, "owner_remarks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      disabled={rows.length === 1}
                    >
                      -
                    </button>
                    {i === rows.length - 1 && (
                      <button type="button" onClick={addRow}>
                        +
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>हस्ताक्षर / निवेदक विवरण</legend>
          <div className="grid-row">
            <label>हस्ताक्षर नाम</label>
            <input
              name="signature_name"
              value={form.signature_name}
              onChange={(e) => update("signature_name", e.target.value)}
            />
            <label>पद</label>
            <input
              name="designation"
              value={form.designation}
              onChange={(e) => update("designation", e.target.value)}
            />
          </div>

          <ApplicantDetailsNp formData={form} handleChange={handleChange} />

          <div className="grid-row">
            <label>कैफियत / नोट्स</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {message && (
          <div
            className={`msg ${message.type === "error" ? "error" : "success"}`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
