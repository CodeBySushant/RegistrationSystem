import React from "react";
import "./FreeElectricityConnectionRecommendation.css";

const FreeElectricityConnectionRecommendation = () => {
  // helper to convert FormData to plain object
  const formDataToObject = (formData) => {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      // if multiple values with same name needed, handle arrays here
      obj[key] = value;
    }
    return obj;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = formDataToObject(fd);

    // Example: log payload. Replace with fetch/axios to your API endpoint
    console.log("Form payload:", payload);

    // Example: how to POST to your API (uncomment and modify URL)
    /*
    fetch("http://localhost:5000/api/free-electricity-connection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => console.log("Saved:", data))
      .catch(err => console.error("Error:", err));
    */
  };

  return (
    <div className="free-electricity-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          निशुल्क विद्युत जडान सिफारिस ।
          <span className="top-right-bread">
            भौतिक निर्माण &gt; निशुल्क विद्युत जडान सिफारिस
          </span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <div className="header-logo">
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
              पत्र संख्या : <span className="bold-text">२०८२/८३</span>
            </p>
            <p>
              चलानी नं. :{" "}
              <input
                type="text"
                className="dotted-input small-input"
                name="reference_no"
              />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति : <input type="text" className="dotted-input small-input" name="date_bs" defaultValue="२०८२-०८-०६" />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय: <span className="underline-text">निशुल्क विद्युत जडान सिफारिस।</span>
          </p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span className="bold-text">श्री नेपाल विद्युत प्राधिकरण</span>
          </div>
          <div className="addressee-row">
            <span className="bold-text underline-text">काठमाडौँ</span>
            <span style={{ float: "right" }}>|</span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत बिषयमा काठमाडौँ{" "}
            <span className="bg-gray-text">जिल्ला नागार्जुन नगरपालिका</span>{" "}
            वडा नं. १ साविक{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="sabik_local_body_name"
            />{" "}
            <select
              className="inline-select"
              name="sabik_local_body_type"
              defaultValue=""
            >
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>
            &nbsp;वडा नं.&nbsp;
            <input
              type="text"
              className="inline-box-input tiny-box"
              name="sabik_ward_no"
              required
            />{" "}
            <span className="red">*</span> मा रहेका{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="applicant_role_in_plot"
              required
            />{" "}
            <span className="red">*</span> को निवेदन अनुसार{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="applicant_name"
              required
            />{" "}
            <span className="red">*</span> नाममा रहेको कि नं{" "}
            <input
              type="text"
              className="inline-box-input small-box"
              name="kitta_no"
              required
            />{" "}
            <span className="red">*</span> जग्गामा नयाँ निर्माण भई सकेको र उक्त भवनमा
            मिटर जडान गर्न आवश्यक परेको उक्त कि.नं.{" "}
            <input
              type="text"
              className="inline-box-input small-box"
              name="new_kitta_no"
              required
            />{" "}
            <span className="red">*</span> मा बनेको भवन देखी पूर्व तर्फ{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="neighbors_east"
              required
            />{" "}
            <span className="red">*</span> को जग्गा पश्चिममा{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="neighbors_west"
              required
            />{" "}
            <span className="red">*</span> को जग्गा उत्तरमा लालसिंह{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="neighbors_north"
              required
            />{" "}
            <span className="red">*</span> को जग्गा र दक्षिण{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="neighbors_south"
              required
            />{" "}
            <span className="red">*</span> को जग्गा यति चार किल्ला भित्र माथी उल्लेखित
            कित्तामा निजको छोरा{" "}
            <input
              type="text"
              className="inline-box-input medium-box"
              name="applicant_child_name"
              required
            />{" "}
            <span className="red">*</span> ले घर बनाई बसोवास गर्दै आएको निज जुद्ध
            विपन्न दलित परिवारको भएकोले निजलाई यस घरमा निशुल्क विद्युत मिटर
            उपलब्ध गराई जडानका लागी आवश्यक सहयोग गरिदिनु हुन सिफारिस साथ
            अनुरोध छ ।
          </p>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line" />
            <span className="red-mark">*</span>
            <input
              type="text"
              className="line-input full-width-input"
              name="signature_name"
              required
            />
            <select className="designation-select" name="signature_designation">
              <option value="">पद छनौट गर्नुहोस्</option>
              <option value="वडा अध्यक्ष">वडा अध्यक्ष</option>
              <option value="वडा सचिव">वडा सचिव</option>
              <option value="कार्यवाहक वडा अध्यक्ष">कार्यवाहक वडा अध्यक्ष</option>
            </select>
          </div>
        </div>

        {/* --- Applicant Details Box --- */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input
                type="text"
                className="detail-input bg-gray"
                name="applicant_footer_name"
              />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input
                type="text"
                className="detail-input bg-gray"
                name="applicant_footer_address"
              />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input
                type="text"
                className="detail-input bg-gray"
                name="applicant_footer_citizenship_no"
              />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input
                type="text"
                className="detail-input bg-gray"
                name="applicant_footer_phone"
              />
            </div>
          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
        </div>
      </form>
    </div>
  );
};

export default FreeElectricityConnectionRecommendation;
