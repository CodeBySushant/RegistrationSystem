// DrinkingWaterCommitteeRegistration.jsx
import React, { useState, useEffect } from "react";
import "./DrinkingWaterCommitteeRegistration.css";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  registration_no: "१/२०८२/८३",
  registration_date: new Date().toISOString().slice(0, 10),

  // Receiver
  committee_name: "",
  committee_address: "",

  // Body paragraph
  body_committee_name: "",
  body_committee_address: "",
  body_water_source: "",
  body_reg_date: "",

  // Water source details
  source_location: "",
  boundary_east: "",
  boundary_north: "",
  boundary_west: "",
  boundary_south: "",
  source_usage: "",
  source_quantity: "",

  // Service details
  service_type: "",
  service_area: "",
  service_beneficiary: "",
  service_expansion: "",

  // Signature
  signer_name: "",
  signer_designation: "",

  // Applicant
  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const DrinkingWaterCommitteeRegistration = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync body fields that mirror receiver fields on first fill
    if (form.committee_name && !form.body_committee_name) {
      setForm((p) => ({ ...p, body_committee_name: p.committee_name }));
    }
  }, [form.committee_name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => ({
    registration_no: form.registration_no,
    registration_date: form.registration_date,
    committee_name: form.committee_name,
    committee_address: form.committee_address,
    body_committee_name: form.body_committee_name,
    body_committee_address: form.body_committee_address,
    body_water_source: form.body_water_source,
    body_reg_date: form.body_reg_date,
    source_location: form.source_location,
    boundary_east: form.boundary_east,
    boundary_north: form.boundary_north,
    boundary_west: form.boundary_west,
    boundary_south: form.boundary_south,
    source_usage: form.source_usage,
    source_quantity: form.source_quantity,
    service_type: form.service_type,
    service_area: form.service_area,
    service_beneficiary: form.service_beneficiary,
    service_expansion: form.service_expansion,
    signer_name: form.signer_name,
    signer_designation: form.signer_designation,
    applicant_name: form.applicantName,
    applicant_address: form.applicantAddress,
    applicant_citizenship_no: form.applicantCitizenship,
    applicant_phone: form.applicantPhone,
  });

  const handlePrint = async () => {
    if (!form.committee_name || !form.signer_name) {
      alert("कृपया अनिवार्य फिल्डहरू भर्नुहोस्।");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/forms/drinking-water-committee-registration",
        buildPayload()
      );
      if (res.status === 201) {
        alert("रेकर्ड सेभ भयो (ID: " + res.data.id + ")");
        window.onafterprint = () => {
          setForm(initialState);
          window.onafterprint = null;
        };
        window.print();
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Submit error:", err.response || err.message || err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Submission failed";
      alert("त्रुटि: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drinking-water-certificate-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र
        <span className="top-right-bread">
          प्रमाण पत्र &gt; खानेपानी उपभोक्ता संस्था
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="ward-title">
            {user?.role === "SUPERADMIN"
              ? "सबै वडा कार्यालय"
              : `${user?.ward || " "} नं. वडा कार्यालय`}
          </h2>
          <p className="address-text">{MUNICIPALITY.officeLine}</p>
          <p className="province-text">{MUNICIPALITY.provinceLine}</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            दर्ता नं. :
            <input
              name="registration_no"
              type="text"
              className="line-input medium-input"
              value={form.registration_no}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="meta-right">
          <p>
            दर्ता मिति :
            <input
              name="registration_date"
              type="date"
              className="line-input medium-input"
              value={form.registration_date}
              onChange={handleChange}
            />
          </p>
        </div>
      </div>

      {/* --- Certificate Title --- */}
      <div className="certificate-title-section">
        <h3 className="color-purple bold-text">
          खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र
        </h3>
      </div>

      {/* --- Receiver Details --- */}
      <div className="receiver-details">
        <div className="receiver-row">
          <label>श्री</label>
          <input
            name="committee_name"
            type="text"
            className="line-input long-input"
            value={form.committee_name}
            onChange={handleChange}
            placeholder="उपभोक्ता समितिको नाम"
          />
          <span>उपभोक्ता समिति</span>
        </div>
        <div className="receiver-row">
          <input
            name="committee_address"
            type="text"
            className="line-input medium-input"
            value={form.committee_address}
            onChange={handleChange}
            placeholder="ठेगाना"
          />
          <span>, {MUNICIPALITY.city}</span>
        </div>
      </div>

      {/* --- Certificate Title (Underlined) --- */}
      <div className="certificate-title-section mt-20">
        <h3 className="underline-text">खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र</h3>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          श्री
          <input
            name="body_committee_name"
            type="text"
            className="inline-box-input medium-box"
            value={form.body_committee_name}
            onChange={handleChange}
            placeholder="उपभोक्ता समितिको नाम"
          />
          उपभोक्ता समिति,
          <input
            name="body_committee_address"
            type="text"
            className="inline-box-input medium-box"
            value={form.body_committee_address}
            onChange={handleChange}
            placeholder="ठेगाना"
          />
          , {MUNICIPALITY.city} लाई
          <input
            name="body_water_source"
            type="text"
            className="inline-box-input medium-box"
            value={form.body_water_source}
            onChange={handleChange}
            placeholder="जलस्रोत"
          />
          जलस्रोत नियमावली, २०५७ को नियम ५ को उपनियम (१) बमोजिम २०८१ साल जेठ महिना २८ गते
          <input
            name="body_reg_date"
            type="text"
            className="inline-box-input small-box"
            value={form.body_reg_date}
            onChange={handleChange}
            placeholder="मिति"
          />
          नियमावली, २०५७ बमोजिम आफ्नो कार्य सन्चालन गर्ने गराउने गरी देहाय बमोजिम
          उपायको लागी यस कार्यालयमा दर्ता गरी यो प्रमाण पत्र प्रदान गरिएको छ
        </p>

        <div className="details-section">
          <h4 className="bold-text">उपयोग गरिने जलस्रोत विवरण</h4>

          <div className="detail-row">
            <label>(भ) जलस्रोतको नाम(चार किल्ला सहित) भएको ठाउँ :</label>
            <input
              name="source_location"
              type="text"
              className="line-input long-input"
              value={form.source_location}
              onChange={handleChange}
            />
            <label>(पूर्व:</label>
            <input
              name="boundary_east"
              type="text"
              className="line-input medium-input"
              value={form.boundary_east}
              onChange={handleChange}
            />
            <label>, उत्तर:</label>
            <input
              name="boundary_north"
              type="text"
              className="line-input medium-input"
              value={form.boundary_north}
              onChange={handleChange}
            />
          </div>
          <div className="detail-row">
            <label className="label-offset">, पश्चिम:</label>
            <input
              name="boundary_west"
              type="text"
              className="line-input medium-input"
              value={form.boundary_west}
              onChange={handleChange}
            />
            <label>, दक्षिण:</label>
            <input
              name="boundary_south"
              type="text"
              className="line-input medium-input"
              value={form.boundary_south}
              onChange={handleChange}
            />
            <span>)</span>
          </div>

          <div className="detail-row mt-10">
            <label>(म) जलस्रोतबाट गरिने प्रयोग:</label>
            <input
              name="source_usage"
              type="text"
              className="line-input medium-input"
              value={form.source_usage}
              onChange={handleChange}
            />
          </div>
          <div className="detail-row">
            <label>(य) उपभोक्ता संस्थाले उपयोग गर्न चाहेको जलस्रोतको परिणाम:</label>
            <input
              name="source_quantity"
              type="text"
              className="line-input medium-input"
              value={form.source_quantity}
              onChange={handleChange}
            />
          </div>

          <h4 className="bold-text mt-20">
            उपभोक्ता संस्थाले पुर्याउन चाहेको सेवा सम्बनधी विवरण:
          </h4>
          <div className="detail-row">
            <label>(व) सेवाको किसिम :</label>
            <input
              name="service_type"
              type="text"
              className="line-input medium-input"
              value={form.service_type}
              onChange={handleChange}
            />
          </div>
          <div className="detail-row">
            <label>(श) सेवा पुर्याउने क्षेत्र:</label>
            <input
              name="service_area"
              type="text"
              className="line-input medium-input"
              value={form.service_area}
              onChange={handleChange}
            />
          </div>
          <div className="detail-row">
            <label>(ष) सेवाबाट लाभान्वित हुने उपभोक्ता घरधुरी / जनसंख्या:</label>
            <input
              name="service_beneficiary"
              type="text"
              className="line-input medium-input"
              value={form.service_beneficiary}
              onChange={handleChange}
            />
          </div>
          <div className="detail-row">
            <label>(स) भविष्यमा सेवा विस्तार गर्न सकिने सम्भावना:</label>
            <input
              name="service_expansion"
              type="text"
              className="line-input medium-input"
              value={form.service_expansion}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <input
            name="signer_name"
            type="text"
            className="line-input full-width-input"
            value={form.signer_name}
            onChange={handleChange}
            placeholder="हस्ताक्षरकर्ताको नाम"
          />
          <select
            name="signer_designation"
            className="designation-select"
            value={form.signer_designation}
            onChange={handleChange}
          >
            <option value="">पद छनौट गर्नुहोस्</option>
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
      </div>

      {/* --- Applicant Details Box --- */}
      <ApplicantDetailsNp formData={form} handleChange={handleChange} />

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn" type="button" onClick={handlePrint}>
          {loading ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
        </button>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default DrinkingWaterCommitteeRegistration;