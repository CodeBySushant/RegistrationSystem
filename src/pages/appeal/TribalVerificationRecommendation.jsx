import React, { useState } from 'react';
import './TribalVerificationRecommendation.css'; // The CSS file for styling

const TribalVerificationRecommendation = () => {
  const [formData, setFormData] = useState({
    date: '२०८२.०७.१५',
    headerTo: 'श्री वडा सचिव ज्यु',
    municipality1: 'नागार्जुन नगरपालिका',
    wardNo1: '१',
    officeName: 'नं वडा कार्यालय',
    address1: 'काठमाडौँ',
    municipality2: 'नागार्जुन नगरपालिका',
    wardNo2: '१',
    residentTitle: 'श्री',
    relation: 'बाबु',
    guardianTitle: 'श्री',
    guardianName: '',
    tribeCategory: 'आदिवासी जनजाती',
    tribeName: '',
    mainContent: 'महोदय,\nउपलब्ध गराई पाउन यो निवेदन पेश गरेको छु ।',
    applicantNameSignature: '',
    applicantAddressSignature: '',
    applicantName: '',
    applicantAddress: '',
    applicantCitizenship: '',
    applicantPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tribal Verification Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="tribal-verification-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group header-to">
            <input
              type="text"
              name="headerTo"
              value={formData.headerTo}
              onChange={handleChange}
              className="header-input"
            />
            <select name="municipality1" value={formData.municipality1} onChange={handleChange} className="header-select">
              <option>नागार्जुन नगरपालिका</option>
            </select>
            <select name="wardNo1" value={formData.wardNo1} onChange={handleChange} className="header-select short">
              <option>१</option>
              <option>२</option>
              <option>३</option>
            </select>
            <input
              type="text"
              name="officeName"
              value={formData.officeName}
              onChange={handleChange}
              className="header-input"
            />
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              className="header-input"
            />
          </div>
          <div className="form-group date-group">
            <label>मिति :</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>विषय: <u>आदिवासी जनजाती - प्रमाणित सिफारिस पाउँ।</u></strong>
        </div>

        <p className="certificate-body">
          प्रस्तुत विषयमा यस
          <select name="municipality2" value={formData.municipality2} onChange={handleChange}>
            <option>नागार्जुन नगरपालिका</option>
          </select>
          वडा नं
          <select name="wardNo2" value={formData.wardNo2} onChange={handleChange}>
            <option>१</option>
            <option>२</option>
            <option>३</option>
          </select>
          निवासी
          <select name="residentTitle" value={formData.residentTitle} onChange={handleChange}>
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          (को
          <select name="relation" value={formData.relation} onChange={handleChange}>
            <option>बाबु</option>
            <option>आमा</option>
            <option>पति</option>
          </select>
          <select name="guardianTitle" value={formData.guardianTitle} onChange={handleChange}>
            <option>श्री</option>
            <option>सुश्री</option>
            <option>श्रीमती</option>
          </select>
          )
          <input type="text" name="guardianName" placeholder="नाम" value={formData.guardianName} onChange={handleChange} required />
          <select name="tribeCategory" value={formData.tribeCategory} onChange={handleChange}>
            <option>आदिवासी जनजाती</option>
          </select>
          जाती अन्तर्गत
          <input type="text" name="tribeName" placeholder="जातीको नाम" value={formData.tribeName} onChange={handleChange} required />
          जाती भएको व्यहोराको सिफारिस उपलब्ध गराई पाउन यो निवेदन पेश गरेको छु ।
        </p>

        <div className="form-group-column rich-text-area">
            <label>निवेदन व्यहोरा:</label>
            {/* Note: This is a standard textarea. For a full rich text editor,
                you would replace this with a library like React Quill or TinyMCE */}
            <div className="editor-toolbar-placeholder">[BIU S A ... Styles Format]</div>
            <textarea
                name="mainContent"
                value={formData.mainContent}
                onChange={handleChange}
                rows="10"
            ></textarea>
        </div>

        <div className="designation-section">
            <p className="signature-label">निवेदक / निवेदिका</p>
            <div className="signature-fields">
                 <div className="form-group-inline">
                    <label>नाम, थर : *</label>
                    <input type="text" name="applicantNameSignature" value={formData.applicantNameSignature} onChange={handleChange} required />
                 </div>
                 <div className="form-group-inline">
                    <label>ठेगाना : *</label>
                    <input type="text" name="applicantAddressSignature" value={formData.applicantAddressSignature} onChange={handleChange} required />
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

export default TribalVerificationRecommendation;