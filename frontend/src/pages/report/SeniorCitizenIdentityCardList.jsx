// src/components/SeniorCitizenIdentityCardList.jsx — merged (JSX + CSS, no external .css needed)
import React, { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   INLINE STYLES  (replaces SeniorCitizenIdentityCardList.css — unchanged except icon-btn added)
   ───────────────────────────────────────────── */
const STYLES = `
/* --- Main Container --- */
.senior-list-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f4f7f6;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  display: flex;
  flex-direction: column;
}

/* --- Header Bar --- */
.list-header-bar {
  background-color: #fff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.list-header-bar h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #000;
  font-weight: bold;
}

.breadcrumb {
  font-size: 0.9rem;
  color: #666;
}

.active-crumb {
  color: #888;
}

/* --- Main Content Area --- */
.list-content-area {
  background-color: #cfd8dc;
  padding: 20px 30px;
  flex-grow: 1;
}

/* --- Actions Row (Search & Add Button) --- */
.list-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-group {
  display: flex;
}

.search-input {
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  width: 250px;
  outline: none;
}

.search-button {
  background-color: #2980b9;
  color: white;
  border: 1px solid #2980b9;
  border-radius: 0 4px 4px 0;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
}
.search-button:hover { background-color: #2471a3; }

.add-new-btn {
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
}
.add-new-btn:hover { background-color: #2471a3; }
.plus-icon { font-weight: bold; font-size: 1.2rem; margin-right: 5px; }

/* --- Table Styling --- */
.table-responsive {
  overflow-x: auto;
}

.senior-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #e0e0e0;
  font-size: 0.95rem;
}

.senior-table th {
  background-color: #1c2331;
  color: white;
  padding: 12px 10px;
  text-align: center;
  font-weight: normal;
  border-right: 1px solid #34495e;
  white-space: nowrap;
}
.senior-table th:last-child { border-right: none; }

.senior-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ccc;
  color: #333;
  text-align: center;
  background-color: #e4e4e4;
}

.senior-table tr:nth-child(odd) { background-color: #dcdcdc; }
.senior-table tr:nth-child(even) { background-color: #f2f2f2; }
.senior-table tr:hover td { background-color: #cfcfcf; }

.status-badge { color: #333; }

/* FIX: icon-btn was used in JSX but had no style — unstyled native button */
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 2px 6px;
}
.icon-btn:hover { opacity: 0.7; }

/* --- Footer --- */
.list-footer {
  background-color: #fff;
  text-align: right;
  padding: 15px 30px;
  font-size: 0.85rem;
  color: #666;
  border-top: 1px solid #eee;
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */
const API_BASE = import.meta.env.VITE_API_BASE || "";
const API_URL = `${API_BASE}/api/senior/cards`;

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
const SeniorCitizenIdentityCardList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [total, setTotal] = useState(0);

  /* Inject styles once on mount */
  useEffect(() => {
    const id = "senior-citizen-identity-card-list-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  const fetchData = async ({ q = searchTerm, p = page } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      params.append("page", p);
      params.append("pageSize", pageSize);

      const url = `${API_URL}?${params.toString()}`;
      const resp = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.message || json.error || "Server error");

      setData(Array.isArray(json.rows) ? json.rows : []);
      setTotal(
        typeof json.total === "number"
          ? json.total
          : Array.isArray(json.rows)
          ? json.rows.length
          : 0
      );
      setPage(Number(p));
    } catch (err) {
      console.error("fetchData error:", err);
      setError(err.message || "Failed to load data");
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setPage(1);
    fetchData({ q: searchTerm, p: 1 });
  };

  // FIX: pressing Enter in the search input now triggers search —
  // previously there was no onKeyDown handler so Enter did nothing
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleAdd = () => {
    console.log("Add Senior Citizen clicked");
  };

  return (
    <div className="senior-list-container">

      {/* --- Top Header Bar --- */}
      <div className="list-header-bar">
        <h2>ज्येष्ठ नागरिक परिचय पत्र</h2>
        <div className="breadcrumb">
          ज्येष्ठ नागरिक परिचय पत्र &gt;{" "}
          <span className="active-crumb">ज्येष्ठ नागरिक परिचय पत्र सूची</span>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="list-content-area">

        {/* --- Actions Row --- */}
        <div className="list-actions-row">
          <div className="search-group">
            <input
              type="text"
              placeholder="ज्येष्ठ नागरिकको नाम"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // FIX: Enter key now submits search
              onKeyDown={handleSearchKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              🔍 खोज्नुहोस्
            </button>
          </div>

          <button className="add-new-btn" onClick={handleAdd}>
            <span className="plus-icon">+</span> ज्येष्ठ नागरिकको परिचयपत्र थप्नुहोस्
          </button>
        </div>

        {/* --- Table --- */}
        <div className="table-responsive">
          <table className="senior-table">
            <thead>
              <tr>
                <th>मिति</th>
                <th>नाम</th>
                <th>आवेदक पिताको नाम</th>
                <th>आवेदक हजुरबुवा नाम</th>
                <th>अधिकृत व्यक्ति</th>
                <th>कैफियत</th>
                <th>Status</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ padding: 12 }}>लोड हुँदैछ...</td></tr>
              ) : error ? (
                <tr><td colSpan="8" style={{ padding: 12, color: "red" }}>{error}</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="8" style={{ padding: 12 }}>डाटा उपलब्ध छैन। खोज गर्नुहोस्।</td></tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.name}</td>
                    <td>{row.father_name}</td>
                    <td>{row.grandfather_name}</td>
                    <td>{row.officer}</td>
                    <td>{row.remarks}</td>
                    <td><span className="status-badge">{row.status}</span></td>
                    <td>
                      <button
                        className="icon-btn"
                        title="View"
                        onClick={() => window.open(`${API_BASE}/senior/${row.id}`, "_blank")}
                      >
                        👁
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination --- */}
        {total > pageSize && (
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span>पृष्ठ {page} • जम्मा {total} आइटम</span>
            <div style={{ marginLeft: "auto" }}>
              <button
                onClick={() => fetchData({ p: Math.max(1, page - 1) })}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                onClick={() => fetchData({ p: page + 1 })}
                style={{ marginLeft: 8 }}
                disabled={page * pageSize >= total}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <div className="list-footer">
        © सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका
      </div>
    </div>
  );
};

export default SeniorCitizenIdentityCardList;