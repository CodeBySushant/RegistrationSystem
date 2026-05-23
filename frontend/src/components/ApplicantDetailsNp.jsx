const ApplicantDetailsNp = ({ formData = {}, handleChange }) => {
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
      <h3>निवेदकको विवरण</h3>
      <div className="details-grid">
        <div className="detail-group">
          <label>
            निवेदकको नाम<span className="required">*</span>
          </label>
          <input
            name={nameKey}
            type="text"
            className="detail-input bg-gray"
            value={formData[nameKey] ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको ठेगाना<span className="required">*</span>
          </label>
          <input
            name={addressKey}
            type="text"
            className="detail-input bg-gray"
            value={formData[addressKey] ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको नागरिकता नं.<span className="required">*</span>
          </label>
          <input
            name={citizenKey}
            type="text"
            className="detail-input bg-gray"
            value={formData[citizenKey] ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="detail-group">
          <label>
            निवेदकको फोन नं.<span className="required">*</span>
          </label>
          <input
            name={phoneKey}
            type="text"
            className="detail-input bg-gray"
            value={formData[phoneKey] ?? ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsNp;
