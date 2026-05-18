// src/pages/business-reg/BusinessIndustryRegistrationList.jsx
import React, { useEffect, useState } from "react";
import { MUNICIPALITY } from "../../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles (merged from BusinessIndustryRegistrationList.css)
   All classes prefixed with "birl-" to avoid global collisions.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Container ── */
  .birl-container {
    width: 100%;
    min-height: 100vh;
    background-image: url("/papertexture1.jpg");
    background-repeat: repeat;
    background-size: auto;
    background-position: top left;
    font-family: 'Kalimati', 'Kokila', sans-serif;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
  }

  /* ── Top Action Bar ── */
  .birl-action-bar { padding: 0 30px; margin-bottom: 20px; }
  .birl-excel-btn {
    background-color: #337ab7;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
  }
  .birl-excel-btn:hover { background-color: #286090; }

  /* ── Filter Bar ── */
  .birl-filter-bar {
    background-color: #1f2a38;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin: 0 30px;
    border-radius: 2px 2px 0 0;
  }
  .birl-filter-input {
    padding: 8px 12px;
    border: none;
    border-radius: 2px;
    font-size: 0.9rem;
    height: 38px;
    box-sizing: border-box;
    flex-grow: 1;
    background-color: #eef2f5;
    color: #555;
    font-family: inherit;
  }
  .birl-date-field { flex-grow: 0; width: 200px; }
  .birl-search-btn {
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    width: 40px;
    height: 38px;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .birl-search-btn:hover { background-color: #20638f; }

  /* ── Table container ── */
  .birl-table-container {
    margin: 0 30px 30px 30px;
    overflow-x: auto;
    background-color: rgba(255,255,255,0.8);
    padding-bottom: 20px;
  }
  .birl-loading,
  .birl-error,
  .birl-empty { padding: 20px; text-align: center; color: #555; }
  .birl-error  { color: crimson; }

  /* ── Table ── */
  .birl-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  .birl-table th {
    background-color: #1f2a38;
    color: white;
    padding: 12px 5px;
    text-align: center;
    font-weight: normal;
    border-right: 1px solid #4a5a6a;
    white-space: normal;
    vertical-align: top;
  }
  .birl-table th:last-child { border-right: none; }
  .birl-table td {
    padding: 10px 5px;
    color: #333;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #e0e0e0;
  }
  .birl-table tr:nth-child(even) td { background-color: #f0f0f0; }
  .birl-table tr:hover td           { background-color: #d0d0d0; }

  .birl-closed-status {
    color: #e74c3c;
    font-size: 0.8rem;
    display: block;
    width: 100%;
  }
  .birl-action-cell { white-space: nowrap; }
  .birl-icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
    color: #333;
  }

  /* ── Pagination ── */
  .birl-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
  }
  .birl-page-btn {
    padding: 5px 12px;
    border: none;
    background-color: #999;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 2px;
    font-family: inherit;
  }
  .birl-page-btn.birl-active { background-color: #337ab7; }
  .birl-page-btn:hover       { background-color: #555; }

  /* ── Footer ── */
  .birl-copyright {
    margin-top: auto;
    text-align: right;
    padding: 15px 30px;
    font-size: 0.85rem;
    color: #666;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const BusinessIndustryRegistrationList = () => {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo]     = useState("");
  const [qName, setQName]       = useState("");
  const [page, setPage]         = useState(1);
  const [pageSize]              = useState(10);
  const [total, setTotal]       = useState(null);

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo)   params.append("dateTo",   dateTo);
    if (qName)    params.append("name",     qName);
    if (page)     params.append("page",     String(page));
    if (pageSize) params.append("limit",    String(pageSize));
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
        if (Array.isArray(json)) {
          setData(json);
          setTotal(json.length);
        } else if (Array.isArray(json.data)) {
          setData(json.data);
          setTotal(typeof json.total === "number" ? json.total : json.data.length);
        } else {
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

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo, qName, page, pageSize]);

  const totalPages = total ? Math.max(1, Math.ceil(total / pageSize)) : null;

  const handleExportExcel = () => {
    window.open(buildUrl() + "&export=excel", "_blank");
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{STYLES}</style>

      <div className="birl-container">

        {/* ── Top Action Bar ── */}
        <div className="birl-action-bar">
          <button className="birl-excel-btn" onClick={handleExportExcel}>
            एक्सेल निर्यात गर्नुहोस्
          </button>
        </div>

        {/* ── Filter Bar ── */}
        <div className="birl-filter-bar">
          <input
            type="text"
            placeholder="मिति देखि (YYYY-MM-DD)"
            className="birl-filter-input birl-date-field"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
          />
          <input
            type="text"
            placeholder="मिति सम्म (YYYY-MM-DD)"
            className="birl-filter-input birl-date-field"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
          />
          <input
            type="text"
            placeholder="व्यवसायको नाम"
            className="birl-filter-input"
            value={qName}
            onChange={(e) => { setQName(e.target.value); setPage(1); }}
          />
          <button
            className="birl-search-btn"
            onClick={() => setPage(1)}
            title="खोज"
          >
            🔍
          </button>
        </div>

        {/* ── Table ── */}
        <div className="birl-table-container">
          {loading && <div className="birl-loading">लोड हुँदैछ...</div>}
          {error   && <div className="birl-error">त्रुटि: {error}</div>}
          {!loading && !error && data.length === 0 && (
            <div className="birl-empty">डेटा उपलब्ध छैन</div>
          )}

          {!loading && !error && data.length > 0 && (
            <>
              <table className="birl-table">
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
                    <tr key={row.id} className={row.status === "closed" ? "birl-closed-row" : ""}>
                      <td>{row.sn        ?? ""}</td>
                      <td>{row.regDate   ?? ""}</td>
                      <td>{row.regNo     ?? ""}</td>
                      <td>{row.businessName ?? ""}</td>
                      <td>{row.ownerName ?? ""}</td>
                      <td>{row.address   ?? ""}</td>
                      <td>{row.capital   ?? ""}</td>
                      <td>{row.renewDate ?? ""}</td>
                      <td>{row.type      ?? ""}</td>
                      <td className="birl-action-cell">
                        {row.status === "active" ? (
                          <button
                            className="birl-icon-btn"
                            onClick={() => { window.location.href = `/businesses/${row.id}/edit`; }}
                            title="सम्पादन"
                          >
                            ✏️
                          </button>
                        ) : (
                          <span className="birl-closed-status">यो व्यवसाय बन्द गरिएको छ</span>
                        )}
                      </td>
                      <td className="birl-action-cell">
                        {row.status === "active" && (
                          <button
                            className="birl-icon-btn"
                            onClick={() => { window.open(`/businesses/${row.id}/print`, "_blank"); }}
                            title="प्रमाणपत्र प्रिन्ट"
                          >
                            📇
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ── Pagination ── */}
              <div className="birl-pagination">
                <button
                  className="birl-page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Prev
                </button>

                {totalPages
                  ? Array.from({ length: totalPages }, (_, i) => i + 1)
                      .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                      .map((p) => (
                        <button
                          key={p}
                          className={`birl-page-btn${p === page ? " birl-active" : ""}`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      ))
                  : (
                    <>
                      <button className={`birl-page-btn${page === 1 ? " birl-active" : ""}`} onClick={() => setPage(1)}>1</button>
                      <button className="birl-page-btn" onClick={() => setPage(page + 1)}>next</button>
                    </>
                  )
                }

                <button
                  className="birl-page-btn"
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

        {/* ── Footer ── */}
        <div className="birl-copyright">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>

      </div>
    </>
  );
};

export default BusinessIndustryRegistrationList;