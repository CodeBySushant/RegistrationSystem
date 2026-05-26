const ApplicantDetailsEn = ({ formData = {}, handleChange }) => {
  const nameKey =
    "applicantName" in formData ? "applicantName" : "applicant_name";

  const addressKey =
    "applicantAddress" in formData ? "applicantAddress" : "applicant_address";

  const citizenKey =
    "applicantCitizenship" in formData
      ? "applicantCitizenship"
      : "applicant_citizenship_no" in formData
        ? "applicant_citizenship_no"
        : "applicant_citizenship";

  const phoneKey =
    "applicantPhone" in formData ? "applicantPhone" : "applicant_phone";
    
  return (
    <div className="applicant-details-box">
      <h3>Applicant Details</h3>

      <div className="details-grid">
        <div className="detail-group">
          <label>
            Applicant Name<span className="required">*</span>
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
            Applicant Address<span className="required">*</span>
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
            Applicant Citizenship Number<span className="required">*</span>
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
            Applicant Phone Number<span className="required">*</span>
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

export default ApplicantDetailsEn;
