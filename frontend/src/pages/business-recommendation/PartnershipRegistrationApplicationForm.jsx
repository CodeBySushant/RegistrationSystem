import React, { useState, useEffect } from "react";
import "./PartnershipRegistrationApplicationForm.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const defaultPartner = () => ({
  name: "",
  father_or_spouse: "",
  address: "",
  age: "",
  investment: "",
  share_percent: "",
});

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  to_line1: "",
  to_line2: "",
  firm_name_np: "",
  firm_name_en: "",
  firm_address_full: "",
  firm_nature: "",
  partnership_duration_years: "",
  firm_phone: "",
  firm_email: "",
  firm_category: "सानो",
  partners: [defaultPartner()],
  first_registration_info: "",
  representative_name: "",
  name_registered_date: "",
  firm_start_date: "",
  office_check_officer: "",
  report_received_date: "",
  deed_signature: "",
  deed_holder_name: "",
  deed_date: "",
  deed_year: "",
  deed_month: "",
  deed_day: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship: "",
  applicant_phone: "",
};

export default function PartnershipRegistrationApplicationForm() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updatePartner = (idx, key, value) => {
    setForm((s) => {
      const copy = [...s.partners];
      copy[idx] = { ...copy[idx], [key]: value };
      return { ...s, partners: copy };
    });
  };

  const addPartner = () =>
    setForm((s) => ({ ...s, partners: [...s.partners, defaultPartner()] }));

  const removePartner = (idx) =>
    setForm((s) => ({
      ...s,
      partners: s.partners.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/forms/partnership-registration", form);
      setLoading(false);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        setForm(initialState);
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
      const res = await axiosInstance.post("/api/forms/partnership-registration", form);

      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="praf-page">
      <header className="praf-topbar">
        <div className="praf-top-left">साझेदारी रजिष्ट्रेशन</div>
        <div className="praf-top-right">अवलोकन पृष्ठ / साझेदारी रजिष्ट्रेशन</div>
      </header>

      <form className="praf-paper" onSubmit={handleSubmit}>
        {/* Letterhead */}
        <div className="praf-letterhead">
          <div className="praf-logo">
            <img alt="Emblem" src={MUNICIPALITY.logoSrc} />
          </div>
          <div className="praf-head-text">
            <div className="praf-head-main">{MUNICIPALITY.name}</div>
            <div className="praf-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="praf-head-sub">
              {MUNICIPALITY.officeLine}
              <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
        </div>

        <h2 className="praf-main-title">साझेदारी रजिष्ट्रेशन गर्ने दरखास्त फाराम</h2>

        <div className="praf-date-row">
          मिति :{" "}
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            className="praf-date-input"
          />
        </div>

        <div className="praf-to-block">
          <span>श्रीमान</span>
          <input
            name="to_line1"
            value={form.to_line1}
            onChange={handleChange}
            className="praf-long-input"
          />
          <br />
          <input
            name="to_line2"
            value={form.to_line2}
            onChange={handleChange}
            className="praf-long-input praf-to-second"
          />
        </div>

        {/* Basic fields */}
        <section className="praf-section">
          <div className="praf-field-row">
            <span>१) फर्मको पूरा नाम (नेपालीमा) :</span>
            <input
              name="firm_name_np"
              value={form.firm_name_np}
              onChange={handleChange}
              className="praf-wide-input"
            />
          </div>
          <div className="praf-field-row">
            <span>२) फर्मको पूरा नाम (अंग्रेजीमा) :</span>
            <input
              name="firm_name_en"
              value={form.firm_name_en}
              onChange={handleChange}
              className="praf-wide-input"
            />
          </div>
          <div className="praf-field-row">
            <span>३) फर्मको पूर्ण ठेगाना :</span>
            <input
              name="firm_address_full"
              value={form.firm_address_full}
              onChange={handleChange}
              className="praf-wide-input"
            />
          </div>
          <div className="praf-field-row">
            <span>४) फर्मको प्रकृति :</span>
            <input
              name="firm_nature"
              value={form.firm_nature}
              onChange={handleChange}
              className="praf-medium-input"
            />
            <span> अवधि (वर्ष):</span>
            <input
              name="partnership_duration_years"
              value={form.partnership_duration_years}
              onChange={handleChange}
              className="praf-small-input"
            />
          </div>
          <div className="praf-field-row">
            <span>५) फर्म सम्पर्क फोन :</span>
            <input
              name="firm_phone"
              value={form.firm_phone}
              onChange={handleChange}
              className="praf-medium-input"
            />
            <span>इमेल :</span>
            <input
              name="firm_email"
              value={form.firm_email}
              onChange={handleChange}
              className="praf-medium-input"
            />
            <span>वर्ग :</span>
            <select
              name="firm_category"
              value={form.firm_category}
              onChange={handleChange}
              className="praf-select"
            >
              <option value="सानो">सानो</option>
              <option value="मझौला">मझौला</option>
              <option value="ठूलो">ठूलो</option>
            </select>
          </div>
        </section>

        {/* Partners table */}
        <section className="praf-section">
          <h3 className="praf-subtitle">साझेदारहरु</h3>
          <table className="praf-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>नाम</th>
                <th>बाजे/बाबु</th>
                <th>ठेगाना</th>
                <th>उमेर</th>
                <th>लगानी</th>
                <th>लाभ प्रतिशत</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {form.partners.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={p.name}
                      onChange={(e) => updatePartner(i, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={p.father_or_spouse}
                      onChange={(e) => updatePartner(i, "father_or_spouse", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={p.address}
                      onChange={(e) => updatePartner(i, "address", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={p.age}
                      onChange={(e) => updatePartner(i, "age", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={p.investment}
                      onChange={(e) => updatePartner(i, "investment", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={p.share_percent}
                      onChange={(e) => updatePartner(i, "share_percent", e.target.value)}
                    />
                  </td>
                  <td>
                    {form.partners.length > 1 && (
                      <button type="button" onClick={() => removePartner(i)}>-</button>
                    )}
                    {i === form.partners.length - 1 && (
                      <button type="button" onClick={addPartner}>+</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Office use & deed */}
        <section className="praf-section">
          <div className="praf-field-row">
            <span>१०) नाम दर्ता मिति :</span>
            <input
              name="name_registered_date"
              value={form.name_registered_date}
              onChange={handleChange}
              className="praf-small-input"
            />
          </div>
          <div className="praf-field-row">
            <span>११) संचालन थालिएको मिति :</span>
            <input
              name="firm_start_date"
              value={form.firm_start_date}
              onChange={handleChange}
              className="praf-small-input"
            />
          </div>
          <div className="praf-field-row">
            <label>टिप्पणी (कार्यालयले भर्ने): जाँच अधिकारी</label>
            <input
              name="office_check_officer"
              value={form.office_check_officer}
              onChange={handleChange}
              className="praf-medium-input"
            />
            <label>रिपोर्ट प्राप्त मिति</label>
            <input
              name="report_received_date"
              value={form.report_received_date}
              onChange={handleChange}
              className="praf-small-input"
            />
          </div>
        </section>

        <section className="praf-section">
          <div className="praf-field-row">
            <span>दस्तखत :</span>
            <input
              name="deed_signature"
              value={form.deed_signature}
              onChange={handleChange}
              className="praf-medium-input"
            />
          </div>
          <div className="praf-field-row">
            <span>प्रोपाइटर/साझेदार पुरा नाम :</span>
            <input
              name="deed_holder_name"
              value={form.deed_holder_name}
              onChange={handleChange}
              className="praf-medium-input"
            />
          </div>
          <div className="praf-field-row">
            <span>हस्ती मानेको मिति :</span>
            <input
              name="deed_date"
              value={form.deed_date}
              onChange={handleChange}
              className="praf-small-input"
            />
            <span>साल :</span>
            <input
              name="deed_year"
              value={form.deed_year}
              onChange={handleChange}
              className="praf-small-input"
            />
            <span>महिना :</span>
            <input
              name="deed_month"
              value={form.deed_month}
              onChange={handleChange}
              className="praf-small-input"
            />
            <span>गते रोज :</span>
            <input
              name="deed_day"
              value={form.deed_day}
              onChange={handleChange}
              className="praf-small-input"
            />
          </div>
        </section>

        <ApplicantDetailsNp formData={form} handleChange={handleChange} />

        <div className="form-footer">
          <button className="save-print-btn" type="button" onClick={handlePrint}>
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