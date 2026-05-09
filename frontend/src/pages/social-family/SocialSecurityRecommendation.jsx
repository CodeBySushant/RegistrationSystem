// 13
import React from "react";
import "./SocialSecurityRecommendation.css";

import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const SocialSecurityRecommendation = () => {
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
    <div className="social-security-rec-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        सामाजिक सुरक्षा सिफारिस ।
        <span className="top-right-bread">
          सामाजिक / पारिवारिक &gt; सामाजिक सुरक्षा सिफारिस ।
        </span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/nepallogo.svg" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title">१ नं. वडा कार्यालय</h2>
          <p className="address-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text">बागमती प्रदेश, नेपाल</p>
        </div>
      </div>

      {/* --- Meta Data (Date/Ref) --- */}
      <div className="meta-data-row">
        <div className="meta-left">
          <p>
            पत्र संख्या : <span className="bold-text">२३</span>
          </p>
          <p>
            चलानी नं. :{" "}
            <input type="text" className="dotted-input small-input" />
          </p>
        </div>
        <div className="meta-right">
          <p>
            मिति : <span className="bold-text">२०८२-०८-०६</span>
          </p>
          <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
        </div>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p className="bold-text">श्री शाखा प्रमुख ज्यु,</p>
        <div className="bank-row">
          <span className="red">*</span>
          <input type="text" className="line-input long-input" />
          <span>.लि.</span>
        </div>
        <div className="bank-row">
          <span>शाखा कार्यालय,</span>
          <span className="red">*</span>
          <input type="text" className="line-input long-input" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>
          विषय:<span className="underline-text">सिफारिस गरिएको सम्बन्धमा।</span>
        </p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            defaultValue="नागार्जुन"
          />
          <select className="inline-select">
            <option>गाउँपालिका</option>
            <option>नगरपालिका</option>
          </select>
          वडा नं.{" "}
          <input
            type="text"
            className="inline-box-input tiny-box"
            defaultValue="१"
          />{" "}
          बाट सामाजिक सुरक्षा भत्ता प्राप्त गर्ने (
          <input
            type="text"
            className="inline-box-input medium-box red-text"
            defaultValue="ज्येष्ठ नागरिक"
          />{" "}
          ) लाभग्राही
          <input
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> ना.प्र.नं
          <input
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> परिचय पत्र नं
          <input
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> को मिति{" "}
          <input
            type="text"
            className="inline-box-input medium-box"
            defaultValue="२०८२-०८-०६"
          />{" "}
          गते
          <span className="red-text bold-text"> मृत्यु </span> भएको र निजको खाता
          नं
          <input
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> मा रहेको सामाजिक सुरक्षा भत्ता बापत
          मृत्यु भएको मिति सम्मको रकम निकाल निजको
          <select className="inline-select">
            <option>छोरा</option>
            <option>छोरी</option>
            <option>पति</option>
            <option>पत्नी</option>
          </select>
          ले पेश गरेको निवेदनको आधारमा निजको <span className="red">*</span>
          <select className="inline-select">
            <option>श्री</option>
            <option>सुश्री</option>
          </select>
          <input type="text" className="inline-box-input medium-box" required />{" "}
          <span className="red">*</span> ना.प्र.नं
          <input
            type="text"
            className="inline-box-input medium-box"
            required
          />{" "}
          <span className="red">*</span> लाई रकम निकाल्ने आवश्यक व्यवस्था मिलाई
          सहयोग गरिदिनुहुन अनुरोध छ । साथै निजको नाममा रहेको सामाजिक सुरक्षा
          खाता समेत बन्द गरिदिनुहुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Signature Section --- */}
      <div className="signature-section">
        <div className="signature-block">
          <div className="signature-line"></div>
          <span className="red-mark">*</span>
          <input type="text" className="line-input full-width-input" required />
          <select className="designation-select">
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

export default SocialSecurityRecommendation;
