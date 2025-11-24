import React, { useState } from 'react';
import './VerifyRevisedEmblem.css'; // The CSS file for styling

const VerifyRevisedEmblem = () => {
  const [formData, setFormData] = useState({
    letterNo: '2082/83',
    refNo: '',
    date: '2025-11-01',
    billName: '',
    amendmentName: '',
    mapLocation: '',
    stampLocation: 'Stamp of our Ward Office',
    villageName: '',
    stampMunicipality: 'Nagarjun Municipality',
    stampWardNo: '1',
    provinceNameLetterhead: '',
    provinceNameStamp: 'Nagarjun Municipality',
    stampWardNo2: '1',
    wardOfficeName1: '',
    wardOfficeName2: '',
    designation: '',
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
    console.log('Verify Revised Emblem Form Data:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="verify-emblem-container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          {/* Replace with your logo path */}
          <img src="https://i.imgur.com/YOUR_LOGO_URL.png" alt="Nagarjun Municipality Logo" className="logo" />
          <h1>Nagarjun Municipality</h1>
          <h2>1 No. Ward Office</h2>
          <h3>Kathmandu, Kathmandu</h3>
          <h3>Bagmati Province, Nepal</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Letter No.:</label>
            <input
              type="text"
              name="letterNo"
              value={formData.letterNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Ref No.:</label>
            <input
              type="text"
              name="refNo"
              value={formData.refNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subject-line">
          <strong>Subject: <u>Verification Revise Demblem</u></strong>
          <br />
          <strong><u>To Whom It May Concern</u></strong>
        </div>

        <p className="certificate-body">
          This certificate is issued to certify that The House of Representatives (HOR) has unanimously passed the government's constitution (2nd Amendment)
          Bill,
          <input type="text" name="billName" value={formData.billName} onChange={handleChange} required />
          , which seeks to amend
          <input type="text" name="amendmentName" value={formData.amendmentName} onChange={handleChange} required />
          of the constitution to update the national cost of arms by
          incorporating Limpiyadhura, Lipulekh and Kalapani in Nepal's map on
          <input type="text" name="mapLocation" value={formData.mapLocation} onChange={handleChange} required />
          .
          <br />
          Although we have already changed the emblem of Nepal on the Letterhead of our ward office, because of certain inconvenience we are not able change
          the emblem of Nepal imprinted on Stamp of our Ward Office. We are sorry for the inconvenience and will revise the imprinted emblem of Nepal on Stamp
          of our
          <input type="text" name="stampLocation" value={formData.stampLocation} onChange={handleChange} required />
          as we get favorable condition.
          <br />
          Furthermore, the village name "
          <input type="text" name="villageName" value={formData.villageName} onChange={handleChange} required />
          " has written in the Nepali font only and it has not written in the English font in the
          letterhead whereas it has not written in the stamp of this
          <input type="text" name="stampMunicipality" value={formData.stampMunicipality} onChange={handleChange} required />
          ,
          <input type="text" name="stampWardNo" value={formData.stampWardNo} onChange={handleChange} required />
          No.Ward but are the genuine letterhead and stamp.
          <br />
          Note: The province name is written as "
          <input type="text" name="provinceNameLetterhead" value={formData.provinceNameLetterhead} onChange={handleChange} required />
          " in the letterhead and stamp of this
          <input type="text" name="provinceNameStamp" value={formData.provinceNameStamp} onChange={handleChange} required />
          ,
          <input type="text" name="stampWardNo2" value={formData.stampWardNo2} onChange={handleChange} required />
          No. Ward Office which can be written as "
          <input type="text" name="wardOfficeName1" value={formData.wardOfficeName1} onChange={handleChange} required />
          " and both are the same province.
          <br />
          We would to ratify and apologize for the inconvenience caused by this matter, please feel free to contact us for further information required in this regard.
        </p>

        <div className="designation-section">
          <input type="text" placeholder="Signature" disabled />
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Ward-Chairperson">Ward Chairperson</option>
            <option value="Ward-Secretary">Ward Secretary</option>
          </select>
        </div>

        <div className="applicant-details">
          <h3>Applicant Details</h3>
          <div className="form-group-column">
            <label>Applicant Name *</label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Address *</label>
            <input type="text" name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Citizenship Number *</label>
            <input type="text" name="applicantCitizenship" value={formData.applicantCitizenship} onChange={handleChange} required />
          </div>
          <div className="form-group-column">
            <label>Applicant Phone Number *</label>
            <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn">Save and Print Record</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyRevisedEmblem;