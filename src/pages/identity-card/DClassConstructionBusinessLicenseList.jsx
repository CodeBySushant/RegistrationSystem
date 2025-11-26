// 4
import React, { useState } from 'react';
import './DClassConstructionBusinessLicenseList.css';

const initialData = [
  { 
    id: 1, 
    sn: '१', 
    regNo: '३/२०८१/८२', 
    businessName: 'क्कय', 
    regDate: '२०८२-०१-२५', 
    ownerName: 'पजवषजदग', 
    address: 'वजषगष', 
    phone: '९८००००००००००' 
  },
  { 
    id: 2, 
    sn: '२', 
    regNo: '१/२०८१/८२', 
    businessName: 'इलाइट इन्फ्रा', 
    regDate: '२०८१-०८-२१', 
    ownerName: 'kjfhafl lka gk', 
    address: 'मा', 
    phone: '२' 
  },
  { 
    id: 3, 
    sn: '३', 
    regNo: '६/२०८१/८२', 
    businessName: 'test', 
    regDate: '२०८२-०३-१९', 
    ownerName: 'test', 
    address: 'test', 
    phone: 'test' 
  },
  { 
    id: 4, 
    sn: '४', 
    regNo: '४/२०८१/८२', 
    businessName: 'तेसत', 
    regDate: '२०८२-०२-०१', 
    ownerName: 'उदसगदउ', 
    address: 'दसउग', 
    phone: 'सदेग' 
  },
  { 
    id: 5, 
    sn: '५', 
    regNo: '२/२०८१/८२', 
    businessName: 'नजनज', 
    regDate: '२०८२-०१-०३', 
    ownerName: 'नजन', 
    address: 'जनज', 
    phone: '५६४३४५' 
  },
  { 
    id: 6, 
    sn: '६', 
    regNo: '५/२०८१/८२', 
    businessName: 'Kakajan', 
    regDate: '२०८२-०२-२४', 
    ownerName: 'Nsjsn', 
    address: 'Hsnsn', 
    phone: '938373' 
  }
];

const DClassConstructionBusinessLicenseList = () => {
  const [data] = useState(initialData);

  const handleSearch = () => {
    console.log('Search button clicked');
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="license-list-container">
      {/* --- Header --- */}
      <div className="license-list-header">
        <h2>घ वर्गको निर्माण व्यवसाय इजाजत पत्रको सूची</h2>
        <button className="back-link-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input type="text" placeholder="मिति देखि" className="filter-input date-field" />
        <input type="text" placeholder="मिति सम्म" className="filter-input date-field" />
        <input type="text" placeholder="व्यवसायको नाम" className="filter-input" />
        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="license-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>दर्ता नं.</th>
              <th>व्यवसायको नाम</th>
              <th>दर्ता मिति</th>
              <th>व्यवसायीको नाम</th>
              <th>व्यवसायको ठेगाना</th>
              <th>टेलिफोन नं.</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.sn}</td>
                <td>{row.regNo}</td>
                <td>{row.businessName}</td>
                <td>{row.regDate}</td>
                <td>{row.ownerName}</td>
                <td>{row.address}</td>
                <td>{row.phone}</td>
                <td className="text-center">
                  <span className="eye-icon">👁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-info">
             Page 1 of 1
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default DClassConstructionBusinessLicenseList;