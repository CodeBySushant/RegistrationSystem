import React, { useState, useEffect, useRef } from "react";
import "./CitizenshipMujulka.css";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";
import { useAuth } from "../../context/AuthContext";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const FORM_KEY = "citizenship-mujulka";
const API_URL = `/api/forms/${FORM_KEY}`;

const emptyRow = () => ({
  district: "",
  local_unit: "",
  ward_no: "",
  residence: "",
  prpn_no: "",
  year: "",
});

const buildInitialState = (ward) => ({
  // Paragraph fields
  province: "",
  district_1: "काठमाडौँ",
  municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",
  ward_no: ward ? String(ward) : "१",

  prev_address_type: "",
  prev_address: "",
  prev_ward: "",

  grandfather_title: "श्री",
  grandfather_name: "",
  relation_1_type: "नाति",
  father_title: "श्री",
  father_name: "",
  relation_2_type: "छोरा",
  applicant_age: "",
  applicant_title: "श्री",
  applicant_name: "",

  dob_basis: "मेरो शैक्षिक योग्यताको प्रमाण-पत्र",
  dob: new Date().toISOString().slice(0, 10),

  check_applicant_title: "श्री",
  check_applicant_name: "",
  check_relation_type: "छोरा",
  check_relative_title: "श्री",
  check_relative_name: "",
  check_dob: new Date().toISOString().slice(0, 10),

  submit_municipality: MUNICIPALITY?.name || "नागार्जुन नगरपालिका",

  // Table
  table_rows: [emptyRow()],

  // Rohawar (Witness)
  rohawar_district: "",
  rohawar_local_unit: "",
  rohawar_position: "",
  rohawar_title: "श्री",
  rohawar_name: "",

  // Kaam Tamel Garne (Execution)
  tamel_district: "",
  tamel_local_unit: "",
  tamel_ward: "",
  tamel_position: "",
  tamel_title: "श्री",
  tamel_name: "",

  // Date
  date_year: "",
  date_month: "",
  date_day: "",
  date_day_name: "",

  // FIX 1+2: camelCase keys to match ApplicantDetailsNp props
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
  notes: "",
});

