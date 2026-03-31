const ApplicantDetailsNp = ({ formData, handleChange }) => {
  return (
    <div className="applicant-details-box">
      <h3>निवेदकको विवरण</h3>

      <div className="details-grid">
        <div className="detail-group">
          <label>
            निवेदकको नाम<span className="required">*</span>
          </label>
          <input
            name="applicantName"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicantName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको ठेगाना<span className="required">*</span>
          </label>
          <input
            name="applicantAddress"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicantAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको नागरिकता नं.<span className="required">*</span>
          </label>
          <input
            name="applicantCitizenship"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicantCitizenship}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको फोन नं.<span className="required">*</span>
          </label>
          <input
            name="applicantPhone"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicantPhone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsNp;