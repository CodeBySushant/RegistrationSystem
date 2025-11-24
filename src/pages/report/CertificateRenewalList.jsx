import React, { useState } from 'react';
import './CertificateRenewalList.css';

// 5
const initialData = [
  {
    id: 1,
    sn: '१',
    renewDate: '२०८२-०७-१४',
    name: 'Illana Frederick',
    type: 'एकल महिला भत्ता',
    district: 'Vitae non nobis fugi',
    address: 'Enim at iusto volupt,वडा नं.831',
    phone: '+1 (515) 747-7087',
    cardNo: '769',
    issueDate: '२०८२-०७-१४',
    officer: 'मन बहादुर श्रेष्ठ',
  },
  {
    id: 2,
    sn: '२',
    renewDate: '2082-07-15',
    name: 'Madison Stephenson',
    type: 'जेष्ठ नागरिक अन्य भत्ता',
    district: 'Dolor ut laboris sit',
    address: 'Repudiandae anim dol,वडा नं.327',
    phone: '+1 (401) 374-5328',
    cardNo: '249',
    issueDate: '10-Aug-1993',
    officer: 'सरस्वती राना',
  },
  {
    id: 3,
    sn: '३',
    renewDate: '2082-07-13',
    name: 'Alexandra Hancock',
    type: 'लोपोन्मुख आदिवासी भत्ता',
    district: 'At quae impedit vel',
    address: 'Consectetur consequa,वडा नं.902',
    phone: '+1 (106) 698-4651',
    cardNo: '383',
    issueDate: '25-May-1977',
    officer: 'मन्जिल आचार्य',
  },
  {
    id: 4,
    sn: '४',
    renewDate: '2082-07-13',
    name: 'Kay Roach',
    type: 'पूर्ण अपाङ्ग भत्ता',
    district: 'Sunt in aut sequi ra',
    address: 'Qui ex magni perspic,वडा नं.521',
    phone: '+1 (876) 717-1928',
    cardNo: '684',
    issueDate: '15-May-2018',
    officer: 'मन बहादुर श्रेष्ठ',
  },
  {
    id: 5,
    sn: '५',
    renewDate: '2082-07-14',
    name: 'Casey Sutton',
    type: 'लोपोन्मुख आदिवासी भत्ता',
    district: 'Distinctio Velit ni',
    address: 'Labore repellendus ,वडा नं.75',
    phone: '+1 (505) 338-3516',
    cardNo: '281',
    issueDate: '20-Sep-2014',
    officer: 'मन बहादुर श्रेष्ठ',
  },
];

const CertificateRenewalList = () => {
  const [data] = useState(initialData);

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="renewal-list-container">
      {/* --- Header --- */}
      <div className="renewal-header">
        <h2>परिचय पत्र नवीकरणको सूची</h2>
        <button className="back-link-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* --- Action Buttons --- */}
      <div className="action-buttons-row">
        <button className="action-btn excel-btn">एक्सेल निर्यात गर्नुहोस्</button>
        <button className="action-btn print-btn">प्रिन्ट गर्नुहोस्</button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input type="text" placeholder="मिति देखि" className="filter-input" />
        <input type="text" placeholder="मिति सम्म" className="filter-input" />
        <input type="text" placeholder="आवेदकको नाम" className="filter-input" />
        <select className="filter-select">
          <option value="">प्रमाणपत्र प्रकार चयन गर्नुहोस्</option>
          <option value="single_woman">एकल महिला भत्ता</option>
          <option value="senior">जेष्ठ नागरिक</option>
          <option value="disability">अपाङ्गता</option>
        </select>
        <input type="text" placeholder="परिचय पत्र नं." className="filter-input" />
        <button className="search-icon-btn">🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="renewal-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>नवीकरण मिति</th>
              <th>आवेदकको नाम</th>
              <th>नवीकरण प्रकार</th>
              <th>आवेदकको जिल्ला</th>
              <th>स्थानीय स्तर ठेगाना, वडा नं.</th>
              <th>फोन नं.</th>
              <th>परिचय पत्र नं.</th>
              <th>परिचय पत्र प्राप्त मिति</th>
              <th>अधिकृत व्यक्ति</th>
              <th>सिफारिस</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.sn}</td>
                <td>{row.renewDate}</td>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.district}</td>
                <td>{row.address}</td>
                <td>{row.phone}</td>
                <td>{row.cardNo}</td>
                <td>{row.issueDate}</td>
                <td>{row.officer}</td>
                <td className="text-center">
                  <span className="eye-icon">👁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default CertificateRenewalList;