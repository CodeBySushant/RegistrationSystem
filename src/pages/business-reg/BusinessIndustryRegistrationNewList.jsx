// 3
import React, { useState } from 'react';
import './BusinessIndustryRegistrationNewList.css';

const initialData = [
  {
    id: 1,
    sn: '१',
    regDate: '२०८२-०७-१६',
    regNo: '१/२०८१/८२',
    businessName: 'John Kirby',
    ownerName: 'Abel Mcbride',
    address: 'Ifeoma Ayala, वडा नं 696',
    capital: 'Et qui exercitatione',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 2,
    sn: '२',
    regDate: '२०८२-०४-२०',
    regNo: '१७/२०८२/८३',
    businessName: 'q',
    ownerName: 'q',
    address: 'q, वडा नं q',
    capital: 'a',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 3,
    sn: '३',
    regDate: '२०८२-०४-०७',
    regNo: '१६/२०८२/८३',
    businessName: 'बि.बि.एस. ग्रुप प्रा.ली.',
    ownerName: 'पारस पौडेल',
    address: 'शान्ति, वडा नं ११',
    capital: '२००००',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 4,
    sn: '४',
    regDate: '२०८२-०३-२६',
    regNo: '१५/२०८१/८२',
    businessName: 'Maisie Moran',
    ownerName: 'Keiko Fuller',
    address: 'Driscoll Hubbard, वडा नं 705',
    capital: 'Reiciendis dolor sim',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 5,
    sn: '५',
    regDate: '२०८२-०३-२३',
    regNo: '७/२०८०/८१',
    businessName: 'निर्देश',
    ownerName: 'निर्देश',
    address: 'निर्देश, वडा नं 12',
    capital: 'निर्देश',
    renewDate: 'नयाँ दर्ता',
    type: 'पुरानो',
    status: 'closed'
  },
  {
    id: 6,
    sn: '६',
    regDate: '२०८२-०३-२३',
    regNo: '१४/२०८१/८२',
    businessName: 'निर्देश',
    ownerName: 'निर्देश',
    address: 'निर्देश, वडा नं निर्देश',
    capital: 'निर्देश',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'closed'
  },
  {
    id: 7,
    sn: '७',
    regDate: '२०८२-०३-२२',
    regNo: '१३/२०८१/८२',
    businessName: 'नयवेऔबचकगन',
    ownerName: 'राम बहादुर राना',
    address: 'कजन, वडा नं जकन',
    capital: '87456',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 8,
    sn: '८',
    regDate: '२०८२-०२-३०',
    regNo: '१२/२०८१/८२',
    businessName: 'यूनिक',
    ownerName: 'ऐन बहादुर रोकाया',
    address: 'ब, वडा नं ब',
    capital: 'ज',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 9,
    sn: '९',
    regDate: '२०८२-०१-२३',
    regNo: '११/२०८१/८२',
    businessName: '--',
    ownerName: '-',
    address: '-, वडा नं -',
    capital: '-',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'active'
  },
  {
    id: 10,
    sn: '१०',
    regDate: '२०८२-०१-२१',
    regNo: '१०/२०८१/८२',
    businessName: 'सुन्दर किराना पसल',
    ownerName: 'रमेश यादव',
    address: 'पुनम पथ, वडा नं २',
    capital: '८०००००००',
    renewDate: 'नयाँ दर्ता',
    type: 'नया',
    status: 'closed'
  }
];

const BusinessIndustryRegistrationNewList = () => {
  const [data] = useState(initialData);

  return (
    <div className="business-list-container">
      {/* --- Top Action Bar --- */}
      <div className="top-action-bar">
        <button className="excel-btn">एक्सेल निर्यात गर्नुहोस्</button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input type="text" placeholder="मिति देखि" className="filter-input date-field" />
        <input type="text" placeholder="मिति सम्म" className="filter-input date-field" />
        <input type="text" placeholder="व्यवसायको नाम" className="filter-input" />
        <button className="search-icon-btn">🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>दर्ता मिति</th>
              <th>दर्ता नं</th>
              <th>व्यवसायको नाम</th>
              <th>व्यवसायीको नाम</th>
              <th>व्यवसायको ठेगाना</th>
              <th>व्यवसायमा लगाउने पूँजी</th>
              <th>नविकरण गरिएको मिति</th>
              <th>नया/ पुरानो</th>
              <th>दर्ता सम्पादन</th>
              <th>प्रमाणपत्र प्रिन्ट</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className={row.status === 'closed' ? 'closed-row' : ''}>
                <td>{row.sn}</td>
                <td>{row.regDate}</td>
                <td>{row.regNo}</td>
                <td>{row.businessName}</td>
                <td>{row.ownerName}</td>
                <td>{row.address}</td>
                <td>{row.capital}</td>
                <td>{row.renewDate}</td>
                <td>{row.type}</td>
                
                {/* Edit Column */}
                <td className="action-cell">
                  {row.status === 'active' ? (
                    <button className="icon-btn edit-btn">✏️</button>
                  ) : (
                     <span className="red-status-text">यो व्यवसाय बन्द गरिएको छ</span>
                  )}
                </td>

                {/* Print Column */}
                <td className="action-cell">
                  {row.status === 'active' ? (
                    <button className="icon-btn print-btn">📇</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* --- Pagination --- */}
        <div className="pagination-container">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn next-btn">next</button>
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default BusinessIndustryRegistrationNewList;