import React, { useState } from 'react';
import './FarmerGroupOrCommitteeRegistrationCertificateList.css';

const initialData = [
  { 
    id: 1, 
    sn: '१', 
    groupName: 'भुलभुले', 
    regNo: '३/२०८१/८२', 
    regDate: '२०८२-०१-१३', 
    formedDate: '२०८२-०१-१३', 
    type: 'समूह',
    department: 'नागार्जुन गाउँपालिका',
    address: 'नागार्जुन,बाग्मती',
    officer: 'मन्जिल आचार्य',
    position: 'अध्यक्ष'
  },
  { 
    id: 2, 
    sn: '२', 
    groupName: 'सहयोगी कृषक समुह', 
    regNo: '१/२०८१/८२', 
    regDate: '२०८१-०७-२७', 
    formedDate: '२०८१-०७-२७', 
    type: 'समूह',
    department: 'नागार्जुन नगरपालिका',
    address: 'काठमाडौ,काठमाडौ',
    officer: 'अमृत बहादुर वली',
    position: 'सचिव'
  },
  { 
    id: 3, 
    sn: '३', 
    groupName: 'हेमन्ती परिवार', 
    regNo: '४/२०८१/८२', 
    regDate: '२०८२-०१-२१', 
    formedDate: '२०८२-०१-२१', 
    type: 'समूह',
    department: 'वडा कार्यालय',
    address: 'सैनामैना,रुपन्देही',
    officer: 'मन्जिल आचार्य',
    position: 'अध्यक्ष'
  },
  { 
    id: 4, 
    sn: '४', 
    groupName: 'krishna', 
    regNo: '५/२०८१/८२', 
    regDate: '२०८२-०१-२६', 
    formedDate: '२०८२-०१-२६', 
    type: 'समिति',
    department: 'jkhac',
    address: 'hjgac,gau',
    officer: 'अमृत बहादुर वली',
    position: 'सचिव'
  },
  { 
    id: 5, 
    sn: '५', 
    groupName: 'adIkhaksjh', 
    regNo: '७/२०८१/८२', 
    regDate: '२०८२-०३-०४', 
    formedDate: '२०८२-०३-०४', 
    type: 'समूह',
    department: 'asdljk',
    address: 'lkhdj,dkjhj',
    officer: 'सरस्वती राना',
    position: 'का.वा अध्यक्ष'
  },
  { 
    id: 6, 
    sn: '६', 
    groupName: 'मोडेल', 
    regNo: '९/२०८२/८३', 
    regDate: '२०८२-०४-१०', 
    formedDate: '२०८२-०४-१०', 
    type: 'समूह',
    department: 'नागार्जु',
    address: 'काठमाडौँ,काठमाडौँ',
    officer: 'मन्जिल आचार्य',
    position: 'अध्यक्ष'
  },
  { 
    id: 7, 
    sn: '७', 
    groupName: 'कमल', 
    regNo: '६/२०८१/८२', 
    regDate: '२०८२-०२-०६', 
    formedDate: '२०८२-०२-०६', 
    type: 'समिति',
    department: 'चसनब मबस',
    address: 'नमस चबन,नब चनसा',
    officer: 'मन बहादुर श्रेष्ठ',
    position: 'सचिव'
  },
  { 
    id: 8, 
    sn: '८', 
    groupName: '1', 
    regNo: '८/२०८१/८२', 
    regDate: '२०८२-०३-१७', 
    formedDate: '२०८२-०३-१७', 
    type: 'समूह',
    department: 'sd',
    address: 'dsd,asda',
    officer: 'सरस्वती राना',
    position: 'का.वा अध्यक्ष'
  },
  { 
    id: 9, 
    sn: '९', 
    groupName: 'बयजब', 
    regNo: '२/२०८१/८२', 
    regDate: '२०८१-०८-२६', 
    formedDate: '२०८१-०८-२६', 
    type: 'समूह',
    department: 'मा',
    address: 'मा,कमा',
    officer: 'मन्जिल आचार्य',
    position: 'अध्यक्ष'
  },
  { 
    id: 10, 
    sn: '१०', 
    groupName: '7dee6ed3-57ef-4f2d-a89c-d4d87fc3cb9a', 
    regNo: '१/२०८१/८२', 
    regDate: '२०८१-११-०८', 
    formedDate: '२०८१-११-०८', 
    type: 'समूह',
    department: 'fhn',
    address: 'dfhn,२०८१-११-०८',
    officer: 'राम',
    position: 'अध्यक्ष'
  }
];

const FarmerGroupOrCommitteeRegistrationCertificateList = () => {
  const [data] = useState(initialData);

  const handleSearch = () => {
    console.log('Search button clicked');
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className="farmer-list-container">
      {/* --- Header --- */}
      <div className="list-header">
        <h2>कृषक समूह/समिति दर्ता प्रमाण-पत्रको सूची</h2>
        <button className="back-link-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input type="text" placeholder="मिति देखि" className="filter-input date-field" />
        <input type="text" placeholder="मिति सम्म" className="filter-input date-field" />
        <input type="text" placeholder="समूह/समितिको नाम" className="filter-input" />
        <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="farmer-table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>समूह/समितिको नाम</th>
              <th>दर्ता नं.</th>
              <th>दर्ता मिति</th>
              <th>गठन मिति</th>
              <th>समूह/समिति दर्ता मिति</th>
              <th>प्रकार</th>
              <th>विभाग</th>
              <th>ठेगाना,जिल्ला</th>
              <th>अधिकृत व्यक्ति</th>
              <th>पद</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.sn}</td>
                <td>{row.groupName}</td>
                <td>{row.regNo}</td>
                <td>{row.regDate}</td>
                <td>{row.formedDate}</td>
                <td>{row.formedDate}</td> {/* Reusing date as image shows similar */}
                <td>{row.type}</td>
                <td>{row.department}</td>
                <td>{row.address}</td>
                <td>{row.officer}</td>
                <td>{row.position}</td>
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

export default FarmerGroupOrCommitteeRegistrationCertificateList;