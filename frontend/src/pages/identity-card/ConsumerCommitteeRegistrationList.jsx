// ConsumerCommitteeRegistrationList.jsx
import React, { useState, useMemo } from "react";
import "./ConsumerCommitteeRegistrationList.css";
import axios from "../../utils/axiosInstance";
import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

const initialData = [
  {
    id: 1,
    sn: "१",
    reg_no: "१/२०८१/८२",
    committee_name: "bsgbs",
    reg_date: new Date().toISOString().slice(0, 10), // use ISO-ish for easier date comparisons
    owner_name: "asdf",
    address: "dgnd",
    phone: "dfgb",
  },
];

const ConsumerCommitteeRegistrationList = () => {
  const [data] = useState(initialData);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  // local filtered data so search works without backend
  const filtered = useMemo(() => {
    return data.filter((row) => {
      // name filter
      if (nameFilter && !row.committee_name.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false;
      }
      // date filter (assumes row.reg_date in YYYY-MM-DD or similar)
      if (fromDate) {
        const r = new Date(row.reg_date);
        const f = new Date(fromDate);
        if (isNaN(r) || r < f) return false;
      }
      if (toDate) {
        const r = new Date(row.reg_date);
        const t = new Date(toDate);
        if (isNaN(r) || r > t) return false;
      }
      return true;
    });
  }, [data, nameFilter, fromDate, toDate]);

  const handleSearch = (e) => {
    e?.preventDefault?.();
    // filtering done via hooks — no extra work here (keeps UI simple)
    console.log("Search applied", { fromDate, toDate, nameFilter });
  };

  const handleBack = () => {
    // keep behavior minimal — navigate back in browser history
    window.history.back();
  };

  return (
    <div className="committee-list-container">
      {/* --- Header --- */}
      <div className="committee-list-header">
        <h2>उपभोक्ता संग दर्ता प्रमाणपत्र सूची</h2>
        <button className="back-link-btn" onClick={handleBack} aria-label="Back">
          ← Back
        </button>
      </div>

      {/* --- Filter Bar --- */}
      <form className="filter-bar" onSubmit={handleSearch}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="मिति देखि"
          className="filter-input date-field"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="मिति सम्म"
          className="filter-input date-field"
        />
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="उपभोक्ता समितिको नाम"
          className="filter-input"
        />
        <button type="submit" className="search-icon-btn" title="Search">🔍</button>
        <button
          type="button"
          className="search-icon-btn"
          title="Clear"
          onClick={() => { setFromDate(""); setToDate(""); setNameFilter(""); }}
        >
          ♻
        </button>
      </form>

      {/* --- Table Section --- */}
      <div className="table-container">
        <table className="committee-table" role="table">
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>दर्ता नं.</th>
              <th>उपभोक्ता समितिको नाम</th>
              <th>दर्ता मिति</th>
              <th>दर्ता गर्नेको नाम</th>
              <th>दर्ता गर्नेको ठेगाना</th>
              <th>दर्ता गर्नेको टेलिफोन नं.</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>रिक्त</td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.sn}</td>
                  <td>{row.reg_no}</td>
                  <td>{row.committee_name}</td>
                  <td>{row.reg_date}</td>
                  <td>{row.owner_name}</td>
                  <td>{row.address}</td>
                  <td>{row.phone}</td>
                  <td className="text-center">
                    <button
                      className="icon-btn"
                      title={`View ${row.committee_name}`}
                      onClick={() => alert(`View details for ${row.committee_name}`)}
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination-info">Page 1 of 1</div>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default ConsumerCommitteeRegistrationList;
