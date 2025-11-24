// 13
import React from "react";
import "./PartnershipRegistrationApplicationForm.css";

function PartnershipRegistrationApplicationForm() {
  return (
    <div className="praf-page">
      {/* Top bar */}
      <header className="praf-topbar">
        <div className="praf-top-left">साझेदारी रजिष्ट्रेशन गर्ने दरखास्त फाराम</div>
        <div className="praf-top-right">
          अवलोकन पृष्ठ / साझेदारी रजिष्ट्रेशन गर्ने दरखास्त फाराम
        </div>
      </header>

      {/* Main paper */}
      <div className="praf-paper">
        {/* Header title */}
        <h2 className="praf-main-title">साझेदारी रजिष्ट्रेशन गर्ने दरखास्त फाराम</h2>

        {/* Date row */}
        <div className="praf-date-row">
          मिति : <input type="text" className="praf-date-input" />
        </div>

        {/* To section */}
        <div className="praf-to-block">
          <span>श्रीमान</span>
          <input type="text" className="praf-long-input" />
          <br />
          <input type="text" className="praf-long-input praf-to-second" />
        </div>

        {/* Subject */}
        <div className="praf-subject-row">
          <span className="praf-sub-label">विषयः</span>
          <span className="praf-subject-text">
            साझेदारी व्यवसाय – रजिष्ट्रेशन दर्ता बारे ।
          </span>
        </div>

        {/* Intro paragraph */}
        <p className="praf-body">
          महोदय, हामी तल हस्ताक्षर कर्ता व्यक्तिहरूले विद्यमान कानुन बमोजिम
          साझेदारी व्यवसाय सञ्चालन गर्नका लागि आवश्यक भएको सबै अन्य कागजात
          सहित यो निवेदन गर्न आएका छौं । तदनुसार सरकारको सम्बन्धित तह एवं
          कार्यालयबाट साझेदारी फर्म दर्ता गराई पाऊँ भनी बिनम्र अनुरोध गर्दछौं ।
        </p>

        {/* Basic firm fields */}
        <section className="praf-section">
          <div className="praf-field-row">
            <span>१) फर्मको पूरा नाम (नेपालीमा) :</span>
            <input type="text" className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>२) फर्मको पूरा नाम (अंग्रेजीमा) (हले भएमा) :</span>
            <input type="text" className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>३) फर्मको पूर्ण ठेगाना (वडा नं., टोल, नगरपालिका) :</span>
            <input type="text" className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>४) साझेदारी व्यवसायको प्रकृति :</span>
            <input type="text" className="praf-medium-input" />
            <span>साझेदारी अवधि :</span>
            <input type="text" className="praf-small-input" />
            <span>वर्ष</span>
          </div>
          <div className="praf-field-row">
            <span>५) फर्मको सम्पर्क फोन :</span>
            <input type="text" className="praf-medium-input" />
            <span>इमेल :</span>
            <input type="text" className="praf-medium-input" />
            <span>साझेदारी व्यवसायको वर्ग :</span>
            <select className="praf-select">
              <option>सानो</option>
              <option>मझौला</option>
              <option>ठूलो</option>
            </select>
          </div>
        </section>

        {/* Partner list table */}
        <section className="praf-section">
          <h3 className="praf-subtitle">
            ६) साझेदारहरुको नाम, ठेगाना, तथा फर्ममा लगानी स्थिति:
          </h3>

          <table className="praf-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>साझेदारको नाम</th>
                <th>बाजे / बाबुको नाम</th>
                <th>ठेगाना</th>
                <th>उमेर</th>
                <th>कुल लगानी (रु)</th>
                <th>लाभांश प्रतिशत</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><button className="praf-add-btn">+</button></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Guardian info */}
        <section className="praf-section">
          <h3 className="praf-subtitle">७) साझेदारहरूको तिरपुरा नाम, ठेगाना :</h3>
          <table className="praf-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>साझेदार</th>
                <th>बाबुको नाम, ठेगाना</th>
                <th>बाजेको नाम, ठेगाना</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><button className="praf-add-btn">+</button></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Existing partnership info */}
        <section className="praf-section">
          <div className="praf-field-row">
            <span>८) फर्म साझेदारीको पहिलो रुपमा दर्ता लागिरहेको भए सो हो भने :</span>
            <input type="text" className="praf-wide-input" />
          </div>
          <div className="praf-field-row">
            <span>९) फर्मको प्रतिनीधि वा मुख्य साझेदार वा साझेदारीको नाम :</span>
          </div>
          <table className="praf-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>मुख्य साझेदारको नाम</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" /></td>
                <td><button className="praf-add-btn">+</button></td>
              </tr>
            </tbody>
          </table>

          <div className="praf-field-row">
            <span>१०) नाम दर्ता गरिएको मिति :</span>
            <input type="text" className="praf-small-input" />
          </div>
          <div className="praf-field-row">
            <span>११) फर्म संचालन गर्न थालिएको मिति :</span>
            <input type="text" className="praf-small-input" />
          </div>
        </section>

        {/* Note section for office use */}
        <section className="praf-section praf-note-section">
          <h3 className="praf-subtitle">टिप्पणी (नगर कार्यालयको कार्यालयले मात्र भर्ने)</h3>
          <p className="praf-note-text">
            तालिमका सोधपुछ लगायतका विवरण र पसल साझेदारी फर्म दर्ता गर्न गराएको
            निर्णय शीषर्क शीक्षीत र आवश्यक अन्य कागजात समेत संलग्न राखी निवेदन
            गरिएको फर्म दर्ता गर्न रजिष्ट्रारलाई सिफारिस गरिन्छ।
          </p>

          <div className="praf-field-row">
            <span>जाँच गर्न खटाइएको अधिकारीको नाम :</span>
            <input type="text" className="praf-medium-input" />
            <span>रिपोर्ट प्राप्त मिति :</span>
            <input type="text" className="praf-small-input" />
          </div>

          <table className="praf-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>साझेदार</th>
                <th>स्थायी ठेगाना</th>
                <th>हालको ठेगाना</th>
                <th>नागरिकता नं.</th>
                <th>फोन नं.</th>
                <th>कैफियत</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Partnership deed section */}
        <section className="praf-section">
          <h3 className="praf-subtitle">कम्पनी / साझेदारीनामामा फाराम</h3>
          <p className="praf-body">
            विद्यमान दशाबाट उक्त फर्मदर्ता आवेदनपत्र प्राप्त भएको मितिले
            सम्बन्धित कार्यालयबाट जाँच गरी साझेदार फर्म दर्ता गर्नुपर्ने भएको
            हुँदा यो निवेदन पेश गरेको छु / छौं । यहाँ दिएको विवरण साँचो छ भनी
            सोझाइन्छ र समय सीमा भित्र फर्म दर्ता गराउनुहुन अनुरोध गर्दछौं ।
          </p>

          <ol className="praf-points">
            <li>फर्मको नाम, उद्देश्य तथा कारोबारको किसिम स्पष्ट वर्णन गरिएको।</li>
            <li>प्रत्येक साझेदारको लगानीको रकम र लाभांशको प्रतिशत उल्लेख गरिएको।</li>
            <li>साझेदारको दायित्व र अधिकारको व्यवस्था गरिएको।</li>
            <li>फर्म चलाउने म्याद, खारेजको अवस्था, नयाँ साझेदार थप/हटाउने तरिका इत्यादि।</li>
          </ol>

          <div className="praf-field-row">
            <span>दस्तखत :</span>
            <input type="text" className="praf-medium-input" />
          </div>
          <div className="praf-field-row">
            <span>प्रोप्राइटर / साझेदारको पुरा नाम :</span>
            <input type="text" className="praf-medium-input" />
          </div>

          <div className="praf-field-row">
            <span>हस्ती मानेको मिति :</span>
            <input type="text" className="praf-small-input" />
            <span>साल :</span>
            <input type="text" className="praf-small-input" />
            <span>महिना :</span>
            <input type="text" className="praf-small-input" />
            <span>गते रोज :</span>
            <input type="text" className="praf-small-input" />
          </div>
        </section>

        {/* Applicant details */}
        <section className="praf-section">
          <h3 className="praf-subtitle">निवेदकको विवरण</h3>
          <div className="praf-applicant-box">
            <div className="praf-field">
              <label>निवेदकको नाम *</label>
              <input type="text" />
            </div>
            <div className="praf-field">
              <label>निवेदकको ठेगाना *</label>
              <input type="text" />
            </div>
            <div className="praf-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input type="text" />
            </div>
            <div className="praf-field">
              <label>निवेदकको फोन नं. *</label>
              <input type="text" />
            </div>
          </div>
        </section>

        {/* Submit button */}
        <div className="praf-submit-row">
          <button className="praf-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="praf-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default PartnershipRegistrationApplicationForm;
