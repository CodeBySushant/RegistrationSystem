const APPLICANT_EN_STYLES = `
  .applicant-details-box {
    background: rgba(255, 255, 255, 0.55);
    border: none;
    border-radius: 6px;
    padding: 20px 24px;
    margin-top: 30px;
  }

  .applicant-details-box h3 {
    font-family: sans-serif;
    font-size: 1.4rem;
    font-weight: normal;
    color: #9e9e9e;
    margin-bottom: 16px;
  }

  .applicant-details-box .details-grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .applicant-details-box .detail-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .applicant-details-box label {
    font-family: sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #222;
  }

  .applicant-details-box .required {
    color: red;
    margin-left: 3px;
  }

  .applicant-details-box .detail-input {
    max-width: 400px;
    width: 100%;
    padding: 6px 10px;
    border: none;
    border-bottom: 1px dotted #555;
    border-radius: 4px;
    background-color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    outline: none;
    color: #000;
  }

  .applicant-details-box .detail-input:focus {
    border-bottom: 1px solid #2c3e50;
  }

  @media print {
    .applicant-details-box {
      display: none !important;
    }
  }
`;

const ApplicantDetailsEn = ({ formData = {}, handleChange }) => {
  return (
    <>
      <style>{APPLICANT_EN_STYLES}</style>

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
              className="detail-input"
              value={formData.applicantName ?? ""}
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
              className="detail-input"
              value={formData.applicantAddress ?? ""}
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
              className="detail-input"
              value={formData.applicantCitizenship ?? ""}
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
              className="detail-input"
              value={formData.applicantPhone ?? ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetailsEn;