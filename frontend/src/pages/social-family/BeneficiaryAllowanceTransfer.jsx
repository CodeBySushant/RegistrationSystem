// src/components/BeneficiaryAllowanceTransfer.jsx
import React, { useState } from "react";
import "./BeneficiaryAllowanceTransfer.css";

const FORM_KEY = "beneficiary-allowance-transfer";
const API_BASE = import.meta.env.VITE_API_BASE || ""; // Vite; if CRA use process.env.REACT_APP_API_BASE
const API_URL = `${API_BASE}/api/forms/${FORM_KEY}`;

export default function BeneficiaryAllowanceTransfer() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const form = e.target;

      // collect flat fields via FormData
      const fd = new FormData(form);
      const flat = {};
      for (const [k, v] of fd.entries()) {
        flat[k] = v;
      }

      // Build grouped objects for clarity (these will be JSON-stringified by backend)
      const beneficiary = {
        name: flat.beneficiary_name || null,
        quarter: flat.beneficiary_quarter || null,
        citizenship_no: flat.beneficiary_citizenship || null,
        card_no: flat.beneficiary_card_no || null
      };

      const transfer = {
        old_local_level: flat.old_local_level || null,
        old_ward: flat.old_ward || null,
        old_year: flat.old_year || null,
        old_quarter: flat.old_quarter || null,
        new_local_level: flat.new_local_level || null,
        new_ward: flat.new_ward || null,
        new_year: flat.new_year || null,
        new_quarter: flat.new_quarter || null
      };

      const applicant = {
        name: flat.applicant_name || null,
        address: flat.applicant_address || null,
        citizenship_no: flat.applicant_citizenship_no || null,
        phone: flat.applicant_phone || null
      };

      // top-level fields
      const payload = {
        chalani_no: flat.chalani_no || null,
        fiscal_year_from: flat.fiscal_year_from || null,
        fiscal_year_to: flat.fiscal_year_to || null,
        target_local_level: flat.target_local_level || null,
        target_ward_no: flat.target_ward_no || null,
        beneficiary,
        transfer,
        applicant,
        notes: flat.notes || null
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");

      setMsg({ type: "success", text: `Saved (id: ${data.id})` });
      // optional: form.reset();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="beneficiary-transfer-form">
      <div className="beneficiary-transfer-container">
        {/* --- Top Bar --- */}
        <div className="top-bar-title">
          लाभग्राहीको लगत स्थानान्तरण ।
          <span className="top-right-bread">सामाजिक / पारिवारिक &gt; लाभग्राहीको लगत स्थानान्तरण</span>
        </div>

        {/* --- Header Section --- */}
        <div className="form-header-section">
          <p className="header-top-small bold-text">अनुसूची - ९</p>
          <p className="header-top-small">(दफा १८ (क) सँग सम्बन्धित)</p>
          <h1 className="municipality-name">नागार्जुन नगरपालिका नगर कार्यपालिकाको कार्यालय</h1>
          <p className="address-text bold-text">काठमाडौँ जिल्ला बागमती प्रदेश</p>
          <h3 className="subject-title">विषय : लाभग्राहीको लगत स्थानान्तरण सम्बन्धमा</h3>
        </div>

        {/* --- Addressee Section --- */}
        <div className="addressee-section">
          <div className="addressee-row">
            <span>श्री</span>
            <input name="addressee_name" type="text" className="line-input medium-input" />
            <span className="red">*</span>
            <select name="addressee_type" className="inline-select">
                <option value="नगर">नगर</option>
                <option value="गाउँ">गाउँ</option>
            </select>
            <span>कार्यपालिकाको कार्यालय</span>
          </div>
          <div className="addressee-row">
              <label>वडा नं.</label>
              <input name="addressee_ward" type="text" className="line-input small-input" defaultValue="१" />
          </div>
          <div className="addressee-row">
             <span>जिल्ला काठमाडौँ</span>
             <span style={{marginLeft: '50px'}}>प्रदेश</span>
             <span className="red">*</span>
             <input name="province" type="text" className="line-input medium-input" />
          </div>
        </div>

        {/* --- Main Body --- */}
        <div className="form-body">
          <p className="body-paragraph">
            प्रस्तुत विषयमा तालिका - १ बमोजिमको विवरण भएको लाभग्राहीको तालिका - २ बमोजिमको स्थानीय तहमा सामाजिक सुरक्षा लगत स्थानान्तरणको लागि निवेदन दिएको हुँदा निजले आर्थिक वर्ष 
            <input name="fiscal_year_from" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को लागि सामाजिक सुरक्षा भत्ता प्राप्त गर्न नियम अनुसार नवीकरण समेत गर्नुभएकाले निजको नाम यस 
            <span className="bg-gray-text">नागार्जुन</span> को सामाजिक सुरक्षा भत्ता प्राप्त लाभग्राहीको मुख्य अभिलेखबाट नाम हटाई आर्थिक वर्ष 
            <input name="fiscal_year_to" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> चौमासिकबाट निजको निवेदन माग बमोजिम त्यस 
            <input name="target_local_level" type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को वडा नं. 
            <input name="target_ward_no" type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> बाट पाउनेगरि लगत कायम गरिदिनुहुन अनुरोध छ।
          </p>
        </div>

        {/* --- Tapsil List --- */}
        <div className="tapsil-section">
            <h4 className="underline-text bold-text">तपसिल :</h4>
            <ol className="tapsil-list">
                <li>१. निवेदकको नागरिकताको प्रमाण पत्रको प्रतिलिपि थान एक ।</li>
                <li>२. बसाई सराई गरि आएको पत्रको प्रतिलिपि थान एक ।</li>
                <li>३. भत्ता बुझ्ने परिचय पत्रको सक्कलै थान एक ।</li>
            </ol>
        </div>

        {/* --- Table 1: Beneficiary Details --- */}
        <div className="table-section">
            <p>तालिका नं. - १ : (लाभग्राहीको विवरण ।)</p>
            <table className="beneficiary-table">
                <tbody>
                    <tr>
                        <td className="label-col">नाम थर</td>
                        <td className="input-col">
                            <span className="red">*</span>
                            <input name="beneficiary_name" type="text" className="table-input" />
                        </td>
                    </tr>
                    <tr>
                        <td className="label-col">भत्ता प्राप्त गरेको चौमासिक</td>
                        <td className="input-col">
                            <span className="red">*</span>
                            <input name="beneficiary_quarter" type="text" className="table-input" />
                        </td>
                    </tr>
                    <tr>
                        <td className="label-col">नागरिकता नं.</td>
                        <td className="input-col">
                            <span className="red">*</span>
                            <input name="beneficiary_citizenship" type="text" className="table-input" />
                        </td>
                    </tr>
                    <tr>
                        <td className="label-col">परिचय पत्र नं.</td>
                        <td className="input-col">
                            <span className="red">*</span>
                            <input name="beneficiary_card_no" type="text" className="table-input" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* --- Table 2: Transfer Details --- */}
        <div className="table-section">
            <p>तालिका नं. - २ : (भत्ता स्थानान्तरणको लागि निवेदकले पेश गर्नुपर्ने विवरण ।)</p>
            <div className="table-responsive">
              <table className="transfer-table">
                  <thead>
                      <tr>
                          <th style={{width: '50%'}}>साविक स्थानीय तह</th>
                          <th style={{width: '50%'}}>हाल कायम भएको स्थानीय तह</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                              <label>स्थानीय तह</label>
                              <input name="old_local_level" type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन नगरपालिका" />
                          </td>
                          <td>
                              <label>स्थानीय तह</label>
                              <span className="red">*</span>
                              <input name="new_local_level" type="text" className="inline-box-input medium-box" />
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <label>वडा नं.</label>
                              <span className="red">*</span>
                              <input name="old_ward" type="text" className="inline-box-input tiny-box" />
                          </td>
                          <td>
                              <label>वडा नं.</label>
                              <span className="red">*</span>
                              <input name="new_ward" type="text" className="inline-box-input tiny-box" />
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <div className="row-group">
                                  <label>भत्ता बुझेको अवधि</label>
                              </div>
                              <div className="row-group">
                                  <label>आ. व.</label>
                                  <span className="red">*</span>
                                  <input name="old_year" type="text" className="inline-box-input small-box" />
                                  <label>चौमासिक</label>
                                  <span className="red">*</span>
                                  <input name="old_quarter" type="text" className="inline-box-input small-box" />
                              </div>
                          </td>
                          <td>
                               <div className="row-group">
                                  <label>भत्ता बुझेको अवधि</label>
                              </div>
                              <div className="row-group">
                                  <label>आ. व.</label>
                                  <span className="red">*</span>
                                  <input name="new_year" type="text" className="inline-box-input small-box" />
                                  <label>चौमासिक</label>
                                  <span className="red">*</span>
                                  <input name="new_quarter" type="text" className="inline-box-input small-box" />
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>

        {/* --- Applicant Details Box --- */}
        <div className="applicant-details-box">
          <h3>निवेदकको विवरण</h3>
          <div className="details-grid">
            <div className="detail-group">
              <label>निवेदकको नाम</label>
              <input name="applicant_name" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको ठेगाना</label>
              <input name="applicant_address" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको नागरिकता नं.</label>
              <input name="applicant_citizenship_no" type="text" className="detail-input bg-gray" />
            </div>
            <div className="detail-group">
              <label>निवेदकको फोन नं.</label>
              <input name="applicant_phone" type="text" className="detail-input bg-gray" />
            </div>
          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="form-footer">
          <button type="submit" className="save-print-btn" disabled={loading}>
            {loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}
          </button>
        </div>

        {msg && (
          <div style={{ marginTop: 8, color: msg.type === "error" ? "red" : "green" }}>
            {msg.text}
          </div>
        )}

        <div className="copyright-footer">
          © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
        </div>
      </div>
    </form>
  );
}
