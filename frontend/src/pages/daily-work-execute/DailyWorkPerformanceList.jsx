import React, { useEffect, useState, useCallback } from 'react';
import { MUNICIPALITY } from "../../config/municipalityConfig";
import {
  getFreshSubmissions,
  deleteSubmission,
  timeLeftLabel,
} from '../../utils/submissionTracker';

/* ─────────────────────────────────────────────
   CONSTANT — must be at module scope BEFORE
   the component, not after. Defining it after
   the component causes a ReferenceError because
   `const` is not hoisted with its value.
───────────────────────────────────────────── */
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

/* ─────────────────────────────────────────────
   STYLES  (prefix: dwpl-)
───────────────────────────────────────────── */
const styles = `
.dwpl-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  color: #333;
  min-height: 100vh;
}

.dwpl-top-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.dwpl-top-bar-header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #2c3e50;
}

.dwpl-back-button {
  background: none;
  border: none;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
  padding: 5px 10px;
}
.dwpl-back-button:hover { color: #000; }

.dwpl-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dwpl-excel-export-btn {
  background-color: #5a7b94;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
}
.dwpl-excel-export-btn:hover { background-color: #4a6b84; }

.dwpl-search-filter-bar {
  display: flex;
  background-color: #1a252f;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  align-items: center;
}
.dwpl-date-input-group {
  flex-grow: 1;
  margin-right: 20px;
}
.dwpl-filter-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ecf0f1;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: inherit;
}

.dwpl-search-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}
.dwpl-search-btn:hover { background-color: #2980b9; }

.dwpl-reset-btn {
  margin-left: 8px;
  background: #aaa;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
}
.dwpl-reset-btn:hover { background: #888; }

.dwpl-data-table-container {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.dwpl-performance-table {
  width: 100%;
  border-collapse: collapse;
}
.dwpl-performance-table th {
  background-color: #2c3e50;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: bold;
  border-right: 1px solid #34495e;
}
.dwpl-performance-table th:last-child { border-right: none; }
.dwpl-performance-table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
  color: #333;
}
.dwpl-performance-table tr:hover { background-color: #f9f9f9; }

.dwpl-copyright-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

/* ── Print ── */
@media print {
  .dwpl-top-bar-header,
  .dwpl-actions-bar,
  .dwpl-search-filter-bar { display: none !important; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .dwpl-container { padding: 10px; }
  .dwpl-performance-table th,
  .dwpl-performance-table td { padding: 8px; font-size: 0.85rem; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const DailyWorkPerformanceList = ({ setActiveLink }) => {
  const [data, setData]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  const reload = useCallback(() => {
    const fresh = getFreshSubmissions();
    fresh.sort((a, b) => b._submittedAt - a._submittedAt);
    setData(fresh);
    setFiltered(fresh);
  }, []);

  // Load on mount
  useEffect(() => { reload(); }, [reload]);

  // Auto-refresh every 60 s so expired rows disappear in real time
  useEffect(() => {
    const interval = setInterval(reload, 60_000);
    return () => clearInterval(interval);
  }, [reload]);

  const handleSearch = () => {
    if (!searchText.trim()) { setFiltered(data); return; }
    const lower = searchText.toLowerCase();
    setFiltered(
      data.filter(item =>
        (item.formName || '').toLowerCase().includes(lower) ||
        Object.values(item).some(v =>
          String(v).toLowerCase().includes(lower)
        )
      )
    );
  };

  const handleReset = () => {
    setSearchText('');
    setFiltered(data);
  };

  const handleDelete = (id) => {
    if (!window.confirm('के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?')) return;
    deleteSubmission(id);
    reload();
  };

  const handleExcelExport = () => {
    if (!filtered.length) { alert('निर्यात गर्न कुनै तथ्याङ्क छैन।'); return; }
    const skip = new Set(['id', '_submittedAt']);
    const allKeys = [
      ...new Set(filtered.flatMap(r => Object.keys(r).filter(k => !skip.has(k))))
    ];
    const header = ['पेश गरिएको समय', ...allKeys];
    const rows = filtered.map(r => [
      new Date(r._submittedAt).toLocaleString('ne-NP'),
      ...allKeys.map(k => r[k] ?? ''),
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-work-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="dwpl-container">

        {/* ── Header ── */}
        <div className="dwpl-top-bar-header">
          <h1>दैनिक कार्य सम्पादनका सूचीहरू</h1>
          <button
            className="dwpl-back-button"
            onClick={() => setActiveLink('गृहपृष्ठ')}
          >
            ← Back
          </button>
        </div>

        {/* ── Info banner ── */}
        <div style={{
          background: '#e8f4fd',
          border: '1px solid #bee3f8',
          borderRadius: 6,
          padding: '10px 16px',
          marginBottom: 16,
          fontSize: '0.9rem',
          color: '#2c5282',
        }}>
          📋 यहाँ आजको पेश गरिएका सबै फारमहरू देखिन्छन्।
          पेश गरेको <strong>२४ घण्टापछि</strong> स्वतः हट्नेछ।
        </div>

        {/* ── Actions ── */}
        <div className="dwpl-actions-bar">
          <button className="dwpl-excel-export-btn" onClick={handleExcelExport}>
            📥 एक्सेल निर्यात
          </button>
          <span style={{ fontSize: '0.85rem', color: '#555' }}>
            जम्मा: <strong>{filtered.length}</strong> फारम
          </span>
        </div>

        {/* ── Search ── */}
        <div className="dwpl-search-filter-bar">
          <div className="dwpl-date-input-group">
            <input
              type="text"
              placeholder="फारमको नाम वा विवरणले खोज्नुहोस्..."
              className="dwpl-filter-input"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="dwpl-search-btn" onClick={handleSearch}>🔍</button>
          <button className="dwpl-reset-btn" onClick={handleReset}>
            ✕ रिसेट
          </button>
        </div>

        {/* ── Table ── */}
        <div className="dwpl-data-table-container">
          <table className="dwpl-performance-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>फारमको नाम</th>
                <th>पेश गरिएको समय</th>
                <th>आवेदकको नाम</th>
                <th>मुख्य विवरण</th>
                <th style={{ width: 110 }}>समय बाँकी</th>
                <th style={{ width: 100 }}>मेटाउनुहोस्</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: 'center', padding: 32, color: '#888' }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
                    <div>अहिलेसम्म कुनै फारम पेश गरिएको छैन।</div>
                    <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                      फारम पेश गरेपछि यहाँ स्वतः देखिनेछ।
                    </div>
                  </td>
                </tr>
              ) : filtered.map((item, idx) => {
                const skip = new Set([
                  'id', '_submittedAt', 'formName',
                  'applicantName', 'applicant_name',
                ]);
                const detailPairs = Object.entries(item)
                  .filter(([k]) => !skip.has(k))
                  .slice(0, 4);

                const applicantName =
                  item.applicantName       ||
                  item.applicant_name      ||
                  item['आवेदकको_नाम']      ||
                  '—';

                const submittedTime =
                  new Date(item._submittedAt).toLocaleString('ne-NP');
                const remaining =
                  TWENTY_FOUR_HOURS - (Date.now() - item._submittedAt);
                const isExpiringSoon = remaining < 2 * 60 * 60 * 1000;

                return (
                  <tr
                    key={item.id}
                    style={isExpiringSoon ? { background: '#fff8f0' } : {}}
                  >
                    <td style={{ textAlign: 'center', color: '#888' }}>
                      {idx + 1}
                    </td>
                    <td style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {item.formName || '—'}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#555' }}>
                      {submittedTime}
                    </td>
                    <td style={{ fontSize: '0.88rem' }}>
                      {applicantName}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#444' }}>
                      {detailPairs.length > 0
                        ? detailPairs.map(([k, v]) => (
                            <div key={k}>
                              <span style={{ color: '#888' }}>{k}:</span>{' '}
                              <strong>{String(v).slice(0, 40)}</strong>
                            </div>
                          ))
                        : '—'
                      }
                    </td>
                    <td style={{
                      fontSize: '0.78rem',
                      color: isExpiringSoon ? '#e53e3e' : '#718096',
                      fontWeight: isExpiringSoon ? 'bold' : 'normal',
                      whiteSpace: 'nowrap',
                    }}>
                      {timeLeftLabel(item._submittedAt)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          color: 'white',
                          background: '#e53e3e',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 10px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                        }}
                      >
                        मेटाउनुहोस्
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="dwpl-copyright-footer">
          © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
        </div>
      </div>
    </>
  );
};

export default DailyWorkPerformanceList;