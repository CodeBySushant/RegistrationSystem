import React, { useState } from 'react';
import './ImpoverishedCitizenApplicationandRecommendation.css'; // The CSS file for styling

const ImpoverishedCitizenApplicationandRecommendation = () => {
  const [formData, setFormData] = useState({
    headerTo: 'श्रीमान् अध्यक्षज्यु',
    headerOffice: 'वं वडा कार्यालय,',
    // Section 1
    patientName: '',
    age: '',
    gender: 'पुरुष',
    permJilla: '',
    permPalika: '',
    permWarda: '',
    tempJilla: '',
    tempPalika: '',
    tempWarda: '',
    ethnicity: 'ब्राहमण',
    familySize: '',
    // Section 2
    incomeSource: '',
    monthlyIncome: '',
    // Section 4
    bankName: '',
    bankBranch: '',
    accountNo: '',
    // Section 5
    healthStatus: 'रुहु रोग',
    // Section 7
    recommenderRelation: '',
    // Applicant Signature
    applicantSigName: '',
    applicantSigAddress: '',
    applicantSigDate: '२०८२/०७/१५',
    applicantSigPhone: '',
    // Recommender Signature
    recName: '',
    recPosition: 'पद छनोट गर्नुहोस्',
    recDate: '२०८२/०७/१५',
    recOfficeStamp: '',
    // Applicant Details (Footer)
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const [landDetails, setLandDetails] = useState([
    { id: 1, description: '', location: '' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLandChange = (index, e) => {
    const { name, value } = e.target;
    const newLandDetails = [...landDetails];
    newLandDetails[index][name] = value;
    setLandDetails(newLandDetails);
  };

  const addLandRow = () => {
    setLandDetails((prev) => [
      ...prev,
      { id: prev.length + 1, description: '', location: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Main Form Data:', formData);
    console.log('Land Details:', landDetails);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="impoverished-container">
      <form onSubmit={handleSubmit}>
        <div className="top-meta-row">
          <div className="form-group-inline header-inputs">
            <input type="text" name="headerTo" value={formData.headerTo} onChange={handleChange} />
            <input type="text" name="headerOffice" value={formData.headerOffice} onChange={handleChange} />
          </div>
        </div>

        <div className="title-header">
          <h3>अनुसूची २</h3>
          <h4>(दफा ४ उप दफा (१) सँग सम्बन्धित)</h4>
          <h3>विपन्न नागरिक आवेदन तथा सिफारिस फाराम</h3>
        </div>

        <p className="main-intro">
          देहाय बमोजिम विवरण भरी विपन्न नागरिक औषधि उपचार सहुलियतका लागि अनुरोध गर्दछु ।
        </p>

        <fieldset className="form-section">
          <legend>१. बिरामीको</legend>
          <div className="form-grid-col2">
            <div className="form-group-column">
              <label>बिरामीको नाम :</label>
              <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>उमेर :</label>
              <input type="text" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>लिङ्ग :</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option>पुरुष</option>
                <option>महिला</option>
                <option>अन्य</option>
              </select>
            </div>
          </div>
          <label className="section-label">स्थायी ठेगाना:</label>
          <div className="form-grid-col3">
            <div className="form-group-column">
              <label>जिल्ला :</label>
              <input type="text" name="permJilla" value={formData.permJilla} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>पालिका : *</label>
              <input type="text" name="permPalika" value={formData.permPalika} onChange={handleChange} required />
            </div>
            <div className="form-group-column">
              <label>वडा नं. :</label>
              <input type="text" name="permWarda" value={formData.permWarda} onChange={handleChange} />
            </div>
          </div>
          <label className="section-label">अस्थायी ठेगाना:</label>
          <div className="form-grid-col3">
            <div className="form-group-column">
              <label>जिल्ला :</label>
              <input type="text" name="tempJilla" value={formData.tempJilla} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>पालिका : *</label>
              <input type="text" name="tempPalika" value={formData.tempPalika} onChange={handleChange} required />
            </div>
            <div className="form-group-column">
              <label>वडा नं. :</label>
              <input type="text" name="tempWarda" value={formData.tempWarda} onChange={handleChange} />
            </div>
          </div>
          <div className="form-grid-col2" style={{marginTop: '15px'}}>
            <div className="form-group-column">
              <label>जातीय विवरण :</label>
              <select name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
                <option>ब्राहमण</option>
                <option>क्षेत्री</option>
                <option>जनजाती</option>
                <option>दलित</option>
              </select>
            </div>
            <div className="form-group-column">
              <label>परिवार संख्या :</label>
              <input type="text" name="familySize" value={formData.familySize} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>२. आय स्रोत</legend>
          <div className="form-grid-col2">
            <div className="form-group-column">
              <label>आय स्रोत:</label>
              <input type="text" name="incomeSource" value={formData.incomeSource} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>अनुमानित मासिक आय:</label>
              <input type="text" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>३. नगद जग्गा (अचल र चलन सम्पत्ति):</legend>
          <div className="table-wrapper">
            <table className="land-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>क्षेत्रफल</th>
                  <th>भूमिस स्थान</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {landDetails.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td><input type="text" name="description" value={item.description} onChange={(e) => handleLandChange(index, e)} required /></td>
                    <td><input type="text" name="location" value={item.location} onChange={(e) => handleLandChange(index, e)} required /></td>
                    <td className="action-cell">
                      {index === landDetails.length - 1 && (
                        <button type="button" onClick={addLandRow} className="add-btn">+</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>४. बैंक सम्बन्धी:</legend>
           <div className="form-grid-col3">
            <div className="form-group-column">
              <label>बैंकको नाम:</label>
              <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>शाखा :</label>
              <input type="text" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
            </div>
            <div className="form-group-column">
              <label>खाता नं:</label>
              <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>५. बिरामीको रोगको स्थिति:</legend>
           <input type="text" name="healthStatus" value={formData.healthStatus} onChange={handleChange} />
        </fieldset>

        <fieldset className="form-section">
          <legend>६. संलग्न कागजातहरू:</legend>
          <ol className="doc-list">
            <li>क) निवेदनको (नागरिकताको प्रतिलिपि/बालकको हकमा जन्म दर्ता प्रतिलिपि)</li>
            <li>ख) रोग निदान भएको प्रेस्क्रिप्सन</li>
          </ol>
        </fieldset>
        
        <fieldset className="form-section">
          <legend>७. उपचार सहुलियतका लागि सिफारिस माग गरेको अस्पताल:</legend>
           <input type="text" name="recommenderRelation" value={formData.recommenderRelation} onChange={handleChange} />
        </fieldset>

        <div className="signature-container">
            <div className="applicant-signature-box">
                <p>उपरोक्त बमोजिमको व्यहोरा साँचो हो झुठा ठहरे सहुँला बुझाउँला</p>
                <div className="signature-box-field">
                    <label>निवेदकको नाम:</label>
                    <input type="text" name="applicantSigName" value={formData.applicantSigName} onChange={handleChange} />
                </div>
                 <div className="signature-box-field">
                    <label>ठेगाना:</label>
                    <input type="text" name="applicantSigAddress" value={formData.applicantSigAddress} onChange={handleChange} />
                </div>
                 <div className="signature-box-field">
                    <label>मिति:</label>
                    <input type="text" name="applicantSigDate" value={formData.applicantSigDate} onChange={handleChange} />
                </div>
                 <div className="signature-box-field">
                    <label>सम्पर्क नं.:</label>
                    <input type="text" name="applicantSigPhone" value={formData.applicantSigPhone} onChange={handleChange} />
                </div>
            </div>
            
            <div className="recommender-signature-box">
                <p>सिफारिस गर्ने</p>
                <div className="signature-box-field">
                    <label>नाम:</label>
                    <input type="text" name="recName" value={formData.recName} onChange={handleChange} />
                </div>
                 <div className="signature-box-field">
                    <label>पद:</label>
                    <select name="recPosition" value={formData.recPosition} onChange={handleChange}>
                        <option>पद छनोट गर्नुहोस्</option>
                        <option>वडा अध्यक्ष</option>
                        <option>वडा सचिव</option>
                    </select>
                </div>
                 <div className="signature-box-field">
                    <label>मिति:</label>
                    <input type="text" name="recDate" value={formData.recDate} onChange={handleChange} />
                </div>
                 <div className="signature-box-field">
                    <label>कार्यालयको छाप:</label>
                    <input type="text" name="recOfficeStamp" value={formData.recOfficeStamp} onChange={handleChange} />
                </div>
            </div>
        </div>

        <div className="applicant-details">
          <h3>निवेदकको विवरण</h3>
          <div className="form-group-column">
            <label>निवेदकको नाम *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको ठेगाना *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको नागरिकता नं. *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>निवेदकको फोन नं. *</label>
            <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn">रेकर्ड सेभ र प्रिन्ट गर्नुहोस्</button>
        </div>
      </form>
    </div>
  );
};

export default ImpoverishedCitizenApplicationandRecommendation;