// src/pages/business/BusinessIndustryRegistrationNewList.jsx
import React, { useEffect, useState } from "react";
import "./BusinessIndustryRegistrationList.css";

import MunicipalityHeader from "../../components/MunicipalityHeader.jsx";
import { MUNICIPALITY } from "../../config/municipalityConfig";

const BusinessIndustryRegistrationNewList = () => {
  // data + ui state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters & pagination
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [qName, setQName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // server-provided total (optional)
  const [total, setTotal] = useState(null);

  // helper: build query string
  const buildUrl = () => {
    const params = new URLSearchParams();
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);
    if (qName) params.append("name", qName);
    if (page) params.append("page", String(page));
    if (pageSize) params.append("limit", String(pageSize));
    return `/api/businesses?${params.toString()}`;
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(buildUrl())
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        // support both array responses or { data: [...], total: N }
        if (Array.isArray(json)) {
          setData(json);
          setTotal(json.length);
        } else if (Array.isArray(json.data)) {
          setData(json.data);
          setTotal(typeof json.total === "number" ? json.total : json.data.length);
        } else {
          // fallback: if payload is object of rows
          setData([]);
          setTotal(0);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "त्रुटि आएको छ");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo, qName, page, pageSize]); // refetch when filters/page change

  // computed pagination
  const totalPages = total ? Math.max(1, Math.ceil(total / pageSize)) : null;

  // render helpers
  const handleExportExcel = () => {
    // trigger an export endpoint (optional)
    const url = buildUrl() + "&export=excel";
    window.open(url, "_blank");
  };

  return (
    <div className="business-list-container">
      {/* --- Top Action Bar --- */}
      <div className="top-action-bar">
        <button className="excel-btn" onClick={handleExportExcel}>एक्सेल निर्यात गर्नुहोस्</button>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="मिति देखि (YYYY-MM-DD)"
          className="filter-input date-field"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
        />
        <input
          type="text"
          placeholder="मिति सम्म (YYYY-MM-DD)"
          className="filter-input date-field"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
        />
        <input
          type="text"
          placeholder="व्यवसायको नाम"
          className="filter-input"
          value={qName}
          onChange={(e) => { setQName(e.target.value); setPage(1); }}
        />
        <button
          className="search-icon-btn"
          onClick={() => { setPage(1); /* triggers useEffect */ }}
          title="खोज"
        >
          🔍
        </button>
      </div>

      {/* --- Table Section --- */}
      <div className="table-container">
        {loading ? (
          <div className="loading">लोड हुँदैछ...</div>
        ) : error ? (
          <div className="error">त्रुटि: {error}</div>
        ) : data.length === 0 ? (
          <div className="empty">डेटा उपलब्ध छैन</div>
        ) : null}

        {/* Table */}
        {!loading && !error && data.length > 0 && (
          <>
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
                  <tr key={row.id} className={row.status === "closed" ? "closed-row" : ""}>
                    <td>{row.sn ?? ""}</td>
                    <td>{row.regDate ?? ""}</td>
                    <td>{row.regNo ?? ""}</td>
                    <td>{row.businessName ?? ""}</td>
                    <td>{row.ownerName ?? ""}</td>
                    <td>{row.address ?? ""}</td>
                    <td>{row.capital ?? ""}</td>
                    <td>{row.renewDate ?? ""}</td>
                    <td>{row.type ?? ""}</td>

                    {/* Edit Column */}
                    <td className="action-cell">
                      {row.status === "active" ? (
                        <button
                          className="icon-btn edit-btn"
                          onClick={() => {
                            // navigate to edit page - replace with your routing
                            window.location.href = `/businesses/${row.id}/edit`;
                          }}
                          title="सम्पादन"
                        >
                          ✏️
                        </button>
                      ) : (
                        <span className="red-status-text">यो व्यवसाय बन्द गरिएको छ</span>
                      )}
                    </td>

                    {/* Print Column */}
                    <td className="action-cell">
                      {row.status === "active" ? (
                        <button
                          className="icon-btn print-btn"
                          onClick={() => {
                            // open print view - replace as needed
                            window.open(`/businesses/${row.id}/print`, "_blank");
                          }}
                          title="प्रमाणपत्र प्रिन्ट"
                        >
                          📇
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* --- Pagination --- */}
            <div className="pagination-container">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Prev
              </button>

              {/* show a small page window */}
              {totalPages ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2)).map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${p === page ? "active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))
              ) : (
                // if totalPages unknown show simple pages
                <>
                  <button className={`page-btn ${page === 1 ? "active" : ""}`} onClick={() => setPage(1)}>1</button>
                  <button className="page-btn" onClick={() => setPage(page + 1)}>next</button>
                </>
              )}

              <button
                className="page-btn"
                onClick={() => {
                  if (totalPages) setPage((p) => Math.min(totalPages, p + 1));
                  else setPage((p) => p + 1);
                }}
                disabled={totalPages ? page >= totalPages : false}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* --- Footer --- */}
      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default BusinessIndustryRegistrationNewList;
