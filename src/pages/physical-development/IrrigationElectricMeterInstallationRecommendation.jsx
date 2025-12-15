import React from "react";
import "./IrrigationElectricMeterInstallationRecommendation.css";

const IrrigationElectricMeterInstallationRecommendation = () => {
  const formDataToObject = (formData) => {
    const obj = {};
    for (const [k, v] of formData.entries()) {
      // if you expect multiple values with same key, push into array here
      obj[k] = v;
    }
    return obj;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = formDataToObject(fd);

    // Example: log payload. Replace with your API endpoint.
    console.log("Form payload:", payload);

    // Example POST (uncomment & adjust URL)
    /*
    fetch("http://localhost:5000/api/irrigation-electric-meter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => console.log("Saved:", data))
      .catch(err => console.error(err));
    */
  };

  return (
    <div className="irrigation-meter-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          सिचाई विद्युत मिटर जडान सिफारिस ।
          <span className="top-right-bread">
            भौतिक निर्माण &gt; सिचाई विद्युत मिटर जडान सिफारिस
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
              पत्र संख्या : <input type="text" className="dotted-input small-input" name="letter_no" />
            </p>
            <p>
              चलानी नं. :{" "}
              <input type="text" className="dotted-input small-input" name="reference_no" />
            </p>
          </div>
          <div className="meta-right">
            <p>
              मिति :{" "}
              <input
                type="text"
                className="dotted-input small-input"
                name="date_bs"
                defaultValue="२०८२-०८-०६"
              />
            </p>
            <p>ने.सं - 1146 थिंलाथ्व, 2 शनिवार</p>
          </div>
        </div>

        {/* --- Subject --- */}
        <div className="subject-section">
          <p>
            विषय:{" "}
            <span className="underline-text">सिचाई विद्युत मिटर जडान सिफारिस सम्बन्धमा।</span>
          </p>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री नेपाल विद्युत प्राधिकरण कार्यालय</span>
          </div>
          <div className="addressee-row">
            <input type="text" className="line-input medium-input" name="recipient_location" placeholder="ठेगाना/शाखा" />
            <span className="red">*</span>
            <span>, काठमाडौँ</span>
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            उपरोक्त सम्बन्धमा साविक जिल्ला काठमाडौँ{" "}
            <input type="text" className="inline-box-input medium-box" name="sabik_local_body_name" />
            <select className="inline-select" name="sabik_local_body_type" defaultValue="">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>{" "}
            वडा नं.{" "}
            <input type="text" className="inline-box-input tiny-box" name="sabik_ward_no" required />{" "}
            <span className="red">*</span> भै हाल{" "}
            <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं.{" "}
            <input type="text" className="inline-box-input tiny-box" name="ward_no" required />{" "}
            <span className="red">*</span> मा बस्ने{" "}
            <input type="text" className="inline-box-input long-box" name="applicant_name" required />{" "}
            <span className="red">*</span> को नाउँमा नम्बरी दर्ता रहेको जग्गा जिल्ला{" "}
            <span className="bg-gray-text">काठमाडौँ</span>{" "}
            <select className="inline-select" name="district_type" defaultValue="">
              <option value=""></option>
              <option value="गा.वि.स.">गा.वि.स.</option>
              <option value="नगरपालिका">नगरपालिका</option>
            </select>{" "}
            वडा नं.{" "}
            <input type="text" className="inline-box-input tiny-box" name="current_sabik_ward_no" required />{" "}
            <span className="red">*</span> हाल{" "}
            <span className="bg-gray-text">नागार्जुन नगरपालिका</span> वडा नं. १ कित्ता नं.{" "}
            <input type="text" className="inline-box-input small-box" name="kitta_no" required />{" "}
            <span className="red">*</span> क्षेत्रफल{" "}
            <input type="text" className="inline-box-input medium-box" name="area_size" required />{" "}
            <span className="red">*</span> भित्र चौहदी रहेको जग्गामा{" "}
            <input type="text" className="inline-box-input medium-box" name="purpose_of_meter" required />{" "}
            लागि{" "}
            <input type="text" className="inline-box-input medium-box" name="meter_capacity" required />{" "}
            जडान गर्न ताहाँ कार्यालयको नियमानुसार आवश्यक कारवाहीका लागि सिफारिस साथ सादर
            अनुरोध गरिन्छ।
          </p>
        </div>

        {/* --- Tapashil (Boundaries) --- */}
        <div className="tapashil-section">
          <h4 className="bold-text underline-text">तपसिल</h4>
          <div className="boundary-list">
            <div className="boundary-item">
              <label>पूर्व :-</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" name="neighbors_east" required />
            </div>
            <div className="boundary-item">
              <label>पश्चिम:-</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" name="neighbors_west" required />
            </div>
            <div className="boundary-item">
              <label>उत्तर :-</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" name="neighbors_north" required />
            </div>
            <div className="boundary-item">
              <label>दक्षिण:-</label>
              <span className="red">*</span>
              <input type="text" className="line-input long-input" name="neighbors_south" required />
            </div>
          </div>
        </div>

        {/* --- Signature Section --- */}
        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <span className="red-mark">*</span>
            <input type="text" className="line-input full-width-input" name="signature_name" required />
            <select className="designation-select" name="signature_designation" defaultValue="">
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
              <input type="text" className="detail-input bg-gray" name="applicant_footer_name" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input type="text" className="detail-input bg-gray" name="applicant_footer_address" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input type="text" className="detail-input bg-gray" name="applicant_footer_citizenship_no" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input type="text" className="detail-input bg-gray" name="applicant_footer_phone" />
            </div>
          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>

        <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
      </form>
    </div>
  );
};

export default IrrigationElectricMeterInstallationRecommendation;
