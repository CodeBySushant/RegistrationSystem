// 8
import React from "react";
import "./IndustryPeriodSummary.css";

function IndustryPeriodSummary() {
  return (
    <div className="ups-page">
      {/* Top dark bar */}
      <header className="ups-topbar">
        <div className="ups-top-left">उद्योग वार्षिक विवरण</div>
        <div className="ups-top-right">अवलोकन पृष्ठ / उद्योग वार्षिक विवरण</div>
      </header>

      {/* Main paper */}
      <div className="ups-paper">
        {/* Annex heading */}
        <div className="ups-annex">
          <div>अनुसूची–२०</div>
          <div>
            (नियम ८ को उपनियम (३) को खण्ड (ख) र नियम १२ को उपनियम (१) को खण्ड (ग)
            संग सम्बन्धित)
          </div>
        </div>

        <h2 className="ups-main-title">उद्योगको वार्षिक विवरण</h2>

        {/* Basic industry info */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१. उद्योगको सामान्य विवरण</h3>

          <div className="ups-field-row">
            <span>१. उद्योगको नाम :</span>
            <input type="text" className="ups-wide-input" />
          </div>

          <div className="ups-field-row">
            <span>२. ठेगाना :</span>
            <input type="text" className="ups-wide-input" />
          </div>

          <div className="ups-field-row">
            <span>३. विवरण पेश गरेको अवधि : मिति</span>
            <input type="text" className="ups-small-input" />
            <span>देखि</span>
            <input type="text" className="ups-small-input" />
            <span>सम्म</span>
          </div>

          <div className="ups-field-row">
            <span>आर्थिक वर्ष :</span>
            <input type="text" className="ups-small-input" />
            <span>उद्योगको दर्ता मिति :</span>
            <input type="text" className="ups-small-input" />
          </div>

          <div className="ups-field-row">
            <span>४. उद्योगको प्रकार :</span>
            <input type="text" className="ups-medium-input" />
          </div>

          <div className="ups-field-row">
            <span>५. उद्योग स्थापना / संचालनको मिति :</span>
            <input type="text" className="ups-small-input" />
            <span>उद्योग संचालन भएको अवधि :</span>
            <input type="text" className="ups-small-input" />
          </div>
        </section>

        {/* Production table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">६. उत्पादनको विवरण :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विवरण</th>
                <th>परिमाण</th>
                <th>एकाई</th>
                <th>उत्पाद परिणाम</th>
                <th>एकाइ</th>
                <th>प्रति एकाइ मूल्य</th>
                <th>कुल परिमाण (प्रतिशत)</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <button className="ups-add-btn">+</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Raw materials table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">७. कच्चा पदार्थ, केमिकल एवं यांत्रिक सामान :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विवरण</th>
                <th>एकाइ</th>
                <th>परिमाण</th>
                <th>सरदर एकाइको मूल्य</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <button className="ups-add-btn">+</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Market / export info */}
        <section className="ups-section">
          <h3 className="ups-subtitle">८. उत्पादित सामानको निकासी :</h3>

          <div className="ups-field-row">
            <span>(क) बिक्री गरेको मुलुकको नाम :</span>
            <input type="text" className="ups-wide-input" />
          </div>

          <div className="ups-field-row">
            <span>(ख) बिक्री रकम :</span>
            <input type="text" className="ups-medium-input" />
            <span>(ग) निकासी परिमाण :</span>
            <input type="text" className="ups-medium-input" />
          </div>

          <div className="ups-field-row">
            <span>
              ९. कुनै पनि तहबाट नेपाल सरकारबाट उद्योगले प्राप्त गरेको कुनै
              छुट सुविधा:
            </span>
            <input type="text" className="ups-wide-input" />
          </div>
        </section>

        {/* Other resources table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">९. उद्योगले प्रयोग गरेको अन्य आवश्यकताहरू :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>विवरण</th>
                <th>एकाइ</th>
                <th>परिमाण</th>
                <th>सरदर एकाइको मूल्य</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>पानी</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>२</td>
                <td>विद्धुत शक्ति / इन्धन इत्यादि</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>३</td>
                <td>कच्चा माल / सहयोगी सामग्री</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Manpower table */}
        <section className="ups-section">
          <h3 className="ups-subtitle">१०. उद्योगमा कार्यरत जनशक्ति :</h3>

          <table className="ups-table">
            <thead>
              <tr>
                <th rowSpan="2">क्र.स.</th>
                <th rowSpan="2">विवरण</th>
                <th colSpan="3">संख्या</th>
              </tr>
              <tr>
                <th>महिला</th>
                <th>पुरुष</th>
                <th>कुल</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>१</td>
                <td>प्राविधिक</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td>२</td>
                <td>प्रशासनिक</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td>३</td>
                <td>श्रमिक</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Environment section */}
        <section className="ups-section">
          <h3 className="ups-subtitle">
            ११. उद्योग संचालन गर्दा वातावरणमा पर्न जाने प्रतिकूल प्रभाव न्युनिकरणको लागि अपनाएको उपायहरू:
          </h3>

          <textarea
            className="ups-textarea"
            rows="4"
            placeholder="यहाँ उद्योग संचालनका क्रममा अपनाइएका वातावरणीय उपायहरू उल्लेख गर्नुहोस्…"
          />

          <div className="ups-sign-row">
            <div className="ups-sign-left">
              <span>तयार गर्ने</span>
              <input type="text" className="ups-medium-input" />
            </div>

            <div className="ups-sign-right">
              <span>खुल्ने गर्ने</span>
              <input type="text" className="ups-medium-input" />
              <div className="ups-sign-role">संचालक/व्यवस्थापक</div>
            </div>
          </div>
        </section>

        {/* Applicant details */}
        <section className="ups-section">
          <h3 className="ups-subtitle">निवेदकको विवरण</h3>
          <div className="ups-applicant-box">
            <div className="ups-field">
              <label>निवेदकको नाम *</label>
              <input type="text" />
            </div>
            <div className="ups-field">
              <label>निवेदकको ठेगाना *</label>
              <input type="text" />
            </div>
            <div className="ups-field">
              <label>निवेदकको नागरिकता नं. *</label>
              <input type="text" />
            </div>
            <div className="ups-field">
              <label>निवेदकको फोन नं. *</label>
              <input type="text" />
            </div>
          </div>
        </section>

        {/* Submit button */}
        <div className="ups-submit-row">
          <button className="ups-submit-btn">
            रेकर्ड सेभ र प्रिन्ट गर्नुहोस्
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ups-footer">
        © सर्वाधिकार सुरक्षित नामगुन नगरपालिकाः
      </footer>
    </div>
  );
}

export default IndustryPeriodSummary;
