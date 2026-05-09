import React, { useState, useEffect } from "react";
import "./NewBusinessPannumber.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  to_line1: "",
  to_line2: "",
  ward: "",
  sabik_ward: "",
  sabik_ward_no: "",
  resident_name: "",
  resident_from: "",
  resident_to: "",
  firm_name: "",
  proprietor_name: "",
  proprietor_citizen_no: "",
  proprietor_address: "",
  firm_address: "",
  firm_capital: "",
  firm_purpose: "",
  notes: "",
  sign_name: "",
  sign_position: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship: "",
  applicant_phone: "",
};

export default function NewBusinessPannumber() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward) {
      setForm((prev) => ({ ...prev, ward: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/forms/new-business-pan", form);
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
      const res = await axiosInstance.post("/api/forms/new-business-pan", form);

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
    <div className="nbp-page">
      <header className="nbp-topbar">
        <div className="nbp-top-left">नयाँ स्थायी लेखा नं.</div>
        <div className="nbp-top-right">अवलोकन पृष्ठ / नयाँ स्थायी लेखा नं.</div>
      </header>

      <form className="nbp-paper" onSubmit={handleSubmit}>
        <div className="nbp-letterhead">
          <div className="nbp-logo">
            <img alt="Emblem" src={MUNICIPALITY.logoSrc} />
          </div>
          <div className="nbp-head-text">
            <div className="nbp-head-main">{MUNICIPALITY.name}</div>
            <div className="nbp-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="nbp-head-sub">
              {MUNICIPALITY.officeLine}
              <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="nbp-head-meta">
            <div>
              मिति :{" "}
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                className="nbp-small-input"
              />
            </div>
            <div className="nbp-meta-line">ने.सं.: ११४६ भदौ, २ शनिवार</div>
          </div>
        </div>

        <div className="nbp-ref-row">
          <div className="nbp-ref-block">
            <label>पत्र संख्या :</label>
            <input
              name="refLetterNo"
              value={form.refLetterNo}
              onChange={handleChange}
            />
          </div>
          <div className="nbp-ref-block">
            <label>चलानी नं. :</label>
            <input
              name="chalaniNo"
              value={form.chalaniNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="nbp-to-block">
          <span>श्री</span>
          <input
            name="to_line1"
            value={form.to_line1}
            onChange={handleChange}
            className="nbp-long-input"
          />
          <br />
          <input
            name="to_line2"
            value={form.to_line2}
            onChange={handleChange}
            className="nbp-long-input nbp-to-second"
          />
        </div>

        <p className="nbp-body">
          उपर्युक्त सम्बन्धमा{" "}
          <span className="nbp-bold">{MUNICIPALITY.name}</span>
          वडा नं.{" "}
          <input
            name="ward"
            value={form.ward}
            onChange={handleChange}
            className="nbp-tiny-input"
          />
          (साबिक{" "}
          <input
            name="sabik_ward"
            value={form.sabik_ward}
            onChange={handleChange}
            className="nbp-small-input"
          />{" "}
          वडा नं.
          <input
            name="sabik_ward_no"
            value={form.sabik_ward_no}
            onChange={handleChange}
            className="nbp-tiny-input"
          />
          ) मा बस्ने श्री
          <input
            name="resident_name"
            value={form.resident_name}
            onChange={handleChange}
            className="nbp-medium-input"
          />{" "}
          ले मिति
          <input
            name="resident_from"
            value={form.resident_from}
            onChange={handleChange}
            className="nbp-small-input"
          />{" "}
          देखि
          <input
            name="resident_to"
            value={form.resident_to}
            onChange={handleChange}
            className="nbp-small-input"
          />{" "}
          सम्म व्यवसाय संचालन गर्दै आएको र उक्त व्यवसायको नाममा नयाँ स्थायी लेखा
          नं. प्राप्त गर्न सिफारिस गर्नु पर्ने भएकोले सिफारिस साथ अनुरोध गरिएको
          छ ।
        </p>

        <section className="nbp-section">
          <h3 className="nbp-subtitle">विवरण:</h3>

          <div className="nbp-field-row">
            <label>फर्मको नाम :</label>
            <input
              name="firm_name"
              value={form.firm_name}
              onChange={handleChange}
              className="nbp-wide-input"
            />
          </div>
          <div className="nbp-field-row">
            <label>प्रोपाइटरको नाम :</label>
            <input
              name="proprietor_name"
              value={form.proprietor_name}
              onChange={handleChange}
              className="nbp-wide-input"
            />
          </div>
          <div className="nbp-field-row">
            <label>प्रोपाइटरको नागरिकता नं. :</label>
            <input
              name="proprietor_citizen_no"
              value={form.proprietor_citizen_no}
              onChange={handleChange}
              className="nbp-medium-input"
            />
          </div>
          <div className="nbp-field-row">
            <label>ठेगाना :</label>
            <input
              name="proprietor_address"
              value={form.proprietor_address}
              onChange={handleChange}
              className="nbp-wide-input"
            />
          </div>
          <div className="nbp-field-row">
            <label>फर्मको ठेगाना :</label>
            <input
              name="firm_address"
              value={form.firm_address}
              onChange={handleChange}
              className="nbp-wide-input"
            />
          </div>
          <div className="nbp-field-row">
            <label>फर्म पूँजी :</label>
            <input
              name="firm_capital"
              value={form.firm_capital}
              onChange={handleChange}
              className="nbp-medium-input"
            />
          </div>
          <div className="nbp-field-row">
            <label>फर्म उद्देश्य :</label>
            <input
              name="firm_purpose"
              value={form.firm_purpose}
              onChange={handleChange}
              className="nbp-wide-input"
            />
          </div>

          <div className="nbp-field-row nbp-textarea-row">
            <label>बोधार्थ :</label>
            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              className="nbp-textarea"
            />
          </div>
        </section>

        <div className="nbp-sign-top">
          <input
            name="sign_name"
            value={form.sign_name}
            onChange={handleChange}
            className="nbp-sign-name"
            placeholder="नाम, थर"
          />
          <select
            name="sign_position"
            className="nbp-post-select"
            value={form.sign_position}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="अध्यक्ष">अध्यक्ष</option>
            <option value="सचिव">सचिव</option>
            <option value="अधिकृत">अधिकृत</option>
          </select>
        </div>

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