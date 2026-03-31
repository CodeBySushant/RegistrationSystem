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
            name="applicant_name"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicant_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको ठेगाना<span className="required">*</span>
          </label>
          <input
            name="applicant_address"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicant_address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको नागरिकता नं.<span className="required">*</span>
          </label>
          <input
            name="applicant_citizenship_no"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicant_citizenship_no}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको फोन नं.<span className="required">*</span>
          </label>
          <input
            name="applicant_phone"
            type="text"
            className="detail-input bg-gray"
            value={formData.applicant_phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsNp;