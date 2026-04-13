import React, { useState, useEffect } from "react";
import "./ShopAgriculturalForm.css";

import axiosInstance from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  province: MUNICIPALITY.provinceLine,
  district: MUNICIPALITY.city,
  municipality: MUNICIPALITY.name,
  ward: "",
  sabik: "",
  sabik_no: "",
  sabik_ward_no: "",
  owner_age: "",
  owner_name: "",
  on_behalf_of: "",
  location_name: "",
  land_location: "",
  shop_name: "",
  registration_no: "",
  operation_from: "",
  operation_to: "",
  period_year: "",
  period_month: "",
  boundary_east: "",
  boundary_west: "",
  boundary_north: "",
  boundary_south: "",
  rohabar_ward_no: "",
  rohabar_post: "",
  rohabar_person: "",
  applicant_name: "",
  applicant_address: "",
  applicant_citizenship: "",
  applicant_phone: "",
  notes: "",
};

export default function ShopAgriculturalForm() {
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
      const res = await axiosInstance.post("/api/forms/shop-agricultural", form);
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
      const res = await axiosInstance.post("/api/forms/shop-agricultural", form);

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
    <div className="saf-page">
      <header className="saf-topbar">
        <div className="saf-top-left">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</div>
        <div className="saf-top-right">
          अवलोकन पृष्ठ / पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी
        </div>
      </header>

      <form className="saf-paper" onSubmit={handleSubmit}>
        {/* Letterhead */}
        <div className="saf-letterhead">
          <div className="saf-logo">
            <img alt="Emblem" src={MUNICIPALITY.logoSrc} />
          </div>
          <div className="saf-head-text">
            <div className="saf-head-main">{MUNICIPALITY.name}</div>
            <div className="saf-head-ward">
              {user?.role === "SUPERADMIN"
                ? "सबै वडा कार्यालय"
                : `वडा नं. ${user?.ward || ""} वडा कार्यालय`}
            </div>
            <div className="saf-head-sub">
              {MUNICIPALITY.officeLine}
              <br />
              {MUNICIPALITY.provinceLine}
            </div>
          </div>
        </div>

        <h2 className="saf-main-title">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</h2>

        <div className="saf-inline-row">
          <span>लिखित</span>
          <select
            name="province"
            value={form.province}
            onChange={handleChange}
          >
            <option value={MUNICIPALITY.provinceLine}>{MUNICIPALITY.provinceLine}</option>
          </select>
          <span>जिल्ला</span>
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
          >
            <option value={MUNICIPALITY.city}>{MUNICIPALITY.city}</option>
          </select>
          <span>स्थानीय तह</span>
          <select
            name="municipality"
            value={form.municipality}
            onChange={handleChange}
          >
            <option value={MUNICIPALITY.name}>{MUNICIPALITY.name}</option>
          </select>
          <span>वडा नं.</span>
          <input
            type="text"
            name="ward"
            className="saf-small"
            value={form.ward}
            onChange={handleChange}
          />
        </div>

        <div className="saf-inline-row">
          <span>साबिक</span>
          <input
            type="text"
            name="sabik"
            className="saf-medium"
            value={form.sabik}
            onChange={handleChange}
          />
          <span>का</span>
          <input
            type="text"
            name="sabik_no"
            className="saf-small"
            value={form.sabik_no}
            onChange={handleChange}
          />
          <span>वर्ष</span>
          <input
            type="text"
            name="owner_age"
            className="saf-tiny"
            value={form.owner_age}
            onChange={handleChange}
          />
          <span>का श्री</span>
          <input
            type="text"
            name="owner_name"
            className="saf-medium"
            value={form.owner_name}
            onChange={handleChange}
          />
          <span>को तर्फबाट</span>
          <input
            type="text"
            name="on_behalf_of"
            className="saf-medium"
            value={form.on_behalf_of}
            onChange={handleChange}
          />
        </div>

        <div className="saf-inline-row">
          <span>उक्त</span>
          <input
            type="text"
            name="location_name"
            className="saf-medium"
            value={form.location_name}
            onChange={handleChange}
          />
          <span>को नाममा पासल / कृषि फार्म दर्ता मन्जुर भएको पूर्व</span>
          <input
            type="text"
            name="registration_no"
            className="saf-medium"
            value={form.registration_no}
            onChange={handleChange}
          />
          <span>नं. {MUNICIPALITY.name} वडा नं.</span>
          <input
            type="text"
            name="ward"
            className="saf-tiny"
            value={form.ward}
            onChange={handleChange}
          />
          <span>साबिक वडा नं.</span>
          <input
            type="text"
            name="sabik_ward_no"
            className="saf-tiny"
            value={form.sabik_ward_no}
            onChange={handleChange}
          />
        </div>

        <div className="saf-inline-row">
          <span>जमिन</span>
          <input
            type="text"
            name="land_location"
            className="saf-medium"
            value={form.land_location}
            onChange={handleChange}
          />
          <span>को स्थानमा रहेको</span>
          <input
            type="text"
            name="shop_name"
            className="saf-medium"
            value={form.shop_name}
            onChange={handleChange}
          />
          <span>किराना / कृषि / पशुपंक्षी फार्मको मिति</span>
          <input
            type="text"
            name="operation_from"
            className="saf-small"
            value={form.operation_from}
            onChange={handleChange}
          />
          <span>देखि</span>
          <input
            type="text"
            name="operation_to"
            className="saf-small"
            value={form.operation_to}
            onChange={handleChange}
          />
          <span>सम्म संचालन गर्न मन्जुरी दिएको छ ।</span>
        </div>

        <p className="saf-body">
          सोही अनुसार उल्लेखित स्थानीय तहमा पर्ने आयु क्षेत्र भित्र उल्लेखित
          स्थानमा पसल, कृषि, पशुपंक्षी फार्म सञ्चालन गर्न अनुमति दिईयो ।
        </p>

        <div className="saf-inline-row">
          <span>यी शब्दमा, साल</span>
          <input
            type="text"
            name="period_year"
            className="saf-small"
            value={form.period_year}
            onChange={handleChange}
          />
          <span>महिना</span>
          <input
            type="text"
            name="period_month"
            className="saf-small"
            value={form.period_month}
            onChange={handleChange}
          />
        </div>

        <h3 className="saf-subtitle">तपशिल</h3>
        <div className="saf-field-row">
          <span>१) पूर्व दिशाको सीमाना</span>
          <input
            type="text"
            name="boundary_east"
            value={form.boundary_east}
            onChange={handleChange}
          />
        </div>
        <div className="saf-field-row">
          <span>२) पश्चिम दिशाको सीमाना</span>
          <input
            type="text"
            name="boundary_west"
            value={form.boundary_west}
            onChange={handleChange}
          />
        </div>
        <div className="saf-field-row">
          <span>३) उत्तर दिशाको सीमाना</span>
          <input
            type="text"
            name="boundary_north"
            value={form.boundary_north}
            onChange={handleChange}
          />
        </div>
        <div className="saf-field-row">
          <span>४) दक्षिण दिशाको सीमाना</span>
          <input
            type="text"
            name="boundary_south"
            value={form.boundary_south}
            onChange={handleChange}
          />
        </div>

        <h3 className="saf-subtitle">रोहबर</h3>
        <div className="saf-inline-row">
          <span>{MUNICIPALITY.name}</span>
          <input
            type="text"
            name="rohabar_ward_no"
            className="saf-tiny"
            value={form.rohabar_ward_no}
            onChange={handleChange}
          />
          <span>नं. वडा का पदधारी</span>
          <select
            name="rohabar_post"
            value={form.rohabar_post}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
          </select>
          <span>श्री</span>
          <input
            type="text"
            name="rohabar_person"
            className="saf-medium"
            value={form.rohabar_person}
            onChange={handleChange}
          />
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