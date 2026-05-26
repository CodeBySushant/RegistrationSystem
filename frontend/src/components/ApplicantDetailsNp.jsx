const APPLICANT_STYLES = `
  .applicant-details-box {
    background: rgba(255, 255, 255, 0.55);
    border: none;
    border-radius: 6px;
    padding: 20px 24px;
    margin-top: 30px;
  }

  .applicant-details-box h3 {
    font-family: 'Kalimati', 'Kokila', sans-serif;
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
    font-family: 'Kalimati', 'Kokila', sans-serif;
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
    font-family: 'Kalimati', 'Kokila', sans-serif;
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
    <>
      <style>{APPLICANT_STYLES}</style>

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
              className="detail-input"
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
              className="detail-input"
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
              className="detail-input"
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
              className="detail-input"
              value={formData[phoneKey] ?? ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetailsNp;