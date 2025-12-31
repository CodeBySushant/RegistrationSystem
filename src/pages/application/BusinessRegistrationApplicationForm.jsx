// src/pages/application/BusinessRegistrationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BusinessRegistrationApplicationForm.css";
import { MUNICIPALITY } from "../../config/municipalityConfig.js";

const initialState = {
  businessNameNp: "",
  businessNameEn: "",
  businessTole: "",
  businessDistrict: "",
  businessWard: "",
  businessRoad: "",
  businessHouseNo: "",
  businessPhone: "",
  capitalAmount: "",
  capitalInWords: "",
  businessObjective: "",
  mainGoods: "",
  proprietorName: "",
  permDistrict: "",
  permWard: "",
  permTole: "",
  permPhone: "",
  citizenshipNo: "",
  citizenshipIssueDistrict: "",
  citizenshipIssueDate: "",
  tempAddress: "",
  tempDistrict: "",
  tempWard: "",
  tempTole: "",
  grandfatherName: "",
  grandfatherAddress: "",
  fatherName: "",
  fatherAddress: "",
  husbandName: "",
  husbandAddress: "",

  applicantSignature: "", // निवेदकको सही
  witnessName: "", // सनाखत गर्नेको सही

  applicant_name: "",
  applicant_address: "",
  applicant_citizenship_no: "",
  applicant_phone: "",
  municipality: MUNICIPALITY?.name || "",
  wardNo: "",
};

const BusinessRegistrationApplicationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.businessNameNp?.trim())
      return "व्यवसायको नाम (नेपाली) आवश्यक छ";
    if (!formData.proprietorName?.trim()) return "प्रोप्राइटरको नाम आवश्यक छ";
    if (!formData.applicant_name?.trim()) return "निवेदकको नाम आवश्यक छ";
    if (!formData.applicant_phone?.trim()) return "फोन नम्बर आवश्यक छ";
    return null;
  };

  const Required = () => <span className="required">*</span>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      alert("कृपया आवश्यक क्षेत्र भर्नुहोस्: " + error);
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      Object.keys(payload).forEach(
        (k) => payload[k] === "" && (payload[k] = null)
      );

      const res = await axios.post("/api/forms/business-registration", payload);

      if (res.status === 201 || res.status === 200) {
        alert("सफलतापूर्वक सुरक्षित भयो! ID: " + (res.data?.id || ""));
        setTimeout(() => {
          window.print();
          setFormData(initialState);
          setFormKey((k) => k + 1);
        }, 300);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "केही गल्ती भयो";
      alert("त्रुटि: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="business-reg-container">
      <form key={formKey} onSubmit={handleSubmit}>
        {/* Title */}
        <div className="top-bar-title">
          व्यवसाय दर्ता गर्ने दरखास्त।
          <span className="top-right-bread">
            व्यापार / व्यवसाय &gt; व्यवसाय दर्ता गर्ने दरखास्त
          </span>
        </div>

        {/* श्री ... ज्यू */}
        <div className="shree-block">
          <div className="shree-row">
            <span>श्री</span>
            <span className="required">*</span>
            <input
              type="text"
              className="inline-input name-input"
              placeholder="पदको नाम"
            />
            <span>ज्यू,</span>
          </div>
          <div className="shree-stack">
            <div className="stack-row">
              <span className="required">*</span>
              <input
                type="text"
                className="stack-input"
                placeholder="कार्यालयको नाम"
              />
            </div>
            <div className="stack-row">
              <span className="required">*</span>
              <input type="text" className="stack-input" placeholder="जिल्ला" />
            </div>
            <div className="stack-row">
              <span className="required">*</span>
              <input
                type="text"
                className="stack-input"
                placeholder="नगरपालिका/गाउँपालिका"
              />
            </div>
          </div>
        </div>

        <div className="subject-line">
          <strong>
            विषय: <u>व्यवसाय दर्ता गर्ने बारे।</u>
          </strong>
        </div>

        <p className="certificate-body">
          महोदय,
          <br />
          तल लेखिए बमोजिमको व्यहोरा जनाइ म/हामीले देहायको फर्म/कम्पनी दर्ता गरी
          पाउँ भनी यो निवेदन पेस गरेका छौं। निवेदनसाथ सक्कली कागजातहरू संलग्न
          गरेका छौं। सो को जाँचबुझ गरी कानुनबमोजिम दर्ता गरिदिनुहुन अनुरोध छ।
        </p>

        {/* Main Form Fields */}
        <div className="form-section">
          <div className="form-group-flex">
            <label>
              १. व्यवसायको पूरा नाम (नेपालीमा): <Required />
            </label>
            <input
              type="text"
              name="businessNameNp"
              value={formData.businessNameNp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-flex">
            <label>
              २. व्यवसायको पूरा नाम (अंग्रेजीमा ठूलो अक्षरमा):
              <Required />
            </label>
            <input
              type="text"
              name="businessNameEn"
              value={formData.businessNameEn}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-flex">
            <label>
              ३. व्यवसायको ठेगाना:
              <Required />
            </label>
            <input
              type="text"
              name="businessTole"
              value={formData.businessTole}
              onChange={handleChange}
            />
            <label>
              जिल्ला:
              <Required />
            </label>
            <input
              type="text"
              name="businessDistrict"
              value={formData.businessDistrict}
              onChange={handleChange}
            />
            <label>
              वडा नं:
              <Required />
            </label>
            <input
              type="text"
              name="businessWard"
              value={formData.businessWard}
              onChange={handleChange}
            />
            <label>
              बाटो:
              <Required />
            </label>
            <input
              type="text"
              name="businessRoad"
              value={formData.businessRoad}
              onChange={handleChange}
            />
            <label>
              घर नं:
              <Required />
            </label>
            <input
              type="text"
              name="businessHouseNo"
              value={formData.businessHouseNo}
              onChange={handleChange}
            />
            <label>
              फोन:
              <Required />
            </label>
            <input
              type="text"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-flex">
            <label>
              ४. व्यवसायमा लगानी गर्ने पूँजी रु:
              <Required />
            </label>
            <input
              type="text"
              name="capitalAmount"
              value={formData.capitalAmount}
              onChange={handleChange}
            />
            <label>
              (अक्षरेपी):
              <Required />
            </label>
            <input
              type="text"
              name="capitalInWords"
              value={formData.capitalInWords}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-flex">
            <label>
              ५. व्यवसायको उद्देश्य:
              <Required />
            </label>
            <select
              name="businessObjective"
              value={formData.businessObjective}
              onChange={handleChange}
              className="biz-select"
            >
              <option value="">-- छनोट गर्नुहोस् --</option>
              <option value="व्यापार">स्थानीय व्यापार</option>
              <option value="सेवा">सेवामूलक व्यवसाय</option>
            </select>
          </div>

          <div className="form-group-flex">
            <label>
              ६. कारोबार हुने मुख्य वस्तु/सेवाको विवरण:
              <Required />
            </label>
            <input
              type="text"
              name="mainGoods"
              value={formData.mainGoods}
              onChange={handleChange}
              style={{ flex: 2 }}
            />
          </div>

          <div className="form-group-flex">
            <label>
              ७. प्रोप्राइटरको पूरा नाम:
              <Required />
            </label>
            <input
              type="text"
              name="proprietorName"
              value={formData.proprietorName}
              onChange={handleChange}
            />
          </div>

          {/* Permanent Address */}
          <div className="form-group-flex">
            <label>स्थायी ठेगाना (नागरिकता अनुसार):</label>
            <label>
              जिल्ला:
              <Required />
            </label>
            <input
              type="text"
              name="permDistrict"
              value={formData.permDistrict}
              onChange={handleChange}
            />
            <label>
              वडा:
              <Required />
            </label>
            <input
              type="text"
              name="permWard"
              value={formData.permWard}
              onChange={handleChange}
            />
            <label>
              टोल:
              <Required />
            </label>
            <input
              type="text"
              name="permTole"
              value={formData.permTole}
              onChange={handleChange}
            />
            <label>
              फोन:
              <Required />
            </label>
            <input
              type="text"
              name="permPhone"
              value={formData.permPhone}
              onChange={handleChange}
            />
            <label>
              नागरिकता नं:
              <Required />
            </label>
            <input
              type="text"
              name="citizenshipNo"
              value={formData.citizenshipNo}
              onChange={handleChange}
            />
            <label>
              जारी जिल्ला:
              <Required />
            </label>
            <input
              type="text"
              name="citizenshipIssueDistrict"
              value={formData.citizenshipIssueDistrict}
              onChange={handleChange}
            />
            <label>
              जारी मिति:
              <Required />
            </label>
            <input
              type="date"
              name="citizenshipIssueDate"
              value={formData.citizenshipIssueDate}
              onChange={handleChange}
            />
          </div>

          {/* Temporary Address */}
          <div className="form-group-flex">
            <label>
              हालको ठेगाना:
              <Required />
            </label>
            <input
              type="text"
              name="tempAddress"
              value={formData.tempAddress}
              onChange={handleChange}
            />
            <label>
              जिल्ला:
              <Required />
            </label>
            <input
              type="text"
              name="tempDistrict"
              value={formData.tempDistrict}
              onChange={handleChange}
            />
            <label>
              वडा:
              <Required />
            </label>
            <input
              type="text"
              name="tempWard"
              value={formData.tempWard}
              onChange={handleChange}
            />
            <label>
              टोल:
              <Required />
            </label>
            <input
              type="text"
              name="tempTole"
              value={formData.tempTole}
              onChange={handleChange}
            />
          </div>

          {/* तीन पुस्ते */}
          <div className="form-group-flex">
            <label>८. प्रोप्राइटरको तीन पुस्ते:</label>
          </div>
          <div className="form-group-flex">
            <label>
              (क) बाजेको नाम:
              <Required />
            </label>
            <input
              type="text"
              name="grandfatherName"
              value={formData.grandfatherName}
              onChange={handleChange}
            />
            <label>
              ठेगाना:
              <Required />
            </label>
            <input
              type="text"
              name="grandfatherAddress"
              value={formData.grandfatherAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-flex">
            <label>
              (ख) बाबुको नाम:
              <Required />
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <label>
              ठेगाना:
              <Required />
            </label>
            <input
              type="text"
              name="fatherAddress"
              value={formData.fatherAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-flex">
            <label>
              (ग) विवाहित महिलाको हकमा पतिको नाम:
              <Required />
            </label>
            <input
              type="text"
              name="husbandName"
              value={formData.husbandName}
              onChange={handleChange}
            />
            <label>
              ठेगाना:
              <Required />
            </label>
            <input
              type="text"
              name="husbandAddress"
              value={formData.husbandAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* form-section बन्द भयो */}

        {/* निवेदकको भाग */}
        <div className="right-row-wrapper">
          <div className="right-row-title">निवेदक</div>
          <div className="right-row">
            <label className="right-label">
              प्रोप्राइटरको नाम :<Required />
            </label>
            <input
              type="text"
              name="proprietorName"
              value={formData.proprietorName}
              onChange={handleChange}
              className="right-row-input"
            />
          </div>
        </div>

        {/* निवेदकको सही + औंठा */}
        <div className="right-signature-wrapper">
          <div className="signature-row">
            <label>सही :</label>
            <input
              type="text"
              name="applicantSignature"
              value=""
              readOnly
              className="signature-input"
            />
          </div>
          <div className="thumb-box-wrapper">
            <div className="thumb-header">
              <span>दायाँ</span>
              <span>बायाँ</span>
            </div>
            <div className="thumb-body">
              <div className="thumb-cell"></div>
              <div className="thumb-cell"></div>
            </div>
          </div>
        </div>

        <div className="kabuliyat-wrapper">
          <div className="kabuliyat-title">कबुलियतनामा</div>

          {/* Paragraph */}
          <p className="kabuliyat-text">
            लिखितम्
            <Required />
            <input className="inline-input long" />
            को नातो
            <select className="inline-select">
              <option>नाति</option>
              <option>नातिनी</option>
            </select>
            <Required />
            <input className="inline-input medium" />
            को छोरा
            <select className="inline-select">
              <option value="">छनोट</option>
              <option>छोरा</option>
              <option>छोरी</option>
            </select>
            <Required />
            <input className="inline-input medium" />
            बसे वर्ष
            <Required />
            <input className="inline-input small" />
            को
            <Required />
            <input className="inline-input medium" />
            अगाडि
            <Required />
            <input className="inline-input medium" />
            को नामले व्यवसाय दर्ता गर्न निले यस वडा कार्यालयमा दरखास्त दिएकोमा
            उक्त व्यवसाय सम्बन्धमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा
            नियम समेत पालना गरी काम गर्नेछु। सो पालना गर्ने कुरामा कबुलियत समेत
            गर्ने तपाईको मंजुर छ / छैन भनी वडा कार्यालयबाट सोधनी भएकोमा मेरो
            चित्त बुझ्यो। यसमा प्रचलित ऐन कानुन र यस नगरपालिकाको शर्त तथा नियम
            उल्लंघन गरेको देखिएमा ऐन कानुन बमोजिम सहुँला, बुझाउँला पनि मेरो
            मनोमानी राजी खुशी संग यो कबुलियत नामको कागज लेखी
            <Required />
            <input className="inline-input medium" />
            वडा नं
            <Required />
            <input className="inline-input small" />
            को कार्यालयमा चढाएँ।
          </p>
        </div>
        <div className="date-center-row">
          <span>ईतिसंवत</span>
          <Required />
          <input className="date-input small" />
          <span>साल</span>
          <Required />
          <input className="date-input small" />
          <span>महिना</span>
          <Required />
          <input className="date-input small" />
          <span>गतेरोज</span>
          <Required />
          <input className="date-input small" />
          <span>शुभम्</span>{" "}
        </div>
        <div className="sanakhat-title">(सनाखत सम्बन्धी कागजात)</div>
        <div className="sanakhat-paragraph">
          यसमा लेखिएको फारम तथा कबुलियतनामा म आफै स्वयं
          <Required />
          <input type="text" name="self_name" className="inline-input long" />
          को
          <Required />
          <input type="text" name="ward_no" className="inline-input small" />
          नं वडा कार्यालयमा उपस्थित भई दर्ता गरिएको हुँ । निवेदन संग संलग्न
          नागरिकता प्रमाणपत्रको प्रतिलिपी फोटो तथा अन्य कागजातहरु मेरा आफ्नै
          हुन् । माथि उल्लिखित सम्पूर्ण व्यहोरा समेत साँचो हो । कुनै कुरा फरक
          परेमा कानून बमोजिम सहुँला बुझाउँला पनि सनाखत गर्ने ।
        </div>

        <div className="right-signature-wrapper">
          <div className="signature-row">
            <label>
              प्रोप्राइटरको नाम : <Required />
            </label>
            <input
              type="text"
              name="witnessName"
              value={formData.witnessName}
              onChange={handleChange}
              className="signature-input"
            />{" "}
          </div>

          <div className="thumb-box-wrapper">
            <div className="thumb-header">
              <span>दायाँ</span>
              <span>बायाँ</span>
            </div>
            <div className="thumb-body">
              <div className="thumb-cell"></div>
              <div className="thumb-cell"></div>
            </div>
          </div>
        </div>

        <div className="tippani-section">
          <div className="tippani-heading">
            <h3>टिप्पणी</h3>
            <p>(वडा कार्यालयले मात्र भर्ने)</p>
          </div>
          <div className="tippani-paragraph">
            श्रीमान्
            <Required />
            <input className="inline-input medium" />
            नामक व्यवसाय
            <Required />
            <input className="inline-input long" />
            को नाममा दर्ता गरी पाउन आवश्यक सबै कागजातहरु रितपूर्वक पेश हुन आएको
            माग बमोजिम दर्ता गरिदिन मनासिव र<Required />
            अख्तेयी र<Required />
            <input className="inline-input medium" />
            राजश्व लिई निजको नाममा व्यवसाय दर्ता गरी प्रमाणपत्र दिनको निमित्त
            निर्णयार्थ पेश गरेको छु ।
          </div>
          <div className="tippani-footer">
            <div className="tippani-sign">
              <Required />
              <input className="line-input" />
              <label>पेश गर्ने</label>
            </div>

            <div className="tippani-sign">
              <Required />
              <input className="line-input" />
              <label>सदर गर्ने</label>
            </div>
          </div>
        </div>

        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>
                निवेदकको नाम <Required />
              </label>
              <input
                name="applicant_name"
                className="detail-input bg-gray"
                value={formData.applicant_name}
                onChange={handleChange}
              />
            </div>
            <div className="detail-group">
              <label>
                ठेगाना <Required />
              </label>
              <input
                name="applicant_address"
                className="detail-input bg-gray"
                value={formData.applicant_address}
                onChange={handleChange}
              />
            </div>
            <div className="detail-group">
              <label>
                नागरिकता नं. <Required />
              </label>
              <input
                name="applicant_citizenship_no"
                className="detail-input bg-gray"
                value={formData.applicant_citizenship_no}
                onChange={handleChange}
              />
            </div>
            <div className="detail-group">
              <label>
                फोन नं. <Required />
              </label>
              <input
                name="applicant_phone"
                className="detail-input bg-gray"
                value={formData.applicant_phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "पठाउँदै..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessRegistrationApplicationForm;
