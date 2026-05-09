// FarmerGroupOrCommitteeRegistrationCertificate.jsx
import React, { useState, useEffect } from "react";
import "./FarmerGroupOrCommitteeRegistrationCertificate.css";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const initialState = {
  registration_date: new Date().toISOString().slice(0, 10),
  registration_no: "",

  group_name: "",
  group_address: "",
  group_purpose: "",
  group_main_work: "",
  group_area: "",
  authorized_name: "",
  authorized_position: "",

  signer_name: "",
  signer_designation: "वडा अध्यक्ष",
  sign_date: new Date().toISOString().slice(0, 10),

  applicantName: "",
  applicantAddress: "",
  applicantCitizenship: "",
  applicantPhone: "",
};

const FarmerGroupOrCommitteeRegistrationCertificate = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.ward && !form.ward_no) {
      setForm((prev) => ({ ...prev, ward_no: user.ward }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => ({
    registration_date: form.registration_date,
    registration_no: form.registration_no,
    group_name: form.group_name,
    group_address: form.group_address,
    group_purpose: form.group_purpose,
    group_main_work: form.group_main_work,
    group_area: form.group_area,
    authorized_name: form.authorized_name,
    authorized_position: form.authorized_position,
    signer_name: form.signer_name,
    signer_designation: form.signer_designation,
    sign_date: form.sign_date,
    applicant_name: form.applicantName,
    applicant_address: form.applicantAddress,
    applicant_citizenship_no: form.applicantCitizenship,
    applicant_phone: form.applicantPhone,
  });

  const handlePrint = async () => {
    if (!form.group_name || !form.registration_no) {
      alert("कृपया अनिवार्य फिल्डहरू भर्नुहोस्।");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/forms/farmer-group-committee-registration",
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
    <div className="farmer-registration-certificate-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        कृषक समूह/समिति दर्ता प्रमाणपत्र
        <span className="top-right-bread">
          संस्था / समिति &gt; कृषक समूह/समिति दर्ता प्रमाणपत्र
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
          <h3 className="certificate-title underline-text">
            कृषक समूह/समिति दर्ता प्रमाणपत्र
          </h3>
        </div>
      </div>

      {/* --- Registration Details --- */}
      <div className="registration-details">
        <div className="detail-row">
          <label>दर्ता मिति :</label>
          <input
            name="registration_date"
            type="date"
            className="dotted-input medium-input"
            value={form.registration_date}
            onChange={handleChange}
          />
        </div>
        <div className="detail-row">
          <label>दर्ता नं. :</label>
          <input
            name="registration_no"
            type="text"
            className="dotted-input small-input"
            value={form.registration_no}
            onChange={handleChange}
            placeholder="दर्ता नं."
          />
        </div>
      </div>

      {/* --- Photo Box --- */}
      <div className="photo-box-container">
        <div className="photo-box">अधिकृत व्यक्तिको फोटो</div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          यस <span className="bold-text">{MUNICIPALITY.name}</span> वडा नं.{" "}
          <span className="bold-text">{user?.ward || " "}</span> अन्तर्गत देहाय
          बमोजिमको कृषक समूह/समिति {MUNICIPALITY.name} को कृषि व्यवसाय प्रवर्द्धन
          ऐन, २०७७ को दफा ४ उपदफा (१) बमोजिम दर्ता गरी यो प्रमाणपत्र प्रदान
          गरिएको छ।
        </p>

        <div className="form-grid">
          <div className="form-row">
            <label className="bold-text">१. कृषक समूह/समितिको नाम :</label>
            <input
              name="group_name"
              type="text"
              className="line-input long-input"
              value={form.group_name}
              onChange={handleChange}
              placeholder="समूह/समितिको नाम"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">२. ठेगाना :</label>
            <input
              name="group_address"
              type="text"
              className="line-input long-input"
              value={form.group_address}
              onChange={handleChange}
              placeholder="ठेगाना"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">३. उद्देश्य :</label>
            <input
              name="group_purpose"
              type="text"
              className="line-input long-input"
              value={form.group_purpose}
              onChange={handleChange}
              placeholder="उद्देश्य"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">४. मुख्य काम :</label>
            <input
              name="group_main_work"
              type="text"
              className="line-input long-input"
              value={form.group_main_work}
              onChange={handleChange}
              placeholder="मुख्य काम"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">५. कार्यक्षेत्र :</label>
            <input
              name="group_area"
              type="text"
              className="line-input long-input"
              value={form.group_area}
              onChange={handleChange}
              placeholder="कार्यक्षेत्र"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">६. अख्तियारवालाको नाम, थर :</label>
            <input
              name="authorized_name"
              type="text"
              className="line-input long-input"
              value={form.authorized_name}
              onChange={handleChange}
              placeholder="नाम, थर"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">७. पद :</label>
            <input
              name="authorized_position"
              type="text"
              className="line-input medium-input"
              value={form.authorized_position}
              onChange={handleChange}
              placeholder="पद"
            />
          </div>
          <div className="form-row">
            <label className="bold-text">८. हस्ताक्षर :</label>
            <div className="signature-box"></div>
          </div>
        </div>
      </div>

      {/* --- Bottom Section (Signature & Date) --- */}
      <div className="bottom-section">
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
            <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
            <option value="वडा सचिव">वडा सचिव</option>
            <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
          </select>
        </div>
        <div className="date-block">
          <label>मिति : </label>
          <input
            name="sign_date"
            type="date"
            className="dotted-input medium-input"
            value={form.sign_date}
            onChange={handleChange}
          />
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

export default FarmerGroupOrCommitteeRegistrationCertificate;