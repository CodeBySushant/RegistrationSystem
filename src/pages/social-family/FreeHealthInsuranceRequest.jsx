// 25
import React from 'react';
import './FreeHealthInsuranceRequest.css';

const FreeHealthInsuranceRequest = () => {
  return (
    <div className="health-insurance-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        निशुल्क स्वास्थ्य बिमा गरि पाउँ ।
        <span className="top-right-bread">सामाजिक / पारिवारिक &gt; निशुल्क स्वास्थ्य बिमा गरि पाउँ</span>
      </div>

      {/* --- Header Section (Date only on right) --- */}
      <div className="header-right-date">
        <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
      </div>

      {/* --- Addressee Section --- */}
      <div className="addressee-section">
        <p>श्रीमान् नगर प्रमुख ज्यू</p>
        <div className="addressee-row">
           <input type="text" className="line-input medium-input" defaultValue="नागार्जुन नगरपालिका" />
           <span>,</span>
           <input type="text" className="line-input medium-input" defaultValue="काठमाडौँ" />
        </div>
      </div>

      {/* --- Subject --- */}
      <div className="subject-section">
        <p>विषय: <span className="underline-text">निशुल्क स्वास्थ्य बिमा गरिदिनु हुन ।</span></p>
      </div>

      {/* --- Main Body --- */}
      <div className="form-body">
        <p className="body-paragraph">
          प्रस्तुत विषयमा यस नगरपालिकाबाट आ. व. <input type="text" className="inline-box-input medium-box" /> <span className="red">*</span> मा गरिब, विपन्न, किसान, मजदुरको लागि निशुल्क स्वास्थ्य बिमा गरिदिने कार्यक्रम रहेकोले तपशिलको विवरण पेश गरि सो कार्यक्रममा मेरो परिवारलाई समावेश गरिदिनुहुन अनुरोध छ ।
        </p>
      </div>

      {/* --- Tapsil Section --- */}
      <div className="tapsil-container">
          <h4 className="bold-text">तपशिल</h4>

          {/* Table 1: Family Members */}
          <p className="bold-text">क) परिवारमा सदस्यहरुको विवरण :</p>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.सं.</th>
                        <th style={{width: '25%'}}>नाम, थर</th>
                        <th style={{width: '20%'}}>घरमुलीसँगको नाता</th>
                        <th style={{width: '15%'}}>लिङ्ग</th>
                        <th style={{width: '10%'}}>उमेर</th>
                        <th style={{width: '15%'}}>शैक्षिक योग्यता</th>
                        <th style={{width: '10%'}}>सम्पर्क</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                    </tr>
                </tbody>
            </table>
            <div className="fake-scrollbar"><div className="scroll-thumb"></div></div>
          </div>

          {/* Table 2: Employment */}
          <p className="bold-text mt-20">ख) परिवारमा रोजगारी सम्बन्धि विवरण :</p>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.सं.</th>
                        <th style={{width: '25%'}}>नाम, थर</th>
                        <th style={{width: '20%'}}>रोजगारीको अवस्था</th>
                        <th style={{width: '20%'}}>कुन संस्था</th>
                        <th style={{width: '15%'}}>पद</th>
                        <th style={{width: '15%'}}>परिवारको आय</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                    </tr>
                </tbody>
            </table>
            <div className="fake-scrollbar"><div className="scroll-thumb"></div></div>
          </div>

          {/* Table 3: Land Ownership */}
          <p className="bold-text mt-20">ग) परिवारको स्वामित्वमा रहेको जग्गाजमिनको विवरण :</p>
          <div className="table-responsive">
            <table className="details-table">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>क्र.सं.</th>
                        <th style={{width: '35%'}}>जग्गाधनीको नाम</th>
                        <th style={{width: '25%'}}>क्षेत्रफल</th>
                        <th style={{width: '25%'}}>कैफियत</th>
                        <th style={{width: '10%'}}>थप</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>१</td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td><input type="text" className="table-input" /></td>
                        <td className="action-cell"><button className="add-btn">+</button></td>
                    </tr>
                </tbody>
            </table>
          </div>

          {/* Financial & Other Details */}
          <div className="financial-details mt-20">
              <div className="form-row">
                  <label>घ) परिवारमा वार्षिक आम्दानी रु.</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input medium-input" />
              </div>
              <div className="form-row">
                  <label>ङ) परिवारमा ऋण कति छ ? रु.</label>
                  <span className="red">*</span>
                  <input type="text" className="line-input medium-input" />
              </div>

              <div className="form-row mt-10">
                  <label>च) गरिब घरपरिवार परिचयपत्रको लागि नेपाल सरकार, नगरपालिकाले गरिब घर परिवारको सुचिमा परेको छ / छैन ?</label>
              </div>
              <div className="radio-group">
                  <input type="radio" name="poverty" id="yes" defaultChecked /> <label htmlFor="yes">(१) छ</label>
                  <input type="radio" name="poverty" id="no" className="ml-20" /> <label htmlFor="no">(२) छैन</label>
              </div>

              <div className="form-row mt-10">
                  <label className="bold-text">परेको भए कुन तहमा ?</label>
              </div>
              <div className="radio-group">
                  <input type="radio" name="level" id="level1" /> <label htmlFor="level1">१) अति गरिब</label>
                  <input type="radio" name="level" id="level2" className="ml-20" /> <label htmlFor="level2">२) मध्यम गरिब</label>
                  <input type="radio" name="level" id="level3" className="ml-20" /> <label htmlFor="level3">३) सामान्य गरिब</label>
              </div>

              <div className="form-row mt-20">
                  <label>छ) अन्य कुरा भए उल्लेख गर्नुहोस ।</label>
              </div>
              <textarea className="details-textarea" rows="4"></textarea>
          </div>
      </div>

      {/* --- Applicant Signature Section --- */}
      <div className="applicant-signature-section">
          <div className="sig-row">
              <label>निवेदकको नाम, थर : <span className="red">*</span></label>
              <input type="text" className="line-input medium-input" />
          </div>
          <div className="sig-row">
              <label>दस्तखत :</label>
              <input type="text" className="line-input medium-input" />
          </div>
          <div className="sig-row">
              <label>ठेगाना : <span className="red">*</span></label>
              <input type="text" className="line-input medium-input" />
          </div>
      </div>

      {/* --- Applicant Details Box (Footer) --- */}
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

export default FreeHealthInsuranceRequest;