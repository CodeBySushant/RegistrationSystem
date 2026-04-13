import React, { useState, useEffect } from "react";
import "./ShopRegistrationForm.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  refLetterNo: "",
  chalaniNo: "",
  to_office: "",
  to_district: "",
  subject_district: "",
  municipality_ward_no: "",
  sabik_ward_no: "",
  resident_name: "",
  on_behalf_of: "",
  son_daughter_of: "",
  age: "",
  applicant_main: "",
  land_owner_no: "",
  te_no_sabik: "",
  te_no_ward: "",
  location_detail: "",
  ward_no_body: "",
  industry_name_1: "",
  industry_name_2: "",
  sign_name: "",
  sign_position: "",
  ward_no: "",
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

function ShopRegistrationForm() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward, municipality_ward_no: user.ward, ward_no_body: user.ward }));
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
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      const res = await axiosInstance.post("/api/forms/shop-registration", payload);
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
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    }
  };

  const handlePrint = async () => {
    setLoading(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      const res = await axiosInstance.post("/api/forms/shop-registration", payload);
      if (res.status === 201) {
        alert("Form submitted successfully! ID: " + res.data.id);
        window.print();
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Submission failed";
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="srf-page">
      <header className="srf-topbar">
        <div className="srf-top-left">पसल तथा फार्म दर्ता सिफारिश ।</div>
        <div className="srf-top-right">अवलोकन पृष्ठ / पसल तथा फार्म दर्ता सिफारिश</div>
      </header>

      <form className="srf-paper" onSubmit={handleSubmit}>
        {/* Letterhead */}
        <div className="srf-letterhead">
          <div className="srf-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
          <div className="srf-head-text">
            <div className="srf-head-main">{MUNICIPALITY.name}</div>
            <div className="srf-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="srf-head-sub">
              {MUNICIPALITY.officeLine} <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
          <div className="srf-head-meta">
            <div>
              मिति :{" "}
              <input
                type="text"
                name="date"
                className="srf-small-input"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Letter numbers */}
        <div className="srf-ref-row">
          <div className="srf-ref-block">
            <label>पत्र संख्या :</label>
            <input type="text" name="refLetterNo" value={form.refLetterNo} onChange={handleChange} />
          </div>
          <div className="srf-ref-block">
            <label>चलानी नं. :</label>
            <input type="text" name="chalaniNo" value={form.chalaniNo} onChange={handleChange} />
          </div>
        </div>

        {/* To office */}
        <div className="srf-to-block">
          <span>श्री</span>
          <input type="text" name="to_office" className="srf-long-input" value={form.to_office} onChange={handleChange} />
          <br />
          <span>घरेलु तथा साना उद्योग कार्यालय,</span>
          <input type="text" name="to_district" className="srf-medium-input" value={form.to_district} onChange={handleChange} />
        </div>

        {/* Subject */}
        <div className="srf-subject-row">
          <span className="srf-subject-label">विषय:</span>
          <span className="srf-subject-text">सिफारिस गरिएको ।</span>
        </div>

        <p className="srf-salutation">महोदय,</p>

        {/* Body inline rows */}
        <div className="srf-inline-row">
          <span>प्रस्तुत विषयमा</span>
          <input type="text" name="subject_district" className="srf-medium-input" value={form.subject_district} onChange={handleChange} />
          <span>जिल्ला</span>
          <input type="text" name="municipality_ward_no" className="srf-medium-input" value={form.municipality_ward_no} onChange={handleChange} />
          <span>{MUNICIPALITY.name} वडा नं.</span>
          <input type="text" name="sabik_ward_no" className="srf-tiny-input" value={form.sabik_ward_no} onChange={handleChange} />
          <span>साबिक</span>
          <input type="text" name="sabik_area" className="srf-tiny-input" value={form.sabik_area || ""} onChange={handleChange} />
          <span>वडा नं.</span>
          <input type="text" name="sabik_ward_no2" className="srf-tiny-input" value={form.sabik_ward_no2 || ""} onChange={handleChange} />
        </div>

        <div className="srf-inline-row">
          <span>निवासी श्री</span>
          <input type="text" name="resident_name" className="srf-medium-input" value={form.resident_name} onChange={handleChange} />
          <span>को तर्फबाट श्री</span>
          <input type="text" name="on_behalf_of" className="srf-medium-input" value={form.on_behalf_of} onChange={handleChange} />
          <span>को छोरा / छोरी वर्ष</span>
          <input type="text" name="age" className="srf-tiny-input" value={form.age} onChange={handleChange} />
          <span>को श्री</span>
          <input type="text" name="son_daughter_of" className="srf-medium-input" value={form.son_daughter_of} onChange={handleChange} />
        </div>

        <div className="srf-inline-row">
          <span>उक्त</span>
          <input type="text" name="applicant_main" className="srf-medium-input" value={form.applicant_main} onChange={handleChange} />
          <span>को जग्गा धनी प्रमाण पुर्जा नं.</span>
          <input type="text" name="land_owner_no" className="srf-medium-input" value={form.land_owner_no} onChange={handleChange} />
          <span>ते नं. वडा साबिक</span>
          <input type="text" name="te_no_sabik" className="srf-tiny-input" value={form.te_no_sabik} onChange={handleChange} />
          <span>वडा नं.</span>
          <input type="text" name="te_no_ward" className="srf-tiny-input" value={form.te_no_ward} onChange={handleChange} />
          <span>अन्तर्गत रहेको</span>
          <input type="text" name="location_detail" className="srf-medium-input" value={form.location_detail} onChange={handleChange} />
        </div>

        <p className="srf-body">
          संचालन गर्नका लागि सिफारिस गरी पाउँ भनी यस{" "}
          <input type="text" name="ward_no_body" className="srf-short-input" value={form.ward_no_body} onChange={handleChange} />{" "}
          नं. वडा कार्यालयमा निवेदन दिनु भएको उक्त उद्योग संचालन गर्दा कुनै पनि
          जनस्वास्थ्य महत्त्वपूर्ण स्थल, विद्यालय, मन्दिर र धार्मिकस्थलहरूलाई
          कुनै बाधा नपरी तथा वातावरणीय प्रदूषण समेत नहुने हुँदा यस वडा
          कार्यालयबाट सिफारिस साथ संलग्न सिफारिस पत्र पठाइएको छ । निजको नाममा
          उक्त{" "}
          <input type="text" name="industry_name_2" className="srf-short-input" value={form.industry_name_2} onChange={handleChange} />{" "}
          दर्ता गरिदिनु हुन सिफारिस साथ अनुरोध छ ।
        </p>

        {/* Signature */}
        <div className="srf-sign-row">
          <div className="srf-post-select">
            <input
              type="text"
              name="sign_name"
              className="srf-post-input"
              placeholder="नाम, थर"
              value={form.sign_name}
              onChange={handleChange}
            />
            <select name="sign_position" value={form.sign_position} onChange={handleChange}>
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
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

export default ShopRegistrationForm;