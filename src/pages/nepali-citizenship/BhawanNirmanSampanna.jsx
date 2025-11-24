// 7
import React from 'react';
import './BhawanNirmanSampanna.css';

const BhawanNirmanSampanna = () => {
  return (
    <div className="bhawan-nirman-container">
      {/* --- Top Bar --- */}
      <div className="top-bar-title">
        भवन निर्माण सम्पन्न प्रमाण-पत्र
        <span className="top-right-bread">घर/जग्गा &gt; भवन निर्माण सम्पन्न प्रमाण-पत्र</span>
      </div>

      {/* --- Header Section --- */}
      <div className="form-header-section">
        <div className="header-logo">
          {/* Replace with your actual logo path */}
          <img src="/logo.png" alt="Nepal Emblem" />
        </div>
        <div className="header-text">
          <h1 className="municipality-name red-text">नागार्जुन नगरपालिका</h1>
          <h2 className="ward-title red-text">नगर कार्यपालिकाको कार्यालय</h2>
          <p className="address-text red-text">नागार्जुन, काठमाडौँ</p>
          <p className="province-text red-text">भूमि व्यवस्थापन तथा भवन नियमन शाखा</p>
          <p className="province-text red-text">भवन तथा भवन संहिता र मापदण्ड कार्यान्वयन उपशाखा</p>
          <h3 className="certificate-title red-text">भवन निर्माण सम्पन्न प्रमाण-पत्र</h3>
        </div>
      </div>

      {/* --- Date (Right Aligned) --- */}
      <div className="date-section">
        <p>मिति : <span className="bold-text">२०८२-०८-०६</span></p>
      </div>

      {/* --- Main Body Content --- */}
      <div className="form-body">
        <div className="intro-line">
           श्रीमान् / श्रीमती / सुश्री <input type="text" className="dotted-input medium-input" /> को काठमाडौँ <input type="text" className="dotted-input medium-input" defaultValue="नागार्जुन" /> नगरपालिका वडा नं <input type="text" className="dotted-input tiny-input" required /> टोल/गाउँमा <input type="text" className="dotted-input long-input" /> निम्न बमोजिम <input type="text" className="dotted-input medium-input" /> निर्माण कार्य पुरा भएको प्रमाणित गरिएको छ ।
        </div>

        {/* --- Detailed List --- */}
        <div className="details-list">
            
            {/* 1. Land Details */}
            <div className="detail-item">
                <span className="item-number">(१)</span>
                <label>जग्गाको विवरण :</label>
            </div>
            <div className="sub-detail-row">
                <label>साविक गा.वि.स. / न.पा.</label>
                <input type="text" className="dotted-input medium-input" />
                <label>वडा नं</label>
                <input type="text" className="dotted-input tiny-input" />
                <label>हल्का नं. / गा.पा. / वडा नं</label>
                <input type="text" className="dotted-input medium-input" />
                <label>टोल</label>
                <input type="text" className="dotted-input medium-input" />
            </div>
             <div className="sub-detail-row">
                <label>कित्ता नं</label>
                <input type="text" className="dotted-input small-input" />
                <label>क्षेत्रफल</label>
                <input type="text" className="dotted-input medium-input" />
                <label>क्षेत्र</label>
                <input type="text" className="dotted-input medium-input" />
                <label>उपक्षेत्र</label>
                <input type="text" className="dotted-input medium-input" />
            </div>

            {/* 2. Four Boundaries */}
            <div className="detail-item">
                 <span className="item-number">(२)</span>
                 <label>चार किल्ला: पूर्व</label>
                 <input type="text" className="dotted-input medium-input" />
                 <label>पश्चिम</label>
                 <input type="text" className="dotted-input medium-input" />
                 <label>उत्तर</label>
                 <input type="text" className="dotted-input medium-input" />
                 <label>दक्षिण</label>
                 <input type="text" className="dotted-input medium-input" />
            </div>

            {/* 3, 4, 5. Owner Details */}
            <div className="detail-item">
                <span className="item-number">(३)</span>
                <label>जग्गा धनीको नाम, थर, वतन :</label>
                <input type="text" className="dotted-input long-input" />
            </div>
            <div className="detail-item">
                <span className="item-number">(४)</span>
                <label>घर धनीको नाम थर, वतन :</label>
                <input type="text" className="dotted-input long-input" />
            </div>
             <div className="detail-item">
                <span className="item-number">(५)</span>
                <label>घर धनीको बाबु/पतिको नाम, थर, वतन :</label>
                <input type="text" className="dotted-input long-input" />
            </div>

            {/* 6. Construction Type */}
            <div className="detail-item">
                <span className="item-number">(६)</span>
                <label>निर्माणको किसिम :</label>
                <input type="text" className="dotted-input long-input" />
            </div>

            {/* 7. Map Pass Info */}
             <div className="detail-item">
                <span className="item-number">(७)</span>
                <label>(क) नक्सा पास प्रमाण-पत्र नं</label>
                <input type="text" className="dotted-input medium-input" />
                <label>मिति :</label>
                <span className="bold-text">२०८२-०८-०६</span>
            </div>
            <div className="sub-detail-row pl-20">
                <label>(ख) तला थप गरी बनाएको भए नियमित गरिएको मिति</label>
                <span className="bold-text">२०८२-०८-०६</span>
                <label>सम्मन तला</label>
                <input type="text" className="dotted-input small-input" />
            </div>

            {/* 8. Purpose */}
            <div className="detail-item">
                <span className="item-number">(८)</span>
                <label>भवनको प्रयोजन :</label>
                <input type="text" className="dotted-input long-input" />
            </div>

            {/* 9. Floor Details (Grid) */}
            <div className="detail-item">
                <span className="item-number">(९)</span>
                <label>पास नक्सा अनुसार गाउने निर्माणको विवरण</label>
            </div>
            <div className="floor-details-grid pl-20">
                 <div className="grid-row"><label>(क) कभरेज वर्ग फिट / वर्ग मि</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(ख) भूमिगत वा अर्ध भूमिगत तला</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(ग) जमिन तला</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(घ) पहिलो तला</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(ङ) दोस्रो तला</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(च) तेस्रो तला</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(छ) चौथो तला</label><input type="text" className="dotted-input" /></div>
                 <div className="grid-row"><label>(ज) जम्मा क्षेत्रफल</label><input type="text" className="dotted-input" /></div>
            </div>

             {/* 10. Height */}
            <div className="detail-item">
                <span className="item-number">(१०)</span>
                <label>उचाई फिट/ मीटर :</label>
                <input type="text" className="dotted-input medium-input" />
            </div>

            {/* 11. Setbacks */}
            <div className="detail-item">
                <span className="item-number">(११)</span>
                <label>घर बनाउने प्लटसँग जोडिएको प्रस्तावित बाटो वा अन्य बाटोको लागी केन्द्र रेखाबाट छाड्नुपर्ने दुरी</label>
                <input type="text" className="dotted-input small-input" />
                <label>सेट ब्याक छोड्को दुरी</label>
                <input type="text" className="dotted-input small-input" />
            </div>

            {/* 12. Electric Line */}
             <div className="detail-item">
                <span className="item-number">(१२)</span>
                <label>बिजुलीको तार नजिक भएमा छोड्नुपर्ने दुरी</label>
                <input type="text" className="dotted-input small-input" />
                <label>छाडेको दुरी</label>
                <input type="text" className="dotted-input small-input" />
                <label>भोल्ट</label>
                <input type="text" className="dotted-input small-input" />
            </div>

             {/* 13. River/Stream */}
             <div className="detail-item">
                <span className="item-number">(१३)</span>
                <label>नदी किनार भए त्यसको लागि छोड्नुपर्ने दुरी</label>
                <input type="text" className="dotted-input small-input" />
                <label>छाडेको दुरी</label>
                <input type="text" className="dotted-input small-input" />
                <label>नदीको नाम</label>
                <input type="text" className="dotted-input medium-input" />
            </div>

            {/* 14. Septic Tank */}
            <div className="detail-item">
                <span className="item-number">(१४)</span>
                <label>निकास सम्बन्धि (ढल वा सेफ्टी ट्यांकी)</label>
                <input type="text" className="dotted-input long-input" />
            </div>

             {/* 15. Remarks */}
            <div className="detail-item">
                <span className="item-number">(१५)</span>
                <label>अन्य कुनै विवरण</label>
                <input type="text" className="dotted-input long-input" />
            </div>
        </div>

        {/* --- Signatures --- */}
        <div className="signatures-grid mt-40">
            <div className="sig-box"><div className="line"></div><p>घर धनीको सही</p></div>
            <div className="sig-box"><div className="line"></div><p>फाँटवालाको सही</p></div>
            <div className="sig-box"><div className="line"></div><p>स्थलगत निरिक्षकको सही</p></div>
            <div className="sig-box"><div className="line"></div><p>सिफारिस गर्नेको सही (इन्जिनियर)</p></div>
            <div className="sig-box"><div className="line"></div><p>प्रमाणपत्र दिनेको सही</p></div>
        </div>

        {/* --- Bodartha --- */}
        <div className="bodartha-section mt-30">
            <p className="bold-text">बोधार्थ:</p>
            <p>श्री ....................................................</p>
            <p>.......................वडा .........................</p>
            <p>..........................काठमाडौँ</p>
        </div>

         {/* --- Transfers Table --- */}
         <div className="transfer-tables-section mt-20">
             <p className="center-text bold-text">नामसारी गर्ने घर/जग्गाको विवरण</p>
             <table className="transfer-table">
                 <thead>
                     <tr>
                         <th>क्र.स.</th>
                         <th>मिति</th>
                         <th>नाम</th>
                         <th>सिफारिस गर्ने</th>
                         <th>स्वीकृत गर्ने</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr>
                         <td>१</td>
                         <td><input type="text" className="table-input" /></td>
                         <td><input type="text" className="table-input" /></td>
                         <td><input type="text" className="table-input" /></td>
                         <td><input type="text" className="table-input" /></td>
                         <td className="action-cell"><button className="add-btn">+</button></td>
                     </tr>
                 </tbody>
             </table>

              <p className="center-text bold-text mt-10">नामसारी गर्ने घर/जग्गाको विवरण</p>
             <table className="transfer-table">
                 <thead>
                     <tr>
                         <th>क्र.स.</th>
                         <th>नामसारी गरिदिनेको नाम, थर</th>
                         <th>नामसारी लिनेको नाम, थर</th>
                         <th>सिफारिस गर्ने</th>
                         <th>स्वीकृत गर्ने</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                      <tr>
                         <td>१</td>
                         <td><input type="text" className="table-input" /></td>
                         <td><input type="text" className="table-input" /></td>
                         <td><input type="text" className="table-input" /></td>
                         <td><input type="text" className="table-input" /></td>
                         <td className="action-cell"><button className="add-btn">+</button></td>
                     </tr>
                 </tbody>
             </table>
         </div>
      </div>

      {/* --- Applicant Details Box --- */}
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

export default BhawanNirmanSampanna;