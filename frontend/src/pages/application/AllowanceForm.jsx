import React, { useState } from "react";
import "./AllowanceForm.css";
import axios from "../../utils/axiosInstance";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";
import ApplicantDetailsNp from "../../components/ApplicantDetailsNp";

const AllowanceForm = () => {
  const [formData, setFormData] = useState({
    nagarpalika: MUNICIPALITY.name || "",
    ward: MUNICIPALITY.wardNumber || "",
    targetGroup: "जेष्ठ नागरिक (दलित)",
    gender: "पुरुष",
    fullName: "",
    fatherName: "",
    motherName: "",
    address: "",
    nagariktaNo: "",
    jariJilla: "",
    birthDate: "",
    mobileNo: "",
    patiMrituNo: "",
    patiMrituMiti: "",
    allowanceType: "",
    parichayaNo: "",
    allowanceStartDate: "",
    allowanceStartQuarter: "",
    applicantName: "",
    applicantAddress: "",
    applicantCitizenship: "", // ✅ FIXED: Consistent field name
    applicantPhone: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.applicantName) {
      alert("कृपया आवश्यक क्षेत्रहरू भर्नुहोस् (नाम र निवेदकको नाम)।");
      return;
    }

    setSubmitting(true);

    try {
      const url = "/api/forms/allowance-form";
      const res = await axios.post(url, formData);

      if (res.status === 201 || res.status === 200) {
        alert("Saved successfully! ID: " + (res.data.id || "(no id returned)"));
        
        // ✅ PERFECTED: Print first, reset after
        setTimeout(() => {
          window.print();
        }, 300);
        
        setTimeout(() => {
          // Reset AFTER print completes
          setFormData({
            nagarpalika: MUNICIPALITY.name || "",
            ward: MUNICIPALITY.wardNumber || "",
            targetGroup: "जेष्ठ नागरिक (दलित)",
            gender: "पुरुष",
            fullName: "",
            fatherName: "",
            motherName: "",
            address: "",
            nagariktaNo: "",
            jariJilla: "",
            birthDate: "",
            mobileNo: "",
            patiMrituNo: "",
            patiMrituMiti: "",
            allowanceType: "",
            parichayaNo: "",
            allowanceStartDate: "",
            allowanceStartQuarter: "",
            applicantName: "",
            applicantAddress: "",
            applicantCitizenship: "",
            applicantPhone: "",
          });
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="printable-page">
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="header-section">
            <MunicipalityHeader showLogo />
            <div className="header-meta">
              <div className="left-text">श्री अध्यक्ष ज्यु,</div>
              <div className="right-text">मिति: २०८२।०७।०५</div>
            </div>
            
            {/* ✅ FIXED: Overflow-proof municipality line */}
            <div className="municipality-line">
              <span className="municipality-label">{MUNICIPALITY.name || ""}</span>
              <span>वडा नं.</span>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="ward-input"
              />
            </div>
          </div>

          <h3 className="subject">विषय: नाम दर्ता सम्बन्धमा</h3>

          <p className="paragraph">
            महोदय,
            <br />
            उपरोक्त विषयमा सामाजिक सुरक्षा भत्ता पाउनका लागि नयाँ नाम दर्ता
            गरिदिनुहुन देहायका विवरण सहित यो दरखास्त पेश गरेको छु। मैले राज्य
            कोषबाट मासिक पारिश्रमिक, पेन्सन वा यस्तै प्रकारका कुनै अन्य सुविधा
            पाएको छैन। व्यहोरा ठीक साँचो हो, झुठो ठहरे प्रचलित कानुन बमोजिम सहुँला
            बुझाउँला।
          </p>

          {/* Applicant Section */}
          <div className="form-section">
            <div className="form-row">
              <label>लक्षित समूह: </label>
              <select name="targetGroup" value={formData.targetGroup} onChange={handleChange}>
                <option>जेष्ठ नागरिक (दलित)</option>
                <option>अपांगता भएका व्यक्ति</option>
                <option>एकल महिला</option>
                <option>बालबालिका</option>
              </select>
            </div>

            <div className="two-col">
              <div className="form-group">
                <label>नाम, थर:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>लिङ्ग:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="पुरुष">पुरुष</option>
                  <option value="महिला">महिला</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>
            </div>

            <div className="two-col">
              <div className="form-group">
                <label>बाबुको नाम:</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>आमाको नाम:</label>
                <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group full">
              <label>ठेगाना:</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="two-col">
              <div className="form-group">
                <label>ना.प्र.नं.:</label>
                <input type="text" name="nagariktaNo" value={formData.nagariktaNo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>जारी जिल्ला:</label>
                <input type="text" name="jariJilla" value={formData.jariJilla} onChange={handleChange} />
              </div>
            </div>

            <div className="two-col">
              <div className="form-group">
                <label>जन्म मिति:</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>सम्पर्क मोबाइल नं.:</label>
                <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
              </div>
            </div>

            <div className="sub-heading">विधवाको हकमा</div>

            <div className="two-col">
              <div className="form-group">
                <label>पतिको मृत्यु दर्ता नं.:</label>
                <input type="text" name="patiMrituNo" value={formData.patiMrituNo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>पतिको मृत्यु मिति:</label>
                <input type="date" name="patiMrituMiti" value={formData.patiMrituMiti} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Office Use Section */}
          <div className="bordered-box">
            <h4>कार्यालय प्रयोजनको लागि</h4>
            <div className="form-group">
              <label>नाम दर्ता निर्णय मिति: २०८२।०७।०५</label>
            </div>

            <div className="two-col">
              <div className="form-group">
                <label>भत्ताको किसिम:</label>
                <input type="text" name="allowanceType" value={formData.allowanceType} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>परिचय पत्र नं.:</label>
                <input type="text" name="parichayaNo" value={formData.parichayaNo} onChange={handleChange} />
              </div>
            </div>

            <div className="two-col">
              <div className="form-group">
                <label>भत्ता पाउने सुरु मिति (आ.व.):</label>
                <input type="text" name="allowanceStartDate" value={formData.allowanceStartDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>को (पहिलो) चौमासिकदेखि:</label>
                <input type="text" name="allowanceStartQuarter" value={formData.allowanceStartQuarter} onChange={handleChange} />
              </div>
            </div>
          </div>

          <ApplicantDetailsNp formData={formData} handleChange={handleChange} />

          <div className="button-container">
            <button type="submit" disabled={submitting}>
              {submitting ? "पठाइँ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllowanceForm;