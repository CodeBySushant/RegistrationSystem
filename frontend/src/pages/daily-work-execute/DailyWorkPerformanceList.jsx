import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { MUNICIPALITY } from "../../config/municipalityConfig";

const styles = `
.dwpl-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
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
  gap: 10px;
  flex-wrap: wrap;
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
  gap: 10px;
  flex-wrap: wrap;
}
.dwpl-filter-input {
  flex: 1;
  min-width: 160px;
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
@media print {
  .dwpl-top-bar-header,
  .dwpl-actions-bar,
  .dwpl-search-filter-bar { display: none !important; }
}
@media (max-width: 768px) {
  .dwpl-container { padding: 10px; }
  .dwpl-performance-table th,
  .dwpl-performance-table td { padding: 8px; font-size: 0.85rem; }
}
`;

const DailyWorkPerformanceList = ({ setActiveLink }) => {
  const [data, setData]           = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const load = useCallback(async (date = '') => {
    setLoading(true);
    setError('');
    try {
      const params = date ? `?date=${date}` : '';
      const res = await axiosInstance.get(`/api/daily-submissions${params}`);
      const rows = res.data || [];
      setData(rows);
      setFiltered(rows);
    } catch (err) {
      console.error('daily-submissions fetch error:', err);
      setError('डाटा लोड गर्न समस्या भयो।');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => { load(); }, [load]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => load(dateFilter), 60_000);
    return () => clearInterval(interval);
  }, [load, dateFilter]);

  const handleSearch = () => {
    if (!searchText.trim()) { setFiltered(data); return; }
    const lower = searchText.toLowerCase();
    setFiltered(
      data.filter(item =>
        (item.sub_category || '').toLowerCase().includes(lower) ||
        (item.category || '').toLowerCase().includes(lower) ||
        (item.summary || '').toLowerCase().includes(lower) ||
        (item.form_key || '').toLowerCase().includes(lower)
      )
    );
  };

  const handleReset = () => {
    setSearchText('');
    setDateFilter('');
    setFiltered(data);
    load('');
  };

  const handleDateSearch = () => {
    load(dateFilter);
  };

  const handleExcelExport = () => {
    if (!filtered.length) { alert('निर्यात गर्न कुनै तथ्याङ्क छैन।'); return; }
    const header = ['#', 'फारमको नाम', 'श्रेणी', 'पेश गरिएको समय', 'आवेदकको नाम'];
    const rows = filtered.map((r, i) => [
      i + 1,
      r.sub_category || r.form_key || '',
      r.category || '',
      r.created_at || '',
      r.summary || '',
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

        {/* Header */}
        <div className="dwpl-top-bar-header">
          <h1>दैनिक कार्य सम्पादनका सूचीहरू</h1>
          <button
            className="dwpl-back-button"
            onClick={() => setActiveLink('गृहपृष्ठ')}
          >
            ← Back
          </button>
        </div>

        {/* Info banner */}
        <div style={{
          background: '#e8f4fd',
          border: '1px solid #bee3f8',
          borderRadius: 6,
          padding: '10px 16px',
          marginBottom: 16,
          fontSize: '0.9rem',
          color: '#2c5282',
        }}>
          📋 यहाँ पेश गरिएका सबै फारमहरू देखिन्छन्।
          डाटा सर्भरबाट लोड हुन्छ — सबै कम्प्युटरमा देखिन्छ।
        </div>

        {/* Actions */}
        <div className="dwpl-actions-bar">
          <button className="dwpl-excel-export-btn" onClick={handleExcelExport}>
            📥 एक्सेल निर्यात
          </button>
          <span style={{ fontSize: '0.85rem', color: '#555' }}>
            जम्मा: <strong>{filtered.length}</strong> फारम
          </span>
        </div>

        {/* Search + Date filter */}
        <div className="dwpl-search-filter-bar">
          <input
            type="text"
            placeholder="फारमको नाम वा विवरणले खोज्नुहोस्..."
            className="dwpl-filter-input"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <input
            type="date"
            className="dwpl-filter-input"
            style={{ maxWidth: 180 }}
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          />
          <button className="dwpl-search-btn" onClick={() => { handleSearch(); handleDateSearch(); }}>
            🔍
          </button>
          <button className="dwpl-reset-btn" onClick={handleReset}>
            ✕ रिसेट
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fff5f5',
            border: '1px solid #fed7d7',
            borderRadius: 4,
            padding: '10px 16px',
            marginBottom: 16,
            color: '#c53030',
          }}>
            {error}
          </div>
        )}

        {/* Table */}
        <div className="dwpl-data-table-container">
          <table className="dwpl-performance-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>फारमको नाम</th>
                <th>श्रेणी</th>
                <th>पेश गरिएको समय</th>
                <th>आवेदकको नाम</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: 32, color: '#888' }}>
                    लोड हुँदैछ...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: 32, color: '#888' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
                    <div>अहिलेसम्म कुनै फारम पेश गरिएको छैन।</div>
                    <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                      फारम पेश गरेपछि यहाँ स्वतः देखिनेछ।
                    </div>
                  </td>
                </tr>
              ) : filtered.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ textAlign: 'center', color: '#888' }}>{idx + 1}</td>
                  <td style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {item.sub_category || item.form_key || '—'}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#555' }}>
                    {item.category || '—'}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#555' }}>
                    {item.created_at || '—'}
                  </td>
                  <td style={{ fontSize: '0.88rem' }}>
                    {item.summary || '—'}
                  </td>
                </tr>
              ))}
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