export default function CitizenshipMujulka() {
  const { user } = useAuth();

  // FIX 2: init with ward immediately → no undefined→defined flip on first render
  const [form, setForm] = useState(() => buildInitialState(user?.ward));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // FIX 5: ref flag so print fires AFTER React re-renders the success message,
  // not synchronously inside the try{} block (which was a race condition)
  const pendingPrintRef = useRef(false);

  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({ ...prev, ward_no: String(user.ward) }));
    }
  }, [user]);

  // FIX 5: runs after every render; if flag is set → clear it → print
  useEffect(() => {
    if (pendingPrintRef.current) {
      pendingPrintRef.current = false;
      const t = setTimeout(() => window.print(), 200);
      return () => clearTimeout(t);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Table row handlers — immutable update to avoid stale-ref issues
  const updateRow = (idx, key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      table_rows: prev.table_rows.map((r, i) =>
        i === idx ? { ...r, [key]: val } : r
      ),
    }));
  };

  const addRow = () =>
    setForm((prev) => ({
      ...prev,
      table_rows: [...prev.table_rows, emptyRow()],
    }));

  const removeRow = (idx) => {
    if (form.table_rows.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      table_rows: prev.table_rows.filter((_, i) => i !== idx),
    }));
  };

  // FIX 1: validate now checks form.applicantName (camelCase)
  const validate = () => {
    if (!form.applicant_name.trim()) return "निवेदकको नाम आवश्यक छ।";
    if (!form.applicantName.trim())
      return "तलको निवेदकको विवरणमा नाम आवश्यक छ।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        table_rows: JSON.stringify(form.table_rows),
        ward_no: String(form.ward_no),
      };

      // FIX 2: credentials:"include" so session cookies are sent with the request
      const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const info =
          typeof body === "object"
            ? body.message || JSON.stringify(body)
            : body;
        throw new Error(info || `HTTP ${res.status}`);
      }

      setMessage({ type: "success", text: "रेकर्ड सफलतापूर्वक सेभ भयो" });
      // FIX 5: flag for post-render print trigger
      pendingPrintRef.current = true;
    } catch (err) {
      console.error("submit error:", err);
      setMessage({ type: "error", text: err.message || "सेभ गर्न सकिएन" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="citizenship-mujulka-container"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* TOP BAR */}
      <div className="top-bar-title hide-print">
        नागरिकताको लागि मुचुल्का ।
        <span className="top-right-bread">
          नेपाली नागरिकता &gt; नागरिकताको लागि मुचुल्का
        </span>
      </div>

      {/* MAIN BODY PARAGRAPH */}
      <div className="form-body">
        <p className="body-paragraph">
          लिखितम हामी तपसिलमा उल्लेखित मानिसहरु आगे बागमती प्रदेश{" "}
          <input
            name="province"
            className="f-input medium-input"
            value={form.province}
            onChange={handleChange}
          />{" "}
          , काठमाडौँ जिल्ला{" "}
          <input
            name="municipality"
            className="f-input medium-input"
            value={form.municipality}
            onChange={handleChange}
          />{" "}
          वडा नं.{" "}
          <input
            name="ward_no"
            className="f-input tiny-input"
            value={form.ward_no}
            onChange={handleChange}
          />{" "}
          को कार्यालय मार्फत (साविक{" "}
          {/* FIX 3: was .inline-select with transparent bg → now .f-select */}
          <select
            name="prev_address_type"
            className="f-select"
            value={form.prev_address_type}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="गा.वि.स.">गा.वि.स.</option>
            <option value="नगरपालिका">नगरपालिका</option>
          </select>{" "}
          <input
            name="prev_address"
            className="f-input medium-input"
            value={form.prev_address}
            onChange={handleChange}
          />{" "}
          , वडा नं.{" "}
          <input
            name="prev_ward"
            className="f-input tiny-input"
            value={form.prev_ward}
            onChange={handleChange}
          />{" "}
          काठमाडौँ ) निवासी{" "}
          <select
            name="grandfather_title"
            className="f-select"
            value={form.grandfather_title}
            onChange={handleChange}
          >
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select>{" "}
          <input
            name="grandfather_name"
            className="f-input long-input"
            value={form.grandfather_name}
            onChange={handleChange}
          />{" "}
          का{" "}
          <select
            name="relation_1_type"
            className="f-select"
            value={form.relation_1_type}
            onChange={handleChange}
          >
            <option value="नाति">नाति</option>
            <option value="छोरा">छोरा</option>
          </select>{" "}
          <select
            name="father_title"
            className="f-select"
            value={form.father_title}
            onChange={handleChange}
          >
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select>{" "}
          <input
            name="father_name"
            className="f-input long-input"
            value={form.father_name}
            onChange={handleChange}
          />{" "}
          को{" "}
          <select
            name="relation_2_type"
            className="f-select"
            value={form.relation_2_type}
            onChange={handleChange}
          >
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>{" "}
          वर्ष{" "}
          <input
            name="applicant_age"
            className="f-input tiny-input"
            value={form.applicant_age}
            onChange={handleChange}
          />{" "}
          को{" "}
          <select
            name="applicant_title"
            className="f-select"
            value={form.applicant_title}
            onChange={handleChange}
          >
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select>{" "}
          <input
            name="applicant_name"
            className="f-input long-input"
            value={form.applicant_name}
            onChange={handleChange}
          />{" "}
          ले हालसम्म नेपाली नागरिकताको प्रमाण-पत्र नलिएको र{" "}
          <select
            name="dob_basis"
            className="f-select"
            value={form.dob_basis}
            onChange={handleChange}
          >
            <option value="मेरो शैक्षिक योग्यताको प्रमाण-पत्र">
              मेरो शैक्षिक योग्यताको प्रमाण-पत्र
            </option>
            <option value="जन्म दर्ता">जन्म दर्ता</option>
          </select>{" "}
          अनुसार जन्म मिति{" "}
          <input
            type="date"
            name="dob"
            className="f-input date-input"
            value={form.dob}
            onChange={handleChange}
          />{" "}
          कायम गरी स्थायी नेपाली नागरिकताको प्रमाण-पत्र पाउनको लागि वडा
          मुचुल्का गरी पाउँ भनि हामी वडा वासी समक्ष गरेको निवेदन अनुसार
          निजलाई जाँचबुझ गरी राम्रोसँग चिनेजानेको हुँदा निज{" "}
          <select
            name="check_applicant_title"
            className="f-select"
            value={form.check_applicant_title}
            onChange={handleChange}
          >
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select>{" "}
          <input
            name="check_applicant_name"
            className="f-input long-input"
            value={form.check_applicant_name}
            onChange={handleChange}
          />{" "}
          को{" "}
          <select
            name="check_relation_type"
            className="f-select"
            value={form.check_relation_type}
            onChange={handleChange}
          >
            <option value="छोरा">छोरा</option>
            <option value="छोरी">छोरी</option>
          </select>{" "}
          <select
            name="check_relative_title"
            className="f-select"
            value={form.check_relative_title}
            onChange={handleChange}
          >
            <option value="श्री">श्री</option>
            <option value="सुश्री">सुश्री</option>
            <option value="श्रीमती">श्रीमती</option>
          </select>{" "}
          <input
            name="check_relative_name"
            className="f-input long-input"
            value={form.check_relative_name}
            onChange={handleChange}
          />{" "}
          भएको निजको जन्ममिति{" "}
          <input
            type="date"
            name="check_dob"
            className="f-input date-input"
            value={form.check_dob}
            onChange={handleChange}
          />{" "}
          भएकोले निजले हाल सम्म स्थायी नेपाली नागरिकताको प्रमाण-पत्र नलिएको
          र निजको माग अनुसार स्थायी नेपाली नागरिकताको प्रमाण-पत्र उपलब्ध
          गरिदिन सिफारिस गरिदिएमा कुनै फरक पर्ने छैन व्यहोरा ठीक साँचो हो
          झुठा ठहरे कानुन बमोजिम सहुँला बुझाउँला भनि यो वडा मुचुल्कामा
          सहिछाप गरी{" "}
          <input
            name="submit_municipality"
            className="f-input medium-input"
            value={form.submit_municipality}
            onChange={handleChange}
          />{" "}
          मार्फत जिल्ला प्रशासन कार्यालय काठमाडौँ नेपाल सरकारमा चढायौं ।
        </p>

        {/* TAPSIL TABLE */}
        <div className="table-section">
          <h4 className="table-title center-text underline-text">तपसिल</h4>
          <div className="table-responsive">
            <table className="details-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>जिल्ला</th>
                  <th>गाउँपालिका</th>
                  <th>वडा नं.</th>
                  <th>निवास</th>
                  <th>ना.प्र.प.नं.</th>
                  <th>वर्ष</th>
                  <th className="hide-print"></th>
                </tr>
              </thead>
              <tbody>
                {form.table_rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="center-text">{idx + 1}</td>
                    <td>
                      <input
                        value={row.district}
                        onChange={updateRow(idx, "district")}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={row.local_unit}
                        onChange={updateRow(idx, "local_unit")}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={row.ward_no}
                        onChange={updateRow(idx, "ward_no")}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={row.residence}
                        onChange={updateRow(idx, "residence")}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={row.prpn_no}
                        onChange={updateRow(idx, "prpn_no")}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <input
                        value={row.year}
                        onChange={updateRow(idx, "year")}
                        className="table-input"
                      />
                    </td>
                    <td className="action-cell hide-print">
                      {idx === 0 ? (
                        <button
                          type="button"
                          className="add-btn"
                          onClick={addRow}
                        >
                          +
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeRow(idx)}
                        >
                          ×
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROHAWAR */}
        <div className="signatures-block">
          <h4 className="center-text underline-text">रोहवर</h4>
          <p className="body-paragraph">
            काठमाडौँ जिल्ला{" "}
            <input
              name="rohawar_district"
              className="f-input medium-input"
              value={form.rohawar_district}
              onChange={handleChange}
            />{" "}
            गाउँपालिका वडा नं.{" "}
            <input
              name="rohawar_local_unit"
              className="f-input medium-input"
              value={form.rohawar_local_unit}
              onChange={handleChange}
            />{" "}
            का{" "}
            <select
              name="rohawar_position"
              className="f-select"
              value={form.rohawar_position}
              onChange={handleChange}
            >
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सदस्य">वडा सदस्य</option>
              <option value="स्थानीय">स्थानीय</option>
            </select>{" "}
            <select
              name="rohawar_title"
              className="f-select"
              value={form.rohawar_title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>{" "}
            <input
              name="rohawar_name"
              className="f-input long-input"
              value={form.rohawar_name}
              onChange={handleChange}
            />
          </p>
        </div>

        {/* KAAM TAMEL GARNE */}
        <div className="signatures-block">
          <h4 className="center-text underline-text">काम तामेल गर्ने</h4>
          <p className="body-paragraph">
            काठमाडौँ जिल्ला{" "}
            <input
              name="tamel_district"
              className="f-input medium-input"
              value={form.tamel_district}
              onChange={handleChange}
            />{" "}
            गाउँपालिका{" "}
            <input
              name="tamel_local_unit"
              className="f-input medium-input"
              value={form.tamel_local_unit}
              onChange={handleChange}
            />{" "}
            नं. वडा कार्यालय{" "}
            <input
              name="tamel_position"
              className="f-input medium-input"
              value={form.tamel_position}
              onChange={handleChange}
            />{" "}
            पदमा कार्यरत{" "}
            <select
              name="tamel_title"
              className="f-select"
              value={form.tamel_title}
              onChange={handleChange}
            >
              <option value="श्री">श्री</option>
              <option value="सुश्री">सुश्री</option>
            </select>{" "}
            <input
              name="tamel_name"
              className="f-input long-input"
              value={form.tamel_name}
              onChange={handleChange}
            />{" "}
            .
          </p>
        </div>

        {/* DATE SECTION */}
        <div className="date-block mt-20">
          <p className="body-paragraph center-text">
            इति सम्वत{" "}
            <input
              name="date_year"
              className="f-input tiny-input"
              value={form.date_year}
              onChange={handleChange}
            />{" "}
            साल{" "}
            <input
              name="date_month"
              className="f-input tiny-input"
              value={form.date_month}
              onChange={handleChange}
            />{" "}
            महिना{" "}
            <input
              name="date_day"
              className="f-input tiny-input"
              value={form.date_day}
              onChange={handleChange}
            />{" "}
            गते रोज{" "}
            <input
              name="date_day_name"
              className="f-input small-input"
              value={form.date_day_name}
              onChange={handleChange}
            />{" "}
            शुभम् .
          </p>
        </div>
      </div>

      {/* APPLICANT DETAILS FOOTER */}
      {/* FIX 1+2: form now carries applicantName/Address/Citizenship/Phone */}
      <div className="hide-print mt-20">
        <ApplicantDetailsNp formData={form} handleChange={handleChange} />
      </div>

      {/* FORM FOOTER */}
      <div className="form-footer hide-print">
        {message && (
          <div
            className={`submit-msg ${
              message.type === "error" ? "msg-error" : "msg-success"
            }`}
          >
            {message.text}
          </div>
        )}
        <button type="submit" className="save-print-btn" disabled={loading}>
          {loading ? "सेभ हुँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer hide-print">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY?.name || "नागार्जुन नगरपालिका"}
      </div>
    </form>
  );
}