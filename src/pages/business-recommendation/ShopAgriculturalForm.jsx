// 3
import React from "react";
import "./ShopAgriculturalForm.css";

function ShopAgriculturalForm() {
  return (
    <div className="saf-page">
      {/* Top breadcrumb / title */}
      <header className="saf-topbar">
        <div className="saf-top-left">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</div>
        <div className="saf-top-right">
          अवलोकन पृष्ठ / पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी
        </div>
      </header>

      {/* Main paper */}
      <div className="saf-paper">
        {/* Main heading */}
        <h2 className="saf-main-title">पसल, कृषि, पक्षी फार्म दर्ता मन्जुरी</h2>

        {/* First line: Province/District/Palika/Ward */}
        <div className="saf-inline-row">
          <span>लिखित</span>
          <select>
            <option>बागमती प्रदेश</option>
          </select>
          <span>जिल्ला</span>
          <select>
            <option>काठमाडौं</option>
          </select>
          <span>स्थानीय तह</span>
          <select>
            <option>नागार्जुन नगरपालिका</option>
          </select>
          <span>वडा नं.</span>
          <input type="text" className="saf-small" />
        </div>

        {/* Second line: Name / age / etc. */}
        <div className="saf-inline-row">
          <span>साबिक</span>
          <input type="text" className="saf-medium" />
          <span>का</span>
          <input type="text" className="saf-small" />
          <span>वर्ष</span>
          <input type="text" className="saf-tiny" />
          <span>का श्री</span>
          <input type="text" className="saf-medium" />
          <span>को तर्फबाट</span>
          <input type="text" className="saf-medium" />
        </div>

        {/* Third line – ward, sabik ward, etc. */}
        <div className="saf-inline-row">
          <span>उक्त</span>
          <input type="text" className="saf-medium" />
          <span>को नाममा पासल / कृषि फार्म दर्ता मन्जुर भएको पूर्व</span>
          <input type="text" className="saf-medium" />
          <span>नं. नागार्जुन नगरपालिका वडा नं.</span>
          <input type="text" className="saf-tiny" />
          <span>साबिक वडा नं.</span>
          <input type="text" className="saf-tiny" />
          <span>को</span>
        </div>

        <div className="saf-inline-row">
          <span>जमिन</span>
          <input type="text" className="saf-medium" />
          <span>को स्थानमा रहेको</span>
          <input type="text" className="saf-medium" />
          <span>किराना / कृषि / पशुपंक्षी फार्मको मिति</span>
          <input type="text" className="saf-small" />
          <span>देखि</span>
          <input type="text" className="saf-small" />
          <span>सम्म संचालन गर्न मन्जुरी दिएको छ ।</span>
        </div>

        <p className="saf-body">
          सोही अनुसार उल्लेखित स्थानीय तहमा पर्ने आयु क्षेत्र भित्र उल्लेखित
          स्थानमा पसल, कृषि, पशुपंक्षी फार्म सञ्चालन गर्न अनुमति दिईयो । उद्योग
          संचालन गर्दा स्वास्थ्यसम्बन्धी नियम, सरसफाइ, वातावरणीय सुरक्षा आदि
          विषयमा पालना गर्नुपर्ने छ । आवश्यक परेको खण्डमा सम्बन्धित कार्यालयबाट
          मन्जुरी प्राप्त गर्नुपर्ने र सो अनुरूप अनुशासन पालना गर्नुपर्ने व्यहोरा
          सम्झाइन्छ ।
        </p>

        {/* Period text line */}
        <div className="saf-inline-row">
          <span>यी शब्दमा, साल</span>
          <input type="text" className="saf-small" />
          <span>महिना</span>
          <input type="text" className="saf-small" />
          <span>गते सुपुर्द ।</span>
        </div>

        {/* Tapsil heading */}
        <h3 className="saf-subtitle">तपशिल</h3>

        <div className="saf-field-row">
          <span>१) पूर्व दिशाको सीमाना वर्ष *</span>
          <input type="text" />
        </div>
        <div className="saf-field-row">
          <span>२) पश्चिम दिशाको सीमाना वर्ष *</span>
          <input type="text" />
        </div>
        <div className="saf-field-row">
          <span>३) उत्तर दिशाको सीमाना वर्ष *</span>
          <input type="text" />
        </div>
        <div className="saf-field-row">
          <span>४) दक्षिण दिशाको सीमाना वर्ष *</span>
          <input type="text" />
        </div>

        {/* Rohabar section */}
        <h3 className="saf-subtitle">रोहबर</h3>
        <div className="saf-inline-row">
          <span>नागार्जुन नगरपालिका</span>
          <input type="text" className="saf-tiny" />
          <span>नं. वडा का पदधारी</span>
          <select>
            <option>पद छनौट गर्नुहोस्</option>
          </select>
          <span>श्री</span>
          <input type="text" className="saf-medium" />
        </div>

        {/* Applicant details */}
        <h3 className="saf-subtitle">निवेदकको विवरण</h3>
        <div className="saf-applicant-box">
          <div className="saf-field">
            <label>निवेदकको नाम *</label>
            <input type="text" />
          </div>
          <div className="saf-field">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" />
          </div>
          <div className="saf-field">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" />
          </div>
          <div className="saf-field">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" />
          </div>
        </div>

        {/* Submit button */}
        <div className="saf-submit-row">
          <button className="saf-submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="saf-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default ShopAgriculturalForm;
