// 30
import React from 'react';
import './BeneficiaryAllowanceTransfer.css';

const BeneficiaryAllowanceTransfer = () => {
  return (
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
          <input type="text" className="line-input medium-input" />
          <span className="red">*</span>
          <select className="inline-select">
              <option>नगर</option>
              <option>गाउँ</option>
          </select>
          <span>कार्यपालिकाको कार्यालय</span>
        </div>
        <div className="addressee-row">
            <label>वडा नं.</label>
            <input type="text" className="line-input small-input" defaultValue="१" />
        </div>
        <div className="addressee-row">
           <span>जिल्ला काठमाडौँ</span>
           <span style={{marginLeft: '50px'}}>प्रदेश</span>
           <span className="red">*</span>
           <input type="text" className="line-input medium-input" />
        </div>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा तालिका - १ बमोजिमको विवरण भएको लाभग्राहीको तालिका - २ बमोजिमको स्थानीय तहमा सामाजिक सुरक्षा लगत स्थानान्तरणको लागि निवेदन दिएको हुँदा निजले आर्थिक वर्ष <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को लागि सामाजिक सुरक्षा भत्ता प्राप्त गर्न नियम अनुसार नवीकरण समेत गर्नुभएकाले निजको नाम यस <span className="bg-gray-text">नागार्जुन</span> को सामाजिक सुरक्षा भत्ता प्राप्त लाभग्राहीको मुख्य अभिलेखबाट नाम हटाई आर्थिक वर्ष <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> चौमासिकबाट निजको निवेदन माग बमोजिम त्यस <input type="text" className="inline-box-input medium-box" required /> <span className="red">*</span> को वडा नं. <input type="text" className="inline-box-input tiny-box" required /> <span className="red">*</span> बाट पाउनेगरि लगत कायम गरिदिनुहुन अनुरोध छ।
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
                          <input type="text" className="table-input" />
                      </td>
                  </tr>
                  <tr>
                      <td className="label-col">भत्ता प्राप्त गरेको चौमासिक</td>
                      <td className="input-col">
                          <span className="red">*</span>
                          <input type="text" className="table-input" />
                      </td>
                  </tr>
                  <tr>
                      <td className="label-col">नागरिकता नं.</td>
                      <td className="input-col">
                          <span className="red">*</span>
                          <input type="text" className="table-input" />
                      </td>
                  </tr>
                  <tr>
                      <td className="label-col">परिचय पत्र नं.</td>
                      <td className="input-col">
                          <span className="red">*</span>
                          <input type="text" className="table-input" />
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
                            <input type="text" className="inline-box-input medium-box" defaultValue="नागार्जुन नगरपालिका" />
                        </td>
                        <td>
                            <label>स्थानीय तह</label>
                            <span className="red">*</span>
                            <input type="text" className="inline-box-input medium-box" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>वडा नं.</label>
                            <span className="red">*</span>
                            <input type="text" className="inline-box-input tiny-box" />
                        </td>
                        <td>
                            <label>वडा नं.</label>
                            <span className="red">*</span>
                            <input type="text" className="inline-box-input tiny-box" />
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
                                <input type="text" className="inline-box-input small-box" />
                                <label>चौमासिक</label>
                                <span className="red">*</span>
                                <input type="text" className="inline-box-input small-box" />
                            </div>
                        </td>
                        <td>
                             <div className="row-group">
                                <label>भत्ता बुझेको अवधि</label>
                            </div>
                            <div className="row-group">
                                <label>आ. व.</label>
                                <span className="red">*</span>
                                <input type="text" className="inline-box-input small-box" />
                                <label>चौमासिक</label>
                                <span className="red">*</span>
                                <input type="text" className="inline-box-input small-box" />
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
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको ठेगाना</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको नागरिकता नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
          <div className="detail-group">
            <label>निवेदकको फोन नं.</label>
            <input type="text" className="detail-input bg-gray" />
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="form-footer">
        <button className="save-print-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
      </div>
      
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default BeneficiaryAllowanceTransfer;